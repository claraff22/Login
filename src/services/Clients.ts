import {Request, Response} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Client from '../models/clients'

class Clients {
    async insert(req: Request, res: Response) {

        const {name, email, password, confirmPassword} = req.body

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

        //check if Client exists
        const ClientExists = await Client.findOne({ email: email})

        if(ClientExists) {
            return res.status(422).json({msg: 'This e-mail is alredy being used'})
        }

        //create Password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //create User
        const user = new Client({
            name,
            email,
            password: passwordHash,
        })

        try{
            await user.save()
            res.status(201).json({msg: "User created successfully!"})

        } catch(error) {
            res.status(500).json({msg: "Error, try again later."})
        }
    }
    
}

export default Clients