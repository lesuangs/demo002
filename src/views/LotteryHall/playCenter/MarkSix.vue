<template>
  <section class="lotter" :class="{lotterBtn: num}">
    <LotteryHeader @seletClick="seletClick"
                   @titleClick="isSelect = !isSelect"
                   :lotteryId="lotteryId"
                   :firstSelected="firstSelected"
                   :betList="betList"
                   :headerTitle="headerTitle"
                   :isSelect="isSelect"/>
    <!-- 主体-号码选择 -->
    <lottery-bets @secondMenu="secondMenu(arguments)"
                  :lotteryId="lotteryId"
                  :lotteryName="lotteryName"
                  :bigNum="bigNum"
                  :totalNum="totalNum"
                  :isLoading="isLoading"
                  :isSecond="isSecond"
                  :firstMenu="firstMenu"
                  :codeList="codeList"
                  :visibleNumber="visibleNumber"
                  :visibleNoNumber="visibleNoNumber"
                  :firstSelected="firstSelected"
                  :secondSelected="secondSelected"/>
    <!-- 底部-下注 -->
    <lottery-footer :menu="firstMenu.name"
                    :userRebate="userRebate"
                    :lotteryId="lotteryId"
                    :lotteryName="lotteryName"
                    :firstSelected="firstSelected"
                    :secondSelected="secondSelected"/>
  </section>
</template>

<script>
import {mapGetters, mapMutations,mapState} from "vuex";
import GamesUtils from "../../../utils/GamesUtils";

export default {
  name: 'markSix',
  data() {
    return {
      lotteryId: '',
      lotteryName: 'lhc',
      isLoading: true, // 数据是否加载完成
      betList: [], // 六合彩list集合
      firstMenu: {}, // 一级菜单数据
      firstSelected: 0, // 一级菜单选中玩法 - 默认第一个
      isSecond: false, // 是否显示二级菜单
      secondSelected: 0, // 二级菜单选中玩法 - 默认第一个
      codeList: [], // 具体玩法号码
      headerTitle: '', // 第一次显示的标题
      isSelect: false, // 选择玩法显示判断
      isHistory: false, // 历史记录显示判断
      openNum: '', // 最近一期开奖号码
      turnNum: '', // 当前期
      num: 0, // 下注笔数
      bigNum: 24, // 大小
      totalNum: 49, // 总数
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
    // 返回数字号码（正码半波，两面单独处理）
    visibleNumber() {
      const name = this.firstMenu.name
      return this.codeList.filter(val => !isNaN(val.name) && name !== '正码半波' && name !== '两面')
    },
    // 返回非数字号码（特码、连码、自选不中单独处理）
    visibleNoNumber() {
      const menu = this.firstMenu
      return this.codeList.filter(val => isNaN(val.name) && menu.name !== '特码' && menu.name !== '正码1-6' && menu.code !== `${this.lotteryId}207` && menu.code !== `${this.lotteryId}208`)
    }
  },
  methods: {
    ...mapMutations("lottery", ["SET_LOTTERY_ARR"]),
    // 六合彩数据获取
    getData() {
      // 优先获取缓存数据
      let lotteryId = this.lotteryId;
      if (sessionStorage.getItem(`lhc${lotteryId}`)) {
        this.betList = JSON.parse(sessionStorage.getItem(`lhc${lotteryId}`))
        this.simulation()
      } else {
        this.$http.home.getMarkData(lotteryId).then(res => {
          let userRebate = this.userRebate;
          let inputRebate = this.inputRebate;
          this.betList = GamesUtils.setMarkSixMethodInit(res, lotteryId, userRebate, inputRebate)
          this.simulation()
        })
            .catch(err => this.$toast.fail({message: err, forbidClick: true}))
      }
    },
    // 初次加载默认数据
    simulation() {
      this.isLoading = false
      this.firstMenu = this.betList[this.firstSelected]
      // 是否展示二级菜单
      this.firstMenu.children.length > 1 ? this.isSecond = true : this.isSecond = false
      // 玩法具体号码
      this.codeList = this.firstMenu.children[this.secondSelected].detail
      this.headerTitle = this.firstMenu.name
      // 二级菜单渲染
      if (this.isSecond) this.$EventBus.$emit('isSecond')
    },
    // 一级菜单选择
    seletClick(arr) {
      this.firstSelected = arr[0] // 一级菜单
      this.secondSelected = 0 // 二级菜单默认第一个
      this.SET_LOTTERY_ARR([arr[0], 0]);
      this.isSelect = false
      this.headerTitle = this.betList[this.firstSelected].name
      this.simulation()
    },
    // 二级菜单选择
    secondMenu(arr) {
      this.secondSelected = arr[0]
      this.codeList = arr[1]
    }
  },
  mounted() {
    this.firstSelected = this.lotteryArr[0]
    this.secondSelected = this.lotteryArr[1]
  },
  created() {
    this.lotteryId = this.$route.query.lotteryId + ''
    if (sessionStorage.getItem(`lhc${this.lotteryId}`)) {
      this.betList = JSON.parse(sessionStorage.getItem(`lhc${this.lotteryId}`))
      this.simulation()
    } else {
      this.getData()
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
