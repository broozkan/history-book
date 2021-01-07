const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")


const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    user_surname: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    user_password: {
        type: String,
        required: true
    },
    user_phone_number: {
        type: String,
        required: false
    },
    is_user_graduated_from_sivaslisesi: {
        type: String,
        required: true
    },
    user_email_verify: {
        type: Boolean,
        required: true
    }
})

userSchema.plugin(aggregatePaginate);


module.exports.userSchema = userSchema
module.exports.userModel = mongoose.model('User', userSchema)