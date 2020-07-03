// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => new Promise((resolve, reject) => {
  const wxContext = cloud.getWXContext()
  var id = event.id;
  var hasSC;
  var openid = wxContext.OPENID;
  db.collection("user_col").where({
    openID: openid
  }).field({
    colArr: true
  }).get()
  .then((res)=>{
    if (res.data.length == 0) {
      hasSC = false;
      resolve(hasSC);
    } else {
      var colArr = res.data[0].colArr;
      var i = 0;
      for (i = 0; i < colArr.length; i++) {
        if (colArr[i].clothID == id) {
          hasSC = true;
          resolve(hasSC);
          break;
        }
      }
      if (i == colArr.length) {
        hasSC = false;
        resolve(hasSC);
      }
    }
  })
})