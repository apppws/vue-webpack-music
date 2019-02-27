<template>
  <ul class="switches">
    <li
      class="switch-item"
      v-for="(item,index) in switches"
      :key="item.index"
      :class="{'active':currentIndex === index}"
      @click="switchItem(index)"
    >
      <span>{{item.name}} </span>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      switches: {
        type: Array,
        default: []
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      switchItem(index) {
        this.$emit('switch', index)
      }
    }
  }
</script>

<style scoped lang="less">
  .switches{
     display: flex;
    align-items: center;
    width: 240px;
    margin: 0 auto;
    border: 1px solid cadetblue;
    border-radius: 5px;
    .switch-item{
      flex: 1;
      padding: 8px;
      text-align: center;
      font-size: 1rem;
      color: blanchedalmond;
      &.active{
        background: blue;
        color: gold;
      }

    }

  }

</style>
