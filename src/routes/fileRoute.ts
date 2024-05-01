import {Router} from 'express'
import fs from 'fs'
const crypto = require('crypto')

const router = Router()
router.post('/upload', (req: any, res) => {
   // fs.writeFileSync(req.files.file.data)
   //req.get('host') 
    //fs.WriteStream(req.files.file)
    const uniqueId = crypto.randomBytes(20).toString('hex')
    try {
        const data = req.files.file
        const filePath = "public/images/" + uniqueId + "_" + data?.name.toString().split('.')[0] + "." + data?.name.toString().split('.')[1];
        const stream = fs.createWriteStream(filePath)
        const fileUrl  = req.protocol + '://' + req.get('host') + "/" + filePath;
        stream.once('open', ()=>{
            stream.write(data.data)
            stream.end()
            res.json({fileUrl})
        })
        
        
    } catch (error: any) {
        res.json({message : "Write file failed : " + error.message})
    }
})


export default router