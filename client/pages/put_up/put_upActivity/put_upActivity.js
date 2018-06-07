
Page({
  data: {
    PutNumber: 0,
    Number: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    mytype: 0,
    NowNumber: 0,
    Title:"",
    Content:"",
    logo: '/images/icons/addphoto.png'
  },
  onLoad: function (options) {
    console.log(options.type);
    this.setData({
      mytype: options.type,
    })
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

  watchNumber:function(event){
    this.setData({
      NowNumber: event.detail.cursor,
      Content: event.detail.value
    })
  },

  TitleChange:function(event){
    this.setData({
      Title:event.detail.value
    })
  },

  showTopTips: function(){
    var that = this;
    if (that.data.Title == "") {
      wx.showToast({
        title: '请输入标题',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    if (that.data.Content==""){
      wx.showToast({
        title: '请输入正文',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    wx.request({
      url: 'http://127.0.0.1:3000/addOrderPut',
      data: {
        "Wechat_Number_Put": getApp().globalData.Wechat_Number,
        "Order_Type":that.data.mytype,
        "Order_Content":that.data.Content,
        "Order_MaxNumber":that.data.Number[that.data.PutNumber],
        "Order_Photo":"null",
        "Order_Title":that.data.Title
      },
      success:function(res){
        console.log(res);
        console.log(res.data);
        if(res.data=="error:outoflimit"){
          wx.showToast({
            title: '已发未完成任务数量达到上限',
            icon: 'none',
            duration:1500
          });
          return;
        };
        if(res.data=="database error"){
          wx.showToast({
            title: '请登录',
            icon: 'none',
            duration: 1500,
            success:function(){
              setTimeout(function(){
                wx.switchTab({
                  url: '/pages/user/user'
                })
              },1500)
            }
          });
          return;
        };
        wx.showToast({
          title: '发任务成功！',
          icon: 'success',
          duration: 1500,
          success:function(){
            setTimeout(function(){
              wx.switchTab({
                url: '/pages/hot/hot',
              })
            },1500)
          }
        })
      },
    })
  }
})