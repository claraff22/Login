import {Request, Response} from 'express'

class Clients {
    async insert(req: Request, res: Response) {

        const {name, email, password, confirmPassword} = req.body

        //Validations
        if(!name) {
            return res.status(422).json({msg: 'Name is required'})
        }
    }
}

export default Clients