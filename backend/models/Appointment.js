const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  clientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Client', 
    required: true 
  },
  projectId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Project' 
  },
  date: { type: Date, required: true },
  location: { type: String },
  notes: { type: String }
});

// Check if model already exists before defining
module.exports = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);