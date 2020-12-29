const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const studentSchema = mongoose.Schema({
    student_name: {
        type: String,
        required: false
    },
    student_surname: {
        type: String,
        required: false
    },
    student_father_name: {
        type: String,
        required: false
    },
    student_photo: {
        type: String,
        required: false
    },
    student_gender: {
        type: String,
        required: false
    },
    student_birthday: {
        type: String,
        required: false
    },
    student_nationality: {
        type: String,
        required: false
    },
    student_school_number: {
        type: String,
        required: false
    },
    student_middle_school_graduation_result: {
        type: String,
        required: false
    },
    student_education_beginning_year: {
        type: String,
        required: false
    },
    student_education_ending_year: {
        type: String,
        required: false
    },
    student_high_school_graduation_exam: {
        type: String,
        required: false
    },
    student_high_school_graduation_result: {
        type: String,
        required: false
    }
})

studentSchema.plugin(aggregatePaginate);


module.exports = mongoose.model('Student', studentSchema)