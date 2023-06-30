import { Router } from "express";
import { keycloak } from "~/auth/keycloak";
import { Roles } from "~/types/roles";
import { checkRoles } from "~/auth/utils";
import PropertyController from "~/controllers/payments.controller";
import PaymentValidationRules, {
  validate,
} from "~/validations/paymentsValidation";
const router = Router();

router.get(
  "/",
  // keycloak.protect(),
  // checkRoles([Roles.APP_ADMIN, Roles.APP_GUEST]),
  PaymentValidationRules.getQueriedPaymentsValidationRules(),
  validate,
  PropertyController.getQueriedPayments
);
router.post(
  "/",
  PaymentValidationRules.createPaymentValidationRules(),
  validate,
  PropertyController.createPayment
);
router.get(
  "/:id",
  PaymentValidationRules.getPaymentByIdValidationRules(),
  validate,
  PropertyController.getQueriedPayments
);
router.put(
  "/:id",
  ...PaymentValidationRules.updatePaymentByIdValidationRules(),
  validate,
  PropertyController.updatePaymentById
);
router.delete(
  "/:id",
  PaymentValidationRules.deletePaymentByIdValidationRules(),
  validate,
  PropertyController.deletePaymentById
);

export default router;
