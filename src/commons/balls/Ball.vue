<template>
  <div class="ssc-style" :class="{'klc': lotteryId === '23'}">
    <template v-for="(n, a) in listData">
      <span class="ball ball-red default" :key="a">
        {{n}}
      </span>
    </template>
  </div>
</template>
<script>
  export default {
    name: "Ball",
    data() {
      return {
        lotteryId: ''
      };
    },
    props: {
      openNum: String,
      // gameType: {
      //   type: String,
      //   default: ''
      // },
      isBig: {
        type: Boolean,
        default: false,
      },
      // lotteryId: {
      //   type: String,
      //   default: ""
      // }
    },
    computed: {
      listData() {
        const openNum = this.openNum?this.openNum.split(",") : [0, 0, 0, 0, 0];
        return openNum
      }
    },
    created () {
      this.lotteryId = this.$route.query.lotteryId
      console.log(this.lotteryId)
    }
  };
</script>
<style lang="scss" scoped>
  .ssc-style {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .ball {
      border-radius: 50%;
      margin: 0.04rem;
      width: 0.5rem;
      height: 0.5rem;
      text-align: center;
      line-height: 0.5rem;
      font-size: 0.3rem;
      color: #fff;
      font-weight: 500;
    }
    .ball-red {
      background-color: #f11717;
    }
  }
  /* 快乐8样式修复 */
  .klc {
    width: 100% ;
    padding-top: .1rem;
    padding-left: .2rem;
  }
</style>
