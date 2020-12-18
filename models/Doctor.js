const {Schema, model} = require('mongoose');

const schema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ""
    }
})

module.exports = model('Doctor', schema, 'doctors')
