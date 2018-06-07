
Page({
  data: {
    PutNumber: 0,
    Number: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
  onLoad: function () {

  },
  // 监听页面初次渲染完成
  onReady: function () {

  },
  // 监听页面显示
  onShow: function () {

  },
  // 监听页面隐藏
  onHide: function () {

  },
  // 监听页面卸载
  onUpload: function () {

  },
  // 监听用户下拉动作
  onPullDownRefresh: function () {
    this.getTime();
  },
  // 监听页面上拉触底
  onReachBottom: function () {

  },

  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      PutNumber: e.detail.value
    })
  },

  showTopTips: function(){
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:3000/addOrderPut',
      data: {
        "Wechat_Number_Put": "chenxingqiming",
        "Order_Type":"2",
        "Order_Content":"fdj",
        "Order_MaxNumber":that.data.Number[that.data.PutNumber],
        "Order_Photo":"null",
        "Order_Title":"ceshi"
      },
      success:function(res){
        wx.showToast({
          title: '发任务成功！',
          icon: 'success',
          duration: 1500
        }),
        wx.navigateTo({
          url: '/pages/hot'
        })


      }
    })
  }

})