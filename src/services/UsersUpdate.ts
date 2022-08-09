import {NextFunction, Request, response, Response} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Client from '../models/clients'

dotenv.config();

class UsersUpdate{
    async update(req: Request, res: Response){

        const userName = req.params.name

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

        const user = new Client({
            name,
            email,
            password: passwordHash,
        })

        try {
            await Client.findOneAndUpdate({name: userName}, user);
            await user.save()
            response.status(200).json({msg: "Update successfully"})
        } catch(error){
            console.log(error)
            res.status(500).json({msg: "Error, try again later."})
        }


    }
}

export default UsersUpdate

