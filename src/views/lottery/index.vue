<template>
  <div class="all-content">
    <div class="all-lottery">
      <Tab @typeClick="ListType = ListType === 1 ? 2 : 1"
           @tabClick="tabClick"
           :tabList="tabList"
           :tabActive="tabActive"
           :ListType="ListType"/>
      <!-- 彩票 -->
      <LotteryList v-if="tabActive === 0" :ListType="ListType"/>
      <!-- 电子 -->
      <ChessList v-else @getSrc="getSrc" @getShow="getShow"/>
      <!--<div class="footer-padd"></div>-->
    </div>
    <Footer :actived="active"/>
    <IframeGame v-if="isShow"
                :iframeSrc="iframeSrc"
                @showIframe="isShow = false"/>
  </div>
</template>
<script>
  import Footer from '../../commons/footer/Footer'
  import IframeGame from '../../commons/iframegame/IframeGame'
  import LotteryList from './LotteryList'
  // import LotteryList from './newList'
  import ChessList from '../ChessList'
  import Tab from '../../commons/tab/Tab'

  export default {
    name: 'Lottery',
    components: {
      Footer,
      Tab,
      ChessList,
      LotteryList,
      IframeGame
    },
    data() {
      return {
        active: 2,
        isShow: false,
        iframeSrc: '',
        tabActive: 0,
        tabLeftActive: 0,
        ListType: 1,
        tabList: ['lang.loginContent.lottery', 'lang.header.electronic']
      }
    },
    computed: {},

    methods: {
      tabClick(idx) {
        this.tabActive = idx
      },
      getSrc(src) {
        this.iframeSrc = src
      },
      getShow(bol) {
        this.isShow = bol
      }
    },
    created() {
      const {type} = this.$route.query
      if (type === 1) {
        this.tabActive = 1
      }
    }
  }
</script>
<style lang="scss" scoped>
  .all-content {
    height: 100%;
    .all-lottery {
      height: calc(100% - 1.7rem);
      display: flex;
      flex-direction: column;
    }
    /*.footer-padd{*/
    /*height: 1.7rem;*/
    /*}*/
  }

</style>
