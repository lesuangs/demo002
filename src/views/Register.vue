<template>
  <div class="register register-box"  v-if="registerLimit">
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
                  v-model="params.account"
                  :label="$t('lang.register.user[0]')"
                  :placeholder="$t('lang.register.user[1]')"
                  label-width="80"
                  :clearable="true"
                  required
                  @blur="checkAccount"
                  :error-message="hasAccount ? $t('lang.register.hasValue[0]') : ''"
                  :rules="nameRules">
            <!--            <span class="spanStyles">{{hasAccount}}{{ hasAccount ? $t('lang.register.user[3]') : '' }}</span>-->
          </van-field>

          <van-field
                  v-model="params.password"
                  :type="pwdType"
                  :label="$t('lang.register.password[0]')"
                  :clearable="true"
                  label-width="80"
                  required
                  :right-icon="eyesIcon"
                  @click-right-icon="handleRightIcon('pwd')"
                  :placeholder="$t('lang.register.password[1]')"
                  :rules="pwdRules" />
          <van-field
                  v-model="params.confirmPassword"
                  :type="confirmType"
                  :label="$t('lang.register.confirm_password[0]')"
                  :clearable="true"
                  label-width="80"
                  required
                  :right-icon="confirmEyes"
                  @click-right-icon="handleRightIcon('confirmPwd')"
                  :placeholder="$t('lang.register.confirm_password[1]')"
                  :rules="[{ required: true, message: $t('lang.register.confirm_password[1]') }]" />
          <van-field
                  v-if="registerLimit.fundPwd !==undefined && registerLimit.fundPwd !== '2'"
                  v-model="params.fundPwd"
                  type="digit"
                  maxlength="4"
                  :required="registerLimit.fundPwd === '1'?true:false"
                  label-width="80"
                  :clearable="true"
                  :label="$t('lang.register.fund_pwd[0]')"
                  :placeholder="$t('lang.register.fund_pwd[1]')"
                  :rules="params.fundPwd !== ''?fundPwdRules:[]"></van-field>
          <van-field
                  v-if="registerLimit.fullName !==undefined && registerLimit.fullName !== '2'"
                  v-model="params.fullName"
                  :label="$t('lang.register.full_name[0]')"
                  :required="registerLimit.fullName === '1'?true:false"
                  label-width="80"
                  :clearable="true"
                  :placeholder="$t('lang.register.full_name[1]')"
                  :rules="params.fullName !==  ''?fullNameRules:[]" />
          <span class="spanStyles">{{ hasFullName ? $t('lang.register.full_name[2]') : '' }}</span>
          <van-field
                  v-if="registerLimit.phone !==undefined && registerLimit.phone !== '2'"
                  v-model="params.phone"
                  :label="$t('lang.register.phone[0]')"
                  type="digit"
                  :required="registerLimit.phone === '1'?true:false"
                  label-width="80"
                  :clearable="true"
                  :placeholder="$t('lang.register.phone[1]')"
                  :rules="params.phone !==  ''?phoneRules:[]" />

          <van-field
                  v-if="registerLimit.intrCode !==undefined && registerLimit.intrCode !== '2'"
                  v-model="params.intrCode"
                  :label="$t('lang.register.referral_code[0]')"
                  label-width="80"
                  :clearable="true"
                  :required="registerLimit.intrCode === '1'?true:false"
                  :placeholder="$t('lang.register.referral_code[1]')"
                  :rules="params.intrCode !== ''?[{ required: true, message: $t('lang.register.referral_code[2]') }]:[]" />

          <van-field
                  v-if="registerLimit.birthday !==undefined && registerLimit.birthday !== '2'"
                  v-model="params.birthday"
                  :label="$t('lang.register.birthday[0]')"
                  :required="registerLimit.birthday === '1'?true:false"
                  label-width="80"
                  :clearable="true"
                  :placeholder="$t('lang.register.birthday[1]')"
                  @click="showPicker=true"
                  :rules="params.birthday !== ''?[{ required: true, message: $t('lang.register.birthday[2]') }]:[]" />

          <span class="spanStyles">{{ hasPhone ? $t('lang.register.phone[2]') : '' }}</span>
          <van-field
                  v-if="registerLimit.email !==undefined && registerLimit.email !== '2'"
                  v-model="params.email"
                  :label="$t('lang.register.email[0]')"
                  :required="registerLimit.email == 1?true:false"
                  label-width="80"
                  :clearable="true"
                  :placeholder="$t('lang.register.email[1]')"
                  :rules="params.email !==  ''?emailRules:[]" />

        <!--  <van-field
                  注册接口没有手机推广码
                  v-if="registerLimit.intrMobileCode !==undefined && registerLimit.intrMobileCode !== '2'"
                  v-model="params.intrMobileCode"
                  :label="$t('lang.register.phone_code[0]')"
                  :required="registerLimit.intrMobileCode === '1'?true:false"
                  label-width="80"
                  :clearable="true"
                  :placeholder="$t('lang.register.phone_code[1]')"
                  :rules="registerLimit.intrMobileCode === '1'?[{ required: true, message: $t('lang.register.phone_code[1]') }]:[]" />
         -->
          <van-field
                  v-if="registerLimit.qq !==undefined && registerLimit.qq !== '2'"
                  v-model="params.qq"
                  :label="$t('lang.register.qq[0]')"
                  type="digit"
                  :required="registerLimit.qq === '1'?true:false"
                  label-width="80"
                  :clearable="true"
                  :placeholder="$t('lang.register.qq[1]')"
                  :rules="params.qq !==  ''?qqRules:[]" />
          <van-field
                  v-if="registerLimit.weixin !==undefined && registerLimit.weixin !== '2'"
                  v-model="params.weixin"
                  :label="$t('lang.register.weixin[0]')"
                  :required="registerLimit.weixin === '1'?true:false"
                  label-width="80"
                  :clearable="true"
                  :placeholder="$t('lang.register.weixin[1]')"
                  :rules="params.weixin !== '' ? weChatRules : []" />


          <div class="vCode" v-if="registerLimit.vCode !==undefined && registerLimit.vCode !== '2'">
            <!--                :required="registerLimit.vCode == 1?true:false"-->
            <van-field
                    v-model="params.vCode"
                    :label="$t('lang.common.vCode[0]')"
                    label-width="80"
                    maxlength="4"
                    :required="registerLimit.vCode === '1'?true:false"
                    :clearable="true"
                    :placeholder="$t('lang.common.vCode[1]')"
                    :rules="[{ required: true, message: $t('lang.common.vCode[2]') }]"/>
            <div class="code-img-box">
              <img @click="getVerifyCode" :src="verifyCodeImg" alt="" class="mod-vode-img">
              <!--              <img @click="handleChangeImg" :src="'/v/vCode?t=' + t" alt="">-->
            </div>
          </div>
          <div class="m-form-tips">
            <h3>{{ $t('lang.changePassword.passwordRules') }}：</h3>
            <p>{{ $t('lang.register.password[2]') }}</p>
          </div>

          <div class="step-button-box">
     <!--       <button class="btn-type2"
                    block native-type="submit">{{ $t('lang.loginContent.registerNow') }}</button>-->

            <button class="btn-type2"
                    :class="{'disable':!isDisabled}"
                    :disabled="!isDisabled"
                    block native-type="submit">{{ $t('lang.loginContent.registerNow') }}</button>
          </div>
        </van-form>
      </div>
      <div class="tip"> {{ $t('lang.register.help[2]') }}
        <em class="theme-color" @click="$router.push('/login')">{{ $t('lang.register.help[3]') }}</em>
      </div>
      <footer class="footerTip">
        <p> {{ $t('lang.register.help[4]') }}</p>
        {{ $t('lang.register.agreement[0]') }}
        <em class="link-color" @click="handleOpenAgree">"{{ $t('lang.register.agreement[1]') }}"</em>
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
        params:{
          account: '',
          password: '',
          confirmPassword: '',
          agree: 'on',
          // fundPwd: '0000',
          vCode: '',
          intrCode:'',//推荐码
          weixin:'',
          phone:'',
          email:'',
          qq:'',
          fullName:'',
          fundPwd:'',
          // phoneCode:'',
          birthday:'',

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
          {required: true, message: this.$t('lang.register.user[2]')},
          {pattern: REG_RULE.username.reg, message: this.$t('lang.register.user[2]')}
        ],
        pwdRules: [
          {required: true, message: this.$t('lang.register.password[2]')},
          {pattern: REG_RULE.loginPwd.reg, message: this.$t('lang.register.password[2]')}
        ],
        fundPwdRules: [
          {required: true, message: this.$t('lang.register.fund_pwd[0]')}, //'请输入取款密码'},
          {pattern: REG_RULE.fundPsw.reg, message: this.$t('lang.register.fund_pwd[1]')} //'请输入长度为6位数字'}
        ],
        weChatRules: [
          {required: true, message: this.$t('lang.register.weixin[1]')},
          {pattern: REG_RULE.weChat.reg, message: this.$t('lang.register.weixin[2]')}
        ],
        qqRules: [
          {required: true, message: this.$t('lang.register.qq[1]')},
          {pattern: REG_RULE.qq.reg, message: this.$t('lang.register.qq[2]')}
        ],
        emailRules: [
          {required: true, message: this.$t('lang.register.email[1]')},
          {pattern: REG_RULE.email.reg, message: this.$t('lang.register.email[2]')}
        ],
        phoneRules: [
          {required: true, message: this.$t('lang.register.phone[1]')},
          {pattern: REG_RULE.mobile.reg, message: this.$t('lang.register.phone[2]')}
        ],
        fullNameRules: [
          {required: true, message: this.$t('lang.register.full_name[1]')},
          {pattern: REG_RULE.fullName.reg, message: this.$t('lang.register.full_name[2]')}
        ],
        // registerLimit: {},
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
        'isLogin',
        'regLimitList',
        'verifyCodeImg'
      ]),
      registerLimit(){
        return this.regLimitList
      },
      check_name(){
        return REG_RULE.username.reg.test(this.params.account);
      },
      check_pwd(){
        return REG_RULE.loginPwd.reg.test(this.params.password);
      },
      check_confirm_pwd(){
        if(this.params.confirmPassword !== this.params.password){
          return false;
        }else{
          return true;
        }
      },
      check_code(){
        return REG_RULE.verifyCode.reg.test(this.params.vCode);
      },
      check_fullName(){
        return REG_RULE.fullName.reg.test(this.params.fullName);
      },
      check_weixin(){
        return REG_RULE.weChat.reg.test(this.params.weixin);
      },
      check_email(){
        return REG_RULE.email.reg.test(this.params.email);
      },
      check_phone(){
        return REG_RULE.mobile.reg.test(this.params.phone);
      },
      check_qq(){
        return REG_RULE.qq.reg.test(this.params.qq);
      },
      check_fundPwd(){
        return REG_RULE.fundPwd.reg.test(this.params.fundPwd);
      },
      check_intrCode(){
        return REG_RULE.intrCode.reg.test(this.params.intrCode);
      },
      check_phoneCode(){
        return REG_RULE.common.reg.test(this.params.phoneCode);
      },
