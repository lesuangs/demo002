<template>
  <div class="customer-serve-box">
    <van-dialog v-model="isShow"
                cancel-button-text=" "
                :show-confirm-button="false"
                :show-cancel-button="false"
                :close-on-click-overlay="false">
      <div class="serve-wrapper customer-serve-wrap">
        <div class="title">{{$t('lang.user.contactCustomerService')}}</div>
        <!--        <img :src="require(`@/assets/themes/hjb/black/title_01.png`)" alt=""/>-->
        <div class="main-content customer-serve-con">
          <div class="item">
            <div class="box">
              <!--<img :src="require(`@/assets/themes/hjb/black/ic_service_24.svg`)" alt=""/>-->
              <i class="iconfont iconic-service-24"></i>
              <div>
                <p>{{ $t('lang.withDraw.onlineService') }}</p>
                <p class="alttext">{{ $t('lang.Customerserve.fullDayServe') }}</p>
              </div>
            </div>
            <a class="word" target="_blank"
               :href="info.onlineServiceWap">{{ $t('lang.Customerserve.advisory') }}</a>
          </div>
          <div class="item number">
            <div class="qq">
              <!--<img :src="require(`@/assets/themes/hjb/black/ic_service_qq.svg`)" alt=""/>-->
              <i class="iconfont iconic-service-QQ"></i>
              <div>
                <p>{{ $t('lang.Customerserve.QQCustomerService') }}</p>
                <p class="alttext">{{ info.onlineQq }}</p>
              </div>
            </div>
            <span id="clipboard_10" @click="copy()"
                  :data-clipboard-text="info.onlineQq"
                  v-show="info.onlineQq"
                  class="m-copy word copy">
            {{ $t('lang.Customerserve.copy') }}
          </span>
          </div>
          <div class="item number">
            <div class="wechat">
              <!--<img :src="require(`@/assets/themes/hjb/black/ic_service_wechat.svg`)" alt=""/>-->
              <i class="iconfont iconic-service-wechat"></i>
              <div>
                <p>{{ $t('lang.Customerserve.weChatCustomerService') }}</p>
                <p class="alttext">{{ info.onlineWx }}</p>
              </div>
            </div>
            <span id="clipboard_11" @click="copy()"
                  :data-clipboard-text="info.onlineWx"
                  v-show="info.onlineWx"
                  class="m-copy word copy">
            {{ $t('lang.Customerserve.copy') }}
          </span>
          </div>
        </div>
      </div>
      <div class="customer-close-box">
        <i class="iconfont iconic-close" @click="isShow=false"></i>
      </div>

    </van-dialog>
  </div>
</template>

<script>
  import Clipboard from 'clipboard'
  import {Toast} from "vant";
  import {mapState} from 'vuex'

  export default {
    name: 'Customerserve',
    data() {
      return {
        webSteUp: ''
      }
    },
    props: {
      showDialog: Boolean,
      title: String
    },
    computed: {
      ...mapState([
        'serviceInfo'
      ]),
      info() {
        return this.serviceInfo;
      },
      isShow: {
        get() {
          return this.showDialog
        },
        set(val) {
          return this.$emit('closeDialog', val)
        }
      }
    },
    methods: {
      copy() {
        const clipboard = new Clipboard('.copy')
        clipboard.on('success', (e) => {
          this.$toast.success({
            message: this.$t('lang.Customerserve.copySuccessfully'),
            forbidClick: true
          });
          e.clearSelection()
          clipboard.destroy() // 复制成功后删除实例
        })
      },
      getWebSteUp() {
        if (!sessionStorage.getItem('WebSteUp')) {
          const _t = (Date.parse(new Date()) / 1000).toString()
          this.$http.home.getService(_t).then((res) => {
            this.webSteUp = res.data[0]
            sessionStorage.setItem('WebSteUp', JSON.stringify(this.webSteUp))
          })
        } else {
          this.webSteUp = JSON.parse(sessionStorage.getItem('WebSteUp'))
          console.log(this.webSteUp)
        }
      }
    },
    mounted() {
      // 无需初次加载均可延迟加载
      // this.$nextTick(() => {
      //   setTimeout(() => {
      //     this.getWebSteUp()
      //   }, 3000)
      // })
    }
  }
</script>

