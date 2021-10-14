<template>
  <div class="alipay-box">
    <Header :headObj="headObj" @leftClick="step !==1 ? step-- : $router.push('/recharge')"
            @rightClick="$router.push('/rechargeExplain')"/>

    <div class="alipay-wrap">
      <div class="alipay-con">
        <div class="alipay-one" v-show="step === 1">
          <h1 class="tips">
            <i18n path="lang.aliPay.selectWay">
              <template #service>
                <em class="line" @click="showDialog = true">{{$t('lang.aliPay.service')}}</em>
              </template>
            </i18n>
          </h1>
          <NotData v-if="payAccount.length<=0" :isNotData="payAccount.length<=0"/>
<!--          <NotData v-if="isLoading" :isNotData="isLoading"/>-->
          <ul v-else class="alipay-item-box">
            <li v-for="(item,index) in payAccount"
                :key="item.account"
                @click="saveData(item, index)">
              <img :src="'/data/payPicture/' + code + '.png'" alt=""/>
              <div class="alipay-item-con">
                <h1>{{ item.name }}</h1>
                <p>{{ item.remarks }}</p>
              </div>
              <i class="iconfont iconic-right"></i>
            </li>
          </ul>
        </div>
        <div class="alipay-two" v-show="step === 2">
          <div class="alipay-two-item 11"  v-if="currentBank.qrCode">
            <ul>
              <li>
                <label>{{ currentBank.name }}</label>
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
                <label>{{$t('lang.bankPay.receivingName')}}</label>
                <span>{{ currentBank.account }}</span>
                <button class="copy-btn"
                        @click="fuzhi()"
                        :data-clipboard-text="currentBank.account"
                        v-show="currentBank.account">{{$t('lang.common.copy')}}</button>
              </li>
<!--              <li>-->
<!--                <label>{{$t('lang.bankPay.depositName')}}</label>-->
<!--                <input type="text"-->
<!--                       :placeholder="$t('lang.bankPay.enterDepositName')"-->
<!--                       v-model="ckName">-->
<!--              </li>-->
<!--              <li>-->
<!--                <label>{{$t('lang.common.remark')}}</label>-->
<!--                <input type="text"-->
<!--                       :placeholder="$t('lang.bankPay.enterRemark')"-->
<!--                       v-model="remark">-->
<!--              </li>-->
              <li v-if="yzcode">
                <label>{{$t('lang.common.verificationCode')}}</label>
                <div class="vode-input-box">
                  <input v-model="yzValue" type="text" maxlength="4"
                         :placeholder="$t('lang.common.pleaseEnterVerificationCode')"
                         onkeypress='return( /[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))'/>
                  <img @click="getVerifyCode" :src="verifyCodeImg" alt="" class="mod-vode-img">
<!--                  <img @click="handleChangeImg" class="mod-vode-img" :src="'/v/vUserCode?t=' + t">-->
                </div>
              </li>
              <li>
                <label>{{$t('lang.bankPay.rechargeMoney')}}</label>
                <div class="vode-input-box">
                  <input type="number" v-model="inputValue"
                         :placeholder="$t('lang.bankPay.inputMoney')"
                         maxlength="10" disabled>
<!--                  <input type="number" v-model="inputValue"-->
<!--                         :placeholder="$t('lang.bankPay.inputMoney')"-->
<!--                         v-if="currentBank.isAddFixed" maxlength="10" disabled>-->
<!--                  <input type="number" v-model="inputValue"-->
<!--                         :placeholder="$t('lang.bankPay.inputMoney')"-->
<!--                         onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))'-->
<!--                         maxlength="10" v-else>-->
                  <span class="unitYuan">{{$t('lang.common.yuan')}}</span>
                </div>
              </li>
            </ul>
            <div class="moneycontent">
              <div v-for="item in currentBank.fixedMoney" :key="item" @click="setinput(item)"
                   :class="activeClass === item ? 'active' : ''">{{ item }}{{$t('lang.common.yuan')}}
              </div>
