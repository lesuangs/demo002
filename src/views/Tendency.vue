<template>
  <div class="trend-wrapper">
    <Header :headObj="headObj"
            @leftClick="$router.go(-1)"></Header>
    <div class="s-tab">
      <a v-for="(v,index) in trendGameMaps.tabs"
         @click="setActive(index,trendGameMaps.tabs)"
         :class="{on:v.on}">
        {{ v.name }}
      </a>
    </div>
    <div id="trend-container" class="trend-container content-scroll">
      <svg class="mysvg" id="mysvg" :style="{height:svgheight}">
        <line v-for="({x1y1,x2y2}) in svgline" :x1="x1y1.left" :y1="x1y1.top" :x2="x2y2.left" :y2="x2y2.top"
              style="stroke: red" stroke-width="2px"/>
      </svg>
      <table class="luzhi-playcate-table" id="luzhi-playcate-table" cellpadding="0" cellspacing="0">
        <thead>
        <tr>
          <th>
            期数
          </th>
          <td v-for="v in trendGameMaps.trendChartColumns">{{ v }}</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(v,row) in bodyList.slice().reverse()" :id="`body-list${row}`">
          <th>
            {{ v.issue }}
          </th>
          <td v-for="(v2,index) in trendGameMaps.trendChartColumns">
              <span :class="getTrendOpenBallClassStyle(v,index,row)">
                {{ trendBall(v, index) }}
              </span>
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <th>
            出现总次数
          </th>
          <td v-for="(v,i) in trendGameMaps.trendChartColumns">{{ getTrendOpenBall(appearCountArr, i, true) }}</td>
        </tr>
        <tr>
          <th>
            平均遗漏
          </th>
          <td v-for="(v,i) in trendGameMaps.trendChartColumns">{{ getTrendOpenBall(averageMissingArr, i, true) }}</td>
        </tr>
        <tr>
          <th>
            最大遗漏
          </th>
          <td v-for="(v,i) in trendGameMaps.trendChartColumns">{{ getTrendOpenBall(maxMissingArr, i, true) }}</td>
        </tr>
        <tr>
          <th>
            最大连出
          </th>
          <td v-for="(v,i) in trendGameMaps.trendChartColumns">{{ setmaxAppearArr(maxAppearArr, i, true) }}</td>
        </tr>
        </tfoot>
      </table>
    </div>
    <div class="trend-bottom">
      <span>{{ currentLotteryName }}</span>
      <a class="red-btn bet-btn" @click="gotoBet()">去投一注</a>
      <a class="red-btn bet-btn choose-game-btn" @click="doActionsheetLuzhi">选择彩票</a>
      <a class="red-btn bet-btn" @click="init">
        <i class="iconfont refresh iconshuaxin"></i>
      </a>
    </div>
    <van-action-sheet v-model="actionsheetShowLuzhi" title="选择彩种">

      <div class="content choose-game-popup">
        <div class="popup-content">
          <a :class="setSelectStyle(v)" v-for="(v,i) in LotteryTypeList" @click="setCurrentQuery(v,LotteryTypeList,i)">
            {{ v.name }}
          </a>
        </div>
      </div>
    </van-action-sheet>
  </div>

</template>

