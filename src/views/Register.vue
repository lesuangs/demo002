<template>
  <div class="register register-box">
    <!--<div class="tian-nav">-->
    <!-- <van-sticky style="width: 100%;"> -->
    <Header :headObj="headObj"
            @leftClick="$router.push('/')"
            @rightClick="$router.push('/reg')"/>
    <!-- </van-sticky> -->
    <!--</div>-->
    <div class="content register-wrap">
      <div class="form">
        <van-form @submit="onSubmit" @failed="onFailed">
          <van-field
                  v-model="regObj.account"
                  :label="$t('lang.register.loginAccount[0]')"
                  :placeholder="$t('lang.register.loginAccount[1]')"
                  label-width="80"
                  :clearable="true"
                  required
                  @blur="checkAccount"
                  :error-message="hasAccount ? $t('lang.register.hasValue[0]') : ''"
                  :rules="nameRules">
            <!--            <span class="spanStyles">{{hasAccount}}{{ hasAccount ? $t('lang.registerContent.accountAlreadyExists') : '' }}</span>-->
          </van-field>

          <van-field
                  v-model="regObj.password"
                  :type="pwdType"
                  :label="$t('lang.register.userPwd[0]')"
                  :clearable="true"
                  label-width="80"
                  required
                  :right-icon="eyesIcon"
                  @click-right-icon="handleRightIcon('pwd')"
                  :placeholder="$t('lang.register.userPwd[1]')"
                  :rules="pwdRules" />
          <van-field
                  v-model="regObj.confirmPassword"
                  :type="confirmType"
                  :label="$t('lang.register.confirmPwd[0]')"
                  :clearable="true"
                  label-width="80"
                  required
                  :right-icon="confirmEyes"
                  @click-right-icon="handleRightIcon('confirmPwd')"
                  :placeholder="$t('lang.register.confirmPwd[1]')"
                  :rules="[{ required: true, message: $t('lang.register.confirmPwd[1]') }]" />
          <div class="vCode">
            <!--                :required="registerLimit.vCode == 1?true:false"-->
            <van-field
                    v-if="registerLimit.vCode !=undefined && registerLimit.vCode != 2"
                    v-model="regObj.vCode"
                    :label="$t('lang.registerContent.vCode[0]')"
                    label-width="80"
                    maxlength="4"
                    required
                    :clearable="true"
                    :placeholder="$t('lang.registerContent.vCode[1]')"
                    :rules="[{ required: true, message: $t('lang.registerContent.vCode[2]') }]"/>
            <div class="code-img-box">
              <img @click="handleChangeImg" :src="'/v/vCode?t=' + t" alt="">
            </div>
          </div>
          <van-field
                  v-if="registerLimit.intrCode !=undefined && registerLimit.intrCode != 2"
                  v-model="regObj.intrCode"
                  :label="$t('lang.registerContent.invitationCode')"
                  label-width="80"
                  :clearable="true"
                  :required="registerLimit.intrCode == 1?true:false"
                  :placeholder="$t('lang.registerContent.pleaseEnterTheInvitationCode')"
                  :rules="registerLimit.intrCode == 1?[{ required: true, message: $t('lang.registerContent.pleaseEnterTheInvitationCode') }]:[]"/>
          <van-field
                  v-if="registerLimit.fullName !=undefined && registerLimit.fullName != 2"
                  v-model="regObj.fullName"
                  :label="$t('lang.registerContent.realName[0]')"
                  :required="registerLimit.fullName == 1?true:false"
                  label-width="80"
                  :clearable="true"
                  :placeholder="$t('lang.registerContent.realName[1]')"
                  @blur="checkFullName"
                  :rules="registerLimit.fullName == 1?[{ required: true, message: $t('lang.registerContent.realName[1]') }]:[]" />
          <span class="spanStyles">{{ hasFullName ? $t('lang.registerContent.realName[2]') : '' }}</span>
          <van-field
                  v-if="registerLimit.email !=undefined && registerLimit.email != 2"
                  v-model="regObj.email"
                  :label="$t('lang.registerContent.emailInfo[0]')"
                  :required="registerLimit.email == 1?true:false"
                  label-width="80"
                  required
                  :clearable="true"
                  :placeholder="$t('lang.registerContent.emailInfo[1]')"
                  :rules="registerLimit.email == 1?emailRules:[]" />
          <van-field
                  v-if="registerLimit.phone !=undefined && registerLimit.phone != 2"
                  v-model="regObj.phone"
                  :label="$t('lang.registerContent.phoneInfo[0]')"
                  type="digit"
                  :required="registerLimit.phone != 1?true:false"
                  label-width="80"
                  :clearable="true"
                  :placeholder="$t('lang.registerContent.phoneInfo[1]')"
                  @blur="checkPhone"
                  :rules="registerLimit.phone != 1?phoneRules:[]" />
          <span class="spanStyles">{{ hasPhone ? $t('lang.registerContent.phoneInfo[2]') : '' }}</span>
          <van-field
                  v-if="registerLimit.intrMobileCode !=undefined && registerLimit.intrMobileCode != 2"
                  v-model="regObj.intrMobileCode"
                  :label="$t('lang.registerContent.phonePromotion[0]')"
                  :required="registerLimit.intrMobileCode == 1?true:false"
                  label-width="80"
                  :clearable="true"
                  :placeholder="$t('lang.registerContent.phonePromotion[1]')"
                  :rules="registerLimit.intrMobileCode == 1?[{ required: true, message: $t('lang.registerContent.phonePromotion[1]') }]:[]" />
          <van-field
                  v-if="registerLimit.qq !=undefined && registerLimit.qq != 2"
                  v-model="regObj.qq"
                  :label="$t('lang.registerContent.qqNumber[0]')"
                  type="digit"
                  :required="registerLimit.qq == 1?true:false"
                  label-width="80"
                  :clearable="true"
                  :placeholder="$t('lang.registerContent.qqNumber[1]')"
                  :rules="registerLimit.qq == 1?qqRules:[]" />
          <van-field
                  v-if="registerLimit.weixin !=undefined && registerLimit.weixin != 2"
                  v-model="regObj.weixin"
                  :label="$t('lang.registerContent.weChat[0]')"
                  :required="registerLimit.weixin == 1?true:false"
                  label-width="80"
                  :clearable="true"
                  :placeholder="registerLimit.wechatPlaceholder"
                  :rules="registerLimit.weixin == 1?weChatRules:[]" />
          <van-field
                  v-if="registerLimit.birthday !=undefined && registerLimit.birthday != 2"
                  v-model="regObj.birthday"
                  :label="$t('lang.registerContent.bornInfo[0]')"
                  :required="registerLimit.birthday == 1?true:false"
                  label-width="80"
                  :clearable="true"
                  :placeholder="$t('lang.registerContent.bornInfo[1]')"
                  @click="showPicker=true"
                  :rules="registerLimit.birthday == 1?[{ required: true, message: $t('lang.registerContent.bornInfo[2]') }]:[]" />
          <van-field
                  v-if="registerLimit.fundPwd == 1"
                  v-model="regObj.fundPwd"
                  type="digit"
                  maxlength="4"
                  :required="registerLimit.fundPwd == 1?true:false"
                  label-width="80"
                  :clearable="true"
                  :label="$t('lang.registerContent.fundPwd[0]')"
                  :placeholder="$t('lang.registerContent.fundPwd[1]')"
                  :rules="registerLimit.fundPwd == 1?fundPwdRules:[]"></van-field>
          <div class="m-form-tips">
            <h3>{{ $t('lang.changePassword.passwordRules') }}：</h3>
            <p>{{ $t('lang.register.userPwd[2]') }}</p>
          </div>

          <div class="step-button-box">
            <button class="btn-type2"
                    :class=" disabled ? 'disable' : ''"
                    :disabled="disabled"
                    block native-type="submit">{{ $t('lang.loginContent.registerNow') }}</button>


          </div>
        </van-form>
      </div>
      <div class="tip"> {{ $t('lang.registerContent.alreadyHaveAnAccount') }}？
        <em class="theme-color" @click="$router.push('/login')">{{ $t('lang.registerContent.signInNow') }}</em>
      </div>
      <footer class="footerTip">
        <p> {{ $t('lang.reg.zhuYiShiXiang') }}</p>
        {{ $t('lang.registerContent.agreedTreaties') }}
        <em class="link-color" @click="handleOpenAgree">"{{ $t('lang.registerContent.openAgreement') }}"</em>
      </footer>
    </div>
    <van-popup v-model="showPicker" position="bottom" :overlay="false">
      <van-datetime-picker
              v-model="currentDate"
              type="date"
              :min-date="minDate"
              :max-date="maxDate"
              @cancel="showPicker=false"
              @confirm="handleBirthday"
              :title="$t('lang.common.datetimeData[0]')"
      />
    </van-popup>
    <Agreement class="reg_agreement" @changeAgree="isAgree=false" ref="agree"
               :style="{'display':isAgree==true?'block':'none'}"/>
  </div>
