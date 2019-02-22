<template>
<div class="loading">
<img src="../assets/images/Spinner.gif" width="64" height="64">
<p class="desc">{{title}}</p>
</div>
</template>
<script>
export default {
    props:{
        title:{
        type:String,
        default:'载入中'
        }
    }
}
</script>
<style scoped>
  .loading{
    width: 100%;
    text-align: center;
  }
  .desc{
    line-height: 20px;
      font-size:0.9rem;
      color:#cdcdcd;
  }


</style>
