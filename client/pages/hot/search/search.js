// pages/wxml/index.js
Page({
  data: {
    inputShowed: true,
    inputValue: '',
    search: [{
      id: 0,
      Order_Type: -1,
      time: "",
      title: "",
      content: "",
      image: "",
      sendername: ""
    }],
    currentTab: 0
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputValue: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputValue: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  navigate: function (event) {
    var listid = event.currentTarget.dataset.listId;
    console.log(listid);
    wx.navigateTo({
      url: '/pages/hot/hotdetail/hotdetail?id=' + listid,
    })
  },
  searchdetail: function (event) {
    var that = this;
    this.setData({
      inputValue: event.detail.value
    })
    var value = this.data.inputValue;
    console.log(value);
    var temp = this.data.currentTab
    var that = this
    wx.request({
      url: 'http://10.134.39.81:3000/searchByKey?keyword=' + value,//此处填写你后台请求地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
       var array = that.data.search
        var i = 0
        console.log(res.data);
        for (i; i < res.data.length; i++) {
            array[i] = {
              id: res.data[i].OrderPut_ID,
              Order_Type: res.data[i].Order_Type,
              time: res.data[i].Order_Time,// 1000//res.data[i].Order_Time,
              title: res.data[i].Order_Title,
              content: res.data[i].Order_Content,
              image: res.data[i].Image,
              sendername: res.data[i].Nickname
            }
        }
       that.setData({ search: array }); 
      }
    })
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