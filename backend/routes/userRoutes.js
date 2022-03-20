const express = require('express')
const { loginUser, registerUser } = require('../controllers/userController')

const router = express.Router()

router.post('/', registerUser)
router.post('/login', loginUser)

module.exports = router