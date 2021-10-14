<template>
  <div class="loading-wrapper">
    <van-loading type="spinner" size="30px"></van-loading>
  </div>
</template>

<script>
  export default {
    name: "loading"
  }
</script>

<style scoped lang="scss">
  .loading-wrapper{
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
