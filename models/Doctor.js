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
    },
    dates: [
        {
            date: {
                type: String
            },
            times: [{
                value: {
                    type: String,
                    required: true
                },
                isBusy: {
                    type: Boolean,
                    default: false
                }
            }]
        }
    ]
})

module.exports = model('Doctor', schema, 'doctors')
