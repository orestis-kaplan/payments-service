import { Router } from "express";
import { keycloak } from "~/auth/keycloak";
import { Roles } from "~/types/roles";
import { checkRoles } from "~/auth/utils";
import PropertyController from "~/controllers/property.controller";

const router = Router();

router.get(
  "/",
  // keycloak.protect(),
  // checkRoles([Roles.APP_ADMIN, Roles.APP_GUEST]),
  PropertyController.getProperty
);
router.get("/all", PropertyController.getQueriedProperties);
router.post("/", PropertyController.createProperty);
router.get("/:propertyId", PropertyController.getProperty);
router.put("/:propertyId", PropertyController.updatePropertyById);
router.delete("/:propertyId", PropertyController.deletePropertyById);

export default router;
