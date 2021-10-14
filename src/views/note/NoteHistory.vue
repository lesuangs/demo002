<template>
  <div class="tian-content note-history-box">
    <Header :headObj="headObj" @leftClick="$router.go(-1)" />
    <div class="body">
      <div class="list-header">
        <span>{{$t('lang.NoteHistory.data')}}</span>
        <span>{{$t('lang.NoteHistory.betAmount')}}</span>
        <span>{{$t('lang.NoteHistory.AmountWinningLosing')}}</span>
      </div>
      <div class="list" v-if="list.length > 0">
        <template v-for="(v, i) in list">
          <div :key="i" class="v-item" @click="openDel(v)">
            <span>{{ v.statTime }}</span>
            <span>{{ v.bettingMoney }}</span>
            <span
              :style="
                v.winOrcloseMoney < 0
                  ? 'color: RGB(89,174,89);'
                  : v.winOrcloseMoney == 0
                  ? ''
                  : 'color:red'
              "
              >{{ v.winOrcloseMoney }}</span
            >
          </div>
        </template>
      </div>
      <NotData v-else :isNotData="isNotData" />
    </div>
  </div>
</template>
<script>
import Header from '../../commons/header/Header'
import NotData from '../../commons/notdata/NotData'
import VueBetterScroll from '../../commons/scroll/BScroll'

export default {
  name: 'NoteHistory',
  components: {
    Header,
    VueBetterScroll,
    NotData
  },
  data () {
    return {
      headObj: {
        title: 'lang.header.historicalBet',
        showArrow: true
      },
      isNotData: true,
      list: []
    }
  },
  created () {
    this.queryData()
  },
  methods: {
    queryData () {
      this.$http.home.getCpNoteHistory().then((res) => {
        this.list = res.data
        if (res.data.length === 0) {
          this.isNotData = false
        }
      })
    },
    openDel (v) {
      this.$router.push({
        path: '/noteHistoryDel',
        query: {
          date: v.statTime
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .note-history-box{

  }
  .skin-gray{
    .note-history-box{
      .list-header{
        background: #2C2B3A;
        span{
          color:#fff;
        }
      }
      .list{
        .v-item{
          background: $skin-gray-con-bg;
        }
      }
    }
  }

  .skin-black{
    .note-history-box{
      .list-header{
        background: #24252D;
        span{
          color:#9a9aa7;
        }
      }
      .list{
        .v-item{
          background: $skin-black-con-bg;
        }
      }
    }
  }



.tian-content {
  display: flex;
  flex-direction: column;
  .body {
    display: flex;
    flex: 1;
    overflow-y: scroll;
    flex-direction: column;
  }
  .list-header {
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    background: #c8c9cc;

    span {
      flex: 1;
      text-align: center;
      /*color: #fff;*/
      line-height: initial;
      font-size:13px;
      height: max-content;
    }
  }
  .list {
    flex: 1;
    display: flex;
    flex-direction: column;
    .v-item {
      display: flex;
      flex-direction: row;
      background: #fff;
      /*border-bottom: 1px solid #f5f5f5;*/
      span {
        flex: 1;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color:#fff;
      }
    }
  }
}
</style>
