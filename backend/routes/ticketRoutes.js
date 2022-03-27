const express = require('express')
const router = express.Router()
const { createTicket, deleteTicket, getTicket, getTickets } = require('../controllers/ticketController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:ticketId').get(protect,getTicket).delete(protect, deleteTicket)

module.exports = router