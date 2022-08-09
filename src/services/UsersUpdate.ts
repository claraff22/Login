import {NextFunction, Request, response, Response} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Client from '../models/clients'

dotenv.config();

class UsersUpdate{
    async update(req: Request, res: Response){

        const {email, name, password, passwordConfirm} = req.body

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

        if(password !== passwordConfirm) {
            return res.status(422).json({msg: 'Password do not match'})
        }

        //create Password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const filter = {name: req.params.name}

        const user = {
            name: req.body.name,
            email: req.body.email,
            password: passwordHash
        }

        try {
            const clientUpdate = await Client.findOneAndUpdate(filter, user)
            response.status(200).json({msg: "Update successfully"})
        } catch(error){
            console.log(error)
            res.status(500).json({msg: "Error, try again later."})
        }

    }
}

export default UsersUpdate

