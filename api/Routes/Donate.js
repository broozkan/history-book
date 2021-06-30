const express = require('express')
const router = express()
const Payment = require('../Classes/Payment')


router.get('/initialize', async (req, res) => {

    const payment = new Payment()

    payment.initializePayment(req.query, (result) => {
        res.send(result)
    })

})


router.post('/callback', async (req, res) => {

    const payment = new Payment()
    payment.retrieve(req.body, (result) => {
        if (result.paymentStatus == 'SUCCESS') {

            res.redirect(`${process.env.FRONTEND_BASE_URL}/odeme/basarili`)
        } else {
            res.redirect(`${process.env.FRONTEND_BASE_URL}/odeme/basarisiz/${result.errorMessage}`)
        }
    })

})



module.exports = router