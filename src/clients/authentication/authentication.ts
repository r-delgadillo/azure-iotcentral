import * as adal from 'adal-node';

import { Adal } from './adal';
import * as Interactive from './interactive';
import * as ServicePrincipal from './servicePrincipal';

/** Token resource types */
export enum Resource {
    azureManagement = 'https://management.azure.com',
    iotCentral = 'https://apps.azureiotcentral.com',
}

/** Sign in using interactive login or service principal credentials */
export enum SignInTypes {
    ServicePrincipal = 'ServicePrincipal',
    Interactive = 'Interactive',
}

/** Adal authentication client */
let authContext: Adal;

/** Get the adal authentication client */
export function getClient(tenant: string = 'common'): Adal {
    if (!authContext) {
        authContext = new Adal(tenant);
    }

    return authContext;
}

/** Logs in using interactive or service principal credentials
 * stores the tokens in Adal.tokenCache property for later use.
 */
export async function login(
    type: SignInTypes = SignInTypes.Interactive
): Promise<void> {
    switch (type) {
        case SignInTypes.ServicePrincipal:
            await ServicePrincipal.getAccessTokens();
            break;
        case SignInTypes.Interactive:
            await Interactive.getAccessTokens();
            break;
    }
}

/** Get the token object for the specified resource */
export async function getToken(
    resource: Resource
): Promise<adal.TokenResponse> {
    const client = await getClient();
    const tokens = await client.getCreds({ resource });

    return tokens[0];
}

/** Get the raw token for the specified resource */
export async function getAccessToken(
    resource: Resource
): Promise<{ type: string; accessToken: string }> {
    const token = await getToken(resource);
    return {
        type: token.tokenType,
        accessToken: token.accessToken,
    };
}
