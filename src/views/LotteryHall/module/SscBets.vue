// 时时彩和福彩3d的投注区域
<template>
  <div class="betDetails">
    <!-- 玩家金额 -->
    <div class="random">
      <span @click="$toast($t('lang.lottery.toast[0]'))">
        <i class="iconfont iconic-random"></i>
        <!--摇一摇机选-->
        <em>{{$t('lang.lottery.randomAndTips[0]')}}</em>
      </span>
      <!--      <span style="flex: 2" v-if="userAmount">余额：{{ userAmount }}{{ userAmount1 }}</span>-->
      <span @click="showTips()">
        <!--玩法提示-->
        <em>{{$t('lang.lottery.randomAndTips[1]')}}</em>
        <i class="iconfont iconic-info2"></i>
      </span>
    </div>
    <!-- 下注区域 -->
    <NotData v-if="isLoading" :isNotData="isLoading"/>
    <div v-else class="content-wrapper">
      <div class="bet-content" :class="{ betIsSecond: isSecond }">
        <div class="ssc"
             ref="bets">
          <!-- 信用玩法 -->
          <div v-if="!firstMenu.isOfficial"
               class="classic-method">
            <van-collapse v-model="activeNames"
                          :border="false"
                          v-for="(item, key) in firstMenu.children"
                          :key="key">
              <van-collapse-item v-if="item.detail.length > 0"
                                 :title="item.name"
                                 :name="key"
                                 style="text-align:left;">
                <!-- 福彩三d,二字选择 -->
                <div class="is-codes"
                     v-if="titleList.includes(item.detail[0].name)">
                  <div class="is-codes-item">
                    <van-divider :style="{ margin: '0.1rem 0' }">
                      {{ item.detail[0].name.indexOf('百') === -1 ? '拾' : '百' }}
                    </van-divider>
                    <ul class="number-content">
                      <li v-for="val in 10"
                          :key="val-1">
                        <div @click="betCheckWei(val-1,0,item)"
                             :class="{ active: item.detail[0].name==='百拾定位'?twoList[0].includes(val-1):item.detail[0].name==='百个定位'?twoList1[0].includes(val-1):twoList2[0].includes(val-1)}">
                          <span>{{ val - 1 }}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="is-codes-item">
                    <van-divider :style="{ margin: '0.1rem 0' }">
                      {{ item.detail[0].name.indexOf('个') === -1 ? '拾' : '个' }}
                    </van-divider>
                    <ul class="number-content">
                      <li v-for="val in 10"
                          :key="val-1">
                        <div @click="betCheckWei(val-1,1,item)"
                             :class="{ active: item.detail[0].name==='百拾定位'?twoList[1].includes(val-1):item.detail[0].name==='百个定位'?twoList1[1].includes(val-1):twoList2[1].includes(val-1)}">
                          <span>{{ val - 1 }}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="is-codes"
                     v-else-if="threeList.includes(item.detail[0].name)">
                  <!-- 福彩3d百十个投注 -->
                  <div v-if="item.detail[0].name.indexOf('组选') === -1">
                    <div class="is-codes-item" :key="weiKey"
                         v-for="(wei,weiKey) in ['百','十','个']">
                      <van-divider :style="{ margin: '0.1rem 0' }">{{ wei }}</van-divider>
                      <ul class="number-content">
                        <li v-for="val in 10"
                            :key="val-1">
                          <div :class="{ active: thereList[weiKey].includes(val-1)}"
                               @click="betCheckWei(val-1,weiKey,item)">
                            <span>{{ val - 1 }}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!--组选3，组选6 -->
                  <div class="is-codes-item" v-else>
                    <ul class="number-content">
                      <li v-for="val in 10"
                          :key="val-1">
                        <div @click="betCheckGroup(val-1,item.detail[0])"
                             :class="{ active: item.name==='组选三'?group3.includes(val-1):group6.includes(val-1)}">
                          <span>{{ val - 1 }}</span>
                        </div>

                      </li>
                    </ul>
                  </div>
                </div>
                <!--时时彩和信用选一个投注的普通逻辑 非数字-->
                <ul class="spare-content" v-else>
                  <li v-for="val in item.detail"
                      :key="val.alias">
                    <div @click="betCheck(val)"
                         :class="{ active: val.selected}">
                      <span>{{ val.name }}</span>
                      <i>{{$t('lang.lottery.odds')}}:{{ val.addOdds }}</i>
                    </div>
                  </li>
                </ul>
              </van-collapse-item>
            </van-collapse>
          </div>
          <!-- 官方玩法 -->
          <div v-else class="office-method">
            <!--赔率-->
            <div class="title-odds"
                 v-if="firstMenu.name.indexOf('特殊号') === -1">
              <span>
                <!-- 赔率 -->
                <em>{{$t('lang.lottery.odds')}}:</em>
                <em v-if="firstMenu.del.zh_odds.length>1" class="num">
                  {{parseFloat(firstMenu.del.zh_odds[firstMenu.del.zh_odds.length - 1][2] / 2).toFixed(2)}}~
                  {{ parseFloat(firstMenu.del.zh_odds[0][2] / 2).toFixed(2) }}
                </em>
                <em v-else class="num">{{parseFloat(firstMenu.del.addOdds / 2).toFixed(2)}}</em>
              </span>
            </div>
            <!--<p class="ks_odds clearfix"-->
            <!--v-if="firstMenu.name.indexOf('特殊号') === -1">-->
            <!--<span>-->
            <!--赔率：<em v-if="firstMenu.del.zh_odds.length>1">-->
            <!--{{parseFloat(firstMenu.del.zh_odds[firstMenu.del.zh_odds.length - 1][2] / 2).toFixed(2)}}~-->
            <!--{{ parseFloat(firstMenu.del.zh_odds[0][2] / 2).toFixed(2) }} </em>-->
            <!--<em v-else>{{parseFloat(firstMenu.del.addOdds / 2).toFixed(2)}}</em>-->
            <!--</span>-->
            <!--</p>-->
            <!--任选的tools-->
            <div class="select-tools"
                 v-if="haveCheckList.includes(firstMenu.name)">
              <div class="select-list">
                <van-checkbox-group v-model="checkGroup" direction="horizontal">
                  <van-checkbox @click="checkBtn" name="0">万位</van-checkbox>
                  <van-checkbox @click="checkBtn" name="1">千位</van-checkbox>
                  <van-checkbox @click="checkBtn" name="2">百位</van-checkbox>
                  <van-checkbox @click="checkBtn" name="3">十位</van-checkbox>
                  <van-checkbox @click="checkBtn" name="4">个位</van-checkbox>
                </van-checkbox-group>
              </div>
              <div class="tips">
                <!--温馨提示：你选择了-->
                {{$t('lang.lottery.dialog.title')}}:{{$t('lang.lottery.ssc.tips[0]')}}
                <em>{{ checkGroup.length }}</em>
                <!--个位置,系统会自动根据位置组合成-->
                {{$t('lang.lottery.ssc.tips[1]')}}
                <em>{{ weiLength }}</em>
                <!--个方案-->
                {{$t('lang.lottery.ssc.tips[2]')}}
              </div>
            </div>

            <!-- 复试投注 -->
            <ul v-if="firstMenu.children.length > 0"
                class="compound">
              <li v-for="(item, key) in firstMenu.children"
                  :key="key">
                <div class="title">
                  <span>{{ item.name }}</span>
                  <QuickOption v-if="!notHaveQuick.includes(firstMenu.name)"
                               @betConfig="betConfig(arguments, key)"
                               class="tools"
                               :lotteryName="lotteryName"/>
                </div>
                <!--数字-->
                <ul class="number-content"
                    v-if="firstMenu.name.indexOf('特殊号') === -1">
                  <li v-for="(val, keys) in item.detail"
                      :key="keys">
                    <div @click="betCheck_gf(key, keys, item, val)"
                         :class="{ active: val.selected }">
                      <span>{{ val.alias }}</span>
                    </div>
                  </li>
                </ul>
                <!--非数字-->
                <ul class="spare-content" v-else>
                  <li v-for="(val, keys) in item.detail"
                      :key="keys">
                    <div @click="betCheck(val)"
                         :class="{ active: val.selected}">
                      <span>{{ val.alias }}</span>
                      <!-- 赔率 -->
                      <i class="odds">{{$t('lang.lottery.odds')}}:{{parseFloat(val.addOdds / 2).toFixed(2)}}</i>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            <!-- 单式投注 -->
            <div v-else class="simple-wrapper">
              <div class="wrapper">
                <textarea v-model="singleCode"
                          @input.stop="codeDebounce"></textarea>
              </div>
              <div class="btn-group">
                <span @click="filterCodes">
                  <i class="iconfont iconic-del"></i>
                  <!--删除重复号-->
                  <em>{{$t('lang.lottery.simplexOption[0]')}}</em>
                </span>
                <span @click="singleCode = ''">
                  <i class="iconfont iconic-clear"></i>
                  <!--清空-->
                  <em>{{$t('lang.lottery.simplexOption[1]')}}</em>
                </span>
              </div>
              <p class="tips">
                <!--程序会自动过滤掉不合法的号码。您也可以点击“-->
                {{$t('lang.lottery.simplexTips_3[0]')}}
                <em>{{$t('lang.lottery.simplexOption[0]')}}</em>
                {{$t('lang.lottery.simplexTips_3[1]')}}
                <!--”按钮对输入内容进行格式化。-->
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PlayTips v-if="isShowTips"
              @closeDialog="isShowTips = false"
              :showDialog="isShowTips"
              :lotteryName="lotteryName"
              :firstSelected="firstSelected"
              :firstMenu="firstMenu"
              :isSecond="isSecond"
              :secondSelected="secondSelected"/>
  </div>
