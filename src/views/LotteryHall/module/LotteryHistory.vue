<template>
  <div class="issue-content">
    <div class="issue-list">
      <div class="list-header">
        <div class="issue-no">{{$t('lang.lottery.historyTitle[0]')}}</div>
        <div class="prize-number">{{$t('lang.lottery.historyTitle[1]')}}</div>
        <!-- <div class="special-ks">五行</div>
        <div class="special-ks">特头</div>
        <div class="special-ks">特尾</div> -->
      </div>
      <ul v-if="historyList.length>0"
          class="list-content">
        <li :key="a" v-for="(v,a) in historyList">
          <div class="issue-no">{{$t('lang.lottery.issueInfo[0]')}}{{v.turn}}{{$t('lang.lottery.issueInfo[2]')}}</div>
          <div class="prize-number">
            <BallAll :gameType="lotteryItem.type" :openNum="v.openNum"/>
          </div>
          <!-- <div class="special-ks">木</div>
          <div class="special-ks">头1</div>
          <div class="special-ks">尾0</div> -->
        </li>
      </ul>
      <div v-if="isShowLoading" style="min-height:2rem;margin-top:0.5rem">
        <van-loading color="#222222"/>
      </div>
    </div>
  </div>
</template>
<script>
  import BallAll from '../../../commons/balls/BallAll'
  import NotData from "../../../commons/notdata/NotData";

  export default {
    name: 'LotteryHistory',
    data() {
      return {
        historyList: [],
        isShowLoading: false,
        isNotData: true
      }
    },
    props: {
      shengxiList: Array,
      preTurn: String,
      lotteryId: String,
      lotteryItem: Object
    },
    components: {
      BallAll,
      NotData
    },
    // created () {
    //   this.queryData()
    // },
    methods: {
      queryData() {
        const _t = (Date.parse(new Date()) / 1000).toString()
        const params = {
          _t,
          gameId: this.lotteryId
        }
        this.isShowLoading = true
        this.$http.home.getNowCpHistory(params).then((rep) => {
          this.historyList = rep.data
          this.isShowLoading = false
        })
      }
    },
    watch: {
      preTurn(n, o) {
        if (n !== o) {
          this.queryData()
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .skin-gray{
    .issue-content {
      box-shadow: 0 4px 9px 0 rgba(0, 0, 0, 0.4);
      border-top: 1px solid #717180;
      .issue-list {
        background-color: #4f4b66;
        .list-header {
          background-color: #4f4b66;
          color: #9fa7b3;
          .prize-number {
            border-left: 1px solid #717180;
          }
        }
        ul.list-content {
          & > li {
            background: #46425A;
            color: #9fa7b3;
            .prize-number {
              border-left: 1px solid #717180;
            }
            &:nth-child(2n) {
              background-color: #4f4b66;
            }
          }
        }
      }
    }
  }
  .skin-black{
    .issue-content {
      box-shadow: 0 4px 9px 0 rgba(0, 0, 0, 0.4);
      border-top: 1px solid #393940;
      .issue-list {
        background-color: #202225;
        .list-header {
          background-color: #202225;
          color: #9fa7b3;
          .prize-number {
            border-left: 1px solid #393940;
          }
        }
        ul.list-content {
          & > li {
            background: #24252D;
            color: #9fa7b3;
            .prize-number {
              border-left: 1px solid #393940;
            }
            &:nth-child(2n) {
              background-color: #202225;
            }
          }
        }
      }
    }
  }
  .issue-content {
    overflow: scroll;
    width: 100%;
    position: absolute;
    bottom: -5.52rem;
    /*top: 2.4rem;*/
    z-index: 9;
    box-shadow: 0 4px 9px 0 rgba(0, 0, 0, 0.4);
    border-top: 1px solid #717180;
    /*background: pink;*/
    .issue-list {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 5.5rem;
      background-color: #4f4b66;
      .list-header {
        display: flex;
        align-items: center;
        background-color: #4f4b66;
        font-size: 0.28rem;
        color: #9fa7b3;
        height: 0.6rem;
        line-height: .58rem;
        .issue-no {
          width: 1.8rem;
          text-align: center;
          position: relative;
        }
        .prize-number {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          border-left: 1px solid #717180;
          height: 100%;
        }
      }
      ul.list-content {
        display: flex;
        flex-direction: column;
        max-height: 4.9rem;
        overflow: scroll;
        & > li {
          display: flex;
          flex-direction: row;
          align-items: center;
          background: #46425A;
          font-size: 0.28rem;
          color: #9fa7b3;
          /*min-height: 38px;*/
          height: 100%;
          .issue-no {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1.8rem;
            height: 100%;

          }
          .prize-number {
            position: relative;
            flex: 1;
            height: 100%;
            border-left: 1px solid #717180;
            padding: 0.1rem 0;
            /*
            &:after {
              position: absolute;
              content: "";
              transform-origin: 0 0;
              pointer-events: none;
              box-sizing: border-box;
              z-index: 0;
              border-left: 1px solid #c1cade;
              border-radius: 1px;
              height: 100%;
              top: 0;
              left: 0;
              bottom: 0;
              transform: translate3d(-50%, 0, 0) scale(1);
            }*/
            /*
            &:before {
              content: "";
              left: -0.09rem;
              position: absolute;
              top: 50%;
              -webkit-transform: translateY(-50%);
              transform: translateY(-50%);
              display: block;
              height: 0.18rem;
              width: 0.18rem;
              border-radius: 50%;
              background-color: #c1cade;
              z-index: 22;
            }
             */
          }
          &:nth-child(2n) {
            background-color: #4f4b66;
          }
        }
      }
    }
  }
</style>
