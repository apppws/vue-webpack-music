<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder"/>
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
  </div>
</template>

<script>
  import {debounce} from '../../assets/js/util'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      clear() {
        this.query = ''
      },
      setQuery(query) {
        this.query = query
      },
      blur() {
        this.$refs.query.blur()
      }
    },
    created() {
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 200))
    }
  }
</script>

<style scoped lang="less">
  .search-box{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px;
    height: 40px;
    background: #5950a8;
    border-radius: 6px;
    .icon-search{
       font-size: 24px;
       color: #fff;
    }
    .box{
       flex: 1;
      margin: 0 5px;
      line-height: 18px;
      background: #161111;
      color:#fff;
      font-size: 1rem;
      &::placeholder{
        color: red;
      }
    }
    .icon-dismiss{
      font-size: 16px;
      color: blue;
    }

  }

</style>
