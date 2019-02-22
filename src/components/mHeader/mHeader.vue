<template>
  <div>
    <div class="m_header">
      <div class="icon"></div>
      <h1 class="text">忆音乐</h1>
      <router-link tag="div" class="mine" to="/user">
        <img src="user.png" alt>
      </router-link>
    </div>
  </div>
</template>

<style scoped >
.m_header {
  position: relative;
  height: 44px;
  text-align: center;
  color: #000;
  font-size: 0;
}
 .m_header .icon {
    display: inline-block;
    vertical-align: top;
    margin-top: 6px;
    width: 30px;
    height: 32px;
    margin-right: 9px;
    background-image: url("./lo.png");
    background-size: 30px 32px;
  }
  .m_header .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: 2rem;
    color: rgb(219, 138, 16);
  }
  .m_header .mine {
    position: absolute;
    top: 0;
    right: 0;
  }
  .m_header .mine img {
      display: block;
      padding: 10px;
    }
</style>

