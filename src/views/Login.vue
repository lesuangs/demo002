<template>
  <div class="login login-box">
    <!--<div class="tian-nav">-->
    <!--<Header :headObj="headObj" @leftClick="$router.push('/')" @rightClick="$router.push('/reg')"/>-->
    <!--</div>-->
    <!--    <div class="header" @click="$router.go(-1)">-->
    <!--      &lt;!&ndash;      <i class="fs-48 iconfont iconicon-closes"></i>&ndash;&gt;-->
    <!--      <img :src="require('@/assets/themes/hjb/black/close.svg')"/>-->
    <!--    </div>-->
    <div class="content">
      <div class="close-box">
        <router-link :to="{name:'User'}" class="iconfont iconic-close" tag="i"></router-link>
      </div>
      <p class="title">
        {{$t('lang.loginContent.loginTitle')}}
      </p>
      <div class="form">
        <van-form @submit="onSubmit">
          <van-field
                  v-model="loginObj.account"
                  :placeholder="$t('lang.loginContent.enterUserName')"
                  :clearable="true"
                  label-class="account"
                  :rules="[{ required: true, message: $t('lang.loginContent.PLZenterUserName') }]">
            <template #left-icon>
              <i class="iconfont iconic-user-fill"></i>
              <!--              <van-image :src="require('@/assets/themes/hjb/black/ic_user_fill.svg')" size=".4rem"/>-->
            </template>
          </van-field>
          <van-field
                  v-model="loginObj.password"
                  :type="isOpenPwd ? 'text':'password'"
                  @focus="changeType"
                  :clearable="true"
                  label-width="80"
                  :placeholder="$t('lang.loginContent.enterPassword')"
                  :rules="[{ required: true, message: $t('lang.loginContent.PLZenterPWD') }]">
            <template #left-icon>
              <i class="iconfont iconic-lock_fill"></i>
              <!--              <van-image :src="require('@/assets/themes/hjb/black/ic_lock.svg')" size=".4rem"/>-->
            </template>
            <template #right-icon>
              <i class="iconfont iconeye-fill" v-if="isOpenPwd" @click.stop="isOpenPwd = false"></i>
              <i class="iconfont iconic-view-off" v-else @click.stop="isOpenPwd = true"></i>
            </template>
          </van-field>
          <div class="vCode">
            <van-field
                    v-model="loginObj.valiCode"
                    label-width="80"
                    maxlength="4"
                    :clearable="true"
                    :placeholder="$t('lang.registerContent.verificationCode')"
                    left-icon="'iconfont icon-security2'"
                    @focus="handleChangeImg"
                    :rules="[{ required: true, message: $t('lang.loginContent.pleaseEnterVerificationCode') }]">
              <template #left-icon>
                <i class="iconfont iconic-supervise"></i>
                <!--                <van-image :src="require('@/assets/themes/hjb/black/ic_supervise.svg')" size=".4rem"/>-->
              </template>
            </van-field>
            <div class="code-img-box">
              <img @click="getVerifyCode" :src="verifyCodeImg" alt="">
<!--              <img @click="handleChangeImg" :src="'/v/vCode?t=' + t" alt=""/>-->
            </div>
          </div>
          <div class="step-button-box">
            <button class="btn-type2"
                    :disabled="disabled"
                    :class="disabled ? 'disable' : ''"
                    block native-type="submit">{{ $t('lang.loginContent.login') }}
            </button>
          </div>
          <!--          <div style="margin: 16px;">-->
          <!--            <van-button :class=" disabled ? 'disable' : 'm-button'" block-->
          <!--                        native-type="submit">-->
          <!--              {{ $t('lang.loginContent.login') }}-->
          <!--            </van-button>-->
          <!--          </div>-->
        </van-form>
      </div>
      <div class="other">
        <span @click="$router.push('/reg')" class="other_log">{{ $t('lang.loginContent.registerNow') }}</span>
        <!--        <span class="other_reg" @click="$router.push('/findPwd')">{{$t('lang.loginContent.retrievePassword')}}</span>-->
        <span class="other_reg" @click="showDialog = true">{{ $t('lang.loginContent.retrievePassword') }}</span>
      </div>
    </div>
    <Customerserve :showDialog="showDialog" @closeDialog="handleCloseDialog"/>
  </div>
