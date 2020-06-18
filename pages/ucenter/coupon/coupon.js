// pages/ucenter/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tablist:[{
      id:0,
      name:"可使用",
      isActive:true
    },{
      id:1,
      name:"已使用",
      isActive:false
    },{
      id:2,
      name:"已过期",
      isActive:false
    }],
    indexnav1:[{
      indexurl:"../../../images/nav/5.jpg"
    }],
    indexnav2: [{
      indexurl: "../../../images/nav/5.jpg"
    }],
    indexnav3: [{
      indexurl: "../../../images/nav/5.jpg"
    }]
  },
  handleiIemChang(e){
    //console.log(e);
    const { index } = e.detail;
    //console.log(index);
     let {tablist} =this.data;
      tablist.forEach((v,i) =>i===index?v.isActive=true:v.isActive=false);
      this.setData({
        tablist
      })
  }
})