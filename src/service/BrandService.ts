import { executeQuery, executeWithParams } from "../config/MysqlConfig"
import { Brand } from "../model/Brand"
import * as brandMapper from "../mappers/BrandMapper"
export const findAll = async (query: any) : Promise<Brand[]> => {
    return new Promise<Brand[]>(async (resolve, reject) => {
        try {
            const [result] = await executeQuery("select * from brand")
            if (result) {
                resolve(brandMapper.fromDBToModelList(result as []))
            }
        } catch (err) {
            reject(err)
        }
    })
}

export const findById = async (id: number) : Promise<Brand> => {
    return new Promise<Brand>(async (resolve, reject) => {
        try {
            const [rows] = await executeWithParams("select * from brand where id = ?", [id])
            if (rows && (rows as []).length > 0) {
                resolve(brandMapper.fromDBToModel((rows as any)[0]))
            } else {
                reject(new Error("Could not find brand with id: " + id))
            }
        } catch (err) {
            reject(err)
        }
    })
}

export const saveBrand = async (brand: Brand) : Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const [result] = await executeWithParams("insert into brand (name, image_url) values(?,?)", [brand.name, brand.imageUrl])
            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}

export const updateBrand = async (brand: Brand) : Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            // check if category already exists
            const [rows] = await executeWithParams("select * from brand where id =?", [brand.id])
            if (rows && (rows as []).length > 0) {
                const [result] = await executeWithParams("update brand set name =?, image_url =? where id =?", [brand.name, brand.imageUrl, brand.id])
                resolve(result)
            } else {
                reject(new Error("Could not find brand with id: " + brand.id))
            }
            const [result] = await executeWithParams("insert into brand (name, image_url)", [brand.name, brand.imageUrl])
            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}

export const deleteBrand = async (id: number) : Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const [result] = await executeWithParams("delete from brand where id =?", [id])
            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}