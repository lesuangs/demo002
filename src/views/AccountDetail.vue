<template>
  <div class="deposit_Details account-detail-box">
    <Header :headObj="headObj"
            @leftClick="$router.push('/user')"
            @rightClick="timeShow=!timeShow">
    </Header>
    <span class="slot-icon" @click="handleMask">
        <i class="iconfont iconic-filter"></i>
    </span>
    <div class="body">
      <div class="topbox" v-if="data && data.length > 0">
        <vue-better-scroll class="wrapper" ref="Ascroll"
                           :scrollbar="scrollbarObj"
                           :pullDownRefresh="pullDownRefreshObj"
                           :pullUpLoad="pullUpLoadObj"
                           :startY="parseInt(startY)"
                           @pulling-down="onPullingDown"
                           @pulling-up="onPullingUp">
          <template>
            <div class="account-detail-con">
              <div class="mod-list-item" @click="toDetail(item)" v-for="item in data" :key="item.id">
                <div class="top">
                  <h1>{{ $t(searchName(item.tranType))}}</h1>
                  <span :class="item.money > 0 ? 'red':'green'">{{item.money > 0 ? '+' : '' }}{{ item.money.toFixed(2) }}</span>
                </div>
                <div class="bottom">
                  <span>{{ item.createTime }}</span>
                  <!--                  <span>{{$t('lang.user.balance')}}：{{ (item.balance + item.money).toFixed(2) }}</span>-->
                  <span>
                    {{$t('lang.common.Balance')}}：
                    <i class="user-money">{{ item.balance == null ? '0' : format_number(item.balance + item.money).split('.')[0] }}</i><em class="money-point">{{ item.balance == null ? '.00' :'.'+format_number(item.balance + item.money).split('.')[1] }}</em>
                  </span>
                </div>
              </div>
            </div>
            <!--<div class="content" style="font-size:.2rem">
              <div class="detail-item" @click="toDetail(item)" v-for="item in data" :key="item.id">
                <div class="detail-top">
                  <h1>{{ $t(searchName(item.tranType))}}</h1>
                  <div>
                    &lt;!&ndash;<span>{{$t(item.value)}}</span>&ndash;&gt;
                    <span
                            :style="item.money > 0 ? 'color: red;':'color:#4fbb72;'">
                      {{item.money > 0 ? '+' : '' }}{{ item.money.toFixed(2) }}</span>
                  </div>
                </div>
                <div class="detail-bottom">
                  <span>{{ item.createTime }}</span>
                  <div>
                    {{$t('lang.common.Balance')}}：<i class="user-money">{{ item.balance == null ? '0' : format_number(item.balance + item.money).split('.')[0] }}</i><em class="money-point">{{ item.balance == null ? '.00' :'.'+format_number(item.balance + item.money).split('.')[1] }}</em>
                  </div>
