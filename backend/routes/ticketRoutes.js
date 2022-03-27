const express = require('express')
const router = express.Router()
const { createTicket, getTicket, getTickets } = require('../controllers/ticketController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:ticketId').get(protect,getTicket)

module.exports = router