// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'

Vue.config.productionTip = false


import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui-message/dist/muse-ui-message.css';
import 'typeface-roboto';
import Message from 'muse-ui-message';


import VueLazyLoad from 'vue-lazyload'



import './style/base/_color.scss';
import './style/base/_mixin.scss';
import './style/base/_reset.scss';
import './style/base/_base.scss';


import api from "@/api/index";
import ApiPath from "@/api/ApiPath"

// 引用配置
import _GLOBAL from "@/config"

// 引用工具
import filters from './utils/filters.js';
import base from './utils/base.js';


//挂载到Vue实例上面
Vue.prototype.$api = api
Vue.prototype.ApiPath = ApiPath
Vue.prototype._GLOBAL = _GLOBAL


Vue.use(base);
Vue.use(MuseUI);
Vue.use(filters);
Vue.use(Message);
Vue.use(VueLazyLoad)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
