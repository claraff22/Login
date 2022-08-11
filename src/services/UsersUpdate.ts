import {NextFunction, Request, response, Response} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Client from '../models/clients'

dotenv.config();

class UsersUpdate{
    async update(req: Request, res: Response){

        const id = req.params.id
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

        const user = {
            name: req.body.name,
            email: req.body.email,
            password: passwordHash
        }

        console.log(id, user, email)

        try {
            const clientUpdate = await Client.findByIdAndUpdate(id, user)
            await clientUpdate?.save()
            console.log(clientUpdate)
            response.status(200).json({msg: "Update successfully"})

        } catch(error){
            console.log(error)
            res.status(500).json({msg: "Error, try again later."})
        }

    }
}

export default UsersUpdate


//  const emailExists = await Client.findOne({email: email})

//if (emailExists && emailExists == email) {}
