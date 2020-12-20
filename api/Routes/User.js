const express = require('express')
const router = express.Router()
const User = require('../Models/User')



router.get('/login', (req, res) => {

    const user = User.userModel.findOne(req.body,(err, result)=>{

        if(err){
            res.send({
                response: false,
                responseData: err.message
            })
        }else{
            res.send({
                response: true,
                responseData: result
            })
        }

    })
})



router.post('/register', (req, res) => {

    const user = new User.userModel({
        user_username: req.body.user_username,
        user_password: req.body.user_password
    })

    const savedUser = user.save((err)=>{

        if(err){
            res.send({
                response: false,
                responseData: err.message
            })
        }else{
            res.send({
                response: true,
                responseData: user
            })
        }
    })


})



module.exports = router
