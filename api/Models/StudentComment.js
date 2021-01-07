const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")
const Student = require('./Student')
const User = require('./User')

const studentCommentSchema = mongoose.Schema({
    student_comment: {
        type: String,
        required: [true, "Yorum zorunludur"]
    },
    student_comment_student: [Student.studentSchema],
    student_comment_user: [User.userSchema],
    student_comment_verify: {
        type: Boolean,
        required: true
    }
})

studentCommentSchema.plugin(aggregatePaginate);


module.exports.studentCommentSchema = studentCommentSchema
module.exports.studentCommentModel = mongoose.model('StudentComment', studentCommentSchema)