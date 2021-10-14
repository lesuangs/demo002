<template>
  <div class="recharge-box">
    <Header :headObj="headObj" @leftClick="$router.push('/user')" @rightClick="$router.push('/rechargeRecord')"/>
    <div class="recharge-wrap">
      <div class="user-box">
        <img :src="loginInfo && loginInfo.avatar" alt="">
        <div class="user-info">
          <h1>{{ usersInfo.account }}</h1>
          <div class="user-balance">
            {{ $t('lang.common.AccountBalance') }}：
            <span>{{balance === null ? '0.00' : format_number(balance) }}</span>
          </div>
        </div>
        <div class="user-money-refresh">
          <i class="iconfont iconic-refresch"
             @click="refreshBalance"></i>
          <!--          <i :class="['iconfont', 'iconic-refresch', loading?'turn':'']" @click="handleRefresh"></i>-->
        </div>
      </div>
      <div class="tips-box">
        <!--<van-notice-bar :scrollable="false">
          <van-icon name="warning" class="iconaa"/>
          <span>部分支付渠道充值金额随机1位小数，请在付款时确认</span>
        </van-notice-bar>-->
        <van-notice-bar left-icon="info-o">
          <template #left-icon>
            <i class="iconfont iconic-helpcenter"></i>
          </template>
          {{ $t('lang.recharge.PaymentConfirmation') }}
        </van-notice-bar>
      </div>
      <NotData v-if="isLoading" :isNotData="isLoading"/>
      <div class="recharge-con" v-else>
        <h1 class="recharge-type-title"> {{ $t('lang.recharge.PleaseSelectRechargeType') }}</h1>
        <ul class="recharge-item-box">
          <li v-for="(item, id) in rechargeData" :key="id" @click="goPay(item)">
            <p class="reachare-img-box">
              <img :src="imgAddress + item.code + '.png'" alt="">
            </p>
            <div class="recharge-item-con">
              <h1>{{ item.name }}</h1>
              <p>{{ item.rechargeDesc }}</p>
            </div>
            <i class="iconfont iconic-right"></i>
          </li>
        </ul>
      </div>
    </div>


  </div>
</template>

<script>
  import Header from '@/commons/header/Header';
  import NotData from '@/commons/notdata/NotData';

  // const NotData = () => import('@/commons/notdata/NotData')
  import {mapGetters, mapMutations, mapState, mapActions} from "vuex";
  import {Dialog} from "vant";

  export default {
    name: "Recharge",
    components: {
      Header,
      NotData
    },
    data() {
      return {
        isLoading: true, // 数据是否加载完成
        headObj: {
          title: 'lang.header.topUpType',
          showArrow: true,
          rightText: 'lang.user.rechargeRecord'
        },
        loading: false,
        rechargeData: {}
      }
    },
    computed: {
      ...mapState([
        'userInformation',
        'balance',
        'imgAddress',
        'loginInfo'
      ]),
      ...mapGetters({
        format_number: '_format_number',
      }),
      usersInfo() {
        return this.userInformation
      }
    },
    methods: {
      ...mapMutations({
        setData: 'SET_DATA'
      }),
      ...mapActions([
        'refreshBalance',
        'getPayAccount',//获取支付方式接口1
        // 'getRechargeConfig',//金额充值范围
        // 'getVerifyCode',//验证码
      ]),
      // 获取支付通道
      getPayInfo() {
        this.$http.account.queryPayTypes().then(res => {
          if (!res.data || res.data.length < 1) return
          this.isLoading = false
          this.rechargeData = res.data
          console.log(this.rechargeData)
        })
          .catch(err => console.warn(err))
      },
      handleRefresh() {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 1000);
        this.$http.users.getMoney().then((res) => {
          this.loading = false;
          if (res) {
            let money = res.data.money;
            this.setData({key: 'balance', value: money});
            // this.usersInfo.money = money;
            // this.SET_USER_INFO(this.usersInfo);
          }
        });
      },
      // 支付跳转
      goPay(item) {
        // console.log(item,'支付跳转22222222222')
        let params = {
          payType:item.code
        };
        this.getPayAccount(params);
        // this.getVerifyCode();
        if(item.code === 'bank'){
          this.$router.push({
            name:'BankPay',
            query:{
              code:item.code,
              onlineID:item.onlinePayEnabled,
              transfer:item.transferEnabled,
            }
          })
        }else if(item.code === 'alipay' || item.code === 'wechat'){
          this.$router.push({
            name:'AliPay',
            query:{
              code:item.code,
              onlineID:item.onlinePayEnabled,
              transfer:item.transferEnabled,
            }
          })
        }else{
          return Dialog.alert({message: this.$t('lang.bankPay.payMaintain')})
        }
       /* if (item.code === 'bank' || item.code === 'alipay' || item.code === 'wechat' || item.code === 'qq') {
          if (Number(item.onlinePayEnabled) === 1 || Number(item.transferEnabled) === 1) {
            // 线上接口
            this.$http.account.queryPayChannels({payType: item.code}).then(res => {
              if (res.data.length <= 0) {
                return true
              }
              console.log(123);
              item.code === 'bank' ?
                this.$router.push(`/bankPay?onlineID=${item.onlinePayEnabled}&transfer=${item.transferEnabled}&code=${item.code}`) :
                this.$router.push(`/aliPay?onlineID=${item.onlinePayEnabled}&transfer=${item.transferEnabled}&code=${item.code}`)
            }).then(itmes => {
              // 线下接口
              console.log(itmes,456);
              if (itmes) {
                this.$http.account.queryPayAccounts({payType: item.code, time: new Date().getTime()}).then(res => {
                  if (res.data.length <= 0) return Dialog.alert({message: this.$t('lang.bankPay.payMaintain')})
                    item.code === 'bank' ?
                    this.$router.push(`/bankPay?onlineID=${item.onlinePayEnabled}&transfer=${item.transferEnabled}&code=${item.code}`) :
                    this.$router.push(`/aliPay?onlineID=${item.onlinePayEnabled}&transfer=${item.transferEnabled}&code=${item.code}`)
                })
              }
            }).catch(err => console.warn(err))
          }
        } else {
          return Dialog.alert({message: this.$t('lang.bankPay.payMaintain')})
        }*/
        // if(item.code === 'bank') {
        //   if (Number(item.onlinePayEnabled) === 1) {
        //     this.$http.account.queryPayChannels({payType: item.code}).then(res => {
        //       if (res.data.length <= 0) return Toast.fail('该支付方式维护中，请使用其它支付方式充值，给您带来不便，敬请谅解');
        //       this.$router.push(`/bankPay?onlineID=${item.onlinePayEnabled}&transfer=${item.transferEnabled}&code=${item.code}`)
        //     })
        //   }
        //   if (Number(item.transferEnabled) === 1) {
        //     this.$http.account.queryPayAccounts({payType: item.code}).then(res => {
        //       if (res.data.length <= 0) return Toast.fail('该支付方式维护中，请使用其它支付方式充值，给您带来不便，敬请谅解');
        //       this.$router.push(`/bankPay?onlineID=${item.onlinePayEnabled}&transfer=${item.transferEnabled}&code=${item.code}`)
        //     })
        //   }
        // }
        // // 支付宝微信
        // if(item.code === 'alipay' || item.code === 'wechat') {
        //   if (Number(item.onlinePayEnabled) === 1) {
        //     this.$http.account.queryPayChannels({payType: item.code}).then(res => {
        //       if (res.data.length <= 0) return Toast.fail('该支付方式维护中，请使用其它支付方式充值，给您带来不便，敬请谅解');
        //       this.$router.push(`/aliPay?onlineID=${item.onlinePayEnabled}&transfer=${item.transferEnabled}&code=${item.code}`)
        //     })
        //   }
        // }
      },
    },
    created() {
      this.getPayInfo()
    }
  }
