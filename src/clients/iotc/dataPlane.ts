import { Authentication } from '../';
import * as Context from '../../core/context';
import * as HttpClient from '../http';

let url = `https://${Context.subdomain}.${Context.envDomain}.com/api/preview`;
export async function sendRequest<T>(
    path: string,
    options: { method: string; body?: any },
    subdomain?: string
): Promise<HttpClient.RequestResponse<T>> {
    const token = await Authentication.getAccessToken(
        Authentication.Resource.iotCentral
    );

    const result = (await HttpClient.sendRequest(`${url}${path}`, {
        method: options.method,
        headers: {
            Accept: 'application/json',
            Authorization: getAuthorizationHeader(
                token.type,
                token.accessToken
            ),
        },
        body: options.body,
    })) as any;

    if (result && result.body && result.body.error) {
        throw new Error(JSON.stringify(result.body['error']));
    }

    return result as any;
}

export function setTargetApp(subdomain: string): void {
    url = `https://${subdomain}.${Context.envDomain}.com/api/preview`;
}

function getAuthorizationHeader(type: string, accessToken: string): string {
    return `${type} ${accessToken}`;
}
