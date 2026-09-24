const paymentSchema = new mongoose.Schema({
  clientId: mongoose.Schema.Types.ObjectId,
  orderId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  date: Date
});
module.exports = mongoose.model('Payment', paymentSchema);