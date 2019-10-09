var jsonData = require('../../data/mock/posts.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingMoreHidden: true,
    posts: [],
    index:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(jsonData)
   this.setData({
     posts:jsonData.data
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
    let newData ={}
    let index = this.data.index
    let datas = this.data.posts
    if (index > 3) {
      newData['loadingMoreHidden']=false
    }else{
      datas.push(...jsonData.data)
      index++
    }
    newData['posts']=datas
    newData['index']=index
    this.setData(newData)
  },

  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 2
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})