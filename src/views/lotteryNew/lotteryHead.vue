<template>
  <div class="lottery-header-wrapper">
    <div class="lottery-header">
      <div class="left" @click="goBack()">
        <i class="iconfont iconic-left"></i>
      </div>
      <div class="middle" @click.stop="showMenu()">
        <!--<span class="intro">玩法</span>-->
        <div>{{title}}</div>
        <i class="arrow" :class="isShowMenu?'active':''"></i>
      </div>
      <div class="right">
        <div class="icon-wrapper" @click="show = true">
          <i class="iconfont iconic-more"></i>
        </div>
        <van-overlay class-name="nav-mask" overlay
                     :show="show"
                     fseletClick
                     @click="show = false">
          <ul class="nav-list">
            <!--<li @click="$router.push({path:'/Tendency',query:{type,code,lotteryId}})">-->
            <li @click="goToTrend()">
              <i class="iconfont iconic-trend"></i>
              <!--走势图-->
              {{$t('lang.lottery.nav[0]')}}
            </li>
            <!--<li @click="$router.push('drawHistory?lotteryId=' + lotteryId)">-->
            <li @click="$router.push({path:'/drawHistory',query:{lotteryId:currentLotteryInfo.id}})">
              <i class="iconfont iconic-draw"></i>
              <!--近期开奖-->
              {{$t('lang.lottery.nav[1]')}}
            </li>
            <li @click="$router.push('/Note')">
              <i class="iconfont iconic-buylist"></i>
              <!--购彩记录-->
              {{$t('lang.lottery.nav[2]')}}
            </li>
            <li @click="$router.push({path:'/playRule',query:{type:currentLotteryInfo.type}})">
              <i class="iconfont iconic-info"></i>
              <!--玩法说明-->
              {{$t('lang.lottery.nav[3]')}}
            </li>
            <li @click="showLuZhi()"
                v-if="[lotteryType.ssc,lotteryType.pk10].includes(currentLotteryInfo && currentLotteryInfo.type)">
              <i class="iconfont iconic-Luzi"></i>
              <!--路子-->
              {{$t('lang.lottery.nav[4]')}}
            </li>
            <li @click="showLongDragon()">
              <i class="iconfont iconic-Changlong"></i>
              <!--长龙-->
              {{$t('lang.lottery.nav[5]')}}
            </li>
          </ul>
        </van-overlay>
      </div>
    </div>
    <div class="menu-wrapper" v-show="isShowMenu">
      <div class="content-wrapper"
           v-if="list.length>0">
        <div class="first-menu">
          <ul>
            <li v-for="(item,index) in list">
              <div @click.stop="switchFirstMenu(index)"
                   :class="index === firstMenuIndex ? 'active':''">{{item.name}}
              </div>
            </li>
          </ul>
        </div>
        <div class="second-menu">
          <!--ssc-->
          <div class="second-menu-ssc"
               v-if="[lotteryType.ssc].includes(currentLotteryInfo.type)">
            <ul class="ssc-menu"
                v-if="list[firstMenuIndex].children.length>0">
              <li v-for="(itemSecond,indexSecond) in list[firstMenuIndex].children"
                  :key="itemSecond.name">
                <p class="title">{{itemSecond.name}}</p>
                <ul v-if="itemSecond.children.length>0">
                  <li v-for="(item,index) in itemSecond.children"
                      :key="item.name">
                    <div :class="specialActive(indexSecond,index)?'active':''"
                         @click.stop="switchSpecialSecondMenu(indexSecond,index)">{{item.name}}
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <!--fc3d bjkl8 -->
          <div class="second-menu-ssc"
               v-if="[lotteryType.fc3d,lotteryType.bjkl8,lotteryType.klc,lotteryType.klsf].includes(currentLotteryInfo.type)">
            <ul class="ssc-menu"
                v-if="list[firstMenuIndex].menu.length>0">
              <li v-for="(itemSecond,indexSecond) in list[firstMenuIndex].menu">
                <p class="title">{{itemSecond.name}}</p>
                <ul v-if="itemSecond.subMenu.length>0">
                  <li v-for="(item,index) in itemSecond.subMenu">
                    <div :class="specialActive(indexSecond,index)?'active':''"
                         @click.stop="switchSpecialSecondMenu(indexSecond,index)">{{item.name}}
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <!--k3,pk10-->
          <div class="second-menu-other"
               v-if="[lotteryType.k3,lotteryType.pk10,lotteryType.eleven5,lotteryType.pcdd].includes(currentLotteryInfo.type)">
            <ul v-if="list[firstMenuIndex].children.length>0">
              <li v-for="(item,index) in list[firstMenuIndex].children">
                <div :class="index === secondMenuIndex?'active':''"
                     @click.stop="switchSecondMenu(index,item)">
                  {{item.name}}
                </div>
              </li>
            </ul>
          </div>
          <!--lhc-->
          <div class="second-menu-other"
               v-if="[lotteryType.lhc].includes(currentLotteryInfo.type)">
            <ul v-if="list[firstMenuIndex].menu.length>0">
              <li v-for="(item,index) in list[firstMenuIndex].menu">
                <div :class="index === secondMenuIndex?'active':''"
                     @click.stop="switchSecondMenu(index,item)">
                  {{item.name}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--路子-->
    <van-action-sheet v-model="isShowLuZhi"
                      class="luZhi-wrapper"
                      :title="$t('lang.lottery.nav[4]')">
      <div class="content-wrapper" v-if="luZhiList.length>0">
        <ul class="title-wrapper">
          <li class="title-item"
              @click="switchLuZhi(index)"
              v-for="(item,index) in luZhiList">
            <div :class="luZhiIndex === index?'active':''">
              {{ item.name }}
            </div>
          </li>
        </ul>
        <div class="table-wrapper">
          <div class="table-item"
               v-for="(item,index) in luZhiList"
               v-if="luZhiIndex === index">
            <ul v-for="(luZhi,luZhiIndex) in item.luzhi">
              <li v-for="(text) in luZhi">
                <div :class="getClassByValue(text)">
                  {{text}}
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </van-action-sheet>
    <!--长龙-->
    <van-action-sheet v-model="isShowLongDragon"
                      class="dragon-wrapper"
                      :title="$t('lang.lottery.nav[5]')">
      <div class="content-wrapper" v-if="longDragonData.length>0">
        <div class="item" v-for="(item,index) in longDragonData">
          <span>{{ item.name }}</span>
          <span>{{ item.openValue }}</span>
          <span class="num">{{ item.repeatCount }}</span>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
  import {Dialog, Toast} from "vant";
  import {mapActions, mapMutations, mapState} from "vuex"
  import {lotteryType} from "../../utils/mode";

  export default {
    name: "lotteryHead",
    data() {
      return {
        lotteryType: lotteryType,
        menuTitle: null,
        isShowMenu: false,
        firstMenuIndex: 0,
        secondMenuIndex: 0,
        specialIndex: [0, 0],
        // ======
        show: false, // 显示右侧导航
        isShowLuZhi: false,
        luZhiIndex: 0,
        isShowLongDragon: false,
      };
    },
    components: {},
    computed: {
      ...mapState([
        'menuList',
        'methodTitle',
        'currentMethodInfo',
        'currentLotteryInfo',
        'basketList',
        'luZhiData',
        'longDragonData',
        'routerHistory',
        'allLotteryTypeList'
      ]),
      list() {
        console.log(this.menuList, 'menuList-computed');
        if (this.menuList) {
          this._getCurrentMethod();
          return this.menuList
        }
      },
      title() {
        return this.methodTitle
      },
      luZhiList() {
        let formatList = JSON.parse(JSON.stringify(this.luZhiData));
        let method = this.currentMethodInfo;
        let lotteryInfo = this.currentLotteryInfo;
        // for (let item of list) {
        //   let code = item.code;
        //   if (lotteryType.pk10 === lotteryInfo.type) {
        //     if (method.children.length > 0) {
        //       for (let child of method.children) {
        //         if (child.code === item.code) {
        //           console.log(item, 'item');
        //           formatList.push(item);
        //         }
        //       }
        //     }
        //   }
        // }
        if (formatList.length > 0) {
          let allLEN = [];
          for (let [key, item] of Object.entries(formatList)) {
            allLEN.push([]);
            for (let luzhi of item.luzhi) {
              let LEN = luzhi.split(',').length;
              allLEN[Number(key)].push(LEN);
            }
          }
          for (let [num, list] of Object.entries(allLEN)) {
            let maxLEN = Math.max(...list);
            let currentLuzhiArr = formatList[Number(num)].luzhi;
            for (let [key, luzhi] of Object.entries(currentLuzhiArr)) {
              let arr = luzhi.split(',');
              if (maxLEN - arr.length > 0) {
                let concatArr = new Array(maxLEN - arr.length).fill(' ');
                currentLuzhiArr[Number(key)] = [].concat(arr).concat(concatArr);
              } else {
                currentLuzhiArr[Number(key)] = arr;
              }
            }
            if (currentLuzhiArr.length < 10) {
              let newArr = new Array(maxLEN).fill(' ');
              // console.log(newArr, 11);
              let LEN = 10 - currentLuzhiArr.length;
              let concatArr = new Array(LEN).fill(newArr);
              // console.log(concatArr, 'concatArr');
              // console.log(currentLuzhiArr, 'currentLuzhiArr');
              // console.log(formatList, num, 'ccccc');
              formatList[Number(num)].luzhi = [].concat(currentLuzhiArr).concat(concatArr)
            }
          }
        }
        // console.log(formatList, 'formatListformatList');
        return formatList
      }
    },
    methods: {
      ...mapActions([
        'initData',
        'getLuZhi',
        'getLongDragon'
      ]),
      ...mapMutations({
        setData: 'SET_DATA'
      }),
      switchFirstMenu(index) {
        this.firstMenuIndex = index;
        this.initData({});
        if (this._whichLotteryType()) { // 如果是ssc就设置[0,0]
          this.specialIndex = [0, 0]
        } else { // 不然就不设置
          this.secondMenuIndex = 0;
        }
        this._getCurrentMethod();
        this.setData({key: 'tabsIndex', value: 0});
        if (lotteryType.lhc === this.currentLotteryInfo.type) {
          this.showMenu();
        }
      },
      switchSecondMenu(index) {
        this.secondMenuIndex = index;
        this.initData({});
        this.$nextTick(() => {
          this._getCurrentMethod();
          this.showMenu();
          this.setData({key: 'tabsIndex', value: 0});
        })
      },
      switchSpecialSecondMenu(indexSecond, index) {
        this.specialIndex = [indexSecond, index];
        this.initData({});
        this.$nextTick(() => {
          this._getCurrentMethod();
          this.showMenu();
        })
      },
      specialActive(indexSecond, index) {
        if ((this.specialIndex[0] === indexSecond) && (this.specialIndex[1] === index)) {
          return true
        } else {
          return false
        }
      },
      showMenu() {
        this.isShowMenu = !this.isShowMenu
      },
      _getCurrentMethod() {
        let list = this.menuList;
        if (list.length > 0) {
          let type = this.currentLotteryInfo.type;
          let firstMenu = list[this.firstMenuIndex];
          this.setData({key: 'currentMethodInfo', value: null});
          if ([lotteryType.ssc].includes(type)) { // ssc
            this.setData({key: 'methodTitle', value: null});
            if (firstMenu.children && firstMenu.children.length > 0) {
              let secondMenu = firstMenu.children;
              let currentMethod = JSON.parse(JSON.stringify(secondMenu[this.specialIndex[0]].children[this.specialIndex[1]]));
              this.setData({key: 'methodTitle', value: JSON.parse(JSON.stringify(currentMethod.name))});
              this.setData({key: 'currentMethodInfo', value: currentMethod});
            }
          }
          else if ([lotteryType.pk10, lotteryType.k3, lotteryType.pcdd, lotteryType.eleven5].includes(type)) {
            // pk10,k3,PCDD,11x5;
            if (firstMenu.children && firstMenu.children.length > 0) {
              let secondMenu = firstMenu.children;
              let currentMethod = JSON.parse(JSON.stringify(secondMenu[this.secondMenuIndex]));
              this.setData({key: 'methodTitle', value: currentMethod.name});
              this.setData({key: 'currentMethodInfo', value: currentMethod});
            }
          }
          else if ([lotteryType.lhc].includes(type)) {
            // lhc;
            console.log(firstMenu, 'lhc-firstMenu');
            let secondMenu = firstMenu.menu;
            let currentMethod = JSON.parse(JSON.stringify(secondMenu[this.secondMenuIndex]));
            this.setData({key: 'methodTitle', value: firstMenu.name});
            this.setData({key: 'currentMethodInfo', value: currentMethod});
          }
          else if ([lotteryType.fc3d, lotteryType.bjkl8, lotteryType.klc, lotteryType.klsf].includes(type)) {
            // fc3d;
            let secondMenu = firstMenu.menu;
            console.log(secondMenu, 'secondMenusecondMenu');
            let currentMethod = JSON.parse(JSON.stringify(secondMenu[this.specialIndex[0]].subMenu[this.specialIndex[1]]));
            console.log(currentMethod, 'currentMethodcurrentMethod');
            this.setData({key: 'methodTitle', value: currentMethod.name});
            this.setData({key: 'currentMethodInfo', value: currentMethod});
          }
          this.$nextTick(() => {
            // console.log(this.currentMethodInfo, 'this------.currentMethodInfo');
            // let gameId = this.currentMethodInfo.gameId;
            // if ([lotteryType.ssc, lotteryType.pk10].includes(type)) {
            //   this.getLuZhi(gameId);
            // }
            // this.getLongDragon(gameId);
          })
        }
      },
      // 判断当前是哪一类彩种
      _whichLotteryType() {
        let type = this.currentLotteryInfo.type;
        if ([lotteryType.ssc, lotteryType.fc3d, lotteryType.bjkl8, lotteryType.klc, lotteryType.klsf].includes(type)) {
          return true
        } else {
          return false
        }
      },
      // -------------------
      goToTrend() {
        let id = this.$route.query.id;
        this.$router.push({
          path: '/trend',
          query: {
            lotteryId: id
          }
        })
      },
      goBack() {
        if (this.basketList.length > 0) {
          this.$dialog.confirm({
            title: '温馨提示',
            message: '是否清空投注单数据？'
          }).then(() => {
            this.setData({key: 'basketList', value: []});
            this.formatPath();
          })
        } else {
          this.formatPath();
        }
      },
      formatPath() {
        let history = this.routerHistory;
        if (history.length !== 0) { // 在当前页面刷新
          let id = this.$route.query.id;
          for (let i = history.length; i >= 0; i--) {
            let prePath = history[i - 2];
            console.log(prePath, 'prePath');
            if (!['/trend', '/lotteryNew', '/Note', '/playRule'].includes(prePath)) {
              if (prePath === '/Lottery') {
                let cate = this.currentLotteryInfo.cate;
                let list = this.allLotteryTypeList;
                for (let i = 0; i < list.length; i++) {
                  if (cate === list[i].cate) {
                    this.setData({key: 'lotteryHellIndex', value: i});
                  }
                }
              }
              if (prePath === '/drawHistory') {
                this.$router.push({
                  path: prePath,
                  query: {
                    lotteryId: id
                  }
                });
              } else {
                this.$router.push({
                  path: prePath,
                });
              }

              break;
            }
          }

        }
      },
      switchLuZhi(index) {
        this.luZhiIndex = index;
      },
      showLuZhi() {
        this.isShowLuZhi = true;
      },
      showLongDragon() {
        this.isShowLongDragon = true;
      },
      getClassByValue(t) {
        let classMap = {
          "单": "dan",
          "双": "shuang",
          "大": "da",
          "小": "xiao",
          "龙": "long",
          "虎": "hu",
          "红": "red",
          "绿": "green",
          "蓝": "blue",
          "质": "red",
          "合": "green",
          "奇": "red",
          "偶": "blue",
          "上": "red",
          "中": "gray",
          "下": "blue",
          "金": "gold",
          "木": "mu",
          "水": "blue",
          "火": "red",
          "土": "light-black",
          "福": "orange",
          "禄": "blue",
          "寿": "gold",
          "喜": "red",
          "红波": "red",
          "蓝波": "blue",
          "绿波": "green"
        };
        if (classMap[t])
          return classMap[t];
        if (!/^\d+$/.test(t))
          return t ? "default" : "";
        switch (parseInt(t) % 5) {
          case 0:
            return "red";
          case 1:
            return "blue";
          case 2:
            return "gray";
          case 3:
            return "orange";
          case 4:
            return "green"
        }
      },
    },
    mounted() {
      // this._getCurrentMethod()
    },
    created() {

    },
  };
</script>
<style lang="scss" scoped>
  $head-height: 1rem;
  .skin-black {
    .lottery-header-wrapper {
      .lottery-header {
        color: #fff;
        .right {
          .nav-mask {
            background-color: rgba(0, 0, 0, 0.3);
            ul.nav-list {
              background-color: #24252d;
              color: #9a9aa7;

              &::before {
                border-bottom-color: #24252d;
              }
              li {
                color: #9a9aa7;
                &:not(:last-child) {
                  @include border-1px(#717180);
                }
                i {
                  color: #dab591;
                }
              }
            }
          }
        }
        .middle {
          i {
            border-top: 0.15rem solid #fff;
          }
        }
      }
      .menu-wrapper {
        background: rgba(0, 0, 0, 0.3);
        .content-wrapper {
          .first-menu {
            background: #24252d;
            ul {
              li {
                div {
                  box-shadow: 0 0.04rem 0.12rem 0 rgb(0, 0, 0/30%);
                  background-color: #16171b;
                  color: #8f8f8f;
                  &.active {
                    color: #533510;
                    background-image: linear-gradient(180deg, #efcea6, #dab591);
                  }
                }
              }
            }
          }
          .second-menu {
            background: #2d2e35;
            .second-menu-ssc {
              ul.ssc-menu {
                & > li {
                  .title {
                    color: #fff;
                  }
                  ul {
                    li {
                      div {
                        border: .02rem solid #444555;
                        background-color: #2d2e35;
                        color: #8f8f8f;
                        &.active {
                          border: .02rem solid #efcea6;
                          color: #9f7954;
                          background-color: #2d2e35;
                          background-image: none;
                        }
                      }
                    }
                  }
                }
              }
            }
            .second-menu-ssc,
            .second-menu-other {
              ul {
                li {
                  div {
                    border: .02rem solid #444555;
                    background-color: #2d2e35;
                    color: #8f8f8f;
                    &.active {
                      border: .02rem solid #efcea6;
                      color: #9f7954;
                      background-color: #2d2e35;
                      background-image: none;
                    }
                  }
                }
              }
            }
          }
        }

      }
      .luZhi-wrapper {
        color: #fff;
        .content-wrapper {
          ul.title-wrapper {
            border-top: 1px solid #dfe0e1;
            li.title-item {
              div {
                background: #e4e4e4;
                color: #000;
                &.active {
                  background-color: #ffcd65;
                }
              }
            }
          }
          .table-wrapper {
            .table-item {
              border-bottom: 1px solid #d3d3d3;
              border-left: 1px solid #d3d3d3;
              ul {
                border: 0.01rem solid #d3d3d3;
                li {
                  color: #fff;
                  border-bottom: 1px solid #d3d3d3;
                  div {
                    color: #fff;
                    &.da, &.dan, &.long, &.red {
                      background: red;
                    }
                    &.gold {
                      background-color: #d9d919
                    }
                    &.light-black {
                      background-color: #888
                    }

                    &.mu {
                      background-color: #a68064
                    }

                    &.blue, &.hu, &.shuang, &.xiao {
                      background-color: blue
                    }

                    &.gray {
                      background-color: #bdc3c7
                    }

                    &.orange {
                      background-color: #f39c12
                    }

                    &.green {
                      background-color: #2ecc71
                    }
                  }
                }
              }
            }
          }

        }

      }
      .dragon-wrapper {
        color: #fff;
        .content-wrapper {
          width: 100%;
          border-top: 1px solid #dfe0e1;
          .item {
            display: flex;
            height: 0.5rem;
            line-height: 0.5rem;
            color: #fff;
            border-bottom: .5px solid #ddd;
            font-size: .25rem;
            span {
              flex: 1;
              text-align: center;
            }
            span.num {
              color: #2196f3;
            }
          }
        }
      }
    }
  }

  .skin-gray {
    .lottery-header-wrapper {
      .lottery-header {
        color: #fff;
        .right {
          .nav-mask {
            background-color: rgba(0, 0, 0, 0.3);
            ul.nav-list {
              background-color: #24252d;
              color: #9a9aa7;

              &::before {
                border-bottom-color: #24252d;
              }
              li {
                color: #9a9aa7;
                &:not(:last-child) {
                  @include border-1px(#717180);
                }
                i {
                  color: #dab591;
                }
              }
            }
          }
        }
        .middle {
          i {
            border-top: 0.15rem solid #fff;
          }
        }
      }
      .menu-wrapper {
        background: rgba(0, 0, 0, 0.3);
        .content-wrapper {
          .first-menu {
            background: #24252d;
            ul {
              li {
                div {
                  box-shadow: 0 0.04rem 0.12rem 0 rgb(0, 0, 0/30%);
                  background-color: #16171b;
                  color: #8f8f8f;
                  &.active {
                    color: #533510;
                    background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);;
                  }
                }
              }
            }
          }
          .second-menu {
            background: #2d2e35;
            .second-menu-ssc {
              ul.ssc-menu {
                & > li {
                  .title {
                    color: #8f8f8f;
                  }
                  ul {
                    li {
                      div {
                        border: .02rem solid #605c7b;
                        background-color: #38364A;
                        color: #8f8f8f;
                        &.active {
                          border: .02rem solid #ffd57d;
                          color: #9f7954;
                          background-color: #38364A;
                          /*background-color: #2d2e35;*/
                          /*background-image: none;*/
                        }
                      }
                    }
                  }
                }
              }
            }
            .second-menu-ssc,
            .second-menu-other {
              ul {
                li {
                  div {
                    border: .02rem solid #605c7b;
                    background-color: #38364A;
                    color: #8f8f8f;
                    &.active {
                      border: .02rem solid #ffd57d;
                      color: #9f7954;
                      background-color: #38364A;
                      /*background-color: #2d2e35;*/
                      /*background-image: none;*/
                    }
                  }
                }
              }
            }
          }
        }

      }
      .luZhi-wrapper {
        color: #fff;
        .content-wrapper {
          ul.title-wrapper {
            border-top: 1px solid #dfe0e1;
            li.title-item {
              div {
                background: #e4e4e4;
                color: #000;
                &.active {
                  background-color: #ffcd65;
                }
              }
            }
          }
          .table-wrapper {
            .table-item {
              border-bottom: 1px solid #d3d3d3;
              border-left: 1px solid #d3d3d3;
              ul {
                border: 0.01rem solid #d3d3d3;
                li {
                  color: #fff;
                  border-bottom: 1px solid #d3d3d3;
                  div {
                    color: #fff;
                    &.da, &.dan, &.long, &.red {
                      background: red;
                    }
                    &.gold {
                      background-color: #d9d919
                    }
                    &.light-black {
                      background-color: #888
                    }

                    &.mu {
                      background-color: #a68064
                    }

                    &.blue, &.hu, &.shuang, &.xiao {
                      background-color: blue
                    }

                    &.gray {
                      background-color: #bdc3c7
                    }

                    &.orange {
                      background-color: #f39c12
                    }

                    &.green {
                      background-color: #2ecc71
                    }
                  }
                }
              }
            }
          }

        }

      }
      .dragon-wrapper {
        color: #fff;
        .content-wrapper {
          width: 100%;
          border-top: 1px solid #dfe0e1;
          .item {
            display: flex;
            height: 0.5rem;
            line-height: 0.5rem;
            color: #fff;
            border-bottom: .5px solid #ddd;
            font-size: .25rem;
            span {
              flex: 1;
              text-align: center;
            }
            span.num {
              color: #2196f3;
            }
          }
        }
      }
    }
  }

  .lottery-header-wrapper {
    position: relative;
    width: 100%;
    height: $head-height;
    .lottery-header {
      color: #fff;
      position: relative;
      width: 100%;
      height: $head-height;
      text-align: center;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      /*padding: 0 0.25rem;*/
      align-items: center;
      .left {
        font-size: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 0.75rem;
        height: 100%;
      }
      .right {
        min-height: 0.88rem;
        height: 100%;
        width: 1rem;
        font-size: 0.48rem;
        display: flex;
        align-items: center;
        .icon-wrapper {
          width: 1rem;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .nav-mask {
          background-color: rgba(0, 0, 0, 0.3);
          z-index: 260;
          ul.nav-list {
            right: 0.1rem;
            width: 3.72rem;
            position: relative;
            background-color: #24252d;
            color: #9a9aa7;
            border-radius: .22rem;
            top: 1.2rem;
            left: 3.6rem;
            &::before {
              content: "";
              position: absolute;
              top: -0.35rem;
              right: 0.26rem;
              border: 0.2rem solid transparent;
              border-bottom-color: #24252d;
              /*border-bottom-color: red;*/
            }
            li {
              position: relative;
              padding: 0 0.2rem;
              display: flex;
              flex-direction: row;
              align-items: center;
              font-size: 0.3rem;
              width: 3.72rem;
              height: .88rem;
              color: #9a9aa7;
              &:not(:last-child) {
                @include border-1px(#717180);
                &:after {
                  width: 100%;
                  left: 0;
                  right: 0;
                }
              }
              i {
                font-size: 0.46rem;
                margin-right: 0.2rem;
                color: #dab591;
              }
            }
          }
        }
      }
      .middle {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: .3rem;
        i {
          margin: 0 0 0 0.1rem;
          border-left: 0.15rem solid transparent;
          border-right: 0.15rem solid transparent;
          border-top: 0.15rem solid #fff;
          vertical-align: middle;
          transition: transform .3s ease-in-out 0s;
          &.active {
            transform: rotate(180deg);
          }
        }
      }
    }
    .menu-wrapper {
      position: fixed;
      top: 1rem;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      z-index: 200;
      .content-wrapper {
        height: 100%;
        overflow: scroll;
        .first-menu {
          background: #24252d;
          width: 100%;
          ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            width: 100%;
            padding: .3rem 2.5% 0;
            li {
              width: 33.3%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0 0 .3rem;
              font-size: .3rem;
              div {
                width: 1.96rem;
                height: .76rem;
                line-height: .76rem;
                border-radius: .12rem;
                box-shadow: 0 0.04rem 0.12rem 0 rgb(0, 0, 0/30%);
                background-color: #16171b;
                text-align: center;
                color: #8f8f8f;
                &.active {
                  font-weight: 700;
                  color: #533510;
                  background-image: linear-gradient(180deg, #efcea6, #dab591);
                }
              }
            }
          }
        }
        .second-menu {
          background: #2d2e35;
          .second-menu-ssc {
            ul.ssc-menu {
              display: flex;
              flex-direction: column;
              & > li {
                width: 100%;
                display: flex;
                flex-direction: column;
                .title {
                  width: 100%;
                  text-align: left;
                  padding: 0 0 0 0.2rem;
                  line-height: 30px;
                  color: #fff;
                }
                ul {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: flex-start;
                  width: 100%;
                  padding: .3rem 2.5% 0;
                  li {
                    width: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 0 .3rem;
                    font-size: .3rem;
                    div {
                      width: 3.14rem;
                      height: .76rem;
                      line-height: .72rem;
                      border-radius: .08rem;
                      border: .02rem solid #444555;
                      background-color: #2d2e35;
                      color: #8f8f8f;
                      text-align: center;
                      &.active {
                        border: .02rem solid #efcea6;
                        color: #9f7954;
                        background-color: #2d2e35;
                        background-image: none;
                      }
                    }
                  }
                }
              }
            }

          }
          .second-menu-ssc,
          .second-menu-other {
            ul {
              display: flex;
              flex-wrap: wrap;
              justify-content: flex-start;
              width: 100%;
              padding: .3rem 2.5% 0;
              li {
                width: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 0 .3rem;
                font-size: .3rem;
                div {
                  width: 3.14rem;
                  height: .76rem;
                  line-height: .72rem;
                  border-radius: .08rem;
                  border: .02rem solid #444555;
                  background-color: #2d2e35;
                  color: #8f8f8f;
                  text-align: center;
                  &.active {
                    border: .02rem solid #efcea6;
                    color: #9f7954;
                    background-color: #2d2e35;
                    background-image: none;
                  }
                }
              }
            }
          }
        }
      }

    }
    .luZhi-wrapper {
      color: #fff;
      .content-wrapper {
        width: 100%;
        ul.title-wrapper {
          /*width: 100%;*/
          display: flex;
          height: 1rem;
          border-top: 1px solid #dfe0e1;
          overflow-x: scroll;
          padding: 0 0.2rem;
          li.title-item {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 0.2rem 0 0;
            &:last-child {
              /*margin: 0;*/
            }
            div {
              width: 30vw;
              height: 0.8rem;
              line-height: 0.8rem;
              text-align: center;
              border-radius: 0.2rem;
              background: #e4e4e4;
              color: #000;
              font-size: 0.3rem;
              &.active {
                background-color: #ffcd65;
              }
            }
          }
        }
        .table-wrapper {
          width: 100%;
          overflow-x: scroll;
          .table-item {
            width: 100%;
            border-bottom: 1px solid #d3d3d3;
            border-left: 1px solid #d3d3d3;
            display: flex;
            justify-content: left;
            $common-width: 10vw;
            ul {
              width: $common-width;
              border: 0.01rem solid #d3d3d3;
              border-left: none;
              li {
                width: $common-width;
                height: $common-width;
                line-height: $common-width;
                text-align: center;
                color: #fff;
                border-bottom: 1px solid #d3d3d3;
                display: flex;
                justify-content: center;
                align-items: center;
                &:last-child {
                  border-bottom: none;
                }
                div {
                  width: 8vw;
                  height: 8vw;
                  line-height: 8vw;
                  border-radius: 50%;
                  color: #fff;
                  &.da, &.dan, &.long, &.red {
                    background: red;
                  }
                  &.gold {
                    background-color: #d9d919
                  }
                  &.light-black {
                    background-color: #888
                  }

                  &.mu {
                    background-color: #a68064
                  }

                  &.blue, &.hu, &.shuang, &.xiao {
                    background-color: blue
                  }

                  &.gray {
                    background-color: #bdc3c7
                  }

                  &.orange {
                    background-color: #f39c12
                  }

                  &.green {
                    background-color: #2ecc71
                  }
                }
              }
            }
          }
        }

      }

    }
    .dragon-wrapper {
      color: #fff;
      .content-wrapper {
        width: 100%;
        border-top: 1px solid #dfe0e1;
        .item {
          display: flex;
          height: 0.5rem;
          line-height: 0.5rem;
          color: #fff;
          border-bottom: .5px solid #ddd;
          font-size: .25rem;
          span {
            flex: 1;
            text-align: center;
          }
          span.num {
            color: #2196f3;
          }
        }
      }
    }
  }
</style>
