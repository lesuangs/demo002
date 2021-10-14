<template>
  <div class="game-bottom">
    <div class="bet-detail"
         :class="{'active': betsNum}">
      <div class="bet-num">
        <span>
          {{$t('lang.lottery.bottom.info[0]')}}<em>{{ betsNum }}</em>
          {{$t('lang.lottery.bottom.info[1]')}}
          <em v-if="lotteryName === 'lhc'">{{ amount / 2 }}</em>
          <em v-else>{{ amount }}</em>
          {{$t('lang.lottery.bottom.info[2]')}}
        </span>
        <span>
          <i v-html="$t('lang.lottery.bottom.info[3]')"></i>
          <em v-if="lotteryName === 'lhc'">
            {{ parseFloat(maxMoney / 2).toFixed(2) }}
          </em>
          <em v-else>{{ maxMoney }}</em>
          <i>{{$t('lang.lottery.bottom.info[2]')}}</i>
        </span>
      </div>
      <div class="option">
        <span @click="clearCode" class="clear-all">
          <!--清空-->
          {{$t('lang.lottery.bottom.tools[0]')}}
        </span>
        <!-- 玩法下注 -->
        <p v-if="lotteryName === 'lhc'">
          <!--<van-stepper v-model="multiple" step="1" max="100000" integer class="vanInp" @change="codeDebounce(0)" />-->
          <em>
            <!--单注-->
            {{$t('lang.lottery.bottom.multiple[0]')}}
          </em>
          <input v-model="multiple" type="number"
                 @change="codeDebounce(0)"
                 onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))'
                 maxlength="8">
          <!--元-->
          <em>{{$t('lang.lottery.bottom.multiple[1]')}}</em>
        </p>
        <p v-else>
          <em v-html="$t('lang.lottery.bottom.multiple[2]')"></em>
          <!--<em >{{$t('lang.lottery.bottom.multiple[2]')}}</em>-->
          <!--<van-stepper v-model="multiple" step="1" max="50000" integer class="vanInp" @change="codeDebounce(1)" />-->
          <input v-model="multiple" @change="codeDebounce(1)"
                 onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))'
                 maxlength="8">
          <em>{{$t('lang.lottery.bottom.multiple[3]')}}</em>

        </p>
        <span :class="{'active': betsNum && Number(multiple)}"
              class="add-btn"
              @click="addNode()">
          <!--添加注单-->
          {{$t('lang.lottery.bottom.tools[1]')}}
        </span>
      </div>
    </div>
    <ul class="button-group">
      <li>
        <span @click="$router.push('/orderList?lotteryId='+lotteryId)"
              class="order-list">
        <!--待投注-->
          {{$t('lang.lottery.bottom.tools[2]')}}
          <em v-if="getBetNum>0" class="calculator">{{ getBetNum }}</em>
      </span>
      </li>
      <li>
        <!-- 玩法投注 -->
        <span :class="{'active': betsNum && Number(multiple)}"
              class="quick"
              @click="betting">
          <!--一键下注-->
          {{$t('lang.lottery.bottom.tools[3]')}}
      </span>
      </li>

    </ul>
    <!-- 投注 -->
    <van-overlay :show="isShow">
      <van-loading type="spinner" color="white" size="24px">投注中...</van-loading>
    </van-overlay>
    <!-- 注单反水 -->
    <van-overlay :show="isRebate">
      <div class="rebate" @click.stop>
        <h3 class="rebate-title">
          <!--注单设定-->
          {{$t('lang.lottery.bottom.queue.title')}}
        </h3>
        <div class="rebate-content">
          <p class="rebate-return" v-if="menu !== '特码B'">
            <!--返利-->
            <span>{{$t('lang.lottery.bottom.queue.info[0]')}}:{{ rebateNum }}%</span>
          </p>
          <van-slider v-if="menu !== '特码B'"
                      v-model="rebate"
                      :step="0.1"
                      class="slider-tools"
                      :max="userRebate"
                      @change="onRebate">
            <template #button>
              <div class="rebate-button">
                <div class="rebate-bc"></div>
              </div>
            </template>
          </van-slider>
          <div class="rebate-option">
            <div v-if="lotteryName === 'lhc'"
                 class="amount-multiple">
              <span class="tips">
                <!--单注金额-->
                {{$t('lang.lottery.bottom.multiple[0]')}}
              </span>
              <div class="inputting">
                <input v-model="multiple"
                       onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))'
                       maxlength="8" @input="codeDebounce(0)"/>
                <span>{{$t('lang.lottery.bottom.multiple[1]')}}</span>
              </div>
            </div>
            <div v-else class="amount-multiple">
              <span class="tips" v-html="$t('lang.lottery.bottom.multiple[2]')">
                <!--2元/注-->
              </span>
              <div class="inputting">
                <input v-model="multiple"
                       onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))'
                       maxlength="8" @input="codeDebounce(1)"/>
                <!-- <van-stepper v-model="multiple" step="1" max="50000" integer @input="codeDebounce(1)" class="vanInp" /> -->
                <!--倍数-->
                <span>{{$t('lang.lottery.bottom.multiple[3]')}}</span>
              </div>

            </div>
            <!-- 金额类型选择 -->
            <!--<div class="type clearfix">
                  <span v-for="(item, key) in moneyType" class="f" :class="{'checked': key === betModel}" @click="selectType(key)">{{ item }}</span>
              </div> -->
          </div>
          <ul class="rebate-nav">
            <li v-for="(item, key) in betMoney" :key="key"
                :class="{'active': key === betMoneyKey}"
                @click="quickMoney(key, item)">
              {{ item }}
              <em v-if="lotteryName === 'lhc'">{{$t('lang.lottery.bottom.multiple[1]')}}</em>
              <em v-else>{{$t('lang.lottery.bottom.multiple[3]')}}</em>
              <!--倍-->
            </li>
          </ul>
          <div class="rebate-num">
            <p>
              {{$t('lang.lottery.bottom.queue.info[1]')}}:
              <span> {{ betsNum }} {{$t('lang.lottery.bottom.queue.info[2]')}}</span>
            </p>
            <p v-if="lotteryName === 'lhc'">
              {{$t('lang.lottery.bottom.queue.info[3]')}}:
              <span>{{ amount / 2 }} {{$t('lang.lottery.bottom.queue.info[4]')}}</span>
            </p>
            <p v-else>
              {{$t('lang.lottery.bottom.queue.info[3]')}}:
              <span>{{ amount }} {{$t('lang.lottery.bottom.queue.info[4]')}}</span>
            </p>
            <p>
              {{$t('lang.lottery.bottom.queue.info[5]')}}:
              <em v-if="lotteryName === 'lhc'">{{ parseFloat(maxMoney / 2).toFixed(2) }}</em>
              <em v-else>{{ maxMoney }}</em>
              <span> {{$t('lang.lottery.bottom.queue.info[4]')}}</span>
            </p>
          </div>
        </div>
        <div class="rebate-btn-wrapper clearfix">
          <span @click="cancelBet">{{$t('lang.lottery.bottom.queue.btn[0]')}}</span>
          <span @click="isNoteDebounce">{{$t('lang.lottery.bottom.queue.btn[1]')}}</span>
        </div>
      </div>
      <div class="masks" v-if="addShow">
        <van-loading type="spinner" color="white"/>
      </div>
    </van-overlay>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapState} from 'vuex'
  import {sortArray} from '../../../utils/public'
  import {Dialog, Toast} from 'vant'
  import {skinMode} from "../../../utils/mode";

  export default {
    name: 'LotteryFooter',
    data() {
      return {
        skinColor: skinMode,
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
      ...mapState([
        'skin',
        'userInformation',
        'balance',
        'isLogin'
      ]),
      ...mapGetters(['userInfo', 'lotteryStatus', 'lotteryNum', 'betListAll']),
      // 用户余额
      userAmount() {
        let amount = ''
        this.isLogin ? amount = parseFloat(this.balance).toFixed(2) : ''
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
          let money = res.data.money
          // this.usersInfo.money = money
          this.setData({key:'balance',value:money})
          this.usersInfo.unReadCount = res.data.message
          this.SET_USER_INFO(this.usersInfo)
        }
      }).catch(() => {
      })
    },
    methods: {
      ...mapMutations({
        setData:'SET_DATA'
      }),
      ...mapMutations("lottery", ["SET_LOTTERY_BET"]),
      ...mapMutations('user', ['SET_USER_INFO']),
      // 投注
      betting() {
        console.log(this.betsNum, Number(this.multiple), '倍数');
        if (Number(this.multiple) && this.betsNum >= 1) {
          if (!this.userAmount) {
            return Dialog.confirm({
                title: this.$t('lang.lottery.dialog.title'),
                message: this.$t('lang.lottery.dialog.warning[0]'),
                cancelButtonText:this.$t('lang.lottery.bottom.queue.btn[0]'),
                confirmButtonText:this.$t('lang.lottery.bottom.queue.btn[1]')
              }
            //  请先登陆，再投注!
            ).then(() => {
              this.SET_LOTTERY_BET(null);
              this.$router.push('/login');
            }).catch(() => {
            })
          }
          if (this.lotteryStatus !== 0 || !this.turnNum){
            // 期号变更中，请稍后！
            return Toast.fail(this.$t('lang.lottery.dialog.warning[1]'))
          }
          // 六合彩总金额减半
          if (this.lotteryName === 'lhc') {
            this.amount = this.amount / 2
          }
          if (Number(this.amount) > Number(this.userAmount)){
            // 余额不足，请充值！
            return Toast.fail(this.$t('lang.lottery.dialog.warning[2]'))
          }
          this.isShow = true;
          if (this.playType) {
            // isMore为TRUE代表官方玩法投注
            let params = ''
            this.betList.isMore ? params = this.codeReset() : params = this.codeReset_Gf()
            this.$http.home.bet_Gf(params).then(res => {
              if (res.status === 200) {
                // 投注成功！
                Toast.success(this.$t('lang.lottery.dialog.warning[3]'))
                this.$EventBus.$emit('getMoney')
                this.clearCode()
              }
            }).catch((res) => {
              if (res && res.data) {
                this.$toast.fail(res.data.msg)
              } else {
                // 请求超时，请重新下注
                this.$toast.fail(this.$t('lang.lottery.dialog.warning[4]'))
              }
            }).finally(() => {
              this.isShow = false
            })
          }
          else {
            // 信用玩法投注
            let params = this.codeReset()
            this.$http.home.bet(params).then(res => {
              if (res.status === 200) {
                // 投注成功！
                Toast.success(this.$t('lang.lottery.dialog.warning[3]'))
                this.$EventBus.$emit('getMoney')
                this.clearCode()
              }
            })
              .catch((res) => {
                if (res && res.data) {
                  this.$toast.fail(res.data.msg)
                } else {
                  // 请求超时，请重新下注
                  this.$toast.fail(this.$t('lang.lottery.dialog.warning[4]'))
                }
              }).finally(() => {
                this.isShow = false
              })
          }
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
        // console.log(this.betsNum, this.multiple, 'addd');
        // if (!Number(this.multiple)) return
        if (this.betsNum >= 1 && Number(this.multiple)) {
          this.noteList = JSON.parse(JSON.stringify(this.betDetail))
          this.noteOdds = JSON.parse(JSON.stringify(this.oddsArr))
          this.isRebate = true
          this.addShow = false
          sessionStorage.setItem('betMoney', this.multiple)
        }
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
        console.log(codeArr, oddsArr, detail, betOdds, setDs, conList,'chooseNumchooseNumchooseNum');
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
  .skin-gray {
    .game-bottom {
      box-shadow: 0 -0.01rem 0 0 #444555;
      background: #303244;
      .bet-detail {
        background: #24252D;
        .bet-num {
          span {
            color: #9a9aa7;
            em {
              color: #ff2525;
            }
          }
        }
        .option {
          .clear-all {
            border: solid 1px #6a697f;
            background-color: rgba(144, 143, 177, 0.2);
            color: #908fb1;
          }
          p {
            color: #908fb1;
            input {
              border: solid 1px #333441;
              background-color: #1e1f26;
            }
          }
          .add-btn {
            color: #533510;
            background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
          }
        }
      }
      ul.button-group {
        li {
          span {
            &.order-list {
              color: #fff;
              background-image: linear-gradient(to bottom, #8c90bc 2%, #545a96);
              box-shadow: 0 0.05rem 0.19rem 0 rgba(0, 0, 0, 0.5);
              position: relative;
            }
            &.quick {
              border: solid 1px #292a2e;
              background-color: #202225;
              color: #8f8f8f;
              box-shadow: 0 0.05rem 0.19rem 0 rgba(0, 0, 0, 0.5)
            }
            &.active {
              color: #533510;
              background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
            }
          }
        }
      }
      /deep/ .van-overlay {
        .rebate {
          background: #24252d;
          transform: translate(-50%, -50%);
          .rebate-title {
            color: #fff;
            border-bottom: 1px solid #717180;
          }
          .rebate-content {
            color: #9a9aa7;

            .rebate-return {
              span {
                color: #9a9aa7;
              }
            }
            /deep/ .van-slider {
              /deep/ .van-slider__bar {
                /*background: #efcea6;*/
                background: #15e1fb;
              }
            }
            .slider-tools {
              .rebate-button {
                background-image: linear-gradient(to bottom, #05caf2, #15e1fb);
                border-radius: 100%;
                .rebate-bc {
                  background: #000;
                }
              }
            }
            .rebate-option {
              .amount-multiple {
                color: #9a9aa7;
                .inputting {
                  input {
                    color: #ffd57d;
                    border: solid 1px #333441;
                    background-color: #1e1f26;
                  }
                }
              }
            }
            .rebate-nav {
              li {
                color: #908fb1;
                border: solid 1px #6a697f;
                background-color: rgba(144, 143, 177, 0.2);
                &.active {
                  background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
                  color: #533510;
                }
              }
            }
            .rebate-num {
              p {
                em {
                  color: #D9342F;
                }
                span {
                  color: #fff;
                }
              }
            }

          }
          .rebate-btn-wrapper {
            span {
              color: #fff;
              background-image: linear-gradient(to bottom, #8c90bc 2%, #545a96);
              &:last-child {
                color: #533510;
                background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
              }
            }
          }
        }
      }
      .masks {
        background-color: rgba(0, 0, 0, .4);
      }
    }
  }

  .skin-black {
    .game-bottom {
      box-shadow: 0 -0.01rem 0 0 #444555;
      background: #24252D;
      .bet-detail {
        background: #24252D;
        .bet-num {
          span {
            color: #9a9aa7;
            em {
              color: #ff2525;
            }
          }
        }
        .option {
          .clear-all {
            border: solid 1px #93806a;
            background-image: linear-gradient(to bottom, #443f3a, #544a42 99%);
            color: #c4aa88;
          }
          p {
            color: #9a9aa7;
            input {
              color: #deb091;
              border: solid 1px #333441;
              background-color: #1e1f26;
            }
          }
          .add-btn {
            color: #533510;
            background-image: linear-gradient(to bottom, #efcea6, #dab591);
          }
        }
      }
      ul.button-group {
        li {
          span {
            &.order-list {
              color: #dadada;
              background-image: linear-gradient(to bottom, #645592 1%, #322b4d);
              box-shadow: 0 0.05rem 0.19rem 0 rgba(0, 0, 0, 0.5)
            }
            &.quick {
              border: solid 1px #292a2e;
              background-color: #202225;
              color: #8f8f8f;
              box-shadow: 0 0.05rem 0.19rem 0 rgba(0, 0, 0, 0.5)
            }
            &.active {
              color: #533510;
              background-image: linear-gradient(to bottom, #efcea6, #dab591);
            }
          }
        }
      }
      /deep/ .van-overlay {
        .rebate {
          background: #24252d;
          transform: translate(-50%, -50%);
          .rebate-title {
            color: #fff;
            border-bottom: 1px solid #717180;
          }
          .rebate-content {
            color: #9a9aa7;
            .rebate-return {
              span {
                color: #ff2525;
              }
            }
            /deep/ .van-slider {
              /deep/ .van-slider__bar {
                background: #efcea6;
                /*background: #15e1fb;*/
              }
            }
            .slider-tools {
              .rebate-button {
                /*background-image: linear-gradient(to bottom, #05caf2, #15e1fb);*/
                background: #efcea6;
                border-radius: 100%;
                .rebate-bc {
                  background: #000;
                }
              }
            }
            .rebate-option {
              .amount-multiple {
                color: #9a9aa7;
                .inputting {
                  input {
                    color: #deb091;
                    border: solid 1px #333441;
                    background-color: #1e1f26;
                  }
                }
              }
            }
            .rebate-nav {
              li {
                color: #c4aa88;
                border: solid 1px #93806a;
                background-image: linear-gradient(to bottom, #443f3a, #544a42 99%);
                &.active {
                  background-image: linear-gradient(to bottom, #efcea6, #dab591);
                  color: #533510;
                }
              }
            }
            .rebate-num {
              p {
                em {
                  color: #D9342F;
                }
                span {
                  color: #fff;
                }
              }
            }

          }
          .rebate-btn-wrapper {
            span {
              color: #dadada;
              background-image: linear-gradient(to bottom, #645592 1%, #322b4d);
              &:last-child {
                color: #533510;
                background-image: linear-gradient(to bottom, #efcea6, #dab591);
              }
            }
          }
        }
      }
      .masks {
        background-color: rgba(0, 0, 0, .4);
      }
    }
  }

  .game-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size: .28rem;
    height: 1.7rem;
    box-shadow: 0 -0.01rem 0 0 #444555;
    background: #303244;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .bet-detail {
      position: absolute;
      top: 1rem;
      width: 100%;
      height: 1.8rem;
      opacity: 0;
      transition: all .3s linear;
      background: #24252D;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      &.active {
        top: -1.8rem;
        opacity: 1;
      }
      .bet-num {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 0.6rem;
        /*line-height: 0.6rem;*/
        padding: 0 .2rem;
        span {
          color: #9a9aa7;
          font-size: 14px;
          display: flex;
          align-items: center;
          i {
            text-align: right;
            padding: 0 0.1rem 0 0;
          }
          em {
            color: #ff2525;
          }
        }
      }
      .option {
        z-index: 9;
        width: 100%;
        display: flex;
        padding: 0 0.2rem;
        height: 0.6rem;
        justify-content: space-between;
        align-items: center;
        .clear-all {
          width: 60px;
          height: 28px;
          line-height: 28px;
          border-radius: 18px;
          border: solid 1px #6a697f;
          background-color: rgba(144, 143, 177, 0.2);
          color: #908fb1;
        }
        p {
          height: .6rem;
          line-height: .3rem;
          /*line-height: .6rem;*/
          color: #908fb1;
          font-size: 12px;
          display: flex;
          align-items: center;
          input {
            width: 1.4rem;
            height: .6rem;
            line-height: .6rem;
            margin: 0 .1rem;
            border-radius: .1rem;
            text-align: center;
            -webkit-backdrop-filter: blur(18px);
            backdrop-filter: blur(18px);
            border: solid 1px #333441;
            background-color: #1e1f26;
          }
        }
        .add-btn {
          min-width: 78px;
          height: 26px;
          line-height: 26px;
          border-radius: 18px;
          color: #533510;
          font-weight: bold;
          padding: 0 .1rem;
          background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
        }
        /*span, button {*/
        /*height: .6rem;*/
        /*padding: 0 .2rem;*/
        /*line-height: .6rem;*/
        /*text-align: center;*/
        /*border-radius: .12rem;*/
        /*}*/
        /*span {*/
        /*color: #D9342F;*/
        /*border: 1px solid #D9342F;*/
        /*background: rgba(249, 60, 54, 0.13);*/
        /*}*/
      }
    }
    ul.button-group {
      padding: 12px 0 0;
      display: flex;
      width: 100%;
      /*height: 100%;*/
      li {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          width: 155px;
          height: 44px;
          line-height: 44px;
          border-radius: 22px;
          font-family: PingFangTC;
          font-size: 16px;
          font-weight: 500;
          position: relative;
          &.order-list {
            color: #fff;
            background-image: linear-gradient(to bottom, #8c90bc 2%, #545a96);
            box-shadow: 0 0.05rem 0.19rem 0 rgba(0, 0, 0, 0.5)
          }
          &.quick {
            border: solid 1px #292a2e;
            background-color: #202225;
            color: #8f8f8f;
            box-shadow: 0 0.05rem 0.19rem 0 rgba(0, 0, 0, 0.5)
          }
          &.active {
            color: #533510;
            font-weight: bold;
            background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
          }
        }
      }

      .calculator {
        min-width: .4rem;
        height: .4rem;
        padding: 0 .05rem;
        border-radius: 50%;
        background: $global-bgcolor;
        font-size: .3rem;
        color: #fff;
        position: absolute;
        top: -0.1rem;
        right: .6rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    /deep/ .van-overlay {
      z-index: 100;
      .rebate {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 84%;
        background: #24252d;
        transform: translate(-50%, -50%);
        border-radius: 20px;
        overflow: hidden;

        .rebate-title {
          color: white;
          font-size: 15px;
          line-height: 44px;
          border-bottom: 1px solid #717180;
        }
        .rebate-content {
          padding: 0.2rem 10%;
          font-size: 0.28rem;
          color: #9a9aa7;
          .rebate-return {
            line-height: 0.4rem;
            margin: 0 0 0.2rem;
            display: flex;
            justify-content: flex-end;
            span {
              color: #9a9aa7;
            }
          }
          .slider-tools {
            margin: 0.5rem 0;
            .rebate-button {
              position: relative;
              width: 0.32rem;
              height: 0.32rem;
              background-image: linear-gradient(to bottom, #05caf2, #15e1fb);
              border-radius: 100%;
              .rebate-bc {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0.16rem;
                height: 0.16rem;
                background: #000;
                border-radius: 100%;
                transform: translate(-50%, -50%);
              }
            }
          }
          .rebate-option {
            height: .6rem;
            line-height: .6rem;
            margin: 0.3rem 0;
            .amount-multiple {
              width: 100%;
              display: flex;
              align-items: center;
              color: #9a9aa7;
              /*justify-content: space-around;*/
              .tips {
                min-width: 1rem;
                line-height: .3rem;
              }
              .inputting {
                flex: 1;
                width: 100%;
                position: relative;
                display: flex;
                justify-content: flex-start;
                padding: 0 0 0 0.1rem;
                input {
                  padding: 0 1.5rem 0 0.2rem;
                  width: 100%;
                  height: .8rem;
                  color: #ffd57d;
                  border-radius: 4px;
                  -webkit-backdrop-filter: blur(18px);
                  backdrop-filter: blur(18px);
                  border: solid 1px #333441;
                  background-color: #1e1f26;
                  text-align: left;
                }
                span {
                  position: absolute;
                  top: 0;
                  right: 0;
                  height: 0.8rem;
                  line-height: 0.8rem;
                  width: 1.5rem;
                  padding: 0 0.1rem 0 0;
                  text-align: center;
                }
              }

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

          }
          .rebate-nav {
            padding: 0.2rem 0 0;
            display: flex;
            flex-wrap: wrap;
            li {
              min-width: 1.3rem;
              padding: 0 0.15rem;
              height: 0.6rem;
              line-height: 0.58rem;
              margin: 0 0.16rem 0.2rem 0;
              color: #908fb1;
              border-radius: 18px;
              border: solid 1px #6a697f;
              background-color: rgba(144, 143, 177, 0.2);
              &.active {
                background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
                color: #533510;
              }
            }
          }
          .rebate-num {
            padding: 0.16rem 0 0;
            p {
              text-align: left;
              margin-bottom: 0.16rem;
              em {
                color: #D9342F;
              }
              span {
                color: #fff;
              }
            }
          }

        }
        .rebate-btn-wrapper {
          /*border-top: 1px solid #ccc;*/
          display: flex;
          span {
            flex: 1;
            width: 50%;
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            color: #fff;
            font-size: 16px;
            background-image: linear-gradient(to bottom, #8c90bc 2%, #545a96);
            &:last-child {
              color: #533510;
              font-weight: bold;
              background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
            }
          }
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
