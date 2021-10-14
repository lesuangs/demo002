<template>
  <div class="waiting-order">
    <div class="lottery-header">
      <div class="left" @click="hideWaitingOrder()">
        <i class="iconfont iconic-left"></i>
      </div>
      <div class="middle">
        <!--<div>投注单</div>-->
        <div>{{$t('lang.lottery.orderList.title')}}</div>
      </div>
      <div class="right"></div>
    </div>
    <div class="count-down-wrapper">
      <em>{{$t('lang.lottery.orderList.countDown[0]')}}</em>
      <em v-if="openInfo">{{openInfo.cur.turn}}</em>
      <span>{{$t('lang.lottery.orderList.countDown[1]')}}:</span>
      <!--<span>期投注截止时间</span>-->
      <div class="time">
        <div class="count-down" v-if="isOpening">
          <span>{{time[0]}}</span>
          <i>:</i>
          <span>{{time[1]}}</span>
          <i>:</i>
          <span>{{time[2]}}</span>
        </div>
        <div v-else class="opening">
          <div class="countdown opening">
            <div class="lang-china"
                 v-if="$i18n.locale === LANG.china">
              <span>开</span>:<span>奖</span>:<span>中</span>
            </div>
            <div class="lang-english" v-else>
              <span>Drawing...</span>
            </div>
          </div>
          <!-- <div class="lang-china"
                v-if="$i18n.locale === LANG.china">
             <span>开奖中...</span>
           </div>
           <div class="lang-english" v-else>
             <span>Drawing...</span>
           </div>-->
        </div>
      </div>
    </div>
    <div class="btn-group">
      <!--<div class="btn" @click="$toast($t('lang.lottery.toast[0]'))">-->
      <div class="btn" @click="randomBet">
        <i class="iconfont iconjiahao"></i>
        <!--机选一注-->
        {{$t('lang.lottery.orderList.random[0]')}}
      </div>
      <div class="btn" @click="$toast($t('lang.lottery.toast[0]'))">
        <i class="iconfont iconjiahao"></i>
        <!--机选五注-->
        {{$t('lang.lottery.orderList.random[1]')}}
      </div>
      <div class="btn" @click="$toast($t('lang.lottery.toast[0]'))">
        <!--智能追号-->
        {{$t('lang.lottery.orderList.random[2]')}}
      </div>
    </div>
    <div class="list">
      <ul v-if="basketList.length>0">
        <li :key="index" class="order"
            v-for="(value, index) in basketList">
          <div class=content>
            <p class="title">
              <span class="name">
                <em>{{ value.content.cateName }}</em>
                <!--({{ value.cateName }})-->
              </span>
              {{$t('lang.lottery.orderList.info[0]')}}
              <i>{{ value.content.totalNums }}</i>
              {{$t('lang.lottery.orderList.info[1]')}}
              <i>{{ value.content.totalMoney }}</i>
              {{$t('lang.lottery.orderList.info[2]')}}
              <!--<i>{{ value.content.rebate }}%</i>-->
            </p>
            <p class="ball">
              {{value.content.showContent? value.content.showContent:value.content.betInfo }}
            </p>
          </div>
          <div class="delete"
               @click="deleteItem()">
            <i class="iconfont iconic-popupclose"></i>
          </div>
        </li>
      </ul>
    </div>
    <div class="bottom-option">
      <div class="option-tool">
        <div class="option">
          <div @click="cleanAll()"
               class="clear-all">
            <!--<img :src="require(`@/assets/themes/hjb/black/ic-clear.svg`)" alt=""/>-->
            <i class="iconfont iconic-clear"></i>
            <span>
              <!--清空-->
              {{$t('lang.lottery.bottom.tools[0]')}}
            </span>
          </div>
          <div class="info">
            <p>
              {{$t('lang.lottery.orderList.info[3]')}}
              <em>{{ totalMoney }}</em>
              {{$t('lang.common.yuan')}}</p>
            <p>
              {{$t('lang.lottery.orderList.info[4]')}}
              <!--              <em>{{isLogin ? balance : 0 }}</em>-->
              <i v-if="isLogin">
                <i class="user-money">{{ balance == null ? '0' : format_number(balance).split('.')[0] }}{{ balance == null ? '.00' :'.'+format_number(balance).split('.')[1] }}</i>
              </i>
              <em v-else>0.00</em>
              {{$t('lang.common.yuan')}}</p>
          </div>
        </div>
        <div @click="betting()" class="submit-btn">
          <!--一键下注-->
          {{$t('lang.lottery.bottom.tools[3]')}}
        </div>
      </div>
    </div>
    <van-overlay :show="isLoading" class="mask-wrapper">
      <van-loading type="spinner" vertical color="#fff" size="24px">
        <!--投注中...-->
        {{$t('lang.lottery.dialog.warning[5]')}}
      </van-loading>
    </van-overlay>
  </div>
