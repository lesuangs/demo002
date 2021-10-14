<template>
  <div class="balance balance-change-box">
    <Header :headObj="headObj" @leftClick="$router.push('/user')" @rightClick="timeShow=!timeShow"/>
    <van-popup
            v-model="timeShow"
            position="top"
            :style="{ height: '100%' }"
            :overlay-style="{ backgroundColor: 'rgba(0,0,0,.3)' }" />
    <div class="body">
<!--      <DatePicker
//此处时间选择器功能还没做好
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
      />-->
      <van-tabs
          v-model="active"
          @click="handleTab"
          animated
          title-active-color="#c00"
          line-width="120px"
          title-class="tab-header"

      >
        <van-tab v-for="v in tabList" :title="$t(v.text)" :key="v.id">
          <div class="g-content" :style="contentHight">
            <ChangeList @showDel="showDel" v-show="tabIdx !== 0"/>
            <div v-show="tabIdx === 0" class="balance">
              <ChangeBalance
                  :transferIn="transferIn"
                  :transferOut="transferOut"
                  :outValue="$t(outValue)"
                  :inValue="$t(inValue)"
                  :inCode="$t(inCode)"
                  :outCode="$t(outCode)"
                  :gameList="gameList"
                  @getMoney="getTotalBalanceFn"
                  @getGameList="getGameList"
                  @getAllMoney="getAllMoney"
                  @showOverlay="handleOverlay"
              />
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <van-popup
              v-model="isShowOverlay"
              position="right"
              :style="{ height: '100%' ,width:'100%'}">
        <div class="quotaBox">
          <Header :headObj="{...headObj, rightText:$t('lang.BalanceChange.refresh')}" @leftClick="isShowOverlay=false" />
          <div class="quotoWrap">
            <ul v-if="allGame.length>0">
              <li :class="activeIndex === i ? 'active' : ''"
                  v-for="(v,i) in allGame" :key="i"  @click="selectGame(v,i),isShowOverlay=false">
                <em class="iconfont iconxuanzhong" v-if="activeIndex === i"></em>
                <em class="iconfont iconweixuanzhong " v-else></em>
                <h1>{{v.name}}</h1>
                <p>
                  <span>{{v.money ? Number(v.money).toFixed(2) : '00.00'}}</span>
                  <!-- <i class="iconfont iconic-refresch" @click="i>0 && getTotalBalanceFn(v)"></i> -->
                </p>
              </li>
            </ul>
          </div>
        </div>


      </van-popup>
    </div>
    <van-action-sheet v-model="isDel" :title="$t('lang.common.title')" class="balance-popup">
      <van-icon @click="isDel=!isDel" name="arrow-left"/>
      <div class="cheader">{{$t('lang.BalanceChange.changeDetails')}}</div>
      <div class="ccontent">
        <div>
          <span>{{$t('lang.AccountDetail.transactionType')}}</span>
          <span>{{ $t(searchName(delInfo.tranType)) }}</span>
        </div>
        <div>
          <span>{{$t('lang.AccountDetail.orderNum')}}</span>
          <span>{{ delInfo.orderNo }}</span>
        </div>
        <div>
          <span>{{$t('lang.AccountDetail.changeMoney')}}</span>
          <span :style="delInfo.money > 0 ? 'color: red;':'color:RGB(89,174,89);'">{{ delInfo.money }}{{$t('lang.common.yuan')}}</span>
        </div>
        <div>
          <span>{{$t('lang.AccountDetail.dealTime')}}</span>
          <span>{{ delInfo.createTime }}</span>
        </div>
        <div>
          <span>{{$t('lang.AccountDetail.remarks')}}</span>
          <span></span>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import Header from "../commons/header/Header";
