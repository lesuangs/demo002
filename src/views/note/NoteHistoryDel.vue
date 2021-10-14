<template>
  <div class="ty-content">
    <Header :headObj="headObj" @leftClick="$router.go(-1)">
      <span slot="icon" class="slot-icon" @click="handleMask">
        <i class="iconfont iconicon-filters"></i>
      </span>
    </Header>
    <div class="tab-nav-box">
      <ul>
        <li v-for="(v, i) in dzList" :key="i"
            :class="[gameTabActive == i ? 'active' : '']"
            @click="getGame(i)">
          <span>{{ $t(v) }}</span>
        </li>
      </ul>
    </div>
<!--    <div class="game-tab">-->
<!--      <template v-for="(v, i) in dzList">-->
<!--        <div-->
<!--          :key="i"-->
<!--          :class="[gameTabActive == i ? 'active' : '']"-->
<!--          @click="getGame(i)"-->
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
          <template v-for="(v, i) in noteList">
            <div class="a-item" :key="i" @click="showDel(v)">
              <div class="top">
                <span>{{ listData[v.gameId].name }}</span>
                <div>
                  <span v-if="v.status === 0">未开奖</span>
                  <span
                    v-else-if="v.status === 1"
                    :style="
                      v.result === 0 ? 'color: RGB(89,174,89);' : 'color:red'
                    "
                    >{{ v.result > 0 ? Number(v.reward)===0?'和局':`中${v.reward} 元` : "未中奖" }}</span
                  >
                  <span v-else-if="v.status === 2">撤销订单</span>
                  <span v-else>异常订单</span>
                </div>
              </div>
              <div class="bottom">
                <span>投注：{{ Number(v.totalMoney).toFixed(2) }}</span>
                <span>{{ v.addTime }}</span>
              </div>
            </div>
          </template>
        </div>
      </vue-better-scroll>
    </div>
    <NotData v-else :isNotData="isNotData" />
    <transition name="van-slide-up">
      <LotteryNoteDel
        @hideCpDel="cpDelShow = false"
        v-if="cpDelShow"
        :cpDataDel="cpDataDel"
        :listData="listData"
      />
    </transition>
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
        v-if="isSelect"
      />
    </transition>
  </div>
</template>
<script>
import Header from '../../commons/header/Header'
import NotData from '../../commons/notdata/NotData'
import VueBetterScroll from '../../commons/scroll/BScroll'
import LotteryNoteDel from './LotteryNoteDel'
import LotteryPicker from './LotteryPicker'
import {mapGetters,mapState} from 'vuex'

