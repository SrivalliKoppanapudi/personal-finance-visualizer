import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  date: Date,
  category: String,
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);