<script>
  import {mapGetters,mapState} from "vuex";
  import utils from "../utils/utils";
  import Header from '../commons/header/Header'

  export default {
    name: "Tendency",
    components: {
      Header
    },
    computed: {
      ...mapState([
        'isLogin',
        'userInformation'
      ]),
      ...mapGetters(['userInfo', 'testInfo']),
      usersInfo() {
        return this.userInformation
      },
      // isLogin() {
      //   return this.userInfo.isLogin || this.testInfo.isLogin || false
      // },
    },
    created() {
      this.currentQuery = this.$route.query;
      this.init();
      this.getLotteryTypeList();
    },
    data() {
      return {
        screenWidth: document.body.clientWidth,
        svgheight: 20000,
        isLoading: true, // 数据是否加载完成
        headObj: {
          title: '走势图',
          showArrow: true,
        },
        trendGameMaps: {
          tabs: [],
          trendChartColumns: []
        },
        loading: false,
        // 开奖号码
        bodyList: [],
        // 出现总次数：
        appearCountArr: [],
        // 平均遗漏：
        averageMissingArr: [],
        // 最大遗漏：
        maxMissingArr: [],
        // 最大连出：
        maxAppearArr: [],
        trendIndex: 0,
        svgline: [],
        actionsheetShowLuzhi: false,
        LotteryTypeList: [],
        currentQuery: {},
        currentLotteryName: '',
        timer: false
      }
    },
    mounted() {
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })()
      }
    },
    watch: {
      screenWidth(val) {
        if (!this.timer) {
          this.screenWidth = val
          this.timer = true
          let that = this
          setTimeout(function () {
            // that.screenWidth = that.$store.state.canvasWidth
            console.log(that.screenWidth)
            that.init()
            that.timer = false
          }, 300)
        }
      }
    },
    methods: {
      init() {
        this.setTypeTrendTH();
        this.getTrendList();
      },
      setSelectStyle(v) {
        if (v.on) {
          return 'selected';
        }
        return ''
      },
      gotoBet() {
        this.$router.push({
          path: this.currentQuery.type,
          query: this.currentQuery
        });
      },
      setCurrentQuery(item, obj, index) {
        this.currentQuery = {type: item.type, code: item.code, lotteryId: item.id};
        this.LotteryTypeList = utils.setActive(index, obj);
        this.actionsheetShowLuzhi = false;
        this.init();
        this.setCurrentLotteryName();
      },
      setCurrentLotteryName() {
        let {code} = this.currentQuery
        let lotteryTypeList = this.getLotteryTypeStore() || [];
        for (let v of lotteryTypeList) {
          if (v.code == code) {
            this.currentLotteryName = v.name;
          }
        }
      },
      doActionsheetLuzhi() {
        this.actionsheetShowLuzhi = !this.actionsheetShowLuzhi;
      },
      getLotteryTypeList() {
        let lotteryTypeStore = this.getLotteryTypeStore() || [];
        let {code} = this.currentQuery
        for (let v of lotteryTypeStore) {
          if (v.code == code) {
            v.on = true;
          }
        }
        this.LotteryTypeList = lotteryTypeStore;
        return sessionStorage;
      },
      getLotteryTypeStore() {
        return utils.getSessionStorage('LotteryTypeList');
      },

      trendBall({bodyArr}, i) {
        let trendOpenBall = this.getTrendOpenBall(bodyArr, i);
        return Math.abs(trendOpenBall);
      },
      getTrendOpenBallClassStyle({bodyArr, openNum}, index, row) {
        let trendOpenBall = this.getTrendOpenBall(bodyArr, index);
        // console.log("-----this.trendIndex:", this.trendIndex);
        let openNumElement = openNum[this.trendIndex];
        // console.log("------row", row, "  ****openNumElement:", openNumElement, '  *******trendOpenBall:', trendOpenBall);
        if (openNumElement === trendOpenBall) {
          // this.trendIndex == index
          return 'red'
        }

        return ''
      },
      setmaxAppearArr(bodyArr, i, abs = false) {
        return this.getTrendOpenBall(bodyArr, i, abs);
      },
      getTrendOpenBall(bodyArr, i, abs = false) {
        let tablen = this.trendGameMaps.trendChartColumns.length;
        let start = this.trendIndex * tablen;
        let vElement = bodyArr.slice().splice(start, tablen);
        if (vElement.length) {
          let vElementElement = vElement[i];
          if (abs) {
            return Math.abs(vElementElement)
          }
          return vElementElement;
        }
        return 0;
      },
      drawCanvas() {
        setTimeout(() => {
          let luzhitable = utils.getElementPostion(document.querySelectorAll('#luzhi-playcate-table')[0], 0);
          this.svgheight = luzhitable.offsetHeight;
          let {offsetHeight, top} = utils.getElementPostion(document.querySelectorAll('#body-list0')[0], 0);
          let elementNodeListOf = Array.prototype.concat(...document.querySelectorAll('#trend-container tbody tr'));
          let svgline = [];
          for (let i = 0; i < elementNodeListOf.length; i++) {
            let v = elementNodeListOf[i];
            let [nodeElement] = v.querySelectorAll('.red');
            if (nodeElement) {
              let elementPostion = utils.getElementPostion(nodeElement, top);
              elementPostion.top = offsetHeight + offsetHeight * i + offsetHeight / 2;
              elementPostion.left = elementPostion.left / 2;
              svgline.push(elementPostion);
            }
          }
          this.svgline = svgline.slice(0, -1).map((v, i) => {
            let x1y1 = svgline[i];
            let x2y2 = svgline[i + 1];
            return {
              x1y1,
              x2y2
            }
          });
        }, 80)
      },
      setActive(index, obj) {
        this.trendGameMaps.tabs = utils.setActive(index, obj);
        this.trendIndex = index;
        this.drawCanvas();
      },
      setTypeTrendTH() {
        let trendGameMaps = utils.trendGameMaps(this.currentQuery);
        if (trendGameMaps) {
          this.trendIndex = 0;
          this.setCurrentLotteryName();
          trendGameMaps.tabs = trendGameMaps.tabs.map((name, i) => {
            return {
              on: i == this.trendIndex,
              name
            }
          });
          this.trendGameMaps = trendGameMaps;
        } else {
          this.$router.push({
            path: "/drawHistory",
            query: this.$route.query
          });
        }
      },
      getTrendList: async function () {
        let { // 开奖号码
          bodyList,
          // 出现总次数：
          appearCountArr,
          // 平均遗漏：
          averageMissingArr,
          // 最大遗漏：
          maxMissingArr,
          // 最大连出：
          maxAppearArr
        } = await this.$http.home.getTrendList(this.currentQuery.code);
        this.bodyList = bodyList;
        if (bodyList.length <= 0) {
          this.$router.push({
            path: "/drawHistory",
            query: this.$route.query
          });
        }
        this.appearCountArr = appearCountArr;
        this.averageMissingArr = averageMissingArr;
        this.maxMissingArr = maxMissingArr;
        this.maxAppearArr = maxAppearArr;
        this.drawCanvas();
      }
    }
  }
