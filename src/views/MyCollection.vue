<template>
  <div class="all-content">
    <Header :headObj="headObj" @leftClick="goBack()"/>
    <div class="tian-content">
      <LotteryList :ListType="ListType"/>
      <div class="footer-padd"></div>
    </div>
    <IframeGame
            v-if="isShow"
            :iframeSrc="iframeSrc"
            @showIframe="isShow = false"
    />
  </div>
</template>
<script>
  import Header from '../commons/header/Header'
  import IframeGame from '../commons/iframegame/IframeGame'
  import LotteryList from '../views/lottery/LotteryList'
  import {mapActions, mapState, mapMutations} from 'vuex'

  export default {
    name: 'myCollection',
    components: {
      Header,
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
        headObj: {
          title: 'lang.user.myCollection',
          showArrow: true
        },
      }
    },
    created() {
      const type = this.$route.query.type
      if (type === 1) {
        this.tabActive = 1
      }
    },
    computed:{
      ...mapState([
        'routerHistory'
      ])
    },
    methods: {
      tabClick(idx) {
        this.tabActive = idx
      },
      getSrc(src) {
        this.iframeSrc = src
      },
      getShow(bol) {
        this.isShow = bol
      },
      goBack() {
        let history = this.routerHistory;
        if (history.length !== 0) { // 在当前页面刷新
          let currentPath = this.$route.path;
          for (let i = history.length; i >= 0; i--) {
            let prePath = history[i - 2];
            console.log(prePath,'prePath');
            if ( !['/trend','/lotteryNew',currentPath].includes(prePath)) {
              this.$router.push({
                path: prePath,
              });
              break;
            }
          }

        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .all-content {
    height: 100%;
    .tian-content {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .footer-padd {
      height: 1rem;
    }
  }

</style>
