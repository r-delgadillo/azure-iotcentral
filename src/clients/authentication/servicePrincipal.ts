import Context from '../../core/userContext';
import * as Auth from './authentication';

/** Get the access tokens using service principal credentials */
export async function getAccessTokens() {
    const adal = Auth.getClient(Context.ServicePrincipal.tenantId);

    // Get Azure IoT Central token
    await adal.acquireTokenWithClientCredentials(
        Auth.Resource.azureManagement,
        Context.ServicePrincipal.clientId,
        Context.ServicePrincipal.secret
    );

    // Get Azure ARM token
    await adal.acquireTokenWithClientCredentials(
        Auth.Resource.iotCentral,
        Context.ServicePrincipal.clientId,
        Context.ServicePrincipal.secret
    );
}
