<template>
  <div class="team-over-view-box">
    <Header :headObj="headObj" @leftClick="$router.push('/agentCenter')" @rightClick="timeShow=!timeShow"/>
    <NotData v-if="Object.keys(teamData).length === 0 " :isNotData="isNotData"/>
    <div class="contentHidden" v-else>
      <div class="team-over-view-wrap">
        <div class="team-item">
          <van-cell-group>
            <div class="content-title">{{ $t('lang.daiLiZhongXin.teamSize') }}</div>
            <van-cell :title="$t('lang.teamOverview.totalNumberTeam')" title-style="font-weight:500"
                      v-model="teamData.teamCount"/>
            <van-cell :title="$t('lang.teamOverview.numberRegisteredPeople')" :value="teamData.registCount"/>
            <van-cell :title="$t('lang.teamOverview.numberTopUps')" :value="teamData.rechargeCount"/>
            <van-cell :title="$t('lang.teamOverview.numberFirstCharge')" :value="teamData.firstRechargeCount"/>
          </van-cell-group>
        </div>
        <div class="team-item">
          <van-cell-group>
            <div class="content-title">{{ $t('lang.teamOverview.netProfit') }}</div>
            <div class="netProfit">
              <span>{{ $t('lang.teamOverview.netPrefitIs') }}</span>
              <span>
                {{
                  (teamData.cpBetReport.winOrcloseMoney + teamData.rwReport.discountMoney + teamData.rwReport.otherDiscount + teamData.dlBonuus + teamData.dlRebate + teamData.dlDayWage).toFixed(2)
                }}
              </span>
            </div>
            <!--          <van-cell title-style="" width="3rem" title="净利润=游戏输赢+优惠+代理总计" title-style="font-weight:500" value="545465元" />-->
          </van-cell-group>
        </div>
        <div class="team-item sss">
          <van-cell-group>
            <div class="content-title">{{ $t('lang.teamOverview.depositAndWithdrawal') }}</div>
            <van-cell :title="$t('lang.common.Balance')" title-style="font-weight:500"
                      :value="teamData.money.toFixed(2)"/>
            <van-cell :title="$t('lang.user.Recharge')"
                      :value="teamData.rechargeCount === 0 || teamData.rechargeCount === null? '0.00':teamData.rechargeCount.toFixed(2)"/>
            <van-cell :title="$t('lang.user.withdraw')"
                      :value="teamData.rwReport.withdrawMoney ===0 ||teamData.rwReport.withdrawMoney ===null?'0.00':teamData.rwReport.withdrawMoney.toFixed(2)"/>
          </van-cell-group>
        </div>
        <div class="team-item">
          <van-cell-group>
            <div class="content-title">{{ $t('lang.auditDetails.Discount') }}</div>

            <van-cell :title="$t('lang.teamOverview.rechargeOffer')" title-style="font-weight:500"
                      :value="teamData.rwReport.discountMoney ===0 ||teamData.rwReport.discountMoney ===null?'0.00':teamData.rwReport.discountMoney.toFixed(2)"/>
            <van-cell :title="$t('lang.teamOverview.otherOffers')"
                      :value="teamData.rwReport.otherDiscount ===0 ||teamData.rwReport.otherDiscount ===null?'0.00':teamData.rwReport.otherDiscount.toFixed(2)"/>
          </van-cell-group>
        </div>
        <div class="team-item">
          <van-cell-group>
            <div class="content-title">{{ $t('lang.loginContent.lottery') }}</div>

            <van-cell :title="$t('lang.teamOverview.betAmount')" title-style="font-weight:500"
                      :value="teamData.cpBetReport.bettingMoney ===0 ||teamData.cpBetReport.bettingMoney ===null?'0.00':teamData.cpBetReport.bettingMoney.toFixed(2)"/>
            <van-cell :title="$t('lang.teamOverview.rebateAmount')"
                      :value="teamData.cpBetReport.rebateMoney ===0 ||teamData.cpBetReport.rebateMoney ===null?'0.00':teamData.cpBetReport.rebateMoney.toFixed(2)"/>
            <van-cell
                    :title="$t('lang.NoteHistory.AmountWinningLosing')"
                    :value="teamData.cpBetReport.winOrcloseMoney > 0 ? '-'+ teamData.cpBetReport.winOrcloseMoney.toFixed(2):Math.abs(teamData.cpBetReport.winOrcloseMoney).toFixed(2)"/>
          </van-cell-group>
        </div>
        <div class="team-item">
          <van-cell-group>
            <div class="content-title">{{ $t('lang.teamOverview.agentTotal') }}</div>
            <van-cell :title="$t('lang.AccountDetail.agentRebate')" title-style="font-weight:500"
                      :value="teamData.dlRebate.toFixed(2)"/>
            <van-cell :title="$t('lang.teamOverview.agencyDividend')" :value="teamData.dlBonuus.toFixed(2)"/>
            <van-cell :title="$t('lang.NoteHistory.AmountWinningLosing')"
                      :value="teamData.liveBetReport.winOrcloseMoney.toFixed(2)"/>
          </van-cell-group>
        </div>
      </div>
      <div class="dialog">
        <!-- 日期选择器-->
        <van-popup
                v-model="timeShow"
                position="top"
                :style="{ height: '100%' }"
                :overlay-style="{backgroundColor:'rgba(0,0,0,.3)'}"
        >
          <div class="popup_body">
            <div class="inner">
              <DatePicker
                      :btnDanger="btnDanger"
                      :btnDefault="btnDefault"
                      :btnDefault1="btnDefault1"
                      :showPickerStart="showPickerStart"
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
  </div>
