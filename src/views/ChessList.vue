<template>
  <div class="electronic-content">
    <div class="nav-wrapper">
      <ul class="nav-list" v-if="gameNavList.length>0">
        <li v-for="(item,index) in gameNavList"
            @click="switchIndex(item)"
            :class="currentCode === item.code?'active':''">
          <div>
<!--            <span></span>-->
            {{item.name}}
          </div>
        </li>
      </ul>
    </div>
    <div class="main-content" v-if="currentList !== null">
      <VueBetterScroll class="wrapper"
                       ref="newScroll"
                       :scrollbar="scrollbarObj"
                       :pullDownRefresh="pullDownRefreshObj"
                       :pullUpLoad="pullUpLoadObj"
                       :startY="parseInt(startY)"
                       @pulling-down="refresh"
                       @pulling-up="onLoad">
        <ul v-if="currentList.content.length>0"
            class="all-game">
          <li v-for="(item,index) in currentList.content" :key="index">
            <div @click="_getUrl(item)">
              <img :src="`/data/${item.liveCode}Picture/${item.h5ImageName}`" alt="">
              <span>{{whichLang(item)}}</span>
            </div>
          </li>
        </ul>
        <NotData v-else :isNotData="isNotData"/>
      </VueBetterScroll>
    </div>
    <NotData v-else :isNotData="isNotData"/>
    <iFrameGame v-if="isShow"
                :typeId="id"
                :iframeSrc="threeGameUrl"
                @showIframe="showIframe"/>
  </div>
</template>
<script>
  import {Dialog, Toast} from 'vant'
  import NotData from '../commons/notdata/NotData'
  import iFrameGame from '../commons/iframegame/IframeGame'
  import {mapActions, mapState, mapMutations} from 'vuex'
  import VueBetterScroll from '../commons/scroll/BScroll'
  import {LANG} from "../utils/mode";

  export default {
    name: 'ChessList',
    data() {
      return {
        currentCode: null,
        // vincent -- start
        loading: true,
        finished: false,
        refreshing: false,
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
        page: 1,
        rows: 21,
        id: -1,
        // vincent -- end
        isShow: false,
        iFrameSrc: '',
        isNotData: true, // true:loading,false:noData

        dzList: [],
        gameList: [],

        imgFix: localStorage.getItem('imgSuffix')
      }
    },
    components: {
      NotData,
      iFrameGame,
      VueBetterScroll
    },
    created() {
      this.getAllLiveGame({}).then((data) => {
        let currentCode = data[0].code;
        this.currentCode = currentCode;
        let params = {
          liveCode: currentCode,
          page: this.page,
          rows: this.rows,
          isH5: 0
        };
        this._searchInGameList(params).then((data) => {
          this.isNotData = false;
          this.$nextTick(() => {
            this._isStopLoading(data);
          })
        });
      });
    },
    computed: {
      ...mapState([
        'allLiveGame',
        'currentGameList',
        'isLogin',
        'threeGameUrl',
        'userInformation'
      ]),
      gameNavList() {
        return this.allLiveGame
      },
      currentList() {
        console.log(this.currentGameList, 'currentGameList--chessList');
        return this.currentGameList
      }
    },
    methods: {
      // 当前方法判断插件是否开始加载还是停止加载【有更多还是没有数据】
      _isStopLoading(data) {
        let LEN = this.currentGameList.content.length;
        let isForceUpdate = LEN === data.totalCount;
        setTimeout(() => {
          this.$refs.newScroll.forceUpdate(!isForceUpdate)
        }, 100)
      },
      switchIndex(item) {
        this.currentCode = item.code;
        let params = {
          liveCode: item.code,
          page: this.page,
          rows: this.rows,
          isH5: 0
        };
        this.isNotData = true;
        this._searchInGameList(params).then(() => {
          this.$nextTick(() => {
            this.isNotData = false;
            this._isStopLoading(this.currentGameList);
          })
        });
      },
      // 上拉 加载更多数据
      onLoad() {
        let currentCode = this.currentCode;
        let page = this.currentGameList.page + 1;
        this.loading = false;
        let params = {
          liveCode: currentCode,
          page: page,
          rows: this.rows,
          isH5: 0
        };
        setTimeout(() => {
          this._getLiveGameList(params).then((data) => {
            this.isNotData = false;
            this._isStopLoading(data)
          });
        }, 500)
      },
      // 下拉刷新
      refresh() {
        console.log('refresh');
        this.page = 1;
        let currentCode = this.currentCode;
        this.loading = false;
        let params = {
          liveCode: currentCode,
          page: this.page,
          rows: this.rows,
          isH5: 0
        };
        this._clearInGameList(params).then(() => {
          setTimeout(() => {
            this._getLiveGameList(params).then((data) => {
              this.isNotData = false;
              this._isStopLoading(data);
            });
            console.log(this.currentGameList, 'refresh---');
          }, 500)
        })
      },
      _getUrl(item) {
        if (this.isLogin) { // 已经登录
          console.log(item, 'itemtiemtemt');
          this.id = Number(item.id);
          Toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
          });
          let info = this.userInformation;
          let params = {
            username: info.account,
            platform: item.liveCode,
            gameCode: item.gameType,
            mobile: 'yes'
            // lang: 'zh_CN'
          };
          this.getGameUrl(params).then((_data) => {
            console.log(_data, 'game---uuuuurrrrlllll');
            if (_data !== '' && _data !== undefined) {
              console.log(1);
              this.isShow = true;
              Toast.clear();
            } else {
              console.log(2);
            }
          });
        } else {
          Dialog.confirm({
            title: '温馨提示',
            message: '请登入后再进入游戏'
          }).then(() => {
            this.$router.push('/login')
          }).catch(() => {
          })
          return false
        }
      },
      whichLang(item) {
        if (this.$i18n.locale === LANG.china) {
          return item.chineseName
        } else {
          return item.englishName
        }
      },
      showIframe() {
        this.isShow = false;
        this.setData({key: 'threeGameUrl', value: ''}); // 清空url
      },
      ...mapMutations({
        setData: 'SET_DATA'
      }),
      ...mapActions([
        'getAllLiveGame',
        '_searchInGameList',
        '_getLiveGameList',
        '_clearInGameList',
        'getGameUrl'
      ])
    }
  }
