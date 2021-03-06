import { IotCentralModels } from '@azure/arm-iotcentral';

import * as IotCentral from '../../clients/iotc/controlPlane';

/** Lists the available applications templates that can be created
 * during application creation.
 */
export async function list(): Promise<IotCentralModels.AppTemplate[]> {
    const client = await IotCentral.getClient();

    return await client.apps.listTemplates();
}
