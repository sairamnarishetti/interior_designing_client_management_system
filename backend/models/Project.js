const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  clientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Client', 
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { 
    type: String, 
    enum: ["Planning", "In Progress", "Completed"], 
    default: "Planning" 
  },
  budget: { type: Number },
  designerAssigned: { type: String }
});

// Check if model already exists before defining
module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema);