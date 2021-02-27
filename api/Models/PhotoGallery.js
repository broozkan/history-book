const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")
const Category = require("./Category")

const photoGallerySchema = mongoose.Schema({
    photo_gallery_name: {
        type: String,
        required: [true, "Fotoğraf galerisi adı zorunludur"]
    },
    photo_gallery_category: [Category.categorySchema],
    photo_gallery_photos: {
        type: Array,
        required: [true, "Galeriye en az bir fotoğraf eklemek zorundasınız"]
    }
})

photoGallerySchema.plugin(aggregatePaginate);


module.exports.photoGallerySchema = photoGallerySchema
module.exports.photoGalleryModel = mongoose.model('PhotoGallery', photoGallerySchema)