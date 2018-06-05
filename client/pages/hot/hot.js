// pages/wxml/index.js
Page({
  data: {
    
    navbar: [
      '热门', 
      '代购',
      '二手买卖',
      '失物招领',
      '活动'
      ],
    hot: [{
      id:0,
      Order_Type: 0,
      time: "",
      title: "",
      content: ""
      }],
    currentTab: 0
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  navigate:function(event){
    var listid =event.currentTarget.dataset.listId;
    console.log(listid);
    wx.navigateTo({
      url: '/pages/hot/hotdetail/hotdetail?id='+listid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://10.134.39.81:3000/searchAll',//此处填写你后台请求地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var array = that.data.hot
        var i = 0
        console.log(res.data);//在控制台输出在远程后台请求到的数据
        
        //'hot[0].Order_Type'= res.data[0].Order_Type
       for (i; i < res.data.length; i++) {
          console.log(res.data[i].Order_Type)
          console.log(i)
          array[i]={
            id: res.data[i].OrderPut_ID,
            Order_Type:res.data[i].Order_Type,
            time: res.data[i].Order_Time,
            title: res.data[i].Order_Title,
            content: res.data[i].Order_Content
          }
        }
        that.setData({
          hot:array
        });
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
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