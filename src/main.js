// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'

Vue.config.productionTip = false


import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';


import './style/base/_color.scss';
import './style/base/_mixin.scss';
import './style/base/_reset.scss';
import './style/base/_base.scss';

Vue.use(MuseUI);


import api from "@/api/index";

import ApiPath from "@/api/ApiPath"


Vue.prototype.$api = api
Vue.prototype.ApiPath = ApiPath//挂载到Vue实例上面


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
