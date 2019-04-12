<template>
	<div class="player_wrap">

		<div class="mini_player">
			<div class="music_progress">
	            <mu-slider color="secondary" v-model="song_time" ref="song_time" @change="_progress_change" id="music_progress"></mu-slider>
	            <div class="reset_display_value_text" :style="'left:'+song_time+'%'">{{ music_current_length | _format_song_time }}</div>
			</div>

            <mu-flex class="flex-wrapper" justify-content="center" fill>
                <mu-avatar class="mini_player_thumb">
                    <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000004ex2Wu3qLZvz.jpg?max_age=2592000" alt="Drinking from the Bottle" :class="['img_auto cricle' , is_play ? 'play_start' : 'play_stop']"  />
                </mu-avatar>
                <div class="mini_player_main">
                    <h4>Drinking from the Bottle</h4>
                    <p>Calvin Harris - Tinie Tempah</p>
                </div>
                <div class="mini_player_btn">
                    <mu-icon :value=" is_play ? 'pause' : 'play_arrow'" size="36" @click="!is_play ? _play() : _paused()"></mu-icon>
                    <mu-icon value="queue_music" size="36" @click=""></mu-icon>
                </div>
            </mu-flex>
		</div>
		
        <audio :src="music_url" controls="" ref="myAudio" class="my_audio" id="my_audio" />

		<div class="full_player">
			
		</div>

		<div class="mask"></div>
		<div class="music_list_wrap">
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
		</div>

	</div>
</template>

<script>
	import axios from 'axios';
	import mp3 from '../../assets/green.mp3';

	const PLAYER_STATUS = !!0;
	var CURRENT_TIME = 0;
	var my_audio,my_audio_timer,_playing,_progress_change_fun=null;

	export default{
		name: "my_player",
		data(){
			return {
				value: 123,
				song_time: 0,
				is_play: !!0,

				music_url: '',
				music_total_length: 0,
				music_current_length: 0,
			}
		},
		created(){
			
		},
		mounted(){
			my_audio = document.getElementById("my_audio");
			this.$nextTick(()=>{
				this._get_music_list();
			})
		},
		watch:{

		},
		methods:{
			_get_music_list(){
				this.music_url = mp3;
				
				this.$nextTick(()=>{
					my_audio.oncanplay = ()=> {  
						this.music_total_length = my_audio.duration;
						this.music_current_length = my_audio.currentTime;
					}
				})
			},
			_play(){
				_playing = this.is_play = true;
				my_audio.play();
				my_audio_timer = setInterval(()=>{
					this._music_progress()
				},1000);
			},
			_paused(){
				_playing = this.is_play = false;
				my_audio.pause();
				clearInterval(my_audio_timer);
			},
			// 播放进度
			_music_progress(){
				this.music_current_length = my_audio.currentTime;
				
			    if(my_audio.ended){
			      	// 检测是否暂停状态
			      	this.is_play = false;
		  		}
			  	if(my_audio.error != null){
			      	// 检测是否播放错误
			      	this.is_play = false;
			      	alert('音乐播放错误！')
			  	}
				if(my_audio.paused || my_audio.ended || my_audio.error != null) clearInterval(my_audio_timer);

			  	this.song_time = Number(((this.music_current_length / this.music_total_length) * 100).toFixed(2));


			},
			// 拖动进度条
			_progress_change(value){
				this.is_play = false;
				my_audio.pause();
				clearInterval(my_audio_timer);
				

				var _music_progress_id = document.getElementById("music_progress");

				// 防止触发多次事件监听。
				my_audio.currentTime = Number((this.song_time/100 * this.music_total_length).toFixed(2));
				_progress_change_fun && (_music_progress_id.removeEventListener("touchend",_progress_change_fun));

				_progress_change_fun = ()=>{
					// my_audio.currentTime = this.song_time/100 * this.music_total_length;
					this.$nextTick(()=>{
						if(_playing) this._play();
						
					})
				}
				_music_progress_id.addEventListener("touchend",_progress_change_fun);
				
			},

			// 选择音乐播放
			select_music(item){
				console.log(item)
			}
		},
		filters:{
			// 格式化歌曲时间
			_format_song_time(value){
				if (!value) return '0:00'

				var _minues = parseInt(value / 60),
					_second = parseInt(value % 60 + 1);
			    return `${_minues}:${_second < 10 ? '0'+_second : _second}`
			}
		}

	}
</script>

<style lang="scss" scoped>
@import '@/style/base/_mixin.scss';
.player_wrap{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .my_audio{
    	/*transform: translateY(calc(-100% - 70px));*/
        display: none;
    }
}
.mini_player{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px;
    background-color: white;
    @include shadow(0px, -8px, 24px,  rgba(0, 0, 0, 0.3));

    .music_progress{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        transform: translateY(-50%);
        /deep/ .mu-slider{
        	margin-bottom: 0;
	        &.active.display-value{
	        	.display-value-text{
	        		display: none;
	        	}
	        	.mu-slider-display-value {
	        		width: 28px;
	        		height: 28px;
	        	}
	        	& + .reset_display_value_text{
	        		display: block;
		        }	
	        }
        }
        .reset_display_value_text{
        	position: absolute;
		    top: -26px;
		    display: none;
		    width: 26px;
		    height: 26px;
		    text-align: center;
		    line-height: 26px;
		    font-size: 10px;
		    color: white;
		    transform: scale(1) translate(-50%,0);
        }	
        
    }
    
    .mini_player_main{
        margin: 0 10px;
        flex: 1;
        text-align: left;
        h4{
            font-size: 16px;
        }
        p{
            font-size: 14px;
            color: #aaa;
            margin-top: 3px;
        }
    }
    .mini_player_btn{
        margin-top: 2px;
        i{
            vertical-align: middle;
        }
        
    }
}

.music_list_wrap{
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 450px;
	background: white;
	overflow: scroll;
	.music_list_item{
		.music_list_item_singer{
			font-size: 75%;
			letter-spacing: 0.05em;
			color: #bababa;
		}
	}
}








@keyframes rotate {
	0% {
		transform: rotate(0);
	}
	0% {
		transform: rotate(360deg);
	}
}
.play_start {
	animation: rotate 20s linear infinite;
}
.play_stop {
	animation: rotate 20s linear infinite;
	-webkit-animation-play-state: paused;
}

.mu-slider-display-value,.mu-slider-fill,.mu-slider-thumb{
	transition: all .1s;
}


</style>