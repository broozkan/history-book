const express = require('express')
const router = express.Router()
const StudentComment = require('../Models/StudentComment')
const Controller = require('../Controllers/Controller')

// get comments list
router.get('/list/:page', async (req, res) => {



    if (req.query) {
        req.query = Controller.deleteEmptyFilters(req.query)

        if (req.query.user_name) {
            req.query['student_comment_user.user_name'] = { $regex: new RegExp(req.query.user_name, "i") }
            delete (req.query.user_name)
        }


        if (req.query.student_name) {
            req.query['student_comment_student.student_name'] = { $regex: new RegExp(req.query.student_name, "i") }
            delete (req.query.student_name)
        }

        if (req.query.student_comment_verify) {
            if (req.query.student_comment_verify === '0') {
                req.query.student_comment_verify = false
            } else {
                req.query.student_comment_verify = true
            }
        }

    }
    console.log(req.query);

    const aggregate = StudentComment.studentCommentModel.aggregate([{
        $match: req.query
    }])


    const options = {
        page: req.params.page,
        limit: 25
    }



    StudentComment.studentCommentModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})

// get specific comment
router.get('/get/:studentCommentId', async (req, res) => {

    StudentComment.studentCommentModel.findById(req.params.studentCommentId, (err, result) => {
        res.send(result)
    })
})


router.post('/new', Controller.verifySiteToken, async (req, res) => {

    req.body.student_comment_user = req.user

    newStudentComment(req.body, (result) => {
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


router.put('/verify-comment/:studentCommentId', async (req, res) => {

    // update operation
    await StudentComment.studentCommentModel.findByIdAndUpdate(
        { _id: req.params.studentCommentId },
        {
            student_comment_verify: true
        }

        , (err, updatedStudentComment) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: err
                })
            } else {
                res.send({
                    response: true,
                    responseData: updatedStudentComment
                })
            }
        })
})



router.put('/unverify-comment/:studentCommentId', async (req, res) => {

    // update operation
    await StudentComment.studentCommentModel.findByIdAndUpdate(
        { _id: req.params.studentCommentId },
        {
            student_comment_verify: false
        }

        , (err, updatedStudentComment) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: err
                })
            } else {
                res.send({
                    response: true,
                    responseData: updatedStudentComment
                })
            }
        })
})

router.put('/update/:studentCommentId', async (req, res) => {



    // update operation
    await StudentComment.studentCommentModel.findByIdAndUpdate(
        { _id: req.params.studentCommentId },
        {
            student_comment: req.body.student_comment
        }

        , (err, updatedStudentComment) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: err
                })
            } else {
                res.send({
                    response: true,
                    responseData: updatedStudentComment
                })
            }
        })

})


router.get('/delete-all-comments', async (req, res) => {

    await StudentComment.studentCommentModel.deleteMany({}, (err) => {
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

router.delete('/delete/:studentCommentId', async (req, res) => {

    await StudentComment.studentCommentModel.deleteOne({ _id: req.params.studentCommentId }, (err) => {
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


const newStudentComment = async (data, callBack) => {




    const comment = new StudentComment.studentCommentModel({
        student_comment: data.student_comment,
        student_comment_student: data.student_comment_student,
        student_comment_user: data.student_comment_user,
        student_comment_verify: false
    })

    // console.log(comment);
    const savedStudentComment = await comment.save((err) => {
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
module.exports.newStudentComment = newStudentComment;