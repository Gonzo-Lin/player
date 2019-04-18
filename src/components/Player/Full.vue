<template>
	<transition name="fade_top">
		<div class="full_player" v-show="SHOW_FULL_PLAYER_FLAG">
			<mu-appbar style="width: 100%;" color="transparent" z-depth="0">
				<mu-button icon slot="left" @click.native="_hide_full_player">
					<mu-icon value="keyboard_arrow_down"></mu-icon>
				</mu-button>
				<!-- 歌曲名 -->
				{{ current_music_play.name }}
				<!-- 歌曲名 -->
				<mu-button flat slot="right">
					<mu-icon value="open_in_new"></mu-icon>
				</mu-button>
			</mu-appbar>

			<div class="full_player_head s">
				<div class="img_bg">
					<img :src="current_music_play.thumb" class="img_auto">
					<div class="mask"></div>
				</div>
				<div class="music_thumb">
				</div>
			</div>
			
			<div class="full_player_main">
				<div class="music_main">
					<section class="music_main_page_1">
						<!-- 歌手名 -->
						<h5>{{ current_music_play.desc }}</h5>
						<!-- 歌手名 -->

						<div class="music_thumb">
						<!-- <div class="music_thumb_bg play_start"> -->
							<div class="music_thumb_bg">
								<img :src="current_music_play.thumb" :class="['img_auto' , playing_current_time == 0 ? '' : ( playing_status ? 'play_start' : 'play_stop' )]">
								<div class="like" >
									<mu-button icon fab small  class="like_btn">
										<mu-icon value="favorite"></mu-icon>
								    </mu-button>
								</div>
								<div class="unlike">
									<mu-button icon fab small  class="unlike_btn" >
										<mu-icon value="favorite_border"></mu-icon>
								    </mu-button>
								</div>
							</div>
						</div>
						<div class="music_lyric">
							<p>I can pay for everything</p>
						</div>

						<div class="_top_btn_wrap">
							<mu-flex class="flex-wrapper pl-7 pr-7" align-items="center">

								<mu-flex justify-content="center" fill>
									<mu-button icon >
										<mu-icon value="chat" ></mu-icon>
								    </mu-button>
								</mu-flex>

								<mu-flex justify-content="center" fill>
									<mu-button icon >
										<mu-icon value="first_page" class="down_load_icon"></mu-icon>
								    </mu-button>
								</mu-flex>

								<mu-flex justify-content="center" fill>
									<mu-button icon >
										<mu-icon value="more_horiz"></mu-icon>
								    </mu-button>
								</mu-flex>

							</mu-flex>
						</div>
					</section>

					<section class="music_main_page_2">
						<div class="music_lyric_wrap">
							
						</div>
					</section>
				</div>

				
				
				<div class="pagination">

				</div>
				
				<section class="full_player_bottom">
					

					<div class="_progress_wrap">
						<mu-flex class="flex-wrapper pl-7 pr-7" align-items="center">
							<mu-flex justify-content="start" fill>
								<p :class="playing_current_time == 0 ? 'disabled' : 'white'">{{ playing_current_time | _format_song_time }}</p>
							</mu-flex>
							<mu-flex justify-content="end" fill>
								<p class="white"> {{ music_total_time | _format_song_time }}</p>
							</mu-flex>
						</mu-flex>
						<my-progress  @_siblings_get_progress_change="_siblings_get_progress_change" @_play="_play" @_paused="_paused" />
					</div>

					<div class="_btn_wrap mb-15">
						<mu-flex class="flex-wrapper pl-7 pr-7" align-items="center">

							<mu-flex justify-content="center" fill>
								<mu-button icon @click="_set_play_mode">
									<mu-icon :value=" _GLOBAL.config.play_mode[play_mode] "></mu-icon>
							    </mu-button>
							</mu-flex>

							<mu-flex justify-content="center" fill>
								<mu-button icon >
									<mu-icon value="fast_rewind"></mu-icon>
							    </mu-button>
							</mu-flex>

							<mu-flex justify-content="center" fill>
								<mu-button icon @click="!playing_status ? _play() : _paused()">
									<mu-icon :value="!playing_status ? 'play_arrow' : 'pause'" ></mu-icon>
							    </mu-button>
							</mu-flex>

							<mu-flex justify-content="center" fill>
								<mu-button icon >
									<mu-icon value="fast_forward"></mu-icon>
							    </mu-button>
							</mu-flex>

							<mu-flex justify-content="center" fill>
								<mu-button icon @click="_music_list_flag">
									<mu-icon value="queue_music"></mu-icon>
							    </mu-button>
							</mu-flex>

						</mu-flex>
					</div>
				</section>
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
			
		},
		data(){
			return{
				SHOW_FULL_PLAYER_FLAG: !!0,

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
			 	'play_mode','playing_status','playing_current_time','music_total_time','current_music_play'
			])
		},
		watch:{
			
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
		height: calc( 100% - 56px);
	}
	._progress_wrap{
		padding: 0 15px;
	}
	.music_main{
		position: sticky;
		height: calc( 100% - 110px );
		[class^="music_main_page"]{
			height: 100%;
		}
		.music_main_page_1{
			position: relative;
			._top_btn_wrap{
				position: absolute;
				bottom: 10px;
				left: 0;
				right: 0;
			}
		}
	}
	.full_player_bottom{
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		/*height: 112px;*/
	}
	.down_load_icon{
		transform: rotate(-90deg);
	}
</style>