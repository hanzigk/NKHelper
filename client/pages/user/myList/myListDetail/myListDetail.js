Page({
  onLoad: function (options) {
    console.log(options.id);
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    this.setData({
      mid: options.id,
    })
    var temp = this.data.mid
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
          //receivername: res.data[0].Wechat_Number_Put,
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
    wx.request({
      url: 'http://10.134.39.81:3000/getMyOnePut?OrderGet_ID=' + options.id,//此处填写你后台请求地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var i=0;
        var array=that.data.receivername;
        console.log(res.data);
        for (i; i < res.data.length; i++) {
          array[i] = {
            nickname:res.data[i].Nickname,
            WechatNumber: res.data[i].Wechat_Number_Get
        }
        }
        that.setData({
          receivername: array,

        });
      }
    })
  },
  navigate:function (event)
  {
    var receivername = event.currentTarget.dataset.receiverName 
    var listid = event.currentTarget.dataset.listId
    var wechatnumber = event.currentTarget.dataset.wechatNumber
    console.log(receivername);
    console.log(wechatnumber );
    wx.navigateTo({
      url: '/pages/user/myList/myListDetail/receiver/receiver?receivername=' + receivername + '&listid=' + listid + '&Wechat_Number_Get=' + wechatnumber 
      })
  },
  data: {
    id: 0,
    ordername: "",
    sendername: "",
    receivername: [{ WechatNumber: "",nickname:""}],
    content: "",
    Order_Type: 0,
    time: "",
    Order_MaxNumber: "",
    Order_NowNumber: "",
    mid: 0,
    image:""
  }
})