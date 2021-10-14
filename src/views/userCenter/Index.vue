<template>
  <section class="Index">
    <!-- 头部 -->
    <header class="header">
      <div class="clearfix">
        <h3 class="f logo">8888彩票</h3>
        <div v-if="isLogin">
          <router-link to="/login" class="down r">登录</router-link>
          <router-link to="/reg" class="down down-r r">注册</router-link>
        </div>
        <a v-else class="r down" :href="downUrl" download="8888彩票">{{$t('lang.header.download')}}</a>
      </div>
      <!-- 公告 -->
      <div class="notice" @click="$router.push('/noticeList')">
        <img src="./img/horn.svg" alt="">
        <van-notice-bar mode="link" :text="notice" />
      </div>
      <!-- 推荐类别 -->
      <ol class="rectangle">
        <li @click="bouncePage('/recharge')">
          <img src="./img/recharge.svg" alt="">
          <p>{{$t('lang.index.depositRecharge')}}</p>
        </li>
        <li @click="bouncePage('/recharge')">
          <img src="./img/recharge-1.svg" alt="">
          <p>{{$t('lang.index.depositRecharge')}}</p>
        </li>
        <li @click="showDialog = true">
          <img src="./img/kefu.svg" alt="">
          <p>{{$t('lang.withDraw.onlineService')}}</p>
        </li>
      </ol>
    </header>
    <!-- 内容 -->
    <div class="content">
      <!-- 轮播图 -->
      <div class="swiper">
        <van-swipe :autoplay="3000" :stop-propagation="false" :show-indicators="false" @change="swiperChange">
          <van-swipe-item v-for="(item, index) in images" :key="index">
            <van-image :src="item.homeImg" @click="goToPages(item,index)">
              <template v-slot:loading>
                <img :src="require(`../../assets/img/_default/unloaded.png`)" />
              </template>
              <template v-slot:error>
                <img :src="require(`../../assets/img/_default/unloaded.png`)" />
              </template>
            </van-image>
          </van-swipe-item>
        </van-swipe>
        <!-- 自定义插槽样式 -->
        <div class="van-swipe__indicators">
          <i class="van-swipe__indicator" :class="{'van-keys': current === key}" v-for="(item, key) in images" :key="key" />
        </div>
      </div>
      <!-- 彩票列表 -->
      <div class="lottery">
        <p class="hot-t clearfix">
          <strong class="f">{{$t('lang.index.popularLottery')}}</strong>
          <span class="r" @click="$router.push('/Lottery')">
            {{$t('lang.index.quGames')}}
            <i class="next r"></i>
          </span>
        </p>
        <ol class="list clearfix">
          <li v-for="(item, key) in lotteryList[0]" :key="key" @click="openGame(item)" :class="{'f': key % 2 === 0, 'r': key % 2 !== 0}">
            <strong class="list-t">
              <span>{{item.name.substr(0, 2)}}</span>
              <em>{{item.name.substr(2, 4)}}</em>
            </strong>
            <div class="list-rg">
              <strong>{{ item.remarks }}</strong>
              <span class="lottery-item-del">{{$i18n.locale==='zh'? item.name:item.name_en }}</span>
            </div>
          </li>
        </ol>
      </div>
      <!-- 真人视讯 -->
      <div class="hot-box">
        <h4>
          {{$t('lang.index.liveVideo')}}
          <em>LIVE CASINO</em>
        </h4>
        <span></span>
        <strong class="v-bg"></strong>
      </div>
      <!-- 电子游戏 -->
      <div class="hot-box">
        <h4>
          {{$t('lang.index.electronicGames')}}
          <em>SLOT GAMING</em>
        </h4>
        <span></span>
        <strong class="v-bg v-bg1"></strong>
      </div>
      <!-- 棋牌游戏 -->
      <div class="hot-box">
        <h4>
          {{$t('lang.index.boardGame')}}
          <em>CHESS & CARD</em>
        </h4>
        <span></span>
        <strong class="v-bg v-bg2"></strong>
      </div>
      <!-- 彩票游戏 -->
      <div class="hot-box">
        <h4>
          {{$t('lang.index.popularLottery')}}
          <em>LOTTERY</em>
        </h4>
        <span></span>
        <strong class="v-bg v-bg3"></strong>
      </div>
      <!-- 体育游戏 -->
      <div class="hot-box">
        <h4>
          {{$t('lang.index.sportsGames')}}
          <em>SPORT</em>
        </h4>
        <span></span>
        <strong class="v-bg v-bg4"></strong>
      </div>
    </div>
    <!-- 底部 -->
    <Footer :actived="active" />
    <!-- 客服弹窗 -->
    <Customerserve :showDialog="showDialog" @closeDialog="handleCloseDialog"/>
  </section>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {Dialog} from "vant";

