<template>
  <div class="index-content">
    <div class="index-header">
      <div class="left">
        <h1>{{ serviceInfo && serviceInfo.indexTitle }}</h1>
      </div>
      <div class="right">
        <div v-if="loginState"
             :class="loginState ? '' : 'messages-box'"
             @click="$router.push('/messageList')">
        </div>
        <div v-else
             :class="loginState ? '' : 'messages-box'"
             @click="$router.push('/reg')">
          {{ $t('lang.loginContent.register') }}
        </div>
        <div :class="loginState ? 'user-info-box' : ''"
             v-if="loginState">
          <a target="_blank"
             href="https://ro034vs.cn/HbRO.html"
             class="download-link">
            <span>{{ $t('lang.header.download') }}</span>
          </a>
          <!--          <img :src="'/data/userimg/userimg' + (usersInfo.uid % 5) + '.png'"/>-->
          <!--          <span>{{ usersInfo.money == null ? "0.00" : usersInfo.money.toFixed(2) }}</span>-->
        </div>
        <div v-else
             :class="loginState ? '' : 'user-info-box'"
             @click="$router.push('/login')">
          {{ $t('lang.loginContent.login') }}
        </div>
      </div>
    </div>
    <div class="main-content">
      <div class="slider">
        <!--公告-->
        <div class="notice-wrapper" v-if="noticeList.length>0"
             @click="$router.push('/noticeList')">
          <i class="iconic-announcement iconfont"></i>
          <van-notice-bar mode="link">
            <span v-for="(v,i) in noticeList" :key="i">
              {{v.noticeTitle}} {{v.noticeContent}}
            </span>
            <!--            <van-swipe-->
            <!--                    vertical-->
            <!--                    class="notice-swipe"-->
            <!--                    :autoplay="3000"-->
            <!--                    :show-indicators="false"-->
            <!--            >-->
            <!--              <van-swipe-item v-for="(v,i) in noticeList" :key="i">-->
            <!--                &lt;!&ndash;{{v.noticeTitle}}&ndash;&gt;-->
            <!--                <div v-html="v.noticeContent"></div>-->
            <!--              </van-swipe-item>-->
            <!--            </van-swipe>-->
          </van-notice-bar>
          <!--          <marquee scrollamount="3">-->
          <!--            <span v-for="(v,i) in noticeList" :key="i">{{v.noticeContent}}</span>-->
          <!--          </marquee>-->
          <!--          <i class="iconfont iconic-right"></i>-->
          <!--          <van-notice-bar :scrollable="false">-->
          <!--            <van-swipe-->
          <!--                    vertical-->
          <!--                    class="notice-swipe"-->
          <!--                    :autoplay="3000"-->
          <!--                    :show-indicators="false"-->
          <!--            >-->
          <!--              <van-swipe-item v-for="(v,i) in noticeList" :key="i">{{v.noticeContent}}</van-swipe-item>-->
          <!--            </van-swipe>-->
          <!--          </van-notice-bar>-->

        </div>
        <!--转账-->
        <div class="tab-wrapper">
          <div class="tab-item"
               @click="bouncePage('/recharge')">
            <i class="iconic-deposit iconfont"></i>
            <span>{{ $t('lang.index.depositRecharge') }}</span>
          </div>
          <!--            <div class="tab-item" @click="getGame">-->
          <!--              <img :src="require(`../assets/img/home_game.png`)"/>-->
          <!--              <span>{{ $t('lang.index.boardGame') }}</span>-->
          <!--            </div>-->
          <div class="tab-item" @click="bouncePage('/balanceChange')">
            <i class="iconfont iconic-transfer"></i>
            <span>{{ $t('lang.header.walletTransfer') }}</span>
          </div>
          <!--          <div class="tab-item" @click="bouncePage('/promotions')">-->
          <!--            <i class="iconfont iconCombinedShape"></i>-->
          <!--            <span>{{ $t('lang.header.Promotions') }}</span>-->
          <!--          </div>-->
          <router-link class="tab-item" tag="div" :to="{name:'Promotions'}">
            <i class="iconfont iconCombinedShape"></i>
            <span>{{ $t('lang.header.Promotions') }}</span>
          </router-link>
          <a class="tab-item" @click="showDialog = true" target="_blank">
            <i class="iconfont iconic-24service"></i>
            <span>{{ $t('lang.withDraw.onlineService') }}</span>
          </a>
        </div>
      </div>
      <div class="other-scroll">
        <!-- 轮播图 -->
        <div class="slider-wrapper">
          <van-swipe :autoplay="3000" :stop-propagation="false">
            <van-swipe-item v-for="(item, index) in sliderList" :key="index">
              <template #indicator>
                <div class="custom-indicator"></div>
              </template>
              <van-image :src="imgAddress+item.homeImgUrl"
                         @click="goToPages(item,index)">
                <template v-slot:loading>
                  <img :src="require(`../assets/img/_default/unloaded.png`)"/>
                </template>
                <template v-slot:error>
                  <img :src="require(`../assets/img/_default/unloaded.png`)"/>
                </template>
              </van-image>
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- 主体 -->
        <div class="main-wrapper">
          <div class="main-list">
            <div class="list-wrapper"
                 v-if="currentNavContent.length>0">
              <div class="title-list">
                <ul>
                  <li v-for="(item,index) in currentNavContent"
                      @click="switchClick(item,index)">
                    <div :class="currentType === Number(item.type)? 'active':''">
                      <img :src="item.images === '' ? '/data/image/404.png': imgAddress+item.activeImages + '?' + imgFix"
                           v-show="item.images !== '' && currentType === Number(item.type)">
                      <img :src="item.images === '' ? '/data/image/404.png': imgAddress+item.images + '?' + imgFix"
                           v-show="item.images !== '' && currentType !== Number(item.type)"
                           alt="">
                      <!--<img src="../assets/img/blue/badge-1.svg" alt="">-->
                      <span v-if="lang === LANG.china">{{item.name}}</span>
                      <span v-if="lang === LANG.english">{{item.name[0].toUpperCase()+item.name.slice(1)}}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="content-list">
                <div class="content-item"
                     v-for="(items,topIndex) in currentNavContent">
                  <div class="item-wrapper"
                       v-if="Number(items.type)===currentType">
                    <ul v-if="items.children && items.children.length > 0">
                      <li v-for="(item,index) in items.children"
                          :class="[currentType === defaultType? 'lottery-item': 'other-item']">
                        <!--彩票-->
                        <div @click="openLottery(item)"
                             v-if="currentType === defaultType">
                          <img v-if="currentType === defaultType"
                               v-lazy="`${item.logoSrc}`"
                               :src="item.logoSrc === '/views/image/' ? '/data/image/404.png': item.logoSrc"/>
                          <img v-else
                               v-lazy="`${item.images}`"
                               :src="item.images === '/views/image/' ? '/data/image/404.png': item.images"/>
                          <span>{{item.name}}</span>
                          <p>{{item.remarks}}</p>
                        </div>
                        <!--其他-->
                        <div v-else
                             @click="gotoGame(items,item)"
                             :style="`background-image: url(${imgAddress}${item.bjimages})`">
                          <img :src="item.images === '/views/image/' ? '/data/image/404.png': imgAddress+item.images"
                               class="logo-img"
                               alt="">
                          <!--<img :src="item.bjimages === '/views/image/' ? '/data/image/404.png': item.bjimages + '?' + imgFix"-->
                          <!--class="bg-img" alt="">-->
                        </div>
                      </li>
                    </ul>
                    <div class="no-data" v-else>
                      <div class="over-lay" v-if="navigationIsLoading">
                        <loading class="loading"></loading>
                      </div>
                      <noData v-else class="sub-content"></noData>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <loading v-else class="loading"></loading>
          </div>
        </div>
      </div>
    </div>
    <CustomerServe :showDialog="showDialog" @closeDialog="handleCloseDialog"/>
    <iFrameGame v-if="isShow" :iframeSrc="iframeSrc" @showIframe="isShow = false"/>
    <Dialog :showDialog="isTryDialog" @closeDialog="handleCloseDialog" class="try-play-box">
      <div slot="content">
        <div class="m-vital-confirm">
          <div class="confirm-content">
            <div class="try-play-img"></div>
            <!--            <img src="https://sp-res-wap.ftfxgame.com/fusion/wap/release/static/img/group.461451e3.png"-->
            <!--                 class="confirm-img">-->
            <div class="dialog-message">
              <!--              <p>{{ $t('lang.tryItForFree.pleaseLogFirst') }}</p>-->
              <p>{{ $t('lang.user.notVIP') }}</p>
              <p>{{ $t('lang.user.howVip') }}</p>

            </div>
            <!--            <h1 class="fs-36 bold">{{ $t('lang.user.notVIP') }}</h1>-->
            <!--            <p class="tip"></p>-->
            <div class="dialog-footer">
              <span class="button cancel" @click="$router.push('/login')"> {{ $t('lang.loginContent.loginNow') }}</span>
              <i>|</i>
              <span class="button" @click="isTryDialog=false"> {{ $t('lang.loginContent.register') }}</span>
            </div>
            <!--            <div class="m-button" @click="$router.push('/login')">-->
            <!--              {{ $t('lang.registerContent.signInNow') }}/{{ $t('lang.loginContent.register') }}-->
            <!--            </div>-->
            <!--            <p class="no" @click="isTryDialog=false">{{ $t('lang.user.cancel') }}</p>-->
          </div>
          <div class="close-box" @click="isTryDialog=false">
            <i class="iconfont iconic-close"></i>
          </div>
        </div>
      </div>
    </Dialog>
    <!--<MaskLog :showDialog="isTryDialog"-->
    <!--@closeDialog="handleCloseDialog">-->
    <!--<div slot="content">-->
    <!--<div class="m-vital-confirm">-->
    <!--<div class="confirm-content">-->
    <!--<img src="https://sp-res-wap.ftfxgame.com/fusion/wap/release/static/img/group.461451e3.png"-->
    <!--class="confirm-img">-->
    <!--<h1 class="fs-36 bold">{{ $t('lang.user.notVIP') }}</h1>-->
    <!--<p class="tip"></p>-->
    <!--<div class="m-button" @click="$router.push('/login')">-->
    <!--{{ $t('lang.registerContent.signInNow') }}/{{ $t('lang.loginContent.register') }}-->
    <!--</div>-->
    <!--<p class="no" @click="isTryDialog=false">取消</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</MaskLog>-->
    <!-- 底部 -->
    <Footer :actived="active"/>
    <!--遮罩-->
    <van-overlay :show="show" @click="show = false">
      <van-loading class="maskStyle" type="spinner"/>
    </van-overlay>
  </div>
