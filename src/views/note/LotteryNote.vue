<template>
  <div class="ty-content lottery-note-box">
    <div class="tab-nav-box">
      <ul>
        <li v-for="(v, i) in dzList" :key="i"
            :class="[gameTabActive == i ? 'active' : '']" @click="getGame(i)">
          <span>{{ $t(v) }}</span>
        </li>
      </ul>
    </div>
<!--    <div class="game-tab">-->
<!--      <template v-for="(v, i) in dzList">-->
<!--        <div :key="i" :class="[gameTabActive == i ? 'active' : '']" @click="getGame(i)">-->
<!--          <span :style="$i18n.locale === 'zh-CN'? 'line-height: 0.64rem;': 'line-height: 0.64rem;' ">-->
<!--            {{ $t(v) }}-->
<!--          </span>-->
<!--        </div>-->
<!--      </template>-->
<!--    </div>-->
    <template v-if="isLogin">
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
              <div
                  class="a-item"
                  :key="i"
                  @click="$emit('showCpDel', v, gameNames[v.gameId])"
              >
                <div class="top">
<!--                  <span v-if="gameNames[v.gameId] && gameNames[v.gameId].name">{{gameNames[v.gameId].name}}</span>-->
                  <span>{{v.gameName}}</span>
<!--                  <span v-else>{{$t('lang.common.loading')}}</span>-->
                  <div>
                    <!-- <span> 第{{ v.turnNum }}期 | </span>-->
                    <span v-if="v.status === 0">{{$t('lang.lotteryNote.noDraw')}}</span>
                    <span
                        v-else-if="v.status === 1"
                        :style="v.result === 0 ? 'color: RGB(89,174,89);' : 'color:red' ">
                      {{ v.result > 0
                            ? Number(v.reward) === 0
                            ? $t('lang.state.draw')
                            : `${$t('lang.state.win')}&nbsp;+${v.reward.toFixed(2)} ${$t('lang.common.yuan')}`
                            : $t('lang.state.noWin')
                      }}</span>
                    <span v-else-if="v.status === 2">{{$t('lang.lotteryNote.cancelOrder')}}</span>
                    <span v-else>{{$t('lang.lotteryNote.abnormalOrder')}}</span>
                  </div>
                </div>
                <div class="bottom">
                  <span>{{$t('lang.lotteryNote.bets')}}：{{ Number(v.totalMoney).toFixed(2) }}</span>
                  <span>{{ v.addTime }}</span>
                </div>
              </div>
            </template>
          </div>
        </vue-better-scroll>
      </div>
      <NotData v-else :isNotData="isNotData"/>
    </template>
    <noLogin v-else></noLogin>
