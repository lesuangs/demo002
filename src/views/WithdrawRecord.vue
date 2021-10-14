<template>
  <div class="withdraw">
    <Header :headObj="headObj" @leftClick="$router.push('/user')" @rightClick="timeShow=!timeShow">
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
        <div v-if="data.length !== 0">
          <van-tabs v-model="active">
            <van-tab title="全部">
              <div v-if="data.length > 0">
                <div @click="toDialog(item)" class="czcontent" v-for="item in data">
                  <div style="line-height: 0.5rem;font-size: 0.33rem;display: flex;color:#000">
                    <div style="flex: 1">{{withdrawStatus[item.cashStatus]}}</div>
                    <div style="flex: 1;text-align: right;color:red">-{{item.cashMoney.toFixed(2)}}</div>
                  </div>
                  <div style="font-size: 0.25rem;line-height: 0.5rem; display: flex;color:rgb(102, 102, 102)">
                    <div style="flex:1">{{item.addTime}}</div>
                    <div style="flex:1;text-align:right">余额&nbsp;{{(item.accountMoney-item.cashMoney).toFixed(2)}}</div>
                  </div>
                </div>
              </div>
              <div v-if="data.length === 0" class="m-no-data">
                <van-image width="2.8rem" lazy-load src="https://sp-res-wap.ftfxgame.com/fusion/wap/release/static/img/no-record.56c1aed8.png" />
                <p class="text fs-28">暂无记录</p>
              </div>
            </van-tab>
            <van-tab title="未受理">
              <div v-if="data.length > 0">
                <div @click="toDialog(item)" class="czcontent" v-for="item in data.filter(item => {return item.cashStatus === 1})">
                  <div style="line-height: 0.5rem;font-size: 0.33rem;display: flex;color:#000">
                    <div style="flex: 1">{{withdrawStatus[item.cashStatus]}}</div>
                    <div style="flex: 1;text-align: right;color:red">-{{item.cashMoney.toFixed(2)}}</div>
                  </div>
                  <div style="font-size: 0.25rem;line-height: 0.5rem; display: flex;color:rgb(102, 102, 102)">
                    <div style="flex:1">{{item.addTime}}</div>
                    <div style="flex:1;text-align:right">余额&nbsp;{{(item.accountMoney-item.cashMoney).toFixed(2)}}</div>
                  </div>
                </div>
              </div>
              <div v-if="data.filter(item => {return item.cashStatus === 1}).length === 0" class="m-no-data">
                <van-image width="2.8rem" lazy-load src="https://sp-res-wap.ftfxgame.com/fusion/wap/release/static/img/no-record.56c1aed8.png" />
                <p class="text fs-28">暂无记录</p>
              </div>
            </van-tab>
            <van-tab title="受理中">
              <div>
                <div @click="toDialog(item)" class="czcontent" v-for="item in data.filter(item => {return item.cashStatus === 2})">
                  <div style="line-height: 0.5rem;font-size: 0.33rem;display: flex;color:#000">
                    <div style="flex: 1">{{withdrawStatus[item.cashStatus]}}</div>
                    <div style="flex: 1;text-align: right;color:red">-{{item.cashMoney.toFixed(2)}}</div>
                  </div>
                  <div style="font-size: 0.25rem;line-height: 0.5rem; display: flex;color:rgb(102, 102, 102)">
                    <div style="flex:1">{{item.addTime}}</div>
                    <div style="flex:1;text-align:right">余额&nbsp;{{(item.accountMoney-item.cashMoney).toFixed(2)}}</div>
                  </div>
                </div>
                <div v-if="data.filter(item => {return item.cashStatus === 2}).length === 0" class="m-no-data">
                  <van-image width="2.8rem" lazy-load src="https://sp-res-wap.ftfxgame.com/fusion/wap/release/static/img/no-record.56c1aed8.png" />
                  <p class="text fs-28">暂无记录</p>
                </div>
              </div>
            </van-tab>
            <van-tab title="已出款">
              <div>
                <div @click="toDialog(item)" class="czcontent" v-for="item in data.filter(item => {return item.cashStatus === 3})">
                  <div style="line-height: 0.5rem;font-size: 0.33rem;display: flex;color:#000">
                    <div style="flex: 1">{{withdrawStatus[item.cashStatus]}}</div>
                    <div style="flex: 1;text-align: right;color:red">-{{item.cashMoney.toFixed(2)}}</div>
                  </div>
                  <div style="font-size: 0.25rem;line-height: 0.5rem; display: flex;color:rgb(102, 102, 102)">
                    <div style="flex:1">{{item.addTime}}</div>
                    <div style="flex:1;text-align:right">余额&nbsp;{{(item.accountMoney-item.cashMoney).toFixed(2)}}</div>
                  </div>
                </div>
              </div>
              <div @click="toDialog(item)" v-if="data.filter(item => {return item.cashStatus === 3}).length === 0" class="m-no-data">
                <van-image width="2.8rem" lazy-load src="https://sp-res-wap.ftfxgame.com/fusion/wap/release/static/img/no-record.56c1aed8.png" />
                <p class="text fs-28">暂无记录</p>
              </div>
            </van-tab>
            <van-tab title="已取消">
              <div>
                <div @click="toDialog(item)" class="czcontent" v-for="item in data.filter(item => {return item.cashStatus === 4})">
                  <div style="line-height: 0.5rem;font-size: 0.33rem;display: flex;color:#000">
                    <div style="flex: 1">{{withdrawStatus[item.cashStatus]}}</div>
                    <div style="flex: 1;text-align: right;color:red">-{{item.cashMoney.toFixed(2)}}</div>
                  </div>
                  <div style="font-size: 0.25rem;line-height: 0.5rem; display: flex;color:rgb(102, 102, 102)">
                    <div style="flex:1">{{item.addTime}}</div>
                    <div style="flex:1;text-align:right">余额&nbsp;{{(item.accountMoney-item.cashMoney).toFixed(2)}}</div>
                  </div>
                </div>
              </div>
              <div v-if="data.filter(item => {return item.cashStatus === 4}).length === 0" class="m-no-data">
                <van-image width="2.8rem" lazy-load src="https://sp-res-wap.ftfxgame.com/fusion/wap/release/static/img/no-record.56c1aed8.png" />
                <p class="text fs-28">暂无记录</p>
              </div>
            </van-tab>
          </van-tabs>
        </div>
        <NotData v-else :isNotData="isNotData"/>
      </vue-better-scroll>
    </div>
    <van-action-sheet v-model="dialogshow" title="标题">
      <van-icon @click="dialogshow=!dialogshow" name="arrow-left" />
      <div class="cheader">提现详情</div>
      <div class="ccontent">
        <div>
          <span>订单号</span>
          <span>{{currentData.cashOrderNo}}</span>
        </div>
        <div>
          <span>提现金额</span>
          <span>{{currentData.cashMoney && currentData.cashMoney.toFixed(2)}}元</span>
        </div>
        <div>
          <span>手续费</span>
          <span>{{currentData.counterFee && currentData.counterFee.toFixed(2)}}元</span>
        </div>
        <div>
          <span>实际出款</span>
          <span>{{currentData.approveMoney && currentData.approveMoney.toFixed(2)}}元</span>
        </div>
        <div>
          <span>提现状态</span>
          <span style="color:red">{{withdrawStatus[currentData.cashStatus]}}</span>
        </div>
        <div>
          <span>订单时间</span>
          <span >{{currentData.addTime}}</span>
        </div>
        <div>
          <span>备注</span>
          <span>{{currentData.approveReason}}</span>
        </div>
      </div>
    </van-action-sheet>
    <div class="dialog">
      <van-popup
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
    <!--弹出层-->
    <Popup :show="show" @changeShow="handleShow"
           :popupList="popupList" @handleActive="clickActive"
           :position="position" :height="height"/>
  </div>
