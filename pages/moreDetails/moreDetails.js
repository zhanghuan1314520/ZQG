// pages/moreDetails/moreDetails.js
var app = getApp(); var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    blog:{}
  },
  getBlogsInfo: function () {
    let that = this;
    util.request(api.BlogDetail, {
      id: that.data.id
    }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          blog: res.data.blog,
        }); 
        WxParse.wxParse('blogsDetail', 'html', res.data.blog.text, that);
      }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
     id: parseInt(options.id)
      // id: 1181000
    });
    //console.log(id)
    this.getBlogsInfo();
  },
})