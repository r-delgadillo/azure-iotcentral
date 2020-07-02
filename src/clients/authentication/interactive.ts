import { IotCentralClient } from '@azure/arm-iotcentral';
import { Environment } from '@azure/ms-rest-azure-env';
import * as msRestNodeAuth from '@azure/ms-rest-nodeauth';

import * as adal from 'adal-node';

import * as context from '../../core/context';
import * as Auth from './testAuth';

export async function signIn() {
    const adal = Auth.getClient();
    try {
        const clientId = '04b07795-8ddb-461a-bbee-02f9e1bf7b46';
        const userCode = await adal.acquireUserCode(
            Auth.Resource.iotCentral,
            clientId,
            'en-us'
        );

        console.log(userCode.message);
        console.log('Waiting for credentials...');

        const publicApiToken = (await adal.acquireTokenWithDeviceCode(
            Auth.Resource.iotCentral,
            clientId,
            userCode
        )) as adal.TokenResponse;
        const armToken = await adal.acquireTokenWithRefreshToken(
            publicApiToken.refreshToken!,
            clientId,
            Auth.Resource.azureManagement
        );

        await getARMObject(clientId, armToken);
        await getIoTCentralObject(clientId, publicApiToken);
    } catch (e) {
        console.error(e);
    }
}

async function getARMObject(clientId: string, token: adal.TokenResponse) {
    const adal = Auth.getClient();
    const creds = new msRestNodeAuth.DeviceTokenCredentials(
        clientId,
        'common',
        token.userId,
        Auth.Resource.azureManagement,
        Environment.AzureCloud,
        adal.tokenCache
    );
    const armClient = new IotCentralClient(creds, context.subscriptionId);
    if (false) {
        console.log(armClient);
    }
    // console.log(
    //     JSON.stringify(await armClient.apps.listBySubscription(), null, 2)
    // );
}

async function getIoTCentralObject(
    clientId: string,
    token: adal.TokenResponse
) {
    const adal = Auth.getClient();
    const creds = new msRestNodeAuth.DeviceTokenCredentials(
        clientId,
        'common',
        token.userId,
        Auth.Resource.iotCentral,
        Environment.AzureCloud,
        adal.tokenCache
    );
    console.log((await creds.getToken()).accessToken);
}
