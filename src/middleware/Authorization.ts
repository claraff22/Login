import {NextFunction, Request, Response} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Client from '../models/clients'

dotenv.config(); 
 
    
function authorization(req: Request, res: Response, next: NextFunction){
        //checkToken
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

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



