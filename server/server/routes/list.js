var express = require('express');
var router = express.Router();
var fs = require("fs");

router.use(express.static('public'));

router.get('/listUsers',function (req, res) {
  fs.readFile(__dirname+"/"+"users.json","utf8",function (err,data) {
    data=JSON.parse(data);
    console.log(data );
    //res.end(data);
    res.end(JSON.stringify(data));
  })
})

var user = {
  "user4" : {
    "name" : "mohit",
    "password" : "password4",
    "profession" : "teacher",
    "id": 4
  }
}

router.get('/addUser',function (req, res) {
  //读取已存在的数据
  fs.readFile(__dirname+"/"+"users.json","utf8",function (err, data) {
    data=JSON.parse(data);
    data["user4"]=user["user4"];
    console.log(data);
    res.end(JSON.stringify(data));
  })
})

router.get('/deleteUser',function (req, res) {
  //First read existing users.
  fs.readFile(__dirname+"/"+"users.json","utf8",function (err, data) {
    data=JSON.parse(data);
    delete data["user2"];
    console.log(data);
    res.end(JSON.stringify(data));
  })
})

router.get('/:id',function (req, res) {
  //首先我们读取已存在的用户
  fs.readFile(__dirname+"/"+"users.json","utf8",function (err, data) {
    data=JSON.parse(data);
    var user=data["user"+req.params.id]
    console.log(user);
    res.end(JSON.stringify(user));
  })
})

module.exports = router