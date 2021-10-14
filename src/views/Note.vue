<template>
  <div class="tian-content">
    <div class="tab-head">
      <i class="go-back iconfont iconic-left"
         @click="$router.back(-1)"></i>
      <div>
        <template v-for="(v, i) in tabList">
          <span @click="tabClick(i)"
                :class="[tabActive == i ? 'active' : '']"
                :key="i">
            {{ $t(v) }}
          </span>
        </template>
      </div>
      <i class="icon iconfont iconlishi"
         @click="noteClick(tabActive)"
         :style="tabActive===0?'right:0.8rem':'right:0.3rem'"></i>
      <i v-if="tabActive===0"
         class="icon iconfont iconic-filter"
         @click="getSelect"
         style="right:0.35rem;"></i>
    </div>
    <GameNote
            :timeShow="timeShow"
            :startTime="startTime"
            :endTime="endTime"
            @showGameDel="showGameDel"
            v-if="Number(tabActive) === 1"/>
    <LotteryNote :timeShow="timeShow"
                 :gameId="gameId"
                 :listData="listData"
                 :startTime="startTime"
                 :endTime="endTime"
                 @showCpDel="showCpDel(arguments)"
                 v-else/>
    <!--    <div class="footer-padd"></div>-->
    <!--    <Footer :actived="active"/>-->
    <!--时间选择弹窗-->
    <van-popup v-model="timeShow"
               position="top"
               class="mod-popup-box"
               :style="{ height: '100%' }"
               :overlay-style="{ backgroundColor: 'rgba(0,0,0,.3)' }">
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
                  @emitEndtime="handleEmitEnd"/>
        </div>
      </div>
    </van-popup>
    <!--彩种选择弹窗-->
    <transition name="van-slide-up">
      <LotteryPicker
              :value="value"
              :VList="VList"
              @leftClick="isSelect = false"
              @confirm="confirm"
              @reset="reset"
              @btnClick="btnClick"
              :columns="columns"
              v-if="isSelect"/>
    </transition>

    <!--彩票订单详情-->
    <transition name="van-slide-up">
      <LotteryNoteDel
          @hideCpDel="cpDelShow = false"
          v-if="cpDelShow"
          :cpDataDel="cpDataDel"
          :cpDataGame="cpDataGame"
          :listData="listData"
      />
    </transition>
    <!--游戏订单详情-->
    <transition name="van-slide-up">
      <GameNoteDel @hideGameDel="gameDelShow = false"
                   v-if="gameDelShow"
                   :gameDataDel="gameDataDel"
                   :listData="listData"/>
    </transition>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {LANG} from "../utils/mode";
  import DatePicker from '../commons/datePicker/DatePicker'
  import utils from '../utils/utils'
  import GameNote from './note/GameNote'
  import Footer from '../commons/footer/Footer'
  import LotteryNote from './note/LotteryNote'
  import LotteryNoteDel from './note/LotteryNoteDel'
  import GameNoteDel from './note/GameNoteDel'
  import LotteryPicker from './note/LotteryPicker'

  export default {
    name: 'Note',
    computed: {
      ...mapState([
        'lang'
      ])
    },
    components: {
      Footer,
      GameNote,
      DatePicker,
      LotteryNote,
      LotteryNoteDel,
      LotteryPicker,
      GameNoteDel
    },
    data() {
      return {
        active: 3,
        cpDelShow: false,
        cpDataDel: {},
        cpDataGame: {},
        gameDelShow: false,
        gameDataDel: {},
        listData: {},
        columns: [],
        showSet: false,
        tabList: ['lang.loginContent.lottery', 'lang.header.electronic'],
        tabActive: 0,
        isSelect: false,
        value: [this.$t('lang.RechargeData.All'), this.$t('lang.RechargeData.All')],
        VList: [0, 0],
        gameId: 0,
        // 时间控件
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
          utils.dayStartTime(Date.now() - 3600 * 1000 * 24 * 8)
        ),
        endTime: new Date(utils.dayEndTime(Date.now())),
        startTime1: new Date(),
        endTime1: new Date(),
        startTime2: new Date(),
        endTime2: new Date()
      }
    },
    created() {

      const listData = {}
      let list = []
      if (!sessionStorage.getItem('LotteryTypeList')) {
        this.$http.home.getCpGame().then((res) => {
          list = res.data
          list.forEach((element) => {
            listData[element.id] = element
          })
          this.getPicker(list)
          this.listData = listData
          sessionStorage.setItem('LotteryTypeList', JSON.stringify(res.data))
        })
      } else {
        console.log(list, 99999)
        list = JSON.parse(sessionStorage.getItem('LotteryTypeList'))
        list.forEach((element) => {
          listData[element.id] = element
        })
        this.getPicker(list)
        this.listData = listData
      }
    },
    methods: {
    /*  reset() {
        this.value = 'lang.RechargeData.All'
        this.VList = [0, 0]
      },*/
      reset() {
        this.value = [this.$t('lang.RechargeData.All'), this.$t('lang.RechargeData.All')]
        this.VList = [0, 0]
      },
      btnClick() {
        const i = this.VList
        this.gameId = this.columns[i[0]].children[i[1]].gameId
      },
      confirm(v, i) {
        this.value = v
        this.VList = i
      },
      getPicker(list) {
        let typeList = null;
        if (LANG.china === this.lang) {
          typeList = [
            {
              text: '全部',
              children: [{text: '全部', gameId: 0}]
            },
            {
              text: '六合彩',
              children: []
            },
            {
              text: '低频彩',
              children: []
            },
            {
              text: '时时彩',
              children: []
            },
            {
              text: 'PK拾',
              children: []
            },
            {
              text: '11选5',
              children: []
            },
            {
              text: '快乐彩',
              children: []
            },
            {
              text: '快三',
              children: []
            },
            {
              text: 'PC蛋蛋',
              children: []
            }
          ]
        } else {
          typeList = [
            {
              text: 'All',
              children: [{text: 'All', gameId: 0}]
            },
            {
              text: 'LHC',
              children: []
            },
            {
              text: 'FC3D',
              children: []
            },
            {
              text: 'SSC',
              children: []
            },
            {
              text: 'PK10',
              children: []
            },
            {
              text: '11x5',
              children: []
            },
            {
              text: 'KL8',
              children: []
            },
            {
              text: 'K3',
              children: []
            },
            {
              text: 'PCDD',
              children: []
            }
          ]
        }
        list.forEach((item, index) => {
          switch (item.cate) {
            case 0:
              typeList[1].children.push({text: item.name, gameId: item.id})
              break
            case 1:
              typeList[2].children.push({text: item.name, gameId: item.id})
              break
            case 2:
              typeList[3].children.push({text: item.name, gameId: item.id})
              break
            case 3:
              typeList[4].children.push({text: item.name, gameId: item.id})
              break
            case 4:
              typeList[5].children.push({text: item.name, gameId: item.id})
              break
            case 5:
              typeList[6].children.push({text: item.name, gameId: item.id})
              break
            case 6:
              typeList[7].children.push({text: item.name, gameId: item.id})
              break
            case 7:
              typeList[8].children.push({text: item.name, gameId: item.id})
              break
            default:
              break
          }
        })
        // this.columns = typeList
        this.columns = typeList.filter(type => {
          return (type.children.length > 0)
        })
        console.log(typeList, 'columns9999999999')
      },
      showCpDel(item) {
        this.cpDelShow = true
        this.cpDataDel = item[0]
        this.cpDataGame = item[1]
        // this.gameType = item[1]
      },
      showGameDel(item) {
        this.gameDelShow = true
        this.gameDataDel = item
      },
      noteClick(i) {
        if (i === 1) {
          this.timeShow = true
        } else {
          this.$router.push('/noteHistory')
        }
      },
      getSelect() {
        this.isSelect = true
      },
      tabClick(i) {
        this.tabActive = i
      },
      // picker确定开始时间判断
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
      // picker确定结束时间判断
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
      // 弹层取消-开始
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
      // 弹层取消-结束
      handleEndCancel() {
        this.endTime = new Date(
          utils.dayStartTime(Date.now() - 3600 * 1000 * 24)
        )
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
      handleSure() {
        this.timeShow = false
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
      }
    }
  }
</script>
<style lang="scss" scoped>
  .tian-content {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;

    .tab-head {
      display: flex;
      width: 100%;
      /*background: $global-bgcolor;*/
      height: px2rem(45px);
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.3rem;
      font-size: 0.36rem;
      color: #fff;
      .go-back {
        position: absolute;
        left: px2rem(15px);
        font-size: px2rem(14px);
      }
      div {
        flex: 1;
        justify-content: center;
        display: flex;
      }

      i {
        font-size: 0.4rem;
      }

      .fs-48 {
        font-size: 0.48rem;
      }

      span {
        /*width: 0.8rem;*/
        padding: 0.06rem 0;
        margin: 0 0.4rem;
        opacity: 0.6;
        text-align: center;
      }

      .active {
        opacity: 1;
        border-bottom: 2px solid #fff;
      }

      i {
        margin-left: 5px;
        position: absolute;
        font-size: 0.36rem;
        color: #fff;
      }
    }

    .footer-padd {
      height: 1.7rem;
    }
  }
</style>
