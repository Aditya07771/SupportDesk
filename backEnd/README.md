# Customer Support Ticketing CRM - Backend

Production-ready REST API built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js v16 or higher
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/crm_db` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:5173` |

## Local Setup

```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Update .env with your MongoDB URI

# Seed database with sample data
npm run seed

# Start development server
npm run dev

# Start production server
npm start
```

## API Endpoints

### Create Ticket
**POST** `/api/tickets`

Request body:
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "subject": "Login issue",
  "description": "Cannot access my account",
  "priority": "High"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "ticketId": "TKT-0001",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "subject": "Login issue",
    "description": "Cannot access my account",
    "status": "Open",
    "priority": "High",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

### Get All Tickets
**GET** `/api/tickets?status=Open&search=login&page=1&limit=10`

Query parameters:
- `status` (optional): Filter by status (Open, In Progress, Closed)
- `search` (optional): Search across name, email, subject, ticketId
- `page` (optional, default 1): Page number
- `limit` (optional, default 10): Items per page

Response:
```json
{
  "success": true,
  "data": [...],
  "total": 42,
  "page": 1,
  "totalPages": 5
}
```

### Get Ticket by ID
**GET** `/api/tickets/:ticketId`

Example: `/api/tickets/TKT-0001`

Response:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "ticketId": "TKT-0001",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "subject": "Login issue",
    "description": "Cannot access my account",
    "status": "Open",
    "priority": "High",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z",
    "notes": [
      {
        "_id": "...",
        "ticketId": "...",
        "noteText": "Looking into this issue",
        "createdAt": "2025-01-15T11:00:00.000Z"
      }
    ]
  }
}
```

### Update Ticket
**PUT** `/api/tickets/:ticketId`

Request body:
```json
{
  "status": "In Progress",
  "noteText": "Working on a fix"
}
```

Response:
```json
{
  "success": true,
  "data": { /* updated ticket */ },
  "note": { /* new note if noteText was provided */ }
}
```

### Get Statistics
**GET** `/api/stats`

Response:
```json
{
  "success": true,
  "data": {
    "totalTickets": 42,
    "countByStatus": {
      "Open": 15,
      "In Progress": 12,
      "Closed": 15
    },
    "countByPriority": {
      "Low": 10,
      "Medium": 20,
      "High": 12
    },
    "recentTickets": [
      {
        "_id": "...",
        "ticketId": "TKT-0042",
        "subject": "...",
        "status": "Open",
        "createdAt": "..."
      }
    ]
  }
}
```
