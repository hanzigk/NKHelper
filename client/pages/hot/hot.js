// pages/wxml/index.js

var sliderWidth = 96;
Page({
  data: {
    inputValue: '',
    navbar: [
      '热门',
      '代买',
      '提问',
      '约着玩',
      '找东西',
      '拼车',
      '代取快递',
      '拼单',
      '二手交易'
    ],
    hot: [{
      id: 0,
      Order_Type: 0,
      sendername: "",
      time: "",
      title: "",
      content: "",
      image:""
    }],
    sales: [{
      id: 0,
      sendername: "",
      time: "",
      title: "",
      content: "",
      image: ""
    }],
    Q_A: [{
      id: 0,
      sendername: "",
      time: "",
      title: "",
      content: "",
      image: ""
    }],
    activity: [{
      id: 0,
      sendername: "",
      time: "",
      title: "",
      content: "",
      image: ""
    }],
    lostandfound: [{
      id: 0,
      sendername: "",
      time: "",
      title: "",
      content: "",
      image: ""
    }],
    car: [{
      id: 0,
      sendername: "",
      time: "",
      title: "",
      content: "",
      image: ""
    }],
    delivery: [{
      id: 0,
      sendername: "",
      time: "",
      title: "",
      content: "",
      image: ""
    }],
    buy: [{
      id: 0,
      sendername: "",
      time: "",
      title: "",
      content: "",
      image: ""
    }],
    second_hand: [{
      id: 0,
      sendername: "",
      time: "",
      title: "",
      content: "",
      image: ""
    }],
    currentTab: 0,
    inputShowed: false,
    inputVal: ""
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
    })
    var temp = e.currentTarget.dataset.idx
    var temp1 = temp - 1
    var that = this
    if (temp == 0) {
      wx.request({
        url: 'https://1fpvdbfz.qcloud.la:5757/searchAll',//此处填写你后台请求地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          var array = that.data.hot
          var i = 0
          console.log(res.data);
          for (i; i < res.data.length; i++) {
            array[i] = {
              id: res.data[i].OrderPut_ID,
              Order_Type: res.data[i].Order_Type,
              time: res.data[i].Order_Time,// 1000//res.data[i].Order_Time,
              title: res.data[i].Order_Title,
              content: res.data[i].Order_Content,
              sendername: res.data[i].Nickname,
              image: res.data[i].Image
            }
          }
          that.setData({
            hot: array
          });
        }
      })
    } else {
      wx.request({
        url: 'https://1fpvdbfz.qcloud.la:5757/searchByType?type=' + temp1,//此处填写你后台请求地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data);
          if (temp == 1) { var array = that.data.sales }
          if (temp == 2) { var array = that.data.Q_A }
          if (temp == 3) { var array = that.data.activity }
          if (temp == 4) { var array = that.data.lostandfound }
          if (temp == 5) { var array = that.data.car }
          if (temp == 6) { var array = that.data.delivery }
          if (temp == 7) { var array = that.data.buy }
          if (temp == 8) { var array = that.data.second_hand }
          var i = 0
          for (i; i < res.data.length; i++) {
            if (temp == 0) {
              array[i] = {
                id: res.data[i].OrderPut_ID,
                time: res.data[i].Order_Time,// 1000//res.data[i].Order_Time,
                title: res.data[i].Order_Title,
                content: res.data[i].Order_Content,
                sendername: res.data[i].Nickname,
                image: res.data[i].Image
              }
            } else {
              array[i] = {
                id: res.data[i].OrderPut_ID,
                Order_Type: res.data[i].Order_Type,
                time: res.data[i].Order_Time,// 1000//res.data[i].Order_Time,
                title: res.data[i].Order_Title,
                content: res.data[i].Order_Content,
                sendername: res.data[i].Nickname,
                image: res.data[i].Image
              }
            }
          }
          if (temp == 1) { that.setData({ sales: array }); }
          if (temp == 2) { that.setData({ Q_A: array }); }
          if (temp == 3) { that.setData({ activity: array }); }
          if (temp == 4) { that.setData({ lostandfound: array }); }
          if (temp == 5) { that.setData({ car: array }); }
          if (temp == 6) { that.setData({ delivery: array }); }
          if (temp == 7) { that.setData({ buy: array }); }
          if (temp == 8) { that.setData({ second_hand: array }); }
        },
        fail: function () {
          console.log("failure")
        }
      })
    }
  },
  navigate: function (event) {
    var listid = event.currentTarget.dataset.listId;
    console.log(listid);
    wx.navigateTo({
      url: '/pages/hot/hotdetail/hotdetail?id=' + listid,
    })
  },
  searchdetail: function (event) {
    wx.navigateTo({
      url: '/pages/hot/search/search',
    })
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(2)
    var that = this;
    wx.request({
      url: 'https://1fpvdbfz.qcloud.la:5757/searchAll',//此处填写你后台请求地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var array = that.data.hot
        var i = 0
        console.log(res.data);
        for (i; i < res.data.length; i++) {
          console.log(res.data[i].Nickname)
          array[i] = {
            id: res.data[i].OrderPut_ID,
            Order_Type: res.data[i].Order_Type,
            time: res.data[i].Order_Time,// 1000//res.data[i].Order_Time,
            title: res.data[i].Order_Title,
            content: res.data[i].Order_Content,
            sendername: res.data[i].Nickname,
            image: res.data[i].Image
          }
        }
        that.setData({
          hot: array
        });
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
    var that = this;
    wx.request({
      url: 'https://1fpvdbfz.qcloud.la:5757/searchAll',//此处填写你后台请求地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var array = that.data.hot
        var i = 0
        console.log(res.data);
        for (i; i < res.data.length; i++) {
          array[i] = {
            id: res.data[i].OrderPut_ID,
            Order_Type: res.data[i].Order_Type,
            time: res.data[i].Order_Time,// 1000//res.data[i].Order_Time,
            title: res.data[i].Order_Title,
            content: res.data[i].Order_Content,
            sendername: res.data[i].Nickname,
            image: res.data[i].Image
          }
        }
        that.setData({
          hot: array
        });
      }
    })
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
    var that = this;
    wx.request({
      url: 'https://1fpvdbfz.qcloud.la:5757/searchAll',//此处填写你后台请求地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var array = that.data.hot
        var i = 0
        console.log(res.data);
        for (i; i < res.data.length; i++) {
          array[i] = {
            id: res.data[i].OrderPut_ID,
            Order_Type: res.data[i].Order_Type,
            time: res.data[i].Order_Time,// 1000//res.data[i].Order_Time,
            title: res.data[i].Order_Title,
            content: res.data[i].Order_Content,
            sendername: res.data[i].Nickname,
            image: res.data[i].Image
          }
        }
        that.setData({
          hot: array
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