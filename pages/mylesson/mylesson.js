// pages/mylesson/mylesson.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    active: 0,
    logs:["a","b","c"],
    product: [
      {
        _id: '01',
        dec: '提高英语成绩，备战四六级考试',
        detail: '提高英语成绩备战四级考试',
        location: '6月28日开课！',
        name: '人工智能与信息社会',
        price: '199',
        rate: '最受欢迎课程第一名',
        src: '/images/banner/1.jpg',
        time: '48课时',
      },
      {
        _id: '01',
        dec: '学好数理化，走遍天下都不怕',
        detail: '提高英语成绩备战四级考试',
        location: '大连理工大学金课建设平台',
        name: '人文智能',
        price: '99',
        rate: '最受欢迎课程第一名',
        src: '/images/banner/2.jpg',
        time: '48课时',
      },
      {
        _id: '01',
        dec: '决胜六级，提高英语成绩',
        detail: '提高英语成绩备战四级考试',
        location: '2020年06月16日-2020年07月',
        name: '学术论文写作',
        price: '199',
        rate: '最受欢迎课程第一名',
        src: '/images/banner/3.jpg',
        time: '软件周四5-6节',
      },
      {
        _id: '01',
        dec: '掌握新技术，引领新潮流',
        detail: '提高英语成绩备战四级考试',
        location: '2020年06月16日-2020年07月10日',
        name: '软件项目管理',
        price: '399',
        rate: '最受欢迎课程第一名',
        src: '/images/banner/4.jpg',
        time: '48课时',
      },

    ],
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