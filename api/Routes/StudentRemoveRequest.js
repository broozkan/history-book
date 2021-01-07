const express = require('express')
const router = express.Router()
const StudentRemoveRequest = require('../Models/StudentRemoveRequest')
const Controller = require('../Controllers/Controller')

// get comments list
router.get('/list/:page', async (req, res) => {

    


    const aggregate =StudentRemoveRequest.studentRemoveRequestModel.aggregate()
    

    const options = { 
        page: req.params.page, 
        limit: 25
    }


    StudentRemoveRequest.studentRemoveRequestModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})

// get specific comment
router.get('/get/:studentCommentId', async (req, res) => {
    
    StudentRemoveRequest.studentRemoveRequestModel.findById(req.params.studentCommentId, (err, result) => {
        res.send(result)
    })
})


router.post('/new', Controller.verifySiteToken, async (req, res) => {


    newStudentRemoveRequest(req.body,(result)=>{
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



router.put('/update/:studentStudentRemoveRequestId', async (req, res) => {



   // update operation
   await StudentRemoveRequest.studentRemoveRequestModel.findByIdAndUpdate(
    { _id: req.params.studentCommentId },
    {
        student_remove_request: data.student_remove_request,
        student_remove_request_student: data.student_remove_request_student,
        student_remove_request_user: data.student_remove_request_user,
        student_remove_request_verify: false
    }

,(err, updatedStudentRemoveRequest) => {
    if (err) {
        res.send({
            response: false,
            responseData: err
        })
    } else {
        res.send({
            response: true,
            responseData: updatedStudentRemoveRequest
        })
    }
})

})



router.delete('/delete/:studentCommentId', async (req, res) => {
    
    await StudentRemoveRequest.studentRemoveRequestModel.deleteOne({ _id: req.params.studentCommentId }, (err) => {
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


const newStudentRemoveRequest = async (data, callBack) => {

    


    const comment = new StudentRemoveRequest.studentRemoveRequestModel({
        student_remove_request_student: data.student_remove_request_student,
        student_remove_request_user_name_surname: data.student_remove_request_user_name_surname,
        student_remove_request_contact_info: data.student_remove_request_contact_info
    })

   // console.log(comment);
    const savedStudentRemoveRequest = await comment.save((err) => {
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
module.exports.newStudentRemoveRequest = newStudentRemoveRequest;