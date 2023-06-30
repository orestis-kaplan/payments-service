import axios from "axios";
import { NextFunction, Request, Response } from "express";
import {
  validationResult,
  param,
  body,
  oneOf,
  checkSchema,
} from "express-validator";
import { ServerError } from "~/middlewares/error.middleware";
import PaymentModel from "~/models/payment";

const schemaFields = Object.keys(PaymentModel.schema.obj);

const idExists = param("id").exists().notEmpty().isMongoId();

const bodyIsNotEmpty = body().notEmpty();

const checkIfAnyValidFieldExists = body().custom((value, { req }) => {
  const body = req.body;
  const fields = Object.keys(body);
  const isValid = fields.some((field) => schemaFields.includes(field));
  if (!isValid)
    throw new ServerError("At least one valid field is required", 400);
  return true;
});

const checkUpdatePayment = checkSchema(
  {
    customer_id: {
      in: ["body"],
      exists: {
        errorMessage: "customer_id is required",
        bail: true,
      },
      isMongoId: {
        errorMessage: "customer_id must be a valid UUID",
      },
    },
    amount: {
      in: ["body"],
      exists: {
        errorMessage: "amount is required",
        bail: true,
      },
      isInt: {
        errorMessage: "amount must be an integer",
        bail: true,
      },
    },
    date: {
      in: ["body"],
      exists: {
        errorMessage: "date is required",
        bail: true,
      },
      isDate: {
        errorMessage: "date must be a date",
        bail: true,
      },
    },
    type: {
      in: ["body"],
      exists: {
        errorMessage: "type is required",
        bail: true,
      },
    },
    description: {
      in: ["body"],
      isString: {
        errorMessage: "description must be a string",
        bail: true,
      },
    },
    status: {
      in: ["body"],
      exists: {
        errorMessage: "status is required",
        bail: true,
      },
      isIn: {
        options: [["PENDING", "COMPLETED", "CANCELLED", "REFUNDED", "FAILED"]],
        errorMessage:
          'status must be one of "PENDING", "COMPLETED", "CANCELLED", "REFUNDED", "FAILED"',
      },
    },
    property_id: {
      in: ["body"],
      exists: {
        errorMessage: "property_id is required",
        bail: true,
      },
      isMongoId: {
        errorMessage: "property_id must be a valid UUID",
      },
    },
    shares: {
      in: ["body"],
      exists: {
        errorMessage: "shares is required",
        bail: true,
      },
      isInt: {
        errorMessage: "shares must be an integer",
        bail: true,
      },
    },
  },
  ["body"]
);

const checkNewPayment = checkSchema(
  {
    customer_id: {
      in: ["body"],
      exists: {
        errorMessage: "customer_id is required",
        bail: true,
      },
      isMongoId: {
        errorMessage: "customer_id must be a valid UUID",
      },
    },
    amount: {
      in: ["body"],
      exists: {
        errorMessage: "amount is required",
        bail: true,
      },
      isInt: {
        errorMessage: "amount must be an integer",
        bail: true,
      },
    },
    date: {
      in: ["body"],
      exists: {
        errorMessage: "date is required",
        bail: true,
      },
      isDate: {
        errorMessage: "date must be a date",
        bail: true,
      },
    },
    type: {
      in: ["body"],
      exists: {
        errorMessage: "type is required",
        bail: true,
      },
    },
    description: {
      in: ["body"],
      isString: {
        errorMessage: "description must be a string",
        bail: true,
      },
    },
    status: {
      in: ["body"],
      exists: {
        errorMessage: "status is required",
        bail: true,
      },
      isIn: {
        options: [["PENDING", "COMPLETED", "CANCELLED", "REFUNDED", "FAILED"]],
        errorMessage:
          'status must be one of "PENDING", "COMPLETED", "CANCELLED", "REFUNDED", "FAILED"',
      },
    },
    property_id: {
      in: ["body"],
      exists: {
        errorMessage: "property_id is required",
        bail: true,
      },
      isMongoId: {
        errorMessage: "property_id must be a valid UUID",
      },
    },
    shares: {
      in: ["body"],
      exists: {
        errorMessage: "shares is required",
        bail: true,
      },
      isInt: {
        errorMessage: "shares must be an integer",
        bail: true,
      },
    },
  },
  ["body"]
);

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) next();
  else {
    throw new ServerError("Bad request", 400, errors.array());
  }
};

class PaymentValidationRules {
  static getPaymentByIdValidationRules = () => idExists;

  static createPaymentValidationRules = () => checkNewPayment;

  static getQueriedPaymentsValidationRules = () =>
    oneOf([idExists, bodyIsNotEmpty], {
      message: "Either payment id or filtering method is required",
    });

  static updatePaymentByIdValidationRules = () => [
    idExists,
    bodyIsNotEmpty,
    checkIfAnyValidFieldExists,
    checkUpdatePayment,
  ];

  static deletePaymentByIdValidationRules = () => idExists;
}

export default PaymentValidationRules;
