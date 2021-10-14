<template>
  <section class="lotter" :class="{lotterBtn: num}">
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
                  :detailList="detailList"
                  :firstSelected="firstSelected"/>
    <!-- 底部-下注 -->
    <lottery-footer :lotteryName="lotteryName"
                    :menu="firstMenu.name"
                    :playType="playType"
                    :userRebate="userRebate"
                    :lotteryId="lotteryId"
                    :firstSelected="firstSelected"
                    :secondSelected="secondSelected"/>
  </section>
</template>

<script>
  import {mapGetters, mapMutations, mapState} from "vuex"
  import GamesUtils from "../../../utils/GamesUtils";

  export default {
    name: 'markSix',
    data() {
      return {
        lotteryId: '',
        lotteryName: 'pk10',
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
        bigNum: 5, // 大小
        totalNum: 10, // 总数
        inputRebate: 0, // 反水选项
        detailList: {} // 自选号码具体属性
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
        let rebate = this.userInformation.rebate || 9;
        return rebate
      },
      // 玩法类型
      playType() {
        let [play, num] = [null, this.firstSelected]
        num > 0 && num < 5 ? play = false : play = true
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
        return [a, b]
      },
      getList() {
        this.getData().then(res => {
          let [json, json1] = res
          if (json.data) this.setJson(json.data, json1.data)
        })
      },
      // 数据处理
      setJson(data, data1) {
        let lotteryId = this.lotteryId;
        let userRebate = this.userRebate;
        let inputRebate = this.inputRebate;
        // 玩法整合
        this.betList = GamesUtils.setPk10MethodInit(data, lotteryId, data1, userRebate, inputRebate);
        // 定位胆放在第一位
        this.betList.splice(0, 0, this.betList[this.betList.length - 1])
        this.betList.pop()
        sessionStorage.setItem(`pk10${lotteryId}`, JSON.stringify(this.betList))
        this.simulation()
      },
      // 初次加载默认数据
      simulation() {
        this.isLoading = false
        this.firstMenu = this.betList[this.firstSelected]
        // 玩法具体号码
        if (this.playType) {
          this.codeList = this.firstMenu.children[this.secondSelected].detail
          // 自定义号码具体属性
          this.detailList = this.firstMenu.children[this.secondSelected]
        } else {
          this.codeList = this.firstMenu.children[this.secondSelected]
        }
        // 标题
        this.headerTitle = this.firstMenu.children[this.secondSelected].name
      },
      // 菜单选择
      seletClick(arr) {
        this.firstSelected = arr[0] // 一级菜单
        this.secondSelected = arr[1] // 二级菜单默认第一个
        this.SET_LOTTERY_ARR(arr);
        this.isSelect = false
        this.headerTitle = this.betList[arr[0]].children[arr[1]].name
        this.simulation()
      },
    },
    mounted() {
      this.firstSelected = this.lotteryArr[0]
      this.secondSelected = this.lotteryArr[1]
    },
    created() {
      this.lotteryId = this.$route.query.lotteryId + ''
      if (sessionStorage.getItem(`pk10${this.lotteryId}`)) {
        this.betList = JSON.parse(sessionStorage.getItem(`pk10${this.lotteryId}`))
        this.simulation()
      } else {
        this.getList()
      }
    }
  }
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
    padding-bottom: 3rem;
  }

</style>
