<comment>
  /* # 组件注释
  * 模块描述：未登录的弹窗
  */
</comment>
<template>
  <div class="no-login-box">
    <div class="no-login-wrap">
      <div class="no-login-con">
        <h1>{{$t('lang.loginContent.noLogin')}}</h1>
      </div>
      <div class="no-login-btn">
        <button class @click="$router.push('/login')">{{$t('lang.loginContent.login')}}</button>
        <button @click="$router.push('/reg')">{{$t('lang.loginContent.register')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'noLogin',
    data() {
      return {}
    },
    components: {},
    watch: {},
    methods: {},
    computed: {},
    created() {
    },
    mounted() {
    },
  }
</script>

<style scoped lang="scss">
  .no-login-box {
    position: absolute;
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.5);
    .no-login-wrap{
      width:80%;
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      background: #fff;
      border-radius: px2rem(10px);
      overflow: hidden;
    }
    .no-login-con{
      min-height: px2rem(100px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: px2rem(18px);
      color:#333;
    }
    .no-login-btn{
      display: flex;
      button{
        flex:1;
        border:0;
        background: #eee;
        color:#333;
        font-size: px2rem(14px);
        line-height: px2rem(40px);
        &:last-child{
          background: #a1a1a1;
        }

      }

    }

  }

  .skin-black{
    .no-login-btn{
      button{
        &:last-child{
          background: linear-gradient( 151deg , #65317d -12%, #293384 126%);
          color:#fff;
        }
      }
    }
  }

  .skin-gray{
    .no-login-btn{
      button{
        &:last-child{
          background: linear-gradient(91deg, #54517b 0%, #747199 100%, #747199 100%);
          color:#fff;
        }
      }
    }
  }
</style>
