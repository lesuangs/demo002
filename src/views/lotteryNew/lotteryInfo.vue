<template>
  <div class="info-wrapper">
    <div class="info">
      <div class="draw-info" @click="showHistory()">
        <p class="title">
          <span>{{currentLotteryInfo && currentLotteryInfo.name}}</span>
          <em>-</em>
          <span>
          <!--<i>第</i>-->
            <i>{{$t('lang.lottery.issueInfo[0]')}}</i>
            <em>{{openInfo && (openInfo.pre.turn ? openInfo.pre.turn : '???')}}</em>
            <i>{{$t('lang.lottery.issueInfo[2]')}}</i>
            <!--<i>期</i>-->
        </span>
        </p>
        <div class="ball-type" v-if="openInfo !== null">
          <BallAll :openNum="openInfo && openInfo.pre.openNum"
                   :gameType="currentLotteryInfo && currentLotteryInfo.type">
          </BallAll>
        </div>
      </div>
      <div class="issue-info">
        <p class="issue">
          <!--<i>距离</i>-->
          <i>{{$t('lang.lottery.issueInfo[1]')}}</i>
          <em>{{openInfo && (openInfo.cur.turn ? openInfo.cur.turn : '???')}}</em>
          <i>{{$t('lang.lottery.issueInfo[2]')}}</i>
          <!--<i>期</i>-->
        </p>
        <div class="time">
          <div class="count-down" v-if="isOpening">
            <span>{{time[0]}}</span>
            <i>:</i>
            <span>{{time[1]}}</span>
            <i>:</i>
            <span>{{time[2]}}</span>
          </div>
          <div v-else class="opening">
            <div class="lang-china"
                 v-if="$i18n.locale === LANG.china">
              <span>开</span>:<span>奖</span>:<span>中</span>
            </div>
            <div class="lang-english" v-else>
              <span>Drawing...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="history-wrapper"
         :class="isShowHistory?'active':''">
      <ul class="title">
        <li>{{$t('lang.lottery.historyTitle[0]')}}</li>
        <li>{{$t('lang.lottery.historyTitle[1]')}}</li>
        <!--<li>期次</li>-->
        <!--<li>开奖号码</li>-->
      </ul>
      <ul class="list" v-if="topResultList.length>0">
        <li v-for="(item,index) in topResultList">
          <div class="list-issue">
            <!--<span>第</span>-->
            <span>{{$t('lang.lottery.issueInfo[0]')}}</span>
            <em>{{item.turn}}</em>
            <span>{{$t('lang.lottery.issueInfo[2]')}}</span>
            <!--<span>期</span>-->
          </div>
          <div class="list-number">
            <BallAll :openNum="item.openNum"
                     :gameType="currentLotteryInfo && currentLotteryInfo.type">
            </BallAll>
          </div>
        </li>
      </ul>
      <div v-else class="no-data">
        <noData :is-not-data="false"></noData>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapState} from 'vuex'
  import BallAll from '../../commons/balls/BallAll'
  import moment from 'moment';
  import axios from '../../http';
  import {API} from "../../api/api_list";
  import qs from 'qs'
  import {LANG} from '../../utils/mode'
  import {formatTime} from '../../utils/common';
  import noData from '../../commons/noData'

  export default {
    name: "lotteryInfo",
    data() {
      return {
        time: ['00', '00', '00'],
        timer_Time: null,
        timer_inferFace: null,
        isOpening: false, // false在开奖中，true在倒计时
        LANG: LANG,
        isShowHistory: false
      }
    },
    computed: {
      ...mapState([
        'currentLotteryInfo',
        'currentMethodInfo',
        'openInfo',
        'topResultList',
        'currentTurnNum'
      ]),
    },
    methods: {
      getOpenTime() {
        clearInterval(this.timer_Time)
        this.timer_Time = null;
        clearInterval(this.timer_inferFace)
        this.timer_inferFace = null;
        this.time = ['00', '00', '00'];
        let params = {
          gameId: this.$route.query.id,
          tenantCode: 'model'
        }
        this.getTopResult(params);
        axios.get(API.OPEN_INFO, {params: params}).then((_data) => {
          console.log(_data,'_data_data');
          if (_data.code === 200) {
            if (_data.data) {
              let data = _data.data;
              this.setData({key: 'openInfo', value: data});
              this.setData({key: 'currentTurnNum', value: data.cur.turnNum})
              let seconds = (data.cur.closeTime - data.serverTime) / 1000;
              let countDown = formatTime(seconds);
              this.time = countDown;
              // console.log(seconds,formatTime(data.serverTime/1000),'seconds');
              if (seconds <= 0) { // 一进来就是开奖中的情况
                this.isOpening = false;
                this.time = ['00', '00', '00'];
                this.setData({key: 'currentTurnNum', value: null})
                this.$nextTick(() => {
                  clearInterval(this.timer_Time)
                  this.timer_Time = null;
                  clearInterval(this.timer_inferFace)
                  this.timer_inferFace = null;
                  // this.getOpenTime();
                  this.timer_inferFace = setTimeout(() => {
                    this.getOpenTime()
                  }, 1000 * 3)
                })
              }
              else {
                this.isOpening = true;
                this.timer_Time = setInterval(() => {
                  // console.log('倒计时');
                  seconds = seconds - 1;
                  this.time = formatTime(seconds);
                  if (seconds <= 0) {
                    this.$toast(`${this.$t('lang.lottery.dialog.warning[7]')}：${data.cur.turn}`)
                    this.time = ['00', '00', '00'];
                    // this.setData({key:'currentTurnNum',value:null})
                    this.$nextTick(() => {
                      clearInterval(this.timer_Time)
                      this.timer_Time = null;
                      clearInterval(this.timer_inferFace)
                      this.timer_inferFace = null;
                      this.getOpenTime();
                      this.getTopResult(params);
                    })
                  }
                }, 1000)
              }
            } else {
              this.time = ['00', '00', '00']
            }
          }
        }, (err) => {
        }).catch((err) => {
          setTimeout(() => {
            this.getOpenTime();
          }, 1000 * 3)
        })
      },
      showHistory() {
        this.isShowHistory = !this.isShowHistory
      },
      ...mapMutations({
        setData: 'SET_DATA'
      }),
      ...mapActions([
        'getOpenInfo',
        'getTopResult'
      ]),
    },
    activated() {
      this.getOpenTime();
      // this.$once('hook:beforeDestroy', () => {
      //   clearInterval(this.timer_Time)
      //   this.timer_Time = null;
      //   clearInterval(this.timer_inferFace)
      //   this.timer_inferFace = null;
      // })
    },
    deactivated() {
      clearInterval(this.timer_Time)
      this.timer_Time = null;
      clearInterval(this.timer_inferFace)
      this.timer_inferFace = null;
    },
    components: {
      BallAll,
      noData
    }
  }
