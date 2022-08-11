import {Request, Response} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Client from '../models/clients'

class UserDelete {
    async delete(req: Request, res: Response) {

        const id = req.params.id
        console.log(id)

        const userExists = await Client.findOne({id: id})

        if(!userExists) {
            return res.status(404).json({msg: "User not found"})
        }

        try {
            await Client.findByIdAndDelete(id)
            res.status(200).json({msg: `User deleted successfully` })

        } catch(error) {
            console.log(error)
            res.status(500).json({msg: "Error, try again later."})
        }
    }
}

export default UserDelete