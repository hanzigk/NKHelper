// pages/wxml/index.js]
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      imagePath: "/images/pig.jpg",
      name: "点击登录",
      
    },
    score: "",
    details:[
      {
        detailsid:"0",
        detailsnumber: 0,
        text: "订单"
      },
      {
        detailsid: "3",
        detailsnumber: 0,
        text: "积分详情"
      },
    ],
    order: [
      {
        ordertype: 0,
        ordername: "",
        receivername: "",
        time:"",
        ordermax:0,
        ordernow:0,
        id: 1
      }],
    orderindex: [
      {
        id: -1
      }],
    time: (new Date()).toString()
  },
navigate:function(event){
  var detailid = event.currentTarget.dataset.detailId
  console.log(detailid);
  if(detailid=="0")
  {
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
  if (detailid =="3") {
    wx.navigateTo({
      url: '/pages/user/scoreDetails/scoreDetails',
    })
  }
},
orderdetail: function (event) {
  var orderid = event.currentTarget.dataset.orderId
  var receivername = event.currentTarget.dataset.receiverName
  console.log(orderid);
    wx.navigateTo({
      url: '/pages/user/myList/myListDetail/myListDetail?id=' + orderid + '&receivername=' + receivername,
    })
  },


  login:function(userinfo){
    

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
              //console.log(opt);
              app.globalData.Wechat_Number=opt.data.openid;
              if (userinfo.detail.errMsg == 'getUserInfo:ok') {
                //console.log(userinfo);
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
                    Wechat_Number:opt.data.openid,
                    Wechat_Name: userinfo.detail.userInfo.nickName,
                    Phone_Number:null,
                    NickName: userinfo.detail.userInfo.nickName,
                    Address:null
                  }
                }); 
                wx.request({
                  url: 'http://10.134.39.81:3000/getUserMessage',
                  data:{
                    Wechat_Number: opt.data.openid
                  },
                  success:function(de)
                  {
                    wx.request({
                      url: 'http://10.134.39.81:3000/getOrderNumber',
                      data:{
                        Wechat_Number: opt.data.openid
                      },
                      success:function(on){
                        that.setData({
                          score: de.data[0].Credit
                        });
                        //console.log(on.data.orderNumber);
                        
                        var temp2 = that.data.details;
                        //console.log(de.data[0].Total_Order);
                        temp2[0] = {
                          detailsid: "0",
                          detailsnumber: on.data.orderNumber,
                          text: "订单"
                        };
                        
                        temp2[1] = {
                          detailsid: "3",
                          detailsnumber: de.data[0].Total_Order,
                          text: "积分详情"
                        };
                        that.setData({
                          details: temp2
                        });
                      }
                    })
                  }
                });
                wx.request({
                  url: 'http://10.134.39.81:3000/searchMyPut',//此处填写你后台请求地址
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  data:{
                    Wechat_Number_Put: getApp().globalData.Wechat_Number                   
                  },
                  success: function (res) {
                    console.log(res.data)
                    var array = that.data.order
                    var indexarray = that.data.orderindex
                    var i = 0
                    var temp = -1;
                    var j = 0;
                    var count = 0;
                    //
                    var ordertype = 0;
                    var ordername = "";
                    var receivername = "";
                    var time = "";
                    var ordermax = 0;
                    var ordernow = 0;
                    var id = 0;
                    console.log(res.data);
                    for (i; i < res.data.length; i++) {
                      temp = -1;
                      for (j = 0; j < indexarray.length; j++) {
                        if (res.data[i].OrderPut_ID == indexarray[j].id)//表明已经发布过
                        {
                          temp = j;
                        }
                      }
                      if (temp == -1)//未发布过
                      {
                        array[count] = {
                          id: res.data[i].OrderPut_ID,
                          ordertype: res.data[i].Order_Type,
                          time: res.data[i].Order_Time,
                          ordername: res.data[i].Order_Title,
                          receivername: res.data[i].Wechat_Number_Get,
                          ordermax: res.data[i].Order_MaxNumber,
                          ordernow: res.data[i].Order_NowNumber
                        }
                        indexarray[j - 1] = {
                          id: res.data[i].OrderPut_ID
                        }
                        count++;
                      } else {
                        //console.log(temp);
                        ordertype = array[temp].ordertype;
                        ordermax = array[temp].ordermax;
                        ordernow = array[temp].ordernow;
                        ordername = array[temp].ordername;
                        time = array[temp].time;
                        id = array[temp].id;
                        receivername = array[temp].receivername
                        array[temp] = {
                          id: id,
                          ordertype: ordertype,
                          time: time,// 1000//res.data[i].Order_Time,
                          ordername: ordername,
                          ordermax: ordermax,
                          ordernow: ordernow,
                          receivername: receivername + ';' + res.data[i].Wechat_Number_Get
                        }
                      }
                    }
                    that.setData({
                      order: array,
                      orderindex: indexarray
                    });
                  }
                })
            }

          }
          
          });


        } else {
          //console.log('登录失败！' + res.errMsg)
          wx.showModal({
            title: 'Oops!',
            content: '不授权就不能用了哟/r/n点击确定打开设置重新授权',
            success: function (res) {
              if (res.confirm) {
                //console.log('用户点击确定')
                wx.openSetting({
                  success: function (res) {
                    if (!res.authSetting["scope.userInfo"]) {
                      wx.request({
                        url: 'http://10.134.39.81:3000/onLogin',
                        data: {
                          code: res.code
                        },
                        success: function (opt) {
                          console.log(opt);
                          app.globalData.Wechat_Number = opt.data.openid;
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
                                Wechat_Number: opt.data.openid,
                                Wechat_Name: userinfo.detail.userInfo.nickName,
                                Phone_Number: null,
                                NickName: userinfo.detail.userInfo.nickName,
                                Address: null
                              }
                            });
                          }

                        }
                      });
                    }
                  }
                })
              } else if (res.cancel) {
                //console.log('用户点击取消')
              }
            }
          })
        }
      }
    });
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
onLoad: function (options) {
  
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
    wx.request({
      url: 'http://10.134.39.81:3000/getUserMessage',
      data: {
        Wechat_Number: opt.data.openid
      },
      success: function (de) {
        wx.request({
          url: 'http://10.134.39.81:3000/getOrderNumber',
          data: {
            Wechat_Number: opt.data.openid
          },
          success: function (on) {
            that.setData({
              score: de.data[0].Credit
            });
            //console.log(on.data.orderNumber);

            var temp2 = that.data.details;
            //console.log(de.data[0].Total_Order);
            temp2[0] = {
              detailsid: "0",
              detailsnumber: on.data.orderNumber,
              text: "订单"
            };

            temp2[1] = {
              detailsid: "3",
              detailsnumber: de.data[0].Total_Order,
              text: "积分详情"
            };
            that.setData({
              details: temp2
            });
          }
        })
      }
    });
    wx.request({
      url: 'http://10.134.39.81:3000/searchMyPut',//此处填写你后台请求地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        Wechat_Number_Put: getApp().globalData.Wechat_Number
      },
      success: function (res) {
        console.log(res.data)
        var array = that.data.order
        var indexarray = that.data.orderindex
        var i = 0
        var temp = -1;
        var j = 0;
        var count = 0;
        //
        var ordertype = 0;
        var ordername = "";
        var receivername = "";
        var time = "";
        var ordermax = 0;
        var ordernow = 0;
        var id = 0;
        console.log(res.data);
        for (i; i < res.data.length; i++) {
          temp = -1;
          for (j = 0; j < indexarray.length; j++) {
            if (res.data[i].OrderPut_ID == indexarray[j].id)//表明已经发布过
            {
              temp = j;
            }
          }
          if (temp == -1)//未发布过
          {
            array[count] = {
              id: res.data[i].OrderPut_ID,
              ordertype: res.data[i].Order_Type,
              time: res.data[i].Order_Time,
              ordername: res.data[i].Order_Title,
              receivername: res.data[i].Wechat_Number_Get,
              ordermax: res.data[i].Order_MaxNumber,
              ordernow: res.data[i].Order_NowNumber
            }
            indexarray[j - 1] = {
              id: res.data[i].OrderPut_ID
            }
            count++;
          } else {
            //console.log(temp);
            ordertype = array[temp].ordertype;
            ordermax = array[temp].ordermax;
            ordernow = array[temp].ordernow;
            ordername = array[temp].ordername;
            time = array[temp].time;
            id = array[temp].id;
            receivername = array[temp].receivername
            array[temp] = {
              id: id,
              ordertype: ordertype,
              time: time,// 1000//res.data[i].Order_Time,
              ordername: ordername,
              ordermax: ordermax,
              ordernow: ordernow,
              receivername: receivername + ';' + res.data[i].Wechat_Number_Get
            }
          }
        }
        that.setData({
          order: array,
          orderindex: indexarray
        });
      }
    })
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