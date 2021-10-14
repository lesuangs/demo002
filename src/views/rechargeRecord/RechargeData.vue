<template>
  <div class="recharge-data-box">
    <div class="tab-nav-box">
      <ul>
        <li v-for="(v, i) in dzList" :key="i"
            :class="[gameTabActive == i ? 'active' : '']"
            @click="getPageData(i)">
          <span>{{ $t(v) }}</span>
        </li>
      </ul>
    </div>
    <div class="recharge-data-wrap" v-if="rechargList.length > 0">
      <vue-better-scroll
              class="wrapper"
              ref="Nscroll"
              :scrollbar="scrollbarObj"
              :pullDownRefresh="pullDownRefreshObj"
              :pullUpLoad="pullUpLoadObj"
              :startY="parseInt(startY)"
              @pulling-down="onPullingDown"
              @pulling-up="onPullingUp">
        <div class="recharge-data-con">
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
    <van-action-sheet v-model="dialogshow" class="recharge-sheet-box">
      <Header :headObj="sheetHeader" @leftClick="dialogshow=false"/>
      <ul class="mod-ul-detail">
        <li>
          <label>{{$t('lang.RechargeData.topUpMode')}}</label>
          <span>{{ formatOrderModel(currentData.mode) }}</span>
        </li>
        <li>
          <label>{{$t('lang.RechargeData.paymentTypes')}}</label>
          <span>{{ currentData.payTypeName }}</span>
        </li>
        <li>
          <label>{{$t('lang.RechargeData.orderNo')}}</label>
          <span>{{ currentData.orderNo }}</span>
        </li>
        <li>
          <label>{{$t('lang.RechargeData.rechargeStatus')}}</label>
          <span :class="currentData.status === 3 ? 'red':''"> {{formatStatus(currentData.status)}}</span>
        </li>
        <li>
          <label>{{$t('lang.RechargeData.rechargeAmount')}}</label>
          <span>
            {{ currentData.amount && currentData.amount.toFixed(2) }}
            {{$t('lang.common.yuan')}}
          </span>
        </li>
        <li>
          <label>{{$t('lang.RechargeData.discountedPrice')}}</label>
          <span>
            {{ currentData.discountAmount && currentData.discountAmount.toFixed(2) }}
            {{$t('lang.common.yuan')}}
          </span>
        </li>
        <li>
          <label>{{$t('lang.RechargeData.totalRechargeAmount')}}</label>
          <span>
            {{ currentData.totalAmount && currentData.totalAmount.toFixed(2) }}
            {{$t('lang.common.yuan')}}
          </span>
        </li>
        <li>
          <label>{{$t('lang.RechargeData.offerType')}}</label>
          <span>
            {{ discountTypeMap[currentData.discountType] ?
            discountTypeMap[currentData.discountType] : $t('lang.RechargeData.rechargeType[0]')}}</span>
        </li>
        <li>
          <label>{{$t('lang.RechargeData.orderTime')}}</label>
          <span>{{ currentData.addTime }}</span>
        </li>
        <li>
          <label>{{ currentData.status == 4 ? $t('lang.RechargeData.cancellationTime')
            : $t('lang.RechargeData.depositTime') }}</label>
          <span>{{ currentData.auditTime }}</span>
        </li>
        <li>
          <label>{{$t('lang.common.remark')}}</label>
          <span>{{ currentData.remarks }}</span>
        </li>
      </ul>
    </van-action-sheet>
  </div>
</template>
<script>
import NotData from '../../commons/notdata/NotData'
import VueBetterScroll from '../../commons/scroll/BScroll'
import utils from "../../utils/utils";
import {mapGetters, mapState} from "vuex";
import Header from "../../commons/header/Header";
export default {
  name: 'RechargeData',
  components: {
    NotData,
    VueBetterScroll,
    Header
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
      sheetHeader:{
        title: "lang.RechargeData.rechargeDetail",
        showArrow: true,
      },
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
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    position: relative;
    z-index: 1000;
    .recharge-data-wrap{
      flex:1;
      position: relative;
      overflow-y: hidden;
      z-index: 1000;
    }
    .recharge-data-con{
      background: #24252D;
    }
    .recharge-sheet-box{
    }
  }
  .skin-gray{
    .recharge-data-box{
      .recharge-data-con{
        background: $skin-gray-con-bg;

      }
    }
   /* .a-item,.ccontent > div{
      background: $skin-gray-con-bg;
      @include border-1px($skin-gray-border-color);
    }
    .ccontent > div span:first-child{
      color:$skin-gray-label-color;
    }*/
  }
  .skin-black{
    /*.a-item,.ccontent > div{
      background: $skin-black-con-bg;
      @include border-1px($skin-black-border-color);
    }
    .ccontent > div span:first-child{
      color:$skin-black-label-color;
    }*/
  }

</style>
