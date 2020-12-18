const {Schema, model} = require('mongoose');

const schema = new Schema({
    doctor: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    isBusy: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Visit', schema, 'visits')
