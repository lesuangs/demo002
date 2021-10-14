<template>
  <div class="pks-style">
    <template v-for="(v,i) in listData">
      <span :key="i" :class="['ball', `ball-pk10_${v}`, 'default']"></span>
    </template>
  </div>
</template>
<script>
export default {
  name: "PkBall",
  data() {
    return {};
  },
  props: {
    openNum: String,
    isBig: {
      type: Boolean,
      default: false,
    },
  },
  created() {
  },
  computed: {
    listData() {
      if (this.openNum) {
        // console.log(this.openNum,'pk ball');
        let openNum = this.openNum.split(',')
        let list = []
        openNum.forEach(element => {
          element = element.length < 2 ? "0" + element : element
          list.push(element)
        });
        return list
      } else {
        // console.error("this.openNum为空,注意处理", this.openNum);
      }
      return [];
    }
  },
  methods: {},
};
</script>
<style lang="scss" scpend>
.pks-style {
  margin: 0.08rem 0;

  .ball {
    display: inline-block;
    border-radius: 0.02rem;
    margin: 0.04rem;
    width: 0.41rem;
    height: 0.41rem;
    text-align: center;
    line-height: 0.34rem;
    font-size: 0.24rem;
    color: #fff;
    background-size: 100% 100%;
  }

  /* .small-ball {
    width: 0.34rem;
    height: 0.34rem;
    line-height: 0.34rem;
    font-size: 0.2rem;
  } */
  .ball-pk10_01 {
    background-image: url('../../assets/img/lottery/pk10/pk10_1.png');
  }

  .ball-pk10_02 {
    background-image: url('../../assets/img/lottery/pk10/pk10_2.png');
  }

  .ball-pk10_03 {
    background-image: url('../../assets/img/lottery/pk10/pk10_3.png');
  }

  .ball-pk10_04 {
    background-image: url('../../assets/img/lottery/pk10/pk10_4.png');
  }

  .ball-pk10_05 {
    background-image: url('../../assets/img/lottery/pk10/pk10_5.png');
  }

  .ball-pk10_06 {
    background-image: url('../../assets/img/lottery/pk10/pk10_6.png');
  }

  .ball-pk10_07 {
    background-image: url('../../assets/img/lottery/pk10/pk10_7.png');
  }

  .ball-pk10_08 {
    background-image: url('../../assets/img/lottery/pk10/pk10_8.png');
  }

  .ball-pk10_09 {
    background-image: url('../../assets/img/lottery/pk10/pk10_9.png');
  }

  .ball-pk10_10 {
    background-image: url('../../assets/img/lottery/pk10/pk10_10.png');
  }
}
</style>
