//index.js
//获取应用实例
const app = getApp()
const audioList = require('../../data/audioList');

Page({
  data: {
    audioList,
    moduleId: 0,
    playId: 0,
  },

  //事件处理函数
  listItemAudioEvent: function(e) {
    this.setData({
      moduleId: e.detail.moduleid,
      playId: e.detail.id
    })
    wx.navigateTo({
      url: '../play/play?moduleId='+this.data.moduleId+'&playId='+this.data.playId,
    })
    // wx.navigateTo({
    //   url: '../study/study?channelCode=32'
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
