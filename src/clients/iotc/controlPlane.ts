import { IotCentralClient } from '@azure/arm-iotcentral';
import * as msRest from '@azure/ms-rest-js';

import { Authentication } from '../';
import * as Context from '../../core/context';

let iotcClient: IotCentralClient;
export async function getClient(): Promise<IotCentralClient> {
    if (iotcClient) {
        return iotcClient;
    }
    const token = await Authentication.getAccessToken(
        Authentication.Resource.azureManagement
    );
    const temp = new msRest.TokenCredentials(token.accessToken, token.type);

    iotcClient = new IotCentralClient(temp, Context.subscriptionId);
    return iotcClient;
}