import ChangeBalance from "../views/ChangeBalance";
import ChangeList from "../views/ChangeList";
import {mapActions,mapState,mapGetters} from 'vuex';
import axios from "../http";
import {API} from "../api/api_list";
import qs from 'querystring'
import {_dealGames} from "../utils/public";
import utils from "../utils/utils";
import DatePicker from '@/commons/datePicker/DatePicker'
export default {
  name: "BalanceChange",
  components: {
    Header,
    ChangeBalance,
    ChangeList,
    DatePicker
  },
  data() {
    return {
      headObj: {
        title: "lang.user.quotaConversion",
        showArrow: true,
        // iconName:' iconrili'
      },
      timeShow: false,
      active: 0,
      tabList: [
        {id: 0, text: "lang.BalanceChange.ConversionAmount"},
        {id: 1, text: "lang.BalanceChange.ConversionRecord"},
      ],
      tabIdx: 0,
      gameList: [
        {
          id: 0,
          title: this.$t('lang.common.AccountBalance'),
          money: "0.000",
          code: "self",
        },
      ],
      columns: [],
      isShowOverlay: false,
      title: "",
      transferIn: {},
      transferOut: {},
      cellType: "",
      outValue: "lang.BalanceChange.ChooseOutPlatform",
      inValue: "lang.BalanceChange.ChoosePlatform",
      contentHight: "",
      outCode: "",
      inCode: "",
      isDel: false,
      delInfo: {},
      allGame:[],
      activeIndex:-1,
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
      endTime2: new Date(),
      liData: [{value: 'lang.RechargeData.All', key: ''}, {
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
    };
  },
  created() {
    this.getHeight();
    this.getGameList();

    // this.getAllLiveGame();
    console.log(this.allLiveGame,'allLiveGameallLiveGame');
  },
  computed: {
    ...mapGetters(['userInfo', 'testInfo']),
    ...mapState([
      'allLiveGame',
      'userInformation',
      'balance'
    ]),
    usersInfo() {
      return this.userInformation
    },
  },
  methods: {
    ...mapActions([
      'getAllLiveGame',//第三方游戏
    ]),
    getTotalBalanceFn(item){
      let params = {
        platform:item.code,
        username:this.usersInfo.account
      };
      // axios.post(API.GET_TOTAL_BALANCE).then((params) => {
      //   // console.log(this.columns,'gggggg');
      //
      // }).catch(err => {
      //   console.log(err);
      // })
      axios.post(API.GET_TOTAL_BALANCE,qs.stringify(params)).then((res) => {
        // this.allBalance = res.data;
        // console.log(this.allBalance,'fsdafsdfdsfsdf')
      }).catch((err) => {
      })
    },
    showDel(isDel, item) {
      this.delInfo = item
      this.isDel = isDel
    },
    searchName(value) {
      for (let i = 0; i < this.liData.length; i++) {
        const item = this.liData[i]
        if (value === item.key) {
          return item.value
        }
      }
    },
    getHeight() {
      let a = document.documentElement.clientHeight;
      this.contentHight = `height:${(Number(a)-100)}px`;
      // console.log(a,this.contentHight ,222222);
      //      height: 13rem;
    //   if (a === 823) {
    //     this.contentHight = "height:14.7rem";
    //   } else if (a === 812) {
    //     this.contentHight = "height:15.9rem";
    //   } else if (a === 1024) {
    //     this.contentHight = "height:10rem";
    //   } else if (a === 1366) {
    //     this.contentHight = "height:13.3rem";
    //   } else if (a === 600) {
    //     this.contentHight = "height:9.8rem";
    //   } else if (a === 653) {
    //     this.contentHight = "height:17.2rem";
    //   } else {
    //     this.contentHight = "height:13rem";
    //   }
    },
    selectGame(v,i){
      // console.log(v,'vvvvvvv')
        this.activeIndex = i;
        if(this.activeIndex >= 0){
          if (this.cellType === "out") {
            this.outValue = `${v.name} ${Number(v.money).toFixed(2)}`;
            this.outCode = v.code;
          }
          if (this.cellType === "in") {
            this.inValue = `${v.name} ${v.money}`;
            this.inCode = v.code;
          }
        }

      // console.log(this.cellType,v,'qqqqqqqqqq');
    },
    getGameList() {
      this.outValue = "lang.BalanceChange.ChooseOutPlatform",
          this.inValue = "lang.BalanceChange.ChoosePlatform",
          this.gameList = [
            {
              id: 0,
              title: this.$t('lang.common.AccountBalance'),
              money: "0.000",
              code: "self",
            },
          ]
      this.columns = []
      this.$http.home.getGameMoney().then((rep) => {
        this.allGame = rep.data;
        console.log(this.usersInfo,'this.usersInfo2222222');
        // let a = [];
        let a = {
          name:'我的钱包',
          code: "self",
          // name:this.usersInfo.account,
          money:this.balance
        };
        this.allGame.unshift(a);
        rep.data.map((item, idx) => {
          // console.log(item,idx,'bbbb')
          let params = {
            platform:item.code,
            username:this.usersInfo.account
          };
          axios.post(API.GET_TOTAL_BALANCE,qs.stringify(params)).then((res) => {
            // this.allBalance = res.data;

            this.allGame[idx].money = res.data.data.balance;
            if(res.data.code === 200){
            }
            // console.log(res.data,111);
            // console.log(a,'fsdafsdfdsfsdf');
          }).catch((err) => {
          })
        });

        // console.log(this.allGame,'pppppppp');




        // this.gameList = this.gameList.concat(
        //     rep.data.map((item, idx) => {
        //       return {
        //         code: item.code,
        //         title: item.name + ' '+this.$t('lang.common.Balance'),
        //         money: "0.000",
        //         id: idx + 1,
        //       };
        //     })
        // );
        //
        // this.columns = this.columns.concat(
        //     this.gameList.map((item, idx) => {
        //       return {
        //         code: item.code,
        //         text: `${item.title}--${item.money}`,
        //         id: idx,
        //       };
        //     })
        // );
        this.gameList.map((item, idx) => {
          // console.log(item,'aaaaaaaaa')
          // this.getMoney(item);
          this.getTotalBalanceFn(item);
          // console.log(this.allBalance,'pppppppp');
        });

      });
    },
    //刷新
    // getMoney(item) {
    //   this.$http.home.getBalance({liveCode: item.code}).then((rep) => {
    //     const list = JSON.parse(JSON.stringify(this.gameList));
    //     const columnsList = JSON.parse(JSON.stringify(this.columns))
    //     list[item.id].money = rep.data;
    //     columnsList[item.id].text = list[item.id].title + '-' + rep.data;
    //     this.gameList = list;
    //     this.columns = columnsList
    //   });
    // },
    //归还余额
    getAllMoney() {
      this.$toast.loading(this.$t('lang.common.returning'))
      // this.$http.users.getMoney().then((res) => {
      //   this.$toast.success(this.$t('lang.common.successfulReturn'))
      //   this.gameList.map((item, idx) => {
      //     this.getMoney(item);
      //   });
      // });
    },
    handleTab(idx) {
      this.tabIdx = idx;
    },
    handleOverlay(type) {
      this.cellType = type;
      this.isShowOverlay = true;
      // this.activeIndex= -1;
      this.title = type === "out" ? this.$t('lang.BalanceChange.platformTransferOut') :  this.$t('lang.BalanceChange.platformTransfer');
    },
    onConfirm(value) {
      if (this.cellType === "out") {
        this.transferOut = value;
        this.outValue = value.text;
        this.outCode = value.code;
      }
      if (this.cellType === "in") {
        this.transferIn = value;
        this.inValue = value.text;
        this.inCode = value.code;
      }
      this.isShowOverlay = false;
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
  },
};
</script>

<style lang="scss" scoped>
  .balance-change-box{
    /deep/.van-tab--active{
      .van-tab__text{
        background: none !important;
        border:0 !important;
      }
    }
    .ccontent{

      div{
        span{
          flex:1;
          display: flex;
          align-items: center;
          line-height: 25px;
          word-break: break-all;
          &:last-child{
            flex:2;
          }
        }
      }
    }
    .balance-popup{
      max-height: 100%;
      top:0;
    }
    /deep/.van-tab{
      font-size: px2rem(16px);
    }
    .g-content{
      /*flex:1;*/
      /*height:616px;*/
      overflow-y: scroll;
      /*border:1px red solid;*/
      /*padding-bottom: 20px;*/
    }
    .g-content,.g-box{
      background: none !important;
    }
    /deep/.van-tabs__content{
      /*height:100%;*/
      /*border:2px red solid;*/
    }
    .quotaBox{
      height:100%;
      display: flex;
      flex-direction: column;
      .quotoWrap{
        flex:1;
        overflow-y: scroll;
      }
      ul{
        display: flex;
        flex-wrap:wrap;
        background: $skin-gray-bg;
        padding:px2rem(5px);
        li{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          min-height: px2rem(100px);
          width:30%;
          margin:px2rem(6px);
          border-radius: px2rem(10px);
          padding:px2rem(10px);
          color:#fff;
          background: $skin-gray-con-bg;
          border-width:px2rem(3px);
          &.active{
            border: solid px2rem(3px) #bdbbe8;
            background-color: #5b5974;
            em{
              background-image: linear-gradient(to right,#FFEAC0,#FFD681);
              -webkit-background-clip:text;
              color:transparent;
            }
          }
          em{
            color:#66647A;
            font-size: px2rem(20px);
          }
          h1{
            font-size: px2rem(14px);
          }
          p{
            span{
              font-size: px2rem(16px);
              margin-right: px2rem(5px);
            }
          }
        }
      }
    }

  }
  .skin-gray{
    .balance-change-box{
      &,/deep/.van-popup{
        background: $skin-gray-bg;
      }
      /deep/.van-tab,
      /deep/ .van-cell,
      /deep/ .amount .notice,
      .ccontent div{
        background: $skin-gray-con-bg;
      }

      /deep/ .van-cell,
      /deep/ .amount .notice,
      /deep/ .amount .notice i{
        color:$skin-gray-text-sub-color;
      }
      /deep/.van-tab{
        color:$skin-gray-label-color;
      }
      /deep/ .van-tab--active {
        border-bottom: solid 0.04rem #DEBB96;
        span {
          color: #fff;
        }
      }
      .ccontent div{
        @include border-1px($skin-gray-border-color)
      }
      .quotaBox{
        ul{
          background: $skin-gray-bg;
          li{
            background: $skin-gray-con-bg;
          }
        }
      }
    }
  }

  .skin-black{
    .balance-change-box{
      &,/deep/.van-popup{
        background: $skin-black-bg;
      }
      /deep/.van-tab,
      /deep/ .van-cell,
      /deep/ .amount .notice,
      .ccontent div{
        background: $skin-black-con-bg;
      }
      /deep/ .van-cell,
      /deep/ .amount .notice,
      /deep/ .amount .notice,
      /deep/ .amount .notice i{
        color:$skin-black-placeholder-color;
      }
      /deep/.van-tab{
        color:$skin-black-label-color;
      }
      /deep/ .van-tab--active {
        border-bottom: solid 0.04rem #DEBB96;
        span {
          color: #fff;
        }
      }
      .ccontent div{
        @include border-1px($skin-black-border-color)
      }
      .quotaBox{
        ul{
          background: $skin-black-bg;
          li{
            background: $skin-black-con-bg;
          }
        }
      }
    }
  }

/*::v-deep.van-action-sheet {*/
/*  height: 100% !important;*/
/*  max-height: 100% !important;*/
/*}*/

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

/*::v-deep.van-action-sheet__content {*/
/*  height: 100%*/
/*}*/

.cheader {
  height: .9rem;
  //background: linear-gradient(151deg, #65317d -12%, #293384 126%) !important;
  text-align: center;
  line-height: .9rem;
  color: white;
  font-size: 16px
}

.ccontent {
  /*height: 100%;*/
  //background: #efeff4;

  > div {
    min-height: 1rem;
    /*background: #24252D;*/
    line-height: 1rem;
    padding: 0 .3rem;
    font-size: .32rem;
    font-weight: 540;
    /*margin-top: 1px;*/
    display: flex;
    /*border-bottom: 1px #393940 solid;*/

    span:first-child {
      /*width: 100px;*/
      color:#8f8f8f;
      /*flex:1;*/
      /*margin-right: 0.1rem;*/
    }

    span:last-child {
      color:#fff;
      /*flex:1;*/
    }
  }
}

.balance {
  .body {
    /*height: calc(100% + 1px);*/
    /*overflow: auto;*/

    .g-content {
      /*flex: 2;*/
      /*overflow-y: scroll;*/
      /*padding-bottom: 1.5rem;*/
      /*background-color: #191b1f;*/
      /*display: flex;*/
      /*flex-direction: column;*/
      /*justify-content: center;*/
      /*align-items: center;*/
      /*border:1px red solid;*/

      .no-data {
        .text {
          font-size: 0.28rem;
          margin-top: 0.8rem;
          text-align: center;
        }
      }

      .van-tab--active {
        span {
          background: transparent !important;
        }

      }

      /*.balance {*/
      /*  width: 100%;*/
      /*  height: 100%;*/
      /*}*/
    }
  }
}
</style>
