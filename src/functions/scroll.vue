<template>
  <div ref="wrapper">
  <slot></slot>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  props:{
    // 1 滚动的时候会派发scroll事件 会截留
    // 2 滚动的时候实时派发scroll事件  不会截留
    // 3 除了实时派发scroll事件 在swipe的情况下任然实时派发scroll事件
    probeType:{
      type:Number,
      default:1
    },
    //点击列表是否派发click事件
    click:{
      type: Boolean,
      default: true
    },
    /**
       * 是否开启横向滚动
       */
      scrollX: {
        type: Boolean,
        default: false
      },
       /**
       * 是否派发滚动事件
       */
      listenScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 列表的数据
       */
      data: {
        type: Array,
        default: null
      },
      /**
       * 是否派发滚动到底部的事件，用于上拉加载
       */
      pullup: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
      pulldown: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发列表滚动开始的事件
       */
      beforeScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 当数据更新后，刷新scroll的延时。
       */
      refreshDelay: {
        type: Number,
        default: 20
      }
  },
  // 页面数据刷新完之后执行的
  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
      setTimeout(() => {
        this._initScroll()
      }, 20)
  },
  methods: {
    _initScroll(){
      // 如果还没有数据  就返回 这样不会报错
      if(this.$refs.wrapper){
        return
      }
      // 创建一个scroll的属性 生成Bscroll 实例
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        click:this.click
      })
      if (this.listenScroll) {
          let _this = this
          this.scroll.on('scroll', pos => {
            // 派发事件获取pos 值
            _this.$emit('scroll', pos)
          })
        }
        // 上拉刷新
        if (this.pullUp) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

        // 开始滚动前判断
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
    },
    enable(){
      // 启用better-scroll 默认开启
      this.scroll && this.scroll.enable()
    },
     disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
  },
  watch: {
    data(){
        setTimeout(()=>{
        this.refresh()
        },this.refreshDelay)
    }
  },
}
</script>
