var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var topostRouter = require('./routes/topost');
var listRouter = require("./routes/list");
var testRouter = require("./routes/test");

var app = express();

app.set('json spaces', 4);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//  POST 请求
app.post('/', function (req, res) {
  console.log("主页 POST 请求");
  res.send('Hello POST');
})

//  /del_user 页面响应
app.get('/del_user', function (req, res) {
  console.log("/del_user 响应 DELETE 请求");
  res.send('删除页面');
})

//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
  console.log("/list_user GET 请求");
  res.send('用户列表页面');
})

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {
  console.log("/ab*cd GET 请求");
  res.send('正则匹配');
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/topost',topostRouter);
app.use('/list',listRouter);
app.use('/test',testRouter);

module.exports = app;
