<template>
  <div class="game-bottom">
    <div class="bet-detail" :class="{ 'active': betsNum }">
      <div class="bet-num">
        <span>
          {{$t('lang.lottery.bottom.info[0]')}} <em>{{ betsNum }}</em>
          {{$t('lang.lottery.bottom.info[1]')}}
          <em>{{ amount }}</em>
          {{$t('lang.lottery.bottom.info[2]')}}
        </span>
        <span>
          <i v-html="$t('lang.lottery.bottom.info[3]')"></i>
          <em>{{ !playType ? maxMoney : maxMoney / 2 }}</em>
          <i>{{$t('lang.lottery.bottom.info[2]')}}</i>
        </span
        >
      </div>
      <div class="option">
        <span @click="clearCode" class="clear-all">
          <!--清空-->
          {{$t('lang.lottery.bottom.tools[0]')}}
        </span>
        <!-- 官方玩法下注 -->
        <p>
          <!--<em>2元/注</em>-->
          <em v-html="$t('lang.lottery.bottom.multiple[2]')"></em>
          <!--    <van-stepper
               v-model="multiple"
               step="1"
               max="50000"
               integer
               class="vanInp"
               @change="codeDebounce"
             /> -->
          <input v-model="multiple"
                 @change="codeDebounce"
                 onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))'
                 maxlength="8">
          <!--倍数-->
          <em>{{$t('lang.lottery.bottom.multiple[3]')}}</em>
        </p>
        <span
                :class="{ 'active': betsNum && Number(multiple) }"
                :disabled="betsNum < 1"
                class="add-btn"
                @click="addNode">
          <!--添加注单-->
          {{$t('lang.lottery.bottom.tools[1]')}}
        </span>
      </div>
    </div>
    <ul class="button-group">
      <li>
        <span class="order-list"
              @click="$router.push('/orderList?lotteryId=' + lotteryId)">
          <!--待投注-->
          {{$t('lang.lottery.bottom.tools[2]')}}
          <em v-if="getBetNum > 0" class="calculator">{{ getBetNum }}</em>
      </span>
      </li>
      <li>
        <!-- 玩法投注 -->
        <span :class="{ 'active': betsNum && Number(multiple) }"
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
          <p class="rebate-return">
            <!--返利-->
            <span>{{$t('lang.lottery.bottom.queue.info[0]')}}:{{ rebateNum }}%</span>
          </p>
          <van-slider v-model="rebate"
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
            <div class="amount-multiple">
              <span class="tips"
                    v-html="$t('lang.lottery.bottom.multiple[2]')">
                <!--2元/注-->
              </span>
              <!--           <van-stepper
                          v-model="multiple"
                          step="1"
                          max="50000"
                          integer
                          class="vanInp"
                          @change="codeDebounce"
                        /> -->
              <div class="inputting">
                <input v-model="multiple"
                       onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))' maxlength="8"
                       @input="codeDebounce()"/>
                <!--倍数-->
                <span>{{$t('lang.lottery.bottom.multiple[3]')}}</span>
              </div>
            </div>
          </div>
          <ul class="rebate-nav">
            <li v-for="(item, key) in betMoney"
                :key="key"
                :class="{ checked: key === betMoneyKey }"
                @click="quickMoney(key, item)">
              {{ item }}
              <em>{{$t('lang.lottery.bottom.multiple[3]')}}</em>
            </li>
          </ul>
          <div class="rebate-num">
            <p>
              <!--注数：-->
              {{$t('lang.lottery.bottom.queue.info[1]')}}:
              <span>{{ betsNum }}{{$t('lang.lottery.bottom.queue.info[2]')}}
                <!--注-->
              </span></p>
            <p>
              <!--总额：-->
              {{$t('lang.lottery.bottom.queue.info[3]')}}:
              <span>{{ amount }}{{$t('lang.lottery.bottom.queue.info[4]')}}</span>
            </p>
            <p>
              {{$t('lang.lottery.bottom.queue.info[5]')}}:
              <em>{{!playType ? maxMoney : maxMoney / 2 }}</em>
              <span>{{$t('lang.lottery.bottom.queue.info[4]')}}</span>
            </p>
          </div>
        </div>
        <div class="rebate-btn-wrapper">
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
  import {mapGetters, mapMutations,mapState} from "vuex";
  import {weiGroupSplit} from "../../../utils/PaiLieZuHe";
  import {get_ssc_bet} from "../../../utils/GetSscBet";
  import {get_fu3d_bet} from "../../../utils/GetFu3d";
  import {Dialog, Toast} from "vant";

  export default {
    name: "LotteryFooter",
    data() {
      return {
        isShow: false,
        isRebate: false,
        betDetail: [], // 注单队列
        betList: null, // 下注对象
        codeArr: [], // 号码集合
        addOdds: "", // 最大赔率 - 金额计算
        betsNum: 0, // 下注笔数
        multiple: 1, // 玩法 - 倍数，单注默认2元
        amount: 0, // 总金额
        maxMoney: 0, // 单注最高可获金额
        betInfo: "", // 官方玩法 - 号码集合
        // 加入注单相关类型
        noteList: [], // 注单
        // noteOdds: [], // 赔率
        rebate: 0, // 返利
        betModel: 0, // 0代表元 1代表角 2代表分
        newModel: 1, // 信用玩法 - 1代表元 0.1代表角 0.01代表分
        newModels: 2, // 官方玩法 - 2代表元 0.2代表角 0.02代表分
        moneyType: ["元"], // 金额类型
        betMoneyKey: "", // 快捷金额选项
        betMoney: [10, 100, 1000, 5000, 10000, 50000], // 快捷金额
        content: [], //代投注订单列表
        checkList: [],
        weiList: ["万位", "千位", "百位", "十位", "个位"],
        renErList: [
          "任二直选和值",
          "任二组选复式",
          "任二组选和值",
          "任三直选和值",
          "任三组三",
          "任三组六",
          "任三组选和值",
          "组选24",
          "组选12",
          "组选6",
          "组选4",
        ],
        renErDanShiList: [
          "任二直选单式",
          "任三直选单式",
          "任四直选单式",
          "任二组选单式",
        ],
        twoContentList: ['百拾定位', '百个定位', '拾个定位', '百拾个定位'],
        sscBetlist: [],
        checkGroup: [],
        timer: null,
        addShow: false
      };
    },
    props: {
      lotteryName: String, // 彩种名称
      menu: String, // 菜单
      lotteryId: String, // 游戏ID
      // 玩法类型 - 默认信用玩法
      playType: {
        type: Boolean,
        default: false,
      },
      userRebate: Number, // 用户赔率
      firstSelected: Number, // 一级菜单
      secondSelected: Number, // 二级菜单
    },
    computed: {
      ...mapState([
        'balance'
      ]),
      ...mapGetters(["userInfo", "lotteryStatus", "lotteryNum", "betListAll"]),
      // 用户余额
      userAmount() {
        let amount = "";
        this.$cookie.get("token")
          ? (amount = parseFloat(this.balance).toFixed(2))
          : "";
        return amount;
      },
      rebateNum() {
        return this.rebate.toFixed(1);
      },
      // 期号
      turnNum() {
        return this.lotteryNum;
      },
      // 单注金额
      singAmount() {
        return this.amount / this.betsNum;
      },
      //获取注单数
      getBetNum() {
        if (this.betListAll === null) {
          return 0;
        } else {
          let betListAll = JSON.parse(this.betListAll);
          return betListAll.content.length;
        }
      },
    },
    watch: {
      multiple(val) {
        this.amount = parseFloat(2 * this.betsNum * val).toFixed(2);
        this.maxMoney = parseFloat(this.multiple * this.addOdds * 2).toFixed(2);
      },
      betsNum() {
        this.$emit("betsNum", this.betsNum);
      },
      firstSelected() {
        this.clearCode();
      },
      secondSelected() {
        this.clearCode();
      },
    },
    created() {
      let betListAll = JSON.parse(localStorage.getItem("betListAll")) || "";
      if (betListAll !== "") {
        this.SET_LOTTERY_BET(JSON.stringify(betListAll));
      }
    },
    methods: {
      ...mapMutations("lottery", ["SET_LOTTERY_BET"]),
      // 投注
      betting() {
        if (!Number(this.multiple)) return;
        if (!this.userAmount) {
          return Dialog.confirm({
            title: this.$t('lang.lottery.dialog.title'),
            message: this.$t('lang.lottery.dialog.warning[0]'),
            cancelButtonText:this.$t('lang.lottery.bottom.queue.btn[0]'),
            confirmButtonText:this.$t('lang.lottery.bottom.queue.btn[1]')
            }
          ).then(() => {
            this.SET_LOTTERY_BET(null);
            this.$router.push("/login");
          }).catch(() => {
          });
        }
        if (this.lotteryStatus !== 0 || !this.turnNum){
          // 期号变更中，请稍后！
          return Toast.fail(this.$t('lang.lottery.dialog.warning[1]'))
        }

        // if (Number(this.amount) > Number(this.userAmount)){
        //   // 余额不足，请充值！
        //   return Toast.fail(this.$t('lang.lottery.dialog.warning[2]'))
        // }
        this.isShow = true;
        // 信用玩法投注
        if (!this.playType) {
          let params = this.codeReset();
          this.$http.home.bet(params).then((res) => {
              // 投注成功！
              Toast.success(this.$t('lang.lottery.dialog.warning[3]'))
              this.$EventBus.$emit("getMoney");
              this.clearCode();
            }).catch((res) => {
              if (res && res.data) {
                this.$toast.fail(res.data.msg);
              } else {
                // 请求超时，请重新下注
                this.$toast.fail(this.$t('lang.lottery.dialog.warning[4]'))
              }
            }).finally(() => {
              this.isShow = false;
            });
        }
        else { //官方玩法投注
          let params = this.firstMenu.name.indexOf("特殊号") === -1
              ? this.codeReset_Gf()
              : this.codeReset();
          this.$http.home.bet_Gf(params).then((res) => {
            // 投注成功！
            Toast.success(this.$t('lang.lottery.dialog.warning[3]'))
              this.$EventBus.$emit("getMoney");
              this.clearCode();
            }).catch((res) => {
              if (res && res.data) {
                this.$toast.fail(res.data.msg);
              } else {
                // 请求超时，请重新下注
                this.$toast.fail(this.$t('lang.lottery.dialog.warning[4]'))
              }
            }).finally(() => {
              this.isShow = false;
            });
        }
      },
      // 官方玩法投注列表格式化
      codeReset_Gf() {
        // betInfo: "1|6|2|1|2" //投注号码组合
        // betModel: 0  投注单位
        // canWinMoney: 197998 //可以赢的钱
        // cateName: "五星复式" //投注名称
        // code: "92610201101" //投注的序列号
        // money: 2 //每注多少钱
        // multiple: 1 /倍速
        // odds: "198000" //赔率
        // poschoose: null
        // rebate: 0 //返点
        // showContent: "1|6|2|1|2" //展示的号码
        // totalMoney: 2 //总投注金额
        // totalNums: 1  //注数
        console.log(this.betList,'this.betListthis.betList');
        let odds =
          this.rebate === 0
            ? this.betList.addOdds
            : parseFloat(
            (
              this.betList.minOdds +
              (((this.betList.maxOdds - this.betList.minOdds) /
                this.betList.rebate) *
                (this.userRebate - this.rebate)) /
              100
            ).toFixed(4)
            );
        let content = [];
        //组合类赔率判断
        if (this.betList.zh_odds.length > 1) {
          if (this.rebate === 0) {
            let newOddsList = [];
            this.betList.zh_odds.forEach((item) => {
              newOddsList.push(item[2]);
            });
            odds = newOddsList
              .sort((a, b) => {
                return b - a;
              })
              .toString();

          } else {
            let newOddsList1 = [];
            this.betList.zh_odds.forEach((item) => {
              newOddsList1.push(
                parseFloat(
                  (
                    item[0] +
                    (((item[1] - item[0]) / this.betList.rebate) *
                      (this.userRebate - this.rebate)) /
                    100
                  ).toFixed(4)
                )
              );
            });
            odds = newOddsList1
              .sort((a, b) => {
                return b - a;
              })
              .toString();
          }
        }
        //判断是否定位胆
        if (this.betList.name === "定位胆") {
          this.checkList.forEach((cItem, cKeys) => {
            if (cItem.length > 0) {
              content.push({
                betInfo: cItem.join(),
                betModel: this.betModel,
                cateName: this.betList.cateName,
                code: this.betList.code,
                money: this.newModels,
                multiple: this.multiple,
                odds: odds,
                poschoose: cKeys,
                poschooseName: this.weiList[cKeys],
                rebate: this.rebate,
                showContent: cItem.join() + `(${this.weiList[cKeys]})`,
                totalMoney: Number(
                  parseFloat(2 * cItem.length * this.multiple).toFixed(2)
                ),
                totalNums: cItem.length,
                isGf: true,
              });
            }
          });
        }
        else if (this.betList.name === "任二直选复式" || this.betList.name === "任三直选复式" || this.betList.name === "任四直选复式") {
          this.sscBetlist.forEach((bItem, bKeys) => {
            let poschooseName = this.weiList[bItem.index[0]] + "," + this.weiList[bItem.index[1]];
            content.push({
              betInfo: bItem.num.join("|"),
              betModel: this.betModel,
              cateName: this.betList.cateName,
              code: this.betList.code,
              money: this.newModels,
              multiple: this.multiple,
              odds: odds,
              poschoose: bItem.index.join(),
              poschooseName,
              rebate: this.rebate,
              showContent: bItem.num.join("|") + `(${poschooseName})`,
              totalMoney: 2 * this.multiple,
              totalNums: 1,
              isGf: true,
            });
          });
        }
        else if (this.renErList.includes(this.betList.name) || this.renErDanShiList.includes(this.betList.name)) {
          let groupKey = 4;
          if (this.betList.name.indexOf("任二") !== -1) {
            groupKey = 2;
          } else if (this.betList.name.indexOf("任三") !== -1) {
            groupKey = 3;
          }
          let weiGroupList = weiGroupSplit(this.checkGroup.sort(), groupKey);
          let weiTotalNums = this.renErDanShiList.includes(this.betList.name)
            ? this.checkList[0].length
            : this.sscBetlist.length / weiGroupList.length;
          weiGroupList.forEach((wItem, wKey) => {
            let poschooseName =
              this.weiList[wItem[0]] + "," + this.weiList[wItem[1]];
            content.push({
              betInfo: this.betInfo,
              betModel: this.betModel,
              cateName: this.betList.cateName,
              code: this.betList.code,
              money: this.newModels,
              multiple: this.multiple,
              odds: odds,
              poschoose: wItem.join(),
              poschooseName,
              rebate: this.rebate,
              showContent: this.betInfo + `(${poschooseName})`,
              totalMoney: Number(2 * weiTotalNums * this.multiple),
              totalNums: weiTotalNums,
              isGf: true,
            });
          });
        } else {
          content = [
            {
              betInfo: this.betInfo,
              betModel: this.betModel,
              cateName: this.betList.cateName,
              code: this.betList.code,
              money: this.newModels,
              multiple: this.multiple,
              odds: odds,
              poschoose: "",
              poschooseName: "",
              rebate: this.rebate,
              showContent: this.betInfo,
              totalMoney: Number(this.amount),
              totalNums: this.betsNum,
              isGf: true,
            },
          ];
        }
        // if()
        let params = {
          gameId: this.lotteryId,
          turnNum: this.turnNum,
          content,
        };
        return params;
      },

      // 信用玩法投注列表格式化
      codeReset() {
        let params = {
          gameId: this.lotteryId,
          turnNum: this.turnNum,
          content: [],
        };
        // betInfo: "0" 投注数字
        // betModel: 0  投注单位 元
        // cateName: "一字组合" 投注名称
        // code: "26101101" 编号
        // kyje: "21.30"  可以赢的钱，需要根据返点算
        // money: 1  注数 固定1
        // multiple: 10 一住多少钱
        // odds: 2.13 赔率
        // rebate: 0  返点
        // totalMoney: "10.00" 总的投注金额
        // totalNums: 1 注数
        this.betDetail.map((val, key) => {
          if (!this.playType) {
            if (this.twoContentList.includes(val.cateName)) {
              let valList = val.value.split('|')
              valList.forEach((res) => {
                params.content.push({
                  betInfo: res,
                  betModel: 0,
                  cateName: val.cateName,
                  code: val.code,
                  kyje: val.addOdds * this.amount,
                  money: 1,
                  multiple: 2 * this.multiple,
                  odds: val.addOdds,
                  rebate: this.rebate,
                  totalMoney: 2 * this.multiple,
                  totalNums: 1,
                });
              })
            } else {
              params.content.push({
                betInfo: val.value,
                betModel: 0,
                cateName: val.cateName,
                code: val.code,
                kyje: val.addOdds * this.amount,
                money: 1,
                multiple: 2 * this.multiple,
                odds: val.addOdds,
                rebate: this.rebate,
                totalMoney: 2 * this.multiple,
                totalNums: 1,
              });
            }

          }
          else {
            params.content.push({
              betInfo: val.value,
              betModel: 0,
              isIncludeDraw: true,
              poschoose: null,
              poschooseName: "",
              showContent: "豹子",
              cateName: val.cateName,
              code: val.code,
              money: 2,
              multiple: this.multiple,
              odds: val.addOdds,
              rebate: this.rebate,
              totalMoney: 2 * this.multiple,
              totalNums: 1,
            });
          }
        });
        this.content = params.content;
        console.log(params,'paramsparams');
        return params;
      },
      // 添加注单
      addNode() {
        if (!Number(this.multiple)) return;
        this.noteList = JSON.parse(JSON.stringify(this.betDetail));
        this.isRebate = true;
        this.addShow = false
        sessionStorage.setItem("betMoney", this.multiple);
      },
      // 反水设定
      onRebate(val) {
        this.rebate = Number(val.toFixed(1));
      },
      // 金额类型选择
      selectType(key) {
        this.betModel = key;
        key
          ? key === 1
          ? (this.newModel = 0.1)
          : (this.newModel = 0.01)
          : (this.newModel = 1);
        key
          ? key === 1
          ? (this.newModels = 0.2)
          : (this.newModels = 0.02)
          : (this.newModels = 2);
      },
      // 金额输入限制
      codeDebounce() {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.setMu();
          this.timer = null;
        }, 100);
      },
      setMu(bool) {
        if (this.multiple > 50000) this.multiple = 50000;
      },
      // 快捷金额选项
      quickMoney(key, val) {
        this.betMoneyKey = key;
        this.multiple = val;
      },
      // 添加注单防止重复点击
      isNoteDebounce() {
        if (!this.addShow) {
          this.isNote();
          this.addShow = true
        }
      },
      // 确认添加
      isNote() {
        if (this.rebate) {
          // 信用计算反水
          this.betDetail.map((item) => {
            item.addOdds = parseFloat(
              (
                item.minOdds +
                (((item.maxOdds - item.minOdds) / item.rebate) *
                  (this.userRebate - this.rebate)) /
                100
              ).toFixed(4)
            );
          });
        }
        let params;
        if (!this.playType) {
          params = this.codeReset();
        } else {
          params =
            this.firstMenu.name.indexOf("特殊号") === -1
              ? this.codeReset_Gf()
              : this.codeReset();
        }
        if (this.betListAll === null) {
        } else {
          let betListAll = JSON.parse(this.betListAll);
          let betContent = params.content.concat(betListAll.content);
          params.content = betContent;
        }
        this.SET_LOTTERY_BET(JSON.stringify(params));
        this.cancelBet();
        this.clearCode();
      },
      // 取消注单
      cancelBet() {
        this.rebate = 0;
        this.betModel = 0;
        this.newModel = 1;
        this.newModels = 2;
        this.betMoneyKey = "";
        this.betDetail = this.noteList;
        this.multiple = sessionStorage.getItem("betMoney");
        this.isRebate = false;
        this.addShow = false
      },
      // 清空
      clearCode() {
        this.betsNum = 0;
        this.multiple = 1;
        this.$EventBus.$emit("clearCode");
      },
    },
    mounted() {
      /**
       * 信用玩法
       * firstMenu - 该玩法的配置信息
       * codeArr - 号码集合
       * detail - 注单集合
       * betOdds - 赔率组合 - 计算最大赔率
       */
      this.$EventBus.$on("chooseNum", (firstMenu, codeArr, detail, betOdds) => {
        // console.log(firstMenu, codeArr, detail, betOdds,'ssc-footer');
        // 清空号码
        if (!codeArr) {
          this.betsNum = 0;
          this.multiple = 1;
          return;
        }
        console.log(betOdds,'betOddsbetOdds');
        console.log(detail,'detaildetail');
        let newBetOdds = JSON.parse(betOdds);
        this.firstMenu = JSON.parse(firstMenu);
        this.betDetail = JSON.parse(detail);
        this.betList = detail[detail.length - 1];
        this.codeArr = JSON.parse(codeArr);
        this.betsNum = this.codeArr.length;
        // 最大赔率计算
        this.addOdds = newBetOdds.sort((a, b) => b - a)[0];
        this.amount = parseFloat(2 * this.multiple * this.betsNum).toFixed(2);
        this.maxMoney = parseFloat(this.multiple * this.addOdds * 2).toFixed(2);
      });

      /**
       * 官方玩法
       * firstMenu - 该玩法的配置信息
       * checkList- 投注选中数组
       * checkGroup- 任选类要用的位置数组
       * weiLength - 位数的组合
       */
      this.$EventBus.$on("chooseNum_Gf", (firstMenu, checkList, checkGroup, weiLength) => {
        if (!firstMenu) {
          this.betsNum = 0;
          this.multiple = 1;
          return;
        }
        this.firstMenu = JSON.parse(firstMenu);
        this.betList = this.firstMenu.del;
        this.checkList = JSON.parse(checkList);
        this.checkGroup = JSON.parse(checkGroup);
        let betInfo = "";
        if (this.firstMenu.name.indexOf("单式") !== -1) {
          if (this.renErDanShiList.includes(this.betList.name)) {
            this.betsNum = this.checkList[0].length * weiLength
          } else {
            this.betsNum = this.checkList[0].length;
          }
          this.checkList[0].forEach((item) => {
            betInfo = betInfo + item.split("").join(",") + "|";
          });
          betInfo = betInfo.substr(0, betInfo.length - 1);
          console.log(betInfo,'betInfo--单式');
        } else {
          /*
           * 计算注数
           */
          console.log(this.firstMenu.name, this.checkList, this.checkGroup,'计算株数');
          let sscBetlist =
            this.lotteryName === "ssc"
              ? get_ssc_bet(this.firstMenu.name, this.checkList, this.checkGroup)
              : get_fu3d_bet(
              this.firstMenu.name,
              this.checkList,
              );
          console.log(sscBetlist,'sscBetlist');
          this.betsNum =
            this.firstMenu.name.indexOf("组合") !== -1
              ? sscBetlist.length * this.firstMenu.del.zh_odds.length
              : sscBetlist.length;
          /*
           * 投注内容处理
           */

          if (this.checkList.length === 1) {
            betInfo = this.checkList[0].join("|");
          } else {
            this.checkList.forEach((_check) => {
              betInfo = betInfo + _check.toString() + "|";
            });
            betInfo = betInfo.substr(0, betInfo.length - 1);
          }
          this.sscBetlist = sscBetlist;
        }
        this.betInfo = betInfo;
        if (this.betList.zh_odds.length === 0) {
          this.addOdds = this.betList.addOdds;
        } else {
          let zh_odds_new = [];
          this.betList.zh_odds.forEach((item) => {
            zh_odds_new.push(item[2]);
          });
          this.addOdds = Math.max(...zh_odds_new);
        }
        this.amount = parseFloat(2 * this.betsNum * this.multiple).toFixed(2);
        this.maxMoney = parseFloat(this.multiple * this.addOdds * 2).toFixed(2);
        console.log(this.amount,this.maxMoney,this.betsNum,this.multiple,this.addOdds,'---aadddd');
      });
    },
    beforeDestroy() {
      // 移除事件监听
      this.$EventBus.$off();
    },
  };
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
          color: #908fb1;
          font-size: 12px;
          display: flex;
          align-items: center;
          input {
            width: 1.4rem;
            height: .6rem;
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
        top: 0;
        left: 59%;
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
