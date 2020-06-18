// components/tablist/tablist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
tablist:{
  type:Array,
  value:[]
}
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hanldeItemTap(e){
      // console.log(e);
      const {index}=e.currentTarget.dataset;
      this.triggerEvent("itemChang",{index});
      //let {tablist} =this.data;
      //tablist.forEach((v,i) =>i===index?v.isActive=true:v.isActive=false);
      //this.setData({
        //tablist
      //})
    }
  }
})
