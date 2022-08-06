import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const Client = mongoose.model('Client', ClientSchema)

export default Client