<style lang="scss" scoped>
  .customer-serve-box {
    /deep/.van-dialog{
      overflow: inherit;
      background:none;
    }
    .customer-serve-wrap {
      border-radius: px2rem(20px);
      margin-bottom: px2rem(20px);
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.31);
      background-image: linear-gradient(to bottom, #413f56 1%, #2b293e);
      .title{
        width: 4rem;
        height: 0.8rem;
        margin: 0 auto;
        background: url("../../assets/themes/hjb/black/customer_serve_title.png") no-repeat;
        background-size:contain ;
        color: #533510;
        font-size: 0.32rem;
        text-align: center;
        line-height: 0.6rem;
        position: relative;
        top: -0.4rem;
      }
      .customer-serve-con{
        padding:px2rem(5px) px2rem(15px) px2rem(15px);
        .item{
          min-height: px2rem(70px);
          padding:px2rem(12px) px2rem(15px);
          border-radius: px2rem(10px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-image: radial-gradient(circle at 50% 0, #424852, #292a35 38%);
          &:not(last-child){
            margin-bottom: px2rem(15px);
          }
          .box,.qq,.wechat{
            display: flex;
            align-items: center;
            .iconfont{
              font-size: px2rem(35px);
              margin-right: px2rem(10px);
              background: linear-gradient(to right,#FFEAC0,#FFD681);
              -webkit-background-clip:text;
              -webkit-text-fill-color:transparent;
            }
            div p{
              &:first-child{
                font-size: px2rem(14px);
                margin-bottom: px2rem(5px);
                line-height: px2rem(18px);
                color:#9a9aa7;
              }
              &:last-child{
                font-size: px2rem(16px);
                color:#fff;
              }
            }
          }
          .word,.copy{
            min-width: px2rem(65px);
            height:px2rem(30px);
            padding:0 px2rem(10px);
            font-size: px2rem(16px);
            color:#533510;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 25px;
            background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
          }
        }
      }

    }
    .customer-close-box{
      width:px2rem(55px);
      height:px2rem(55px);
      margin:0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: $skin-black-con-bg;
      .iconfont{
        font-size:px2rem(20px);
        background: linear-gradient(to bottom,#FFEAC0,#FFD681);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
      }
    }
  }



  .skin-black {
    .customer-serve-box {
      .serve-wrapper {
        background: $skin-black-con-bg;
        .main-content {
          .item {
            .box, .qq,.wechat {
              .iconfont {
                background: linear-gradient(to right, #9834E0, #1772D1);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }

          }
        }
      }
    }
  }

  .skin-gray {
    .customer-serve-box {
      .serve-wrapper {
        background: #3F3D54;
        .main-content {
          .item {
            .box, .qq,.wechat {
              .iconfont {
                background: linear-gradient(to right, #FFEAC0, #FFD681);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
          }
        }
      }
    }
  }
  /*
    .serve {
      .serve-wrapper {
        .title {
          width: 4rem;
          height: 0.8rem;
          margin: 0 auto;
          //background: url("../../assets/themes/hjb/black/title_01.png") no-repeat;
          background-size: cover;
          color: #533510;
          font-size: 0.32rem;
          text-align: center;
          line-height: 0.6rem;
          position: relative;
          top: -0.6rem;
        }
        background: #24252d;
        padding: 0.32rem;
        border-radius: 20px;
        margin-bottom: 0.38rem;
      }
      .van-dialog {
        font-size: 0.34rem;
        overflow: inherit;
        background: none;
        width: 6.3rem ;
        border-radius: .4rem ;
        /deep/ .van-dialog__header {
          height: 0.8rem;
          line-height: 0.8rem;
          text-align: center;
          padding-top: 0;
          font-size: .32rem;
          font-weight: 500;
          color: #533510;
          background: transparent;
        }
        .main-content {
          !*padding: 0.4rem;*!
          .item {
            height: 1.4rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-radius: .2rem;
            margin-bottom: 16px;
            box-shadow: 0 0 .16rem 0 rgba(0, 0, 0, 0.06);
            background-image: radial-gradient(circle at 50% 0, #424852, #292a35 38%);
            .alttext {
              font-size: .32rem;
              color: white;
              padding-top: .1rem;
              white-space: nowrap;
            }
            p {
              font-size: .28rem;
              color: #8f8f8f;
            }
            .box {
              display: flex;
              width: 150px;
            }
            img {
              width: 0.66rem;
              height: 0.66rem;
              margin-right: 0.2rem;
            }
            .word {
              !*color: #0090ff;*!
            }
            //复制
            a, span {
              width: 1.28rem;
              height: .64rem;
              border-radius: .36rem;
              background-image: linear-gradient(to bottom, #efcea6, #dab591);
              font-size: .32rem;
              font-weight: 500;
              letter-spacing: 0.77px;
              color: #533510;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .number {
            display: flex;
            align-items: center;

            .qq {
              text-align: left;
              !*margin-top: 0.4rem;*!
              display: flex;
              width: 150px;

              img {
                height: 30px;
              }
            }
          }
        }

        /deep/ .van-dialog__footer {
          &::after {
            border: 0;
          }
          .van-button--default {
            display: block !important;
            width: 1.12rem !important;
            height: 1.12rem !important;
            margin: 0 auto;
            //padding: 18px;
            border-radius: .56rem !important;
            -webkit-backdrop-filter: blur(.36rem) !important;
            backdrop-filter: blur(.36rem) !important;
            background-color: #24252d !important;
            color: #dab591;
            !*position: fixed !important;*!
            !*bottom: 0 !important;*!
            .van-button__text {
              display: inline-block;
              width: 1.12rem;
              height: 1.12rem;
              background: url("../../assets/themes/hjb/black/ic-popupclose.svg");
              background-size: cover;
            }
          }

        }
      }
    }*/
</style>
