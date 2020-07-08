import * as adal from 'adal-node';

const { promisify } = require('util');
export class Adal {
    public ac: adal.AuthenticationContext;
    public tokenCache: adal.MemoryCache;
    public tenantId: string;
    public acquireUserCode: (
        resource: string,
        clientId: string,
        language: string
    ) => Promise<adal.UserCodeInfo>;
    public acquireTokenWithClientCredentials: (
        resource: string,
        clientId: string,
        sercret: string
    ) => Promise<adal.TokenResponse>;
    public acquireTokenWithDeviceCode: (
        resource: string,
        clientId: string,
        userCodeInfo: adal.UserCodeInfo
    ) => Promise<adal.TokenResponse>;
    public acquireTokenWithRefreshToken: (
        refreshToken: string,
        clientId: string,
        resource: string
    ) => Promise<adal.TokenResponse>;

    public getCreds: (query: any) => Promise<adal.TokenResponse[]>;
    public addCreds: (token: adal.TokenResponse[]) => Promise<void>;

    constructor(tenantId: string) {
        this.tenantId = tenantId;
        const authority = `https://login.microsoftonline.com/${tenantId}/`;
        this.tokenCache = new adal.MemoryCache();
        this.getCreds = promisify(this.tokenCache.find.bind(this.tokenCache));
        this.addCreds = promisify(this.tokenCache.add.bind(this.tokenCache));

        this.ac = new adal.AuthenticationContext(
            authority,
            true,
            this.tokenCache
        );
        this.acquireUserCode = promisify(this.ac.acquireUserCode.bind(this.ac));
        this.acquireTokenWithClientCredentials = promisify(
            this.ac.acquireTokenWithClientCredentials.bind(this.ac)
        );
        this.acquireTokenWithDeviceCode = promisify(
            this.ac.acquireTokenWithDeviceCode.bind(this.ac)
        );
        this.acquireTokenWithRefreshToken = promisify(
            this.ac.acquireTokenWithRefreshToken.bind(this.ac)
        );
    }
}
