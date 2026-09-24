const feedbackSchema = new mongoose.Schema({
  clientId: mongoose.Schema.Types.ObjectId,
  message: String,
  rating: Number,
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Feedback', feedbackSchema);