<!--              <div v-if="payArr % 3 !== 0" style="visibility: hidden"></div>-->
            </div>
            <div class="alipay-qrCode-box">
              <img :src="currentBank.qrCode" alt=""/>
              <p>{{$t('lang.aliPay.screenPay')}}</p>
            </div>
          </div>
          <div class="alipay-two-item 22" v-else>
            <ul>
              <li>
                <label>{{$t('lang.bankPay.rechargeMethod')}}</label>
                <span>{{ currentBank.name }}</span>
               </li>
<!--              <li>-->
<!--                <label>{{$t('lang.bankPay.depositName')}}</label>-->
<!--                <input type="text"-->
<!--                       :placeholder="$t('lang.bankPay.enterDepositName')"-->
<!--                       v-model="ckName">-->
<!--              </li>-->
<!--              <li>-->
<!--                <label>{{$t('lang.common.remark')}}</label>-->
<!--                <input type="text"-->
<!--                       :placeholder="$t('lang.bankPay.enterRemark')"-->
<!--                       v-model="remark">-->
<!--              </li>-->
              <li v-if="rechargeConfig && rechargeConfig.validateCodeEnabled">
                <label>{{$t('lang.common.verificationCode')}}</label>
                <div class="vode-input-box">
                  <input v-model="yzValue" type="text" maxlength="4"
                         :placeholder="$t('lang.common.pleaseEnterVerificationCode')"
                         onkeypress='return( /[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))'/>
                  <img @click="getVerifyCode" :src="verifyCodeImg" alt="" class="mod-vode-img">
<!--                  <img @click="handleChangeImg" class="mod-vode-img" :src="'/v/vUserCode?t=' + t">-->
                </div>
              </li>
              <li>
                <label>{{$t('lang.bankPay.rechargeMoney')}}</label>
                <div class="vode-input-box">
                  <input type="number" v-model="inputValue"
                         :placeholder="$t('lang.bankPay.inputMoney')"
                         maxlength="10" disabled>
<!--                  <input type="number" v-model="inputValue"-->
<!--                         :placeholder="$t('lang.bankPay.inputMoney')"-->
<!--                         v-if="currentBank.isAddFixed" maxlength="10" disabled>-->
<!--                  <input type="number" v-model="inputValue"-->
<!--                         :placeholder="$t('lang.bankPay.inputMoney')"-->
<!--                         onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))'-->
<!--                         maxlength="10" v-else>-->
                  <span class="unitYuan">{{$t('lang.common.yuan')}}</span>
                </div>
              </li>
            </ul>
            <div class="moneycontent">
              <div v-for="item in currentBank.fixedMoney" :key="item" @click="setinput(item)"
                   :class="activeClass === item ? 'active' : ''">{{ item }}{{$t('lang.common.yuan')}}
              </div>
