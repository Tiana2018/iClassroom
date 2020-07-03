
Page({

  data:{
    items1: [
      {name: 'A', value: '项目启动阶段'},
      {name: 'B', value: '项目规划阶段'},
      {name: 'C', value: '项目执行阶段'},
      {name: 'D', value: '项目总结阶段'},
    ],
    items2: [
      {name: 'A', value: '开发计划'},
      {name: 'B', value: '组织实施'},
      {name: 'C', value: '项目控制'},
      {name: 'D', value: '系统支持'},
    ]
  },
  
  onLoad:function(){
    this.setTime();
    
  },
  onReady() {
 
  },
  
  submit:function(){
    
    wx. navigateTo({
      url: '/pages/result/result'
     })
    
  },
  

  setTime: function () {
    　　let that = this
    　　let ctx = wx.createCameraContext()
    　　time = setInterval(function () {
    　　if (Math.round(Math.random()) == 1) {

    //拍照
    ctx.takePhoto({
    quality: 'high',
    　success: (res) => {
    console.log(res.tempImagePath)
    that.setData({
    src: res.tempImagePath
    })
    　　　　　　　　　　that.localhostimgesupdata(res.tempImagePath)
    　　　　　　　　}
    　　　　　　})
    　　　　}
    　　}, 1000 * 30) //循环间隔 单位ms
    },
    


  error(e) {
    console.log(e.detail)
  },

  saveImg: function (path) {
    var that = this;
    console.log('test0');
    var tracker = new tracking.ObjectTracker('face');
    tracker.setStepSize(1.7);
    console.log('test');
    tracking.track(path, tracker);
    console.log('test1'); 
    detection(path);
    var count=0;
    tracker.on('track', function(event) {
      count=count+1;
    });
    wx.getImageInfo({ //将获取图片的信息
      src: path,// 需要下载的图片
      
      success(res){
        var filePath = res.path //得到本地的路径
        wx.saveImageToPhotosAlbum({
          filePath: "http://tmp/wx051f914976ef6c22.1.jpg",
          success(res) {
            console.log('filepath:',filePath)
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            })
          }
        })
      }
    })
  },

  

  detection(img){

    var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
    tracker.setStepSize(1.7);

    tracking.track(img, tracker);

    tracker.on('track', function(event) {
      event.data.forEach(function(rect) {
        window.plot(rect.x, rect.y, rect.width, rect.height);
      });
    });
  }
  

 
})