const express = require('express')
const router = express.Router()
const Student = require('../Models/Student')
const multiparty = require('connect-multiparty')
const uploadDir = './public/images'
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: uploadDir })
const fs = require('fs')
const path = require('path');
const deleteEmptyFilters = require('../Controllers/Controller')

// get students list
router.get('/list/:page', async (req, res) => {

    

    if(req.query){   
        req.query = deleteEmptyFilters(req.query)
        
        if(req.query.student_name){
            req.query.student_name = { $regex : new RegExp(req.query.student_name, "i") }
        }
    }


    const aggregate =Student.aggregate([{
        $match : req.query
    }])
    

    const options = { 
        page: req.params.page, 
        limit: 3
    }
    
    Student.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})

// get specific student
router.get('/get/:studentId', async (req, res) => {
    
    Student.findById(req.params.studentId, (err, result) => {
        res.send(result)
    })
})


router.post('/new', MultipartyMiddleware, async (req, res) => {

    req.body = JSON.parse(req.body.data)


    if(req.files.file){
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
    }else{
        req.body.student_photo = 'profile.jpg'
    }
  



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


router.put('/update/:studentId', MultipartyMiddleware, async (req, res) => {

    req.body = JSON.parse(req.body.data)


    if(req.files.file){
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
    }else{
        req.body.student_photo = "profile.jpg"
    }

    console.log(req.body);

   // update operation
   await Student.findByIdAndUpdate(
    { _id: req.params.studentId },
    {
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
    }

,(err, updatedStudent) => {
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


router.delete('/delete/:studentId', async (req, res) => {
    
    await Student.deleteOne({ _id: req.params.studentId }, (err) => {
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