<template>
	<transition name="fade_top">
		<div class="mini_player" v-show="!MUSIC_LIST_SHOW_FLAG && !FULL_PLAYER_SHOW">
			<my-progress @_siblings_get_progress_change="_siblings_get_progress_change" @_play="_play" @_paused="_paused" />

	        <mu-flex class="flex-wrapper" justify-content="center" align-items="center" fill>
	            <mu-avatar class="mini_player_thumb" @click.native="_show_full_player">
	                <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000004ex2Wu3qLZvz.jpg?max_age=2592000" alt="Drinking from the Bottle" :class="['img_auto cricle' , playing_status ? 'play_start' : 'play_stop']"  />
	            </mu-avatar>
	            <div class="mini_player_main">
	                <h4>Drinking from the Bottle</h4>
	                <p>Calvin Harris - Tinie Tempah</p>
	            </div>
	            <div class="mini_player_btn">
	                <mu-icon :value=" playing_status ? 'pause' : 'play_arrow'" size="36" @click="!playing_status ? _play() : _paused()"></mu-icon>
	                <mu-icon value="queue_music" size="36" @click="_music_list_flag"></mu-icon>
	            </div>
	        </mu-flex>
		</div>
	</transition>
</template>

<script>
	import MyProgress from '@/components/Player/Progress.vue';
	import eventVue from '../../utils/event.js';

	import {mapGetters} from 'vuex';
	// var _progress_change_fun=null;
	export default{
		name: 'mini_player',
		props:{
			MUSIC_LIST_SHOW_FLAG: false,
			
		},
		data(){
			return {
				FULL_PLAYER_SHOW: !!0,
			}
		},
		mounted(){
			this.$nextTick(()=>{

				this._show_mini_player();
				this._get_progress_change();
			})
		},
		watch:{
			
		},
		computed:{
			...mapGetters([
			 	//此处的 play_mode 与以下 store.js 文件中 getters 内的 play_mode 相对应
			 	'playing_status'
			])
		},
		methods:{
			_play(){
				this.$emit('_play');
			},
			_paused(){
				this.$emit('_paused');
			},
			
			_music_list_flag(){
				this.$emit('_music_list_flag');
			},

			// 是否显示全屏播放器
			_show_full_player(){
				this.FULL_PLAYER_SHOW = true
				eventVue.$emit("_hide_full_player_fun",true)   //$emit这个方法会触发一个事件
			},
			_show_mini_player(){
				eventVue.$on("_hide_mini_player",(data)=>{
					// console.log(data);
					this.FULL_PLAYER_SHOW = data
				})
			},

			// 获取 my-progress 组件的时长
			_get_progress_change(){

				// eventVue.$on("_siblings_get_progress_change",(data)=>{
				// 	// console.log(data);
				// 	console.log(data)
				// 	// this.SHOW_FULL_PLAYER_FLAG = data
				// })
			},
			_siblings_get_progress_change(data){
				this.$emit('_progress_change',data);
			}
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
	/deep/ .mu-slider{
		height: 14px;
	}
</style>