const express = require('express')
const router = express()
const fs = require('fs')




router.get('/:fileName', (req, res) => {
    console.log(req.params.fileName);
    const path = process.cwd()
    res.sendFile(path + '/public/images/'+req.params.fileName);
})




module.exports = router