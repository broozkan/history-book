const express = require('express')
const router = express.Router()
const School = require('../Models/School')
const Controller = require('../Controllers/Controller')
const multiparty = require('connect-multiparty')
const uploadDir = './public/images'
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: uploadDir })
const fs = require('fs')
const path = require('path');


// get school list
router.get('/list/:page', async (req, res) => {



    if (req.query) {
        req.query = Controller.deleteEmptyFilters(req.query)

        if (req.query.school_name) {
            req.query.school_name = { $regex: new RegExp(req.query.school_name, "i") }
        }
    }

    console.log(req.query);
    const aggregate = School.schoolModel.aggregate([{
        $match: req.query
    }])

    const options = {
        page: req.params.page,
        limit: 100
    }

    School.schoolModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})

// get specific school
router.get('/get/:schoolId', async (req, res) => {

    School.schoolModel.findById(req.params.schoolId, (err, result) => {
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

        req.body.school_photo = req.files.file.name
    } else {
        req.body.school_photo = 'school-default.jpg'
    }


    const school = new School.schoolModel({
        school_name: req.body.school_name,
        school_building_date: req.body.school_building_date,
        school_description: req.body.school_description,
        school_photo: req.body.school_photo

    })

    const savedSchool = school.save((err) => {
        if (err) {
            console.log(err);
            res.send({
                response: false,
                responseData: err.message
            })
        } else {
            res.send({
                response: true,
                responseData: savedSchool
            })

        }
    })

})


router.put('/update/:schoolId', MultipartyMiddleware, async (req, res) => {


    req.body = JSON.parse(req.body.data)


    let updateObject = {}
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

        req.body.school_photo = req.files.file.name

        updateObject = {
            school_name: req.body.school_name,
            school_building_date: req.body.school_building_date,
            school_description: req.body.school_description,
            school_photo: req.body.school_photo
        }
    } else {
        updateObject = {
            school_name: req.body.school_name,
            school_building_date: req.body.school_building_date,
            school_description: req.body.school_description
        }
    }




    // update operation
    await School.schoolModel.findByIdAndUpdate(
        { _id: req.params.schoolId },
        updateObject

        , (err, updatedSchool) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: err
                })
            } else {
                res.send({
                    response: true,
                    responseData: updatedSchool
                })
            }
        })

})


router.delete('/delete/:schoolId', async (req, res) => {

    await School.schoolModel.deleteOne({ _id: req.params.schoolId }, (err) => {
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