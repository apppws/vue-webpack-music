<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <tab></tab>
<!-- 使用keepalive保存页面的缓存 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import "./assets/style.css"
  import MHeader from './components/mHeader/mHeader'
  import Tab from './components/tab/index'
  export default {
    name: 'app',
    components: {
      MHeader,
      Tab,
    }
  }
</script>

<style scoped lang="stylus">

</style>