</template>

<script>
  import axios from '../../http';
  import {API} from "../../api/api_list";
  import {LANG} from '../../utils/mode'
  import qs from 'qs'
  import {formatTime} from '../../utils/common';
  import {mapMutations, mapActions, mapState, mapGetters} from 'vuex'

  export default {
    name: "waitingOrder",
    data() {
      return {
        time: ['00', '00', '00'],
        timer_Time: null,
        timer_inferFace: null,
        isOpening: false, // false在开奖中，true在倒计时
        LANG: LANG,
        isShowHistory: false,
        isLoading: false
      }
    },
    methods: {
      getOpenTime() {
        clearInterval(this.timer_Time)
        this.timer_Time = null;
        clearInterval(this.timer_inferFace)
        this.timer_inferFace = null;
        this.time = ['00', '00', '00'];
        let params = {
          gameId: this.$route.query.id
        }
        axios.post(API.OPEN_INFO, qs.stringify(params)).then((_data) => {
          if (_data.status === 200) {
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
                    this.time = ['00', '00', '00'];
                    this.setData({key: 'currentTurnNum', value: null})
                    this.$nextTick(() => {
                      clearInterval(this.timer_Time)
                      this.timer_Time = null;
                      clearInterval(this.timer_inferFace)
                      this.timer_inferFace = null;
                      this.getOpenTime();
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
      deleteItem(index) {
        let basketList = this.basketList;
        basketList.splice(index, 1);
        this.setData({key: 'basketList', value: basketList});
      },
      cleanAll() {
        this.setData({key: 'basketList', value: []});
      },
      async betting() {
        let basketList = this.basketList;
        if (basketList.length > 0) {
          if (!this.isLogin) { // 没有登录
            return this.$dialog.confirm({
              // title: '标题',
              // message: '请先登录再进行投注！',
              title: this.$t('lang.lottery.dialog.title'),
              message: this.$t('lang.lottery.dialog.warning[0]'),
              cancelButtonText: this.$t('lang.lottery.bottom.queue.btn[0]'),
              confirmButtonText: this.$t('lang.lottery.bottom.queue.btn[1]')
            }).then(() => {
              this.$router.push('/login');
              this.$nextTick(() => {
                this.initData({}); // 清空数据
              })
            }).catch(() => {
              // console.log('cancel');
            })
          }
          else if (this.currentTurnNum === null) {  // 封盘
            // 期号变更中，请稍后！
            // return this.$toast.fail(this.$t('lang.lottery.dialog.warning[1]'))
            this.$dialog.alert({
                  message: this.$t('lang.lottery.dialog.warning[1]'),
                  confirmButtonText:this.$t('lang.common.btn[3]')
                })
          } else if (this.balance < this.totalMoney) {
            // 余额不足，请充值！
            // return this.$toast.fail(this.$t('lang.lottery.dialog.warning[2]'))
            return this.$dialog.confirm({
              message: this.$t('lang.lottery.dialog.warning[2]'),
              confirmButtonText:this.$t('lang.lottery.dialog.buttons[0]'),
              cancelButtonText:this.$t('lang.common.btn[2]')
            }).then(() => {
              this.$router.push('/recharge')
            })
          } else { // 开始投注
            let creditContent = [];
            let officialContent = [];
            let officialMoney = 0;
            for (let item of basketList) {
              if (item.isOfficial) {
                officialContent.push(item.content);
                officialMoney = officialMoney + item.content.totalMoney;
              } else {
                creditContent.push(item.content);
              }
            }
            this.isLoading = true;
            if (creditContent.length > 0 && officialContent.length === 0) {
              this._creditBetting(creditContent).then((data) => {
                this.isLoading = false;
                if (data) {
                  this.getStatus({}); // 刷新余额
                  // this.$toast.success(this.$t('lang.lottery.dialog.warning[3]'));
                  this.$dialog.confirm({
                    message: this.$t('lang.lottery.dialog.warning[3]'),
                    cancelButtonText:this.$t('lang.common.btn[3]'),
                    confirmButtonText:this.$t('lang.common.btn[3]')
                  })
                }
              });
            }
            if (officialContent.length > 0 && creditContent.length === 0) {
              this._officialBetting(officialContent, officialMoney).then((data) => {
                this.isLoading = false;
                if (data) {
                  this.getStatus({}); // 刷新余额
                  this.$toast.success(this.$t('lang.lottery.dialog.warning[3]'));
                }
              });
            }
            if (officialContent.length > 0 && creditContent.length > 0) {
              let [a, b] = await Promise.all([
                this._creditBetting(creditContent),
                this._officialBetting(officialContent, officialMoney)
              ]);
              if (a && b) {
                this.isLoading = false;
                this.getStatus({}); // 刷新余额
                this.$toast.success(this.$t('lang.lottery.dialog.warning[3]'));
              } else {
                this.isLoading = false;
              }
            }
            this.$nextTick(() => {
              this.cleanAll();
            })
          }
        }
      },
      _creditBetting(content) {
        return new Promise((resolve, reject) => {
          let params = {
            content: content,
            gameId: String(this.currentLotteryInfo.id),
            turnNum: this.currentTurnNum
          };
          this.creditBetting(params).then((_data) => {
              if (_data.status === 200) {
                if (_data.data.success) {
                  resolve(true)
                } else {
                  resolve(false)
                }
              }
            },
            (err) => {
              console.log(err);
            })
        })

      },
      _officialBetting(content, money) {
        return new Promise((resolve, reject) => {
          let params = {
            content: content,
            totalMoney: money,
            gameId: String(this.currentLotteryInfo.id),
            turnNum: this.currentTurnNum
          };
          this.officialBetting(params).then((_data) => {
            if (_data.status === 200) {
              if (_data.data.success) {
                resolve(true)
              } else {
                resolve(false)
              }
            }
          })
        })
      },
      ...mapMutations({
        setData: 'SET_DATA'
      }),
      ...mapActions([
        'getOpenInfo',
        'creditBetting',
        'officialBetting',
        'initData', // 清空数据
        'getStatus', // 刷新余额
      ]),
      hideWaitingOrder() {
        this.setData({key: 'isShowBasket', value: false})
      },
      countDownInfo() {
        clearInterval(this.timer_Time)
        this.timer_Time = null;
        clearInterval(this.timer_inferFace)
        this.timer_inferFace = null;
        this.time = ['00', '00', '00'];
        let data = this.openInfo;
        // console.log(data, 'openInfoopenInfo');
        if (data) {
          let seconds = (data.cur.closeTime - data.serverTime) / 1000;
          let countDown = formatTime(seconds);
          this.time = countDown;
          if (seconds <= 0) { // 一进来就是开奖中的情况
            this.isOpening = false;
            this.time = ['00', '00', '00'];
            // this.setData({key: 'currentTurnNum', value: null})
            this.$nextTick(() => {
              clearInterval(this.timer_Time)
              this.timer_Time = null;
              clearInterval(this.timer_inferFace)
              this.timer_inferFace = null;
              // this.countDownInfo();
              this.timer_inferFace = setTimeout(() => {
                this.countDownInfo()
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
                this.time = ['00', '00', '00'];
                // this.setData({key: 'currentTurnNum', value: null})
                this.$nextTick(() => {
                  clearInterval(this.timer_Time)
                  this.timer_Time = null;
                  clearInterval(this.timer_inferFace)
                  this.timer_inferFace = null;
                  // this.countDownInfo();
                  this.timer_inferFace = setTimeout(() => {
                    this.countDownInfo()
                  }, 1000 * 3)
                })
              }
            }, 1000)
          }
        }
      },
      // 随机投注
      randomBet() {
        // console.log(this.menuList, 'menuList');
        // console.log(this.currentLotteryInfo, 'currentLotteryInfo');
        // console.log(123);
        let list = this._getAllOfficialList();
        console.log(list);
      },
      _getAllOfficialList() {
        let list = this.menuList;
        let arr = [];
        for (let i = 0; i < list.length; i++) {
          if (list[i].isOfficial) {
            arr.push(list[i]);
          }
        }
        return arr;
      }
    },
    mounted() {
      // this.getOpenTime();
      // this.countDownInfo();
    },
    computed: {
      ...mapGetters({
        format_number: '_format_number',
      }),
      totalMoney() {
        let total = 0;
        for (let item of this.basketList) {
          let money = item.content.totalMoney;
          total = total + money;
        }
        return total;
      },
      ...mapState([
        'currentLotteryInfo',
        'currentMethodInfo',
        'openInfo',
        'balance',
        'isLogin',
        'basketList',
        'currentTurnNum',
        'loop_timer',
        // --random---------
        'menuList',
      ]),
    },
    deactivated() {
      clearInterval(this.timer_Time)
      this.timer_Time = null;
      clearInterval(this.timer_inferFace)
      this.timer_inferFace = null;
      clearInterval(this.loop_timer);
      this.setData({key: 'loop_timer', value: null})
    },
    watch: {
      openInfo(newVal) {
        if (newVal !== null) {
          this.countDownInfo();
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  $head-height: 1rem;
  .skin-black {
    .waiting-order {
      background: #191B1F;
      .lottery-header {
        color: #fff;
      }
      .count-down-wrapper {
        background-color: #24252d;
        color: #fff;
      }
      .btn-group {
        .btn {
          color: #8f8f8f;
          border: solid 1px #444555;
          background-color: #2d2e35;
          i {
            color: #8f8f8f;
          }
        }
      }
      .list {
        ul {
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.11);
          background-color: #4c4a64;
          & > li {
            background: #24252d;
            border-bottom: dashed 0.5px #393940;
            color: #8f8f8f;
            div.content {

              .title {
                color: #8f8f8f;
                i {
                  color: #ff2525;
                }
              }
              .ball {
                color: #fff;
              }
            }
            .delete {
              i {
                color: #606070;
              }
            }
          }
        }
      }
      .bottom-option {
        box-shadow: 0 -0.5px 0 0 #222433;
        background-color: #24252D;
        color: #9a9aa7;
        .option-tool {
          div.option {
            .clear-all {
              color: #9a9aa7;
            }
            .info {
              border-left: 1px solid #505161;
              em {
                color: #ff2525;
              }
            }
          }
          .submit-btn {
            box-shadow: 0 0.1rem 1.38rem 0 rgba(0, 0, 0, 0.5);
            background-image: linear-gradient(to bottom, #efcea6, #dab591);
            color: #533510;
          }

          &::after {
            border-top: 6px solid #ccc;
          }
        }
      }
    }
  }

  .skin-gray {
    .waiting-order {
      background: linear-gradient(to bottom, #474461, #303244);
      .lottery-header {
        color: #fff;
      }
      .count-down-wrapper {
        background-color: #24252d;
        color: #fff;
      }
      .btn-group {
        .btn {
          color: #8f8f8f;
          border: solid 1px #605c7b;
          background-color: #38364a;
          i {
            color: #a8a8a8;
          }
        }
      }
      .list {
        ul {
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.11);
          background-color: #4c4a64;
          & > li {
            background: #4C4A64;
            border-bottom: dashed 0.5px #393940;
            color: #8f8f8f;
            div.content {

              .title {
                color: #8f8f8f;
                i {
                  color: #ff2525;
                }
              }
              .ball {
                color: #fff;
              }
            }
            .delete {
              i {
                color: #606070;
              }
            }
          }
        }
      }
      .bottom-option {
        box-shadow: 0 -0.5px 0 0 #222433;
        background-color: #303244;
        color: #9a9aa7;
        .option-tool {
          div.option {
            .clear-all {
              color: #9a9aa7;
            }
            .info {
              border-left: 1px solid #505161;
              em {
                color: #ff2525;
              }
            }
          }
          .submit-btn {
            box-shadow: 0 0.1rem 1.38rem 0 rgba(0, 0, 0, 0.5);
            background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
            color: #533510;
          }

          &::after {
            border-top: 6px solid #ccc;
          }
        }
      }
    }
  }

  .waiting-order {
    width: 100%;
    height: 100%;
    background: #464460;
    display: flex;
    flex-direction: column;
    .lottery-header {
      color: #fff;
      position: relative;
      width: 100%;
      height: $head-height;
      text-align: center;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      /*padding: 0 0.25rem;*/
      align-items: center;
      .left {
        font-size: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 0.75rem;
        height: 100%;
      }
      .right {
        min-height: 0.88rem;
        height: 100%;
        width: 1rem;
        font-size: 0.48rem;
        display: flex;
        align-items: center;
        .icon-wrapper {
          width: 1rem;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
      }
      .middle {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: .3rem;
      }
    }
    .count-down-wrapper {
      height: 32px;
      background-color: #24252d;
      color: #fff;
      font-size: 0.24rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 0;
      > span {
        margin-right: 10px;
      }
      /* .time {
         span {
           font-size: .3rem;
           font-weight: bold;
         }
       }*/
    }
    .btn-group {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      margin: 0.3rem 0;
      .btn {
        border-radius: 0.1rem;
        /*line-height: 0.6rem;*/
        text-align: center;
        position: relative;
        width: 2.18rem;
        height: .76rem;
        color: #8f8f8f;
        font-size: .30rem;
        display: flex;
        justify-content: center;
        align-items: center;
        -webkit-backdrop-filter: blur(18px);
        backdrop-filter: blur(18px);
        border: solid 1px #605c7b;
        background-color: #38364a;
        i {
          padding: 0 0.1rem 0 0;
          font-size: 12px;
          color: #a8a8a8;
        }
      }
    }
    .list {
      flex: 1;
      overflow: scroll;
      padding: 0 .3rem 0.1rem;
      ul {
        background-size: 100% 1px;
        border-radius: .08rem;
        overflow: hidden;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.11);
        background-color: #4c4a64;
        & > li {
          padding: 0.2rem;
          position: relative;
          background: #4C4A64;
          border-bottom: dashed 0.5px #393940;
          color: #8f8f8f;
          font-size: .24rem;
          display: flex;
          height: 100%;
          align-items: center;
          &:last-child {
            border-bottom: none;
          }
          div.content {
            flex: 1;
            .title {
              color: #8f8f8f;
              margin-bottom: 0.2rem;
              .name {
                margin-right: 0.2rem;
              }
              i {
                color: rgb(204, 0, 0);
                font-weight: 400;
                font-style: normal;
              }
            }
            .ball {
              letter-spacing: 0.04rem;
              color: #fff;
              overflow-wrap: break-word;
              line-height: 0.34rem;
            }
          }
          .delete {
            display: block;
            height: 100%;
            width: 0.5rem;
            padding: 0.1rem;
            i {
              color: #606070;
              font-size: 0.3rem;
            }
          }
        }
      }
    }
    .bottom-option {
      height: 1.7rem;
      box-shadow: 0 -0.5px 0 0 #222433;
      background-color: #303244;
      color: #9a9aa7;
      .option-tool {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.2rem;
        position: relative;
        padding: .1rem 0.2rem 0;
        div.option {
          display: flex;
          height: 100%;
          align-items: center;
          .clear-all {
            width: 1rem;
            height: 100%;
            color: #9a9aa7;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            i {
              font-size: 20px;
            }
            span {
              margin: .1rem 0 0;
            }
          }
          .info {
            text-align: center;
            height: 60%;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
            padding: 0 0 0 .2rem;
            border-left: 1px solid #505161;
            p {
              height: .4rem;
              line-height: .4rem;
            }
            em {
              color: #c00;
              font-weight: 400;
              font-style: normal;
              margin: 0 0.1rem;
            }
          }
        }
        .submit-btn {
          width: 2.24rem;
          height: .88rem;
          border-radius: .44rem;
          box-shadow: 0 0.1rem 1.38rem 0 rgba(0, 0, 0, 0.5);
          background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: .32rem;
          font-weight: 600;
          color: #533510;
          text-align: center;
        }

        &::after {
          position: absolute;
          bottom: -10px;
          left: 50%;
          content: "";
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          pointer-events: none;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          z-index: 0;
          border-top: 6px solid #ccc;
          border-radius: 3px;
          width: 135px;
          transform: translateZ(0) scale(1) translateX(-50%);
          opacity: 0.15;
        }
      }
    }
    .mask-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
