import * as uuid from 'uuid';

import DeviceModelBuilder, {
    CapabilityType,
    SemanticType,
} from '../helpers/deviceBuilder/deviceModel';

import * as Actions from '../actions';
import { IoTCentral } from '../clients';

const resourceGroupName = 'IOTC';
const resourceName = `resource-name-${uuid.v4().substring(0, 4)}`;
const subdomain = `resource-subdomain-${uuid.v4().substring(0, 4)}`;
const template = 'iotc-pnp-preview';
const pricingTier = 'ST1';
const location = 'United States';
// const users: Actions.Users.AddUser[] = [
const users: any[] = [
    // {
    //     id: 'rodelga0',
    //     email: 'rodelga@microsoft.com',
    //     type: 'EmailUser',
    //     roles: [{ role: 'ca310b8d-2f4a-44e0-a36e-957c202cd8d4' }],
    //     // roles: ['ca310b8d-2f4a-44e0-a36e-957c202cd8d4'],
    // },
];

export async function execute() {
    console.info('Creating application...');
    // Create a new application
    const app = await Actions.Apps.create(resourceGroupName, resourceName, {
        displayName: resourceName,
        subdomain,
        template,
        location,
        sku: {
            name: pricingTier,
        },
    });
    console.info('Application Details: \n', app, '\n \n');

    // Set the target app for the data plane operations
    IoTCentral.DataPlane.setTargetApp(subdomain);

    // Add users
    if (false) {
        await Actions.Users.addUsersBatch(users);
    }
    // Create a device template
    const deviceTemplate = await Actions.DeviceTemplates.add(
        'rodelgaDmId0',
        createDeviceModel()
    );
    console.info('Device Template Details: \n', deviceTemplate, '\n \n');

    // Create a device
    await Actions.Devices.add('rodelgaDeviceId', {
        instanceOf: deviceTemplate.id,
        displayName: 'Rodelga Device',
        simulated: true,
    });
}

function createDeviceModel() {
    const builder = new DeviceModelBuilder(
        'Rodelga Device Model',
        'Rodelga DCM'
    );
    builder.aadCapability(
        'Telemetry',
        CapabilityType.Telemetry,
        SemanticType.None,
        {
            schema: 'double',
        }
    );

    builder.aadCapability(
        'Property',
        CapabilityType.Property,
        SemanticType.None,
        {
            schema: 'string',
        }
    );

    return builder.getModel();
}
