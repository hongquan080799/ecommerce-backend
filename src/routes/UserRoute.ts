import {Router} from 'express'
import logger from '../utils/myLogger'
const router = Router()
import jwt from 'jsonwebtoken';
import * as service from '../service/UserService'
import {authenticationToken} from '../middleware/AuthenticationMiddleWare'
require('dotenv').config(); 
const SECRET: string | undefined = process.env.JWT_SCRETE_KEY

router.get('/',authenticationToken, async (req, res) => {
  try {
    logger.info('Get all users')
    const users = await service.findAll()
    res.json(users)
  } catch (error: any) {
    res.json({message : error.message})
  }
})

router.get('/info',authenticationToken, async (req: any, res) => {
  try {
    logger.info('Get user info')
    const user = req.user
    console.log(user)
    const userInfo = await service.findByUserName(user.username)

    res.json(userInfo)
  } catch (error: any) {
    res.json({message : error.message})
  }
})

router.post('/', authenticationToken, async (req: any, res) =>{
  try {
    if(req.user?.data[0].role == 'admin') {
        throw new Error(`User not admin`)
    }
    logger.info('Save user data')
    const saveData = await service.saveUser(req.body)
    res.json(saveData)
  } catch (error:any) {
    res.json({message : error.message})
  }
})

router.delete('/:username', authenticationToken, async (req, res) => {
  try {
    logger.info('remove user ')
    const result = await service.deleteUser(req.params.username)
    res.json(result)
  } catch (error: any) {
    res.json({message : error.message})
  }
})
//

// router.patch('/', authenticationToken ,async (req, res) => {
//   try {
//     logger.info('update user from DB ')
//     const userInfo = req.user?.data[0]
//     const result = await User.findByIdAndUpdate(userInfo['_id'], req.body)
//     res.json(result)
//   } catch (error) {
//     res.json({message : error.message})
//   }
// })


router.post('/login', async (req, res) =>{
  try {
    logger.info('user login')
    const username = req.body.username;
    const password = req.body.password;

    const user = await service.findByUserName(username)
    if(user != null) {
        if(user.password !== password) {
            throw new Error("Password not match")
        }
      if (!SECRET) {
        throw new Error('Secret key is not defined');
      }
      delete user['password']
      const token = jwt.sign({
        exp : Math.floor(Date.now() / 1000) + (60 * 60),
        data : user,
      }, SECRET)
      res.json({
        userInfo : user,
        jwtToken : token
      })
    }



  } catch (error: any) {
    res.json({message : error.message})
  }
})

export default router