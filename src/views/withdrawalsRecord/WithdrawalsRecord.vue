<template>
  <div class="scrollStyle withdrawals-record-box">
    <Header :headObj="headObj" @leftClick="$router.push('/user')" @rightClick="timeShow=!timeShow">
    </Header>
    <TotalData
      :startTime="startTime"
      :endTime="endTime"
      :timeShow="timeShow"
      @showGameDel="showGameDel"
    />
    <van-popup
            class="mod-popup-box"
      v-model="timeShow"
      position="top"
      :style="{ height: '100%' }"
      :overlay-style="{ backgroundColor: 'rgba(0,0,0,.3)' }"
    >
      <div class="popup_body">
        <div class="inner">
          <DatePicker
            :btnDanger="btnDanger"
            :btnDefault="btnDefault"
            :btnDefault1="btnDefault1"
            :showPickerStart="showPickerStart"
            :showPickerEnd="showPickerEnd"
            :startTime="startTime"
            :endTime="endTime"
            :startTime1="startTime1"
            :endTime1="endTime1"
            :startTime2="startTime2"
            :endTime2="endTime2"
            :type="type"
            @clickLeftDate="(showPickerStart = true) && (showPickerEnd = false)"
            @clickRightDate="
              (showPickerEnd = true) && (showPickerStart = false)
            "
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
</template>

<script>
import Header from '@/commons/header/Header'
import utils from "../../utils/utils";
import TotalData from "./TotalData";
import DatePicker from '@/commons/datePicker/DatePicker'

export default {
    name: "WithdrawalsRecord",
    components: {
      Header,
      TotalData,
      DatePicker
    },
    data() {
      return {
        headObj: {
          title: 'lang.user.withdrawalsRecord',
          showArrow: true,
          iconName:' iconrili'
        },
        tabActive: 0,
        titleList: [
          '全部',
          '未受理',
          '受理中',
          '已出款',
          '已取消'
        ],
        isActive: '',
        timeShow: false,
        type: 'yesterday',
        btnDanger: 'default',
        btnDefault: 'danger',
        btnDefault1: 'default',
        showPickerStart: false,
        showPickerEnd: false,
        lastDay: 3600 * 1000 * 24,
        lastWeek: 3600 * 1000 * 24 * 8,
        lastMonth: 3600 * 1000 * 24 * 31,
        startTime: new Date(
          utils.dayStartTime(Date.now() - 3600 * 1000 * 24 * 7)
        ),
        endTime: new Date(utils.dayEndTime(Date.now())),
        startTime1: new Date(),
        endTime1: new Date(),
        startTime2: new Date(),
        endTime2: new Date()
      }
    },
    created() {
      // console.log(new Date());
    },
    methods: {
      showGameDel(item) {
        this.gameDelShow = true
        this.gameDataDel = item
      },
      handlePickEndSure(val) {
        const dayTime = 3600 * 1000 * 24
        if (
          val.getTime() - this.startTime.getTime() >= dayTime ||
          val.getTime() - this.startTime1.getTime() >= this.lastDay ||
          val.getTime() - this.startTime2.getTime() >= this.lastMonth
        ) {
          this.btnDanger = 'default'
          this.btnDefault = 'default'
          this.btnDefault1 = 'default'
        }
        this.showPickerEnd = false
        this.endTime = val
      },
      handlePickStartSure(val) {
        if (
          val.getTime() > this.endTime.getTime() ||
          val.getTime() > this.endTime1.getTime() ||
          val.getTime() > this.endTime2.getTime()
        ) {
          this.$toast(this.$t('lang.promotionRegistration.kaiShiShiJian'))
        }
        const dayTime = 3600 * 1000 * 24
        if (
          this.endTime.getTime() - val.getTime() > dayTime ||
          this.endTime1.getTime() - val.getTime() > this.lastDay ||
          this.endTime2.getTime() - val.getTime() > this.lastMonth
        ) {
          this.btnDanger = 'default'
          this.btnDefault = 'default'
          this.btnDefault1 = 'default'
        }
        this.showPickerStart = false
        this.startTime = val
      },
      //
      //
      //
      handleSure() {
        this.timeShow = false
        console.log(this.startTime);
        console.log(this.endTime);
      },
      handleStartCancel() {
        this.startTime = new Date(
          utils.dayStartTime(Date.now() - 3600 * 1000 * 24)
        )
        this.startTime1 = new Date(
          utils.dayStartTime(Date.now() - this.lastWeek)
        )
        this.startTime2 = new Date(
          utils.dayStartTime(Date.now() - this.lastMonth)
        )
        this.showPickerStart = false
      },
      handleEndCancel() {
        this.endTime = new Date(
          utils.dayStartTime(Date.now() - 3600 * 1000 * 24)
        )
        this.endTime1 = new Date(utils.dayEndTime(Date.now() - this.lastDay))
        this.endTime2 = new Date(utils.dayEndTime(Date.now() - this.lastDay))
        this.showPickerEnd = false
      },
      handleBtn(type) {
        this.type = type
        switch (type) {
          case 'yesterday':
            this.btnDanger = 'danger'
            this.btnDefault1 = 'default'
            this.btnDefault = 'default'
            this.startTime = new Date(
              utils.dayStartTime(Date.now() - this.lastDay)
            )
            this.endTime = new Date(utils.dayEndTime(Date.now() - this.lastDay))
            break
          case 'week':
            this.btnDefault = 'danger'
            this.btnDanger = 'default'
            this.btnDefault1 = 'default'
            this.startTime1 = new Date(
              utils.dayStartTime(Date.now() - this.lastWeek)
            )
            this.endTime1 = new Date(utils.dayEndTime(Date.now()))
            this.startTime = new Date(
              utils.dayStartTime(Date.now() - this.lastWeek)
            )
            this.endTime = new Date(utils.dayEndTime(Date.now()))
            break
          case 'month':
            this.btnDefault1 = 'danger'
            this.btnDefault = 'default'
            this.btnDanger = 'default'
            this.startTime2 = new Date(
              utils.dayStartTime(Date.now() - this.lastMonth)
            )
            this.endTime2 = new Date(utils.dayEndTime(Date.now()))
            this.startTime = new Date(
              utils.dayStartTime(Date.now() - this.lastMonth)
            )
            this.endTime = new Date(utils.dayEndTime(Date.now()))
            break
          default:
            break
        }
      },
      handleEmitStart(val) {
        this.startTime = val
        this.startTime1 = val
        this.startTime2 = val
      },
      handleEmitEnd(val) {
        this.endTime = val
        this.endTime1 = val
        this.endTime2 = val
      },
    }
  }
</script>

<style lang="scss" scoped>
  .withdrawals-record-box{

  }

  .scrollStyle{
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
  }
  .dataBody {
    width: 100%;
    height: 100%;
    border: 1px solid #000;
  }

  .czcontent {
    background-color: #fff;
    padding: 0.2rem 0.32rem;
    border-bottom: 0.01rem solid #ddd;

    span {
      font-size:.28rem;
      color: #555;
    }

    .active {
      color: red
    }
  }
</style>
