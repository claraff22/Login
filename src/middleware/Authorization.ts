import {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config(); 
    
function authorization(req: Request, res: Response, next: NextFunction){
    
    //checkToken
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    //Validation
    if(!token) {
        return res.status(401).json({msg: "Access denied"})
    }

    try{
        const secret = process.env.SECRET
        jwt.verify(token, secret!)

        next()

    } catch(error){
        res.status(400).json({msg:"Token invalid"})
    }

}

export default authorization



