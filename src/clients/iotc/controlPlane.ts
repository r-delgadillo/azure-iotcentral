import { IotCentralClient } from '@azure/arm-iotcentral';
import * as msRest from '@azure/ms-rest-js';

import { Authentication } from '../';
import Context from '../../core/userContext';

/** IoT Central contorl plane client */
let iotcClient: IotCentralClient;
export async function getClient(): Promise<IotCentralClient> {
    if (iotcClient) {
        return iotcClient;
    }

    // Get ARM access token
    const token = await Authentication.getAccessToken(
        Authentication.Resource.azureManagement
    );

    // Create the Iot Central client
    iotcClient = new IotCentralClient(
        new msRest.TokenCredentials(token.accessToken, token.type),
        Context.subscriptionId
    );
    return iotcClient;
}
