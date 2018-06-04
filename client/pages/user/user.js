// pages/wxml/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{
      imagePath:"/images/pig.jpg",
      name:"猪小妹",
      score:"5"
    },
    details:[
      {
        detailsid:"0",
        detailsnumber: "20",
        text: "订单"
      },
      {
        detailsid: "1",
        detailsnumber: "38",
        text: "问答"
      },
      {
        detailsid: "2",
        detailsnumber: "1",
        text: "活动"
      },
      {
        detailsid: "3",
        detailsnumber: "89",
        text: "积分详情"
      },
    ],
    order: [
      {
        ordertype: 0,
        ordername: "coco",
        price: "12",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "1"
      },
      {
        ordertype: 0,
        ordername: "coco",
        price: "13",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "2"
      },
      {
        ordertype: 1,
        ordername: "coco",
        price: "14",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "3"
      },
      {
        ordertype: 2,
        ordername: "coco",
        price: "15",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "4"
      },
      {
        ordertype: 2,
        ordername: "coco",
        price: "16",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "5"
      },
      {
        ordertype: 0,
        ordername: "coco",
        price: "17",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "6"
      },
      {
        ordertype: 1,
        ordername: "coco",
        price: "18",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "7"
      },
      {
        ordertype: 2,
        ordername: "coco",
        price: "19",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "8"
      }],
    time: (new Date()).toString()
  },
navigate:function(event){
  var detailid = event.currentTarget.dataset.detailId
  console.log(detailid);
  if(detailid="0")
  {
    wx.navigateTo({
      url: '/pages/user/myList/myList',
    })
  }
  if (detailid = "1") {
    wx.navigateTo({
      url: '/pages/user/myQ&A/myQ&A',
    })
  }
  if (detailid = "2") {
    wx.navigateTo({
      url: '/pages/user/myActivity/myActivity',
    })
  }
  if (detailid = "3") {
    wx.navigateTo({
      url: '/pages/user/myList/myList',
    })
  }
},
orderdetail: function (event) {
  var orderid = event.currentTarget.dataset.orderId
  console.log(orderid);
    wx.navigateTo({
      url: '/pages/user/myList/myListDetail/myListDetail?id='+orderid,
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