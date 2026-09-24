const Booking = require('../models/Booking');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { name, email, service, date } = req.body;
    const booking = new Booking({ name, email, service, date });
    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
}; 