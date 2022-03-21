const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// @description:    Register a new user
// @route:          /api/users
// @access:         public
const registerUser = asyncHandler(async (req, res) => {
    // Destructuring incoming object:
    const { name, email, password } = req.body

    // Validation:
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill in all required fields')
    }

    // Find if user is already registered:
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User with entered email already exists')
    }

    // Hash password:
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create a new user:
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Something went wrong...')
    }
})

// @description:    Login a user
// @route:          /api/users/login
// @access:         public
const loginUser = asyncHandler(async (req, res) => {
    res.send('Login Route')
})

module.exports = {
    registerUser,
    loginUser
}