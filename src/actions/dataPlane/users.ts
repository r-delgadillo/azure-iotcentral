import * as PublicApi from '../../clients/iotc/dataPlane';

export type Principal = User | ServicePrincipal;

export type UserType = 'EmailUser' | 'ServicePrincipalUser';

export interface Role {
    role: string;
    name?: string;
}

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

/** Lists the available users that can access the application. */
export async function list(): Promise<Principal[]> {
    const result = await PublicApi.sendRequest<{ value: User[] }>('/users', {
        method: 'GET',
    });

    return result.body.value;
}

/** Get a specific user. */
export async function get(userId: string): Promise<User> {
    const result = await PublicApi.sendRequest<User>(`/users/${userId}`, {
        method: 'GET',
    });

    return result.body;
}

/** Add a user by email or service principal */
export async function addUser(user: Principal) {
    const result = await PublicApi.sendRequest<User>(`/users/${user.id}`, {
        method: 'PUT',
        body: user,
    });
    return result.body;
}

/** Batch add a user by email and service principal. */
export async function addUsersBatch(users: Principal[]): Promise<Principal[]> {
    const usersAdded: Principal[] = [];
    for (const user of users) {
        const newUser = await PublicApi.sendRequest<Principal>(
            `/users/${user.id}`,
            {
                method: 'PUT',
                body: user,
            }
        );
        usersAdded.push(newUser.body);
    }
    return usersAdded;
}

/** Remove a user from the application. */
export async function remove(id: string): Promise<void> {
    await PublicApi.sendRequest<User>(`/users/${id}`, {
        method: 'DELETE',
    });
}
