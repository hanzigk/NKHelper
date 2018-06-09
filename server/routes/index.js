var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var url = require('url');
var request = require('request');
var connection = mysql.createConnection({
  host      :'https://1fpvdbfz.qcloud.la/phpmyadmin',
  user      :'root@localhost',
  password  :'wx790b509e5d6f759f',
  port      :'3306',
  database  :'NKHelper'
})

connection.connect();

//onlogin?code=***
router.get('/onlogin',function (req, res, next) {
  let code = req.query.code;
  console.log("code:"+code);

  request.get({
    uri:'https://api.weixin.qq.com/sns/jscode2session',
    json:true,
    qs:{
      grant_type:'authorization_code',
      appid:'wx790b509e5d6f759f',
      secret:'3a104c90a9e7bca5cacfcd21f10c223f',
      js_code:code
    }
  },(err,response,data) => {
    if(response.statusCode === 200){
      //console.log(response);
      console.log(data);

      console.log("[openid]:", data.openid);
      console.log("[session_key]:", data.session_key);

      //TODO: 生成一个唯一字符串sessionid作为键，将openid和session_key作为值，存入redis，超时时间设置为2小时
      //伪代码: redisStore.set(sessionid, openid + session_key, 7200)
      res.json({ openid: data.openid});
    }else{
      console.log("[error]:",err);
      res.json(err);
    }
  })
})

//在主页中，获得所有未被人满接的订单信息，按时间排序
router.get('/searchAll',function (req, res) {
  var tempSQL = 'SELECT order_put.*,user.* FROM order_put JOIN user ON order_put.Wechat_Number_Put = user.Wechat_Number WHERE order_put.Order_NowNumber < order_put.Order_MaxNumber ORDER BY OrderPut_ID DESC';
  connection.query(tempSQL,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      res.end();
      return;
    }
    //console.log(result);
    res.end(JSON.stringify(result));
  })
})

//搜索，按关键字搜索，/searchByKey?keyword=***
router.get('/searchByKey',function (req, res) {
  var params = url.parse(req.url,true).query;
  var tempSQL = 'SELECT order_put.*,`user`.* FROM order_put JOIN `user` ON order_put.Wechat_Number_Put = `user`.Wechat_Number \n' +
    'WHERE order_put.Order_NowNumber < order_put.Order_MaxNumber \n' +
    'AND ( order_put.Order_Content LIKE "%'+ params.keyword +'%" \n' +
    'OR order_put.Order_Title LIKE "%'+ params.keyword +'%" OR user.Nickname LIKE "%'+ params.keyword +'%") \n' +
    'ORDER BY order_put.OrderPut_ID DESC';
  connection.query(tempSQL,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      res.end();
      return;
    }
    //console.log(result);
    res.end(JSON.stringify(result));
  })
})

//按类型，获得所有未被人满接的订单信息，按时间排序，/searchByType?type=***
router.get('/searchByType',function (req, res) {
  var params = url.parse(req.url,true).query;
  var tempSQL = 'SELECT order_put.*,user.* FROM order_put JOIN user ON order_put.Wechat_Number_Put = user.Wechat_Number WHERE order_put.Order_NowNumber < order_put.Order_MaxNumber AND order_put.Order_Type = ' + params.type + ' ORDER BY OrderPut_ID DESC';
  connection.query(tempSQL,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      res.end();
      return;
    }
    //console.log(result);
    res.end(JSON.stringify(result));
  })
})

//按OrderPut_ID，获得所有未被人满接的订单信息，按时间排序，/searchByOrderPutID?OrderPut_ID=***
router.get('/searchByOrderPutID',function (req, res) {
  var params = url.parse(req.url,true).query;
  var tempSQL = 'SELECT order_put.*,user.* FROM order_put JOIN user ON order_put.Wechat_Number_Put = user.Wechat_Number WHERE OrderPut_ID = ' + params.OrderPut_ID;
  connection.query(tempSQL,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      res.end();
      return;
    }
    //console.log(result);
    res.end(JSON.stringify(result));
  })
})

//查看我发的任务，返回订单信息和接订单人的名字，/searchMyPut?Wechat_Number_Put=***,//这个方法有问题
router.get('/searchMyPut',function (req, res) {
  var params = url.parse(req.url,true).query;
  var tempSQL = 'SELECT * FROM order_put JOIN order_get ON order_put.Wechat_Number_Put = "' + params.Wechat_Number_Put
    + '" AND order_put.OrderPut_ID = order_get.OrderGet_ID ORDER BY order_put.OrderPut_ID DESC';
  connection.query(tempSQL,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      res.end();
      return;
    }
    console.log(result);
    res.end(JSON.stringify(result));
  })
})

