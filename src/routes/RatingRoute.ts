import {Router} from 'express'
import * as service from '../service/RatingService'
import {authenticationToken} from '../middleware/AuthenticationMiddleWare'
import logger from '../utils/myLogger'
import { RatingRequest } from '../types/Rating'
const router = Router()

router.get('/:productId', async (req, res) => {
    try {
        const list = await service.findAllByProductId(Number(req.params.productId))
        res.status(200).json(list)
    } catch(err: any) {
        logger.error(err)
        res.status(500).send({
            message: err.message,
        })
    }
})
  
router.post('/',authenticationToken, async (req: any, res) => {
    try {
        const rating: RatingRequest = req.body
        const user = req.user
        rating.userId = user.id
        const category = await service.saveRating(rating)
        res.status(200).json(category)
    } catch(err: any) {
        logger.error(err)
        res.status(500).send({
            message: err.message,
        })
    }
})
router.get('/statistic/:productId', async (req, res) => {
    try{
        const ratingStatiscal = await service.getRatingStatistical(Number(req.params.productId))
        res.status(200).json(ratingStatiscal)
    } catch (err: any) {
        logger.error(err)
        res.status(500).send({
            message: err.message,
        })
    }
})

export default router