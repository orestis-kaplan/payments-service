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
    SMTP_SERVER_HOST: string;
    SMTP_SERVER_USERNAME: string;
    SMTP_SERVER_PASSWORD: string;
    SMTP_SERVER_PORT: number;
    KAFKA_CERTIFICATES_PATH: string;
    KAFKA_CLIENT_ID: string;
    KAFKA_BROKER_1_HOST: string;
    KAFKA_BROKER_2_HOST: string;
    KAFKA_SCHEMA_REGISTRY_HOST: number;
    KAFKA_CLIENT_USER: string;
    KAFKA_CLIENT_PASSWORD: string;
    PROPERTIES_API: string;
  }
}
