<template>
  <div class="introduce set-fund-password-box">
    <Header :headObj="headObj"
            v-if="isSetPwd"
            @leftClick="$router.go(-1),resetData()"/>
    <Header :headObj="modifTeadObj"
            v-else
            @leftClick="$router.go(-1),resetData()"/>
    <div class="g-content">
      <van-form @submit="onSubmit">
        <van-cell-group>
          <!--          <van-field-->
          <!--            label="原密码"-->
          <!--            readonly-->
          <!--            clickable-->
          <!--            v-model="oldPassword"-->
          <!--            :type="pwdType"-->
          <!--            maxlength="4"-->
          <!--            placeholder="请输入原密码"-->
          <!--            clearable-->
          <!--            @touchstart.native.stop="showKeyboard = true"-->
          <!--            @focus="focusType('oldPassword')"-->
          <!--            v-if="($store.getters.extInfo.fundPwd == null || $store.getters.extInfo.fundPwd == '4a7d1ed414474e4033ac29ccb8653d9b') ? false : true"-->
          <!--          />-->
          <!--          <div class="inputStyle"-->
          <!--               v-if="($store.getters.extInfo.fundPwd == null || $store.getters.extInfo.fundPwd == '4a7d1ed414474e4033ac29ccb8653d9b') ? false : true">-->
          <!--            <div>{{ $t('lang.setFundsPassword.originalPassword') }}</div>-->
          <!--            <div style="flex: 1">-->
          <!--              <van-password-input-->
          <!--                  v-model="oldPassword"-->
          <!--                  :length="4"-->
          <!--                  :gutter="15"-->
          <!--                  :focused="isFocus==='oldPassword' ? true : false"-->
          <!--                  @focus="focusType('oldPassword')"-->
          <!--              />-->
          <!--            </div>-->
          <!--          </div>-->
          <!--          <van-field-->
          <!--            label="资金密码"-->
          <!--            v-model="moneyPwd"-->
          <!--            readonly-->
          <!--            clickable-->
          <!--            :type="pwdType"-->
          <!--            maxlength="4"-->
          <!--            placeholder="请输入4位数字的密码" clearable-->
          <!--            :right-icon="rightIcon"-->
          <!--            @click-right-icon="handleRightIcon"-->
          <!--            @touchstart.native.stop="showKeyboard = true"-->
          <!--            @focus="focusType('moneyPwd')"-->
          <!--          />-->
          <div class="pwd-item" v-if="!isSetPwd">
            <label>{{ $t('lang.SecurityCenter.oldPwd') }}</label>
            <div class="pwd-input">
              <van-password-input
                      v-model="oldPassword"
                      :length="4"
                      :focused="isFocus==='oldPassword' ? true : false"
                      @focus="focusType('oldPassword')"
              />
            </div>
          </div>
          <div class="pwd-item">
            <label>{{ $t('lang.SecurityCenter.fundPassword') }}</label>
            <div class="pwd-input">
              <van-password-input
                      v-model="moneyPwd"
                      :length="4"
                      :focused="isFocus==='moneyPwd' ? true : false"
                      @focus="focusType('moneyPwd')"
              />
            </div>
          </div>
          <div class="pwd-item">
            <label>{{ $t('lang.SecurityCenter.confirmPassword') }}</label>
            <div class="pwd-input">
              <van-password-input
                      v-model="reMoneyPwd"
                      :length="4"
                      :focused="isFocus==='reMoneyPwd' ? true : false"
                      @focus="focusType('reMoneyPwd')"
              />
            </div>
          </div>
          <van-number-keyboard
                  :show="showKeyboard"
                  @input="onInput"
                  @delete="onDelete"
                  @blur="showKeyboard = false"
          />
        </van-cell-group>
        <div class="step-button-box">
          <button class="btn-type2"
                  :class="[ disabled ? 'disable' : '']"
                  native-type="submit"
          >
            {{ $t('lang.common.buttonTextConfirm') }}
          </button>
        </div>

        <!--        <div class="m-btns">-->
        <!--          <van-button :class="['m-button', disabled ? 'disable' : '']" native-type="submit">-->
        <!--            {{ $t('lang.common.determine') }}-->
        <!--          </van-button>-->
        <!--        </div>-->

      </van-form>
    </div>
  </div>
</template>

