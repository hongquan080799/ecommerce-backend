import { executeQuery, executeWithParams } from "../config/MysqlConfig"
import * as categoryMapper from "../mappers/CategoryMapper"
import { Category } from "../model/Category";
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
            const [result] = await executeQuery("select * from category")
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