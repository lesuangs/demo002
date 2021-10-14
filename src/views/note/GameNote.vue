<template>
    <div class="ty-content game-note-box">
        <div class="tab-nav-box">
            <ul>

                <!--        <li v-for="(v, i) in dzList" :key="i"-->
                <!--            :class="[gameTabActive == i ? 'active' : '']"-->
                <!--            @click="getGame(i)">-->
                <!--          <span>{{ v.name }}</span>-->
                <!--        </li>-->
                <li @click="showStatus=!showStatus">
                    <span>{{value}}</span>
           <!--         <span v-if="$route.query.type==='1'">{{value[0]}} - {{value[2]}}</span>
                    <span v-if="$route.query.type==='2'">{{value[0]}} - {{value[1]}}</span>
                    <span v-if="$route.query.type==='3'">{{value[0]}} - {{value[2]}}</span>
                    <span v-if="$route.query.type==='4'">{{value[0]}} - {{value[3]}}</span>-->
                    <i class="iconfont iconxia"></i>
                </li>
                <!--          <li >-->
                <!--              <span  v-if="tabActive===3">{{value[0]}} - {{value[2]}}</span>-->
                <!--&lt;!&ndash;              <i class="iconfont iconxia"></i>&ndash;&gt;-->
                <!--          </li>-->
                <!--          <li >-->
                <!--              <span  v-if="tabActive===4">{{value[0]}} - {{value[3]}}</span>-->
                <!--&lt;!&ndash;              <i class="iconfont iconxia"></i>&ndash;&gt;-->
                <!--          </li>-->
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

        <!--下方页面显示-->
        <div class="a-content game-note-wrap">
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
                <ul class="game-note-con">
                    <li>
                        <div class="game-note-top">
                            <h1>fsdafsdfdsf</h1>
                            <p>
                                <span>PP</span>
                                <span>22222</span>
                            </p>
                        </div>
                        <div class="game-note-bottom">
                            <div>
                                <p>{{$t('lang.lotteryNote.bets')}} fsdfsdfdsf</p>
                                <p>{{$t('lang.lotteryNote.noteNumber')}} fsdfsdfdsf</p>
                            </div>
                            <span>fsdfsdf</span>
                        </div>
                    </li>

                    <li>
                        <div class="game-note-top">
                            <h1>fsdafsdfdsf</h1>
                            <p>
                                <span>PP</span>
                                <span>22222</span>
                            </p>
                        </div>
                        <div class="game-note-bottom">
                            <div>
                                <p>{{$t('lang.lotteryNote.bets')}} fsdfsdfdsf</p>
                                <p>{{$t('lang.lotteryNote.noteNumber')}} fsdfsdfdsf</p>
                            </div>
                            <span>fsdfsdf</span>
                        </div>
                    </li>

                </ul>
                <!--        <div class="a-list">
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
                        </div>-->
            </vue-better-scroll>

        </div>
        <!--    <NotData v-else :isNotData="isNotData" />-->
        <!--    底部组件-->
        <transition name="van-slide-up">
            <van-popup v-model="showStatus" position="bottom" class="mod-select-picker-box">
                <van-picker
                        show-toolbar
                        :value="value"
                        :title="$t('lang.lotteryNote.selectGame')"
                        :columns="contentList"
                        @cancel="showStatus = false"
                        @confirm="getGameType"
                        cancel-button-text=" "
                        value-key="name"
                        :confirm-button-text="$t('lang.common.buttonTextConfirm')"
                >
                </van-picker>
            </van-popup>
        </transition>
    </div>
