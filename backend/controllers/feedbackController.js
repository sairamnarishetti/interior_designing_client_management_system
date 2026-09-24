const Feedback = require('../models/Feedback');

exports.createFeedback = async (req, res) => {
  try {
    const feedback = new Feedback({ ...req.body, client: req.user.id });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('client', 'name email');
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};