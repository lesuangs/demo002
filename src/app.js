import {mapMutations, mapActions, mapState} from 'vuex'

export default {
  data: function () {
    return {
      title: ''
    }
  },
  methods: {
    ...mapMutations('user', ['SET_USER_INFO']),
    ...mapActions([
      'getServiceInfo',
      'getIndexOwnLottery', // type为6时调取的接口
      'getNavigation', // 获取左侧导航栏
      'getNoticeList', // 获取公告栏信息
      'getWinningList' // 获奖名单
    ])
  },
  computed: {
    ...mapState(['skin'])
  },
  // 组件
  components: {},
  // 创建完毕状态
  async created() {
    setTimeout(() => {
      this.getWinningList({}); // 提前调取获奖名单
    }, 1000 * 2);
    this.getNoticeList({}); // getNoticeList
    this.getNavigation({}); // 左侧导航
    this.getServiceInfo({}); // 获取皮肤，客服信息
    // console.log(this.$i18n.locale);
    this.$store.commit('user/initUser') // 刷新时，从本地存储里面取出userInfo、menus放到store里
  },
  // 挂载结束状态
  mounted() {
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
      }, false)
    }
  },
}
