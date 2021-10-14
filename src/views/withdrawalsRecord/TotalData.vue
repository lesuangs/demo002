<template>
  <div class="ty-content">
    <div class="tab-nav-box">
      <ul>
        <li v-for="(v, i) in dzList"
            :key="i"
            v-if="i !==1 && v !== '拒绝出款'"
            :class="[gameTabActive == i ? 'active' : '']"
            @click="getPageData(i)">
          <span>{{ $t(v) }}</span>
        </li>
      </ul>
    </div>
<!--    <div class="game-tab">-->
<!--      <template v-for="(v, i) in dzList">-->
<!--        <div-->
<!--          v-if="i !==1 && v !== '拒绝出款'"-->

<!--          :key="i"-->
<!--          :class="[gameTabActive == i ? 'active' : '']"-->
<!--          @click="getPageData(i)"-->
<!--        >-->
<!--          <span>{{ $t(v) }}</span>-->
<!--        </div>-->
<!--      </template>-->
<!--    </div>-->
    <div class="a-content" v-if="noteList.length > 0">
      <vue-better-scroll
        class="wrapper"
        ref="Nscroll"
        :scrollbar="scrollbarObj"
        :pullDownRefresh="pullDownRefreshObj"
        :pullUpLoad="pullUpLoadObj"
        :startY="parseInt(startY)"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
      >
        <div class="a-list">
         <!-- <template v-for="(v, i) in noteList" >
            <div class="totalList a-item" :key="i" @click="toDialog(v)">
              <div style="font-size: .3rem;margin-bottom: .2rem" class="top">
                <span >{{$t(dzList[v.cashStatus])}}</span>
                <span style="color: rgb(204, 63, 89);float: right">-{{v.cashMoney.toFixed(2)}}</span>
              </div>
              <div style="color: rgb(114, 114, 114)">
                <span>{{v.addTime}}</span>
                <span style="float: right">余额&nbsp;{{v.accountMoney.toFixed(2)}}</span>
              </div>
            </div>
          </template>-->
          <div class="detail-item" @click="toDialog(v)" v-for="(v, i)  in noteList" :key="i">
            <div class="detail-top">
              <h1>{{$t(dzList[v.cashStatus])}}</h1>
              <div>
                <span>-{{v.cashMoney.toFixed(2)}}</span>
              </div>
            </div>
            <div class="detail-bottom">
              <span>{{ v.addTime }}</span>
              <div>{{$t('lang.user.balance')}}：{{v.accountMoney.toFixed(2)}}</div>
            </div>
          </div>
        </div>
      </vue-better-scroll>
      <van-action-sheet v-model="dialogshow" title="标题">
        <van-icon @click="dialogshow=!dialogshow" name="arrow-left" />
        <div class="cheader">{{$t('lang.withDraw.withDrawDetail')}}</div>
        <div class="ccontent">
          <div>
            <span>{{$t('lang.withDraw.detailLabel[0]')}}</span>
            <span>{{currentData.cashOrderNo}}</span>
          </div>
          <div>
            <span>{{$t('lang.withDraw.detailLabel[1]')}}</span>
            <span>{{currentData.cashMoney && currentData.cashMoney.toFixed(2)}}元</span>
          </div>
          <div>
            <span>{{$t('lang.withDraw.detailLabel[2]')}}</span>
            <span>{{currentData.counterFee && currentData.counterFee.toFixed(2)}}元</span>
          </div>
          <div>
            <span>{{$t('lang.withDraw.detailLabel[3]')}}</span>
            <span>{{currentData.approveMoney && currentData.approveMoney.toFixed(2)}}元</span>
          </div>
          <div>
            <span>{{$t('lang.withDraw.detailLabel[4]')}}</span>
            <span style="color:red">{{withdrawStatus[currentData.cashStatus]}}</span>
          </div>
          <div>
            <span>{{$t('lang.withDraw.detailLabel[5]')}}</span>
            <span >{{currentData.addTime}}</span>
          </div>
          <div>
            <span class="lastSpan">{{$t('lang.withDraw.detailLabel[6]')}}</span>
            <span >{{currentData.approveReason}}</span>
          </div>
        </div>
      </van-action-sheet>
    </div>
    <NotData v-else :isNotData="isNotData" />
  </div>
