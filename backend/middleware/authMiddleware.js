const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    // Check for token in the headers:
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header:
            token = req.headers.authorization.split(' ')[1]

            // Verify token:
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from token:
            req.user = await User.findById(decodedToken.id).select('-password')

            // Call next middleware:
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('You were not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('You were not authorized')
    }
})

module.exports = { protect }