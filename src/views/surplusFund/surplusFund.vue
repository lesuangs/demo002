<comment>
  /* # 组件注释
  * 模块描述：余额生金
  */
</comment>
<template>
  <div class="surplus-fund-box">
    <Header :headObj="headObj" @leftClick="$router.push('/user')">
      <template v-slot:icon>
        <div class="multi-header-right-icon">
          <i class="iconfont iconic-info2"></i>
          <i class="iconfont iconic-detail"></i>
        </div>
      </template>
    </Header>
<!--    <NotData v-if="Object.keys(userData).length === 0 " :isNotData="isNotData"/>-->
    <div class="surplusFund">
      <div class="surplus-wrap">
        <div class="surplus-con" @click="$router.push('/surplusFundDetail')" >
          <div class="surplus-title">
            <em class="iconfont iconic-earnings"></em>
            <span>{{$t('lang.surplusFund.yesterdayEarnings')}}</span>
            <div class="icon-set">
              <i class="iconfont iconic-view"></i>
              <i class="iconfont iconic-view-off"></i>
            </div>
          </div>
          <div class="surplus-money">120.0000</div>
          <div class="surplus-money-item">
            <div class="surplus-total-money">
              <p>
                <em><i class="iconfont icondouble-circle-full"></i></em>
                <span>{{$t('lang.surplusFund.totalAmout')}}</span>
              </p>
              <h2>1222.0000</h2>
            </div>
            <div class="surplus-profit-money">
              <p>
                <em><i class="iconfont iconbaitiaozhu"></i></em>
                <span>{{$t('lang.surplusFund.income')}}</span>
              </p>
              <h2>+120.0000</h2>
            </div>
          </div>
        </div>
        <ul class="surplus-ul-box">
          <li>
            <div class="surplus-item">
              <p>{{$t('lang.surplusFund.minAmout')}}</p>
              <h1>100</h1>
            </div>
            <div class="surplus-item">
              <p>{{$t('lang.surplusFund.maxAmout')}}</p>
              <h1>100</h1>
            </div>
            <div class="surplus-item">
              <p>{{$t('lang.surplusFund.dailyReturn')}}</p>
              <h1>0.02%</h1>
            </div>
          </li>
          <li>
            <div class="surplus-item">
              <p>{{$t('lang.surplusFund.minAmout')}}</p>
              <h1>100</h1>
            </div>
            <div class="surplus-item">
              <p>{{$t('lang.surplusFund.maxAmout')}}</p>
              <h1>100</h1>
            </div>
            <div class="surplus-item">
              <p>{{$t('lang.surplusFund.dailyReturn')}}</p>
              <h1>0.01%</h1>
            </div>
          </li>
        </ul>
        <div class="surplus-ad-img">
          <img src="" alt="">
        </div>
        <div class="surplus-profit-box">
          <div class="surplus-profit-wrap">
            <div class="surplus-profit-item">
              <h1>22222</h1>
              <p>{{$t('lang.surplusFund.annualIncome')}}</p>
            </div>
            <div class="surplus-profit-item">
              <h1>22222</h1>
              <p>{{$t('lang.surplusFund.monthlyIncome')}}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>

</template>

