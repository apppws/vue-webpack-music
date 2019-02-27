<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <tab></tab>
<!-- 使用keepalive保存页面的缓存 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import "./assets/style.css"
  import MHeader from './components/mHeader/mHeader'
  import Tab from './components/tab/index'
  import Player from './components/player/player'
  export default {
    name: 'app',
    components: {
      MHeader,
      Tab,
      Player
    }
  }
</script>

<style scoped lang="less">
</style>
