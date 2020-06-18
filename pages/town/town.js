var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();

Page({
  data: {
    banners: [],
    options: [],
    selected: {},
    isShow: false,
    toView: '',
    bannerInfo: {
      'imgUrl': '/static/images/cs.jpg',
      'name': '大家都在买的'
    },
    categoryFilter: false,
    filterCategory: [],
    townsList: [],
    parentData: '',
    currentSortType: 'default',
    currentSort: 'add_time',
    currentSortOrder: 'desc',
    page: 1,
    limit: 10
  },


  getTownsList: function(params) {
    var that = this;
    util.request(api.TownList, {
        parentId: params.id,
        page: that.data.page,
        limit: that.data.limit,
      })
      .then(function(res) {
        let arr = [{
          id: '1',
          info: "　　万市镇地处富阳市西北部，位于富阳、临安、桐庐三县市交汇点，距富阳市中心50公里，距杭州主城区68公里，2010年万市镇被确立为杭州市级中心镇。万市镇域总面积155.14平方公里，户籍人口2.4万，辖1个居委会、15个行政村。",
          name: '大源',
          pic_url: "http://www.oldcow.shop/static/upload/town/ebae83cc-80ab-4351-b13e-783143a98706.jpg"
        }, {
          id: '2',
          name: '胥口',
            info: "　　万市镇地处富阳市西北部，位于富阳、临安、桐庐三县市交汇点，距富阳市中心50公里，距杭州主城区68公里，2010年万市镇被确立为杭州市级中心镇。万市镇域总面积155.14平方公里，户籍人口2.4万，辖1个居委会、15个行政村。",
            pic_url: "http://www.oldcow.shop/static/upload/town/ebae83cc-80ab-4351-b13e-783143a98706.jpg"
        }, {
          id: '3',
          name: '渌渚',
          info: "　　万市镇地处富阳市西北部，位于富阳、临安、桐庐三县市交汇点，距富阳市中心50公里，距杭州主城区68公里，2010年万市镇被确立为杭州市级中心镇。万市镇域总面积155.14平方公里，户籍人口2.4万，辖1个居委会、15个行政村。",
            pic_url: "http://www.oldcow.shop/static/upload/town/ebae83cc-80ab-4351-b13e-783143a98706.jpg"
        }, {
          id: '4',
          name: '永昌',
            info: "　　万市镇地处富阳市西北部，位于富阳、临安、桐庐三县市交汇点，距富阳市中心50公里，距杭州主城区68公里，2010年万市镇被确立为杭州市级中心镇。万市镇域总面积155.14平方公里，户籍人口2.4万，辖1个居委会、15个行政村。",
            pic_url: "http://www.oldcow.shop/static/upload/town/ebae83cc-80ab-4351-b13e-783143a98706.jpg"
        }, {
          id: '5',
          name: '万市',
            info: "　　万市镇地处富阳市西北部，位于富阳、临安、桐庐三县市交汇点，距富阳市中心50公里，距杭州主城区68公里，2010年万市镇被确立为杭州市级中心镇。万市镇域总面积155.14平方公里，户籍人口2.4万，辖1个居委会、15个行政村。",
            pic_url: "http://www.oldcow.shop/static/upload/town/ebae83cc-80ab-4351-b13e-783143a98706.jpg"
        }, {
          id: '6',
          name: '大源',
            info: "　　万市镇地处富阳市西北部，位于富阳、临安、桐庐三县市交汇点，距富阳市中心50公里，距杭州主城区68公里，2010年万市镇被确立为杭州市级中心镇。万市镇域总面积155.14平方公里，户籍人口2.4万，辖1个居委会、15个行政村。",
            pic_url: "http://www.oldcow.shop/static/upload/town/ebae83cc-80ab-4351-b13e-783143a98706.jpg"
        }, {
          id: '7',
          name: '灵桥',
            info: "　　万市镇地处富阳市西北部，位于富阳、临安、桐庐三县市交汇点，距富阳市中心50公里，距杭州主城区68公里，2010年万市镇被确立为杭州市级中心镇。万市镇域总面积155.14平方公里，户籍人口2.4万，辖1个居委会、15个行政村。",
            pic_url: "http://www.oldcow.shop/static/upload/town/ebae83cc-80ab-4351-b13e-783143a98706.jpg"
        }, {
            id: '8',
          name: '常绿',
            info: "　　万市镇地处富阳市西北部，位于富阳、临安、桐庐三县市交汇点，距富阳市中心50公里，距杭州主城区68公里，2010年万市镇被确立为杭州市级中心镇。万市镇域总面积155.14平方公里，户籍人口2.4万，辖1个居委会、15个行政村。",
            pic_url: "http://www.oldcow.shop/static/upload/town/ebae83cc-80ab-4351-b13e-783143a98706.jpg"
        }, {
          id: '12',
          name: '灵桥',
            info: "　　万市镇地处富阳市西北部，位于富阳、临安、桐庐三县市交汇点，距富阳市中心50公里，距杭州主城区68公里，2010年万市镇被确立为杭州市级中心镇。万市镇域总面积155.14平方公里，户籍人口2.4万，辖1个居委会、15个行政村。", 
            pic_url: "http://www.oldcow.shop/static/upload/town/ebae83cc-80ab-4351-b13e-783143a98706.jpg"
        }, {
          id: '13',
          name: '里山',
            info: "　　万市镇地处富阳市西北部，位于富阳、临安、桐庐三县市交汇点，距富阳市中心50公里，距杭州主城区68公里，2010年万市镇被确立为杭州市级中心镇。万市镇域总面积155.14平方公里，户籍人口2.4万，辖1个居委会、15个行政村。",
            pic_url: "http://www.oldcow.shop/static/upload/town/ebae83cc-80ab-4351-b13e-783143a98706.jpg"
        }, {
          id: '11',
          name: '渔山',
            info: "　　万市镇地处富阳市西北部，位于富阳、临安、桐庐三县市交汇点，距富阳市中心50公里，距杭州主城区68公里，2010年万市镇被确立为杭州市级中心镇。万市镇域总面积155.14平方公里，户籍人口2.4万，辖1个居委会、15个行政村。", 
            pic_url: "http://www.oldcow.shop/static/upload/town/ebae83cc-80ab-4351-b13e-783143a98706.jpg"
        }, {
          id: '9',
          name: '上官',
            info: "　　万市镇地处富阳市西北部，位于富阳、临安、桐庐三县市交汇点，距富阳市中心50公里，距杭州主城区68公里，2010年万市镇被确立为杭州市级中心镇。万市镇域总面积155.14平方公里，户籍人口2.4万，辖1个居委会、15个行政村。",
            pic_url: "http://www.oldcow.shop/static/upload/town/ebae83cc-80ab-4351-b13e-783143a98706.jpg"
        }, {
          id: '10',
          name: '场口',
            info: "　　万市镇地处富阳市西北部，位于富阳、临安、桐庐三县市交汇点，距富阳市中心50公里，距杭州主城区68公里，2010年万市镇被确立为杭州市级中心镇。万市镇域总面积155.14平方公里，户籍人口2.4万，辖1个居委会、15个行政村。",
            pic_url: "http://www.oldcow.shop/static/upload/town/ebae83cc-80ab-4351-b13e-783143a98706.jpg"
        }]
        if (res.errno === 0) {
          that.setData({
            townsList: res.data.data.data,
            banners:res.data.banner,
          });
        }
      });
  },
  onLoad: function(params) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(params)

    this.setData({
      parentData: params
    })
    this.getTownsList(params);
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
  openSortFilter: function(event) {
    let currentId = event.currentTarget.id;
    switch (currentId) {
      case 'categoryFilter':
        this.setData({
          categoryFilter: !this.data.categoryFilter,
          currentSortType: 'category',
          currentSort: 'add_time',
          currentSortOrder: 'desc'
        });
        break;
      case 'priceSort':
        let tmpSortOrder = 'asc';
        if (this.data.currentSortOrder == 'asc') {
          tmpSortOrder = 'desc';

        }
        this.setData({
          currentSortType: 'price',
          currentSort: 'retail_price',
          currentSortOrder: tmpSortOrder,
          categoryFilter: false
        });

        this.getGoodsList();
        break;

      default:
        //综合排序
        this.setData({
          currentSortType: 'default',
          currentSort: 'add_time',
          currentSortOrder: 'desc',
          categoryFilter: false,
          categoryId: 0
        });
        this.getGoodsList();
    }
  },
  selectCategory: function(event) {
    let currentIndex = event.target.dataset.categoryIndex;
    this.setData({

      'categoryFilter': false,
      'categoryId': this.data.filterCategory[currentIndex].id
    });
    this.getGoodsList();
  },
  isShowMore() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  change(e) {
    let dataset = e.target.dataset
    let target = e.currentTarget.dataset.id;
    this.setData({
      selected: {...dataset},
      toView: 'inToView' + target
    })
   
    // this.$apply();
    // wx.showToast({
    //   title: `${this.data.selected.id} - ${this.data.selected.name}`,
    //   icon: 'success',
    //   duration: 1000
    // })
  },
})