<template>
  <div class="promotion-registration-box">
    <Header :headObj="headObj" @leftClick="$router.push('/agentCenter')" >
    </Header>
    <div class="g-content promotion-registration-wrap" v-if="dataList">
      <div class="promotion-registration-con" v-if="dataList && dataList.length > 0">
        <h1>{{ $t('lang.promotionRegistration.promotionChannelConnection') }}</h1>
        <div class="promotion-registration-scroll">
          <vue-better-scroll class="wrapper" ref="Ascroll"
                             :scrollbar="scrollbarObj"
                             :pullDownRefresh="pullDownRefreshObj"
                             :pullUpLoad="pullUpLoadObj"
                             :startY="parseInt(startY)"
                             @pulling-down="onPullingDown"
                             @pulling-up="onPullingUp">
            <template>
              <ul>
                <li v-for="(item,index) in dataList" :key="index">
                  <span>{{item.copyUrl}}</span>
                  <i class="iconfont iconfuzhi copy"
                     :data-clipboard-text="item.copyUrl"
                     @click="copy()"></i>
                  <i class="iconfont iconic-close" @click="delDetail(item)"></i>
                </li>
              </ul>
            </template>
          </vue-better-scroll>
        </div>
        <div class="step-button-box">
          <button class="btn-type2" @click="$router.push('/addPromoCode')">
            {{ $t('lang.promotionRegistration.newPromotionCode') }}
          </button>
        </div>
      </div>
      <NotData v-else :isNotData="isNotData">
        <div class="step-button-box">
          <button class="btn-type2" @click="$router.push('/addPromoCode')">
            {{ $t('lang.promotionRegistration.newPromotionCode') }}
          </button>
        </div>
      </NotData>
    </div>
  </div>
</template>

<script>
  import Header from "@/commons/header/Header";
  import NotData from "../../commons/notdata/NotData";
  // import utils from "../../utils/utils";
  // import DatePicker from '@/commons/datePicker/DatePicker'
  import Clipboard from "clipboard";
  import {mapState,mapActions} from 'vuex';
  import qs from "qs";
  import VueBetterScroll from '../../commons/scroll/BScroll'
  export default {
    name: "PromotionRegistration",
    components: {
      Header,
      NotData,
      VueBetterScroll
      // DatePicker,
    },
    data() {
      return {
        headObj: {
          title: 'lang.daiLiZhongXin.promotionRegistration',
          showArrow: true,
          // rightText: this.$t('lang.promotionRegistration.newPromotionCode')
        },
        qrCodeUrl: '',
        show: false,
        Promotion: [],
        isNotData: true,
        fullPath: '',
        startY: 0, // 纵轴方向初始化位置
        pullUpLoadObj: {
          threshold: 0,
          txt: {
            more: this.$t('lang.BScroll.jiaZaiGengDuo'),
            noMore: this.$t('lang.BScroll.meiYouGengDuo')
          }
        },
        scrollbarObj: {
          fade: true
        },
        pullDownRefreshObj: {
          threshold: 90,
          stop: 40
        },
        page: 1,
        dataList:[],
      }
    },
    created() {
      this.initData(1);
    },
    methods: {
      ...mapActions([
        'removeByAgent',
        // 'getPromotionReg'
      ]),
      initData(type){
        let params = {
          page:this.page,
          rows:20,
        };
        this.$http.account.promotionRegjst(params)
          .then((res, err) => {
            if (res.data.data.length === 0) {
              this.isNotData = false
            }
            let fullPath = 'http://' + window.location.host;
            res.data.data.map((value, index) => {
              value.copyUrl = fullPath + '/reg?' + value.code;//此处是填pc端的注册页面路由地址
              value.qrCodeUrl = `/api/qrcode?content=` + fullPath + '/reg?' + value.code;//二维码地址，此处应该是填h5的注册页面的路由地址；
              // value.qrCodeUrl = `/api/qrcode?content=` + fullPath + `/views/html/register.html?` + value.code;
            });
            this.dataList = type === 2 ? this.dataList.concat(res.data.data) : res.data.data
            if (this.dataList.length === res.data.totalCount) {
              this.$refs.Ascroll.forceUpdate(false)
            }
            console.log(this.dataList,res.data.data,999)
          })
          .catch((err) => {
            // console.warn(err)
          })
      },
      // 下拉刷新
      onPullingDown() {
        // alert(111)
        // console.warn(11111)
        setTimeout(() => {
          this.$refs.Ascroll.forceUpdate(true)
          this.page = 1
          this.initData()
        }, 500)
      },
      // 上拉 加载更多数据
      onPullingUp() {
        // alert(2222)
        setTimeout(() => {
          this.$refs.Ascroll.forceUpdate(true)
          this.page = this.page + 1
          this.initData(2)
        }, 500)
      },
      delDetail(v){
        this.$toast.loading(this.$t('lang.common.loading'))
        return this.$dialog.confirm({
          title: this.$t('lang.lottery.dialog.title'),
          message:this.$t('lang.common.del_tips[0]'),
          cancelButtonText:this.$t('lang.lottery.bottom.queue.btn[0]'),
          confirmButtonText:this.$t('lang.lottery.bottom.queue.btn[1]')
        }).then(() => {
          let params = {
            id:v.id
          };
          this.removeByAgent(qs.stringify(params)).then((_data) => {
            if (_data) {
              this.$toast.clear();
              this.$toast.success(this.$t('lang.common.del_tips[1]'));
              this.initData();
            }
          }, (rej) => {
          });
        }).catch(() => {
          // console.log('cancel');
        })

      },
      IsPC() {
        let userAgentInfo = navigator.userAgent;
        let Agents = ["Android", "iPhone",
          "SymbianOS", "Windows Phone",
          "iPad", "iPod"];
        let flag = true;
        for (let v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
          }
        }
        return flag;
      },
      copy(){
        const clipboard = new Clipboard('.copy');
        clipboard.on('success', (e) => {
          this.$toast.success({
            message: this.$t('lang.Customerserve.copySuccessfully'),
            forbidClick: true
          });
          e.clearSelection()
          clipboard.destroy() // 复制成功后删除实例
        })
      },

    },
    computed:{
      ...mapState([
        // 'promotionRegList'
      ]),
    },
  }
