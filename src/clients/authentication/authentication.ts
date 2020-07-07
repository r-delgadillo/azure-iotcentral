import * as adal from 'adal-node';

import { Environment } from '@azure/ms-rest-azure-env';
import * as msRestNodeAuth from '@azure/ms-rest-nodeauth';

// import * as context from '../../core/context';
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

export async function login(type: SignInTypes): Promise<void> {
    switch (type) {
        case SignInTypes.ServicePrincipal:
            await ServicePrincipal.signIn();
            break;
        case SignInTypes.Interactive:
            await Interactive.signIn();
            break;
    }
}

export async function getCredentials(
    resource: Resource
): Promise<adal.TokenResponse> {
    const client = await getClient();
    const result = await client.getCreds({ resource });
    return result[0];
}

export async function getAccessToken(
    resource: Resource
): Promise<{ type: string; accessToken: string }> {
    const client = await getClient();
    const result = await client.getCreds({ resource });
    const creds = result[0];
    console.log(creds);
    return {
        type: creds.tokenType,
        accessToken: creds.accessToken,
    };
}

export async function getArmObject(resource: Resource) {
    const client = await getClient();
    const clientId = '04b07795-8ddb-461a-bbee-02f9e1bf7b46';
    console.log(client.tenantId);
    // const creds = await getCredentials(resource);
    return new msRestNodeAuth.DeviceTokenCredentials(
        // clientId,
        clientId,
        client.tenantId,
        // creds.userId,
        undefined,
        resource,
        Environment.AzureCloud,
        client.tokenCache
    );
}
