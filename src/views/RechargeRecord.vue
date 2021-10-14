<template>
  <div class="recharge">
    <Header :headObj="headObj" @leftClick="$router.go(-1)" @rightClick="timeShow=!timeShow">
      <!--<span slot="icon" class="slot-icon" @click="handleShow(true)">
        筛选
      </span>-->
    </Header>
    <div class="body">
      <vue-better-scroll
              class="wrapper"
              ref="scroll"
              :scrollbar="scrollbarObj"
              :pullDownRefresh="pullDownRefreshObj"
              :pullUpLoad="pullUpLoadObj"
              :startY="parseInt(startY)"
              @pulling-down="onPullingDown"
              @pulling-up="onPullingUp"
      >
        <div v-if="data && data.length !== 0">
          <van-tabs v-model="active">
            <van-tab title="全部">
              <div v-if="data">
                <div @click="toDialog(item)" class="czcontent" v-for="item in data">
                  <div style="line-height: 0.5rem;font-size: 0.33rem;display: flex;color:#000">
                    <div style="flex: 1">{{(item.mode === 2 && item.status === 1) ? rechargeStatus[5]:
                      rechargeStatus[item.status]}}
                    </div>
                    <div style="flex: 1;text-align: right;color:red">+{{item.totalAmount.toFixed(2)}}</div>
                  </div>
                  <div style="font-size: 0.25rem;line-height: 0.5rem; display: flex;color:rgb(102, 102, 102)">
                    <div style="flex:1">{{item.updateTime}}</div>

                    <div style="flex:1;text-align:right">{{$t('lang.common.Balance')}}&nbsp;{{item.status ===
                      3?(item.userBalance+item.totalAmount).toFixed(2):item.userBalance.toFixed(2)}}
                    </div>

                  </div>
                </div>
              </div>
              <div v-if="data && data.length === 0" class="m-no-data">
                <van-image width="2.8rem" lazy-load
                           src="https://sp-res-wap.ftfxgame.com/fusion/wap/release/static/img/no-record.56c1aed8.png"/>
                <p class="text fs-28">{{$t(lang.common.noRecords)}}</p>
              </div>
            </van-tab>
            <van-tab title="未受理">
              <div v-if="data">
                <div @click="toDialog(item)" class="czcontent"
                     v-for="item in data.filter(item => {return item.status === 1})">
                  <div style="line-height: 0.5rem;font-size: 0.33rem;display: flex;color:#000">
                    <div style="flex: 1">{{(item.mode === 2 && item.status === 1) ? rechargeStatus[5]:
                      rechargeStatus[item.status]}}
                    </div>
                    <div style="flex: 1;text-align: right;color:red">+{{item.totalAmount.toFixed(2)}}</div>
                  </div>
                  <div style="font-size: 0.25rem;line-height: 0.5rem; display: flex;color:rgb(102, 102, 102)">
                    <div style="flex:1">{{item.updateTime}}</div>
                    <div style="flex:1;text-align:right">{{$t('lang.common.Balance')}}&nbsp;{{item.userBalance.toFixed(2)}}</div>
                  </div>
                </div>
              </div>
              <div v-if="data && data.filter(item => {return item.status === 1}).length === 0" class="m-no-data">
                <van-image width="2.8rem" lazy-load
                           src="https://sp-res-wap.ftfxgame.com/fusion/wap/release/static/img/no-record.56c1aed8.png"/>
                <p class="text fs-28">暂无记录</p>
              </div>
            </van-tab>
            <van-tab title="受理中">
              <div v-if="data">
                <div @click="toDialog(item)" class="czcontent"
                     v-for="item in data.filter(item => {return item.status === 2})">
                  <div style="line-height: 0.5rem;font-size: 0.33rem;display: flex;color: #000">
                    <div style="flex: 1">{{(item.mode === 2 && item.status === 1) ? rechargeStatus[5]:
                      rechargeStatus[item.status]}}
                    </div>
                    <div style="flex: 1;text-align: right;color:red">+{{item.totalAmount.toFixed(2)}}</div>
                  </div>
                  <div style="font-size: 0.25rem;line-height: 0.5rem; display: flex;color:rgb(102, 102, 102)">
                    <div style="flex:1">{{item.updateTime}}</div>
                    <div style="flex:1;text-align:right">{{$t('lang.common.Balance')}}&nbsp;{{item.userBalance.toFixed(2)}}</div>
                  </div>
                </div>
                <div v-if="data && data.filter(item => {return item.status === 2}).length === 0" class="m-no-data">
                  <van-image width="2.8rem" lazy-load
                             src="https://sp-res-wap.ftfxgame.com/fusion/wap/release/static/img/no-record.56c1aed8.png"/>
                  <p class="text fs-28">暂无记录</p>
                </div>
              </div>
            </van-tab>
            <van-tab title="充值成功">
              <div v-if="data">
                <div @click="toDialog(item)" class="czcontent"
                     v-for="item in data.filter(item => {return item.status === 3})">
                  <div style="line-height: 0.5rem;font-size: 0.33rem;display: flex;color:#000">
                    <div style="flex: 1">{{(item.mode === 2 && item.status === 1) ? rechargeStatus[5]:
                      rechargeStatus[item.status]}}
                    </div>
                    <div style="flex: 1;text-align: right;color:red">+{{item.totalAmount.toFixed(2)}}</div>
                  </div>
                  <div style="font-size: 0.25rem;line-height: 0.5rem; display: flex;color:rgb(102, 102, 102)">
                    <div style="flex:1">{{item.updateTime}}</div>
                    <div style="flex:1;text-align:right">{{$t('lang.common.Balance')}}&nbsp;{{(item.userBalance+item.totalAmount).toFixed(2)}}</div>
                  </div>
                </div>
              </div>
              <div @click="toDialog(item)" v-if="data && data.filter(item => {return item.status === 3}).length === 0"
                   class="m-no-data">
                <van-image width="2.8rem" lazy-load
                           src="https://sp-res-wap.ftfxgame.com/fusion/wap/release/static/img/no-record.56c1aed8.png"/>
                <p class="text fs-28">暂无记录</p>
              </div>
            </van-tab>
            <van-tab title="充值失败">
              <div v-if="data">
                <div @click="toDialog(item)" class="czcontent"
                     v-for="item in data.filter(item => {return item.status === 4})">
                  <div style="line-height: 0.5rem;font-size: 0.33rem;display: flex;color:#000">
                    <div style="flex: 1">{{(item.mode === 2 && item.status === 1) ? rechargeStatus[5]:
                      rechargeStatus[item.status]}}
                    </div>
                    <div style="flex: 1;text-align: right;color:red">+{{item.totalAmount.toFixed(2)}}</div>
                  </div>
                  <div style="font-size: 0.25rem;line-height: 0.5rem; display: flex;color:rgb(102, 102, 102)">
                    <div style="flex:1">{{item.updateTime}}</div>
                    <div style="flex:1;text-align:right">{{$t('lang.common.Balance')}}&nbsp;{{item.userBalance.toFixed(2)}}</div>
                  </div>
                </div>
              </div>
              <div v-if="data && data.filter(item => {return item.status === 4}).length === 0" class="m-no-data">
                <van-image width="2.8rem" lazy-load
                           src="https://sp-res-wap.ftfxgame.com/fusion/wap/release/static/img/no-record.56c1aed8.png"/>
                <p class="text fs-28">暂无记录</p>
              </div>
            </van-tab>
          </van-tabs>
        </div>
        <NotData v-if="data && data.length === 0" :isNotData="isNotData"/>
      </vue-better-scroll>
    </div>
    <div class="dialog">
      <van-popup
              class="mod-popup-box"
              v-model="timeShow"
              position="bottom"
              :style="{ height: '80%' }"
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
    <van-action-sheet v-model="dialogshow" :title="$t('lang.common.title')">
      <van-icon @click="dialogshow=!dialogshow" name="arrow-left"/>
      <div class="cheader">充值详情</div>
      <div class="ccontent">
        <div>
          <span>充值模式</span>
          <span>{{orderModel[currentData.mode]}}</span>
        </div>
        <div>
          <span>支付类型</span>
          <span>{{currentData.payTypeName}}</span>
        </div>
        <div>
          <span>订单号</span>
          <span>{{currentData.orderNo}}</span>
        </div>
        <div>
          <span>充值状态</span>
          <span style="color: red;">{{(currentData.mode === 2 && currentData.status === 1)?'待支付': rechargeStatus[currentData.status]}}</span>
        </div>
        <div>
          <span>充值金额</span>
          <span>{{currentData.amount && currentData.amount.toFixed(2)}}元</span>
        </div>
        <div>
          <span>优惠金额</span>
          <span>{{currentData.discountAmount && currentData.discountAmount.toFixed(2)}}元</span>
        </div>
        <div>
          <span>充值总金额</span>
          <span>{{currentData.totalAmount && currentData.totalAmount.toFixed(2)}}元</span>
        </div>
        <div>
          <span>优惠类型</span>
          <span>{{discountTypeMap[currentData.discountType] ? discountTypeMap[currentData.discountType] : '无优惠类型'}}</span>
        </div>
        <div>
          <span>订单时间</span>
          <span>{{currentData.addTime}}</span>
        </div>
        <div>
          <span>{{currentData.status==4?'取消时间':'入款时间'}}</span>
          <span>{{currentData.auditTime}}</span>
        </div>
        <div>
          <span>备注</span>
          <span style="line-height: .6rem">{{currentData.remarks}}</span>
        </div>

      </div>
    </van-action-sheet>
    <!--弹出层-->
    <Popup :show="show" @changeShow="handleShow"
           :popupList="popupList" @handleActive="clickActive"
           :position="position" :height="height"/>
  </div>
