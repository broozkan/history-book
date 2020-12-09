const express = require('express')
const router = express.Router()
const Category = require('../Models/Category')
const deleteEmptyFilters = require('../Controllers/Controller')

// get categories list
router.get('/list/:page', async (req, res) => {

    

    if(req.query){   
        req.query = deleteEmptyFilters(req.query)
        
        if(req.query.category_name){
            req.query.category_name = { $regex : new RegExp(req.query.category_name, "i") }
        }
    }


    const aggregate = Category.aggregate([{
        $match : req.query
    }])
    

    const options = { 
        page: req.params.page, 
        limit: 3
    }
    
    Category.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})

// get specific category
router.get('/get/:categoryId', async (req, res) => {
    
    Category.findById(req.params.categoryId, (err, result) => {
        res.send(result)
    })
})


router.post('/new', async (req, res) => {

    req.body = JSON.parse(req.body.data)

  
    const category = new Category({
        category_name: req.body.category_name
    })

    const savedCategory = category.save((err) => {
        if (err) {
            console.log(err);
            res.send({
                response: false,
                responseData: err.message
            })
        } else {
            res.send({
                response: true,
                responseData: category
            })

        }
    })

})


router.put('/update/:categoryId', async (req, res) => {

    req.body = JSON.parse(req.body.data)



    // update operation
   await Category.findByIdAndUpdate(
    { _id: req.params.categoryId },
    {
        category_name: req.body.category_name
    }

,(err, updatedCategory) => {
    if (err) {
        res.send({
            response: false,
            responseData: err
        })
    } else {
        res.send({
            response: true,
            responseData: updatedCategory
        })
    }
})

})


router.delete('/delete/:categoryId', async (req, res) => {
    
    await Category.deleteOne({ _id: req.params.categoryId }, (err) => {
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