<template>
	<transition name="fadeInOut">
		<div>
			<section class="high_quality_wrap " ref="high_quality_wrap">
				<div>
					<section :class="['p-'+(_GLOBAL.config.padding/2) ] " >
						<mu-grid-list class="gridlist" :padding="_GLOBAL.config.padding/2">
							<mu-grid-tile v-for="quality, index in high_quality" :key="index" @click.native="_select_sheet(quality.id)" >
								<div slot="default" class=" img_wrap">
									<img v-lazy="quality.coverImgUrl" />
									<div class="play_count">
										<span class="headset">
											<mu-icon value="headset"></mu-icon>
											<em>{{ quality.playCount | _format_count | text_loading}}</em>
										</span>
									</div>
								</div>
								<span slot="title" class="f-12 text_left">{{ quality.name | text_loading}}</span>
								<span slot="subTitle" class="f-12 text_left primary">by <b class="white">{{ quality.creator['nickname'] | text_loading }}</b></span>
								<mu-button slot="action" icon @click.stop="_player_sheets(quality.id)">
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

		</div>
	</transition>
</template>

<script>
	import BScroll from 'better-scroll'

	export default{
		name: "sheets_hots",
		data(){
			return {
				sheets_tags: [],
				high_quality: [],
				act: 0,

				act_tag_name: '',


			}
		},
		created(){
		},
		mounted(){
			this._get_sheets_hots();
			this.$nextTick(()=>{
				this._select_sheets_tag();
			})
		},
		computed:{
			
		},
		watch:{

		},
		methods:{
			_init_high_quality(){
				if(!this.sheet_list_scroll){
					this.sheet_list_scroll = new BScroll(this.$refs.high_quality_wrap,{
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
					limit: 10,
				},success=>{
					this.highquality = success.data.playlists[0]
				})
			},
			_select_sheets_tag(tag){

				tag = tag || {};

				this.act = 'id' in tag ? tag.id : 0;
				this.act_tag_name = 'name' in tag ? tag.name : '全部'; 

				this.high_quality = [];
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
				var _length = this.high_quality.length;
				console.log(_length)
				var _before = _length != 0 ? this.high_quality[_length-1].updateTime : 0;
				this.$api.get(this.ApiPath.top.highquality,{
					limit: this._GLOBAL.config.limit,
					before: _before
				},success=>{
					var _lists = success.data.playlists;
					_lists.map( l =>{
						this.high_quality.push(l);
					})
					this.$nextTick(()=>{
						this._init_high_quality();
					})

				},fail=>{
					console.log(fail)
				})
			},

			
		},
		filters:{
			
		},
		components:{ 
		}

	}
</script>

<style lang="scss" scoped>
@import '@/style/base/_color.scss';
@import '@/style/base/_mixin.scss';

.high_quality_wrap{
	overflow: hidden;
	height: 100%;
}
</style>