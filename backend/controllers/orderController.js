const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const order = new Order({ ...req.body, client: req.user.id });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ client: req.user.id }).populate('project');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};