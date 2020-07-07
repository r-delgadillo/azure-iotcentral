import * as Constants from '../../core/constants';
import * as Auth from './authentication';

export async function signIn() {
    const adal = Auth.getClient();
    const userCode = await adal.acquireUserCode(
        Auth.Resource.iotCentral,
        Constants.iotcClientId,
        'en-us'
    );

    console.log(userCode.message);
    console.log('Waiting for credentials...');

    const iotcToken = await adal.acquireTokenWithDeviceCode(
        Auth.Resource.iotCentral,
        Constants.iotcClientId,
        userCode
    );
    const armToken = await adal.acquireTokenWithRefreshToken(
        iotcToken.refreshToken!,
        Constants.iotcClientId,
        Auth.Resource.azureManagement
    );
    adal.addCreds([armToken]);
}
