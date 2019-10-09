//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    posts: [{ "categoryId": 1875, "characteristic": "享受vip尊享服务，使用专业版后台，功能更强，体验更好", "commission": 0.00, "commissionType": 0, "dateAdd": "2019-03-19 09:51:08", "dateUpdate": "2019-10-03 23:24:36", "gotScore": 0, "gotScoreType": 0, "id": 124305, "kanjia": true, "kanjiaPrice": 49.00, "limitation": false, "logisticsId": 0, "miaosha": false, "minPrice": 198.00, "minScore": 0, "name": "api工厂1年vip会员", "numberFav": 0, "numberGoodReputation": 1, "numberOrders": 1, "numberSells": 1, "originalPrice": 198.00, "paixu": 0, "pic": "https://cdn.it120.cc/apifactory/2019/03/19/6828c1ced4a74e11b532c8cbd864245a.png", "pingtuan": false, "pingtuanPrice": 0.00, "recommendStatus": 1, "recommendStatusStr": "推荐", "shopId": 0, "status": 0, "statusStr": "上架", "stores": 9999998, "userId": 951, "vetStatus": 1, "views": 19104, "weight": 0.00 }],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
