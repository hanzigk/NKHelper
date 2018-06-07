//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'http://10.134.39.81:3000/onLogin',
              data: {
                code: res.code
              }
              // url: 'https://api.weixin.qq.com/sns/jscode2session',
              // params: {
              //   appid: 'wx790b509e5d6f759f',
              //   secret: 'wx790b509e5d6f759f',
              //   js_code: res.code,
              //   grant_type: 'authorization_code'
              // },
              // success: function(opt){
              //   console.log(opt.data)
              // }

            })
            
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });

      
        qcloud.setLoginUrl(config.service.loginUrl)
    }
})