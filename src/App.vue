<template>
  <!--  <div id="app" class="skin-grey">-->
  <div id="app" class="fat">
    <!--    <div v-title :data-title="title"></div>-->
    <!--<keep-alive>
      <router-view></router-view>
    </keep-alive>-->
    <router-view></router-view>
  </div>
</template>
<script>
  import {mapMutations, mapActions, mapState} from 'vuex'
  import {addClass} from './utils/dom'

  export default {
    data() {
      return {
        title: ''
      }
    },
    methods: {
      ...mapMutations({
        setData: 'SET_DATA'
      }),
      // ...mapMutations('user', ['SET_USER_INFO']),
      ...mapActions([
        'getUserInfo', // 获取用户信息
        'getStatus', // 获取用户余额
        'getServiceInfo', // 获取在线服务信息
        'getLanguage', // 获取语言
        'getIndexOwnLottery', // type为6时调取的接口
        'getNavigation', // 获取左侧导航栏
        'getNoticeList', // 获取公告栏信息
        'getWinningList', // 获奖名单
        'getSliderList', // 获取轮播
        'checkIsLogin',
        'loopStatus',
        'getImgAddress',
        'getAllLotteryList'
      ]),
      loginInfo() {
        if (this.isLogin) {
          this.getUserInfo({});
          this.getStatus({}).then((data) => {
            if (data) {
              this.checkIsLogin({});
            }
          });

        }
      },
      initRoute() {
        let path = this.$route;
        this.setData({key: 'currentRoute', value: path});
      }
    },
    computed: {
      ...mapState([
        'isLogin',
        'skin',
        'loop_timer'
      ])
    },
    // 组件
    components: {},
    // 创建完毕状态
    created() {
      setTimeout(() => {
        this.getWinningList({}); // 提前调取获奖名单
      }, 1000 * 2);

      this.getSliderList({}); // 轮播
      this.getNoticeList({}); // getNoticeList
      this.getNavigation({}); // 左侧导航
      // this.getLanguage({}); // 获取语言
      this.getServiceInfo({}); // 获取皮肤，客服信息
      this.getImgAddress({});
      // console.log(this.$i18n.locale);
      // this.$store.commit('user/initUser') // 刷新时，从本地存储里面取出userInfo、menus放到store里
    },
    // 挂载结束状态
    mounted() {
      this.getAllLotteryList({});
      window.onload = function () {
        document.addEventListener('touchstart', function (event) {
          if (event.touches.length > 1) {
            event.preventDefault()
          }
        })
        var lastTouchEnd = 0
        document.addEventListener('touchend', function (event) {
          var now = (new Date()).getTime()
          if (now - lastTouchEnd <= 300) {
            event.preventDefault()
          }
          lastTouchEnd = now
        }, false);
        document.addEventListener('gesturestart', function (event) {
          event.preventDefault();
        });
      };
      addClass(document.body, `skin-${this.skin}`);
      addClass(document.body, `theme-hjb-black`);
      this.initRoute();
      this.loopStatus({});
      this.$nextTick(() => {
        this.loginInfo(); // 用户信息
      })
      this.$toast.setDefaultOptions('success', {
        icon: 'van-icon van-icon-checked van-toast__icon',
        // iconPrefix: 'iconfont ',
        className: 'van-toast--success'
      })
    },
    watch: {
      '$route'(newVal) {
        this.setData({key: 'currentRoute', value: newVal})
      }
    },
    beforeDestroy() {
      clearInterval(this.loop_timer);
      this.setData({key: 'loop_timer', value: null})
    }
  }

</script>


<style lang="scss" scoped>
  .skin-gray {
    background: $skin-gray-bg;
  }

  .skin-black {
    /*background: pink;*/
    background: $skin-black-bg;
  }

  .skin-hjb {
    //background: $skin-hjb-bg;
  }
</style>
