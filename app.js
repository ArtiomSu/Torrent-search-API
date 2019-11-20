var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var errorHandler = require('./routes/error');
var everything_else = require('./routes/everything_else');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);

//app.use("*", errorRouter);
app.use("*", everything_else);
app.use((error, req, res, next) => errorHandler(error, req, res, next));

// app.use("*", function (err, req, res, next) {
//     console.log("last thing");
//     res.json({hmm: "hmm"});
// });
module.exports = app;
