# Solar Panda - Nagpur Solar Platform

A comprehensive solar energy platform for Nagpur featuring residential and commercial solar calculators, dealer directory, booking system, and backend API with Stripe integration.

## 🚀 Features

- **Solar Calculator**: Calculate solar panel requirements and savings
- **Residential Solar Booking**: Book solar installations with step-by-step process
- **Dealer Directory**: Find certified solar dealers in Nagpur
- **Audit Dashboard**: Track solar installations and performance
- **Stripe Integration**: Process payments and manage subscriptions (Test Mode)
- **Backend API**: Express server with webhook handling and caching

## 📋 Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager
- Stripe account (for payment testing)
- Stripe CLI (for webhook testing)

## 🛠️ Installation & Setup

The project is divided into two parts:
- **Frontend**: Root directory (React + Vite)
- **Backend**: `backend/` directory (Express + MongoDB)

### 1. Frontend Setup
```bash
# Install dependencies
npm install

# Start Development Server
npm run dev
```
Access the frontend at: `http://localhost:8080`

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Configure Environment Variables
cp .env.example .env
# Edit .env with your MongoDB URL and Stripe keys

# Start Backend Server
npm run dev
```
Access the backend API at: `http://localhost:3000`

## 📂 Project Structure

- `/src` - Frontend source code (React components, pages, hooks)
- `/backend` - Backend source code (Express routes, models, controllers)
- `/public` - Static assets
- `/tests` - Test configuration and setup

**Frontend (Vite React App)**
```bash
npm run dev
```
Access the frontend at: http://localhost:5173

**Backend (Express Server)**
```bash
npm run dev:server
```
Access the backend at: http://localhost:3000

### Production Mode

**Build the application**
```bash
npm run build
```

This will:
1. Build the frontend (Vite)
2. Compile the backend TypeScript code

**Start the production server**
```bash
npm start
```

### Docker

**Build the Docker image**
```bash
docker build -t solar-panda .
```

**Run the container**
```bash
docker run -p 3000:3000 -e STRIPE_API_KEY=sk_test_xxx -e PORT=3000 solar-panda
```

## 🧪 Testing

**Run all tests**
```bash
npm test
```

**Run tests in watch mode**
```bash
npm test -- --watch
```

**Run linter**
```bash
npm run lint
```

**Run CI pipeline (lint + build + test)**
```bash
npm run ci
```

## 💳 Stripe Webhook Testing

The application includes a Stripe webhook handler for processing payment events. To test webhooks locally:

### Setup Stripe CLI

1. **Install Stripe CLI**
   - macOS: `brew install stripe/stripe-cli/stripe`
   - Linux/Windows: Download from https://stripe.com/docs/stripe-cli

2. **Login to Stripe**
   ```bash
   stripe login
   ```

3. **Forward webhooks to local server**
   ```bash
   stripe listen --forward-to localhost:3000/stripe/webhook
   ```
   
   Copy the webhook signing secret (starts with `whsec_`) to your `.env` file.

### Test Webhook Events

Trigger test events:
```bash
# Payment succeeded
stripe trigger payment_intent.succeeded

# Checkout completed
stripe trigger checkout.session.completed

# Customer created
stripe trigger customer.created
```

### Verify Webhook Logs

Check the `stripe_events.log` file in the repository root:
```bash
cat stripe_events.log
```

Each webhook event is logged with:
- Timestamp
- Event ID
- Event type
- Livemode status (should be false for test mode)
- Basic event data

## 📊 API Endpoints

### Health Check
```bash
GET /health
```
Returns server status and timestamp.

### Stripe Webhook
```bash
POST /stripe/webhook
```
Receives and processes Stripe webhook events. Requires valid Stripe signature header.

## 🧪 Verification

Use this checklist to verify the application is working correctly:

### Frontend Verification
- [ ] Frontend loads at http://localhost:5173
- [ ] Solar calculator displays and calculates correctly
- [ ] Navigation between pages works
- [ ] Forms submit without errors
- [ ] UI components render properly

