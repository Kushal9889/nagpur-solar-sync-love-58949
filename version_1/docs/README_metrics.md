# Metrics and Verification Guide

This document provides instructions for running the Solar Panda server, testing Stripe webhooks, and generating performance reports.

## Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager
- Stripe CLI (for webhook testing)
- Chrome/Chromium (for Lighthouse reports)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and configure with your test-mode credentials:

```bash
cp .env.example .env
```

Edit `.env` and add your **Stripe test mode** keys:
- `STRIPE_API_KEY` - Get from https://dashboard.stripe.com/test/apikeys
- `STRIPE_SIGNING_SECRET` - Obtain via Stripe CLI (see below)
- Other variables as needed

**⚠️ IMPORTANT: Only use Stripe TEST mode keys (starting with `sk_test_`)**

### 3. Install Stripe CLI (for webhook testing)

Follow instructions at: https://stripe.com/docs/stripe-cli

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Linux
wget https://github.com/stripe/stripe-cli/releases/download/v1.19.0/stripe_1.19.0_linux_x86_64.tar.gz
tar -xvf stripe_1.19.0_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin/

# Windows - download from GitHub releases
```

Login to Stripe CLI:
```bash
stripe login
```

## Running the Server

### Development Mode

Run the backend server with hot-reload:

```bash
npm run dev:server
```

The server will start on `http://localhost:3000` (or the PORT specified in .env)

### Production Mode

Build and run in production:

```bash
npm run build
npm start
```

### Verify Server is Running

Check the health endpoint:

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-11-04T04:36:56.536Z",
  "service": "solar-panda-backend"
}
```

## Testing Stripe Webhooks

### Step 1: Start the Server

```bash
npm run dev:server
```

### Step 2: Forward Webhooks via Stripe CLI

In a separate terminal, forward Stripe test events to your local server:

```bash
stripe listen --forward-to localhost:3000/stripe/webhook
```

The CLI will output a webhook signing secret like `whsec_xxxxx`. Copy this value to your `.env` file as `STRIPE_SIGNING_SECRET`.

### Step 3: Trigger Test Events

Trigger a test payment event:

```bash
stripe trigger payment_intent.succeeded
```

Or trigger other events:

```bash
stripe trigger checkout.session.completed
stripe trigger customer.created
stripe trigger invoice.payment_succeeded
```

### Step 4: Verify Webhook Logs

Check that events are being logged to `stripe_events.log` in the repository root:

```bash
cat stripe_events.log
```

Expected format:
```json
{"timestamp":"2024-11-04T04:36:56.536Z","eventId":"evt_test_xxx","eventType":"payment_intent.succeeded","livemode":false,"data":{"object":"payment_intent","id":"pi_xxx"}}
```

Each webhook event should create a new line in this file.

## Testing Cache Functionality

### Run Cache Tests

```bash
npm test
```

This will run the cache unit tests in `src/tests/cache.test.ts`.

### Manual Cache Verification

You can test the cache programmatically:

```typescript
import { SimpleCache } from './src/utils/cache';

const cache = new SimpleCache<string>(60000); // 1 minute TTL

// Set a value
cache.set('user:123', 'John Doe');

// Get the value
console.log(cache.get('user:123')); // 'John Doe'

// Wait for expiration
setTimeout(() => {
  console.log(cache.get('user:123')); // undefined (expired)
}, 61000);
```

### Cache Benchmark

To benchmark cache performance, you can create a simple script:

```typescript
const cache = new SimpleCache<number>();
const iterations = 100000;

console.time('Cache SET operations');
for (let i = 0; i < iterations; i++) {
  cache.set(`key-${i}`, i);
}
console.timeEnd('Cache SET operations');

console.time('Cache GET operations');
for (let i = 0; i < iterations; i++) {
  cache.get(`key-${i}`);
}
console.timeEnd('Cache GET operations');
```

Expected performance: ~1-2ms for 100k operations.

## Generating Lighthouse Reports

### Install Lighthouse CLI

```bash
npm install -g lighthouse
```

### Run Frontend (Required for Lighthouse)

```bash
npm run dev
```

The Vite dev server will start on `http://localhost:5173`

### Generate Lighthouse Report

```bash
lighthouse http://localhost:5173 --output html --output-path ./lighthouse-report.html
```

Or generate JSON report:

```bash
lighthouse http://localhost:5173 --output json --output-path ./lighthouse-report.json
```

### View the Report

Open the generated HTML file in a browser:

```bash
# macOS
open lighthouse-report.html

# Linux
xdg-open lighthouse-report.html

# Windows
start lighthouse-report.html
```

### Expected Metrics

For optimal performance, aim for:
- **Performance Score**: > 90
- **Accessibility Score**: > 90
- **Best Practices**: > 90
- **SEO Score**: > 80

## Verification Checklist

Use this checklist to verify all features are working:

- [ ] Server starts successfully with `npm run dev:server`
- [ ] Health endpoint returns 200 OK at `/health`
- [ ] Stripe CLI successfully forwards webhooks
- [ ] Webhook events are logged to `stripe_events.log`
- [ ] Each webhook event contains timestamp, eventId, eventType, and data
- [ ] Cache tests pass with `npm test`
- [ ] Cache can store and retrieve values
- [ ] Cache entries expire after TTL
- [ ] Lighthouse report generates successfully
- [ ] Frontend loads in browser

## Troubleshooting

### Webhooks not logging

1. Check that `STRIPE_SIGNING_SECRET` is set in `.env`
2. Ensure Stripe CLI is forwarding to the correct port
3. Check server logs for errors
4. Verify the webhook endpoint: `curl -X POST http://localhost:3000/stripe/webhook`

### Server won't start

1. Check that port 3000 is not already in use: `lsof -i :3000`
2. Verify all dependencies are installed: `npm install`
3. Check for TypeScript compilation errors: `npm run build:server`

### Tests failing

1. Clear the cache: `npm cache clean --force`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check Node.js version: `node --version` (should be 20.x)

## Additional Resources

- [Stripe Webhooks Documentation](https://stripe.com/docs/webhooks)
- [Stripe CLI Documentation](https://stripe.com/docs/stripe-cli)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