</template>

<script>
import Header from '@/commons/header/Header'
import utils from "../../utils/utils";
import NotData from "../../commons/notdata/NotData";
import DatePicker from '@/commons/datePicker/DatePicker'
import {mapState} from 'vuex'
export default {
  name: "TeamOverView",
  components: {
    Header,
    NotData,
    DatePicker
  },
  data() {
    return {
      headObj: {
        title: 'lang.daiLiZhongXin.teamOverview',
        showArrow: true,
        iconName:' iconrili'
      },
      params: {
        userId: this.$store.state.userInformation.id,
        beginDate: '',
        endDate: '',
      },
      teamData: {},
      isNotData: false,
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
      startTime: new Date(utils.dayStartTime(Date.now() - 3600 * 1000 * 24 * 8)),
      endTime: new Date(utils.dayEndTime(Date.now() - 3600 * 1000 * 24)),
      startTime1: new Date(),
      endTime1: new Date(),
      startTime2: new Date(),
      endTime2: new Date(),
      data: [],
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
    }
  },
  async created() {
    const countData = await this.getUserTeamOverDate(utils.dateFormat(new Date(), 2), utils.dateFormat(new Date(), 2))
    console.log(countData)
    if (countData.code === 200) {
      console.log('aaa')
      this.teamData = countData.data

    }
  },
  methods: {
    async getUserTeamOverDate(beginDate, endDate) {
      this.params.userId = this.userInformation.id;
      this.params.beginDate = beginDate + ' 00:00:00'
      this.params.endDate = endDate + ' 23:59:59'
      return new Promise((resolve, reject) => {
        this.$http.account.queryTeamOverView(this.params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // picker确定开始时间判断
    handlePickStartSure(val) {
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
    async restTime() {
      this.teamData = {}
      console.log(this.startTime.toLocaleDateString().replace(/\//g, '-'));
      let beginDate = this.startTime.toLocaleDateString().replace(/\//g, '-')
      let endDate = this.endTime.toLocaleDateString().replace(/\//g, '-')
      console.log(beginDate, endDate);
      const countData = await this.getUserTeamOverDate(beginDate, endDate)
      if (countData.code === 200) {
        this.teamData = countData.data
      }
    },
    handleSure() {
      this.timeShow = false
      this.restTime()
    },
    changeType(item) {
      this.tranType = item.key
      const data = {
        beginDate: this.startTime.toLocaleDateString().replace(/\//g, '-'),
        endDate: this.endTime.toLocaleDateString().replace(/\//g, '-'),
        page: 1,
        rows: 20,
        tranType: this.tranType
      }
      this.$http.account.queryPageBill(data).then((res, err) => {
        this.data = res.data
      }).catch((err) => {
        console.warn(err)
      })
      this.showMask = false
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
    }
  },
  computed:{
    ...mapState([
      'userInformation'
    ]),
  },
  filters: {
    formatDate(val) {
      return utils.dateFormat(val)
    }
  }
}
</script>

<style lang="scss" scoped>
  .team-over-view-box{
    height:100%;
    display: flex;
    flex-direction: column;
    .contentHidden{
      flex:1;
      overflow-y: scroll;
    }
    .content-title{
      font-size: px2rem(14px);
      height:px2rem(40px);
      display: flex;
      align-items: center;
      padding:0 px2rem(16px);
    }
    .van-cell,.netProfit{
      padding:px2rem(13px) px2rem(16px);
      font-size: px2rem(15px);
      color:#fff;
    }
    .van-cell__value{
      color:#fff;
    }

    .netProfit{
      display: flex;
      justify-content: space-between;
     /* span:last-child{
        color:red;
      }*/
    }
    .team-item{
      margin-bottom: px2rem(15px);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

  }

  .skin-gray{
    .team-over-view-box{
      /deep/ .van-cell-group,
      /deep/ .van-cell{
        background: $skin-gray-con-bg;
      }
      .content-title{
        color:$skin-gray-text-color;

      }
    }
  }

  .skin-black{
    .team-over-view-box{
      /deep/ .van-cell-group,
      /deep/ .van-cell{
        background: $skin-black-con-bg;
      }
      .content-title{
        color:$skin-black-text-color;

      }
    }
  }

</style>