/*      isDisabled() {
        if(!this.check_userName || !this.check_loginPwd || !this.check_nickname ||
          this.hasAccount || !this.rePassword){
          return true;
        }else{
          return false;
        }
        // const {account, password, confirmPassword, vCode} = this.params;
        // if (account === '' && password === '' && confirmPassword === '' && vCode === '') {
        //   return true
        // }
        // return false
      },*/
      isDisabled(){
        let {fullName,weixin,qq,email,phone,fundPwd,vCode,intrCode} = this.params;
        if((this.isRepeat || !this.check_name || !this.check_pwd || !this.check_confirm_pwd) ||
          (fullName && !this.check_fullName ) ||
          (weixin && !this.check_weixin) ||
          (email && !this.check_email) ||
          (qq && !this.check_qq) ||
          (phone && !this.check_phone) ||
          (fundPwd && !this.check_fundPwd) ||
          (vCode && !this.check_code) ||
          (intrCode && !this.check_intrCode) ||
          (this.regLimitList.fullName === '1' && !this.check_fullName)||
          (this.regLimitList.weixin === '1' && !this.check_weixin)||
          (this.regLimitList.phone === '1' && !this.check_phone)||
          (this.regLimitList.email === '1' && !this.check_email)||
          (this.regLimitList.phone === '1' && !this.check_phone)||
          (this.regLimitList.fundPwd === '1' && !this.check_fundPwd)||
          (this.regLimitList.vCode === '1' && !this.check_code)||
          (this.regLimitList.intrCode === '1' && !this.check_intrCode)||
          (this.regLimitList.qq === '1' && !this.check_qq) ||
                this.hasAccount
        ){
          return false;
        }else{
          return true;
        }
      },
    },
    methods: {
      ...mapMutations({
        setData: 'SET_DATA',
      }),
      ...mapActions([
        'login',
        'loginOut',
        'getUserInfo',
        'getStatus',
        'getRegLimit',
        'getVerifyCode'
      ]),
      onFailed(errorInfo){
        console.log(errorInfo,'errorInfo2222222222')
      },
      asyncConPwd(){
        return this.params.password === this.params.confirmPassword
      },
      handleOpenAgree() {
        this.isAgree = true
        this.params.agree = 'on'
      },
      handleBirthday() {
        this.params.birthday = utils.dateFormat(this.currentDate, 2)
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
        this.$http.users.getCheckUnique(this.params.account).then(res => {
          this.hasAccount = !res.data
        })
      },
/*      checkFullName() {
        //只校验账号
        this.$http.users.getCheckUnique(1, this.params.fullName).then(res => {
          this.hasFullName = !res.data
        })
      },
      checkPhone() {
        this.$http.users.getCheckUnique(2, this.params.phone).then(res => {
          this.hasPhone = !res.data
        })
      },*/
      handleChangeImg() {
        this.t = Date.now()
      },
      onSubmit(val) {
        console.log(val,'onSubmitonSubmitonSubmit')
        /*if (this.params.password !== this.params.confirmPassword) {
          return this.$toast(this.$t('lang.register.confirm_password[2]'))
        }
        if (this.hasAccount || this.hasFullName || this.hasPhone) {
          return this.$toast('请重新输入！')
        }*/
        this.$toast.loading(this.$t('lang.common.loading'))
        let params = {
          account:this.params.account,
          password:this.params.password,
          confirmPassword:this.params.confirmPassword,
          // fundPwd:this.params.fundPwd,
          // agree:this.params.agree,
          // vCode:this.params.vCode,
          // intrCode:this.params.intrCode,
          // weixin:this.params.weixin,
          // phone:this.params.phone,
          // qq:this.params.qq,
          // fullName:this.params.fullName,
          // birthday:this.params.birthday,
          tenantCode:'model'
        };
        if(this.regLimitList){
          let {fullName,phone,weixin,qq,email,birthday,fundPwd,vCode,intrCode} = this.regLimitList;
          if( fullName !== '2') params.fullName = this.params.fullName;
          if( phone !== '2') params.phone = this.params.phone;
          if( weixin !== '2') params.weixin = this.params.weixin;
          if( qq !== '2') params.qq = this.params.qq;
          if( email !== '2') params.email = this.params.email;
          if( birthday !== '2') params.birthday = this.params.birthday;
          if( fundPwd !== '2') params.fundPwd = this.params.fundPwd;
          if( vCode !== '2') params.vCode = this.params.vCode;
          if( intrCode !== '2') params.intrCode = this.params.intrCode;
          // if( intrMobileCode !== '2') params.phoneCode = this.params.phoneCode;
        }
        const data = Object.assign({}, params)
        // if (data.agree == '') {
        //   this.$toast('请先阅读开户协议')
        // } else {
        this.$http.users.register(data)
          .then((res) => {
            if (res.code === 200) {
              this.$toast.clear();
              this.$toast.success(this.$t('lang.register.tips[0]'));
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
              this.$toast.clear();
              this.getVerifyCode();
              // this.t = Date.now()
              const geData = res.msg ? res.msg : this.$t('lang.common.error_alert[0]');
              this.$toast.fail({
                message: geData,
                icon: 'warning',
                className: 'warning-toast'
              });
            }
          })
          .catch((err) => {
            this.getVerifyCode()
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
        this.params.intrCode = str
      }
    },
    created() {
      this.getVerifyCode();
      this.getRegLimit();
/*
      this.$http.users.getLimit().then(res => {
        this.registerLimit = res.data
        console.log(this.registerLimit)
      }).catch(err => {
        console.log(err)
      })*/
    },
  }
</script>

<style lang="scss" scoped>
  .register-box{
   /* &,.content{
      height:100%;
      position: relative;
    }*/
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
    /*  position: absolute;
      bottom:px2rem(50px);
      left: 0;
      right: 0;*/
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
