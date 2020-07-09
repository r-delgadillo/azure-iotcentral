export const IotCentralConfig = {
    clientId: '04b07795-8ddb-461a-bbee-02f9e1bf7b46',
    domain: 'azureiotcentral',
    audience: 'https://apps.azureiotcentral.com',
};

export const enum PricingTier {
    ST1 = 'ST1',
    ST2 = 'ST2',
}

// List of available application templates can be found here:
// https://docs.microsoft.com/en-us/azure/iot-central/core/howto-manage-iot-central-from-cli#create-an-application
export const enum AppTemplates {
    pnp = 'iotc-pnp-preview',
}

export const enum IotCentralLocations {
    unitedStates = 'United States',
    europe = 'Europe',
    asiaPacific = 'Asia Pacific',
    australia = 'Australia',
    unitedKingdom = 'UK',
    japan = 'Japan',
}
