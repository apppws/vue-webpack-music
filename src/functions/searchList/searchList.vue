<template>
  <div class="search-list" v-show="searches.length">
    <transition-group name="list" tag="ul">
      <li
        class="search-item"
        @click="selectItem(item)"
        v-for="item in searches"
        :key="item"
      >
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
  export default {
    props: {
      searches: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
      },
      deleteOne(item) {
        this.$emit('delete', item)
      }
    }
  }
</script>

<style scoped lang="less">
  .search-list{
    .search-item{
      display: flex;
      align-items: center;
      height: 40px;
      overflow: hidden;
      &.list-enter-active, &.list-leave-active{
        transition: all 0.1s
      }
      &.list-enter, &.list-leave-to{
        height: 0
      }
      .text{
        flex: 1;
        color: violet;
      }

      .icon{
        .icon-delete{
          font-size: 0.8rem;
          color: rebeccapurple;
        }

      }

    }

  }

</style>
