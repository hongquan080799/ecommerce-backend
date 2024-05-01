import {Router} from 'express'
import * as service from '../service/CommentService'
import {authenticationToken} from '../middleware/AuthenticationMiddleWare'
import logger from '../utils/myLogger'
import { CommentRequest } from '../types/Comment'
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
        const rating: CommentRequest = req.body
        const user = req.user
        rating.userId = user.id
        const category = await service.saveComment(rating)
        res.status(200).json(category)
    } catch(err: any) {
        logger.error(err)
        res.status(500).send({
            message: err.message,
        })
    }
})

export default router