// pages/test/index.js

var app = getApp()
var leftHstart = 0, rightHstart = 0; //加载下页瀑布流数据时，前面数据的左右盒子高度
var newImgData = []; //处理瀑布流所需变量
var canLoadNextPage = false;

var scrollTopH; //获取顶部高度，用于设置浮动顶部的菜单（不同尺寸手机，高度不同）

var touchLRnum = 100; //列表区域左右滑动的距离（切换菜单的值）

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: ['首页','菜单1','菜单2','菜单3','菜单444','菜单555','菜单666','菜单777','菜单8','菜单9','菜单10'],
    navIndex: 0, //当前选择的菜单key(对应 navList[key] 菜单内容) 
    ifShowTopNav: false, //是否显示浮动的顶部菜单
    pageSize: 1, //页码
    ifHaveMore: true, //是否还有下一页
		moveLeft: 'left:0px;', //列表处左右滑动时位移值
		ifCanScroll: true, //列表处左右滑动时设为false，这样页面不会滚动影响页面体验



    //KV图相关配置
    indicatordots: true,
    indicatorcolor: '#989898',
    indicatoractivecolor: '#fc2549',
    autoplay: true,
    interval: 3000,
    duration: 500,
		//swiperImgArr: [], //KV图数据

    //列表
    //pubuliuNewArrData:[], //最新一次获取到的 瀑布流JSON数据 转成 的 数组
    //pubuliuResultsList:{
    //  listL: [],
    //  listR: [],
    //}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let This = this;

    This.getKVimg(); //获取  KV图  列表

    This.initFun(); //初始化 / 清空 页面数据
    This.getListData(); //获取页面列表数据
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取顶部高度，用于设置浮动顶部的菜单（不同尺寸手机，高度不同）
		//延迟执行是为了防止导航栏以上有些元素未加载成功会影响高度计算（最好是在导航栏以上元素请求加载成功后处执行以下代码）
		setTimeout(function(){
				let query = wx.createSelectorQuery();
				query.select('#top').boundingClientRect()
				query.exec(function (res) {
					scrollTopH = res[0].height;
				})
		},1500);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },




  //初始化 / 清空 页面数据
  initFun: function () {
    let This = this;
    leftHstart = 0, rightHstart = 0; //加载下页瀑布流数据时，前面数据的左右盒子高度
    newImgData = []; //处理瀑布流所需变量

    This.setData({
      //swiperImgArr: '',
      //navIndex: 0,

      pageSize: 1, //页码

      pubuliuNewArrData: '',
      pubuliuResultsList: '',

    });
  },




  //获取  KV图  列表
  getKVimg: function () {
    let This = this;
    This.setData({
      swiperImgArr: [
        { src: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640', linkUrl: '' },
        { src: 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640', linkUrl: '' },
        { src: 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640', linkUrl: '' },
      ],
    });
  },




  //设置顶部固定菜单定位
//  onPageScroll:function(e){ // 获取滚动条当前位置
//    console.log(e.scrollTop)
  scrollIn: function (e) {
    let This = this;
    if (e.detail.scrollTop >= scrollTopH) {
      if (!This.data.ifShowTopNav) {
        This.setData({
          ifShowTopNav: true
        });
      }
    } else {
      if (This.data.ifShowTopNav) {
        This.setData({
          ifShowTopNav: false
        });
      }
    }
  },



  //左右滑动 切换菜单
  touchStart: function (e) {
    if (e.touches.length == 1) {
      let This = this;

      This.setData({
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
      });
    }
  },
  touchMove: function (e) {
    if (e.touches.length == 1) {
      let This = this;

      let moveX = e.touches[0].clientX;
      let diffX = This.data.startX - moveX;

      let moveY = e.touches[0].clientY;
      let diffY = This.data.startY - moveY;

      let moveLeft = 'left:0px;';

      if (Math.abs(diffY) < Math.abs(diffX)) {
        if (diffX < 0 && This.data.navIndex > 0) { //向右
          //moveLeft = 'left:' + -(diffX < touchLRnum ? -touchLRnum : diffX) + 'px;';
					moveLeft = 'left:' + -diffX + 'px;';
        } else if (diffX > 0 && This.data.navIndex < This.data.navList.length - 1) { //向左
          //moveLeft = 'left:-' + (diffX > touchLRnum ? touchLRnum : diffX) + 'px;';
					moveLeft = 'left:-' + diffX + 'px;';
        }
				
				This.setData({
					ifCanScroll: false, //列表处左右滑动时设为false，这样页面不会滚动影响页面体验
				});
      }else{
				This.setData({
					ifCanScroll: true, //列表处左右滑动时设为false，这样页面不会滚动影响页面体验
				});
			}

      This.setData({
        moveLeft: moveLeft
      });
    }
  },
  touchEnd: function (e) {
    if (e.changedTouches.length == 1) {
      let This = this;

      let endX = e.changedTouches[0].clientX;
      let diffX = This.data.startX - endX;

      let endY = e.changedTouches[0].clientY;
      let diffY = This.data.startY - endY;

      let moveLeft = 'left:0px;';

      if (Math.abs(diffY) < Math.abs(diffX)) {
        if (diffX < 0 && diffX < -touchLRnum && This.data.navIndex > 0) { //向右
          let moveEndNavIndex = This.data.navIndex - 1;
          This.setData({
            navIndex: moveEndNavIndex
          });

          This.initFun(); //初始化 / 清空 页面数据
          This.getListData(); //获取页面列表数据

        } else if (diffX > 0 && diffX > touchLRnum && This.data.navIndex < This.data.navList.length - 1) { //向左
          let moveEndNavIndex = This.data.navIndex + 1;
          This.setData({
            navIndex: moveEndNavIndex
          });

          This.initFun(); //初始化 / 清空 页面数据
          This.getListData(); //获取页面列表数据

        }
      }


      This.setData({
        moveLeft: moveLeft,
				ifCanScroll: true, //列表处左右滑动时设为false，这样页面不会滚动影响页面体验
      });
    }
  },




  //选择 切换菜单
  changeTitle: function (e) {
    let chooseNav = e.currentTarget.dataset.type;
    let This = this;
    if (chooseNav != This.data.navIndex){
      This.setData({
        navIndex: chooseNav,
      });

      This.initFun(); //初始化 / 清空 页面数据
      This.getListData(); //获取页面列表数据
    }
  },




  /**
   * 页面上拉触底事件的处理函数
   */
//  onReachBottom: function () {
  scrollEnd: function () { //滚动到底部加载更多
    let This = this;
    if (This.data.ifHaveMore) {
      //console.log('加载一下页');
      if (!canLoadNextPage) {
        return;
      }
      newImgData = [];
      This.setData({
        pubuliuNewArrData: '',
        pageSize: This.data.pageSize + 1
      });

      This.getListData(); //获取页面列表数据
    }
  },




  //获取页面列表数据
  getListData: function () {
    let This = this;

    wx.showLoading({
      title: '加载中',
			mask:true
    })

    //查询数据 所需参数
    let dataJson = {
      type: This.data.navIndex,
      page: This.data.pageSize, //页码
    }


    /*test*/
    let res = {
      status: 1,
      ifHaveMore: This.data.pageSize > 2 ? false : true, //是否还有下一页
      list: {
        0: {
          id: '001',
          title: This.data.navList[This.data.navIndex] + ' - ' + This.data.pageSize + '页 - 1111111',
          userhead: 'https://iconfont.alicdn.com/t/1550898018467.jpeg@100h_100w.jpg',
          nickname: '昵称昵称昵称111',
          zannum: 88,
          ifzan: true,
          src: "https://img.t.sinajs.cn/t5/skin/public/profile_cover/001_s.jpg?version=b97b8caee54a6c78",
          linkUrl: '/pages/detail/detail'
        },
        1: {
          id: '002',
          title: This.data.pageSize + '页222222222222',
          userhead: 'https://avatar.csdn.net/D/5/3/3_qq_16494241.jpg',
          nickname: '昵称昵称昵称222',
          zannum: 88,
          ifzan: false,
          src: "https://img2018.cnblogs.com/news/24442/201902/24442-20190214124232223-959977867.jpg",
          linkUrl: '/pages/detail/detail'
        },
        2: {
          id: '003',
          title: This.data.pageSize + '页33333333333333',
          userhead: 'https://avatar.csdn.net/D/5/3/3_qq_16494241.jpg',
          nickname: '昵称昵称昵称333',
          zannum: 88,
          ifzan: false,
          src: "https://s3.ifanr.com/wp-content/uploads/2018/08/211.jpg!720",
          linkUrl: '/pages/detail/detail'
        },
        3: {
          id: '004',
          title: This.data.pageSize + '页44444444444444',
          userhead: 'https://iconfont.alicdn.com/t/1550898018467.jpeg@100h_100w.jpg',
          nickname: '昵称昵称昵称444',
          zannum: 88,
          ifzan: true,
          src: "https://t1.hddhhn.com/uploads/tu/201512/14/87.jpg",
          linkUrl: '/pages/detail/detail'
        },
      }
    }

    if (res.status == 1) {
      This.setData({
        ifHaveMore: res.ifHaveMore, //是否还有下一页
        pubuliuNewArrData: app.setCurNewPubuImgData(res.list) //处理设置最新获取到的瀑布流数据
      });
    }

    setTimeout(function () {
      wx.hideLoading();
    }, 500)
    /*test*/

    return;

    //请求获取数据
    wx.request({
      url: '获取列表数据', //仅为示例，并非真实的接口地址
      data: dataJson,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        wx.hideLoading();
      }
    })
  },




  /*
  瀑布流相关处理:
  1、处理最新加载的瀑布流数据中图片，先显示，再根据 bindload 获取 并 存储 与 原来KEY 相对应的 等宽情况下的高度 数组
     => newImgData[key].h （key 与最新加载的JSON数据的 key 相同）
  2、根据所有图片加载完成后，调用app.js中方法，设置左、右两边数据
  */
  pubuImgLoad: function (e) {
    let This = this;
    let inListIndex = e.currentTarget.dataset.key;
    //console.log(e.detail.width);
    //console.log(inListIndex);
    newImgData[inListIndex] = {};
    newImgData[inListIndex].h = (300 / e.detail.width) * e.detail.height;
    if (newImgData.length == This.data.pubuliuNewArrData.length) {
      //防止最后一个数据中的图片先加载完成，这样lenth也相等
      for (let i = 0; i < newImgData.length; i++) {
        if (!newImgData[i]) {
          return;
        }
      }
      //newImgData 获取的最新数据 - newImgData[key].h （key 与最新加载的JSON数据的 key 相同）
      //This.data.pubuliuNewArrData 获取的最新数据（处理过的数组） - This.data.pubuliuNewArrData[key]. （key 与最新加载的JSON数据的 key 相同）
      //leftHstart 本次数据加载 前 的 左 边高度
      //rightHstart 本次数据加载 前 的 右 边高度
      app.setCurResultsPubuImgData(newImgData, This.data.pubuliuNewArrData, leftHstart, rightHstart, function (pubuliuResultsList, leftH, rightH) {
        //console.log(pubuliuResultsList);
        leftHstart = leftH;
        rightHstart = rightH;

        if (This.data.pubuliuResultsList) {
          pubuliuResultsList.listL = This.data.pubuliuResultsList.listL.concat(pubuliuResultsList.listL);
          pubuliuResultsList.listR = This.data.pubuliuResultsList.listR.concat(pubuliuResultsList.listR);
        }

        This.setData({
          pubuliuResultsList: pubuliuResultsList
        });
        setTimeout(function () {
          canLoadNextPage = true;
        }, 500);
      })
    }
  },




  // 点赞、取消赞
  dianzan: function (e) {
    // console.log(e.currentTarget.dataset.id); //对应数据库ID   用来更新数据库中对应 赞 的
    // console.log(e.currentTarget.dataset.ifzan); //当前用户是否赞过
    // console.log(e.currentTarget.dataset.side); //listL（左边数据） | listR（右边数据）
    // console.log(e.currentTarget.dataset.index); //对应当前页面key（左、右边）   用来更新页面上显示样式的

    let This = this;

    wx.showLoading({
      title: '点赞中',
			mask:true
    })

    //查询数据 所需参数
    let dataJson = {
      id: e.currentTarget.dataset.id, //对应数据库ID   用来更新数据库中对应 赞 的
      ifzan: e.currentTarget.dataset.ifzan, //当前用户是否赞过
    }


    /*test*/
    let res = {
      status: 1,
			zannum:This.data.pubuliuResultsList[e.currentTarget.dataset.side][e.currentTarget.dataset.index].zannum == 88 ? 999 : 88 , //点赞、取消赞后 的 赞数量
      ifzan: !dataJson.ifzan,
      info: '是否成功提示文本'
    }

    if (res.status == 1) {
      let tempData = This.data.pubuliuResultsList;
      tempData[e.currentTarget.dataset.side][e.currentTarget.dataset.index].ifzan = res.ifzan;
			tempData[e.currentTarget.dataset.side][e.currentTarget.dataset.index].zannum = res.zannum;
      This.setData({
        pubuliuResultsList: tempData
      });
    } else {
    }
		setTimeout(function(){
			wx.showToast({
				title: res.info,
				icon: 'success',
				duration: 800
			})
			//wx.hideLoading();
		},500)
		
    /*test*/

    return;

    //请求获取数据
    wx.request({
      url: '获取列表数据', //仅为示例，并非真实的接口地址
      data: dataJson,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
				
      }
    })
  },

})