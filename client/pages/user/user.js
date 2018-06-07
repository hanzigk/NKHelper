// pages/wxml/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      imagePath: "/images/pig.jpg",
      name: "点击登录",
      score: "5"
    },
    details: [
      {
        detailsid: "0",
        detailsnumber: "20",
        text: "订单"
      },
      {
        detailsid: "1",
        detailsnumber: "38",
        text: "问答"
      },
      {
        detailsid: "2",
        detailsnumber: "1",
        text: "活动"
      },
      {
        detailsid: "3",
        detailsnumber: "89",
        text: "积分详情"
      },
    ],
    order: [
      {
        ordertype: 0,
        ordername: "",
        time:"",
        ordermax:0,
        ordernow:0,
        id: 1
      }],
    time: (new Date()).toString()
  },
  navigate: function (event) {
    var detailid = event.currentTarget.dataset.detailId
    console.log(detailid);
    if (detailid == "0") {
      wx.navigateTo({
        url: '/pages/user/myList/myList',
      })
    }
    if (detailid == "1") {
      wx.navigateTo({
        url: '/pages/user/myQ&A/myQ&A',
      })
    }
    if (detailid == "2") {
      wx.navigateTo({
        url: '/pages/user/myActivity/myActivity',
      })
    }
    if (detailid == "3") {
      wx.navigateTo({
        url: '/pages/user/scoreDetails/scoreDetails',
      })
    }
  },
  orderdetail: function (event) {
    var orderid = event.currentTarget.dataset.orderId
    console.log(orderid);
    wx.navigateTo({
      url: '/pages/user/myList/myListDetail/myListDetail?id=' + orderid,
    })
  },

  login:function(userinfo){
    app=getApp();
    var that=this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://10.134.39.81:3000/onLogin',
            data: {
              code: res.code
            },
            success:function(opt){
              console.log(opt);
              app.globalData.Wechat_Number=opt.data.openid;
              if (userinfo.detail.errMsg == 'getUserInfo:ok') {
                console.log(userinfo);
                var temp = that.data.user;
                temp = {
                  name: userinfo.detail.userInfo.nickName,
                  imagePath: userinfo.detail.userInfo.avatarUrl
                };
                that.setData({
                  user: temp
                });
                wx.request({
                  url: 'http://10.134.39.81:3000/addUser',
                  data: {
                    Wechat_Number:opt.data.id,
                    Wechat_Name: userinfo.detail.userInfo.nickName,
                    Phone_Number:null,
                    NickName: userinfo.detail.userInfo.nickName,
                    Address:null
                  }
                }); 
            }

          }
          });

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
onLoad: function (options) {
  var that = this;
  
  wx.request({
    url: 'http://10.134.39.81:3000/searchMyPut?Wechat_Number_Put=ludi5757',//此处填写你后台请求地址
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      var array = that.data.order
      var i = 0
      console.log(res.data);
      for (i; i < res.data.length; i++) {
        array[i] = {
          id: res.data[i].OrderPut_ID,
          ordertype: res.data[i].Order_Type,
          time: res.data[i].Order_Time,// 1000//res.data[i].Order_Time,
          ordername: res.data[i].Order_Title,
          ordermax: res.data[i].Order_MaxNumber,
          ordernow: res.data[i].Order_NowNumber
        }
      }
      that.setData({
        order: array
      });
    }
  })
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})