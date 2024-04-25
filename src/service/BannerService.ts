import { executeQuery, executeWithParams } from "../config/MysqlConfig"
import * as bannerMapper from "../mappers/BannerMapper"
import { Banner } from "../model/Banner"
export const findAll = async (query: any) : Promise<Banner[]> => {
    return new Promise<Banner[]>(async (resolve, reject) => {
        try {
            const [result] = await executeQuery("select * from banner")
            if (result) {
                resolve(bannerMapper.fromDBToModelList(result as []))
            }
        } catch (err) {
            reject(err)
        }
    })
}

export const findById = async (id: number) : Promise<Banner> => {
    return new Promise<Banner>(async (resolve, reject) => {
        try {
            const [rows] = await executeWithParams("select * from banner where id = ?", [id])
            if (rows && (rows as []).length > 0) {
                resolve(bannerMapper.fromDBToModel((rows as any)[0]))
            } else {
                reject(new Error("Could not find banner with id: " + id))
            }
        } catch (err) {
            reject(err)
        }
    })
}

export const saveBanner = async (banner: Banner) : Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const [result] = await executeWithParams("insert into banner (name, image_url, redirect_url) values(?,?,?)", [banner.name, banner.imageUrl, banner.redirectUrl])
            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}

export const updateBanner = async (banner: Banner) : Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            // check if category already exists
            const [rows] = await executeWithParams("select * from banner where id =?", [banner.id])
            if (rows && (rows as []).length > 0) {
                const [result] = await executeWithParams("update banner set name =?, image_url =?, redirect_url = ? where id =?", [banner.name, banner.imageUrl, banner.redirectUrl, banner.id])
                resolve(result)
            } else {
                reject(new Error("Could not find banner with id: " + banner.id))
            }
            const [result] = await executeWithParams("insert into banner (name, image_url, redirect_url)", [banner.name, banner.imageUrl, banner.redirectUrl])
            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}

export const deleteBanner = async (id: number) : Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const [result] = await executeWithParams("delete from banner where id =?", [id])
            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}