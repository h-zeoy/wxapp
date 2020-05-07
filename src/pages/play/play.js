// pages/play/play.js
const audioList = require('../../data/audioList');
const innerAudioContext = wx.getBackgroundAudioManager();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    playInfo: {},
    animationData: {},
    isPlay: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const playInfo = this._getPlayInfo(options);
    that.setData({
      playInfo,
    });
    innerAudioContext.src = playInfo.audio;
    innerAudioContext.title = playInfo.name;
    innerAudioContext.coverImgUrl = 'https://polaris-test.oss-cn-beijing.aliyuncs.com/image/course/KtRN5jHP.png';
    innerAudioContext.play();
    innerAudioContext.onCanplay(() => {
      that.setData({
        isPlay: true
      });
    });

    innerAudioContext.onPause(() => {
      that.setData({
        isPlay: false
      });
    });

    innerAudioContext.onPlay(() => {
      that.setData({
        isPlay: true
      });
    });

    innerAudioContext.onEnded(() => {
      that.setData({
        isPlay: false,
      });
    });
    // const version = wx.getSystemInfoSync().SDKVersion;
    // console.log(version);
  },

  _getPlayInfo: function (options) {
    for (let i = 0; i < audioList.length; i++) {
      if (options.moduleId == String(audioList[i].moduleId)) {
        for (let j = 0; j < audioList[i].list.length; j++) {
          if (options.playId === String(audioList[i].list[j].id)) {
            return audioList[i].list[j];
          }
        }
      }
    }
  },

  handlePlay: function () {
    const that = this;
    this.setData({
      isPlay: !that.data.isPlay
    }, function() {
      if (that.data.isPlay) {
        if (!innerAudioContext.src) {
          innerAudioContext.src = that.data.playInfo.audio;
          innerAudioContext.title = that.data.playInfo.name;
          innerAudioContext.coverImgUrl = 'https://polaris-test.oss-cn-beijing.aliyuncs.com/image/course/KtRN5jHP.png';
        }
        innerAudioContext.play();
      } else {
        innerAudioContext.pause()
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var animation = wx.createAnimation({
      duration: 3000,
      timingFunction: 'linear',
    });  
    this.animation = animation;

    animation.rotate(45).step();
    this.setData({
      animationData: animation.export()
    })

    this.interval = setInterval(function () {
      animation.translate(30).step();
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 3000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})