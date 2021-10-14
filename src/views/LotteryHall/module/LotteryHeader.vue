<template>
  <div class="header-content">
    <div class="lottery-header">
      <div class="left" @click="leftClick">
        <van-icon name="arrow-left"></van-icon>
      </div>
      <div class="middle">
        <!--<span class="intro">玩法</span>-->
        <div @click="$emit('titleClick')" :class="isSelect ? 'm-header-selector rotate' : 'm-header-selector'">
          {{ headerTitle }}
        </div>
      </div>
      <div class="right">
        <!--<van-icon name="weapp-nav" @click="show = true"/>-->
        <div class="icon-wrapper" @click="show = true">
          <i class="iconfont iconic-more"></i>
        </div>
        <van-overlay class-name="nav-mask" overlay
                     :show="show"
                     fseletClick
                     @click="show = false">
          <ul class="m-filter icon">
            <!--<li @click="$router.push({path:'/Tendency',query:{type,code,lotteryId}})">-->
            <li @click="$router.push({path:'/trend',query:{type,code,lotteryId}})">
              <i class="iconfont iconic-trend"></i>
              <!--走势图-->
              {{$t('lang.lottery.nav[0]')}}
            </li>
            <li @click="$router.push('drawHistory?lotteryId=' + lotteryId)">
              <i class="iconfont iconic-draw"></i>
              <!--近期开奖-->
              {{$t('lang.lottery.nav[1]')}}
            </li>
            <li @click="$router.push('/Note')">
              <i class="iconfont iconic-buylist"></i>
              <!--购彩记录-->
              {{$t('lang.lottery.nav[2]')}}
            </li>
            <li @click="$router.push({path:'/playRule',query:{type,code}})">
              <i class="iconfont iconic-info"></i>
              <!--玩法说明-->
              {{$t('lang.lottery.nav[3]')}}
            </li>
            <li @click="doActionsheetLuzhi">
              <i class="iconfont iconic-Luzi"></i>
              <!--路子-->
              {{$t('lang.lottery.nav[4]')}}
            </li>
            <li @click="doActionsheetChanglong">
              <i class="iconfont iconic-Changlong"></i>
              <!--长龙-->
              {{$t('lang.lottery.nav[5]')}}
            </li>

          </ul>
        </van-overlay>
      </div>
    </div>
    <!-- 下拉菜单 -->
    <transition>
      <BetMask v-if="isSelect"
               @seletClick="seletClick(arguments)"
               :isSsc="isSsc"
               :active="firstSelected"
               :activeTwo='secondSelected'
               :activeThere='threeSelected'
               :isGlobal="isGlobal"
               :betList="betList"
      />
    </transition>
    <!-- 遮罩层-->
    <transition name="van-fade">
      <div v-if="isSelect"
           @click="$emit('titleClick')"
           class="h-mask"></div>
    </transition>
    <!--定时器 最近记录-->
    <lottery-top @finish="finish"
                 :closeTime="closeTime"
                 :turnNum="turnNum"
                 :openNum="openNum"
                 :preTurn="preTurn"
                 :isHistory="isHistory"
                 :lotteryId="lotteryId"
                 :lotteryItem="lotteryItem"
                 @showClick="isHistory = !isHistory"/>
    <!--历史记录-->
    <transition name="van-fade">
      <lottery-history :preTurn="preTurn"
                       v-show="isHistory"
                       :lotteryId="lotteryId"
                       :lotteryItem="lotteryItem"/>
    </transition>
    <!--路子-->
    <van-action-sheet v-model="actionsheetShowLuzhi"
                      class="luZhi-wrapper"
                      :title="$t('lang.lottery.nav[4]')">
      <div class="content-wrapper">
        <div class="play-cate-wrapper">
          <div class="play-cate">
            <a class="play-btn "
               @click="getluzhiTitleClick(v,LuzhiList)"
               :class="{on:v.on}"
               v-for="v in LuzhiList">
              {{ v.name }}
            </a>
          </div>
        </div>
        <div class="table-wrapper">
          <table class="play-cate-table"
                 v-if="v.on"
                 v-for="v in LuzhiList" cellpadding="0" cellspacing="0">
            <tr v-for="col in range(0,6)">
              <td v-for="row in range(0,17)">
                <span :class="getColorClass(v,row,col)">{{ getLuzhiValue(v,row,col) }}</span>
              </td>
            </tr>
          </table>
        </div>

      </div>
    </van-action-sheet>
    <!--长龙-->
    <van-action-sheet v-model="actionsheetShowChanglong"
                      class="dragon-wrapper"
                      :title="$t('lang.lottery.nav[5]')">
      <div class="content">
        <div class="item changlong" v-for="v in ChanglongList">
          <span>{{ v.name }}</span>
          <span>{{ v.openValue }}</span>
          <span class="num">{{ v.repeatCount }}</span>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
  import {Dialog, Toast} from "vant";
  import {mapGetters, mapMutations,mapState} from "vuex"
  import utils from "../../../utils/utils";

  export default {
    name: "LotteryHeader",
    data() {
      return {
        closeTime: 0, // 倒计时时间
        status: 0, //0投注中 3开奖中 1封盘中
        isHistory: false, // 历史记录显示判断
        openNum: "", // 最近一期开奖号码
        shengxiList: [], // 生肖的规则数组
        turnNum: "", // 当前期
        preTurn: "", //最近开奖期号
        show: false,
        lotteryItem: {},
        isToast: true,
        timer: null,
        itemCate: this.$route.query.itemCate,
        type: this.$route.query.type,
        code: this.$route.query.code,
        actionsheetShowLuzhi: false,
        actionsheetShowChanglong: false,
        ChanglongList: [],
        LuzhiList: [],

      };
    },
    props: {
      isSelect: Boolean,
      headerTitle: String,
      betList: Array,
      firstSelected: Number,
      secondSelected: Number,
      lotteryId: String,
      // 双玩法菜单
      isGlobal: {
        type: Boolean,
        default: false
      },
      isSsc: {
        type: Boolean,
        default: false,
      },
      threeSelected: {
        type: Number,
        default: 0,
      },
    },
    components: {
      BetMask: (resolve) => require(["./BetMask"], resolve),
      LotteryTop: (resolve) => require(["./LotteryTop"], resolve),
      LotteryHistory: (resolve) => require(["./LotteryHistory"], resolve),
    },
    computed: {
      ...mapGetters(["userInfo", "betListAll"]),
    },
    beforeDestroy() {
      window.clearTimeout(this.timer)
    },
    methods: {
      ...mapMutations("lottery", ["SET_LOTTERY_STATUS", "SET_LOTTERY_ARR", "SET_LOTTERY_NUM", "SET_LOTTERY_BET"]),
      ...mapMutations("user", ["SET_USER_INFO"]),
      doActionsheetLuzhi() {
        this.actionsheetShowLuzhi = !this.actionsheetShowLuzhi;
      },
      doActionsheetChanglong() {
        this.actionsheetShowChanglong = !this.actionsheetShowChanglong;
      },
      getColorClass: function (v, row, col) {
        let luzhiValue = this.getLuzhiValue(v, row, col);
        if (luzhiValue) {
          return this.getClassByValue(luzhiValue);
        }
        return '';
      },
      getLuzhiValue({luzhi}, row, col) {
        let luzhiElement = luzhi[row];
        if (luzhiElement) {
          let colValue = luzhiElement.split(',');
          let colValueElement = colValue[col];
          if (colValueElement) {
            return colValueElement;
          }
        }
        return '';
      },
      range: utils.range,
      getClassByValue: function (t) {
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
      deepcopy(obj) {
        return JSON.parse(JSON.stringify(obj))
      },
      getLmcl: async function () {
        let {data} = await this.$http.home.getLmcl(this.$route.query.lotteryId);
        this.ChanglongList = data;
      },
      getluzhiTitleClick({code}, obj) {
        let deepcopy1 = this.deepcopy(obj);
        deepcopy1.forEach(v => {
          if (v.code == code) {
            v.on = true
          } else {
            v.on = false;
          }
        });
        this.LuzhiList = deepcopy1;
      },
      getluzhi: async function () {
        let {data} = await this.$http.home.getluzhi(this.$route.query.lotteryId);
        if (data.length) {
          let [firstItem] = data;
          firstItem.on = true;
        }
        this.LuzhiList = data;
      },
      //返回
      leftClick() {
        if (this.betListAll === null || JSON.parse(this.betListAll).content.length === 0) {
          this.SET_LOTTERY_BET(null)
          this.SET_LOTTERY_STATUS(0);
          this.$router.go(-1)
        } else {
          // 存在待投注订单，是否取消投注 this.$t('lang.lottery.dialog.warning[7]')
          Dialog.confirm({
            message: this.$t('lang.lottery.dialog.warning[8]'),
            cancelButtonText:this.$t('lang.lottery.bottom.queue.btn[0]'),
            confirmButtonText:this.$t('lang.lottery.bottom.queue.btn[1]')
            // confirmButtonColor: "#c00",
            // cancelButtonColor: "#0090ff"
          })
            .then(() => {
              this.SET_LOTTERY_BET(null)
              this.SET_LOTTERY_STATUS(0);
              this.$router.go(-1)
            })
            .catch(() => {
              console.log("取消")
            });
        }
        this.SET_LOTTERY_ARR([0, 0, 0])//清空菜单选中
      },
      //获取彩种信息
      getLottery() {
        if (!sessionStorage.getItem("LotteryTypeList")) {
          // console.log(1)
          this.$http.home.getCpGame().then((res) => {
            // console.log(res,2222223333333333333333)
            sessionStorage.setItem("LotteryTypeList", JSON.stringify(res.data));
            let lotteryTypeList = res.data;
            lotteryTypeList.forEach((element) => {
              if (element.id === Number.parseInt(this.lotteryId)) {
                this.lotteryItem = element;
                console.log(element)
              }
            });
          });
        } else {
          let lotteryTypeList = JSON.parse(
            sessionStorage.getItem("LotteryTypeList")
          );
          // console.log(lotteryTypeList, this.lotteryId)
          lotteryTypeList.forEach((element) => {
            if (element.id === parseInt(this.lotteryId)) {
              this.lotteryItem = element;
              console.log(element)
            }
          });
        }
      },
      //获取用户信息
      getUser() {
        if (this.$cookie.get('token')) {
          return false
        }
        this.$http.home.getUserInfo().then((res) => {
          this.userInfo.money = res.data.extInfo.money;
          this.userInfo.unReadCount = res.data.unReadCount;
          this.SET_USER_INFO(this.userInfo);
        });
      },
      //获取生肖
      getLhcDraw() {
        const shengxiList = JSON.parse(localStorage.getItem("SXS_N")) || "";
        if (shengxiList.length > 0) {
          this.shengxiList = shengxiList;
        } else {
          this.$http.home.getLhc().then((res) => {
            localStorage.setItem("SXS_N", JSON.stringify(res.data));
            this.shengxiList = res.data;
          });
        }
      },
      finish() {
        this.status = 1;
        this.SET_LOTTERY_STATUS(this.status);
        this.timer = setInterval(() => {
          this.getNowDraw(2)
        }, 3000)
      },
      //获取当前开奖信息
      getNowDraw(type = 1) {
        const _t = (Date.parse(new Date()) / 1000).toString();
        const params = {
          _t,
          gameId: this.lotteryId,
        };
        this.$http.home.getNowCp(params).then((rep) => {
          this.openNum = rep.data.pre.openNum;
          this.closeTime = parseInt(
            rep.data.cur.closeTime - rep.data.serverTime
          );
          this.status = rep.data.cur.status;
          this.SET_LOTTERY_STATUS(this.status);
          this.preTurn = rep.data.pre.turn;
          if (rep.data.cur.status === 0) {
            this.turnNum = rep.data.isTime ? rep.data.cur.turn : rep.data.cur.turnNum;
            if (type === 2 && this.isToast) {
              // '彩期变更',
              Toast(`${this.$t('lang.lottery.dialog.warning[7]')}:${this.turnNum}`);
            }
            this.isToast = false
            this.SET_LOTTERY_NUM(rep.data.cur.turnNum);
            if (Number(rep.data.pre.turnNum) + 1 === Number(rep.data.cur.turnNum)) {
              this.isToast = true
            }
            clearInterval(this.timer)
          }
        }).catch((err) => {
            console.log(err, "错误")
          });
      },
      seletClick(arr) {
        this.$emit("seletClick", arr);
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.getLhcDraw()
        this.getLottery()
        this.getUser()
      })
      this.timer = setInterval(() => {
        this.getNowDraw()
      }, 3000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.timer)
      })
    },
    created() {
      let allQueryData = {
        type: this.$route.query.type,
        code: this.$route.query.code,
      }
      sessionStorage.setItem('allQueryData', JSON.stringify(allQueryData))

      this.getNowDraw()
      this.getLmcl();
      this.getluzhi();
    },

  };
