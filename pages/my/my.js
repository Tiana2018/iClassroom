const app = getApp();

Page({
  data: {
    itemList: [
      { id: "feedback", name: "意见反馈", page: "../feedback/feedback" },
      { id: "courses", name: "教育商城", page: "../index/index" },
      { id: "teacher", name: "管理课程", page: "../teadetail/teadetail" }
    ]
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
