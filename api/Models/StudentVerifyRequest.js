const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")
const Student = require('./Student')
const User = require('./User')

const studentVerifyRequestSchema = mongoose.Schema({
    student_verify_request_student: [Student.studentSchema],
    student_verify_request_name_surname: {
        type: String,
        required: true
    },
    student_verify_request_contact_info: {
        type: String,
        required: true
    }
})

studentVerifyRequestSchema.plugin(aggregatePaginate);


module.exports.studentVerifyRequestSchema = studentVerifyRequestSchema
module.exports.studentVerifyRequestModel = mongoose.model('StudentVerifyRequest', studentVerifyRequestSchema)