</template>
<script>
import NotData from '../../commons/notdata/NotData'
import VueBetterScroll from '../../commons/scroll/BScroll'
import utils from "../../utils/utils";
import qs from 'querystring'
export default {
    name: 'TotalData',
    components: {
      NotData,
      VueBetterScroll
    },
    props: {
      startTime: Date,
      endTime: Date,
      timeShow: Boolean
    },
    data () {
      return {
        // dzList: [],
        dzList: [
          'lang.RechargeData.All',
          'lang.RechargeData.Accepting',
          'lang.RechargeData.Accepting',
          'lang.totalData.paidOut',
          'lang.totalData.Cancelled',
          'lang.totalData.refuseToPay'
        ],
        noteList: [],
        gameDataDel: {},
        isNotData: true,
        currentData: {},
        dialogshow: false,
        withdrawStatus: { 1: '受理中', 2: '受理中', 3: '已出款', 4: '已取消', 5: '拒绝出款', 6: '' },
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
        params:{}
      }
    },
    created () {
      this.getGame()
      // this.gameTabActive = 0
      console.log(this.startTime);
    },
    methods: {
      toDialog (value) {
        this.dialogshow = !this.dialogshow
        this.currentData = value
      },
      // 下拉刷新
      onPullingDown () {
        // console.log('11111')
        this.page = 1
        setTimeout(() => {
          this.common(this.gameTabActive)
        }, 500)
      },
      // 上拉 加载更多数据
      onPullingUp () {
        setTimeout(() => {
          this.page++
          this.common(this.gameTabActive,2)
        }, 500)
      },
      queryData (page, liveCode, type) {
        const params = {
          timeType: 0,
          page: page,
          rows: 10,
          betStartDate:
            this.startTime.toLocaleDateString().replace(/\//g, '-') + ' 00:00:00',
          betEndDate:
            this.endTime.toLocaleDateString().replace(/\//g, '-') + ' 23:59:59',
          gameCode: liveCode
        }
        this.$http.home.getNote(params).then((res) => {
          this.totalCount = res.data.totalCount
          this.noteList =
            type === 2 ? this.noteList.concat(res.data.data) : res.data.data
          if (res.data.data.length === 0) {
            this.isNotData = false
          } else {
            let isForceUpdate=this.noteList.length === this.totalCount
            setTimeout(() => {
              this.$refs.Nscroll.forceUpdate(!isForceUpdate)
            }, 100)
          }
        })
      },
      getGame (i=0,type=1) {
        console.log(this.startTime,this.endTime);
        this.gameTabActive = i
        // this.cashStatus = i
        console.log(this.gameTabActive);
        this.isNotData = true
        // this.noteList = []
        if(i===0){
           this.params = {
            beginDatetime:utils.dateFormat(this.startTime),
            endDatetime:utils.dateFormat(this.endTime),
            page:this.page,
            rows:'10'
          }
        }else if(i===2){
          this.params = {
            beginDatetime:utils.dateFormat(this.startTime),
            endDatetime:utils.dateFormat(this.endTime),
            page:this.page,
            rows:'10',
            statuses:[1,2]
          }
        }
        else {
          this.params = {
            beginDatetime:utils.dateFormat(this.startTime),
            endDatetime:utils.dateFormat(this.endTime),
            page:this.page,
            rows:'10',
            cashStatus:i
          }
        }
        console.log(this.params);
        this.$http.account.queryPage(qs.stringify(this.params)).then(res=>{
          console.log(res);
          // this.noteList = res.data.data
          // if(this.noteList.length===0){
          //   this.isNotData=false
          // }

          this.totalCount = res.data.totalCount
          this.noteList = type === 2 ? this.noteList.concat(res.data.data) : res.data.data
          console.log(type);
          console.log(this.noteList);
          if (res.data.data.length === 0) {
            this.isNotData = false
          } else {
            let isForceUpdate= this.noteList.length === this.totalCount
            setTimeout(() => {
              this.$refs.Nscroll.forceUpdate(!isForceUpdate)
            }, 100)
          }


        }).catch(err=>{
          console.log(err);
        })
      },
      getPageData(i){
        // console.log(this.startTime,this.endTime);
        this.gameTabActive = i
        this.page = 1
        // console.log(this.gameTabActive);
        this.isNotData = true
        this.noteList = []
        this.common(i)
      },
      common(i=0,type=1){
        if(i===0){
          this.params = {
            beginDatetime:utils.dateFormat(this.startTime),
            endDatetime:utils.dateFormat(this.endTime),
            page:this.page,
            rows:'10'
          }
        }else if(i===2){
          this.params = {
            beginDatetime:utils.dateFormat(this.startTime),
            endDatetime:utils.dateFormat(this.endTime),
            page:this.page,
            rows:'10',
            statuses:[1,2]
          }
        }
        else {
          this.params = {
            beginDatetime:utils.dateFormat(this.startTime),
            endDatetime:utils.dateFormat(this.endTime),
            page:this.page,
            rows:'10',
            cashStatus:i
          }
        }
        console.log(this.params);
        this.$http.account.queryPage(qs.stringify(this.params)).then(res=> {
          console.log(res);
          // this.noteList = res.data.data
          // if(this.noteList.length===0){
          //   this.isNotData=false
          // }

          this.totalCount = res.data.totalCount
          this.noteList = type === 2 ? this.noteList.concat(res.data.data) : res.data.data
          console.log(type);
          console.log(this.noteList);
          if (res.data.data.length === 0) {
            this.isNotData = false
          } else {
            let isForceUpdate=this.noteList.length === this.totalCount
            setTimeout(() => {
              this.$refs.Nscroll.forceUpdate(!isForceUpdate)
            }, 100)
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      showDel (v) {
        this.show = true
        this.dataDel = v
      }
    },
    watch: {
      timeShow() {
        if (!this.timeShow) {
          this.noteList = []
          this.isNotData = true
          this.page = 1
          this.gameTabActive = 0
          this.common()
        }
      }
    }
  }
</script>
<style lang="scss" scoped>

  .ty-content{
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
    .detail-item {
      min-height: 70px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding:0 px2rem(16px);
      .detail-top, .detail-bottom {
        display: flex;
        justify-content: space-between;
      }
      .detail-top {
        font-size: 0.3rem;
        margin-bottom: 0.2rem;
        &,h1 {
          color: #fff;
        }
      }
      .detail-bottom {
        /*color: #8f8f8f;*/
        font-size: 0.24rem;
        line-height: 0.48rem;
      }
    }
  }

  .skin-black{
    .detail-item{
      .detail-bottom{
        color:$skin-black-text-sub-color;
      }
    }
    .detail-item,
    .ccontent > div{
      background: $skin-black-con-bg;
      @include border-1px($skin-black-border-color);
    }
    .ccontent > div span:first-child{
      color:$skin-black-label-color;
    }
  }

  .skin-gray{
    .detail-item{
      .detail-bottom{
        color:$skin-gray-text-sub-color;
      }
    }
    .detail-item,
    .ccontent > div{
      background: $skin-gray-con-bg;
      @include border-1px($skin-gray-border-color);
    }
    .ccontent > div span:first-child{
      color:$skin-gray-label-color;
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
    /*.game-tab {*/
    /*  display: flex;*/
    /*  flex-direction: row;*/
    /*  justify-content: center;*/
    /*  div {*/
    /*    width: 33%;*/
    /*    display: flex;*/
    /*    flex-direction: row;*/
    /*    justify-items: center;*/
    /*    align-items: center;*/
    /*    color: #646566;*/
    /*    span {*/
    /*      line-height: 0.48rem;*/
    /*      font-size: 0.28rem;*/
    /*      text-align: center;*/
    /*      width: 100%;*/
    /*      cursor: pointer;*/
    /*    }*/
    /*    &.active {*/
    /*      border-bottom: 0.06rem solid #c00;*/
    /*      color: #c00;*/
    /*    }*/
    /*  }*/
    /*}*/
    .a-content {
      flex: 1;
      overflow-y: scroll;
      position: relative;
      .a-list {
        display: flex;
        flex-direction: column;
        .a-item {
          display: flex;
          flex-direction: column;
          padding: 0.16rem 0.32rem;
          border-bottom: 0.01rem solid #ddd;
          .top {
            font-weight: 500;
            font-size: 0.33rem;
            margin-bottom: 0.2rem;
            &:first-child {
              color: #000;
            }
          }
          .top,
          .bottom {
            display: flex;
            color:rgb(102, 102, 102);
            flex-direction: row;
            justify-content: space-between;
          }
        }
      }
    }
  }
  .totalList {
    padding: .2rem;
    border-bottom: .02rem solid rgb(219, 219, 219);
  }
  .cheader{
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
        flex:1;
      }
      span:last-child{
        color:#fff;
        flex:2;
      }
    }
  }
  .lastSpan {
    width: 8rem;
    color: rgb(153, 153, 153);
  }
</style>
