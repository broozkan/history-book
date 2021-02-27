const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { verifySiteToken } = require('../Controllers/Controller')
const StockSearch = require('../Models/StockSearch')

// get stock search list
router.get('/list/:page', verifySiteToken, async (req, res) => {


    const aggregate =StockSearch.stockSearchModel.aggregate([{
        $match : {
            'stock_search_user.user_email':req.user.user_email  
        }
    }])
    

    const options = { 
        page: req.params.page, 
        limit: 25
    }

    StockSearch.stockSearchModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})

// get specific stock search
router.get('/get/:stockSearchId', async (req, res) => {
    
    StockSearch.stockSearchModel.findById(req.params.stockSearchId, (err, result) => {
        res.send(result)
    })
})


router.post('/new', async (req, res) => {


    const token = req.header('site-token')


    if(!token){
        res.send({
            response: false,
            responseData: "Oturum açmanız gerekli",
            status: 401
        })
        return false
    }

    const user = jwt.verify(token, process.env.TOKEN_SECRET)

    req.body.user = user.userData[0]

    newStockSearch(req.body,(result)=>{
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



router.put('/update/:studentId', async (req, res) => {

    req.body = JSON.parse(req.body.data)

   // update operation
   await StockSearch.findByIdAndUpdate(
    { _id: req.params.studentId },
    {
        stock_search_student_name: req.body.stock_search_student_name,
        stock_search_student_surname: req.body.stock_search_student_surname,
        stock_search_student_birthday: req.body.stock_search_student_birthday,
        student_education_beginning_year: req.body.student_education_beginning_year,
        student_education_ending_year: req.body.student_education_ending_year,
        student_father_name: req.body.student_father_name,
        student_gender: req.body.student_gender,
        student_nationality: req.body.student_nationality,
        student_school_number: req.body.student_school_number
    }

,(err, updatedStockSearch) => {
    if (err) {
        res.send({
            response: false,
            responseData: err
        })
    } else {
        res.send({
            response: true,
            responseData: updatedStockSearch
        })
    }
})

})



router.delete('/delete/:stockSearchId', async (req, res) => {
    
    await StockSearch.stockSearchModel.deleteOne({ _id: req.params.stockSearchId }, (err) => {
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




const newStockSearch = async (data, callBack) => {


    const stockSearch = new StockSearch.stockSearchModel({
        stock_search_card_name: data.stock_search_card_name,
        stock_search_student_name: data.student_name,
        stock_search_student_surname: data.student_surname,
        stock_search_student_birthday: data.student_birthday,
        stock_search_student_education_beginning_year: data.student_education_beginning_year,
        stock_search_student_education_ending_year: data.student_education_ending_year,
        stock_search_student_father_name: data.student_father_name,
        stock_search_student_gender: data.student_gender,
        stock_search_student_nationality: data.student_nationality,
        stock_search_student_school_number: data.student_school_number,
        stock_search_user: data.user
    })
   // console.log(student);
    const savedStockSearch = await stockSearch.save((err) => {
        let response
        if (err) {
            response = {
                status: false,
                err: err
            }
        } else {
            response = {
                status: true,
                data: savedStockSearch
            }

        }
        callBack(response)
    })
}

module.exports = router;
module.exports.newStockSearch = newStockSearch;