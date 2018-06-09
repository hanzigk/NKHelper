//获取应用实例
var app = getApp()
Page({
  data: {
     sendorder:[
       {
         ordertype:0,
         receivername:"",
         ordermax: "",
         ordernow: "",
         sendername: "",
         ordertitle: "",
         ordertime:"",
         id:0
       }
     ],
     receiveorder: [
       {
         ordertype: 0,
         ordermax: "",
         ordernow:"",
         sendername: "",
         ordertitle: "",
         ordertime: "",
         id: 0
       }
     ],
     orderindex:[
       {
         id:-1
       }
     ],
     navbar: ['我发出的订单', '我接收的订单'],
     currentTab: 0
  },
  listdetails: function (event) {
    var listid = event.currentTarget.dataset.listId
    var receivername = event.currentTarget.dataset.receiverName
    console.log(listid);
    console.log(receivername);
    wx.navigateTo({
      url: '/pages/user/myList/myListDetail/myListDetail?id='+listid+'&receivername='+receivername,
    })
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    var that = this;
    wx.request({
      url: 'https://1fpvdbfz.qcloud.la:5757/searchMyGet?Wechat_Number_Get=ludi5757',//此处填写你后台请求地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var array = that.data.receiveorder
        var i = 0
        console.log(res.data);
        for (i; i < res.data.length; i++) {
            array[i] = {
              id: res.data[i].OrderGet_ID,
              ordertype: res.data[i].Order_Type,
              ordertime: res.data[i].Order_Time,
              ordertitle: res.data[i].Order_Title,
              content: res.data[i].Order_Content,
              sendername: res.data[i].Wechat_Number_Get,
              ordermax: res.data[i].Order_MaxNumber,
              ordernow: res.data[i].Order_NowNumber
            }
        }
        that.setData({
          receiveorder: array
        });
      }
    })
  },
  // 加载
   onLoad: function (options) {
     wx.setNavigationBarTitle({
       title: '我的订单'
     })
    var that = this;
    wx.request({
      url: 'https://1fpvdbfz.qcloud.la:5757/searchMyPut?Wechat_Number_Put=ludi5757',//此处填写你后台请求地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var array = that.data.sendorder
        var indexarray = that.data.orderindex
        var i = 0
        var temp=-1;
        var j=0;
        var count=0;
        //
        var ordertype= 0;
        var receivername="";
        var ordermax= 0;
        var ordernow = 0;
        var sendername= "";
        var ordertitle="";
        var ordertime="";
        var id=0;
        console.log(res.data);
        for (i; i < res.data.length; i++) {
          temp=-1;
          for (j = 0; j < indexarray.length;j++){
            if (res.data[i].OrderPut_ID == indexarray[j].id)//表明已经发布过
            {
              temp=j;
            }
          }
          if(temp==-1)//未发布过
          {
            array[count] = {
              id: res.data[i].OrderPut_ID,
              ordertype: res.data[i].Order_Type,
              ordertime: res.data[i].Order_Time,// 1000//res.data[i].Order_Time,
              ordertitle: res.data[i].Order_Title,
              sendername: res.data[i].Wechat_Number_Put,
              receivername: res.data[i].Wechat_Number_Get,
              ordermax: res.data[i].Order_MaxNumber,
              ordernow: res.data[i].Order_NowNumber
            }
            indexarray[j-1]={
              id: res.data[i].OrderPut_ID
            }
            count++;
          }else{
            console.log(temp);
            ordertype = array[temp].ordertype;
            ordermax = array[temp].ordermax;
            ordernow = array[temp].ordernow;
            sendername = array[temp].sendername;
            ordertitle = array[temp].ordertitle;
            ordertime = array[temp].ordertime;
            id = array[temp].id;
            receivername=array[temp].receivername
            array[temp]={
              id: id,
              ordertype: ordertype,
              ordertime: ordertime,// 1000//res.data[i].Order_Time,
              ordertitle: ordertitle,
              sendername: sendername,
              ordermax: ordermax,
              ordernow: ordernow,
              receivername:receivername+';'+res.data[i].Wechat_Number_Get
            }
          }
        }
        that.setData({
          sendorder: array,
          orderindex: indexarray
        });
      }
    })
  }
})
