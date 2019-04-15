<template>
	<transition name="fade_top">
		<div class="music_list_wrap" v-show="MUSIC_LIST_SHOW_FLAG">
			<section class="music_list_wrap_head">
				<mu-flex class="flex-wrapper" align-items="center">
					<mu-flex class="" justify-content="start" fill>
						<div class="play_mode" @click="_play_mode">
							<mu-icon :value=" _GLOBAL.config.play_mode[play_mode] " class="mr-5"></mu-icon>
							{{ _GLOBAL.config.play_mode_text[_GLOBAL.config.play_mode[play_mode]] }}
							<!-- {{ shuffle ? '随机播放' : (repeat_one ? '单曲循环' : '列表循环') }} -->
						</div>
					</mu-flex>
					<mu-flex class="" justify-content="end" fill>
						<div class="collect_all" @click.native="collect_all">
							<mu-icon value="create_new_folder" class="mr-5"></mu-icon>收藏全部
						</div>
						<mu-icon value="delete" class="ml-5"></mu-icon>
					</mu-flex>
				</mu-flex>
			</section>
			<section class="music_list_wrap_scroll" ref="music_list_wrap_scroll">
				<mu-list>
					<template v-for="item in 10">
						<mu-list-item button class="music_list_item" @click.native="select_music(item)">
							<mu-list-item-title>Let's Go {{item}} <span class="music_list_item_singer">- Tiësto/Icona Pop</span></mu-list-item-title>
							<mu-list-item-action>
								<mu-icon value="chat_bubble"></mu-icon>
							</mu-list-item-action>
						</mu-list-item>
						<mu-divider />
					</template>
				</mu-list>
			</section>
			<section class="music_list_wrap_close" @click="hide_music_list">关闭</section>
		</div>
	</transition>
</template>
<script>
	import BScroll from 'better-scroll'

	export default{
		name: 'music_list',
		props:{
			MUSIC_LIST_SHOW_FLAG: {
				type: Boolean,
				value: false,
			}
		},
		data(){
			return {
				value: 123,
				song_time: 0,
				is_play: !!0,

				music_url: '',
				music_total_length: 0,
				music_current_length: 0,

				shuffle: !!0,
				repeat_one: !!0,
				play_mode: 0,
			}
		},
		created(){
		},
		mounted(){
			// my_audio = document.getElementById("my_audio");
			this.$nextTick(()=>{
				// this._get_music_list();
				// this.$nextTick(()=>{
					this._init_scroll();
				// });
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
			// 选择音乐播放
			select_music(item){
				console.log(item)
			},

			// 收藏全部
			collect_all(){

			},

			// 播放模式
			_play_mode(){
				if(this.play_mode >= this._GLOBAL.config.play_mode.length-1){
					this.play_mode = 0;
					return;
				}
				this.play_mode++;
			},

			// 隐藏播放列表
			hide_music_list(){
				this.$emit('hide_music_list');
			}
		}
	}
</script>


<style lang="scss" scoped>
@import '@/style/base/_mixin.scss';

.music_list_wrap{
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 450px;
	background: white;
    @include shadow(0px, -8px, 24px,  rgba(0, 0, 0, 0.3));
    @include rounded(8px 8px 0 0);
	/*overflow: hidden;*/

	.music_list_item{
		.music_list_item_singer{
			font-size: 75%;
			letter-spacing: 0.05em;
			color: #bababa;
		}
	}
    .music_list_wrap_head{
        padding: 16px 16px;
        @include border(bottom);
    }
    .music_list_wrap_scroll{
        height: calc(100% - 100px);
        overflow: hidden;
    }
    .music_list_wrap_close{
        height: 44px;
        line-height: 44px;
        background: white;
        @include shadow(0px, -8px, 24px,  rgba(0, 0, 0, 0.3));
        /*@include border(top);*/
    }
    .collect_all,.play_mode{
        display: inherit;
    }
}

</style>