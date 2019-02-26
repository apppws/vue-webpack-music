<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>
<style scoped lang="less">
.tab {
  display: flex;
  align-self: center;
  height: 2rem;
  line-height: 2rem;
  font-size: 1rem;
  justify-content: space-around;
  .tab-item {
    flex: 1;
    text-align: center;
    align-self: center;
    .tab-link {
      padding-bottom: 5px;
      color: #cdcdcd;
    }
  }
  .router-link-active {
    border-bottom: 2px solid #cb0f55;
  }
  .tab-link {
      color: #fff;
    }
}

</style>
