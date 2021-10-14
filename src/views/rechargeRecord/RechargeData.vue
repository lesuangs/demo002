<template>
  <div class="ty-content recharge-data-box">
    <div class="tab-nav-box">
      <ul>
        <li v-for="(v, i) in dzList" :key="i"
            :class="[gameTabActive == i ? 'active' : '']"
            @click="getPageData(i)">
          <span>{{ $t(v) }}</span>
        </li>
      </ul>
    </div>
<!--    <div class="game-tab">-->
<!--      <template v-for="(v, i) in dzList">-->
<!--        <div v-if=" i!==1"-->
<!--            :key="i"-->
<!--            :class="[gameTabActive == i ? 'active' : '']"-->
<!--            @click="getPageData(i)">-->
<!--          <span>{{ $t(v) }}</span>-->
<!--        </div>-->
<!--      </template>-->
<!--    </div>-->
    <div class="a-content"
         v-if="rechargList.length > 0">
      <vue-better-scroll
          class="wrapper"
          ref="Nscroll"
          :scrollbar="scrollbarObj"
          :pullDownRefresh="pullDownRefreshObj"
          :pullUpLoad="pullUpLoadObj"
          :startY="parseInt(startY)"
          @pulling-down="onPullingDown"
          @pulling-up="onPullingUp">
        <div class="a-list">
          <template v-for="(v, i) in rechargList">
            <div class="mod-list-item" :key="i" @click="toDialog(v)">
              <div class="top">
                <h1>{{formatStatus(v.status)}}</h1>
                <span :class="v.status === 3 ? 'red' : (v.status === 4 ? 'green': '')">
                  {{v.status === 3 ? '+' : ''}}{{ v.amount.toFixed(2) }}
                </span>
              </div>
              <div class="bottom">
                <span>{{ v.addTime }}</span>
<!--                <span v-if="v.status === 3">-->
<!--                  {{$t('lang.common.Balance')}}：{{ (v.userBalance + v.totalAmount).toFixed(2) }}</span>-->
<!--                <span v-else>{{$t('lang.common.Balance')}}：{{ (v.userBalance).toFixed(2) }}</span>-->
                <span v-if="v.status === 3">
                   {{$t('lang.common.Balance')}}：
                  <i class="user-money">{{ v.userBalance == null ? '0' : format_number(v.userBalance + v.totalAmount).split('.')[0] }}</i><em class="money-point">{{ v.userBalance == null ? '.00' :'.'+format_number(v.userBalance + v.totalAmount).split('.')[1] }}</em>
                </span>
                <span v-else>
                   {{$t('lang.common.Balance')}}：
                  <i class="user-money">{{ v.userBalance == null ? '0' : format_number(v.userBalance).split('.')[0] }}</i><em class="money-point">{{ v.userBalance == null ? '.00' :'.'+format_number(v.userBalance).split('.')[1] }}</em>
                </span>
              </div>
            </div>
          </template>
        </div>
      </vue-better-scroll>
    </div>
    <NotData v-else :isNotData="isNotData"/>
    <van-action-sheet v-model="dialogshow" :title="$t('lang.common.title')">
      <van-icon @click="dialogshow=!dialogshow" name="arrow-left"/>
      <div class="cheader">{{$t('lang.RechargeData.rechargeDetail')}}</div>
      <div class="ccontent">
        <div>
          <span>{{$t('lang.RechargeData.topUpMode')}}</span>
          <span>{{ formatOrderModel(currentData.mode) }}</span>
        </div>
        <div>
          <span>{{$t('lang.RechargeData.paymentTypes')}}</span>
          <span>{{ currentData.payTypeName }}</span>
        </div>
        <div>
          <span>{{$t('lang.RechargeData.orderNo')}}</span>
          <span>{{ currentData.orderNo }}</span>
        </div>
        <div>
          <span>{{$t('lang.RechargeData.rechargeStatus')}}</span>
