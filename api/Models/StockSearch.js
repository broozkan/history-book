const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")
const User = require('./User')


const stockSearchSchema = mongoose.Schema({
    stock_search_card_name: {
        type: String,
        required: true
    },
    stock_search_student_name: {
        type: String,
        required: false
    },
    stock_search_student_surname: {
        type: String,
        required: false
    },
    stock_search_student_birthday: {
        type: String,
        required: false
    },
    stock_search_student_education_beginning_year: {
        type: String,
        required: false
    },
    stock_search_student_education_ending_year: {
        type: String,
        required: false
    },
    stock_search_student_father_name: {
        type: String,
        required: false
    },
    stock_search_student_gender: {
        type: String,
        required: false
    },
    stock_search_student_nationality: {
        type: String,
        required: false
    },
    stock_search_student_school_number: {
        type: String,
        required: false
    },
    stock_search_user: [User.userSchema]
})

stockSearchSchema.plugin(aggregatePaginate);


module.exports.stockSearchSchema = stockSearchSchema
module.exports.stockSearchModel = mongoose.model('StockSearch', stockSearchSchema)