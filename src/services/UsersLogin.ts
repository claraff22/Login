import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Client from '../models/clients'

dotenv.config();
class UsersLogin {

    async insert(req: Request, res: Response) {
        //Login

        const {email, password} = req.body

        //validations

        if(!email) {
            return res.status(422).json({msg: 'Email is required'})
        }

        if(!password) {
            return res.status(422).json({msg: 'Password is required'})
        }

        // check if user exists
        const userExists = await Client.findOne({ email: email})

        if(!userExists) {
            return res.status(404).json({msg: 'This e-mail is not valid'})
        }

        // check if password match
        const checkPassword = await bcrypt.compare(password, userExists.password!)

        if(!checkPassword) {
            return res.status(422).json({msg: 'This password is not valid'})
        }

        try {
            const secret = process.env.SECRET
            const token = jwt.sign({
                id: userExists._id,
            }, secret!)

            res.status(200).json({msg: "Successfully authenticated", token})

        } catch(error) {
            console.log(error)
            res.status(500).json({msg: "Error, try again later."})
        }
    
    }

    async findOne(req: Request, res: Response) {
        const id = req.params.id

        //check if user exists
        const userExists2 = await Client.findById(id, '-password')

        if(!userExists2) {
            return res.status(404).json({msg: "User not found"})
        }

        try {
            res.status(200).json({userExists2})

        } catch (error){
            console.log(error)
            res.status(500).json({msg: "Error, try again later."})
        }  
    }
    
}

export default UsersLogin