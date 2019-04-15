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

			<div class="music_main">
				<!-- 歌手名 -->
				<h5>singer</h5>
				<!-- 歌手名 -->

				<div class="music_thumb">
				<!-- <div class="music_thumb play_start"> -->
					<img :src="url" class="img_auto">
					<div class="like">
						<mu-icon value="favorite"></mu-icon>
					</div>
					<div class="unlike">
						<mu-icon value="favorite_border"></mu-icon>
					</div>
				</div>
				<div class="music_lyric">
					<p>I can pay for everything</p>
				</div>
			</div>

			<!-- <div class="music_progress">
	            <mu-slider color="secondary" v-model="song_time" ref="song_time" @change="_progress_change" id="music_progress"></mu-slider>
	            <div class="reset_display_value_text" :style="'left:'+song_time+'%'">{{ music_data.current_length | _format_song_time }}</div>
			</div>

	        <mu-flex class="flex-wrapper" justify-content="center" align-items="center" fill>
	            <mu-avatar class="mini_player_thumb">
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
	        </mu-flex> -->
		</div>
	</transition>
</template>


<script>
	import eventVue from '../../utils/event.js'
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

				url: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000004ex2Wu3qLZvz.jpg?max_age=2592000',
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this._show_full_player();
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
		methods:{
			// 隐藏全屏播放器
			_hide_full_player(){
				this.SHOW_FULL_PLAYER_FLAG = false;
				eventVue .$emit("_hide_mini_player",false)   //$emit这个方法会触发一个事件
			},
			_show_full_player(){
				eventVue .$on("_hide_full_player_fun",(data)=>{
					// console.log(data);
					this.SHOW_FULL_PLAYER_FLAG = data
				})
			}
		},
		filters:{
			
		},
	}
</script>


<style lang="scss" scoped>
	@import '@/style/scss/player.scss';
</style>