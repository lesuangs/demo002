<template>
  <div class="with-draw-box">
    <Header :headObj="headObj" @leftClick="$router.push('/user')"
            @rightClick="$router.push(succesWithDraw?'/withdrawalsRecord':'/AuditDetails')"
            :rightText="headObj.rightText"/>
<!--    <NotData v-if="Object.keys(userData).length === 0 " :isNotData="isNotData"/>-->
    <div>
      <div class="g-content">
        <div class="user">
          <div class="avatar">
            <img :src="loginInfo && loginInfo.avatar" class="img-head">
<!--            <img style="width: 1.2rem" :src="'/data/userimg/userimg' + usersInfo.uid%5 + '.png'" alt="">-->
          </div>
          <div class="details">
            <p class="name">{{ usersInfo.account }}</p>
            <span class="balance">
              {{ $t('lang.common.AccountBalance') }}：<em class="account">{{balance === null ? '0.00' : format_number(balance)}}</em>
            </span>
          </div>
          <div class="actions">
            <i :class="['iconfont', 'iconic-refresch', loading?'turn':'']" @click="handleRefresh"></i>
          </div>
        </div>
        <!--        <div  class="m-btns" style="color:red;font-size: .3rem">-->
        <!--          {{errorMsg}}-->
        <!--        </div>-->
        <p class="tip" style="margin-bottom: 0">
          <!--<van-notice-bar :scrollable="false">
            <van-icon name="warning" class="iconaa"/>
            <span>部分支付渠道充值金额随机1位小数，请在付款时确认</span>
          </van-notice-bar>-->
          <!--          <van-notice-bar scrollable style="line-height: 0.48rem;height: 0.48rem;font-size: .26rem" color="red" background="#ffffff" left-icon="info-o">-->
          <!--            {{hiddenStyle ? $t(errorMsg) :'提现通过后，提现资金最晚24小时内到账！'}}-->
          <!--          </van-notice-bar>-->
          <van-notice-bar
              :text="hiddenStyle?$t(errorMsg) :$t('lang.withDraw.tiXianTongGuo')">
            <template #left-icon>
              <i class="iconfont iconic-helpcenter"></i>
<!--              <van-image :src="require('@/assets/themes/hjb/black/ic_icon.svg')"></van-image>-->
            </template>
          </van-notice-bar>
        </p>
        <div class="bank-list">
          <p class="tips">
            <i18n path="lang.withDraw.pleaseEnterWithDrawAmount">
              <template #onlineService>
                <em class="line" @click="showDialog=true">{{ $t('lang.withDraw.onlineService') }}</em>
              </template>
            </i18n>
          </p>
          <div class="add-bank-box" @click="$router.push('/BankCardData')"
               v-if="userBank === null">
            <span>
              <i class="iconfont iconjiahao"></i>
            </span>
            <div class="add-bank-wrap">
              <div>
                <h1>新增银行卡</h1>
                <span>-</span>
              </div>
              <i class="iconfont iconic-right"></i>
            </div>
          </div>
          <div class="bankName" @click="$router.push('/myBankInfo')" v-else>
            <div class="bankNameLeft">
