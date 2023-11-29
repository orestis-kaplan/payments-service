import mongooge from "mongoose";

const Schema = mongooge.Schema;

export const transactionSchema = new Schema({}, { _id: false });

const paymentSchema = new Schema({
  customer_id: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED", "CANCELLED", "REFUNDED", "FAILED"],
    required: true,
  },
  property_id: { type: String, required: true },
  shares: { type: Number, required: true },
  devidends: { type: Number, required: true },
});

const PaymentModel = mongooge.model("Payment", paymentSchema);

export default PaymentModel;
