// import * as fs from 'fs';

import * as PublicApi from '../../clients/iotc/dataPlane';

interface DeviceTemplate {
    id: string;
    etag: string;
    types: string[];
    displayName: string;
    description: string;
    capabilityModel: CapabilityModel;
    solutionModel: SolutionModel;
}

interface JsonLd {
    '@context': string[];
    '@id': string;
    '@type': string[];
}

interface CapabilityModel extends JsonLd {
    displayName: string;
    description: string;
    comment: string;
    contents: CapabilityModelContents[];
    implements: CapabilityModelImplements[];
}

interface CapabilityModelImplements extends JsonLd {
    displayName: string;
    description: string;
    comment: string;
    name: string;
}
interface CapabilityModelContents extends JsonLd {
    displayName: string;
    description: string;
    comment: string;
    name: string;
    request: CapabilityModelRequest;
    response: CapabilityModelResponse;
}

interface CapabilityModelRequest extends JsonLd {
    displayName: string;
    description: string;
    comment: string;
    name: string;
}

interface CapabilityModelResponse extends JsonLd {
    displayName: string;
    description: string;
    comment: string;
    name: string;
}

interface SolutionModel extends JsonLd {
    displayName: string;
    description: string;
    comment: string;
    cloudProperties: CloudProperties[];
    initialValues: InitialValues[];
    overries: Override[];
}

interface Override extends JsonLd {
    displayName: string;
    description: string;
    comment: string;
    capability: CapabilityReference;
    displayUnit: string;
    semanticType: string;
    unit: string;
    valueDetail: ValueDetail;
}

interface ValueDetail extends JsonLd {
    displayName: string;
    description: string;
    comment: string;
    falseName: string;
    trueName: string;
    hideTime: boolean;
    severity: Severity;
    decimalPlaces: number;
    maxValue: number;
    minValue: number;
    maxLength: number;
    minLength: number;
    trimWhitespace: boolean;
}

enum Severity {
    error = 'error',
    warning = 'warning',
    information = 'information',
}

interface CloudProperties extends JsonLd {
    displayName: string;
    description: string;
    comment: string;
    name: string;
}

interface InitialValues extends JsonLd {
    displayName: string;
    description: string;
    comment: string;
    capability: CapabilityReference;
    value: {
        description: string;
    };
}

interface CapabilityReference extends JsonLd {
    displayName: string;
    description: string;
    comment: string;
    component: string;
    reference: string;
}

export async function list(): Promise<DeviceTemplate[]> {
    const result = await PublicApi.sendRequest<{ value: DeviceTemplate[] }>(
        '/deviceTemplates',
        {
            method: 'GET',
        }
    );

    return result.body.value;
}

export async function get(id: string): Promise<DeviceTemplate> {
    const result = await PublicApi.sendRequest<DeviceTemplate>(
        `/deviceTemplates/${id}`,
        {
            method: 'GET',
        }
    );

    return result.body;
}

export async function getDevices(id: string): Promise<DeviceTemplate> {
    const result = await PublicApi.sendRequest<DeviceTemplate>(
        `/deviceTemplates/${id}/devices`,
        {
            method: 'GET',
        }
    );

    return result.body;
}

export async function add(
    templateId: string,
    deviceTemplate?: any
): Promise<DeviceTemplate> {
    const result = await PublicApi.sendRequest<DeviceTemplate>(
        `/deviceTemplates/${templateId}`,
        {
            method: 'PUT',
            body: deviceTemplate,
        }
    );

    return result.body;
}

export async function remove(templateId: string): Promise<void> {
    await PublicApi.sendRequest(`/deviceTemplates/${templateId}`, {
        method: 'DELETE',
    });
}
