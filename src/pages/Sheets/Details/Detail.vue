<template>
	<div class="sheets_hots_wrap" ref="sheet_detail">
		<div>
			<img :src="sheet_data['coverImgUrl']" class="img_auto">
			<p>播放量：{{sheet_data.playCount | text_loading}}</p>
			
			<mu-list>
				<template v-for="list,key in sheet_data['tracks']" >
					<mu-list-item button @click="_handler_music(list)">
						<mu-list-item-title>{{ list.name }}</mu-list-item-title>
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
				sheet_data:{}

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
					})
				}else{
					this.sheet_detail_scroll.refresh();
				}
			},
			_get_sheets_details(){
				this.$api.get(this.ApiPath.sheets.getSheetDetail,{
					id: this.$route.params.id
				},success=>{
					this.sheet_data = success.data.playlist;
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
			_handler_music(item){
				this.$store.commit('_set_play_list', { tracks: this.sheet_data.tracks, id: this.sheet_data.id });
				var song = '';
				item['ar'].map((s,k)=>{
					song+=(s.name+ (k>1 ? '/': ''));
				});
				this.$store.commit('_set_current_music_play' , { id : item.id, name: item.name , desc: song + '-' + item.al.name , thumb: item.al.picUrl})

				this._check_music(item.id)
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
			_check_music(id){
				this.$api.get(this.ApiPath.check.music,{
					id: id
				},success=>{
					console.log(0)
					console.log(success.data)
				},fail=>{
					this.$alert(fail.data.message );
					// console.error(fail);
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
.sheets_hots_wrap{
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: white;
	z-index: 9;
}
</style>