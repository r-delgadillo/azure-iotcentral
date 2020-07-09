import * as uuid from 'uuid';

/** Append guid to end of provided name */
export function appendGuid(prefix: string): string {
    return `${prefix}-${uuid.v4().substring(0, 4)}`;
}
