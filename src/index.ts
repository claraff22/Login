import express, {json, Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Clients from './services/Clients'
import Users from './services/Users'

dotenv.config();

const app = express()
const clients = new Clients()
const users = new Users()

//Config
app.use(express.json())

//Credencials
const dbUser = process.env.DATABASE_USER
const dbPass = process.env.DATABASE_PASS
const PORT = process.env.SERVIDOR_PORT

//Routes
app.get('/user/:id', users.findOne)
app.post('/auth/register', clients.insert)
app.post('/auth/users', users.insert)

//Connection with mongoose
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.fges5am.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    app.listen(PORT, () => {console.info(`Servidor rodando na porta ${PORT}`)}, )
}).catch((err) => console.log(err))

