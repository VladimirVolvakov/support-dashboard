const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @description:    Get user tickets
// @route:          GET /api/tickets
// @access:         private
const getTickets = asyncHandler(async (req, res) => {
    // Get user with ID in JSON web token:
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Get user tickets:
    const tickets = await Ticket.find({user: req.user.id})

    res.status(200).json(tickets)
})

// @description:    Get single ticket
// @route:          GET /api/tickets/:ticketId
// @access:         private
const getTicket = asyncHandler(async (req, res) => {
    // Get user with ID in JSON web token:
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Get single ticket by its id from URL:
    const ticket = await Ticket.findById(req.params.ticketId)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    // Check ticket to belong to user requesting it:
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('You should be authorized to view this ticket')
    }

    res.status(200).json(ticket)
})

// @description:    Create a new ticket
// @route:          POST /api/tickets
// @access:         private
const createTicket = asyncHandler(async (req, res) => {
    const {product, description} = req.body

    // Check if all the data entered:
    if (!product || !description) {
        res.status(400)
        throw new Error('Please fill all the information')
    }

    // Get user with ID in JSON web token:
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Create a ticket:
    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(201).json(ticket)
})


module.exports = {
    createTicket,
    getTicket,
    getTickets
}