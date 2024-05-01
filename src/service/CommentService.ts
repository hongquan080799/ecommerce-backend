import {executeWithParams } from "../config/MysqlConfig"
import { CommentRequest, Comment } from "../types/Comment"
export const findAllByProductId = async (productId: number) : Promise<Comment[]> => {
    return new Promise<Comment[]>(async (resolve, reject) => {
        try {
            const query = "select c.id, u.username as user, u.avatar as userAvatar, p.id as id, c.message as message,c.created_at as time from comment c join product p on c.product_id  = p.id join user u on c.user_id = u.id where p.id = ? order by c.created_at desc"
            const [result] = await executeWithParams(query, [productId])
            if (result) {
                resolve(result as any)
            }
        } catch (err) {
            reject(err)
        }
    })
}



export const saveComment = async (comment: CommentRequest) : Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const [result] = await executeWithParams("insert into comment (user_id, product_id, message) values(?,?,?)", [comment.userId, comment.productId, comment.message])
            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}