<!--              <div v-if="payArr % 3 !== 0" style="visibility: hidden"></div>-->
            </div>
          </div>
          <div class="alipay-two-tips">
            <p class="moneyRange" v-if="currentBank.isAddFixed">固定金额，不可修改金额，仅支持以上金额！</p>
            <p class="moneyRange" v-if="rechargeConfig">
              {{ $t('lang.RechargeData.SupportedAmount') }}{{rechargeConfig.minAmount}}~{{rechargeConfig.maxAmount}}
            </p>
            <!--          <div class="footer">-->
            <!--            <button @click="recharged">{{ currentBank.qrCode ? '已支付,我要提单' : '确认' }}</button>-->
            <!--          </div>-->
            <div class="step-button-box">
              <button @click="recharged" class="btn-type2">
                {{ currentBank.qrCode ? $t('lang.bankPay.havePaid') :
                $t('lang.common.buttonTextConfirm')}}</button>
            </div>
            <p class="tips">
              {{$t('lang.common.ifCallService')}}<em class="line" @click="showDialog=true"> {{$t('lang.bankPay.onlineService')}}</em>
            </p>
            <div class="recharge-tips alipay-recharge-step" v-if="currentBank.qrCode && currentBank.payType === 'alipay'">
              <div>{{$t('lang.aliPay.rechargeSteps')}}：</div>
              <div>1.{{$t('lang.aliPay.keepPage')}}</div>
              <div>Iphone:{{$t('lang.aliPay.pressSame')}}
                <span>{{$t('lang.aliPay.powerKey')}}</span>
                {{$t('lang.aliPay.and')}}
                <span>{{$t('lang.aliPay.homeKey')}}</span>
                {{$t('lang.aliPay.screenshot')}}；
              </div>
              <div>Android:{{$t('lang.aliPay.pressSame')}}
                <span>{{$t('lang.aliPay.powerKey')}}</span>
                {{$t('lang.aliPay.and')}}
                <span>{{$t('lang.aliPay.volumeDownKey')}}</span>
                {{$t('lang.aliPay.screenshot')}}；
              </div>
              <div>2.{{$t('lang.aliPay.openAlipay')}}</div>
              <img src="../../assets/img/pay-guid/zfb_step_3.93d4dc6.png">
              <div>3.{{$t('lang.aliPay.selectSweep')}}</div>
              <img src="../../assets/img/pay-guid/zfb_step_4.f3e9bb2.png">
              <div>4.{{$t('lang.aliPay.clickScan')}}</div>
              <img src="../../assets/img/pay-guid/zfb_step_5.08777c3.png">
              <div>5.{{$t('lang.aliPay.inputAmount')}}
                <span>({{$t('lang.aliPay.sameOrder')}})</span>
              </div>
              <img src="../../assets/img/pay-guid/zfb_step_6.a7d3c42.png">
              <div>6.{{$t('lang.aliPay.addNote')}}
                <span>“kaka999”</span>
              </div>
              <div>7.{{$t('lang.aliPay.returnApp')}}
                <span>“{{$t('lang.aliPay.havePaid')}}”</span>
              </div>
            </div>
            <div class="recharge-tips alipay-recharge-step" v-if="currentBank.qrCode && currentBank.payType === 'wechat'">
              <div>{{$t('lang.wechat.tips[0]')}}：</div>
              <div>{{$t('lang.wechat.tips[1]')}}</div>
              <div>{{$t('lang.wechat.tips[2]')}}
                <span>{{$t('lang.wechat.tips[3]')}}</span>
                {{$t('lang.wechat.tips[4]')}}
                <span>{{$t('lang.wechat.tips[5]')}}</span>
                {{$t('lang.wechat.tips[6]')}}；
              </div>
              <div>{{$t('lang.wechat.tips[7]')}}
                <span>{{$t('lang.wechat.tips[8]')}}</span>
                {{$t('lang.wechat.tips[9]')}}
                <span>{{$t('lang.wechat.tips[10]')}}</span>
                {{$t('lang.wechat.tips[11]')}}；
              </div>
              <div>{{$t('lang.wechat.tips[12]')}}</div>
              <img src="../../assets/img/pay-guid/wechat_img1.png">
              <div>{{$t('lang.wechat.tips[13]')}}</div>
              <div>{{$t('lang.wechat.tips[14]')}}</div>
              <img src="../../assets/img/pay-guid/zfb_step_5.08777c3.png">
              <div>{{$t('lang.wechat.tips[15]')}}
                <span>({{$t('lang.wechat.tips[16]')}})</span>
              </div>
              <img src="../../assets/img/pay-guid/wechat_img2.png">
              <div>{{$t('lang.wechat.tips[17]')}}
                <span>{{$t('lang.wechat.tips[18]')}}</span>
              </div>
              <div>{{$t('lang.wechat.tips[19]')}}
                <span>“{{$t('lang.wechat.tips[20]')}}”</span>
              </div>
              <br>
              <br>
              <br>
              <br>
            </div>
          </div>

        </div>
        <div class="alipay-three" v-show="step === 3">
          <ul>
            <li>
              <i class="iconfont iconyuanquan"></i>
              <h1>
                {{$t('lang.bankPay.firstStep')}}
                <em class="success">{{$t('lang.bankPay.success')}}</em>
              </h1>
              <div class="money">{{$t('lang.bankPay.rechargeMoney')}}：<em>{{ inputValue }}</em></div>
            </li>
            <li>
              <i class="iconfont iconyuanquan"></i>
              <h2>{{$t('lang.bankPay.rechargeSuccess')}}</h2>
              <p>{{$t('lang.bankPay.thirdStep')}} <em @click="showDialog=true">{{$t('lang.common.contactService')}}</em></p>
            </li>
          </ul>
          <div class="step-button-box">
            <button
                    @click="$router.push('/user'),step = 1"
                    class="btn-type2">{{$t('lang.common.buttonTextConfirm')}}</button>
          </div>
        </div>

      </div>

    </div>
    <Customerserve :showDialog="showDialog" @closeDialog="handleCloseDialog"/>
  </div>
