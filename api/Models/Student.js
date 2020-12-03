const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const studentSchema = mongoose.Schema({
    student_name: {
        type: String,
        required: [true, "Öğrenci adı zorunludur"]
    },
    student_surname: {
        type: String,
        required: [true, "Öğrenci soyadı zorunludur"]
    },
    student_father_name: {
        type: String,
        required: [true, "Öğrenci baba adı zorunludur"]
    },
    student_gender: {
        type: String,
        required: [true, "Öğrenci cinsiyeti zorunludur"]
    },
    student_birthday: {
        type: Date,
        required: [true, "Öğrenci doğum günü zorunludur"]
    },
    student_nationality: {
        type: String,
        required: [true, "Öğrenci uyruğu zorunludur"]
    },
    student_school_number: {
        type: String,
        required: [true, "Öğrenci okul numarası zorunludur"]
    },
    student_book_number: {
        type: String,
        required: [true, "Öğrenci sicil numarası zorunludur"]
    },
    student_middle_school_graduation_date: {
        type: Date,
        required: [true, "Öğrenci orta okul mezuniyet tarihi zorunludur"]
    },
    student_middle_school_graduation_result: {
        type: String,
        required: [true, "Öğrenci orta okul mezuniyet durumu zorunludur"]
    },
    student_high_school_graduation_date: {
        type: Date,
        required: [true, "Öğrenci lise mezuniyet tarihi zorunludur"]
    },
    student_high_school_graduation_result: {
        type: String,
        required: [true, "Öğrenci lise mezuniyet durumu zorunludur"]
    }
})

studentSchema.plugin(aggregatePaginate);


module.exports = mongoose.model('Student', studentSchema)