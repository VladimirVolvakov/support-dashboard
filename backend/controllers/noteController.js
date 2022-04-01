const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')
const res = require('express/lib/response')

// @description:    Get ticket notes
// @route:          GET /api/tickets/:ticketId/notes
// @access:         private
const getNotes = asyncHandler(async (req, res) => {
    // Get user with ID in JSON web token:
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Get user ticket with id from params:
    const ticket = await Ticket.findById(req.params.ticketId})

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User is not authorized')
    }

    // Get notes:
    const notes = await Note.find({ticket: req.params.ticketId})

    res.status(200).json(notes)
})

// @description:    Create note
// @route:          POST /api/tickets/:ticketId/notes
// @access:         private
const addNote = asyncHandler(async (req, res) => {
    // Get user with ID in JSON web token:
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Get user ticket with id from params:
    const ticket = await Ticket.findById(req.params.ticketId})

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User is not authorized')
    }

    // Create a note:
    const note = await Note.create({
        user: req.user.id,
        ticket: req.params.ticketId,
        text: req.body.text,
        isStaff: false
    })
    
    res.status(201).json(note)
})

module.exports = {
    addNote,
    getNotes
}