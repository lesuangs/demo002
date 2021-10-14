<template>
  <section class="game-bottom">
    <div class="betCon" :class="{top: betsNum}">
      <div class="betNum">
        <span class="f">共
          <em>{{ betsNum }}</em>
          注 共
          <em v-if="lotteryName === 'lhc'">{{ amount / 2 }}</em>
          <em v-else>{{ amount }}</em>
          元
        </span>
        <span class="r">
          单注最多可盈利
          <em v-if="lotteryName === 'lhc'">{{ parseFloat(maxMoney / 2).toFixed(2) }}</em>
          <em v-else>{{ maxMoney }}</em>
          元
        </span>
      </div>
      <div class="features">
        <span @touchstart="clearCode">清空</span>
        <!-- 玩法下注 -->
        <p v-if="lotteryName === 'lhc'">
          <!--<van-stepper v-model="multiple" step="1" max="100000" integer class="vanInp" @change="codeDebounce(0)" />-->
          <em>单注</em>
          <input v-model="multiple" type="number" @change="codeDebounce(0)"
                 onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))' maxlength="8">
          元
        </p>
        <p v-else>
          <em>2元/注</em>
          <!--<van-stepper v-model="multiple" step="1" max="50000" integer class="vanInp" @change="codeDebounce(1)" />-->
          <input v-model="multiple" @change="codeDebounce(1)"
                 onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))' maxlength="8">
          倍数
        </p>
        <button :class="{'btn': betsNum && Number(multiple)}" :disabled="betsNum < 1" @click="addNode">添加注单</button>
      </div>
    </div>
    <div class="bet clearfix">
      <span class="f" @click="$router.push('/orderList?lotteryId='+lotteryId)">
        待投注
        <div v-if="getBetNum>0" class="calculator"> {{ getBetNum }}</div>
      </span>
      <!-- 玩法投注 -->
      <button class="r" :class="{'btn': betsNum && Number(multiple)}" :disabled="betsNum < 1" @click="betting">一键下注
      </button>
    </div>
    <!-- 投注 -->
    <van-overlay :show="isShow">
      <van-loading type="spinner" color="white" size="24px">投注中...</van-loading>
    </van-overlay>
    <!-- 注单反水 -->
    <van-overlay :show="isRebate">
      <div class="rebate" @click.stop>
        <h3 class="rebate-t">注单设定</h3>
        <div class="rebate-c">
          <p class="rebate-p clearfix" v-if="menu !== '特码B'">
            <span class="f"></span>
            <strong>返利：{{ rebateNum }}%</strong>
          </p>
          <van-slider v-if="menu !== '特码B'" v-model="rebate" :step="0.1" :max="userRebate" active-color="#ee0a24"
                      @change="onRebate">
            <template #button>
              <div class="rebate-button">
                <div class="rebate-bc"></div>
              </div>
            </template>
          </van-slider>
          <div class="rebate-inp clearfix">
            <div v-if="lotteryName === 'lhc'">
              <span>单注金额</span>
              <input v-model="multiple" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))'
                     maxlength="8" @input="codeDebounce(0)"/>
              <em>元</em>
            </div>
            <div v-else class="singAmount">
              <em>2元/注</em>
              <input v-model="multiple" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))'
                     maxlength="8" @input="codeDebounce(1)"/>
              <!-- <van-stepper v-model="multiple" step="1" max="50000" integer @input="codeDebounce(1)" class="vanInp" /> -->
              倍数
            </div>
            <!-- 金额类型选择 -->
            <!--<div class="type clearfix">
                  <span v-for="(item, key) in moneyType" class="f" :class="{'checked': key === betModel}" @click="selectType(key)">{{ item }}</span>
              </div> -->
          </div>
          <ol class="rebate-nav">
            <li v-for="(item, key) in betMoney" :key="key" :class="{'checked': key === betMoneyKey}"
                @click="quickMoney(key, item)">{{ item }}
              <em v-if="lotteryName === 'lhc'">元</em>
              <em v-else>倍</em>
            </li>
          </ol>
          <div class="rebate-nums">
            <p>注数：<span>{{ betsNum }} 注</span></p>
            <p v-if="lotteryName === 'lhc'">总额：<span>{{ amount / 2 }} 元</span></p>
            <p v-else>总额：{{ amount }}元</p>
            <p>若中奖，单注最高可中：
              <em v-if="lotteryName === 'lhc'">{{ parseFloat(maxMoney / 2).toFixed(2) }}</em>
              <em v-else>{{ maxMoney }}</em>
              元
            </p>
          </div>
        </div>
        <div class="rebate-f clearfix">
          <span class="f" @click="cancelBet">取消</span>
          <span class="f" @click="isNoteDebounce">确定</span>
        </div>
      </div>
      <div class="masks" v-if="addShow">
        <van-loading type="spinner" color="white"/>
      </div>
    </van-overlay>
  </section>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {sortArray} from '../../../utils/public'