</script>
<style lang="scss" scoped>

  .header-content {
    position: relative;
    .lottery-header {
      //background: $global-bgcolor;
      color: #fff;
      position: relative;
      min-height: 0.88rem;
      text-align: center;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 0.25rem;
      align-items: center;

      .left {
        font-size: 0.3rem;
        display: flex;
        align-items: center;
      }

      .right {
        min-height: 0.88rem;
        height: 100%;
        font-size: 0.48rem;
        display: flex;
        align-items: center;
        .icon-wrapper {
          width: 0.75rem;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        .nav-mask {
          background-color: rgba(0, 0, 0, 0.3);
          ul.m-filter {
            right: 0.1rem;
            width: 3.72rem;
            position: relative ;
            background-color: #24252d ;
            color: #9a9aa7 ;
            border-radius: .22rem ;
            top: 1.2rem ;
            left: 3.6rem ;
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
              width: 3.72rem ;
              height: .88rem ;
              color: #9a9aa7;
              &:not(:last-child){
                @include border-1px(#717180);
                &:after{
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

        .intro {
          font-size: 0.22rem;
          width: 0.2rem;
          margin-right: 0.1rem;
        }

        .m-header-selector {
          padding: 0.02rem 0.62rem 0.02rem 0.3rem;
          min-width: 2.4rem;
          font-size: 0.3rem;
          min-height: 0.54rem;
          border: 1px solid #fff;
          border-radius: 0.07rem;
          line-height: 0.54rem;
          text-align: center;
          position: relative;

          &.rotate::before {
            transform: rotate(-180deg);
          }

          &::before {
            content: "";
            position: absolute;
            top: 0.22rem;
            right: 0.22rem;
            display: inline-block;
            border: 0.1rem solid transparent;
            border-top-color: #fff;
            width: 0.1rem;
            -webkit-transform-origin: 50% 20%;
            transform-origin: 50% 20%;
            -webkit-transition: -webkit-transform 0.5s;
            transition: -webkit-transform 0.5s;
            /*transition: transform 0.5s;*/
            transition: transform 0.5s, -webkit-transform 0.5s;
          }
        }
      }
    }
    .h-mask {
      display: block;
      position: absolute;
      z-index: 10;
      top: 0.88rem;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);
    }


    .dragon-wrapper{
      color: #fff;
      .changlong {
        display: flex;
        padding: 3px 10px;
        color: #fff;
        border-bottom: .5px solid #ddd;
        font-size: .25rem;
        line-height: .4rem;
        span {
          flex: 1;
        }
        span.num {
          color: #2196f3;
        }
      }
    }
    .luZhi-wrapper{
      color: #fff;
      .content-wrapper{
        width: 100%;
        .play-cate-wrapper {
          overflow: hidden;
          width: 100%;
          .play-cate {
            padding: 10px 0;
            white-space: nowrap;
            overflow-x: scroll;
            .play-btn.on {
              background-color: #ffcd65;
            }
            .play-btn {
              display: inline-block;
              line-height: 28px;
              width: 100px;
              overflow: hidden;
              white-space: nowrap;
              text-align: center;
              border-radius: 8px;
              margin-left: 6px;
              color: #444;
              padding: 5px 10px;
              font-size: 14px;
              background-color: #e4e4e4;
            }
          }
        }
        .table-wrapper{
          width: 100%;
          overflow-x: scroll;
          .play-cate-table {
            width: 100%;
            border-bottom: 1px solid #d3d3d3;;
            border-left: 1px solid #d3d3d3;
            tr td {
              border: 0.5px solid #d3d3d3;
              text-align: center;
              border-bottom: none;
              border-left: none;
              vertical-align: middle
            }
            tr td span {
              display: block;
              width: 23px;
              height: 23px;
              font-size: 14px;
              line-height: 23px;
              text-align: center;
              border-radius: 50%;
              color: #fff;
              overflow: hidden
            }

            tr td span.da,
            tr td span.dan,
            tr td span.long,
            tr td span.red {
              background-color: red
            }

            tr td span.gold {
              background-color: #d9d919
            }

            tr td span.light-black {
              background-color: #888
            }

            tr td span.mu {
              background-color: #a68064
            }

            tr td span.blue, tr td span.hu, tr td span.shuang, tr td span.xiao {
              background-color: blue
            }

            tr td span.default, tr td span.gray {
              background-color: #bdc3c7
            }

            tr td span.orange {
              background-color: #f39c12
            }

            tr td span.green {
              background-color: #2ecc71
            }

          }
        }

      }

    }
  }
</style>
