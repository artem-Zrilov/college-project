const {Schema, model} = require('mongoose');

const schema = new Schema({
    parentId: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        required: true
    }
})

module.exports = model('Specialization', schema, 'specializations')
