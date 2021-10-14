<template>
  <div class="chase-order-list">
    <Header :headObj="headObj" @leftClick="$router.go(-1)"/>
    <div class="count-down">
      <span>
        {{$t('lang.lottery.orderList.countDown[0]')}}
        {{ turnNum }}
        {{$t('lang.lottery.orderList.countDown[1]')}}: </span>
      <div v-if="isTimer">{{$t('lang.common.loading')}}</div>
      <van-count-down v-else :time="closeTime" @finish="finish">
        <!--        <template #default="timeData">-->
        <!--          <span class="block">{{ timeData.hours }}</span>-->
        <!--          <span class="colon">:</span>-->
        <!--          <span class="block">{{ timeData.minutes }}</span>-->
        <!--          <span class="colon">:</span>-->
        <!--          <span class="block">{{ timeData.seconds }}</span>-->
        <!--        </template>-->
      </van-count-down>
    </div>
    <div class="btn-group">
      <div class="btn" @click="randomOne(1)">
        <i class="iconfont iconjiahao"></i>
        <!--机选一注-->
        {{$t('lang.lottery.orderList.random[0]')}}
      </div>
      <div class="btn" @click="randomOne(5)">
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
      <ul>
        <li :key="i" class="order"
            v-for="(v, i) in betNums.content">
          <div class=content>
            <p class="title">
              <span class="name">
                <em>{{ v.cateName }}</em> ({{ v.cateName }})
              </span>
              {{$t('lang.lottery.orderList.info[0]')}}
              <i>{{ v.totalNums }}</i>
              {{$t('lang.lottery.orderList.info[1]')}}
              <i>{{ v.totalMoney }}</i>
              {{$t('lang.lottery.orderList.info[2]')}}
              <i>{{ v.rebate }}%</i>
            </p>
            <p class="ball">
              {{ v.betInfo }}
            </p>
          </div>
          <div class="delete" @click="delBet(i)">
            <i class="iconfont iconic-popupclose"></i>
          </div>
        </li>
      </ul>
    </div>
    <div class="bottom-option">
      <div class="option-tool">
        <div class="option">
          <div @click="clearBet" class="clear-all">
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
              <em>{{ amount }}</em>{{$t('lang.common.yuan')}}</p>
            <p>
              {{$t('lang.lottery.orderList.info[4]')}}
              <em>{{ (userAmount - amount) > 0 ? parseFloat(userAmount - amount).toFixed(2) : 0 }}</em>
              {{$t('lang.common.yuan')}}</p>
          </div>
        </div>
        <div @click="betting" class="submit-btn">
          <!--一键下注-->
          {{$t('lang.lottery.bottom.tools[3]')}}
        </div>
      </div>
    </div>
    <!-- 投注 -->
    <van-overlay :show="isShow">
      <van-loading type="spinner"
                   color="white"
                   size="24px">
        <!--投注中...-->
        {{$t('lang.lottery.dialog.warning[5]')}}
      </van-loading>
    </van-overlay>
  </div>
