import Vue from 'vue'
import Router from 'vue-router'
import Player from '@/components/Player/Index'

import Path from './path.js'


Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path: '/sheets',
  		name: 'Sheets',
      	component: Path.Sheets,
      	children:[
	      	{
	      		path: 'hots',
	      		name: '热门歌单',
	      		component: Path.HotsSheets,
	      	}
      	]
  	},
    {
	    path: '/',
	    name: 'Player',
	    component: Player
    }
  ]
})
