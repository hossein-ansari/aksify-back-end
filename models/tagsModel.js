const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name:{
        type: "String",
        required: "true",
    }
})
const tagsModel = mongoose.model('tags',schema)
module.exports = tagsModel
