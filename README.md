# players

> audio_player

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 遇到的问题

### Vuex 的使用

#### install vuex
	npm i vuex -s

#### main.js
	import store from './store/store.js'

#### ./store/store.js // src文件夹下
```
	import Vue from 'vue';
	import Vuex from 'vuex';

	Vue.use(Vuex);
	let store = new Vuex.Store({
	    // 1. state
	    state:{
	    	music_data: {}, // 音乐信息
	    },

	    // // 2. getters
	    getters:{
	        // 参数列表state指的是state数据
	        _get_music_data(state){
	            return state.music_data;
	        }
	    },
	    // 3. actions
	    // 通常跟api接口打交道
	    actions:{
	        // 设置音乐信息
	        // 参数列表：{commit, state}
	        // state指的是state数据
	        // commit调用mutations的方法 
	        // name就是调用此方法时要传的参数
	        _set_music_data({commit,state}, data){
	            // 跟后台打交道
	            // 调用mutaions里面的方法
	            commit("_set_music", data);
	        }
	    },
	    // 4. mutations
	    mutations:{
	        // state指的是state的数据
	        // name传递过来的数据
	        _set_music(state, data){
	            state.music_data = data; //将传参设置给state的music_data
	        }
	    }
	});

export default store;
```
