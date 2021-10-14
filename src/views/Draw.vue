<template>
  <div class="tian-content draw-box">
    <div class="tab-head">
      <!--<i v-show="tabActive === 1" class="fs-48 iconfont iconicon_search"></i>-->
      <div style="align-items: center;justify-items: center">
        <template v-for="(v, i) in tabList">
          <span @click="tabActive = i"
                :class="[tabActive === i ? 'active' : '']"
                :key="i">
            {{ $t(v) }}
          </span>
        </template>
      </div>
      <!--<i v-show="tabActive === 1" class="fs-48 iconfont iconicon-filters"></i>-->
    </div>
    <div class="lottery-content" v-if="tabActive === 0">
      <NotData v-if="isNotData" :isNotData="isNotData"/>
      <ul v-else>
        <li v-for="(item, index) in listData"
            class="draw-item" :key="index"
            @click=" $router.push(`/drawHistory?lotteryId=${item.id}`) ">
          <div class="draw-top">
            <img :src="imgAddress+item.images"/>
            <div class="draw-info">
              <p>{{$t('lang.common.di')}}
                {{delList[item.id] ? (delList[item.id].pre.turn ? delList[item.id].pre.turn : '???') : "???"}}
                {{$t('lang.common.issueText')}}</p>
              <h1>{{ item.name }}</h1>
            </div>
            <div class="draw-time">
              <span class="deadline">
                {{delList[item.id] ? (delList[item.id].cur.turn ? delList[item.id].cur.turn : '???') : "???"}}
                <!--                  {{delList[item.id].cur.turnNum ? delList[item.id].isTime ? delList[item.id].cur.turn : delList[item.id].cur.turnNum : "???"}}-->
                {{$t('lang.common.issueText')}}{{$t('lang.common.deadline')}}
              </span>
              <div v-if="delList[item.id] && delList[item.id].cur.status === 0" class="countdown">
                <div v-if="delList[item.id].timeLength > 0">
                  <span>{{ countTime(delList[item.id].timeLength, item.id).h }}</span>
                  <i>:</i>
                  <span>{{ countTime(delList[item.id].timeLength, item.id).m }}</span>
                  <i>:</i>
                  <span>{{ countTime(delList[item.id].timeLength, item.id).s }}</span>
                </div>
                <div v-else class="countdown opening">
                  <div class="lang-china" v-if="$i18n.locale === LANG.china">
                    <span>开</span>:<span>奖</span>:<span>中</span>
                  </div>
                  <div class="lang-english" v-else-if="$i18n.locale === LANG.english">
                    <span>Drawing</span>
                  </div>
                  <div class="lang-english" v-else>
                    <span>Vẽ tranh</span>
                  </div>
                </div>
              </div>
              <div class="countdown opening"
                   v-else-if="delList[item.id] && delList[item.id].cur.status === 3">
                <div class="lang-china"
                     v-if="$i18n.locale === LANG.china">
                  <span>开</span>:<span>奖</span>:<span>中</span>
                </div>
                <div class="lang-english" v-else-if="$i18n.locale === LANG.english">
                  <span>Drawing</span>
                </div>
                <div class="lang-english" v-else>
                  <span>Vẽ tranh</span>
                </div>
              </div>
              <div class="countdown" v-else-if=" delList[item.id] && delList[item.id].cur.status === 1">
                <div class="lang-china" v-if="$i18n.locale === LANG.china">
                  <span>封</span>:<span>盘</span>:<span>中</span>
                </div>
                <div class="lang-english" v-else-if="$i18n.locale === LANG.english">
                  <span>Blocking</span>
                </div>
                <div class="lang-english" v-else>
                  <span>Trong phong ấn</span>
                </div>
              </div>
              <div class="countdown" v-else>
                <div class="lang-china" v-if="$i18n.locale === LANG.china">
                  <span>加</span>:<span>载</span>:<span>中</span>
                </div>
                <div class="lang-english" v-else-if="$i18n.locale === LANG.english">
                  <span>Loading</span>
                </div>
                <div class="lang-english" v-else>
                  <span>Đang tải</span>
                </div>
              </div>
            </div>
          </div>
          <div class="draw-bottom">
            <template v-if="delList[item.id] &&delList[item.id].cur.status === 0">
                  <span v-if=" delList[item.id].pre.openNum === null || delList[item.id].pre.openNum.length == 0 ">
                  {{$t('lang.common.noData')}}</span>
              <BallAll v-else :gameType="item.type" :isBig="true"
                       :openNum="delList[item.id].pre.openNum"/>
            </template>
            <span v-else-if="delList[item.id] && delList[item.id].cur.status === 3">
                {{$t('lang.common.drawing')}}</span>
            <span v-else-if="delList[item.id] &&delList[item.id].cur.status === 1">
              {{$t('lang.common.blocking')}}</span>
            <span v-else>{{$t('lang.common.loading')}}</span>
            <i class="iconfont iconic-right"></i>
          </div>
        </li>
      </ul>
    </div>
    <div class="sport-content" v-else>
      <NotData></NotData>
      <!-- <van-tabs>
        <template v-for="(v, i) in tyList">
          <van-tab :title="v" :key="i">
            <div class="g-content" @click="isShow = true">
              <div class="sport-time">
                <van-icon name="arrow-left" />
                <div class="time">
                  <i class="calendar iconfont iconiconcalendar"></i>
                  <span>2020-04-28 周二</span><b class="picker"></b>
                </div>
                <van-icon name="arrow" />
              </div>
              <div class="no-data">
                <van-image
                  width="2.8rem"
                  lazy-load
                  src="https://sp-res-wap.ftfxgame.com/fusion/wap/release/static/img/no-coupon.0d8f0dce.png"
                  alt="暂无优惠券"
                  class="img"
                />
                <p class="text">暂无记录</p>
              </div>
            </div>
          </van-tab>
        </template>
      </van-tabs> -->
    </div>
    <div class="footer-padd"></div>
    <Footer :actived="active"/>
  </div>