</script>

<style scoped lang="scss">
  .trend-wrapper{

  }
  .choose-game-popup .popup-content {
    padding: 5px 0;
    overflow: hidden
  }

  .choose-game-popup .popup-content a {
    float: left;
    width: 30.3%;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
    margin: 0 3% 10px 0;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKsAAAA5CAYAAABJRttRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ODFiZGY0MC1lMDhkLTk4NGEtYjhhNy1kODE0MWI0NjQ5MzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUREMkI4MTQyMzA5MTFFNkFDODRERERGOUVCNTFGMEMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUREMkI4MTMyMzA5MTFFNkFDODRERERGOUVCNTFGMEMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc2MmQ4OTMyLWZmNjktOTU0Mi1iZGQxLTQzZTQ0YmE4NmNiNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0ODFiZGY0MC1lMDhkLTk4NGEtYjhhNy1kODE0MWI0NjQ5MzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4XBu7XAAAB2ElEQVR42uzdv07CUBSA8dMukIaktau69AGciBs7PIjO4oPIA+h7wM5mmNzpIjO2CWnoQj2nuSV9guZqvl9y0j9sN18uLQtB0zTSyfP8Rg9LnZnOVGciwLBOOjudrc5blmVF90HQxaqhzvXwrnPHesET3zrPGuzmGqsLdW03oiiSOI5lNBpJGIYsFwZ1uVykrmspy1KqqupuLyzYYL/fJ3rxpXOfpqkkScKKwQtFUcjxeLTTg86DbZ2vFqrtqIQKn1iP1qV7NF2G7mWq/eoHfNPrcha6t/72GRXwTa/LqcXa/jzFyxR81OtyQqH4O+GyBCBWgFhBrACxAsQKYgWIFSBWECtArACxglgBYgWIFcQKECtArCBWgFgBYgWxAsQKECuIFSBWgFhBrACxglgBYgWIFcQKECtArCBWgFgBYgWxAsQKECv+e6wnO7H/eQd80+vyZLHu7Kyua1YG3ul1ubNYt3ZWliUrA+/0utxarCudQ1VVUhQFqwNvWI/WpfVpnQZN00ie53O9WNvdKIokjmMZj8cSBAErhkFZj+fzud1RXahmkWXZpo3VuGA/dG5ZMnjCdtQnC9UurrG6YFM9vOjMdB5to2W9MDDbTj/du9RKQ/3pPvgVYAAnrYMEie/vbgAAAABJRU5ErkJggg==) no-repeat;
    background-size: 100% .5rem;
    font-size: .25rem;
    color: #333;
    white-space: nowrap;
    text-overflow: ellipsis
  }

  .choose-game-popup .popup-content a.selected {
    color: #ec2a2a;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKsAAAA5CAYAAABJRttRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ODFiZGY0MC1lMDhkLTk4NGEtYjhhNy1kODE0MWI0NjQ5MzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUREMkI4MUMyMzA5MTFFNkFDODRERERGOUVCNTFGMEMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUREMkI4MUIyMzA5MTFFNkFDODRERERGOUVCNTFGMEMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc2MmQ4OTMyLWZmNjktOTU0Mi1iZGQxLTQzZTQ0YmE4NmNiNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0ODFiZGY0MC1lMDhkLTk4NGEtYjhhNy1kODE0MWI0NjQ5MzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4vQNv/AAAES0lEQVR42uydTUgUYRjHn9kP99OvQgnMLgXRYp42IUhqD4IliXToULBSYBEk1UW0CDt0iILCJEXqYp26dIu2OhRZl5DoiyWKQtAiKK3WbV1XZ6fnfZ0dtQ/dxHVn4P+Dh3nnnXd34J2fzzzvLO4qmqZRhtFAoJQ3JzhqOYIcfgJgZYlzDHIMcFxcHY1+zxxQMrKyqPW8ucqxFvMFTMIwxyEWNmLIqot6R3QUhELkDocjjs2bSfF6MV1gRdESCZp+9YqS/f31qYcPM907hbDK102bSnjnJUel99ixiOfw4Qfcvs7xGVMH8sQajvBEX18o0dUlEukIR7W9razsJDd2F+zYQb7OTlEGnNfrBgDyWbc+cQaDFWo0WqcODRXxfsqmL6bI3dwc0TMqAGbhuihJ9XatTV/1k6OqinDrBybjs+6lIChklY+nFJ8PUwNMxxwv/TZMB7AKkBVAVgAgK4CsAEBWACArgKwAQFYAICuArABAVgAgK4CsAEBWACArgKwAQFYAICuwOGunHj+GrMASonaPt7bWQ1ZgBVGbtMlJZFZgLVEhK7CMqJAVWEZUyAosIypkBZYRVeDAXIE8i3qFRW1cTFTICvIv6tGjjVoqldULUAYAS4gKWYFpRVVKS8m2ahVkBeYW1bltG5Xevk2K3w9ZQV5Yl42oroYGKurtJaWkhNKjo5AV5EHUgYHuRUXdtYv8584R2e1Eqkraz5+QFeRBVPF4agFRHYEA+c6enRHVKFwVyArMJapSWEiFXV2kuN2znSytraICsgLziCrwtbX9ISZpmsy2kBWYRlRnTQ259uyZ15ceGaEf+/ZR6t49yApyL2rst8WUuNX7zpwh9969c+yzkbejY15tOh2N0nceM/3ixZ91LeYW5EJUmpoyOgvq6sh36hTZyssp/fEjJW/dYiunydXYSI6NG41x6tu3FDtwgLTx8b++OTIryJmoYsFUePmyXDwJUaVwXJu6mprkAspz5MisqMPDFDt48J+iIrOCnGZULZmkiZ4eUoqLyblli9HvaWkh4mP2ysqZcYkEcX1L6bGxBU+CzApyIqpRg755IzPmRG+vXOELhKS+zk5jTJxLBFECLIaQVf4C9u+fFgCQjaipR4/+KersPV6lRHc3xU+flm1ZIug/c5m8eZNSd+9mc664kHVQ/gW8fi02azD/4H9EFY+nFhR1DpO8sIq3txOl03I//ekTJS5cyPZ8g/a2srL13NiuxWIbXA0NX7j9BNcBLLeoRpJ9947Ea5xbt0px5f6C935bpny4IWR9zo396tBQkeJwqM5gUHyU8D5THgCwXKIadeyzZ6R++ECp+/cXHzwj6ghHs6LxzmggIL6i5Y7oLQiFyB0ORxzV1aR4PLg0YB4sKsmv9FmiqEtkJ0dEyirQhb3GUYFLAkyCyKgtQlS5KMvIqgsr/o/gOEctRw2HF/MFVpgEx1OOAY5LHN8yB34JMAALE+ryUkUuOQAAAABJRU5ErkJggg==) no-repeat;
    background-size: 100% .5rem
  }

  .trend-container {
    position: relative;
    height: 82vh;

    .mysvg {
      z-index: 5;
      width: 100%;
      height: 1000000px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  .trend-bottom {
    font-size: 14px;
    width: 100%;
    height: 44px;
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    background-color: #fff;
    box-shadow: 0 -3px 20px #ccc
  }

  .trend-bottom span {
    line-height: 44px;
    padding-left: 10px;
    color: #181717;
    font-weight: 100
  }

  .red-btn {
    background: #e74c3c;
    color: #fff;
    height: 33px;
    line-height: 33px;
    border: 0;
    outline: none;
    font-size: 14px;
    border-radius: 3px;
    padding: 0 15px
  }

  .bet-btn {
    float: right;
    margin-right: 7px;
    margin-top: 5px
  }

  .choose-game-btn {
    background-color: #e67e22
  }

  .s-tab a {
    font-size: .28rem;
    width: 1rem;
    background: #f3f3f3;
    float: left;
    text-align: center;
    border: 1px solid #ddd;
    border-bottom: 2px solid #ddd;
    padding: .2rem;
    box-sizing: border-box;
    display: block;
    border-radius: 10px;
    margin: .14rem;
    color: #666
  }

  .s-tab a.on {
    border-bottom: 2px solid #ec2829;
    background-color: #fff
  }

  .s-tab {
    background-color: #f5f5f5;
    overflow: hidden
  }

  .luzhi-playcate-table {
    width: 100%;
    border-bottom: 1px solid #d3d3d3;;
    border-left: 1px solid #d3d3d3;

    thead tr {
      background: #e8dfd9;

      td, th {
        border: none;
      }
    }

    tbody {
      tr:nth-child(even) {
        background: #f3f3e8;
      }
    }

    td {
      width: 25px;
    }

    td, th {
      border: 1px solid #d3d3d3;
      border-bottom: none;
      height: 25px;
      border-left: none;
      text-align: center;
      vertical-align: middle
    }

    td span {
      display: block;
      width: 23px;
      height: 23px;
      font-size: 14px;
      line-height: 23px;
      text-align: center;
      border-radius: 50%;
      color: #ccc;
      overflow: hidden
    }

    td span.da, td span.dan, td span.long, td span.red {
      background-color: red;
      color: white;
      position: relative;
      z-index: 100;
    }

    td span.gold {
      background-color: #d9d919
    }

    td span.light-black {
      background-color: #888
    }

    td span.mu {
      background-color: #a68064
    }

    td span.blue, td span.hu, td span.shuang, td span.xiao {
      background-color: blue
    }

    td span.default, td span.gray {
      background-color: #bdc3c7
    }

    td span.orange {
      background-color: #f39c12
    }

    td span.green {
      background-color: #2ecc71
    }

  }

</style>

