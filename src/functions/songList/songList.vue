<template>
  <div class="song-list">
    <ul>
      <li
        @click="selectItem(song, index)"
        class="item"
        v-for="(song, index) in songs"
        :key="song.key"
      >
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)" v-text="getRankText(index)"></span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      selectItem(item, index) {
        this.$emit('select', item, index)
      },
      getDesc(song) {
        return `${song.singer}·${song.album}`
      },
      getRankCls(index) {
        if (index <= 2) {
          return `icon icon${index}`
        } else {
          return 'text'
        }
      },
      getRankText(index) {
        if (index > 2) {
          return index + 1
        }
      }
    }
  }
</script>

<style scoped lang="less">

  .song-list{
    .item{
        display: flex;
          align-items: center;
          box-sizing: border-box;
          height: 64px;
          font-size: 0.8rem;
    }
      .rank{
        flex: 0 0 25px;
        width: 25px;
        margin-right: 30px;
        text-align: center;
         .icon{
          display: inline-block;
          width: 25px;
          height: 24px;
          background-size: 25px 24px;
          &.icon0{
             background: url(./first@2x.png) no-repeat 0px 0px;
             background-size: 100% 100%;
          }
          &.icon1 {
            background: url(./second@2x.png) no-repeat 0px 0px;
             background-size: 100% 100%;
            }
          &.icon2
            {
              background: url(./third@2x.png) no-repeat 0px 0px;
             background-size: 100% 100%;
            }
        }
        .text{
          color: cornflowerblue;
          font-size:1rem;
        }
      }
    .content{
      flex: 1;
        line-height: 20px;
        overflow: hidden;
        .name{
          color: #d1c3ce;
        }
        .desc{
          margin-top: 4px;
          color:#cdcdcd;
        }

    }



  }

</style>