//查看我发的任务,//getMyPut?Wechat_Number_Put=***
router.get('/getMyPut',function (req, res) {
  var params = url.parse(req.url,true).query;
  var tempSQL = 'SELECT order_put.*,user.* FROM order_put JOIN user ON order_put.Wechat_Number_Put = user.Wechat_Number WHERE Wechat_Number_Put = "'+ params.Wechat_Number_Put +'" Order BY order_put.OrderPut_ID DESC';
  connection.query(tempSQL,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      res.end();
      return;
    }
    console.log(result);
    res.end(JSON.stringify(result));
  })
})

//查看我发的一个任务的详细情况，包括接受任务的人的信息，//getMyOnePut?OrderGet_ID=***
router.get('/getMyOnePut',function (req, res) {
  var params = url.parse(req.url,true).query;
  var tempSQL = 'SELECT * FROM order_get JOIN user ON order_get.Wechat_Number_Get = user.Wechat_Number WHERE OrderGet_ID = '+ params.OrderGet_ID;
  connection.query(tempSQL,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      res.end();
      return;
    }
    console.log(result);
    res.end(JSON.stringify(result));
  })
})

//查看我接的任务，返回订单信息和发订单人的信息，/searchMyGet?Wechat_Number_Get=***
router.get('/searchMyGet',function (req, res) {
  var params = url.parse(req.url,true).query;
  var tempSQL = 'SELECT * FROM (((SELECT * FROM order_get JOIN order_put ON order_get.Wechat_Number_Get = \n' +
    '"'+ params.Wechat_Number_Get +'" AND order_get.OrderGet_ID = order_put.OrderPut_ID) AS table1 )\n' +
    'JOIN `user` ON table1.Wechat_Number_Put = `user`.Wechat_Number) \n' +
    'ORDER BY table1.OrderGet_ID DESC';
  connection.query(tempSQL,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      res.end();
      return;
    }
    //console.log(result);
    res.end(JSON.stringify(result));
  })
})

//增加user，这个用户第一次登陆，/addUser?Wechat_Number=***&Wechat_Name=***&Phone_Number=***&NickName=***&Address=***&Image=***
router.get('/addUser',function (req, res) {
  var params = url.parse(req.url,true).query;
  var tempSQL = 'INSERT INTO user VALUES ("'+ params.Wechat_Number + '","'+ params.Wechat_Name+ '","'
    + params.Phone_Number +'","'+ params.NickName +'","'+ params.Address +'",80,0,"'+ params.Image +'")';
  connection.query(tempSQL,function (err, result) {
    if(err){
      console.log('[INSERT ERROR] - ',err.message);
      res.end('database error');
      return;
    }
    console.log(result);
    //返回的是如下的一些信息
    /*
    OkPacket {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      serverStatus: 2,
      warningCount: 0,
      message: '',
      protocol41: true,
      changedRows: 0 }
     */
    res.end(JSON.stringify(result));
  })
})

//增加发任务，/addOrderPut?Wechat_Number_Put=***&Order_Type=***&Order_Content=***&Order_MaxNumber=***&Order_Photo=***&Order_Title=***
router.get('/addOrderPut',function (req,res) {
  var params = url.parse(req.url,true).query;
  //首先判断此人已发未完成订单的数量
  var tempSQL0 = 'SELECT COUNT(*) FROM order_put WHERE Wechat_Number_Put = "'+ params.Wechat_Number_Put + '" AND Order_Finish < Order_MaxNumber';
  connection.query(tempSQL0,function (first_err, first_result) {
    if(first_err){
      console.log('[SELECT ERROR] - ',first_err.message);
      res.end('database error');
      return;
    }
    console.log(first_result);
    var first_count = first_result[0]['COUNT(*)'];
    console.log('first_count:'+ first_count);
    if(first_count==3){
      res.end('error:outoflimit');
      return;
    }
    //得到当前任务数量，确定任务ID
    var tempSQL1 = 'SELECT COUNT(*) FROM order_put';
    var count = 0;
    connection.query(tempSQL1,function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        res.end('database error');
        return;
      }
      console.log(result);
      count = result[0]['COUNT(*)'];
      console.log('count:'+ count);
      var finalCount = count+1;
      console.log('finalCount:'+ finalCount);
      //得到当前时间
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      var finaldate = year +'-'+ month +'-'+ day +" "+ hour +':'+ minute + ':'+ second;
      console.log(date);
      console.log(finaldate);
      var tempSQL2 = 'INSERT INTO order_put VALUES ('+ finalCount + ',"'+ params.Wechat_Number_Put
        +'",'+ params.Order_Type + ',"'+ params.Order_Content + '",'+ params.Order_MaxNumber
        + ',"null",0,0,"'+ finaldate +'","'+ params.Order_Title + '")';
      connection.query(tempSQL2,function (error, finalresult) {
        if(error){
          console.log('[INSERT ERROR] - ',error.message);
          res.end('database error');
          return;
        }
        console.log(finalresult);
        res.end(JSON.stringify(finalresult));
      })
    })
  })
})

