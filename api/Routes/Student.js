const express = require('express')
const router = express.Router()
const Student = require('../Models/Student')
const multiparty = require('connect-multiparty')
const uploadDir = './public/images'
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: uploadDir })
const fs = require('fs')
const path = require('path');
const Controller = require('../Controllers/Controller')

// get students list
router.get('/list/:page', async (req, res) => {



    if (req.query) {
        req.query = Controller.deleteEmptyFilters(req.query)

        if (req.query.student_name) {
            req.query.student_name = { $regex: new RegExp(req.query.student_name, "i") }
        }

        if (req.query.student_father_name) {
            req.query.student_father_name = { $regex: new RegExp(req.query.student_father_name, "i") }
        }
    }


    const aggregate = Student.studentModel.aggregate([{
        $match: req.query
    }])


    const options = {
        page: req.params.page,
        limit: 25
    }

    console.log(aggregate);

    Student.studentModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})

// get specific student
router.get('/get/:studentId', async (req, res) => {

    Student.studentModel.findById(req.params.studentId, (err, result) => {
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

        req.body.student_photo = req.files.file.name
    } else {
        req.body.student_photo = 'profile.jpg'
    }




    newStudent(req.body, (result) => {
        if (result.status == false) {
            res.send({
                response: false,
                responseData: result.err.message
            })
        } else {
            res.send({
                response: true,
                responseData: result
            })

        }
    })

})



router.put('/update/:studentId', MultipartyMiddleware, async (req, res) => {

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

        req.body.student_photo = req.files.file.name
    } else {
        req.body.student_photo = "profile.jpg"
    }



    // update operation
    await Student.studentModel.findByIdAndUpdate(
        { _id: req.params.studentId },
        {
            student_school: req.body.student_school,
            student_name: req.body.student_name,
            student_surname: req.body.student_surname,
            student_father_name: req.body.student_father_name,
            student_photo: req.body.student_photo,
            student_gender: req.body.student_gender,
            student_birthday: req.body.student_birthday,
            student_nationality: req.body.student_nationality,
            student_school_number: req.body.student_school_number,
            student_education_beginning_year: req.body.student_education_beginning_year,
            student_education_ending_year: req.body.student_education_ending_year,
            student_middle_school_graduation_result: req.body.student_middle_school_graduation_result,
            student_high_school_graduation_exam: req.body.student_high_school_graduation_exam,
            student_high_school_graduation_result: req.body.student_high_school_graduation_result
        }

        , (err, updatedStudent) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: err
                })
            } else {
                res.send({
                    response: true,
                    responseData: updatedStudent
                })
            }
        })

})


router.get('/delete-all-students', async (req, res) => {

    await Student.studentModel.deleteMany({}, (err) => {
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

router.delete('/delete/:studentId', async (req, res) => {

    await Student.studentModel.deleteOne({ _id: req.params.studentId }, (err) => {
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


const newStudent = async (data, callBack) => {



    const student = new Student.studentModel({
        student_school: data.student_school,
        student_name: data.student_name,
        student_surname: data.student_surname,
        student_father_name: data.student_father_name,
        student_photo: data.student_photo,
        student_gender: data.student_gender,
        student_birthday: data.student_birthday,
        student_nationality: data.student_nationality,
        student_school_number: data.student_school_number,
        student_education_beginning_year: data.student_education_beginning_year,
        student_education_ending_year: data.student_education_ending_year,
        student_middle_school_graduation_result: data.student_middle_school_graduation_result,
        student_high_school_graduation_exam: data.student_high_school_graduation_exam,
        student_high_school_graduation_result: data.student_high_school_graduation_result
    })
    // console.log(student);
    const savedStudent = await student.save((err) => {
        let response
        if (err) {
            response = {
                status: false,
                err: err
            }
        } else {
            response = {
                status: true,
                data: student
            }

        }
        callBack(response)
    })
}

module.exports = router;
module.exports.newStudent = newStudent;