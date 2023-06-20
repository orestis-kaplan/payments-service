export interface UserConsentRepresentation {
  clientId?: string;
  createdDate?: number;
  grantedClientScopes?: string[];
  lastUpdatedDate?: number;
  scopeGranted?: boolean;
}

export interface CredentialRepresentation {
  createdDate?: number;
  credentialData?: Map<string, any>;
  id?: string;
  priority?: number;
  secretData?: string;
  temporary?: boolean;
  type?: string;
  userLabel?: string;
  value?: string;
}

export interface FederatedIdentityRepresentation {
  identityProvider?: string;
  userId?: string;
  userName?: string;
}

export interface KeycloakUserResponse {
  access?: Map<string, any>;
  attributes?: Map<string, any>;
  clientConsents?: UserConsentRepresentation[];
  clientRoles?: Map<string, any>;
  createdTimestamp?: number;
  credentials?: CredentialRepresentation[];
  disableableCredentialTypes?: string[];
  email?: string;
  emailVerified?: boolean;
  enabled?: boolean;
  federatedIdentities?: FederatedIdentityRepresentation[];
  federationLink?: string;
  firstName?: string;
  groups?: string[];
  id?: string;
  lastName?: string;
  notBefore?: number;
  origin?: string;
  realmRoles?: string[];
  requiredActions?: string[];
  self?: string;
  serviceAccountClientId?: string;
  username?: string;
}
