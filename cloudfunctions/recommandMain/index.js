// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: 'daban-matching-99xg7'})

const MAX_LIMIT = 100;//每次取100条
// 云函数入口函数
exports.main = async (event, context)=>{
  const wxContext = cloud.getWXContext();
  function Normalize(cvector){
    var max = cvector[0];
    var min = cvector[0];
    for (var i in cvector) {
      max = max >= cvector[i] ? max : cvector[i];
      min = min <= cvector[i] ? min : cvector[i];
    }
    // console.log("max" + max);
    // console.log("min" + min);
    var arr = new Array(cvector.length);
    for (var i = 0; i < cvector.length; i++) {
      arr[i] = (cvector[i] - min) / (max - min)
    }
    return arr;
  }
  function Cossimilarity(pvector, cvector) {
    var len = pvector.length;
    var sum = 0;//分子
    var pdistance = 0;//分母
    var cdistance = 0;
    for (var i = 0; i < len; i++) {
      pdistance = pdistance + pvector[i] * pvector[i];
      cdistance = cdistance + cvector[i] * cvector[i];
    }
    for (var i = 0; i < len; i++) {
      sum = sum + pvector[i] * cvector[i];
    }
    return sum / Math.sqrt(pdistance * cdistance);
  }
  //优先队列
  function PriorityQueue(){
    var items =new Array();

    this.enqueue = function (qe) {
      //若队列为空则直接将元素入列否则需要比较该元素与其他元素的优先级
      if (this.isEmpty()) {
        items.push(qe);
      } else {
        var added = false;
        //找出比要添加元素的优先级值更大的项目，就把新元素插入到它之前。
        for (var i = 0; i < items.length; i++) {
          //一旦找到priority值更大的元素就插入新元素并终止队列循环
          if (qe > items[i]) {
            items.splice(i, 0, qe);
            added = true;
            break;
          }
        }
        if (!added) {
          items.push(qe);
        }
      }
    }
    this.dequeue = function (n) {
      return items.splice(0, n);
    };
    this.isEmpty = function () {
      return items.length === 0;
    };
    this.print = function () {
      var str = '';
      for (var i = 0; i < items.length; i++) {
        str += items[i];
      }

      console.log(str.toString());
    }
  }
  function recommand(pvector, cvectors, n){
    //int[] pvetcor, Map<String,double[]> cvectors, int n(要推荐的服装数目)
    //var items=new Array();
    var queue = new PriorityQueue();
    var map = new Map();
    pvector = Normalize(pvector);
    cvectors.forEach(function (item, key) {
      item = Normalize(item);
      var cos = Cossimilarity(pvector, item);
      while (map.has(cos)) {
        cos = cos + 0.000000000001;
      }
      console.log(cos + " : " + key);
      map.set(cos.toString(), key);
      queue.enqueue(cos);
    })
    queue.print();
    var result = [];
    for (var i = 0; i < n; i++) {
      var key = queue.dequeue(1);
      var c = map.get(key.toString());
      result[i]=c;
    }
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        if (result[i] === result[j]) {
          result.splice(j, 1)
          j--;
        }
      }
    }
    return result;
  }


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
    //pass
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

  //数据库中获取服装数据
  const DB = cloud.database().collection("item_profile");
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
  var cloths = [];
  for (var i = 0; i < clotharr.length; i++) {
    for (var j = 0; j < clotharr[i].data.length; j++) {
      cloths.push(clotharr[i].data[j]);
    }
  }

  const cvectors = new Map();
  for (var i = 0; i < cloths.length; i++) {
    var arr = new Array(24);
    var j = 0;
    vector.forEach(function (value, key, map) {
      var temp = key;
      arr[j++] = objToStrMap(cloths[i]).get(temp);
    })
    //console.log(cloths[i]._id);
    //console.log(arr)
    cvectors.set(cloths[i]._id, arr);
  }
  var number=event.number;
  var result=recommand(pvector,cvectors,number);

  //resolve(result)
  return result;
}