import {Dialog, Toast} from 'vant'

export default {
  name: 'LotteryFooter',
  data() {
    return {
      isShow: false,
      isRebate: false,
      pkKyes: [], // PK10定位胆Key值
      conList: null, // 连码对象
      betDetail: [], // 注单队列
      betList: null, // 下注对象
      codeArr: [], // 号码集合
      oddsArr: [], // 连消、连尾赔率组合
      addOdds: '', // 最大赔率 - 金额计算
      betsNum: 0, // 下注笔数
      multiple: 1, // 玩法 - 倍数，单注默认2元
      amount: 0, // 总金额
      maxMoney: 0, // 单注最高可获金额
      betInfo: '', // 官方玩法 - 号码集合
      setDs: null, // 时时彩定位胆专用
      // 加入注单相关类型
      noteList: [], // 注单
      noteOdds: [], // 赔率
      rebate: 0, // 返利
      betModel: 0, // 0代表元 1代表角 2代表分
      newModel: 1, // 信用玩法 - 1代表元 0.1代表角 0.01代表分
      newModels: 2, // 官方玩法 - 2代表元 0.2代表角 0.02代表分
      moneyType: ['元'], // 金额类型
      betMoneyKey: '', // 快捷金额选项
      betMoney: [10, 100, 1000, 5000, 10000, 50000], // 快捷金额
      content: [], // 代投注订单列表
      timer: null,
      addShow: false
    }
  },
  props: {
    menu: String, // 菜单
    lotteryName: String, // 游戏名称
    lotteryId: String, // 游戏ID
    // 玩法类型 - 默认信用玩法
    playType: {
      type: Boolean,
      default: false
    },
    userRebate: Number, // 用户赔率
    firstSelected: Number, // 一级菜单
    secondSelected: Number // 二级菜单
  },
  computed: {

    ...mapGetters(['userInfo', 'lotteryStatus', 'lotteryNum', 'betListAll']),
    // 用户余额
    userAmount() {
      let amount = ''
      this.$cookie.get('token') ? amount = parseFloat(this.userInfo.money).toFixed(2) : ''
      return amount
    },
    // 注单反水
    rebateNum() {
      return this.rebate.toFixed(1)
    },
    // 期号
    turnNum() {
      return this.lotteryNum
    },
    //获取注单数
    getBetNum() {
      if (this.betListAll === null) {
        return 0
      } else {
        let betListAll = JSON.parse(this.betListAll)
        return betListAll.content.length
      }
    },
  },
  watch: {
    multiple(val) {
      this.amount = parseFloat(this.betsNum * val * 2).toFixed(2)
      this.maxMoney = parseFloat(val * this.addOdds * 2).toFixed(2)
    },
    betsNum(val, old) {
      if ((val && !old && this.lotteryName === 'lhc') || this.betList.config) this.multiple = 2
    },
    // 一级菜单清空选中 - 针对六合彩
    firstSelected() {
      this.clearCode()
    },
    // 多级菜单玩法清空选中
    secondSelected() {
      this.clearCode()
    }
  },
  created() {

    // 六合彩设置2元一注
    let betListAll = JSON.parse(localStorage.getItem("betListAll")) || ""
    if (betListAll !== "") {
      this.SET_LOTTERY_BET(JSON.stringify(betListAll))
    }
    if (this.lotteryName === 'lhc') this.multiple = 2
    this.$http.users.refreshMoney().then((res) => {
      if (res) {
        const money = res.data.money
        this.usersInfo.money = money
        this.usersInfo.unReadCount = res.data.message
        this.SET_USER_INFO(this.usersInfo)
      }
    }).catch(() => {
    })
  },
  methods: {
    ...mapMutations("lottery", ["SET_LOTTERY_BET"]),
    ...mapMutations('user', ['SET_USER_INFO']),
    // 投注
    betting() {
      if (!Number(this.multiple)) return
      if (!this.userAmount) {
        return Dialog.confirm({title: '温馨提示', message: '请先登陆，再投注!!'}).then(() => {
          this.SET_LOTTERY_BET(null), this.$router.push('/login')
        }).catch(() => {
        })
      }
      if (this.lotteryStatus != 0 || !this.turnNum) return Toast('期号变更中，请稍后！')
      // 六合彩总金额减半
      if (this.lotteryName === 'lhc') this.amount = this.amount / 2
      if (Number(this.amount) > Number(this.userAmount)) return Toast('余额不足，请充值！')
      this.isShow = true
      if (this.playType) {
        // isMore为TRUE代表官方玩法投注
        let params = ''
        this.betList.isMore ? params = this.codeReset() : params = this.codeReset_Gf()
        this.$http.home.bet_Gf(params).then(res => {
          if (res.status === 200) {
            Toast.success('投注成功！')
            this.$EventBus.$emit('getMoney')
            this.clearCode()
          }
        })
            .catch((res) => {
              if (res && res.data) {
                this.$toast.fail(res.data.msg)
              } else {
                this.$toast.fail('请求超时，请重新下注')
              }
            })
            .finally(() => {
              this.isShow = false
            })
      } else {
        // 信用玩法投注
        const params = this.codeReset()
        this.$http.home.bet(params).then(res => {
          if (res.status === 200) {
            Toast.success('投注成功！')
            this.$EventBus.$emit('getMoney')
            this.clearCode()
          }
        })
            .catch((res) => {
              if (res && res.data) {
                this.$toast.fail(res.data.msg)
              } else {
                this.$toast.fail('请求超时，请重新下注')
              }
            })
            .finally(() => {
              this.isShow = false
            })
      }
    },
    // 官方玩法投注列表格式化
    codeReset_Gf() {
      console.log(this.betList, this.rebate)
      let params = {
        gameId: this.lotteryId,
        turnNum: this.turnNum,
        totalMoney: Number(this.amount),
        content: [
          {
            betInfo: this.betInfo,
            betModel: this.betModel,
            cateName: this.betList.cateName,
            code: this.betList.code,
            money: this.newModels,
            multiple: this.multiple,
            odds: this.rebate ? this.betList.addOdds : this.betList.addOdds * 2,
            poschoose: '',
            poschooseName: '',
            rebate: this.rebate,
            showContent: this.betInfo,
            totalMoney: Number(this.amount),
            totalNums: this.betsNum,
            isGf: true
          }
        ]
      }
      return params
    },
    // 信用玩法投注列表格式化
    codeReset() {
      let lotteryId = this.lotteryId;
      let turnNum = this.turnNum;
      let params = {
        gameId: lotteryId,
        turnNum: turnNum,
        content: []
      }
      // 增加官方投注属性
      if (this.betList.isMore) params.totalMoney = Number(this.amount)
      // 合肖只有一注
      if (this.betList.addHe) {
        let codeArr = this.codeArr.join()
        this.codeArr = [codeArr.split()]
      }
      // 北京快乐8选二、三增加赔率
      if (this.lotteryName === 'bjkl8' && this.firstSelected === 1 && this.secondSelected > 1) {
        var bjOdds = ''
        let bjArr = JSON.parse(sessionStorage.getItem(`bjkl8${lotteryId}`))[1].children[this.secondSelected].children
        bjOdds = bjArr[0].addOdds + ',' + bjArr[1].addOdds
        if (this.secondSelected > 2) bjOdds = bjArr[0].addOdds + ',' + bjArr[1].addOdds + ',' + bjArr[2].addOdds
        console.log(bjOdds)
      }
      this.codeArr.map((val, key) => {
        let [cateName, code, odds] = ['', '', '']
        // 复式投注，判断betsNum最大可选注数
        if (this.betDetail[0].betsNum > 1 && !this.betList.addHe) {
          cateName = this.betDetail[0].cateName
          code = this.betDetail[0].code
          // 判断连肖、连尾取赔率列表组合，三中二、二中特需传2个赔率，其余复试投注取菜单值
          this.oddsArr.length > 0 ? (this.betList.isBig ? odds = this.oddsArr[key].sort((a, b) => b - a)[0] : odds = this.oddsArr[key].sort((a, b) => a - b)[0]) : (Array.isArray(this.betDetail[0].addOdds) ? odds = this.betDetail[0].addOdds.join() : odds = this.betDetail[0].addOdds)
          // 快乐8选1-5增加赔率
          if (this.lotteryName === 'bjkl8' && this.firstSelected === 1 && this.secondSelected > 1) {
            odds = bjOdds
          }
        } else {
          // 單式投注
          cateName = this.betDetail[key].cateName
          code = this.betDetail[key].code
          this.betList.addHe ? odds = this.addOdds : odds = this.betDetail[key].addOdds
        }
        params.content.push({
          betInfo: val.join(),
          betModel: this.betModel,
          cateName: cateName,
          code: code,
          money: this.betList.isMore ? this.newModels : this.newModel,
          multiple: this.betList.isMore ? this.multiple : parseInt(this.amount / this.betsNum),
          odds: this.playType && !this.rebate ? odds * 2 : odds,
          rebate: this.rebate,
          poschoose: this.lotteryName === 'pk10' || (this.lotteryName === '11x5' && this.firstSelected === 4) ? this.pkKyes[key] : '',
          poschooseName: (this.lotteryName === 'pk10' || (this.lotteryName === '11x5' && this.firstSelected === 4)) && this.playType ? this.setDs[key] : (this.betList.poschooseName || ''),
          showContent: (this.lotteryName === 'pk10' || (this.lotteryName === '11x5' && this.firstSelected === 4)) && this.playType ? val.join() + `(${this.setDs[key]})` : (this.betList.isMore ? val.join() : ''),
          totalMoney: (this.lotteryName === 'pk10' || (this.lotteryName === '11x5' && this.firstSelected === 4)) && this.playType ? (Number(this.amount) / this.betsNum) * val[0].length : this.amount / this.betsNum,
          totalNums: (this.lotteryName === 'pk10' || (this.lotteryName === '11x5' && this.firstSelected === 4)) && this.playType ? val[0].length : 1,
          isGf: this.betList.isMore ? true : false
        })
      })
      this.content = params.content
      return params
    },
    // 添加注单
    addNode() {
      if (!Number(this.multiple)) return
      this.noteList = JSON.parse(JSON.stringify(this.betDetail))
      this.noteOdds = JSON.parse(JSON.stringify(this.oddsArr))
      this.isRebate = true
      this.addShow = false
      sessionStorage.setItem('betMoney', this.multiple)
    },
    // 反水设定
    onRebate(val) {
      this.rebate = Number(val.toFixed(1))
    },
    // 金额类型选择
    selectType(key) {
      this.betModel = key
      key ? (key === 1 ? this.newModel = 0.1 : this.newModel = 0.01) : this.newModel = 1
      key ? (key === 1 ? this.newModels = 0.2 : this.newModels = 0.02) : this.newModels = 2
    },
    // 金额输入限制
    codeDebounce(bool) {
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.setMu(bool)
        this.timer = null
      }, 100)
    },
    setMu(bool) {
      if (bool) {
        if (this.multiple > 50000) this.multiple = 50000
      } else {
        if (this.multiple > 100000) this.multiple = 100000
      }
    },
    // 快捷金额选项
    quickMoney(key, val) {
      this.betMoneyKey = key
      this.multiple = val
    },
    // 注单添加防止重复点击
    isNoteDebounce() {
      if (!this.addShow) {
        this.isNote()
        this.addShow = true
      }
    },
    // 确认添加
    isNote() {
      if (this.lotteryName === 'lhc') this.amount = this.amount / 2
      // 计算反水
      if (this.rebate && !this.betList.addHe) {
        const playOdds = []
        // 官方玩法
        if (this.playType && !this.betList.isMore) {
          this.betList.addOdds = this.betList.addOdds * 2
          this.betList.addOdds = parseFloat((this.betList.minOdds + (this.betList.maxOdds - this.betList.minOdds) / this.betList.rebate * (this.userRebate - this.rebate) / 100).oddFixed(4))
        } else {
          // 信用玩法
          if (Array.isArray(this.betDetail[0].addOdds)) {
            // 连码三中二特殊处理
            let item = this.betDetail[0]
            item.addOdds[0] = parseFloat((item.minOdds + (item.maxOdds - item.minOdds) / item.rebate * (this.userRebate - this.rebate) / 100).oddFixed(4))
            item.addOdds[1] = parseFloat((this.conList.minOdds + (this.conList.maxOdds - this.conList.minOdds) / this.conList.rebate * (this.userRebate - this.rebate) / 100).oddFixed(4))
          } else {
            // 其余玩法
            this.betDetail.map(item => {
              if (this.playType) item.addOdds = item.addOdds * 2
              item.addOdds = parseFloat((item.minOdds + (item.maxOdds - item.minOdds) / item.rebate * (this.userRebate - this.rebate) / 100).oddFixed(4))
              if (this.oddsArr.length > 0) playOdds.push(item.addOdds)
            })
          }
          this.oddsArr = sortArray(playOdds, this.betDetail[0].nums)
        }
      }
      // 判断官方玩法和信息玩法
      var params = ''
      this.playType && !this.betList.isMore ? params = this.codeReset_Gf() : params = this.codeReset()
      // 合肖单独计算
      if (this.rebate && this.betList.addHe) {
        params.content.map(item => {
          item.odds = parseFloat((this.betList.minOdds + (this.betList.maxOdds - this.betList.minOdds) / this.betList.rebate * (this.userRebate - this.rebate) / 100).oddFixed(4))
          this.betList.addHe === 'true' ? item.odds = parseFloat((item.odds / this.betDetail.length).oddFixed(4)) : item.odds = parseFloat((item.odds / (12 - this.betDetail.length)).oddFixed(4))
          console.log(item.odds, this.userRebate, this.rebate)
        })
      }
      if (this.betListAll === null) {
      } else {
        let betListAll = JSON.parse(this.betListAll)
        let betContent = params.content.concat(betListAll.content)
        params.content = betContent
      }
      this.SET_LOTTERY_BET(JSON.stringify(params))
      this.cancelBet()
      this.clearCode()
    },
    // 取消注单
    cancelBet() {
      this.rebate = 0
      this.betModel = 0
      this.newModel = 1
      this.newModels = 2
      this.betMoneyKey = ''
      this.betDetail = this.noteList
      this.oddsArr = this.noteOdds
      this.multiple = sessionStorage.getItem('betMoney')
      this.isRebate = false
      this.addShow = false
    },
    // 清空
    clearCode() {
      this.betsNum = 0
      this.multiple = 1
      this.$EventBus.$emit('clearCode')
    }
  },
  mounted() {
    /**
     * 信用玩法
     * codeArr - 号码集合
     * oddsArr - 六合彩 - 连肖、连尾赔率集合
     * detail - 注单集合
     * betOdds - 赔率组合 - 计算最大赔率
     * setDs - 时时彩定位胆专用
     * cooList - 连码 - 三中二、二中特专用
     */
    this.$EventBus.$on('chooseNum', (codeArr, oddsArr, detail, betOdds, setDs, conList) => {
      // 清空号码
      if (!codeArr && !oddsArr) {
        this.betsNum = 0
        this.multiple = 1
        return
      }
      let newBetOdds = JSON.parse(JSON.stringify(betOdds))
      this.betDetail = JSON.parse(JSON.stringify(detail))
      this.betList = detail[detail.length - 1]
      this.oddsArr = JSON.parse(oddsArr)
      this.codeArr = JSON.parse(codeArr)
      if (conList) this.conList = JSON.parse(conList)
      // 合肖始终 一注只有连肖取最小赔率
      // this.betList.addHe ? this.betsNum = 1 : (this.lotteryName === 'pk10' || this.lotteryName === '11x5' ? this.betsNum = this.betDetail.length : this.betsNum = this.codeArr.length)
      // pk10、11选5定位胆注数使用betDetail数组长度
      this.betList.addHe ? this.betsNum = 1 : (this.lotteryName === 'pk10' && this.firstSelected === 0 || this.lotteryName === '11x5' && this.firstSelected === 4 ? this.betsNum = this.betDetail.length : this.betsNum = this.codeArr.length)
      // 最大赔率计算、
      Array.isArray(this.betList.addOdds) ? this.addOdds = this.betList.addOdds[1] :
          (this.betList.addHe ? (this.betList.addHe === 'true' ? this.addOdds = parseFloat((this.betList.addOdds / this.codeArr.length).toFixed(4)) : this.addOdds = parseFloat((this.betList.addOdds / (12 - this.codeArr.length)).toFixed(4)))
              : (this.betList.isSmall ? this.addOdds = newBetOdds.sort((a, b) => a - b)[0] : this.addOdds = newBetOdds.sort((a, b) => b - a)[0]))
      this.amount = parseFloat(this.betsNum * this.multiple * 2).toFixed(2)
      this.maxMoney = parseFloat(this.multiple * this.addOdds * 2).toFixed(2)
      // 合肖派发一个事件显示赔率
      if (this.betList.addHe) this.$EventBus.$emit('resetOdds', this.addOdds)
      // 设置六合彩2元一注
      if (this.betList.config) {
        this.multiple = 2
        setTimeout(() => {
          detail.map(res => res.config = false)
        }, 100)
      }
      // pk10、11选5定位胆排序
      if (setDs) {
        this.pkKyes = []
        this.setDs = JSON.parse(setDs)
        this.setDs.forEach(val => {
          switch (val) {
            case '第一名':
              this.pkKyes.push(0)
              break
            case '第二名':
              this.pkKyes.push(1)
              break
            case '第三名':
              this.pkKyes.push(2)
              break
            case '第四名':
              this.pkKyes.push(3)
              break
            case '第五名':
              this.pkKyes.push(4)
              break
            case '第六名':
              this.pkKyes.push(5)
              break
            case '第七名':
              this.pkKyes.push(6)
              break
            case '第八名':
              this.pkKyes.push(7)
              break
            case '第九名':
              this.pkKyes.push(8)
              break
            case '第十名':
              this.pkKyes.push(9)
              break
          }
        })
      }
    })

    /**
     * 官方玩法
     * detail - 当前注单
     * betInfo - 注单号码
     * betsNum - 注数
     */
    this.$EventBus.$on('chooseNum_Gf', (detail, betInfo, betsNum) => {
      if (!detail) {
        this.betsNum = 0
        this.multiple = 1
        return
      }
      this.betList = JSON.parse(detail)
      this.betsNum = betsNum
      this.betInfo = betInfo
      this.addOdds = this.betList.addOdds
      this.amount = parseFloat(this.betsNum * this.multiple * 2).toFixed(2)
      this.maxMoney = parseFloat(this.multiple * this.addOdds * 2).toFixed(2)
    })
  },
  beforeDestroy() {
    // 移除事件监听
    this.$EventBus.$off()
  }
}
</script>

