var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
});

router.use(express.static('public'));

router.get('/index.html',function (req, res) {
  res.sendFile(__dirname+"/"+"index.html");
})

router.get('/process_get', function (req, res) {

  // 输出 JSON 格式
  var response = {
    "first_name":req.query.first_name,
    "last_name":req.query.last_name
  };
  console.log(response);
  res.end(JSON.stringify(response));
})

module.exports = router;
