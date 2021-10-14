<template>
  <div class="deposit_Details">
    <Header :headObj="headObj" @leftClick="$router.push('/depositInterest')" @rightClick="show=!show"/>
    <div class="body">
      <div class="m-no-data">
        <van-image width="2.8rem" lazy-load src="https://sp-res-wap.ftfxgame.com/fusion/wap/release/static/img/no-record.56c1aed8.png" />
        <p class="text fs-28">暂无记录</p>
      </div>
    </div>
    <div class="dialog">
      <van-popup
              class="mod-popup-box"
        v-model="show"
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
  </div>
</template>

<script>
import Header from '../commons/header/Header'
import DatePicker from '../commons/datePicker/DatePicker'
import utils from '../utils/utils'

export default {
  name: 'DepositDetails',
  components: {
    Header,
    DatePicker
  },
  data () {
    return {
      activeName: '1',
      headObj: {
        title: '收益明细',
        showArrow: true,
        rightIcon: 'orders-o'
      },
      show: false,
      type: 'yesterday',
      btnDanger: 'danger',
      btnDefault: 'default',
      btnDefault1: 'default',
      showPickerStart: false,
      showPickerEnd: false,
      lastDay: 3600 * 1000 * 24,
      lastWeek: 3600 * 1000 * 24 * 8,
      lastMonth: 3600 * 1000 * 24 * 31,
      startTime: new Date(utils.dayStartTime(Date.now() - 3600 * 1000 * 24)),
      endTime: new Date(utils.dayEndTime(Date.now() - 3600 * 1000 * 24)),
      startTime1: new Date(),
      endTime1: new Date(),
      startTime2: new Date(),
      endTime2: new Date()
    }
  },
  mounted () {
    console.log(1111)
  },
  methods: {
    handleBtn (type) {
      this.type = type
      switch (type) {
      case 'yesterday':
        console.log(1)
        this.btnDanger = 'danger'
        this.btnDefault1 = 'default'
        this.btnDefault = 'default'
        this.startTime = new Date(utils.dayStartTime(Date.now() - this.lastDay))
        this.endTime = new Date(utils.dayEndTime(Date.now() - this.lastDay))
        break
      case 'week':
        console.log(2)
        this.btnDefault = 'danger'
        this.btnDanger = 'default'
        this.btnDefault1 = 'default'
        this.startTime1 = new Date(utils.dayStartTime(Date.now() - this.lastWeek))
        this.endTime1 = new Date(utils.dayEndTime(Date.now() - this.lastDay))
        break
      case 'month':
        console.log(3)
        this.btnDefault1 = 'danger'
        this.btnDefault = 'default'
        this.btnDanger = 'default'
        this.startTime2 = new Date(utils.dayStartTime(Date.now() - this.lastMonth))
        this.endTime2 = new Date(utils.dayEndTime(Date.now() - this.lastDay))
        break
      default: break
      }
    },
    // picker确定开始时间判断
    handlePickStartSure (val) {
      if (val.getTime() > this.endTime.getTime() || val.getTime() > this.endTime1.getTime() || val.getTime() > this.endTime2.getTime()) {
        this.$toast(this.$t('lang.daiLiZhongXin.promotionRegistration'));
        this.restTime()
      }
      const dayTime = 3600 * 1000 * 24
      if ((this.endTime.getTime() - val.getTime()) > dayTime || (this.endTime1.getTime() - val.getTime()) > this.lastDay || (this.endTime2.getTime() - val.getTime()) > this.lastMonth) {
        this.btnDanger = 'default'
        this.btnDefault = 'default'
        this.btnDefault1 = 'default'
      }
      this.showPickerStart = false
    },
    // picker确定结束时间判断
    handlePickEndSure (val) {
      console.log(val.getTime() - this.startTime.getTime(), '9999')
      console.log(3600 * 1000 * 24, '999900000')
      const dayTime = 3600 * 1000 * 24
      if ((val.getTime() - this.startTime.getTime()) >= dayTime || (val.getTime() - this.startTime1.getTime()) >= this.lastDay || (val.getTime() - this.startTime2.getTime()) >= this.lastMonth) {
        this.btnDanger = 'default'
        this.btnDefault = 'default'
        this.btnDefault1 = 'default'
      }
      this.showPickerEnd = false
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
      this.startTime = new Date(utils.dayStartTime(Date.now() - 3600 * 1000 * 24))
      this.startTime1 = new Date(utils.dayStartTime(Date.now() - this.lastWeek))
      this.startTime2 = new Date(utils.dayStartTime(Date.now() - this.lastMonth))
      this.endTime = new Date(utils.dayStartTime(Date.now() - 3600 * 1000 * 24))
      this.endTime1 = new Date(utils.dayEndTime(Date.now() - this.lastDay))
      this.endTime2 = new Date(utils.dayEndTime(Date.now() - this.lastDay))
    },
    handleSure () {
      console.log(this.startTime, '\n', this.endTime)
      this.show = false
      this.restTime()
    }
  }
}
</script>

<style lang="scss" scoped>
  .deposit_Details {
    .body{
      height: calc(100vh - .88rem);
      overflow: scroll;
      background: #f5f5f9;
      .m-no-data{
        padding-top: 1.2rem;
        text-align: center
      }
      .text{
        margin-top: .8rem;
        font-size: .28rem;
      }
    }
    .dialog{
      .popup_body{
      }
    }
  }
</style>
