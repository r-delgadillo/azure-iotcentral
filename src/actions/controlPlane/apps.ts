import { IotCentralModels } from '@azure/arm-iotcentral';

import { IoTCentral } from '../../clients';

type Application = IotCentralModels.App;
type ApplicationCreateOrUpdateResponse = IotCentralModels.AppsCreateOrUpdateResponse;

/** Creates a new Iot Central application */
export async function create(
    resourceGroup: string,
    resourceName: string,
    app: Application
): Promise<ApplicationCreateOrUpdateResponse> {
    const client = await IoTCentral.ControlPlane.getClient();
    return client.apps.createOrUpdate(resourceGroup, resourceName, app);
}

/** Lists the available IoT Central applications in the
 * specified resource group.
 */
export async function listAppByResourceGroup(
    resourceGroupName: string
): Promise<Application[]> {
    const client = await IoTCentral.ControlPlane.getClient();

    return await client.apps.listByResourceGroup(resourceGroupName);
}
