var app=getApp();
Page({
  data: {
    receivername:"",
    PutNumber: 0,
    Number: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    mytype: 0,
    NowNumber: 0,
    Title: "",
    Content: "请输入您的评论",
    logo: '/images/icons/addphoto.png',
    choose:-1,
  },
  onLoad: function (options) {
    var that=this
    this.setData({
      receivername: options.receivername ,
      listid:options.listid,
      Wechat_Number_Get: options.Wechat_Number_Get,
      getput: options.getput
    })
    if(this.data.getput=='-1')//给接收者评分
    {
      wx.request({
        url: 'https://1fpvdbfz.qcloud.la:5757/getMyOnePut',
        data: {
          "OrderGet_ID": options.listid,
        },
        success: function (res) {
          console.log(res.data)
          //已经评论过
          if (res.data[0].Credit_PtoG != -1) {
            that.setData({
              choose: 0,
              PutNumber: res.data[0].Credit_PtoG - 1,
              Content: res.data[0].Comment
            })
          }
        },
      })
    }
    if (this.data.getput == '1')//给发布者评分
    {
      wx.request({
        url: 'https://1fpvdbfz.qcloud.la:5757/getMyOnePut',
        data: {
          "OrderGet_ID": options.listid,
        },
        success: function (res) {
          console.log(res.data)
          //已经评论过
          if (res.data[0].Credit_GtoP != -1) {
            that.setData({
              choose: 0,
              PutNumber: res.data[0].Credit_GtoP - 1,
              Content: '不好意思您不能评论'
            })
          }
        },
      })
    }

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

  watchNumber: function (event) {
    this.setData({
      NowNumber: event.detail.cursor,
      Content: event.detail.value
    })
  },

  TitleChange: function (event) {
    this.setData({
      Title: event.detail.value
    })
  },

  showTopTips: function () {
    var that = this;
    if (that.data.Content == "") {
      if(that.data.getput==-1){
      wx.showToast({
        title: '请输入您的评论',
        icon: 'none',
        duration: 1500
        });
      return;
      }
    }
    var listid=that.data.listid
    if (that.data.getput == -1) {
    //增加评分
    wx.request({
      url: 'https://1fpvdbfz.qcloud.la:5757/PtoG',
      data: {
        "OrderGet_ID":listid,
        "Wechat_Number_Get": that.data.Wechat_Number_Get,
        "Credit_PtoG": that.data.Number[that.data.PutNumber]
      },
      success: function (res) {
        console.log(res);
        console.log(res.data)
       //增加评论
        wx.request({
          url: 'https://1fpvdbfz.qcloud.la:5757/addComment',
          data: {
            "OrderGet_ID": listid,
            "Wechat_Number_Get": that.data.Wechat_Number_Get,
            "Comment": that.data.Content
          },
          success: function (res) {
            console.log(res);
            console.log(res.data)

            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 1500,
              success: function () {
                setTimeout(function () {
                  wx.switchTab({
                    url: '/pages/user/user',
                  })
                }, 1500)
              }
            })
          },
        })
      },
    })
    }
    if (that.data.getput == 1) {
      //增加评分
      wx.request({
        url: 'https://1fpvdbfz.qcloud.la:5757/GtoP',
        data: {
          "OrderGet_ID": listid,
          "Wechat_Number_Get": getApp().globalData.Wechat_Number,
          "Credit_GtoP": that.data.Number[that.data.PutNumber],
          "Wechat_Number_Put": that.data.Wechat_Number_Get
        },
        success: function (res) {
          console.log(res);
          console.log(res.data)
          
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 1500,
            success: function () {
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/user/user',
                })
              }, 1500)
            }
          })
        },
      })
    }

  }
})