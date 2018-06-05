var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var fs = require("fs");
var url = require('url');
var connection = mysql.createConnection({
  host      :'localhost',
  user      :'root',
  password  :'000000',
  port      :'3306',
  //atabase  :'courseratingsystem'
  database  :'NKHelper'
})

connection.connect();

/*
router.get('/one',function (req, res) {
  fs.readFile(__dirname+"/"+"users.json","utf8",function (err,data) {
    data=JSON.parse(data);
    console.log(data );
    //res.end(data);
    res.end(JSON.stringify(data));
  })
})
*/

//在主页中，获得所有未被人满接的订单信息，按时间排序
router.get('/search',function (req, res) {
  res.writeHead(200,{'Content-type': 'text/plain'});

  var params = url.parse(req.url,true).query;
  console.log(params.name);
  console.log(params.url);
  res.end();

  /*
  connection.query(sql1,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    console.log(result);
    res.end(JSON.stringify(result));
  })
  */
})

module.exports = router