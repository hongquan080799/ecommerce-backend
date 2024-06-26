import { executeQuery, executeWithParams } from "../config/MysqlConfig"
import * as categoryMapper from "../mappers/CategoryMapper"
import { Category } from "../model/Category";
import { CatTree } from "../types/Category";
import * as productMapper from "../mappers/ProductMappper"
import * as bramdMapper from "../mappers/BrandMapper"
export const findAll = async (query: any) : Promise<Category[]> => {
    return new Promise<Category[]>(async (resolve, reject) => {
        try {
            if (Object.keys(query).length > 0) {
                const [result] = await executeWithParams("select * from category where parent_id = ?", [query['parentId']])
                if (result) {
                    resolve(categoryMapper.fromDBToModelList(result as []))
                }
                return
            }
            const [result] = await executeQuery("select * from category where parent_id is null",)
            if (result) {
                resolve(categoryMapper.fromDBToModelList(result as []))
            }
        } catch (err) {
            reject(err)
        }
    })
}
export const findAllSubCategory = async () : Promise<Category[]> => {
    return new Promise<Category[]>(async (resolve, reject) => {
        try {
            const [result] = await executeQuery("select * from category where parent_id is not null",)
            if (result) {
                resolve(categoryMapper.fromDBToModelList(result as []))
            }
        } catch (err) {
            reject(err)
        }
    })
}

export const findById = async (id: number) : Promise<Category> => {
    return new Promise<Category>(async (resolve, reject) => {
        try {
            const [rows] = await executeWithParams("select * from category where id = ?", [id])
            if (rows && (rows as []).length > 0) {
                resolve(categoryMapper.fromDBToModel((rows as any)[0]))
            } else {
                reject(new Error("Could not find categories with id: " + id))
            }
        } catch (err) {
            reject(err)
        }
    })
}

export const saveCategory = async (category: Category) : Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const [result] = await executeWithParams("insert into category (name, image_url, parent_id) values(?,?,?)", [category.name, category.imageUrl,category.parentId])
            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}

export const updateCategory = async (category: Category) : Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            // check if category already exists
            const [rows] = await executeWithParams("select * from category where id =?", [category.id])
            if (rows && (rows as []).length > 0) {
                const [result] = await executeWithParams("update category set name =?, image_url =? where id =?", [category.name, category.imageUrl, category.id])
                resolve(result)
            } else {
                reject(new Error("Could not find categories with id: " + category.id))
            }
            const [result] = await executeWithParams("insert into category (name, image_url, parent_id)", [category.name, category.imageUrl, category.parentId])
            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}

export const deleteCategory = async (id: number) : Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const [result] = await executeWithParams("delete from category where id =?", [id])
            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}
export const findCategoryTreeBySubId = async (id: number): Promise<CatTree> => {
    return new Promise<CatTree>(async (resolve, reject) => {
        try {
            const [rows] = await executeWithParams("select * from category where id = ?", [id])
            if (rows && (rows as []).length > 0) {
                const childRow = (rows as any)[0]
                const result = await executeWithParams("select * from category where id = ?", [childRow.parent_id])
                const parentRow = (result[0] as any)[0]
                const resultChild = await executeWithParams("select * from category where parent_id = ?", [parentRow.id])
                const chileRows = resultChild[0] as []
                const productByCat = await executeWithParams("select p.*, b.name as brand_name from product p left join brand b on p.brand_id = b.id where p.category_id = ?", [id] )
                const brandList = await executeWithParams("select b.id, b.name, b.image_url from product p join brand b on p.brand_id = b.id where p.category_id = ? group by b.id, b.name, b.image_url", [id] )
                const returnResult: CatTree = {
                    id: parentRow.id,
                    imageUrl: parentRow.image_url,
                    name: parentRow.name,
                    subCategory: chileRows,
                    productWithCat: productMapper.fromDBToModelList(productByCat[0] as any),
                    brandList: bramdMapper.fromDBToModelList(brandList[0] as any),

                }
                resolve(returnResult)
            } else {
                reject(new Error("Could not find categories with id: " + id))
            }
        } catch (err) {
            reject(err)
        }
    })
}