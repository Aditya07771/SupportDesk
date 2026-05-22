# Customer Support Ticketing CRM - Frontend

Professional React-based frontend for the Customer Support Ticketing CRM system.

## Tech Stack

- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS v3
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Deployment:** Vercel

## Prerequisites

- Node.js v16 or higher
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` (local) or `https://your-api.onrender.com` (production) |

## Local Setup

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update VITE_API_URL in .env to point to your backend

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will run at `http://localhost:5173`

## Project Structure

```
src/
├── api/
│   └── api.js                 # Axios instance and API functions
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx         # Main navigation
│   │   └── PageWrapper.jsx    # Page container
│   ├── ui/
│   │   ├── StatusBadge.jsx    # Ticket status badge
│   │   ├── PriorityBadge.jsx  # Priority badge
│   │   ├── TicketCard.jsx     # Ticket list item
│   │   ├── SearchBar.jsx      # Search with debounce
│   │   ├── FilterBar.jsx      # Status filter pills
│   │   ├── StatCard.jsx       # Dashboard stat card
│   │   ├── EmptyState.jsx     # Empty results placeholder
│   │   ├── LoadingSpinner.jsx # Loading indicator
│   │   └── Pagination.jsx     # Pagination controls
│   └── forms/
│       └── CreateTicketForm.jsx
├── pages/
│   ├── DashboardPage.jsx      # Home dashboard
│   ├── TicketListPage.jsx     # All tickets with search/filter
│   ├── CreateTicketPage.jsx   # New ticket form
│   └── TicketDetailPage.jsx   # Single ticket view
├── hooks/
│   └── useTickets.js          # Custom ticket data hook
├── utils/
│   └── formatters.js          # Date/color utilities
├── context/
│   └── ToastContext.jsx       # Toast notification system
├── App.jsx                    # Route configuration
└── main.jsx                   # App entry point
```

## Features

### Dashboard
- Real-time statistics (total, open, in progress, closed tickets)
- Recent tickets preview
- Clean card-based layout

### Ticket List
- Search across name, email, subject, ticket ID
- Filter by status (All, Open, In Progress, Closed)
- Pagination (10 tickets per page)
- URL-synced filters (bookmarkable/shareable)
- Responsive card grid

### Create Ticket
- Client-side validation with error highlighting
- Priority selection
- Loading states
- Success/error toast notifications

### Ticket Detail
- Two-column layout (ticket info + sidebar)
- Notes thread
- Add notes inline
- Update status with optimistic UI
- Customer details with mailto link
- Responsive design (stacks on mobile)

## Design System

### Colors
- **Background:** `bg-slate-50` (page), `bg-white` (cards)
- **Text:** `text-slate-900` (headings), `text-slate-600` (body), `text-slate-400` (muted)
- **Border:** `border-slate-200`
- **Accent:** `indigo-600` (primary actions)

### Status Colors
- **Open:** Blue
- **In Progress:** Amber
- **Closed:** Green

### Priority Colors
- **High:** Red
- **Medium:** Orange
- **Low:** Slate

## Deployment to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable
vercel env add VITE_API_URL
```
