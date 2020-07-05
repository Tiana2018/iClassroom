const db = wx.cloud.database()
const rooms = db.collection('classroom')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check: [{ val: 20, status: false }, { val: 50, status: false }, { val: 100, status: false }, { val: 200, status: false }],
      detail:{},
      showModalStatus: false,
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    rooms.doc(options.id).get().then(res=>{
      that.setData({
        detail:res.data
      })
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

  show:function(){
    this.setData({
      showModalStatus: true
    })
  },

  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)
  },

  formsubmit: function (e) {
    let cName = e.detail.value.cName;//创建人姓名
    let rName = e.detail.value.rName;//自习室名称
    let phone = e.detail.value.phone;//手机号
    let num = e.detail.value.num;//最大容量
    let id = this.data.detail._id
    rooms.doc(this.data.detail._id).update({
      data: ({
        creater: cName,
        name: rName,
        phone: phone
      })
    })
    this.setData({
      ['detail.creater']:cName,
      ['detail.name']: rName,
      ['detail.phone']: phone
    })
  },

  cancle:function(){
    var id = this.data.detail._id
    rooms.doc(id).remove()
    
    wx.navigateBack({
      delta:1
    })
  
  }
})