import { IncomingMessage } from 'http';
import * as request from 'request';

export type HttpOptions = request.CoreOptions;

export interface RequestOptions extends HttpOptions {}

export interface RequestResponse<T> extends IncomingMessage {
    body: T;
}

export async function sendRequest<TResponseBody>(
    url: string,
    requestOptions: RequestOptions
): Promise<RequestResponse<TResponseBody>> {
    return new Promise<RequestResponse<TResponseBody>>((resolve, reject) => {
        request(
            url,
            {
                json: true,
                ...requestOptions,
            },
            (err, res, body) => {
                if (err) {
                    return reject(err);
                }

                return resolve(res);
            }
        );
    });
}
