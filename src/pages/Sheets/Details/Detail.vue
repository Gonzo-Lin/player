<template>
	<div class="sheets_hots_wrap" ref="sheet_detail">
		<div>
			<div class="detail_head" >
				<div class="img_bg">
					<img :src="sheet_data['coverImgUrl']" class="img_auto">
					<div class="mask"></div>
				</div>
				<div class="thumb">
					<img :src="sheet_data['coverImgUrl']" class="img_auto">
					<div class="play_count">
						<span class="headset">
							<mu-icon value="headset"></mu-icon>
							<em>{{ sheet_data.playCount | _format_count | text_loading}}</em>
						</span>
					</div>
				</div>
				<div class="sheet_main">
					<h3>{{ sheet_data.name }}</h3>
					<div class="creator">
						<router-link to="" class="link" >
							<mu-avatar size="24">
								<img :src="'creator' in sheet_data ? sheet_data.creator.avatarUrl : ''">
							</mu-avatar>
							<span class="nickname">{{ 'creator' in sheet_data ? sheet_data.creator.nickname : '' | text_loading }} </span>
							<mu-icon value="chevron_right" class="link_icon"/>
						</router-link>
					</div>
					<div class="tags">
						<mu-badge :content="tag" color="red" :class="{'mr-5' : key != sheet_data.tags.length-1}" v-for="tag,key in sheet_data.tags"></mu-badge>
					</div>
				</div>
				<!-- <p>播放量：{{sheet_data.playCount | text_loading}}</p> -->
			</div>
			
			<mu-list>
				<template v-for="list,key in sheet_data['tracks']" >
					<mu-list-item button @click.native="_handler_music(list,key)" :class="privileges[key].st == '-100' ? 'disabled' : ''">
						<mu-list-item-content class="pt-7 pb-7">
							<mu-list-item-title>{{ list.name }}</mu-list-item-title>
							<mu-list-item-sub-title>{{ list.ar[0].name + ' - ' + list.al.name }}</mu-list-item-sub-title>
						</mu-list-item-content>
					</mu-list-item>
					<mu-divider></mu-divider>
				</template>
			</mu-list>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default{
		name: "SheetsDetail",
		data(){
			return {
				sheet_data: {},
				privileges: [],

			}
		},
		created(){
		},
		mounted(){
			this._get_sheets_details();
		},
		computed:{
			
		},
		watch:{
			'$route':{
				handler(to,from){
					if ( ('id' in to.params) && to.name == "歌单id详情"){
						this._get_sheets_details()
					}
				},
				deep:true
			}

		},
		methods:{
			_init_sheet_detail_scroll(){
				if(!this.sheet_detail_scroll){
					this.sheet_detail_scroll = new BScroll(this.$refs.sheet_detail,{
						click: true,
					});
				}else{
					this.sheet_detail_scroll.refresh();
					this.$nextTick(()=>{
						this.sheet_detail_scroll.scrollTo(0,0);
					})
				}
			},
			_get_sheets_details(){
				this.$api.get(this.ApiPath.sheets.getSheetDetail,{
					id: this.$route.params.id
				},success=>{
					this.sheet_data = success.data.playlist;
					this.privileges = success.data.privileges;

					this.$nextTick(()=>{
						this._init_sheet_detail_scroll();

						// console.log(this.sheet_data)
					})
				},fail=>{
					console.log(fail)
				})
			},
			_handler_music(item,index){
				if(this.privileges[index].st == '-100'){
					this.$alert(this._GLOBAL.msg.ST_100_ERROR);
					return;
				}

				this.$store.commit('_set_play_list', { tracks: this.sheet_data.tracks, id: this.sheet_data.id ,privileges: this.privileges });
				

				this._check_music(item)
				// this._get_song_url(item.id);
				// this.$store.action('_set_music_data',{url: list})
			},
			_get_song_url(id){
				this.$api.get(this.ApiPath.song.url,{
					id: id
				},success=>{
					// return 
					console.log(success.data);
				},fail=>{
					console.log(fail);
				})
			},
			_check_music(item){
				this.$api.get(this.ApiPath.check.music,{
					id: item.id
				},success=>{
					var song = '';
					item['ar'].map((s,k)=>{
						song+=(s.name+ (k>1 ? '/': ''));
					});
					this.$store.commit('_set_current_music_play' , { id : item.id, name: item.name , desc: song + '-' + item.al.name , thumb: item.al.picUrl})
				},fail=>{
					this.$alert('发生未知错误');
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

.sheets_hots_wrap{
	/*position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 65px;*/
	background: white;
	z-index: 9;
}
.disabled{
	/deep/ .mu-item{
		color: $_disabled;
	}
}
/deep/ .mu-item {
	height: auto;
}

.link_icon{
	color: #ccc;
}


</style>