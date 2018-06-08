Page({
  onLoad: function (options) {
    console.log(options.id);
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    this.setData({
      mid: options.id,
    })
      var temp=this.data.mid
      var that = this;
      wx.request({
        url: 'http://10.134.39.81:3000/searchByOrderPutID?OrderPut_ID=' + options.id,//此处填写你后台请求地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data);    
          that.setData({
            ordername: res.data[0].Order_Title,
            sendername: res.data[0].Nickname,
            Order_Type: res.data[0].Order_Type,
            content: res.data[0].Order_Content,
            id: res.data[0].OrderPut_ID,
            time: res.data[0].Order_Time,
            Order_MaxNumber: res.data[0].Order_MaxNumber,
            Order_NowNumber: res.data[0].Order_NowNumber,
            image: res.data[0].Image
          });
        }
      })
  },
  addorder:function(event)
  {
    var that = this;
    if (getApp().globalData.Wechat_Number==""){
        wx.showToast({
          title: '您还未登陆！请先登陆',
          icon: 'none',
          duration: 1500,
          success: function () {
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/user/user'
              })
            }, 1500)
          }
        })
        return;
    }
    wx.request({
      url: 'http://10.134.39.81:3000/addOrderGet?OrderGet_ID=' + this.data.id + '&Wechat_Number_Get=' + getApp().globalData.Wechat_Number,//此处填写你后台请求地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.data=="此人已接过任务")
        {
          wx.showToast({
            title: '您已接过该任务',
            icon: 'none',
            duration: 1500
          })
          return;
        } if (res.data == "已接任务数量已满") {
          wx.showToast({
            title: '您已接了3个任务，需完成后再接',
            icon: 'none',
            duration: 1500
          })
          return;
        }
        if (res.data == "此人为任务发布人") {
          wx.showToast({
            title: '您不能接自己发布的任务',
            icon: 'none',
            duration: 1500
          })
          return;
        }
        if (res.data == "任务所需人数已满") {
          wx.showToast({
            title: '该任务所需人数已满',
            icon: 'none',
            duration: 1500
          })
          return;
        }
        console.log(res.data);
        wx.showToast({
          title: '接单成功',
          icon: 'success',
          duration: 1500,
          success: function () {
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/user/user'
              })
            }, 1500)
          }
        })
      }
    })
  },
  data:{
        id: 0,
        ordername:"",
        sendername: "",
        receivername: "",
        content: "",
        Order_Type:0,
        time:"",
        Order_MaxNumber:"",
        Order_NowNumber: "",
        mid:0,
        image:""
  }
})