</template>

<script>
  import Header from '../commons/header/Header'
  import Popup from '../commons/popup/Popup'
  import utils from '../utils/utils'
  import DatePicker from '../commons/datePicker/DatePicker'
  import VueBetterScroll from '../commons/scroll/BScroll'
  import NotData from '../commons/notdata/NotData'

  export default {
    name: 'RechargeRecord',
    components: {
      Header,
      Popup,
      DatePicker,
      VueBetterScroll,
      NotData
    },
    data() {
      return {
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
        rechargeStatus: {1: '未受理', 2: '受理中', 3: '已入款', 4: '已取消', 5: '待支付'},
        currentData: {},
        dialogshow: false,
        active: 0,
        headObj: {
          title: '充值记录',
          showArrow: true,
          rightIcon: 'calendar'
        },
        timeShow: false,
        show: false,
        position: 'bottom',
        height: '40%',
        title: '选择交易类型',
        type: 'yesterday',
        lastDay: 3600 * 1000 * 24,
        lastWeek: 3600 * 1000 * 24 * 8,
        lastMonth: 3600 * 1000 * 24 * 31,
        popupList: [
          {id: 0, active: true, type: '全部'},
          {id: 1, active: false, type: '在线充值'},
          {id: 2, active: false, type: '转账汇款'},
          {id: 3, active: false, type: '系统充值'},
          {id: 4, active: false, type: '红包领取'},
          {id: 5, active: false, type: '自动返水'},
          {id: 6, active: false, type: 'VIP礼金'},
          {id: 7, active: false, type: '余额生金'}
        ],
        startTime: new Date(utils.dayStartTime(Date.now() - 3600 * 1000 * 24 * 8)),
        endTime: new Date(utils.dayEndTime(Date.now() - 3600 * 1000 * 24)),
        data: [],
        showPickerEnd: false,
        showPickerStart: false,
        btnDanger: 'default',
        btnDefault: 'danger',
        btnDefault1: 'default',
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(2025, 10, 1),
        startTime1: new Date(),
        endTime1: new Date(),
        startTime2: new Date(),
        endTime2: new Date(),
        statusData: {1: '未受理', 2: '受理中', 3: '充值成功', 4: '已取消'},
        orderModel: {1: '转账汇款', 2: '在线支付', 3: '人工充值', 4: '人工充值(非正常入款)'},
        discountTypeMap: {},
        page: 1
      }
    },
    methods: {
      // 下拉刷新
      onPullingDown() {
        setTimeout(() => {
          this.page = 1
          this.loadData(1)
        }, 500)
      },
      // 上拉 加载更多数据
      onPullingUp() {
        setTimeout(() => {
          this.page = this.page + 1
          this.loadData(2)
        }, 500)
      },
      toDialog(value) {
        this.dialogshow = !this.dialogshow
        this.currentData = value
      },
      handleSure() {
        this.timeShow = false
        this.restTime()
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
      handleShow(val) {
        this.show = val
      },
      clickActive(item) {
        this.popupList.filter(
          val => {
            val.id === item.id ? val.active = true : val.active = false
            // this.show = false
          }
        )
      },
      handlePickStartSure(val) {
        if (val.getTime() > this.endTime.getTime() || val.getTime() > this.endTime1.getTime() || val.getTime() > this.endTime2.getTime()) {
          this.$toast(this.$t('lang.promotionRegistration.kaiShiShiJian'))
        }
        const dayTime = 3600 * 1000 * 24
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
      restTime() {
        // this.startTime = new Date(utils.dayStartTime(Date.now() - 3600 * 1000 * 24))
        // this.startTime1 = new Date(utils.dayStartTime(Date.now() - this.lastWeek))
        // this.startTime2 = new Date(utils.dayStartTime(Date.now() - this.lastMonth))
        // this.endTime = new Date(utils.dayStartTime(Date.now() - 3600 * 1000 * 24))
        // this.endTime1 = new Date(utils.dayEndTime(Date.now() - this.lastDay))
        // this.endTime2 = new Date(utils.dayEndTime(Date.now() - this.lastDay))
        const data = {
          dateFrom: this.startTime.toLocaleDateString().replace(/\//g, '-'),
          dateTo: this.endTime.toLocaleDateString().replace(/\//g, '-'),
          page: 1,
          rows: 20
        }
        this.$http.account.personalRechargeOrder(data)
          .then((res, err) => {
            this.data = res.data
          })
          .catch((err) => {
            console.warn(err)
          })
      },
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
      loadData(type) {
        const data = {
          dateFrom: this.startTime.toLocaleDateString().replace(/\//g, '-'),
          dateTo: this.endTime.toLocaleDateString().replace(/\//g, '-'),
          page: this.page,
          rows: 20
        }
        this.$http.account.personalRechargeOrder(data)
          .then((res, err) => {
            if (res.data.data.length === 0) {
              this.isNotData = false
            }
            this.data = type === 2 ? this.data.concat(res.data.data) : res.data.data
            let isForceUpdate = this.data.length === res.data.totalCount
            setTimeout(() => {
              this.$refs.scroll.forceUpdate(!isForceUpdate)
            }, 100)
          })
          .catch((err) => {
            console.warn(err)
          })
      }
    },
    created() {
      this.handleBtn('week')
   /*   this.$http.account.queryDiscountTypeList()
        .then((res, err) => {
          res.data.forEach(item => {
            this.discountTypeMap[item.value] = item.name
          })
          // jquery?
          // $.each(res.data, function(index, item) {
          //   this.discountTypeMap[item.value]  = item.name;
          // });
        })
        .catch((err) => {
          console.warn(err)
        })*/
      this.loadData(1)
    },
    mounted() {

    },
    filters: {
      formatDate(val) {
        return utils.dateFormat(val, 2)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .recharge {
    display: flex;
    flex-direction: column;
    height: 100%;

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

    ::v-deep.van-tabs__nav {
      display: flex
    }

    ::v-deep.van-ellipsis {
      flex: 1;
      padding: 0
    }

    ::v-deep.van-icon-arrow-left {
      position: absolute;
      top: .25rem;
      left: .2rem;
      font-size: 20px;
      color: white;
    }

    ::v-deep.van-tabs__line {
      width: 20vw !important
    }

    .ccontent {
      height: 100%;
      /*background: #efeff4;*/

      > div {
        height: 1rem;
        background: #24252d;
        line-height: 1rem;
        padding: 0 .3rem;
        font-size: .32rem;
        font-weight: 540;
        margin-top: 1px;
        display: flex;

        span:first-child {
          width: 100px;
          color: #8f8f8f;
        }

        span:last-child {
          color: #fff;
        }
      }
    }

    .cheader {
      height: .9rem;
      background: linear-gradient(151deg, #65317d -12%, #293384 126%) !important;
      text-align: center;
      line-height: .9rem;
      color: white;
      font-size: 16px
    }

    .slot-icon {
      color: #fff;
      position: absolute;
      top: .21rem;
      z-index: 1;
      right: .25rem;

      .iconfont {
        font-size: .4rem;
      }
    }

    .body {
      height: calc(100vh - .88rem);
      overflow: scroll;
      background: #f5f5f9;

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

      ::v-deep.scroll-wrapper {
        overflow: scroll
      }

      ::v-deep .van-tab {
        color: #868686
      }

      ::v-deep .van-tab--active {
        color: red
      }

      .czcontent {
        background-color: #fff;
        padding: 0.2rem 0.32rem;
        border-bottom: 0.01rem solid #ddd;

        span {
          font-size: 18px;
          color: #555;
        }

        .active {
          color: red
        }
      }
    }
  }
</style>
