<template>
  <div class="main-info">
    <div class="recently"
         @click="$emit('showClick')">
      <p :class="isHistory ? 'rotate' : ''"
         class="normal">
        {{lotteryItem.name}}-{{$t('lang.lottery.issueInfo[0]')}}{{preTurn}}{{$t('lang.lottery.issueInfo[2]')}}</p>
      <BallAll :openNum="openNum" :gameType="lotteryItem.type" class="ball-type"/>
    </div>
    <div class="count-down">
      <p class="issue" v-if="turnNum.length > 3">
        {{$t('lang.lottery.issueInfo[1]')}} {{turnNum.substr(2)}} {{$t('lang.lottery.issueInfo[2]')}}
      </p>
      <p class="issue" v-else>
        {{$t('lang.lottery.issueInfo[1]')}} {{turnNum}} {{$t('lang.lottery.issueInfo[2]')}}
      </p>
      <div class="time">
        <div class="countdown opening"
             v-if="isTimer">
          <div class="lang-china"
               v-if="$i18n.locale === LANG.china">
            <span>开</span>:<span>奖</span>:<span>中</span>
          </div>
          <div class="lang-english" v-else>
            <span>Drawing...</span>
          </div>
        </div>
        <van-count-down v-else :time="closeTime" format="HH:mm:ss" @finish="finish">
          <template v-slot="timeData" >
            <div class="countdown">
              <span>{{(timeData.days*24+timeData.hours)<10?'0'+(timeData.days*24+timeData.hours):(timeData.days*24+timeData.hours)}}</span>:
              <span>{{timeData.minutes<10?'0'+timeData.minutes:timeData.minutes}}</span>:
              <span>{{timeData.seconds<10?'0'+timeData.seconds:timeData.seconds}}</span>
            </div>
          </template>
        </van-count-down>
        <!--<div class="loading-number" v-if="isTimer">-->
          <!--<span>开</span>-->
          <!--<i>:</i>-->
          <!--<span>奖</span>-->
          <!--<i>:</i>-->
          <!--<span>中</span>-->
        <!--</div>-->
        <!--<span v-if="isTimer">00:00:00</span>-->

<!--        <van-count-down v-else :time="closeTime"-->
<!--                        @finish="finish" class="num-font"/>-->
      </div>
    </div>
  </div>
</template>
<script>
  import BallAll from '../../../commons/balls/BallAll'
  import {LANG} from "../../../utils/mode";

  export default {
    name: 'LotteryTop',
    data() {
      return {
        LANG: LANG,
        isTimer: false,
      }
    },
    props: {
      isHistory: Boolean,
      openNum: {
        type: String,
        default: ""
      },
      shengxiList: Array,
      turnNum: String,
      closeTime: Number,
      preTurn: String,
      lotteryId: String,
      lotteryItem: {
        type: Object,
        default: {}
      },
    },
    components: {
      BallAll
    },
    created() {
      if (this.closeTime === 0) {
        this.isTimer = true
      }
    },
    methods: {
      finish() {
        this.isTimer = true
        this.$emit('finish')
      }
    },
    watch: {
      closeTime() { // 监听游戏期数
        if (this.closeTime > 0) {
          this.isTimer = false
        }
      }
    },
    mounted() {
      // console.log(this.lotteryId)
    }
  }
</script>
<style lang="scss" scoped>
  .skin-gray {
    .main-info {
      background: #4C4965;
      color: #fff;
      .count-down {
        border-left: 1px solid #5D5B71;
      }
    }
  }

  .skin-black {
    .main-info {
      background: #24252D;
      color: #fff;
      .count-down {
        border-left: 1px solid #2D2E33;
      }
    }
  }

  .main-info {
    display: flex;
    min-height: 1.5rem;
    align-items: center;
    justify-content: space-between;
    .recently {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      /*justify-content: center;*/
      flex: 1;
      .normal {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        width: 100%;
        font-size: 0.26rem;
        height: 0.5rem;
        /*line-height: 0.5rem;*/
      }
      .ball-type {
        min-height: 1rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

    }
    .count-down {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 0 0 2.6rem;
      height: 0.96rem;
      /*border-left: 1px solid #e5e5e5;*/
      /deep/ .van-count-down {
        /*color: #fff;*/
        /*font-size: 0.6rem;*/
        margin-top: 0.1rem;
      }
      .issue {
        height: .26rem;
        line-height: .26rem;
        font-size: 12px;
      }
      .time {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        width: 100%;
        height: 1.1rem;
        .countdown{
          div{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            /*height: 100%;*/
            /*span {*/
            /*  font-size: 16px;*/
            /*  color: #ff2525;*/
            /*  width: 28px;*/
            /*  height: 28px;*/
            /*  line-height: 28px;*/
            /*  border: solid 1px #605c7b;*/
            /*  background-color: #38364a;*/
            /*  border-radius: 4px;*/
            /*  -webkit-backdrop-filter: blur(18px);*/
            /*  backdrop-filter: blur(18px);*/
            /*  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);*/
            /*  text-align: center;*/
            /*  display: flex;*/
            /*  justify-content: center;*/
            /*}*/
            /*i {*/
            /*  width: 10px;*/
            /*  height: 28px;*/
            /*  line-height: 28px;*/
            /*  color: #605c7b;*/
            /*  font-size: 20px;*/
            /*  font-weight: bold;*/
            /*}*/
            /*&.lang-english{*/
            /*  span{*/
            /*    width: auto;*/
            /*  }*/
            /*}*/
          }
        }

      }
      .num-font {
        font-family: numberfont !important;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }

  }
</style>
