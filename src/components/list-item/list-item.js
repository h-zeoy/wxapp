Component({
  properties: {
    title: { // 标题
      type: String,
      value: ''
    },
    type: { // 类型
      type: String,
      value: ''
    },
    list: { // 列表
      type: Array,
      value: []
    },
    moduleId: {
      type: Number,
      value: 0
    }
  },

  data: {},

  attached: function () {},

  observers: {},

  methods: {
    // 跳转活动详情  
    audioTap: function(e) {
      this.triggerEvent('listItemAudioEvent', e.currentTarget.dataset)
    }
  },
})