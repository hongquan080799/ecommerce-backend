import { executeQuery, executeWithParams } from "../config/MysqlConfig"
import * as categoryMapper from "../mappers/CategoryMapper"
import { Category } from "../model/Category";
export const findAll = async () : Promise<Category[]> => {
    return new Promise<Category[]>(async (resolve, reject) => {
        try {
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
