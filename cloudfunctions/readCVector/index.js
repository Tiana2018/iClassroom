// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const MAX_LIMIT = 100 //每次取100条
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //从数据库中获取用户的向量
  var openid = wxContext.OPENID;
  const pDB = cloud.database().collection("users");
  var user;
  try {
    user = await pDB.where({
      openid: openid
    }).get()
  } catch (e) {
    console.log(e);
  }

  function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
    }
    return strMap;
  }

  const vector = objToStrMap({
   // pass
  });
  //获取用户喜好标签数据
  user = user.data[0].selfinform.styleListSelect;
  //转化为用户向量
  var pvector = new Array(24);
  for (var i = 0; i < 24; i++) {
    pvector[i] = 0;
  }
  for (var i = 0; i < user.length; i++) {
    var index = parseInt(vector.get(user[i]));
    pvector[index] = 1;
  }


  const DB=cloud.database().collection("item_profile");
  //突破获取小程序云数据库100条的限制
  const contResult = await DB.count() //获取总的条数，返回的是对象
  const total = contResult.total //返回数据的条数
  //计算一共要取多少次
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  var clotharr = []
  for (let i = 0; i < batchTimes; i++) {
    //skip：当前从第几条开始取,limit：取的条数
    let promise = await DB.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    //console.log(promise);
    clotharr.push(promise);
  }
  var cloths=[];
  for(var i=0;i<clotharr.length;i++){
    for(var j=0;j<clotharr[i].data.length;j++){
      cloths.push(clotharr[i].data[j]);
    }
  }

  const cvectors=new Map();
  for(var i=0;i<cloths.length;i++){
    var arr=new Array(24);
    var j=0;
    vector.forEach(function(value,key,map){
      var temp = key;
      arr[j++] = objToStrMap(cloths[i]).get(temp);
    })
    //console.log(cloths[i]._id);
    //console.log(arr)
    cvectors.set(cloths[i]._id,arr);
  }
  return {pvector,cvectors};
}