<!--              <img :src="imgAddress + item.code + '.png'" alt="">-->
              <img :src="userData.bankImg" :alt="userData.bankName">
            </div>
            <div class="bankNameRight">
              <span>{{ userData.bankName }}</span>
              <p>{{$t('lang.withDraw.endOf')}} {{ userData.cardNo }} {{$t('lang.withDraw.debitCard')}}</p>
            </div>
          </div>
        </div>
        <div class="withdrawalAmount">
          <div class="amount">
            <p class="withdraw-label">{{ $t('lang.withDraw.WithdrawalAmount') }}</p>
            <div style="display: flex;align-items: center">
              <!--            <div style="font-size: .6rem" class="cate">￥</div>-->
              <van-form validate-first>
                <!-- 通过 pattern 进行正则校验 -->
                <van-field
                        v-model="amount"
                        type="number"
                        @focus="focusAmount"
                />
                <!--  <van-field
                          v-model="amount"
                          @blur="handleAmountInput"
                          style="font-size: .6rem;"
                          type="number"
                          @focus="focusAmount"
                  />-->
              </van-form>
            </div>
          </div>
          <div class="pCode">
            <p class="withdraw-label">{{ $t('lang.withDraw.WithdrawalPassword') }}</p>
            <div class="inputStyle">
              <van-password-input
                  :value="drawPwd"
                  :length="4"
                  :focused="showKeyboard"
                  @focus="focusType('drawPwd')"
              />
              <van-number-keyboard
                  :show="show"
                  @blur="show = false"
                  @input="onInput"
                  @delete="onDelete"
                  :delete-button-text="this.$t('lang.common.delete')"
              />
            </div>
          </div>
          <div class="vCode yzcode" v-if="isNeedCode">
            <p class="withdraw-label">{{$t('lang.common.verificationCode')}}：</p>
            <div>
              <van-field
                      v-model="valiCode"
                      :placeholder="$t('lang.common.pleaseEnterVerificationCode')"
                      :rules="[{ required: true, message: this.$t('lang.common.pleaseEnterVerificationCode') }]"
              />
            </div>
            <div>
              <img @click="handleChangeImg" :src="'/v/vUserCode?t=' + t" alt=""/>
            </div>
          </div>
        </div>

        <!--        验证码<img data-v-d2e65f66="" src="/v/vUserCode?t=0.77979876515361091591846364821">-->
        <div class="withdrawalNotice">
          <span @click="$router.push('/explainWithDraw')">{{ $t('lang.withDraw.withdrawalInstructions') }}</span>
        </div>
        <!--<div v-if="!hiddenStyle" :class="['m-btns',hiddenStyle?'hiddenStyle':'']">
          <van-button @click="sendAmountData" :class="['m-button', disabled ? 'disable' : '']" native-type="submit">
            {{ $t('lang.common.nextStep') }}
          </van-button>
        </div>-->
        <div class="step-button-box">
          <button class="btn-type1"  @click="sendAmountData"
                  :class="[disabled ? 'disable' : '']"
                  native-type="submit">
            {{ $t('lang.common.nextStep') }}
          </button>
        </div>
        <div v-if="show" style="width: 100%;height: 3.9rem;"></div>
        <!--        <div v-else class="m-btns" style="color:red;font-size: .3rem">-->
        <!--          {{errorMsg}}-->
        <!--        </div>-->
      </div>
    </div>
<!--    <div v-if="succesWithDraw" style="padding: .6rem">
      <van-steps active-icon="checked" inactive-icon="" active-color="red" direction="vertical" :active="0">
        <van-step style="font-size: .34rem">
          <p>{{$t('lang.withDraw.wish')}}</p>
          <p>{{$t('lang.withDraw.WithdrawalAmount')}}{{ amount.toFixed(2) }}</p>
        </van-step>
        <van-step style="font-size: .34rem">
          <p>{{$t('lang.withDraw.wait')}}</p>
        </van-step>

        <van-step style="font-size: .34rem">
          <p>{{$t('lang.withDraw.succWith')}}</p>
          <p style="font-size:.3rem">{{$t('lang.withDraw.tiXianTongGuo')}}</p>
        </van-step>
      </van-steps>
      <div style="text-align: center;margin-top:0.5rem">
        <van-button @click="$router.push('/user')" type="primary" style="font-size:.3rem" block color="red"
                    size="small"
                    linear-gradient hairline>{{$t('lang.common.determine')}}
        </van-button>
      </div>
    </div>-->
    <div class="recharge-status-box" v-if="succesWithDraw">
      <ul>
        <li>
          <i class="iconfont iconyuanquan"></i>
          <h1>
            {{$t('lang.withDraw.wish')}}
          </h1>
          <div class="money">{{$t('lang.withDraw.WithdrawalAmount')}}：
            <em>{{ amount.toFixed(2) }}</em>
          </div>
        </li>
        <li>
          <i class="iconfont iconyuanquan"></i>
          <h2>{{$t('lang.withDraw.wait')}}</h2>
        </li>
        <li>
          <i class="iconfont iconyuanquan"></i>
          <h2>{{$t('lang.withDraw.succWith')}}</h2>
          <p>{{$t('lang.withDraw.tiXianTongGuo')}}</p>
        </li>
      </ul>
      <div class="step-button-box">
        <button
                @click="$router.push('/user')"
                class="btn-type2">{{$t('lang.common.buttonTextConfirm')}}</button>
      </div>
    </div>
    <Customerserve :showDialog="showDialog" @closeDialog="handleCloseDialog"/>
  </div>
