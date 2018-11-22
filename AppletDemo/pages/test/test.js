var app = getApp()
Page({
  data: {
    userInfo: {},
    userListInfo: [{
      text: '我的',
      isunread: true,
      unreadNum: 2,
      icon: '../resource/jiantou.png',
      des: '夏天很暖111111111111'
    }, {
      text: '我的2',
      isunread: false,
      unreadNum: 2,
      des: '夏天很暖2222222222222'
    }, {
      text: '我的3',
      isunread: true,
      unreadNum: 1,
      des: '夏天很暖33333333'
    }, {
      text: '收货地址管理',
      isunread: true,
        unreadNum: 2
    }, {
      text: '联系客服',
      isunread: true,
        unreadNum: 2
    }, {
      text: '常见问题',
      isunread: true,
        unreadNum: 2
      }, {
        text: '收货地址管理',
        isunread: true,
        unreadNum: 2
      }, {
        text: '联系客服',
        isunread: true,
        unreadNum: 2
      }, {
        text: '常见问题',
        isunread: true,
        unreadNum: 2
      }, {
        text: '收货地址管理',
        isunread: true,
        unreadNum: 2
      }, {
        text: '联系客服',
        isunread: true,
        unreadNum: 2
      }, {
        text: '常见问题',
        isunread: true,
        unreadNum: 2
      }
    ]
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
  }

})
