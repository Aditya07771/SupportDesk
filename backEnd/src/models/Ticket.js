const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    unique: true,
    required: true
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  customerEmail: {
    type: String,
    required: [true, 'Customer email is required'],
    trim: true,
    lowercase: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'],
    default: 'Open'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

ticketSchema.index({
  customerName: 'text',
  customerEmail: 'text',
  subject: 'text',
  description: 'text'
});

ticketSchema.pre('save', async function () {
  if (!this.isNew || this.ticketId) return;

  const count = await this.constructor.countDocuments();
  const paddedNumber = String(count + 1).padStart(4, '0');
  this.ticketId = `TKT-${paddedNumber}`;
});

ticketSchema.pre('insertMany', function (next, docs) {
  docs.forEach((doc, index) => {
    if (!doc.ticketId) {
      doc.ticketId = `TKT-${String(index + 1).padStart(4, '0')}`;
    }
  });
  next();
});

module.exports = mongoose.model('Ticket', ticketSchema);
