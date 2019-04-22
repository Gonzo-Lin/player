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
					<section :class="['music_main_page_1' , main_page_show ? 'main_page_show' : '' ]" @click="main_page_show = !main_page_show">
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

					<section :class="['music_main_page_2' , !main_page_show ? 'main_page_show' : '' ]" @click="main_page_show = !main_page_show">
						<div class="music_lyric_wrap" ref="lyric_list">
							<div>
								<ul>
									<li ref="lyric_line" v-for="(line,index) in current_lyric.lines" :class="[current_line_num===index ? 'active' : '', 'lyric_text']">{{line.txt}}{{ line.time }}</li>
								</ul>
							</div>
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
	import Lyric from 'lyric-parser';
	import BScroll from 'better-scroll';

	import eventVue from '../../utils/event.js';
	export default{
		name: 'full_player',
		props:{
			MUSIC_LIST_SHOW_FLAG: false,
			// lyric: {
			// 	type: String,
			// 	value: '',
			// }
		},
		data(){
			return{
				SHOW_FULL_PLAYER_FLAG: !!0,
				main_page_show: true,
				// play_mode: this._GLOBAL.config.default_play_mode,

				url: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000004ex2Wu3qLZvz.jpg?max_age=2592000',

				lyric: '',
				current_lyric: {},
				current_line_num: 0,
				current_song: {},
			}
		},
		mounted(){
			this._show_full_player();
			if('timer' in this.current_lyric){
				this.current_lyric.stop();
			}
			this._get_lyric();
			this.$nextTick(()=>{
			})
		},
		computed:{
			...mapGetters([
			 	//此处的 play_mode 与以下 store.js 文件中 getters 内的 play_mode 相对应
			 	'play_mode','playing_status','playing_current_time','music_total_time','current_music_play'
			])
		},
		watch:{
			playing_current_time:{
				handler(new_s,old_s){
					if(new_s !== old_s){
						this._init_lyric();
					}
				}
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
			// 获取歌词
			_get_lyric(){
				this.$api.get(this.ApiPath.lyric,{
					id: this.current_music_play.id
				},success=>{
					this.lyric = success.data.lrc.lyric;
					this._init_lyric();
					this.$nextTick(()=>{
						this._init_lyric_scroll();
					})
				})
			},
			_init_lyric(){
				this.current_lyric = new Lyric(this.lyric,this.handler_lyric);
				// if(this.playing_status){
					this.current_lyric.play();
				// }
				
			},
			handler_lyric({lineNum,txt}){
				this.current_line_num = lineNum;
				console.log(lineNum)
				console.log(txt)
				if(lineNum > 5){
					let line_el = this.$refs.lyric_line[lineNum-5];
					console.log(line_el)
					this.lyric_scroll.scrollToElement(line_el,1000);
				}else{
					console.log(this.lyric_scroll)
					this.lyric_scroll.scrollToElement(0,1000);
				}
				this.playingLyric = txt
			},
			_init_lyric_scroll(){
				if(!this.lyric_scroll){
					this.lyric_scroll = new BScroll(this.$refs.lyric_list,{
						click: true,
					})
				}else{
					this.lyric_scroll.refresh();
				}
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
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			/*overflow: hidden;*/
			opacity: 0;
			transition: all .3s;
		}
		.music_main_page_1{
			._top_btn_wrap{
				position: absolute;
				bottom: 10px;
				left: 0;
				right: 0;
			}
		}
		.music_main_page_2{
			overflow: hidden;
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
	.music_lyric_wrap{
		white-space: pre-wrap;
		height: 100%;
		overflow: hidden;
	}
	.main_page_show{
		opacity: 1!important;
	}


	.lyric_text{
		color: white;
		line-height: 1.5;
		margin-bottom: 10px;
		color: #ccc;
		&.active{
			color: #fff;
		}
	}
</style>