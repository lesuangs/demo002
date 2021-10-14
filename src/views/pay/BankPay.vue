<template>
  <div class="bank-pay-box">
    <Header :headObj="headObj" @leftClick="step !==1 ? step-- : $router.push('/recharge')"
            @rightClick="$router.push('/rechargeExplain')"/>
    <div class="bank-pay-one" v-show="step === 1">
      <!--<p class="tips">
        选择充值方式（如有问题，请联系
        <em class="line" @click="showDialog=true">在线客服</em>)
      </p>-->
      <div class="bank-input-box">
        <van-cell-group>
          <van-cell :title="$t('lang.bankPay.rechargeType')" :value="$t('lang.bankPay.bankTransfer')"/>
        </van-cell-group>
        <van-cell-group>
          <van-field class="input" v-model="inputValue" type="number" :label="$t('lang.bankPay.rechargeMoney')"
                     :placeholder="$t('lang.bankPay.inputMoney')" >
            <template #button>
              <span class="input-currency">{{$t('lang.common.yuan')}}</span>
            </template>
          </van-field>

        </van-cell-group>
        <!--        <input v-model="" class="input" placeholder=""/>-->

        <div class="moneycontent">
          <div @click="setinput(50)" :class="activeClass === 50 ? 'active':''" :key="50">
            50{{$t('lang.common.yuan')}}
          </div>
          <div @click="setinput(100)" :class="activeClass === 100 ? 'active':''" :key="100">
            100{{$t('lang.common.yuan')}}
          </div>
          <div @click="setinput(300)" :class="activeClass === 300 ? 'active':''" :key="300">
            300{{$t('lang.common.yuan')}}
          </div>
          <div @click="setinput(500)" :class="activeClass === 500 ? 'active':''" :key="500">
            500{{$t('lang.common.yuan')}}
          </div>
          <div @click="setinput(1000)" :class="activeClass === 1000 ? 'active':''" :key="1000">
            1000{{$t('lang.common.yuan')}}
          </div>
          <div @click="setinput(2000)" :class="activeClass === 2000 ? 'active':''" :key="2000">
            2000{{$t('lang.common.yuan')}}
          </div>
          <div @click="setinput(3000)" :class="activeClass === 3000 ? 'active':''" :key="3000">
            3000{{$t('lang.common.yuan')}}
          </div>
          <div @click="setinput(5000)" :class="activeClass === 5000 ? 'active':''" :key="5000">
            5000{{$t('lang.common.yuan')}}
          </div>
        </div>
      </div>
      <div class="bank-pay-con">
        <h1 class="tips">
          <i class="iconfont iconyuandianxiao"></i>
          {{$t('lang.bankPay.selectWay')}} <em class="line"  @click="showDialog=true">{{$t('lang.bankPay.onlineService')}}</em>)
        </h1>
        <notData v-if="isLoading" :isNotData="isLoading"/>
        <div v-else class="bank-card-list">
          <div class="g-contentes blank-item bank-card-item"
               :class=" selectedIndex === index ? 'active':''" v-for="(item,index) in data"
               @click="saveData(item, index)" :key="item.account">
            <div>
              <span>{{$t('lang.bankPay.receivingBank')}}</span>
              <span>{{ item.bankName }}</span>
            </div>
            <div>
              <span>{{$t('lang.bankPay.receivingNumber')}}</span>
              <span>{{ item.account }}</span>
            </div>
            <div>
              <span>{{$t('lang.bankPay.receivingName')}}</span>
              <span>{{ item.owner }}</span>
            </div>
            <div>
              <span>{{$t('lang.bankPay.receivingBranch')}}</span>
              <span>{{ item.bankAddress }}</span>
            </div>
            <div class="gicon">
              <van-icon :class="selectedIndex === index ?'activeIcon':'inactiveIcon'"
                        :name="selectedIndex === index ?'checked':'circle'"/>
            </div>
          </div>
        </div>
        <div class="step-button-box" v-if="!isLoading">
          <button class="btn-type2" @click="nextOk">{{$t('lang.common.nextStep')}}</button>
        </div>
      </div>

