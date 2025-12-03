const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Configure CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Allow only your frontend origin
    optionsSuccessStatus: 200
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/boards', require('./routes/boardRoutes'));
app.use('/api/todos', require('./routes/todoRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
});

module.exports = app;
