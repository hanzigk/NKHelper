var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(express.static('public'));

router.get('/index2.html', function (req, res) {
  res.sendFile( __dirname + "/" + "index2.html" );
})

router.post('/process_post', urlencodedParser, function (req, res) {

  // 输出 JSON 格式
  var response = {
    "first_name":req.body.first_name,
    "last_name":req.body.last_name
  };
  console.log(response);
  res.end(JSON.stringify(response));
})

module.exports = router
