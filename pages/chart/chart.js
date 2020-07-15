var util=require('../../utils/util.js');
const db = wx.cloud.database()
const rooms = db.collection('classroom')

Page({
  data: {
    check: [{ val: 20, status: false }, { val: 50, status: false }, { val: 100, status: false }, { val: 200, status: false }],
    sumScore:0,
    flag: true,
    rooms:[],
    showModalStatus:false
  },
 
  /**
   * 弹出层函数
   */
  onLoad: function (options) {
    var sysinfo = wx.getSystemInfoSync();
    var width = sysinfo.windowWidth;
    this.setData({
      width: width
    })
  },

  onShow: function () {
    this.showList();
  },

  onPullDownRefresh:function(){
    this.showList();
    wx.stopPullDownRefresh()
  },

  showList: function () {
    var that = this
    rooms.get({
      success: function (res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        that.setData({
          rooms:res.data,
        })
        console.log(res.data[0])
        for (var index in that.data.rooms) {
          var date = 'rooms[' + index + '].date';
          var Y = that.data.rooms[index].dates.substring(0, 10);
          that.setData({
            [date]: Y
          })
        }
      }
    })
  },

  show: function () {
    this.setData({ flag: false })
  },
 
  hide: function () {
    this.setData({ flag: true })
  },

  creat:function(){
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

      this.showList();
    }.bind(this), 200)},

    formsubmit:function(e){
      let cName = e.detail.value.cName;//创建人姓名
      let rName = e.detail.value.rName;//自习室名称
      let phone = e.detail.value.phone;//手机号
      let num = e.detail.value.num;//最大容量
      let date = util.formatTime(new Date());
      rooms.add({
        data:({
          creater:cName,
          dates:date,
          max_num:num,
          name: rName,
          num:1,
          phone: phone,
          state:false,
          time:0,
          tasks:[]
        })
      }) 

      
    }, 

    cancle:function(e){
      var that=this
      var id=e.currentTarget.dataset.id
      var index = e.currentTarget.dataset.index
      var room=that.data.rooms
      room.splice(index,1)
      that.setData({
        rooms:room
      })
      rooms.doc(id).remove()
    },

    enter:function(e){
      var url = "../../pages/chart/detail/detail?id=" + e.currentTarget.dataset.id
      wx.navigateTo({
        url: url,
      })
    }

});

