const express = require('express');
require('dotenv').config();

const app = express();

const userRouter = require('./Routes/User')
const postRouter = require('./Routes/Post')
const donateRouter = require('./Routes/Donate')
const instituteRouter = require('./Routes/Institute')
const categoryRouter = require('./Routes/Category')
const studentRouter = require('./Routes/Student')
const staffRouter = require('./Routes/Staff')
const schoolRouter = require('./Routes/School')
const fileRouter = require('./Routes/File')
const excelRouter = require('./Routes/Excel')
const stockSearchRouter = require('./Routes/StockSearch')
const photoGalleryRouter = require('./Routes/PhotoGallery')
const studentCommentRouter = require('./Routes/StudentComment')
const studentRemoveRequestRouter = require('./Routes/StudentRemoveRequest')
const studentVerifyRequestRouter = require('./Routes/StudentVerifyRequest')

const cors = require('cors');

const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { response } = require('express');



/* connect to db */
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) throw err;
  console.log("Connected to db");
})
/* connect to db */


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cors middleware
app.use(cors());

app.use(express.static('/public'));





/* middlewares */
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods',)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})



/* routers */
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/donate', donateRouter);
app.use('/institute', instituteRouter);
app.use('/category', categoryRouter);
app.use('/student', studentRouter);
app.use('/staff', staffRouter);
app.use('/school', schoolRouter);
app.use('/file', fileRouter);
app.use('/excel', excelRouter);
app.use('/stock-search', stockSearchRouter);
app.use('/photo-gallery', photoGalleryRouter);
app.use('/student-comment', studentCommentRouter);
app.use('/student-remove-request', studentRemoveRequestRouter);
app.use('/student-verify-request', studentVerifyRequestRouter);




//comment

module.exports = app.listen(process.env.PORT || 8000, () => {
  console.log("Listening...")
})
