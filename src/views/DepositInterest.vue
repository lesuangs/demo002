<template>
  <div class="deposit-interest">
    <header class="header">
      <div class="left" @click="$router.push('/user')">
        <van-icon name="arrow-left" size=".4rem"/>
      </div>
      <div class="middle">
        <h1 class="fs-36">余额生金</h1>
      </div>
      <div class="right">
        <van-icon name="question-o" size=".4rem" class="right-question" @click="$router.push('/instructions')"/>
        <van-icon name="balance-list" size=".4rem" @click="$router.push('/depositDetails')"/>
      </div>
    </header>
    <div class="g-header">
      <div class="income-yesterday">
        <h3  class="income-title">昨日收益 (元)</h3>
        <van-icon :name="eyesType" color="#fff" size="16" @click="handleEyes"/>
      </div>
      <h2  class="amount">{{eyesType === 'closed-eye' ? '＊＊＊＊' : 0}}</h2>
      <p  class="balance">可提现总金额 {{eyesType === 'closed-eye' ? '＊＊＊＊' : '0.00'}} 元</p>
    </div>
    <div class="body">
      <ul class="statistics-box">
        <li class="block">
          <h3 class="statistics-title">累计收益(元)</h3>
          <h2 class="statistics-amount">{{eyesType === 'closed-eye' ? '＊＊＊＊' : '0.000'}}</h2>
        </li>
        <li class="block">
          <h3 class="statistics-title">基准收益率 (%)</h3>
          <h2 class="statistics-amount">0</h2>
        </li>
        <li class="block">
          <h3 class="statistics-title">优惠收益率 (%)</h3>
          <h2 class="statistics-amount">0</h2>
        </li>
      </ul>
      <div class="expectation-box">
        <div class="expected-income">
          <van-image width="3.4rem" lazy-load src="https://sp-res-wap.ftfxgame.com/fusion/wap/release/static/img/annual-income.ca9255f8.png" />
          <div class="expected-text">
            <h2 class="expected-amount">0.00</h2>
            <h3 class="expected-title">预计万份年收益(元)</h3>
          </div>
        </div>
        <div class="expected-income">
          <van-image width="3.4rem" lazy-load src="https://sp-res-wap.ftfxgame.com/fusion/wap/release/static/img/monthly-income.6552d3fd.png" />
          <div class="expected-text">
            <h2 class="expected-amount">0.00</h2>
            <h3 class="expected-title">预计万份月收益(元)</h3>
          </div>
        </div>
      </div>
      <van-image class="banner" lazy-load src="https://sp-res-wap.ftfxgame.com/fusion/wap/release/static/img/interest-banner.df2dac1c.png" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DepositInterest',
    components: {
    },
    data () {
      return {
        eyesType: 'closed-eye'
      }
    },
    methods: {
      handleEyes () {
        if (this.eyesType === 'closed-eye') {
          this.eyesType = 'eye-o'
        } else {
          this.eyesType = 'closed-eye'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .deposit-interest{
    .header{
      display: flex;
      flex-direction: row;
      width: 100%;
      background: none;
      position: absolute;
      min-height: .88rem;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      .left{
        margin-left: .15rem;
      }
      .middle{
        font-size: .36rem;
      }
      .right{
        margin-right: .2rem;
        .right-question{
          margin-right: .1rem;
        }
      }
    }
    .g-header{
      background: url("../assets/img/login/login-bg.png") no-repeat;
      background: rgba(41, 5, 5, .5); // 到时把背景图换掉此处删除
      background-size: cover;
      color: #fff;
      height: 4.2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .income-yesterday{
        display: flex;
        justify-content: center;
        align-items: center;
        .income-title{
          padding: 0 .1rem 0 0;
        }
      }
      .amount{
        padding: .1rem 0 0 0;
        font-size: .72rem;

      }
      .balance{
        font-size: .28rem;

      }
    }
    .body{
      display: flex;
      flex-direction: column;
      align-items: center;
      .statistics-box{
        width: 7rem;
        height: 2rem;
        padding: .35rem .1rem;
        border-radius: .1rem;
        background-color: #fff;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        box-shadow: 0 2px 23px 0 rgba(128,0,0,.3);
        transform: translateY(-.7rem);
        .block{
          flex: 1;
          border-right: 1px solid #666;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          .statistics-title{
            color: #666;
          }
          .statistics-amount{
            padding: 0 0 .1rem 0;
            letter-spacing: .01rem;
            font-size: .48rem;
            font-weight: 700;
            color: #e4572f;
          }
        }
        .block:last-child{
          border-right: none;
        }
      }
      .expectation-box{
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 2rem;
        margin: -.3rem 0 0 0;
        padding: 0 .25rem;
        .expected-income{
          width: 3.4rem;
          position: relative;
          .expected-text{
            color: #fff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            .expected-amount{
              letter-spacing: .03rem;
              font-size: .48rem;
              font-weight: 700;
              text-shadow: 0 2px 9px rgba(0,0,0,.5)
            }
            .expected-title{
              padding: .1rem 0 0 0;
              letter-spacing: .01rem;
              white-space: nowrap;
              font-weight: 500;
              text-shadow: 0 2px 4px rgba(0,0,0,.5);
            }
          }
        }
      }
      .banner{
        width: 7rem;
        margin: .25rem 0 0 0;
      }
    }
  }

</style>