### Backend Verification
- [ ] Server starts without errors
- [ ] Health endpoint returns 200 OK
- [ ] Server logs display correctly

### Stripe Integration Verification
- [ ] Stripe CLI connects and forwards webhooks
- [ ] Test webhook events are received
- [ ] Events are logged to `stripe_events.log`
- [ ] Each log entry contains required fields
- [ ] Signature verification passes (when secret is configured)

### Cache Verification
- [ ] Cache tests pass (`npm test`)
- [ ] Cache stores and retrieves values
- [ ] Cache entries expire after TTL
- [ ] Cleanup removes expired entries

### Build Verification
- [ ] Frontend builds without errors (`npm run build`)
- [ ] Backend compiles without errors (`npm run build:server`)
- [ ] Production server starts (`npm start`)
- [ ] Docker image builds successfully

## 📚 Documentation

- **Metrics Guide**: See [docs/README_metrics.md](./docs/README_metrics.md) for detailed testing and verification instructions
- **Stripe Webhooks**: https://stripe.com/docs/webhooks
- **Stripe Test Mode**: https://stripe.com/docs/testing
- **Lighthouse Reports**: Instructions in docs/README_metrics.md

## 🏗️ Project Structure

```
.
├── src/
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   │   └── cache.ts     # SimpleCache implementation
│   ├── routes/          # Backend routes
│   │   └── stripeWebhook.ts  # Stripe webhook handler
│   ├── tests/           # Test files
│   │   └── cache.test.ts     # Cache unit tests
│   ├── main.tsx         # Frontend entry point
│   └── index.ts         # Backend server entry point
├── docs/
│   └── README_metrics.md  # Verification and testing guide
├── public/              # Static assets
├── dist/                # Compiled output
├── .github/
│   └── workflows/
│       └── ci.yml       # GitHub Actions CI
├── Dockerfile           # Docker configuration
├── jest.config.js       # Jest test configuration
├── tsconfig.json        # TypeScript config (frontend)
├── tsconfig.server.json # TypeScript config (backend)
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## 🔧 Configuration Files

- **tsconfig.json**: Base TypeScript configuration
- **tsconfig.app.json**: Frontend TypeScript configuration
- **tsconfig.server.json**: Backend TypeScript configuration
- **tsconfig.node.json**: Build tools TypeScript configuration
- **jest.config.js**: Jest test runner configuration
- **vite.config.ts**: Vite bundler configuration
- **.env.example**: Environment variables template

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev` | Start frontend dev server (Vite) |
| `npm run dev:server` | Start backend dev server with hot-reload |
| `npm run build` | Build frontend and backend for production |
| `npm run build:server` | Build backend only |
| `npm start` | Start production server |
| `npm test` | Run tests |
| `npm run lint` | Run ESLint |
| `npm run ci` | Run CI pipeline (lint + build + test) |
| `npm run preview` | Preview production build |

## 🔒 Security Notes

- **Never commit `.env` files** - they contain sensitive credentials
- **Use test mode only** - Always use Stripe test mode keys (prefix `sk_test_`)
- **Verify webhook signatures** - Always verify Stripe webhook signatures in production
- **Review logs** - Regularly review `stripe_events.log` for suspicious activity
- **Keep dependencies updated** - Run `npm audit` and fix vulnerabilities

## 📄 License

This project is private and proprietary.

## 🐛 Troubleshooting

### Port already in use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### TypeScript compilation errors
```bash
# Clean build artifacts
rm -rf dist/

# Rebuild
npm run build
```

### Stripe webhook not working
1. Check that `STRIPE_SIGNING_SECRET` is set in `.env`
2. Verify Stripe CLI is forwarding to correct port
3. Ensure server is running before starting Stripe CLI
4. Check server logs for errors

### Tests failing
```bash
# Clear Jest cache
npx jest --clearCache

# Reinstall dependencies
rm -rf node_modules/
npm install
```

## 📞 Support

For issues and questions, please open an issue in the GitHub repository.

---

Built with ❤️ for sustainable energy in Nagpur 🌞
