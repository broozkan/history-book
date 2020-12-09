const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const staffSchema = mongoose.Schema({
    staff_name: {
        type: String,
        required: [true, "Personel adı zorunludur"]
    },
    staff_surname: {
        type: String,
        required: [true, "Personel soyadı zorunludur"]
    },
    staff_photo: {
        type: String,
        required: [true, "Personel fotoğrafı zorunludur"]
    },
    staff_birthday: {
        type: Date,
        required: [true, "Personel doğum günü zorunludur"]
    },
    staff_nationality: {
        type: String,
        required: [true, "Personel uyruğu zorunludur"]
    },
    staff_country: {
        type: String,
        required: [true, "Personel doğum yeri zorunludur"]
    },
    staff_gender: {
        type: String,
        required: [true, "Personel cinsiyeti zorunludur"]
    },
    staff_duty: {
        type: String,
        required: [true, "Personel görevi zorunludur"]
    },
    staff_branch: {
        type: String,
        required: [true, "Personel branşı zorunludur"]
    },
    staff_duty_beginning_date: {
        type: Date,
        required: [true, "Personel görev başlangıç tarihi zorunludur"]
    },
    staff_duty_ending_date: {
        type: Date,
        required: [true, "Personel görev bitiş tarihi zorunludur"]
    }
})

staffSchema.plugin(aggregatePaginate);


module.exports = mongoose.model('Staff', staffSchema)