/**
 * List of non-public Azure environments.
 */
export const AzureEnvironments = {
    dogfood: {
        name: 'AzureDogfood',
        portalUrl: 'https://windows.azure-test.net/',
        publishingProfileUrl:
            'https://windows.azure-test.net/publishsettings/index',
        managementEndpointUrl:
            'https://management-preview.core.windows-int.net/',
        resourceManagerEndpointUrl:
            'https://api-dogfood.resources.windows-int.net/',
        sqlManagementEndpointUrl: 'https://management.core.windows.net:8443/',
        sqlServerHostnameSuffix: '.database.windows.net',
        galleryEndpointUrl: 'https://df.gallery.azure-test.net/',
        activeDirectoryEndpointUrl: 'https://login.windows-ppe.net/',
        activeDirectoryResourceId: 'https://management.core.windows.net/',
        activeDirectoryGraphResourceId: 'https://graph.ppe.windows.net/',
        activeDirectoryGraphApiVersion: '2013-04-05',
        storageEndpointSuffix: '.core.windows.net',
        keyVaultDnsSuffix: '.vault.azure.net',
        azureDataLakeStoreFileSystemEndpointSuffix: 'azuredatalakestore.net',
        azureDataLakeAnalyticsCatalogAndJobEndpointSuffix:
            'azuredatalakeanalytics.net',
        validateAuthority: true,
    },
};
