// pages/study/study.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    replyNum: '',
    replyStr: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const channelCode = Number(options.channelCode);
    if (!channelCode) {
      return false;
    }
    let replyNum = '';
    let replyStr = '';
    if (channelCode > 2) {
      replyNum = 1;
      replyStr = `{"input_key":${replyNum},"reply_key":${channelCode}}`;
    } else {
      replyNum = channelCode === 1 ? 6 : 7;
      replyStr = `{"input_key":${replyNum},"reply_key":${replyNum}}`;
    }
    this.setData({
      replyNum: replyNum,
      replyStr: replyStr
    });
  },

  handleContact (e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
  }
})