<script>
  import Header from "@/commons/header/Header";
  import NotData from "../../commons/notdata/NotData";
  // import {mapGetters, mapMutations} from "vuex";
  export default {
    name: 'surplusFund',
    components: {
      Header,
      // NotData,
    },
    data() {
      return {
        headObj: {
          title: 'lang.surplusFund.title',
          showArrow: true,
        },
        // userData: {},
      }
    },
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
  $skin-black-text-red:#ff2525;
  $skin-grey-text-red:#ff2525;
  .surplus-fund-box{
    height:100%;
    display: flex;
    flex-direction: column;
    .multi-header-right-icon {
      display: flex;
      > * {
        margin: 0 0 0 10px;
      }
    }
    .surplusFund{
      flex:1;
      overflow-y: scroll;
    }
    .surplus-wrap{
      padding:px2rem(30px) px2rem(16px);
    }
    .surplus-con{
      border-radius: px2rem(10px);
      padding:px2rem(20px);
      margin-bottom: px2rem(20px);
      .surplus-title{
        display: flex;
        align-items: center;
        .iconfont:nth-child(1){
          margin-right:px2rem(5px);
        }
        .icon-set{
          .iconfont{
            font-weight: 600;
            margin:0 px2rem(8px);
          }
        }
        span{
          font-size:px2rem(14px);
          margin:0 px2rem(5px);
        }
      }
      .surplus-money{
        font-size:px2rem(40px);
        margin:px2rem(15px) 0 px2rem(15px) px2rem(20px);
      }
      .surplus-money-item{
        display: flex;
        .surplus-total-money,
        .surplus-profit-money{
          flex:1;
          p{
            font-size:px2rem(12px);
            height:px2rem(20px);
            display: flex;
            em{
              display: inline-block;
              /*width: px2rem(16px);*/
              /*height:px2rem(16px);*/
              margin-right: px2rem(5px);
              padding:px2rem(2px);
              border-radius: 50%;
              .iconfont{}
              font-size:px2rem(10px);
              transform: scale(0.7);
            }
          }
          h2{
            font-size:px2rem(21px);
            margin-left:px2rem(25px);
            margin-top:px2rem(10px);
          }
        }
      }
    }
    .surplus-ul-box{
      li{
        display: flex;
        padding:px2rem(20px) 0;
        margin-bottom:px2rem(10px);
        border-radius: px2rem(10px);
        .surplus-item{
          flex:1;
          padding-left:px2rem(20px);
          p{
            font-size:px2rem(12px);
            height: px2rem(20px);
            display: flex;
            align-items: end;
          }
          h1{
            font-size:px2rem(20px);
            margin-top: px2rem(10px);
          }
        }
      }
    }
    .surplus-profit-box{
      border-radius: px2rem(10px);
      padding:px2rem(5px);
      .surplus-profit-wrap{
        padding:px2rem(20px);
        border-radius:px2rem(10px);
        display: flex;
        .surplus-profit-item{
          /*padding-left: px2rem(25px);*/
          flex:1;
          text-align: center;
          h1{
            font-size:px2rem(20px);
            font-weight: 600;
            margin-bottom: px2rem(10px);
          }
          p{
            font-size:px2rem(12px);
            height: px2rem(20px);
            display: flex;
            align-items: end;
          }
        }
      }
    }
  }
  .skin-black{
    .surplus-fund-box{
      color:#fff;
      .surplusFund{
        @include bg-image('../../assets/themes/hjb/black/surplusFund/bg');
        background-size: contain;
      }
    }
    .surplus-con{
      background:$skin-black-con-bg;
      .surplus-title{
        em.iconfont{
          background-image:-webkit-linear-gradient(left,#EDE2D5,#EFCEA6);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }
        .icon-set{
          .iconfont{
            color:#717173;
          }
        }
      }
      .surplus-money{
        color:$skin-black-text-red;
      }
      .surplus-money-item{
        .surplus-total-money,
        .surplus-profit-money{
          p{
            color:#9a9aa7;
            em{
              background: #333441;
              .iconfont{
                color:#E3C09A;
              }
            }
          }
        }
        .surplus-profit-money{
          h2{
            color:$skin-black-text-red;
          }
        }
      }
    }
    .surplus-ul-box{
      li{
        background: $skin-black-con-bg;
        .surplus-item{
          &:nth-child(2){
            border-right:1px #454554 dashed;
            border-left:1px #454554 dashed;
          }
          &:last-of-type{
            h1{
              color:$skin-black-text-red;
            }
          }
          p{
            color:$skin-black-text-color;
          }
          h1{
            color:#fff;
          }
        }
      }
    }
    .surplus-profit-box{
      background: #54458D;
      .surplus-profit-wrap{
        border:px2rem(4px) #0401FD solid;
        background: linear-gradient(to bottom,#FFEFDD,#FFDAAB);
        .surplus-profit-item{
          &:first-of-type{
            border-right: 1px #C4B5AB dashed;
          }
          h1{
            color:$skin-black-text-red;
          }
          p{
            color:#533510;
          }
        }
      }
    }
  }
  .skin-gray{
    .surplus-fund-box{
      color:#fff;
      .surplusFund{
        @include bg-image('../../assets/themes/hjb/grey/surplusFund/bg');
        background-size: contain;
      }
    }
    .surplus-con{
      background:$skin-gray-con-bg;
      .surplus-title{
        em.iconfont{
          background-image:-webkit-linear-gradient(left,#EDE2D5,#EFCEA6);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }
        .icon-set{
          .iconfont{
            color:#717173;
          }
        }
      }
      .surplus-money{
        color:$skin-grey-text-red;
      }
      .surplus-money-item{
        .surplus-total-money,
        .surplus-profit-money{
          p{
            color:#9a9aa7;
            em{
              background: #5A5870;
              .iconfont{
                color:#E3C09A;
              }
            }
          }
        }
        .surplus-profit-money{
          h2{
            color:$skin-grey-text-red;
          }
        }
      }
    }
    .surplus-ul-box{
      li{
        background: $skin-gray-con-bg;
        .surplus-item{
          &:nth-child(2){
            border-right:1px #454554 dashed;
            border-left:1px #454554 dashed;
          }
          &:last-of-type{
            h1{
              color:$skin-grey-text-red;
            }
          }
          p{
            color:$skin-gray-text-color;
          }
          h1{
            color:#fff;
          }
        }
      }
    }
    .surplus-profit-box{
      background: #54458D;
      .surplus-profit-wrap{
        border:px2rem(4px) #8988DE solid;
        background: linear-gradient(to bottom,#FFEFDD,#FFDAAB);
        .surplus-profit-item{
          &:first-of-type{
            border-right: 1px #C4B5AB dashed;
          }
          h1{
            color:$skin-grey-text-red;
          }
          p{
            color:#533510;
          }
        }
      }
    }
  }
</style>
