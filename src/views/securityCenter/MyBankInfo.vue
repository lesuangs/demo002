<template>
  <div class="my-bank-info-box">
    <Header :headObj="headObj" @leftClick="$router.go(-1)"/>
<!--    <NotData v-if="Object.keys(bankObj).length === 0? true :false" :isNotData="isNotData"/>-->
    <div class="bank-content g-content">
     <!-- <div class="info">
        <van-notice-bar :text="$t('lang.myBankInfo.info')">
          <template #left-icon><i class="iconfont iconic-helpcenter"></i></template>
        </van-notice-bar>
      </div>-->
      <div class="bank-content-con">

        <div class="my-bank-con">
          <h1 class="bank-tips">
            <i class="iconfont iconic-helpcenter"></i>
            <span>{{$t('lang.myBankInfo.info')}}</span>
          </h1>
          <div class="add-bank-box" v-if="userBank === null">
            <div class="add-bank-wrap" @click="$router.push('/BankCardData')">
            <span>
              <i class="iconfont iconyinhangka"></i>
            </span>
              <div>
                <h1>{{ $t('lang.myBankInfo.addBankCard[0]') }}</h1>
                <p>{{ $t('lang.myBankInfo.bank_tips[0]') }}</p>
              </div>
            </div>
          </div>
          <div class="bank-list-box" v-else>
            <div class="bank-card" :style="`background-image: url(${require('@/assets/img/card-gray.png')})`">
              <div class="bank-icon">
                <div>
                  <img :src="require('@/assets/img/ic-bank.png')">
                </div>
              </div>
              <div class="bank-details">
                <div class="top">
                  <div class="bank-name">{{userBank.bankName}}</div>
                  <div class="bank-address">{{userBank.subAddress}}</div>
                </div>
                <div class="bank-number">{{userBank.cardNo}}</div>
                <div class="bank-fullName">{{userBank.fullName}}</div>
              </div>
            </div>

            <!-- <van-cell :title="$t('lang.myBankInfo.cardholder')" :value="userName"/>
            <van-cell :title="$t('lang.myBankInfo.bankName')" :value="bankObj.bankName"/>

            <van-cell :title="$t('lang.myBankInfo.bankCardNumber')" :value="bankObj.cardNo"/>

            <van-cell :title="$t('lang.myBankInfo.accountOpeningAddress')" :value="bankObj.subAddress"/>

            <van-cell :title="$t('lang.myBankInfo.UpdateTime')" :value="bankObj.updateTime"/> -->

          </div>
        </div>


      <div class="tips">
        <p>{{$t('lang.myBankInfo.tipsTitle')}}</p>
        <i18n path="lang.myBankInfo.tipsContent" tag="p">
          <template #service>
            <em class="line" @click="showDialog = true">{{$t('lang.myBankInfo.service')}}</em>
          </template>
        </i18n>
      </div>
      </div>
      <div class="step-button-box">
        <button class="btn-type2 m-button" @click="$router.push('/BankCardData')">
          {{ $t('lang.myBankInfo.addBankCard[1]') }}
        </button>
      </div>

    </div>
    <Customerserve :showDialog="showDialog" @closeDialog="handleCloseDialog"/>
  </div>
</template>

<script>
  import Header from '../../commons/header/Header'
  import NotData from '@/commons/notdata/NotData'
  import Customerserve from '../../commons/customerserve/Customerserve'
  import {mapState} from 'vuex';
  export default {
    name: 'myBankInfo',
    components: {
      Header,
      NotData,
      Customerserve,
    },
    data() {
      return {
        headObj: {
          title: 'lang.SecurityCenter.myBankCard',
          showArrow: true
        },
        bankObj: '',
        userName: '',
        isNotData: true,
        showDialog: false,
      }
    },
    methods: {

      handleCloseDialog(showDialog) {
        this.showDialog = showDialog
      }
    },
    computed:{
      ...mapState([
        'userBank'
      ]),
    },
    created() {
     /* this.$http.home.getUserInfo().then(res => {
        this.bankObj = res.data.userBank
        this.userName = res.data.userInfo.fullName
        console.log(this.bankObj);
      })*/
    },

  }
</script>

