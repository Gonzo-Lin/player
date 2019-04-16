<template>
	<transition name="fade_top">
		<div class="full_player" v-show="SHOW_FULL_PLAYER_FLAG">
			<mu-appbar style="width: 100%;" color="transparent" z-depth="0">
				<mu-button icon slot="left" @click.native="_hide_full_player">
					<mu-icon value="keyboard_arrow_down"></mu-icon>
				</mu-button>
				<!-- 歌曲名 -->
				Drinking from the Bottle
				<!-- 歌曲名 -->
				<mu-button flat slot="right">
					<mu-icon value="open_in_new"></mu-icon>
				</mu-button>
			</mu-appbar>

			<div class="full_player_head s">
				<div class="img_bg">
					<img :src="url" class="img_auto">
					<div class="mask"></div>
				</div>
				<div class="music_thumb">
				</div>
			</div>
			
			<div class="full_player_main">
				<div class="music_main">
					<!-- 歌手名 -->
					<h5>singer</h5>
					<!-- 歌手名 -->

					<div class="music_thumb">
					<!-- <div class="music_thumb_bg play_start"> -->
						<div class="music_thumb_bg">
							<img :src="url" :class="['img_auto' , is_play ? 'play_start' : 'play_stop']">
							<div class="like">
								<mu-icon value="favorite"></mu-icon>
							</div>
							<div class="unlike">
								<mu-icon value="favorite_border"></mu-icon>
							</div>
						</div>
					</div>
					<div class="music_lyric">
						<p>I can pay for everything</p>
					</div>
				</div>
				
				<div class="pagination">

				</div>
				
				<div class="_progress_wrap">
					<mu-flex class="flex-wrapper pl-7 pr-7" align-items="center">
						<mu-flex justify-content="start" fill>
							<p :class="music_data.current_length == 0 ? 'disabled' : 'white'">{{ music_data.current_length | _format_song_time }}</p>
						</mu-flex>
						<mu-flex justify-content="end" fill>
							<p class="white"> {{ music_data.total_length | _format_song_time }}</p>
							<!-- <p class="white">- {{ ( music_data.total_length - music_data.current_length ) | _format_song_time }}</p> -->
						</mu-flex>
					</mu-flex>
					<my-progress :music_data="music_data" :_playing="_playing" @_siblings_get_progress_change="_siblings_get_progress_change" @_play="_play" @_paused="_paused" />
				</div>

				<div class="_btn_wrap mt-15">
					<mu-flex class="flex-wrapper pl-7 pr-7" align-items="center">

						<mu-flex justify-content="center" fill>
							<mu-icon :value=" _GLOBAL.config.play_mode[play_mode] " @click="_set_play_mode"></mu-icon>
						</mu-flex>

						<mu-flex justify-content="center" fill>
							<mu-icon value="fast_rewind"></mu-icon>
						</mu-flex>

						<mu-flex justify-content="center" fill>
							<mu-icon :value="!is_play ? 'play_arrow' : 'pause'" @click="!is_play ? _play() : _paused()"></mu-icon>
						</mu-flex>

						<mu-flex justify-content="center" fill>
							<mu-icon value="fast_forward"></mu-icon>
						</mu-flex>

						<mu-flex justify-content="center" fill>
							<mu-icon value="queue_music" @click="_music_list_flag"></mu-icon>
						</mu-flex>

					</mu-flex>
				</div>
			</div>

		</div>
	</transition>
</template>


<script>
	import {mapGetters} from 'vuex';
	import MyProgress from '@/components/Player/Progress.vue';

	import eventVue from '../../utils/event.js';
	export default{
		name: 'full_player',
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
			return{
				SHOW_FULL_PLAYER_FLAG: !!1,

				// play_mode: this._GLOBAL.config.default_play_mode,

				url: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000004ex2Wu3qLZvz.jpg?max_age=2592000',
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this._show_full_player();
			})
		},
		computed:{
			...mapGetters([
			 	//此处的 play_mode 与以下 store.js 文件中 getters 内的 play_mode 相对应
			 	'play_mode'
			])
		},
		watch:{
			music_data:{
				handler(val,old){
					this.song_time = 'song_time' in val ?  Number(((val.current_length / val.total_length) * 100).toFixed(2)) : '0';
				},
				deep:true
			}
		},
		methods:{
			_play(){
				this.$emit('_play');
			},
			_paused(){
				this.$emit('_paused');
			},
			// 隐藏全屏播放器
			_hide_full_player(){
				this.SHOW_FULL_PLAYER_FLAG = false;
				eventVue.$emit("_hide_mini_player",false)   //$emit这个方法会触发一个事件
			},
			_show_full_player(){
				eventVue.$on("_hide_full_player_fun",(data)=>{
					// console.log(data);
					this.SHOW_FULL_PLAYER_FLAG = data
				})
			},
			_siblings_get_progress_change(data){
				this.$emit('_progress_change',data);
			},


			_music_list_flag(){
				this.$emit('_music_list_flag');
			},

			_set_play_mode(){
				var _length = this._GLOBAL.config.play_mode.length-1;
				this.$store.commit('_set_play_mode',_length);
			},
		},
		filters:{
			
		},
		components:{
			MyProgress
		}
	}
</script>


<style lang="scss" scoped>
	@import '@/style/scss/player.scss';
	.full_player_main{
		position: sticky;
	}
	._progress_wrap{
		margin-top: 15px;
		padding: 0 15px;
	}
	.music_progress{
	}
</style>