<style scoped lang="scss">
.game-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: .28rem;

  .f {
    float: left;
  }

  .r {
    float: right;
  }

  .betCon {
    position: absolute;
    top: 1rem;
    width: 100%;
    opacity: 0;
    transition: all .3s;

    &.top {
      top: -1.8rem;
      opacity: 1;
    }

    .betNum {
      width: 100%;
      height: .6rem;
      background: #e1e1e4;
      padding: 0 .2rem;

      span {
        color: #333;
        line-height: .6rem;

        em {
          color: #D9342F;
        }
      }
    }

    .features {
      z-index: 9;
      width: 100%;
      display: flex;
      padding: .3rem .2rem;
      background: white;
      justify-content: space-between;

      p {
        height: .6rem;
        line-height: .6rem;

        em {
          float: left;
        }

        .vanInp {
          float: left;
          margin: 0 0.06rem;
        }

        input {
          width: 1.4rem;
          height: .6rem;
          margin: 0 .1rem;
          border: 1px solid #ccc;
          border-radius: .1rem;
          color: #D9342F;
          text-align: center;
        }
      }

      span, button {
        height: .6rem;
        padding: 0 .2rem;
        line-height: .6rem;
        text-align: center;
        border-radius: .12rem;
      }

      span {
        color: #D9342F;
        border: 1px solid #D9342F;
        background: rgba(249, 60, 54, 0.13);
      }
    }
  }

  .bet {
    background: white;

    .calculator {
      min-width: .4rem;
      height: .4rem;
      padding: 0 .05rem;
      border-radius: 50%;
      background: $global-bgcolor;
      font-size: .3rem;
      color: #fff;
      position: absolute;
      top: 0;
      left: 59%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    span, button {
      width: 50%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
    }

    span {
      position: relative;
      border-top: 1px solid #ccc;

      .noteNum {
        position: absolute;
        top: 0.08rem;
        width: 0.32rem;
        height: 0.32rem;
        line-height: .3rem;
        color: white;
        font-size: 0.24rem;
        background: #D9342F;
        border-radius: 100%;
      }
    }
  }

  button {
    color: white;
    border: none;
    background: #858585;
  }

  .btn {
    background: #D9342F;
  }

  .btnOrg {
    background-image: linear-gradient(96deg, rgb(253, 100, 79) 1%, rgb(242, 142, 39) 100%);
  }

  .btnBlue {
    background: #0047cc;
  }

  .rebate {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    background: white;
    border-radius: 0.1rem;
    transform: translate(-50%, -50%);

    .f {
      float: left;
    }

    .rebate-t {
      border-radius: 0.1rem 0.1rem 0 0;
      background: $global-bgcolor;
      color: white;
      font-size: 0.32rem;
      line-height: 0.8rem;
      border-bottom: 1px solid #ccc;
    }

    .rebate-c {
      padding: 0.2rem;
      color: #6e6e6e;
      font-size: 0.28rem;

      .rebate-p {
        line-height: 0.4rem;
        margin: 0 0 0.2rem;

        strong {
          color: #D9342F;
          float: right;
        }
      }

      .rebate-button {
        position: relative;
        width: 0.32rem;
        height: 0.32rem;
        background: #ee0a24;
        border-radius: 100%;

        .rebate-bc {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0.16rem;
          height: 0.16rem;
          background: white;
          border-radius: 100%;
          transform: translate(-50%, -50%);
        }
      }

      .rebate-inp {
        height: .6rem;
        line-height: .6rem;
        margin: 0.3rem 0;

        input {
          width: 2rem;
          height: .6rem;
          margin: 0 .6rem;
          border: none;
          border-bottom: 1px solid #ccc;
          color: #D9342F;
          text-align: center;
        }

        .type {
          span {
            width: .6rem;
            height: .6rem;
            margin-right: 0.1rem;
            background: #e1e1e4;
          }

          span:last-child {
            margin: 0;
          }

          span.checked {
            background: $global-bgcolor;
            color: white;
          }
        }

        .singAmount {
          width: 100%;
          display: flex;
          justify-content: space-evenly;
        }
      }

      .rebate-nav {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 0.2rem;

        li {
          width: 30%;
          height: 0.6rem;
          margin-bottom: 0.16rem;
          color: #333;
          line-height: 0.6rem;
          background: #e1e1e4;
          border-radius: 3px;
        }

        li.checked {
          background: $global-bgcolor;
          color: white;
        }
      }

      .rebate-nums p {
        text-align: left;
        margin-bottom: 0.16rem;

        em {
          color: #D9342F;
        }
      }
    }

    .rebate-f {
      border-top: 1px solid #ccc;

      span {
        width: 50%;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        border-right: 1px solid #ccc;
      }

      span:last-child {
        color: #D9342F;
        border-right: none;
      }
    }
  }

  .masks {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .4);
  }
}

.van-loading {
  top: 49%;
}
</style>