&lt;!&ndash;                  <div>{{$t('lang.user.balance')}}：{{ (item.balance + item.money).toFixed(2) }}</div>&ndash;&gt;
                </div>
              </div>
            </div>-->
          </template>
        </vue-better-scroll>
      </div>
      <NotData v-else :isNotData="isNotData"/>
    </div>
    <div class="dialog">
      <van-popup
              class="mod-popup-box"
              v-model="timeShow"
              position="top" :style="{ height: '100%' }"
              :overlay-style="{backgroundColor:'rgba(0,0,0,.3)'}"
      >
        <div class="popup_body">
          <div class="inner">
            <DatePicker :btnDanger="btnDanger" :btnDefault="btnDefault"
                        :btnDefault1="btnDefault1" :showPickerStart="showPickerStart"
                        :showPickerEnd="showPickerEnd"
                        :startTime="startTime" :endTime="endTime"
                        :startTime1="startTime1" :endTime1="endTime1"
                        :startTime2="startTime2" :endTime2="endTime2"
                        :type="type"
                        @clickLeftDate="(showPickerStart = true) && (showPickerEnd=false)"
                        @clickRightDate="(showPickerEnd = true) && (showPickerStart = false)"
                        @clickCloseStart="handlePickStartSure"
                        @clickCloseEnd="handlePickEndSure"
                        @clickCancelStart="handleStartCancel"
                        @clickCancelEnd="handleEndCancel"
                        @handleSubmit="handleSure"
                        @handleBtns="handleBtn"
                        @emitStarttime="handleEmitStart"
                        @emitEndtime="handleEmitEnd"
            />
          </div>
        </div>
      </van-popup>
    </div>
    <div class="m-popup" v-show="showMask">
      <!--<div class="m-popup">-->
      <div class="mask" style="opacity: 0.8;"></div>
      <div ref="maskPop" class="content content-bottom">
        <div class="title">
          <!--选择交易类型-->
          {{ $t('lang.Popup.ChooseTransactionType') }}
          <van-icon @click="showMask=!showMask"
                    class="crossicon" name="cross"/>
        </div>

        <div class="list">
          <ul>
            <li :class="[item.type === tranType ?'choose': '']"
                @click="changeType(item)"
                v-for="(item,index) in liData"
                :key="index">{{ item.desc }}
            </li>
          </ul>
        </div>
        <div class="confirm">
          <span @click="_confirm">{{$t('lang.common.determine')}}</span>
        </div>
      </div>
    </div>
    <van-action-sheet v-model="show" title="标题">
      <van-icon @click="show=!show" name="arrow-left"/>
      <div class="cheader">{{$t('lang.user.accountDetails')}}</div>
      <ul class="mod-ul-detail">
        <li>
          <label>{{$t('lang.AccountDetail.transactionType')}}</label>
          <span>{{ $t(searchName(currentData.tranType)) }}</span>
        </li>
        <!--  <li>
            <label>{{ currentData.orderNo == '' ? $t('lang.AccountDetail.issueNum') : $t('lang.AccountDetail.orderNum') }}</label>
            <span>{{ currentData.orderNo == '' ? currentData.turnNum : currentData.orderNo }}</span>
          </li>-->
        <li>
          <label>{{ $t('lang.AccountDetail.orderNum') }}</label>
          <span>{{ currentData.orderNo }}</span>
        </li>
        <!--        <li>
                  <span>{{ currentData.orderNo == '' ? $t('lang.AccountDetail.issueNum') : $t('lang.AccountDetail.orderNum') }}</span>
                  <span>{{ currentData.orderNo == '' ? currentData.turnNum : currentData.orderNo }}</span>
                </li>-->
        <li v-if="currentData.turnNum">
          <label>{{$t('lang.AccountDetail.issueNum')}}</label>
          <span>{{currentData.turnNum }}</span>
        </li>
        <li>
          <label>{{$t('lang.AccountDetail.money')}}</label>
          <span :class="currentData.money > 0 ? 'red':'green'">
            {{ currentData.money > 0 ? '+' : '' }}
            {{ currentData.money && currentData.money.toFixed(2) }}</span>
        </li>
        <li>
          <label>{{$t('lang.AccountDetail.dealTime')}}</label>
          <span>{{ currentData.createTime }}</span>
        </li>
        <li>
          <label>{{$t('lang.AccountDetail.remarks')}}</label>
        </li>
      </ul>
    </van-action-sheet>
  </div>
</template>

