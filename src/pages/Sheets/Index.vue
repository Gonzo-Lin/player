<template>
	<div class="sheets_hots_wrap">
		<!-- <router-link to="/sheets/hots"> hots </router-link>
		<router-link to="/sheets/details"> details </router-link> -->
		<mu-appbar class="app_bar" color="red" z-depth="0">
			<mu-button icon slot="left" @click="$router.go(-1)">
				<mu-icon value="chevron_left"></mu-icon>
			</mu-button>
			<!-- 歌曲名 -->
			{{$route.name}}
			<!-- {{ current_music_play.name }} -->
			<!-- 歌曲名 -->
			<mu-button flat slot="right">
				<mu-icon value="more_horiz"></mu-icon>
			</mu-button>
		</mu-appbar>
		<div class="sheets_hots_container">
			<keep-alive>
				<router-view/>
			</keep-alive>
		</div>
	</div>
</template>

<script>
	export default{
		name: "SheetsIndex",
		data(){
			return {
				

			}
		},
		created(){
		},
		mounted(){
		},
		computed:{
			
		},
		watch:{
            
		},
		methods:{
			
		},
		filters:{
			
		},
		components:{ 
		}

	}
</script>

<style lang="scss" scoped>
@import '@/style/base/_mixin.scss';
.app_bar{
	width: 100%;
	color: white;
}
.sheets_hots_wrap{
	height: 100%;
	.sheets_hots_container{
		height: calc(100% - 56px);
		overflow: hidden;
		> *{
			height: 100%
		}
	}
}
</style>