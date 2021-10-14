<template>
  <div class="cp-content lottery-list-box">
    <div>
      <van-tabs>
        <div style="position: absolute;top: 46%;left: 46%"
             v-if="$route.name === 'myCollection' && isTrue">
          <van-loading type="spinner" color="#222222"/>
        </div>
        <van-tab v-for="(v, i) in tabList" :key="i" :title="v.name">
          <NotData
                  v-if="$route.name === 'myCollection' && (collectArray[i].length === 0 && i !== 0 ? true : i === 0 && count <= 0 ? true : false)"
                  :isNotData="isNotData"/>
          <div v-if="ListType === 1" class="lottery-list">
            <template v-for="(item, index) in listData[i]">
              <div class="cp-item" :key="index" v-if="
                   $route.name === 'myCollection' && collectMap['i' + item.id] &&
                  (collectArray[i].length !== 0 && i !== 0 ? true : i === 0 && count > 0 ? true : false) ? collectMap['i' + item.id].check ? true : false : false">
                <div class="top" @click="playGame(item)">
                  <div class="top-info">
                    <img :src="'/data/lotteryPicture/' + item.code + '.png?' + imgFix" alt=""/>
                    <div class="top-con">
                      <div class="top-r-i">
                        <span class="color1">{{$t('lang.common.di')}} {{delList[item.id] ? delList[item.id].isTime ? delList[item.id].cur.turn : delList[item.id].cur.turnNum : "???"}} {{$t('lang.common.issueText')}}</span>
                        <span class="title">{{ item.name }}</span>
                      </div>
                      <div class="top-r-i">
                        <span class="color1">{{delList[item.id] ? delList[item.id].isTime ? delList[item.id].cur.turn : delList[item.id].cur.turnNum : "???"}} {{$t('lang.common.issueText')}} {{$t('lang.common.deadline')}}</span>
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
                              <span>开</span>:<span>奖</span>:<span>中</span>
                            </div>
                            <div class="lang-english" v-else>
                              <span>Drawing</span>
                            </div>
                          </div>
                        </div>
                        <div v-else-if="delList[item.id] && delList[item.id].cur.status === 3"
                             class="countdown opening">
                          <div class="lang-china" v-if="$i18n.locale === LANG.china">
                            <span>开</span>:<span>奖</span>:<span>中</span>
                          </div>
                          <div class="lang-english" v-else>
                            <span>Drawing</span>
                          </div>
                        </div>
                        <div v-else-if="delList[item.id] && delList[item.id].cur.status === 1"
                             class="countdown">
                          <div class="lang-china" v-if="$i18n.locale === LANG.china">
                            <span>封</span>:<span>盘</span>:<span>中</span>
                          </div>
                          <div class="lang-english" v-else>
                            <span>Blocking</span>
                          </div>
                        </div>
                        <div class="countdown" v-else>
                          {{$t('lang.common.loading')}}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="top-r">
                    <div class="num-wrap">
                      <div class="haoma">
                        <div v-if="delList[item.id] &&delList[item.id].cur.status === 0">
                          <!--                          <span-->
                          <!--                              v-if="delList[item.id].pre.openNum === null ||delList[item.id].pre.openNum.length == 0 ">-->
                          <!--                            暂无数据-->
                          <!--                          </span>-->

                          <!--                          <template v-else v-for="(n, a) in delList[item.id].pre.openNum.split(',')">-->
                          <!--                            <span :key="a">{{ n }}</span>-->
                          <!--                          </template>-->

                          <span v-if=" delList[item.id].pre.openNum === null || delList[item.id].pre.openNum.length == 0 ">
                            <!--暂无数据-->
                            {{$t('lang.common.noData')}}
                          </span>
                          <BallAll v-else :gameType="item.type" :isBig="true" :openNum="delList[item.id].pre.openNum"/>
                        </div>
                        <span v-else-if="delList[item.id] &&delList[item.id].cur.status === 3">
                          <!--开奖中...-->
                          {{$t('lang.common.drawing')}}
                        </span>
                        <span v-else-if="delList[item.id] && delList[item.id].cur.status === 1">
                          <!--封盘中...-->
                          {{$t('lang.common.blocking')}}
                        </span>
                        <span v-else>
                          <!--加载中...-->
                          {{$t('lang.common.loading')}}
                        </span>
                      </div>
                      <i class="color1 iconfont iconicon_arrow_right"/>
                    </div>

                  </div>
                </div>
                <div class="bottom">
                  <div>
                    <i class="iconfont iconic-trend"/>
                    <span>{{$t('lang.lottery.trend')}}</span>
                  </div>
                  <div>
                    <i class="iconfont iconic-playinfo"></i>
                    <!--                    <i style="font-size:30px" class="iconfont iconyouxiji"/>-->
                    <!--                    <img :src="require('@/assets/themes/hjb/black/ic_playinfo.svg')" alt=""/>-->
                    <span>{{$t('lang.lottery.play')}}</span>
                  </div>
                  <div @click.stop="changeCollect($event, item)">
                    <i :class=" collectMap['i' + item.id]? collectMap['i' + item.id].check? 'iconfont isCheck iconic-star-f': 'iconfont iconic-star': 'iconfont iconic-star' "></i>
                    <span>
                      {{ collectMap["i" + item.id] ? collectMap["i" + item.id].check ? $t('lang.lottery.collected') : $t('lang.lottery.collect') : $t('lang.lottery.collect') }}
                    </span>
                  </div>
                </div>
              </div>
              <!-- 分割线-->
              <div class="cp-item" :key="index" v-if="$route.name === 'Lottery'">
                <div class="top" @click="playGame(item)">
                  <div class="top-info">
                    <img :src="'/data/lotteryPicture/' + item.code + '.png?' + imgFix " alt=""/>
                    <div class="top-con">
                      <div class="top-r-i">
                        <p class="color1">
                          {{$t('lang.common.di')}} {{delList[item.id] ? delList[item.id].isTime ?
                          delList[item.id].cur.turn : delList[item.id].cur.turnNum : "???"}}
                          {{$t('lang.common.issueText')}}
                        </p>
                        <p class="title">{{ item.name }}</p>
                      </div>
                      <div class="top-r-i">
                      <span class="color1">
                        {{delList[item.id] ? delList[item.id].isTime ? delList[item.id].cur.turn : delList[item.id].cur.turnNum : "???"}} {{$t('lang.common.issueText')}} {{$t('lang.common.deadline')}}
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
                              <span>开</span>:<span>奖</span>:<span>中</span>
                            </div>
                            <div class="lang-english" v-else>
                              <span>Drawing</span>
                            </div>
                          </div>
                        </div>
                        <div class="countdown opening"
                             v-else-if="delList[item.id] && delList[item.id].cur.status === 3">
                          <div class="lang-china" v-if="$i18n.locale === LANG.china">
                            <span>开</span>:<span>奖</span>:<span>中</span>
                          </div>
                          <div class="lang-english" v-else>
                            <span>Drawing</span>
                          </div>
                        </div>
                        <div class="countdown" v-else-if=" delList[item.id] && delList[item.id].cur.status === 1">
                          <div class="lang-china" v-if="$i18n.locale === LANG.china">
                            <span>封</span>:<span>盘</span>:<span>中</span>
                          </div>
                          <div class="lang-english" v-else>
                            <span>Blocking</span>
                          </div>
                        </div>
                        <div class="countdown" v-else>

                          <div class="lang-china" v-if="$i18n.locale === LANG.china">
                            <span>加</span>:<span>载</span>:<span>中</span>
                          </div>
                          <div class="lang-english" v-else>
                            <span>Loading</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div class="top-r">
                    <div class="num-wrap">
                      <div class="haoma sss">
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
                  <div @click="$router.push(`/drawHistory?lotteryId=${item.id}`)">
                    <i class="iconfont iconic-trend"/>
                    <span>{{$t('lang.lottery.trend')}}</span>
                  </div>
                  <div @click="playRule(item)">
                    <i class="iconfont iconic-playinfo"></i>
                    <!--                    <i style="font-size:30px" class="iconfont iconyouxiji"/>-->
                    <!--                    <img :src="require('@/assets/themes/hjb/black/ic_playinfo.svg')" alt=""/>-->
                    <span>{{$t('lang.lottery.play')}}</span>
                  </div>
                  <div @click.stop="changeCollect($event, item)">
                    <i :class="collectMap['i' + item.id]? collectMap['i' + item.id].check ? 'iconfont isCheck iconic-star-f' : 'iconfont iconic-star': 'iconfont iconic-star'"/>
                    <span>
                      {{ collectMap["i" + item.id] ? collectMap["i" + item.id].check ? $t('lang.lottery.collected') : $t('lang.lottery.collect') : $t('lang.lottery.collect') }}
                    </span>
                  </div>
                </div>
              </div>
            </template>
            <div :style="listData.length === 0 ? 'margin-top: 13.5rem' : ''">
              <NotData v-if="$route.name === 'Lottery' && listData.length === 0" :isNotData="isNotDataTwo"/>
            </div>
          </div>
          <div v-else class="cp-list1">
            <template v-for="(item, index) in listData[i]">
              <div class="cp-item1" :key="index" @click="playGame(item)">
                <img :src="'/data/lotteryPicture/' + item.code + '.png?' + imgFix"/>
                <span class="title">{{ item.name }}</span>
                <div class="countdown">
                  <span>{{ delList[item.id] ? countTime(delList[item.id].timeLength, item.id).h : "00" }}</span>
                  <i>:</i>
                  <span>{{ delList[item.id] ? countTime(delList[item.id].timeLength, item.id).m : "00" }}</span>
                  <i>:</i>
                  <span>{{ delList[item.id] ? countTime(delList[item.id].timeLength, item.id).s : "00" }}</span>
                </div>
              </div>
            </template>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
  import {_dealGames} from "../../utils/public.js";
  import NotData from "../../commons/notdata/NotData";
  import {LANG} from "../../utils/mode";
  // 0：六合彩；1：低频彩；2：时时彩；3：PK拾；4：11选5；5：快乐彩；6：快三；7：PC蛋蛋；
  export default {
    name: "LotteryList",
    components: {
      NotData,
      BallAll: resolve => require(['../../commons/balls/BallAll'], resolve)
    },
    props: {
      ListType: Number,
    },
    data() {
      return {
        // START
        LANG: LANG,
        // END
        tabList: [
          {name: this.$t('lang.lotterySort.all')},
          {name: this.$t('lang.lotterySort.markSixLottery')},
          {name: this.$t('lang.lotterySort.fc3d')},
          {name: this.$t('lang.lotterySort.ssLottery')},
          {name: this.$t('lang.lotterySort.pK10')},
          {name: this.$t('lang.lotterySort.Xuan5')},
          {name: this.$t('lang.lotterySort.happyLottery')},
          {name: this.$t('lang.lotterySort.kuai3')},
          {name: this.$t('lang.lotterySort.pcDanDan')},
        ],
        // tabList: [
        //   "全部",
        //   "六合彩",
        //   "低频彩",
        //   "时时彩",
        //   "PK拾",
        //   "11选5",
        //   "快乐彩",
        //   "快三",
        //   "PC蛋蛋",
        // ],
        imgFix: localStorage.getItem("imgSuffix"),
        listData: [],
        delList: {},
        collect: false,
        collectArray: [[], [], [], [], [], [], [], [], []],
        collectMap: [],
        idForWatch: "",
        keyForWatch: "",
        objForWatch: {},
        isTrue: true,
        isNotData: true,
        isNotDataTwo: true,
        count: 0,
        isChecked: true,
      };
    },
    watch: {
      // collectArray: {
      //   handler() {
      //     if (this.idForWatch !== '') {
      //       console.log(this.idForWatch);
      //       if(this.isChecked){
      //         this.collectMap['i' + this.idForWatch] = this.objForWatch
      //       }else{
      //         console.log('ischecked=false');
      //         delete this.collectMap['i' + this.idForWatch]
      //       }
      //       console.log('watch----');
      //       console.log(this.collectMap);
      //     }
      //
      //   },
      //   deep: true,
      // },
      tabActive: {
        handler() {
          console.log(this.tabActive);
          if (this.collectArray[this.tabActive].length === 0) {
            this.isNotData = false;
          }
        },
      },
    },
    methods: {
      playRule(key) {
        console.log(key)
        //{path:'/uapbd/paraset/edit',query:{pk_refinfo:'test',value:'test1'}}
        this.$router.push({path: "/playRule", query: {key: key}});
      },
      getCollectMap(value) {
        console.log("getCollectMap");
        this.count = 0;
        let collectArr = [];
        value.forEach((item, key) => {
          item.forEach((val, i) => {
            console.log(val);
            console.log(Object.keys(val).length);
            if (Object.keys(val).length !== 0) {
              console.log("ldldldldl");
              this.$set(val, "check_key", i);
              collectArr["i" + val.id] = val;
              this.count++;
            }
          });
        });
        this.collectMap = collectArr;
        console.log(this.count);
        console.log(this.collectMap);
      },
      changeCollect(value, item) {
        this.idForWatch = item.id;
        let classContent = value.currentTarget.getElementsByClassName("iconfont")[0].className;
        console.log(classContent);
        value.currentTarget.getElementsByClassName("iconfont")[0].className = classContent === "iconfont iconic-star" ? "iconfont iconic-star-f" : "iconfont iconic-star";
        let checked = value.currentTarget.getElementsByClassName("iconfont")[0].className === "iconfont iconic-star" ? false : true;
        console.log(checked);
        console.log("点击事件-----");
        let i = item.cate + 1;
        // this.collectArray[i].push(item)
        if (this.collectMap["i" + item.id]) {
          console.log(22222);

          let key = this.collectMap["i" + item.id].check_key;
          console.log(key);
          //存在就更改
          if (checked) {
            this.collectMap["i" + item.id].check = checked;
            this.collectArray[i][key].check = checked;
          } else {
            this.collectArray[i].splice(key, 1);
            this.count--;
            this.isChecked = false;
          }
          this.keyForWatch = key;
        } else {
          console.log(3333);
          let index = this.collectArray[i].push(item);
          this.keyForWatch = --index;
          this.$set(item, "check", checked);
          this.$set(item, "check_key", this.keyForWatch);
        }
        this.objForWatch = item;
        // this.collectArray.push(item)
        // if (this.collectArray[this.collectMap[item.cate]]) {
        //   console.log('11111111111111111');
        //   this.collectArray[this.collectMap['i' + id]].check = checked
        //   this.keyForWatch = this.collectMap['i' + id]
        // } else {
        //   this.keyForWatch = this.collectArray.push({id: id, check: checked, cate: cate})
        //   this.keyForWatch--
        //   console.log('keyForWatch----' + this.keyForWatch);
        // }

        console.log(this.collectArray);
        localStorage.setItem("collectArray", JSON.stringify(this.collectArray));
        this.getCollectMap(JSON.parse(localStorage.getItem("collectArray")));
        console.log("pppp");
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
      queryDataCp(_t) {
        this.$http.home.getCp(_t).then((res) => {
          const l = res.data;
          for (const key in l) {
            if (key !== "serverTime") {
              l[key].timeLength = parseInt(l[key].cur.closeTime / 1000 - res.data.serverTime / 1000);
            }
          }
          this.delList = l;
        });
      },
      playGame(item) {
        console.log(item, '进入游戏');
        let lotteryId = item.id;
        this.$router.push({
          path: item.type,
          query: {lotteryId: lotteryId, itemCate: item.cate, type: item.type, code: item.code},
        });
      },
    },
    mounted() {
      // 初次加载获取开奖数据
      const _t = (Date.parse(new Date()) / 1000).toString();
      this.queryDataCp(_t);
      // 定时获取开奖数据
      const timer1 = setInterval(() => {
        const _t = (Date.parse(new Date()) / 1000).toString();
        this.$http.home.getCp(_t).then((res) => {
          const l = res.data;
          for (const key in l) {
            if (key !== "serverTime") {
              l[key].timeLength = parseInt(l[key].cur.closeTime / 1000 - res.data.serverTime / 1000);
            }
          }
          this.delList = l;
        });
      }, 10000);
      const timer = setInterval(() => {
        const delList = this.delList;
        for (const key in delList) {
          if (key !== "serverTime") {
            if (delList[key].timeLength >= 0) {
              delList[key].timeLength--;
            }
          }
        }
        this.delList = delList;
      }, 1000);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
        clearInterval(timer1);
      });
      // 收藏
      let collectStr = localStorage.getItem("collectArray");
      if (collectStr !== null) {
        this.collectArray = JSON.parse(collectStr);
        this.getCollectMap(this.collectArray);
        console.log(this.collectMap);
      }
    },
    created() {
      if (!sessionStorage.getItem("LotteryTypeList")) {
        this.$http.home.getCpGame().then((res) => {
          this.listData = _dealGames(res.data);
          sessionStorage.setItem("LotteryTypeList", JSON.stringify(res.data));
        });
      } else {
        const lotteryTypeList = JSON.parse(sessionStorage.getItem("LotteryTypeList"));
        this.listData = _dealGames(lotteryTypeList);
      }
      console.log(this.listData, 'this.listDatathis.listData');
      setTimeout(() => {
        this.isTrue = false;
        this.isNotData = false;
      }, 500);
    }
  };
