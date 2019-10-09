//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },




  //处理下页列表数据，追加至列表数据存储变量中
  addList(oldData, newData) {
    for (var item in newData) {
      oldData.push(newData[item]);
    }
    return oldData;
  },

  //处理设置最新获取到的瀑布流数据
  setCurNewPubuImgData: function (oldImgDataJson) {
    let oldImgData = [];
    for (var item in oldImgDataJson) {
      oldImgData[item] = oldImgDataJson[item];
    }
    return oldImgData;
  },
  //处理存储瀑布流左右两边数据
  setCurResultsPubuImgData(newImgData, oldData, leftH, rightH, callback) {
    //let leftH = 0;
    //let rightH = 0;

    let resultsList = {
      listL: [],
      listR: [],
    }

    let leftStart = 0;
    let rightStart = 0;

    for (var item in newImgData) {
      //console.log(leftH, rightH, newImgData[item].h);
      //console.log(leftH <= rightH);
      if (leftH <= rightH) {
        resultsList.listL[leftStart] = oldData[item];
        leftStart++;
        leftH += newImgData[item].h;
      } else {
        resultsList.listR[rightStart] = oldData[item];
        rightStart++;
        rightH += newImgData[item].h;
      }
    }
    callback(resultsList, leftH, rightH);
  }




})