import { executeQuery, executeWithParams } from "../config/MysqlConfig"
import { Product } from "../model/Product"
import * as productMapper from "../mappers/ProductMappper"
import { PopularProductWithCat } from "../types/PopularProductWithCat"
export const findAll = async (query: any) : Promise<Product[]> => {
    return new Promise<Product[]>(async (resolve, reject) => {
        try {
            const [result] = await executeQuery("select p.*, c.name as category_name, b.name as brand_name from product p left join category c on p.category_id = c.id left join brand b on p.brand_id = b.id ")
            if (result) {
                resolve(productMapper.fromDBToModelList(result as []))
            }
        } catch (err) {
            reject(err)
        }
    })
}

export const findById = async (id: number) : Promise<Product> => {
    return new Promise<Product>(async (resolve, reject) => {
        try {
            const [rows] = await executeWithParams("select p.*, c.name as category_name, b.name as brand_name from product p left join category c on p.category_id = c.id left join brand b on p.brand_id = b.id where p.id = ?", [id])
            if (rows && (rows as []).length > 0) {
                resolve(productMapper.fromDBToModel((rows as any)[0]))
            } else {
                reject(new Error("Could not find product with id: " + id))
            }
        } catch (err) {
            reject(err)
        }
    })
}

export const saveProduct = async (product: Product) : Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const [result] = await executeWithParams(
                "insert into product " +
                "(" +
                    "name, " + 
                    "description, " +
                    "technical_info, " +
                    "product_info, " +
                    "price, " +
                    "category_id, " +
                    "brand_id, " +
                    "images, " +
                    "status, " +
                    "quantity, " +
                    "discount " +
                ") " +
                "values(?,?,?,?,?,?,?,?,?,?,?)", 
                [
                    product.name, 
                    product.description, 
                    product.technicalInfo, 
                    product.productInfo,
                    product.price, 
                    product.categoryId, 
                    product.brandId, 
                    JSON.stringify(product.images), 
                    product.status,
                    product.quantity,
                    product.discount,
                ])
            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}

export const updateProduct = async (product: Product) : Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            // check if category already exists
            const [rows] = await executeWithParams("select * from product where id =?", [product.id])
            
            if (rows && (rows as []).length > 0) {
                const sql = 
                "UPDATE product " +
                "SET name = ?, description = ?, technical_info = ?, product_info = ?," +
                    "price = ?, category_id = ?, brand_id = ?, images = ?,"+
                    "status = ?, quantity = ?, discount = ? " +
                "WHERE id = ?"
                const [result] = await executeWithParams(sql, 
                    [
                        product.name, 
                        product.description, 
                        product.technicalInfo, 
                        product.productInfo,
                        product.price, 
                        product.categoryId, 
                        product.brandId, 
                        JSON.stringify(product.images), 
                        product.status,
                        product.quantity,
                        product.discount,
                        product.id,
                    ])
                resolve(result)
            } else {
                reject(new Error("Could not find product with id: " + product.id))
            }
        } catch (err) {
            reject(err)
        }
    })
}

export const deleteProduct = async (id: number) : Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const [result] = await executeWithParams("delete from product where id =?", [id])
            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}

export const getProductPopularsByCategory = async () : Promise<PopularProductWithCat[]> => {
    return new Promise<PopularProductWithCat[]>(async (resolve, reject) => {
        try {
            const query = `
            SELECT 
                c.id AS categoryId,
                c.name AS categoryName,
                c.image_url AS categoryImageUrl,
                s.id AS subCategoryId,
                s.name AS subCategoryName,
                s.image_url AS subCategoryImageUrl,
                p.id AS productId,
                p.name AS productName,
                p.images AS productImages,
                p.price AS productPrice,
                p.discount AS productDiscount,
                b.id AS brandId,
                b.name AS brandName
            FROM 
                category c
            LEFT JOIN 
                category s ON c.id = s.parent_id
            JOIN 
                product p ON s.id = p.category_id
            LEFT JOIN 
                brand b ON p.brand_id = b.id
        `;
            const [result] = await executeQuery(query)
            if (result) {
                resolve(productMapper.fromDBPopularProductWithCat(result))
            }
        } catch (err) {
            reject(err)
        }
    })
}