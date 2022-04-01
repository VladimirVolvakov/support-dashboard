const express = require('express')
const router = express.Router({ mergeParams })
const { addNote, getNotes } = require('../controllers/noteController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getNotes).post(protect, addNote)

module.exports = router