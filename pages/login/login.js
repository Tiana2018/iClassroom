const db = wx.cloud.database();
var app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMsg:false,
    nullMsg: false,

  },
  login:function(event){
    let username = event.detail.value.user
    let pwd = event.detail.value.password
    let model = username;
    if (username.length == 0 || pwd.length == 0){
      this.setData({
        nullMsg: true})
      return
    }
    console.log(username,pwd)
    db.collection('user').where({
      name: username,
      pwd: pwd
    }).get().then(res=>{
      console.log(res.data)
      if(res.data[0]==null){
        this.setData({
        showMsg:true
      })
        return
      }else{
        this.setData({
        showMsg: false
        })
        this.setData({
          model: username
        })
        
        wx.switchTab({
          url: 'my/my?model=' + model,
          });
        console.log(
          model
        )
      }
    })
  },

  chuce:function(){
    wx.navigateTo({
      url:'../fillInfo/fillInfo'
    })
  },
  getuser(event){
    if (event.detail.value.length >0) {
      this.setData({
        nullMsg: false
      })
      return
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.cloud.callFunction({
    //   name:'addUser',
    //   data:{
    //     name:'1',
    //     pwd:'12345'
    //   }
    // }).then(res=>{
    //   console.log(res)
    // })
    db.collection('user').get({
      success(res){
        console.log(res.data)
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})