import { Router } from "express";
import { keycloak } from "~/auth/keycloak";
import { Roles } from "~/types/roles";
import { checkRoles } from "~/auth/utils";
import PropertyController from "~/controllers/payments.controller";

const router = Router();

router.get(
  "/",
  // keycloak.protect(),
  // checkRoles([Roles.APP_ADMIN, Roles.APP_GUEST]),
  PropertyController.getQueriedPayments
);
router.post("/", PropertyController.createPayment);
router.get("/:paymentId", PropertyController.getQueriedPayments);
router.put("/:paymentId", PropertyController.updatePaymentById);
router.delete("/:paymentId", PropertyController.deletePaymentById);

export default router;
