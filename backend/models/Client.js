const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  budget: { type: Number },
  preferences: { type: [String] },
  createdAt: { type: Date, default: Date.now }
});

// Check if model already exists before defining
module.exports = mongoose.models.Client || mongoose.model('Client', ClientSchema);