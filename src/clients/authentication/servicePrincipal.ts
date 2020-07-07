import * as context from '../../core/context';
import * as Auth from './authentication';

export async function signIn() {
    const adal = Auth.getClient(context.tenantId);

    await adal.acquireTokenWithClientCredentials(
        Auth.Resource.azureManagement,
        context.clientId,
        context.secret
    );

    await adal.acquireTokenWithClientCredentials(
        Auth.Resource.iotCentral,
        context.clientId,
        context.secret
    );
}
