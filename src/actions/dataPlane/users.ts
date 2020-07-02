import * as PublicApi from '../../clients/iotc/dataPlane';

export interface Role {
    roleId: string;
    name?: string;
}

export type UserType = 'EmailUser' | 'ServicePrincipalUser';

export interface BaseUser {
    id: string;
    type: UserType;
    roles: Role[];
}

export interface User extends BaseUser {
    email: string;
    type: 'EmailUser';
}

export interface ServicePrincipal extends BaseUser {
    tenantId: string;
    objectId: string;
    type: 'ServicePrincipalUser';
}

export interface AddUser {
    id: string;
    type: 'EmailUser';
    email: string;
    roles: string[];
}

export async function list(): Promise<User[]> {
    const result = await PublicApi.sendRequest<{ value: User[] }>('/users', {
        method: 'GET',
    });

    return result.body.value;
}

export async function get(userId: string): Promise<User> {
    const result = await PublicApi.sendRequest<User>(`/users/${userId}`, {
        method: 'GET',
    });

    return result.body;
}

export async function addUser(user: AddUser) {
    const result = await PublicApi.sendRequest<User>(`/users/${user.id}`, {
        method: 'PUT',
        body: user,
    });
    return result.body;
}

export async function addUsersBatch(users: AddUser[]): Promise<User[]> {
    const usersAdded: User[] = [];
    for (const user of users) {
        const newUser = await PublicApi.sendRequest<User>(`/users/${user.id}`, {
            method: 'PUT',
            body: user,
        });
        usersAdded.push(newUser.body);
    }
    return usersAdded;
}

export async function addServicePrincipal(sp: ServicePrincipal) {
    const result = await PublicApi.sendRequest<User>(`/users/${sp.id}`, {
        method: 'PUT',
        body: sp,
    });
    return result.body;
}

export async function remove(id: string): Promise<void> {
    console.log('--------------------');
    console.log(id);
    await PublicApi.sendRequest<User>(`/users/${id}`, {
        method: 'DELETE',
    });
}
