<template>
  <div class="introduce change-password-box">
    <Header :headObj="headObj" @leftClick="$router.push('/securityCenter')"/>
    <div class="g-content setPassword">
      <van-form @submit="onSubmit" @failed="onFailed">
        <van-cell-group class="setPasswordCon">
          <van-field :label="$t('lang.register.oldPwd[0]')" v-model="oldPwd" :type="pwdType1"
                     :placeholder="$t('lang.register.oldPwd[1]')"
                     :clearable="true"
                     :right-icon="rightIcon1"
                     @click-right-icon="handleRightIcon('old')"
                     :rules="oldPwdRules"
          />
          <van-field :label="$t('lang.register.changeNewPwd[0]')"
                     v-model="setNewPwd"
                     :type="pwdType2"
                     :placeholder="$t('lang.register.changeNewPwd[1]')"
                     :right-icon="rightIcon2"
                     @click-right-icon="handleRightIcon('new')"
                     :clearable="true"
                     maxlength="12"
                     :rules="pwdRules" />
          <van-field :label="$t('lang.register.changeRePwd[0]')"
                     :placeholder="$t('lang.register.changeRePwd[1]')"
                     v-model="sureNewPwd"
                     :type="pwdType3"
                     :right-icon="rightIcon3"
                     @click-right-icon="handleRightIcon('sure')"
                     maxlength="12"
                     :rules="[{ required: true, message: $t('lang.register.confirmPwd[1]') }]"
                     :clearable="true"  />
        </van-cell-group>
        <div class="m-form-tips">
          <h3>{{ $t('lang.changePassword.passwordRules') }}</h3>
          <p>{{ $t('lang.register.userPwd[2]') }}</p>
        </div>

        <div class="step-button-box">
          <button class="btn-type2"
                  :class=" disabled ? 'disable' : ''"
                  :disabled="disabled"
                  block native-type="submit">
            {{ $t('lang.common.buttonTextConfirm') }}
          </button>
        </div>
        <!--      <div class="m-btns">-->
        <!--        <div class="m-btn" id="btns">-->
        <!--          <div :class="['m-button', disabled ? 'disable' : '']" @click="onSubmit">-->
        <!--            {{ $t('lang.common.determine') }}-->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </div>-->
      </van-form>
    </div>
  </div>
</template>

