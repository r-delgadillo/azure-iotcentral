import { Authentication } from '../';
import * as Constants from '../../core/constants';
import * as HttpClient from '../http';

let publicApiUrl: string;

/** Execute http request to the applications public API. */
export async function sendRequest<T>(
    path: string,
    options: { method: string; body?: any }
): Promise<HttpClient.RequestResponse<T>> {
    const token = await Authentication.getAccessToken(
        Authentication.Resource.iotCentral
    );

    return HttpClient.sendRequest<T>(`${publicApiUrl}${path}`, {
        method: options.method,
        headers: {
            Accept: 'application/json',
            Authorization: formatToken(token.type, token.accessToken),
        },
        body: options.body,
    });
}

/** Execute to change the target app */
export function setTargetApp(subdomain: string): void {
    publicApiUrl = `https://${subdomain}.${Constants.IotCentralConfig.domain}.com/api/preview`;
}

/** Composes the token string for the Authentication header */
function formatToken(type: string, accessToken: string): string {
    return `${type} ${accessToken}`;
}
