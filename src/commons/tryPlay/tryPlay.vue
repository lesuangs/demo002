<comment>
  /* # 组件注释
  * 模块描述：试玩弹窗
  */
</comment>
<template>
  <div class="try-play-box">
    <van-dialog v-model="isShow"
                :show-confirm-button="false"
                :show-cancel-button="false"
                :close-on-click-overlay="false">
      <div class="try-play-wrap">
        <div class="try-play-img"></div>
        <div class="try-play-con">
          <h1>{{ $t('lang.user.notVIP') }}</h1>
          <p>{{ $t('lang.user.howVip') }}</p>
        </div>
        <div class="step-button-box">
          <button class="btn-type2">
            <span @click="$router.push('/login')"> {{ $t('lang.loginContent.loginNow') }}</span>
            <i>|</i>
            <span @click="$router.push('/reg')"> {{ $t('lang.loginContent.register') }}</span></button>
        </div>
      </div>
      <div class="try-play-close" @click="showDialog = false">
        <i class="iconfont iconic-close"></i>
      </div>
    </van-dialog>

  </div>
</template>

<script>
  export default {
    name: 'tryPlay',
    data() {
      return {}
    },
    props: {
      showDialog: Boolean,
      title: String
    },
    components: {},
    watch: {},
    methods: {},
    computed: {
      isShow: {
        get() {
          return this.showDialog
        },
        set(val) {
          return this.$emit('closeDialog', val)
        }
      }
    },
    created() {
    },
    mounted() {
    },
  }
</script>

<style scoped lang="scss">
  .try-play-box {
    .van-dialog{
      background: none;
    }
    .try-play-wrap{
      padding: px2rem(20px);
      border-radius:px2rem(20px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #fff;
    }
    .try-play-con{
      h1,p{
        line-height: px2rem(35px);
        text-align: center;
        font-size:px2rem(15px);
        color:#fff;
      }
    }
    .step-button-box{
      button{
        min-width: 200px;
        span{
          margin:0 10px;
        }
      }
    }
    .try-play-img {
      width: px2rem(180px);
      height: px2rem(105px);
      margin:px2rem(20px) auto;
      @include bg-image('../../assets/themes/hjb/grey/img/try-play');
      background-size: cover;
    }
    .try-play-close{
      width:px2rem(55px);
      height:px2rem(55px);
      border-radius: 50%;
      margin:px2rem(20px) auto;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #24252D;
      .iconfont{
        font-size:px2rem(20px);
        color:#E4C29B;
      }
    }
  }
  .skin-black{
    .try-play-box{
      .try-play-wrap{
        background:$skin-black-con-bg;
      }
      .try-play-img{
        @include bg-image('../../assets/themes/hjb/black/img/try-play');
        background-size: cover;
      }
    }

  }

  .skin-gray{
    .try-play-box{
      .try-play-wrap{
        background-image: linear-gradient(to bottom, #413f56 1%, #2b293e);
      }
      .try-play-img{
        @include bg-image('../../assets/themes/hjb/grey/img/try-play');
        background-size: cover;
      }
    }
  }

</style>