<script>
  import Header from '@/commons/header/Header'
  import utils from '@/utils/utils'
  import {mapState, mapActions} from 'vuex';
  import {REG_RULE} from '../../api/rule'

  export default {
    name: 'ChangePassword',
    components: {
      Header
    },
    data() {
      return {
        headObj: {
          title: 'lang.changePassword.changePassword',
          showArrow: true
        },
        oldPwdRules:[
          {required: true, message: this.$t('lang.register.oldPwd[1]')},
          // {pattern: REG_RULE.oldPwd.reg, message: this.$t('lang.register.oldPwd[2]')}
        ],
        pwdRules: [
          {required: true, message: this.$t('lang.register.userPwd[2]')},
          {pattern: REG_RULE.loginPwd.reg, message: this.$t('lang.register.userPwd[2]')}
        ],
        rePwdRules: [
          {required: true}
        ],
        oldPwd: '',
        setNewPwd: '',
        sureNewPwd: '',
        rightIcon1: 'closed-eye',
        rightIcon2: 'closed-eye',
        rightIcon3: 'closed-eye',
        pwdType1: 'password',
        pwdType2: 'password',
        pwdType3: 'password',
        // disabled: true
      }
    },
    computed: {
      check_oldPwd() {
        if (this.oldPwd.length >= 1) {
          return true;
        } else {
          return false;
        }
      },
      check_loginPwd() {
        return REG_RULE.loginPwd.reg.test(this.setNewPwd)
      },
      check_rePwd() {
        if (this.setNewPwd === this.sureNewPwd) {
          return true;
        } else {
          return false;
        }
      },
      disabled() {
        if(!this.check_oldPwd || !this.check_loginPwd || !this.sureNewPwd){
          return true;
        }else{
          return false;
        }
      }
    },
    mounted() {
    },
    watch: {},
    methods: {
      ...mapActions([
        'loginOut'
      ]),
      onFailed(errorInfo){
        console.log(errorInfo,'errorInfo2222222222')
      },
      /*      changeOldPwd() {
              if (!this.check_oldPwd) {
                this.$toast(this.$t('lang.changePassword.oldPwdRule'))
              }
            },
            changeNewPwd() {
              if (!this.check_loginPwd) {
                this.$toast(this.$t('lang.changePassword.miMaGuiZe'))
              }
            },
            changeRePwd() {
              if (!this.check_rePwd) {
                this.$toast(this.$t('lang.loginContent.differentPassword'))
              }
            },*/
      handleRightIcon(type) {
        switch (type) {
          case 'old':
            if (this.pwdType1 === 'text') {
              this.rightIcon1 = 'closed-eye'
              this.pwdType1 = 'password'
            } else {
              this.rightIcon1 = 'eye-o'
              this.pwdType1 = 'text'
            }
            break
          case 'new':
            if (this.pwdType2 === 'text') {
              this.rightIcon2 = 'closed-eye'
              this.pwdType2 = 'password'
            } else {
              this.rightIcon2 = 'eye-o'
              this.pwdType2 = 'text'
            }
            break
          case 'sure':
            if (this.pwdType3 === 'text') {
              this.rightIcon3 = 'closed-eye'
              this.pwdType3 = 'password'
            } else {
              this.rightIcon3 = 'eye-o'
              this.pwdType3 = 'text'
            }
            break
          default:
            break
        }
      },
      onInput(key) {
        this.moneyPwd = (this.moneyPwd + key).slice(0, 6)
      },
      onDelete() {
        this.moneyPwd = this.moneyPwd.slice(0, this.moneyPwd.length - 1)
      },
      onSubmit() {
        /*    if (!this.oldPwd || !this.setNewPwd || !this.sureNewPwd) {
              this.$toast(this.$t('lang.loginContent.emptyPassword'))
              return
            }
            if (!utils.checkPwd(this.setNewPwd)) {
              this.$toast(this.$t('lang.changePassword.miMaGuiZe'))
              return
            }
            if (this.setNewPwd !== this.sureNewPwd) {
              this.$toast(this.$t('lang.loginContent.differentPassword'))
              return
            }*/
        // const reg = /^(?=[a-zA-Z]*[0-9])(?=[0-9]*[a-zA-Z])[a-zA-Z0-9]/
        // if (!reg.test(this.setNewPwd)) {
        //   this.$toast('密码格式输入不正确')
        //   return
        // }
        if (this.setNewPwd !== this.sureNewPwd) {
          return this.$toast(this.$t('lang.register.confirmPwd[2]'))
        }
        this.$http.users.changeLoginPwd({
          oldPassword: this.oldPwd,
          newPassword: this.setNewPwd
        }).then(res => {
          console.log(res,'changeLoginPwd')
          // this.$toast.success(this.$t('lang.loginContent.loginAgain'))
          // this.$http.users.logout()
          let getMsg = res.data.msg ? res.data.msg : res.data.message;
          if (res.code === 200) {
            if(res.data.code === 200){
              // this.resetData();
              this.loginOut();
              this.$toast.success(this.$t('lang.loginContent.loginAgain'))
              setTimeout(() => {
                this.$router.push('/Login');
              }, 2500);
              this.clearAllStorage()
            }else{
              this.$toast.fail({
                message: getMsg,
                icon: 'warning',
                className: 'warning-toast'
              });
            }
          }else{
            alert(3333)
            this.$toast.fail({
              message: this.$t('lang.common.error_alert[0]'),
              icon: 'warning',
              className: 'warning-toast'
            });
          }
        }).catch(err => {
          // alert(444)
          // this.$toast.fail({
          //   message: this.$t('lang.common.error_alert[0]'),
          // });
          // console.log(error)
          this.$toast.fail(err.data.msg)
        })
      },
      clearAllStorage() {
        localStorage.clear()
        sessionStorage.clear()
        this.$cookie.set('account', '', -1)
        this.$cookie.set('accountType', '', -1)
        this.$cookie.set('JSESSIONID', '', -1)
      },
     /* resetData(){
        this.oldPwd =  '';
        this.setNewPwd =  '';
        this.sureNewPwd =  '';
      },*/
    },

  }
</script>

<style lang="scss" scoped>
  .change-password-box{
    /deep/.van-cell-group{
      background: none;
      .van-cell__value{
        flex:2;
      }
      .van-cell__title{
        flex:1;
      }
      .van-cell{
        min-height: px2rem(50px);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: px2rem(15px);
      }
    }

    .m-form-tips{
      padding:px2rem(16px);
      h3,p{
        line-height: px2rem(22px);
        font-size:px2rem(12px);
      }
    }
  }
  .skin-gray{
    .change-password-box{
      /deep/.van-cell-group{
        background: $skin-gray-con-bg;
        .van-cell__title{
          color:$skin-gray-text-color;
        }
        .van-cell__value input{
          color:#fff;
        }
      }
      .m-form-tips{
        h3,p{
          color:$skin-gray-text-color;
        }
      }
    }
  }
  .skin-black{
    .change-password-box{
      /deep/.van-cell-group{
        background: $skin-black-con-bg;
        .van-cell__title{
          color:$skin-black-text-color;
        }
        .van-cell__value input{
          color:#fff;
        }
      }
      .m-form-tips{
        h3,p{
          color:$skin-black-text-color;
        }
      }
    }
  }


.introduce {
  display: flex;
  flex-direction: column;

  .g-content {
    flex: 1;
    overflow: scroll;
    width: 100%;
    height: 100%;
    /*min-height: 13rem;*/
    /*padding-top: 46px;*/
    /*position: absolute;*/
    /*background-color: #f5f5f9;*/

    /*.m-form-tips {*/
    /*  margin: .4rem 0 .6rem .2rem;*/
    /*  color: #a8a8a8;*/

    /*  span {*/
    /*    color: #c00;*/
    /*  }*/
    /*}*/

    .m-btns {
      //padding: 0 .1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;

      //.m-btn, .m-button {
      //  color: #fff;
      //  background-color: #dd413a;
      //  width: 6.9rem;
      //  height: .8rem;
      //  line-height: .8rem;
      //  font-size: .36rem;
      //  margin: auto;
      //  border-radius: .1rem;
      //  text-align: center;
      //}

      .disable {
        //background-color: #eda6a6;
      }
    }
  }
}
</style>