</template>
<script>
  import {mapActions, mapState} from 'vuex'
  import {LANG} from "../utils/mode";

  export default {
    name: "Draw",
    components: {
      Footer: resolve => require(['../commons/footer/Footer'], resolve),
      NotData: resolve => require(['../commons/notdata/NotData'], resolve),
      BallAll: resolve => require(['../commons/balls/BallAll'], resolve)
    },
    computed: {
      ...mapState([
        'openConfigUrl',
        'allLotteryTypeList',
        'imgAddress'
      ]),
      allList() {
        if (this.allLotteryTypeList && this.allLotteryTypeList[0].list.length > 0) {
          return this.allLotteryTypeList[0].list
        } else {
          return [];
        }
      }
    },
    data() {
      return {
        LANG: LANG,
        active: 1,
        isLoading: false,
        imgFix: localStorage.getItem("imgSuffix"),
        tabActive: 0,
        tabList: ["lang.loginContent.lottery", "lang.header.physicalEducation"],
        listData: [],
        delList: {},
        isNotData: true,
      };
    },
    methods: {
      ...mapActions([
        'getOpenConfig', // 获取开奖地址
        'getAllLotteryList'
      ]),
      countTime(leftTime, id) {
        // 定义变量 h,m,s保存倒计时的时间
        let timeData = {
          h: "00",
          m: "00",
          s: "00",
        };
        if (leftTime >= 0) {
          const h = Math.floor(leftTime / 60 / 60); // % 24
          const m = Math.floor((leftTime / 60) % 60);
          const s = Math.floor(leftTime % 60);
          timeData = {
            h: h < 10 ? "0" + h : h,
            m: m < 10 ? "0" + m : m,
            s: s < 10 ? "0" + s : s,
          };
        }
        return timeData;
      },
      hasOpenConfig() {
        if (this.openConfigUrl === '') {
          this.getOpenConfig({});
        }
      },
      queryDataCp(_t) {
        let allOpenInfo = JSON.parse(sessionStorage.getItem('allOpenInfo'))
        if (allOpenInfo) {
          this.isNotData = false
          this.delList = allOpenInfo
        }
        this.$http.home.getCp(_t).then((res) => {
          let l = res.data;
          for (const key in l) {
            if (key !== "serverTime") {
              l[key].timeLength = parseInt(l[key].cur.closeTime / 1000 - res.data.serverTime / 1000);
            }
          }
          this.delList = JSON.parse(JSON.stringify(l));
          this.isNotData = false
          sessionStorage.setItem('allOpenInfo', JSON.stringify(this.delList))
        });
      },
    },
    mounted() {
      // 初次加载获取开奖数据
      let _t = (Date.parse(new Date()) / 1000).toString();
      this.queryDataCp(_t);
      //时间定时器
      const timer = setInterval(() => {
        let delList = this.delList;
        for (const key in delList) {
          if (key !== "serverTime") {
            if (delList[key].timeLength >= 0) {
              delList[key].timeLength--;
            }
          }
        }
        this.delList = JSON.parse(JSON.stringify(delList));
      }, 1000);
      //接口调用定时器
      const timer1 = setInterval(() => {
        let _t = (Date.parse(new Date()) / 1000).toString();
        this.$http.home.getCp(_t).then((res) => {
          let l = res.data;
          for (const key in l) {
            if (key !== "serverTime") {
              l[key].timeLength = parseInt(l[key].cur.closeTime / 1000 - res.data.serverTime / 1000);
            }
          }
          this.delList = JSON.parse(JSON.stringify(l));
          sessionStorage.setItem('allOpenInfo', JSON.stringify(this.delList))
        });
      }, 1000 * 10);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
        clearInterval(timer1);
      });
    },
    created() {
      this.hasOpenConfig(); // 判断是否有开奖地址
      this.isLoading = true;
      this.getAllLotteryList({}).then((_data) => {
        console.log(_data, 'lllllllllllllllllllllll');
        this.loading = false;
      });
      const _t = (Date.parse(new Date()) / 1000).toString();
      if (!sessionStorage.getItem("LotteryTypeList")) {
        this.$http.home.getCpGame().then((res) => {
          sessionStorage.setItem("LotteryTypeList", JSON.stringify(res.data));
          setTimeout(() => {
            this.listData = res.data;
          }, 500)
          this.queryDataCp(_t);
        });
      }
      else {
        const lotteryTypeList = JSON.parse(sessionStorage.getItem("LotteryTypeList"));
        this.listData = lotteryTypeList;
        this.queryDataCp(_t);
        // console.log(this.listData);
        // console.log(typeof (this.listData));
      }
    }
  };
