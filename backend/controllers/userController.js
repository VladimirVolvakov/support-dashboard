const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const { send } = require('express/lib/response')

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
            email: user.email,
            token: generateToken(user._id)
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
    // Get user data from request body:
    const { email, password } = req.body

    // Check if user with entered email is already registered:
    const userExists = await User.findOne({email})

    // Check if user's password is matching to that in database:
    if (userExists && (await bcryptcompare(password, userExists.password))) {
        res.status(200).json({
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            token: generateToken(userExists._id)
        })
    } else {
        res.status(401)
        throw new Error('Please enter correct email and password')
    }
})

// @description:    Get current user
// @route:          /api/users/me
// @access:         private
const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    }
    
    res.status(200).json(user)
})

// Generate token:
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    getMe,
    loginUser,
    registerUser
}