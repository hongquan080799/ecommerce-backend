import { Role } from "../model/Role";

export const fromDBToModel = (result: any): Role => {
    return {
        id: result.id,
        name: result.name,
    };
}

export const fromDBToModelList = (result: []): Role[] => {
    return result.map(item => fromDBToModel(item));
}