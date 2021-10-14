<template>
  <div class="operation-wrapper">
    <div class="bet-info">
      <div>
        <!--<span>共</span>-->
        <span>{{$t('lang.lottery.bottom.info[0]')}}</span>
        <i>{{betCount}}</i>
        <!--<span>注 共</span>-->
        <span>{{$t('lang.lottery.bottom.info[1]')}}</span>
        <i>{{updateBetMoney()}}</i>
        <span>{{$t('lang.lottery.bottom.info[2]')}}</span>
        <!--<span>元</span>-->
      </div>
      <div>
        <!--<span>单注最多可盈利</span>-->
        <span v-html="$t('lang.lottery.bottom.info[3]')"></span>
        <i>{{updateBonus()}}</i>
        <span>{{$t('lang.lottery.bottom.info[2]')}}</span>
        <!--<span>元</span>-->
      </div>
    </div>
    <div class="operate-btn">
      <span class="clear-all"
            @click="clearAll()">
        <!--清空-->
        {{$t('lang.lottery.bottom.tools[0]')}}
      </span>
      <div>
        <!--元/注-->
        <span v-html="unitMoney + $t('lang.lottery.bottom.multiple[2]')"></span>
        <input v-model="multiple"
               maxlength="8"
               type="number"
               step="1"
               :onkeypress="_formatMultiple()">
        <!--<span>倍</span>-->
        <span>{{$t('lang.lottery.bottom.multiple[3]')}}</span>
      </div>
      <span class="add-list" @click="showDialog">
        <!--添加注单-->
          {{$t('lang.lottery.bottom.tools[1]')}}
      </span>
    </div>
    <!--弹框-->
    <div class="add-list-wrapper" v-show="isShow">
      <div class="rebate-wrapper">
        <h3 class="title">
          <!--注单设定-->
          {{$t('lang.lottery.bottom.queue.title')}}
        </h3>
        <div class="content">
          <p class="return" style="display: none">
            <!--返利-->
            <span>{{$t('lang.lottery.bottom.queue.info[0]')}}:{{rebateNum}}%</span>
          </p>
          <van-slider v-model="sliderValue" style="display: none"
                      :step="0.1"
                      class="slider-tools"
                      :max="maxCode"
                      :min="minCode"
                      @change="updateSlideValue">
            <template #button>
              <div class="rebate-button">
                <div class="rebate-bc"></div>
              </div>
            </template>
          </van-slider>
          <div class="option">
            <div class="amount-multiple">
              <span class="tips"
                    v-html="unitMoney + $t('lang.lottery.bottom.multiple[2]')">
                <!--2元/注-->
              </span>
              <div class="inputting">
                <input v-model="multiple"
                       maxlength="8"
                       type="number"
                       onkeypress="_formatMultiple()">
                <!--倍数-->
                <span>{{$t('lang.lottery.bottom.multiple[3]')}}</span>
              </div>
            </div>
          </div>
          <ul class="nav">
            <li v-for="(item, key) in betMoney"
                :key="key"
                :class="item === multiple?'active':''"
                @click="selectMultiple(item)">
              {{ item }}
              <em>{{$t('lang.lottery.bottom.multiple[3]')}}</em>
            </li>
          </ul>
          <div class="num">
            <p>
              <!--注数：-->
              {{$t('lang.lottery.bottom.queue.info[1]')}}:
              <span>{{betCount}}{{$t('lang.lottery.bottom.queue.info[2]')}}
                <!--注-->
              </span></p>
            <p>
              <!--总额：-->
              {{$t('lang.lottery.bottom.queue.info[3]')}}:
              <span>{{updateBetMoney()}}{{$t('lang.lottery.bottom.queue.info[4]')}}</span>
            </p>
            <p>
              {{$t('lang.lottery.bottom.queue.info[5]')}}:
              <!--<em>{{!playType ? maxMoney : maxMoney / 2 }}</em>-->
              <em>{{updateBonus()}}</em>
              <span>{{$t('lang.lottery.bottom.queue.info[4]')}}</span>
            </p>
          </div>
        </div>
        <div class="btn-wrapper">
          <span @click="addList">{{$t('lang.lottery.bottom.queue.btn[1]')}}</span>
        </div>
        <div class="offset-btn-wrapper">
          <span @click="showDialog"><i class="iconfont iconic-close"></i></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'
  import {lotteryType} from "../../utils/mode";
  import {zx_3fs_3,} from "../../utils/PaiLieZuHe"
  import {sortArray} from '../../utils/public'

  export default {
    name: "operation",
    data() {
      return {
        sliderValue: 0,
        minCode: 0,
        multiple: 1,
        betMoney: [10, 100, 1000, 5000, 10000, 50000], // 快捷金额
        isShow: false,
      }
    },
    computed: {
      ...mapGetters({
        _calcOdds_common: '_calcOdds_common',
        _kl8_odds: '_kl8_odds'
      }),
      ...mapState([
        'isLogin',
        'currentLotteryInfo',
        'currentMethodInfo',
        'betCount',
        'currentRebate',
        'creditSelectArr',
        'basketList',
        // 'multiple', // 1倍
        'unitMoney', // 2元
        'userInformation',
        'multiple_common'
      ]),
      maxCode() {
        let userInfo = this.userInformation;
        return userInfo.rebate || 9;
      },
      rebateNum() {
        return this.sliderValue.toFixed(1);
      },
    },
    methods: {
      ...mapMutations({
        setData: 'SET_DATA'
      }),
      ...mapActions([
        'initData',
        'formatCreditParams',
        'formatOfficialParams'
      ]),
      // 显示和关闭兑换框
      showDialog() {
        this.isShow = !this.isShow;
        // this.sliderValue = 0;
        // this.setData({key: 'currentRebate', value: 0})
      },
      clearAll() {
        this.initData();
        this.multiple = 1;
        this.sliderValue = 0;
        this._formatMultiple();
      },
      addList() {
        if (!(this.multiple_common >= 1)) {
          return this.$toast.fail("请先输入正确的倍数。")
        }
        let methodInfo = this.currentMethodInfo;
        if (methodInfo.isOfficial) {
          this.formatOfficialParams({}).then((content) => {
            console.log(content, 'formatOfficialParams');
            let basketList = this.basketList;
            let list = [];
            for (let contentItem of content) {
              let obj = {
                isOfficial: true,
                content: contentItem
              }
              list.push(obj)
            }
            let newList = basketList.concat(list);
            this.setData({key: 'basketList', value: newList});
          })
        }
        else {
          this.formatCreditParams({}).then((content) => {
            console.log(content, 'formatCreditParams');
            let basketList = this.basketList;
            let list = [];
            for (let contentItem of content) {
              let obj = {
                isOfficial: false,
                content: contentItem
              }
              list.push(obj)
            }
            let newList = basketList.concat(list);
            this.setData({key: 'basketList', value: newList});
          })
        }
        this.$nextTick(() => {
          this.clearAll();
          this.$nextTick(() => {
            this.showDialog();
          })
        })
      },
      // 更新当前滑块数据
      updateSlideValue() {
        this.$nextTick(() => {
          this.setData({key: 'currentRebate', value: this.sliderValue.toFixed(1)})
        })
      },
      // 当前单注最高奖金
      updateBonus() {
        let methodInfo = this.currentMethodInfo;
        let multiple = this.multiple ? this.multiple : 0
        if (methodInfo) {
          if (methodInfo.isOfficial) {
            // ssc
            if (lotteryType.ssc === this.currentLotteryInfo.type) {
              let del = methodInfo.del;
              if (del.zh_odds.length === 0) {
                let odd = del.addOdds;
                let bonus = multiple * odd;
                return bonus
              } else {
                // 找出最大值
                let arr = [].concat.apply([], del.zh_odds); // 二维数组转一维
                let maxOdd = Math.max(...arr);
                let bonus = multiple * maxOdd;
                return bonus;
              }
            }
            // k3
            else if (lotteryType.k3 === this.currentLotteryInfo.type) {
              if (['和值'].includes(methodInfo.name)) {
                // 拿到最大的odds
                let oddsArr = [];
                for (let i = 0; i < methodInfo.detail.length; i++) {
                  let firstItem = methodInfo.detail[i];
                  for (let n = 0; n < firstItem.detail.length; n++) {
                    let isSelect = methodInfo.detail[i].detail[n].selected;
                    if (isSelect) {
                      oddsArr.push(methodInfo.detail[i].detail[n].addOdds);
                    }
                  }
                }
                let maxOdds = Math.max(...oddsArr);
                let bonus = multiple * maxOdds * this.unitMoney;
                return bonus.toFixed(2)
              }
              else {
                let bonus = multiple * methodInfo.addOdds * this.unitMoney;
                return bonus.toFixed(2)
              }
            }
            // pk10
            else if ([lotteryType.pk10].includes(this.currentLotteryInfo.type)) {
              let bonus = multiple * methodInfo.addOdds * this.unitMoney;
              return bonus.toFixed(2)
            }
            // 11x5
            else if ([lotteryType.eleven5].includes(this.currentLotteryInfo.type)) {
              if (['定单双', '猜中位'].includes(methodInfo.name)) {
                // 拿到最大的odds
                let oddsArr = [];
                for (let i = 0; i < methodInfo.detail.length; i++) {
                  let firstItem = methodInfo.detail[i];
                  for (let n = 0; n < firstItem.detail.length; n++) {
                    let isSelect = methodInfo.detail[i].detail[n].selected;
                    if (isSelect) {
                      oddsArr.push(methodInfo.detail[i].detail[n].addOdds);
                    }
                  }
                }
                let maxOdds = Math.max(...oddsArr);
                let bonus = multiple * maxOdds * this.unitMoney;
                return bonus.toFixed(2)
              }
              else {
                let bonus = multiple * methodInfo.addOdds * this.unitMoney;
                return bonus.toFixed(2)
              }
            }
            // fc3d
            else if ([lotteryType.fc3d].includes(this.currentLotteryInfo.type)) {
              if (['定单双', '猜中位'].includes(methodInfo.name)) {
                // 拿到最大的odds
                let oddsArr = [];
                for (let i = 0; i < methodInfo.detail.length; i++) {
                  let firstItem = methodInfo.detail[i];
                  for (let n = 0; n < firstItem.detail.length; n++) {
                    let isSelect = methodInfo.detail[i].detail[n].selected;
                    if (isSelect) {
                      oddsArr.push(methodInfo.detail[i].detail[n].addOdds);
                    }
                  }
                }
                let maxOdds = Math.max(...oddsArr);
                let bonus = multiple * maxOdds * this.unitMoney;
                return bonus.toFixed(2)
              }
              else {
                // 拿到最大的odds
                let oddsArr = [];
                for (let i = 0; i < methodInfo.rows.length; i++) {
                  let rows = methodInfo.rows[i];
                  for (let n = 0; n < rows.info.length; n++) {
                    let info = methodInfo.rows[i].info[n];
                    oddsArr.push(this._calcOdds_common(info) / 2);
                  }
                }
                let maxOdds = Math.max(...oddsArr);
                let bonus = multiple * maxOdds * this.unitMoney;
                return bonus.toFixed(2)
              }
            }
            // bjkl8
            else if ([lotteryType.bjkl8].includes(this.currentLotteryInfo.type)) {
              if (['定单双', '猜中位'].includes(methodInfo.name)) {
                // 拿到最大的odds
                let oddsArr = [];
                for (let i = 0; i < methodInfo.detail.length; i++) {
                  let firstItem = methodInfo.detail[i];
                  for (let n = 0; n < firstItem.detail.length; n++) {
                    let isSelect = methodInfo.detail[i].detail[n].selected;
                    if (isSelect) {
                      oddsArr.push(methodInfo.detail[i].detail[n].addOdds);
                    }
                  }
                }
                let maxOdds = Math.max(...oddsArr);
                let bonus = multiple * maxOdds * this.unitMoney;
                return bonus.toFixed(2)
              }
              else {
                // 拿到最大的odds
                let oddsArr = [];
                for (let i = 0; i < methodInfo.rows.length; i++) {
                  let rows = methodInfo.rows[i];
                  for (let n = 0; n < rows.info.length; n++) {
                    let info = methodInfo.rows[i].info[n];
                    oddsArr.push(this._calcOdds_common(info));
                  }
                }
                let maxOdds = Math.max(...oddsArr);
                let bonus = multiple * maxOdds * this.unitMoney / 2;
                return bonus.toFixed(2)
              }
            }
          }
          // 双面盘【信用】
          else {
            let list = this.creditSelectArr;
            if (list.length > 0) {
              if ([lotteryType.lhc, lotteryType.klc, lotteryType.klsf].includes(this.currentLotteryInfo.type)) {
                let oddsArr = [];
                for (let i = 0; i < list.length; i++) {
                  let item = list[i];
                  oddsArr.push(this._calcOdds_common(item));
                }
                let odd = oddsArr.sort((a, b) => b - a)[0];
                let bonus = (multiple * odd * this.unitMoney).toFixed(2);
                return bonus
              }
              else if ([lotteryType.bjkl8].includes(this.currentLotteryInfo.type)) {
                if (['选1-5'].includes(this.currentMethodInfo.name)) {
                  let value = list[0].value;
                  let LEN = value.split(',').length;
                  // let odds = this.kl8_odds(LEN).odds.split(',');
                  let odds = this._kl8_odds(LEN).odds.split(',');
                  let maxOdd = Math.max(...odds.map(Number));
                  let bonus = (multiple * maxOdd * this.unitMoney).toFixed(2);
                  return bonus
                }
                else if (['选一', '选二', '选三', '选四', '选五'].includes(this.currentMethodInfo.name)) {
                  let methodInfo = this.currentMethodInfo;
                  let oddsArr = methodInfo.oddsArr[0].content;
                  let newOddsArr = [];
                  for (let i = 0; i < oddsArr.length; i++) {
                    let item = list[i];
                    newOddsArr.push(this._calcOdds_common(item));
                  }
                  let odd = newOddsArr.sort((a, b) => b - a)[0];
                  let bonus = (multiple * odd * this.unitMoney).toFixed(2);
                  return bonus
                }
              }
              else if ([lotteryType.fc3d].includes(this.currentLotteryInfo.type)) {
                if (list[0].name === '组选三') {
                  let item = list[0];
                  let arr = item.value.split(',');
                  let newArr = zx_3fs_3(arr);
                  let odd = parseFloat((this._calcOdds_common(item) / newArr.length * 2).toFixed(3));
                  let bonus = (multiple * Number(odd) * this.unitMoney).toFixed(2);
                  return bonus
                }
                else if (list[0].name === '组选六') {
                  let item = list[0];
                  let arr = item.value.split(',');
                  let newArr = sortArray(arr, 3);
                  let odd = parseFloat((this._calcOdds_common(item) / newArr.length).toFixed(3));
                  let bonus = (multiple * Number(odd) * this.unitMoney).toFixed(2);
                  return bonus
                }
                else {
                  let oddsArr = [];
                  for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    oddsArr.push(this._calcOdds_common(item));
                  }
                  let odd = oddsArr.sort((a, b) => b - a)[0];
                  let bonus = (multiple * odd * this.unitMoney).toFixed(2);
                  return bonus
                }

              }
              else {
                let oddsArr = [];
                for (let i = 0; i < list.length; i++) {
                  let item = list[i];
                  oddsArr.push(item.addOdds)
                }
                let odd = oddsArr.sort((a, b) => b - a)[0];
                let bonus = (multiple * odd * this.unitMoney).toFixed(2);
                return bonus
              }
            } else {
              return 0
            }

          }
        }
      },
      // 总需要多少钱
      updateBetMoney() {
        let count = this.betCount;
        let multiple = this.multiple ? this.multiple : 0
        let totalMoney = (count * this.unitMoney * multiple).toFixed(2);
        return totalMoney
      },

      _formatMultiple() {
        let multiple = this.multiple;
        if (multiple > 50000) {
          this.multiple = 50000
        } else if (multiple < 1) {
          this.multiple = 0
        }
        this.multiple = parseInt(multiple);
        this.$nextTick(() => {
          this.setData({key: 'multiple_common', value: this.multiple})
        })
      },
      selectMultiple(item) {
        this.multiple = item;
        this._formatMultiple();
      },
    }
  }