</script>

<style scoped lang="scss">
  .skin-black {
    .info-wrapper {
      .info {
        background: #24252d;
        color: #fff;
        .draw-info {
          .title {
            color: #fff;
          }
        }
        .issue-info {
          border-left: 1px solid #2d2e33;
          .time {
            .count-down {
              span {
                background-color: #191b1f;
                border: .02rem solid #2f2f36;
                color: #fff;
              }
              i {
                color: #fff;
              }
            }
            .opening {
              height: 0.8rem;
              .lang-china {
                span {
                  background-color: #191b1f;
                  border: .02rem solid #2f2f36;
                  color: red;
                }
                i {
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .history-wrapper {
        box-shadow: 0 0.08rem 0.18rem 0 rgba(0, 0, 0, 0.4);
        border-top: .02rem solid #393940;
        background: #202225;
        ul.title {
          border-bottom: .02rem solid #393940;
          li {
            &:nth-child(2) {
              border-left: 1px solid #393940;
            }
          }
        }
        ul.list {
          li {
            background: #24252d;
            &:nth-child(2n) {
              background-color: #202225;
            }
            .list-number {
              border-left: 1px solid #393940;
            }
          }
        }
      }
    }
  }

  .skin-gray {
    .info-wrapper {
      .info {
        background: #4c4965;
        color: #fff;
        .draw-info {
          .title {
            color: #fff;
          }
        }
        .issue-info {
          border-left: 1px solid #5F5D72;
          .time {
            .count-down {
              span {
                background-color: #191b1f;
                border: .02rem solid #2f2f36;
                color: #fff;
              }
              i {
                color: #fff;
              }
            }
            .opening {
              height: 0.8rem;
              .lang-china {
                span {
                  background-color: #191b1f;
                  border: .02rem solid #2f2f36;
                  color: red;
                }
                i {
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .history-wrapper {
        box-shadow: 0 0.08rem 0.18rem 0 rgba(0, 0, 0, 0.4);
        border-top: .02rem solid #717180;
        background: #4F4B66;
        ul.title {
          /*border-bottom: .02rem solid #717180;*/
          li {
            &:nth-child(2) {
              border-left: 1px solid #717180;
            }
          }
        }
        ul.list {
          li {
            background: #46425A;
            &:nth-child(2n) {
              background-color: #4F4B66;
            }
            .list-number {
              border-left: 1px solid #717180;
            }
          }
        }
      }
    }
  }

  .info-wrapper {
    position: relative;
    .info {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #24252d;
      color: #fff;
      min-height: 1.5rem;
      .draw-info {
        flex: 7;
        .title {
          width: 100%;
          text-align: center;
          color: #fff;
          font-size: .26rem;
          height: .5rem;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .ball-type {
          min-height: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .issue-info {
        flex: 3;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 1rem;
        border-left: 1px solid #2d2e33;
        .issue {
          height: .26rem;
          line-height: .26rem;
          font-size: .24rem;
          em {
            padding: 0 0.05rem;
          }
        }
        .time {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          .count-down {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 0.7rem;
            span {
              background-color: #191b1f;
              border: .02rem solid #2f2f36;
              margin: 0 .04rem 0 .06rem;
              border-radius: .08rem;
              padding: .08rem;
              max-height: .5rem;
              font-size: .28rem;
              color: #fff;
            }
            i {
              color: #fff;
            }
          }
          .opening {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 0.8rem;
            .lang-china {
              span {
                background-color: #191b1f;
                border: .02rem solid #2f2f36;
                margin: 0 .04rem 0 .06rem;
                border-radius: .08rem;
                padding: .08rem;
                max-height: .5rem;
                font-size: .28rem;
                color: red;
              }
              i {
                color: #fff;
              }
            }
          }
        }
      }
    }
    .history-wrapper {
      position: absolute;
      // bottom: -5rem;
      left: 0;
      width: 100%;
      height: 5rem;

      box-shadow: 0 0.08rem 0.18rem 0 rgba(0, 0, 0, 0.4);
      border-top: .02rem solid #393940;
      background: #202225;
      transition: all 0.3s linear;
      opacity: 0;
      z-index: -10;
      &.active {
        opacity: 1;
        bottom: -5rem;
        z-index: 100;
      }
      ul.title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        border-bottom: .02rem solid #393940;
        li {
          height: 0.6rem;
          line-height: 0.6rem;
          text-align: center;
          &:nth-child(1) {
            flex: 3;
          }
          &:nth-child(2) {
            border-left: 1px solid #393940;
            flex: 7;

          }
        }
      }
      ul.list {
        width: 100%;
        height: calc(100% - 0.6rem);
        overflow-y: scroll;
        li {
          width: 100%;
          display: flex;
          background: #24252d;
          &:nth-child(2n) {
            background-color: #202225;
          }
          .list-issue {
            flex: 3;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .list-number {
            border-left: 1px solid #393940;
            flex: 7;
            display: flex;
            justify-content: center;
            align-items: center;
            div {
              width: 100%;
              padding: 0.1rem;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
      .no-data {
        width: 100%;
        height: calc(100% - 0.6rem);
        display: flex;
        align-items: center;
        justify-content: center;
        .no-data-wrapper {
          width: 30%;
        }
      }
    }
  }

</style>
