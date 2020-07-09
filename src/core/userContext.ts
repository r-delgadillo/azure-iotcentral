interface UserContext {
    resourceGroupName: string;
    subscriptionId: string;
    ServicePrincipal: {
        clientId: string;
        tenantId: string;
        secret: string;
    };
}

export default require('../../user-config.json') as UserContext;
