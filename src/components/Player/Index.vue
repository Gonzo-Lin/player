<template>
	<div class="player_wrap">
		
		
		
        <audio :src="music_data.url" controls="" ref="myAudio" class="my_audio" id="my_audio" />


		<full 
			:is_play = "is_play" 
			:music_data="music_data" 
			:_playing = "re_playing_s"
			:MUSIC_LIST_SHOW_FLAG="MUSIC_LIST_SHOW_FLAG"
			@_play = "_play" 
			@_paused = "_paused"
			@_music_list_flag = "_music_list_flag"
			@_progress_change = "_progress_change"  >
		</full>



		<mini 
			:is_play = "is_play" 
			:music_data="music_data" 
			:_playing = "re_playing_s" 
			:MUSIC_LIST_SHOW_FLAG="MUSIC_LIST_SHOW_FLAG"
			@_play = "_play" 
			@_paused = "_paused" 
			@_music_list_flag = "_music_list_flag"
			@_progress_change = "_progress_change" />

		
		<!-- 播放列表 -->
		<div class="mask z-9" v-show="MUSIC_LIST_SHOW_FLAG" @click="MUSIC_LIST_SHOW_FLAG = !MUSIC_LIST_SHOW_FLAG"></div>
		<music-list 
			:MUSIC_LIST_SHOW_FLAG="MUSIC_LIST_SHOW_FLAG" 
			@hide_music_list="MUSIC_LIST_SHOW_FLAG = !MUSIC_LIST_SHOW_FLAG">
		</music-list>

	</div>
</template>

<script>
	import MusicList from '@/components/Player/MusicList.vue';
	import Mini from '@/components/Player/Mini.vue';
	import Full from '@/components/Player/Full.vue';


	import axios from 'axios';
	import mp3 from '../../assets/green.mp3';


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

				music_data:{
					url: '',
					song_time: 0,
					total_length: 0,
					current_length: 0,
				},


				MUSIC_LIST_SHOW_FLAG: false,

				re_playing_s: !!0,
			}
		},
		created(){
		},
		mounted(){
			my_audio = document.getElementById("my_audio");
			this.$nextTick(()=>{
				this._get_music_list();
				this.$nextTick(()=>{
					// this._init_scroll();
				});
			})
		},
		watch:{

		},
		methods:{
			_init_scroll(){
				this.my_scroll = new BScroll(this.$refs.music_list_wrap_scroll,{
					click: true,
				})
			},
			_get_music_list(){
				this.music_data.url = mp3;
				
				this.$nextTick(()=>{
					my_audio.oncanplay = ()=> {  
						this.music_data.total_length = my_audio.duration;
						this.music_data.current_length = my_audio.currentTime;
					}
				})
			},
			_play(){
				this.re_playing_s = this.is_play = true;
				my_audio.play();
				if (this.music_data.current_length == 0 ) {
					this.music_data.current_length = 0.05; 
				}
				my_audio_timer = setInterval(()=>{
					this._music_progress()
				},1000);
			},
			_paused(){
				this.re_playing_s = this.is_play = false;
				my_audio.pause();
				clearInterval(my_audio_timer);
			},
			// 播放进度
			_music_progress(){
				this.music_data.current_length = my_audio.currentTime;
			    if(my_audio.ended){
			      	// 检测是否暂停状态
			      	this.is_play = false;
			      	if(this.music_data.current_length == this.music_data.total_length) this.music_data.current_length = 0; this.re_playing_s = false;
		  		}
			  	if(my_audio.error != null){
			      	// 检测是否播放错误
			      	this.is_play = false;
			      	alert('音乐播放错误！')
			  	}
				if(my_audio.paused || my_audio.ended || my_audio.error != null) clearInterval(my_audio_timer);

			  	this.music_data.song_time = Number(((this.music_data.current_length / this.music_data.total_length) * 100).toFixed(2));
			},
			// 拖动进度条
			_progress_change(value){
				this.is_play = false;
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