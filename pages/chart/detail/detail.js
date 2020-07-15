const db = wx.cloud.database()
const rooms = db.collection('classroom')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check: [{ val: 20, status: false }, { val: 50, status: false }, { val: 100, status: false }, { val: 200, status: false }],
    scores: [{ val: 2, status: false }, { val: 5, status: false }, { val: 10, status: false}],
    detail:{},
    tasks:[],
    checkList:[],
    showModalStatus: false,
    showCreatTask:false,
    sumScore:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    rooms.doc(options.id).get().then(res=>{
      that.setData({
        detail:res.data,
        tasks:res.data.tasks
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

  onUnload:function(){
    this.setData({
      showCreatTask: true
    })
  },

  show:function(){
    this.setData({
      showModalStatus: true
    })
  },

  add:function(){
    this.setData({
      showCreatTask: true
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
            showModalStatus: false,
            showCreatTask: false
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

  creatTask:function(e){
    let tName = e.detail.value.tName;
    let score = e.detail.value.score;
    console.log(tName + score)
    let newTask={"done":false,"score":score,"task_name":tName}
    let tasks=this.data.tasks.concat(newTask)
    rooms.doc(this.data.detail._id).update({
      data: {
        tasks: tasks     
      }
    })

    this.setData({
      tasks:tasks
    })
    console.log(this.data.tasks)
  },

  changeScore:function(e){
    this.setData({
      checkList:e.detail.value
    })
  },

 

  hidmodal:function(){
    var that=this;
    var checkList=this.data.checkList;
    console.log(checkList)
    var sumScore=0;
    for(let it=0;it<checkList.length;it++){
      if(checkList[it]!=""){
        sumScore += parseInt(this.data.tasks[checkList[it]].score);
      }
    }
    wx.showModal({
      title: '提示',
      content: '获得积分'+sumScore+',是否退出',
      success(res) {
        getApp().globalData.sorceSum=sumScore
        if (res.confirm) {
          rooms.doc(that.data.detail._id).remove();

          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];   //当前页面
          var prevPage = pages[pages.length - 2];  //上一个页面
          // 直接调用上一个页面的setData()方法，把数据存到上一个页面中去
          prevPage.setData({
            sumScore: sumScore
          })

          prevPage.showList();
          prevPage.onLoad();
          
          wx.navigateBack({
            delta: 1
          })
        } 
      }
    })
  },

  
})