<!--          <span-->
<!--              style="color: red;">{{-->
<!--              (currentData.mode === 2 && currentData.status === 1) ? $t('lang.state.unpaid'): rechargeStatus[currentData.status]-->
<!--            }}</span>-->
          <span :class="currentData.status === 3 ? 'red':''"> {{formatStatus(currentData.status)}}</span>
        </div>
        <div>
          <span>{{$t('lang.RechargeData.rechargeAmount')}}</span>
          <span>{{ currentData.amount && currentData.amount.toFixed(2) }}{{$t('lang.common.yuan')}}</span>
        </div>
        <div>
          <span>{{$t('lang.RechargeData.discountedPrice')}}</span>
          <span>{{ currentData.discountAmount && currentData.discountAmount.toFixed(2) }}{{$t('lang.common.yuan')}}</span>
        </div>
        <div>
          <span>{{$t('lang.RechargeData.totalRechargeAmount')}}</span>
          <span>{{ currentData.totalAmount && currentData.totalAmount.toFixed(2) }}{{$t('lang.common.yuan')}}</span>
        </div>
        <div>
          <span>{{$t('lang.RechargeData.offerType')}}</span>
          <span>{{discountTypeMap[currentData.discountType] ? discountTypeMap[currentData.discountType] : $t('lang.RechargeData.rechargeType[0]') }}</span>
        </div>
        <div>
          <span>{{$t('lang.RechargeData.orderTime')}}</span>
          <span>{{ currentData.addTime }}</span>
        </div>
        <div>
          <span>{{ currentData.status == 4 ? $t('lang.RechargeData.cancellationTime') : $t('lang.RechargeData.depositTime') }}</span>
          <span>{{ currentData.auditTime }}</span>
        </div>
        <div>
          <span>{{$t('lang.common.remark')}}</span>
          <span>{{ currentData.auditRemarks ? currentData.auditRemarks : currentData.remarks }}</span>
        </div>

      </div>
    </van-action-sheet>
  </div>
