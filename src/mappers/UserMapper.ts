import { User } from "../model/User";

export const fromDBToModel = (result: any): User => {
    return {
        id: result.id,
        username: result.username,
        password: result.password,
        firstName: result.first_name,
        lastName: result.last_name,
        email: result.email,
        address: result.address,
        phoneNumber: result.phone_number,
        avatar: result.avatar,
        role: {
            id: result.role_id,
            name: result.role_name,
        },
        active: result.active,
        createdAt: result.created_at,
        updatedAt: result.uupdated_at,
    };
}

export const fromDBToModelList = (result: []): User[] => {
    return result.map(item => fromDBToModel(item));
}