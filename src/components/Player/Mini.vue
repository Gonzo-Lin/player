<template>
	<transition name="fade_top">
		<div class="mini_player" v-show="!MUSIC_LIST_SHOW_FLAG && !FULL_PLAYER_SHOW">
			<div class="music_progress">
	            <mu-slider color="secondary" v-model="song_time" ref="song_time" @change="_progress_change" id="music_progress"></mu-slider>
	            <div class="reset_display_value_text" :style="'left:'+song_time+'%'">{{ music_data.current_length | _format_song_time }}</div>
			</div>

	        <mu-flex class="flex-wrapper" justify-content="center" align-items="center" fill>
	            <mu-avatar class="mini_player_thumb" @click.native="_show_full_player">
	                <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000004ex2Wu3qLZvz.jpg?max_age=2592000" alt="Drinking from the Bottle" :class="['img_auto cricle' , is_play ? 'play_start' : 'play_stop']"  />
	            </mu-avatar>
	            <div class="mini_player_main">
	                <h4>Drinking from the Bottle</h4>
	                <p>Calvin Harris - Tinie Tempah</p>
	            </div>
	            <div class="mini_player_btn">
	                <mu-icon :value=" is_play ? 'pause' : 'play_arrow'" size="36" @click="!is_play ? _play() : _paused()"></mu-icon>
	                <mu-icon value="queue_music" size="36" @click="_music_list_flag"></mu-icon>
	            </div>
	        </mu-flex>
		</div>
	</transition>
</template>

<script>
	import eventVue from '../../utils/event.js';

	var _progress_change_fun=null;
	export default{
		name: 'mini_player',
		props:{
			MUSIC_LIST_SHOW_FLAG: false,
			is_play:{
				type: Boolean,
				value: false,
			},
			music_data:{
				type: Object,
				value: {},
			},
			_playing:{
				type: Boolean,
				value: false,
			},

		},
		data(){
			return {
				song_time: 0,
				FULL_PLAYER_SHOW: !!0,
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.song_time = 'song_time' in this.music_data ? this.music_data.song_time : '0';

				this._show_mini_player();
			})
		},
		watch:{
			music_data:{
				handler(val,old){
					this.song_time = 'song_time' in val ?  Number(((val.current_length / val.total_length) * 100).toFixed(2)) : '0';
				},
				deep:true
			}
		},
		computed:{
		},
		methods:{
			_play(){
				this.$emit('_play');
			},
			_paused(){
				this.$emit('_paused');
			},
			_progress_change(value){
				var _music_progress_id = document.getElementById("music_progress");

				var _re_value = Number((value/100 * this.music_data.total_length).toFixed(2));

				_progress_change_fun && (_music_progress_id.removeEventListener("touchend",_progress_change_fun));

				_progress_change_fun = ()=>{
					// my_audio.currentTime = this.music_data.song_time/100 * this.music_data.total_length;
					this.$nextTick(()=>{
						if(this._playing) this._play();
						
					})
				}
				_music_progress_id.addEventListener("touchend",_progress_change_fun);
				
				this.$emit('_progress_change',_re_value);


			},
			_music_list_flag(){
				this.$emit('_music_list_flag');
			},

			// 是否显示全屏播放器
			_show_full_player(){
				this.FULL_PLAYER_SHOW = true
				eventVue .$emit("_hide_full_player_fun",true)   //$emit这个方法会触发一个事件
			},
			_show_mini_player(){
				eventVue .$on("_hide_mini_player",(data)=>{
					// console.log(data);
					this.FULL_PLAYER_SHOW = data
				})
			}
		},
		filters:{
			
		},
	}
</script>


<style lang="scss" scoped>
	@import '@/style/scss/player.scss';
	/deep/ .mu-slider{
		height: 14px;
	}
</style>