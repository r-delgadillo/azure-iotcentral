## Running the example

To run the example you must provide the service principal credentials in a
'user-config.json' file (Reference 'User Config' section) at the root of the
project. Alternatively, you can change the login type from Service Principal to
an Interactive login by changing 'Authentication.SignInTypes.ServicePrincipal'
to 'Authentication.SignInTypes.Interactive' in file './src/start.ts'.

```
    await Authentication.login(Authentication.SignInTypes.ServicePrincipal);

    or

    await Authentication.login(Authentication.SignInTypes.Interactive);
```

## Service Principal

To create a service principal, follow the
[Azure AD guide to create a Application Service Principal](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#create-an-active-directory-application).
The application type should be Web app / API and the sign-on URL value is
irrelevant (you can set any value).

## User Config

In order to run this project you must create a 'user-config.json' file in the
root of the project containing the following information:

```json
{
    "resourceGroupName": "<resourceGroupName>",
    "subscriptionId": "<subscriptionId>",
    "ServicePrincipal": {
        "clientId": "<clientId>",
        "tenantId": "<tenantId>",
        "secret": "<secret>"
    }
}
```

## IoT Central Application templates

A list of application templates that can be created with the application can be
found
[here](https://docs.microsoft.com/en-us/azure/iot-central/core/howto-manage-iot-central-from-cli#create-an-application).