</template>

<script>
import Header from '../commons/header/Header'
import Popup from '../commons/popup/Popup'
import DatePicker from '../commons/datePicker/DatePicker'
import utils from '../utils/utils'
import VueBetterScroll from '../commons/scroll/BScroll'
import NotData from '../commons/notdata/NotData'

export default {
  name: 'WithdrawRecord',
  components: {
    Header,
    Popup,
    DatePicker,
    VueBetterScroll,
    NotData
  },
  data () {
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
      timeShow: false,
      currentData: {},
      dialogshow: false,
      withdrawStatus: { 1: '未受理', 2: '受理中', 3: '已出款', 4: '已取消', 5: '拒绝出款', 6: '' },
      active: 0,
      headObj: {
        title: '提现记录',
        showArrow: true,
        rightIcon: 'calendar'
      },
      show: false,
      position: 'bottom',
      height: '35%',
      title: '选择交易类型',
      type: 'yesterday',
      popupList: [
        { id: 0, active: true, type: '全部' },
        { id: 1, active: false, type: '提交' },
        { id: 2, active: false, type: '处理中' },
        { id: 3, active: false, type: '确认' },
        { id: 4, active: false, type: '取消' },
        { id: 5, active: false, type: '拒绝' }
      ],
      startTime: new Date(utils.dayStartTime(Date.now() - 3600 * 1000 * 24 * 8)),
      endTime: new Date(utils.dayEndTime(Date.now() - 3600 * 1000 * 24)),
      startTime1: new Date(),
      endTime1: new Date(),
      startTime2: new Date(),
      endTime2: new Date(),
      lastDay: 3600 * 1000 * 24,
      lastWeek: 3600 * 1000 * 24 * 8,
      lastMonth: 3600 * 1000 * 24 * 31,
      data: [],
      status: { 1: '未受理', 2: '受理中', 3: '已出款', 4: '已取消', 5: '拒绝出款', 6: '撤销出款订单' },
      btnDanger: 'default',
      btnDefault: 'danger',
      btnDefault1: 'default',
      showPickerStart: false,
      showPickerEnd: false,
      page: 1
    }
  },
  methods: {
    // 下拉刷新
    onPullingDown () {
      setTimeout(() => {
        this.page = 1
        this.loadData(1)
      }, 500)
    },
    // 上拉 加载更多数据
    onPullingUp () {
      setTimeout(() => {
        this.page = this.page + 1
        this.loadData(2)
      }, 500)
    },
    loadData (type) {
      const data = {
        beginDatetime: this.startTime.toLocaleDateString().replace(/\//g, '-'),
        endDatetime: this.endTime.toLocaleDateString().replace(/\//g, '-'),
        page: this.page,
        rows: 20
      }
      this.$http.account.queryPage(data).then((res, err) => {
        if (res.data.data.length === 0) {
          this.isNotData = false
        }
        this.data = type === 2 ? this.data.concat(res.data.data) : res.data.data
        let isForceUpdate=this.data.length === res.data.totalCount
        setTimeout(()=>{
          this.$refs.scroll.forceUpdate(!isForceUpdate)
        },100)
      }).catch((err) => {
        console.warn(err)
      })
    },
    handleShow (val) {
      this.show = val
    },
    clickActive (item) {
      this.popupList.filter(
        val => {
          val.id === item.id ? val.active = true : val.active = false
          // this.show = false
        }
      )
    },
    toDialog (value) {
      this.dialogshow = !this.dialogshow
      this.currentData = value
    },
    // picker确定开始时间判断
    handlePickStartSure (val) {
      if (val.getTime() > this.endTime.getTime() || val.getTime() > this.endTime1.getTime() || val.getTime() > this.endTime2.getTime()) {
        this.$toast(this.$t('lang.promotionRegistration.kaiShiShiJian'))
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
    handlePickEndSure (val) {
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
    handleStartCancel () {
      this.startTime = new Date(utils.dayStartTime(Date.now() - 3600 * 1000 * 24))
      this.startTime1 = new Date(utils.dayStartTime(Date.now() - this.lastWeek))
      this.startTime2 = new Date(utils.dayStartTime(Date.now() - this.lastMonth))
      this.showPickerStart = false
    },
    // 弹层取消-结束
    handleEndCancel () {
      this.endTime = new Date(utils.dayStartTime(Date.now() - 3600 * 1000 * 24))
      this.endTime1 = new Date(utils.dayEndTime(Date.now() - this.lastDay))
      this.endTime2 = new Date(utils.dayEndTime(Date.now() - this.lastDay))
      this.showPickerEnd = false
    },
    // picker组件computed-set
    handleEmitStart (val) {
      this.startTime = val
      this.startTime1 = val
      this.startTime2 = val
    },
    // picker组件computed-set
    handleEmitEnd (val) {
      this.endTime = val
      this.endTime1 = val
      this.endTime2 = val
    },
    // 所有时间恢复如初
    restTime () {
      const data = {
        beginDatetime: this.startTime.toLocaleDateString().replace(/\//g, '-'),
        endDatetime: this.endTime.toLocaleDateString().replace(/\//g, '-'),
        page: 1,
        rows: 20
      }
      this.$http.account.queryPage(data).then((res, err) => {
        this.data = res.data
      }).catch((err) => {
        console.warn(err)
      })
    },
    handleSure () {
      this.timeShow = false
      this.restTime()
    },
    handleBtn (type) {
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
      default: break
      }
    }
  },
  created () {
    this.handleBtn('week')
    this.loadData(1)
  },
  mounted: function () {

  }
}
</script>

<style lang="scss" scoped>
  .withdraw {
    display: flex;
    flex-direction: column;
    height: 100%;
    ::v-deep.van-action-sheet{
      height: 100% !important;
      max-height: 100% !important;
    }
    ::v-deep.van-popup--bottom.van-popup--round{
      border-radius: 0
    }
    ::v-deep.van-action-sheet__header{
      display:none
    }
    ::v-deep.van-icon-arrow-left{
      position: absolute;
      top: .25rem;
      left: .2rem;
      font-size: 20px;
      color: white;
    }
    ::v-deep.van-action-sheet__content{
      height: 100%
    }
    .cheader{
      height: .9rem;
      background: linear-gradient(151deg, #65317d -12%, #293384 126%) !important;
      text-align: center;
      line-height: .9rem;
      color: white;
      font-size: 16px
    }
    .ccontent{
      height: 100%;
      /*background: #efeff4;*/

      >div{
        height: 1rem;
        background: white;
        line-height: 1rem;
        padding: 0 .3rem;
        font-size: .32rem;
        font-weight: 540;
        margin-top: 1px;
        display: flex;

        span:first-child{
          width: 100px;
          color: rgb(153, 153, 153);
        }
        span:last-child{
        }
      }
    }
    ::v-deep .van-tab--active{
      color: red
    }
    ::v-deep.van-tabs__nav{
      display: flex
    }
    ::v-deep.van-ellipsis{
      flex: 1;
      padding: 0
    }
    ::v-deep.van-tabs__line{
      width: 25vw !important
    }
    ::v-deep.scroll-wrapper{
      overflow: scroll
    }
    .czcontent{
      background-color: #fff;
      padding: 0.2rem 0.32rem;
      border-bottom: 0.01rem solid #ddd;
      span{
        font-size: 18px;
        color: #555;
      }
      .active{
        color: red
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
    }
  }
</style>
