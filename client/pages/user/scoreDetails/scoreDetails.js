//获取应用实例
var app = getApp()
Page({
  data: {
    scoredetail: [
      {
        username: "",
        time:"",
        userscore:"",
        ordertype: 0,
        ordertitle:"",
        id: "0",
        receivername:""
      }
    ],
    navbar: ['我发出的订单', '我接收的订单'],
    currentTab: 0
  },
  listdetails: function (event) {
    var listid = event.currentTarget.dataset.listId
    var username = event.currentTarget.dataset.userName
    console.log(listid);
    wx.navigateTo({
      url: '/pages/user/myList/myListDetail/myListDetail?id='+listid+'&receivername='+username,
    })
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '分数详情'
    })
    var that = this;
    wx.request({
      url: 'https://1fpvdbfz.qcloud.la:5757/searchMyGet?Wechat_Number_Get=ludi5757',//此处填写你后台请求地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var array = that.data.scoredetail
        var i = 0
        console.log(res.data);
        for (i; i < res.data.length; i++) {
        array[i] = {
              id: res.data[i].OrderGet_ID,
              time: res.data[i].Order_Time,
              ordertitle: res.data[i].Order_Title,
              username: res.data[i].Wechat_Number_Put,
              userscore: res.data[i].Credit_PtoG,
              receivername: res.data[i].Wechat_Number_Get
            }
        }
        that.setData({
          scoredetail: array,
        });
      }
    })
  },
})