export default {
    name: "Index",
    data () {
      return {
        isLogin: false, // 是否登录
        isAndroid: null, // 判断安卓或Ios
        downUrl: '', // 下载链接
        notice: '', // 公告
        showDialog: false, // 客服弹窗
        images: [], // 轮播图片
        current: 0, // 轮播索引6
        lotteryList: [], // 彩票信息
        active: 0, // 尾部选中
        version: 0.01  // 版本
      }
    },
    components: {
      Customerserve: resolve => require(['../../commons/customerserve/Customerserve'], resolve),
      Footer: resolve => require(['./Footer'], resolve),
    },
    computed: {
      ...mapGetters(['userInfo']),
      usersInfo () {
        return this.userInfo
      }
    },
    methods: {
      ...mapMutations('user', ['SET_USER_INFO', 'SET_EXT_INFO']),
      onClickShow(){
        this.show = true
      },
      goToPages(val, index){
        this.$router.push({path:'/promotions',query:{count:val.id}})
      },
      handleRefresh () {
        this.loading = true
        this.$http.users.getMoney().then((res) => {
          this.loading = false
          if (res) {
            this.$toast.success(this.$t('lang.common.refreshSuccessfully'))
            const money = res.data.money
            this.usersInfo.money = money
            this.SET_USER_INFO(this.usersInfo)
          }
        })
      },
      bouncePage(name, type){
        if(!this.isLogin){
          this.$toast(this.$t('lang.tryItForFree.pleaseLogFirst'))
          return
        }
        if (this.userInfo.type === 'TEST') {
          this.isTryDialog = true
        }else {
          this.$router.push(name)
        }
      },
      getGame () {
        this.$router.push({ path: '/Lottery', query: { type: 1 } })
      },
      openGame (item) {
        if (item.category === 1){
          let lotteryId = item.href;
          if(lotteryId === ""){
            this.$router.push({ path: '/Lottery'})
          } else {
            console.log(item.type)
            this.$router.push({ path: item.type, query: { lotteryId: lotteryId }})
          }
        } else if (item.category===2) {
          this.$router.push({ path: '/GameList', query: { name: item.name } })

        }else if(item.category===3){
          this.isNotData = false
          if(item.type==='ag'){
            this.onClickShow()
            var data = {
              liveCode:item.type,
              gameType:1,
              isMobile: true
            };

          }else if(item.type==='bg'){
            this.onClickShow()
            var data = {
              liveCode:item.type,
              gameType:'',
              isMobile: true
            };
          }else {
            this.$toast('暂未开放，请尝试其他视讯！')
            return
          }
          this.$http.home.gameApi(data).then(res=>{
            console.log(res.data);
            window.location.href = res.data
          }).catch(err=>{
            this.isShow = false
            this.show = false
          })
        }else if(item.category===4){
          switch (item.type) {
            case 'AG':
              this.onClickShow()
              let data = {
                liveCode:item.type.toLowerCase(),
                gameType:8,
                isMobile:true
              }
              this.$http.home.gameApi(data).then(res=>{
                console.log(res.data);
                window.location.href = res.data

              }).catch(err=>{
                console.log(err);
              })
              break;
            default :
              this.$toast('暂未开放，请尝试其他电子游戏！')
          }
        }
      },
      open (opt) {
        console.log(opt);
        const token = this.$cookie.get('token')
        if (token == null || token == '') {
          Dialog.confirm({
            title: this.$t('lang.ExplainWithDraw.Reminder'),
            message: this.$t('lang.index.dengLuJinRu')
          })
            .then(() => {})
            .catch(() => {})
          return false
        }
        const params = {
          liveCode: opt.liveCode,
          gameType: opt.gameType,
          isMobile: true
        }
        if (opt.liveCode === 'pt') {
          return false
        } else if (opt.liveCode === 'bbin') {
          params.gameType = 'game'
        } else if (opt.liveCode === 'ltlottery') {
          (params.liveCode = 'bbin'), (params.gameType = 'ltlottery')
        }
        this.isShow = true
        this.$http.home
          .playGame(params)
          .then((res) => {
            this.iframeSrc = res.data
            console.log(this.iframeSrc);
          })
          .catch((err) => {
            this.isShow = false
          })
      },
      // 获取安卓或IOS下载链接
      getDown () {
        let u = navigator.userAgent
        this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
        // this.$get('setting', {}).then(res => {
        //     if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
        //     this.isAndroid ? this.downUrl = res.data.download_android.value : this.downUrl = res.data.download_ios.value
        // })
      },
      // 初始化请求获取游戏列表
      getGameList () {
        let list = JSON.parse(sessionStorage.getItem('lotteryList'))
        if (list) {
          this.lotteryList = list
        } else {
          this.$http.home.sportEleLive().then(res => {
            // 游戏列表
            let lotteryList = []
            res.data.list.forEach(item => {
              switch (item.name) {
                case '热门彩票':
                  lotteryList.push(item.children)
                  break
                case '棋牌游戏':
                  lotteryList.push(item.children)
                  break
                case '真人视讯':
                  lotteryList.push(item.children)
                  break
                case '电子游戏':
                  lotteryList.push(item.children)
                  break
                default:
                  break
              }
            })
            this.lotteryList = lotteryList
            sessionStorage.setItem('lotteryList', JSON.stringify(this.lotteryList))
          })
        }
      },
      // 初始化之外数据获取
      async getData () {
        try {
          // 公告 | 轮播图 | 版本号
          const _t = (Date.parse(new Date()) / 1000).toString()
          var [a, b, c] = await Promise.all([
            this.$http.home.noticeList(),
            this.$http.home.slider(),
            this.$http.home.version(_t)
          ])
        } catch (err) {
          this.$toast.fail({ message: err, forbidClick: true })
        }
        return [a, b, c]
      },
      // 设置初始化之外数据
      setData () {
        this.getData().then(res => {
          let [json, json1, json2] = res
          if (res) {
            // 公告
            this.notice = json.data.index_notice[0].noticeContent
            // 轮播图
            this.images = json1.data
            // 版本号
            this.version = json2.data.version
            // 存储
            let indexJson = {
              notice: this.notice,
              images: this.images,
              version: this.version
            }
            sessionStorage.setItem('indexJson', JSON.stringify(indexJson))
          }
        })
      },
      // 客服弹窗
      handleCloseDialog (val) {
        this.showDialog = val
      },
      // 轮播指针自定义
      swiperChange (index) {
        this.current = index
      }
    },
    mounted () {
      // 请求优化, 初始化之外请求
      let indexJson = JSON.parse(sessionStorage.getItem('indexJson'))
      if (indexJson) {
        this.notice = indexJson.notice
        this.images = indexJson.images
        this.version = indexJson.version
      } else {
        this.$nextTick(() => {
          setTimeout(() => {
            // 下载链接 | 公告
            this.setData()
          }, 10)
        })
      }
      // 先判断本地cookies有没有token 没有则不做操作，头部显示 登录 注册 （按钮）
      if (this.$cookie.get('token')) {
        this.$http.home
          .getUserInfo()
          .then((res) => {
            // TODO
            // 有token， 直接调api/user/info 接口 获取用户信息 （token失效，该接口会返回相应错误信息）
            // 如果失效了，前端清理cookies,并且跳转到登录页面
            const money = res.data.extInfo.money
            const unReadCount = res.data.unReadCount
            this.usersInfo.money = money
            this.usersInfo.unReadCount = unReadCount
            this.usersInfo.rebate = res.data.userInfo.rebate
            this.SET_USER_INFO(this.usersInfo)
            this.SET_EXT_INFO(res.data.extInfo)
          })
          .catch((err) => {
            console.log(err, 'err')
          })
      } else {
        this.isLogin = false
      }
      if (this.usersInfo) {
        this.isLogin = this.usersInfo.isLogin
      }
    },
    created () {
      this.getGameList()
    }
  }
