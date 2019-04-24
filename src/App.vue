<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
    <my-player></my-player>

  </div>
</template>

<script>
  import MyPlayer from '@/components/Player/Index'
  export default {
    name: 'App',
    components:{
     MyPlayer
   }
 }
</script>

<style>
#app {
  font-family: Roboto,Lato,Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
  font-weight: 300;
  text-align: center;
  color: #2c3e50;
  height: calc(100% - 60px);
}
</style>
