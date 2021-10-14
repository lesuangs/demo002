<template>
  <div class="lottery-index">
    <lotteryHead></lotteryHead>
    <playing></playing>
    <operation :class="betCount>0?'active':''"
               class="operation"></operation>
    <lotteryFoot></lotteryFoot>
    <van-overlay :show="isLoading" class="mask-wrapper">
      <van-loading type="spinner" vertical color="#fff" size="24px">
        加载中...
      </van-loading>
    </van-overlay>
    <div class="waiting-order-wrapper"
         :class="isShowBasket?'active':''">
      <waitingOrder></waitingOrder>
    </div>
  </div>
</template>

<script>
  import lotteryHead from './lotteryHead.vue';
  import playing from './playing.vue';
  import lotteryFoot from './lotteryFoot'
  import operation from './operation'
  import waitingOrder from './waitingOrder'
  import {mapActions, mapState, mapMutations} from 'vuex'
  import GamesUtils from "./js/GamesUtils_rebuild.js";
  import {lotteryType} from "../../utils/mode";

  export default {
    name: "lotteryIndex",
    data() {
      return {
        isLoading: true
      }
    },
    methods: {
      ...mapMutations({
        setData: 'SET_DATA'
      }),
      ...mapActions([
        'getOfficialMethod',
        'getCreditMethod',
        'getAllLotteryList',
        'loopStatus',
        '_getCurrentLotteryInfo'
      ]),
      // _getCurrentLotteryInfo(id) {
      //   if (this.allLotteryTypeList) {
      //     let list = this.allLotteryTypeList[0].list;
      //     for (let i = 0; i < list.length; i++) {
      //       let item = list[i]
      //       if (Number(item.id) === Number(id)) {
      //         this.setData({key: 'currentLotteryInfo', value: item});
      //         return item
      //       }
      //     }
      //   }
      // },
      _getMethodFormType(type, creditData, officialData, lotteryId, userRebate, inputRebate) {
        switch (type) {
          case 'ssc': // 时时彩
            return GamesUtils.setSSCMethodInit(creditData, officialData, lotteryId, userRebate, inputRebate);
          case 'pk10': // pk10
            return GamesUtils.setPk10MethodInit(creditData, lotteryId, officialData, userRebate, inputRebate);
          case 'lhc': // 六合彩
            return GamesUtils.setMarkSixMethodInit(creditData, lotteryId, userRebate, inputRebate);
          case 'k3':
            return GamesUtils.setLuckyTreeMethodInit(creditData, lotteryId, officialData, userRebate, inputRebate);
          case 'pcdd':
            return GamesUtils.setLucky28MethodInit(creditData, lotteryId, userRebate, inputRebate);
          case 'gdklsf':
            return GamesUtils.setKlcMethodInit(creditData, lotteryId, userRebate, inputRebate);
          case 'gxklsf':
            return GamesUtils.setGxklsfMethodInit(creditData, lotteryId, userRebate, inputRebate);
          case '11x5':
            return GamesUtils.setGame11of5fMethodInit(creditData, lotteryId, officialData, userRebate, inputRebate);
          case 'fc3d':
            return GamesUtils.setFc3dMethodInit(creditData, officialData, lotteryId, userRebate, inputRebate);
          case 'bjkl8':
            return GamesUtils.setBjkl8MethodInit(creditData, officialData, lotteryId, userRebate, inputRebate);
        }
      },
      initMenu() {
        let id = this.$route.query.id;
        this.isLoading = true;
        this.getAllLotteryList({}).then((data) => {
          if (data.length > 0) {
            if (id !== null || id !== undefined) {
              this.setData({key: 'menuList', value: []});
              this._getCurrentLotteryInfo(id).then((data)=>{
                let currentLotteryInfo = data;
                let type = currentLotteryInfo.type;
                let userRebate = this.userInformation.rebate || 9;
                let inputRebate = 0; // 反水选项 - 默认为0
                let onlyCredit = [lotteryType.lhc, lotteryType.pcdd, lotteryType.klc, lotteryType.klsf];
                if (onlyCredit.includes(type)) { // 判断是否有。
                  this.getCreditMethod(id).then((data) => {
                    this.isLoading = false;
                    let menu = this._getMethodFormType(type, data, '', String(id), userRebate, inputRebate);
                    this.setData({key: 'menuList', value: menu});
                  })
                }
                else {
                  Promise.all([this.getOfficialMethod(id), this.getCreditMethod(id)]).then((data) => {
                    this.isLoading = false;
                    let [officialMethod, creditMethod] = data;
                    let menu = this._getMethodFormType(type, creditMethod, officialMethod, Number(id), userRebate, inputRebate);
                    this.setData({key: 'menuList', value: menu});
                  })
                }
              });
            }
          }
        })
      }
    },
    activated() {
      this.initMenu();
      // this.loopStatus({});
      // this.getJson();
    },
    deactivated(){
      clearInterval(this.loop_timer);
      this.setData({key: 'loop_timer', value: null})
    },
    created(){
      this.setData({key: 'menuList', value: []});
    },
    computed: {
      ...mapState([
        'allLotteryTypeList',
        'currentLotteryInfo',
        'userInformation',
        'menuList',
        'betCount',
        'loop_timer',
        'isShowBasket'
      ])
    },
    components: {
      lotteryHead,
      playing,
      lotteryFoot,
      operation,
      waitingOrder
    },
    beforeDestroy() {
      clearInterval(this.loop_timer);
      this.setData({key: 'loop_timer', value: null})
    }
  }
</script>

<style scoped lang="scss">
  .lottery-index {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    user-select: none;
    .operation {
      transition: all .3s linear;
      z-index: -1;
      margin-top: -1.8rem;
      opacity: 0;
      &.active {
        margin-top: 0;
        opacity: 1;
        z-index: 100;
      }
    }
    .mask-wrapper {
      top: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .waiting-order-wrapper {
      position: absolute;
      top: 0;
      left: 100%;
      width: 100%;
      height: 100%;
      transition: all .1s linear;
      z-index: -1;
      &.active {
        left: 0;
        opacity: 1;
        z-index: 300;
      }
    }
  }
</style>
