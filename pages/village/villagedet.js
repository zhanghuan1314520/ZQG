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
    imgUrls: [
      '../../static/images/cs.jpg',
      '../../static/images/cs.jpg',
      '../../static/images/cs.jpg'
    ],
    // villageData:[],
    // 备注，默认选项栏 包含5个值，一个是镇的，就是这里面defaltOption 的值，另外四个就是villageData 的前四，点击跳转事件 发生在下拉列表里
    defaultOption: [{
      id: '000',
      name: '万世',
    }],
    selected: {},
    town: {},
    nav: [{
      title: "最新动态",
      id: 0,
    },
    {
      title: "走进方里",
      id: 1
    },
    {
      title: "村规民约",
      id: 2
    },
    {
      title: "方里特色",
      id: 3
    }
    ],

    list: [{
      id: 0,
      name: "方里村正积极打造知勤谷农耕文化教育基地，以生态开发为宗旨，集科研、种植、养殖、农耕教育、旅游休闲为一体的绿色生态园，预计建设总面积为1000亩，总投资2000万元，建设期限为3年。休闲园区规划结构为：农耕体验区、拓展基地区、水果采摘区、观光植物区、民宿区等。",
      type: 0
    },
    {
      id: 1,
      name: "方里村地处富阳西北部，区域面积11.47平方公里，山林面积14238亩，耕地面积820.3亩，其中水田509亩。万牧公路串村而过，东接胥高公路，西南经杨家古银杏公园通桐庐、临安，村北与临安南天目山接壤，距富阳市区54公里。方里村共有12个村民小组，277户农房，总人口938人。有7个村民小组仍居住在海拔500米以上高山。方里村毛竹、杉树等林业资源丰富，盛产山核桃、竹笋，其中山核桃种植面积达5000余亩，先后被省、市林业部门评为“省级生态经济型示范基地”、“杭州市都市农业基地”等。村民的主要经济收入以山核桃、竹笋和务工收入为主。",
      type: 1
    },
    {
      id: 2,
      name: "",
      type: 2
    },
    {
      id: 3,
      name: "青岭头山核桃基地通过数十年的基础设施建设，在新品种的引进、新技术的推广，经营技术等方面示范作用明显，成为杭州市农村科普示范基地、浙江省级现代化林业示范园区。同时，组织成立了山核桃专业合作社，衽了“四统一”，提高了林农的组织化程度，还鼓励林农注册了“万市”“峰奇”等商标，强化“三品一标”基地建设。基地通过了“浙江省森林食品基地”的认定，有力地促进了山核桃产业的持续健康发展",
      type: 3
    },
    ],
    curNav: 0,
    curIndex: 0,
    ellipsis: true, // 文字是否收起，默认收起
    winWidth: 0,
    winHeight: 0,
    currentData: 0,
    eatGoodsList: [],
    villageData: [],
    toView: "",
    isShow: false,
    blogList:{},
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
  getTownData: function (id) {
    let that = this;
    util.request(api.VillageDetail, {
      id: 8
    }).then(function (res) {
      if (res.errno === 0) {
        // let arr = [{ id: 1, name: "方里村" }, { id: 2, name: "方外村" }, { id: 3, name: "地方村" }, { id: 4, name: "文化村" }, { id: 5, name: "方里村" }, { id: 6, name: "方外村" }, { id: 7, name: "方外村" },]
        that.setData({
          town: res.data.village,
          eatGoodsList: res.data.eatGoodsList.data,
          whereGoodsList: res.data.whereGoodsList.data,
          playGoodsList: res.data.playGoodsList.data,
          buyGoodsList: res.data.buyGoodsList.data,
         // villageData: res.data.villageList.data,
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
    this.getTownData(params.id);
  //  this.transformData(this.town);
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
  jump: function () {
    wx.navigateTo({
      url: '/pages/goods/goods',
    })
  },
  more: function () {
    wx.navigateTo({
      url: '/pages/more/more',
    })
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