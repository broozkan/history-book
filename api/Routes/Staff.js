const express = require('express')
const router = express.Router()
const Staff = require('../Models/Staff')
const multiparty = require('connect-multiparty')
const uploadDir = './public/images'
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: uploadDir })
const fs = require('fs')
const path = require('path');
const Controller = require('../Controllers/Controller')

// get staffs list
router.get('/list/:page', async (req, res) => {

    

    if(req.query){   
        req.query = Controller.deleteEmptyFilters(req.query)
        
        if(req.query.staff_name){
            req.query.staff_name = { $regex : new RegExp(req.query.staff_name, "i") }
        }
    }


    const aggregate =Staff.aggregate([{
        $match : req.query
    }])
    

    const options = { 
        page: req.params.page, 
        limit: 100
    }
    
    Staff.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})

// get specific staff
router.get('/get/:staffId', async (req, res) => {
    
    Staff.findById(req.params.staffId, (err, result) => {
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
    
        req.body.staff_photo = req.files.file.name
    }else{
        req.body.staff_photo = 'profile.jpg'
    }
  

    newStaff(req.body,(result)=>{
        if(result.status == false){
            res.send({
                response: false,
                responseData: result.err.message
            })
        }else{
            res.send({
                response: true,
                responseData: result
            })
           
        }
    })


})


router.put('/update/:staffId', MultipartyMiddleware, async (req, res) => {

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
        
        req.body.staff_photo = req.files.file.name
    }else{
        req.body.staff_photo = "profile.jpg"
    }

    console.log(req.body);

   // update operation
   await Staff.findByIdAndUpdate(
    { _id: req.params.staffId },
    {
        staff_school: req.body.staff_school,
        staff_name: req.body.staff_name,
        staff_surname: req.body.staff_surname,
        staff_photo: req.body.staff_photo,
        staff_birthday: req.body.staff_birthday,
        staff_nationality: req.body.staff_nationality,
        staff_country: req.body.staff_country,
        staff_gender: req.body.staff_gender,
        staff_duty: req.body.staff_duty,
        staff_branch: req.body.staff_branch,
        staff_duty_beginning_date: req.body.staff_duty_beginning_date,
        staff_duty_ending_date: req.body.staff_duty_ending_date
    }

,(err, updatedStaff) => {
    if (err) {
        res.send({
            response: false,
            responseData: err
        })
    } else {
        res.send({
            response: true,
            responseData: updatedStaff
        })
    }
})

})


router.get('/delete-all-staffs', async (req, res) => {
 
    await Staff.deleteMany({}, (err) => {
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


router.delete('/delete/:staffId', async (req, res) => {
    
    await Staff.deleteOne({ _id: req.params.staffId }, (err) => {
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





const newStaff = async (data, callBack) => {

    const staff = new Staff({
        staff_school: data.staff_school,
        staff_name: data.staff_name,
        staff_surname: data.staff_surname,
        staff_photo: data.staff_photo,
        staff_birthday: data.staff_birthday,
        staff_nationality: data.staff_nationality,
        staff_country: data.staff_country,
        staff_father_name: data.staff_father_name,
        staff_gender: data.staff_gender,
        staff_duty: data.staff_duty,
        staff_branch: data.staff_branch,
        staff_duty_beginning_date: data.staff_duty_beginning_date,
        staff_duty_ending_date: data.staff_duty_ending_date
    })

   // console.log(staff);
    const savedStaff = await staff.save((err) => {
        let response
        if (err) {
            response = {
                status: false,
                err: err
            }
        } else {
            response = {
                status: true,
                data: staff
            }

        }
        callBack(response)
    })
}


module.exports = router;
module.exports.newStaff = newStaff;