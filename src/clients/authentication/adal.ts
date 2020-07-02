import * as adal from 'adal-node';

const { promisify } = require('util');
export class Adal {
    public ac: adal.AuthenticationContext;
    public tokenCache = new adal.MemoryCache();

    public acquireUserCode: any;
    public acquireTokenWithClientCredentials: any;

    public acquireTokenWithDeviceCode: any;
    public acquireTokenWithRefreshToken: any;

    constructor(tenantId: string) {
        const authority = `https://login.microsoftonline.com/${tenantId}/`;
        this.ac = new adal.AuthenticationContext(
            authority,
            true,
            this.tokenCache
        );
        this.acquireUserCode = promisify(this.ac.acquireUserCode.bind(this.ac));
        this.acquireTokenWithClientCredentials = promisify(
            this.ac.acquireTokenWithClientCredentials.bind(this.ac)
        ) as (
            resource: string,
            clientId: string,
            sercret: string
        ) => Promise<adal.TokenResponse>;
        this.acquireTokenWithDeviceCode = promisify(
            this.ac.acquireTokenWithDeviceCode.bind(this.ac)
        );
        this.acquireTokenWithRefreshToken = promisify(
            this.ac.acquireTokenWithRefreshToken.bind(this.ac)
        ) as (
            refToken: string,
            clientId: string,
            resource: string
        ) => Promise<adal.TokenResponse>;
    }
}
