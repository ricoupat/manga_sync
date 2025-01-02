const { Schema, model } = require('mongoose')

const MembersSchema = new Schema({
    surname: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const Members = model('Members', MembersSchema)

module.exports = Members