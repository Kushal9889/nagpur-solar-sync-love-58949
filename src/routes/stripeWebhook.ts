/**
 * Stripe Webhook Handler
 * Processes Stripe webhook events in test mode and logs them to a file.
 * Uses signature verification to ensure authenticity of webhook events.
 */

import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import fs from 'fs';
import path from 'path';

const router = Router();

// Initialize Stripe with API key from environment
// Using test mode key (starts with sk_test_)
const stripeApiKey = process.env.STRIPE_API_KEY;
let stripe: Stripe | null = null;

if (stripeApiKey) {
  stripe = new Stripe(stripeApiKey, {
    apiVersion: '2023-10-16',
  });
}

// Webhook signing secret for signature verification
const webhookSecret = process.env.STRIPE_SIGNING_SECRET;

// Log file path (in repository root)
const LOG_FILE = path.join(process.cwd(), 'stripe_events.log');

/**
 * POST /webhook - Stripe webhook endpoint
 * Verifies webhook signature and logs event data
 */
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      console.warn('⚠️  Stripe not configured. Set STRIPE_API_KEY in .env');
      return res.status(200).json({ 
        received: true, 
        warning: 'Stripe not configured' 
      });
    }

    // Get raw body for signature verification
    const sig = req.headers['stripe-signature'];
    
    if (!sig) {
      console.error('❌ Missing stripe-signature header');
      return res.status(400).json({ error: 'Missing signature' });
    }

    let event: Stripe.Event;

    try {
      // Verify webhook signature if secret is configured
      if (webhookSecret) {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig as string,
          webhookSecret
        );
      } else {
        // Parse event without verification if secret not configured
        console.warn('⚠️  Webhook signature verification disabled (no STRIPE_SIGNING_SECRET)');
        event = JSON.parse(req.body.toString());
      }
    } catch (err) {
      const error = err as Error;
      console.error(`❌ Webhook signature verification failed: ${error.message}`);
      return res.status(400).json({ error: `Webhook Error: ${error.message}` });
    }

    // Log event to file
    const eventObject = event.data.object as any;
    const logEntry = {
      timestamp: new Date().toISOString(),
      eventId: event.id,
      eventType: event.type,
      livemode: event.livemode,
      data: {
        object: eventObject.object || 'unknown',
        id: eventObject.id || 'unknown',
      }
    };

    const logLine = JSON.stringify(logEntry) + '\n';
    
    // Append to log file
    fs.appendFileSync(LOG_FILE, logLine, 'utf8');
    
    console.log(`✅ Logged Stripe event: ${event.type} (${event.id})`);

    // Respond to Stripe that event was received
    res.status(200).json({ received: true, eventId: event.id });

  } catch (error) {
    const err = error as Error;
    console.error('❌ Error processing webhook:', err.message);
    // Always return 200 to avoid Stripe retries for non-webhook errors
    res.status(200).json({ 
      received: true, 
      error: 'Internal error logged' 
    });
  }
});

export { router as stripeWebhookRouter };
