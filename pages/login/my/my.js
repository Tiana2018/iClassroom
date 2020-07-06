const app = getApp();
const db = wx.cloud.database();
Page({
  data: {
    itemList: [
      { id: "feedback", name: "意见反馈", page: "../../feedback/feedback" },
      { id: "courses", name: "教育商城", page: "../../index/index" },
      { id: "teacher", name: "管理课程", page: "../../teadetail/teadetail" },
      { id: "mylesson", name: "我的课程", page: "../../mylesson/mylesson" },
      { id: "login", name: "退出登录", page: ".././login/login" }
    ],
    model:"NULL",
    num:"NULL",
    school:"NULL",
    age:"NULL"
  },
  onLoad: function (options) {
    var that = this
    var model = options.model;
    console.log(options)
    that.setData({
      model: model
    })

    db.collection('user').where({
      name: model,
    }).get().then(res => {
      console.log(res.data)
      if (res.data[0] == null) {
       
        return
      } else {
        that.setData({
          people: res.data[0]
        })
      }
    })
  },
  userInfoHandler(data) {
    wx.BaaS.handleUserInfo(data).then(
      res => {
        console.log(res);
      },
      res => {
        console.log(res);
      }
    );
  }
});
