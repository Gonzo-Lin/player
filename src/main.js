// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'

Vue.config.productionTip = false


import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'typeface-roboto';

import './style/base/_color.scss';
import './style/base/_mixin.scss';
import './style/base/_reset.scss';
import './style/base/_base.scss';

Vue.use(MuseUI);


import api from "@/api/index";

import ApiPath from "@/api/ApiPath"

import _GLOBAL from "@/config"


Vue.prototype.$api = api
Vue.prototype.ApiPath = ApiPath//挂载到Vue实例上面
Vue.prototype._GLOBAL = _GLOBAL//挂载到Vue实例上面


// 格式化歌曲时间
Vue.filter('_format_song_time',(value)=>{
	if (!value) return '0:00';
	var _minues = parseInt(value / 60),
	_second = parseInt(value % 60 );
	return `${_minues}:${_second < 10 ? '0'+_second : _second}`
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
