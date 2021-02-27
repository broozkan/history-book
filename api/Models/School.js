const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const schoolSchema = mongoose.Schema({
    school_name: {
        type: String,
        required: [true, "Okul adı zorunludur"]
    },
    school_building_date: {
        type: String,
        required: false
    },
    school_description: {
        type: String,
        required: false
    },
    school_photo: {
        type: String,
        required: false
    }
})

schoolSchema.plugin(aggregatePaginate);


module.exports.schoolSchema = schoolSchema
module.exports.schoolModel = mongoose.model('School', schoolSchema)