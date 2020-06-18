// components/index-select/index-select.js
Component({
  properties: {
    options: {
      type: Array,
      value: []
    },
    defaultOption: {
      type: Object,
      value: {}
    },
    key: {
      type: String,
      value: 'id'
    },
    text: {
      type: String,
      value: 'name'
    }
  },
  data: {
    current: {}
  },
  methods: {
    optionTap(e) {
      let dataset = e.target.dataset
      this.setData({
        current: dataset,
      });

      // 调用父组件方法，并传参
      this.triggerEvent("change", dataset)
    },
  },
  lifetimes: {
    attached() {
     
      this.setData({
        current: Object.assign({}, this.data.defaultOption),
      })
    }
  }
})