<!--      <div v-if="!isLoading" style="width: 100%;text-align: center">-->
<!--        <button @click="nextOk" class="ftbutton">{{$t('lang.common.nextStep')}}</button>-->
<!--      </div>-->
      <!--<div class="notice"><p>温馨提示</p><span>以上银行账号仅限本次存款使用，存款请依照当前页所显示的银行账号入款。如入款至已过期账号，无法查收，本公司概不负责！</span></div>-->
    </div>
    <div class="bank-pay-two" v-show="step === 2">
      <div class="top">
        <h1>{{$t('lang.bankPay.accountInfo')}}</h1>
        <ul>
          <li>
            <label>{{$t('lang.bankPay.receivingBank')}}</label>
            <span>{{ currentBank.bankName }}</span>
            <button class="copy-btn"
                    @click="fuzhi()"
                    :data-clipboard-text="currentBank.bankName"
                    v-show="currentBank.bankName">{{$t('lang.common.copy')}}</button>
          </li>
          <li>
            <label>{{$t('lang.bankPay.receivingName')}}</label>
            <span>{{ currentBank.owner }}</span>
            <button class="copy-btn"
                    @click="fuzhi()"
                    :data-clipboard-text="currentBank.owner"
                    v-show="currentBank.owner">{{$t('lang.common.copy')}}</button>
          </li>
          <li>
            <label>{{$t('lang.bankPay.receivingNumber')}}</label>
            <span>{{ currentBank.account }}</span>
            <button class="copy-btn"
                    @click="fuzhi()"
                    :data-clipboard-text="currentBank.account"
                    v-show="currentBank.account">{{$t('lang.common.copy')}}</button>
          </li>
          <li>
            <label>{{$t('lang.bankPay.receivingBranch')}}</label>
            <span>{{ currentBank.bankAddress }}</span>
            <button class="copy-btn"
                    @click="fuzhi()"
                    :data-clipboard-text="currentBank.bankAddress"
                    v-show="currentBank.bankAddress">{{$t('lang.common.copy')}}</button>
          </li>
        </ul>
      </div>
      <div class="middle">
        <h1>{{$t('lang.bankPay.depositorAccountInfo')}}</h1>
        <ul>
          <li>
            <label>{{$t('lang.bankPay.depositTime')}}</label>
            <span>{{ ckaddTime }}</span>
          </li>
          <li>
            <label>{{$t('lang.bankPay.depositMoney')}}</label>
            <input type="number" maxlength="10"
                   v-model="inputValue">
          </li>
          <li>
            <label>{{$t('lang.bankPay.depositName')}}</label>
            <input type="text"
                   :placeholder="$t('lang.bankPay.enterDepositName')"
                   v-model="ckName">
         </li>
          <li>
            <label>{{$t('lang.common.remark')}}</label>
            <input type="text"
                   :placeholder="$t('lang.bankPay.enterRemark')"
                   v-model="remark">
          </li>
        </ul>
      </div>
      <div class="bottom">
        <ul>
          <li>
            <label>{{$t('lang.common.verificationCode')}}</label>
            <div class="vode-input-box">
              <input type="text"
                     :placeholder="$t('lang.common.pleaseEnterVerificationCode')"
                     v-model="yzValue">
              <img @click="getVerifyCode" :src="verifyCodeImg" alt="" class="mod-vode-img">
             <!-- <img @click="handleChangeImg"
                   class="mod-vode-img"
                   :src="'/v/vUserCode?t=' + t" alt="">-->
            </div>
          </li>
        </ul>
      </div>
      <div class="step-button-box">
        <button @click="step--" class="btn-type1">{{$t('lang.common.lastStep')}}</button>
        <button @click="recharged()" class="btn-type2">{{$t('lang.bankPay.paid')}}</button>
      </div>

    </div>
    <div class="bank-pay-three" v-show="step === 3">
      <ul>
        <li>
          <i class="iconfont iconyuanquan"></i>
          <h1>
            {{$t('lang.bankPay.firstStep')}}
            <em class="success">{{$t('lang.bankPay.success')}}</em>
            <!--            <em class="error">提交失败</em>-->
          </h1>
          <div class="money">{{$t('lang.bankPay.rechargeMoney')}}：<em>{{ inputValue }}</em></div>
        </li>
        <li>
          <i class="iconfont iconyuanquan"></i>
          <h2>{{$t('lang.bankPay.lineUp')}}</h2>
        </li>
        <li>
          <i class="iconfont iconyuanquan"></i>
          <h2>{{$t('lang.bankPay.rechargeSuccess')}}</h2>
          <p>{{$t('lang.bankPay.thirdStep')}} <em @click="showDialog=true">{{$t('lang.common.contactService')}}</em></p>
        </li>
      </ul>
      <div class="step-button-box">
        <button
                @click="$router.push('/user')"
                class="btn-type2">{{$t('lang.common.buttonTextConfirm')}}
        </button>
      </div>
    </div>
    <Customerserve :showDialog="showDialog" @closeDialog="handleCloseDialog"/>
  </div>