</template>
<script>
  import {mapGetters, mapMutations,mapState} from "vuex";
  import {Dialog, Toast} from 'vant'

  export default {
    name: "OrderList",
    data() {
      return {
        headObj: {
          title: this.$t('lang.lottery.orderList.title'),
          showArrow: true,
        },
        isTimer: false,
        isShow: false,
        turnNum: "", // 当前期
        closeTime: 0, // 倒计时时间
      };
    },
    components: {
      Header: (resolve) => require(["../../../commons/header/Header"], resolve),
    },
    computed: {
      ...mapState([
        'userInformation',
        'balance'
      ]),
      ...mapGetters(["userInfo", "lotteryStatus", "lotteryNum", "betListAll"]),
      usersInfo() {
        return this.userInformation;
      },
      betNums() {
        if (this.betListAll === null) {
          let list = {
            gameId: this.$route.query.lotteryId,
            turnNum: this.turnNum,
            content: [],
          };
          return list;
        } else {
          return JSON.parse(this.betListAll);
        }
      },
      // 用户余额
      userAmount() {
        let amount = "";
        this.$cookie.get("token")
          ? (amount = parseFloat(this.balance).toFixed(2))
          : "";
        return amount;
      },
      //总投注金额
      amount() {
        let betList = JSON.parse(this.betListAll);
        let money = 0;
        if (betList === null || !betList.content) {
        } else {
          betList.content.forEach((element) => {
            money += element.totalMoney;
          });
        }
        return money;
      },
    },
    created() {

      this.getNowDraw();
      if (this.closeTime === 0) {
        this.isTimer = true
      }
      let betListAll = JSON.parse(localStorage.getItem("betListAll")) || ""
      if (betListAll !== "") {
        this.SET_LOTTERY_BET(JSON.stringify(betListAll))
      }
    },
    mounted() {
      this.timer = setInterval(() => {
        this.getNowDraw()
      }, 1000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.timer)
      })
    },
    methods: {
      ...mapMutations("lottery", ["SET_LOTTERY_BET"]),
      finish() {
        this.isTimer = true;
        this.timer = setInterval(() => {
          this.getNowDraw(2)
        }, 1000)
      },
      //获取当前开奖信息
      getNowDraw(type = 1) {
        const _t = (Date.parse(new Date()) / 1000).toString();
        const params = {
          _t,
          gameId: this.$route.query.lotteryId,
        };
        this.$http.home
          .getNowCp(params)
          .then((rep) => {
            this.closeTime = parseInt(
              rep.data.cur.closeTime - rep.data.serverTime
            );
            if (rep.data.cur.status === 0) {
              this.isTimer = false;
              this.turnNum = rep.data.cur.turn;
              if (type === 2) {
                // 彩期变更
                Toast.fail(`${this.$t('lang.lottery.dialog.warning[7]')}：${rep.data.cur.turn}`);
              }
              this.turnNum = rep.data.cur.turnNum;
              clearInterval(this.timer)
            }
            console.log(this.closeTime)
          })
          .catch(() => {

          });
      },
      //删除注单
      delBet(i) {
        let data = [];
        this.betNums.content.forEach((item, idx) => {
          if (i !== idx) {
            data.push(item);
          }
        });
        this.betNums.content = data;
        this.SET_LOTTERY_BET(JSON.stringify(this.betNums));
      },
      //机选一注
      randomOne(type) {
        let lotteryId = this.$route.query.lotteryId;
        let params = [];
        for (let index = 0; index < type; index++) {
          params.push({
            betInfo: this.randomNum(1, 49),
            betModel: 0,
            cateName: "特码",
            code: lotteryId + "200101001",
            money: 1,
            multiple: 2,
            odds: 48.8,
            rebate: 0,
            totalMoney: 2,
            totalNums: 1,
          });
        }
        let data = params.concat(this.betNums.content);
        this.betNums.content = data;
        this.SET_LOTTERY_BET(JSON.stringify(this.betNums));
      },
      //随机数字
      randomNum(minNum, maxNum) {
        let num = parseInt(
          Math.random() * (maxNum - minNum + 1) + minNum,
          10
        ).toString();
        if (num.length > 1) {
          return num;
        } else {
          return "0" + num;
        }
      },
      //清空全部
      clearBet() {
        this.betNums.content = [];
        this.SET_LOTTERY_BET(JSON.stringify(this.betNums));
      },
      //投注
      betting() {
        if (this.amount < 1) {
          // "没有投注单,请先去下注"
          return Toast.fail(this.$t('lang.lottery.dialog.warning[6]'));
        }
        if (!this.userAmount) {
          return Dialog.confirm({
            title: this.$t('lang.lottery.dialog.title'),
            // 温馨提示
            message: this.$t('lang.lottery.dialog.warning[0]'),
            // 请先登陆，再投注!
          }).then(() => {
            this.SET_LOTTERY_BET(null), this.$router.push('/login')
          }).catch(() => {
          });
        }
        if (this.lotteryStatus !== 0 || !this.turnNum){
          return Toast.fail(this.$t('lang.lottery.dialog.warning[1]'));
          // 期号变更中，请稍后！
        }

        this.isShow = true;
        const params = this.betNums;
        params.turnNum = this.turnNum
        let Gf_params = {
          gameId: params.gameId,
          turnNum: params.turnNum,
          content: []
        }
        let Xy_params = {
          gameId: params.gameId,
          turnNum: params.turnNum,
          content: []
        }
        //官方和信用数据区分
        params.content.forEach((item, index) => {
          if (item.isGf) {
            Gf_params.content.push(item)
          } else {
            if (item.cateName.indexOf("特殊号") !== -1) {
              Gf_params.content.push(item)
            } else {
              Xy_params.content.push(item)
            }
          }
        })
        if (Xy_params.content.length > 0) {
          this.$http.home
            .bet(Xy_params)
            .then((res) => {
              // '投注成功！',
              this.$toast.success(this.$t('lang.lottery.dialog.warning[3]'));
              this.clearBet()
              if (Gf_params.content.length === 0) {
                this.$router.go(-1)
              }
              if (Gf_params.content.length > 0) {
                this.$router.go(-1)
              }
            })
            .catch((res) => {
              if (res && res.data) {
                this.$toast.fail(res.data.msg);
              } else {
                // '请求超时，请重新下注',
                this.$toast.fail(this.$t('lang.lottery.dialog.warning[4]'));
              }
            })
            .finally(() => {
              this.isShow = false;
            });
        }
        if (Gf_params.content.length > 0) {
          this.$http.home
            .bet_Gf(Gf_params)
            .then((res) => {
              // '投注成功！',
              this.$toast.success(this.$t('lang.lottery.dialog.warning[3]'));
              this.clearBet()
              if (Xy_params.content.length === 0) {
                this.$router.go(-1)
              }
            })
            .catch((res) => {
              if (res && res.data) {
                this.$toast.fail(res.data.msg);
              } else {
                // '请求超时，请重新下注',
                this.$toast.fail(this.$t('lang.lottery.dialog.warning[4]'));
              }
            })
            .finally(() => {
              this.isShow = false;
            });
        }

      },
    },
  };
