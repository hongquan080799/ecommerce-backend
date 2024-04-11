import { Product } from "../model/Product";

export const fromDBToModel = (result: any): Product => {
    return {
        id: result.id,
        name: result.name,
        images: JSON.parse(result.images),
        brandId: result.brand_id,
        categoryId: result.category_id,
        description: result.description,
        technicalInfo: result.technical_info,
        productInfo: result.product_info,
        price: result.price,
        discount: result.discount,
        quantity: result.quantity,
        status: result.status,
        createdAt: new Date(result.created_at),
        updatedAt: new Date(result.updated_at),
        createdBy: result.created_by,
        updatedBy: result.updated_by,
        brandName: result.brand_name,
        categoryName: result.category_name
    };
}

export const fromDBToModelList = (result: []): Product[] => {
    return result.map(item => fromDBToModel(item));
}