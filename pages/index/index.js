// 初始化云端数据库
const db = wx.cloud.database();
const products = db.collection("product");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    active:0,
    score:0,
    product:[
      {
        _id:'01',
        dec: '提高英语成绩，备战四六级考试',
        detail: '提高英语成绩备战四级考试',
        location: '6月28日开课！',
        name: '【2020】四六级提分训练营！名师讲解',
        price: '399',
        rate: '最受欢迎课程第一名',
        src: '/images/banner/b1.png',
        time: '48课时',
      },
      {
        _id: '01',
        dec: '学好数理化，走遍天下都不怕',
        detail: '提高英语成绩备战四级考试',
        location: '6月28日开课！',
        name: '化学基础课',
        price: '99',
        rate: '最受欢迎课程第一名',
        src: '/images/banner/0.jfif',
        time: '48课时',
      },
      {
        _id: '01',
        dec: '决胜六级，提高英语成绩',
        detail: '提高英语成绩备战四级考试',
        location: '6月28日开课！',
        name: '六级训练营',
        price: '199',
        rate: '最受欢迎课程第一名',
        src: '/images/banner/b3.png',
        time: '48课时',
      },
      {
        _id: '01',
        dec: '掌握新技术，引领新潮流',
        detail: '提高英语成绩备战四级考试',
        location: '6月28日开课！',
        name: 'IT编程基础',
        price: '399',
        rate: '最受欢迎课程第一名',
        src: '/images/banner/b2.png',
        time: '48课时',
      },

    ],
    banners:[
      "/images/banner/q.png",
      "/images/banner/p.png",
      "/images/banner/22.png"
    ],
    color:'',
  },
  setail:function(){
    wx.redirectTo({
      url:"../detail/detail"
    })
},
  backmy:function(){
    wx.navigateBack();   //返回上一个页面
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      score:getApp().globalData.sorce
    })
    
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      active: 0
    })
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