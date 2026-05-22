# Customer Support Ticketing CRM

Full-stack support ticket system: **Node.js / Express / MongoDB** API + **React / Vite / Tailwind** UI.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Supported Formats & Storage](#supported-formats--storage)
4. [Prerequisites](#prerequisites)
5. [Setup & Configuration](#setup--configuration)
6. [Running the Application](#running-the-application)
7. [API Documentation](#api-documentation)
8. [Libraries Used](#libraries-used)
9. [Usage Examples](#usage-examples)
10. [Error Handling](#error-handling)

## Overview

Manage support tickets end-to-end: create, search, filter, paginate, update status, add notes, and view dashboard stats. Backend returns JSON with validation and error middleware; frontend is a responsive SPA with routing, debounced search, URL-synced filters, and optimistic updates.

## Features

**Backend:** REST API, Mongoose models, auto `TKT-XXXX` IDs, regex search, pagination, status/priority filters, notes, stats aggregation, CORS, validation middleware.

**Frontend:** React 18 + Vite, React Router, Tailwind, Axios, custom hooks, debounced search (300ms), URL filters, toasts, loading skeletons, mobile nav, form validation.

## Supported Formats & Storage

| Item | Detail |
|------|--------|
| Database | MongoDB (`Ticket`, `Note` collections) |
| API | JSON (`application/json`) |
| Status codes | `200`, `201`, `400`, `404`, `409`, `500` |

## Prerequisites

- Node.js v16+
- npm v7+
- MongoDB Atlas or local MongoDB
- Git

## Setup & Configuration

### Backend (`backEnd/`)

```bash
cd backEnd
npm install
cp .env.example .env   # set MONGO_URI, PORT, CORS_ORIGIN
npm run seed           # optional demo data
```

### Frontend (`frontEnd/`)

```bash
cd frontEnd
npm install
cp .env.example .env   # set VITE_API_URL
```

### Environment Variables

**Backend `.env`**

```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/crm_db
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Frontend `.env`**

```env
VITE_API_URL=http://localhost:5000
```

## Running the Application

| Service | Command | URL |
|---------|---------|-----|
| Backend (dev) | `cd backEnd && npm run dev` | http://localhost:5000 |
| Backend (prod) | `cd backEnd && npm start` | — |
| Frontend (dev) | `cd frontEnd && npm run dev` | http://localhost:5173 |
| Frontend (prod) | `cd frontEnd && npm run build && npm run preview` | — |

## API Documentation

Base URL: `http://localhost:5000` (or your deployed API).

### `POST /api/tickets`

Create ticket. Body: `customerName`, `customerEmail`, `subject`, `description`, `priority` (optional: Low | Medium | High). Returns `201` with `ticketId` (e.g. `TKT-0001`).

### `GET /api/tickets`

List tickets. Query: `status`, `search`, `page` (default 1), `limit` (default 10). Returns `data[]`, `total`, `page`, `totalPages`.

### `GET /api/tickets/:ticketId`

Get one ticket by `ticketId` (e.g. `TKT-0001`) including `notes[]`. `404` if not found.

### `PUT /api/tickets/:ticketId`

Update `status` and/or add `noteText`. Returns updated ticket and optional `note`.

### `GET /api/stats`

Returns `totalTickets`, `countByStatus`, `countByPriority`, `recentTickets` (last 5).

## Libraries Used

**Backend:** express, mongoose, cors, dotenv, nodemon (dev)

**Frontend:** react, react-dom, react-router-dom, axios, tailwindcss, vite, autoprefixer, postcss

## Usage Examples

```bash
# Create ticket
curl -X POST http://localhost:5000/api/tickets \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Jane","customerEmail":"jane@example.com","subject":"Payment failed","description":"Card declined","priority":"High"}'

# Search & filter
curl "http://localhost:5000/api/tickets?search=payment&status=Open"

# Update status + note
curl -X PUT http://localhost:5000/api/tickets/TKT-0001 \
  -H "Content-Type: application/json" \
  -d '{"status":"Closed","noteText":"Resolved"}'

# Stats
curl http://localhost:5000/api/stats
```

## Error Handling

All errors: `{ "success": false, "message": "..." }` (`stack` only when `NODE_ENV=development`).

| Code | Cause |
|------|--------|
| 400 | Missing fields, Mongoose validation, invalid ID |
| 404 | Ticket not found |
| 409 | Duplicate `ticketId` |
| 500 | Server error |

Common issues: wrong `MONGO_URI`, `VITE_API_URL` unset, CORS origin mismatch.

## Project Structure

```
SupportDesk/
├── backEnd/     # Express API
├── frontEnd/    # React SPA
└── README.md
```
