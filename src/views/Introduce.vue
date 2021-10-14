<template>
  <div class="introduce introduce-box">
    <Header :headObj="headObj"
            @leftClick="$router.go(-1)"/>
    <div class="g-content agentIntro introduce-wrap">
      <div v-if="$i18n.locale===LANG.china">
        <div class="banner"></div>
        <div class="text-content">
          <div class="dot"></div>
          <div>
            <h3><i class="iconfont iconyuanquan"></i>{{ $t('lang.Introduce.RHCWDL') }}</h3>
            <p><span>{{
                $t('lang.Introduce.CWDLcontent')
              }}</span><em @click="showDialog = true">{{ $t('lang.Introduce.contactCustomerService') }}</em></p>
          </div>
        </div>
        <div class="text-content">
          <div class="dot"></div>
          <div>
            <h3><i class="iconfont iconyuanquan"></i>{{ $t('lang.Introduce.RHZQYJ') }}</h3>
            <p>{{$t('lang.Introduce.ZQYJcontent') }}</p>
          </div>
        </div>
        <div class="text-content">
          <div class="dot"></div>
          <div>
            <h3><i class="iconfont iconyuanquan"></i>{{ $t('lang.Introduce.Reminder') }}</h3>
            <p class="reminder">{{ $t('lang.Introduce.FDBT') }}</p>
          </div>
        </div>
      </div>
      <div v-else class="introduce-wrap ">
        <div class="banner"></div>
        <!--        <img src='../assets/img/dailishuoming_en.png' alt="" style="margin-bottom: .2rem">-->
        <div class="text-content">
          <!--          <i></i>-->
          <div>
            <h3><i class="iconfont iconyuanquan"></i>{{ $t('lang.Introduce.RHCWDL') }}</h3>
            <p>{{ $t('lang.Introduce.CWDLcontent[0]') }}<em @click="showDialog = true">{{ $t('lang.Introduce.CWDLcontent[1]') }}</em>{{ $t('lang.Introduce.CWDLcontent[2]') }}</p>
          </div>
        </div>
        <div class="text-content">
          <!--          <i></i>-->
          <div>
            <h3><i class="iconfont iconyuanquan"></i>{{ $t('lang.Introduce.RHZQYJ') }}</h3>
            <p>{{ $t('lang.Introduce.ZQYJcontent') }}</p>
          </div>
        </div>
        <!--        <div class="text-content">-->
        <!--&lt;!&ndash;          <i></i>&ndash;&gt;-->
        <!--          <div>-->
        <!--            <h3><i class="iconfont iconyuanquan"></i>{{ $t('lang.Introduce.RHWXJKH') }}</h3>-->
        <!--            <p>{{ $t('lang.Introduce.XJKHcontent') }}</p>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <div class="text-content">-->
        <!--&lt;!&ndash;          <i></i>&ndash;&gt;-->
        <!--          <div>-->
        <!--            <h3><i class="iconfont iconyuanquan"></i>{{ $t('lang.Introduce.RHZQGZ') }}</h3>-->
        <!--            <p>{{ $t('lang.Introduce.ZQGZcontent') }}</p>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="text-content">
          <!--          <i></i>-->
          <div>
            <h3><i class="iconfont iconyuanquan"></i>{{ $t('lang.ExplainWithDraw.Reminder') }}</h3>
            <p>{{ $t('lang.Introduce.FDBT') }}</p>
          </div>
        </div>
      </div>
    </div>
    <Customerserve :showDialog="showDialog" @closeDialog="handleCloseDialog"/>
  </div>
</template>

<script>
  import Header from '../commons/header/Header'
  import {LANG} from "../utils/mode";
  import Customerserve from "../commons/customerserve/Customerserve";
  export default {
    name: 'Introduce',
    components: {
      Header,Customerserve
    },
    data() {
      return {
        LANG:LANG,
        headObj: {
          title: 'lang.daiLiZhongXin.agentDescription',
          showArrow: true
        },
        showDialog: false,
      }
    },
    created() {
    },
    methods: {
      handleCloseDialog(val) {
        this.showDialog = val
      },
    }
  }
</script>

<style lang="scss" scoped>
  .introduce-box {
    display: flex;
    flex-direction: column;
    height: 100%;
    /*  .topBanner{
        min-height: px2rem(200px);
        @include bg-image('../assets/img/index/gameintry-2-box');
      }*/
    .introduce-wrap{
      /*height:100%;*/
    }
    .g-content {
      flex: 1;
      overflow: scroll;
      height: 100%;
    }
    .text-content{
      margin:px2rem(10px) px2rem(15px);
      color:#fff;
      border-radius: px2rem(10px);
      padding:px2rem(10px);
      &:nth-child(2){
        margin-top: px2rem(-30px);

      }
      div{
        display: flex;
        flex-direction: column;
        h3{
          font-size: px2rem(15px);
          line-height: px2rem(25px);
          padding-left: px2rem(25px);
          position: relative;
          .iconfont{
            margin-right: px2rem(8px);
            position: absolute;
            left:px2rem(2px);
          }
        }
        p{
          padding-left: px2rem(25px);
          line-height: px2rem(22px);
          em{
            color:#efcea6;
          }
        }
      }
    }
    .banner{
      width:100%;
      height:px2rem(175px);
    }
  }

  .skin-gray{
    .introduce-box{
      .introduce-wrap{
        background: #42405b;
        .banner{
          @include bg-image('../assets/themes/hjb/grey/img/vip-img');
          background-size: contain;
        }
        .text-content{
          background: $skin-gray-con-bg;
          &:last-child{
            p{
              color:#ffd57d;
            }
          }
          div{
            h3{
              .iconfont{
                background: linear-gradient(to right,#FFEAC0,#FFD681);
                -webkit-background-clip:text;
                -webkit-text-fill-color:transparent;
              }
            }
            p em{
              color:#ffd57d;
            }

          }
        }
      }
    }
  }

  .skin-black{
    .introduce-box{
      .introduce-wrap{
        background: #000;
        .banner{
          @include bg-image('../assets/themes/hjb/black/img/vip_img');
          background-size: contain;
        }
        .text-content{
          background: $skin-black-con-bg;
          &:last-child{
            div p{
              color:#efcea6;
            }
          }
          div{
            h3{
              .iconfont{
                background: linear-gradient(to right,#FFEAC0,#FFD681);
                -webkit-background-clip:text;
                -webkit-text-fill-color:transparent;
              }
            }
            p{
              color:#9a9aa7;
            }
            p em{
              color:#efcea6;
            }

          }
        }
      }
    }
  }


  /*.introduce {*/
  /*  display: flex;*/
  /*  flex-direction: column;*/
  /*  height: 100%;*/

  /*  .g-content {*/
  /*    flex: 1;*/
  /*    overflow: scroll;*/
  /*    height: 100%;*/
  /*  }*/
  /*}*/

  /*.text-content {*/
  /*  display: flex;*/
  /*  line-height: .35rem;*/
  /*  margin-bottom: .2rem;*/
  /*}*/

  /*h3 {*/
  /*  font-weight: 700;*/
  /*  font-size: .3rem;*/
  /*}*/

  //h3:before {
  //  content: url("../assets/img/hongdian.png");
  //  margin: .1rem;
  //}

  /*p {*/
  /*  padding: 0 0 0 .4rem;*/
  /*}*/
</style>
