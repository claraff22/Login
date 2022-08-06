import mongoose, { Schema } from "mongoose";

const client = new Schema ({
    name: String,
    email: String,
    password: String
})

export default client