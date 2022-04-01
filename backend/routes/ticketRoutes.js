const express = require('express')
const noteRouter = require('./noteRoutes')
const router = express.Router()
const { createTicket, deleteTicket, getTicket, getTickets, updateTicket } = require('../controllers/ticketController')
const { protect } = require('../middleware/authMiddleware')

// Readress into note router:
router.use('/:ticketId/notes', noteRouter)

router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:ticketId').get(protect,getTicket).delete(protect, deleteTicket).put(protect, updateTicket)

module.exports = router