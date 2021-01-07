const express = require('express')
const router = express.Router()
const StudentVerifyRequest = require('../Models/StudentVerifyRequest')
const Controller = require('../Controllers/Controller')

// get comments list
router.get('/list/:page', async (req, res) => {

    


    const aggregate =StudentVerifyRequest.studentVerifyRequestModel.aggregate()
    

    const options = { 
        page: req.params.page, 
        limit: 25
    }


    StudentVerifyRequest.studentVerifyRequestModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})

// get specific comment
router.get('/get/:studentCommentId', async (req, res) => {
    
    StudentVerifyRequest.studentVerifyRequestModel.findById(req.params.studentCommentId, (err, result) => {
        res.send(result)
    })
})


router.post('/new', Controller.verifySiteToken, async (req, res) => {


    newStudentVerifyRequest(req.body,(result)=>{
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



router.put('/update/:studentStudentVerifyRequestId', async (req, res) => {



   // update operation
   await StudentVerifyRequest.studentVerifyRequestModel.findByIdAndUpdate(
    { _id: req.params.studentCommentId },
    {
        student_verify_request: data.student_verify_request,
        student_verify_request_student: data.student_verify_request_student,
        student_verify_request_user: data.student_verify_request_user,
        student_verify_request_verify: false
    }

,(err, updatedStudentVerifyRequest) => {
    if (err) {
        res.send({
            response: false,
            responseData: err
        })
    } else {
        res.send({
            response: true,
            responseData: updatedStudentVerifyRequest
        })
    }
})

})




const newStudentVerifyRequest = async (data, callBack) => {

    


    const comment = new StudentVerifyRequest.studentVerifyRequestModel({
        student_verify_request_student: data.student_verify_request_student,
        student_verify_request_name_surname: data.student_verify_request_name_surname,
        student_verify_request_contact_info: data.student_verify_request_contact_info
    })

   // console.log(comment);
    const savedStudentVerifyRequest = await comment.save((err) => {
        let response
        if (err) {
            response = {
                status: false,
                err: err
            }
        } else {
            response = {
                status: true,
                data: comment
            }

        }
        callBack(response)
    })
}

module.exports = router;
module.exports.newStudentVerifyRequest = newStudentVerifyRequest;