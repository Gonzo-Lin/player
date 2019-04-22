<template>
	<transition name="fadeInOut">
		<div class="sheets_hots_wrap">
			<div class="nav">
				<ul>
					<li :class="{active : act == 0}" @click="_select_sheets_tag()">
						全部
					</li>
					<li :class="{active : act == sheets.id }" v-for="sheets,key in sheets_tags" :key="sheets.id" @click="_select_sheets_tag(sheets)">
						{{ sheets.name }}
					</li>
				</ul>
			</div>

			<section :class="['sheets_list_wrap', 'p-'+(_GLOBAL.config.padding/2) ] " ref="sheets_list_wrap">
				<div>
					<mu-grid-list class="gridlist" :padding="_GLOBAL.config.padding/2">
						<mu-grid-tile v-for="sheet, index in sheets_list" :key="index" @click.native="_select_sheet(sheet.id)" >
							<div slot="default" class=" img_wrap">
								<img v-lazy="sheet.coverImgUrl" />
								<span class="headset">
									<mu-icon value="headset"></mu-icon>
									<em>{{ sheet.playCount | _format_count}}</em>
								</span>
							</div>
							<span slot="title" class="f-12 text_left">{{ sheet.name | text_loading}}</span>
							<span slot="subTitle" class="f-12 text_left primary">by <b class="white">{{ sheet.creator['nickname'] | text_loading }}</b></span>
							<mu-button slot="action" icon @click.stop="_player_sheets(sheet)">
								<mu-icon value="play_circle_outline"></mu-icon>
							</mu-button>
						</mu-grid-tile>
					</mu-grid-list>
					
					<div class="mt-15 pb-15">
						<mu-button round color="primary" @click="_load_more">Load More</mu-button>
					</div>
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
				sheets_list: [],
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
				},fail=>{
					console.log(fail)
				})
			},
			_select_sheets_tag(tag){

				tag = tag || {};

				this.act = 'id' in tag ? tag.id : 0;
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

			// 获取歌单内容
			_get_sheets_details(){
				this.$api.get(this.ApiPath.sheets.getSheetDetail,{
					id: this.$route.params.id
				},success=>{
					this.sheet_data = success.data.playlist;
					this.privileges = success.data.privileges;
					// this.sheet_data.tracks.map(list=>{
					// 	this._check_music(list.id);
					// })


					this.$nextTick(()=>{
						this._init_sheet_detail_scroll();

						// console.log(this.sheet_data)
					})
				},fail=>{
					console.log(fail)
				})
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
		}

	}
</script>

<style lang="scss" scoped>
@import '@/style/base/_color.scss';

.nav{
	ul{
		background: white;
		overflow-x: scroll;
		width: 100%;
		z-index: 999;
		white-space: nowrap;
		overflow-x: scroll;
		border-bottom: 1px solid #eaeaea;
		li{
			display: inline-block;
			padding: 10px 15px;
			position: relative;
			color: #999;
			font-size: 14px;
			&.active{
				color: $special;
				position: relative;
				&:after{
					position: absolute;
					bottom: 0;
					left: 50%;
					width: 75%;
					height: 1px;
					border-radius: 2px;
					content: "";
					background: $special;
					transform: translateX(-50%);
				}
			}
		}
	}
}

.sheets_hots_wrap{
	.sheets_list_wrap{
		overflow: hidden;
		position: absolute;
		top: 62px;
		left: 0;
		right: 0;
		bottom: 60px;
	}
}

.mu-grid-tile{
	.img_wrap{
		width: 100%;
		height: 100%;
		position: absolute;
		> img{
			width: 100%;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			height: auto;
			position: absolute;
		}
		.headset{
			position: absolute;
			right: 3px;
			top: 3px;
			color: white;
			font-size: 14px;
			padding: 3px 5px;
			background: rgba(0,0,0,.2);
			border-radius: 2px;
			i{
				font-size: 18px;
				display: inline-block;
				vertical-align: middle;
			}
			em{
				vertical-align: middle;
				display: inline-block;
			}
		}

	}
	/deep/ &.multiline{
		.mu-grid-tile-titlebar{
			height: auto;
			padding: 7px 0;
			.mu-grid-tile-title-container{
				margin: 0 16px;
			}
			.mu-grid-tile-subtitle, .mu-grid-tile-title{
				text-align: left;
			}
		}
	}
	
}

</style>