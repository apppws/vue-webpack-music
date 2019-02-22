<template>
  <div>
    <!-- 轮播图 S -->
    <el-carousel indicator-position="outside" height="150px">
      <el-carousel-item v-for="(v,k) in slider" :key="k">
        <img :src="v.picUrl" alt>
      </el-carousel-item>
    </el-carousel>
    <!-- 轮播图 E -->
    <!-- 热门歌曲推荐 S -->
    <div class="recommend-list" ref="wrapper">
      <h1 class="list-title">热门歌单推荐</h1>
      <ul>
          <li v-for="item in discList" class="item" :key="item.key">
              <div class="icon">
                <img :src="item.imgurl" width="60" height="60" alt="">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
          </li>
      </ul>
      <div class="loading-wrapper"></div>
    </div>
    <!-- 热门歌曲推荐 E -->
  </div>
</template>
<style lang="less" scoped>
.el-carousel {
  overflow-x: hidden;
  position: relative;
  margin-top: 20px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.recommend-list .list-title {
    height: 65px;
    line-height: 40px;
    text-align: center;
    font-size: 1rem;
    color: #eeba0e;
}
.recommend-list {
    .list-title{
      height: 65px;
      line-height: 65px;
      text-align: center;
      font-size: 1rem;
      color: #fff;
  }
  .item{
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0 20px 20px 20px;
    .icon{
      flex: 0 0 60px;
      width: 60px;
      padding-right: 20px;
    }
    .text{
       display: flex;
       flex-direction: column;
       justify-content: center;
       flex: 1;
       line-height: 20px;
       overflow: hidden;
       font-size: 0.7rem;
       .name{
          margin-bottom: 10px;
          color: #fff;
       }
       .desc{
         color: #bcb7b7;
       }
    }
  }
}
</style>

<script>
// api 接口
import { getRecommend,getDiscList} from "../../api/recommend";
import { ERR_OK } from "../../api/config";
 import BScroll from 'better-scroll'
export default {
  data() {
    return {
      // 轮播图
      slider: [],
      // 热门推荐
      discList: []
    };
  },
  created() {
    this._getRecommend();
    this._getDiscList();
    this.loadData();
  },
  methods: {
    // 轮播图
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.slider = res.data.slider;
          // console.log(this.slider);
        }
      });
    },
    // 热门推荐列表
    _getDiscList() {
      getDiscList().then(res => {
        // console.log(res.data);
        if (res.code === ERR_OK) {
          this.discList = res.data.list;
          console.log(this.discList);
        }
      });
    },
    // 懒加载
    loadData(){

    }
  }
};
</script>