</script>
<style lang="scss" scoped>
  .draw-box {
    display: flex;
    flex-direction: column;;
    height: 100%;
    .draw-wrap {
      height: calc(100% - 45px - 80px);
      overflow-y: scroll;
    }
    .draw-item {
      min-height: px2rem(115px);
      margin-bottom: px2rem(10px);
      padding: px2rem(10px);
      background: #24252D;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      .draw-top {
        display: flex;
        align-items: center;
        .draw-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          line-height: px2rem(25px);
          position: relative;
          &:after {
            content: "";
            width: 1px;
            height: 100%;
            position: absolute;
            right: 0;
            top: 0;
            background: #33343B;
            transform: scaleX(0.5);

          }
          p {
            font-size: px2rem(13px);
            color: #8f8f8f;
          }
          h1 {
            font-size: px2rem(15px);
            color: #fff;
          }
        }
        .draw-time {
          width: px2rem(120px);
          display: flex;
          flex-direction: column;
          align-items: center;
          .deadline {
            font-size: px2rem(13px);
            color: #8f8f8f;
            line-height: px2rem(25px);
          }
        }
        > img {
          width: px2rem(50px);
          max-height: px2rem(50px);
          margin-right: px2rem(10px);
        }
      }
      .draw-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: px2rem(10px);
        color: #fff;
        > div {
          width: auto;
        }
      }

    }

  }

  .skin-black {
    .draw-box {
      .draw-item {
        background: $skin-black-con-bg;
      }
    }
  }

  .skin-gray {
    .draw-box {
      .draw-item {
        background: $skin-gray-con-bg;
      }
    }
  }

  .tian-content {
    display: flex;
    flex-direction: column;;
    height: 100%;
    .tab-head {
      display: flex;
      width: 100%;
      //background: $global-bgcolor;
      height: 1rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.3rem;
      font-size: 0.36rem;
      color: #fff;
      div {
        flex: 1;
        justify-content: center;
        display: flex;
      }
      .fs-48 {
        font-size: 0.48rem;
      }
      .iconfont {
      }
      span {
        // width: 0.8rem;
        padding: 0.06rem 0;
        margin: 0 0.3rem;
        opacity: 0.6;
        text-align: center;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      }
      .active {
        opacity: 1;
        border-bottom: 2px solid #fff;
      }
    }
    .lottery-content {
      flex: 1;
      overflow: scroll;
      li {
        list-style: none;
      }
      .digital-item {
        position: relative;
        /*padding: 0.2rem;*/
        /*border-bottom: 1px solid #e5e5e5;*/
        min-height: 2rem;
        /*.digital-img {*/
        /*  position: absolute;*/
        /*  top: 0.2rem;*/
        /*  left: 0.2rem;*/
        /*  !*width: 0.8rem;*!*/
        /*  !*height: 0.8rem;*!*/
        /*}*/
        .detail {
          padding-left: 1.5rem;
          .title {
            position: relative;
            font-size: 0.32rem;
            .date {
              position: absolute;
              top: 50%;
              -webkit-transform: translateY(-50%);
              transform: translateY(-50%);
              right: 0;
              font-size: 0.24rem;
              color: #999;
            }
          }
          .issue {
            position: relative;
            margin: 0.2rem 0 0.22rem 0;
            color: #999;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
          .result {
            margin: 0.08rem 0;
            color: #fff;
            .openLottery {
              color: #fff;
              font-size: 0.33rem;
              background-color: #f11717;
              border-radius: 0.26rem;
              padding: 0.05rem 0.5rem;
            }
            .openLottery-Blue {
              background: #dfe7f5;
            }
            .openLottery-org {
              background: rgba(246, 125, 54, 0.6);
            }
            .closeLottery {
              color: #fff;
              font-size: 0.33rem;
              background-color: #999;
              border-radius: 0.26rem;
              padding: 0.05rem 0.5rem;
            }
          }

        }
      }
    }
    .sport-content {
      flex: 1;
      .g-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        .sport-time {
          height: 0.8rem;
          background: #fff;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          font-size: 0.28rem;
          .van-icon {
            padding: 0.2rem;
          }
          .time {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .iconfont {
              padding: 0.2rem;
              font-size: 0.46rem;
            }
          }
        }
        .no-data {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          background: #f5f5f9;
          flex: 1;
          .img {
            width: 2.8rem;
            margin-top: 0.8rem;
          }
          p {
            font-size: 0.28rem;
            margin-top: 0.8rem;
          }
        }
      }
      ::v-deep.van-tabs {
        height: 100%;
        display: flex;
        flex-direction: column;
        .van-tabs__wrap {
          height: 0.8rem;
          .van-tab--active {
            color: #c00;
          }
          .van-tabs__line {
            width: 50% !important;
            background-color: $global-bgcolor;
          }
        }
        .van-tabs__content {
          flex: 1;
          .van-tab__pane {
            height: 100%;
          }
        }
      }
    }
    ::v-deep.van-picker {
      z-index: 1000;
    }
    .footer-padd {
      height: 1.7rem;
    }
  }
</style>
