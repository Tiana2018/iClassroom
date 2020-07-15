const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [
      "/images/banner/22.png"
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  buy:function(){
    wx.showModal({

      title: '提示',

      content: '是否确认购买？',

      success: function (res) {

        if (res.confirm) {//这里是点击了确定以后
          if(getApp().globalData.sorce-399<=0){
            wx.showToast({

              title: '无法购买',
        
              icon: 'fail',
        
              duration: 2000//持续的时间
        
            })
          }else{
            getApp().globalData.sorce=getApp().globalData.sorce-399
            var temp = getApp().globalData.sorce
            console.log(getApp().globalData.sorce)
            db.collection('user').doc('38d78ca75eddd5860068c28b2fb4373b').update({
              data:{
                score:temp
              }
            }).then(res=>{
              console.log(getApp().globalData.sorce)
              console.log(res);
            }).catch(res=>{
              console.log("fail")
              console.log(res);
            })
            wx.redirectTo({
              url: '../index/index'
            })
          }
          
        } else {//这里是点击了取消以后

          console.log('用户点击取消')

        }

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