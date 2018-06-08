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
          Order_NowNumber: res.data[0].Order_NowNumber
        });
      }
    })
    wx.request({
      url: 'http://10.134.39.81:3000/getMyOnePut?OrderGet_ID=' + options.id,//此处填写你后台请求地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var array=that.data.receivername;
        //console.log(res.data);
       
        /*that.setData({
          ordername: res.data[0].Order_Title,
          sendername: res.data[0].Nickname,
          //receivername: res.data[0].Wechat_Number_Put,
          Order_Type: res.data[0].Order_Type,
          content: res.data[0].Order_Content,
          id: res.data[0].OrderPut_ID,
          time: res.data[0].Order_Time,
          Order_MaxNumber: res.data[0].Order_MaxNumber,
          Order_NowNumber: res.data[0].Order_NowNumber
        });*/
      }
    })
  },
  data: {
    id: 0,
    ordername: "",
    sendername: "",
    receivername: [],
    content: "",
    Order_Type: 0,
    time: "",
    Order_MaxNumber: "",
    Order_NowNumber: "",
    mid: 0
  }
})