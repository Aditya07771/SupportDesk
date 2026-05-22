const Ticket = require('../models/Ticket');
const Note = require('../models/Note');

exports.createTicket = async (req, res, next) => {
  try {
    const { customerName, customerEmail, subject, description, priority } = req.body;

    const ticket = await Ticket.create({
      customerName,
      customerEmail,
      subject,
      description,
      priority: priority || 'Medium'
    });

    res.status(201).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    next(error);
  }
};

exports.getTickets = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { ticketId: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const tickets = await Ticket.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Ticket.countDocuments(filter);

    res.json({
      success: true,
      data: tickets,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    next(error);
  }
};

exports.getTicketById = async (req, res, next) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findOne({ ticketId });

    if (!ticket) {
      const error = new Error('Ticket not found');
      error.statusCode = 404;
      return next(error);
    }

    const notes = await Note.find({ ticketId: ticket._id }).sort({ createdAt: 1 });

    res.json({
      success: true,
      data: {
        ...ticket.toObject(),
        notes
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTicket = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    const { status, noteText } = req.body;

    const ticket = await Ticket.findOne({ ticketId });

    if (!ticket) {
      const error = new Error('Ticket not found');
      error.statusCode = 404;
      return next(error);
    }

    let note = null;

    if (status) {
      ticket.status = status;
      ticket.updatedAt = Date.now();
      await ticket.save();
    }

    if (noteText) {
      note = await Note.create({
        ticketId: ticket._id,
        noteText
      });
    }

    res.json({
      success: true,
      data: ticket,
      note
    });
  } catch (error) {
    next(error);
  }
};