//增加接任务，/addOrderGet?OrderGet_ID=***&Wechat_Number_Get=***
router.get('/addOrderGet',function (req, res) {
  var params = url.parse(req.url,true).query;
  //首先判断此人已接未完成任务的数量
  var tempSQL_1 = 'SELECT COUNT(*) FROM order_put JOIN order_get ON order_put.OrderPut_ID = order_get.OrderGet_ID AND order_get.Wechat_Number_Get = "'
    + params.Wechat_Number_Get +'" AND order_put.Order_Finish < order_put.Order_MaxNumber';
  connection.query(tempSQL_1,function (zero_error, zero_result) {
    if(zero_error){
      console.log('[SELECT ERROR] - ',zero_error.message);
      res.end('database error');
      return;
    }
    console.log(zero_result);
    var zero_count = zero_result[0]['COUNT(*)'];
    console.log('zero_count:'+ zero_count);
    if(zero_count==3){
      res.end('已接任务数量已满');
      return;
    }
    //然后判断此人是否接过这个任务
    var tempSQL0 = 'SELECT COUNT(*) FROM order_get WHERE OrderGet_ID = '+ params.OrderGet_ID
      +' AND Wechat_Number_Get = "'+ params.Wechat_Number_Get +'"';
    connection.query(tempSQL0,function (first_error, first_result) {
      if(first_error){
        console.log('[SELECT ERROR] - ',first_error.message);
        res.end('database error');
        return;
      }
      console.log(first_result);
      var count = first_result[0]['COUNT(*)'];
      console.log('count:'+ count);
      if(count>=1){
        //const tmpstring='此人已接过任务';
        //var response ={"error": tmpstring.toString('utf8')};
        //const response = JSON.stringify(tmpstring);
        //console.log(response);
        //res.end(tmpstring.toString('ascii'));
        res.json("此人已接过任务");
        return;
      }
      //然后判断接单人数是否达到上限，以及此人是否为发任务人
      var tempSQL1 = 'SELECT Wechat_Number_Put,Order_MaxNumber,Order_NowNumber FROM order_put WHERE OrderPut_ID = '+ params.OrderGet_ID;
      connection.query(tempSQL1,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] -',err.message);
          res.end('database error');
          return;
        }
        console.log(result);
        var wechat_Number_Put = result[0]['Wechat_Number_Put'];
        var maxNumber = result[0]['Order_MaxNumber'];
        var nowNumber = result[0]['Order_NowNumber'];
        console.log('Wechat_Number_Put:'+ wechat_Number_Put);
        console.log('maxNumber:'+ maxNumber);
        console.log('nowNumber:'+ nowNumber);
        if(wechat_Number_Put==params.Wechat_Number_Get){
          res.end('此人为任务发布人');
          return;
        }
        if(maxNumber==nowNumber){
          res.end('任务所需人数已满');
          return;
        }
        var final_nowNumber = nowNumber+1;
        var tempSQL2 = 'UPDATE order_put SET Order_NowNumber = '+ final_nowNumber +' WHERE OrderPut_ID = '+ params.OrderGet_ID;
        connection.query(tempSQL2,function (error, finalresult) {
          if(error){
            console.log('[UPDATE ERROR] - ',error.message);
            res.end('database error');
            return;
          }
          console.log(finalresult);
        })
        var tempSQL3 = 'INSERT INTO order_get VALUES ('+ params.OrderGet_ID + ',"'+ params.Wechat_Number_Get + '",-1,-1,"null")';
        connection.query(tempSQL3,function (more_error, more_finalresult) {
          if(more_error){
            console.log('[INSERT ERROR] - ',more_error.message);
            res.end('database error');
            return;
          }
          console.log(more_finalresult);
          res.end(JSON.stringify(more_finalresult));
        })
      })
    })
  })
})

