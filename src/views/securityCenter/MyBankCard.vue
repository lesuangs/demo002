<template>
  <div class="introduce">
    <Header :headObj="headObj" @leftClick="$router.push('/securityCenter')"/>
    <div class="g-content">
      <div class="no-bank-img">
        <img src="data:image/png;base64,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">
        <p>您还没有绑定的银行卡！</p>
      </div>
      <div class="m-btns">
        <div class="m-button" @click="getPwdData"> 添加银行卡</div>
      </div>
    </div>
    <Dialog :showDialog="showDialog" @closeDialog="handleCloseDialog">
      <div slot="content">
        <div class="m-vital-confirm">
          <div class="confirm-content">
            <img src="data:image/png;base64,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"
                 class="confirm-img">
            <h1 class="bold">为了保证您用卡的安全</h1>
            <p class="tip">请在绑卡前设置您的资金密码</p>
            <div class="m-button" @click="$router.push('/setFundsPassword')"> 立即设置</div>
            <p class="no" @click="showDialog = false">取消</p>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
  import Header from '@/commons/header/Header'
  import Dialog from '@/commons/dialog/Dialog'
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'MyBankCard',
    components: {
      Header,
      Dialog
    },
    data() {
      return {
        headObj: {
          title: '我的银行卡',
          showArrow: true
        },
        showDialog: false
      }
    },
    computed: {
      ...mapState([
        'extInformation'
      ])
    },
    methods: {
      ...mapMutations('user', ['SET_EXT_INFO']),
      handleCloseDialog(val) {
        this.showDialog = val
      },
      getPwdData() {
        console.log(this.extInformation.fundPwd);
        if (this.extInformation.fundPwd === null || this.extInformation.fundPwd === '4a7d1ed414474e4033ac29ccb8653d9b') {
          this.showDialog = true
        } else {
          this.$router.push({path: '/BankCardData'})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .introduce {
    display: flex;
    flex-direction: column;
    .g-content {
      flex: 1;
      overflow: scroll;
      min-height: 13rem;
      padding: .2rem;
      .no-bank-img {
        //position: absolute;
        font-size: .28rem;
        text-align: center;
        img {
          width: 2.5rem;
          height: 2.4rem;
          margin: 2rem 2.6rem .6rem 2.4rem;
        }
      }
      .m-btns {
        padding-top: 7rem;
        .m-button {
          color: #fff;
          background-color: #dd413a;
          width: 6.9rem;
          height: .8rem;
          line-height: .8rem;
          font-size: .36rem;
          text-align: center;
          margin: auto;
          border-radius: .1rem;
        }
      }
    }
    ::v-deep .van-dialog__content {
      border-radius: .1rem;
      .m-vital-confirm {
        background-color: #fff;
        border-radius: .2rem;
        width: 6.4rem;
        text-align: center;
        .confirm-content {
          padding: .8rem 0 .4rem 0;
          .confirm-img {
            margin-bottom: .6rem;
            width: 2.8rem;
            height: auto;
          }
          .bold {
            font-weight: 700;
            font-size: .36rem;
            white-space: pre-line;
          }
          .tip {
            margin-top: .2rem;
            color: #666;
            font-size: .26rem;
          }
          .m-button {
            color: #fff;
            background: $global-bgcolor;
            width: 3.3rem;
            height: .8rem;
            line-height: .8rem;
            font-size: .36rem;
            box-shadow: 0 0 #eda6a6, 0.1em 0.1rem 0.3rem #eda6a6;
            margin: .6rem auto .5rem auto;
            border-radius: .1rem;
            text-align: center;
          }
          .m-vital-confirm .confirm-content .no {
            font-size: .28rem;
            color: #999;
          }
        }
      }
    }
  }
</style>
