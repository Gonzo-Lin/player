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
	      	},
          {
            path: 'highquality',
            name: '精品歌单',
            component: Path.HighQuality,
          },
          {
            path: 'details',
            name: '歌单详情',
            component: Path.SheetsDetails,
            children:[{
              path: ':id',
              name: '歌单id详情',
              component: Path.SheetsDetailsShow
            }]
          }
      	]
  	},
    {
	    path: '/',
	    name: 'Index',
	    component: Path.Index
    },
    // {
    //   path: '*',
    //   name: 'Player',
    //   component: Player
    // }
  ]
})
