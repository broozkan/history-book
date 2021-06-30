const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const instituteSchema = mongoose.Schema({
    institute_name: {
        type: String,
        required: [true, "Dernek adı zorunludur"]
    },
    institute_photo: {
        type: String,
        required: [true, "Dernek görseli zorunludur"]
    }
})

instituteSchema.plugin(aggregatePaginate);


module.exports = mongoose.model('Institute', instituteSchema)