import { Product } from "../model/Product";
import { PopularProductWithCat, ProductWithCat } from "../types/PopularProductWithCat";

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

export const fromDBPopularProductWithCat = (results: any) => {
    // Organize the data into categories with their subcategories
    const categories: PopularProductWithCat[] = [];

    results.forEach((row: any) => {
        const { categoryId, categoryName, categoryImageUrl, subCategoryId, subCategoryName, subCategoryImageUrl, productId, productName, productImages, productPrice, productDiscount, brandId, brandName } = row;

        // Find or create the category
        let category = categories.find(cat => cat.id === categoryId);
        if (!category) {
            category = {
                id: categoryId,
                name: categoryName,
                imageUrl: categoryImageUrl,
                subCategories: []
            };
            if(subCategoryId) {
                categories.push(category);
            }
        }

        // Find or create the subcategory
        let subCategory: any
        if (subCategoryId) {
            subCategory = category.subCategories.find(subCat => subCat.id === subCategoryId);
            if (!subCategory) {
                subCategory = {
                    id: subCategoryId,
                    name: subCategoryName,
                    imageUrl: subCategoryImageUrl,
                    products: []
                };
                category.subCategories.push(subCategory);
            }
        }

        // Add product to the subcategory
        if (productId && subCategory) {
            const productWithCat: ProductWithCat = {
                id: productId,
                name: productName,
                images: productImages ? productImages.split(',') : [],
                price: productPrice,
                discount: productDiscount,
                brand: {
                    id: brandId,
                    name: brandName
                }
            };
            subCategory.products.push(productWithCat);
        }
    });
    return categories;
}