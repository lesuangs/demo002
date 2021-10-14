<template>
  <div class="draw-history draw-history-box">
    <!--    <header class="g-header">-->
    <!--      <div class="left" @click="$router.go(-1)">-->
    <!--        <van-icon name="arrow-left"/>-->
    <!--      </div>-->
    <!--      <h3>{{ lotteryItem.name }}</h3>-->
    <!--    </header>-->
    <Header :headObj="headObj" @leftClick="$router.push('/Draw')"/>
    <div class="g-content">
      <div class="middle-box">
        <div class="img">
          <img :src="'/data/lotteryPicture/' + lotteryItem.code + '.png?' + imgFix" alt="图片"/>
        </div>
        <div class="text">
          <p class="issue">{{$t('lang.lottery.issueInfo[0]')}} {{ turnNum }} {{$t('lang.lottery.issueInfo[2]')}}</p>
          <em class="fs-40 theme-color">{{ lotteryItem.name }}</em>
        </div>
        <div class="time">
          <div class="number num-font">
            <!--            <van-count-down v-if="!isTimer" :time="closeTime" @finish="finish"/>-->
            <van-count-down v-if="!isTimer" :time="closeTime" format="HH:mm:ss" @finish="finish">
              <template v-slot="timeData">
                <div class="countdown">
                  <span>{{(timeData.days*24+timeData.hours)<10?'0'+(timeData.days*24+timeData.hours):(timeData.days*24+timeData.hours)}}</span>
                  <i>:</i>
                  <span>{{timeData.minutes<10?'0'+timeData.minutes:timeData.minutes}}</span>
                  <i>:</i>
                  <span>{{timeData.seconds<10?'0'+timeData.seconds:timeData.seconds}}</span>
                </div>
              </template>
            </van-count-down>
            <div class="countdown opening"
                 v-else>
              <div class="lang-china"
                   v-if="$i18n.locale === LANG.china">
                <span>开</span>:<span>奖</span>:<span>中</span>
              </div>
              <div class="lang-english" v-else-if="$i18n.locale === LANG.english">
                <span>Drawing...</span>
              </div>
              <div class="lang-english" v-else>
                <span>Vẽ tranh...</span>
              </div>
            </div>
            <!--            <div class="countdown opening" v-else>-->
            <!--              &lt;!&ndash;加载中&ndash;&gt;-->
            <!--              <span>{{$t('lang.state.loading')}}</span>-->
            <!--            </div>-->
          </div>
          <p class="coming">
            ...{{$t('lang.common.openPrizeSoon')}}...
          </p>
        </div>
      </div>
      <ul class="detail-list" v-if="datalist.length>0" :style="contentHight">
        <li :key="v.issue" v-for="v in datalist"
            class="item">
          <div class="title">
            <!--              第{{ v.issue }}期-->
            {{$t('lang.lottery.issueInfo[0]')}} {{ v.issue }} {{$t('lang.lottery.issueInfo[2]')}}
            <span class="time">{{ v.openDateTime }}</span>
          </div>
          <BallAll
                  :gameType="gameType"
                  :isBig="true"
                  :openNum="v.openNum.join(',')"
          />
        </li>
      </ul>
      <NotData v-else :isNotData="isNotData"/>
    </div>
    <!--    <footer @click="playGame()" class="g-footer">-->
    <!--      <span>去购彩</span>-->
    <!--    </footer>-->
    <div class="step-button-box" @click="playGame()">
      <button class="btn-type2">{{$t('lang.lottery.buyLottery')}}</button>
    </div>
  </div>