//发任务的人对接任务的人评分,/PtoG?OrderGet_ID=***&Wechat_Number_Get=***&Credit_PtoG=***
router.get('/PtoG',function (req, res) {
  var params = url.parse(req.url,true).query;
  //首先修改order_get表
  var tempSQL0 = 'UPDATE order_get SET Credit_PtoG = '+ params.Credit_PtoG +' WHERE OrderGet_ID = '
    + params.OrderGet_ID +' AND Wechat_Number_Get = "'+ params.Wechat_Number_Get +'"';
  connection.query(tempSQL0,function (err, result) {
    if(err){
      console.log('[UPDATE ERROR] - ',err.message);
      res.end('database error');
      return;
    }
    console.log(result);
    //然后修改user表
    var tempSQL1 = 'UPDATE user SET Total_Order = (Total_Order+1) WHERE Wechat_Number = "'+ params.Wechat_Number_Get +'"';
    connection.query(tempSQL1,function (second_err, second_result) {
      if(err){
        console.log('[UPDATE ERROR] - ',second_err.message);
        res.end('database error');
        return;
      }
      console.log(second_result);
      //再次修改user表
      var tempSQL2 = 'UPDATE user SET Credit = ((Credit*Total_Order)+'+ params.Credit_PtoG
        + ')/(Total_Order+1) WHERE Wechat_Number = "'+ params.Wechat_Number_Get +'"';
      connection.query(tempSQL2,function (third_err, third_result) {
        if(err){
          console.log('[UPDATE ERROR] - ',third_err.message);
          res.end('database error');
          return;
        }
        console.log(third_result);
        res.end("评分成功");
        //判断任务是否完成
        var tempSQL3 = 'SELECT Credit_GtoP FROM order_get WHERE OrderGet_ID = '+ params.OrderGet_ID
          + ' AND Wechat_Number_Get = "'+ params.Wechat_Number_Get +'"';
        connection.query(tempSQL3,function (fourth_err, fourth_result) {
          if(err){
            console.log('[SELECT ERROR] - ',fourth_err.message);
            res.end('database error');
            return;
          }
          console.log(fourth_result);
          var GtoP = fourth_result[0]['Credit_GtoP'];
          console.log('Credit_GtoP:'+ GtoP);
          if(GtoP==-1){
            return;
          }
          //任务完成数加一
          var tempSQL4 = 'UPDATE order_put SET Order_Finish=(Order_Finish+1) WHERE OrderPut_ID = '+ params.OrderGet_ID;
          connection.query(tempSQL4,function (fifth_err, fifth_result) {
            if(err){
              console.log('[UPDATE ERROR] - ',fifth_err.message);
              res.end('database error');
              return;
            }
            console.log(fifth_result);
            return;
          })
        })
      })
    })
  })
})

//接任务的人对发任务的人评分,/GtoP?OrderGet_ID=***&Wechat_Number_Get=***&Credit_GtoP=***&Wechat_Number_Put=***
router.get('/GtoP',function (req, res) {
  var params = url.parse(req.url,true).query;
  //首先修改order_get表
  var tempSQL0 = 'UPDATE order_get SET Credit_GtoP = '+ params.Credit_GtoP +' WHERE OrderGet_ID = '
    + params.OrderGet_ID +' AND Wechat_Number_Get = "'+ params.Wechat_Number_Get +'"';
  connection.query(tempSQL0,function (err, result) {
    if(err){
      console.log('[UPDATE ERROR] - ',err.message);
      res.end('database error');
      return;
    }
    console.log(result);
    //然后修改user表
    var tempSQL1 = 'UPDATE user SET Total_Order = (Total_Order+1) WHERE Wechat_Number = "'+ params.Wechat_Number_Put +'"';
    connection.query(tempSQL1,function (second_err, second_result) {
      if(err){
        console.log('[UPDATE ERROR] - ',second_err.message);
        res.end('database error');
        return;
      }
      console.log(second_result);
      //再次修改user表
      var tempSQL2 = 'UPDATE user SET Credit = ((Credit*Total_Order)+'+ params.Credit_GtoP
        + ')/(Total_Order+1) WHERE Wechat_Number = "'+ params.Wechat_Number_Put +'"';
      connection.query(tempSQL2,function (third_err, third_result) {
        if(err){
          console.log('[UPDATE ERROR] - ',third_err.message);
          res.end('database error');
          return;
        }
        console.log(third_result);
        res.end("评分成功");
        //判断任务是否完成
        var tempSQL3 = 'SELECT Credit_PtoG FROM order_get WHERE OrderGet_ID = '+ params.OrderGet_ID
          +' AND Wechat_Number_Get = "'+ params.Wechat_Number_Get +'"';
        connection.query(tempSQL3,function (fourth_err, fourth_result) {
          if(err){
            console.log('[SELECT ERROR] - ',fourth_err.message);
            res.end('database error');
            return;
          }
          console.log(fourth_result);
          var PtoG = fourth_result[0]['Credit_PtoG'];
          console.log('Credit_PtoG:'+ PtoG);
          if(PtoG==-1){
            return;
          }
          //任务完成数加一
          var tempSQL4 = 'UPDATE order_put SET Order_Finish=(Order_Finish+1) WHERE OrderPut_ID = '+ params.OrderGet_ID;
          connection.query(tempSQL4,function (fifth_err, fifth_result) {
            if(err){
              console.log('[UPDATE ERROR] - ',fifth_err.message);
              res.end('database error');
              return;
            }
            console.log(fifth_result);
            return;
          })
        })
      })
    })
  })
})

