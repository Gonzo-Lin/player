<template>
    <div class="music_progress">
        <mu-slider color="secondary" v-model="song_time" ref="song_time" @change="_progress_change" id="music_progress"></mu-slider>
        <div class="reset_display_value_text" :style="'left:'+song_time+'%'">{{ music_data.current_length | _format_song_time }}</div>
    </div>
</template>

<script>
var _progress_change_fun=null;
export default{
    name: 'progress',
    props:{
        music_data:{
            type: Object,
            value: {},
        }
    },
    data(){
        return{
            song_time: 0,
        }
    },
    watch:{
        music_data:{
            handler(val,old){
                this.song_time = 'song_time' in val ?  Number(((val.current_length / val.total_length) * 100).toFixed(2)) : '0';
            },
            deep: true
        }
    },
    methods:{
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


        }
    }
}
</script>
