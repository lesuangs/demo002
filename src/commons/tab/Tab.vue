<template>
  <div class="tab-head">
    <template v-for="(v, i) in tabList">
      <span @click="$emit('tabClick',i)"
            :class="[tabActive == i ? 'active' : '']"
            :key="i">
        {{ $t(v) }}
      </span>
    </template>
    <div class="tab-rg" v-if="tabActive===0">
      <!--  彩种折叠  -->
      <i class="icon iconfont iconic-menu" v-if="ListType===1" @click="$emit('typeClick')"></i>
      <i class="icon iconfont iconliebiao" v-else @click="$emit('typeClick')"></i>

      <!-- <img v-if="ListType===1" @click="$emit('typeClick')" :src="require(`../../assets/img/caidan.png`)"/>-->
      <!--      <img v-else @click="$emit('typeClick')" :src="require(`@/assets/themes/hjb/black/shape.svg`)"/>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Tab',
    props: {
      tabList: Array,
      tabActive: Number,
      ListType: Number
    }
  }
</script>

<style lang="scss" scoped>
  .tab-head {
    display: flex;
    width: 100%;
    height: 1rem;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 0.36rem;
    color: #fff;
    flex-shrink: 0;

    .tab-rg {
      position: absolute;
      width: 25px;
      /*height: 25px;*/
      right: 15px;

      img {
        width: .32rem;
        height: .32rem;
        vertical-align: middle;
      }
    }

    span {
      width: 0.8rem;
      padding: 0.06rem 0;
      margin: 0 0.4rem;
      opacity: 0.6;
      text-align: center;
    }

    .active {
      opacity: 1;
      border-bottom: 2px solid #fff;
    }
  }
</style>
