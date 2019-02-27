<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
        </div>
        <scroll
          class="list-content"
          :data="sequenceList"
          ref="listContent"
          :refreshDelay="refreshDelay"
        >
          <transition-group tag="ul" name="list">
            <li
              class="item"
              v-for="(item, index) in sequenceList"
              :key="item.id"
              @click="selectiItem(item, index)"
              ref="listItem"
            >
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text"> {{item.name}} </span>
              <span @click.stop="toggleFavorite(item)" class="like">
                <i :class="getFavoriteIcon(item)"></i>
              </span>
              <span class="delete" @click.stop="deteleOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="add" @click="addSong">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click="hide()">
          <span>关闭</span>
        </div>
      </div>
      <confirm
        text="是否清空播放列表"
        @confirm="confirmClear"
        ref="confirm"
        confirmBtnText="清空"
      >
        </confirm>
      <!-- <add-song ref="addSong"></add-song> -->
    </div>
  </transition>
</template>
<script>
  import { mapActions } from 'vuex'
  import Scroll from '../scroll'
  import { playMode } from '../../assets/js/config'
  import Confirm from '../confirm/confirm'
  import { playerMixin } from '../../assets/js/mixin'
  import AddSong from '../../components/addSong/addSong'
  export default {
    mixins: [playerMixin],
    data() {
      return {
        showFlag: false,
        refreshDelay: 100
      }
    },
    components: {
      Scroll,
      Confirm,
      AddSong
    },
    computed: {
      modeText() {
        return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
      }
    },
    methods: {
      ...mapActions([
        'deleteSong',
        'deleteSongList'
      ]),
      deteleOne(item) {
        this.deleteSong(item)
        if (!this.playList.length) this.hide()
      },
      show() {
        this.showFlag = true
        setTimeout(() => {
          this.$refs.listContent.refresh()
          this.scrollToCurrent(this.currentSong)
        }, 20)
      },
      hide() {
        this.showFlag = false
      },
      getCurrentIcon(item) {
        if (this.currentSong.id === item.id) return 'icon-play'
        return ''
      },
      selectiItem(item, index) {
        if (this.mode === playMode.random) {
          index = this.playList.findIndex((song) => {
            return song.id === item.id
          })
        }
        this.setCurrentIndex(index)
        this.setPlayingState(true)
      },

      showConfirm() {
        this.$refs.confirm.show()
      },
      confirmClear() {
        this.deleteSongList()
        this.hide()
      },
      // 打开播放列表滚动到当前播放歌曲的位置
      scrollToCurrent(current) {
        const index = this.sequenceList.findIndex((song) => {
          return current.id === song.id
        })
        this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300)
      },

      addSong() {
        this.$refs.addSong.show()
      }
    },
    // 歌曲切换成功 执行ScrollToCurrent
    watch: {
      currentSong(newSong, oldSong) {
        if (!this.showFlag || newSong.id === oldSong.id) {
          return
        }
        setTimeout(() => {
          this.scrollToCurrent(newSong)
        }, 20)
      }
    }
  }
</script>
<style scoped lang="less">
  .playlist{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    background-color: #000;
    &.list-fade-enter-active, &.list-fade-leave-active{
      transition: opacity 0.3s;
        .list-wrapper{
            transition: all 0.3s;
        }
    }
    &.list-fade-enter, &.list-fade-leave-to{
      opacity: 0;
            .list-wrapper{
              transform: translate3d(0, 100%, 0)
            }
      }
    &.list-fade-enter
    .list-wrapper{
        position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: #cdcdcd;
      .list-header{
         position: relative;
        padding: 20px 30px 10px 20px;
        .title{
            display: flex;
          align-items: center;
          .icon{
             margin-right: 10px;
            font-size: 30px;
            color: yellow;
            .text{
              flex: 1;
              font-size: 1rem;
              color: red;
            }
            .clear{
              .icon-clear{
                font-size: 1rem;
                color: blue;
              }
            }
          }
        }
      }
      .list-content{
         max-height: 240px;
        overflow: hidden;
        .item{
           display: flex;
          align-items: center;
          height: 40px;
          padding: 0 30px 0 20px;
          overflow: hidden;
          &.list-enter-active, &.list-leave-active{
            transition: all 0.1s
          }
          &.list-enter, &.list-leave-to{
            height: 0
          }
          .current{
            flex: 0 0 20px;
            width: 20px;
            font-size: 0.5rem;
            color: yellow;
          }
          .text{
            flex: 1;
            font-size: 1rem;
            color: blue;
          }
          .like{
            margin-right: 15px;
            font-size: 0.5rem;
            color: yellow;
            .icon-favorite{
              color: red
            }
          }
          .delete{
            font-size: 0.5rem;
            color: yellow;
          }
        }
      }
      .list-operate{
        width: 140px;
        margin: 20px auto 30px auto;
        .add{
          display: flex;
          align-items: center;
          padding: 8px 16px;
          border: 1px solid red;
          border-radius: 100px;
          color: red;
          .icon-add{
            margin-right: 5px;
            font-size:1rem;
          }
          .text{
            font-size: 0.8rem
          }
        }
      }
      .list-close{
        text-align: center;
        line-height: 50px;
        background: #000;
        font-size: 1.1rem;
        color: red;
      }
    }
  }

</style>
