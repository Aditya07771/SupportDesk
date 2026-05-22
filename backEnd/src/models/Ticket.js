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

ticketSchema.statics.generateTicketId = async function () {
  const count = await this.countDocuments();
  return `TKT-${String(count + 1).padStart(4, '0')}`;
};

ticketSchema.pre('validate', async function () {
  if (!this.isNew || this.ticketId) return;
  this.ticketId = await this.constructor.generateTicketId();
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
