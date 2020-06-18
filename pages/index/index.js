const util = require('../../utils/util.js');
const api = require('../../config/api.js');


//获取应用实例
const app = getApp();

Page({
  data: {
    options: [],
    selected: {},
    isShow: false,
    hotGoods: [],
    banner: [],
    navList: [],
    houseGoodsList: [],
    famerGoodsList: [],
    countryGoodsList: [],
    studyGoodsList: [],
    id: 0,
    currentCategory: {},
    thisCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    page: 1,
    limit: 10,
    // swaper 切换
    curIndex: 0,
    currentIndex: 0,

    winHeight: '100%',
    toView: '',
    nowstatus: 'tab1',
    currentTab: '',
    tab1Height: '',
    tab2Height: '',
    tab3Height: '',
    tab4Height: '',

    timer: null, // 计时器
    updateSticky: false



  },

  onShareAppMessage: function() {
    return {
      title: '小程序商场',
      desc: '小程序商城',
      path: '/pages/index/index'
    }
  },
  getRect() {
    let that = this
    wx.createSelectorQuery().select('#tab1').boundingClientRect(res => {
      that.setData({
        tab1Height: res.height
      })
    }).exec()
    wx.createSelectorQuery().select('#tab2').boundingClientRect(res => {
      that.setData({
        tab2Height: res.height
      })
    }).exec()
    wx.createSelectorQuery().select('#tab3').boundingClientRect(res => {
      that.setData({
        tab3Height: res.height
      })
    }).exec()
    wx.createSelectorQuery().select('#tab4').boundingClientRect(res => {
      that.setData({
        tab4Height: res.height
      })
    }).exec()
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getIndexData();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  // 获取区域list数据
  getAreaListData: function() {
    let that = this;
    util.request(api.RegionList, {
      parentId: 123
    }).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          options: res.data,
          selected: res.data[11]
        });
      }
    });
  },

  getIndexData: function() {
    let that = this;
    util.request(api.IndexUrl).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          hotGoods: res.data.hotGoodsList,
          banner: res.data.banner,
          houseGoodsList: res.data.houseGoodsList,
          famerGoodsList: res.data.famerGoodsList,
          countryGoodsList: res.data.countryGoodsList,
          studyGoodsList: res.data.studyGoodsList,
        });
      }
    });
  },

  areaTap: function() {
    this.setData({
      isShow: !this.data.isShow
    });
  },
  onLoad: function(options) {
    let that = this;
    // this.getRect()
    // 获取当前设备的宽高
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winHeight: res.windowHeight * 2 - (res.windowWidth * 90 / 750) + 'rpx'
        })
      },
    })


    this.getAreaListData();
    // 页面初始化 options为页面跳转所带来的参数
    if (options.scene) {
      //这个scene的值存在则证明首页的开启来源于朋友圈分享的图,同时可以通过获取到的goodId的值跳转导航到对应的详情页
      var scene = decodeURIComponent(options.scene);

      let info_arr = [];
      info_arr = scene.split(',');
      let _type = info_arr[0];
      let id = info_arr[1];

      if (_type == 'goods') {
        wx.navigateTo({
          url: '../goods/goods?id=' + id
        });
      } else if (_type == 'groupon') {
        wx.navigateTo({
          url: '../goods/goods?grouponId=' + id
        });
      } else {
        wx.navigateTo({
          url: '../index/index'
        });
      }
      // 高度自适应
      wx.getSystemInfo({
        success: function(res) {
          var clientHeight = res.windowHeight,
            clientWidth = res.windowWidth,
            rpxR = 750 / clientWidth;
          var calc = clientHeight * rpxR - 180;
          that.setData({
            winHeight: calc
          });
        }
      });
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (options.grouponId) {
      //这个pageId的值存在则证明首页的开启来源于用户点击来首页,同时可以通过获取到的pageId的值跳转导航到对应的详情页
      wx.navigateTo({
        url: '../goods/goods?grouponId=' + options.grouponId
      });
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (options.goodId) {
      //这个goodId的值存在则证明首页的开启来源于分享,同时可以通过获取到的goodId的值跳转导航到对应的详情页
      wx.navigateTo({
        url: '../goods/goods?id=' + options.goodId
      });
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (options.orderId) {
      //这个orderId的值存在则证明首页的开启来源于订单模版通知,同时可以通过获取到的pageId的值跳转导航到对应的详情页
      wx.navigateTo({
        url: '../ucenter/orderDetail/orderDetail?id=' + options.orderId
      });
    }

    this.getIndexData();
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  getCoupon(e) {
    if (!app.globalData.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }

    let couponId = e.currentTarget.dataset.index
    util.request(api.CouponReceive, {
      couponId: couponId
    }, 'POST').then(res => {
      if (res.errno === 0) {
        wx.showToast({
          title: "领取成功"
        })
      } else {
        util.showErrorToast(res.errmsg);
      }
    })
  },
  // 滚动切换标签样式
  switchTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function(e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function() {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  footerTap: app.footerTap,
  change(e) {
    this.setData({
      selected: e.detail,
      isShow: false
    })
    // wx.showToast({
    //   title: `${this.data.selected.id} - ${this.data.selected.name}`,
    //   icon: 'success',
    //   duration: 1000                            
    // })
  },

  //获取当前滑块的index
  bindchange: function(e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  pagechange: function(e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 2
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  titleClick: function(e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },
  close() {
    // 关闭select
    this.selectComponent('#select').close()
  },

  toViewClick(e) {
    this.setData({
      toView: e.currentTarget.dataset.hash,
      nowstatus: e.currentTarget.dataset.hash,
      currentTab: e.currentTarget.dataset.current
    })
    var current = e.currentTarget.dataset.current; // 获取当前tab的index
    // 导航tab共4个，获取一个的宽度
    var tabWidth = this.data.windowHeight / 4;

    this.setData({
      tabScroll: (current - 2) * tabWidth // 使点击的tab始终在居中的位置
    })
  },

  onPageScroll: function(e) {
    var that = this;
    this.getRect()
    if (e.detail) {
      if (e.detail.scrollTop >= 0 && e.detail.scrollTop < that.data.tab1Height) {
        var tabWidth = this.data.windowWidth / 4;
        this.setData({
          nowstatus: 'tab1',
          currentTab: 0,
          tabScroll: (0 - 2) * tabWidth,
        })
      }
      if (e.detail.scrollTop > (that.data.tab1Height - 6) && e.detail.scrollTop < (that.data.tab1Height + that.data.tab2Height)) {
        var tabWidth = this.data.windowWidth / 4;
        this.setData({
          nowstatus: 'tab2',
          currentTab: 1,
          tabScroll: (1 - 2) * tabWidth,
        })
      }
      if (e.detail.scrollTop >= (that.data.tab1Height + that.data.tab2Height - 6) && e.detail.scrollTop < (that.data.tab1Height + that.data.tab2Height + that.data.tab3Height)) {
        var tabWidth = this.data.windowWidth / 4;
        this.setData({
          nowstatus: 'tab3',
          currentTab: 2,
          tabScroll: (2 - 2) * tabWidth,
        })
      }
      if (e.detail.scrollTop >= (that.data.tab1Height + that.data.tab2Height + that.data.tab3Height - 6) && e.detail.scrollTop < (that.data.tab1Height + that.data.tab2Height + that.data.tab3Height + that.data.tab3Height)) {
        var tabWidth = this.data.windowWidth / 4;
        this.setData({
          nowstatus: 'tab4',
          currentTab: 3,
          tabScroll: (3 - 2) * tabWidth,
        })
      }
    }

  },



  onPageScroll(e) {
    let scrollTop = e.scrollTop;
    this.setData({
      scrollTop
    })
  },
  // 向锚点二的列表中增加数据
  addData() {
    let key = 'navList[1].content'
    let data = this.data.navList[1].content
    for (let i = 0; i < 10; i++) {
      data = data.concat([{
        article: "新增列表二"
      }])
    }
    this.setData({
      [key]: data
    })
    // 重新计算sticky-item高度
    this.initSticky()
  },
  initSticky() {
    this.setData({
      updateSticky: !this.data.updateSticky
    })
  }
})