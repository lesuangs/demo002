<template>
  <div class="ty-content">
    <div class="tab-nav-box">
      <ul>
        <li v-for="(v, i) in dzList" :key="i"
            :class="[gameTabActive == i ? 'active' : '']"
            @click="getGame(i)">
          <span>{{ v.name }}</span>
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
<!--          <span>{{ v.name }}</span>-->
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
            <div class="a-item" :key="i" @click="$emit('showGameDel',v)">
              <div class="top">
                <span>{{ v.chineseName }}</span>
                <span
                  :style="
                    v.winAmount > 0 ? 'color: RGB(89,174,89);' : 'color:red'
                  "
                  >{{ v.winAmount < 0 ? "+" : ""
                  }}{{ Number(-v.winAmount).toFixed(2) }}</span
                >
              </div>
              <div class="bottom">
                <span>{{ v.betTime }}</span>
                <span>投注：{{ Number(v.betAmount).toFixed(2) }}</span>
              </div>
            </div>
          </template>
        </div>
      </vue-better-scroll>
    </div>
    <NotData v-else :isNotData="isNotData" />
  </div>
</template>
<script>
import NotData from '../../commons/notdata/NotData'
import VueBetterScroll from '../../commons/scroll/BScroll'

export default {
  name: 'GameNote',
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
      dzList: [],
      noteList: [],
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
      dataDel: {}
    }
  },
  created () {
    this.$http.home.allLiveGames().then((res) => {
      this.dzList = res.data
      console.log(this.dzList);
      const liveCode = res.data[0].code
      this.liveCode = liveCode
      this.queryData(1, liveCode, 1)
    })
  },
  methods: {
    // 下拉刷新
    onPullingDown () {
      setTimeout(() => {
        this.page = 1
        this.queryData(1, this.liveCode, 1)
      }, 500)
    },
    // 上拉 加载更多数据
    onPullingUp () {

      setTimeout(() => {
        this.page = this.page + 1
        this.queryData(this.page, this.liveCode, 2)
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
        console.log(this.totalCount);
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
      const liveCode = this.dzList[i].code
      this.gameTabActive = i
      this.isNotData = true
      this.noteList = []
      this.queryData(1, liveCode, 1)
    },
    showDel (v) {
      this.show = true
      this.dataDel = v
    }
  },
  watch: {
    timeShow () {
      if (!this.timeShow) {
        this.noteList = []
        this.isNotData = true
        this.page = 1
        this.queryData(1, this.liveCode)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
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
    justify-content: center;
    div {
      width: 25%;
      display: flex;
      flex-direction: row;
      justify-items: center;
      align-items: center;
      color: #646566;
      span {
        line-height: 0.65rem;
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
</style>