</template>

<script>
import format from '@/format.js'
import {Dialog, Toast} from 'vant'
import Clipboard from 'clipboard'
import {mapActions, mapState} from "vuex";

export default {
  components: {
    Header: resolve => require(['../../commons/header/Header'], resolve),
    Customerserve: resolve => require(['../../commons/customerserve/Customerserve'], resolve),
    NotData: resolve => require(['../../commons/notdata/NotData'], resolve)
  },
  data() {
    return {
      isLoading: true, // 数据是否加载完成
      minMoney: '', // 最小金额
      maxMoney: '', // 最大金额
      yzcode: true, // 是否需要验证码,之前默认是false
      yzValue: '', // 验证码
      t: Date.now(),
      step: 1, // 当前进度
      headObj: {
        title: this.$t('lang.header.topUp'),
        showArrow: true,
        rightText: this.$t('lang.bankPay.rechargeExplain'),
      },
      showDialog: false,
      isOther: false,
      show: false,
      value: '',
      groupId: '',
      activeClass: '',
      data: [],
      code: '',
      currentBank: {},
      payArr: '',
      inputValue: '',
      ckaddTime: format(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
      remark: '',
      ckName: '',
      imgUrl: '',
      getCode:this.$route.query.code
    }
  },
  created() {
    this.getPayAccount({payType:this.$route.query.code});
    // this.getVerifyCode();
    // this.getPayInfo();
  },
  computed:{
    ...mapState([
      'verifyCodeImg',
      'payAccount',
      'rechargeConfig',
      'imgAddress'
    ]),
    // disabled(){
    //   if(this.ckName && this.yzValue && this.inputValue){
    //     return false;
    //   }else{
    //     return true;
    //   }
    // }
  },
  methods: {
    ...mapActions([
      'getVerifyCode',
      'getPayAccount',
      'getRechargeConfig'
    ]),
    fuzhi() {
      let clipboard = new Clipboard('.copy-btn')
      clipboard.on('success', (e) => {
        this.$toast.success({
          message: this.$t('lang.state.copySuccess'),
          forbidClick: true,
        });
        e.clearSelection()
        clipboard.destroy()// 复制成功后删除实例
      })
    },
    // 获取支付信息
 /*   getPayInfo() {
      // alert('sssss')
      console.log(this.payAccount,'payAccount2222');
      const [onlineID, transferID] = [this.$route.query.onlineID, this.$route.query.transfer]
      this.code = this.$route.query.code
      // 线上支付
      this.data = [];
      if (Number(onlineID) === 1) {
        this.$http.account.queryPayChannels({payType: this.code}).then(res => {
          console.log(res,'线上支付333333333')
          /!*if (res.data.length <= 0) {
            return Dialog.alert({message: this.$t('lang.bankPay.payMaintain')})
          }*!/
          this.data.push(...res.data)
          this.isLoading = false
          return true
        }).then(item => {
          if (!item) return
          this.$http.account.queryRechargeConfig({mode: 2, payType: this.code}).then(res => {
            if (res.data.validateCodeEnabled) this.yzcode = true
            this.minMoney = Number(res.data.minAmount) + '.00'
            this.maxMoney = Number(res.data.maxAmount) + '.00'
          })
        }).catch(err => console.warn(err))
      }
      // 线下支付宝 逻辑
      if (Number(transferID) === 1) {
        this.$http.account.queryPayAccounts({payType: this.code, time: new Date().getTime()}).then(res => {
          console.log(res,'线下支付宝 逻辑333333333')
          if (res.data.length > 0) {
            this.data.push(...res.data)
            this.isLoading = false
            this.$http.account.queryRechargeConfig({mode: 1, payType: this.code}).then(res => {
              if (res.data.validateCodeEnabled) {
                this.yzcode = true
              }
            })
          } else {
            Dialog.alert({message: this.$t('lang.bankPay.payMaintain')})
          }
        })
      }
    },*/
    // 支付渠道选择
    saveData(item) {
      this.resetData();
      this.getVerifyCode();
      const [onlineID, transferID] = [this.$route.query.onlineID, this.$route.query.transfer];
      // console.log(onlineID,'onlineID111',transferID,'transferID22222');
      // console.log(item,'item22222222222');
      let params = {
        payType:this.$route.query.code,
      };
      if (Number(onlineID) === 1) {
        params.mode = 2;
      }
      if (Number(transferID) === 1) {
        params.mode = 1;
      }
      // console.log(params, 'params2222222222');
      this.getRechargeConfig(params);
      // console.log(item,222)
      this.currentBank = item;
      // console.log(item,this.currentBank,'支付渠道选择');
      // 判断是否返回固定金额
      if (item.fixedMoney) {
        // console.log(this.currentBank.fixedMoney,222);
        let fixedMoney = this.currentBank.fixedMoney.toString();
        // console.log(fixedMoney,this.currentBank.fixedMoney,'fixedMoney2222222222');
        if(this.currentBank.fixedMoney){
          this.currentBank.fixedMoney = fixedMoney.split(',');
          this.currentBank.fixedMoney.map((item, i) => {
            this.currentBank.fixedMoney[i] = item
            // this.currentBank.fixedMoney[i] = item + '.00'
          })
          this.currentBank.isAddFixed = true
        }

      } else {
        this.currentBank.fixedMoney = ['300', '400', '500', '1000', '2000']
        this.currentBank.isAddFixed = false
      }
      this.payArr = this.currentBank.fixedMoney.length
      this.step++
    },
    // 金额选择
    setinput(value) {
      this.inputValue = value
      this.activeClass = value
    },
    // 确认充值
    recharged() {
      // console.log(Number(this.maxMoney),111);
      let minMoney = this.rechargeConfig.minAmount;
      let maxMoney = this.rechargeConfig.maxAmount;
      let yzcode = this.rechargeConfig.validateCodeEnabled;
      if (Number(this.inputValue) < Number(minMoney)) {
        this.$toast.fail({message: `${this.$t('lang.aliPay.minimumAmount')}${minMoney}`, forbidClick: true})
      } else if (Number(this.inputValue) > Number(maxMoney)) {
        this.$toast.fail({message: `${this.$t('lang.aliPay.maximumAmount')}${maxMoney}`, forbidClick: true})
      } else if (!this.yzValue && yzcode) {
        Toast.fail(this.$t('lang.common.pleaseEnterVerificationCode'))
      } else {

        if (this.currentBank.qrCode) {
          Dialog.confirm({
            title: '',
            message: this.$t('lang.aliPay.submitOrder')
          }).then(() => {
            this.qrCodetranster();
          });
        } else {
          Dialog.confirm({
            title: '',
            message: this.$t('lang.aliPay.goPage'),
            cancelButtonText:this.$t('lang.common.btn[2]'),
            confirmButtonText:this.$t('lang.common.btn[5]'),
          }).then(() => {
            this.step++
          /*  this.headObj = {
              title: this.$t('lang.RechargeData.rechargeStatus'),
              showArrow: false,
              rightText: ''
            }*/
            let url = '';
            yzcode ? url = `/api/recharge/onlinePay?payChannelId=${this.currentBank.id}&amount=${this.inputValue}&yzmNum=${yzValue}` : url = `/api/recharge/onlinePay?payChannelId=${this.currentBank.id}&amount=${this.inputValue}`;
            window.open(url)
          });
        }

      }
    },
    qrCodetranster() {
      const data = {
        payAccountId: this.currentBank.id,
        // rechargePerson: this.ckName,
        // rechargeTime: this.ckaddTime,
        amount: this.inputValue,
        yzmNum: this.yzValue,
        remark: this.remark,
      }
      this.$toast.loading(this.$t('lang.common.loading'))
      this.$http.account.queryTransfer(data).then((res) => {
        console.log(res,'提交了');
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
        this.$toast.success({
          message: err.data.msg,
          forbidClick: true,
        });
        this.t = Date.now();
      })
    },
    handleChangeImg() {
      this.t = Date.now()
    },
    // 关闭客服弹窗
    handleCloseDialog(val) {
      this.showDialog = val
    },
    resetData(){
      this.yzValue = '';
      this.inputValue = '';
      this.activeClass = '';
    }
  }
}
</script>

<style lang="scss" scoped>
  .alipay-box{
    height:100%;
    display: flex;
    flex-direction: column;
    background: #191B1F;
    .moneycontent{
      margin:0 px2rem(15px);
    }
    .alipay-qrCode-box{
      text-align: center;
      padding:px2rem(15px);
      p{
        margin-top:px2rem(15px);
        font-size: px2rem(18px);
        color: #ffd57d;
      }
    }
    .alipay-recharge-step{
      margin-top: px2rem(15px);
      >div{
        font-size: px2rem(14px);
        line-height: px2rem(25px);
        span{
          color:red;
        }
        img{
          width: 100%;
          border-radius: 8px;
          border:4px solid #fff;
        }
      }
    }
    .alipay-wrap{
      flex:1;
      overflow-y: scroll;
      .alipay-con{
        .alipay-one{
          overflow: hidden;
          background: #24252D;
          box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
          .tips{
            color:#8f8f8f;
            font-size: px2rem(13px);
            margin:15px 15px 0 15px;
            line-height: 30px;
            em{
              color:#efcea6;
            }
          }
        }
      }
      .alipay-item-box{
        li{
          min-height: 90px;
          padding:px2rem(10px) 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          &:not(:last-child){
            @include border-1px(#2F2F36);
          }
          img{
            width:px2rem(45px);
            margin:0 px2rem(15px);
          }
          .iconfont{
            margin-right: px2rem(15px);
            color:#7A8188;
          }
          .alipay-item-con{
            margin-right: px2rem(15px);
            flex:1;
            h1{
              font-size: px2rem(16px);
              line-height: px2rem(25px);
              color:#fff;
            }
            p{
              font-size: px2rem(12px);
              line-height: px2rem(25px);
              color:#9a9aa7;
            }
          }
        }

      }

      .alipay-two{
        .alipay-two-item{
          background: #24252D;
          margin:px2rem(15px) 0;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .alipay-two-tips{
          font-size: px2rem(13px);
          line-height: px2rem(20px);
          padding:0 px2rem(15px) px2rem(15px);
          color:#606070;
          .tips{
            text-align: center;
            color:#606070;
            .line{
              color:#efcea6;
            }
          }
        }
        ul{
          li{
            display: flex;
            min-height: 50px;
            align-items: center;
            font-size: px2rem(15px);
            padding:0 px2rem(15px);
            @include border-1px(#2F2F36);
            label{
              width: px2rem(110px);
              color:#8f8f8f;
            }
            span:not(.unitYuan){
              flex:2;
              color:#fff;
            }
            .unitYuan{
              flex:1;
              color:#fff;
              text-align: right;
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

      .alipay-three {
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
            .money {
              width: px2rem(265px);
              height: px2rem(45px);
              border-radius: px2rem(8px);
              box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.11);
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
                color:#E6C39D;
              /*  background: linear-gradient(to bottom, #FFEAC0, #FFD681);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;*/
              }

            }
            h1 {
              color: #fff;
              .success {
                color: #6adc90;
              }
              .error {
                color: red;
              }
            }
            h2 {
              margin-bottom: px2rem(10px);
            }
            h2, p {
              color: #9a9aa7;
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

  }

  .skin-gray{
    .alipay-box{
      .alipay-wrap{
        background: $skin-gray-bg;
        .alipay-con .alipay-one{
          background: $skin-gray-con-bg;
        }
        .alipay-item-box li{
          &:not(:last-child){
            @include border-1px($skin-gray-border-color);
          }
        }

        .alipay-two{
          .alipay-two-item{
            background: $skin-gray-con-bg;
          }

          ul li {
            @include border-1px($skin-gray-border-color);
            label{
              color:#9a9aa7;
            }
          }
          .alipay-two-tips{
            &,.tips{
              color:#9a9aa7;
            }

          }
        }
        .alipay-three ul li .money{
          background: $skin-gray-con-bg;
        }
      }
    }
  }

/*  .skin-leisure-blue{
    .alipay-box{
      .alipay-wrap .alipay-one .tips .line,
      .alipay-wrap .alipay-two .alipay-two-tips .tips .line{
        color:$skin-leisure-blue-active-text-color;
      }
      .alipay-three{
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
