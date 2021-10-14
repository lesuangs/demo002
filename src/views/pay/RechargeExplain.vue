<template>
  <div class="explain recharge-explain-box">
    <Header :headObj="headObj" @leftClick="$router.go(-1)"/>
    <div class="g-content">
      <div class="explain-box">
<!--        <h1>{{$t('lang.recharge.attention')}}：</h1>-->
        <div class="explain-item">
          <h1>{{$t('lang.recharge.companyIncome')}}：</h1>
          <p>{{$t('lang.recharge.selectAccount')}}</p>
        </div>
        <div class="explain-item">
          <h1>{{$t('lang.recharge.onlinePay')}}：</h1>
          <p>{{$t('lang.recharge.paymentMethod')}}</p>
        </div>
        <div class="explain-item">
          <h1>{{$t('lang.recharge.wallet')}}：</h1>
          <p>{{$t('lang.recharge.onePayment')}}</p>
        </div>
        <p @click="showDialog = true" class="explain-tips">{{$t('lang.recharge.ifCallService')}}</p>
      </div>


<!--      <div>-->
<!--        <ol class=" list-paddingleft-2"><h3 style="font-size: 18px;"><strong>注意：</strong>-->
<!--          &nbsp; &nbsp;</h3>-->
<!--          <li><p><strong><span style="color: #FF0000;">公司入款-网银转账：</span></strong>选择您要转入的收款账户，自行完成转账后，按页面步骤操作，系统会在3分钟内到账。-->
<!--          </p></li>-->
<!--          <li><p><strong><span style="color: #FF0000;">网银-在线支付：</span></strong><span style="color: #FF0000;"><span-->
<!--                  style="color: #000000;">QQ钱包/银联钱包/微信/京东钱包-扫码支付，请</span></span>按页面步骤完成操作，支付成功后无需经过客服，系统自动到账。</p></li>-->
<!--          <li><p><strong><span style="color: #FF0000;">QQ钱包/京东钱包 </span></strong><strong><span style="color: #FF0000;">一键支付：</span></strong>目前只支持app版与手机网页版。-->
<!--          </p></li>-->
<!--          <li><p>如有问题，请联系在线客服。<br></p></li>-->
<!--        </ol>-->
<!--      </div>-->
    </div>
    <Customerserve :showDialog="showDialog" @closeDialog="handleCloseDialog"/>
  </div>
</template>

<script>
  import Header from '../../commons/header/Header'
  import Customerserve from '../../commons/customerserve/Customerserve'

  export default {
    name: 'RechargeExplain',
    components: {
      Header,
      Customerserve
    },
    data() {
      return {
        showDialog: false,
        headObj: {
          title: this.$t('lang.bankPay.rechargeExplain'),
          showArrow: true
        }
      }
    },
    methods: {
      handleCloseDialog(val) {
        this.showDialog = val
      },
    }
  }
</script>

<style lang="scss" scoped>
  .recharge-explain-box{
    .g-content{
      background: none !important;
    }
  }
  .skin-gray{
    .recharge-explain-box{
      background: $skin-gray-bg;
      .g-content .explain-item h1::before{
        background:#efcea6;
      }
    }

  }
  .skin-black{
    .recharge-explain-box{
      background: $skin-black-bg;
      .explain-box{
        .explain-item {
          p {
            color:#9a9aa7;
          }
        }
      }
    }
  }
  .explain{
    .g-content {
      .explain-box{
        color: #fff;
        padding: 0.5rem .3rem;
        font-size: .3rem;
        line-height: 0.28rem;
      }
      .explain-item{
        margin:0.4rem 0;
        font-size:0.28rem;
        h1{
          /*color:#9a9aa7;*/
          line-height: 0.5rem;
          &::before{
            content: '';
            display: inline-block;
            vertical-align: middle;
            margin-right: 5px;
            width:5px;
            height:5px;
            border-radius: 50%;
            background: linear-gradient(to right,#762BA9,#255AB1);
          }
        }
        p{
          margin-left: 0.2rem;
          margin-top: 0.1rem;
          line-height: 0.5rem;
        }
      }
      .explain-tips{
        color:#efcea6;
        font-size: 0.28rem;
        padding-left: 0.3rem;
      }
    }
  }

</style>
