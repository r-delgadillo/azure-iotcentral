import * as uuid from 'uuid';

export function appendGuid(prefix: string): string {
    return `${prefix}-${uuid.v4().substring(0, 4)}`;
}
