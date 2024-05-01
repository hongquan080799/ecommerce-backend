import {Router} from 'express'
import logger from '../utils/myLogger'
const router = Router()
import jwt from 'jsonwebtoken';
import * as service from '../service/UserService'
import {authenticationToken} from '../middleware/AuthenticationMiddleWare'
import { User } from '../model/User';
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
    const userInfo = await service.findByUserName(user.username)
    res.json(userInfo)
  } catch (error: any) {  
    console.log(error)
    throw error
  }
})

router.get('/info/:username',authenticationToken, async (req: any, res) => {
  try {
    logger.info('Get user info')
    const userInfo = await service.findByUserName(req.params.username)
    res.json(userInfo)
  } catch (error: any) {  
    console.log(error)
    throw error
  }
})

router.get('/role', async (req, res) => {
  try {
    logger.info('Get list role')
    const roleList = await service.findListRole()

    res.json(roleList)
  } catch (error: any) {
    res.json({message : error.message})
  }
})

router.post('/', authenticationToken, async (req: any, res) =>{
  try {
    logger.info('Save user data')
    const user = req.user
    if(user.role.name !== 'ADMIN') {
        throw new Error(`User not admin`)
    }
    const saveData = await service.saveUser(req.body)
    res.json(saveData)
  } catch (error:any) {
    throw error
  }
})
router.post('/register', async (req: any, res) => {
  try {
    logger.info('Register user data')
    const defaultRoleId = 3;
    const user: User = req.body
    user.role = {
      id: defaultRoleId,
      name: 'USER'
    }
    const saveData = await service.saveUser(req.body)
    res.json(saveData)
  } catch (error:any) {
    console.log('error saving user data')
    console.log(error)
    res.status(500).json({ error: error.message });
  }
})

router.put('/', authenticationToken, async (req: any, res) =>{
  try {
    logger.info('update user data')
    const user = req.user
    if(user.role.name !== 'ADMIN' && user.username !== req.body.username) {
        throw new Error(`User not admin`)
    }
    const saveData = await service.updateUser(req.body)
    res.json(saveData)
  } catch (error:any) {
    throw error
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
    res.status(500).json({message : error.message})
  }
})

export default router