</script>
<style lang="scss" scoped>
  .skin-gray {
    $border-color: #717180;
    .qp-content {
      /deep/ .van-tabs {
        .van-tabs__wrap {
          border-bottom: 1px solid $border-color;
          .van-tabs__nav {
            background: #464461;
            padding: 0;
            .van-tab {
              color: #fff;
            }
            .van-tab--active {
              span {
                border: solid 1px #ffd57d;
                background-color: #494b56;
                color: #ffd57d;
              }
            }
          }
        }
        .van-tabs__content {
          background: #413F5A;
          color: #fff;
        }
      }
      /*/deep/ .van-tabs__content{*/
      /*background: #413F5A;*/
      /*color: #fff;*/
      /*}*/
    }
    .electronic-content{
      .nav-wrapper ul.nav-list{
        background: linear-gradient(to bottom, #494664, #303244);
        li{
          background: linear-gradient(to right, #605E75, #4C4A65);
          &.active{
            background-image: linear-gradient(to bottom, #413f56 1%, #2b293e);
          }
        }
      }
    }
  }

  .skin-black {
    $border-color: #393940;
    .qp-content {
      /deep/ .van-tabs {
        .van-tabs__wrap {
          border-bottom: 1px solid $border-color;
          .van-tabs__nav {
            background: #24252D;
            padding: 0;
            .van-tab {
              color: #8f8f8f;
            }
            .van-tab--active {
              span {
                background-image: linear-gradient(to bottom, #efcea6, #dab591);
                color: #533510;
                font-weight: bold;
              }
            }
          }
        }
        .van-tabs__content {
          background: #191B1F;
          color: #fff;
        }
      }
      /*/deep/ .van-tabs__content{*/
      /*background: #413F5A;*/
      /*color: #fff;*/
      /*}*/
    }
  }

  .electronic-content {
    display: flex;
    height: calc(100% - 1rem);
    .nav-wrapper {
      width:20%;
      ul.nav-list {
        width: 100%;
        height: 100%;
        overflow-x: scroll;
        background: #24252D;
        border-bottom: 0.02rem #2F2F36 solid;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        & > li {
          width:100%;
          min-height: 1.12rem;
          color:#9a9aa7;
          &.active {
            color: #ffd57d;
            border-left: 2px solid #ffd57d;
            box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.31);
            background: #24252D;
          }
          div {
            width:100%;
            height:100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
    .main-content {
      width: 100%;
      height: calc(100% - 1rem);
      position: relative;
      overflow: hidden;
      .wrapper {
        height: 100%;
        .all-game {
          display: flex;
          flex-wrap: wrap;
          padding: 0.2rem 0 0;
          li {
            width: 33.3%;
            margin: 0 0 0.2rem;
            div {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;
              img {
                width: 2rem;
              }
              span {
                line-height: 20px;
                color: #fff;
              }
            }
          }
        }
      }
    }
    /deep/ .van-tabs {
      display: flex;
      flex-direction: column;
      height: 100%;
      .van-tabs__content {
        flex: 1;
        overflow: scroll;
      }
      .van-tabs__wrap .van-tabs__nav .van-tab--active span {
        width: 1.6rem !important;
        /*padding:0 px2rem(5px);*/
      }
    }
    .rg-content {
      height: 100%;
      overflow: scroll;
      padding: 0.2rem 0.2rem 0rem 0.2rem;
      .r-title {
        margin: 0 0 0.3rem 0.1rem;
        font-size: 0.32rem;
      }
      .l-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .l-item-del {
          display: flex;
          flex-direction: column;
          width: 33.33%;
          align-items: center;
          margin-bottom: 0.3rem;
          ::v-deep.van-image {
            width: 1.6rem;
            height: 1.6rem;
          }
          span {
            margin-top: 0.1rem;
          }
        }
      }
    }
  }
</style>
