import { Schema } from "mongoose";

export enum IStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
  FAILED = "FAILED",
}

export interface IPayment {
  _id?: Schema.Types.ObjectId;
  customer_id: string;
  amount: number;
  date: Date;
  type: string;
  description: string;
  status: IStatus;
  property_id: string;
  shares: number;
}
