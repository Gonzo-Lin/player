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

#### 播放模式刷新后重置
play_mode：播放模式 [0,1,2]; // 0: 随机播放, 1: 单曲循环, 2: 列表循环

使用 VueX 保存播放模式后刷新依旧为原始值，

修改播放模式时，将值 play_mode 保存在 localStorage 中，并修改值 play_mode；

VueX 中 getters 时 如果play_mode 为 0， 则从 localStorage 中取值，确保不是原始值 0；

同理，音乐播放状态也可以这么操作
```
> store.js
	
	state:{
		// ...
		play_mode: 0,
	},
	getters:{
		// ...
		play_mode(state){
        	if(state.play_mode == 0){
	            state.play_mode = localStorage.getItem('play_mode');
	        }
	        return state.play_mode
        }
    },
    mutations:{
		// ...
		_set_play_mode(state,data){
			// data 为总共有多少种播放模式
            state.play_mode++; //将传参设置给state的 play_mode
            if(state.play_mode > data){
				state.play_mode = 0;
			}
            localStorage.setItem("play_mode", state.play_mode);　
        }
    }

> ***.vue

	import {mapGetters} from 'vuex';

	computed:{
		...mapGetters([
		 	//此处的 play_mode 与以下 store.js 文件中 getters 内的 play_mode 相对应
		 	'play_mode'
		])
	},
	methods:{
		_set_play_mode(){
			var _length = this._GLOBAL.config.play_mode.length-1;
			this.$store.commit('_set_play_mode',_length);
		},
	}

```