</template>
<script>
  import BallAll from "../../commons/balls/BallAll";
  import NotData from "../../commons/notdata/NotData";
  import Header from "../../commons/header/Header";
  import {mapState, mapActions} from 'vuex'
  import {LANG} from "../../utils/mode";

  export default {
    name: "DrawHistory",
    components: {
      BallAll,
      NotData,
      Header,
    },
    data() {
      return {
        LANG: LANG,
        datalist: [],
        gameCode: "",
        turnNum: "",
        closeTime: 0,
        lotteryItem: {},
        isTimer: false,
        imgFix: localStorage.getItem("imgSuffix"),
        isNotData: true,
        headObj: {
          title: '',
          showArrow: true,
        },
        contentHight: "",
      };
    },
    computed: {
      ...mapState([
        'openConfigUrl',
        'allLotteryTypeList'
      ])
    },
    created() {
      this.getAllLotteryList();
      this.gameCode = this.$route.query.gameCode;
      const lotteryId = parseInt(this.$route.query.lotteryId);
      const lotteryTypeList = JSON.parse(
        sessionStorage.getItem("LotteryTypeList")
      );
      lotteryTypeList.forEach((element) => {
        if (element.id === lotteryId) {
          this.lotteryItem = element;
          this.headObj.title = this.lotteryItem.name;
          console.log(this.lotteryItem.name, 2222)
          this.gameType = element.type;
        }
      });
      if (this.closeTime === 0) {
        this.isTimer = true;
      }
      this.queryList();
      this.quetyTimer();
      this.getHeight();
    },
    methods: {
      ...mapActions([
        'getAllLotteryList',
        'getOpenConfig', // 获取开奖地址
      ]),
      getHeight() {
        let a = document.documentElement.clientHeight;
        this.contentHight = `height:${(Number(a) - 220)}px`;
      },
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
      finish() {
        this.isTimer = true
        setTimeout(() => {
          this.quetyTimer();
          setTimeout(() => {
            this.queryList();
          }, 5000)
        }, 1000);
      },
      _historyList() {
        let jsType = this.lotteryItem.jsType;
        let isJS = (1 === jsType) ? "/js" : "";
        let code = this.lotteryItem.code;
        let url = `${this.openConfigUrl + isJS}/anls-api/data/${code}/lotteryList/50.do`;
        this.$http.home.getHistoryList(url).then((res) => {
          console.log(res,99999)
          this.datalist = JSON.parse(JSON.stringify(res.data));
        }).catch(() => {
          setTimeout(() => {
            this._historyList();
          }, 1000 * 3)
        });
      },
      queryList() {
        this.getOpenConfig({}).then(() => {
          this._historyList();
        })

        // this.$http.home.getOne().then((res) => {
        //   let i = 1 === jsType ? "/js" : "";
        //   let url =
        //     res.data.configValue +
        //     i +
        //     "/anls-api/data/" +
        //     code +
        //     "/lotteryList/50.do";
        //   this.$http.home.getHistoryList(url).then((res) => {
        //     this.datalist = JSON.parse(JSON.stringify(res.data));
        //     console.log(this.datalist, 'datalistdatalistdatalist');
        //   });
        // });
      },
      quetyTimer() {
        const lotteryId = this.$route.query.lotteryId;
        const _t = (Date.parse(new Date()) / 1000).toString();
        const params = {
          _t,
          gameId: lotteryId,
        };
        this.$http.home.getNowCp(params).then((res) => {
          // console.log(res.data, 'quetyTimerquetyTimer');
          if (res.data.cur.status !== 0) {
            setTimeout(() => {
              this.quetyTimer();
            }, 1000);
          } else {
            this.isTimer = false
            this.turnNum = res.data.cur.turnNum;
            this.closeTime = parseInt(
              res.data.cur.closeTime - res.data.serverTime
            );
          }
        });
      },
      playGame() {
        let lotteryId = this.$route.query.lotteryId;
        // this.$router.push({path: `/${this.lotteryItem.type}`, query: {lotteryId: lotteryId}})
        this.$router.push({
          path: '/lotteryNew',
          query: {
            id: lotteryId
          }
        })
      }
    },
  };
