import { executeQuery, executeWithParams } from "../config/MysqlConfig"
import { User } from "../model/User"
import * as userMapper from "../mappers/UserMapper"
export const findAll = async () : Promise<User[]> => {
    return new Promise<User[]>(async (resolve, reject) => {
        try {
            const [result] = await executeQuery("select u.*, r.id as role_id, r.name as role_name from user u join role r on u.role_id = r.id")
            if (result) {
                resolve(userMapper.fromDBToModelList(result as []))
            }
        } catch (err) {
            reject(err)
        }
    })
}

export const findByUserName = async (username: string) : Promise<User> => {
    return new Promise<User>(async (resolve, reject) => {
        try {
            const [rows] = await executeWithParams("select * from user where username = ?", [username])
            if (rows && (rows as []).length > 0) {
                resolve(userMapper.fromDBToModel((rows as any)[0]))
            } else {
                reject(new Error("Could not find user with username: " + username))
            }
        } catch (err) {
            reject(err)
        }
    })
}

export const saveUser = async (user: User) : Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const [result] = await executeWithParams("insert into user (username, password, first_name, last_name, email, phone_number, address, avatar, role_id, active) values(?,?,?,?,?,?,?,?,?,?)",
             [user.username, user.password, user.firstName, user.lastName, user.email, user.phoneNumber, user.address, user.avatar, user.role.id])
            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}

export const updateUser = async (user: User) : Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            // check if user already exists
            const [rows] = await executeWithParams("select * from user where username =?", [user.username])
            if (rows && (rows as []).length > 0) {
                const [result] = await executeWithParams("insert into brand (username, password, first_name, last_name, email, phone_number, address, avatar, role_id, active) values(?,?,?,?,?,?,?,?,?,?)",
                [user.username, user.password, user.firstName, user.lastName, user.email, user.phoneNumber, user.address, user.avatar, user.role.id])
                resolve(result)
            } else {
                reject(new Error("Could not find user with username: " + user.username))
            }
        } catch (err) {
            reject(err)
        }
    })
}

export const deleteUser = async (username: string) : Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const [result] = await executeWithParams("delete from user where username =?", [username])
            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}