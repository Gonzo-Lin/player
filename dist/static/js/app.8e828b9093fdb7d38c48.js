webpackJsonp([2],{"0Y+k":function(t,e){},"1j2x":function(t,e){},"5/sZ":function(t,e){},"7kcb":function(t,e){},BpFN:function(t,e){},CC7R:function(t,e){},E51W:function(t,e){},MQi7:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("7+uW"),a=s("Dd8w"),n=s.n(a),_=s("NYxO"),l=s("/QXl"),r=new i.a,c={name:"music_list",props:{MUSIC_LIST_SHOW_FLAG:{type:Boolean,value:!1}},data:function(){return{value:123,song_time:0,is_play:!1,music_url:"",music_total_length:0,music_current_length:0,shuffle:!1,repeat_one:!1}},created:function(){},mounted:function(){var t=this;this.$nextTick(function(){t._init_scroll()})},computed:n()({},Object(_.b)(["play_mode","_play_list"])),watch:{},methods:{_init_scroll:function(){this.my_scroll=new l.a(this.$refs.music_list_wrap_scroll,{click:!0})},select_music:function(t){var e="";t.ar.map(function(t,s){e+=t.name+(s>1?"/":"")}),this._check_music(t.id),this.$store.commit("_set_current_music_play",{id:t.id,name:t.name,desc:e+"-"+t.al.name,thumb:t.al.picUrl})},_check_music:function(t){var e=this;this.$api.get(this.ApiPath.check.music,{id:t},function(t){return fail.success},function(t){return e.$alert(t.data.message),t.success})},collect_all:function(){},_play_mode:function(){var t=this._GLOBAL.config.play_mode.length-1;this.$store.commit("_set_play_mode",t)},hide_music_list:function(){this.$emit("hide_music_list")}}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"fade_top"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.MUSIC_LIST_SHOW_FLAG,expression:"MUSIC_LIST_SHOW_FLAG"}],staticClass:"music_list_wrap"},[s("section",{staticClass:"music_list_wrap_head"},[s("mu-flex",{staticClass:"flex-wrapper",attrs:{"align-items":"center"}},[s("mu-flex",{attrs:{"justify-content":"start",fill:""}},[s("div",{staticClass:"play_mode",on:{click:t._play_mode}},[s("mu-icon",{staticClass:"mr-5",attrs:{value:t._GLOBAL.config.play_mode[t.play_mode]}}),t._v("\n\t\t\t\t\t\t"+t._s(t._GLOBAL.config.play_mode_text[t._GLOBAL.config.play_mode[t.play_mode]])+"\n\t\t\t\t\t\t")],1)]),t._v(" "),s("mu-flex",{attrs:{"justify-content":"end",fill:""}},[s("div",{staticClass:"collect_all",nativeOn:{click:function(e){return t.collect_all(e)}}},[s("mu-icon",{staticClass:"mr-5",attrs:{value:"create_new_folder"}}),t._v("收藏全部\n\t\t\t\t\t")],1),t._v(" "),s("mu-icon",{staticClass:"ml-5",attrs:{value:"delete"}})],1)],1)],1),t._v(" "),s("section",{ref:"music_list_wrap_scroll",staticClass:"music_list_wrap_scroll"},[s("mu-list",[t._l(t._play_list,function(e){return[s("mu-list-item",{staticClass:"music_list_item",attrs:{button:""},nativeOn:{click:function(s){return t.select_music(e)}}},[s("mu-list-item-content",{staticClass:"pt-7 pb-7"},[s("mu-list-item-title",[t._v(t._s(e.name))]),t._v(" "),s("mu-list-item-sub-title",[t._v(t._s(e.ar[0].name+" - "+e.al.name))])],1)],1),t._v(" "),s("mu-divider")]})],2)],1),t._v(" "),s("section",{staticClass:"music_list_wrap_close",on:{click:t.hide_music_list}},[t._v("关闭")])])])},staticRenderFns:[]};var o=s("VU/8")(c,u,!1,function(t){s("XZ6o")},"data-v-11b754d3",null).exports,m=null,p=null,f={name:"my-progress",props:{music_data:{type:Object,value:{}},disabled:{type:Boolean,value:!1}},data:function(){return{song_time:0}},watch:{playing_current_time:{handler:function(t,e){this.song_time=Number((t/this.music_total_time*100).toFixed(2))},deep:!0},music_total_time:{handler:function(t,e){this.song_time=Number((this.playing_current_time/t*100).toFixed(2))},deep:!0}},computed:n()({},Object(_.b)(["playing_status","playing_current_time","music_total_time"])),mounted:function(){var t=this;this.$nextTick(function(){t.song_time=Number((t.playing_current_time/t.music_total_time*100).toFixed(2))})},methods:{_play:function(){this.$emit("_play")},_paused:function(){this.$emit("_paused")},_progress_change:function(t){var e=this,s=this.$children[0].$el;p=this.$parent.$parent.is_play;var i=Number((t/100*this.$store.getters.music_total_time).toFixed(2));m&&s.removeEventListener("touchend",m),m=function(){e.$nextTick(function(){p&&e._play()})},s.addEventListener("touchend",m),this.$emit("_siblings_get_progress_change",i)}}},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"music_progress"},[s("mu-slider",{ref:"song_time",staticClass:"music_progress_wrap",attrs:{disabled:t.disabled,color:"secondary"},on:{change:t._progress_change},model:{value:t.song_time,callback:function(e){t.song_time=e},expression:"song_time"}}),t._v(" "),s("div",{staticClass:"reset_display_value_text",style:"left:"+t.song_time+"%"},[t._v(t._s(t._f("_format_song_time")(t.playing_current_time)))])],1)},staticRenderFns:[]};var y=s("VU/8")(f,d,!1,function(t){s("BpFN")},"data-v-0c3ff1b3",null).exports,g={name:"mini_player",props:{MUSIC_LIST_SHOW_FLAG:!1,disabled:!1},data:function(){return{FULL_PLAYER_SHOW:!1}},mounted:function(){var t=this;this.$nextTick(function(){t._show_mini_player(),t._get_progress_change()})},watch:{},computed:n()({},Object(_.b)(["playing_status","current_music_play"])),methods:{_play:function(){this.$emit("_play")},_paused:function(){this.$emit("_paused")},_music_list_flag:function(){this.$emit("_music_list_flag")},_show_full_player:function(){this.FULL_PLAYER_SHOW=!0,r.$emit("_hide_full_player_fun",!0)},_show_mini_player:function(){var t=this;r.$on("_hide_mini_player",function(e){t.FULL_PLAYER_SHOW=e})},_get_progress_change:function(){},_siblings_get_progress_change:function(t){this.$emit("_progress_change",t)}},filters:{},components:{MyProgress:y}},h={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"fade_top"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:!t.MUSIC_LIST_SHOW_FLAG&&!t.FULL_PLAYER_SHOW,expression:"!MUSIC_LIST_SHOW_FLAG && !FULL_PLAYER_SHOW"}],staticClass:"mini_player"},[t.disabled?t._e():s("div",[s("my-progress",{on:{_siblings_get_progress_change:t._siblings_get_progress_change,_play:t._play,_paused:t._paused}}),t._v(" "),s("mu-flex",{staticClass:"flex-wrapper",attrs:{"justify-content":"center","align-items":"center",fill:""}},[s("mu-avatar",{staticClass:"mini_player_thumb",nativeOn:{click:function(e){return t._show_full_player(e)}}},[s("img",{class:["img_auto cricle",t.playing_status?"play_start":"play_stop"],attrs:{src:t.current_music_play.thumb,alt:t.current_music_play.name}})]),t._v(" "),s("div",{staticClass:"mini_player_main"},[s("h4",[t._v(t._s(t.current_music_play.name))]),t._v(" "),s("p",[t._v(t._s(t.current_music_play.desc))])]),t._v(" "),s("div",{staticClass:"mini_player_btn"},[s("mu-button",{attrs:{icon:""},on:{click:function(e){t.playing_status?t._paused():t._play()}}},[s("mu-icon",{attrs:{value:t.playing_status?"pause":"play_arrow",size:"36"}})],1),t._v(" "),s("mu-button",{attrs:{icon:""},on:{click:t._music_list_flag}},[s("mu-icon",{attrs:{value:"queue_music",size:"36"}})],1)],1)],1)],1),t._v(" "),t.disabled?s("div",[s("my-progress",{attrs:{disabled:""}}),t._v(" "),s("mu-flex",{staticClass:"flex-wrapper",attrs:{"justify-content":"center","align-items":"center",fill:""}},[s("div",{staticClass:"mini_player_main"},[s("h4",[t._v("享受音乐，听你所想")])]),t._v(" "),s("div",{staticClass:"mini_player_btn"},[s("mu-button",{attrs:{icon:"",disabled:""}},[s("mu-icon",{attrs:{value:"play_arrow",size:"36",disabled:""}})],1),t._v(" "),s("mu-button",{attrs:{icon:"",disabled:""}},[s("mu-icon",{attrs:{value:"queue_music",size:"36",disabled:""}})],1)],1)])],1):t._e()])])},staticRenderFns:[]};var v=s("VU/8")(g,h,!1,function(t){s("PvLK")},"data-v-cb84e786",null).exports,S={name:"full_player",props:{MUSIC_LIST_SHOW_FLAG:!1},data:function(){return{SHOW_FULL_PLAYER_FLAG:!1,url:"https://y.gtimg.cn/music/photo_new/T002R300x300M000004ex2Wu3qLZvz.jpg?max_age=2592000"}},mounted:function(){var t=this;this.$nextTick(function(){t._show_full_player()})},computed:n()({},Object(_.b)(["play_mode","playing_status","playing_current_time","music_total_time","current_music_play"])),watch:{},methods:{_play:function(){this.$emit("_play")},_paused:function(){this.$emit("_paused")},_hide_full_player:function(){this.SHOW_FULL_PLAYER_FLAG=!1,r.$emit("_hide_mini_player",!1)},_show_full_player:function(){var t=this;r.$on("_hide_full_player_fun",function(e){t.SHOW_FULL_PLAYER_FLAG=e})},_siblings_get_progress_change:function(t){this.$emit("_progress_change",t)},_music_list_flag:function(){this.$emit("_music_list_flag")},_set_play_mode:function(){var t=this._GLOBAL.config.play_mode.length-1;this.$store.commit("_set_play_mode",t)}},filters:{},components:{MyProgress:y}},L={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"fade_top"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.SHOW_FULL_PLAYER_FLAG,expression:"SHOW_FULL_PLAYER_FLAG"}],staticClass:"full_player"},[s("mu-appbar",{staticStyle:{width:"100%"},attrs:{color:"transparent","z-depth":"0"}},[s("mu-button",{attrs:{slot:"left",icon:""},nativeOn:{click:function(e){return t._hide_full_player(e)}},slot:"left"},[s("mu-icon",{attrs:{value:"keyboard_arrow_down"}})],1),t._v(" "),t._v("\n\t\t\t"+t._s(t.current_music_play.name)+"\n\t\t\t"),t._v(" "),s("mu-button",{attrs:{slot:"right",flat:""},slot:"right"},[s("mu-icon",{attrs:{value:"open_in_new"}})],1)],1),t._v(" "),s("div",{staticClass:"full_player_head s"},[s("div",{staticClass:"img_bg"},[s("img",{staticClass:"img_auto",attrs:{src:t.current_music_play.thumb}}),t._v(" "),s("div",{staticClass:"mask"})]),t._v(" "),s("div",{staticClass:"music_thumb"})]),t._v(" "),s("div",{staticClass:"full_player_main"},[s("div",{staticClass:"music_main"},[s("section",{staticClass:"music_main_page_1"},[s("h5",[t._v(t._s(t.current_music_play.desc))]),t._v(" "),s("div",{staticClass:"music_thumb"},[s("div",{staticClass:"music_thumb_bg"},[s("img",{class:["img_auto",0==t.playing_current_time?"":t.playing_status?"play_start":"play_stop"],attrs:{src:t.current_music_play.thumb}}),t._v(" "),s("div",{staticClass:"like"},[s("mu-button",{staticClass:"like_btn",attrs:{icon:"",fab:"",small:""}},[s("mu-icon",{attrs:{value:"favorite"}})],1)],1),t._v(" "),s("div",{staticClass:"unlike"},[s("mu-button",{staticClass:"unlike_btn",attrs:{icon:"",fab:"",small:""}},[s("mu-icon",{attrs:{value:"favorite_border"}})],1)],1)])]),t._v(" "),s("div",{staticClass:"music_lyric"},[s("p",[t._v("I can pay for everything")])]),t._v(" "),s("div",{staticClass:"_top_btn_wrap"},[s("mu-flex",{staticClass:"flex-wrapper pl-7 pr-7",attrs:{"align-items":"center"}},[s("mu-flex",{attrs:{"justify-content":"center",fill:""}},[s("mu-button",{attrs:{icon:""}},[s("mu-icon",{attrs:{value:"chat"}})],1)],1),t._v(" "),s("mu-flex",{attrs:{"justify-content":"center",fill:""}},[s("mu-button",{attrs:{icon:""}},[s("mu-icon",{staticClass:"down_load_icon",attrs:{value:"first_page"}})],1)],1),t._v(" "),s("mu-flex",{attrs:{"justify-content":"center",fill:""}},[s("mu-button",{attrs:{icon:""}},[s("mu-icon",{attrs:{value:"more_horiz"}})],1)],1)],1)],1)]),t._v(" "),s("section",{staticClass:"music_main_page_2"},[s("div",{staticClass:"music_lyric_wrap"})])]),t._v(" "),s("div",{staticClass:"pagination"}),t._v(" "),s("section",{staticClass:"full_player_bottom"},[s("div",{staticClass:"_progress_wrap"},[s("mu-flex",{staticClass:"flex-wrapper pl-7 pr-7",attrs:{"align-items":"center"}},[s("mu-flex",{attrs:{"justify-content":"start",fill:""}},[s("p",{class:0==t.playing_current_time?"disabled":"white"},[t._v(t._s(t._f("_format_song_time")(t.playing_current_time)))])]),t._v(" "),s("mu-flex",{attrs:{"justify-content":"end",fill:""}},[s("p",{staticClass:"white"},[t._v(" "+t._s(t._f("_format_song_time")(t.music_total_time)))])])],1),t._v(" "),s("my-progress",{on:{_siblings_get_progress_change:t._siblings_get_progress_change,_play:t._play,_paused:t._paused}})],1),t._v(" "),s("div",{staticClass:"_btn_wrap mb-15"},[s("mu-flex",{staticClass:"flex-wrapper pl-7 pr-7",attrs:{"align-items":"center"}},[s("mu-flex",{attrs:{"justify-content":"center",fill:""}},[s("mu-button",{attrs:{icon:""},on:{click:t._set_play_mode}},[s("mu-icon",{attrs:{value:t._GLOBAL.config.play_mode[t.play_mode]}})],1)],1),t._v(" "),s("mu-flex",{attrs:{"justify-content":"center",fill:""}},[s("mu-button",{attrs:{icon:""}},[s("mu-icon",{attrs:{value:"fast_rewind"}})],1)],1),t._v(" "),s("mu-flex",{attrs:{"justify-content":"center",fill:""}},[s("mu-button",{attrs:{icon:""},on:{click:function(e){t.playing_status?t._paused():t._play()}}},[s("mu-icon",{attrs:{value:t.playing_status?"pause":"play_arrow"}})],1)],1),t._v(" "),s("mu-flex",{attrs:{"justify-content":"center",fill:""}},[s("mu-button",{attrs:{icon:""}},[s("mu-icon",{attrs:{value:"fast_forward"}})],1)],1),t._v(" "),s("mu-flex",{attrs:{"justify-content":"center",fill:""}},[s("mu-button",{attrs:{icon:""},on:{click:t._music_list_flag}},[s("mu-icon",{attrs:{value:"queue_music"}})],1)],1)],1)],1)])])],1)])},staticRenderFns:[]};var b,C,w=s("VU/8")(S,L,!1,function(t){s("1j2x")},"data-v-2837ccb4",null).exports,I=(s("mtWM"),{name:"my_player",data:function(){return{value:123,is_play:!1,MUSIC_LIST_SHOW_FLAG:!1}},created:function(){},mounted:function(){var t=this;b=document.getElementById("my_audio"),this._get_music_url(),this.$nextTick(function(){var e=t.$store.getters.playing_status;null==t.$store.getters.playing_current_time&&0==t.$store.getters.playing_current_time||(t._progress_change(Number(t.$store.getters.playing_current_time)),t.$store.commit("_set_playing_status",e))})},computed:n()({},Object(_.b)(["playing_status","playing_current_time","music_total_time","_get_music_data","_play_list","current_music_play"])),watch:{},methods:{_init_scroll:function(){this.my_scroll=new BScroll(this.$refs.music_list_wrap_scroll,{click:!0})},_get_music_url:function(){var t=this;this.$nextTick(function(){if(!b.src)return t.$store.commit("_set_music_total_time",100),void t.$store.commit("_set_playing_current_time",0);console.log(b.src),b.loadstart=function(){if(console.log(b.readyState),0==b.readyState)return t.$store.commit("_set_music_total_time",0),void console.log(1)},b.oncanplay=function(){t.$store.commit("_set_music_total_time",b.duration)}})},_play:function(){b.src||alert(this._GLOBAL.msg.MUSIC_ERROR)},_paused:function(){this.$store.commit("_set_playing_status",!1),this.is_play=!1,b.pause(),clearInterval(C)},_music_progress:function(){this.$store.commit("_set_playing_current_time",b.currentTime),b.ended&&(this.$store.commit("_set_playing_status",!1),this.is_play=!1),null!=b.error&&(this.$store.commit("_set_playing_status",!1),this.is_play=!1,alert(this._GLOBAL.msg.MUSIC_ERROR)),(b.paused||b.ended||null!=b.error)&&clearInterval(C),this.$store.getters.playing_current_time==this.$store.getters.music_total_time&&this.$store.commit("_set_playing_current_time",0)},_progress_change:function(t){this.$store.commit("_set_playing_current_time",t),this.$store.commit("_set_playing_status",!1),b.pause(),clearInterval(C),b.currentTime=t},_music_list_flag:function(){this.MUSIC_LIST_SHOW_FLAG=!this.MUSIC_LIST_SHOW_FLAG}},filters:{},components:{MusicList:o,Mini:v,Full:w}}),x={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"player_wrap"},[s("audio",{ref:"myAudio",staticClass:"my_audio",attrs:{src:t.current_music_play.url,controls:"",id:"my_audio"}}),t._v(" "),s("full",{directives:[{name:"show",rawName:"v-show",value:0==t._play_list.length,expression:"_play_list.length != 0 ? false : true"}],attrs:{MUSIC_LIST_SHOW_FLAG:t.MUSIC_LIST_SHOW_FLAG},on:{_play:t._play,_paused:t._paused,_music_list_flag:t._music_list_flag,_progress_change:t._progress_change}}),t._v(" "),s("mini",{attrs:{MUSIC_LIST_SHOW_FLAG:t.MUSIC_LIST_SHOW_FLAG,disabled:0==t._play_list.length},on:{_play:t._play,_paused:t._paused,_music_list_flag:t._music_list_flag,_progress_change:t._progress_change}}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.MUSIC_LIST_SHOW_FLAG,expression:"MUSIC_LIST_SHOW_FLAG"}],staticClass:"mask z-9",on:{click:function(e){t.MUSIC_LIST_SHOW_FLAG=!t.MUSIC_LIST_SHOW_FLAG}}}),t._v(" "),s("music-list",{attrs:{MUSIC_LIST_SHOW_FLAG:t.MUSIC_LIST_SHOW_FLAG},on:{hide_music_list:function(e){t.MUSIC_LIST_SHOW_FLAG=!t.MUSIC_LIST_SHOW_FLAG}}})],1)},staticRenderFns:[]};var O={name:"App",components:{MyPlayer:s("VU/8")(I,x,!1,function(t){s("MQi7")},"data-v-52b79da2",null).exports}},$={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view"),this._v(" "),e("my-player")],1)},staticRenderFns:[]};var A=s("VU/8")(O,$,!1,function(t){s("zOiU")},null,null).exports,F=s("/ocq");function U(t){return function(e){return s.e(0).then(function(){var i=[s("31BR")("./"+t)];e.apply(null,i)}.bind(this)).catch(s.oe)}}var k={Index:U("Index/Index"),Sheets:U("Sheets/Index"),HotsSheets:U("Sheets/Hots"),SheetsDetails:U("Sheets/Details/Index"),SheetsDetailsShow:U("Sheets/Details/Detail")};i.a.use(F.a);var T=new F.a({routes:[{path:"/sheets",name:"Sheets",component:k.Sheets,children:[{path:"hots",name:"热门歌单",component:k.HotsSheets},{path:"details",name:"歌单详情",component:k.SheetsDetails,children:[{path:":id",name:"歌单id详情",component:k.SheetsDetailsShow}]}]}]}),G=s("mvHQ"),H=s.n(G);i.a.use(_.a);var M=new _.a.Store({state:{music_data:{},play_mode:0,playing_status:!1,playing_current_time:0,music_total_time:0,play_list:{},current_music_play:{}},getters:{_get_music_data:function(t){return t.music_data},play_mode:function(t){return 0==t.play_mode&&(t.play_mode=localStorage.getItem("play_mode")||t.play_mode),t.play_mode},playing_status:function(t){return t.playing_status=t.playing_status||!1,t.playing_status},playing_current_time:function(t){return 0==t.playing_current_time&&(t.playing_current_time=localStorage.getItem("playing_current_time")),t.playing_current_time},music_total_time:function(t){return t.music_total_time},_play_list:function(t){return t.play_list=JSON.parse(localStorage.getItem("play_list"))||t.play_list,t.play_list.tracks},current_music_play:function(t){return t.current_music_play=JSON.parse(localStorage.getItem("current_music_play"))||t.current_music_play,t.current_music_play}},actions:{_set_music_data:function(t,e){var s=t.commit;t.state;s("_set_music",e)}},mutations:{_set_music:function(t,e){t.music_data=e},_set_play_mode:function(t,e){t.play_mode++,t.play_mode>e&&(t.play_mode=0),localStorage.setItem("play_mode",t.play_mode)},_set_playing_status:function(t,e){t.playing_status=e,localStorage.setItem("playing_status",t.playing_status)},_set_playing_current_time:function(t,e){t.playing_current_time=e,localStorage.setItem("playing_current_time",t.playing_current_time)},_set_music_total_time:function(t,e){t.music_total_time=e},_set_play_list:function(t,e){e.id!=JSON.parse(localStorage.getItem("play_list")).id&&(t.play_list=H()(e),localStorage.setItem("play_list",t.play_list))},_set_current_music_play:function(t,e){t.current_music_play=H()(e),localStorage.setItem("current_music_play",t.current_music_play)}}}),W=s("aFc6"),E=(s("E51W"),s("CC7R"),s("Sy0n"),s("kbRN")),R=(s("qlZ0"),s("7kcb"),s("5/sZ"),s("x3GM"),s("//Fk")),j=s.n(R),N=(s("0Y+k"),s("1kwf")),P=s("mw3O"),B=s("mtWM"),D="/v1";function Y(t){return{}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function z(t,e,s,i,a){var n=Object(N.a)();sessionStorage.getItem("Authorization");s&&(s=function t(e){for(var s in e)null===e[s]&&delete e[s],"string"===Y(e[s])?e[s]=e[s].trim():"object"===Y(e[s])?e[s]=t(e[s]):"array"===Y(e[s])&&(e[s]=t(e[s]));return e}(s)),B({method:t,url:e,baseURL:D,data:"POST"===t||"PUT"===t?s:null,params:"GET"===t||"DELETE"===t?s:null}).then(function(t){i&&i(t),n&&n.close()}).catch(function(t){var e=t.response;a?a(e):E.a.alert(e.data.message),n&&n.close()})}B.defaults.transformRequest=[function(t){return P.stringify(t)}],B.interceptors.request.use(function(t){return t.params=n()({},t.params,{proxy:"http://127.0.0.1:54599"}),t},function(t){return j.a.reject(t)});var q={get:function(t,e,s,i){return z("GET",t,e,s,i)},post:function(t,e,s,i){return z("POST",t,e,s,i)},put:function(t,e,s,i){return z("PUT",t,e,s,i)},delete:function(t,e,s,i){return z("DELETE",t,e,s,i)}},Z=s("iClD"),V=s.n(Z);i.a.config.productionTip=!1,i.a.prototype.$api=q,i.a.prototype.ApiPath={article:{getArticleList:"News/getNewsInfo"},login:{phoneLogin:"/login/cellphone",emailLogin:"/login"},sheets:{getSheetCat:"/playlist/catlist",getNewSheet:"/playlist/new",getHotSheet:"/playlist/hot",getSheetDetail:"/playlist/detail"},top:{playlist:"/top/playlist",hightquality:"/top/playlist/highquality"},song:{url:"/song/url",detail:"/song/detail"},check:{music:"/check/music"}},i.a.prototype._GLOBAL={config:{limit:10,padding:10,play_mode:["shuffle","repeat_one","repeat"],play_mode_text:{repeat:"列表循环",shuffle:"随机播放",repeat_one:"单曲循环"},default_play_mode:0},style:{},api_url:{},sms:{},msg:{MUSIC_ERROR:"音乐播放错误！"}},i.a.use(W.a),i.a.use(V.a),i.a.use(E.a),new i.a({el:"#app",router:T,store:M,components:{App:A},template:"<App/>"})},PvLK:function(t,e){},Sy0n:function(t,e){},XZ6o:function(t,e){},iClD:function(t,e){e.install=function(t,e){t.filter("text_loading",function(t){return t||"Loading..."}),t.filter("_format_song_time",function(t){if(!t)return"0:00";var e=parseInt(t/60),s=parseInt(t%60);return e+":"+(s<10?"0"+s:s)})}},qlZ0:function(t,e){},x3GM:function(t,e){},zOiU:function(t,e){}},["NHnr"]);