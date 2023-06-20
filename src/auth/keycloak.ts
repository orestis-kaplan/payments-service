import Keycloak, { KeycloakConfig } from "keycloak-connect";
import expressSession from "express-session";
import { initMongoDBStore } from "../db/mongoStore";
import { Response, Request } from "express";
import { ServerError } from "~/middlewares/error.middleware";

const keycloakConfig: unknown = {
  clientId: process.env.KEYCLOAK_CLIENT_ID,
  bearerOnly: true,
  serverUrl: process.env.KEYCLOAK_URL,
  realm: process.env.KEYCLOAK_REALM,
  debug: true,
  credentials: {
    secret: process.env.KEYCLOAK_CLIENT_SECRET,
  },
};
Keycloak.prototype.accessDenied = function (
  request: Request,
  response: Response
) {
  throw new ServerError("Access denied", 403);
};

const keycloak = new Keycloak(
  { store: initMongoDBStore(expressSession) },
  keycloakConfig as KeycloakConfig
);

export { keycloak };
