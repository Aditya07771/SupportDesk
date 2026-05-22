const express = require('express');
const router = express.Router();
const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket
} = require('../controllers/ticketController');
const validate = require('../middleware/validate');

router.post('/', validate(['customerName', 'customerEmail', 'subject', 'description']), createTicket);
router.get('/', getTickets);
router.get('/:ticketId', getTicketById);
router.put('/:ticketId', updateTicket);

module.exports = router;
