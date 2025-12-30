# Solar Panda - AI Coding Agent Instructions

## 🏗 Project Architecture
- **Monorepo Structure**:
  - Root: Orchestration via npm workspaces.
  - `frontend/`: React (Vite) SPA with Tailwind CSS & Radix UI.
  - `backend/`: Express.js REST API with MongoDB (Mongoose).
- **Data Flow**: Frontend consumes Backend API via REST. Backend connects to MongoDB and external services (Stripe).
- **State Management**: React Query (`@tanstack/react-query`) for server state in frontend.

## 🛠 Development Workflows
- **Startup**:
  - Frontend: `npm run dev:frontend` (runs on port 8080/5173).
  - Backend: `npm run dev:backend` (runs on port 3000).
  - Full Stack: `npm run dev` (concurrently).
- **Testing**:
  - Backend: `npm run test --workspace=backend` (Jest).
  - Frontend: `npm run test --workspace=frontend` (Jest).
- **Linting**: `npm run lint --workspace=frontend`.

## 💻 Tech Stack & Conventions
### Frontend (`/frontend`)
- **Framework**: React + Vite + TypeScript.
- **Styling**: Tailwind CSS + `clsx` + `tailwind-merge` (via `cn` utility).
- **Components**:
  - Prefer functional components with hooks.
  - UI Library: Radix UI primitives (via `@radix-ui/*`).
  - Icons: Lucide React (implied by modern shadcn/ui stack, verify if used).
- **Routing**: `react-router-dom` with `Layout` wrapper.
- **API Integration**: Use `fetch` or `axios` (check `lib/` or `utils/`) wrapped in React Query hooks.

### Backend (`/backend`)
- **Framework**: Express.js + TypeScript.
- **Database**: MongoDB with Mongoose schemas (`src/models/`).
- **API Structure**:
  - Routes in `src/routes/`.
  - Controllers in `src/controllers/`.
  - Models in `src/models/`.
- **Environment**: `dotenv` for configuration.
- **Payments**: Stripe integration (`src/controllers/subscriptionController.ts`).

## 🧩 Key Patterns & Integrations
- **Stripe**: Handled in backend (`subscriptionController.ts`, `webhook.ts`).
- **File Uploads**: Served statically from `backend/uploads`.
- **Supabase**: Frontend has `@supabase/supabase-js` dependency (check `frontend/src/integrations/supabase/`).
- **Error Handling**: Backend uses try/catch blocks in controllers with 500 responses.

## ⚠️ Critical Rules
- **TypeScript**: Strict mode enabled. Avoid `any` where possible.
- **Imports**: Use absolute paths or standard relative paths consistent with `tsconfig.json`.
- **Environment**: Never hardcode secrets. Use `process.env`.
- **Styling**: Use Tailwind utility classes. Avoid inline styles.
