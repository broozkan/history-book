const express = require('express')
const router = express.Router()
const PhotoGallery = require('../Models/PhotoGallery')
const Controller = require('../Controllers/Controller')
const multiparty = require('connect-multiparty')
const uploadDir = './public/images'
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: uploadDir })
const fs = require('fs')
const path = require('path');
const mongoose = require('mongoose')

// get photoGallery list
router.get('/list/:page', async (req, res) => {



    if (req.query) {
        req.query = Controller.deleteEmptyFilters(req.query)

        if (req.query.photo_gallery_name) {
            req.query.photo_gallery_name = { $regex: new RegExp(req.query.photo_gallery_name, "i") }
        }

        if (req.query["photo_gallery_category._id"]) {
            req.query["photo_gallery_category._id"] = mongoose.Types.ObjectId(req.query["photo_gallery_category._id"])
        }
    }


    const aggregate = PhotoGallery.photoGalleryModel.aggregate([{
        $match: req.query
    }])

    const options = {
        page: req.params.page,
        limit: 8
    }

    PhotoGallery.photoGalleryModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})

// get specific photoGallery
router.get('/get/:photoGalleryId', async (req, res) => {

    PhotoGallery.photoGalleryModel.findById(req.params.photoGalleryId, (err, result) => {
        res.send(result)
    })
})


router.post('/new', MultipartyMiddleware, async (req, res) => {

    req.body = JSON.parse(req.body.data)

    if (req.files.file) {

        for (let index = 0; index < req.files.file.length; index++) {

            let tmp_path = req.files.file[index].path
            let target_path = path.join(uploadDir, req.files.file[index].name)

            console.log(target_path);

            if (fs.existsSync(tmp_path)) {
                fs.rename(tmp_path, target_path, (err) => {
                    if (err) {
                        res.send({
                            response: false,
                            responseData: "Dosya yüklenemedi"
                        })
                        res.end()

                        return false
                    } else {
                        fs.unlink(tmp_path, (err) => {
                            
                        })

                    }
                })
            }

        }


        req.body.photo_gallery_photos = req.files.file
    } else {
        req.body.photo_gallery_photos = []
    }


    const photoGallery = new PhotoGallery.photoGalleryModel({
        photo_gallery_name: req.body.photo_gallery_name,
        photo_gallery_category: req.body.photo_gallery_category,
        photo_gallery_photos: req.body.photo_gallery_photos

    })

    const savedPhotoGallery = photoGallery.save((err) => {
        if (err) {
            console.log(err);
            res.send({
                response: false,
                responseData: err.message
            })
        } else {
            res.send({
                response: true,
                responseData: savedPhotoGallery
            })

        }
    })

})


router.put('/update/:photoGalleryId', MultipartyMiddleware, async (req, res) => {


    req.body = JSON.parse(req.body.data)


    if (req.files.file) {
        const tmp_path = req.files.file.path
        const target_path = path.join(uploadDir, req.files.file.name)


        fs.rename(tmp_path, target_path, (err) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: "Dosya yüklenemedi"
                })
                res.end()

                return false
            } else {
                fs.unlink(tmp_path, (err) => {

                })

            }
        })

        req.body.photo_gallery_photo = req.files.file.name
    } else {
        req.body.photo_gallery_photo = 'photoGallery-default.jpg'
    }



    // update operation
    await PhotoGallery.photoGalleryModel.findByIdAndUpdate(
        { _id: req.params.photoGalleryId },
        {
            photo_gallery_name: req.body.photo_gallery_name,
            photo_gallery_category: req.body.photo_gallery_category,
            photo_gallery_photos: req.body.photo_gallery_photos
        }

        , (err, updatedPhotoGallery) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: err
                })
            } else {
                res.send({
                    response: true,
                    responseData: updatedPhotoGallery
                })
            }
        })

})


router.delete('/delete/:photoGalleryId', async (req, res) => {

    await PhotoGallery.deleteOne({ _id: req.params.photoGalleryId }, (err) => {
        if (err) {
            res.send({
                response: false,
                responseData: err
            })
        } else {
            res.send({
                response: true,
                responseData: "Başarılı"
            })
        }
    })

})


module.exports = router;