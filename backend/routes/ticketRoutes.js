const express = require('express')
const router = express.Router()
const { createTicket, deleteTicket, getTicket, getTickets, updateTicket } = require('../controllers/ticketController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:ticketId').get(protect,getTicket).delete(protect, deleteTicket).put(protect, updateTicket)

module.exports = router