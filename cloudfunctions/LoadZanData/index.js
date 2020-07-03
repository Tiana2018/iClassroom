// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => new Promise((resolve,reject)=>{
  const wxContext = cloud.getWXContext()
  var id=event.id;
  var hasDZ;
  var openid = wxContext.OPENID;
  db.collection("user_zan").where({
    openID: openid
  }).field({
    zanArr: true
  }).get().then((res)=>{
        if (res.data.length == 0) {
          hasDZ=false;
          resolve(hasDZ);
        } else {
          var zanArr = res.data[0].zanArr;
          var index = zanArr.indexOf(id);
          if (index == -1) {
            hasDZ = false;
            resolve(hasDZ);
          }
          else {
            hasDZ = true;
            resolve(hasDZ);
          }
        }
  })
})