/**
 * Server Bootstrap
 * Entry point for the Express server that handles backend API routes
 * including Stripe webhooks for payment processing.
 */

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { stripeWebhookRouter } from './routes/stripeWebhook';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Health check endpoint - must come before body parser to avoid issues
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'solar-panda-backend'
  });
});

// Stripe webhook route - uses raw body parser for signature verification
// This must come BEFORE the JSON body parser
app.use('/stripe', express.raw({ type: 'application/json' }), stripeWebhookRouter);

// Regular JSON body parser for other routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({ 
    message: 'Solar Panda Backend API',
    endpoints: {
      health: '/health',
      stripe: '/stripe/webhook'
    }
  });
});

// Export app for testing
export { app };

// Start server only if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`💳 Stripe webhook: http://localhost:${PORT}/stripe/webhook`);
  });
}
