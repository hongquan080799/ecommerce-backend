import {Router} from 'express'
import * as service from '../service/CategoryService'
import logger from '../utils/myLogger'
const router = Router()

router.get('/', async (req, res) => {
    try {
        const list = await service.findAllSubCategory()
        res.status(200).json(list)
    } catch(err: any) {
        logger.error(err)
        res.status(500).send({
            message: err.message,
        })
    }
})


export default router