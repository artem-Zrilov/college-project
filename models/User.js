const {Schema, model} = require('mongoose');

const schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = model('User', schema, 'users')