</template>
<script>
  import NotData from '../../commons/notdata/NotData'
  import VueBetterScroll from '../../commons/scroll/BScroll'
  import {mapActions,mapState} from 'vuex'

  export default {
    name: 'GameNote',
    components: {
      NotData,
      VueBetterScroll
    },
    props: {
      startTime: Date,
      endTime: Date,
      timeShow: Boolean,
      tabActive: 0,
    },
    data() {
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
        dataDel: {},
        showSet: false,
        type: 0,
        showStatus: false,
        status: '',
        statusList: [],
        gameType: this.$t('lang.lotteryNote.allChess'),
        // value: [this.$t('lang.RechargeData.All'), this.$t('lang.lotteryNote.allPlatform'), this.$t('lang.lotteryNote.allChess'), this.$t('lang.lotteryNote.allGames')],
        value:'',
      }
    },
    created() {
      this.$http.home.allLiveGames().then((res) => {
        this.dzList = res.data
        console.log(this.dzList);
        const liveCode = res.data[0].code
        this.liveCode = liveCode
        this.queryData(1, liveCode, 1)
      })
      this.getNavigation()
    },
    methods: {
      ...mapActions([
        'getNavigation'
      ]),
      // 下拉刷新
      onPullingDown() {
        setTimeout(() => {
          this.page = 1
          this.queryData(1, this.liveCode, 1)
        }, 500)
      },
      // 上拉 加载更多数据
      onPullingUp() {

        setTimeout(() => {
          this.page = this.page + 1
          this.queryData(this.page, this.liveCode, 2)
        }, 500)
      },
      queryData(page, liveCode, type) {
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
            let isForceUpdate = this.noteList.length === this.totalCount
            setTimeout(() => {
              this.$refs.Nscroll.forceUpdate(!isForceUpdate)
            }, 100)
          }
        })
      },

      getGameType(val) {
        console.log(val)
        this.status =  val.status;
        this.queryData(1,1);
        this.showStatus = false
        this.value = val.name
      },

      getGame(i) {
        const liveCode = this.dzList[i].code
        this.gameTabActive = i
        this.isNotData = true
        this.noteList = []
        this.queryData(1, liveCode, 1)
      },
      showDel(v) {
        this.show = true
        this.dataDel = v
      },
    },
    computed:{
      ...mapState([
          'navigationList'
      ]),
      contentList() {
        let {type} = this.$route.query;
        // let type = this.type;
        let list = this.navigationList;
        if (list.length > 0) {
          for (let i = 0; i < list.length; i++) {
            let item = list[i];
            console.log(type, item.type, '000000');
            if (Number(type) === item.type) {
              console.log(item, 'item---item');
              if (item.children.length > 0) {
                let child = item.children[0];
                this.value = item.children[0].name;
                console.log(child, child.gameTypeId, 'childdd');
                this.gameTypeCode = child.gameTypeId;
                // this.$nextTick(()=>{
                //   this.getDetailList();
                // })
              }
              return item && item.children;
            }
          }
        } else {
          return []
        }
        // if (content[type] !== undefined) {
        //   console.log(2);
        //   this.navId = content[type][0].id;
        //   this.$nextTick(() => {
        //     this.getDetailList();
        //   })
        //   return content[type]
        // } else {
        //   return [];
        // }
      }

    },
    watch: {
      timeShow() {
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

    .game-note-box {
        .tab-nav-box {
            min-height: 65px;
            background-color: #191B1F;
            ul li {
                display: flex;
                width: px2rem(280px);
                height: px2rem(40px) !important;
                background-color: #24252D;
                border-radius: 20px;
                line-height: px2rem(40px);
                color: #fff !important;
                border: solid 1px #393940;
                justify-content: space-between !important;
                padding: 0 10px !important;
                /*span {*/
                /*    !*padding-right: 50px;*!*/
                /*}*/
                i {
                    font-size: 3px;
                }
            }
        }
        .game-note-con {
            background-color: #24252D;
            li {
                padding: 15px;
                &:not(:last-child) {
                    @include border-1px(#2E2E36)
                }
                .game-note-top {
                    display: flex;
                    justify-content: space-between;

                    h1 {
                        font-size: 16px;
                        color: #fff;
                    }

                    p {
                        font-size: 12px;
                        color: #9a9aa7;
                        display: flex;
                        span {
                            display: flex;
                            &:nth-child(1){
                                &:after {
                                    content: '';
                                    display: block;
                                    width: 1px;
                                    height: 12px;
                                    background-color: #9a9aa7;
                                    margin: 0 7px;
                                }
                            }
                        }
                    }
                }

                .game-note-bottom {
                    margin-top: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    div {
                        font-size: 13px;
                        color: #9a9aa7;
                        p {
                            margin: 6px 0;
                        }
                    }
                    span {

                        font-size: 18px;
                        font-weight: 600;
                        color: #fff;
                    }
                }
            }
        }
    }

    /*灰色样式*/
    .skin-gray {
        .game-note-box {
            .tab-nav-box {
                ul li {
                    border-color: $skin-gray-border-color;
                    background-color: $skin-gray-bg;

                }
            }
            .game-note-con {
                background-color:$skin-gray-con-bg;
                li {
                    padding: 15px;
                    &:not(:last-child) {
                        @include border-1px($skin-gray-border-color)
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
