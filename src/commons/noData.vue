<template>
  <div class="no-data-wrapper">
    <img :src="require('@/assets/themes/hjb/black/fangdajing.png')"/>
    <p class="text">{{ $t('lang.common.noData') }}</p>
  </div>
</template>

<script>
  export default {
    name: "noData"
  }
</script>

<style scoped lang="scss">
  .no-data-wrapper{
    text-align: center;
    font-size: 0.3rem;
    color: $skin-gray-text-color;
    img{
      width: 100%;
    }
  }
</style>
