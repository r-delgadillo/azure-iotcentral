import { Adal } from './adal';
import * as Interactive from './interactive';
import * as ServicePrincipal from './servicePrincipal';

export enum Resource {
    azureManagement = 'https://management.azure.com',
    iotCentral = 'https://apps.azureiotcentral-ppe.com',
}
export enum SignInTypes {
    ServicePrincipal = 'ServicePrincipal',
    Interactive = 'Interactive',
}

let authContext: Adal;
export function getClient(tenant: string = 'Common'): Adal {
    if (!authContext) {
        authContext = new Adal(tenant);
    }

    return authContext;
}

async function login(type: SignInTypes) {
    switch (type) {
        case SignInTypes.ServicePrincipal:
            await ServicePrincipal.signIn();
            break;
        case SignInTypes.Interactive:
            await Interactive.signIn();
            break;
    }
}

login(SignInTypes.ServicePrincipal);
