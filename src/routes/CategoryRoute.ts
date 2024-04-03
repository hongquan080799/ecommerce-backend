import {Router} from 'express'
import * as service from '../service/CategoryService'
import logger from '../utils/myLogger'
const router = Router()

router.get('/', async (req, res) => {
    try {
        const list = await service.findAll()
        res.status(200).json(list)
    } catch(err: any) {
        logger.error(err)
        res.status(500).send({
            message: err.message,
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const category = await service.saveCategory(req.body)
        res.status(200).json(category)
    } catch(err: any) {
        logger.error(err)
        res.status(500).send({
            message: err.message,
        })
    }
})

router.put('/', async (req, res) => {
    try {
        const category = await service.updateCategory(req.body)
        res.status(200).json(category)
    } catch(err: any) {
        res.status(500).send({
            message: err.message,
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const category = await service.deleteCategory(Number(req.params.id))
        res.status(200).json(category)
    } catch(err: any) {
        res.status(500).send({
            message: err.message,
        })
    }
});


export default router