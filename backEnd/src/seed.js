require('dotenv').config();
const connectDB = require('./config/db');
const Ticket = require('./models/Ticket');

const sampleTickets = [
  {
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul.sharma@gmail.com',
    subject: 'Unable to login',
    description: 'I am unable to login even after resetting my password.',
    status: 'Open',
    priority: 'High'
  },
  {
    customerName: 'Priya Verma',
    customerEmail: 'priya.verma@gmail.com',
    subject: 'Payment failed',
    description: 'Amount deducted from my account but order not confirmed.',
    status: 'In Progress',
    priority: 'High'
  },
  {
    customerName: 'Aman Gupta',
    customerEmail: 'aman.gupta@gmail.com',
    subject: 'Need dark mode',
    description: 'Please add dark mode support in the dashboard.',
    status: 'Closed',
    priority: 'Low'
  },
  {
    customerName: 'Sneha Patil',
    customerEmail: 'sneha.patil@gmail.com',
    subject: 'Dashboard issue',
    description: 'Dashboard is not loading properly on mobile devices.',
    status: 'Open',
    priority: 'Medium'
  },
  {
    customerName: 'Arjun Mehta',
    customerEmail: 'arjun.mehta@gmail.com',
    subject: 'Delete my account',
    description: 'Please permanently delete my account and personal data.',
    status: 'In Progress',
    priority: 'Medium'
  },
  {
    customerName: 'Neha Kapoor',
    customerEmail: 'neha.kapoor@gmail.com',
    subject: 'Double payment charged',
    description: 'I was charged twice for the same subscription.',
    status: 'Closed',
    priority: 'High'
  },
  {
    customerName: 'Rohit Yadav',
    customerEmail: 'rohit.yadav@gmail.com',
    subject: 'Slack integration issue',
    description: 'Slack integration disconnects automatically after some time.',
    status: 'Open',
    priority: 'Medium'
  },
  {
    customerName: 'Pooja Singh',
    customerEmail: 'pooja.singh@gmail.com',
    subject: 'Password reset help',
    description: 'I forgot my password and cannot access my account.',
    status: 'Closed',
    priority: 'Low'
  },
  {
    customerName: 'Vikas Mishra',
    customerEmail: 'vikas.mishra@gmail.com',
    subject: 'Export reports',
    description: 'Need help exporting reports in CSV format.',
    status: 'In Progress',
    priority: 'Low'
  },
  {
    customerName: 'Karan Joshi',
    customerEmail: 'karan.joshi@gmail.com',
    subject: 'Application is slow',
    description: 'The application becomes very slow during peak hours.',
    status: 'Open',
    priority: 'High'
  },
  {
    customerName: 'Anjali Nair',
    customerEmail: 'anjali.nair@gmail.com',
    subject: 'API documentation',
    description: 'Can you share the latest API documentation?',
    status: 'Closed',
    priority: 'Low'
  },
  {
    customerName: 'Siddharth Jain',
    customerEmail: 'siddharth.jain@gmail.com',
    subject: 'Upgrade subscription',
    description: 'I want to upgrade from basic to enterprise plan.',
    status: 'In Progress',
    priority: 'Medium'
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    await Ticket.deleteMany({});
    console.log('Cleared existing tickets');

    const ticketsWithIds = sampleTickets.map((ticket, index) => ({
      ...ticket,
      ticketId: `TKT-${String(index + 1).padStart(4, '0')}`
    }));

    await Ticket.insertMany(ticketsWithIds);
    console.log(`Successfully seeded ${ticketsWithIds.length} tickets`);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
