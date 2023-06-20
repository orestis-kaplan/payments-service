declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    KEYCLOAK_URL: string;
    KEYCLOAK_CLIENT_ID: string;
    KEYCLOAK_CLIENT_SECRET: string;
    KEYCLOAK_REALM: string;
    MONGODB_STORE_CONNECTION_STRING: string;
    MONGODB_STORE_COLLECTION: string;
    MONGDB_CONNECTION_STRING: string;
  }
}
