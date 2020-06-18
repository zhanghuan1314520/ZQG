// pages/factoryDetails/factoryDetails.js
const app = getApp()
var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    imageWidth: wx.getSystemInfoSync().windowWidth, //图片宽度   
  
    nav: [{
      imgurl: "../../images/nav/img4.png",
      title: "动态",
      id: 0,
    },
    {
      imgurl: "../../images/nav/img5.png",
      title: "介绍",
      id: 1
    },
    {
      imgurl: "../../images/nav/img6.png",
      title: "规则",
      id: 2
    },
    {
      imgurl: "../../images/nav/img7.png",
      title: "特色",
      id: 3
    }
    ],

    list: [{
      id: 0,
      name: "方里村正积极打造知勤谷农耕文化教育基地，以生态开发为宗旨，集科研、种植、养殖、农耕教育",
      type: 0
    },
    {
      id: 1,
      name: "知勤谷占地面积1000余亩，集农业生态观光旅游",
      type: 1
    },
    {
      id: 2,
      name: "从基地到餐桌，零污染。",
      type: 2
    },
    {
      id: 3,
      name: "农耕文化教育基地，以生态开发为宗旨，集科研、种植、养殖、农耕教育、旅游休闲为一体的绿色生态园，",
      type: 3
    },
    ],
    curNav: 0,
    curIndex: 0,
    ellipsis: true, // 文字是否收起，默认收起
    winWidth: 0,
    brand:{},
    blogList:{},
    winHeight: 0,
    currentData: 0,
    eatGoodsList: [],
    toView: "",
    isShow: false,
    parentData: {},
    whereGoodsList: [],
    playGoodsList: [],
    buyGoodsList: [],
    currentTab: 0,
    currentIndex: 0,

  },
  /**
   * 生命周期函数--监听页面加载
   */
  getBrandData: function (id) {
    let that = this;
    util.request(api.BrandDetail, {
      id: id
    }).then(function (res) {
      if (res.errno === 0) {
        // let arr = [{ id: 1, name: "方里村" }, { id: 2, name: "方外村" }, { id: 3, name: "地方村" }, { id: 4, name: "文化村" }, { id: 5, name: "方里村" }, { id: 6, name: "方外村" }, { id: 7, name: "方外村" },]
        that.setData({
          brand: res.data.brand,
          eatGoodsList: res.data.eatGoodsList.data,
          whereGoodsList: res.data.whereGoodsList.data,
          playGoodsList: res.data.playGoodsList.data,
          buyGoodsList: res.data.buyGoodsList.data,
          //villageData: res.data.villageList.data,
          // villageData: arr,
          blogList: res.data.blogList,
        });
        //   this.transformData (town);
      }

    });
    //console.log(town)`45iuyp     
    //this.transformData(town);
  },



  onLoad: function (params) {
    var that = this;
    that.setData({
      parentData: params,
      id: parseInt(params.id)
    });
    this.getBrandData(params.id);
   // this.transformData(this.town);
    //this.hhh ();
    //this.transformData(this.town);
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },

  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 2
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  
  ellipsis: function () {
    var value = !this.data.ellipsis;
    this.setData({
      ellipsis: value
    })
  },
  navTap(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      curNav: id,
      curIndex: id
    })
  },
  // 是否展示下拉框
  isShowMore() {
    this.setData({
      isShow: !this.data.isShow
    })
  },

  change(e) {
    let dataset = e.target.dataset
    let target = e.currentTarget.dataset.id;
    this.setData({
      selected: { ...dataset },
      toView: 'inToView' + target
    })
    wx.navigateTo({
      url: '/pages/village/villagedet',
    })
  },
  //切换bar
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    //全局变量
    app.globalData.currentTab = e.currentTarget.dataset.idx;
  },
  onShow() {
    this.setData({
      currentTab: app.globalData.currentTab
    })
  },
})