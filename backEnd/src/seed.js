require('dotenv').config();
const connectDB = require('./config/db');
const Ticket = require('./models/Ticket');

const sampleTickets = [
  {
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    subject: 'Login issue',
    description: 'Unable to login to my account',
    status: 'Open',
    priority: 'High'
  },
  {
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@example.com',
    subject: 'Payment failed',
    description: 'Credit card payment was declined',
    status: 'In Progress',
    priority: 'High'
  },
  {
    customerName: 'Bob Johnson',
    customerEmail: 'bob.johnson@example.com',
    subject: 'Feature request',
    description: 'Would like to see dark mode added',
    status: 'Closed',
    priority: 'Low'
  },
  {
    customerName: 'Alice Williams',
    customerEmail: 'alice.w@example.com',
    subject: 'Bug report',
    description: 'Dashboard not loading on mobile',
    status: 'Open',
    priority: 'Medium'
  },
  {
    customerName: 'Charlie Brown',
    customerEmail: 'charlie.b@example.com',
    subject: 'Account deletion request',
    description: 'Please delete my account and all data',
    status: 'In Progress',
    priority: 'Medium'
  },
  {
    customerName: 'Diana Prince',
    customerEmail: 'diana.prince@example.com',
    subject: 'Billing question',
    description: 'Why was I charged twice this month?',
    status: 'Closed',
    priority: 'High'
  },
  {
    customerName: 'Edward Norton',
    customerEmail: 'ed.norton@example.com',
    subject: 'Integration not working',
    description: 'Slack integration keeps disconnecting',
    status: 'Open',
    priority: 'Medium'
  },
  {
    customerName: 'Fiona Green',
    customerEmail: 'fiona.green@example.com',
    subject: 'Reset password',
    description: 'Need help resetting my password',
    status: 'Closed',
    priority: 'Low'
  },
  {
    customerName: 'George Martin',
    customerEmail: 'george.m@example.com',
    subject: 'Export data',
    description: 'How do I export my data as CSV?',
    status: 'In Progress',
    priority: 'Low'
  },
  {
    customerName: 'Hannah Lee',
    customerEmail: 'hannah.lee@example.com',
    subject: 'Performance issue',
    description: 'App is running very slow',
    status: 'Open',
    priority: 'High'
  },
  {
    customerName: 'Ian Cooper',
    customerEmail: 'ian.cooper@example.com',
    subject: 'API documentation',
    description: 'Where can I find the API docs?',
    status: 'Closed',
    priority: 'Low'
  },
  {
    customerName: 'Julia Roberts',
    customerEmail: 'julia.r@example.com',
    subject: 'Upgrade plan',
    description: 'Want to upgrade to enterprise plan',
    status: 'In Progress',
    priority: 'Medium'
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    await Ticket.deleteMany({});
    console.log('Cleared existing tickets');

    await Ticket.insertMany(sampleTickets);
    console.log('Successfully seeded 12 tickets');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
