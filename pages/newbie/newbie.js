// pages/newbie/newbie.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp()
Page({
  data: {
    imgWidth: 0, imgHeight: 0,
    topicList: [], //定义保存变量
     couponurlList: [
      {
        id: 0,
        image: "http://img.oldcow.shop/100-10.png",
        image_close: "http://img.oldcow.shop/100-2.png",
        type: 0 //0 未领取，1 已领取   判断 type=0，渲染image，可触发点击事件，点击事件中包含刷新，否则，不可点击
      },
      {
        id: 1,
        image: "http://img.oldcow.shop/200.png",
        image_close: "http://img.oldcow.shop/200-2.png",
        type: 0 //0 未领取，1 已领取
      },
      {
        id: 2,
        image: "http://img.oldcow.shop/400.png",
        image_close: "http://img.oldcow.shop/400-2.png",
        type: 1 //0 未领取，1 已领取
      },
    ]
    
  },
  onLoad: function(options) {
    this.getTopic(); //调用
  },
  getTopic: function() {
    let that = this;
    that.setData({
      topicList: []
    });
    util.request(api.HotGoodsList, {}).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          topicList: res.data.hotGoodsList
        });
      }
      wx.hideToast();
    });
  },
  bindCoupon: function () {
    console.log("**********************************************")
    this.setData({
      'couponurlList[0].type':1
    })
  },
})