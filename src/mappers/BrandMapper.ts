import { Brand } from "../model/Brand";

export const fromDBToModel = (result: any): Brand => {
    return {
        id: result.id,
        name: result.name,
        imageUrl: result.image_url,
        createdAt: new Date(result.created_at),
        updatedAt: new Date(result.updated_at),
        createdBy: result.created_by,
        updatedBy: result.updated_by
    };
}

export const fromDBToModelList = (result: []): Brand[] => {
    return result.map(item => fromDBToModel(item));
}