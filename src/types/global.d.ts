import {Grant} from 'keycloak-connect';


declare global{
    namespace Express {
        export interface Request {
            kauth: {
                grant: Grant
            }
        }
    }
}
