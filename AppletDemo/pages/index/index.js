// index.js
// 获取应用实例
const app = getApp()
console.log(app.gloVar)
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 生命周期回调—监听页面加载
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /// get 用户信息
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /// 生命周期回调—监听页面显示
  onShow: function () {

  },
  /// 生命周期回调—监听页面初次渲染完成
  onReady: function () {

  },
  /// 生命周期回调—监听页面隐藏
  onHide: function () {
    
  },
  clickMe: function () {
    console.log()
    this.setData({ msg: "夏天很暖" })
  },
  clickPush: function () {
    console.log("点击了跳转")
    wx.navigateTo({
      url: '../test/test'
    })
  }
})
