import * as Auth from './authentication';

export async function signIn() {
    const adal = Auth.getClient();

    const clientId = '04b07795-8ddb-461a-bbee-02f9e1bf7b46';
    const userCode = await adal.acquireUserCode(
        Auth.Resource.iotCentral,
        clientId,
        'en-us'
    );

    console.log(userCode.message);
    console.log('Waiting for credentials...');

    const armToken = await adal.acquireTokenWithDeviceCode(
        Auth.Resource.iotCentral,
        clientId,
        userCode
    );
    console.log('******************1');
    console.log(armToken);
    console.log('******************2');
    const token2 = await adal.acquireTokenWithRefreshToken(
        armToken.refreshToken!,
        clientId,
        Auth.Resource.azureManagement
    );
    console.log('******************3');
    console.log(token2);
    console.log('******************4');
    adal.addCreds([token2]);
    console.log(adal.tokenCache);
}

// async function getARMObject(clientId: string, token: adal.TokenResponse) {
//     const adal = Auth.getClient();
//     const creds = new msRestNodeAuth.DeviceTokenCredentials(
//         clientId,
//         'common',
//         token.userId,
//         Auth.Resource.azureManagement,
//         Environment.AzureCloud,
//         adal.tokenCache
//     );

//     const armClient = new IotCentralClient(creds, context.subscriptionId);
//     if (false) {
//         console.log(armClient);
//     }
//     // console.log(
//     //     JSON.stringify(await armClient.apps.listBySubscription(), null, 2)
//     // );
// }

// async function getIoTCentralObject(
//     clientId: string,
//     token: adal.TokenResponse
// ) {
//     const adal = Auth.getClient();
//     const creds = new msRestNodeAuth.DeviceTokenCredentials(
//         clientId,
//         'common',
//         token.userId,
//         Auth.Resource.iotCentral,
//         Environment.AzureCloud,
//         adal.tokenCache
//     );
//     console.log((await creds.getToken()).accessToken);
// }
