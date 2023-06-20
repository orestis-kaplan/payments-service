import PaymentService from "~/services/payments.service";
import { NextFunction, Request, Response } from "express";
import { ServerError } from "~/middlewares/error.middleware";

class PaymentsController {
  static async getPaymentById(req: Request, res: Response, next: NextFunction) {
    try {
      const paymentId = req.params.paymentId || undefined;
      if (paymentId) {
        const payment = await PaymentService.getPaymentsById(paymentId);
        return res.json(payment).status(200);
      } else {
        throw new ServerError("Payment Id is required", 400);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getQueriedPayments(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const query = req.query || {};
      const projection = req.body.projection || {};
      const property = req.body.property || {};
      const filteredProperty = await PaymentService.getQueriedPayments(
        property,
        projection,
        query
      );
      return res.send(filteredProperty).status(200);
    } catch (error) {
      next(error);
    }
  }

  static async createPayment(req: Request, res: Response) {
    try {
      const payment = await PaymentService.createPayment(req.body);
      return res.json(payment).status(200);
    } catch (error) {
      return res.json(error).status(400);
    }
  }

  static async updatePaymentById(req: Request, res: Response) {
    try {
      const payment = await PaymentService.updatePaymentById(
        req.params.propertyId,
        req.body
      );
      return res.json(payment).status(200);
    } catch (error) {
      return res.json(error).status(400);
    }
  }

  static async deletePaymentById(req: Request, res: Response) {
    try {
      const payment = await PaymentService.deletePaymentById(
        req.params.propertyId
      );
      return res.json(payment).status(200);
    } catch (error) {
      return res.json(error).status(400);
    }
  }

  static async getPaymentsCount(req: Request, res: Response) {
    try {
      const paymentsCount = await PaymentService.getPaymentsCount();
      return res.json(paymentsCount).status(200);
    } catch (error) {
      return res.json(error).status(400);
    }
  }
}

export default PaymentsController;
