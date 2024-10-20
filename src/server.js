const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// CORS
app.use(cors());

// Middleware
app.use(express.json()); // for parsing application/json

// Connect to DB
connectDB();

// Routes
app.use('/api', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));