</template>
<script>
import NotData from '../../commons/notdata/NotData'
import VueBetterScroll from '../../commons/scroll/BScroll'
import utils from "../../utils/utils";
import {mapGetters, mapState} from "vuex";
export default {
  name: 'RechargeData',
  components: {
    NotData,
    VueBetterScroll
  },
  props: {
    startTime: Date,
    endTime: Date,
    timeShow: Boolean
  },
  computed: {
    ...mapGetters({
      format_number: '_format_number',
    }),
  },
  data() {
    return {
      // dzList: [],
      dzList: [
        'lang.RechargeData.All',
        'lang.RechargeData.noAccept',
        'lang.RechargeData.Accepting',
        'lang.RechargeData.topUpSuccessfully',
        'lang.RechargeData.rechargeFailed'
      ],
      dialogshow: false,
      discountTypeMap: [],
      orderModel: {1: '转账汇款', 2: '在线支付', 3: '人工充值', 4: '人工充值(非正常入款)'},
      rechargeStatus: {1: '未受理', 2: '受理中', 3: '已入款', 4: '已取消', 5: '待支付'},
      currentData: {},
      rechargList: [],
      gameDataDel: {},
      isNotData: true,
      show: false,
      // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
      scrollbarObj: {
        fade: true
      },
      // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
      pullDownRefreshObj: {
        threshold: 90,
        stop: 40
      },
      // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: this.$t('lang.BScroll.jiaZaiGengDuo'),
          noMore: this.$t('lang.BScroll.meiYouGengDuo')
        }
      },
      startY: 0, // 纵轴方向初始化位置
      gameTabActive: 0,
      page: 1,
      params: {},
      totalCount: ''
    }
  },
  created() {
    this.$http.account.queryDiscountTypeList().then(res => {
      //充值类型，不要注释
      res.data.forEach(item => {
        this.discountTypeMap[item.value] = item.name
      })
    }).catch(err => {
      console.log(err);
    })

    this.getGame()
    // this.gameTabActive = 0
    console.log(this.startTime);
  },
  methods: {
    formatOrderModel(val){
      switch (val) {
        //{1: '转账汇款', 2: '在线支付', 3: '人工充值', 4: '人工充值(非正常入款)'},
        case 1: return this.$t('lang.RechargeData.orderModel[0]')
        case 2: return this.$t('lang.RechargeData.orderModel[1]')
        case 3: return this.$t('lang.RechargeData.orderModel[2]')
        case 4: return this.$t('lang.RechargeData.orderModel[3]')
      }
    },
    formatStatus(val){
      switch (val) {
        /*case 1: return '未受理'
        case 2: return '受理中'
        case 3: return '已入款'
        case 4: return '已取消'*/
        case 1: return this.$t('lang.state.pending')
        case 2: return this.$t('lang.state.processing')
        case 3: return this.$t('lang.state.paidIn')
        case 4: return this.$t('lang.state.canceled')
      }
    },
    toDialog(value) {
      this.dialogshow = !this.dialogshow
      this.currentData = value
    },
    // 下拉刷新
    onPullingDown() {
      console.log('11111')
      setTimeout(() => {
        this.page++
        this.common(this.gameTabActive)
      }, 500)
    },
    // 上拉 加载更多数据
    onPullingUp() {
      setTimeout(() => {
        this.page++
        this.common(this.gameTabActive)
      }, 500)
    },
    getGame(i = 0) {
      console.log(i);
      console.log(this.startTime, this.endTime);
      this.gameTabActive = i
      console.log(this.gameTabActive);
      this.isNotData = true
      this.rechargList = []
      if (i === 0) {
        this.params = {
          dateFrom: utils.dateFormat(this.startTime, 2),
          dateTo: utils.dateFormat(this.endTime, 2),
          page: '1',
          rows: '10',
          status:''
        }
      } else if (i === 2) {
        this.params = {
          dateFrom: utils.dateFormat(this.startTime, 2),
          dateTo: utils.dateFormat(this.endTime, 2),
          page: '1',
          rows: '10',
          status: 2
          // statuses:JSON.stringify([1,2])
        }
      } else {
        this.params = {
          dateFrom: utils.dateFormat(this.startTime, 2),
          dateTo: utils.dateFormat(this.endTime, 2),
          page: '1',
          rows: '10',
          status: i
        }
      }
      console.log(this.params);
      this.$http.account.personalRechargeOrder(this.params).then(res => {
        console.log(res);
        this.rechargList = res.data.data
        console.log(this.rechargList);
        this.rechargList.length === 0 ? this.isNotData = false : this.isNotData = true
      }).catch(err => {
        console.log(err);
      })
    },
    getPageData(i) {
      console.log(i);
      console.log(this.startTime, this.endTime);
      this.gameTabActive = i
      console.log(this.gameTabActive);
      this.isNotData = true
      this.rechargList = []
      this.page = 1
      this.common(i)
    },
    common(i = 0, type = 1) {
      if (i === 0) {
        this.params = {
          dateFrom: utils.dateFormat(this.startTime, 2),
          dateTo: utils.dateFormat(this.endTime, 2),
          page: '1',
          rows: '10',
          status:''
        }
      } else if (i === 2) {
        this.params = {
          dateFrom: utils.dateFormat(this.startTime, 2),
          dateTo: utils.dateFormat(this.endTime, 2),
          page: '1',
          rows: '10',
          status: 2
          // statuses:JSON.stringify([1,2])
        }
      } else {
        this.params = {
          dateFrom: utils.dateFormat(this.startTime, 2),
          dateTo: utils.dateFormat(this.endTime, 2),
          page: '1',
          rows: '10',
          status: i
        }
      }
      console.log(this.params);
      this.$http.account.personalRechargeOrder(this.params).then(res => {
        console.log(res);
        this.totalCount = res.data.totalCount
        this.rechargList = res.data.data
        console.log(this.rechargList);
        this.rechargList.length === 0 ? this.isNotData = false : this.isNotData = true
        //
        this.rechargList = type === 2 ? this.rechargList.concat(res.data.data) : res.data.data
        console.log(type);
        console.log(this.rechargList);
        if (res.data.data.length === 0) {
          this.isNotData = false
        } else {
          let isForceUpdate = this.rechargList.length === this.totalCount
          setTimeout(() => {
            this.$refs.Nscroll.forceUpdate(!isForceUpdate)
          }, 100)
        }
      }).catch(err => {
        console.log(err);
      })
    }
  },
  watch: {
    timeShow: function () {
      if (!this.timeShow) {
        this.rechargList = []
        this.isNotData = true
        this.page = 1
        this.gameTabActive = 0,
            this.common()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .recharge-data-box{
    position: relative;
    z-index: 3;
    .ty-content .a-content{
      background: none !important;
      .a-item{
        height: px2rem(70px);
        display: flex;
        justify-content: center;
      }
    }
    /deep/.van-action-sheet__content{
      .ccontent{
        div{
          min-height: 50px;
          span{
            line-height: 25px;
            display: flex;
            align-items: center;
            word-break: break-all;
          }
        }
        div:last-child{
          span:last-child{
            line-height: 25px;
          }
        }
      }
    }
  }
  .skin-gray{
    .a-item,.ccontent > div{
      background: $skin-gray-con-bg;
      @include border-1px($skin-gray-border-color);
    }
    .ccontent > div span:first-child{
      color:$skin-gray-label-color;
    }
  }
  .skin-black{
    .a-item,.ccontent > div{
      background: $skin-black-con-bg;
      @include border-1px($skin-black-border-color);
    }
    .ccontent > div span:first-child{
      color:$skin-black-label-color;
    }
  }



::v-deep.van-action-sheet {
  height: 100% !important;
  max-height: 100% !important;
}

::v-deep.van-popup--bottom.van-popup--round {
  border-radius: 0;
}

::v-deep.van-action-sheet__header {
  display: none;
}

::v-deep.van-icon-arrow-left {
  position: absolute;
  top: 0.25rem;
  left: 0.2rem;
  font-size: 20px;
  color: white;
}

::v-deep.van-action-sheet__content {
  height: 100%;
}

.ty-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: scroll;

  .game-tab {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    div {
      //width: 33%;
      height: 1rem;
      display: flex;
      flex-direction: row;
      justify-items: center;
      align-items: center;
      color: #646566;

      span {
        //line-height: 0.58rem;
        font-size: 0.28rem;
        text-align: center;
        width: 100%;
        cursor: pointer;
      }

      /*&.active {*/
      /*  width: 1.6rem !important;*/
      /*  height: .64rem !important;*/
      /*  border-radius: .36rem !important;*/
      /*  background-image: linear-gradient(to bottom, #efcea6, #dab591) !important;*/
      /*  font-size: .32rem !important;*/
      /*  font-weight: 500 !important;*/
      /*  color: #533510 !important;*/
      /*  border-bottom: none !important;*/
      /*  display: flex !important;*/
      /*  justify-content: center !important;*/
      /*  align-items: center !important;*/
      /*}*/
    }
  }

  .a-content {
    flex: 1;
    overflow-y: hidden;
    position: relative;

    .a-list {
      display: flex;
      flex-direction: column;

      .a-item {
        display: flex;
        flex-direction: column;
        /*padding: 0.32rem 0.32rem;*/
        /*border-bottom: 0.01rem solid #393940;*/

        .top {
          font-weight: 500;
          font-size: 0.33rem;
          margin-bottom: 0.2rem;

          &:first-child {
            font-size: .32rem;
            letter-spacing: 0.72px;
            color: #ffffff;
          }
        }


        .bottom span {
          color: #8f8f8f;
          font-size: .24rem;
          //display: flex;
          //flex-direction: row;
          //justify-content: space-between;
        }
      }
    }
  }
}

.totalList {
  padding: .2rem;
  /*border-bottom: .02rem solid rgb(219, 219, 219);*/
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
  /*background: #efeff4;*/

  > div {
    /*height: 1rem;*/
    /*background: #24252d;*/
    line-height: 1rem;
    padding: 0 .3rem;
    font-size: .32rem;
    /*margin-top: 1px;*/
    display: flex;
    /*border-bottom: 1px #393940 solid;*/

    span:first-child{
      /*min-width: 2rem;*/
      /*margin-right: 0.2rem;*/
      color: #8f8f8f;
      flex:1.5;
    }
    span:last-child{
      color:#fff;
      flex:2;
      &.red{
        color:red;
      }
    }
  }
}
</style>
