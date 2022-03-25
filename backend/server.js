const colors = require('colors')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 8000

// Connect to MongoDB:
connectDB()

const app = express()

// Body parser middleware:
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Support Dashboard API'
    })
})

// Routes:
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))