<script>
  import Header from '@/commons/header/Header'
  import {mapMutations,mapState,mapActions} from 'vuex'

  export default {
    name: 'SetFundsPassword',
    components: {
      Header,
    },
    data() {
      return {
        headObj: {
          title: 'lang.header.SetFundPassword',
          showArrow: true
        },
        modifTeadObj:{
          title: 'lang.header.modifyFundPassword',
          showArrow: true
        },
        realName: '',
        moneyPwd: '',
        reMoneyPwd: '',
        showKeyboard: false,
        rightIcon: 'closed-eye',
        pwdType: 'password',
        // disabled: true,
        isFocus: '',
        oldPassword: '',
        lastRoute: '',
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {          //  这里的vm指的就是vue实例，可以用来当做this使用
        console.log(to)
        console.log(from)
        console.log(vm)
        console.log(vm.lastRoute);
        vm.lastRoute = from.name
      })
    },
    created() {
      this.getUserInfo({});
      if (localStorage.getItem('extInfo')) {
        this.SET_EXT_INFO(Object.assign({}, JSON.parse(localStorage.getItem('extInfo'))))
      }
    },
    computed:{
      ...mapState(['extInformation']),
      isSetPwd(){
        //控制标头的
        //为空时，为Null时，就是设置密码；
        if(this.extInformation.fundPwd === '' || this.extInformation.fundPwd === null){
          return true;
        }else{
          //则修改密码
          return false;
        }
        //等于'4a7d1ed414474e4033ac29ccb8653d9b'时，则为修改密码
      },
      disabled(){
        if(!this.isSetPwd){
          if(this.oldPassword.length === 4 && this.moneyPwd.length === 4 && this.reMoneyPwd.length === 4){
            return false;
          }else{
            return true;
          }
        }else{
          if(this.moneyPwd.length === 4 && this.reMoneyPwd.length === 4){
            return false;
          }else{
            return true;
          }
        }
      }
    },
    watch: {
      // reMoneyPwd: {
      //   handler() {
      //     if (this.moneyPwd.length === 4 && this.moneyPwd === this.reMoneyPwd) {
      //       this.disabled = false
      //     }
      //   }
      // }
    },
    methods: {
      ...mapActions([
        'getUserInfo'
      ]),
      ...mapMutations('user', ['SET_EXT_INFO']),
      resetData(){
        this.oldPassword = '';
        this.reMoneyPwd = '';
        this.moneyPwd = '';
      },
      onSubmit() {
        // if(this.extInformation.fundPwd === null || this.extInformation.fundPwd != '4a7d1ed414474e4033ac29ccb8653d9b'){
        //   if (this.oldPassword.length === '' || this.oldPassword.length !== 4) {
        //     return false
        //   }
        // }else{
        //   this.oldPassword = '0000';
        // }
        // console.log(this.oldPassword,2222);
        // if (this.$store.getters.extInfo.fundPwd === null || this.$store.getters.extInfo.fundPwd === '4a7d1ed414474e4033ac29ccb8653d9b') {
        //   this.oldPassword = '0000'
        //   // console.log(11111)
        // } else {
        //   // console.log(2222)
        //   if (this.oldPassword.length === '' || this.oldPassword.length !== 4) {
        //     // console.log(this.oldPassword,3333);
        //     return false
        //   }
        // }
        if (this.moneyPwd !== this.reMoneyPwd) {
          return this.$toast(this.$t('lang.register.confirmPwd[2]'))
          return false
        }
        this.$toast.loading(this.$t('lang.common.submitIng'));
        // console.log(this.oldPassword, this.moneyPwd, this.reMoneyPwd)
        this.$http.users.changeWithdraw({
          oldPassword: this.oldPassword,
          newPassword: this.moneyPwd
        }).then(res => {
          console.log(res)
          let getMsg = res.msg ?  res.msg :  res.message;
          if(res.code === 200){
            if(res.data.code === 200){
              this.getUserInfo({});
              // this.upData()
              this.$toast.clear();
              // this.$toast.success(this.$t('lang.common.edit_tips[1]'));
              this.$toast.success(res.data.message);
              // 如果修改的资金密码是 0000 那么
              // console.log(this.lastRoute);
              this.resetData();
              if (this.lastRoute === 'User') {
                // console.log(this.lastRoute);
                this.$router.push('/withDraw')
              } else {
                this.$router.go(-1)
              }
            }else{
              this.$toast.fail({
                message: this.$t('lang.common.error_alert[0]'),
                icon: 'warning',
                className: 'warning-toast'
              });
            }
          }else{
            this.$toast.fail({
              message: getMsg,
              icon: 'warning',
              className: 'warning-toast'
            });
          }

        }).catch(error => {
          this.$toast.fail(error.data.msg)
        })
      },
      upData() {
        this.$http.home
          .getUserInfo().then(res => {
          console.log(res);
          this.SET_EXT_INFO(res.data.extInfo)
        }).catch(error => {
          console.log(error)
        })
      },
      focusType(type) {
        console.log(type)
        this.showKeyboard = true
        this.isFocus = type
      },
      handleRightIcon() {
        if (this.pwdType === 'text') {
          this.pwdType = 'password'
          this.rightIcon = 'closed-eye'
        } else {
          this.pwdType = 'text'
          this.rightIcon = 'eye-o'
        }
      },
      onInput(key) {
        let t = ''
        // t = this.isFocus === 'moneyPwd' ? this.moneyPwd : this.reMoneyPwd
        if (this.isFocus === 'moneyPwd') {
          t = this.moneyPwd
        } else if (this.isFocus === 'reMoneyPwd') {
          t = this.reMoneyPwd
        } else {
          t = this.oldPassword
        }
        t = (t + key).slice(0, 4)
        if (this.isFocus === 'moneyPwd') {
          this.moneyPwd = t
        } else if (this.isFocus === 'reMoneyPwd') {
          this.reMoneyPwd = t
        } else {
          this.oldPassword = t
        }
      },
      onDelete() {
        let t = ''
        console.log(this.isFocus);
        if (this.isFocus === 'moneyPwd') {
          t = this.moneyPwd
        } else if (this.isFocus === 'reMoneyPwd') {
          t = this.reMoneyPwd
        } else {
          t = this.oldPassword
        }
        t = t.slice(0, t.length - 1)
        if (this.isFocus === 'moneyPwd') {
          this.moneyPwd = t
        } else if (this.isFocus === 'reMoneyPwd') {
          this.reMoneyPwd = t
        } else {
          this.oldPassword = t
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .set-fund-password-box{
    /deep/.van-cell-group{
      background: none;
    }
    .pwd-item{
      display: flex;
      align-items: center;
      padding:px2rem(10px);
      label{
        width: px2rem(90px);
        font-size:px2rem(15px);
      }
      .pwd-input{
        flex:1;
      }
      .van-password-input {
        margin: 0 0 0 px2rem(16px);
      }
    }
  }
/*  .skin-leisure-blue{
    .set-fund-password-box{
      /deep/.van-cell-group{
        background: $skin-leisure-blue-con-bg;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
        .inputStyle div:first-child{
          color:$skin-leisure-blue-label-color;
        }
        .van-password-input__security li{
          background: $skin-leisure-blue-con-bg;
          border:1px $skin-leisure-blue-border-color solid;
          i{
            background: #354983;
          }
        }
      }

    }
  }
  .skin-leisure{
    .set-fund-password-box{
      /deep/.van-cell-group{
        background: $skin-leisure-con-bg;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
        .inputStyle div:first-child{
          color:$skin-leisure-label-color;
        }
        .van-password-input__security li{
          background: $skin-leisure-con-bg;
          border:1px $skin-leisure-border-color solid;
          i{
            background: #507084;
          }
        }
      }

    }
  }*/
  .skin-gray{
/*    .set-fund-password-box{
      /deep/.van-cell-group{
        background: $skin-gray-con-bg;
        .inputStyle div:first-child{
          color:$skin-gray-text-color;
        }
        .van-password-input__security li{
          background: $skin-gray-con-bg;
          border:1px $skin-gray-border-color solid;
        }
      }

    }*/
    .set-fund-password-box{
      .pwd-item{
        label{
          color:$skin-gray-text-color;
        }
      }
      /deep/.van-cell-group{
        background: $skin-gray-con-bg;
        .inputStyle div:first-child{
          color:$skin-gray-text-color;
        }
        .van-password-input__security li{
          background: $skin-gray-con-bg;
          border:1px $skin-gray-border-color solid;
          i{
            background: #fff;
          }
        }
      }

    }
  }

  .skin-black{
    .set-fund-password-box{
      .pwd-item{
        label{
          color:$skin-black-text-color;
        }
      }
      /deep/.van-cell-group{
        background: $skin-black-con-bg;
        .van-password-input__security li{
          background: $skin-black-con-bg;
          border:1px $skin-black-border-color solid;
          i{
            background: #fff;
          }
        }
      }

    }
  }



  /*.introduce {*/
  /*  display: flex;*/
  /*  flex-direction: column;*/

  /*  .g-content {*/
  /*    flex: 1;*/
  /*    overflow: scroll;*/
  /*    !*min-height: 13rem;*!*/
  /*    !*background-color: #f5f5f9;*!*/
  /*    !*position: absolute;*!*/
  /*    height: 100%;*/
  /*    width: 100%;*/
  /*    !*padding-top: 46px;*!*/
  /*    /deep/.van-password-input__security{*/
  /*      .van-password-input__cursor{*/
  /*        !*background-color: #fff;*!*/
  /*      }*/
  /*    }*/
  /*    .title {*/
  /*      text-indent: .2rem;*/
  /*      padding: 0;*/
  /*      line-height: .7rem;*/
  /*      height: .7rem;*/
  /*      !*background-color: #f5f5f9;*!*/
  /*      color: #999;*/
  /*      font-size: .24rem;*/
  /*    }*/

  /*    .m-btns {*/
  /*      padding-top: 1.2rem;*/
  /*      display: flex;*/
  /*      justify-content: space-around;*/
  /*      align-items: center;*/

  /*      //.m-btn, .m-button {*/
  /*      //  color: #fff;*/
  /*      //  background-color: #dd413a;*/
  /*      //  width: 6.9rem;*/
  /*      //  height: .8rem;*/
  /*      //  line-height: .8rem;*/
  /*      //  font-size: .36rem;*/
  /*      //  margin: auto;*/
  /*      //  border-radius: .1rem;*/
  /*      //  text-align: center;*/
  /*      //}*/

  /*      .disable {*/
  /*        background-color: #eda6a6;*/
  /*      }*/
  /*    }*/
  /*  }*/
  /*}*/

  /*.inputStyle {*/
  /*  display: flex;*/
  /*  align-items: center;*/
  /*  padding: .26rem;*/
  /*}*/

  /*.van-password-input li {*/
  /*  border: 1px solid rgb(245, 245, 249)*/
  /*}*/
</style>
