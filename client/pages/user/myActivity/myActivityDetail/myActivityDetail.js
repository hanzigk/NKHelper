Page({
  onLoad: function (options) {
    console.log(options.id);
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    this.setData({
      mid: options.id,
    })
  },
  data: {
    sendorderdetail: [
      {
        ordername: "coco",
        price: "12",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "1",
        content: "第一杯"
      },
      {
        ordername: "coco",
        price: "13",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "2",
        content: "第二杯"
      },
      {
        ordername: "coco",
        price: "14",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "3",
        content: "第三杯"
      },
      {
        ordername: "coco",
        price: "15",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "4",
        content: "第四杯"
      },
      {
        ordername: "coco",
        price: "16",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "5",
        content: "第五杯"
      },
      {
        ordername: "coco",
        price: "17",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "6",
        content: "第六杯"
      },
      {
        ordername: "coco",
        price: "18",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "7",
        content: "第七杯"
      },
      {
        ordername: "coco",
        price: "19",
        orderstatus: "已成交",
        sendername: "A",
        receivername: "B",
        id: "8",
        content: "第八杯"
      }
    ]
  }
})  
