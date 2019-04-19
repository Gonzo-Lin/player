<template>
	<div class="player_wrap">

        <audio :src="mp3" controls="" ref="myAudio" class="my_audio" id="my_audio" />

		<full :MUSIC_LIST_SHOW_FLAG="MUSIC_LIST_SHOW_FLAG" :lyric="lyric" v-show="_disabled"
			@_play = "_play" 
			@_paused = "_paused"
			@_music_list_flag = "_music_list_flag"
			@_progress_change = "_progress_change"  >
		</full>



		<mini :MUSIC_LIST_SHOW_FLAG="MUSIC_LIST_SHOW_FLAG" :disabled="_disabled" :lyric="lyric"
			@_play = "_play" 
			@_paused = "_paused" 
			@_music_list_flag = "_music_list_flag"
			@_progress_change = "_progress_change" />

		
		<!-- 播放列表 -->
		<div class="mask z-9" v-show="MUSIC_LIST_SHOW_FLAG" @click="MUSIC_LIST_SHOW_FLAG = !MUSIC_LIST_SHOW_FLAG"></div>
		<music-list :MUSIC_LIST_SHOW_FLAG="MUSIC_LIST_SHOW_FLAG" 
			@hide_music_list="MUSIC_LIST_SHOW_FLAG = !MUSIC_LIST_SHOW_FLAG">
		</music-list>

	</div>
</template>

<script>
	import MusicList from '@/components/Player/MusicList.vue';
	import Mini from '@/components/Player/Mini.vue';
	import Full from '@/components/Player/Full.vue';


	import axios from 'axios';
	
	import {mapGetters} from 'vuex';


	const PLAYER_STATUS = !!0;
	var CURRENT_TIME = 0;
	var my_audio,my_audio_timer,_progress_change_fun = null;

	export default{
		name: "my_player",
		data(){
			return {
				value: 123,
				// song_time: 0,
				is_play: !!0,
				// url: '',
				MUSIC_LIST_SHOW_FLAG: false,
				mp3: '',
				lyric: '',

			}
		},
		created(){
		},
		mounted(){
			my_audio = document.getElementById("my_audio");
			this._get_music_url();
			this.$nextTick(()=>{
				var _playing_status = this.$store.getters.playing_status;
				if( this.$store.getters.playing_current_time != null || this.$store.getters.playing_current_time != 0 ){
					this._progress_change(Number(this.$store.getters.playing_current_time));
					this.$store.commit('_set_playing_status',_playing_status);
				}

				// if(this.$store.getters.playing_status){
				// 	this.$nextTick(()=>{
				// 		// console.log(this.$store.getters.playing_current_time)
				// 		this._play();
				// 	})
				// }
			})
		},
		computed:{
			...mapGetters([
			 	//此处的 play_mode 与以下 store.js 文件中 getters 内的 play_mode 相对应
			 	'playing_status','playing_current_time','music_total_time','_play_list','current_music_play'
			]),
			_disabled(){
				return this._play_list.length != 0 ? false : true;
			}
			// _music_id(){
			// 	this._get_music_url();
			// 	return this.current_music_play.id;
			// }
		},
		watch:{
			'current_music_play':{
				handler(val,old){
					if(val.id != old.id){
						this._get_music_url();
					}
				},deep: true
			}
		},
		methods:{
			_init_scroll(){
				this.my_scroll = new BScroll(this.$refs.music_list_wrap_scroll,{
					click: true,
				})
			},
			_get_music_url(){
				// this.$store.commit('_set_music' ,{url: mp3});
				// this.url = mp3;
				this.$api.get(this.ApiPath.song.url,{
					id: this.current_music_play.id
				},success=>{
					this.mp3 = success.data.data[0].url;
					this.$nextTick(()=>{
						if( !my_audio.src ){
							this.$store.commit('_set_music_total_time' ,100);
							this.$store.commit('_set_playing_current_time' ,0);
							return;
						}

						this._play();
						this._get_lyric();
						my_audio.loadstart = ()=>{
							console.log(my_audio.readyState);
							if(my_audio.readyState == 0){
								this.$store.commit('_set_music_total_time' ,0);
								console.log(1)
								return;
							}
						}
						my_audio.oncanplay = ()=> {  
							this.$store.commit('_set_music_total_time' ,my_audio.duration );
						}
					})
				});
			},
			_play(){
				if (!my_audio.src) {
			      	this.$alert(this._GLOBAL.msg.MUSIC_ERROR);
			      	return;
				}

				this.$store.commit('_set_playing_status',true);
				this.is_play = true;
				if(this.$store.getters.playing_current_time == 0){
					this.$store.commit('_set_playing_current_time',0.05);
				}

				my_audio_timer = setInterval(()=>{
					this._music_progress()
				},1000);

				this.$nextTick(()=>{
					// console.log(my_audio)
					my_audio.play();
				})
			},
			_paused(){
				this.$store.commit('_set_playing_status',false);

				this.is_play = false;
				my_audio.pause();
				clearInterval(my_audio_timer);
			},
			// 获取歌词
			_get_lyric(){
				this.$api.get(this.ApiPath.lyric,{
					id: this.current_music_play.id
				},success=>{
					this.lyric = success.data.lrc.lyric;
				})
			},
			// 播放进度
			_music_progress(){
				this.$store.commit('_set_playing_current_time',my_audio.currentTime);
			    if(my_audio.ended){
			      	// 检测是否暂停状态
					this.$store.commit('_set_playing_status',false);
			      	this.is_play = false;
			      	// } 
		  		}
			  	if(my_audio.error != null){
			      	// 检测是否播放错误
					this.$store.commit('_set_playing_status',false);
			      	this.is_play = false;
			      	alert(this._GLOBAL.msg.MUSIC_ERROR)
			  	}
				if(my_audio.paused || my_audio.ended || my_audio.error != null) clearInterval(my_audio_timer);

				if(this.$store.getters.playing_current_time == this.$store.getters.music_total_time){
					this.$store.commit('_set_playing_current_time',0);
				}

			},
			// 拖动进度条
			_progress_change(value){
				this.$store.commit('_set_playing_current_time',value);
				this.$store.commit('_set_playing_status',false);
				my_audio.pause();
				clearInterval(my_audio_timer);
				my_audio.currentTime = value
			},
			_music_list_flag(){
				this.MUSIC_LIST_SHOW_FLAG = !this.MUSIC_LIST_SHOW_FLAG
			}

			

			
		},
		filters:{
			// 格式化歌曲时间
			// _format_song_time(value){
			// 	if (!value) return '0:00'

			// 	var _minues = parseInt(value / 60),
			// 		_second = parseInt(value % 60 + 1);
			//     return `${_minues}:${_second < 10 ? '0'+_second : _second}`
			// }
		},
		components:{ 
			MusicList,Mini,Full
		}

	}
</script>

<style lang="scss" scoped>
	@import '@/style/scss/player.scss';

</style>