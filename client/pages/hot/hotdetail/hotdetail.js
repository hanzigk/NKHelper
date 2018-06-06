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
        url: 'http://10.134.39.81:3000/searchByOrderPutID?OrderPut_ID='+temp,//此处填写你后台请求地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data);    
          that.setData({
            ordername: res.data.Order_Title,
            sendername: res.data.Wechat_Number_Put,
            Order_Type: res.data.Order_Type,
            content: res.data.Order_Content,
            id: res.data.OrderPut_ID,
            time: res.data.Order_Time,
            Order_MaxNumber: res.data.Order_MaxNumber,
            Order_NowNumber: res.data.Order_NowNumber
          });
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