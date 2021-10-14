<template>
  <section class="lotter" :class="{ lotterBtn: num }">
    <LotteryHeader
      :lotteryId="lotteryId"
      :firstSelected="firstSelected"
      :secondSelected="secondSelected"
      :threeSelected="threeSelected"
      :betList="betList"
      :headerTitle="headerTitle"
      :isSelect="isSelect"
      :isSsc="true"
      :isGlobal="true"
      @seletClick="seletClick"
      @titleClick="isSelect = !isSelect"
    />
    <!-- 主体-号码选择 -->
    <ssc-bets
      :lotteryName="lotteryName"
      :lotteryId="lotteryId"
      :isLoading="isLoading"
      :isSecond="isSecond"
      :firstMenu="firstMenu"
      :codeList="codeList"
      :firstSelected="firstSelected"
      :secondSelected="secondSelected"
      :threeSelected="threeSelected"
    />
    <!-- 底部-下注 -->
    <lottery-footer
      :lotteryName="lotteryName"
      @betsNum="betsNum"
      :menu="firstMenu.name"
      :userRebate="userRebate"
      :playType="playType"
      :lotteryId="lotteryId"
      :firstSelected="firstSelected"
      :secondSelected="secondSelected"
      :threeSelected="threeSelected"
    />
  </section>
</template>

<script>
import {mapGetters, mapMutations,mapState} from "vuex";
import GamesUtils from "../../../utils/GamesUtils";

export default {
    name: "markSix",
    data() {
      return {
        lotteryId: "",
        lotteryName: "ssc",
        isLoading: true, // 数据是否加载完成
        betList: [], // 六合彩list集合
        firstMenu: {}, // 下注区域菜单数据
        firstSelected: 0, // 一级菜单选中玩法 - 默认第一个
        isSecond: false, // 是否显示二级菜单
        secondSelected: 0, // 二级菜单选中玩法 - 默认第一个
        threeSelected: 0, // 三级菜单选中玩法 - 默认第一个
        codeList: [], // 具体玩法号码
        headerTitle: "", // 第一次显示的标题
        isSelect: false, // 选择玩法显示判断
        isHistory: false, // 历史记录显示判断
        openNum: "", // 最近一期开奖号码
        turnNum: "", // 当前期
        num: 0, // 下注笔数
        inputRebate: 0, // 反水选项 - 默认为0
        closeTime: "",
        playType: false,
      };
    },
    components: {
      LotteryHeader: (resolve) => require(["../module/LotteryHeader"], resolve),
      LotteryFooter: (resolve) => require(["../module/SscFooter"], resolve),
      SscBets: (resolve) => require(["../module/SscBets"], resolve),
    },
    computed: {
      ...mapState([
        'userInformation'
      ]),
      ...mapGetters(["userInfo", "lotteryArr"]),
      // 用户反水
      userRebate() {
        let rebate = this.userInformation.rebate || 9;
        return rebate;
      },
    },
    methods: {
      ...mapMutations("lottery", ["SET_LOTTERY_ARR"]),
      // 数据获取
      async getData() {
        try {
          var [a, b] = await Promise.all([
            this.$http.home.getMarkData(this.lotteryId),
            this.$http.home.getMarkData1(this.lotteryId),
          ]);
        } catch (err) {
          this.$toast.fail({ message: err, forbidClick: true });
        }
        return [a, b];
      },
      getList() {
        this.getData().then((res) => {
          console.log(res,'llllisttt---ssc');
          let [json, json1] = res;
          if (json.data){
            this.setJson(json.data, json1.data);
          }
        });
      },
      /**
       * 数组数据分为5层
       * */

      setJson(data, data1) {
        let lotteryId = this.lotteryId;
        let userRebate = this.userRebate;
        let inputRebate = this.inputRebate;
        this.betList = GamesUtils.setSSCMethodInit(data, data1,lotteryId,userRebate,inputRebate);
        this.simulation();
        sessionStorage.setItem(`ssc${lotteryId}`, JSON.stringify(this.betList))
      },
      // 下注笔数
      betsNum(num) {
        this.num = num;
      },
      // 初次加载默认数据
      simulation() {
        this.isLoading = false;
        this.firstMenu = this.betList[this.firstSelected].children[
          this.secondSelected
          ].children[this.threeSelected];
        this.playType = this.firstMenu.isOfficial;
        this.codeList = this.firstMenu.children;
        this.headerTitle = this.firstMenu.name;
        console.log(this.firstMenu,'this.simulation.simulation');
      },
      // 一级菜单选择
      seletClick(arr) {
        this.firstSelected = arr[0]; // 一级菜单
        this.secondSelected = arr[1]; // 二级菜单
        this.threeSelected = arr[2]; // 三级菜单
        this.SET_LOTTERY_ARR(arr);
        this.isSelect = false;
        this.headerTitle = this.betList[arr[0]].children[arr[1]].children[arr[2]].name;
        this.firstMenu = this.betList[arr[0]].children[arr[1]].children[arr[2]];
        this.playType = this.firstMenu.isOfficial;
        this.codeList = this.firstMenu.children;

        console.log(this.firstMenu,'this.firstMenuthis.firstMenu');
      },
    },
    created() {
      this.lotteryId = this.$route.query.lotteryId + "";
      this.firstSelected = this.lotteryArr[0];
      this.secondSelected = this.lotteryArr[1];
      this.threeSelected = this.lotteryArr[2];
      // this.getList();
      if (sessionStorage.getItem(`ssc${this.lotteryId}`)) {
        this.betList = JSON.parse(sessionStorage.getItem(`ssc${this.lotteryId}`));
        console.log(this.betList, 'this.betList');
        this.simulation()
      } else {
        this.getList()
      }
    },
  };
</script>

<style scoped lang="scss">
  .lotter {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-bottom: 1.7rem;
    /*background-color: #f5f5f9;*/
    text-align: center;
  }
  .lotterBtn {
    padding-bottom: 3.5rem;
  }
</style>
