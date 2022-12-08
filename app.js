const dotenv = require("dotenv");
dotenv.config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { useMiddlewares } = require("./src/middlewares");
const { useRoutes } = require("./src/routes");
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require("cors");
let multer = require('multer');
let upload = multer();
var app = express();
app.use(cors({origin:"*"}));
app.use(upload.any());
useMiddlewares(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

useRoutes(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(require("bcrypt").hashSync("Abc@123",10));
  res.redirect("/api-docs");
  //res.NotFound("");
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.send({status:500,data:{message:err.message,stack:err.stack},message:"ISE"});
});

module.exports = app;
