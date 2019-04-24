<template>
	<div class="sheets_hots_wrap">
		
		<router-link :to="r.children ? '' : r.path " class="mr-5" v-for="r,index in my_routers" :key="index">
			{{r.name}}
			<div v-if="r.children" class="mb-15 mt-5">
				<router-link :to="c.children ? '' : r.path+'/'+c.path" class="mr-5" v-for="c,key in r.children" :key="key" v-show="!c.children">
					{{ c.name }}
				</router-link>
			</div>

		</router-link>
		<!-- <router-link to="/sheets/details">details</router-link> -->

	</div>
</template>

<script>
	export default{
		name: "MyPlayerIndex",
		data(){
			return {
				my_routers:[]

			}
		},
		created(){
		},
		mounted(){
			this.my_routers = this.$router.options.routes;
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