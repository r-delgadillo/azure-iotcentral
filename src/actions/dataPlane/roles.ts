import * as PublicApi from '../../clients/iotc/dataPlane';

type Role = {
    id: string;
    displayName?: string;
};

export async function list(): Promise<Role[]> {
    const result = await PublicApi.sendRequest<{ value: Role[] }>('/roles', {
        method: 'GET',
    });

    return result.body.value;
}

export async function get(roleId: string): Promise<Role> {
    const result = await PublicApi.sendRequest<Role>(`/roles/${roleId}`, {
        method: 'GET',
    });

    return result.body;
}
