import {Request, Response} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Client from '../models/clients'

class Users {

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
        const userExists = await Client.findOne({ email: email, password: password})

        if(!userExists) {
            return res.status(404).json({msg: 'This e-mail is not valid'})
        }

        // check if password match

        const checkPassword = await bcrypt.compare(password, userExists.password)

        if(!checkPassword) {
            return res.status(422).json({msg: 'This password is not valid'})
        }
    
    }
}

export default Users