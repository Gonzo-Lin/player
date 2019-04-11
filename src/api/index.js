// var root = '/api/v1'
// 引用axios

var qs = require('qs');
var axios = require('axios')
// var utils = require('../utils').default

import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import Loading from 'muse-ui-loading';


// 配置API接口地址
var root = '/v1';

axios.defaults.transformRequest = [data => qs.stringify(data)];
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
function iApiAxios (method, url, params, success, failure) {
  var loading = Loading();

  const Authorization = sessionStorage.getItem("Authorization");
  if (params) {
    params = filterNull(params)
  }
  axios({
    method: method,
    url: url,
    baseURL: root,
    // headers:{'Authorization':Authorization},
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
  })
  .then((res)=>{
    if(success) success(res);

    loading ? loading.close() : '';
  })
  .catch((err)=>{
    
    if(failure) failure(err);

    let res = err.response
    if (err) {
      console.log(err)
      // window.alert('api error, HTTP CODE: ' + ('code' in err ? res.code : res.status ));
    }

    loading ? loading.close() : '';

  })
  /*
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: false
  })
  .then(function (res) {
    console.log(res);
  })
  .catch(function (err) {
    let res = err.response
    if (err) {
      window.alert('api error, HTTP CODE: ' + res.status)
    }
  })*/
  
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return iApiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return iApiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return iApiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return iApiAxios('DELETE', url, params, success, failure)
  }
}
