const express = require('express')
const router = express.Router()
const Category = require('../Models/Category')
const Controller = require('../Controllers/Controller')
const mongoose = require('mongoose')

// get categories list
router.get('/list/:page', async (req, res) => {



    if (req.query) {
        req.query = Controller.deleteEmptyFilters(req.query)

        if (req.query.category_name) {
            req.query.category_name = { $regex: new RegExp(req.query.category_name, "i") }
        }

        if(req.query.is_category_main){
            req.query.is_category_main = (req.query.is_category_main == "true")
        }

    }

    const aggregate = Category.categoryModel.aggregate([{
        $match: req.query
    }])

    const options = {
        page: req.params.page,
        limit: 100
    }

    Category.categoryModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result).status(200)
    })
})

// get specific category
router.get('/get/:categoryId', async (req, res) => {

    Category.categoryModel.findById(req.params.categoryId, (err, result) => {
        res.send(result)
    })
})


router.post('/new', async (req, res) => {



    const category = new Category.categoryModel({
        category_name: req.body.category_name,
        category_type: req.body.category_type,
        category_upper_category: req.body.category_upper_category,
        is_category_main: req.body.is_category_main

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

const testFunc = () => {
    return "buthili"
}


router.put('/update/:categoryId', async (req, res) => {


    // update operation
    await Category.categoryModel.findByIdAndUpdate(
        { _id: req.params.categoryId },
        {
            category_name: req.body.category_name,
            category_type: req.body.category_type,
            category_upper_category: req.body.category_upper_category,
            is_category_main: req.body.is_category_main
        }

        , (err, updatedCategory) => {
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

    await Category.categoryModel.deleteOne({ _id: req.params.categoryId }, (err) => {
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