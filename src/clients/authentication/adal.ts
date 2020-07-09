import * as adal from 'adal-node';

const { promisify } = require('util');

export class Adal {
    public authContext: adal.AuthenticationContext;
    public tokenCache: adal.MemoryCache;
    public tenantId: string;

    /** Adal wrapper function to remove function callbacks */
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
        const loginAuthority = `https://login.microsoftonline.com/${tenantId}/`;

        /** Token cache wrappers */
        this.tokenCache = new adal.MemoryCache();
        this.getCreds = promisify(this.tokenCache.find.bind(this.tokenCache));
        this.addCreds = promisify(this.tokenCache.add.bind(this.tokenCache));

        /** Authentication context wrappers */
        this.authContext = new adal.AuthenticationContext(
            loginAuthority,
            true,
            this.tokenCache
        );
        this.acquireUserCode = promisify(
            this.authContext.acquireUserCode.bind(this.authContext)
        );
        this.acquireTokenWithClientCredentials = promisify(
            this.authContext.acquireTokenWithClientCredentials.bind(
                this.authContext
            )
        );
        this.acquireTokenWithDeviceCode = promisify(
            this.authContext.acquireTokenWithDeviceCode.bind(this.authContext)
        );
        this.acquireTokenWithRefreshToken = promisify(
            this.authContext.acquireTokenWithRefreshToken.bind(this.authContext)
        );
    }
}