<!--    <div v-else class="toLogin">-->
<!--      &lt;!&ndash;      <img src="https://sp-res-wap.ftfxgame.com/fusion/wap/release/static/img/no-record.56c1aed8.png"/>&ndash;&gt;-->
<!--      <p>{{$t('lang.loginContent.noLogin')}}</p>-->
<!--      <div>-->
<!--        <i class @click="$router.push('/login')">{{$t('lang.loginContent.login')}}</i>-->
<!--        <i @click="$router.push('/reg')">{{$t('lang.loginContent.register')}}</i>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>
<script>
import NotData from "../../commons/notdata/NotData";
import VueBetterScroll from "../../commons/scroll/BScroll";
import noLogin from "../../commons/noLogin/noLogin";
import {mapState} from 'vuex';
export default {
  name: "LotteryNote",
  components: {
    NotData,
    VueBetterScroll,
    noLogin
  },
  computed:{
    ...mapState([
      'isLogin',
      'searchLotteryList',
    ])
  },
  props: {
    startTime: Date,
    endTime: Date,
    timeShow: Boolean,
    listData: Object,
    gameId: Number,
  },
  data() {
    return {
      dzList: [
        "lang.lotteryNote.allBets",
        "lang.lotteryNote.hasWon",
        "lang.lotteryNote.noDraw",
        "lang.lotteryNote.orderCancelled",
      ],
      noteList: [],
      gameNames: {},
      noLogin: false,
      isNotData: true,
      show: false,
      // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
      scrollbarObj: {
        fade: true,
      },
      // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
      pullDownRefreshObj: {
        threshold: 90,
        stop: 40,
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
      status: 0,
      dataDel: {},
    };
  },
  created() {
    // alert(this.$cookie.get('token'),99)
    // alert(this.noLogin,333333333)
    // alert(this.isLogin,444455)
    //this.$cookie.get('token') 在UC浏览器下识别不了
    // if (!this.$cookie.get('token')) {
    //   this.isNotData = false;//
    //   this.noLogin = true;
    // } else {
    //   this.queryData(1, 1)
    // }
    if(this.isLogin){
      this.queryData(1, 1)
    }
  },
  methods: {
    // 下拉刷新
    onPullingDown() {
      setTimeout(() => {
        this.page = 1;
        this.queryData(1, 1);
      }, 500);
    },
    // 上拉 加载更多数据
    onPullingUp() {
      setTimeout(() => {
        this.page = this.page + 1;
        this.queryData(this.page, 2);
      }, 500);
    },
    queryData(page, type) {
      const _t = (Date.parse(new Date()) / 1000).toString();
      const params = {
        page: page,
        rows: 10,
        _t,
      };
      if (this.status === 1) {
        params.result = 1;
      } else if (this.status === 2) {
        params.status = 0;
      } else if (this.status === 3) {
        params.status = 2;
      }
      if (this.gameId !== 0) {
        params.gameId = this.gameId;
      }
      this.$http.home.getCpNote(params).then((res) => {
        console.log(res.data.total,33333)
        let data = res.data.data;
        let otherData = res.data.otherData;
        let seachData = this.searchLotteryList;
        console.log(seachData, 'seachData999999888')
        for (let a of data) {
          for (let b of seachData) {
            if (a.gameId === b.id && b.model === a.model) {
              // console.log(b.name,9999);
              a.gameName = b.name;
              // console.log(b,2222)
            }
          }
        }
        console.log(data,'getCpNote222222222222')
        // let gameNames = otherData.gameNames || {}
        this.totalCount = res.data.total;
        this.noteList = type === 2 ? this.noteList.concat(res.data.data) : res.data.data;

        if (res.data.total === 0) {
          this.isNotData = false;
        } else {
          // this.gameNames = {...this.gameNames, ...gameNames}

          let isForceUpdate = this.noteList.length === this.totalCount;
          setTimeout(() => {
            this.$refs.Nscroll.forceUpdate(!isForceUpdate);
          }, 1000);
        }
        // console.log(this.noteList,'noteList noteList')
      })
          .catch((err) => {
            console.log(err);
            if (err.status === 400) {
              this.isNotData = false;
              this.noLogin = true;
            }
          });
    },
    getGame(i) {
      this.gameTabActive = i;
      this.noteList = [];
      this.isNotData = true;
      this.page = 1;
      this.status = i;
      this.queryData(1, 1);
    },
  },
  watch: {
    timeShow() {
      if (!this.timeShow) {
        this.noteList = [];
        this.isNotData = true;
        this.page = 1;
        this.queryData(1, this.liveCode);
      }
    },
    gameId: function (n, o) {
      if (n !== o) {
        this.noteList = [];
        this.isNotData = true;
        this.page = 1;
        this.queryData(1, this.liveCode);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .lottery-note-box{
    .a-list{
      .a-item{
        min-height: px2rem(70px);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding:0 px2rem(16px);
        .top{
          display: flex;
          justify-content: space-between;
          color:#fff;
          font-size:px2rem(15px);
        }
        .bottom{
          display: flex;
          justify-content: space-between;
          font-size: px2rem(13px);
        }
      }
    }
  }
  .skin-gray{
    .lottery-note-box{
      .a-list{
        .a-item{
          background: $skin-gray-con-bg;
          &:not(:last-child){
            @include border-1px($skin-gray-border-color);
          }
          .bottom{
            color:$skin-gray-text-color;
          }
        }
      }
    }
  }

  .skin-black{
    .lottery-note-box{
      .a-list{
        .a-item{
          background: $skin-black-con-bg;
          &:not(:last-child){
            @include border-1px($skin-black-border-color);
          }
          .bottom{
            color:$skin-black-text-color;
          }
        }
      }
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

// ::v-deep.scroll-wrapper{
//   overflow: scroll
// }
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
  position: relative;
  z-index: 1000;
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
        border-bottom: 0.08rem solid #c00;
        color: #c00;
      }

      &.activeOrg {
        border-bottom: 0.08rem solid #f67d36;
        color: #f67d36;
      }

      &.activeBlue {
        border-bottom: 0.08rem solid #0047cc;
        color: #0047cc;
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

      /*.a-item {*/
        /*display: flex;*/
        /*flex-direction: column;*/
        /*padding: 0.16rem 0.32rem;*/
        /*border-bottom: 0.01rem solid #ddd;*/

        /*.top {*/
        /*  margin-bottom: 0.2rem;*/
        /*  display: flex;*/
        /*  flex-direction: row;*/
        /*  color: #000;*/
        /*  justify-content: space-between;*/
        /*  font-size: 0.3rem;*/
        /*}*/

        /*.bottom {*/
        /*  display: flex;*/
        /*  flex-direction: row;*/
        /*  color: rgb(102, 102, 102);*/
        /*  justify-content: space-between;*/
        /*}*/
      /*}*/
    }
  }
}

//.login {
//  padding-top: 1rem;
//  margin: 1rem auto;
//  text-align: center;
//
//  img {
//    width: 2.8rem;
//    margin-bottom: 1rem;
//  }
//}

.toLogin {
  width: 6.3rem;
  height: 3.62rem;
  margin: auto;
  border-radius: .4rem;
  background-color: #24252d !important;
  display: flex;
  flex-direction: column;

  p {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .32rem;
    color: white;

  }

  div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      width: 50%;
      height: .96rem;
      line-height: .96rem;
      text-align: center;
      font-size: .32rem;
      font-weight: 500;
    }

    i:first-child {
      background-image: linear-gradient(to bottom, #645592 1%, #322b4d);
      color: #dadada;
      border-bottom-left-radius: .4rem;
    }

    i:last-child {
      background-image: linear-gradient(to bottom, #efcea6, #dab591);
      color: #533510;
      border-bottom-right-radius: .4rem;
    }
  }
}

</style>
