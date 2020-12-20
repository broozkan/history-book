const mongoose = require('mongoose')
const Category = require('./Category')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const postSchema = mongoose.Schema({
    post_title: {
        type: String,
        required: [true, "Yazı başlığı zorunludur"]
    },
    post_alternative_title: {
        type: String,
        required: [true, "Yazı alt başlığı zorunludur"]
    },
    post_photo: {
        type: String,
        required: [true, "Yazı görseli zorunludur"]
    },
    post_category: [Category.categorySchema],
    post_content: {
        type: String,
        required: [true, "Yazı alanı boş bırakılamaz"]
    }
})

postSchema.plugin(aggregatePaginate);


module.exports = mongoose.model('Post', postSchema)