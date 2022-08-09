import express, {json, Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Clients from './services/Clients'
import UsersLogin from './services/UsersLogin'
import UsersUpdate from './services/UsersUpdate'
import authorization from './middleware/Authorization'
import UserDelete from './services/UserDelete'

dotenv.config();

const app = express()
const clients = new Clients()
const users = new UsersLogin()
const userUpdate = new UsersUpdate()
const remove = new UserDelete()

//Config
app.use(express.json())

//Credencials
const dbUser = process.env.DATABASE_USER
const dbPass = process.env.DATABASE_PASS
const PORT = process.env.SERVIDOR_PORT

//Routes
app.get('/user/:id', authorization, users.findOne)
app.post('/auth/register', clients.insert)
app.post('/auth/users', users.insert)
app.patch('/admin/update/:name', authorization, userUpdate.update)
app.delete('/admin/delete/:name', authorization, remove.delete)

//Connection with mongoose
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.fges5am.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    app.listen(PORT, () => {console.info(`Servidor rodando na porta ${PORT}`)}, );
}).catch((err) => console.log(err))