</template>

<script>
  import {mapMutations, mapActions,mapState} from 'vuex'

  export default {
    name: 'Login',
    components: {
      Customerserve: resolve => require(['../commons/customerserve/Customerserve'], resolve)
    },
    data() {
      return {
        showDialog: false,
        loginObj: {
          account: '',
          password: '',
          valiCode: '',
          tenantCode: 'model'
          // r: Math.round(Math.random() * (9999 - 1000) + 1000) + ''
        },
        t: Date.now(),
        isOpenPwd:false,
        timer:null,
        // index_title: '彩票',
        // headObj: {
        //   title: '登录',
        //   leftText: '返回',
        //   showArrow: true
        // },
      }
    },
    beforeDestroy() {
      window.clearTimeout(this.timer)
    },
    computed: {
      ...mapState([
        'verifyCodeImg'
      ]),
      disabled() {
        const {account, password, valiCode} = this.loginObj;
        if (account && password && valiCode.length >= 4) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      ...mapActions([
        'getUserInfo',
        'getStatus',
        'login',
        'getVerifyCode',
      ]),
      ...mapMutations({
        setData: 'SET_DATA'
      }),
      refreshvCode(){
        this.timer = setInterval(() => {
          this.handleChangeImg()
        }, 60000)
      },
      clearTimer(){
        clearInterval(this.timer);
        setTimeout(() => {
          this.handleChangeImg();
        }, 1000)
      },
      ...mapMutations('user', ['SET_USER_INFO', 'SET_TOKEN']),
      handleChangeImg() {
        this.t = Date.now()
      },
      onSubmit() {
        const data = Object.assign({}, this.loginObj);
        this.login(data).then((_data) => {
          if (_data) {
            this.clearTimer();
          }else{
            this.clearTimer();
          }
        }, (rej) => {
          this.clearTimer();
        });

        // this.$http.users.login(data).then((res) => {
        //   console.log(res, 'resresres-login');
        //   if (res.status === 200) { // 登录成功
        //     // console.log(res,'登录成功');
        //     this.setData({key: 'isLogin', value: true}); // 设置登录状态为true;
        //     this.setData({key: 'accountType', value: res.data.type});
        //     this.getUserInfo({}); // 调取用户信息
        //     this.getStatus({});
        //     localStorage.setItem('isLogin', JSON.stringify(true));
        //     localStorage.setItem('accountType', res.data.type);
        //     this.$toast.success(this.$t('lang.loginContent.loginSuccessful'));
        //     this.$cookie.set('account', res.data.account);
        //     // this.$cookie.set('accountType', res.data.type);
        //     // res.data.isLogin = true;
        //     // this.SET_USER_INFO(res.data);
        //     this.$router.push('/')
        //   } else {
        //     this.$toast.fail('登录失败');
        //     localStorage.setItem('isLogin', JSON.stringify(false));
        //     this.setData({key: 'isLogin', value: false}); // 设置登录状态为false
        //     this.t = Date.now()
        //   }
        // }).catch((err) => {
        //   this.t = Date.now();
        //   this.$toast.fail(err.data.msg)
        //   this.handleChangeImg()
        // })
      },
      handleCloseDialog(val) {
        this.showDialog = val
      },
      //关闭浏览器自带的将表单元素的password自动填充功能
      changeType(e) {
        // console.log(e.srcElement.type,'ee');
        // e.srcElement.type = 'password'
      }
    },
    mounted() {
      if (this.$cookie.get('account')) {
        this.loginObj.account = this.$cookie.get('account')
      }
    },
    created() {
      this.getVerifyCode();
      // this.refreshvCode();

    }
  }
</script>

<style lang="scss" scoped>
  .login-box {
    height: 100%;
    .content {
      height: 100%;
      position: relative;
      overflow: hidden;
      /deep/ .van-cell__value {
        &, .van-field__control {
          color: #fff;
        }
      }
      .close-box {
        color: #fff;
        position: absolute;
        top: px2rem(20px);
        left: px2rem(20px);
      }
      .other {
        width: 80%;
        display: flex;
        position: fixed;
        bottom: px2rem(20px);
        left: 50%;
        transform: translate(-50%, 0);
        span {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: px2rem(15px);

          &:first-child {
            border-right: 1px #fff solid;
          }
        }
      }
    }
    .title {
      font-size: px2rem(24px);
      letter-spacing: 3px;
      color: #fff;
      margin: px2rem(72px) auto px2rem(34px);
      text-align: center;
    }
    .form {
      margin: 0 px2rem(15px);
      background: red;
      border-radius: 10px;
      padding: px2rem(10px) 0;
      position: relative;
      z-index: 100;
      /deep/ .van-form {
        .van-cell {
          padding: 0 px2rem(17px);
          height: px2rem(60px);
          display: flex;
          align-items: center;
          background: none;
          .van-field__body {
            font-size: px2rem(15px);
            /*height:px2rem(50px);*/
          }
          .van-cell__value, .van-field__body, input {
            height: 100%;
          }
        }
        .van-field__left-icon {
          margin-right: px2rem(16px);
          margin-left: px2rem(10px);
          .iconfont {
            font-size: px2rem(20px);
          }
        }
      }
      .vCode {
        position: relative;
        /deep/.van-field__body{
          margin-right: 80px;
        }
        .code-img-box {
          position: absolute;
          right: px2rem(17px);
          top: px2rem(15px);
          img {
            border-radius: 4px;
            width: px2rem(75px);
            height: px2rem(35px);
          }
        }
      }
    }
  }

  .skin-gray {
    .login-box {
      @include bg-image('../assets/themes/hjb/grey/login/bg-toptop');
      background-position: top center;
      background-size: contain;
      background-color: #3A3A51;
      .content {
        @include bg-image('../assets/themes/hjb/grey/login/bg-bottom');
        background-position: bottom center;
        background-size: contain;

      }
      .form {
        background: $skin-gray-con-bg;
        .van-field__left-icon {
          .iconfont {
            background: linear-gradient(to bottom, #FFEAC0, #FFD681);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
  }

  .skin-black {
    .login-box {
      @include bg-image('../assets/themes/hjb/black/login/bg-toptop');
      background-position: top center;
      background-size: contain;
      background-color: #24252D;
      .content {
        @include bg-image('../assets/themes/hjb/black/login/bg-bottom');
        background-position: bottom center;
        background-size: contain;

      }
      .form {
        background: #191B1F;
        .van-field__left-icon {
          .iconfont {
            background: linear-gradient(to bottom, #A530E6, #1F61B8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
  }

  /*.login {
    height: 100%;
    background-color: #fff;
    //background: url("../assets/img/login/login-bg.png") no-repeat bottom;
    background-size: 100%;
    box-sizing: border-box;

    .header {
      height: 0.88rem;
      line-height: 0.88rem;
      padding-left: 0.2rem;

      i {
        font-size: 0.48rem;
      }
    }

    .fs-44 {
      font-size: 0.44rem;
    }

    .tian-nav {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background: #dd413a;
      font-size: 0.32rem;
      height: 1rem;
      align-items: center;
      color: #fff;
    }

    .content {
      .title {
        padding-top: 0.8rem;
        text-align: center;
        color: #dd413a;
        font-size: 0.6rem;
      }

      .form {
        margin: 0.8rem 0.3rem;
        !*box-shadow: 2px 2px 10px #eaeaea;*!
        .image {
          position: relative;
          top: -0.8rem;
          left: 4.5rem;
          width: 2.2rem;
          height: 0.8rem;
          background-color: #f0f;
        }

        /deep/ .van-field__left-icon {
          margin-right: 0.5rem;
        }

        .vCode {
          width: 100%;
          display: flex;

          img {
            width: 1.5rem;
            height: 1rem;
          }
        }
      }
    }

    ::v-deep .van-button {
      !*background-color: #eda6a6 !important;*!
      color: #fff;
      font-size: 0.36rem;
      border-radius: 0.1rem;
    }

    .other {
      margin-top: 0.5rem;
      text-align: center;

      &_log,
      &_reg {
        padding: 0 0.2rem;
        color: #666;
        font-size: 0.28rem;
        cursor: pointer;
      }

      &_log {
        border-right: 1px solid #e5e5e5;
      }
    }

    ::v-deep .van-field__control::placeholder {
      color: #969799 !important;
    }
  }*/
</style>
