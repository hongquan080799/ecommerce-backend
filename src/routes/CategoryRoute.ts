import {Router} from 'express'
import * as service from '../service/CategoryService'
import logger from '../utils/myLogger'
const router = Router()

router.get('/', async (req, res) => {
    try {
        const list = await service.findAll(req.query)
        res.status(200).json(list)
    } catch(err: any) {
        logger.error(err)
        res.status(500).send({
            message: err.message,
        })
    }
})
router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id; // Extract ID from request parameters
  
      const item = await service.findById(Number(id)); // Call your service's find by ID method
  
      if (!item) {
        return res.status(404).json({ message: 'Item not found' }); // Handle non-existent ID
      }
  
      res.status(200).json(item);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  
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

router.get("/cat-tree/:id", async (req, res) => {
    try {
        const result = await service.findCategoryTreeBySubId(Number((req.params.id)))
        res.json(result)
    } catch (error: any) {
        res.status(500).send({
            message: error.message,
        })
    }

})

export default router