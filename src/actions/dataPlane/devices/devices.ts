import * as PublicApi from '../../../clients/iotc/dataPlane';

interface DeviceResult {
    id: string;
    etag: string;
    displayName: string;
    description: string;
    instanceOf: string;
    simulated: boolean;
    approved: boolean;
    provisioned: boolean;
}

interface Device {
    instanceOf: string;
    displayName: string;
    simulated: boolean;
}

export async function list() {
    return (
        await PublicApi.sendRequest<{ value: DeviceResult[] }>('/devices', {
            method: 'GET',
        })
    ).body.value;
}

export async function get(deviceId: string): Promise<DeviceResult> {
    return (
        await PublicApi.sendRequest<DeviceResult>(`/devices/${deviceId}`, {
            method: 'GET',
        })
    ).body;
}

export async function add(deviceId: string, device: Device) {
    return (
        await PublicApi.sendRequest(`/devices/${deviceId}`, {
            method: 'PUT',
            body: device,
        })
    ).body;
}

export async function remove(deviceId: string) {
    await PublicApi.sendRequest(`/devices/${deviceId}`, {
        method: 'DELETE',
    });
}
