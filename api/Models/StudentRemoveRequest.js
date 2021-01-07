const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")
const Student = require('./Student')
const User = require('./User')

const studentRemoveRequestSchema = mongoose.Schema({
    student_remove_request_student: [Student.studentSchema],
    student_remove_request_user_name_surname: {
        type: String,
        required: true
    },
    student_remove_request_contact_info: {
        type: String,
        required: true
    }
})

studentRemoveRequestSchema.plugin(aggregatePaginate);


module.exports.studentRemoveRequestSchema = studentRemoveRequestSchema
module.exports.studentRemoveRequestModel = mongoose.model('StudentRemoveRequest', studentRemoveRequestSchema)