import {
  AclOperationTypes,
  AclPermissionTypes,
  AclResourceTypes,
  ResourcePatternTypes,
} from "kafkajs";
import { admin } from ".";

const createACL = async () => {
  await admin.connect();
  await admin.createAcls({
    acl: [
      {
        resourceType: AclResourceTypes.TOPIC,
        resourceName: "customers",
        resourcePatternType: ResourcePatternTypes.LITERAL,
        principal: "User:client",
        host: "*",
        operation: AclOperationTypes.ALL,
        permissionType: AclPermissionTypes.ALLOW,
      },
    ],
  });
  await admin.disconnect();
};
export { createACL };
