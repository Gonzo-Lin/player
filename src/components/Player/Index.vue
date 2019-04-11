<template>
	<div class="player_wrap">

		<div class="mini_player">
            <mu-slider class="music_progress" color="secondary" v-model="song_time" ref="song_time" :max=max></mu-slider>

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
                </div>
            </mu-flex>
		</div>
		
        <audio :src="music_url" controls="" ref="myAudio" class="my_audio" id="my_audio" />

		<div class="full_player"></div>

	</div>
</template>

<script>
	import axios from 'axios';
	import mp3 from '../../assets/green.mp3';
	const PLAYER_STATUS = !!0;

	var my_audio,my_audio_timer;

	export default{
		name: "my_player",
		data(){
			return {
				value: 123,
				song_time: 0,
				is_play: !!0,

				music_url: '',
				max: 100,
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
		methods:{
			_get_music_list(){
				this.music_url = mp3;
				this.$nextTick(()=>{
					my_audio.oncanplay = ()=> {  
						//  = my_audio.duration
						// console.log( typeof this.$refs.song_time.max)
						// console.log( typeof  my_audio.duration)
						// this.max = my_audio.duration
						// console.log(this.$refs.song_time)
						// setInterval(()=>{
						// 	this.song_time++
						// },1000)
					}
				})
			},

			_play(){

				this.is_play = !this.is_play;
					// $(obj).parent().parent().addClass('current')
				my_audio.play()
				my_audio_timer = setInterval(()=>{
					this._music_progress()
				},1000)

			},
			_paused(){
				this.is_play = !this.is_play;
				my_audio.pause();
			},
			// 播放进度
			_music_progress(){
				var music_total_length = my_audio.duration;
			    var music_current_length = my_audio.currentTime;

			    console.log(music_current_length)
			    this.song_time = (music_current_length / music_total_length) * 100;

			    if(my_audio.ended){
			      	// 检测是否暂停状态
			      	this.is_play = false;
		  		}
			  	if(my_audio.error != null){
			      	// 检测是否播放错误
			      	clearInterval(my_audio_timer)
			      	this.is_play = false;
			      	alert('音乐播放错误！')
			  	}

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
    	transform: translateY(calc(-100% - 20px));
        /*opacity: 0;*/
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
        margin-bottom: 0;
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
</style>