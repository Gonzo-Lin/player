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

			<section :class="['sheets_list_wrap', 'p-'+(_GLOBAL.config.padding/2) ] ">
				<mu-grid-list class="gridlist" :padding="_GLOBAL.config.padding/2">
					<mu-grid-tile v-for="sheet, index in sheets_list" :key="index" @click.native="_select_sheet(sheet.id)" >
						<img :src="sheet.coverImgUrl" />
						<span slot="title" class="f-12 text_left">{{ sheet.name | text_loading}}</span>
						<span slot="subTitle" class="f-12 text_left primary">by <b class="white">{{ sheet.creator['nickname'] | text_loading }}</b></span>
						<mu-button slot="action" icon @click.stop="_player_sheets(sheet.id)">
							<mu-icon value="play_circle_outline"></mu-icon>
						</mu-button>
					</mu-grid-tile>
				</mu-grid-list>

				<router-link  v-for="sheet, index in sheets_list" :key="index" :to="'/sheets/hots/'+sheet.id"  >
					{{ sheet.name }}
				</router-link>
				
				<!-- <div class="mt-15 mb-15">
					<mu-button round color="primary" @click="_load_more">Load More</mu-button>
				</div> -->
			</section>

		</div>
	</transition>
</template>

<script>
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
				this.$api.get(this.ApiPath.top.playlist,{
					cat: this.act_tag_name,
					limit: this._GLOBAL.config.limit,
				},success=>{
					var _lists = success.data.playlists;
					_lists.map( l =>{
						this.sheets_list.push(l);
					})

				},fail=>{
					console.log(fail)
				})
			},
			// 选择歌单
			_select_sheet(id){
				this.$router.push(this.$route.matched[0].path+'/details/'+id)

			},

			// 播放歌单
			_player_sheets(id){
				console.log(id);

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

.sheets_list_wrap{
	overflow: hidden;
}

.mu-grid-tile{
	> img{
		width: 100%;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		height: auto;
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