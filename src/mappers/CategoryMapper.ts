import { Category } from "../model/Category";

export const fromDBToModel = (result: any): Category => {
    return {
        id: result.id,
        name: result.name,
        imageUrl: result.image_url,
        parentId: result.parent_id,
        createdAt: new Date(result.created_at),
        updatedAt: new Date(result.updated_at),
        createdBy: result.created_by,
        updatedBy: result.updated_by
    };
}

export const fromDBToModelList = (result: []): Category[] => {
    return result.map(item => fromDBToModel(item));
}