const orderSchema = new mongoose.Schema({
  clientId: mongoose.Schema.Types.ObjectId,
  description: String,
  amount: Number,
  status: String
});
module.exports = mongoose.model('Order', orderSchema);