</script>

<style scoped lang="scss">
  .van-swipe {
    overflow-x: hidden;
  }
  .Index {
    width: 100%;
    height: 100%;
    padding: 0 0 1.3rem 0;
    .f {
      float: left;
    }
    .r {
      float: right;
    }
    .header {
      width: 100%;
      height: 2.64rem;
      padding: 0.16rem 0.28rem 0;
      background-image: linear-gradient(to bottom, #65317d, #293384);
      border-bottom-left-radius: 16%;
      border-bottom-right-radius: 16%;
      .logo {
        color: white;
        font-size: 0.4rem;
        font-weight: 500;
        line-height: 0.64rem;
      }
      .down {
        min-width: 1.76rem;
        height: 0.64rem;
        padding: 0 0.2rem;
        color: #533510;
        line-height: .64rem;
        font-size: 0.32rem;
        font-weight: 500;
        text-align: center;
        // letter-spacing: 0.77px;
        border-radius: 0.36rem;
        background-image: linear-gradient(to bottom, #efcea6, #dab591);
      }
      .down-r {
        color: #8f8f8f;
        margin: 0 0.26rem 0 0;
        border: solid 1px #8f8f8f;
        background-image: linear-gradient(to bottom, #322b4d, #322b4d);
      }
      .notice {
        display: flex;
        width: 100%;
        margin: 0.22rem 0 0 0;
        flex-direction: row;
        align-items: center;
        img {
          width: 0.5rem;
          height: 0.3rem;
        }
        .van-notice-bar {
          flex: 1;
          color: white;
          background: rgba(0, 0, 0, 0);
        }
      }
      .rectangle {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 6.56rem;
        height: 1.32rem;
        opacity: 0.96;
        border-radius: 0.66rem;
        background-color: #24252d;
        li {
          color: #8f8f8f;
          img {
            display: block;
            margin: 0 auto 0.1rem;
          }
        }
      }
    }
    .content {
      overflow: auto;
      height: calc(100% - 3.46rem);
      margin: 0.82rem 0 0 0;
      padding: 0 0.28rem;
      .swiper {
        position: relative;
        .van-swipe__indicators {
          bottom: -0.22rem;
          .van-swipe__indicator {
            opacity: .1;
          }
          .van-keys {
            width: 0.4rem;
            border-radius: 3px;
            background-color: #606070;
            opacity: 1;
          }
        }
      }
      .lottery {
        margin: 0.6rem 0 0.56rem;
        .hot-t {
          color: white;
          height: 0.5rem;
          line-height: 0.5rem;
          margin-bottom: 0.16rem;
          strong {
            font-size: 0.36rem;
          }
          span {
            font-size: 0.28rem;
            .next {
              width: 0;
              height: 0;
              margin: 0.185rem 0 0 0.1rem;
              border-style: solid;
              border-width: 0.08rem 0 0.08rem 0.16rem;
              border-color: transparent transparent transparent #fff;
            }
          }
        }
        .list {
          padding: 0.24rem 0.24rem 0;
          background-color: #24252d;
          border-radius: 0.2rem;
          li {
            width: 45%;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 0.4rem;
            .list-t {
              width: 1.04rem;
              height: 1.04rem;
              margin: 0 0.16rem 0 0;
              padding: 0.17rem 0 0;
              text-align: center;
              border-radius: 0.2rem;
              box-shadow: 0 0.08rem 0.14rem 0 rgba(22, 23, 38, 0.54);
              background-image: linear-gradient(to bottom, #e3cabc, #deaf90);
              span {
                display: block;
                margin-bottom: 0.06rem;
                font-size: 0.32rem;
                font-weight: bold;
                text-shadow: 0 0 8px rgba(146, 90, 28, 0.27);
                font-family: MFJianHei_Noncommercial;
                background-image: linear-gradient(to bottom, #d69551, #4e381f 99%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              em {
                color: #5c4124;
                font-size: 0.2rem;
              }
            }
            .list-rg {
              color: white;
              font-size: 0.3rem;
              strong {
                display: block;
                margin: 0 0 0.12rem;
                color: #8f8f8f;
                font-size: 0.2rem;
              }
            }
          }
          .item1 {
            width: 25%;
            display: -webkit-box;
            text-align: center;
            padding: 0.2rem 0.25rem;
            img {
              width: 1.4rem;
              margin-bottom: 0.1rem;
              margin-right: 0;
            }
          }
        }
      }
      .hot-box {
        position: relative;
        height: 3.32rem;
        margin-bottom: 0.5rem;
        padding: 0.32rem 0.36rem 0;
        background: url('./img/video-bg.png') no-repeat center;
        background-size: 100% 100%;
        h4 {
          color: #fffdff;
          font-size: 0.4rem;
          letter-spacing: 0.96px;
          em {
            display: block;
            margin: 0.08rem 0 0;
            color: #6a6a6d;
            font-size: 0.24rem;
          }
        }
        .v-bg {
          position: absolute;
          top: -0.4rem;
          right: 0;
          width: 4.02rem;
          height: 3.36rem;
          background: url('./img/video.png') no-repeat center;
          background-size: 100% 100%;
        }
        .v-bg1 {
          background: url('./img/video1.png') no-repeat center;
          background-size: 100% 100%;
        }
        .v-bg2 {
          background: url('./img/video2.png') no-repeat center;
          background-size: 100% 100%;
        }
        .v-bg3 {
          background: url('./img/video3.png') no-repeat center;
          background-size: 100% 100%;
        }
        .v-bg4 {
          background: url('./img/video4.png') no-repeat center;
          background-size: 100% 100%;
        }
      }
    }
  }
</style>
