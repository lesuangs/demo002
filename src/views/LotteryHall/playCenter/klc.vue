<template>
  <section class="lotter">
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
                  :isLoading="isLoading"
                  :firstMenu="firstMenu"
                  :codeList="codeList"
                  :firstSelected="firstSelected"
                  :secondSelected="secondSelected"/>
    <!-- 底部-下注 -->
    <lottery-footer :menu="firstMenu.name"
                    :lotteryName="lotteryName"
                    :userRebate="userRebate"
                    :lotteryId="lotteryId"
                    :firstSelected="firstSelected"
                    :secondSelected="secondSelected"/>
  </section>
</template>

<script>
import {mapGetters, mapMutations,mapState} from "vuex";
import GamesUtils from "@/utils/GamesUtils";

export default {
    data () {
      return {
        lotteryId: '',
        lotteryName: 'gdklsf',
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
        totalNum: 20, // 总数
        inputRebate: 0, // 反水选项 - 默认为0
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
      ...mapGetters(['userInfo',"lotteryArr"]),
      // 用户反水
      userRebate () {
        let rebate = this.userInformation.rebate || 9
        return rebate
      }
    },
    methods: {
      ...mapMutations("lottery", ["SET_LOTTERY_ARR"]),
      // 数据获取
      async getData () {
        try {
          var json = await Promise.all([this.$http.home.getMarkData(this.lotteryId)])
        } catch (err) {
          this.$toast.fail({ message: err, forbidClick: true })
        }
        return json
      },
      getList () {
        this.getData().then(res => {
          let json = res[0]
          if (json.data) this.setJson(json.data)
        })
      },
      // 数据处理
      setJson (data) {
        let lotteryId = this.lotteryId;
        let userRebate = this.userRebate;
        let inputRebate = this.inputRebate;
        let newVar = GamesUtils.setKlcMethodInit(data, lotteryId, userRebate, inputRebate);
        // 玩法整合
        this.betList = newVar
        // 菜单加载
        this.simulation()
        sessionStorage.setItem(`gdklsf${lotteryId}`, JSON.stringify(this.betList))
      },
      // 初次加载默认数据
      simulation () {
        this.isLoading = false
        this.firstMenu = this.betList[this.firstSelected]
        // 玩法具体号码
        this.codeList = this.firstMenu.children[this.secondSelected]
        // 标题
        this.headerTitle = this.firstMenu.children[this.secondSelected].name
      },
      // 菜单选择
      seletClick (arr) {
        this.firstSelected = arr[0] // 一级菜单
        this.secondSelected = arr[1] // 二级菜单默认第一个
        this.SET_LOTTERY_ARR(arr);
        this.isSelect = false
        this.headerTitle = this.betList[arr[0]].children[arr[1]].name
        this.simulation()
      },
      // 自定义号码
      mapArr (ids, key) {
        let singleArr = Array.from({length: 11})
        let arr = singleArr.map((val, i) => {
          let num = ''
          i < 9 ? num = '0' + (i + 1) : num = i + 1 + '' // 号码模拟
          val = JSON.parse(JSON.stringify(ids))
          val.alias = num
          val.value = num
          val.num = key + 1
          return val
        })
        return arr
      }
    },
    mounted () {
      this.firstSelected=this.lotteryArr[0]
      this.secondSelected=this.lotteryArr[1]
    },
    created () {
      this.lotteryId = this.$route.query.lotteryId + ''
      if (sessionStorage.getItem(`gdklsf${this.lotteryId}`)) {
        this.betList = JSON.parse(sessionStorage.getItem(`gdklsf${this.lotteryId}`))
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