</template>

<script>
  import BScroll from "better-scroll";
  import {sortArrayList, towArrayStr,} from "../../../utils/public";
  import {groupSplit} from "../../../utils/PaiLieZuHe";
  import {mapGetters, mapMutations, mapState} from "vuex";

  export default {
    data() {
      return {
        group3: [],//组选3
        group6: [],//组选6
        checkGroup: ["0", "1", "2", "3", "4"],
        activeNames: [0, 1, 2, 3, 4],
        titleList: ["百拾定位", "百个定位", "拾个定位"],
        threeList: ["组选三", "组选六", "百拾个定位"],
        betsNum: 0, // 下注笔数
        codeArr: [], // 下注号码集合
        codeArr1: [], //百十下注号码几行
        betDetail: [], // 注单
        betOdds: [], // 赔率组合
        isShowTips: false,
        resetOdds: "", // 合肖赔率
        singleCode: "",
        weiLength: 10,
        isSimplex: false,
        notHaveQuick: ["特殊号", "后二大小单双", "前二大小单双"],
        haveCheckList: [
          "任二直选单式",
          "任二直选和值",
          "任二组选复式",
          "任二组选单式",
          "任二组选和值",
          "任三直选单式",
          "任三直选和值",
          "任三组三",
          "任三组六",
          "任三组选和值",
          "任四直选单式",
          "组选24",
          "组选12",
          "组选6",
          "组选4",
        ],
        userAmount: "",
        checkList: [[], [], [], [], []],
        twoList: [[], []],//百十定位
        twoList1: [[], []],//百个定位
        twoList2: [[], []],//十个定位
        thereList: [[], [], []],//百十个定位
      };
    },
    components: {
      NotData: (resolve) =>
        require(["../../../commons/notdata/NotData"], resolve),
      PlayTips: (resolve) => require(["./PlayTips"], resolve),
      QuickOption: (resolve) => require(["./QuickOption"], resolve),
    },
    props: {
      lotteryName: String, // 彩种名称
      isLoading: Boolean, // 数据加载
      lotteryId: String, // 彩种ID
      isSecond: Boolean, // 二级菜单是否显示
      firstSelected: Number, // 一级菜单选项
      secondSelected: Number, // 二级菜单选项
      threeSelected: Number, //三级菜单
      visibleNumber: Array, // 数字号码
      visibleNoNumber: Array, // 非数字号码
      bigNum: Number, // 大小数值
      firstMenu: {
        // 菜单数据
        type: [Object, Array],
        default: () => {
          return {};
        },
      },
    },
    computed: {
      ...mapState([
        'balance'
      ]),
      ...mapGetters(["userInfo"]),
      // 用户余额
      userAmount1() {
        if (typeof (this.firstMenu.list) !== 'undefined') {
          this.checkList = JSON.parse(JSON.stringify(this.firstMenu.list));
        }
        this.userAmount = parseFloat(this.balance).toFixed(2);
      },
    },
    watch: {
      firstSelected() {
        this.scroTop();
      },
      secondSelected() {
        this.scroTop();
      },
      threeSelected() {
        this.scroTop();
      },
    },

    methods: {
      ...mapMutations({
        setData: "SET_DATA"
      }),
      ...mapMutations("user", ["SET_USER_INFO"]),
      /**
       * 注单组合（信用玩法）注单不需要排列组合
       * @param item 下注对象
       * @param key 百十的key值
       * @param del 具体数值
       */
      remove(arr, value) {
        let i = arr.length;
        while (i--) {
          if (arr[i] === value) {
            return i;
          }
        }
        return false;
      },
      betCheckGroup(val, item) {
        let name = item.name === '组选三' ? 'group3' : 'group6'
        if (this[name].includes(val)) {
          this[name].splice(this.remove(this[name], val), 1)
        } else {
          this[name].push(val)
        }
        if (this[name].length > 4) {
          this.codeArr.push(this[name].join(','))
          this.betDetail.push(item)
          this.betOdds.push(item.addOdds)
          console.log(this.codeArr, this.betDetail, this.betOdds)
          this.$EventBus.$emit(
            "chooseNum",
            JSON.stringify(this.firstMenu),
            JSON.stringify(this.codeArr),
            JSON.stringify(this.betDetail),
            JSON.stringify(this.betOdds)
          );
        } else {
          this.$EventBus.$emit("chooseNum", false, false);
        }
      },
      /**
       * 注单组合（官方玩法）
       * @param val 选中的值
       * @param key 位数key值
       * @param item 数组具体值
       */
      betCheckWei(val, key, item) {
        if (item.detail[0].name === "百拾定位") {
          this.getVal(this.twoList[key], val)
        } else if (item.detail[0].name === "百个定位") {
          this.getVal(this.twoList1[key], val)
        } else if (item.detail[0].name === "拾个定位") {
          this.getVal(this.twoList2[key], val)
        } else {
          this.getVal(this.thereList[key], val)
        }
        let [list, list1, list2, list3] = [[], [], [], []]
        if (this.twoList[0].length > 0 && this.twoList[1].length > 0) {
          list = sortArrayList(this.twoList);
          item.detail[0].value = list.join('|')
          if (list.length === 1) {
            this.betDetail.push(item.detail[0]);
            this.betOdds.push(item.detail[0].addOdds);
          }
        } else {
          this.betDetail.map((val, key) => {
            if (val.cateName === item.cateName) {
              this.betDetail.splice(key, 1);
              this.betOdds.splice(key, 1);
            }
          });
          list = []
        }
        if (this.twoList1[0].length > 0 && this.twoList1[1].length > 0) {
          list1 = sortArrayList(this.twoList1);
          item.detail[0].value = list1.join('|')
          if (list1.length === 1) {
            this.betDetail.push(item.detail[0]);
            this.betOdds.push(item.detail[0].addOdds);
          }
        } else {
          this.betDetail.map((val, key) => {
            if (val.cateName === item.cateName) {
              this.betDetail.splice(key, 1);
              this.betOdds.splice(key, 1);
            }
          });
          list1 = []
        }
        if (this.twoList2[0].length > 0 && this.twoList2[1].length > 0) {
          list2 = sortArrayList(this.twoList2);
          item.detail[0].value = list2.join('|')
          if (list2.length === 1) {
            this.betDetail.push(item.detail[0]);
            this.betOdds.push(item.detail[0].addOdds);
          }
        } else {
          this.betDetail.map((val, key) => {
            if (val.cateName === item.cateName) {
              this.betDetail.splice(key, 1);
              this.betOdds.splice(key, 1);
            }
          });
          list2 = []
        }
        if (this.thereList[0].length > 0 && this.thereList[1].length > 0 && this.thereList[2].length > 0) {
          list3 = towArrayStr(this.thereList);
          item.detail[0].value = list3.join('|')
          if (list3.length === 1) {
            this.betDetail.push(item.detail[0]);
            this.betOdds.push(item.detail[0].addOdds);
          }
        } else {
          this.betDetail.map((val, key) => {
            if (val.cateName === item.cateName) {
              this.betDetail.splice(key, 1);
              this.betOdds.splice(key, 1);
            }
          });
          list3 = []
        }
        this.codeArr1 = list.concat(list1.concat(list2.concat(list3)))
        this.betsNum = this.betDetail.length;
        if (this.betsNum > 0) {
          //发射数据
          this.$EventBus.$emit(
            "chooseNum",
            JSON.stringify(this.firstMenu),
            JSON.stringify(this.codeArr.concat(this.codeArr1)),
            JSON.stringify(this.betDetail),
            JSON.stringify(this.betOdds)
          );
        } else {
          this.$EventBus.$emit("chooseNum", false, false);
        }

      },
      // getIsTwoOk(item) {

      // }
      getVal(item, val) {
        if (item.includes(val)) {
          item.splice(this.remove(item, val), 1);
        } else {
          item.push(val);
        }
      },
      /**
       * 注单组合（官方玩法）
       * @param item 选中的值
       * @param key 位数key值
       * @param del 第一层对象
       */
      betCheck(item, key, del) {
        console.log(item, key, del);
        console.log('betCheck');
        //betDetail 投注选中数据数组
        //betOdds 赔率数组
        //betsNum 选中的注数
        //codeArr 投注选中的具体数字
        item.selected = !item.selected;
        if (item.selected) {
          this.codeArr.push(item.value);
          this.betDetail.push(item);
          this.betOdds.push(item.addOdds);
        } else {
          this.betDetail.map((val, key) => {
            if (val.value === item.value && val.cateName === item.cateName) {
              this.codeArr.splice(key, 1);
              this.betDetail.splice(key, 1);
              this.betOdds.splice(key, 1);
            }
          });
        }
        console.log(item)
        this.betsNum = this.betDetail.length;
        if (this.betsNum > 0) {
          //发射数据
          this.$EventBus.$emit(
            "chooseNum",
            JSON.stringify(this.firstMenu),
            // JSON.stringify(this.codeArr),
            JSON.stringify(this.codeArr1.concat(this.codeArr)),
            JSON.stringify(this.betDetail),
            JSON.stringify(this.betOdds)
          );
        } else {
          this.$EventBus.$emit("chooseNum", false, false);
        }
      },
      // 定位胆赔率算法
      //每一位的addOdds相加，addOdds根据位数中选的递减2
      /**
       * 注单组合（官方玩法）
       * @param key 第一层key值
       * @param keys 第二层key值
       * @param item 第一层对象
       * @param val 第二层对象
       */
      betCheck_gf(key, keys, item, val) {
        //选中状态
        let checkList = JSON.parse(JSON.stringify(this.checkList));
        if (checkList[key].length > 5 && this.firstMenu.name === '任四直选复式' && !val.selected) {
          return this.$toast("最多选择6位");
        }
        val.selected = !val.selected;
        // 选中数组生成
        if (val.selected) {
          checkList[key].push(val.alias);
        } else {
          checkList.map((_res, _key) => {
            _res.map((_r, _i) => {
              if (_key === key && _r === val.alias) {
                checkList[key].splice(_i, 1);
              }
            });
          });
        }
        this.checkList = checkList;

        /*
         * 判断 每一位是否都选号码
         */
        let isOkey = this.getIsOk();
        if (isOkey) {
          //传信息到投注
          this.$EventBus.$emit(
            "chooseNum_Gf",
            JSON.stringify(this.firstMenu),
            JSON.stringify(this.checkList),
            JSON.stringify(this.checkGroup),
          );
        } else {
          this.$EventBus.$emit("chooseNum_Gf", false, false, false);
        }
      },
      //判断是否出现投注按钮
      getIsOk() {
        let isOkey = true;
        if (this.firstMenu.name === "定位胆") {
          isOkey = false;
          this.checkList.forEach((colt) => {
            if (colt.length > 0) isOkey = true;
          });
        }
        else if (
          this.firstMenu.name === "任二直选复式" ||
          this.firstMenu.name === "任三直选复式" ||
          this.firstMenu.name === "任四直选复式"
        ) {
          isOkey = false;
          let count = 0;
          let maxCount = 1;
          if (this.firstMenu.name === "任三直选复式") {
            maxCount = 2;
          } else if (this.firstMenu.name === "任四直选复式") {
            maxCount = 3;
          }
          this.checkList.forEach((colt) => {
            if (colt.length > 0) {
              count += 1;
            }
          });
          if (count > maxCount) {
            isOkey = true;
          }
        } else {
          this.checkList.forEach((colt) => {
            if (colt.length === 0) isOkey = false;
          });
        }
        return isOkey;
      },
      // 手动输入号码节流操作
      codeDebounce() {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.filterCodes();
          this.timer = null;
        }, 1000);
      },
      //获取单试分割值
      getNum() {
        let i = 5;
        if (this.firstMenu.name.indexOf("二") !== -1) {
          i = 2;
        } else if (this.firstMenu.name.indexOf("三") !== -1) {
          i = 3;
        } else if (this.firstMenu.name.indexOf("四") !== -1) {
          i = 4;
        }
        return i;
      },
      // 手动输入号码过滤
      filterCodes() {
        let [newCode, arrCode, newArr, codeList] = ["", "", [], []];
        let danKey = this.getNum();
        this.singleCode = this.singleCode.replace(/[\r\n]/g, " ");
        // 过滤特殊字符
        newCode = this.singleCode.replace(/[^\d]/g, "");
        // 号码分组
        for (let i = 0; i < newCode.length; i += danKey) {
          newArr.push(newCode.slice(i, i + danKey));
        }
        // 筛选合适的号码
        newArr.map((val) => {
          //去组选重复值
          if (val.length === danKey) {
            if (this.firstMenu.name.indexOf("二组选") !== -1) {
              if (val.split('')[0] !== val.split('')[1]) {
                codeList.push(val);
              }
            } else {
              codeList.push(val);
            }
          }
        });
        let singLeList = Array.from(new Set(codeList));
        this.singleCode = singLeList.join();
        this.checkList = [singLeList];
        console.log([singLeList],'[singLeList][singLeList]');
        if (singLeList.length > 0) {
          //传信息到投注
          this.$EventBus.$emit(
            "chooseNum_Gf",
            JSON.stringify(this.firstMenu),
            JSON.stringify([singLeList]),
            JSON.stringify(this.checkGroup),
            this.weiLength,
          );
        } else {
          this.$EventBus.$emit("chooseNum_Gf", false, false, false);
        }
      },
      // 大小单双
      betConfig(config, key) {
        let [fig, detail, checkList] = [
          config[0],
          this.firstMenu.children[key].detail,
          this.checkList[key],
        ];
        // 清空
        detail.map((item, keys) => {
          item.selected = true;
          this.betCheck_gf(key, keys, detail, item);
        });
        switch (fig) {
          case "big":
            let index =
              Number(detail[0].alias) === 0
                ? Math.floor(detail.length / 2) - 1
                : Math.floor(detail.length / 2);
            detail.map((item, keys) => {
              if (Number(item.alias) > index) {
                this.betCheck_gf(key, keys, detail, item);
              }
            });
            break;
          case "small":
            var index1 =
              Number(detail[0].alias) === 0
                ? Math.floor(detail.length / 2)
                : Math.floor(detail.length / 2) + 1;
            detail.map((item, keys) => {
              if (Number(item.alias) < index1) {
                this.betCheck_gf(key, keys, detail, item);
              }
            });
            break;
          case "single":
            detail.map((item, keys) => {
              if (Number(item.alias) % 2 !== 0) {
                this.betCheck_gf(key, keys, detail, item);
              }
            });
            break;
          case "double":
            detail.map((item, keys) => {
              if (Number(item.alias) % 2 === 0) {
                this.betCheck_gf(key, keys, detail, item);
              }
            });
            break;
          case "qu":
            detail.map((item, keys) => {
              this.betCheck_gf(key, keys, detail, item);
            });
          case "clear":
            break;
        }
      },
      // 回到顶部，清除选项
      scroTop() {
        this.$refs.bets.scrollTop = 0;
        this.checkGroup = ["0", "1", "2", "3", "4"],
          this.clearCode();
        this.getWeiLength();
      },
      // 清空号码
      clearCode() {
        this.betsNum = 0;
        this.resetOdds = "";
        this.codeArr = [];
        this.playOdds = [];
        this.betDetail = [];
        this.betOdds = [];
        this.twoList = [[], []],//百十定位
          this.twoList1 = [[], []],//百个定位
          this.twoList2 = [[], []],//十个定位
          this.thereList = [[], [], []],//百十个定位
          this.group3 = [],//组选3
          this.group6 = [],//组选6
          this.activeNames = [0, 1, 2, 3, 4];
        this.singleCode = "";
        this.$EventBus.$emit("chooseNum_Gf", false);
        if (this.firstMenu.isOfficial) {
          this.checkList = JSON.parse(JSON.stringify(this.firstMenu.list));
        }
        this.firstMenu.children.map((item) => {
          item.detail.map((val) => (val.selected = false));
        });
      },
      // 设置sliderGroup宽度
      _setSliderWidth() {
        let [children, sliderWidth] = [this.$refs.sliderGroup.children, 0];
        const clientWidth = children[0].clientWidth;
        for (let i = 0; i < children.length; i++) sliderWidth += clientWidth;
        this.$refs.sliderGroup.style.cssText = `width: ${sliderWidth + 5}px`;
      },
      // 横向滚动属性
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true, // 横向滚动
          scrollY: false, // 不允许纵向滚动
          click: true,
          momentum: false, // 当快速滑动时是否开启滑动惯性
        });
      },
      showTips() {
        this.isShowTips = true;
      },
      getWeiLength() {
        if (this.firstMenu.name.indexOf("任二") !== -1) {
          this.weiLength = groupSplit(this.checkGroup, 2).length;
        } else if (this.firstMenu.name.indexOf("任三") !== -1) {
          this.weiLength = groupSplit(this.checkGroup, 3).length;
        } else if (this.firstMenu.name.indexOf("任四") !== -1) {
          this.weiLength = groupSplit(this.checkGroup, 4).length;
        }
      },
      checkBtn() {
        this.getWeiLength();
        this.$EventBus.$emit(
          "chooseNum_Gf",
          JSON.stringify(this.firstMenu),
          JSON.stringify(this.checkList),
          JSON.stringify(this.checkGroup),
          this.weiLength,
        );
      },
    },
    created() {
      this.userAmount = this.$cookie.get("token")
        ? parseFloat(this.balance).toFixed(2)
        : "";
      console.log(this.firstMenu, "this.firstMenu")
      // if (this.firstMenu.isOfficial) {
      //
      // }
    },
    mounted() {
      // 清空
      this.$EventBus.$on("clearCode", (key) => {
        this.scroTop(key);
      });
      // 菜单选择
      this.$EventBus.$on("isSecond", () => {
        setTimeout(() => {
          this._setSliderWidth();
          this._initSlider();
        }, 10);
      });
      // 金额重新获取
      this.$EventBus.$on("getMoney", () => {
        this.$http.users.getMoney().then((res) => {
          let money = res.data.money;
          // this.userInfo.money = money;
          this.setData({key: 'balance', value: money})
          this.userAmount = this.$cookie.get("token")
            ? parseFloat(money).toFixed(2)
            : "";
          // this.SET_USER_INFO(this.userInfo);
        });
      });
      // 合肖赔率更新
      this.$EventBus.$on("resetOdds", (val) => {
        this.resetOdds = val;
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
    $common-font-color: #9a9aa7;
    $common-color-red: #ff2525;
    $common-bg-color: #38364a;
    $common-bg-light-color: #4C4A64;
    $border-color: #605c7b;
    .betDetails {
      color: #9fa7b3;
      background: #44425E;
      .random {
        color: #9fa7b3;
      }
      .content-wrapper {
        .bet-content {
          background: $common-bg-light-color;
          // 修改公共头
          /deep/ .van-cell__title,
          /deep/ .van-cell__right-icon {
            color: $common-font-color;
          }
          /deep/ .van-collapse-item__content {
            background: $common-bg-light-color;
          }
          .ssc {
            background: $common-bg-light-color;
            /deep/ .van-collapse-item__content {
              background: $common-bg-light-color;
            }
            .office-method {
              .title-odds {
                span {
                  border: solid 1px $border-color;
                  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                  background: $common-bg-color;
                  .num {
                    color: $common-color-red;
                  }
                }
              }
              .select-tools {
                .select-list {
                  /deep/ div[aria-checked="false"] {
                    .van-icon {
                      border: 1px solid $common-font-color;
                    }
                    .van-checkbox__label {
                      color: $common-font-color;
                    }
                  }
                  /deep/ div[aria-checked="true"] {
                    .van-icon {
                      color: #000;
                      border: 1px solid #FFEAC0;
                      background-image: linear-gradient(to bottom, #FFEAC0, #FFD681);
                    }
                    /deep/ .van-checkbox__label {
                      color: #fff;
                    }
                  }
                }
                .tips {
                  color: $common-font-color;
                  em {
                    color: $common-color-red;
                  }
                }
              }
              ul.compound {
                & > li {
                  ul.number-content {
                    li {
                      div {
                        span {
                          border: solid 1px $border-color;
                          background-color: $common-bg-color;
                          color: $common-font-color;
                        }
                        &.active {
                          span {
                            background-color: $common-color-red;
                            color: #fff;
                            border: solid 1px $common-color-red;
                          }
                        }
                      }
                    }
                  }
                  ul.spare-content {
                    li {
                      & > div {
                        border: solid 1px $border-color;
                        background-color: $common-bg-color;
                        color: $common-font-color;
                        &.active {
                          border: solid 1px #ffd57d;
                          span {
                            color: #ffd57d;
                          }
                        }
                        i {
                          color: $common-color-red;
                        }
                      }
                    }
                  }
                }
              }
              .simple-wrapper {
                .wrapper {
                  textarea {
                    border: solid 1px $border-color;
                    background-color: $common-bg-color;
                  }
                }
                .btn-group {
                  span {
                    &:first-child {
                      border-right: 1px solid $common-bg-color;
                    }
                  }
                }
                .tips {
                  em {
                    color: $common-color-red;
                  }
                }
              }
            }
            .classic-method {
              ul.number-content {
                li {
                  div {
                    span {
                      border: solid 1px $border-color;
                      background-color: $common-bg-color;
                      color: $common-font-color;
                    }
                    i {
                      color: $common-color-red;
                    }
                    &.active {
                      span {
                        background-color: $common-color-red;
                        color: #fff;
                        border: solid 1px $common-color-red;
                      }
                    }
                  }
                }

              }
              ul.spare-content {
                li {
                  & > div {
                    border: solid 1px $border-color;
                    background-color: $common-bg-color;
                    color: $common-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: $common-color-red;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .skin-black {
    $common-font-color: #9a9aa7;
    $common-color-red: #d11213;
    $common-bg-color: #2D2E35;
    $common-bg-light-color: #24252D;
    $border-color: #444555;
    .betDetails {
      color: #9fa7b3;
      background: #191B1F;
      .random {
        color: #9fa7b3;
      }
      .content-wrapper {
        .bet-content {
          background: $common-bg-light-color;
          // 修改公共头
          /deep/ .van-cell__title,
          /deep/ .van-cell__right-icon {
            color: $common-font-color;
          }
          /deep/ .van-collapse-item__content {
            background: $common-bg-light-color;
          }
          .ssc {
            background: $common-bg-light-color;
            /deep/ .van-collapse-item__content {
              background: $common-bg-light-color;
            }
            .office-method {
              .title-odds {
                span {
                  border: solid 1px $border-color;
                  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                  background: #202225;
                  .num {
                    color: $common-color-red;
                  }
                }
              }
              .select-tools {
                .select-list {
                  /deep/ div[aria-checked="false"] {
                    .van-icon {
                      border: 1px solid $common-font-color;
                    }
                    .van-checkbox__label {
                      color: $common-font-color;
                    }
                  }
                  /deep/ div[aria-checked="true"] {
                    .van-icon {
                      color: #000;
                      border: 1px solid #FFEAC0;
                      background-image: linear-gradient(to bottom, #FFEAC0, #FFD681);
                    }
                    /deep/ .van-checkbox__label {
                      color: #fff;
                    }
                  }
                }
                .tips {
                  color: $common-font-color;
                  em {
                    color: $common-color-red;
                  }
                }
              }
              ul.compound {
                & > li {
                  ul.number-content {
                    li {
                      div {
                        span {
                          border: solid 1px $border-color;
                          background-color: $common-bg-color;
                          color: $common-font-color;
                        }
                        &.active {
                          span {
                            background-color: $common-color-red;
                            color: #fff;
                            border: solid 1px $common-color-red;
                          }
                        }
                      }
                    }
                  }
                  ul.spare-content {
                    li {
                      & > div {
                        border: solid 1px $border-color;
                        background-color: $common-bg-color;
                        color: $common-font-color;
                        &.active {
                          border: solid 1px #ffd57d;
                          span {
                            color: #ffd57d;
                          }
                        }
                        i {
                          color: $common-color-red;
                        }
                      }
                    }
                  }
                }
              }
              .simple-wrapper {
                .wrapper {
                  textarea {
                    border: solid 1px $border-color;
                    background-color: $common-bg-color;
                  }
                }
                .btn-group {
                  span {
                    &:first-child {
                      border-right: 1px solid $common-bg-color;
                    }
                  }
                }
                .tips {
                  em {
                    color: $common-color-red;
                  }
                }
              }
            }
            .classic-method {
              ul.number-content {
                li {
                  div {
                    span {
                      border: solid 1px $border-color;
                      background-color: $common-bg-color;
                      color: $common-font-color;
                    }
                    i {
                      color: $common-color-red;
                    }
                    &.active {
                      span {
                        background-color: $common-color-red;
                        color: #fff;
                        border: solid 1px $common-color-red;
                      }
                    }
                  }
                }

              }
              ul.spare-content {
                li {
                  & > div {
                    border: solid 1px $border-color;
                    background-color: $common-bg-color;
                    color: $common-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: $common-color-red;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .betDetails {
    flex: 1;
    overflow: hidden;
    color: #9fa7b3;
    background: #44425E;
    .random {
      display: flex;
      justify-content: space-between;
      height: 0.6rem;
      padding: 0 0.2rem;
      line-height: 0.6rem;
      color: #9fa7b3;
      font-size: 0.28rem;
      span {
        flex: 1;
        text-align: left;
        i {
          font-size: 0.25rem;
          padding: 0 0.1rem;
        }
        &:last-child {
          text-align: right;
        }
      }
    }
    .content-wrapper {
      height: calc(100% - .6rem);
      padding: 0 0 0.1rem;
      .bet-content {
        height: 100%;
        margin: 0 0.2rem;
        background: #4C4A64;
        // 修改公共头
        /deep/ .van-cell__title {
          color: #9a9aa7;
        }
        /deep/ .van-collapse-item__content {
          background: #4C4A64;
        }
        .ssc {
          height: 100%;
          overflow: scroll;
          background: #4C4A64;
          /deep/ .van-collapse-item__content {
            background: #4C4A64;
          }
          .office-method {
            .title-odds {
              padding: 15px 0 0;
              display: flex;
              align-items: center;
              justify-content: center;
              span {
                padding: 0 0.3rem;
                height: 28px;
                line-height: 26px;
                border: solid 1px #605c7b;
                border-radius: 16px;
                text-align: center;
                -webkit-backdrop-filter: blur(18px);
                backdrop-filter: blur(18px);
                box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                background: #38364A;
                .num {
                  margin: 0 0 0 0.1rem;
                  color: #ff2525;
                  font-weight: bold;
                }
              }
            }
            .select-tools {
              width: 100%;
              padding: 15px 0.2rem 0;
              .select-list {
                display: flex;
                justify-content: center;
                padding: 0 0 10px;
                /deep/ div[aria-checked="false"] {
                  .van-icon {
                    border: 1px solid #9a9aa7;
                  }
                  .van-checkbox__label {
                    color: #9a9aa7;
                  }
                }
                /deep/ div[aria-checked="true"] {
                  .van-icon {
                    color: #000;
                    border: 1px solid #FFEAC0;
                    background-image: linear-gradient(to bottom, #FFEAC0, #FFD681);
                  }
                  /deep/ .van-checkbox__label {
                    color: #fff;
                  }
                }
                /deep/ .van-checkbox {
                  /deep/ .van-checkbox__icon--round .van-icon {
                    border-radius: 2px;
                    width: 1.1em;
                    height: 1.1em;
                    line-height: 1.1em;
                  }
                }
              }
              .tips {
                text-align: justify;
                line-height: 20px;
                color: #9a9aa7;
                font-size: 12px;
                em {
                  color: red;
                }
              }
            }
            ul.compound {
              padding: 10px 0 0;
              & > li {
                .title {
                  padding: 0 0.3rem;
                  display: flex;
                  /*justify-content: space-around;*/
                  align-items: center;
                  & > span {
                    display: block;
                    text-align: left;
                  }
                  .tools {
                    margin: 0 0 0 5px;
                    flex: 1;
                  }
                }
                ul.number-content {
                  padding: 10px 0 0;
                  width: 100%;
                  display: flex;
                  flex-direction: row;
                  flex-wrap: wrap;
                  li {
                    width: calc(100% / 5);
                    margin: 0 0 10px;
                    div {
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                      span {
                        border-radius: 50%;
                        margin: 0 0 5px;
                        font-size: 18px;
                        width: 40px;
                        height: 38px;
                        line-height: 38px;
                        border: solid 1px #605c7b;
                        background-color: #38364a;
                        color: #9a9aa7;
                        text-align: center;
                      }
                      &.active {
                        span {
                          background-color: #d11213;
                          color: #fff;
                          border: solid 1px #d11213;
                        }
                      }
                    }
                  }

                }
                ul.spare-content {
                  width: 100%;
                  display: flex;
                  flex-wrap: wrap;
                  li {
                    width: 33.3%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 0 15px;
                    & > div {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      flex-direction: column;
                      width: 92px;
                      height: 58px;
                      border: solid 1px #605c7b;
                      background-color: #38364a;
                      border-radius: 5px;
                      text-align: center;
                      color: #9a9aa7;
                      &.active {
                        border: solid 1px #ffd57d;
                        span {
                          color: #ffd57d;
                        }
                      }
                      span {
                        font-size: 16px;
                        height: 25px;
                        line-height: 25px;
                        font-weight: bold;
                      }
                      i {
                        color: #f11717;
                      }
                    }
                  }
                }
              }
            }
            .simple-wrapper {
              padding: 15px 0;
              .wrapper {
                width: 100%;
                textarea {
                  border: solid 1px #605c7b;
                  background-color: #38364a;
                  width: 90%;
                  min-height: 30vh;
                }
              }
              .btn-group {
                width: 100%;
                height: 45px;
                display: flex;
                align-items: center;
                justify-content: center;
                span {
                  flex: 1;
                  font-size: 14px;
                  padding: 0 5px;
                  i {
                    font-size: 14px;
                    padding: 0 5px;
                  }
                  &:first-child {
                    text-align: right;
                    border-right: 1px solid #38364a;
                  }
                  &:last-child {
                    text-align: left;
                  }
                }
              }
              .tips {
                padding: 0 .2rem .1rem;
                width: 100%;
                line-height: 18px;
                font-size: 12px;
                text-align: justify;
                em {
                  color: #ff2525;
                }
              }
            }
          }
          .classic-method {
            ul.number-content {
              width: 100%;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              li {
                width: calc(100% / 5);
                margin: 0 0 10px;
                div {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  span {
                    border-radius: 50%;
                    font-size: 18px;
                    width: 40px;
                    height: 38px;
                    line-height: 38px;
                    border: solid 1px #605c7b;
                    background-color: #38364a;
                    color: #9a9aa7;
                    text-align: center;
                  }
                  i {
                    color: #d11213;
                  }
                  &.active {
                    span {
                      background-color: #d11213;
                      color: #fff;
                      border: solid 1px #d11213;
                    }
                  }
                }
              }

            }
            ul.spare-content {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              li {
                width: 33.3%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 0 15px;
                & > div {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-direction: column;
                  width: 92px;
                  height: 58px;
                  border: solid 1px #605c7b;
                  background-color: #38364a;
                  border-radius: 5px;
                  text-align: center;
                  color: #9a9aa7;
                  &.active {
                    border: solid 1px #ffd57d;
                    span {
                      color: #ffd57d;
                    }
                  }
                  span {
                    font-size: 16px;
                    height: 25px;
                    line-height: 25px;
                    font-weight: bold;
                  }
                  i {
                    color: #f11717;
                  }
                }
              }
            }
          }
        }
        .reduce-height {
          height: calc(100% - 1.9rem);
          overflow: scroll;
        }
      }
    }

    .content {
      height: calc(100% - 0.6rem);

      .betCode {
        height: 100%;
        padding: 0 0.2rem;

        .bets {
          overflow: scroll;
          height: 100%;
          //background: white;

          /deep/ .van-collapse-item__content {
            background: none;
            /*padding: 0;*/
          }

          .gf-content {
            .ks_odds {
              padding: 0.2rem 0 0.1rem;

              span {
                float: left;
                background-color: #f2f5f8;
                color: #8f9ab5;
                height: 0.48rem;
                line-height: 0.48rem;
                border-radius: 0 0.3rem 0.3rem 0;
                padding: 0 0.2rem;

                em {
                  color: #c00;
                }
              }
            }

            .gf-check {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              margin-top: 0.2rem;

              .tips {
                font-size: 0.25rem;
                margin-top: 0.1rem;
              }
            }
          }

          .codes-g {
            padding-top: 0.4rem;
          }

          .is-codes {
            display: flex;
            flex-direction: column;

            .is-codes-item {
              display: flex;
              flex-direction: column;

              div {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                color: #333;
                text-align: center;

                strong {
                  position: relative;
                  width: 17%;
                  height: 0.7rem;
                  border: 1px solid #ddd;
                  line-height: 0.7rem;
                  margin-bottom: 0.2rem;
                  border-radius: 4px;
                  text-align: center;
                }

                strong.isSelectedCode {
                  color: white;
                  border-color: #e42012;
                  background: $global-bgcolor;

                  i {
                    color: white;
                  }
                }
              }
            }

          }

          .codes {
            display: flex;
            flex-wrap: wrap;
            padding-top: 0.2rem;
            justify-content: flex-start;
            color: #333;
            text-align: center;

            span {
              width: 16.6%;
              margin-bottom: 10px;
              white-space: normal;

              em {
                display: block;
                width: 0.7rem;
                height: 0.7rem;
                margin: 0 auto 0.1rem;
                border-radius: 50%;
                border: 1px solid #e5e5e5;
                box-shadow: 0 2px 2px #e5e5e5;
                line-height: 0.7rem;
                font-size: 0.32rem;
              }

              em.code-active {
                color: white;
              }

              em.pk_em {
                color: red;
              }

              em.commSd {
                color: white;
                border-color: #e42012;
                background: $global-bgcolor;
              }
            }

            strong {
              position: relative;
              width: 30%;
              height: 1.24rem;
              margin: 0 1.66% 0.4rem;
              border: 1px solid #ddd;
              border-radius: 4px;
              text-align: center;

              em {
                display: block;
                font-size: 0.32rem;
                line-height: 0.5rem;
                font-weight: bold;
              }

              i {
                display: block;
                color: red;
                font-size: 0.26rem;
                line-height: 0.26rem;
                margin-bottom: 0.1rem;
              }

              .zodiacCode span {
                margin-left: 3px;
              }
            }

            strong.tb_sg {
              width: 28%;
              height: 1rem;
              margin: 0 2.66% 0.4rem;
              color: #333;
              font-size: 0.4rem;
              line-height: 1rem;
              border-radius: 0.1rem;
              box-shadow: 0 0.04rem 0.04rem 0 rgba(0, 0, 0, 0.3);
            }

            strong.isPad {
              padding-top: 0.18rem;
            }

            strong.isSelectedCode {
              color: white;
              border-color: #e42012;
              background: $global-bgcolor;

              i {
                color: white;
              }
            }
          }

          .ssc_gf {
            position: relative;

            .g-label {
              line-height: 0.26rem;
              color: #8f9ab5;
            }

            .h-label {
              top: 0.08rem;
            }

            .codes {
              padding-left: 0.4rem;
            }
          }

          .tb_gf .g-label {
            top: 0.26rem;
          }

          .wrapper {
            width: 100%;
            margin: 10% auto 0.4rem;
            padding: 0.28rem 0.2rem;
            background-color: #f2f5f8;
            border: 1px solid #c1cade;

            textarea {
              width: 100%;
              height: 3.3rem;
              padding: 0.2rem;
              background-color: #fff;
              border: 1px solid #c1cade;
              touch-action: none;
            }
          }

          .pk_btn {
            text-align: center;
            margin-bottom: 0.2rem;

            button {
              display: inline-block;
              padding: 5px 10px;
              border-radius: 5px;
              background: #fb8f10;
              color: #fff;
              margin: 0 10px;
              font-size: 0.25rem;
              border: none;
            }
          }

          .tips {
            text-align: left;
            line-height: 0.4rem;
          }
        }

        .bet-op {
          height: calc(100% - 0.8rem);
        }
      }

      .betIsSecond {
        height: calc(100% - 0.8rem);
      }
    }
  }
</style>
