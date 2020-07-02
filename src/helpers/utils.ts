import * as uuid from 'uuid';

function toCamelCase(inputs: string[]): string {
    let result = '';

    for (let i = 0, len = inputs.length; i < len; i++) {
        const currentStr = inputs[i];
        let tempStr = currentStr.toLowerCase();

        if (i !== 0) {
            // convert first letter to upper case (the word is in lowercase)
            tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);
        }

        result += tempStr;
    }

    return result;
}

function toWords(input: string) {
    const regex = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;
    return input.match(regex);
}

export function toCamelCaseString(input: string): string {
    const words = toWords(input);
    return toCamelCase(words as any);
}

export function getGuid(length?: number): string {
    return uuid.v4().substring(0, length || 3);
}
