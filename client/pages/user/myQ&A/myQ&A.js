//获取应用实例
var app = getApp()
Page({
  data: {
    sendorder: [
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
      }
    ],
    receiveorder: [
      {
        ordername: "coco",
        price: "12",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "1"
      },
      {
        ordername: "coco",
        price: "13",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "2"
      },
      {
        ordername: "coco",
        price: "14",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "3"
      },
      {
        ordername: "coco",
        price: "15",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "4"
      },
      {
        ordername: "coco",
        price: "16",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "5"
      },
      {
        ordername: "coco",
        price: "17",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "6"
      },
      {
        ordername: "coco",
        price: "18",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "7"
      },
      {
        ordername: "coco",
        price: "19",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "8"
      }
    ],
    navbar: ['我发出的订单', '我接收的订单'],
    currentTab: 0
  },
  listdetails: function (event) {
    var listid = event.currentTarget.dataset.listId
    console.log(listid);
    wx.navigateTo({
      url: '/pages/user/myList/myQ&ADetail/myQ&ADetail?id=' + listid,
    })
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  // 加载
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '我的订单'
    })
    var that = this
    //更新数据
    that.setData({
    })
  }
})
