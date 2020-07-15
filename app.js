//app.js
App({
  systemInfo: null,
  dbTodos: null,
  dbFeedback: null,
  onLaunch(options) {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    const self = this;

    //初始化云函数
    wx.cloud.init({
      env: 'iclassroom-577a4',
      // env: 'todolist-test-80be87',
      traceUser: 'true'
    });

    wx.getSystemInfo({
      success(res) {
        self.systemInfo = res;
      }
    });
    //初始化DB
    let db = wx.cloud.database({
      env: 'iclassroom-577a4'
      // env: 'todolist-test-80be87'
    });
    //获取todos
    self.dbTodos = db.collection('todos');
    //获取feedback
    self.dbFeedback = db.collection('feedback');

  },
  onShow(options) {
    console.log("onShow");
  },
  onHide() {
    console.log("onHide");
  },
  onError(error) {
    console.log("onError");
  },
  onPageNotFound(options) {
    console.log("onPageNotFound");
  },
  globalData: {
    userInfo: null,
    openid: null,
    id: null,
    needRefresh: false,
    _openid:"",
    sorceSum:0,
    sorce:0
  }
});