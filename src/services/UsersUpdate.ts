import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
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

        // Validation check e-mail
        const emailExists = await Client.findOne({email: email}, {email: 1, id: 1})
        
        if (emailExists && emailExists.id !== id) {
            return res.status(422).json({msg: 'This e-mail is already being used'})
        }

        //create Password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //user
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: passwordHash
        }


        try {
            const clientUpdate = await Client.findByIdAndUpdate(id, user)
            await clientUpdate?.save()
            res.status(200).json({msg: "Update successfully"})

        } catch(error) {
            res.status(500).json({msg: "Error, try again later."})
        }

    }
}

export default UsersUpdate