</template>

<script>
  import Header from '../../commons/header/Header'
  import Customerserve from '../../commons/customerserve/Customerserve'
  import notData from '../../commons/notdata/NotData';
  import Clipboard from 'clipboard'
  import format from '../../format'
  import {Toast} from 'vant';
  import {REG_RULE} from '../../api/rule'
  import {mapState,mapActions} from "vuex";
  export default {
    name: "BankPay",
    components: {
      Header,
      Customerserve,notData,
      // NotData: (resolve) => {
      //   require(['../../commons/notdata/NotData', resolve])
      // },
      // Customerserve: resolve => require(['../../commons/customerserve/Customerserve'], resolve),
    },
    data() {
      return {
        isLoading: true, // 数据是否加载完成
        t: Date.now(),
        step: 1,
        selectedIndex: '',
        radio: '',
        headObj: {
          title: 'lang.header.topUp',
          showArrow: true,
          rightText: 'lang.bankPay.rechargeExplain'
        },
        showDialog: false,
        dialogTitle: this.$t('lang.user.contactCustomerService'),
        isOther: false,
        show: false,
        value: '',
        groupId: '',
        activeClass: '',
        data: [],
        code: '',
        currentBank: {},
        inputValue: '',
        ckaddTime: format(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
        remark: '',
        ckName: '',
        yzcode: false,
        imgUrl: '',
        yzValue: ''
      }
    },
    created() {
      this.getVerifyCode();
      const onlineID = this.$route.query.onlineID
      const transferID = this.$route.query.transfer
      this.code = this.$route.query.code
      if (Number(onlineID) === 1) {
        this.$http.account.queryPayChannels({payType: this.code}).then(res => {
          if (res.data.length > 0) {
            this.isLoading = false
            this.data = res.data
            this.$http.account.queryRechargeConfig({mode: 2, payType: this.code}).then(res => {
              if (res.data.validateCodeEnabled) {
                this.yzcode = true
              }
            })
          } else {
            Toast.fail(this.$t('lang.bankPay.payMaintain'));
          }
        })
      }
      if (Number(transferID) === 1) {
        this.$http.account.queryPayAccounts({payType: this.code}).then(res => {
          if (res.data.length > 0) {
            this.isLoading = false
            this.data = res.data
            this.$http.account.queryRechargeConfig({mode: 1, payType: this.code}).then(res => {
              if (res.data.validateCodeEnabled) {
                this.yzcode = true
              }
            })
          } else {
            Toast.fail(this.$t('lang.bankPay.payMaintain'));
          }
        })
      }
    },
    mounted() {
    },
    computed:{
      ...mapState([
        'verifyCodeImg',
        'imgAddress'
      ]),
      remark_check() {
        //验证手机号,暂时不用，因为还可以输入邮箱
        return REG_RULE.normal.reg.test(this.remark)
      }
    },
    methods: {
      ...mapActions([
        'getVerifyCode'
      ]),
      handleChangeImg() {
        this.t = Date.now()
      },
      recharged() {
        const data = {
          payAccountId: this.currentBank.id,
          rechargePerson: this.ckName,
          // rechargeTime: this.ckaddTime,
          amount: this.inputValue,
          yzmNum: this.yzValue,
          remark: this.remark
        }
        if (!this.ckName) {
          this.$toast.fail({
            message: this.$t('lang.bankPay.enterDepositName'),
            forbidClick: true,
          });
          return;
        }
        if(this.remark !== ''){
          if(!this.remark_check){
            this.$toast.fail({
              message: this.$t('lang.bankPay.remark_check'),
              forbidClick: true,
            });
            return;
          }
        }
        if (!this.yzValue) {
          this.$toast.fail({
            message: this.$t('lang.common.pleaseEnterVerificationCode'),
            forbidClick: true,
          });
          return;
        }
        this.$toast.loading(this.$t('lang.common.loading'))
        this.$http.account.queryTransfer(data).then((res) => {
          // alert('queryTransfer')
          //this.step++应该放在成功回调中
          let getData = res.data;
          //this.step++应该放在成功回调中
          if(res.code === 200){
            if(res.data === true){
              this.$toast.clear();
              this.step++;
            }else{
              let getMsg = getData.msg ? getData.msg : getData.message;
              this.$toast.success({
                message: getMsg,
                forbidClick: true,
              });
            }
          }else{
            let getMsg = res.msg ? res.msg : res.message;
            this.$toast.success({
              message: getMsg,
              forbidClick: true,
            });
          }
        }).catch(err => {
          this.$toast.fail({
            message: err.data.msg,
            forbidClick: true,
          });
          this.t = Date.now();
        })
      },
      handleCloseDialog(val) {
        this.showDialog = val
      },
      saveData(item, index) {
        this.selectedIndex = index
        this.currentBank = item
      },
      setinput(value) {
        this.inputValue = value;
        this.activeClass = value;
      },
      fuzhi() {
        let clipboard = new Clipboard('.copy-btn');
        clipboard.on('success', (e) => {
          this.$toast.success({
            message: this.$t('lang.state.copySuccess'),
            forbidClick: true,
          });
          e.clearSelection();
          clipboard.destroy()// 复制成功后删除实例
        })
      },
      nextOk() {
        if (!this.currentBank.bankName) {
          this.$toast.fail({
            message: this.$t('lang.bankPay.selectBank'),
            forbidClick: true,
          });
        } else if (!this.inputValue) {
          this.$toast.fail({
            message: this.$t('lang.bankPay.inputMoney'),
            forbidClick: true,
          });
        } else {
          this.step++
        }
      },
    },
    updated() {
    }
  }
</script>

<style lang="scss" scoped>
  .bank-pay-box {
    height:100%;
    display: flex;
    flex-direction: column;
    background: #191B1F;
    .step-button-box{
      margin:px2rem(50px) auto;
    }

    .bank-pay-one{
      flex:1;
      overflow-y: scroll;
      padding:0;
      /deep/.van-cell,/deep/.van-cell-group{
        min-height: px2rem(50px);
        display: flex;
        align-items: center;
        span{
          color:#fff;
          font-size:15px;
          margin-right: 20px;
        }
        .van-cell__title{
          color:#8f8f8f;
        }
        .van-field__label{
          flex:1;
          width:auto;
        }
        .van-cell__value{
          flex:2;
          text-align: left;
          color:#fff;
        }
        .van-field__control{
          color:#fff;
        }
      }
      .bank-input-box{
        margin:px2rem(15px) 0;
        background: #24252D;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .input-currency {
        display: block;
        text-align: right;
        width: 100%;
      }
      .moneycontent{
        margin:0 px2rem(15px);
      }
      .bank-pay-con{
        .tips{
          margin:0 px2rem(15px);
          font-size: px2rem(13px);
          color:#a1a3a5;
          .iconfont{
            color:#ccc;
            &::before {
              background-image: linear-gradient(137deg, #c91fec, #1772d1 85%);
              border-radius: 50%;
              display: inline-block;
              transform: scale(0.5);
              color: transparent;
            }
          }
          .line{
            color:#c4aa88;
          }
        }
        .bank-card-list{
          padding:px2rem(15px);
          flex:1;
          overflow-y: scroll;
          .bank-card-item{
            font-size: px2rem(14px);
            min-height: px2rem(140px);
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding:px2rem(10px) px2rem(15px);
            background: #24252D;
            border-radius: px2rem(10px);
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
            position: relative;
            margin-bottom: 10px;
            div{
              display: flex;
              span{
                color:#8f8f8f;
                flex:1;
                &:last-child{
                  flex:2;
                  color:#fff;
                }
              }
              &.gicon{
                color:#ccc;
                position: absolute;
                top: 0.2rem;
                right: 0.2rem;
                font-size: px2rem(20px);
              }
            }
            &.active{
              border:2px #E7C49E solid;
              background: #333441;
              .gicon{
                color:#E7C49E;
              }
            }

          }

        }
      }

    }

    .bank-pay-two{
      flex:1;
      overflow-y: scroll;
      .top,.middle,.bottom{
        background: #24252D;
        overflow: hidden;
        margin-bottom: px2rem(15px);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
      }
      h1{
        margin:px2rem(15px) px2rem(15px) 0;
        font-size:px2rem(13px);
        color:#a1a3a5;
        line-height: px2rem(30px);
      }
      ul{
        li{
          display: flex;
          min-height: 50px;
          align-items: center;
          font-size: px2rem(15px);
          padding:0 px2rem(15px);
          &:not(:last-child){
            @include border-1px(#2F2F36);
          }
          label{
            width: px2rem(110px);
            color:#9a9aa7;
          }
          span{
            flex:2;
            color:#fff;
          }
          input{
            flex:2;
            min-height: px2rem(50px);
            background: none;
            border:0;
            color:#fff;
          }
        }
      }
      .vode-input-box{
        display: flex;
        flex:2;
        align-items: center;
        input{
          width:px2rem(50px);
        }
      }

    }

    .bank-pay-three {
      height: 100%;
      padding: px2rem(45px) px2rem(28px) px2rem(80px) px2rem(45px);
      ul {
        height: 100%;
        padding-left: px2rem(20px);
        li {
          color: #fff;
          font-size: px2rem(14px);
          min-height: px2rem(110px);
          position: relative;
          &:last-child{
            p{
              padding:10px;
              border-radius: 4px;
              line-height: 20px;
              background: #24252D;
            }
          }
          .money {
            width: px2rem(265px);
            height: px2rem(45px);
            border-radius: px2rem(8px);
            background: #24252D;
            display: flex;
            align-items: center;
            padding: 0 px2rem(10px);
            margin-top: px2rem(15px);
            em {
              color: #efcea6;
            }
          }
          .iconfont {
            position: absolute;
            left: px2rem(-29px);
            color: #C8CBCB;
          }
          &:nth-of-type(1) {
            .iconfont {
              color:#E5C39C;
              /*background: linear-gradient(to bottom, #6ED6E5, #4CD9B3);*/
              /*-webkit-background-clip: text;*/
              /*-webkit-text-fill-color: transparent;*/
            }

          }
          h1 {
            color: #fff;
            .success {
              color: #4fbb72;
            }
            .error {
              color: red;
            }
          }
          h2 {
            margin-bottom: px2rem(10px);
          }
          h2, p {
            color: #fff;
            line-height: px2rem(20px);
            em{
              color:#efcea6;
            }
          }
        }
      }
      .step-button-box {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: px2rem(15px) px2rem(40px) 0;
      }
    }


  }

  .skin-gray{
    .bank-pay-box{
      background:$skin-gray-bg;
      .bank-input-box{
        background: $skin-gray-con-bg;
      }
      .bank-pay-one .bank-pay-con .bank-card-list .bank-card-item{
        background: $skin-gray-con-bg;
        &.active{
          border:2px #BDBBE8 solid;
          background: #5B5974;

        }
      }
      .bank-pay-one .bank-pay-con .tips .line,
      .bank-pay-one .bank-pay-con .tips .iconfont{
        color:#efcea6;
      }
      .bank-pay-two{
        .top,.middle,.bottom{
          background: $skin-gray-con-bg;
        }
        ul li:not(:last-child){
          @include border-1px($skin-gray-border-color);
        }
      }
      .bank-pay-three{
        ul li{
          .money{
            background: $skin-gray-con-bg;
          }
          &:last-child{
            p{
              background: $skin-gray-con-bg;
            }
          }
        }
      }



    }
  }

/*  .skin-leisure-blue{
    .bank-pay-box{
      .bank-pay-two ul li{
        span,input{
          color:$skin-leisure-blue-main-text-color;
        }
      }
      .bank-pay-one .bank-pay-con .bank-card-list .bank-card-item{
        div span:last-child{
          color:$skin-leisure-blue-main-text-color;
        }
          &.active{
            border-color:$skin-leisure-blue-active-text-color;
            background: #F3F7FF;
            .gicon{
              color:$skin-leisure-blue-active-text-color;
            }
          }
      }
      .bank-pay-three{
        ul{
          li{
            .money,p{
              em{
                color:$skin-leisure-blue-active-text-color;
              }
            }
            &:nth-of-type(1){
              .iconfont{
                color:$skin-leisure-blue-active-text-color;
              }
            }
          }
        }
      }
    }
  }*/



</style>
