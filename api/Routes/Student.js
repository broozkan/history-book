const express = require('express')
const router = express.Router()
const Student = require('../Models/Student')
const multiparty = require('connect-multiparty')
const uploadDir = './public/images'
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: uploadDir })
const fs = require('fs')
const path = require('path');


// get students list
router.get('/list/:page', async (req, res) => {

    const page = req.query.page


    let aggregate = Student.aggregate();
    aggregate.match(req.query)
    const options = { page: req.params.page, limit: 3 }

    Student.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })


})


router.post('/new', MultipartyMiddleware, async (req, res) => {

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


    req.body = JSON.parse(req.body.data)


    const student = new Student({
        student_name: req.body.student_name,
        student_surname: req.body.student_surname,
        student_father_name: req.body.student_father_name,
        student_photo: req.body.student_photo,
        student_gender: req.body.student_gender,
        student_birthday: req.body.student_birthday,
        student_nationality: req.body.student_nationality,
        student_school_number: req.body.student_school_number,
        student_book_number: req.body.student_book_number,
        student_middle_school_graduation_date: req.body.student_middle_school_graduation_date,
        student_middle_school_graduation_result: req.body.student_middle_school_graduation_result,
        student_high_school_graduation_date: req.body.student_high_school_graduation_date,
        student_high_school_graduation_result: req.body.student_high_school_graduation_result
    })

    const savedStudent = student.save((err) => {
        if (err) {
            console.log(err);
            res.send({
                response: false,
                responseData: err.message
            })
        } else {
            res.send({
                response: true,
                responseData: student
            })

        }
    })

})


module.exports = router;