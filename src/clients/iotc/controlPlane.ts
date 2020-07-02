import { IotCentralClient } from '@azure/arm-iotcentral';

import * as Context from '../../core/context';
import * as Authentication from '../authentication';

let iotcClient: IotCentralClient;

export async function getClient(): Promise<IotCentralClient> {
    if (iotcClient) {
        return iotcClient;
    }

    const creds = await Authentication.getCreds(
        Authentication.TokenAudience.azureManagement
    );
    iotcClient = new IotCentralClient(creds, Context.subscriptionId);
    return iotcClient;
}
