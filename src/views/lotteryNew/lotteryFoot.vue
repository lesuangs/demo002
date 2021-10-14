<template>
  <div class="lottery-foot">
    <div class="foot-wrapper">
      <ul class="button-group">
        <li>
          <span class="order-list"
                @click="goToWaitingOrder()">
          <!--待投注-->
          {{$t('lang.lottery.bottom.tools[2]')}}
            <i class="calculator" v-if="basketList.length>0">
            ({{basketList.length}})
          </i>
            <!--<em v-if="getBetNum > 0" class="calculator">{{ getBetNum }}</em>-->
          </span>

        </li>
        <li>
          <!-- 玩法投注 -->
          <span class="quick"
                :class="betCount>0?'active':''"
                @click="betting()">
          <!--一键下注-->
            {{$t('lang.lottery.bottom.tools[3]')}}
          </span>
        </li>

      </ul>
      <van-overlay :show="isLoading" class="mask-wrapper">
        <van-loading type="spinner" vertical color="#fff" size="24px">
          <!--投注中...-->
          {{$t('lang.lottery.dialog.warning[6]')}}
        </van-loading>
      </van-overlay>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {get_ssc_bet} from "../../utils/GetSscBet";
  import {weiGroupSplit} from "../../utils/PaiLieZuHe";
  import {lotteryType} from "../../utils/mode";

  export default {
    name: "lotteryFoot",
    data() {
      return {
        isLoading: false
      }
    },
    computed: {
      ...mapState([
        'methodTitle', // 名称
        'betCount', // 注数
        'currentRebate', // 赔率【拉杆】
        'multiple_common', // 倍数
        'checkGroup_common', // 任2，任3的check-group
        'unitMoney', // 每注2元，默认显示
        'creditSelectArr', // 双面盘选择的号码list
        'officialSelectArr', // 官方
        'currentTurnNum', // 当前期数
        'openInfo', // 开奖信息
        'isLogin',
        'balance', // 用户余额
        'basketList', // 购彩篮的数据
        'isShowBasket',
        'currentMethodInfo',
        'currentLotteryInfo',
        'userInformation'
      ])
    },
    methods: {
      betting() {
        if (!(this.multiple_common >= 1)) {
          return this.$toast.fail({
            message: this.$t('lang.lottery.dialog.warning[9]'),
            icon: 'warning',
            className: 'warning-toast'
          })
        }
        if (this.betCount > 0) {
          if (!this.isLogin) { // 没有登录
            return this.$dialog.confirm({
              // title: '标题',
              // message: '请先登录再进行投注！',
              // confirmButtonText: '去登录',
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
            /*return this.$dialog.alert({
              message: this.$t('lang.lottery.dialog.warning[1]'),
              confirmButtonText:this.$t('lang.common.btn[3]')
            })*/
            return this.$toast.fail({
              message: this.$t('lang.lottery.dialog.warning[1]'),
              icon: 'warning',
              className: 'warning-toast'
            })
          } else if (this.balance < (this.unitMoney * this.multiple_common)) {
            // 余额不足，请充值！
            // return this.$toast.fail(this.$t('lang.lottery.dialog.warning[2]'))
            // return this.$dialog.alert({
            //   message: this.$t('lang.lottery.dialog.warning[2]'),
            //   confirmButtonText:this.$t('lang.common.btn[3]')
            // })
            return this.$toast.fail({
              message: this.$t('lang.lottery.dialog.warning[2]'),
              icon: 'warning',
              className: 'warning-toast'
            })
          } else { // 开始投注
            if (this.currentMethodInfo.isOfficial) { // 官方
              this._officialBetting();
            } else { // 双面盘
              this._creditBetting();
            }
          }
        }
      },
      _creditBetting() {
        this.formatCreditParams({}).then((content) => {
          let params = {
            content: content,
            gameId: String(this.currentLotteryInfo.id),
            turnNum: this.currentTurnNum
          };
          // console.log(params, 'params==credit');
          // return
          this.$nextTick(() => {
            this.isLoading = true;
            this.$nextTick(() => {
              this.initData({}); // 清空数据;
            })
            this.creditBetting(params).then((_data) => {
              console.log(_data, 'creditBettingcreditBetting');
              this.isLoading = false;
              if (_data.code === 200) {
                if (_data.data.code === 200) {
                  // '投注成功！',
                  this.$toast.success(this.$t('lang.lottery.dialog.warning[4]'));
                  this.$nextTick(() => {
                    this.getStatus({}); // 刷新余额
                  })
                } else {
                  this.isLoading = false;
                }
              }
            }, (err) => {
              this.isLoading = false;
              console.log(err);
            }).catch(() => {
              this.isLoading = false;
            });
          })
        });
      },
      _officialBetting() {
        // let params = this.normalizeParams();
        this.formatOfficialParams({}).then((content) => {
          let params = {
            content: content,
            totalMoney: this.unitMoney * this.multiple_common * this.betCount,
            gameId: String(this.currentLotteryInfo.id),
            turnNum: this.currentTurnNum
          };
          console.log(params, 'official---params');
          // return
          this.$nextTick(() => {
            this.isLoading = true;
            this.$nextTick(() => {
              this.initData({}); // 清空数据;
            })
            this.officialBetting(params).then((_data) => {
              console.log(_data, 'officialBettingofficialBetting');
              this.isLoading = false;
              if (_data.code === 200) {
                if (_data.data.success) {
                  // '投注成功！',
                  this.$toast.success(this.$t('lang.lottery.dialog.warning[4]'));
                  this.$nextTick(() => {
                    this.getStatus({}); // 刷新余额
                  })
                }
              }
            }).catch(() => {
              this.isLoading = false;
            });
          })
        })
      },
      ...mapActions([
        'creditBetting',
        'officialBetting',
        'initData', // 清空数据
        'getStatus', // 刷新余额
        'formatCreditParams', // 格式化双面盘数据
        'formatOfficialParams' // 格式化官方数据
      ]),
      ...mapMutations({
        setData: 'SET_DATA'
      }),
      goToWaitingOrder() {
        this.setData({key: 'isShowBasket', value: true})
        // let id = this.$route.query.id;
        // this.$router.push({
        //   path: '/waitingOrder',
        //   query: {
        //     id: id
        //   }
        // })
      }
    }
  }
</script>

<style scoped lang="scss">
  .skin-black {
    .lottery-foot {
      box-shadow: 0 -0.01rem 0 0 #444555;
      background: #24252D;
      .foot-wrapper {
        ul.button-group {
          li {
            span {
              &.order-list {
                color: #fff;
                background-image: linear-gradient(to bottom, #645592 2%, #322b4d);
                box-shadow: 0 0.05rem 0.19rem 0 rgba(0, 0, 0, 0.5)
              }
              &.quick {
                border: solid 1px #292a2e;
                background-color: #202225;
                color: #8f8f8f;
                box-shadow: 0 0.05rem 0.19rem 0 rgba(0, 0, 0, 0.5)
              }
              &.active {
                color: #533510;
                font-weight: bold;
                background-image: linear-gradient(to bottom, #efcea6, #dab591);
              }
            }
          }
          .calculator {
            /*background: red;*/
            color: red;
          }
        }
      }
    }
  }

  .skin-gray {
    .lottery-foot {
      box-shadow: 0 -0.01rem 0 0 #444555;
      background: #24252D;
      .foot-wrapper {
        ul.button-group {
          li {
            span {
              &.order-list {
                color: #fff;
                background-image: linear-gradient(to bottom, #8c90bc 2%, #545a96);
                box-shadow: 0 0.05rem 0.19rem 0 rgba(0, 0, 0, 0.5)
              }
              &.quick {
                border: solid 1px #292a2e;
                background-color: #202225;
                color: #8f8f8f;
                box-shadow: 0 0.05rem 0.19rem 0 rgba(0, 0, 0, 0.5)
              }
              &.active {
                color: #533510;
                font-weight: bold;
                background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
              }
            }
          }
          .calculator {
            /*background: red;*/
            color: red;
          }
        }
      }
    }
  }

  .lottery-foot {
    display: flex;
    align-items: flex-start;
    box-shadow: 0 -0.01rem 0 0 #444555;
    /*background: red;*/
    background: #24252D;
    /*position: fixed;*/
    /*bottom: 0;*/
    width: 100%;
    font-size: .28rem;
    height: 1.7rem;
    .foot-wrapper {
      width: 100%;
      ul.button-group {
        padding: 12px 0 0;
        display: flex;
        width: 100%;
        /*height: 100%;*/
        li {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          span {
            width: 155px;
            height: 44px;
            line-height: 44px;
            border-radius: 22px;
            font-family: PingFangTC;
            font-size: 16px;
            font-weight: 500;
            text-align: center;
            &.order-list {
              color: #fff;
              background-image: linear-gradient(to bottom, #8c90bc 2%, #545a96);
              box-shadow: 0 0.05rem 0.19rem 0 rgba(0, 0, 0, 0.5)
            }
            &.quick {
              border: solid 1px #292a2e;
              background-color: #202225;
              color: #8f8f8f;
              box-shadow: 0 0.05rem 0.19rem 0 rgba(0, 0, 0, 0.5)
            }
            &.active {
              color: #533510;
              font-weight: bold;
              background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
            }
            .calculator {
              /*min-width: .4rem;*/
              /*height: .4rem;*/
              padding: 0 .05rem;
              /*border-radius: 0.2rem;*/
              /*background: red;*/
              font-size: .3rem;
              color: red;
              /*position: absolute;*/
              /*top: 5%;*/
              /*left: 10%;*/
              /*display: flex;*/
              /*justify-content: center;*/
              /*align-items: center;*/
            }
          }
        }

      }
      .mask-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

  }
</style>
