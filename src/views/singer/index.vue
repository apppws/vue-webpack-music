<template>
  <div class="singer" ref="singer">
    <singer-list :data="singers" @select="selectSinger" ref="list"></singer-list>
    <router-view></router-view>
  </div>
</template>
<script>
 import { getSingerList } from '../../api/singer'
 import { ERR_OK } from "../../api/config"
 import Singer from "../../assets/js/singer"
 import SingerList from "../../functions/singerList"
 import { mapMutations } from 'vuex'
 import { playListMixin } from '../../assets/js/mixin'
 const HOT_SINGER_LEN = 10
export default {
  mixins: [playListMixin],
  data(){
    return {
        singers:[]
    }
  },
  components:{
    SingerList
  },
  created() {
    this._getSingList()
  },
  methods: {
    handlePlayList(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
    _getSingList(){
      getSingerList().then((res)=>{
          if(res.code == ERR_OK){
            this.singers = this._normailzeSinger(res.data.list)
          }
      })
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    // 格式化数据
    _normailzeSinger(list){
      let map = {
        hot:{
          title:"热门",
          items:[]
        }
      }
      list.forEach((item,index) => {
        // console.log(item)
          // 如果小于热门的数量 就把前十个数据 push到热门的items 的数据中
          if(index<HOT_SINGER_LEN){
            // 添加数据
            map.hot.items.push(new Singer({
                id:item.Fsinger_mid,
                name:item.Fsinger_name
            }))
          }
              // key为歌手的姓名
          const key = item.Findex
          // console.log(map)
          // 如果map中没有key
          if(!map[key]){
              // 那map创建一个对象 键为key 值为一个对象
              map[key] = {
                  title:key,
                  items:[]
              }
          }
          // 这个key对应的 id  和 name
          map[key].items.push(new Singer({
              id:item.Fsinger_mid,
              name:item.Fsinger_name
          }))
      })
      //为了想要获取想要的数据结构
      let  hot = []
      let res = []
      for(let key in map){
          let val = map[key]
          //  console.log(val)
          // 如果key是a到z的话 就 push到res数组中
          if(val.title.match(/[a-zA-Z]/)){
              res.push(val)
          }else if(val.title=="热门"){
            // 否则push到hot中
              hot.push(val)
          }
      }
      // 排序  res 的数组进行排序
      res.sort((a,b)=>{
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      // 两个数组合并
      return hot.concat(res)

    },
     selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      }

  },
}
</script>

<style lang="less">
  // .singer{
  //   position: absolute;
  //   top: 88px;
  //   bottom: 0;
  //   width: 100%;
  // }

</style>

