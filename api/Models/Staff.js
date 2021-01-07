const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const staffSchema = mongoose.Schema({
    staff_name: {
        type: String,
        required: false
    },
    staff_surname: {
        type: String,
        required: false
    },
    staff_photo: {
        type: String,
        required: false
    },
    staff_birthday: {
        type: String,
        required: false
    },
    staff_nationality: {
        type: String,
        required: false
    },
    staff_country: {
        type: String,
        required: false
    },
    staff_father_name: {
        type: String,
        required: false
    },
    staff_gender: {
        type: String,
        required: false
    },
    staff_duty: {
        type: String,
        required: false
    },
    staff_branch: {
        type: String,
        required: false
    },
    staff_duty_beginning_date: {
        type: String,
        required: false
    },
    staff_duty_ending_date: {
        type: String,
        required: false
    }
})

staffSchema.plugin(aggregatePaginate);


module.exports = mongoose.model('Staff', staffSchema)