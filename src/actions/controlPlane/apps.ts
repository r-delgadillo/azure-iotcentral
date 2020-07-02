import { IotCentralModels } from '@azure/arm-iotcentral';

import { IoTCentral } from '../../clients';

type Application = IotCentralModels.App;
type ApplicationCreateOrUpdateResponse = IotCentralModels.AppsCreateOrUpdateResponse;

export async function create(
    resourceGroup: string,
    resourceName: string,
    app: Application
): Promise<ApplicationCreateOrUpdateResponse> {
    const client = await IoTCentral.ControlPlane.getClient();
    return client.apps.createOrUpdate(resourceGroup, resourceName, app);
}

export async function listAppByResourceGroup(resourceGroupName: string) {
    const client = await IoTCentral.ControlPlane.getClient();

    return await client.apps.listByResourceGroup(resourceGroupName);
}
