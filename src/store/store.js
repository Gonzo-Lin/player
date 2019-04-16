import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({
    // 1. state
    state:{
    	music_data: {}, // 音乐信息
    	play_mode: 0, 	// 播放模式
    	playing_status: false, // 播放状态
    	playing_current_time: 0, // 当前播放时间
    	music_total_time: 0,	// 当前音乐时长
    },

    // // 2. getters
    getters:{
        // 参数列表state指的是state数据
        _get_music_data(state){
            return state.music_data;
        },
        play_mode(state){
        	if(state.play_mode == 0){
	            state.play_mode = localStorage.getItem('play_mode');
	        }
	        return state.play_mode
        },
        playing_status(state){
        	// console.log(state.playing_status)
        	// console.log((localStorage.getItem('playing_status') === " false" ? false : true))
        	state.playing_status = (localStorage.getItem('playing_status') == "false" ? false : true);
	        return state.playing_status;
        },
        playing_current_time(state){
        	if(state.playing_current_time == 0){
        		state.playing_current_time = localStorage.getItem('playing_current_time');
        	}
	        return state.playing_current_time;
        },
        music_total_time(state){
	        return state.music_total_time;
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
        },
        
    },
    // 4. mutations
    mutations:{
        // state指的是state的数据
        // name传递过来的数据
        _set_music(state, data){
            state.music_data = data; //将传参设置给state的 music_data
        },
        _set_play_mode(state,data){
            state.play_mode++; //将传参设置给state的 play_mode

            if(state.play_mode > data){
				state.play_mode = 0;
			}
            localStorage.setItem("play_mode", state.play_mode);　
        },
        _set_playing_status(state,data){
            state.playing_status = data
            localStorage.setItem("playing_status", state.playing_status);　
        },
        _set_playing_current_time(state,time){
        	state.playing_current_time = time
            localStorage.setItem("playing_current_time", state.playing_current_time);　
        },
        _set_music_total_time(state,time){
        	state.music_total_time = time
        }

    }
});

export default store;