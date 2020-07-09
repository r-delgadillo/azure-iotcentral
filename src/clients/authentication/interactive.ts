import * as Constants from '../../core/constants';
import * as Auth from './authentication';

/** Get the access tokens using interactive login */
export async function getAccessTokens() {
    const adal = Auth.getClient();
    const userCode = await adal.acquireUserCode(
        Auth.Resource.iotCentral,
        Constants.IotCentralConfig.clientId,
        'en-us'
    );

    console.log(userCode.message);
    console.log('Waiting for credentials...');

    // Get Azure IoT Central access token using login credentials
    const iotcToken = await adal.acquireTokenWithDeviceCode(
        Auth.Resource.iotCentral,
        Constants.IotCentralConfig.clientId,
        userCode
    );

    // Get Azure ARM access token using refresh token
    const armToken = await adal.acquireTokenWithRefreshToken(
        iotcToken.refreshToken!,
        Constants.IotCentralConfig.clientId,
        Auth.Resource.azureManagement
    );

    // Add credential to cache to be consumed by clients
    adal.addCreds([armToken]);
}