</template>

<script>
  import Header from '../commons/header/Header'
  import Agreement from './Agreement'
  import utils from '../utils/utils'
  import qs from 'querystring'
  import {REG_RULE} from '../api/rule'
  import {mapState, mapActions, mapMutations} from 'vuex'
  export default {
    name: 'Register',
    components: {
      Header,
      Agreement
    },
    data() {
      return {
        regObj: {
          account: '',
          password: '',
          confirmPassword: '',
          agree: true,
          fundPwd: '',//不设置默认资金密码了
          vCode: '',
          // intrCode: '',
          // weixin: '',
          // qq: '',
          // intrMobileCode: '',
          // phone: '',
          // email: '',
          // fullName: '',
          // birthday: '',

        },
        t: Date.now(),
        isAgree: false,
        headObj: {
          title: 'lang.loginContent.quickRegister',
          showArrow: true
        },
        pwdType: 'text',
        confirmType: 'text',
        eyesIcon: require('../assets/img/login/yanjing.png'),
        confirmEyes: require('../assets/img/login/yanjing.png'),
        nameRules: [
          {required: true, message: this.$t('lang.register.loginAccount[2]')},
          {pattern: REG_RULE.username.reg, message: this.$t('lang.register.loginAccount[2]')}
        ],
        pwdRules: [
          {required: true, message: this.$t('lang.register.userPwd[2]')},
          {pattern: REG_RULE.loginPwd.reg, message: this.$t('lang.register.userPwd[2]')}
        ],
        fundPwdRules: [
          {required: true, message: this.$t('lang.register.fundPwdRules[0]')}, //'请输入取款密码'},
          {pattern: /^\d{4}$/, message: this.$t('lang.register.fundPwdRules[1]')} //'请输入长度为6位数字'}
        ],
        weChatRules: [
          {required: true, message: '请输入微信号'},
          {pattern: REG_RULE.weChat.reg, message: '请输入正确微信号'}
        ],
        qqRules: [
          {required: true, message: '请输入QQ号'},
          {pattern: REG_RULE.qq.reg, message: '请输入正确QQ号'}
        ],
        emailRules: [
          {required: true, message: '请输入邮箱'},
          {pattern: REG_RULE.email.reg, message: '请输入正确邮箱'}
        ],
        phoneRules: [
          {required: true, message: '请输入手机号'},
          {pattern: REG_RULE.mobile.reg, message: '请输入正确手机号'}
        ],
        registerLimit: {},
        showPicker: false,
        minDate: new Date(1949, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(),
        hasAccount: false,
        hasFullName: false,
        hasPhone: false
      }
    },
    computed: {
      ...mapState([
        'isLogin'
      ]),
      check_userName() {
        return REG_RULE.username.reg.test(this.regObj.account)
      },
      check_loginPwd() {
        return REG_RULE.loginPwd.reg.test(this.regObj.password)
      },
      check_rePwd(){
        if(this.regObj.password === this.regObj.confirmPassword){
          return true;
        }else{
          return false;
        }
      },
      check_vCode(){
        return REG_RULE.verifyCode.reg.test(this.regObj.vCode)
      },
      check_fundPwd(){
        return this.registerLimit.fundPwd != 1 || REG_RULE.verifyCode.reg.test(this.regObj.fundPwd)
      },
      disabled() {
        if(!this.check_userName || !this.check_loginPwd || !this.check_vCode || this.check_fundPwd){
          return true;
        }else{
          return false;
        }
        // const {account, password, confirmPassword, vCode} = this.regObj;
        // if (account === '' && password === '' && confirmPassword === '' && vCode === '') {
        //   return true
        // }
        // return false
      }
    },
    methods: {
      ...mapMutations({
        setData: 'SET_DATA',
      }),
      ...mapActions([
        'login',
        'loginOut',
        'getUserInfo',
        'getStatus'
      ]),
      onFailed(errorInfo){
        console.log(errorInfo,'errorInfo2222222222')
      },
      asyncConPwd(){
        return this.regObj.password === this.regObj.confirmPassword
      },
      handleOpenAgree() {
        this.isAgree = true
        this.regObj.agree = 'on'
      },
      handleBirthday() {
        this.regObj.birthday = utils.dateFormat(this.currentDate, 2)
        this.showPicker = false
      },
      handleRightIcon(type) {
        switch (type) {
          case 'pwd':
            if (this.pwdType === 'text') {
              this.pwdType = 'password'
              this.eyesIcon = require('../assets/img/login/eyes(close).png')
            } else {
              this.pwdType = 'text'
              this.eyesIcon = require('../assets/img/login/yanjing.png')
            }
            break
          case 'confirmPwd':
            if (this.confirmType === 'text') {
              this.confirmType = 'password'
              this.confirmEyes = require('../assets/img/login/eyes(close).png')
            } else {
              this.confirmType = 'text'
              this.confirmEyes = require('../assets/img/login/yanjing.png')
            }
            break
        }
      },
      checkAccount() {
        this.$http.users.getCheckUnique(0, this.regObj.account).then(res => {
          this.hasAccount = res.data
        })
      },
      checkFullName() {
        this.$http.users.getCheckUnique(1, this.regObj.fullName).then(res => {
          this.hasFullName = res.data
        })
      },
      checkPhone() {
        this.$http.users.getCheckUnique(2, this.regObj.phone).then(res => {
          this.hasPhone = res.data
        })
      },
      handleChangeImg() {
        this.t = Date.now()
      },
      onSubmit() {
        if (this.regObj.password !== this.regObj.confirmPassword) {
          return this.$toast(this.$t('lang.register.confirmPwd[2]'))
        }
        if (this.hasAccount || this.hasFullName || this.hasPhone) {
          return this.$toast('请重新输入！')
        }
        const data = Object.assign({}, this.regObj)
        // if (data.agree == '') {
        //   this.$toast('请先阅读开户协议')
        // } else {
        this.$http.users.register(data)
          .then((res) => {
            if (res) {
              this.$toast.success(this.$t('lang.registerContent.tips[0]'));
              console.log('注册res', res)
              localStorage.setItem('isLogin', JSON.stringify(true));
              this.setData({key: 'isLogin', value: true});
              this.setData({key: 'accountType', value: 'HY'});
              localStorage.setItem('accountType', JSON.stringify('HY'));
              this.getUserInfo();
              this.getStatus();
              const result = qs.parse(res.config.data);
              this.$cookie.set('account', result.account, {path: '/'});
              setTimeout(() => {
                this.$router.push('/user');
              }, 2000);
            } else {
              this.t = Date.now()
              this.$toast.fail('注册失败')
            }
          })
          .catch((err) => {
            this.handleChangeImg()
            this.$toast.fail(err.data.msg)
          })
      }
    },
    mounted() {
      // 新增容错处理

      let url = location.search; //获取url中"?"符后的字串
      new Object();
      if (url.indexOf("?") != -1) {
        let str = url.substr(1);
        this.regObj.intrCode = str
      }
    },
    created() {

      this.$http.users.getLimit().then(res => {
        this.registerLimit = res.data
        console.log(this.registerLimit)
      }).catch(err => {
        console.log(err)
      })
    },
  }
</script>

<style lang="scss" scoped>
  .register-box{
    &,.content{
      height:100%;
      position: relative;
    }
    /deep/.van-form{
      .van-cell{
        padding:0 px2rem(17px);
        min-height:px2rem(50px);
        display: flex;
        align-items: center;
        font-size:px2rem(15px);
        /*.van-cell__value,.van-field__body,input{*/
        /*  height:100%;*/
        /*}*/
      }
      .van-field__left-icon{
        margin-right: px2rem(16px);
        margin-left:px2rem(10px);
        .iconfont{
          font-size:px2rem(20px);
        }
      }
    }
    .vCode{
      position: relative;
      /deep/.van-field__body{
        margin-right: 80px;
      }
      .code-img-box{
        position: absolute;
        right: px2rem(17px);
        top: px2rem(10px);
        img{
          border-radius: 4px;
          width:px2rem(75px);
          height:px2rem(35px);
        }
      }
    }

    .m-form-tips{
      padding:px2rem(16px);
      font-size:px2rem(13px);
      line-height: px2rem(20px);
      h3{
        color:#ccc;
        line-height: px2rem(25px);
      }
      p{
        color:#fff;
      }
    }
    .tip{
      text-align: center;
      color:#fff;
      font-size: px2rem(13px);
    }
    .footerTip{
      margin:px2rem(30px);
      padding:px2rem(8px) 0;
      position: absolute;
      bottom:px2rem(50px);
      left: 0;
      right: 0;
      line-height: px2rem(20px);
      border-top:1px #ccc solid;
      font-size: px2rem(13px);
      .link-color{
        color:#ffd57d;
      }
    }
    .reg_agreement{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
    }
  }

  .skin-gray{
    .register-box{
      .tip{
        .theme-color{
          color:#ffd57d;
        }
      }
      .footerTip{
        border-top-color: $skin-gray-border-color;
      }
      /deep/.van-cell__title{
        color:$skin-gray-label-color;
      }
      /deep/.van-field__control{
        color:#fff;
      }
      .footerTip,.m-form-tips h3,.tip{
        color:#a1a3a5;
      }
      /*.m-form-tips p{*/
      /*  color:#fff;*/
      /*}*/
    }
  }

  .skin-black{
    .register-box{
      .tip{
        .theme-color{
          color:#ffd57d;
        }
      }
      .footerTip{
        border-top-color: $skin-black-border-color;

      }
      /deep/.van-cell__title{
        color:$skin-black-label-color;
      }
      /deep/.van-field__control{
        color:#fff;
      }
      .footerTip,.m-form-tips h3,.tip{
        color:#a1a3a5;
      }
      /*.m-form-tips p{*/
      /*  color:#fff;*/
      /*}*/
    }
  }


/*.register {*/
/*  height: 100%;*/

/*  .reg_agreement {*/
/*    position: absolute;*/
/*    top: 0;*/
/*    left: 0;*/
/*    z-index: 10;*/
/*  }*/

/*  .spanStyles {*/
/*    display: block;*/
/*    text-align: right;*/
/*    color: #c00;*/
/*  }*/

/*  .vCode {*/
/*    width: 100%;*/
/*    display: flex;*/

/*    img {*/
/*      width: 1.5rem;*/
/*      height: 1rem;*/
/*    }*/
/*  }*/
/*}*/

/*.tian-nav {*/
/*  position: fixed;*/
/*  top: 0;*/
/*  width: 100%;*/
/*  z-index: 1;*/
/*  display: flex;*/
/*  flex-direction: row;*/
/*  justify-content: space-between;*/
/*  background: #dd413a;*/
/*  font-size: 0.32rem;*/
/*  height: 1rem;*/
/*  align-items: center;*/
/*  color: #fff;*/
/*}*/

/*::v-deep .van-field__control::placeholder {*/
/*  color: #969799 !important*/
/*}*/

/*.content {*/
/*  !*margin-top: 1rem;*!*/
/*  max-height: calc(100vh + 1px);*/
/*  overflow: scroll;*/
/*  padding-bottom: 2rem;*/
/*}*/

/*.form {*/
/*  //margin: .8rem .3rem;*/
/*  !*box-shadow: 2px 2px 10px #eaeaea;*!*/
/*}*/

/*::v-deep.van-button {*/
/*  !*background-color: #eda6a6;*!*/
/*  color: #fff;*/
/*  font-size: .36rem;*/
/*  border-radius: .1rem;*/
/*}*/

/*.tip {*/
/*  margin: .2rem .3rem;*/
/*  text-align: right;*/

/*  .theme-color, .link-color {*/
/*    font-weight: 400;*/
/*    font-style: normal;*/
/*  }*/

/*  .theme-color {*/
/*    color: #c00;*/
/*  }*/

/*  .link-color {*/
/*    color: #0090ff;*/
/*  }*/
/*}*/
</style>
