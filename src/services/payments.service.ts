import { FilterQuery, ProjectionType } from "mongoose";
import Payment from "~/models/payment";
import { IPayment } from "~/types/models/payment";

class PaymentsService {
  static async getPaymentsById(paymentId: IPayment["_id"] | string) {
    const payment = await Payment.findById({ _id: paymentId });
    return payment;
  }

  static async getQueriedPayments(
    property: IPayment,
    projection?: ProjectionType<IPayment>,
    query?: FilterQuery<IPayment>
  ) {
    const filteredPayment = await Payment.find(property, projection, query);
    return filteredPayment;
  }

  static async createPayment(payment: Partial<IPayment>) {
    const newPayment = new Payment(payment);
    const savedPayment = await newPayment.save();
    return savedPayment;
  }

  static async updatePaymentById(
    paymentId: IPayment["_id"] | string,
    payment: IPayment
  ) {
    const updatedPayment = await Payment.findByIdAndUpdate(
      { _id: paymentId },
      { $set: payment },
      { new: true }
    );
    return updatedPayment;
  }

  static async deletePaymentById(propertyId: IPayment["_id"] | string) {
    const deletedPayment = await Payment.findByIdAndDelete({
      _id: propertyId,
    });
    return deletedPayment;
  }

  static async getPaymentsCount() {
    const paymentCount = await Payment.countDocuments();
    return paymentCount;
  }
}

export default PaymentsService;