</script>

<style lang="scss" scoped>
  .promotion-registration-box{
    height:100%;
    display: flex;
    flex-direction: column;
    .step-button-box{
      width:100%;
      /*margin:60px 40px;*/
    //   width:100%;
    //   margin:60px 40px;
    //   position: fixed;
    //   bottom: 0px;

    }
    .promotion-registration-wrap{
      flex:1;
      overflow-y: scroll;
      position: relative;
    }
    .promotion-registration-scroll{
      flex: 1;
      overflow-y: scroll;
    }
    .promotion-registration-con{
      background: #fff;
      height:100%;
      display: flex;
      flex-direction: column;
      h1{
        padding:px2rem(20px) px2rem(15px) px2rem(5px);
        font-size: px2rem(14px);
        color:#a1a4a5;
      }
      ul{
        li{
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          padding:px2rem(10px) px2rem(15px);
          &:not(:last-child){
            @include border-1px(#ccc);
          }
          span{
            flex:1;
            font-size: px2rem(15px);
            line-height: px2rem(25px);
            word-break:break-all;
            @include ellipsis();

          }
          .iconfont{
            width:px2rem(25px);
            font-size: px2rem(15px);
            text-align: center;
          }
          span,.iconfont{
            color:#606870;
          }
        }
      }
    }

  }

  .skin-gray{
    .promotion-registration-box{
      .promotion-registration-con{
        background: $skin-gray-con-bg;
        h1{
          color:#a1a4a5;
        }
        ul{
          li{
            &:not(:last-child){
              @include border-1px($skin-gray-border-color);
            }
            span,.iconfont{
              color:#fff;
            }
          }
        }
      }
    }

  }
  .skin-black{
    .promotion-registration-box{
      .promotion-registration-con{
        background: $skin-black-con-bg;
        h1{
          color:$skin-black-text-color;
        }
        ul{
          li{
            &:not(:last-child){
              @include border-1px($skin-black-border-color);
            }
            span,.iconfont{
              color:#fff;
            }
          }
        }
      }
    }

  }



  /** {
    touch-action: pan-x;
  }

  .g-content {
    !*background-color: #efeff4;*!
    white-space: nowrap;
    overflow-x: scroll;
  }

  .widthStyle {
    overflow-x: scroll;
    text-align: center;
    min-height: 16rem;
  }

  !*table.imagetable {*!
  !*  font-family: verdana, arial, sans-serif;*!
  !*  font-size: 11px;*!
  !*  color: #333333;*!
  !*  border-collapse: collapse;*!

  !*}*!

  !*table.imagetable th {*!
  !*  padding: 8px;*!
  !*  width: 2rem;*!
  !*}*!

  !*table.imagetable td {*!
  !*  border-width: 1px;*!
  !*  padding: 8px;*!
  !*}*!

  !*table {*!
  !*  table-layout: fixed;*!
  !*}*!

  !*th {*!
  !*  position: -webkit-sticky;*!
  !*  position: sticky;*!
  !*  border-right: 1px solid rgb(248, 247, 249);*!
  !*}*!

  !*td {*!
  !*  position: -webkit-sticky;*!
  !*  position: sticky;*!
  !*  border-right: 1px solid rgb(248, 247, 249);*!
  !*}*!

  !*tr th:first-of-type {*!
  !*  left: 0;*!
  !*  z-index: 1;*!
  !*  width: 200px;*!
  !*  border-width: 0.02rem;*!
  !*  background-color: inherit;*!
  !*}*!

  !*tr td:first-of-type {*!
  !*  left: 0;*!
  !*  z-index: 1;*!
  !*  width: 200px;*!
  !*  background-color: inherit;*!
  !*}*!

  !*tr:nth-child(odd) {*!
  !*  background-color: rgb(255, 255, 255);*!
  !*}*!

  !*tr:nth-child(even) {*!
  !*  background-color: rgb(247, 247, 247);*!
  !*}*!

  .i-margin i {
    margin: 0 .1rem;
    color: rgb(74, 167, 219);
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 4rem;
    height: 4rem;
    background-color: #fff;
  }

  !*.m-btns {*!
  !*  padding-top: .75rem;*!
  !*  position: absolute;*!
  !*  margin: 4%;*!
  !*}*!

  !*.m-btn, .m-button {*!
  !*  color: #fff;*!
  !*  background-color: #dd413a;*!
  !*  width: 6.9rem;*!
  !*  height: .8rem;*!
  !*  line-height: .8rem;*!
  !*  font-size: .36rem;*!
  !*  border-radius: .1rem;*!
  !*  text-align: center;*!
  !*}*!*/
</style>
