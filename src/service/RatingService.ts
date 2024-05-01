import { executeQuery, executeWithParams } from "../config/MysqlConfig"
import { Rating, RatingRate } from "../model/Rating"
import { RatingRequest } from "../types/Rating"
export const findAllByProductId = async (productId: number) : Promise<Rating[]> => {
    return new Promise<Rating[]>(async (resolve, reject) => {
        try {
            const query = "select r.id, u.username as user, u.avatar as userAvatar, p.id as id, r.rating as rating, r.message as message, r.created_at as time from rating r join product p on r.product_id  = p.id join user u on r.user_id = u.id where p.id = ? order by r.created_at desc"
            const [result] = await executeWithParams(query, [productId])
            if (result) {
                resolve(result as any)
            }
        } catch (err) {
            reject(err)
        }
    })
}



export const saveRating = async (rating: RatingRequest) : Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const [result] = await executeWithParams("insert into rating (user_id, product_id, rating, message) values(?,?,?,?)", [rating.userId, rating.productId, rating.rating, rating.message])
            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}

export const getRatingStatistical = async (productId: number) : Promise<RatingRate> => {
    return new Promise<RatingRate>(async (resolve, reject) => {
        try {
            const query =  
            `SELECT
                COUNT(*) AS totalRatings,
                ROUND(AVG(rating), 1) AS averageRating,
                SUM(
                    CASE WHEN ROUND(rating) = 1 THEN 1 ELSE 0 END
                ) AS oneStarCount,
                SUM(
                    CASE WHEN ROUND(rating) = 2 THEN 1 ELSE 0 END
                ) AS twoStarCount,
                SUM(
                    CASE
                        WHEN ROUND(rating) = 3 THEN 1
                        ELSE 0
                    END
                ) AS threeStarCount,
                SUM(
                    CASE
                        WHEN ROUND(rating) = 4 THEN 1
                        ELSE 0
                    END
                ) AS fourStarCount,
                SUM(
                    CASE
                        WHEN ROUND(rating) = 5 THEN 1
                        ELSE 0
                    END
                ) AS fiveStarCount
            FROM rating where product_id = ?`
            const [result] = await executeWithParams(query, [productId])
            if (result) {
                resolve((result as any)[0])
            }
        } catch (err) {
            reject(err)
        }
    })
}