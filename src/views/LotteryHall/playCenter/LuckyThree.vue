<template>
  <div class="lotter" :class="{lotterBtn: num}">
    <LotteryHeader @seletClick="seletClick"
                   @titleClick="isSelect=!isSelect"
                   :lotteryId="lotteryId"
                   :firstSelected="firstSelected"
                   :secondSelected="secondSelected"
                   :betList="betList"
                   :headerTitle="headerTitle"
                   :isSelect="isSelect"
                   :isGlobal="true"/>
    <!-- 主体-号码选择 -->
    <lottery-bets :lotteryId="lotteryId"
                  :lotteryName="lotteryName"
                  :bigNum="bigNum"
                  :totalNum="totalNum"
                  :playType="playType"
                  :isLoading="isLoading"
                  :firstMenu="firstMenu"
                  :codeList="codeList"
                  :firstSelected="firstSelected"/>
    <!-- 底部-下注 -->
    <lottery-footer :menu="firstMenu.name"
                    :playType="playType"
                    :userRebate="userRebate"
                    :lotteryId="lotteryId"
                    :firstSelected="firstSelected"
                    :secondSelected="secondSelected"/>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapState} from "vuex";
  import GamesUtils from "../../../utils/GamesUtils";

  export default {
    data() {
      return {
        lotteryId: '',
        lotteryName: 'ks',
        isLoading: true, // 数据是否加载完成
        betList: [], // 六合彩list集合
        firstMenu: {}, // 一级菜单数据
        firstSelected: 0, // 一级菜单选中玩法 - 默认第一个
        secondSelected: 0, // 二级菜单选中玩法 - 默认第一个
        codeList: [], // 具体玩法号码
        headerTitle: '', // 第一次显示的标题
        isSelect: false, // 选择玩法显示判断
        isHistory: false, // 历史记录显示判断
        openNum: '', // 最近一期开奖号码
        turnNum: '', // 当前期
        num: 0, // 下注笔数
        bigNum: 10, // 大小
        totalNum: 19, // 总数
        inputRebate: 0, // 反水选项 - 默认为0
        closeTime: ''
      }
    },
    components: {
      LotteryHeader: resolve => require(['../module/LotteryHeader'], resolve),
      LotteryFooter: resolve => require(['../module/LotteryFooter'], resolve),
      LotteryBets: resolve => require(['../module/LotteryBets'], resolve),
    },
    computed: {
      ...mapState([
        'userInformation'
      ]),
      ...mapGetters(['userInfo', "lotteryArr"]),
      // 用户反水
      userRebate() {
        let rebate = this.userInformation.rebate || 9
        return rebate
      },
      // 玩法类型
      playType() {
        let play = null
        this.firstSelected ? play = true : play = false;
        console.log(play,'playplaytype');
        return play
      }
    },
    methods: {
      ...mapMutations("lottery", ["SET_LOTTERY_ARR"]),
      // 数据获取
      async getData() {
        try {
          var [a, b] = await Promise.all([this.$http.home.getMarkData(this.lotteryId), this.$http.home.getMarkData1(this.lotteryId)])
        } catch (err) {
          this.$toast.fail({message: err, forbidClick: true})
        }
        console.log([a, b], 'map');
        return [a, b]
      },
      getList() {
        this.getData().then(res => {
          let [json, json1] = res
          if (json.data) {
            this.setJson(json.data, json1.data)
          }
        })
      },
      // 数据处理
      setJson(data, data1) {
        let lotteryId = this.lotteryId;
        console.log(lotteryId,Number(lotteryId),'iiiiiiiiiiiiiidddddddddlotteryIdlotteryId');
        let userRebate = this.userRebate;
        let inputRebate = this.inputRebate;
        this.betList = GamesUtils.setLuckyTreeMethodInit(data, lotteryId, data1, userRebate, inputRebate);
        console.log(this.betList,'bet---list');
        this.simulation();
        sessionStorage.setItem(`lucky${lotteryId}`, JSON.stringify(this.betList))
      },
      // 初次加载默认数据
      simulation() {
        this.isLoading = false
        this.firstMenu = this.betList[this.firstSelected]
        // 具体号码
        this.codeList = this.firstMenu.children[this.secondSelected].detail
        console.log(this.codeList, 'this.codeList');
        console.log(this.firstMenu, 'this.firstMenu');
        // 标题
        this.headerTitle = this.firstMenu.children[this.secondSelected].name
      },
      // 菜单选择
      seletClick(arr) {
        console.log(arr,arr[0],arr[1],'seletClick -- arr');
        this.firstSelected = arr[0] // 一级菜单
        this.secondSelected = arr[1] // 二级菜单默认第一个
        this.SET_LOTTERY_ARR(arr);
        this.isSelect = false
        this.headerTitle = this.betList[arr[0]].children[arr[1]].name
        this.simulation()
      },
      // 下注笔数处理
      betsNum(num) {
        this.num = num
      },
    },
    mounted() {
      console.log(this.lotteryArr,'this.lotteryArrthis.lotteryArr');
      this.firstSelected = this.lotteryArr[0]
      this.secondSelected = this.lotteryArr[1]
    },
    created() {
      console.log(this.$route, '进入快乐3');
      this.lotteryId = this.$route.query.lotteryId + '';
      console.log(this.lotteryId, 'lotteryID');
      if (sessionStorage.getItem(`lucky${this.lotteryId}`)) {
        this.betList = JSON.parse(sessionStorage.getItem(`lucky${this.lotteryId}`));
        console.log(this.betList, 'this.betList');
        this.simulation()
      } else {
        this.getList()
      }
    }
  }
</script>

<style scoped lang="scss">
  .skin-gray {
    .lotter {
      background-color: #44425E;
    }
  }

  .skin-black {
    .lottery {
      background-color: #191B1F;
    }
  }

  .lotter {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-bottom: 1.7rem;
    /*background-color: #f5f5f9;*/
    text-align: center;
  }

  .lotterBtn {
    padding-bottom: 3rem;
  }

</style>