<script>
  import Header from '../commons/header/Header'
  import utils from '../utils/utils'
  import DatePicker from '../commons/datePicker/DatePicker'
  import {mapGetters, mapState} from 'vuex'
  import VueBetterScroll from '../commons/scroll/BScroll'
  import NotData from '../commons/notdata/NotData'

  export default {
    name: 'AccountDetail',
    components: {
      Header,
      DatePicker,
      VueBetterScroll,
      NotData
    },
    data() {
      return {
        // vincent
        // typeIndex: 0,
        // vincent
        isNotData: true,
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
        show: false,
        timeShow: false,
        height: '100%',
        activeName: '1',
        headObj: {
          title: 'lang.user.accountDetails',
          showArrow: true,
          iconName: ' iconrili'
        },
        showMask: false,
        type: 'yesterday',
        btnDanger: 'default',
        btnDefault: 'danger',
        btnDefault1: 'default',
        showPickerStart: false,
        showPickerEnd: false,
        lastDay: 3600 * 1000 * 24,
        lastWeek: 3600 * 1000 * 24 * 8,
        lastMonth: 3600 * 1000 * 24 * 31,
        startTime: new Date(utils.dayStartTime(Date.now() - 3600 * 1000 * 24 * 8)),
        endTime: new Date(utils.dayEndTime(Date.now() - 3600 * 1000 * 24)),
        startTime1: new Date(),
        endTime1: new Date(),
        startTime2: new Date(),
        endTime2: new Date(),
        data: [],
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(2025, 10, 1),
        liDatas: [{value: 'lang.RechargeData.All', key: ''}, {
          value: 'lang.AccountDetail.fundTransfer',
          key: 1
        }, {value: 'lang.AccountDetail.onlinePayment', key: 2}, {
          value: 'lang.AccountDetail.lotteryBetting',
          key: 3
        }, {value: 'lang.AccountDetail.lotteryPayouts', key: 4}, {
          value: 'lang.AccountDetail.userWithdrawal',
          key: 6
        }, {value: 'lang.AccountDetail.cancellationRebate', key: 7}, {
          value: 'lang.AccountDetail.withdrawalFailed',
          key: 8
        }, {value: 'lang.AccountDetail.commissionRebate', key: 10}, {
          value: 'lang.AccountDetail.backgroundTransfer',
          key: 11
        }, {value: 'lang.AccountDetail.backgroundTransferOut', key: 12}, {
          value: 'lang.loginContent.register',
          key: 16
        }, {value: 'lang.AccountDetail.agentRebate', key: 17}, {
          value: 'lang.AccountDetail.manualDeposit',
          key: 18
        }, {value: 'lang.AccountDetail.giveRebate', key: 19}, {
          value: 'lang.AccountDetail.activityOffers',
          key: 20
        }, {value: 'lang.AccountDetail.rebateNumber', key: 21}, {
          value: 'lang.AccountDetail.systemReward',
          key: 22
        }, {value: 'lang.AccountDetail.agentDailySalary', key: 23}, {
          value: 'lang.AccountDetail.agencySupport',
          key: 24
        }, {value: 'lang.AccountDetail.otherRecharge', key: 25}, {
          value: 'lang.AccountDetail.playAndRebate',
          key: 26
        }, {value: 'lang.AccountDetail.writeRebate', key: 27}, {
          value: 'lang.AccountDetail.manuallyProposed',
          key: 28
        }, {value: 'lang.AccountDetail.numberDeduction', key: 29}, {
          value: 'lang.AccountDetail.discountDeduction',
          key: 30
        }, {value: 'lang.AccountDetail.otherDeductions', key: 31}, {
          value: 'lang.AccountDetail.reversalAward',
          key: 32
        }, {value: 'lang.AccountDetail.transferIn', key: 33}, {
          value: 'lang.AccountDetail.transferOut',
          key: 34
        }, {value: 'lang.AccountDetail.sportsBetting', key: 35}, {
          value: 'lang.AccountDetail.sportsSettlement',
          key: 36
        }, {value: 'lang.AccountDetail.refundRegulations', key: 37}, {
          value: 'lang.AccountDetail.reSettlement',
          key: 38
        }, {value: 'lang.AccountDetail.cancelOrder', key: 39}, {
          value: 'lang.AccountDetail.realRebate',
          key: 40
        }, {value: 'lang.AccountDetail.rebateRebate', key: 41}],
        liData: [],
        tranType: '',
        currentData: {},
        page: 1
      }
    },
    computed: {
      ...mapState([
        'userInformation'
      ]),
      ...mapGetters({
        format_number: '_format_number',
      }),
      // ...mapGetters(['userInfo', 'testInfo']),
      usersInfo() {
        return this.userInformation
      }
    },
    filters: {
      formatDate(val) {
        return utils.dateFormat(val, 2)
      }
    },
    methods: {
      loadData(type) {
        const data = {
          beginDate: this.startTime.toLocaleDateString().replace(/\//g, '-'),
          endDate: this.endTime.toLocaleDateString().replace(/\//g, '-'),
          page: this.page,
          rows: 20,
          tranType: this.tranType
        }
        this.$http.account.queryPageBill(data)
          .then((res, err) => {
            if (res.data.data.length === 0) {
              this.isNotData = false
            }
            this.data = type === 2 ? this.data.concat(res.data.data) : res.data.data
            if (this.data.length === res.data.totalCount) {
              this.$refs.Ascroll.forceUpdate(false)
            }
          })
          .catch((err) => {
            // console.warn(err)
          })
      },
      // 下拉刷新
      onPullingDown() {
        // console.warn(11111)
        setTimeout(() => {
          this.$refs.Ascroll.forceUpdate(true)
          this.page = 1
          this.loadData()
        }, 500)
      },
      // 上拉 加载更多数据
      onPullingUp() {
        setTimeout(() => {
          this.$refs.Ascroll.forceUpdate(true)
          this.page = this.page + 1
          this.loadData(2)
        }, 500)
      },
      searchName(value) {
        if (value) {
          for (let i = 0; i < this.liData.length; i++) {
            const item = this.liData[i];
            if (value === item.type) {
              return item.desc;
            }
          }
        }
      },
      toDetail(value) {
        this.show = !this.show
        this.currentData = value
      },
      // 滚动条回到顶部
      handleMask() {
        // console.log(1221);
        this.showMask = true;
        this.page = 1;
        this.$nextTick(() => {
          this.$refs.maskPop.scrollTop = 0
        })
      },
      // picker确定开始时间判断
      handlePickStartSure(val) {
        if (val.getTime() > this.endTime.getTime() || val.getTime() > this.endTime1.getTime() || val.getTime() > this.endTime2.getTime()) {
          this.$toast('开始时间不能大于结束时间')
        }
        const dayTime = 3600 * 1000 * 24
        if ((this.endTime.getTime() - val.getTime()) > dayTime || (this.endTime1.getTime() - val.getTime()) > this.lastDay || (this.endTime2.getTime() - val.getTime()) > this.lastMonth) {
          this.btnDanger = 'default'
          this.btnDefault = 'default'
          this.btnDefault1 = 'default'
        }
        this.showPickerStart = false
        this.startTime = val
      },
      // picker确定结束时间判断
      handlePickEndSure(val) {
        const dayTime = 3600 * 1000 * 24
        if ((val.getTime() - this.startTime.getTime()) >= dayTime || (val.getTime() - this.startTime1.getTime()) >= this.lastDay || (val.getTime() - this.startTime2.getTime()) >= this.lastMonth) {
          this.btnDanger = 'default'
          this.btnDefault = 'default'
          this.btnDefault1 = 'default'
        }
        this.showPickerEnd = false
        this.endTime = val
      },
      // 弹层取消-开始
      handleStartCancel() {
        this.startTime = new Date(utils.dayStartTime(Date.now() - 3600 * 1000 * 24))
        this.startTime1 = new Date(utils.dayStartTime(Date.now() - this.lastWeek))
        this.startTime2 = new Date(utils.dayStartTime(Date.now() - this.lastMonth))
        this.showPickerStart = false
      },
      // 弹层取消-结束
      handleEndCancel() {
        this.endTime = new Date(utils.dayStartTime(Date.now() - 3600 * 1000 * 24))
        this.endTime1 = new Date(utils.dayEndTime(Date.now() - this.lastDay))
        this.endTime2 = new Date(utils.dayEndTime(Date.now() - this.lastDay))
        this.showPickerEnd = false
      },
      // picker组件computed-set
      handleEmitStart(val) {
        this.startTime = val
        this.startTime1 = val
        this.startTime2 = val
      },
      // picker组件computed-set
      handleEmitEnd(val) {
        this.endTime = val
        this.endTime1 = val
        this.endTime2 = val
      },
      // 所有时间恢复如初
      restTime() {
        // this.startTime = new Date(utils.dayStartTime(Date.now() - 3600 * 1000 * 24))
        // this.startTime1 = new Date(utils.dayStartTime(Date.now() - this.lastWeek))
        // this.startTime2 = new Date(utils.dayStartTime(Date.now() - this.lastMonth))
        // this.endTime = new Date(utils.dayStartTime(Date.now() - 3600 * 1000 * 24))
        // this.endTime1 = new Date(utils.dayEndTime(Date.now() - this.lastDay))
        // this.endTime2 = new Date(utils.dayEndTime(Date.now() - this.lastDay))
        const data = {
          beginDate: this.startTime.toLocaleDateString().replace(/\//g, '-'),
          endDate: this.endTime.toLocaleDateString().replace(/\//g, '-'),
          page: 1,
          rows: 20,
          tranType: this.tranType
        }
        this.loadData(1)
      },
      handleSure() {
        this.timeShow = false
        this.restTime()
      },
      changeType(item) {
        // console.log(item, 'iiiii');
        this.tranType = item.type;
        // const data = {
        //   beginDate: this.startTime.toLocaleDateString().replace(/\//g, '-'),
        //   endDate: this.endTime.toLocaleDateString().replace(/\//g, '-'),
        //   page: 1,
        //   rows: 20,
        //   tranType: this.tranType
        // }
        // this.loadData(1)
        // this.showMask = false
      },
      handleBtn(type) {
        this.type = type
        switch (type) {
          case 'yesterday':
            this.btnDanger = 'danger'
            this.btnDefault1 = 'default'
            this.btnDefault = 'default'
            this.startTime = new Date(utils.dayStartTime(Date.now() - this.lastDay))
            this.endTime = new Date(utils.dayEndTime(Date.now() - this.lastDay))
            break
          case 'week':
            this.btnDefault = 'danger'
            this.btnDanger = 'default'
            this.btnDefault1 = 'default'
            this.startTime1 = new Date(utils.dayStartTime(Date.now() - this.lastWeek))
            this.endTime1 = new Date(utils.dayEndTime(Date.now()))
            this.startTime = new Date(utils.dayStartTime(Date.now() - this.lastWeek))
            this.endTime = new Date(utils.dayEndTime(Date.now()))
            break
          case 'month':
            this.btnDefault1 = 'danger'
            this.btnDefault = 'default'
            this.btnDanger = 'default'
            this.startTime2 = new Date(utils.dayStartTime(Date.now() - this.lastMonth))
            this.endTime2 = new Date(utils.dayEndTime(Date.now()))
            this.startTime = new Date(utils.dayStartTime(Date.now() - this.lastMonth))
            this.endTime = new Date(utils.dayEndTime(Date.now()))
            break
          default:
            break
        }
      },
      // vincent
      _confirm() {
        this.loadData(1);
        this.showMask = false
      }
      // vincent
    },
    mounted() {
      console.log('aaaaaaaaaaaa');
      let a = {
        desc: "全部",
        reportType: '',
        type: '',
      };
      this.$nextTick(() => {
        setTimeout(() => {
          this.$http.account.getTransList().then(res => {
            console.log(res, 333334444)
            res.data.unshift(a);
            this.liData = res.data;

            // console.log(this.liData,11111)
            // console.log(this.liDatas)
          }).catch(err => {
            console.log(err)
          })
        }, 500)
      })
    },
    created() {
      this.handleBtn('week')
      this.loadData(1)
    }
  }
</script>

<style lang="scss" scoped>
  .account-detail-box {
    .account-detail-con{
      background: #24252D;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 px2rem(16px);
    }
    /deep/ .van-nav-bar__right {
      position: absolute;
      right: px2rem(30px);
      .iconfont {
        font-size: px2rem(22px);
      }
    }
    .detail-item,
    .ccontent {
      & > div {
        span {
          &:first-child {
            color: #8f8f8f;
          }
          &:last-child {
            color: #fff;
          }
        }
      }
    }

  }

  .skin-gray {
    .account-detail-box {
      .account-detail-con{
        background: $skin-gray-con-bg;
      }
    }
    .detail-item {
      .detail-bottom {
        color: $skin-gray-text-sub-color;
      }
    }
    .detail-item,
    .ccontent > div.detail-item {
      background: $skin-gray-con-bg;
      @include border-1px($skin-gray-border-color);
    }
    .deposit_Details {
      .m-popup {
        .content {
          .list {
            & > ul {
              li {
                &.choose {
                  background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
                  color: #533510;
                }
              }
            }
          }
          .confirm {
            span {
              color: #533510;
              box-shadow: 0 5px 19px 0 rgba(0, 0, 0, 0.5);
              background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
            }
          }
        }
      }
    }

  }

  .skin-black {
    .account-detail-box {
    }
    .detail-item {
      .detail-bottom {
        color: $skin-black-text-sub-color;
      }
    }
    .detail-item,
    .ccontent {
      & > div.detail-item {
        background: $skin-black-con-bg;
        @include border-1px($skin-black-border-color);
      }
    }
    .deposit_Details {
      .m-popup {
        .content {
          .list {
            & > ul {
              li {
                &.choose {
                  background-image: linear-gradient(to bottom, #efcea6, #dab591);;
                  color: #533510;
                }
              }
            }
          }
          .confirm {
            span {
              color: #533510;
              box-shadow: 0 5px 19px 0 rgba(0, 0, 0, 0.5);
              background-image: linear-gradient(to bottom, #efcea6, #dab591);
            }
          }
        }
      }
    }

  }

  .detail-item {
    .detail-top, .detail-bottom {
      display: flex;
      justify-content: space-between;
    }
    .detail-top {
      font-size: 0.3rem;
      margin-bottom: 0.2rem;
      h1 {
        color: #fff;
      }
    }
    .detail-bottom {
      /*color: #8f8f8f;*/
      font-size: 0.24rem;
      line-height: 0.48rem;
    }
  }

  ::v-deep.van-action-sheet {
    height: 100% !important;
    max-height: 100% !important;
  }

  ::v-deep.van-popup--bottom.van-popup--round {
    border-radius: 0
  }

  ::v-deep.van-action-sheet__header {
    display: none
  }

  // ::v-deep.scroll-wrapper{
  //   overflow: scroll
  // }
  ::v-deep.van-icon-arrow-left {
    position: absolute;
    top: .25rem;
    left: .2rem;
    font-size: 20px;
    color: white;
  }

  ::v-deep.van-action-sheet__content {
    height: 100%
  }

  .cheader {
    height: .9rem;
    //background: linear-gradient(151deg, #65317d -12%, #293384 126%) !important;
    text-align: center;
    line-height: .9rem;
    color: white;
    font-size: 16px
  }

  .ccontent {
    height: 100%;
    /*background: #efeff4;*/
    user-money-box
    > div {
      height: 1rem;
      /*background: white;*/
      line-height: 1rem;
      padding: 0 .3rem;
      font-size: .32rem;
      font-weight: 540;
      //margin-top: 1px;
      display: flex;

      span:first-child {
        width: 100px;
        color: rgb(153, 153, 153);
      }

      span:last-child {
      }
    }
  }

  .deposit_Details {
    display: flex;
    flex-direction: column;
    height: 100%;
    ::v-deep.van-nav-bar__right {
      /*right: 25px;*/
    }
    .slot-icon {
      color: #fff;
      position: absolute;
      top: .26rem;
      z-index: 1;
      right: .25rem;
      .iconfont {
        font-size: .4rem;
      }
    }
    .body {
      flex: 1;
      /*background: white;*/
      overflow: scroll;
      position: relative;

      .topbox {
        display: flex;
        height: 100%;
        flex-direction: column;
      }

      .m-no-data {
        padding-top: 1.2rem;
        text-align: center
      }

      .text {
        margin-top: .8rem;
        font-size: .28rem;
      }

      .item-content {
        display: flex;
        height: 0.7rem;
        line-height: 0.7rem;
        padding: 0 0.4rem;

        .shaixuan {
          width: 2.2rem;
          height: 0.45rem;
          border: 1px solid #ccc;
          display: block;
          line-height: 18px;
          margin-top: 0.15rem;;
          border-radius: 5px;
          text-align: center;
        }
      }

      .total {
        display: flex;
        background: black;
        padding: 5px 0px;

        div {
          flex: 1;
          text-align: center
        }
      }

      .content {
        > div {
          height: 1.42rem;
          /*padding: .32rem .32rem;*/
          /*border-bottom: 0.02rem solid #393940;*/
        }
      }
    }
    .dialog {
      .popup_body {
      }
    }
    .m-popup {
      position: fixed;
      z-index: 2000;
      height: 100%;
      width: 100%;
      bottom: 0;
      left: 0;
      /*overflow-y: scroll;*/
      .mask {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background-color: #000
      }
      .content {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        max-height: 50%;
        overflow: hidden;
        background: #24252d;
        flex: 1;
        .title {
          height: .9rem;
          line-height: .9rem;
          text-align: center;
          background: #24252d;
          /*font-weight: 600;*/
          color: #fff;
          border-bottom: 1px solid #393940;
          /*position: fixed;*/
          /*left: 0;*/
          /*right: 0;*/
          font-size: 0.3rem;
          font-weight: 500;
        }
        .crossicon {
          position: absolute;
          right: 15px;
          top: 15px;
          font-size: 18px;
          color: #8D8D8D;
        }
        .list {
          height: calc(100% - 0.9rem - 1.5rem);
          overflow: scroll;
          ul {
            /*margin-top: 0.9rem;*/
            padding: .2rem .2rem .1rem .2rem;
            background: #24252D;
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            li {
              float: left;
              width: 2.16rem;
              height: 1rem;
              /*line-height: 1rem;*/
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              color: #8f8f8f;
              font-size: .28rem;
              margin: 0 .1rem .2rem .1rem;
              border-radius: 6px;
              box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
              background-color: #16171b;
            }
            .choose {
              background-image: linear-gradient(to bottom, #efcea6, #dab591);;
              color: #533510;
              font-weight: bold;
            }
          }
        }
        .cancel {
          background: #f7f7f7;
          height: 1rem;
          line-height: 1rem;
          text-align: center;
          font-weight: 500;
        }
        .confirm {
          width: 100%;
          height: 1.5rem;
          background: #24252D;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            width: 80%;
            height: 1rem;
            line-height: 1rem;
            font-size: 16px;
            text-align: center;
            color: #533510;
            box-shadow: 0 5px 19px 0 rgba(0, 0, 0, 0.5);
            background-image: linear-gradient(to bottom, #efcea6, #dab591);
            border-radius: 1rem;
            font-weight: 600;
          }
        }
      }
    }
  }
</style>
