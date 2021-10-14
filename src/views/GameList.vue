<template>
  <div class="game-list-wrapper">
    <van-nav-bar :title="title"
                 class="tab-head"
                 left-arrow
                 @click-left="$router.push('/')"/>
    <div class="all-content">
      <VueBetterScroll class="wrapper"
                       ref="newScroll"
                       :scrollbar="scrollbarObj"
                       :pullDownRefresh="pullDownRefreshObj"
                       :pullUpLoad="pullUpLoadObj"
                       :startY="parseInt(startY)"
                       @pulling-down="refresh"
                       @pulling-up="onLoad">
        <div class="game-view"
             v-if="gameList && gameList.length>0">
          <ul class="game-list">
            <li :key="i" @click="_getUrl(item)"
                v-for="(item, i) in gameList">
              <img :src="imgUrl(item)" alt=""/>
              <span>{{whichLang(item)}}</span>
            </li>
          </ul>
        </div>
        <NotData v-else :isNotData="isNotData"/>
      </VueBetterScroll>
      <!--<van-pull-refresh v-model="refreshing" @refresh="refresh" class="fresh">-->
      <!--<van-list v-model="loading"-->
      <!--:finished="finished"-->
      <!--finished-text="没有更多了"-->
      <!--@load="onLoad">-->

      <!--</van-list>-->
      <!--</van-pull-refresh>-->

    </div>

    <IframeGame v-if="isShow"
                :typeId="id"
                :iframeSrc="threeGameUrl"
                @showIframe="showIframe"/>
  </div>
</template>

<script>
  import {Dialog,Toast} from 'vant'
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {LANG} from "../utils/mode";
  import VueBetterScroll from '../commons/scroll/BScroll'

  export default {
    name: 'GameList',
    components: {
      VueBetterScroll,
      IframeGame: resolve => require(['../commons/iframegame/IframeGame'], resolve),
      NotData: resolve => require(['../commons/notdata/NotData'], resolve)
    },
    data() {
      return {
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
        title: '',
        // gameList: [],
        isNotData: true,
        imgFix: localStorage.getItem('imgSuffix'),
        iframeSrc: '',
        isShow: false
      }
    },
    computed: {
      gameList() {
        let list = JSON.parse(JSON.stringify(this.threeGameList));
        if (list !== '' || list !== null) {
          return list;
        }
      },
      ...mapState([
        'distThreeImgUrl',
        'threeGameList',
        'threeGameUrl',
        'userInformation'
      ])
    },
    mounted() {
      this.lang = this.$i18n.locale;
      this.title = this.$route.query.name;
      this.id = Number(this.$route.query.id);
      this.$nextTick(() => {
        this.refresh(); // 初始化数据
      });
    },
    created() {
      const params = {
        liveCode: 'ky',
        page: 1,
        rows: 100,
        isH5: 0
      };
      // this.$http.home.getGameList(params).then((res) => {
      //   if (res.data.data.length > 0) {
      //     this.gameList = res.data.data
      //   } else {
      //     this.isNotData = false
      //   }
      // })
    },
    methods: {
      // vincent -- start
      // 上拉 加载更多数据
      onLoad(item) {
        console.log(item, 'more');
        // this.setData({key: 'threeGameList', value: []});
        this.page++;
        setTimeout(() => {
          let params = {category: this.id, isH5: 0, page: this.page, rows: this.rows};
          this.getGameList(params).then((_data) => {
            // this.refreshing = false;
            if (_data.data.length === 0) {
              this.isNotData = false
            } else {
              let isForceUpdate = this.threeGameList.length === _data.totalCount
              setTimeout(() => {
                this.$refs.newScroll.forceUpdate(!isForceUpdate)
              }, 100)
            }
          });
        }, 500)
      },
      // 下拉刷新
      refresh() {
        console.log('refresh');
        this.setData({key: 'threeGameList', value: []});
        this.page = 1;
        this.loading = false;
        setTimeout(() => {
          let params = {category: this.id, isH5: 0, page: this.page, rows: this.rows};
          this.getGameList(params).then((_data) => {
            if (_data.data.length === 0) {
              this.isNotData = false
            } else {
              let isForceUpdate = this.threeGameList.length === _data.totalCount
              setTimeout(() => {
                this.$refs.newScroll.forceUpdate(!isForceUpdate)
              }, 100)
            }
          });
        }, 500)
      },
      _getUrl(item) {
        // let category = item.gameCategory;
        console.log(item,'url');
        let info = this.userInformation;
        let params = {
          username: info.account,
          platform: item.liveCode,
          gameCode: item.gameType,
          mobile: 'yes'
          // lang: 'zh_CN'
        };
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner',
        });
        this.getGameUrl(params).then((_data)=>{
          console.log(_data,'game---uuuuurrrrlllll');
          if(_data !== ''){
            this.isShow = true;
            Toast.clear();
          }
        });
      },
      imgUrl(item) {
        let str = `/data/imgs/${item.liveCode}image/${item.h5ImageName}?${this.imgFix}`;
        return str
      },
      whichLang(item) {
        if (this.$i18n.locale === LANG.china) {
          return item.chineseName
        } else {
          return item.englishName
        }
      },
      ...mapMutations({
        setData: 'SET_DATA'
      }),
      ...mapActions([
        'getGameList',
        'getGameUrl'
      ]),
      // vincent -- end
      openGame(opt) {
        const token = this.$cookie.get('token');
        this.isShow = true;
        if (token === null || token === '') {
          Dialog.confirm({
            title: '温馨提示',
            message: '请登入后再进入游戏'
          }).then(() => {
            this.$router.push('/login')
          }).catch(() => {
          })
          return false
        }
        const params = {
          liveCode: opt.liveCode,
          gameType: opt.gameType,
          isMobile: true
        }
        if (opt.liveCode === 'pt') {
          return false
        } else if (opt.liveCode === 'bbin') {
          params.gameType = 'game'
        } else if (opt.liveCode === 'ltlottery') {
          (params.liveCode = 'bbin'), (params.gameType = 'ltlottery')
        }
        this.$http.home.playGame(params).then((res) => {
          this.iframeSrc = res.data
        }).catch((err) => {
          this.isShow = false
        })
      },
      showIframe() {
        this.isShow = false;
        this.setData({key: 'threeGameUrl', value: ''}); // 清空url
      }
    },
    watch: {
      // threeGameList(newVal) { // 数据内容
      //   if (newVal.length > 0) {
      //     this.loading = true;
      //     this.refreshing = false;
      //   } else {
      //     this.refreshing = true;
      //   }
      // },
      threeGameUrl(newVal) {
        if (newVal !== '') {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  //解决/deep/报警告改为 ::v-deep
  .header,
  /deep/ .van-sticky {
    width: 100%;
    height: 100%;
    /deep/ .van-hairline--bottom::after {
      border-bottom-width: 0;
    }
  }

  .van-nav-bar {
    /*background: #dd413a;*/
    /deep/ .van-nav-bar__title,
    /deep/ .van-nav-bar__text,
    /deep/ .van-icon {
      color: #fff !important;
    }
  }

  .game-list-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    .all-content {
      height: calc(100% - 0.92rem);
      overflow: hidden;
      /*height: 100%;*/
      .fresh {
        height: 100%;
        overflow: scroll;
      }
      .game-view {
        flex: 1;
        .game-list {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          padding: 0.5rem 0 0;
          li {
            width: 33.33%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0 0 .5rem;
            img {
              margin: 0.25rem auto 0.15rem;
              width: 2rem;
              /*height: 1.6rem;*/
            }
            span {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #fff;
            }
          }
        }
      }
    }
  }


</style>
