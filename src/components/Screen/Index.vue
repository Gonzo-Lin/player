<template>
    <transition name="fade_top">
        <div class="screen_wrap" v-show="screen_flag">
            <mu-appbar class="app_bar" color="red" z-depth="0">
                <mu-button icon slot="left" @click.native="hide_screen">
                    <mu-icon value="close"></mu-icon>
                </mu-button>
                <!-- 歌曲名 -->
                筛选歌单
                <!-- {{ current_music_play.name }} -->
                <!-- 歌曲名 -->
                <mu-button flat slot="right">
                    <!-- <mu-icon value="more_horiz"></mu-icon> -->
                </mu-button>
            </mu-appbar>
            <section class="screen_list_wrap">
                <my-scroll :data="catlist">
                    <div class="all_sheet">
                        <div :class="['all_btn',{checked: act_tag_name == '全部' }]" @click="choice_cat({ name:'全部'})">
                            全部歌单
                        </div>
                    </div>
                    <div class="screen_list">
                        <ul class="clearfix mt-10 mb-10 " v-for="cat,index in filter_sub">
                            <li :class="['little' , { border_bottom: cat.length > 7}]">
                                <div>
                                    <mu-icon :value="icon[index]"></mu-icon>
                                    <p v-cloak class="mt-5">{{ categories[index] | text_loading}}</p>
                                </div>
                            </li>
                            <li v-for="s,k in cat" @click="choice_cat({ name:s.name})"
                                :class="[
                                    {checked: act_tag_name == s.name },
                                    cat.length < 7 && k>(cat.length-4) ? 'last' : ((cat.length-6)%4 != 0 && k>(cat.length-((cat.length-6)%4+1)) ? 'last' : '')
                                ]">
                                <div v-cloak >
                                    {{ s.name }}
                                </div>
                            </li>
                            <li v-if="(cat.length-6)%4 != 0" v-for="i in (4-(cat.length-6)%4)" class="last">
                                <div>&nbsp;</div>
                            </li>
                        </ul>
                        
                    </div>
                </my-scroll>
            </section>
        </div>
    </transition>
</template>

<script>


	export default{
        name: "my_screen",
        props:{
            screen_flag: false,
            act_tag_name:{
                type: String,
                value: '',
            }
        },
		data(){
			return {
                catlist:[],
                categories:{},
                all: {},
                sub: [],

                // 过滤sub分类
                filter_sub: [],

                icon: ['language','style','flight_takeoff','sentiment_satisfied','dashboard'],

                checked_cat: '全部',

                hide: true
			}
		},
		created(){
		},
		mounted(){
            this._get_catlist();
		},
		computed:{
		},
		watch:{
		},
		methods:{
            _get_catlist(){
                this.$api.get(this.ApiPath.sheets.getSheetCat,{},success=>{
                    this.$nextTick(()=>{
                        this.sub = success.data.sub;
                        this.all = success.data.all;
                        this.categories = success.data.categories;
                        
                        for(var key in this.categories){ 
                            if(!this.categories.hasOwnProperty(key)){
                                continue;
                            }
                            var item = {}; 
                            item[key] = this.sub.filter(item=>item.category === Number(key))
                            this.filter_sub.push(item[key]); 
                        } 

                    })
                })
            },
            hide_screen(){
                this.$parent.screen_flag = false;
            },
            choice_cat(_data){
                this.$parent.act_tag_name = _data.name;
                this.$emit('choies_name',_data);
                this.hide_screen();
                // console.log(_data)
            }
		},
		filters:{
            
		},
		components:{ 
		}

	}
</script>

<style lang="scss" scoped>
@import '@/style/base/_color.scss';


.screen_wrap{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: $_body;
    .screen_list_wrap{
        height: calc(100% - 60px);
    }
    .all_sheet{
        padding: 5px;
        text-align: center;
        background-color: white;
        .all_btn{
            height: 40px;
            line-height: 30px;
            padding: 5px;
            border: 1px solid white;
            &.checked{
                border-color: $red;
                color: $red;
            }    
        }
    }
    ul{
        background-color: white;
        li{
            width: calc(100% / 4);
            height: 40px;
            float: left;
            border: 1px solid $border_1;
            border-left-color: white;
            border-top-color: white;
            // display: table;
            position: relative;
            >div{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                width: 100%;
                font-size: 14px;
                // display: table-cell;
                // vertical-align: middle;
            }
            &:first-child{
                height: 80px;
                border-bottom-color: white;
                >div{
                    font-size: 16px;
                }
            }
            &:nth-child(4),&:nth-child(4n-1){
                border-right-color: white;
            }
            &:nth-child(3){
                border-right: 1px solid $border_1;
            }
            &.border_bottom{
                border-bottom: 1px solid $border_1;
            }
            // &:last-child,&:nth-last-child(2),&:nth-last-child(3){
            //     border-bottom: 0;
            // }
            &.last{
                border-bottom-color: white;
            }
            &.checked{
                border:1px solid $red;
                color: $red;
            } 
        }
    }
}
</style>