import * as PublicApi from '../../clients/iotc/dataPlane';

type Role = {
    id: string;
    displayName?: string;
};

/** Lists the available roles that a user can be assigned. */
export async function list(): Promise<Role[]> {
    const result = await PublicApi.sendRequest<{ value: Role[] }>('/roles', {
        method: 'GET',
    });

    return result.body.value;
}

/** Gets a specific role information. */
export async function get(roleId: string): Promise<Role> {
    const result = await PublicApi.sendRequest<Role>(`/roles/${roleId}`, {
        method: 'GET',
    });

    return result.body;
}
