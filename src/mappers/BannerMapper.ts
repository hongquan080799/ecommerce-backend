import { Banner } from "../model/Banner";

export const fromDBToModel = (result: any): Banner => {
    return {
        id: result.id,
        name: result.name,
        imageUrl: result.image_url,
        redirectUrl: result.redirect_url,
        createdAt: new Date(result.created_at),
        updatedAt: new Date(result.updated_at),
        createdBy: result.created_by,
        updatedBy: result.updated_by
    };
}

export const fromDBToModelList = (result: []): Banner[] => {
    return result.map(item => fromDBToModel(item));
}