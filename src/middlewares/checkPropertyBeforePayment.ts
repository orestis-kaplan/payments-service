import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { ServerError } from "./error.middleware";

export const checkPropertyBeforePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { property_id, amount } = req.body;

    const property = await axios.get(
      `${process.env.PROPERTIES_API}/${property_id}`
    );

    if (!property || !property.data) {
      throw new ServerError("Property not found", 404);
    } else if (property.data.current_property_value < amount) {
      throw new ServerError(
        "The amount of money you provided, is more than the available sale amount",
        400
      );
    } else if (property.data.availability === "FUNDED") {
      throw new ServerError("The property is already funded", 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};