<style scoped lang="scss">
  .my-bank-info-box{
    height:100%;
    .add-bank-box{

      .add-bank-wrap{
        border-radius: 6px;
        border: solid 1px #404048;
        background-color: #333441;
        display: flex;
        align-items: center;
        padding:15px;
        height:70px;
        span{
          width:35px;
          height:35px;
          border-radius: 50%;
          border: solid 1.2px #404048;
          background-color: #24252d;
          margin-right: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          .iconfont{
            color:#606070;
          }
        }
        >div{
          color:#9a9aa7;
          font-size:13px;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          h1{
            font-size:15px;
            color:#fff;
            }
        }
      }
    }
    .my-bank-con{
      background:#24252D;
      padding:15px;
      .bank-tips{
        color:#9a9aa7;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        .iconfont{
          color:#EFCEA6;
          margin-right:5px;
          font-size:13px;
        }
      }
    }
    .step-button-box {
      background: #24252D;
      border-top: 1px solid #32343F;
      padding-top: px2rem(10px);
      margin: 0;
    }
    .bank-card {
      background-color: #494949;
      background-size: contain;
      color: #f5f5f9;
      border-radius: px2rem(10px);
      width: 100%;
      height: px2rem(100px);
      display: flex;
      margin-bottom: px2rem(10px);
      padding:10px;
      .bank-icon {
        margin-right: 10px;
        > div {
          width: px2rem(40px);
          height: px2rem(40px);
          border-radius: px2rem(20px);
          background-color: #f5f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 75%;
          }
        }
      }
      .bank-details {
        flex-grow: 1;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding:5px;
        .top {
          display: flex;
          justify-content: space-between;
          .bank-name {
            font-size: px2rem(15px);
          }
          .bank-address {
            text-align: right;
            font-size: px2rem(11px);
          }
        }
        .bank-number{
          font-size:17px;
        }
        .bank-fullName{
          font-size:14px;
        }
        .bottom {

          text-align: left;
        }
      }
    }
    .van-cell{
      min-height: px2rem(50px);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: px2rem(15px);
      .van-cell__value{
        flex:2;
        text-align: left;
      }
    }

    .info {
      /deep/ .van-notice-bar{
        background: none;
        font-size: .26rem;
        margin: .1rem;
        .iconfont{
          margin-right: px2rem(10px);
        }
      }
    }
    .tips{
      color:#8f8f8f;
      font-size: px2rem(13px);
      margin:15px 15px 0 15px;
      // line-height: 30px;
      em{
        color:#efcea6;
      }
      p {
        margin-bottom: px2rem(8px);
      }
    }

  }

  .skin-gray{
    .my-bank-info-box{
      .bank-content-con{
        background: $skin-gray-bg;
      }
      .my-bank-con{
        background: $skin-gray-con-bg;
      }
      /deep/.van-cell__title{
        color:$skin-gray-text-color;
      }
      .van-cell__value{
        color:#fff;
      }
      /deep/ .van-notice-bar{
        color: #c1c1cf;
        .iconfont{
          background-image:-webkit-linear-gradient(left,#F8E1B3,#F2D18B);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;

        }
      }

      .add-bank-box{
        .add-bank-wrap{
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.11);
          background:#4c4a64;
          border:0;
          span{
            border: solid 1px #686683;
            background-color: #5a586f;
            .iconfont{
              color:#9A9AA7;
            }
          }
          >div{
            color:#9a9aa7;
          }
        }
      }
      .step-button-box{
        background:#303244;
      }
    }
  }

  .skin-black{
    .my-bank-info-box{
      .bank-content-con{
        background: $skin-black-bg;
      }

      /deep/.van-cell__title{
        color:$skin-black-text-color;
      }
      .van-cell__value{
        color:#fff;
      }
      /deep/ .van-notice-bar{
        color: #9a9aa7;
        .iconfont{
          background-image:-webkit-linear-gradient(left,#A330E5,#2B69D5);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;

        }
      }
    }
  }


.bank-content.g-content {
  flex: 1;
  overflow: scroll;
  /*min-height: 13rem;*/
  height: 100%;
  width: 100%;
  /*position: absolute;*/
  /*background-color: #f5f5f9;*/
  display: flex;
  flex-direction: column;
  margin-top: px2rem(-40px);
  padding-top: px2rem(40px);
  .bank-content-con {
    flex-grow: 1;
  }


}

/*.bank-content.g-content > div:not(:first-child) {*/
/*  margin: 0 !important;*/
/*}*/

</style>
