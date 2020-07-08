import * as Actions from '../actions';
import { IoTCentral } from '../clients';
import * as Constants from '../core/constants';
import * as Utils from '../helpers/utils';

const resourceGroupName = 'IOTC';
const resourceName = Utils.appendGuid('resource-name');
const subdomain = Utils.appendGuid('resource-subdomain');
const location = Constants.IotCentralLocations.unitedStates;
const template = Constants.AppTemplates.pnp;
const users: any[] = [
    {
        id: 'testUser',
        email: 'testUser@email.com',
        type: 'EmailUser',
        roles: [{ role: 'ca310b8d-2f4a-44e0-a36e-957c202cd8d4' }],
    },
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
            name: Constants.PricingTier.ST1,
        },
    });
    console.info('Application Details: \n', app, '\n \n');

    // Set the target app for the data plane operations
    IoTCentral.DataPlane.setTargetApp(subdomain);

    // Add users
    await Actions.Users.addUsersBatch(users);
}
