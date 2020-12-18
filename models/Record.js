const {Schema, model} = require('mongoose');

const schema = new Schema({
    doctor: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true
    },
    visit : {
        type: String,
        required: true
    }
})

module.exports = model('Record', schema, 'records')
