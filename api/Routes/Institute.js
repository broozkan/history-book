const express = require('express')
const router = express.Router()
const Institute = require('../Models/Institute')
const multiparty = require('connect-multiparty')
const uploadDir = './public/images'
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: uploadDir })
const fs = require('fs')
const path = require('path');
const Controller = require('../Controllers/Controller')

// get institutes list
router.get('/list/:page', async (req, res) => {



    if (req.query) {
        req.query = Controller.deleteEmptyFilters(req.query)

        if (req.query.institute_name) {
            req.query.institute_name = { $regex: new RegExp(req.query.institute_name, "i") }
        }
    }


    const aggregate = Institute.aggregate([{
        $match: req.query
    }])


    const options = {
        page: req.params.page,
        limit: 3
    }

    Institute.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})

// get specific institute
router.get('/get/:instituteId', async (req, res) => {

    Institute.findById(req.params.instituteId, (err, result) => {
        res.send(result)
    })
})


router.post('/new', MultipartyMiddleware, async (req, res) => {

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

        req.body.institute_photo = req.files.file.name
    } else {
        req.body.institute_photo = 'no-photo.jpg'
    }




    const institute = new Institute({
        institute_name: req.body.institute_name,
        institute_photo: req.body.institute_photo
    })

    const savedInstitute = institute.save((err) => {
        if (err) {
            console.log(err);
            res.send({
                response: false,
                responseData: err.message
            })
        } else {
            res.send({
                response: true,
                responseData: institute
            })

        }
    })

})


router.put('/update/:instituteId', MultipartyMiddleware, async (req, res) => {

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

        req.body.institute_photo = req.files.file.name
    }

    console.log(req.body);

    // update operation
    await Institute.findByIdAndUpdate(
        { _id: req.params.instituteId },
        {
            institute_name: req.body.institute_name,
            institute_photo: req.body.institute_photo
        }

        , (err, updatedInstitute) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: err
                })
            } else {
                res.send({
                    response: true,
                    responseData: updatedInstitute
                })
            }
        })

})


router.delete('/delete/:instituteId', async (req, res) => {

    await Institute.deleteOne({ _id: req.params.instituteId }, (err) => {
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