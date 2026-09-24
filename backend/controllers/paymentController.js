const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment({ ...req.body, client: req.user.id });
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ client: req.user.id });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};