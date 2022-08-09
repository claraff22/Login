import {Request, Response} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Client from '../models/clients'

class UserDelete {
    async delete(res: Response, req: Request) {

        const userExists = await Client.findById(req.params.id)
        console.log(userExists)

        if(!userExists) {
            return res.status(404).json({msg: "User not found"})
        }

        try {
            await Client.findByIdAndDelete(userExists)
            res.status(200).json({msg: `User deleted successfully` })

        } catch(error) {
            console.log(error)
            res.status(500).json({msg: "Error, try again later."})
        }
    }
}

export default UserDelete