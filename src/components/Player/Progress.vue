<template>
    <div class="music_progress">
        <mu-slider color="secondary" v-model="song_time" ref="song_time" @change="_progress_change" class="music_progress_wrap" ></mu-slider>
        <div class="reset_display_value_text" :style="'left:'+song_time+'%'">{{ playing_current_time | _format_song_time }}</div>
    </div>
</template>

<script>
var _progress_change_fun=null,_playing_status=null;
import {mapGetters} from 'vuex';
export default{
    name: 'my-progress',
    props:{
        music_data:{
            type: Object,
            value: {},
        },
    },
    data(){
        return{
            song_time: 0,

        }
    },
    watch:{
        playing_current_time:{
            handler(val,old){
                this.song_time = Number(((val / this.music_total_time) * 100).toFixed(2));
            },
            deep: true
        },
        music_total_time:{
            handler(val,old){
                this.song_time = Number(((this.playing_current_time / val) * 100).toFixed(2));
            },
            deep: true
        }
        
    },
    computed:{
        ...mapGetters([
            //此处的 playing_status 与以下 store.js 文件中 getters 内的 playing_status 相对应
            'playing_status','playing_current_time','music_total_time'
        ],
        
        )
    },
    mounted(){
        this.$nextTick(()=>{
            this.song_time = Number(((this.playing_current_time / this.music_total_time) * 100).toFixed(2));

            // _playing_status = this.$store.getters.playing_status;
        })
    },
    methods:{
        _play(){
            this.$emit('_play');
        },
        _paused(){
            this.$emit('_paused');
        },
        _progress_change(value){
            var _music_progress_id = this.$children[0].$el;
            
            _playing_status = this.$parent.$parent.is_play;

            var _re_value = Number((value/100 * this.$store.getters.music_total_time).toFixed(2));

            _progress_change_fun && (_music_progress_id.removeEventListener("touchend",_progress_change_fun));

            _progress_change_fun = ()=>{

                // my_audio.currentTime = this.music_data.song_time/100 * this.music_data.total_length;
                this.$nextTick(()=>{
                    if(_playing_status) this._play();
                    
                })
            }
            _music_progress_id.addEventListener("touchend",_progress_change_fun);
            
            this.$emit('_siblings_get_progress_change',_re_value);

        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/style/scss/player.scss';
</style>