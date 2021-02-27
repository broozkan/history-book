const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const categorySchema = mongoose.Schema({
    category_name: {
        type: String,
        required: [true, "Kategori adı zorunludur"]
    },
    category_type: {
        type: String,
        required: [true, "Kategori tipi zorunludur"]
    },
    category_upper_category: {
        type: Array,
        required: false
    },
    is_category_main: {
        type: Boolean,
        required: true
    }
})

categorySchema.plugin(aggregatePaginate);


module.exports.categorySchema = categorySchema
module.exports.categoryModel = mongoose.model('Category', categorySchema)