</script>
<style lang="scss" scoped>
  .draw-history-box {
    .ball-style {
      justify-content: flex-start;
    }
    .middle-box {
      min-height: px2rem(72px);
      display: flex;
      color: #fff;
      padding: px2rem(10px);
      .text, .time {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
      .img {
        margin-right: px2rem(8px);
        width: px2rem(65px);
        img {
          width: 100%;
        }
      }
      .text {
        flex: 1.3;
        em {
          color: #fff;
          font-size: px2rem(18px);
          /*margin-top: px2rem(15px);*/
        }
      }
      .time {
        align-items: center;
        /*justify-content: space-around;*/
      }

    }
    .step-button-box {
      width: 100%;
      height: px2rem(85px);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0;
      padding: 0 px2rem(45px);
      button {
        margin: 0;
      }
    }
    .detail-list {
      overflow-y: scroll;
      li {
        min-height: px2rem(73px);
        /*padding:px2rem(12px);*/
        padding: px2rem(12px);
      }
    }
    .step-button-box {
      position: fixed;
      bottom: 0;

    }
    .countdown {
      /*drawHistory.vue 这个倒计时，样式特殊处理*/
      &:not(.opening), .lang-china {
        span {
          width: px2rem(28px);
          height: px2rem(28px);
          min-height: px2rem(28px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: px2rem(19px);
          font-weight: 600;
        }
      }

    }

  }

  .skin-gray {
    .draw-history-box {
      .middle-box {
        background: $skin-gray-con-bg;
        .text {
          border-right: 1px $skin-gray-border-color solid;
          .issue {
            color: $skin-gray-text-sub-color;
          }
        }
      }
      .detail-list {
        li {
          /*   background: #44425E;
             border-bottom:1px $skin-gray-border-color solid;*/
          &:not(:last-child) {
            @include border-1px($skin-gray-border-color);
          }
          .title {
            color: $skin-gray-text-color;
          }
        }
      }
      .g-footer, .step-button-box {
        background: $skin-gray-bg;
        border-top: 1px #2E3041 solid;
      }
    }
  }

  .skin-black {
    .draw-history-box {
      .middle-box {
        background: $skin-black-con-bg;
        .text {
          border-right: 1px $skin-black-border-color solid;
          .issue {
            color: $skin-black-text-sub-color;
          }
        }
      }
      .detail-list {
        li {
          /*background: #191B1F;
          border-bottom:1px $skin-black-border-color solid;*/
          &:not(:last-child) {
            @include border-1px($skin-black-border-color);
          }
          .title {
            color: $skin-black-text-color;
          }
        }
      }
      .g-footer, .step-button-box {
        background: #24252D;
        border-top: 1px #3D3E4C solid;
      }
    }
  }

  .draw-history {
    display: flex;
    flex-direction: column;
    height: 100%;
    .g-content {
      display: flex;
      flex-direction: column;
      /*flex: 1;*/
      /*overflow: scroll;*/
      .middle {
        flex: 1;
        .middle-wrap {
          /*background-color: #fff;*/
          /*border-radius: 4rem 0 0 4rem;*/
          /*width: 100%;*/
          /*height: 1.3rem;*/
          /*text-align: left;*/
          /*color: #333;*/
          /*display: flex;*/
          /*flex-direction: row;*/
          /*align-items: center;*/

          img {
            margin-left: 0.1rem;
            width: 1.06rem;
            height: 1.06rem;
          }

          .text {
            display: flex;
            flex-direction: column;
            flex: 1;
            margin-left: 0.2rem;
            overflow: scroll;

            .theme-color {
              color: #c00;
              font-size: 0.4rem;
            }

            .issue {
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              color: #666;
              margin-top: 0.1rem;
            }
          }

          .time {
            width: 2rem;

            ::v-deep.van-count-down {
              color: #c00;
              font-size: 0.5rem;
            }

            .num-font {
              font-family: numberfont !important;
              font-style: normal;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;

              > span {
                color: #c00;
                font-size: 0.34rem;
                margin-top: 0.1rem;
              }
            }

            .coming {
              margin-top: 0.1rem;
              color: #666;
            }
          }
        }
      }
      ul.detail-list {
        li.item {
          display: flex;
          /*padding: 0.2rem;*/
          flex-direction: column;

          .title {
            display: flex;
            flex-direction: row;
            /*color: #666;*/
            padding: 0.1rem;
            justify-content: space-between;
          }
        }
      }
    }

    .g-footer {
      background: $global-bgcolor;
      height: 0.98rem;
      line-height: 0.98rem;
      text-align: center;
      font-size: 0.36rem;
      color: #fff;
    }
  }
</style>