</script>

<style lang="scss" scoped>
  .recharge-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    .recharge-wrap {
      flex: 1;
      overflow-y: scroll;
    }
    .user-box {
      background: #24252d;
      min-height: px2rem(80px); //兼容手机端
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 15px 15px 0 15px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      img {
        width: px2rem(55px);
        height: px2rem(55px);
        border-radius: 50%;
        margin: 0 px2rem(15px);
      }
      .user-info {
        flex: 1;
        position: relative;
        &:after {
          content: '';
          width: 1px;
          height: 70%;
          background: #2F2F36;
          transform: scaleX(0.5);
          position: absolute;
          right: 0;
          top: 5px;
        }
        h1 {
          font-size: px2rem(14px);
          color: #fff;
          margin-bottom: 12px;
        }
      }
      .user-balance {
        /*line-height: px2rem(30px);*/
        color: #9a9aa7;
        font-size: 14px;
        span {
          font-size: px2rem(14px);
          color: #fff;

        }
      }
      .user-money-refresh {
        min-width: px2rem(60px);
        text-align: center;
        .iconfont {
          font-size: px2rem(20px);
          color: #fff;
        }

      }
    }
    .tips-box {
      .van-notice-bar {
        background: none;
        font-size: 13px;
        color: #9a9aa7;
        .iconfont {
          margin-right: px2rem(10px);
          background-image: -webkit-linear-gradient(right, #9637E5, #2769D0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
    .recharge-con {
      background: #24252D;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      .recharge-type-title {
        font-size: px2rem(13px);
        line-height: px2rem(30px);
        margin: px2rem(10px) px2rem(15px) 0;
        color: #8f8f8f;

      }
    }
    .recharge-item-box {
      li {
        min-height: 80px;
        padding: px2rem(10px) 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        @include border-1px(#2F2F36);
        .reachare-img-box{
          width:40px;
          height:40px;
          border-radius: 50%;
          background:#f1ecec;
          margin: 0 px2rem(15px);
        }
        img {
          width: px2rem(45px);
        }
        .iconfont {
          margin-right: px2rem(15px);
          color: #7A8188;
        }
        .recharge-item-con {
          flex: 1;
          margin-right: px2rem(15px);
          h1 {
            font-size: px2rem(16px);
            line-height: px2rem(25px);
            color: #fff;
          }
          p {
            font-size: px2rem(12px);
            line-height: px2rem(25px);
            color: #9a9aa7;
          }
        }
      }

    }

  }

  .skin-gray {
    .recharge-box {
      .user-box {
        background: $skin-gray-con-bg;
      }
      .user-box .user-info:after {
        background: $skin-gray-border-color;
      }
      .tips-box {
        .van-notice-bar {
          .iconfont {
            color: #efcea6;
            background: none;
            -webkit-text-fill-color:bisque;
          }
        }
      }
      .recharge-con {
        background: $skin-gray-con-bg;

      }
      .recharge-item-box li {
        @include border-1px($skin-gray-border-color);
      }
    }
  }


</style>
