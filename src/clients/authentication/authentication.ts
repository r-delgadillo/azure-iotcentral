import * as adal from 'adal-node';

import { Adal } from './adal';
import * as Interactive from './interactive';
import * as ServicePrincipal from './servicePrincipal';

export enum Resource {
    azureManagement = 'https://management.azure.com',
    iotCentral = 'https://apps.azureiotcentral.com',
}
export enum SignInTypes {
    ServicePrincipal = 'ServicePrincipal',
    Interactive = 'Interactive',
}

let authContext: Adal;
export function getClient(tenant: string = 'common'): Adal {
    if (!authContext) {
        authContext = new Adal(tenant);
    }

    return authContext;
}

export async function login(
    type: SignInTypes = SignInTypes.Interactive
): Promise<void> {
    switch (type) {
        case SignInTypes.ServicePrincipal:
            await ServicePrincipal.signIn();
            break;
        case SignInTypes.Interactive:
            await Interactive.signIn();
            break;
    }
}

export async function getToken(
    resource: Resource
): Promise<adal.TokenResponse> {
    const client = await getClient();
    const tokens = await client.getCreds({ resource });

    return tokens[0];
}

export async function getAccessToken(
    resource: Resource
): Promise<{ type: string; accessToken: string }> {
    const token = await getToken(resource);
    return {
        type: token.tokenType,
        accessToken: token.accessToken,
    };
}