</script>

<style scoped lang="scss">
  .skin-black {
    .operation-wrapper {
      background: #24252d;
      .bet-info {
        & > div {
          span {
            color: #9a9aa7;
          }
          i {
            color: #ff2525;
          }
        }
      }
      .operate-btn {
        .clear-all {
          border: .02rem solid #93806a;
          color: #c4aa88;
          background-image: linear-gradient(180deg, #443f3a, #544a42 99%);
          background-color: rgba(144, 143, 177, .2);
        }
        div {
          color: #9a9aa7;
          input {
            color: #deb091;
            border: .02rem solid #333441;
            background-color: #1e1f26;
          }
        }
        .add-list {
          color: #533510;
          background-image: linear-gradient(180deg, #efcea6, #dab591);
        }
      }
      .add-list-wrapper {
        background: rgba(0, 0, 0, 0.7);
        .rebate-wrapper {
          background: #24252d;
          .title {
            color: #fff;
            border-bottom: .02rem solid #717180;
          }
          .content {
            color: #9a9aa7;
            .return {
              span {
                color: #ff2525;
              }
            }
            .slider-tools,
            /deep/ .van-slider {
              .van-slider__bar {
                background: #efcea6;
              }
              .rebate-button {
                background: #efcea6;
                .rebate-bc {
                  background: #000;
                }
              }
            }
            .option {
              .amount-multiple {
                color: #9a9aa7;
                .inputting {
                  input {
                    color: #deb091;
                    border: .02rem solid #333441;
                    background-color: #1e1f26;
                  }
                }
              }
            }
            ul.nav {
              li {
                background-color: rgba(144, 143, 177, .2);
                background-image: linear-gradient(180deg, #443f3a, #544a42 99%);
                color: #c4aa88;
                border: .02rem solid #93806a;
              }
            }
            .num {
              p {
                span {
                  color: #fff;
                }
                em {
                  color: #d9342f;
                }
              }
            }
          }
          .btn-wrapper {
            span {
              color: #dadada;
              background-image: linear-gradient(180deg, #645592 1%, #322b4d);
              &:last-child {
                background-image: linear-gradient(180deg, #efcea6, #dab591);
                color: #533510;
              }
            }
          }
        }
      }
    }
  }

  .skin-gray {
    .operation-wrapper {
      background: #24252d;
      .bet-info {
        & > div {
          span {
            color: #9a9aa7;
          }
          i {
            color: #ff2525;
          }
        }
      }
      .operate-btn {
        .clear-all {
          border: .02rem solid #6a697f;
          color: #908fb1;
          background-image: linear-gradient(180deg, #393A47, #393A47 99%);
          background-color: rgba(144, 143, 177, 0.2);
        }
        div {
          input {
            color: #deb091;
            border: .02rem solid #333441;
            background-color: #1e1f26;
          }
        }
        .add-list {
          color: #533510;
          background-image: linear-gradient(180deg, #ffedc6, #ffd57d);
        }
      }
      .add-list-wrapper {
        background: rgba(0, 0, 0, 0.7);
        .rebate-wrapper {
          background: #24252D;
          .title {
            color: #fff;
            border-bottom: .02rem solid #717180;
          }
          .content {
            color: #9a9aa7;
            .return {
              span {
                color: #ff2525;
              }
            }
            .slider-tools,
            /deep/ .van-slider {
              .van-slider__bar {
                background: #0DD6F7;
              }
              .rebate-button {
                background: linear-gradient(to bottom, #c6f9ff, #05caf2);
                .rebate-bc {
                  background: #000;
                }
              }
            }
            .option {
              .amount-multiple {
                color: #9a9aa7;
                .inputting {
                  input {
                    color: #ffd57d;
                    border: .02rem solid #333441;
                    background-color: #1e1f26;
                  }
                }
              }
            }
            ul.nav {
              li {
                background-color: rgba(144, 143, 177, 0.2);
                background-image: linear-gradient(180deg, #393A47, #393A47 99%);
                color: #908fb1;
                border: .02rem solid #6a697f;
              }
            }
            .num {
              p {
                span {
                  color: #fff;
                }
                em {
                  color: #ff2525;
                }
              }
            }
          }
          .btn-wrapper {
            span {
              color: #dadada;
              background-image: linear-gradient(180deg, #8c90bc 1%, #545a96);
              &:last-child {
                background-image: linear-gradient(180deg, #ffedc6, #ffd57d);
                color: #533510;
              }
            }
          }
        }
      }
    }
  }

  .operation-wrapper {
    /*position: fixed;*/
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background: #24252d;
    width: 100%;
    font-size: .28rem;
    height: 1.8rem;
    padding: 0 0.2rem;
    .bet-info {
      display: flex;
      width: 100%;
      height: 0.9rem;
      justify-content: space-between;
      align-items: center;
      & > div {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        &:first-child {
          justify-content: flex-start;
        }
        &:last-child {
          justify-content: flex-end;
        }
        span {
          color: #9a9aa7;
        }
        i {
          padding: 0 0.05rem;
          color: #ff2525;
        }
      }
    }
    .operate-btn {
      display: flex;
      width: 100%;
      height: 0.9rem;
      justify-content: space-between;
      align-items: center;
      .clear-all {
        width: 1.2rem;
        height: .56rem;
        line-height: .56rem;
        border-radius: .36rem;
        border: .02rem solid #93806a;
        color: #c4aa88;
        text-align: center;
        background-image: linear-gradient(180deg, #443f3a, #544a42 99%);
        background-color: rgba(144, 143, 177, .2);
      }
      div {
        color: #9a9aa7;
        display: flex;
        align-items: center;
        input {
          color: #deb091;
          border: .02rem solid #333441;
          background-color: #1e1f26;
          backdrop-filter: blur(.36rem);
          width: 1.4rem;
          height: .6rem;
          margin: 0 .1rem;
          border-radius: .1rem;
          text-align: center;
        }
      }
      .add-list {
        min-width: 1.56rem;
        height: .52rem;
        line-height: .52rem;
        border-radius: .36rem;
        font-weight: 700;
        padding: 0 .1rem;
        color: #533510;
        text-align: center;
        background-image: linear-gradient(180deg, #efcea6, #dab591);
      }
    }
    .add-list-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      z-index: 300;
      .rebate-wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 84%;
        border-radius: .4rem;
        // overflow: hidden;
        background: #24252d;
        .title {
          color: #fff;
          border-bottom: .02rem solid #717180;
          font-size: .3rem;
          line-height: .88rem;
          text-align: center;
        }
        .content {
          padding: .2rem 10%;
          font-size: .28rem;
          color: #9a9aa7;
          .return {
            line-height: .4rem;
            margin: 0 0 .2rem;
            display: flex;
            justify-content: flex-end;
            span {
              color: #ff2525;
            }
          }
          .slider-tools,
          /deep/ .van-slider {
            height: 0.1rem;
            margin: .5rem 0;
            .rebate-button {
              background: #efcea6;
              border-radius: 100%;
              position: relative;
              width: .32rem;
              height: .32rem;
              .rebate-bc {
                position: absolute;
                top: 50%;
                left: 50%;
                width: .16rem;
                height: .16rem;
                background: #000;
                border-radius: 100%;
                transform: translate(-50%, -50%);
              }
            }
          }
          .option {
            height: .6rem;
            line-height: .6rem;
            margin: .3rem 0;
            .amount-multiple {
              width: 100%;
              display: flex;
              align-items: center;
              color: #9a9aa7;
              .tips {
                line-height: .35rem;
              }
              .inputting {
                flex: 1;
                width: 100%;
                position: relative;
                display: flex;
                justify-content: flex-start;
                padding: 0 0 0 .1rem;
                input {
                  color: #deb091;
                  border: .02rem solid #333441;
                  background-color: #1e1f26;
                  padding: 0 1.5rem 0 .2rem;
                  width: 100%;
                  height: .8rem;
                  border-radius: .08rem;
                  text-align: left;
                  backdrop-filter: blur(.36rem);
                }
                span {
                  position: absolute;
                  top: 0;
                  right: 0;
                  height: .8rem;
                  line-height: .8rem;
                  width: 1.5rem;
                  padding: 0 .1rem 0 0;
                  text-align: center;
                }
              }
            }
          }
          ul.nav {
            padding: .2rem 0 0;
            display: flex;
            flex-wrap: wrap;
            li {
              min-width: 1.3rem;
              padding: 0 .15rem;
              height: .6rem;
              line-height: .58rem;
              margin: 0 .16rem .2rem 0;
              border-radius: .36rem;
              background-color: rgba(144, 143, 177, .2);
              background-image: linear-gradient(180deg, #443f3a, #544a42 99%);
              color: #c4aa88;
              border: .02rem solid #93806a;
              text-align: center;
            }
          }
          .num {
            padding: .16rem 0 0;
            p {
              text-align: left;
              margin-bottom: .16rem;
              span {
                color: #fff;
              }
              em {
                color: #d9342f;
              }
            }
          }
        }
        .btn-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          margin-bottom: 10px;
          span {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80%;
            height: 1rem;
            border-radius: 0.5rem;
            line-height: 1rem;
            text-align: center;
            font-size: .32rem;
            color: #dadada;
            background-image: linear-gradient(180deg, #645592 1%, #322b4d);
            &:last-child {
              background-image: linear-gradient(180deg, #efcea6, #dab591);
              color: #533510;
              font-weight: 700;
            }
          }
        }
        .offset-btn-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: -75px;
          height: 75px;
          span {
            width:px2rem(55px);
            height:px2rem(55px);
            margin:0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: $skin-black-con-bg;
            .iconfont{
              font-size:px2rem(20px);
              background: linear-gradient(to bottom,#FFEAC0,#FFD681);
              -webkit-background-clip:text;
              -webkit-text-fill-color:transparent;
            }
          }
        }
      }
    }
  }
</style>
