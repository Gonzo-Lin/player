<template>
	<div class="sheets_hots_wrap">
		<router-link to="/sheets/hots"> hots </router-link>
		<router-link to="/sheets/details"> details </router-link>
		<keep-alive>
			<router-view/>
		</keep-alive>
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

</style>