// var root = '/api/v1'
// 引用axios

var qs = require('qs');
var axios = require('axios')
// var utils = require('../utils').default

import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import 'muse-ui-message/dist/muse-ui-message.css';
import Loading from 'muse-ui-loading';
import Message from 'muse-ui-message';


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
    let res = err.response;
    failure ? failure(res) : Message.alert(res.data.message);
    // if(failure) failure(res);
    // if (!failure) {
    //   // Message.alert('api error, HTTP CODE: ' + ('code' in err ? res.code : res.status ))
    //   Message.alert(res.data.message );
    //   // window.alert('api error, HTTP CODE: ' + ('code' in err ? res.code : res.status ));
    // }

    loading ? loading.close() : '';

  })
}

// 请求的拦截器
axios.interceptors.request.use(function (config) {
     // 判断请求的类型
     // 如果是post请求就把默认参数拼到data里面
     // 如果是get请求就拼到params里面
     config.params = {
      ...config.params,
      // proxy: 'http://127.0.0.1:54599',
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  }
  )


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