//取消订单,/cancelOrder?OrderPut_ID=***
router.get('/cancelOrder',function (req, res) {
  var params = url.parse(req.url,true).query;
  var tempSQL0 = 'DELETE FROM order_put WHERE OrderPut_ID = '+ params.OrderPut_ID + ' ';
  connection.query(tempSQL0,function (err, result) {
    if(err){
      console.log('[UPDATE ERROR] - ',err.message);
      res.end('database error');
      return;
    }
    console.log(result);
    res.end("取消订单成功！");
    return;
  })
})

//添加评论,/addComment?OrderGet_ID=***&Wechat_Number_Get=***&Comment=***
router.get('/addComment',function (req, res) {
  var params = url.parse(req.url, true).query;
  var tempSQL = 'UPDATE order_get SET Comment = "' + params.Comment + '" WHERE OrderGet_ID = ' + params.OrderGet_ID + ' AND Wechat_Number_Get = "' + params.Wechat_Number_Get + '"';
  connection.query(tempSQL,function (err, result) {
    if(err){
      console.log('[UPDATE ERROR] - ',err.message);
      res.end('database error');
      return;
    }
    console.log(result);
    res.end("添加评论成功！");
    return;
  })
})

//获得用户信息,/getUserMessage?Wechat_Number=***
router.get('/getUserMessage',function(req,res){
  var params = url.parse(req.url, true).query;
  var tempSQL = 'SELECT * FROM user WHERE Wechat_Number = "'+ params.Wechat_Number +'"';
  connection.query(tempSQL,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      res.end('database error');
      return;
    }
    console.log(result);
    res.end(JSON.stringify(result));
    return;
  })
})

//获取用户订单数,/getOrderNumber?Wechat_Number=***
router.get('/getOrderNumber',function (req, res) {
  var params = url.parse(req.url, true).query;
  var tempSQL0 = 'SELECT COUNT(*) FROM order_put WHERE Wechat_Number_Put = "'+ params.Wechat_Number +'"';
  connection.query(tempSQL0,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      res.end('database error');
      return;
    }
    console.log(result);
    var putNumber = result[0]['COUNT(*)'];
    console.log("putNumber:"+ putNumber);
    var tempSQL1 = 'SELECT COUNT(*) FROM order_get WHERE Wechat_Number_Get = "'+ params.Wechat_Number +'"';
    connection.query(tempSQL1,function (secont_err, second_result) {
      if(secont_err){
        console.log('[SELECT ERROR] - ',secont_err.message);
        res.end('database error');
        return;
      }
      console.log(second_result);
      var getNumber = second_result[0]['COUNT(*)'];
      console.log("getNumber:"+ getNumber);
      var orderNumber = putNumber + getNumber;
      var rea={orderNumber:orderNumber};
      res.json(rea);
      return;
    })
  })
})

/* GET home page. */
/*
router.get('/', async function (req, res, next) {
  new Promise(function (resolve, reject) {
    if(1===1) resolve()
    reject()
  }).then(function () {
    console.log(3)
  }).then(function () {

  }).catch(function (err) {

  }).then(function () {
    console.log(2)
    return "hello"
  }).then(function (message) {
    res.json({
      code: 0,
      message
    })
  })
})
*/

module.exports = router
