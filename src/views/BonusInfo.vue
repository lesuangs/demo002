<template>
  <div class="bonus-info-wrapper">
    <HeaderSelectBonusInfo :showArrow="showArrow"
                           :isShowTitle="isShowTitle"
                           :titleList="allLotteryList"
                           @changeActiveId="handleActive">
    </HeaderSelectBonusInfo>
    <ul class="bonus-info" v-if="playMap !== null">
      <li class="info-content" v-for="(item,index) in playMap">
        <p class="method-title">
          <span>{{item.name}}</span>
          <span class="rebate">返点:{{Number(item.rebate)}}%</span>
        </p>
        <div class="item">
          <span>单注最高:{{item.maxMoney}}</span>
          <span>单项最低:{{item.minMoney}}</span>
          <span>单期最高:{{item.maxTurnMoney}}</span>
          <span></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import HeaderSelectBonusInfo from '../commons/header/HeaderSelectBonusInfo'
  import {mapState, mapActions} from 'vuex';

  export default {
    name: 'BonusInfo',
    components: {
      HeaderSelectBonusInfo
    },
    computed: {
      ...mapState([
        'allLotteryTypeList'
      ]),
      allLotteryList() {
        return this.allLotteryTypeList ? this.allLotteryTypeList[0].list : [];
      }
    },
    data() {
      return {
        showArrow: true,
        isShowTitle: false,
        activeId: 0,
        titleList: [
          {id: 0, title: this.$t('lang.lotterySort.ffssc')},
          {id: 1, title: this.$t('lang.lotterySort.ffpk10')},
          {id: 2, title: this.$t('lang.lotterySort.fflhc')},
          {id: 3, title: this.$t('lang.lotterySort.ffccs1')},
          {id: 4, title: this.$t('lang.lotterySort.ffpk101')},
          {id: 5, title: this.$t('lang.lotterySort.fflhc1')}
        ],
        playMap: null,
        bonusLimit: null,
      }
    },
    created() {
      this.getAllLotteryList({}).then((data)=>{
        let id = data[0].list[0].id;
        this.handleActive(id);
      });
    },
    methods: {
      ...mapActions([
        'getAllLotteryList',
        'hasBonusItem'
      ]),
      handleActive(id) {
        this.hasBonusItem({gameId:id}).then((data) => {
          // console.log(data.content,'data.content');
          this.playMap = data.content;
        }).catch(err => {
          console.log(err);
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .bonus-info-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    ul.bonus-info {
      flex: 1;
      overflow-y: auto;
      li.info-content {
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
        margin-bottom: px2rem(10px);
        p.method-title {
          padding: 0 .2rem;
          line-height: 45px;
          font-size: 13px;
          background: #333441;
          color: #fff;
          display: flex;
          justify-content: space-between;
          .rebate {
            color: #ff2525;
          }
        }
        .item {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          font-size: px2rem(14px);
          padding: 0 .2rem;
          color: #fff;
          background-color: #24252D;
          /*border-bottom: 1px solid #393940;*/
          span{
            width: 50%;
            min-height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #393940;
            &:nth-child(odd){
              text-align: left;
            }
            &:nth-child(even){
              text-align: right;
            }
          }
        }
      }

    }
  }

  .skin-gray {
    .bonus-info-box {
      .list {
        background: $skin-gray-con-bg;
        .title, .content {
          @include border-1px($skin-gray-border-color);
        }

      }
    }
  }

  .skin-black {
    .bonus-info-box {
      .list {
        background: $skin-black-con-bg;
        .title, .content {
          @include border-1px($skin-black-border-color);
        }

      }
    }
  }
</style>
