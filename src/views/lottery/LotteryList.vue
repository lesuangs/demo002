<template>
  <div class="lottery-hall">
    <div class="hall-wrapper">
      <ul class="nav-list">
        <li v-for="(item, index) in allList"
            :key="item.name_china"
            :class="lotteryHellIndex === index ? 'active':''"
            @click="switchIndex(index)">
          <div v-if="$i18n.locale === LANG.english">{{item.name_english}}</div>
          <div v-else>{{item.name_china}}</div>
        </li>
      </ul>
      <div class="hall-content"
           v-if="$route.name === 'Lottery'">
        <div class="main-content"
             v-if="allList[lotteryHellIndex] && allList[lotteryHellIndex].list.length>0">
          <ul v-if="ListType === 1"
              class="lottery-list">
            <li v-for="(item, index) in allList[lotteryHellIndex].list"
                :key="item.id">
              <div class="lottery-item" :key="index">
                <div class="top-content"
                     @click="playGame(item)">
                  <div class="top-info">
                    <div class="left-content">
                      <img :src="imgAddress+item.images" alt=""/>
                      <div class="issue-wrapper">
                        <p class="issue">
                          {{$t('lang.common.di')}}
                          {{delList[item.id] ? (delList[item.id].pre.turn ? delList[item.id].pre.turn : '???') : "???"}}
                          <!--                          {{_formatTime(delList[item.id],item.id)}}-->
                          {{$t('lang.common.issueText')}}
                        </p>
                        <p class="title">{{ item.name }}</p>
                      </div>
                    </div>
                    <div class="right-content">
                    <span class="deadline">
                      {{delList[item.id] ? (delList[item.id].cur.turn ? delList[item.id].cur.turn : '???') : "???"}}
                      {{$t('lang.common.issueText')}} {{$t('lang.common.deadline')}}
                    </span>
                      <div v-if="delList[item.id] && delList[item.id].cur.status === 0" class="countdown">
                        <div v-if="delList[item.id].timeLength > 0">
                          <span>{{ countTime(delList[item.id].timeLength, item.id).h }}</span>
                          <i>:</i>
                          <span>{{ countTime(delList[item.id].timeLength, item.id).m }}</span>
                          <i>:</i>
                          <span>{{ countTime(delList[item.id].timeLength, item.id).s }}</span>
                        </div>
                        <div v-else class="countdown opening">
                          <div class="lang-china" v-if="$i18n.locale === LANG.china">
                            <span>开</span><i>:</i><span>奖</span><i>:</i><span>中</span>
                          </div>
                          <div class="lang-english" v-else>
                            <span>Drawing</span>
                          </div>
                        </div>
                      </div>
                      <div class="countdown opening"
                           v-else-if="delList[item.id] && delList[item.id].cur.status === 3">
                        <div class="lang-china"
                             v-if="$i18n.locale === LANG.china">
                          <span>开</span><i>:</i><span>奖</span><i>:</i><span>中</span>
                        </div>
                        <div class="lang-english" v-else>
                          <span>Drawing</span>
                        </div>
                      </div>
                      <div class="countdown" v-else-if=" delList[item.id] && delList[item.id].cur.status === 1">
                        <div class="lang-china" v-if="$i18n.locale === LANG.china">
                          <span>封</span><i>:</i><span>盘</span><i>:</i><span>中</span>
                        </div>
                        <div class="lang-english" v-else>
                          <span>Blocking</span>
                        </div>
                      </div>
                      <div class="countdown" v-else>
                        <div class="lang-china" v-if="$i18n.locale === LANG.china">
                          <span>加</span><i>:</i><span>载</span><i>:</i><span>中</span>
                        </div>
                        <div class="lang-english" v-else>
                          <span>Loading</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="number-wrapper">
                    <div class="num-wrap">
                      <div class="num">
                        <div v-if="delList[item.id] &&delList[item.id].cur.status === 0">
                          <!--                          <span v-if="delList[item.id].pre.openNum === null ||delList[item.id].pre.openNum.length == 0">-->
                          <!--                            暂无数据-->
                          <!--                          </span>-->
                          <!--                          <template v-else v-for="(n, a) in delList[item.id].pre.openNum.split(',')">-->
                          <!--                            <span :key="a">{{ n }}</span>-->
                          <!--                          </template>-->
                          <span v-if=" delList[item.id].pre.openNum === null || delList[item.id].pre.openNum.length == 0 ">
                            {{$t('lang.common.noData')}}
                            <!--暂无数据-->
                        </span>
                          <BallAll v-else :gameType="item.type" :isBig="true" :openNum="delList[item.id].pre.openNum"/>
                        </div>
                        <span v-else-if="delList[item.id] && delList[item.id].cur.status === 3">
                          <!--开奖中...-->
                          {{$t('lang.common.drawing')}}
                        </span>
                        <span v-else-if="delList[item.id] &&delList[item.id].cur.status === 1">
                          <!--封盘中...-->
                          {{$t('lang.common.blocking')}}
                        </span>
                        <span v-else>
                          <!--加载中...-->
                          {{$t('lang.common.loading')}}
                        </span>
                      </div>
                      <i class="color1 iconfont iconicon_arrow_right"></i>
                    </div>
                  </div>
                </div>
                <div class="bottom">
                  <div @click="$router.push(`/trend?lotteryId=${item.id}`)">
                    <i class="iconfont iconic-trend"/>
                    <span>{{$t('lang.lottery.trend')}}</span>
                  </div>
                  <div @click="playRule(item)">
                    <i class="iconfont iconic-playinfo"></i>
                    <span>{{$t('lang.lottery.play')}}</span>
                  </div>
                  <div @click.stop="switchCollect(item)" v-if="collectArray.length>0">
                    <i class="iconfont"
                       :class="collectArray[lotteryHellIndex].list.includes(item.id)?'iconic-star-f isCheck':'iconic-star'"></i>
                    <span>{{collectArray[lotteryHellIndex].list.includes(item.id)?$t('lang.lottery.collected'):$t('lang.lottery.collect')}}</span>
                  </div>
                </div>
              </div>
            </li>
            <!--<div>-->
            <!--<NotData v-if="$route.name === 'Lottery' && listData.length === 0" :isNotData="isNotDataTwo"/>-->
            <!--</div>-->
          </ul>
          <ul v-else class="grid-list">
            <li v-for="(item, index) in allList[lotteryHellIndex].list">
              <div class="item-wrapper" :key="index" @click="playGame(item)">
                <img :src="imgAddress+item.images" alt=""/>
                <span class="title">{{ item.name }}</span>
                <div v-if="delList[item.id] && delList[item.id].cur.status === 0"
                     class="countdown">
                  <div v-if="delList[item.id].timeLength > 0">
                    <span>{{ countTime(delList[item.id].timeLength, item.id).h }}</span>
                    <i>:</i>
                    <span>{{ countTime(delList[item.id].timeLength, item.id).m }}</span>
                    <i>:</i>
                    <span>{{ countTime(delList[item.id].timeLength, item.id).s }}</span>
                  </div>
                  <div v-else class="countdown opening">
                    <div class="lang-china" v-if="$i18n.locale === LANG.china">
                      <span>开</span><i>:</i><span>奖</span><i>:</i><span>中</span>
                    </div>
                    <div class="lang-english" v-else>
                      <span>Drawing</span>
                    </div>
                  </div>
                </div>
                <div class="countdown opening"
                     v-else-if="delList[item.id] && delList[item.id].cur.status === 3">
                  <div class="lang-china"
                       v-if="$i18n.locale === LANG.china">
                    <span>开</span><i>:</i><span>奖</span><i>:</i><span>中</span>
                  </div>
                  <div class="lang-english" v-else>
                    <span>Drawing</span>
                  </div>
                </div>
                <div class="countdown"
                     v-else-if=" delList[item.id] && delList[item.id].cur.status === 1">
                  <div class="lang-china" v-if="$i18n.locale === LANG.china">
                    <span>封</span><i>:</i><span>盘</span><i>:</i><span>中</span>
                  </div>
                  <div class="lang-english" v-else>
                    <span>Blocking</span>
                  </div>
                </div>
                <div class="countdown" v-else>
                  <div class="lang-china" v-if="$i18n.locale === LANG.china">
                    <span>加</span><i>:</i><span>载</span><i>:</i><span>中</span>
                  </div>
                  <div class="lang-english" v-else>
                    <span>Loading</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="no-data" v-else>
          <loading v-if="isLoading"></loading>
          <noData v-else></noData>
        </div>
      </div>
      <div class="collection-content"
           v-if="$route.name === 'myCollection'">
        <div class="main-content"
             v-if="collectionLotteryList.length>0">
          <ul class="lottery-list">
            <li v-for="(item, index) in collectionLotteryList" v-bind:key="item.id">
              <div class="lottery-item" :key="index">
                <div class="top-content"
                     @click="playGame(item)">
                  <div class="top-info">
                    <div class="left-content">
                      <img :src="'/data/lotteryPicture/' + item.code + '.png?' + imgFix " alt=""/>
                      <div class="issue-wrapper">
                        <p class="issue">
                          {{$t('lang.common.di')}}
                          {{delList[item.id] ? (delList[item.id].pre.turn ? delList[item.id].pre.turn : '???') : "???"}}
                          <!--                          {{_formatTime(delList[item.id],item.id)}}-->
                          {{$t('lang.common.issueText')}}
                        </p>
                        <p class="title">{{ item.name }}</p>
                      </div>
                    </div>
                    <div class="right-content">
                    <span class="deadline">
                      {{delList[item.id] ? (delList[item.id].cur.turn ? delList[item.id].cur.turn : '???') : "???"}}
                      {{$t('lang.common.issueText')}} {{$t('lang.common.deadline')}}
                    </span>
                      <div v-if="delList[item.id] && delList[item.id].cur.status === 0" class="countdown">
                        <div v-if="delList[item.id].timeLength > 0">
                          <span>{{ countTime(delList[item.id].timeLength, item.id).h }}</span>
                          <i>:</i>
                          <span>{{ countTime(delList[item.id].timeLength, item.id).m }}</span>
                          <i>:</i>
                          <span>{{ countTime(delList[item.id].timeLength, item.id).s }}</span>
                        </div>
                        <div v-else class="countdown opening">
                          <div class="lang-china" v-if="$i18n.locale === LANG.china">
                            <span>开</span><i>:</i><span>奖</span><i>:</i><span>中</span>
                          </div>
                          <div class="lang-english" v-else>
                            <span>Drawing</span>
                          </div>
                        </div>
                      </div>
                      <div class="countdown opening"
                           v-else-if="delList[item.id] && delList[item.id].cur.status === 3">
                        <div class="lang-china"
                             v-if="$i18n.locale === LANG.china">
                          <span>开</span><i>:</i><span>奖</span><i>:</i><span>中</span>
                        </div>
                        <div class="lang-english" v-else>
                          <span>Drawing</span>
                        </div>
                      </div>
                      <div class="countdown" v-else-if=" delList[item.id] && delList[item.id].cur.status === 1">
                        <div class="lang-china" v-if="$i18n.locale === LANG.china">
                          <span>封</span><i>:</i><span>盘</span><i>:</i><span>中</span>
                        </div>
                        <div class="lang-english" v-else>
                          <span>Blocking</span>
                        </div>
                      </div>
                      <div class="countdown" v-else>
                        <div class="lang-china" v-if="$i18n.locale === LANG.china">
                          <span>加</span><i>:</i><span>载</span><i>:</i><span>中</span>
                        </div>
                        <div class="lang-english" v-else>
                          <span>Loading</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="number-wrapper">
                    <div class="num-wrap">
                      <div class="num">
                        <div v-if="delList[item.id] && delList[item.id].cur.status === 0">
                          <!--                          <span v-if="delList[item.id].pre.openNum === null ||delList[item.id].pre.openNum.length == 0">-->
                          <!--                            暂无数据-->
                          <!--                          </span>-->
                          <!--                          <template v-else v-for="(n, a) in delList[item.id].pre.openNum.split(',')">-->
                          <!--                            <span :key="a">{{ n }}</span>-->
                          <!--                          </template>-->
                          <span v-if=" delList[item.id].pre.openNum === null || delList[item.id].pre.openNum.length == 0 ">
                            {{$t('lang.common.noData')}}
                            <!--暂无数据-->
                          </span>
                          <BallAll v-else :gameType="item.type" :isBig="true" :openNum="delList[item.id].pre.openNum"/>
                        </div>
                        <span v-else-if="delList[item.id] && delList[item.id].cur.status === 3">
                          <!--开奖中...-->
                          {{$t('lang.common.drawing')}}
                        </span>
                        <span v-else-if="delList[item.id] &&delList[item.id].cur.status === 1">
                          <!--封盘中...-->
                          {{$t('lang.common.blocking')}}
                        </span>
                        <span v-else>
                          <!--加载中...-->
                          {{$t('lang.common.loading')}}
                        </span>
                      </div>
                      <i class="color1 iconfont iconicon_arrow_right"></i>
                    </div>
                  </div>
                </div>
                <div class="bottom">
                  <div @click="$router.push(`/trend?lotteryId=${item.id}`)">
                    <i class="iconfont iconic-trend"/>
                    <span>{{$t('lang.lottery.trend')}}</span>
                  </div>
                  <div @click="playRule(item)">
                    <i class="iconfont iconic-playinfo"></i>
                    <span>{{$t('lang.lottery.play')}}</span>
                  </div>
                  <div @click.stop="switchCollect(item)">
                    <i class="iconfont"
                       :class="collectArray[lotteryHellIndex].list.includes(item.id)?'iconic-star-f isCheck':'iconic-star'"></i>
                    <span>{{collectArray[lotteryHellIndex].list.includes(item.id)?$t('lang.lottery.collected'):$t('lang.lottery.collect')}}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="no-data" v-else>
          <!--<loading v-if="isLoading"></loading>-->
          <noData></noData>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import NotData from "../../commons/notdata/NotData";
  import noData from '../../commons/noData';
  import loading from '../../commons/loading'
  import {LANG} from "../../utils/mode";
  import {mapActions, mapState, mapMutations} from 'vuex'
  // 0：六合彩；1：低频彩；2：时时彩；3：PK拾；4：11选5；5：快乐彩；6：快三；7：PC蛋蛋；
  export default {
    name: "LotteryList",
    components: {
      NotData,
      noData,
      loading,
      BallAll: resolve => require(['../../commons/balls/BallAll'], resolve)
    },
    props: {
      ListType: Number,
    },
    data() {
      return {
        // START
        LANG: LANG,
        isLoading: true,
        timer_openInfo: null,
        timer_countDown: null,
        collectArray: [],
        delList: {},
        imgFix: localStorage.getItem("imgSuffix"),
        // END
      };
    },
    watch: {},
    computed: {
      ...mapState([
        'allLotteryTypeList',
        'lotteryHellIndex',
        'lang',
        'imgAddress'
      ]),
      allList() {
        console.log(this.allLotteryTypeList,'this.allLotteryTypeList');
        if (this.allLotteryTypeList && this.allLotteryTypeList[0].list.length > 0) {
          return this.allLotteryTypeList
        } else {
          return [];
        }

      },
      collectionLotteryList() {
        let lotteryList = []
        let allList = this.allLotteryTypeList
        let collectArray = this.collectArray
        let lotteryHellIndex = this.lotteryHellIndex

        if (allList[lotteryHellIndex] && allList[lotteryHellIndex].list.length > 0) {
          if (collectArray[lotteryHellIndex] && collectArray[lotteryHellIndex].list.length > 0) {
            allList[lotteryHellIndex].list.forEach(item => {
              if (collectArray[lotteryHellIndex].list.includes(item.id)) {
                lotteryList.push(item)
              }
            })
          }
        }

        return lotteryList
      },
    },
    methods: {
      switchIndex(index) {
        // this.currentIndex = index;
        this.setData({key: 'lotteryHellIndex', value: index});
      },
      ...mapMutations({
        setData: 'SET_DATA'
      }),
      ...mapActions([
        'getAllLotteryList',
        'getAllOpenInfo'
      ]),
      _formatTime(item, id) {
        if (item) {
          if (item.isTime) {
            return item.cur.turn;
          } else {
            if ([10, 11].includes(id)) { // fc3d的两个彩种
              let str = item.cur.turnNum && item.cur.turnNum.substring(4);
              return str
            } else {
              let str = item.cur.turnNum;
              return str
            }
          }
        } else {
          return '???'
        }
      },
      playRule(key) {
        console.log(key, 'kkkkkkkk')
        //{path:'/uapbd/paraset/edit',query:{pk_refinfo:'test',value:'test1'}}
        this.$router.push({path: "/playRule", query: {type: key.type}});
      },
      playGame(item) {
        console.log(item, '进入游戏');
        // let lotteryId = item.id;
        // this.$router.push({
        //   path: item.type,
        //   query: {lotteryId: lotteryId, itemCate: item.cate, type: item.type, code: item.code},
        // });

        this.$router.push(
          {
            path: '/lotteryNew',
            query: {
              id: item.id
            }
          }
        )

      },
      initData() {
        clearInterval(this.timer_openInfo);
        this.timer_openInfo = null;
        clearInterval(this.timer_countDown);
        this.timer_countDown = null;
        this._getAllOpenInfo();
        this.timer_openInfo = setInterval(() => {
          this._getAllOpenInfo();
        }, 1000 * 10);
        this.$nextTick(() => {
          this._countDown();
          this.timer_countDown = setInterval(() => {
            this._countDown();
          }, 1000)
        });
      },
      _getAllOpenInfo() {
        this.getAllOpenInfo({}).then((_data) => {
          let data = _data;
          for (let key in data) {
            if (key !== "serverTime") {
              data[key].timeLength = parseInt(data[key].cur.closeTime / 1000 - data.serverTime / 1000);
            }
          }
          this.delList = data;
        });
      },
      _countDown() {
        let data = this.delList;
        for (const key in data) {
          if (key !== "serverTime") {
            if (data[key].timeLength >= 0) {
              data[key].timeLength--;
            }
          }
        }
        this.delList = data;
      },
      countTime(leftTime, id) {
        // 定义变量 h,m,s保存倒计时的时间
        let timeData = {
          h: "00",
          m: "00",
          s: "00",
        };
        if (leftTime >= 0) {
          const h = Math.floor(leftTime / 60 / 60); // % 24
          const m = Math.floor((leftTime / 60) % 60);
          const s = Math.floor(leftTime % 60);
          timeData = {
            h: h < 10 ? "0" + h : h,
            m: m < 10 ? "0" + m : m,
            s: s < 10 ? "0" + s : s,
          };
        }
        return timeData;
      },
      switchCollect(item) {
        let list = this.collectArray;
        let tabIndex = this.lotteryHellIndex;
        let id = item.id;
        let cate = item.cate;
        let firstList = list[0].list;
        if (tabIndex === 0) {
          if (firstList.includes(id)) {// 有
            let firstIndex = firstList.findIndex((value) => {
              return value === id;
            });
            firstList.splice(firstIndex, 1);
            for (let i = 1; i < list.length; i++) {
              let currentList = list[i];
              if (currentList.cate === cate) {
                let ii = currentList.list.findIndex((value) => {
                  return value === id;
                });
                currentList.list.splice(ii, 1);
                break;
              }
            }
          } else { // 没有
            firstList.push(id);
            for (let i = 1; i < list.length; i++) {
              let currentList = list[i];
              if (currentList.cate === cate) {
                currentList.list.push(id);
                break;
              }
            }
          }
        }
        else {
          let arr = list[tabIndex].list;
          if (arr.includes(id)) { // 有，就删除
            let i = arr.findIndex((value) => {
              return value === id;
            });
            arr.splice(i, 1);
            let firstIndex = firstList.findIndex((value) => {
              return value === id;
            });
            firstList.splice(firstIndex, 1);
          }
          else { // 没有，就加入
            arr.push(id);
            firstList.push(id);
          }
        }
        this.collectArray = list;
        localStorage.setItem('collectArray', JSON.stringify(list));
      },
      initCollectArr() {
        let list = this.allLotteryTypeList;
        let arr = localStorage.getItem('collectArray');
        if (arr === null) {
          let formatList = [];
          for (let i = 0; i < list.length; i++) {
            let obj = {
              cate: list[i].cate,
              list: []
            }
            formatList.push(obj);
          }
          this.collectArray = formatList;
        } else {
          this.collectArray = JSON.parse(arr);
        }
      },
    },
    mounted() {
      this.initData();
    },
    created() {
      this.isLoading = true;
      this.getAllLotteryList({}).then((_data) => {
        if (_data[0].length > 0) {
          this.isLoading = false
        }
        this.initCollectArr();
      });

    },
    beforeDestroy() {
      clearInterval(this.timer_openInfo);
      this.timer_openInfo = null;
      clearInterval(this.timer_countDown);
      this.timer_countDown = null;
    }
  };