</template>
<script>
  import {mapGetters, mapMutations, mapState, mapActions} from 'vuex'
  import utils from "../utils/utils";
  import noData from '../commons/noData'
  import loading from '../commons/loading'
  import {defaultOwnLotteryType, LANG} from "../utils/mode";
  import Dialog from '../commons/dialog/Dialog'

  export default {
    name: 'Index',
    data() {
      return {
        // vincent -- start
        LANG: LANG,
        defaultType: defaultOwnLotteryType,
        isTryDialog: false,
        // vincent -- end
        isData: true, // 初次数据是否加载
        //
        iframeSrc: '',
        loading: false,
        isShow: false,
        show: false,
        showDialog: false,
        notice: '',
        tabList: [
          {name: 'lang.index.popularLottery'},
          {name: 'lang.index.boardGame'},
          {name: 'lang.index.liveVideo'},
          {name: 'lang.index.electronicGames'}
        ],
        recommend: [], // 热门棋牌
        active: 0,
        tabActive: 0,
        images: [], // 轮播图片
        lotteryList: [],  // 彩票信息
        gameList: [],
        winningList: [], // 中奖轮播信息
        version: 0.01, // 版本
        imgFix: localStorage.getItem('imgSuffix'),
      }
    },
    components: {
      noData,
      loading,
      Dialog,
      iFrameGame: resolve => require(['../commons/iframegame/IframeGame'], resolve),
      Footer: resolve => require(['../commons/footer/Footer'], resolve),
      CustomerServe: resolve => require(['../commons/customerserve/Customerserve'], resolve),
      MaskLog: resolve => require(['../commons/dialog/Dialog'], resolve),
    },
    computed: {
      // vincent -- start
      ...mapState([
        'isLogin', // 判断是否登录
        'navigationList', // 导航title
        'navigationContent', // 导航回来的内容
        'navigationIndexType', // 默认的indexType
        'navigationIsLoading', // loading
        'indexRecommendLottery', // 推荐彩种
        'noticeList', // 公告
        'sliderList', // 轮播
        'serviceInfo', // 服务信息
        'userInformation',
        'extInformation',
        'lang',
        'imgAddress'
      ]),
      loginState() {
        return this.isLogin;
      },
      noticeContent() {
        if (this.noticeList.length > 0) {
          return this.noticeList;
        }
      },
      currentType() {
        // 左侧点击导航点击后记录的index
        return this.navigationIndexType;
      },
      currentNavContent() {
        // 将nav里面内容放到navigationList里面去
        // console.log(this.navigationList, 'updateeeee');
        return this.navigationList
      },
      // vincent -- end
    },
    methods: {
      // vincent -- start
      ...mapActions([
        'getNavigationContent',
        'getIndexOwnLottery',
        'getGameList',
        'getUserInfo'
      ]),
      gotoGame(items, item) {
        console.log(item, 'game');
        if (this.loginState) { // 已经登录可以跳转
          this.$router.push({
            path: '/GameList',
            query: {name: item.name, id: item.id}
          });
        } else { // 没有登录
          this.$toast({
            // duration: 0,
            message: this.$t('lang.tryItForFree.pleaseLogFirst'),
            icon: 'warning',
            className: 'toast-color-index',
            onClose: () => {
              this.$router.push('/Login')
            }
          })
        }
      },
      switchClick(item, number) {
        let type = Number(item.type);
        this.setData({key: 'navigationIndexType', value: type});
        this.$nextTick(() => {
          console.log(type, this.navigationIndexType, this.navigationList, 'itemtete');
        });
        // let navList = this.navigationList;
        // for (let i = 0; i < navList.length; i++) {
        //   let value = navList[i];
        //   if (type === Number(value.type)) {
        //     if (value.content === undefined || value.content === '') { // 没有内容
        //       if (type === defaultOwnLotteryType) {
        //         this.getIndexOwnLottery({})
        //       } else {
        //         this.getNavigationContent({type: type});
        //         this.setData({key: 'navigationIsLoading', value: true});
        //         return;
        //       }
        //     }
        //   }
        // }
      },
      bouncePage(name, type) {
        if (!this.loginState) {
          this.$toast({
            // duration: 0,
            message: this.$t('lang.tryItForFree.pleaseLogFirst'),
            icon: 'warning',
            className: 'toast-color-index'
          })
          return
        }
        if (this.userInformation.type === 'TEST') {
          this.isTryDialog = true
        } else {
          this.$router.push(name)
        }
      },

      // vincent -- end
      ...mapMutations({
        setData: 'SET_DATA',
      }),
      onClickShow() {
        this.show = true
      },
      goToPages(val, index) {
        this.$router.push({path: '/promotions', query: {count: val.id}})
      },
      getGame() {
        this.$router.push({path: '/Lottery', query: {type: 1}})
      },
      openLottery(item) {
        console.log(item, 'openLottery');
        let data = {};
        if (item.category === '60') {
          let lotteryId = item.href;
          console.log(lotteryId);
          if (lotteryId === "moreGame") {
            this.$router.push({path: '/Lottery'})
          } else {
            // this.$router.push({
            //   path: item.type,
            //   query: {lotteryId: lotteryId, itemCate: item.cate, type: item.type, code: item.code}
            // })
            this.$router.push({
              path: '/lotteryNew',
              query: {id: lotteryId}
            })
          }
        }
        else if (item.category === '30') {
          this.$router.push({
            path: '/GameList',
            query: {name: item.name}
          })
        }
        else if (item.category === '40') {
          this.isNotData = false
          if (item.type === 'ag') {
            this.onClickShow()
            data = {
              liveCode: item.type,
              gameType: 1,
              isMobile: true
            };
          } else if (item.type === 'bg') {
            this.onClickShow()
            data = {
              liveCode: item.type,
              gameType: '',
              isMobile: true
            };
          } else {
            this.$toast('暂未开放，请尝试其他视讯！')
            return
          }
          this.$http.home.gameApi(data).then(res => {
            console.log(res.data);
            window.location.href = res.data
          }).catch(err => {
            this.isShow = false
            this.show = false
          })
        }
        else if (item.category === '50') {
          switch (item.type) {
            case 'AG':
              this.onClickShow()
              let data = {
                liveCode: item.type.toLowerCase(),
                gameType: 8,
                isMobile: true
              };
              this.$http.home.gameApi(data).then(res => {
                console.log(res.data);
                window.location.href = res.data
              }).catch(err => {
                console.log(err);
              })
              break;
            default :
              this.$toast('暂未开放，请尝试其他电子游戏！')
          }
        }
      },
      open(opt) {
        const token = this.$cookie.get('token')
        if (token === null || token === '') {
          Dialog.confirm({
            title: this.$t('lang.ExplainWithDraw.Reminder'),
            message: this.$t('lang.index.dengLuJinRu')
          }).then(() => {
            this.$router.push({path: '/Login'})
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
          params.liveCode = 'bbin';
          params.gameType = 'ltlottery'
        }
        this.isShow = true
        this.$http.home.playGame(params).then((res) => {
          this.iframeSrc = res.data
          console.log(this.iframeSrc);
        }).catch((err) => {
          this.isShow = false
        })
      },
      // 客服弹窗
      handleCloseDialog(val) {
        this.showDialog = val
      },
    },
    mounted() {
    },
    created() {
    }
  }
</script>
<style scoped lang="scss">
  * {
    touch-action: auto;
  }

  .skin-black {
    $button-bg: linear-gradient(to bottom, #414650, #292A35);
    $button-bg-active: linear-gradient(to bottom, #efcea6, #dab591);
    .index-content {
      background: #191B1F;
      .index-header {
        background-image: linear-gradient(to bottom, #65317d, #293384);
        .right {
          .user-info-box {
            background-image: $button-bg-active;
            color: #533510;
            a {
              color: #533510;
            }
          }
        }
      }
      .main-content {
        .slider {
          .notice-wrapper {
            .iconfont:not(:last-child) {
              color: $skin-black-gold-color;
            }
          }
          .tab-wrapper {
            backdrop-filter: blur(18px);
            box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.31);
            background: #24252d;
            /*background-image: linear-gradient(to bottom, #413f56, #2b293e);*/
            .tab-item {
              .iconfont {
                color: #DEB995;
              }
              span {
                color: #8f8f8f;
              }
            }
          }
        }
        .other-scroll {
          .main-wrapper {
            .main-list {
              .list-wrapper {
                .title-list {
                  ul {
                    li {
                      div {
                        background-image: $button-bg;
                        span {
                          color: #dcae8f;
                        }
                        &.active {
                          background-image: $button-bg-active;
                          span {
                            color: #333441;
                          }
                        }
                      }
                    }
                  }
                }
                .content-list {
                  .content-item {
                    .item-wrapper {
                      ul {
                        li {
                          @include bg-image('../assets/img/index/gameintry-2-box');
                          background-size: 130px 126px;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

      }
      .try-play-box {
        .content-center, .confirm-content {
          background: $skin-black-con-bg;
        }
        .try-play-img {
          @include bg-image('../assets/themes/hjb/black/img/try-play');
          background-size: cover;
        }
        .dialog-footer {
          color: #533510;
          background: linear-gradient(to bottom, #FFEBC2, #FFD680);
        }
      }
    }
  }

  .skin-gray {
    $button-bg: linear-gradient(to bottom, #817EAA 20%, #3A3948);
    $button-bg-active: linear-gradient(to bottom, #ffedc6, #ffd57d);
    .index-content {
      background: #403E58;
      .index-header {
        background-image: linear-gradient(92deg, #54517b 0%, #747199 99%, #747199 99%) !important;
        .right {
          .messages-box {
            border-color: #ffd57d;
            color: #ffd57d;
            background: none;
          }
          .user-info-box {
            background-image: $button-bg-active;
            color: #533510;
            a {
              color: #533510;
            }
          }
        }
      }
      .main-content {
        .slider {
          .notice-wrapper {
            .iconfont:not(:last-child) {
              color: $skin-gray-gold-color;
            }
          }
          .tab-wrapper {
            backdrop-filter: blur(18px);
            box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.31);
            background-image: linear-gradient(to bottom, #413f56, #2b293e);
            .tab-item {
              &:nth-child(1) {
                .iconfont {
                  color: #FF533F;
                }
              }
              &:nth-child(2) {
                .iconfont {
                  color: #F97900;
                }
              }
              &:nth-child(3) {
                .iconfont {
                  color: #FAC65C;
                }
              }
              &:nth-child(4) {
                .iconfont {
                  color: #13DEFA;
                }
              }
            }
          }
        }
        .other-scroll {
          .main-wrapper {
            .main-list {
              .list-wrapper {
                .title-list {
                  ul {
                    li {
                      div {
                        background: $button-bg;
                        span {
                          color: #f8cf7a;
                        }
                        &.active {
                          background: $button-bg-active;
                          span {
                            color: #333441;
                          }
                        }
                      }
                    }
                  }
                }
                .content-list {
                  .content-item {
                    .item-wrapper {
                      ul {
                        li {
                          @include bg-image('../assets/img/index/gameintry-6-box');
                          background-size: 130px 126px;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

      }
      .try-play-box {
        .content-center, .confirm-content {
          background: linear-gradient(to bottom, #403F56, #2B293F);
        }
        .try-play-img {
          @include bg-image('../assets/themes/hjb/grey/img/try-play');
          background-size: cover;
        }
        .dialog-footer {
          color: #533510;
          background: linear-gradient(to bottom, #FFEBC2, #FFD680);
        }
      }
    }
  }

  .index-content {
    height: 100%;
    padding-bottom: 1.6rem;
    display: flex;
    flex-direction: column;
    .index-header {
      // background: $global-bgcolor;
      color: #fff;
      position: relative;
      /*z-index: 1;*/
      /*min-height: 0.88rem;*/
      text-align: center;
      height: 2.5rem;
      background-image: linear-gradient(to bottom, #65317d, #293384);
      font-weight: 500;
      display: flex;
      justify-content: space-around;
      border-bottom-left-radius: .3rem;
      border-bottom-right-radius: .3rem;
      .left {
        font-size: .4rem;
        margin: .26rem 1.6rem 0 0;
      }
      .right {
        font-size: .32rem;
        display: flex;
        justify-content: space-around;
        margin-top: .16rem;

        .messages-box,
        .user-info-box {
          width: 1.76rem;
          height: .64rem;
          border-radius: .36rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        //注册
        .messages-box {
          border: solid .02rem #8f8f8f;
          background-color: #322b4d;
          color: #8f8f8f;
          margin-right: .26rem;
        }

        //登录
        .user-info-box {
          //background-image: linear-gradient(to bottom, #efcea6, #dab591) ;
          //color: #533510 ;

          //修改a标签的蓝色字体样式
          //a {
          //  color: #533510 ;
          //}
        }
      }
    }
    .main-content {
      overflow: hidden;
      flex: 1;
      z-index: 2;
      margin: -1.5rem 0 0;
      height: 100%;
      /*padding: 1rem 0 0;*/
      .slider {
        height: 2.3rem;
        .notice-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width: 100%;
          color: #fff;
          min-height: 35px;
          font-size: 13px;
          /deep/ .van-notice-bar {
            padding: 0 10px 0 0;
            .van-notice-bar__wrap {
              height: 100%;
              line-height: 40px;
            }
            .notice-swipe {
              height: 40px;
              line-height: 40px;
              padding-left: 10px;
            }
          }

          span {
            margin-right: 30px;
          }
          i {
            margin-left: 15px;
            margin-right: 10px;
            &:last-child {
              color: rgba(255, 255, 255, 0.7);
            }
          }

          /*img {*/
          /*margin-left: 0.3rem;*/
          /*width: 0.5rem;*/
          /*height: 0.3rem;*/
          /*}*/
          .van-notice-bar {
            flex: 1;
          }
        }
        .tab-wrapper {
          display: flex;
          text-align: center;
          flex-direction: row;
          overflow-scrolling: auto;
          width: 6.56rem;
          height: 1.3rem;
          border-radius: .66rem;
          -webkit-backdrop-filter: blur(0.36rem);
          backdrop-filter: blur(0.36rem);
          background: #24252d;
          margin: .15rem auto 0;
          font-size: .24rem;
          .tab-item {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-items: center;
            align-items: center;
            color: #fff;
            padding: 0.2rem 0;
            border: 0;
            i {
              font-size: 0.6rem;
            }
            span {
              padding-top: .1rem;
            }
            /*img {*/
            /*width: 0.92rem;*/
            /*height: 0.92rem;*/
            /*}*/
          }
        }
      }
      .other-scroll {
        height: calc(100% - 2.3rem);
        width: 100%;
        overflow: scroll;
        .slider-wrapper {
          width: 100%;
          min-height: 3.2rem;
          padding: 0.2rem 0 0;
        }
        .main-wrapper {
          /*height: calc(100% - 3.2rem);*/
          padding: 0 0.3rem 0.1rem;
          /*background: pink;*/
          .main-list {
            width: 100%;
            /*height: 100%;*/
            /*height: calc(100% - 5rem);*/
            height: 8.2rem;
            /*height: 10rem;*/
            display: flex;
            overflow: hidden;
            /*margin: 0 0 .5rem;*/
            .list-wrapper {
              width: 100%;
              height: 100%;
              display: flex;
              .title-list {
                flex: 1;
                display: flex;
                align-items: center;
                ul {
                  width: 100%;
                  height: 100%;
                  /*overflow: scroll;*/
                  /*padding: 0 0 0.1rem;*/
                  li {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 0 10px;
                    div {
                      /*width: 1.3rem;*/
                      /*height: 1.3rem;*/
                      width: 100%;
                      height: 1.19rem;
                      border-radius: 10%;
                      background: linear-gradient(to right, #2A2C36, #2F323D);
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                      color: #dcae8f;
                      font-weight: bold;
                      &.active {
                        background: linear-gradient(to bottom, #E3C9BA, #DEB091);
                        color: #24252d;
                        /*img {*/
                        /*background: linear-gradient(to right, #2A2C36, #2F323D);*/
                        /*}*/
                        img {
                          width: 40%;
                          /*height: 50%;*/
                          margin: 0 0 5px;
                        }
                      }
                      img {
                        width: 40%;
                        /*height: 50%;*/
                        margin: 0 0 5px;
                      }
                    }
                    &:last-child {
                      margin: 0;
                    }
                  }
                }
              }
              .content-list {
                flex: 4.5;
                display: flex;
                /*justify-content: center;*/
                flex-direction: column;
                overflow: scroll;
                position: relative;
                height: 100%;
                .content-item {
                  width: 100%;
                  /*height: 100%;*/
                  /*height: 8.5rem;*/
                  position: relative;
                  .item-wrapper {
                    height: 100%;
                    ul {
                      height: 100%;
                      display: flex;
                      flex-direction: row;
                      flex-wrap: wrap;
                      padding: 0 0 0.1rem;
                      li {
                        width: 50%;
                        /*height: 100px;*/
                        color: #fff;
                        margin: 0 0 15px;
                        @include bg-image('../assets/img/index/gameintry-2-box');
                        background-size: 130px 126px;
                        background-position: right top;
                        div {
                          width: 130px;
                          height: 126px;
                          display: flex;
                          flex-direction: column;
                          /*background: linear-gradient(to right, #2A2C36, #2F323D);*/
                          /*background: url("../assets/img/index/gameintry-2-box@2x.png");*/
                          border-radius: 10%;
                          span {
                            color: #dcae8f;
                            padding: 10px 0 0 10px;
                            font-size: 0.5rem;
                          }
                        }
                        &:last-child, &:nth-last-child(2) {
                          margin: 0;
                        }
                        &.lottery-item {
                          display: flex;
                          justify-content: flex-end;
                          div {
                            width: 130px;
                            height: 126px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            span {
                              width: 100%;
                              text-align: center;
                              color: #fff;
                              /*color: #dcae8f;*/
                              padding: 5px 2px 0;
                              font-size: 15px;
                              @include ellipsis;
                            }
                            p {
                              color: #8f8f8f;
                              font-size: 12px;
                              margin: 0.1rem 0 0;
                              @include ellipsis;
                              width: 100%;
                              text-align: center;
                            }
                            img {
                              width: 50%;
                            }
                          }
                          &:last-child {
                            img {
                              width: 45%;
                            }
                          }
                        }
                        &.other-item {
                          display: flex;
                          justify-content: flex-end;
                          /*align-items: flex-end;*/
                          div {
                            background-size: 90% 90%;
                            background-position: bottom right;
                            background-repeat: no-repeat;
                            .logo-img {
                              margin: 5px 0 0 5px;
                              width: 60%;
                              /*background: url("") no-repeat center;*/
                            }
                            .bg-img {
                            }
                          }
                        }
                      }
                    }
                    .no-data {
                      padding: 0.5rem 0 0;
                      width: 100%;
                      height: 100%;
                      display: flex;
                      justify-content: center;
                      .sub-content {
                        width: 50%;
                      }
                    }
                    .over-lay {
                      width: 100%;
                      height: 3rem;
                      /*background-color: rgba(0, 0, 0, .7);*/
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    }
                  }
                }

              }
            }
            .loading {
              /*height: 100%;*/
              margin: auto;
            }
          }
        }

        .notData {
          min-height: 3.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          .van-loading {
            text-align: center;
          }
        }
        .lottery-list {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          border-top: 1px solid #d6dae1;

          .lottery-item {
            position: relative;
            display: flex;
            width: 50%;
            margin: .35rem 0;
            padding: 0 0 0 0.3rem;
            flex-direction: row;
            align-items: center;

            img {
              width: .86rem;
              height: .86rem;
              margin-right: 0.22rem;
            }

            .item-rg {
              display: flex;
              flex-direction: column;
              font-size: 0.32rem;

              h5 {
                font-size: .24rem;
                color: #333;
                margin-bottom: .1rem;
              }

              .lottery-item-del {
                color: #999;
                font-size: 0.26rem;
              }
            }

            .item-rg:after {
              position: absolute;
              content: "";
              -webkit-transform-origin: 0 0;
              transform-origin: 0 0;
              pointer-events: none;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              border-right: 1px solid #e5e5e5;
              border-radius: 0;
              height: 200%;
              top: 0;
              right: 0;
              bottom: 0;
              transform: translate3d(50%, 0, 0) scale(.5);
            }
          }

          .lottery-item:after {
            position: absolute;
            content: "";
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            pointer-events: none;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border-bottom: 1px solid #e5e5e5;
            width: 200%;
            left: 0;
            right: 0;
            bottom: -0.35rem;
            transform: translate3d(0, 100%, 0) scale(.5);
          }

          .item-tw {
            border-right: none;
          }

          .item1 {
            width: 25%;
            display: -webkit-box;
            text-align: center;
            padding: 0.2rem 0.25rem;

            img {
              margin: 0 auto .1rem;
            }

            span {
              font-size: 12px;
            }
          }
        }
      }
    }
    .try-play-box {
      color: #fff;
      background: none;
      .content-center,
      .confirm-content {
        padding: px2rem(30px);
        border-radius: px2rem(20px);
      }
      .dialog-title {
        text-align: center;
        margin-bottom: px2rem(10px);
      }
      .try-play-img {
        width: px2rem(180px);
        height: px2rem(105px);
        margin: 0 auto px2rem(40px);
      }
      .dialog-message {
        text-align: center;
        line-height: px2rem(30px);
        font-size: px2rem(15px);
        margin-bottom: px2rem(10px);
      }
      .dialog-footer {
        width: px2rem(205px);
        height: px2rem(45px);
        border-radius: px2rem(25px);
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        i {
          margin: 0 px2rem(4px);
        }
      }
      .close-box {
        width: px2rem(55px);
        height: px2rem(55px);
        border-radius: 50%;
        background: #24252D;
        margin: px2rem(15px) auto;
        color: #FFDE9A;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .maskStyle {
    text-align: center;
    margin-top: 70%;
  }
</style>
