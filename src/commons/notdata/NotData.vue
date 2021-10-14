<template>
<!--  <div class="m-no-data not-data-box" :class="isNotData?'noData':''">
    <div v-if="isNotData">
      <van-loading type="spinner" color="#222222"/>
    </div>
    <div v-else>
      <img :src="require('@/assets/themes/hjb/black/fangdajing.png')"/>
      <p class="text">{{ $t('lang.common.noData') }}</p>
    </div>
  </div>-->
  <div class="m-no-data not-data-box" :class="isNotData?'noData':''">
    <div v-if="isNotData" class="not-data-wrap">
      <van-loading type="spinner" color="#222222"/>
    </div>
    <div v-else class="not-data-wrap">
      <span class="noImgBg"></span>
      <!--      <img :src="require('@/assets/themes/hjb/black/fangdajing.png')"/>-->
      <p class="text">{{ $t('lang.common.noData') }}</p>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'NotData',
  props: {
    isNotData: Boolean
  }
}
</script>
<style lang="scss" scoped>
  .not-data-box{
    width:100%;
    height:100%;
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .noImgBg{
      display: inline-block;
      width:px2rem(230px);
      height:px2rem(190px);
      @include bg-image('../../assets/themes/hjb/black/fangdajing');
      background-size: contain;
    }
    .text{
      color:#6a6a6d;
    }
    .text{
      margin-top: px2rem(25px);
      font-size:px2rem(14px);
      text-align: center;
    }

  }
  .skin-gray{

  }

</style>
