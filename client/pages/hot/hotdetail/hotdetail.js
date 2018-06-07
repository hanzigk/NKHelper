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
            sendername: res.data[0].Wechat_Number_Put,
            Order_Type: res.data[0].Order_Type,
            content: res.data[0].Order_Content,
            id: res.data[0].OrderPut_ID,
            time: res.data[0].Order_Time,
            Order_MaxNumber: res.data[0].Order_MaxNumber,
            Order_NowNumber: res.data[0].Order_NowNumber
          });
        }
      })
  },
  addorder:function(event)
  {
    var that = this;
    wx.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        wx.showToast({
          title: '您还未登陆！请先前往个人中心登陆',
        })
     }
    })
    wx.request({
      url: 'http://10.134.39.81:3000/addOrderGet?OrderGet_ID='+this.data.id+'&Wechat_Number_Get=chenxingqiming',//此处填写你后台请求地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.data=="此人已接过任务")
        {
          wx.showToast({
            title: '您已接过该任务',
          })
        } if (res.data == "已接任务数量已满") {
          wx.showToast({
            title: '您已接了3个任务，需完成后再接',
          })
        }
        if (res.data == "此人为任务发布人") {
          wx.showToast({
            title: '您不能接自己发布的任务',
          })
        }
        if (res.data == "任务所需人数已满") {
          wx.showToast({
            title: '该任务所需人数已满',
          })
        }
        console.log(res.data);
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
        mid:0
  }
})