</script>
<style lang="scss" scoped>
  .skin-gray {
    .lottery-hall {
      background: #36374C;
      .hall-wrapper {
        ul.nav-list {
          background-image: linear-gradient(to bottom, #494664, #303244);
          border-right: 1px solid #454658;
          & > li {
            color: #9a9aa7;
            background-image: linear-gradient(to right, #605E75, #4C4A65);
            border-bottom: 1px solid #45435E;
            &.active {
              color: #ffd57d;
              border-left: 2px solid #ffd57d;
              box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.31);
              background-image: linear-gradient(to bottom, #413f56 1%, #2b293e);
            }
          }
        }
        .hall-content,
        .collection-content {
          .main-content {
            background-image: linear-gradient(to bottom, #494664, #303244);
            ul.lottery-list {
              & > li {
                background: #4C4965;
                .lottery-item {
                  .top-content {
                    .top-info {
                      color: #fff;
                      .left-content {
                        .issue-wrapper {
                          .issue {
                            color: #9a9aa7;
                          }
                        }
                      }
                      .right-content {
                        &:before {
                          background: #54526B;
                        }
                        .deadline {
                          color: #9a9aa7;
                        }
                      }
                    }
                    .number-wrapper {
                      .num-wrap {
                        i {
                          color: #9a9aa7;
                        }
                        .num {
                          & > div, span {
                            color: #9a9aa7;
                          }
                        }
                      }
                    }
                  }
                  .bottom {
                    border-top: 1px solid #4c4965;
                    div {
                      border-right: 1px solid #6B6A7D;

                      i {
                        color: #9a9aa7;
                        &.isCheck {
                          color: #ffd57d;
                        }
                      }
                      span {
                        color: #fff;
                      }
                    }
                  }
                }
              }

            }
            ul.grid-list {
              & > li {
                .item-wrapper {
                  .title {
                    color: #fff;
                  }
                  .countdown {
                    i {
                      color: #fff;
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

  .skin-black {
    .lottery-hall {
      background: #191B1F;
      .hall-wrapper {
        ul.nav-list {
          background: #191B1F;
          border-right: 1px solid #393940;
          & > li {
            color: #9a9aa7;
            background: #181B1F;
            border-bottom: 1px solid #393940;
            &.active {
              color: #ffd57d;
              border-left: 2px solid #ffd57d;
              box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.31);
              background: #24252D;
            }
          }
        }
        .hall-content,
        .collection-content {
          .main-content {
            background: #191B1F;
            ul.lottery-list {
              & > li {
                background: #24252d;
                .lottery-item {
                  .top-content {
                    .top-info {
                      color: #fff;
                      .left-content {
                        .issue-wrapper {
                          .issue {
                            color: #8f8f8f;
                          }
                        }
                      }
                      .right-content {
                        &:before {
                          background: #2D2E36;
                        }
                        .deadline {
                          color: #8f8f8f;
                        }
                      }
                    }
                    .number-wrapper {
                      .num-wrap {
                        i {
                          color: #8f8f8f;
                        }
                        .num {
                          & > div, span {
                            color: #8f8f8f;
                          }
                        }
                      }
                    }
                  }
                  .bottom {
                    border-top: 1px solid #2D2E36;
                    div {
                      border-right: 1px solid #2D2E36;
                      i {
                        color: #8f8f8f;
                        &.isCheck {
                          color: #efcea6;
                        }
                      }
                      span {
                        color: #fff;
                      }
                    }
                  }
                }
              }
            }
            ul.grid-list {
              & > li {
                .item-wrapper {
                  .title {
                    color: #fff;
                  }
                  .countdown {
                    i {
                      color: #fff;
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

  .lottery-hall {
    overflow-x: scroll;
    flex: 1;
    flex-shrink: 0;
    background: #36374C;
    .hall-wrapper {
      height: 100%;
      width: 100%;
      display: flex;
      ul.nav-list {
        width: 20%;
        height: 100%;
        background-image: linear-gradient(to bottom, #494664, #303244);
        border-right: 1px solid #454658;
        overflow: scroll;
        & > li {
          width: 100%;
          height: 56px;
          line-height: 56px;
          text-align: center;
          color: #9a9aa7;
          /*background: #4B4963;*/
          background-image: linear-gradient(to right, #605E75, #4C4A65);
          border-bottom: 1px solid #45435E;
          border-left: 2px solid transparent;
          &.active {
            color: #ffd57d;
            border-left: 2px solid #ffd57d;
            box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.31);
            background-image: linear-gradient(to bottom, #413f56 1%, #2b293e);
          }
        }
      }
      .hall-content,
      .collection-content {
        width: 80%;
        height: 100%;
        .content-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .main-content {
          width: 100%;
          height: 100%;
          overflow: scroll;
          background-image: linear-gradient(to bottom, #494664, #303244);
          ul.lottery-list {
            width: 100%;
            height: 100%;
            overflow: scroll;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            & > li {
              width: 100%;
              /*overflow: hidden;*/
              background: #4C4965;
              margin: 0 0 10px;
              .lottery-item {
                display: flex;
                width: 100%;
                flex-direction: column;
                .top-content {
                  .top-info {
                    color: #fff;
                    display: flex;
                    justify-content: space-around;
                    padding: 0.1rem;
                    height: 1.5rem;
                    .left-content {
                      display: flex;
                      align-items: center;
                      width: 55%;
                      img {
                        width: 1.2rem;
                        max-height: 1.2rem;
                        /*margin-right: 0.1rem;*/
                      }
                      .issue-wrapper {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        margin-left: 10px;
                        .issue {
                          min-height: 0.3rem;
                          line-height: 0.2rem;
                          color: #9a9aa7;
                          font-size: 12px;
                        }
                        .title {
                          height: 0.5rem;
                          line-height: 0.5rem;
                        }
                      }
                    }
                    .right-content {
                      display: flex;
                      flex-direction: column;
                      align-items: flex-end;
                      padding: .15rem .1rem 0 0.1rem;
                      /*border-left: 1px #54526B solid;*/
                      position: relative;
                      width: 45%;
                      &:before {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: .25rem;
                        height: 1rem;
                        width: 1px;
                        background: #54526B;
                      }
                      .deadline {
                        color: #9a9aa7;
                        min-height: .5rem;
                        /*line-height: .5rem;*/
                        padding: 0.05rem 0 0;
                        text-align: center;
                      }
                      .countdown {
                        & > div {
                          display: flex;
                          align-items: center;
                        }
                      }
                      /*.top-r-i:nth-child(1) {*/
                      /*border-right: 1px #393940 solid;*/
                      /*display: flex;*/
                      /*!*margin-right: 0.16rem;*!*/
                      /*}*/
                    }
                  }
                  .number-wrapper {
                    display: flex;
                    align-items: center;
                    .num-wrap {
                      display: flex;
                      width: 100%;
                      align-items: center;
                      justify-content: space-between;
                      padding: 0 0.1rem .1rem;
                      i {
                        color: #9a9aa7;
                        font-size: 20px;
                      }
                      .num {
                        & > div, span {
                          color: #9a9aa7;
                        }
                      }
                    }
                  }
                }
                .bottom {
                  display: flex;
                  flex-direction: row;
                  padding: 10px 0;
                  border-top: 1px solid #4c4965;
                  div {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-right: 1px solid #4c4965;
                    i {
                      color: #9a9aa7;
                      margin-right: 5px;
                      &.isCheck {
                        color: #efcea6;
                      }
                    }
                    span {
                      color: #fff;
                    }
                    &:last-child {
                      border-right: none;
                    }
                  }

                }
              }
            }
          }
          ul.grid-list {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: flex-start;
            width: 100%;
            & > li {
              width: 33.3%;
              height: 2.5rem;
              padding: 10px 0;
              .item-wrapper {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                img {
                  width: 1.2rem;
                  height: 1.2rem;
                }
                .title {
                  min-height: 40px;
                  line-height: 18px;
                  color: #fff;
                  font-size: 13px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  text-align: center;
                }
                .countdown {
                  width: 100%;
                  & > div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  i {
                    color: #fff;
                  }
                  span {

                  }
                }
              }
            }
          }
        }
        .no-data {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

    }

  }
</style>
