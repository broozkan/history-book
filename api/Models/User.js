const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const userSchema = mongoose.Schema({
    user_username: {
        type: String,
        required: true
    },
    user_password: {
        type: String,
        required: true
    }
})

userSchema.plugin(aggregatePaginate);


module.exports.userSchema = userSchema
module.exports.userModel = mongoose.model('User', userSchema)