<template>
  <div class="option"
       :class="{scOp: lotteryName === 'pk10' || lotteryName === 'ks'|| lotteryName === 'ssc' || lotteryName === '11x5' || lotteryName === 'fc3d'}">
    <!-- PK10定位胆 -->
    <ul v-if="lotteryName === 'pk10' || lotteryName === '11x5'" class="clearfix">
      <li @click="$emit('betConfig', 'qu', keys)">全</li>
      <li @click="$emit('betConfig', 'big', keys)">大</li>
      <li @click="$emit('betConfig', 'small', keys)">小</li>
      <li @click="$emit('betConfig', 'single', keys)">单</li>
      <li @click="$emit('betConfig', 'double', keys)">双</li>
      <li @click="$emit('clearPK10', keys)">清</li>
    </ul>
    <!-- 其它 -->
    <ul v-else class="clearfix">
      <li @click="$emit('betConfig', 'qu')">全</li>
      <li @click="$emit('betConfig', 'big')">大</li>
      <li @click="$emit('betConfig', 'small')">小</li>
      <li @click="$emit('betConfig', 'single')">单</li>
      <li @click="$emit('betConfig', 'double')">双</li>
      <li v-if="lotteryName === 'ssc'"
          @click="$emit('betConfig', 'clear')">清</li>
      <li v-else @click="$EventBus.$emit('clearCode')">清</li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      lotteryName: String,
      keys: Number
    }
  }
</script>
<style lang="scss" scoped>
  .skin-gray{
    .option {
      ul {
        border: 1px solid #605c7b;
        background-color: #38364A;
        li {
          color: #9a9aa7;
          border-right: 1px solid #605c7b;
        }
      }
    }
  }
  .skin-black{
    .option {
      ul {
        border: 1px solid #605c7b;
        background-color: #2D2E35;
        li {
          color: #9fa7b3;
          border-right: 1px solid #605c7b;
        }
      }
    }
  }
  .option {
    font-size: 0.28rem;
    width: 100%;
    ul {
      display: flex;
      width: 100%;
      border: 1px solid #605c7b;
      border-radius: 5px;
      background-color: #38364A;
      li {
        flex: 1;
        text-align: center;
        height: 25px;
        line-height: 25px;
        color: #9a9aa7;
        border-right: 1px solid #605c7b;
        &:last-child{
          border-right: none;
        }
        /*float: left;*/
        /*width: 16.6%;*/
        /*line-height: 0.45rem;*/
      }
    }
  }
  .scOp {
    /*padding: .1rem 0 0 .4rem;*/
  }
</style>
