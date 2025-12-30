import { Request, Response } from "express";
import Plan from "../models/plan";
import Subscription from "../models/subscription";
import User from "../models/user";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripeKey = process.env.STRIPE_SECRET_KEY || "";
const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: "2022-11-15" }) : null;

export const getPlans = async (req: Request, res: Response) => {
  try {
    const plans = await Plan.find().sort({ price: 1 }).exec();
    res.json(plans);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createPlan = async (req: Request, res: Response) => {
  try {
    const { name, price, interval, description } = req.body || {};
    if (!name || !price) return res.status(400).json({ error: "Missing name or price" });

    let plan = new Plan({ name, price, interval: interval || "month", description });

    if (stripe) {
      const product = await stripe.products.create({ name, description });
      const stripePrice = await stripe.prices.create({
        product: product.id,
        unit_amount: Number(price),
        currency: "usd",
        recurring: { interval: interval || "month" },
      });
      plan.stripeProductId = product.id;
      plan.stripePriceId = stripePrice.id;
    }

    plan = await plan.save();
    res.status(201).json(plan);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createSubscription = async (req: Request, res: Response) => {
  try {
    const { planId, userEmail, userName, referralCode } = req.body || {};
    if (!planId || !userEmail) return res.status(400).json({ error: "Missing planId or userEmail" });

    let user = await User.findOne({ email: userEmail }).exec();
    let code = referralCode;
    if (!user) {
      if (!code) code = Math.random().toString(36).substring(2, 8).toUpperCase();
      user = new User({ email: userEmail, name: userName || "", referralCode: code, credits: 0 });
      await user.save();
    }

    const plan = await Plan.findById(planId).exec();
    if (!plan) return res.status(404).json({ error: "Plan not found" });

    if (stripe && plan.stripePriceId) {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [{ price: plan.stripePriceId, quantity: 1 }],
        customer_email: userEmail,
        success_url: `${process.env.APP_BASE_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.APP_BASE_URL || "http://localhost:3000"}/cancel`,
        metadata: { userId: user._id.toString(), planId: plan._id.toString(), referralCode },
      });

      const sub = new Subscription({
        user: user._id,
        plan: plan._id,
        status: "pending",
        stripeSubscriptionId: session.id, 
      });
      await sub.save();

      return res.json({ checkoutUrl: session.url, sessionId: session.id });
    }

    const subscription = new Subscription({
      user: user._id,
      plan: plan._id,
      status: "active",
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 3600 * 1000),
    });
    await subscription.save();

    if (referralCode) {
      const referrer = await User.findOne({ referralCode }).exec();
      if (referrer && !referrer._id.equals(user._id)) {
        const credit = 100;
        referrer.credits = (referrer.credits || 0) + credit;
        await referrer.save();
      }
    }

    res.status(201).json(subscription);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserSubscriptions = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const subs = await Subscription.find({ user: userId }).populate("plan").exec();
    res.json(subs);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
