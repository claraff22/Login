import {NextFunction, Request, response, Response} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Client from '../models/clients'

dotenv.config();

class UsersUpdate{
    async update(res: Response, req: Request){
        const {email, name, password, confirmPassword} = req.body

        //Validations
        if(!name) {
            return res.status(422).json({msg: 'Name is required'})
        }

        if(!email) {
            return res.status(422).json({msg: 'Email is required'})
        }

        if(!password) {
            return res.status(422).json({msg: 'Password is required'})
        }

        if(password !== confirmPassword) {
            return res.status(422).json({msg: 'Password do not match'})
        }

        //create Password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)


        try {
            await Client.findByIdAndUpdate(req.params.id, {name: name, email: email, password: passwordHash});
            response.send()
        } catch(error){
            console.log(error)
            res.status(500).json({msg: "Error, try again later."})
        }


    }
}

export default UsersUpdate