</script>
<style lang="scss" scoped>
  .skin-gray {
    $border-color: #717180;
    .cp-content {
      & > div {
        /deep/ .van-tabs {
          .van-tabs__wrap {
            //border-bottom: 1px solid $border-color;
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
            .van-tab__pane {
              .lottery-list {
                //background: #44425D;
                .cp-item {
                  background: #4C4965;
                  .top {
                    color: #9a9aa7;
                    .top-info {
                      .top-con {
                        .top-r-i {
                          &:nth-child(1) {
                            border-right: 1px solid $skin-gray-border-color;
                          }
                        }
                      }
                      .countdown {
                        color: #fff;
                      }
                    }
                    .top-r {
                      color: #fff;
                      .iconicon_arrow_right {
                        color: $skin-gray-text-color;
                      }
                    }
                  }
                  .bottom {
                    color: #fff;
                    border-top: 1px solid $skin-gray-border-color;
                    div {
                      border-right: 1px solid $skin-gray-border-color;
                      .iconfont {
                        color: #9a9aa7;
                        &.isCheck {
                          /*color:#E3C09A !important;*/
                          background: linear-gradient(to right, #FFEAC0, #FFD681);
                          -webkit-background-clip: text;
                          -webkit-text-fill-color: transparent;
                        }
                      }
                    }

                  }
                }
              }
            }
          }
        }
        /deep/ .van-tabs__nav--line {
          padding: 0;
        }
      }
      .cp-list1 {
        background: #45435F;
      }
    }
  }

  .skin-black {
    $border-color: #393940;
    .cp-content {
      & > div {
        /deep/ .van-tabs {
          .van-tabs__wrap {
            //border-bottom: 1px solid $border-color;
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
            .van-tab__pane {
              .lottery-list {
                //background: #191B1F;
                .cp-item {
                  background: #24252D;
                  .top {
                    color: #8f8f8f;
                    .top-info {
                      .top-con {
                        .top-r-i {
                          &:nth-child(1) {
                            border-right: 1px solid $skin-black-border-color;
                          }
                        }
                      }
                      .countdown {
                        color: #fff;
                      }
                    }
                    .top-r {
                      color: #fff;
                      .iconicon_arrow_right {
                        color: $skin-black-text-color;
                      }
                    }
                  }
                  .bottom {
                    color: #fff;
                    border-top: 1px solid $skin-black-border-color;
                    div {
                      border-right: 1px solid $skin-black-border-color;
                      .iconfont {
                        color: #9a9aa7;
                        &.isCheck {
                          /*color:#E3C09A !important;*/
                          background: linear-gradient(to right, #ECCBA3, #DDB994);
                          -webkit-background-clip: text;
                          -webkit-text-fill-color: transparent;
                        }
                      }
                    }

                  }
                }
              }
            }
          }
        }
        /deep/ .van-tabs__nav--line {
          padding: 0;
        }
      }
      .cp-list1 {
        background: #191B1F;
      }
    }
  }

  .cp-content {
    overflow-x: scroll;
    flex: 1;
    flex-shrink: 0;
    .top-info {
      display: flex;
      .top-con {
        display: flex;
        flex: 1;
        margin: 0.12rem;
        .top-r-i:nth-child(1) {
          width: 3rem;
          border-right: 1px #393940 solid;
          display: flex;

          margin-right: 0.16rem;
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

      /*.van-tabs__wrap {*/
      /*  height: 0.8rem;*/
      /*}*/

      .van-tab--active {
        /*color: #c00;*/
      }

      .van-tabs__line {
        width: 85px !important;
        //background-color: #c00 !important;
      }
    }

    .lottery-list {
      display: flex;
      flex-direction: column;
      /*background: #fff;*/
      width: 100%;
      .cp-item {
        display: flex;
        width: 100%;
        flex-direction: column;
        .top {
          /*display: flex;*/
          /*flex-direction: row;*/
          /*align-items: center;*/
          /*padding: 10px 15px 0 15px;*/
          padding: 0.18rem;
          img {
            width: 1.3rem;
            height: 1.3rem;
            margin-right: 0.1rem;
          }
          .top-r-i {
            display: flex;
            flex-direction: column;
            line-height: 0.5rem;
            .countdown {
              & > div {
                display: flex;
              }
            }
            .title {
              color: #fff;
              /*font-weight: 400;*/
              font-size: 0.3rem;
            }
            .color1 {
              color: #8f8f8f;
            }
            .haoma {
              color: #c00;
              font-weight: 700;
              font-size: 16px;
              flex: 1;
              div {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
              }
              span {
                margin-right: 5px;
              }
            }
          }
          .num-wrap {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;
          }
          .top-r {
            /*flex: 1;*/
            display: flex;
            align-items: center;
            /*flex-direction: column;*/
            /*flex-shrink: 0;*/

          }
        }
        .bottom {
          display: flex;
          flex-direction: row;
          padding: 10px 0;
          //border-bottom: 10px solid #f5f5f5;
          /*border-top: .02rem solid #393940;*/
          /*margin-top: .3rem;*/

          .iconfont {
            color: #c00;
            margin-right: 5px;
          }

          div {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-right: 1px solid #f5f5f5;
          }
        }
      }
    }
    .cp-list1 {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      background-color: #191b1f;
      color: #fff;
      .countdown {
        & > div {
          display: flex;
        }
        span {
          padding: 0.08rem 0.06rem;
        }
      }
      .cp-item1 {
        display: flex;
        flex-direction: column;
        width: 33.33%;
        justify-content: center;
        align-items: center;
        padding-bottom: .36rem;
        img {
          width: 1rem;
          height: 1rem;
        }
        .title {
          color: #fff;
          font-size: .3rem;
          font-weight: 400;
          margin: .15rem 0;
        }
      }
      .cp-item1:nth-child(1),
      .cp-item1:nth-child(2),
      .cp-item1:nth-child(3) {
        padding-top: .35rem;
      }
    }
  }
</style>
