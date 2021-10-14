<template>
  <div class="ball-style">
    <LhcBall v-if="gameType === 'lhc'"
             :isBig="isBig"
             :openNum="openNum"
             :shengxiList="shengxiList"/>
    <K3Ball v-else-if="gameType === 'k3'"
            :isBig="isBig"
            :openNum="openNum"
            :colors="colors"/>
    <PkBall v-else-if="gameType === 'pk10'"
            :isBig="isBig"
            :openNum="openNum"/>
    <ul v-else-if="gameType === 'pcdd'" class="pcdd-wrapper">
      <li><span :class="PCDD_ballClass(openNumber[0])">{{openNumber[0]}}</span></li>
      <li><em>+</em></li>
      <li><span :class="PCDD_ballClass(openNumber[1])">{{openNumber[1]}}</span></li>
      <li><em>+</em></li>
      <li><span :class="PCDD_ballClass(openNumber[2])">{{openNumber[2]}}</span></li>
      <li><em>=</em></li>
      <li><span :class="PCDD_ballClass(total)">{{total}}</span></li>
    </ul>
    <Ball v-else :isBig="isBig" :openNum="openNum"/>

  </div>
</template>
<script>
  import {PCDD_colorBall} from '../../utils/common'
  import LhcBall from "./LhcBall";
  import K3Ball from "./K3Ball";
  import PkBall from "./PkBall";
  import Ball from "./Ball";

  export default {
    name: "BallAll",
    components: {
      LhcBall,
      K3Ball,
      PkBall,
      Ball,
    },
    data() {
      return {
        shengxiList: [],
      }
    },
    props: {
      openNum: {
        type: String,
        default: '',
      },
      isBig: {
        type: Boolean,
        default: false,
      },
      gameType: {
        type: String,
        default: '',
      },
      colors: {
        type: Boolean,
        default: false,
      }
    },
    created() {
      // this.getLhcDraw()
    },
    computed: {
      openNumber() {
        if (this.gameType === 'pcdd' && this.openNum) {
          let str = this.openNum;
          let arr = str.split(',');
          // console.log(arr,'arrarrarr');
          return arr
        } else {
          return []
        }
      },
      total() {
        if (this.gameType === 'pcdd' && this.openNum) {
          let str = this.openNum;
          let arr = str.split(',');
          let sum = 0;
          arr.forEach((val) => {
            sum += Number(val);
          }, 0);
          return sum;
        } else {
          return 0;
        }
      }
    },
    mounted() {
    },
    methods: {
      PCDD_ballClass(num) {
        let colorBall = PCDD_colorBall;
        let number = Number(num);
        if (colorBall.red.includes(number)) {
          return 'red-ball'
        } else if (colorBall.green.includes(number)) {
          return 'green-ball'
        } else if (colorBall.blue.includes(number)) {
          return 'blue-ball'
        } else if (colorBall.gray.includes(number)) {
          return 'gray-ball'
        }
      },
      //获取到生肖规则
      getLhcDraw() {
        const shengxiList = JSON.parse(localStorage.getItem("SXS_N")) || "";
        // console.log(shengxiList,'shengxiList3333333333333333')
        if (shengxiList.length > 0) {
          this.shengxiList = shengxiList;
        } else {
          this.$http.home.getLhc().then((res) => {
            localStorage.setItem("SXS_N", JSON.stringify(res.data));
            this.shengxiList = res.data;
          });
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
  .ball-style {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    .k-three {
      margin-top: 0.1rem;
    }
    ul.pcdd-wrapper {
      display: flex;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          width: 0.5rem;
          height: 0.5rem;
          text-align: center;
          line-height: 0.5rem;
          font-size: 0.3rem;
          color: #fff;
          font-weight: 500;
          border-radius: 50%;
          &.red-ball {
            background-color: #f11717;
          }
          &.green-ball {
            background-color: #38BE4F;
          }
          &.blue-ball {
            background-color: #3f8feb;
          }
          &.gray-ball {
            background-color: #A3A3A3;
          }
        }
        em{
          margin: 0 0.1rem;
        }
      }
    }
  }
</style>
