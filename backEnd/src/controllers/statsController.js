const Ticket = require('../models/Ticket');

exports.getStats = async (req, res, next) => {
  try {
    const totalTickets = await Ticket.countDocuments();

    const statusAgg = await Ticket.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const countByStatus = {
      Open: 0,
      'In Progress': 0,
      Closed: 0
    };

    statusAgg.forEach((item) => {
      countByStatus[item._id] = item.count;
    });

    const priorityAgg = await Ticket.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    const countByPriority = {
      Low: 0,
      Medium: 0,
      High: 0
    };

    priorityAgg.forEach((item) => {
      countByPriority[item._id] = item.count;
    });

    const recentTickets = await Ticket.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('ticketId subject status createdAt');

    res.json({
      success: true,
      data: {
        totalTickets,
        countByStatus,
        countByPriority,
        recentTickets
      }
    });
  } catch (error) {
    next(error);
  }
};