</template>

<script>
import Header from "@/commons/header/Header";
import NotData from "../../commons/notdata/NotData";
import Customerserve from '../../commons/customerserve/Customerserve'
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "WithDraw",
  components: {
    Header,
    NotData,
    Customerserve
  },
  data() {
    return {
      headObj: {
        title: 'lang.header.Withdrawal',
        showArrow: true,
        rightText: 'lang.common.auditDetails'
      },
      loading: false,
      show: false,
      drawPwd: '',
      amount: '0.00',
      valiCode: '',
      isFocus: '',
      userData: {},
      myMoney: '',
      isNotData: true,
      isShow: false,
      succesWithDraw: false,
      contentHid: true,
      showKeyboard: false,
      hiddenStyle: true,
      minMoney: 1,
      errorMsg: '',
      t: Date.now(),
      showDialog: false,
      isNeedCode: false,
    }
  },
  created() {
    // this.isBindCard();
  },
  async mounted() {
    // console.log(this.hasValue,9999999);
    console.log(document.body.getElementsByClassName('g-content')[0]);
    // let userDatas = await this.getUserInfo()
    // console.log(userDatas);
/*    if (!this.hasValue) {
      console.log('ppp')
      this.$dialog.confirm({
        message: this.$t('lang.withDraw.tips[0]'),
        cancelButtonText:this.$t('lang.common.btn[2]'),
        confirmButtonText:this.$t('lang.common.btn[3]'),
        // message: '资金密码已设置,是否要去绑卡',
      }).then(() => {
        // this.$router.push('/BankCardData');
        this.$router.push('/myBankInfo');

      }).catch(() => {
        this.$router.push('/user')
      })
    } else {
      console.log('lll')
      this.userData = {
        account: this.userInformation.account,
        cardNo: this.userBank.cardNo,
        bankName: this.userBank.bankName,
        bankImg: 'data/bank/' + this.userBank.bankName + '.png',
      }

      //根据vCode判断 并赋值给isNeedCode
    }*/
    const withDrawInfo = await this.checkWithDrawRule()
    console.log(withDrawInfo)
    this.minMoney = withDrawInfo.limit.singleMinLimit
    console.log('1111')
    console.log(withDrawInfo);
    this.isNeedCode = withDrawInfo.limit.vCode === 0 ? false : true
    if (withDrawInfo.allDmlPass === 1 && withDrawInfo.limit.allowDml === 1) {
      console.log('2222')
      this.errorMsg = this.$t('lang.withDraw.damabuzu');
    } else if (withDrawInfo.count >= withDrawInfo.limit.dayMaxCount && withDrawInfo.limit.dayMaxCountLimit === 1) {
      console.log('3333')
      this.errorMsg = this.$t('lang.withDraw.mingRiTiKuna');
    } else {
      console.log('4444')
      this.hiddenStyle = false
    }
  },
  computed: {
    ...mapState([
      'userInformation',
      'userBank',
      'balance',
      'loginInfo',
      'imgAddress',
    ]),
    ...mapGetters({
      format_number: '_format_number',
    }),
    hasValue(){
      if(this.userBank){
        return true;
      }else{
        return false;
      }
    },
    ...mapGetters(['userInfo']),
    usersInfo() {
      return this.userInformation
    },
    disabled: function () {
      //判断 isNeedCode 是否需要验证码验证
      if (this.isNeedCode) {
        if (this.drawPwd.length === 4 && parseInt(this.amount) >= this.minMoney && this.valiCode !== '') {
          return false
        }
      } else {
        if (this.drawPwd.length === 4 && parseInt(this.amount) >= this.minMoney) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    ...mapActions([
      'getUserInfo'
    ]),
    ...mapMutations('user', ['SET_USER_INFO']),
    isBindCard(){
      this.getUserInfo({}).then((_data) => {
        if (_data) {
          console.log(_data,this.hasValue,'getUserInfo22222222222222222')
          if(!this.hasValue){
            this.$dialog.confirm({
              message: this.$t('lang.withDraw.tips[0]'),
              cancelButtonText:this.$t('lang.common.btn[2]'),
              confirmButtonText:this.$t('lang.common.btn[3]'),
              // message: '资金密码已设置,是否要去绑卡',
            }).then(() => {
              this.$router.push('/BankCardData');
              // this.$router.push('/myBankInfo');

            }).catch(() => {
              this.$router.push('/user')
            })
          }else{
            this.userData = {
              account: this.userInformation.account,
              cardNo: this.userBank.cardNo,
              bankName: this.userBank.bankName,
              bankImg: 'data/bank/' + this.userBank.bankName + '.png',
            }
          }
        }
      }, (rej) => {

      });
    },
    async checkWithDrawRule() {
      return new Promise((resolve, reject) => {
        this.$http.account.queryExplainWithDraw().then(res => {
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // async getUserInfo() {
    //   return new Promise((resolve, reject) => {
    //     this.$http.home.getUserInfo().then(res => {
    //       resolve(res.data)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    handleCloseDialog(val) {
      this.showDialog = val
    },
    handleChangeImg() {
      this.t = Date.now()
    },
    onInput(value) {
      let t = ''
      t = this.isFocus === 'amount' ? this.amount : this.drawPwd
      console.log(t);
      // t = (t + value).slice(0, 4)
      if (this.isFocus === 'drawPwd') {
        t = (t + value).slice(0, 4)
      } else {
        t = (t + value).slice(0)
      }
      console.log(t);
      if (this.isFocus === 'amount') {
        this.amount = t
      } else {
        this.drawPwd = t
      }
    },
    onDelete() {
      let t = ''
      t = this.isFocus === 'amount' ? this.amount : this.drawPwd
      console.log(t);
      // t = (t + value).slice(0, 4)
      t = t.slice(0, t.length - 1)
      console.log(t);
      if (this.isFocus === 'amount') {
        this.amount = t
      } else {
        this.drawPwd = t
      }
    },
    focusType(type) {
      this.show = true
      this.showKeyboard = true
      this.isFocus = type
      console.log(document.body.getElementsByClassName('g-content')[0].scrollHeight)
      setTimeout(() => {
        document.body.getElementsByClassName('g-content')[0].scrollTop = document.body.getElementsByClassName('g-content')[0].scrollHeight
        console.log(document.body.getElementsByClassName('g-content'));
      }, 100)
    },
    /*blurType(){
      this.isFocus = ''
      console.log('2223333')
      this.show = false
      this.showKeyboard = false
    },*/
    handleRefresh() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)

      this.$http.users.getMoney().then(res => {
        console.log(res);
        this.myMoney = res.data.money
        this.$toast.success(this.$t('lang.common.refreshSuccessfully'))
      }).catch(error => {
        this.$toast.fail(error.data.msg)
      })
    },
    sendAmountData() {
      if (this.isNeedCode) {
        if (this.valiCode === '') {
          this.$toast.fail(this.$t('lang.withDraw.errorCode')) //'验证码不能为空'
          return;
        }
      }
      if (this.amount === '0.00') {
        this.$toast.fail(this.$t('lang.withDraw.errorAmount')) //'金额输入有误'
        return
      }
      if (this.drawPwd.length < 1) {
        this.$toast.fail(this.$t('lang.withDraw.errorPassword')) //'密码不能为空'
        return;
      }
      if (Number(this.amount) < Number(this.minMoney)) {
        this.$toast.fail(this.$t('lang.withDraw.errorMinimun',{amount: this.minMoney})) //'单次提款金额不得少于' + this.minMoney
        return;
      }
      let params = {}
      if (this.isNeedCode) {
        params = {
          yzmNum: this.valiCode,
          cashMoney: this.amount,
          cashPassword: this.drawPwd
        }
      } else {
        params = {
          cashMoney: this.amount,
          cashPassword: this.drawPwd
        }
      }
      console.log(params);
      this.$toast.loading(this.$t('lang.withDraw.loading')) //'数据提交中...'
      this.$http.account.queryAmount(params).then(res => {
        console.log(res);
        // this.$toast.success('提交成功！')
        this.$dialog.confirm({
          message: this.$t('lang.withDraw.succReq'),
          cancelButtonText:this.$t('lang.common.btn[4]'),
          confirmButtonText:this.$t('lang.common.btn[3]'),
          // message: '资金密码已设置,是否要去绑卡',
        }).then(() => {
          this.$router.push('/user');
          // this.$router.push('/myBankInfo');
        }).catch(() => {
          this.$router.push('/')
        })
        this.succesWithDraw = true
        this.contentHid = false
        this.headObj.rightText = this.$t('lang.withDraw.withdrawalsRecord') //'提现记录'
      }).catch(error => {
        console.log(error)
        this.handleChangeImg()
        this.valiCode = ''
        if (error.status >= 500) {
          this.$toast.fail(this.$t('lang.withDraw.serverBusy'))//'服务器繁忙！'
          return
        }
        this.$toast.fail(error.data.msg)
        this.drawPwd = ''
      })
    },
    handleAmountInput() {
      if (Number(this.amount) > this.balance) {
        this.$toast.fail('提现金额不能大于余额！')
        return;
      }
      console.log(this.amount.split('.'));
      let numbArry = this.amount.split('.')
      console.log(numbArry);
      console.log(Number(numbArry[0]));
      numbArry[0] = Number(numbArry[0])
      //小数点前小于等于零
      if (numbArry[0] <= 0) {
        console.log('1');
        this.$toast('金额输入有误！')
        this.amount = '0.00'
        return
      } else if (numbArry.length < 2) {//当输入整数时
        console.log('2');
        console.log('aaa')
        this.amount = numbArry[0]
        return;
      } else if (numbArry[1].length <= 0) {//存在小数点并且小数点后无数字
        console.log('3');
        this.amount = numbArry[0]
        return;
      } else if (numbArry[1].length < 2) {//当小数点后长度为1 等于零||大于零的判断
        if (numbArry[1] === '0') {
          this.amount = numbArry[0]
        } else {
          this.amount = numbArry.join('.') + '0'
          console.log(this.amount);
        }
        return;
      } else if (numbArry[1].length > 2) {//当小数点右边长度大于2
        numbArry[1] = numbArry[1].slice(0, 2)
        if (numbArry[1] === '00') {//右边等于00
          this.amount = numbArry[0]
        } else {//不等00
          console.log(numbArry);
          this.amount = numbArry.join('.')
          console.log(this.amount)
        }
        return;
      }
    },
    focusAmount() {
      console.log(typeof (this.amount));
      if (this.amount === '0.00') {
        this.amount = ''
      }
    },
    // handleRecharge() {
    //   if(!this.isLogin){
    //     this.$toast.fail('请先登录')
    //     return
    //   }
    //   //判断是否为体验用户 若为体验用户 提示登录/注册
    //   if (this.userInfo.type === 'TEST') {
    //     this.isTryDialog = true
    //     //判断若是会员 是否设置了资金密码 若没有设置自己密码 跳转到设置资金密码界面
    //   }else {
    //     console.log(JSON.parse(localStorage.getItem('extInfo')))
    //     let userInfo = JSON.parse(localStorage.getItem('extInfo'))
    //     if(userInfo.fundPwd === null || userInfo.fundPwd === '4a7d1ed414474e4033ac29ccb8653d9b'){
    //       this.$toast('请先设置资金密码')
    //       this.$router.push('/setFundsPassword')
    //       //判断若会员密码 判断是否已经绑定银行卡 若无银行卡 可选择跳转到帮卡界面
    //     }else {
    //       this.$http.home.getUserInfo().then(res=>{
    //         if(res.data.userBank === null){
    //           this.$dialog.confirm({
    //             message:'资金密码已设置,是否要去绑卡',
    //           }).then(()=>{
    //             this.$router.push('/BankCardData')
    //           }).catch(()=>{})
    //         }else {
    //           this.$router.push('/withDraw')
    //         }
    //       })
    //     }
    //   }
    // },
    // handleRecharge() {
    //   this.$http.home.getUserInfo().then(res => {
    //     if (res.data.userBank === null) {
    //       this.$dialog.confirm({
    //         message: '资金密码已设置,是否要去绑卡',
    //       }).then(() => {
    //         this.$router.push('/BankCardData')
    //       }).catch(() => {
    //       })
    //     }
    //   })
    //
    // },
  }

}
</script>

<style lang="scss" scoped>
  .with-draw-box{
    .recharge-status-box{
      height: 100%;
      padding:px2rem(45px) px2rem(28px) px2rem(80px) px2rem(45px);
      ul{
        height:100%;
        padding-left: px2rem(20px);
        li{
          color:#fff;
          font-size:px2rem(14px);
          min-height: px2rem(110px);
          position: relative;
          .money{
            width:px2rem(265px);
            height:px2rem(45px);
            border-radius: px2rem(8px);
            box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.11);
            background: $skin-gray-con-bg;
            display: flex;
            align-items: center;
            padding:0 px2rem(10px);
            margin-top: px2rem(15px);
            em{
              color:#ffd57d;
            }
          }
          .iconfont{
            position: absolute;
            left:px2rem(-29px);
            color:#333441;
          }
          &:nth-of-type(1){
            .iconfont{
              background: linear-gradient(to bottom,#FFEAC0,#FFD681);
              -webkit-background-clip:text;
              -webkit-text-fill-color:transparent;
            }

          }
          h1{
            color:#fff;
            .success{
              color:#6adc90;
            }
            .error{
              color:red;
            }
          }
          h2{
            margin-bottom: px2rem(10px);
          }
          h2,p{
            color:$skin-gray-text-sub-color;
            line-height: px2rem(20px);
          }
        }
      }
      .step-button-box{
        position: fixed;
        bottom:0;
        left:0;
        width:100%;
        background: #303244;
        padding:px2rem(15px) px2rem(40px) 0;
      }
    }
    .g-content{
      background: none !important;
    }
    .add-bank-box{
      display: flex;
      padding:15px;
      >span{
        width:40px;
        height:40px;
        border-radius: 50%;
        background:#E5C29C;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        .iconfont{
          font-size:16px;
          color:#3E3D47;
        }
      }
      .add-bank-wrap{
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
        color:#585967;
        >div{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color:#77787A;
          h1{
            font-size:16px;
            color:#fff;
          }
        }
      }
    }
    /deep/ .van-notice-bar{
      background: none;
      font-size: .26rem;
      margin: .1rem;
    }
    .bank-list{
      .tips{
        font-size:px2rem(13px);
        color:#c1c1cf;
        padding:15px;
        em{
          color:#efcea6;
        }
      }
      .bankName{
        padding:15px;
      }
    }
    .withdrawalAmount{
      .withdraw-label{
        font-size:px2rem(15px);
        margin: 0;
      }
      /deep/ .van-cell{
        background: none;
      }
      /deep/ .van-password-input__security{
        border:1px solid #2F2F36;
        li{
          &:not(:last-child) {
            border-right: 1px solid #2F2F36;
          }
          background: none;
          i{
            background-color:#fff;
          }
        }

      }
    }
    /deep/ .van-notice-bar{
      .iconfont{
        margin-right: px2rem(10px);
      }
    }
    .withdrawalNotice{
      text-align: right;
      margin-top:px2rem(10px);
      margin-right:px2rem(10px);
      color:#efcea6;
    }

  }
  .skin-gray{
    .with-draw-box{
      .recharge-status-box{
        ul{
          border-left:1px #47465F solid;
          li{
            color:#fff;
            h1{
              line-height: px2rem(20px);
            }
            .money{
              background: $skin-gray-con-bg;
              em{
                color:#efcea6;
              }
            }
            &:nth-of-type(1){
              .iconfont{
                background: linear-gradient(to bottom,#FFEAC0,#FFD681);
                -webkit-background-clip:text;
                -webkit-text-fill-color:transparent;
              }
            }
            h2,p{
              color:$skin-gray-text-sub-color;
            }
          }
        }
        .step-button-box{
          background: #303244;
        }
      }
      .user,.bank-list,.withdrawalAmount{
        background:$skin-gray-con-bg;
      }
      .user{
        .balance{
          color:#9a9aa7;
        }
        .actions{
          border-color: #6d6c82;
        }
      }
      .withdrawalAmount{
        .van-password-input__security{
          border-color:$skin-gray-border-color;
          li:not(:last-child){
            border-right-color:$skin-gray-border-color;
          }
        }
        .yzcode span,p{
          color:#9a9aa7;
        }

        .vCode,
        .pCode{
          border-top:1px #5A596E solid;
        }
      }
      /deep/ .van-notice-bar{
        color: #c1c1cf;
        .iconfont{
          background-image:-webkit-linear-gradient(left,#F8E1B3,#F2D18B);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;

        }
      }
      .bank-list{
        .tips{
          &::before{
            background: linear-gradient(135deg, #ffedc6, #ffd57d 100%);
          }
        }
      }
      /*.withdrawalNotice{*/
      /*  color:#9a9aa7;*/
      /*}*/
    }


  }
  .skin-black{
    .with-draw-box{
      .recharge-status-box{
        ul{
          border-left:1px #47465F solid;
          li{
            color:#fff;
            h1{
              line-height: px2rem(20px);
            }
            .money{
              background: $skin-black-con-bg;
              em{
                color:#efcea6;
              }
            }
            &:nth-of-type(1){
              .iconfont{
                background: linear-gradient(to bottom,#FFEAC0,#FFD681);
                -webkit-background-clip:text;
                -webkit-text-fill-color:transparent;
              }
            }
            h2,p{
              color:$skin-black-text-sub-color;
            }
          }
        }
        .step-button-box{
          background: #303244;
        }
      }
      .user,.bank-list,.withdrawalAmount{
        background:$skin-black-con-bg;
      }
      .user{
        .balance{
          color:#9a9aa7;
        }
        .actions{
          border-color: #2E2E35;
        }
      }
      .withdrawalAmount{
        .yzcode span,p{
          color:#8f8f8f;
        }
        .vCode,
        .pCode{
          border-top:1px $skin-black-border-color solid;
        }
      }
      /deep/ .van-notice-bar{
        color: #9a9aa7;
        .iconfont{
          background-image:-webkit-linear-gradient(left,#A330E5,#2B69D5);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;

        }
      }
      .bank-list{
        .tips{
          &::before{
            background: linear-gradient(137deg, #c91fec, #1772d1 85%);
          }
        }
      }
      /*.withdrawalNotice{*/
      /*  color:#9a9aa7;*/
      /*}*/
    }
  }
.g-content {
  flex: 1;
  overflow: scroll;
  width: 100%;
  height: 100%;
  position: absolute !important;
  .withdrawalNotice {
    font-size: .26rem;
    text-align: right;
    text-decoration: underline;
    color: #efcea6;
    padding-right:0.2rem;
  }
}

.Balance {
  display: flex;
  padding: 10px 15px;
  justify-content: space-between;

}

.bankName {
  /*background-color: #24252d;*/
  //padding: .3rem;
  display: flex;
}

.bankName {
  /*padding: 0 .3rem .3rem;*/

  span {
    font-size: .35rem;
    margin-bottom: .1rem;
    display: inline-block;
  }

  p {
    font-size: 0.26rem;
  }
}

.withdrawalAmount {
  background: #24252d;
  margin-top: .1rem;
  padding: 0 .2rem;
  font-size: .3rem;
  color: #8f8f8f;

  > div {
    display: flex;
    align-items: center;
    &.pCode{
      padding:20px 0;
    }
  }


  // .amount {
  //   /*border-bottom: .02rem solid #393940;*/
  //   margin-bottom: .48rem;
  // }

  .inputStyle {
    width:100%;
  }

  p {
    font-size: 16px;
    margin-bottom: 0.2rem;
    white-space: nowrap;
  }

  ::v-deep.van-cell {
    /*background: #24252d;*/

    .van-field__control {
      color: white !important;
      font-size: .3rem;
    }
  }
}

.bankNameLeft img {
  width: 0.8rem;
  height: 0.8rem;
}

.bankNameRight {
  padding-left: .2rem;

  span {
    font-size: .32rem;
    color: white;
  }

  p {
    font-size: .26rem;
    color: #8f8f8f;
  }
}

.price {
  padding-top: .3rem;
  display: flex;
  font-size: .5rem;
}

.m-btns {
  padding-top: .75rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.m-btn, .m-button {
  color: #fff;
  background-color: #dd413a;
  width: 6.9rem;
  height: .8rem;
  line-height: .8rem;
  font-size: .36rem;
  margin: auto;
  border-radius: .1rem;
  text-align: center;
}

.disable {
  background-color: #eda6a6;
}

.user-balance {
  /*  -webkit-box-shadow: 0 -5px 5px #f5f5f9 inset;*/
  /*  box-shadow: inset 0 -5px 5px #f5f5f9;*/
  /*  height: 1.83rem;*/
  border-top-left-radius: .1rem;
  border-top-right-radius: .1rem;
  position: absolute;
  display: inline-block;
  /*  width: 93%;*/
  /*  bottom: 0;*/
  /*  left: 50%;*/
  /*  margin-left: -46.5%;*/
}

.balance {
  font-size: .26rem;
  margin-top: .4rem;
  color: #666;

}

.b-money {
  color: #dd413a;
  display: flex;
  font-size: .3rem;
}

.refresh {
  bottom: .01rem;
  right: -0.4rem;
  font-size: .26rem;
  color: #000;
  position: absolute;
}

.turn {
  transition: all 1s;
  transform: rotate(2turn);
}

.hiddenStyle {
  display: none;
}

/*.van-password-input li {
  border: 1px solid rgb(245, 245, 249);
}*/

.yzcode {
  display: flex;
  height: 1.04rem !important;
  align-items: center !important;
  /*text-indent: .3rem !important;*/
  font-size: .3rem !important;
  padding:0 0.2rem;
  /*background-color: #24252d !important;*/

  ::v-deep.van-cell {
    /*background: #24252d !important;*/

    .van-field__control {
      color: white !important;
      font-size: .3rem;
    }
  }

  input {
    height: .42rem !important;
    background-color: #24252d !important;
    text-indent: .3rem !important;
  }

  img {
    width: 1.74rem !important;
    /*height: .74rem !important;*/
  }

  span {
    white-space: nowrap;
    font-size: .3rem;
    /*color: #8f8f8f;*/
  }
}

//.vCode {
//  width: 100%;
//  display: flex;
//  margin-top: .1rem;
//  background-color: #ffffff;
//  padding-left: .3rem;
//  display: flex;
//  align-items: center;
//  font-size: .3rem;
//}
//
//.vCode img {
//  width: 1.5rem;
//  height: auto;
//}

//.tip {
//  margin: .1rem 0 .1rem 0;
//  line-height: .6rem;
//}

//.tips {
//  padding: .1rem .2rem 0 .2rem;
//  font-size: .3rem;
//  line-height: .6rem;
//}

//.line {
//  color: #0090ff;
//}

.user {
  // width: 6.94rem !important;
  height: 1.4rem !important;
  margin: .28rem .28rem 0rem !important;
  border-radius: .2rem !important;
  -webkit-backdrop-filter: blur(.36rem) !important;
  backdrop-filter: blur(.36rem) !important;
  /*background-color: #24252d !important;*/
  font-size: .24rem !important;
  font-weight: 500 !important;
  color: white !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .avatar {
    img {
      width: .84rem !important;
      height: .84rem !important;
      margin: 0 .24rem 0.02rem 0.4rem !important;
    }
  }
  .details {
    flex-grow: 1;
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.4rem;
    height: 32px;
    border-left: 1px solid #4a4a51;
    .balance {
      color: #9a9aa7 !important;
      padding-top: .1rem !important;


      em {
        font-size: 14px !important;
        /*font-weight: 600 !important;*/
        color: white !important;
        margin-right: 8px;
      }
    }
  }
  .name{
    font-size:14px;
    margin-bottom: 10px;
  }


}

.tip {
  .van-notice-bar {
    /*background: #191b1f !important;*/
    /*font-size: .26rem !important;*/
    /*color: #9a9aa7 !important;*/
    /*margin: .1rem !important;*/
  }

  .van-image {
    padding-right: .2rem !important;
  }
}

//在线客服提示部分
.tips {
  /*font-size: .26rem !important;*/
  /*color: #9a9aa7 !important;*/
  /*padding: .3rem !important;*/
  /*background-color: #24252d;*/
}

.tips::before {
  content: '';
  display: inline-block;
  width: .12rem;
  height: .12rem;
  border-radius: 50%;
  /*background-image: linear-gradient(137deg, #c91fec, #1772d1 85%);*/
  vertical-align: middle;
  margin-right: .16rem;
}

.tips {
  /*content: '';
  display: inline-block;
  width: 7.1rem;
  height: .02rem;
  background-color: #393940;*/
  @include border-1px(#59576E);
}


//.user-info {
//  display: flex;
//  align-items: center;
//  justify-content: flex-start;
//  padding: .34rem .3rem;
//  background: #fff;
//  margin-bottom: .1rem;
//img{
//  margin-right: .44rem;
//}
//.name{
//  font-size: .36rem;
//}
//.balance{
//  font-size: .33rem;
//  line-height: .5rem;
//  position: relative;
//.account{
//  color: #c00;
//  font-weight: 400;
//  font-style: normal;
//}
//.iconfont{
//  color: #666;
//  position: absolute;
//  left: 4.5rem;
//  top: -.15rem;
//  font-size: .48rem;
//}
//}
//}
</style>
