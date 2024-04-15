const jwt = require('jsonwebtoken')

export const authenticationToken = (req: any, res:any, next:any) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SCRETE_KEY, (err:any, user: any) =>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
