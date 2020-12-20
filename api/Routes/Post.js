const express = require('express')
const router = express.Router()
const Post = require('../Models/Post')
const multiparty = require('connect-multiparty')
const uploadDir = './public/images'
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: uploadDir })
const fs = require('fs')
const path = require('path');
const deleteEmptyFilters = require('../Controllers/Controller')

// get posts list
router.get('/list/:page', async (req, res) => {

    

    if(req.query){   
        req.query = deleteEmptyFilters(req.query)
        
        if(req.query.post_name){
            req.query.post_name = { $regex : new RegExp(req.query.post_name, "i") }
        }
    }


    const aggregate =Post.aggregate([{
        $match : req.query
    }])
    

    const options = { 
        page: req.params.page, 
        limit: 3
    }
    
    Post.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})

// get specific post
router.get('/get/:postId', async (req, res) => {
    
    Post.findById(req.params.postId, (err, result) => {
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
    
        req.body.post_photo = req.files.file.name
    }else{
        req.body.post_photo = 'no-photo.jpg'
    }
  
  


    const post = new Post({
        post_title: req.body.post_title,
        post_alternative_title: req.body.post_alternative_title,
        post_photo: req.body.post_photo,
        post_category: req.body.post_category,
        post_content: req.body.post_content
    })

    const savedPost = post.save((err) => {
        if (err) {
            console.log(err);
            res.send({
                response: false,
                responseData: err.message
            })
        } else {
            res.send({
                response: true,
                responseData: post
            })

        }
    })

})


router.put('/update/:postId', MultipartyMiddleware, async (req, res) => {

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
        
        req.body.post_photo = req.files.file.name
    }else{
        req.body.post_photo = "profile.jpg"
    }

    console.log(req.body);

   // update operation
   await Post.findByIdAndUpdate(
    { _id: req.params.postId },
    {
        post_title: req.body.post_title,
        post_alternative_title: req.body.post_alternative_title,
        post_photo: req.body.post_photo,
        post_category: req.body.post_category,
        post_content: req.body.post_content
    }

,(err, updatedPost) => {
    if (err) {
        res.send({
            response: false,
            responseData: err
        })
    } else {
        res.send({
            response: true,
            responseData: updatedPost
        })
    }
})

})


router.delete('/delete/:postId', async (req, res) => {
    
    await Post.deleteOne({ _id: req.params.postId }, (err) => {
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