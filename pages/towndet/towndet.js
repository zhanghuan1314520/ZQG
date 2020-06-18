const app = getApp()
var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    blogList:{},
   // villageData:[],
    // 备注，默认选项栏 包含5个值，一个是镇的，就是这里面defaltOption 的值，另外四个就是villageData 的前四，点击跳转事件 发生在下拉列表里
    defaultOption:[{
      id:'000',
      name:'万世',
    }],
    selected: {},
    town:{},
    nav: [{
      imgurl:"../../images/nav/img4.png",
      title: "最新动态",
      id: 0,
    },
    {
      imgurl: "../../images/nav/img5.png",
      title: "走进村庄",
      id: 1
    },
    {
      imgurl: "../../images/nav/img6.png",
      title: "村规民约",
      id: 2
    },
    {
      imgurl: "../../images/nav/img7.png",
      title: "村庄特色",
      id: 3
    }
    ],
    list: [{
      id: 0,
      name: "3 月 24 日上午，区委常委、组织部部长万重丰一行到万市镇调研，重点了解万市镇党建工作开展情况.",
      type: 0
    },
    {
      id: 1,
      name: "素有“万山环镇东南雄”的万市，千峰竞秀、百川争流，漫山满坡的茂林修竹掩映气象万千。",
      type: 1
    },
    {
      id: 2,
      name: "为提高全体村民自我管理、自我教育、自我约束的能力，促进社 会的安定团结和文明建设，根据法律、法规。",
      type: 2
    },
    {
      id: 3,
      name: "杨家村，与桐庐县印渚镇相邻，总面积866.67公顷，山和坡地占95%，耕地仅66.67公顷，其中水田53.67公顷",
      type: 3
    },
    ],
    curNav: 0,
    curIndex: 0,
    winWidth: 0,
    winHeight: 0,
    currentData: 0,
    eatGoodsList: [],
    villageData:[],
    toView:"",
    isShow: false,
    parentData:{},
    whereGoodsList:[],
    playGoodsList:[],
    buyGoodsList:[],
    currentTab: 0, //11111111
    currentIndex: 0,
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getTownData: function (id) {
    let that = this;
    util.request(api.TownDetail, {
      id: id
    }).then(function (res) {
      if (res.errno === 0) { 
       // let arr = [{ id: 1, name: "方里村" }, { id: 2, name: "方外村" }, { id: 3, name: "地方村" }, { id: 4, name: "文化村" }, { id: 5, name: "方里村" }, { id: 6, name: "方外村" }, { id: 7, name: "方外村" },]
        that.setData({
          town: res.data.town,
          eatGoodsList: res.data.eatGoodsList.data,
          whereGoodsList: res.data.whereGoodsList.data,
          playGoodsList: res.data.playGoodsList.data,
          buyGoodsList: res.data.buyGoodsList.data,
          villageData: res.data.villageList.data,
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
    this.transformData(this.town);
    //this.hhh ();
    //this.transformData(this.town);
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },

  //获取当前滑块的index
  bindchange: function(e) {
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
  checkCurrent: function(e) {
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
  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  jump: function() {
    wx.navigateTo({
      url: '/pages/goods/goods',
    })
  },
  more: function() {
    wx.navigateTo({
      url: '/pages/more/more',
    })
  },
  ellipsis: function() {
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
  villag_detail: function () {
    wx.navigateTo({
      url: '/pages/villag_detail/villag_detail',
    })
  },

  handleiIemChang(e) {
    //console.log(e);
    const { index } = e.detail;
    //console.log(index);
    let { tablist } = this.data;
    tablist.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tablist
    })
  }
})