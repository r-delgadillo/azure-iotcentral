import * as msRestNodeAuth from '@azure/ms-rest-nodeauth';
import * as Constants from '../core/constants';
import * as Context from '../core/context';

export enum SignInTypes {
    ServicePrincipal = 'ServicePrincipal',
}

export enum TokenAudience {
    azureManagement = 'https://management.azure.com',
    iotCentral = 'https://apps.azureiotcentral-ppe.com',
}
let iotcToken: msRestNodeAuth.ApplicationTokenCredentials;
let azureManagementToken: msRestNodeAuth.ApplicationTokenCredentials;

export async function signIn(type: SignInTypes) {
    switch (type) {
        case SignInTypes.ServicePrincipal:
            azureManagementToken = await loginWithServicePrincipalSecret(
                Context.clientId,
                Context.secret,
                Context.tenantId,
                {
                    tokenAudience: TokenAudience.azureManagement,
                }
            );
            iotcToken = await loginWithServicePrincipalSecret(
                Context.clientId,
                Context.secret,
                Context.tenantId,
                {
                    tokenAudience: TokenAudience.iotCentral,
                }
            );
            break;
    }
}

export async function loginWithServicePrincipalSecret(
    clientId: string,
    secret: string,
    tenantId: string,
    options: msRestNodeAuth.AzureTokenCredentialsOptions = {
        tokenAudience: 'https://management.azure.com',
    }
): Promise<msRestNodeAuth.ApplicationTokenCredentials> {
    const creds: any = await msRestNodeAuth.loginWithServicePrincipalSecret(
        clientId,
        secret,
        tenantId,
        {
            tokenAudience: options.tokenAudience,
            environment: Constants.AzureEnvironments.dogfood,
        }
    );

    return creds;
}

export async function getAccessToken(
    audience: TokenAudience
): Promise<{ accessToken: string; type: string }> {
    const result = {
        accessToken: '',
        type: '',
    };
    let creds;

    switch (audience) {
        case TokenAudience.azureManagement:
            creds = await getCreds(TokenAudience.azureManagement).getToken();
            result.accessToken = creds.accessToken;
            result.type = creds.tokenType;
            break;
        case TokenAudience.iotCentral:
            creds = await getCreds(TokenAudience.iotCentral).getToken();
            result.accessToken = creds.accessToken;
            result.type = creds.tokenType;
            break;
        default:
            throw new Error('Token audience not supported');
    }

    return result;
}

export function getCreds(
    resource: TokenAudience
): msRestNodeAuth.ApplicationTokenCredentials {
    switch (resource) {
        case TokenAudience.azureManagement:
            return azureManagementToken;
        case TokenAudience.iotCentral:
            return iotcToken;
    }
}
