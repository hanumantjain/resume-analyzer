const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, sparse: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String,},
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
module.exports = User