<template>
<div class="recommend" ref="recommend">
  <Scroll class="recommend-conent" :data="discList" ref="scroll">
        <div>
        <!-- 轮播图 S -->
                <el-carousel indicator-position="outside" height="150px">
                  <el-carousel-item v-for="(v,k) in slider" :key="k">
                    <img :src="v.picUrl" alt>
                  </el-carousel-item>
                </el-carousel>
                <!-- 轮播图 E -->
                <!-- 热门歌曲推荐 S -->
                <div class="recommend-list" >
                  <h1 class="list-title">热门歌单推荐</h1>
                  <ul>
                      <li v-for="item in discList" class="item" :key="item.key" @click="selectItem(item)">
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
        </div>
        <!-- 热门歌曲推荐 E -->
        <!-- 正在加载中 -->
      <div class="loading-container" v-show="!discList.length">
          <loading></loading>
      </div>
    </Scroll>
    <router-view></router-view>
</div>
</template>
<style lang="less" scoped >
.recommend{
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .recommend-conent{
    height: 100%;
    overflow: hidden;
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
      .loading-container{
            position:absolute;
            width:100%;
            top :50%;
            transform :translateY(-50%);
            }

    }
}

</style>

<script>
// api 接口
 import Loading from '../../functions/loading'
import { getRecommend,getDiscList} from "../../api/recommend";
import { ERR_OK } from "../../api/config";
import Scroll from "../../functions/scroll"
import loading from "../../functions/loading"
import { playListMixin } from '../../assets/js/mixin'
import { mapMutations } from 'vuex'
export default {
  mixins: [playListMixin],
  components:{
    Scroll,
    loading
  },
  data() {
    return {
      // 轮播图
      slider: [],
      // 热门推荐
      discList: []
    };
  },
  created() {
    setTimeout(()=>{
         this._getRecommend()
      },1000)
    this._getDiscList();
  },
  methods: {
    handlePlayList(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      loadImage() {
        if (!this.checkedload) {
          this.$refs.scroll.refresh()
          this.checkedload = true
        }
      },
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
          // console.log(this.discList);
        }
      });
    },
     selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })
  }
};
</script>