</script>
<style lang="scss" scoped>
  .skin-gray{
    .chase-order-list {
      background: #464460;
      .count-down {
        background-color: #24252d;
        color: #fff;
        .van-count-down {
          color: #ffffff;
          background: transparent;
          .colon {
            color: #fff;
          }
          .block {
            color: #fff;
            box-shadow: inset 0 0 .1rem 0 rgba(0, 0, 0, 0.5);
            border: solid .02rem #34363b;
            background-color: #202225;
          }
        }
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
                  color: rgb(204, 0, 0);
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
                color: #c00;
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
            opacity: 0.15;
          }
        }
      }
    }
  }
  .skin-black{
    .chase-order-list {
      background: #191B1F;
      .count-down {
        background-color: #24252d;
        color: #fff;
        .van-count-down {
          color: #ffffff;
          background: transparent;
          .colon {
            color: #fff;
          }
          .block {
            color: #fff;
            box-shadow: inset 0 0 .1rem 0 rgba(0, 0, 0, 0.5);
            border: solid .02rem #34363b;
            background-color: #202225;
          }
        }
      }
      .btn-group {
        .btn {
          color: #8f8f8f;
          border: solid 1px #444555;
          background-color: #2d2e35;
          i {
            color: #a8a8a8;
          }
        }
      }

      .list {
        ul {
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.11);
          background-color: #24252d;
          & > li {
            background: #24252d;
            border-bottom: dashed 0.5px #393940;
            color: #8f8f8f;
            div.content {
              .title {
                color: #8f8f8f;
                i {
                  color: rgb(204, 0, 0);
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
        box-shadow: 0 -0.5px 0 0 #444555;
        background-color: #24252d;
        color: #9a9aa7;
        .option-tool {
          div.option {
            .clear-all {
              color: #9a9aa7;
            }
            .info {
              border-left: 1px solid #353642;
              em {
                color: #c00;
              }
            }
          }
          .submit-btn {
            box-shadow: 0 5px 19px 0 rgba(0, 0, 0, 0.5);
            background-image: linear-gradient(to bottom, #efcea6, #dab591);
            color: #533510;
          }

          &::after {
            border-top: 6px solid #ccc;
            opacity: 0.15;
          }
        }
      }
    }
  }
  .chase-order-list {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #464460;
    .count-down {
      text-align: center;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: .64rem;
      background-color: #24252d;
      color: #fff;
      font-size: .24rem;
      .van-count-down {
        font-size: .28rem;
        font-weight: 600;
        color: #ffffff;
        background: transparent;
        .colon {
          display: inline-block;
          margin: 0 .08rem;
          color: white;
        }

        .block {
          display: inline-block;
          width: .44rem;
          color: #fff;
          font-size: .24rem;
          text-align: center;
          border-radius: .08rem;
          box-shadow: inset 0 0 .1rem 0 rgba(0, 0, 0, 0.5);
          border: solid .02rem #34363b;
          background-color: #202225;
        }
      }
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

    .van-loading {
      top: 49%;
      left: 40%;
    }

    footer {
      height: 0.5rem;
      background-image: url(data:image/png;base64,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);
      background-size: 100% 100%;
    }
  }
</style>
