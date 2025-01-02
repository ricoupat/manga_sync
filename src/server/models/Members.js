const { Schema, model } = require('mongoose')

const MembersSchema = new Schema({
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const Members = model('Members', MembersSchema)

module.exports = Members