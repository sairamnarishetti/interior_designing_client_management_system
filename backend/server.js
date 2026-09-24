require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import models AFTER connection is established
const Client = require('./models/Client');
const Project = require('./models/Project');
const Appointment = require('./models/Appointment');
const bookingRoutes = require('./routes/bookingRoutes');

// Routes
app.get('/', (req, res) => {
  res.send('Interior Design Client Management System');
});

// Client Routes
app.post('/api/clients', async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).send(client);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Add other routes...
app.use('/api/bookings', bookingRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});