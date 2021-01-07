const express = require('express')
const router = express.Router()
const User = require('../Models/User')
const jwt = require('jsonwebtoken')


router.post('/login', async (req, res) => {

    let authHeader = req.headers.authorization;

    var auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
    const username = auth[0]
    const password = auth[1]
    
    const filters = {
        user_email:username,
        user_password:password
    }

    await User.userModel.find(filters, (err, user) => {
        if (err) {
            res.send({
                response: false,
                responseData: err.message
            })
        } else {
            
            if(user.length > 0){
                // success authentication
                // create token
                const token = jwt.sign({userData:user}, process.env.TOKEN_SECRET)
                res.header('auth-token', token)
            
                
            
                res.send({
                    response: true,
                    token: token,
                    responseData: user
                })
            }else{
                res.send({
                    response: false,
                    responseData: "Kullanıcı adı veya parola hatalı!"
                })
            }
           
        }

    })
})



router.post('/register', async (req, res) => {

    
    if (req.body.user_password != req.body.user_password_repeat) {
        res.send({
            response: false,
            responseData: "Parolalar uyuşmuyor!"
        })
        return false
    }


    //check email exist
    let emailExist;
    await User.userModel.findOne({ user_email: req.body.user_email}, (err, result) => {
        if (result == null) {
            emailExist = null
        } else {
            emailExist = result
        }
    })

    if (emailExist != null) {
        res.send({
            response: false,
            responseData: "E-posta adresi başka bir kullanıcı tarafından kullanılmaktadır!"
        })
        return false
    }


    const user = new User.userModel({
        user_name: req.body.user_name,
        user_surname: req.body.user_surname,
        user_email: req.body.user_email,
        user_password: req.body.user_password,
        user_phone_number: req.body.user_phone_number,
        is_user_graduated_from_sivaslisesi: req.body.is_user_graduated_from_sivaslisesi,
        user_email_verify: req.body.user_email_verify
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
