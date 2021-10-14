<comment>
  /* # 组件注释
  * 模块描述：余额生金-详情页面
  */
</comment>
<template>
  <div class="surplus-fund-detail-box">
    <Header :headObj="headObj" @leftClick="$router.push('/surplusFund')"/>
    <div class="surplus-fund-detail-wrap">
<!--      <noData class="sub-content"></noData>-->
<!--      <vue-better-scroll></vue-better-scroll>-->
      <ul>
        <li>
          <div class="surplus-item">
            <h1>tesst222</h1>
            <p>202020-20-20</p>
          </div>
          <div class="surplus-item">
            <h1>转入</h1>
          </div>
          <div class="surplus-item">
            <h1 class="red">+90</h1>
            <p>{{$t('lang.common.Balance')}} 24324324</p>
          </div>
        </li>
        <li>
          <div class="surplus-item">
            <h1>tesst222</h1>
            <p>202020-20-20</p>
          </div>
          <div class="surplus-item">
            <h1>转入</h1>
          </div>
          <div class="surplus-item">
            <h1 class="green">+90</h1>
            <p>{{$t('lang.common.Balance')}} 24324324</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Header from "@/commons/header/Header";
  import noData from '../../commons/noData'
  export default {
    name: 'surplusFundDetail',
    data() {
      return {
        headObj: {
          title: 'lang.surplusFund.detailTitle',
          showArrow: true,
        },
      }
    },
    components: {
      Header,
      noData
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
  .surplus-fund-detail-box {
    .surplus-fund-detail-wrap{
      ul{
        li{
          height:px2rem(70px);
          padding:px2rem(15px) px2rem(20px);
          display: flex;
          color:#fff;
          .surplus-item{
            flex:1;
            /*font-size:px2rem(20px);*/
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p{
            }
            &:nth-child(1),&:nth-child(2){
              h1{
                font-size:px2rem(15px);
              }
            }
            &:nth-child(1),&:nth-child(3){
              flex:2;
              p{
                font-size:px2rem(12px);
                margin-top: px2rem(10px);
              }
            }
            &:nth-child(2){
              justify-content: end;
              align-items: center;
            }
            &:nth-child(3){
              align-items: flex-end;
              h1{
                font-size:px2rem(18px);
              }
            }

          }
        }
      }
    }
  }
  .skin-black{
    .surplus-fund-detail-box {
      .surplus-fund-detail-wrap{
        background: $skin-black-con-bg;
        ul{
          li{
            color:#fff;
            &:not(:last-child){
              @include border-1px($skin-black-border-color);
            }
            .surplus-item{
              &:nth-child(1),&:nth-child(3){
                p{
                  color:#8f8f8f;
                }
              }
              &:nth-child(3){
                h1{
                  &.red{
                    color:#ff2525;
                  }
                  &.green{
                    color:#4fbb72;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .skin-gray{
    .surplus-fund-detail-box {
      .surplus-fund-detail-wrap{
        background: $skin-gray-con-bg;
        ul{
          li{
            color:#fff;
            &:not(:last-child){
              @include border-1px($skin-gray-border-color);
            }
            .surplus-item{
              &:nth-child(1),&:nth-child(3){
                p{
                  color:#8f8f8f;
                }
              }
              &:nth-child(3){
                h1{
                  &.red{
                    color:#ff2525;
                  }
                  &.green{
                    color:#4fbb72;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
