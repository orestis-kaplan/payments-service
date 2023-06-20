import { Request, Response, NextFunction } from "express";
import { ServerError } from "../middlewares/error.middleware";
import { Roles } from "../types/roles";

export const checkAuthenticated = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  if (req) {
    return next({ status: 200 });
  } else {
    const error = new ServerError("Unauthorized", 401);
    return next(error);
  }
};
export function checkRoles(roles: Roles[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    const hasRoles = roles.some(
      (role) =>
        req.kauth &&
        req.kauth.grant &&
        req.kauth.grant.access_token?.hasRole(role)
    );
    if (hasRoles) {
      next();
    } else {
      res.sendStatus(403); // or redirect to unauthorized page
    }
  };
}