export default {
  name: 'NoteHistoryDel',
  components: {
    Header,
    VueBetterScroll,
    NotData,
    LotteryNoteDel,
    LotteryPicker
  },
  data () {
    return {
      isSelect: false,
      gameId: 0,
      value: '全部',
      VList: [0, 0],
      headObj: {
        title: 'lang.NoteHistoryDel.historyRecord',
        showArrow: true
      },
      cpDelShow: false,
      cpDataDel: {},
      gameTabActive: 0,
      dzList: ['lang.lotteryNote.allBets', 'lang.lotteryNote.hasWon', 'lang.lotteryNote.noDraw', 'lang.lotteryNote.orderCancelled'],
      noteList: [],
      isNotData: true,
      scrollbarObj: {
        fade: true
      },
      pullDownRefreshObj: {
        threshold: 90,
        stop: 40
      },
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: this.$t('lang.BScroll.jiaZaiGengDuo'),
          noMore: this.$t('lang.BScroll.meiYouGengDuo')
        }
      },
      startY: 0, // 纵轴方向初始化位置
      page: 1,
      status: 0,
      dataDel: {},
      listData: {},
      columns: []
    }
  },
  created () {
    this.queryData(1, 1)
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
      list = JSON.parse(sessionStorage.getItem('LotteryTypeList'))
      list.forEach((element) => {
        listData[element.id] = element
      })
      this.getPicker(list)
      this.listData = listData
    }
  },
  computed: {
    ...mapState([
      'userInformation'
    ]),
    ...mapGetters(['userInfo', 'testInfo']),
    usersInfo () {
      return this.userInformation
    }
  },
  methods: {
    reset () {
      this.value = '全部'
      this.VList = [0, 0]
    },
    btnClick () {
      const i = this.VList
      this.gameId = this.columns[i[0]].children[i[1]].gameId
      this.queryData(1, 1)
    },
    getPicker (list) {
      const typeList = [
        {
          text: '全部',
          children: [{ text: '全部', gameId: 0 }]
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
      list.forEach((item, index) => {
        switch (item.cate) {
        case 0:
          typeList[1].children.push({ text: item.name, gameId: item.id })
          break
        case 1:
          typeList[2].children.push({ text: item.name, gameId: item.id })
          break
        case 2:
          typeList[3].children.push({ text: item.name, gameId: item.id })
          break
        case 3:
          typeList[4].children.push({ text: item.name, gameId: item.id })
          break
        case 4:
          typeList[5].children.push({ text: item.name, gameId: item.id })
          break
        case 5:
          typeList[6].children.push({ text: item.name, gameId: item.id })
          break
        case 6:
          typeList[7].children.push({ text: item.name, gameId: item.id })
          break
        case 7:
          typeList[8].children.push({ text: item.name, gameId: item.id })
          break
        default:
          break
        }
      })
      this.columns = typeList

    },
    confirm (v, i) {
      this.value = v[0]
      this.VList = i
    },
    // 下拉刷新
    onPullingDown () {
      setTimeout(() => {
        this.page = 1
        this.queryData(1, 1)
      }, 500)
    },
    // 上拉 加载更多数据
    onPullingUp () {
      setTimeout(() => {
        this.page = this.page + 1
        this.queryData(this.page, 2)
      }, 500)
    },
    handleMask () {
      this.isSelect = true
    },
    queryData (page, type) {
      const params = {
        page: page,
        rows: 15,
        date: this.$route.query.date,
        subAccount: this.usersInfo.account
      }
      if (this.status === 1) {
        params.result = 1
      } else if (this.status === 2) {
        params.status = 0
      } else if (this.status === 3) {
        params.status = 2
      }
      if (this.gameId !== 0) {
        params.gameId = this.gameId
      }
      this.$http.home.getCpHistory(params).then((res) => {
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
    getGame (i) {
      this.gameTabActive = i
      this.page = 1
      this.noteList = []
      this.isNotData = true
      this.status = i
      this.queryData(1, 1)
    },
    showDel (v) {
      this.cpDelShow = true
      this.cpDataDel = v
    }
  }
}
</script>
<style lang="scss" scoped>
.ty-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1000;
  height: 100%;
  .slot-icon {
    color: #fff;
    position: absolute;
    top: 0.21rem;
    z-index: 1;
    right: 0.25rem;
    .iconfont {
      font-size: 0.4rem;
    }
  }
  .game-tab {
    display: flex;
    flex-direction: row;
    justify-content: center;
    div {
      width: 25%;
      display: flex;
      flex-direction: row;
      justify-items: center;
      align-items: center;
      color: #646566;
      span {
        line-height: 0.58rem;
        font-size: 0.28rem;
        text-align: center;
        width: 100%;
        cursor: pointer;
      }
      &.active {
        border-bottom: 0.06rem solid #c00;
        color: #c00;
      }
    }
  }
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
          margin-bottom: 0.2rem;
          font-size: 0.3rem;
        }
        .top,
        .bottom {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
      }
    }
  }
  .cheader {
    height: 0.9rem;
    background: linear-gradient(151deg, #65317d -12%, #293384 126%) !important;
    text-align: center;
    line-height: 0.9rem;
    color: white;
    font-size: 16px;
  }
  .ccontent {
    display: flex;
    flex-direction: column;
    .del-top {
      position: relative;
      width: 100%;
      height: 4rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      color: #fff;
      align-items: center;
      img {
        width: 1rem;
        height: 1rem;
        margin-top: 15px;
        margin-bottom: 15px;
      }
      .del-staus {
        font-size: 0.34rem;
        margin-top: 0.5rem;
      }
      .del-name {
        font-size: 0.32rem;
        font-weight: 500;
        margin-bottom: 3px;
      }
      span {
      }
    }

    .del-top:after {
      width: 120%;
      height: 4rem;
      position: absolute;
      left: -10%;
      top: 0;
      z-index: -1;
      content: "";
      border-radius: 0 0 70% 70%;
      background: #bf242a;
    }
    .del-bottom {
      display: flex;
      flex: 1;
      flex-direction: column;
      padding: 10px 40px;
      font-size: 0.3rem;
      color: #646566;
      > div {
        display: flex;
        flex-direction: row;
        height: 30px;
        line-height: 30px;
        span {
          &:first-child {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
