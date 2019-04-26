<template>
	<transition name="fadeInOut">
		<div>
			<section class="sheets_list_wrap" ref="sheets_list_wrap">
				<div>
					<section class="highquality_wrap">
						<div class="detail_head" @click="$router.push('/sheets/highquality')">
							<div class="img_bg">
								<img :src="highquality['coverImgUrl']" class="img_auto">
								<div class="mask"></div>
							</div>
							<div class="thumb">
								<img :src="highquality['coverImgUrl']" class="img_auto">
							</div>
							<div class="sheet_main">
								<h3 class="link">
									<mu-icon value="high_quality"></mu-icon>
									精品歌单
									<mu-icon value="chevron_right" class="link_icon"/>
								</h3>
								<div class="creator text_overflow_1">
									<h4>{{ highquality.name }}</h4>
								</div>
								<div class="copywriter text_overflow_1">
									<h5>{{ highquality.copywriter }}</h5>
								</div>
								
							</div>
						</div>
					</section>

                    <my-screen-list :screen_flag="screen_flag" :act_tag_name="act_tag_name" 
                        @screen_show="screen_flag=true" @_select_sheets_tag="_select_sheets_tag"></my-screen-list>
                    <!-- <section class="screen_temp clearfix">
                        <div class="f_l ">
                            <mu-button small flat round class="link" @click.native="screen_flag = true">
                                {{ act_tag_name }}
                                <mu-icon right value="chevron_right" class="link_icon" ></mu-icon>
                            </mu-button>
                        </div>
                        <div class="f_r mt-4">
                            <span class="tags_btn" v-for="tag,key in filter_hots_tags" :key="key" 
                                @click="_select_sheets_tag(tag)">{{tag.name}}</span>
                        </div>
                    </section> -->

					<section :class="['p-'+(_GLOBAL.config.padding/2) ] " >
						<mu-grid-list class="gridlist" :padding="_GLOBAL.config.padding/2">
							<mu-grid-tile v-for="sheet, index in sheets_list" :key="index" @click.native="_select_sheet(sheet.id)" >
								<div slot="default" class=" img_wrap">
									<img v-lazy="sheet.coverImgUrl" />
									<div class="play_count">
										<span class="headset">
											<mu-icon value="headset"></mu-icon>
											<em>{{ sheet.playCount | _format_count | text_loading}}</em>
										</span>
									</div>
								</div>
								<span slot="title" class="f-12 text_left">{{ sheet.name | text_loading}}</span>
								<span slot="subTitle" class="f-12 text_left primary">by <b class="white">{{ sheet.creator['nickname'] | text_loading }}</b></span>
								<mu-button slot="action" icon @click.stop="_player_sheets(sheet.id)">
									<mu-icon value="play_circle_outline"></mu-icon>
								</mu-button>
							</mu-grid-tile>
						</mu-grid-list>
						
						<div class="mt-15 pb-15">
							<mu-button round color="primary" @click="_load_more">Load More</mu-button>
						</div>
					</section>
				</div>
			</section>

            <my-screen :screen_flag="screen_flag" :act_tag_name="act_tag_name" @choies_name="_select_sheets_tag" ref="myscreenref"></my-screen>

		</div>
	</transition>
</template>

<script>
	import BScroll from 'better-scroll'
	import MyScreenList from '@/components/Screen/List'
	import MyScreen from '@/components/Screen'

	export default{
		name: "sheets_hots",
		data(){
			return {
				sheets_tags: [],
				sheets_list: [],

				act_tag_name: '',

                highquality:{},
                
                screen_flag: !!0,

                tags:{}

			}
		},
		created(){
		},
		mounted(){
			this._get_sheets_hots();
			this._get_highquality();
			this.$nextTick(()=>{
                this._select_sheets_tag();
			})
		},
		computed:{
			filter_hots_tags(){
                var sheets_tags = this.sheets_tags.sort(this._sort_by);

                return sheets_tags.filter((tags,key)=>{
                    if( key < 3){
                        console.log(tags)
                        return tags;
                    }
                })
            }
		},
		watch:{

		},
		methods:{
            _sort_by(a,b){
                return b.usedCount - a.usedCount;
            },
			_init_sheets_list(){
				if(!this.sheet_list_scroll){
					this.sheet_list_scroll = new BScroll(this.$refs.sheets_list_wrap,{
						click: true,
					})
				}else{
					this.sheet_list_scroll.refresh();
				}
			},
			_get_sheets_hots(){
				this.$api.get(this.ApiPath.sheets.getHotSheet,{},success=>{
					this.sheets_tags = success.data.tags
				})
			},
			_get_highquality(){
				this.$api.get(this.ApiPath.top.highquality,{
					limit: 1,
				},success=>{
					this.highquality = success.data.playlists[0]
				})
			},
			_select_sheets_tag(tag){
				tag = tag || {};

				this.act_tag_name = 'name' in tag ? tag.name : '全部'; 

				this.sheets_list = [];
				this._load_more();
				
			},
			// 选择歌单
			_select_sheet(id){
				this.$router.push(this.$route.matched[0].path+'/details/'+id)

			},

			// 播放歌单
			_player_sheets(id){
				console.log(id);
			},
			
			// 更多，分页
			_load_more(){
				this.$api.get(this.ApiPath.top.playlist,{
					cat: this.act_tag_name,
					limit: this._GLOBAL.config.limit,
					offset: this.sheets_list.length
				},success=>{
					var _lists = success.data.playlists;
					_lists.map( l =>{
						this.sheets_list.push(l);
					})
					this.$nextTick(()=>{
						this._init_sheets_list();
					})

				},fail=>{
					console.log(fail)
				})
            },


			
		},
		filters:{
			
		},
		components:{ 
            MyScreen,MyScreenList
		}

	}
</script>

<style lang="scss" scoped>
@import '@/style/base/_color.scss';
@import '@/style/base/_mixin.scss';


.sheets_hots_container{
	.sheets_list_wrap{
		overflow: hidden;
		height: 100%;
	}
}


</style>