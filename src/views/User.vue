<template>
  <div class="user-box">
    <div class="content">
      <!-- <van-sticky> -->
      <div class="user-up-box">
        <header class="user-header">
          <div class="user-set">
            <i class="iconfont iconxinfeng envelope"
               @click="bouncePage('/messageList')"></i>
            <i class="iconfont iconic-setting" @click="$router.push('/setting')"></i>
          </div>
          <!--        <van-icon name="setting-o" color="#fff" size="0.4rem" @click="$router.push('/setting')"/>-->
          <div class="user-login" v-if="isLogin">
            <div class="user-img">
<!--              <img :src="'/data/userimg/userimg' + usersInfo.uid%5 + '.png'"-->
<!--                   class="img-head">-->
              <img :src="loginInfo && loginInfo.avatar" class="img-head">
              <!--<div class="btn-vip not-vip">
                <div class="circle">
                  <img src="data:image/png;base64,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" alt="" class="icon-diamond icon-small">
                </div>
                <span @click="isTryDialog=true">如何成为VIP?</span>
              </div>-->
            </div>
            <div class="user-info">
            <span class="user-name">{{ usersInfo.account }}
              <!--              <span class="btn-vip btn-vipmy" v-if="usersInfo.hyLevel">-->
              <!--                <span>VIP{{ usersInfo.hyLevel }}</span>-->
              <!--              </span>-->
            </span>
              <div class="user-balance">
                <!--            <p class="balance">{{ $t('lang.common.Balance') }}（{{ $t('lang.common.yuan') }}）</p>-->
                <span class="user-money">
                  {{ balance == null ? '0' : format_number(balance).split('.')[0] }}
                </span>
                <em class="money-point">
                  {{ balance == null ? '.00' :'.'+format_number(balance).split('.')[1] }}
                </em>
                <!--<van-image @click="handleRefresh" :class="['refresh', loading ? 'loading' : '' ]" lazy-load :src="require('../assets/img/user/nov-Refresh.png')"/>-->
                <i :class="['iconfont', 'iconic-refresch', loading?'turn':'']"
                   @click="handleRefresh(1)"></i>
              </div>
            </div>

          </div>
          <div class="user-nologin" v-else>
            <!--          <div class="hello">-->
            <!--            <p class="fs-36">{{ $t('lang.user.hello') }}</p>-->
            <!--          </div>-->
            <div class="tryPlay m-button u-btntwo" @click="isTryPlay = true">
              {{ $t('lang.user.tryItForFree') }}
            </div>
            <div class="user-login-btn">
              <span @click="$router.push('/login')">{{ $t('lang.loginContent.login') }} </span>
              <span class="line">|</span>
              <span @click="$router.push('/reg')">{{ $t('lang.loginContent.register') }}</span>
            </div>
          </div>
        </header>
        <!-- </van-sticky> -->
        <div class="user-capital">
          <span class="withdraw" @click="handleRecharge">
            <i class="iconfont iconic-withdraw"></i>
            <!--            <van-image class="iconfont" lazy-load :src="require('@/assets/themes/hjb/black/ic_withdraw.svg')"/>-->
            {{ $t("lang.user.withdraw") }}
          </span>
          <span class="recharge" @click="bouncePage('/recharge')">
            <i class="iconfont iconic-deposit"></i>
            <!--            <van-image class="iconfont" lazy-load :src="require('@/assets/themes/hjb/black/ic_deposit.svg')"/>-->
            {{ $t('lang.user.Recharge') }}
          </span>
          <span class="transfer" @click="bouncePage('/balanceChange')">
            <i class="iconfont iconic-deposit1"></i>
            <!--            <van-image class="iconfont" lazy-load :src="require('@/assets/themes/hjb/black/ic_deposit.svg')"/>-->
            {{ $t('lang.user.transfer') }}
          </span>
        </div>
      </div>
      <div class="user-wrap">
        <div class="grid">
          <template v-for="(v,i) in gridList">
            <div :key="i" class="grid-item" @click="bouncePage(v.path)">
              <!--              <img :src="v.icon"/>-->
              <i class="iconfont" :class="v.iconName"></i>
              <span style="text-align: center">{{ $t(v.text) }}</span>
            </div>
          </template>
        </div>
        <!--加入代理-->
        <div class="user-other user-agent"
             @click="$router.push(isLogin? '/surplusFund':'/login')">
          <p>
            <i class="iconfont iconic-fixeddeposit"></i>
            <!--            <van-image width=".3rem" lazy-load :src="require('@/assets/themes/hjb/black/ic_joinagent.svg')"/>-->
            <span class="user-proxy">
              {{$t('lang.user.balanceJin')}}
            </span>
          </p>
          <!--          <van-icon name="arrow" color="#a8a8a8"/>-->
        </div>
        <div class="user-other user-agent"
             @click="$router.push(isLogin?(accountType=== 1?'/agentCenter':'/applyingForAgency'):'/login')">
          <p>
            <i class="iconfont iconic-joinagent"></i>
            <!--            <van-image width=".3rem" lazy-load :src="require('@/assets/themes/hjb/black/ic_joinagent.svg')"/>-->
            <span class="user-proxy">
              {{ accountType === 1 && isLogin ? $t('lang.user.myTeam') : $t('lang.user.joinAgent') }}
            </span>
          </p>
          <!--          <van-icon name="arrow" color="#a8a8a8"/>-->
        </div>

        <div class="userList">
          <div class="list-item" v-for="(v,i) in cellList"
               :key="i" @click="handleCellClick(v)">
            <p>
              <i :class="'iconfont '+ v.iconName"></i>
              <span class="user-proxy">{{ $t(v.text) }}</span>
            </p>
            <!--            <span class="security" v-if="v.text === '安全中心'">-->
            <!--                {{ !isLogin ? $t('lang.tryItForFree.pleaseLogFirst') : '' }}-->
            <!--            </span>-->
          </div>

          <!--          <van-cell-group class="userList" style="display: none">-->
          <!--            <van-cell class="list-item" v-for="(v,i) in cellList"-->
          <!--                      :key="i" @click="handleCellClick(v)">-->
          <!--              <div class="user-other user-cell" v-if="i > 2">-->
          <!--                <p>-->
          <!--&lt;!&ndash;                  <van-image width=".3rem" lazy-load :src="v.icon"/>&ndash;&gt;-->
          <!--                  <i :class="'iconfont '+ v.iconName"></i>-->
          <!--                  <span class="user-proxy">{{ $t(v.text) }}</span>-->
          <!--                </p>-->
          <!--                <span class="security" v-if="v.text === '安全中心'">-->
          <!--                {{ !isLogin ? $t('lang.tryItForFree.pleaseLogFirst') : '' }}-->
          <!--              </span>-->
          <!--                <van-icon name="arrow" color="#a8a8a8"/>-->
          <!--              </div>-->
          <!--            </van-cell>-->
          <!--          </van-cell-group>-->
        </div>
        <!--        <van-cell-group class="userList">-->
        <!--          <van-cell v-for="(v,i) in cellList" :key="i" @click="handleCellClick(v)">-->
        <!--            <div class="user-other user-cell" v-if="i > 2">-->
        <!--              <p>-->
        <!--                <van-image width=".3rem" lazy-load :src="v.icon"/>-->
        <!--                <span class="user-proxy">{{ $t(v.text) }}</span>-->
        <!--              </p>-->
        <!--              <span class="security" v-if="v.text === '安全中心'">-->
        <!--                {{ !isLogin ? $t('lang.tryItForFree.pleaseLogFirst') : '' }}-->
        <!--              </span>-->
        <!--              <van-icon name="arrow" color="#a8a8a8"/>-->
        <!--            </div>-->
        <!--          </van-cell>-->
        <!--        </van-cell-group>-->
      </div>
    </div>
    <Footer :actived="active"/>
    <Customerserve :showDialog="showDialog" @closeDialog="handleCloseDialog"/>
    <Dialog class="go-try-play-box" :showDialog="isTryPlay" @closeDialog="handleCloseDialog">
      <div slot="content">
        <div class="content-center">
          <div class="dialog-title">{{ $t('lang.user.tryItForFree') }}</div>
          <div class="dialog-content">
            <div class="dialog-message">
              <p>
                {{ $t('lang.tryItForFree.shiWanShiJian') }}
              </p>
              <p class="dialog-message-p">{{ $t('lang.tryItForFree.qrHours[0]') }} <span>{{ $t('lang.tryItForFree.qrHours[1]') }}</span> {{ $t('lang.tryItForFree.qrHours[2]') }}</p>

            </div>
          </div>
          <div class="dialog-footer">
            <span class="button cancel" @click="handleCancelTry"> {{ $t('lang.tryItForFree.pleaseLogFirst') }}</span>
            <i>|</i>
            <span class="button" @click="handleToTryPlay"> {{ $t('lang.tryItForFree.GoTry') }}</span>
          </div>
        </div>
        <div class="close-box" @click="isTryPlay=false">
          <i class="iconfont iconic-close"></i>
        </div>
      </div>
    </Dialog>
    <tryPlay :showDialog="isTryDialog" @closeDialog="handleCloseDialog"></tryPlay>
<!--    <Dialog :showDialog="isTryDialog" @closeDialog="handleCloseDialog" class="try-play-box">
      <div slot="content">
        <div class="m-vital-confirm">
          <div class="confirm-content">
            <div class="try-play-img"></div>
            &lt;!&ndash;            <img src="https://sp-res-wap.ftfxgame.com/fusion/wap/release/static/img/group.461451e3.png"&ndash;&gt;
            &lt;!&ndash;                 class="confirm-img">&ndash;&gt;
            <div class="dialog-message">
              &lt;!&ndash;              <p>{{ $t('lang.tryItForFree.pleaseLogFirst') }}</p>&ndash;&gt;
              <p>{{ $t('lang.user.notVIP') }}</p>
              <p>{{ $t('lang.user.howVip') }}</p>

            </div>
            &lt;!&ndash;            <h1 class="fs-36 bold">{{ $t('lang.user.notVIP') }}</h1>&ndash;&gt;
            &lt;!&ndash;            <p class="tip"></p>&ndash;&gt;
            <div class="dialog-footer">
              <span class="button cancel" @click="$router.push('/login')"> {{ $t('lang.loginContent.loginNow') }}</span>
              <i>|</i>
              <span class="button" @click="isTryDialog=false"> {{ $t('lang.loginContent.register') }}</span>
            </div>
            &lt;!&ndash;            <div class="m-button" @click="$router.push('/login')">&ndash;&gt;
            &lt;!&ndash;              {{ $t('lang.registerContent.signInNow') }}/{{ $t('lang.loginContent.register') }}&ndash;&gt;
            &lt;!&ndash;            </div>&ndash;&gt;
            &lt;!&ndash;            <p class="no" @click="isTryDialog=false">{{ $t('lang.user.cancel') }}</p>&ndash;&gt;
          </div>
          <div class="close-box" @click="isTryDialog=false">
            <i class="iconfont iconic-close"></i>
          </div>
        </div>
      </div>
    </Dialog>-->
    <!--    <van-popup v-model="show" position="left" :style="{ width: '30%' }"><vant-popup/>-->
    <van-popup v-model="show" position="bottom" closeable class="user-lang-box">
      <h2 class="title"> {{ $t('lang.user.languageSelected') }}</h2>
      <van-radio-group v-model="radio" direction="horizontal" class="user-lang-wrap">
        <div class="langLogoStyle" @click="changeLang(LANG.china)"
             :class="$i18n.locale===LANG.china?'active':''">
          <img :src="require('@/assets/themes/hjb/black/flag_cn.png')" alt="">
          <!--<p>{{ langType[0] && langType[0].name }}</p>-->
          <p>中文</p>
        </div>
        <div class="langLogoStyle" @click="changeLang(LANG.english)"
             :class="$i18n.locale===LANG.english?'active':''">
          <img :src="require('@/assets/themes/hjb/black/flag_en.png')" alt="">
          <!--<p>{{ langType[1] && langType[1].name }}</p>-->
          <p>英文</p>
        </div>
        <div class="langLogoStyle" @click="changeLang(LANG.Vietnam)"
             :class="$i18n.locale===LANG.Vietnam?'active':''">
          <img src="../assets/img/VNguoqi.png" alt="" >
          <!--          <p>{{ langType[2] && langType[2].name }}</p>-->
          <p>越南</p>
        </div>
        <!--        <div class="langLogoStyle" @click="$toast('暂未开放')">-->
        <!--          <img src="../assets/img/VNguoqi.png" alt="" style="width: .4rem;margin: .2rem;border-radius: .5rem">-->
        <!--          <p>{{ langType[2] && langType[2].name }}</p>-->
        <!--        </div>-->
      </van-radio-group>
    </van-popup>
  </div>
</template>
<script>
  import Footer from '../commons/footer/Footer'
  // import Grid from '../commons/grid/Grid'
  import tryPlay from "../commons/tryPlay/tryPlay";
  import Customerserve from '../commons/customerserve/Customerserve'
  import Dialog from '../commons/dialog/Dialog'
  import {mapGetters, mapMutations, mapActions, mapState} from 'vuex'
  import {LANG} from "../utils/mode";
  export default {
    name: 'User',
    components: {
      Footer,
      // Grid,
      Customerserve,
      Dialog,
      tryPlay
    },
    data() {
      return {
        // start
        LANG: LANG,
        // end
        langType: [], // 版本
        active: 4,
        loading: false,
        showDialog: false,
        isFundsPwd: false, // 是否有资金密码
        dialogTitle: '联系客服',
        isTryPlay: false,
        isTryDialog: false,
        show: false,
        radio: 1,
        gridList: [
          {
            // icon: require('@/assets/themes/hjb/black/ic_account_rcds.svg'),
            iconName: 'iconic-account-rcds',
            text: 'lang.user.accountDetails',
            path: '/accountDetail'
          },
          {
            // icon: require('@/assets/themes/hjb/black/ic_deposit_rcds.svg'),
            iconName: 'iconic-deposit-rcds',
            text: 'lang.user.rechargeRecord',
            path: '/RechargeRecord'
          },
          {
            // icon: require('@/assets/themes/hjb/black/ic_withdraw_rcds.svg'),
            iconName: 'iconic-withdraw-rcds',
            text: 'lang.user.withdrawalsRecord',
            path: '/withdrawalsRecord'
          },
          {
            // icon: require('@/assets/themes/hjb/black/ic_blctransfer.svg'),
            iconName: 'iconic-blctransfer1',
            text: 'lang.user.orderInquiry',
            path: '/Note'
          },
          // {
          //   icon: require('@/assets/themes/hjb/black/ic_blctransfer.svg'),
          //   text: 'lang.user.quotaConversion',
          //   path: '/balanceChange'
          // }
        ],
        cellList: [
          {
            icon: require('@/assets/themes/hjb/black/ic_mycollection.svg'),
            text: 'lang.user.myCollection',
            path: '/myCollection',
            iconName: 'iconic-mycollection'
          },
          // {
          //   icon: require('@/assets/themes/hjb/black/ic_mypromo.svg'),
          //   text: 'lang.user.myCollection',
          //   path: '/myCollection',
          //   iconName:'iconic-mypromo'
          // },
          // {
          //   icon: require('@/assets/themes/hjb/black/ic_24_service_2.svg'),
          //   text: 'lang.user.myCollection',
          //   path: '/myCollection',
          //   iconName:'iconic-24service2'
          // },
          // {
          //   icon: require('@/assets/themes/hjb/black/ic_help.svg'),
          //   text: 'lang.user.myCollection',
          //   path: '/myCollection',
          //   iconName:'iconic-inform'
          // },
          {
            icon: require('@/assets/themes/hjb/black/ic_mypromo.svg'),
            text: 'lang.user.myDiscountCoupon',
            path: '/myCoupon',
            iconName: 'iconic-mypromo'
          },
          {
            icon: require('@/assets/themes/hjb/black/ic_24_service_2.svg'),
            text: 'lang.user.contactCustomerService',
            path: '',
            iconName: 'iconic-24service'
          },
          {
            icon: require('@/assets/themes/hjb/black/ic_help.svg'),
            text: 'lang.user.helpAndFeedback',
            path: '/helpCenter',
            iconName: 'iconic-helpcenter'
          },
          {
            icon: require('@/assets/themes/hjb/black/ic_safety.svg'),
            text: 'lang.user.securityCenter',
            path: '/securityCenter',
            iconName: 'iconicons-ic-safetycenter'
          },
          {
            icon: require('@/assets/themes/hjb/black/ic_bonus.svg'),
            text: 'lang.user.bonusDetails',
            path: '/bonusInfo',
            iconName: 'iconic-safetycenter'
          },
          {
            icon: require('../assets/themes/hjb/black/ic_language.svg'),
            text: 'lang.user.language',
            iconName: 'iconic-language'
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        format_number: '_format_number',
      }),
      ...mapState([
        'lang',
        'isLogin',
        'accountType',
        'userInformation',
        'extInformation',
        'balance',
        'loop_timer',
        'loginInfo'
      ]),
      // ...mapGetters([ 'testInfo']),
      usersInfo() {
        console.log(this.userInformation, 'this.userInfo');
        return this.userInformation
      },
    },
    methods: {
      ...mapMutations({
        setData: 'SET_DATA'
      }),
      setDefaultRadio() {
        if (this.$i18n.locale === LANG.china) {
          this.radio = 1;
        } else if (this.$i18n.locale === LANG.english) {
          this.radio = 2;
        }
      },
      ...mapActions([
        'changeLangResetPost',
        'loopStatus'
      ]),
      ...mapMutations('user', ['SET_USER_INFO']),
      handleRefresh(type) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 1000)
        this.$http.users.getMoney().then((res) => {
          this.loading = false
          if (res) {
            if (type === 1) {
              this.$toast.success(this.$t('lang.common.refreshSuccessfully'))
            }
            let money = res.data.money;
            this.setData({key: 'balance', value: money});
            // this.usersInfo.money = money
            // this.SET_USER_INFO(this.usersInfo)
          }
        })
      },
      handleCellClick(v) {
        console.log(v);
        if (v.path === '') {
          this.showDialog = true
        } else if (['/helpCenter','/securityCenter','/bonusInfo'].includes(v.path)) {
          this.bouncePage(v.path)
        // } else if (v.path === "/bonusInfo") {
        //   if (!this.isLogin) {
        //     this.$toast.fail(this.$t('lang.tryItForFree.pleaseLogFirst'))
        //     setTimeout(() => {
        //       this.$router.push({path: '/Login'})
        //     }, 1000)
        //     return
        //   }
        //   this.showDialog = false
        //   this.$router.push(v.path)
        } else {
          this.showDialog = false
          this.$router.push(v.path)
        }
        if (v.text === "lang.user.language") {
          this.show = true;
        }
      },
      handleCloseDialog(val) {
        // console.log(val,333)
        this.showDialog = val
        this.isTryPlay = val
        this.isTryDialog = val
      },
      bouncePage(name) {
        if (!this.isLogin) {
          this.$toast.fail(this.$t('lang.tryItForFree.pleaseLogFirst'))
          setTimeout(() => {
            this.$router.push({path: '/Login'})
          }, 1000)
          return
        }
        if (this.accountType === 'TEST') {
          this.isTryDialog = true
          if (name === "/accountDetail") {
            this.$router.push(name)
          }
        } else {
          this.$router.push(name)
        }
      },
      handleRecharge() {
        if (!this.isLogin) {
          this.$toast.fail(this.$t('lang.tryItForFree.pleaseLogFirst'))
          setTimeout(() => {
            this.$router.push({path: '/Login'})
          }, 1000)
          return
        }
        //判断是否为体验用户 若为体验用户 提示登录/注册
        if (this.accountType === 'TEST') {
          this.isTryDialog = true
          //判断若是会员 是否设置了资金密码 若没有设置自己密码 跳转到设置资金密码界面
        } else {
          // console.log(JSON.parse(localStorage.getItem('extInfo')))
          // let userInfo = JSON.parse(localStorage.getItem('extInfo'))
          let userInfo = this.extInformation;
          if (userInfo.fundPwd === null || userInfo.fundPwd === '4a7d1ed414474e4033ac29ccb8653d9b') {
            this.$toast.fail(this.$t('lang.user.setFundPwd'));
            this.$router.push('/setFundsPassword')
            //判断若会员密码 判断是否已经绑定银行卡 若无银行卡 可选择跳转到帮卡界面
          } else {
            this.$router.push('/withDraw')
          }
        }
      },
      handleCancelTry() {
        this.isTryPlay = false;
        this.$toast.fail(this.$t('lang.tryItForFree.pleaseLogFirst'));
        setTimeout(() => {
          this.$router.push({path: '/Login'})
        }, 1000)
      },
      handleToTryPlay() {
        this.$http.users.regTest().then((res) => {
            if (res && res.code === 200) {
              console.log(res, '试玩试玩试玩试玩');
              this.setData({key: 'isLogin', value: true});
              sessionStorage.setItem('isLogin', JSON.stringify(true));
              this.$toast.success(this.$t('lang.loginContent.loginSuccessful'));
              this.setData({key: 'balance', value: res.data.money});
              let data = res.data;
              data.uid = Math.ceil(Math.random() * 10)// 用于 显示试玩用户头像
              this.setData({key: 'userInformation', value: data});
              // res.data.isLogin = true
              // res.data.money = 2000
              // this.SET_USER_INFO(res.data)
              // this.$store.dispatch('user/setTestInfo', res.data)
              this.isTryPlay = false
              this.$cookie.set('account', res.data.account)
              // this.$cookie.set('accountType', res.data.type)
              this.setData({key: 'accountType', value: res.data.type});
              localStorage.setItem('accountType', JSON.stringify(res.data.type));
              setTimeout(() => {
                this.$router.push('/')
              }, 1000)

            }
          }
        ).catch(err => {
          this.$toast.fail(err.data.msg)
          this.isTryPlay = false
        })
      },
      changeLang(val) {
        this.$i18n.locale = val;
        localStorage.setItem('lang', val);
        this.$cookie.set('language', val);
        this.setData({key: 'lang', value: val});
        // 重新调取更改语言要调取的接口
        this.changeLangResetPost({});
        // 清空首页接口存储，需要重新获取
        sessionStorage.removeItem('indexJson')
        sessionStorage.removeItem('firstJson')
        sessionStorage.removeItem('LotteryTypeList')
        console.log('切换语言');
        if(document.getElementsByTagName) {
          let html = document.getElementsByTagName('html')[0]
          if(html.lang) {
            html.lang = val.replace('_','-')
          }
        }
      }
    },
    mounted() {
      this.setDefaultRadio();
      // this.loopStatus({});
      // 版本
      // this.langType = JSON.parse(localStorage.getItem('langType'))
    },
    created() {
      // if (this.isVersion === 'blue') {
      //   this.cellList = [
      //     {
      //       icon: require('../assets/img/users/cz-b.svg'),
      //       text: 'lang.user.myCollection',
      //       path: '/myCollection'
      //     },
      //     {
      //       icon: require('../assets/img/users/tx-b.svg'),
      //       text: 'lang.user.myCollection',
      //       path: '/myCollection'
      //     },
      //     {
      //       icon: require('../assets/img/users/dl-b.svg'),
      //       text: 'lang.user.myCollection',
      //       path: '/myCollection'
      //     },
      //     {
      //       icon: require('../assets/img/users/sc-b.svg'),
      //       text: 'lang.user.myCollection',
      //       path: '/myCollection'
      //     },
      //     {
      //       icon: require('../assets/img/users/youhui-b.svg'),
      //       text: 'lang.user.myDiscountCoupon',
      //       path: '/myCoupon'
      //     },
      //     {
      //       icon: require('../assets/img/users/kf-b.svg'),
      //       text: 'lang.user.contactCustomerService',
      //       path: ''
      //     },
      //     {
      //       icon: require('../assets/img/users/bz-b.svg'),
      //       text: 'lang.user.helpAndFeedback',
      //       path: '/helpCenter'
      //     },
      //     {
      //       icon: require('../assets/img/users/aq-b.svg'),
      //       text: 'lang.user.securityCenter',
      //       path: '/securityCenter'
      //     },
      //     {
      //       icon: require('../assets/img/users/jiangjin-b.svg'),
      //       text: 'lang.user.bonusDetails',
      //       path: '/bonusInfo'
      //     },
      //     {
      //       icon: require('../assets/img/users/yx-b.svg'),
      //       text: '语言 / language'
      //     }
      //   ]
      // }
      // if (this.isVersion === 'orange') {
      //   this.cellList = [
      //     {
      //       icon: require('../assets/img/users/cz-q.svg'),
      //       text: 'lang.user.myCollection',
      //       path: '/myCollection'
      //     },
      //     {
      //       icon: require('../assets/img/users/tx-q.svg'),
      //       text: 'lang.user.myCollection',
      //       path: '/myCollection'
      //     },
      //     {
      //       icon: require('../assets/img/users/dl-q.svg'),
      //       text: 'lang.user.myCollection',
      //       path: '/myCollection'
      //     },
      //     {
      //       icon: require('../assets/img/users/sc-q.svg'),
      //       text: 'lang.user.myCollection',
      //       path: '/myCollection'
      //     },
      //     {
      //       icon: require('../assets/img/users/youhui-q.svg'),
      //       text: 'lang.user.myDiscountCoupon',
      //       path: '/myCoupon'
      //     },
      //     {
      //       icon: require('../assets/img/users/kf-q.svg'),
      //       text: 'lang.user.contactCustomerService',
      //       path: ''
      //     },
      //     {
      //       icon: require('../assets/img/users/bz-q.svg'),
      //       text: 'lang.user.helpAndFeedback',
      //       path: '/helpCenter'
      //     },
      //     {
      //       icon: require('../assets/img/users/aq-q.svg'),
      //       text: 'lang.user.securityCenter',
      //       path: '/securityCenter'
      //     },
      //     {
      //       icon: require('../assets/img/users/jiangjin-q.svg'),
      //       text: 'lang.user.bonusDetails',
      //       path: '/bonusInfo'
      //     },
      //     {
      //       icon: require('../assets/img/users/yx-q.svg'),
      //       text: '语言 / language'
      //     }
      //   ]
      // }
      // this.handleRefresh()
      // this.$i18n.locale = localStorage.getItem('lang')
      // if (this.$i18n.locale === 'zh' || this.$i18n.locale === null) {
      //   // console.log('3333');
      //   // this.$i18n.locale==='zh-CN'
      //   this.radio = '1'
      // } else {
      //   // console.log('4444');
      //   // this.$i18n.locale==='en-US'
      //   this.radio = '2'
      // }
    },
    // beforeDestroy() {
    //   clearInterval(this.loop_timer);
    //   this.setData({key: 'loop_timer', value: null})
    // },
  }
</script>
<style lang="scss" scoped>
  .user-box {
    /*除了颜色外，这是共同的架构，颜色在下面两个皮肤样式里面：.skin-gray，.skin-black*/
    height: 100%;
    /deep/ .van-dialog {
      background: none;
    }
    .content {
      height: 100%;
      padding-bottom: px2rem(80px);
      display: flex;
      flex-direction: column;
    }
    .user-header {
      position: relative;
      padding: px2rem(24px);
      height: px2rem(145px);
      border-bottom-left-radius: px2rem(10px);
      border-bottom-right-radius: px2rem(10px);
    }
    .user-set {
      position: absolute;
      right: px2rem(23px);
      top: px2rem(10px);
      color: #fff;
      display: flex;
      align-items: center;
      i {
        &.envelope {
          font-size: 22px;
          margin: 0 10px 0 0;
        }
      }
    }
    .user-nologin {
      display: flex;
      align-items: center;
      /*justify-content: center;*/
      font-size: px2rem(16px);
      margin-top: px2rem(10px);
      .tryPlay, .user-login-btn {
        min-width: px2rem(106px);
        height: px2rem(33px);
        border-radius: px2rem(25px);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 px2rem(8px);
        font-weight: 500;
        padding: 1px px2rem(10px) 4px;
        /*padding-bottom: 2px;*/
      }
      .tryPlay {

      }
      .user-login-btn {
        .line {
          margin: 0 px2rem(5px);
        }
      }
    }
    .user-login {
      display: flex;
      .user-img {
        margin-right: px2rem(12px);
        img {
          width: px2rem(52px);
          height: px2rem(52px);
        }
      }
    }
    .user-info {
      display: flex;
      flex-direction: column;
      .user-name {
        font-size: px2rem(16px);
        margin-bottom: 12px;
        /*line-height: px2rem(25px);*/
      }
      .user-money {
        font-size: px2rem(24px);
      }
      .money-point {
        margin: 0 0 0 px2rem(-5px);
        font-size: px2rem(18px);
      }
      .user-balance {
        .iconfont {
          margin-left: 8px;
        }
      }
    }
    .user-capital {
      width: 6.56rem;
      height: 1.32rem;
      display: flex;
      align-items: center;
      border-radius: .66rem;
      -webkit-backdrop-filter: blur(.36rem);
      backdrop-filter: blur(.36rem);
      font-size: .28rem;
      color: white;
      position: fixed;
      left: -50%;
      right: -50%;
      top: px2rem(90px);
      margin: auto;
      span {
        position: relative;
        height: 100%;
        &:not(:last-child) {
          &:after {
            content: '';
            width: 1px;
            height: 35px;
            background: rgba(110, 110, 110, 0.7);
            position: absolute;
            top: 15px;
            right: 0;
            transform: scaleX(0.5);
          }
        }
      }
      .withdraw, .recharge, .transfer {
        font-size: 0.3rem;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        word-break: break-all;

        .iconfont {
          font-size: 0.55rem;
          margin-right: 0.1rem;
        }
      }
    }
    .user-up-box {
      /*height:px2rem(165px);*/
    }
    .user-wrap {
      padding: 0px px2rem(10px) px2rem(10px);
      overflow: scroll;
      margin-top: px2rem(25px);
      .grid {
        display: flex;
        height: 1.4rem;
        align-items: center;
        justify-content: center;
        border-radius: px2rem(10px);
        margin-bottom: 0.3rem;
        .grid-item {
          display: flex;
          align-items: center;
          flex: 1;
          flex-direction: column;
          font-size: 0.2rem;
          .iconfont {
            font-weight: 600;
            font-size: 0.5rem;
            margin-bottom: 0.1rem;
          }
        }
      }
      .user-agent {
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.5rem;
        font-size: 0.3rem;
        margin-bottom: 0.2rem;
        border-radius: px2rem(10px);
        .iconfont {
          margin-right: px2rem(15px);
        }
      }
      .userList {
        padding: 0 px2rem(16px);
        border-radius: px2rem(10px);
        .list-item {
          display: flex;
          height: px2rem(50px);
          align-items: center;
          font-size: px2rem(15px);
          &:last-of-type {
            &::after {
              display: none;
            }
          }
          .iconfont {
            margin-right: px2rem(15px);
            margin-left: px2rem(10px);
          }
        }
      }
    }
    .user-lang-box {
      /*border:1px red solid;*/
      height: px2rem(185px);
      background: #24252D;
      color: #fff;
      /*margin-bottom: 80px;*/
      /deep/.van-icon{
        top: 12px;
        font-size: 18px;
      }
      .title {
        height: px2rem(45px);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: px2rem(15px);
        @include border-1px(#393940);
        &:after{
          right:0;
          left:0;
        }
      }
      .user-lang-wrap {
        display: flex;
        justify-content: center;
        padding: px2rem(20px);
        .langLogoStyle {
          width: px2rem(80px);
          height: px2rem(80px);
          border-radius: px2rem(6px);
          background: #16171b;
          color: #8f8f8f;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          margin: 0 px2rem(10px);
          img{
            width:25px;
            height:25px;
            border-radius: 50%;
          }
          &.active {
            background: linear-gradient(to bottom, #efcea6, #dab591);
            p {
              color: #533510;
              font-weight: 600;
            }
          }
          p {
            margin-top: px2rem(10px);
            font-size: px2rem(15px);
          }
        }
      }

    }
    .go-try-play-box {
      color: #fff;
      .dialog-content{
        padding:20px;
      }
      .content-center, .confirm-content {
        border-radius: px2rem(20px);
        overflow: hidden;
      }
      .dialog-title {
        text-align: center;
        line-height: 50px;
        font-size:15px;
        @include border-1px(#393940);
        &:after{
          left:0;
          right:0;
        }
      }
      .try-play-img {
        width: px2rem(180px);
        height: px2rem(105px);
        margin: 0 auto px2rem(40px);
      }
      .dialog-message {
        text-align: left;
        font-size: 13px;
        p{
          line-height: 25px;
        }
        .dialog-message-p {
         margin: 15px 0;
        }
        span {
          color: red;
          font-size: 16px;
        }
      }
      .dialog-footer {
        width: px2rem(200px);
        height: px2rem(45px);
        border-radius: px2rem(25px);
        margin: 0 auto 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        i {
          margin: 0 px2rem(4px);
        }
      }
      .close-box {
        width: px2rem(55px);
        height: px2rem(55px);
        border-radius: 50%;
        background: #24252D;
        margin: px2rem(15px) auto;
        color: #FFDE9A;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .skin-gray {
    /*灰色皮肤*/
    .user-box {
      .user-lang-box{
        background: $skin-gray-bg;
        .title{
          @include border-1px($skin-gray-border-color);
        }
        .user-lang-wrap .langLogoStyle{
          background:$skin-gray-con-bg;
          color:#fff;
          &.active{
            color:#533510;
            background: linear-gradient(to bottom, #efcea6, #dab591);
          }
        }
      }
      .header {
        background: linear-gradient(to bottom, #6C6891, #736F98);
      }
      .user-capital {
        background: linear-gradient(to bottom, #403E55, #37354B, #2B2A3F);
        box-shadow: 2px 2px 2px #39364E;
        .withdraw, .recharge, .transfer {
          .iconfont {
            /*background-image:-webkit-linear-gradient(bottom,#56A0FB,#3A72F4);*/
            /*-webkit-background-clip:text;*/
            /*-webkit-text-fill-color:transparent;*/
          }
        }
        .withdraw .iconfont {
          color: #56A0FB;
          /*background-image:-webkit-linear-gradient(top,#559FFB,#3A72F4);*/
          /*-webkit-background-clip: text;*/
          /*-webkit-text-fill-color: transparent;*/
        }
        .recharge .iconfont {
          color: #FE533F;
          /*background-image:-webkit-linear-gradient(top,#FD7E4D,#FF523F);*/
          /*-webkit-background-clip: text;*/
          /*-webkit-text-fill-color: transparent;*/
        }
        .transfer .iconfont {
          color: #77C06C;
          /*background-image:-webkit-linear-gradient(top,#A3E7A5,#77C06C);*/
          /*-webkit-background-clip: text;*/
          /*-webkit-text-fill-color: transparent;*/
        }
      }
      .grid {
        background: $skin-gray-con-bg;
        .grid-item {
          color: $skin-gray-text-color;
          .iconfont {
            background-image: -webkit-linear-gradient(left top, #FEE9C0, #F8D58E);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
      .user-agent {
        background: $skin-gray-con-bg;
        color: #fff;
        .iconfont {
          color: #07CEF3;
        }
      }
      .userList {
        background: $skin-gray-con-bg;
        .list-item {
          @include border-1px(#717180);
          color: #fff;
          .iconfont {
            color: #9A9AA7;
          }
        }
      }
      .user-header {
        background-image: linear-gradient(92deg, #54517b 0%, #747199 99%, #747199 99%);
      }
      .user-info {
        color: #fff;
      }
      .user-nologin {
        .tryPlay {
          color: #ffd57d;
          border: 1px #ffd57d solid;
        }
        .user-login-btn {
          background: linear-gradient(to bottom, #EDCCA4, #DCB793);
          color: #533510;
        }
      }
      .go-try-play-box {
        .content-center, .confirm-content {
          background: linear-gradient(to bottom, #403F56, #2B293F);
        }
        .dialog-title {
          @include border-1px($skin-gray-placeholder-color);
          &:after{
            left:0;
            right:0;
          }
        }
        .try-play-img {
          @include bg-image('../assets/themes/hjb/grey/img/try-play');
          background-size: cover;
        }
        .dialog-footer {
          color: #533510;
          background: linear-gradient(to bottom, #FFEBC2, #FFD680);
        }
      }
    }

  }

  .skin-black {
    /*黑色皮肤*/
    .user-box {
      .header {
        background: linear-gradient(to bottom, #65317d, #293384);
      }
      .user-capital {
        background: $skin-black-con-bg;
        .withdraw, .recharge, .transfer {
          .iconfont {
            color: #DCB793;
            /*background-image:-webkit-linear-gradient(bottom,#EECCA5,#DCB793);*/
            /*-webkit-background-clip:text;*/
            /*-webkit-text-fill-color:transparent;*/
          }
        }
      }
      .grid {
        background: $skin-black-con-bg;
        .grid-item {
          color: #8f8f8f;
          .iconfont {
            background-image: -webkit-linear-gradient(left top, #BA26EA, #1772D1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
      .user-agent {
        background: $skin-black-con-bg;
        color: #fff;
        .iconfont {
          color: #DFBB96;
        }
      }
      .userList {
        background: $skin-black-con-bg;
        .list-item {
          @include border-1px(#2F2F36);
          color: #fff;
          .iconfont {
            color: #606070;
          }
        }
      }
      .user-header {
        background-image: linear-gradient(to bottom, #65317d, #293384);
      }
      .user-info {
        color: #fff;
      }
      .user-nologin {
        .tryPlay {
          background: #322b4d;
          color: #8f8f8f;
          border: 1px #8f8f8f solid;
        }
        .user-login-btn {
          background: linear-gradient(to bottom, #EDCCA4, #DCB793);
          color: #533510;
        }
      }
      .go-try-play-box {
        .content-center, .confirm-content {
          background: $skin-black-con-bg;
        }
        .try-play-img {
          @include bg-image('../assets/themes/hjb/black/img/try-play');
          background-size: cover;
        }
        .dialog-footer {
          color: #533510;
          background-image: linear-gradient(to bottom, #efcea6, #dab591);
        }
      }
    }

  }

  /*.btn-vipmy {
     padding: 0px 5px !important;
   }

    .mine {
      height: 100%;

      .content {
        height: 100%;
        padding-bottom: 1rem;
        display: flex;
        flex-direction: column;

        .header {
          position: relative;
          height: 3.25rem;
          display: block;
          !*background: url(data:image/png;base64,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) no-repeat bottom;*!

          .van-icon {
            left: 6.9rem;
            top: .25rem;
          }

          .user-nologin {
            text-align: center;
            padding-top: .4rem;
            color: #fff;

            .hello {
              font-size: .36rem;
            }

            .u-btn {
              display: flex;
              //margin: .6rem;

              .u-btntwo {
                width: 2.8rem;
                height: .64rem;
                line-height: .64rem;
                font-size: .28rem;
                font-weight: lighter;
              }

              .button-hollow {
                color: #fff;
                position: relative;
              }

              .m-button {
                margin: auto;
                border-radius: .1rem;
                text-align: center;
              }

              .m-button.button-hollow::after {
                position: absolute;
                content: "";
                transform-origin: 0 0;
                pointer-events: none;
                box-sizing: border-box;
                border: 1px solid #fff;
                opacity: .5;
                border-radius: .1rem;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                transform: translateZ(0) scale(1);
              }

              .u-btnbkgcr {
                background-color: hsla(0, 0%, 100%, .34);
              }
            }
          }

          .user-login {
            .u-head {
              line-height: .8rem;
              width: 100%;
              margin-left: .2rem;
              display: flex;

              .btn-vip {
                height: .6rem;
                line-height: .6rem;
                margin-left: 1rem;
                padding: 0rem .3rem 0rem .75rem;
                border: .02rem solid #ff8500;
                border-radius: 1rem;
                background-image: linear-gradient(180deg, #ffd85a, #ffb02d);
                font-size: .28rem;
                position: relative;

                .circle {
                  width: .6rem;
                  height: .6rem;
                  border-radius: 50%;
                  background-color: #fff;
                  position: absolute;
                  top: 0;
                  left: 0;

                  .icon-small {
                    width: .5rem;
                    top: .1rem;
                    left: .05rem;
                    position: absolute;
                  }
                }
              }

              .img-head {
                width: 1rem;
                height: 1rem;
                position: absolute;
              }

              .user_name {
                font-size: .33rem;
                color: #fff;
                position: absolute;
                left: 1.4rem;
              }
            }

            .user-balance {
              border-top-left-radius: .1rem;
              border-top-right-radius: .1rem;
              position: absolute;
              width: 93%;
              left: 50%;
              margin-left: -46.5%;

              .balance {
                font-size: .26rem;
                margin: .4rem 0 0 .3rem;
                color: #666;
              }

              .b-money {
                margin: .1rem 0 0 .3rem;
                font-weight: 700;
                color: #000;
                display: flex;
                font-size: .48rem;
              }

              .refresh {
                bottom: .35rem;
                right: .2rem;
                font-size: .48rem;
                color: #000;
                position: absolute;
              }

              .turn {
                transition: all 1s;
                transform: rotate(1deg);
              }
            }
          }
        }

        .g-content {
          !*background-color: #f5f5f9;*!
          flex: 1;
          !*overflow: scroll;*!

          .user-capital {
            !*text-align: center;*!
            !*height: .87rem;*!
            !*display: flex;*!
            !*align-items: center;*!
            !*justify-content: space-around;*!
            !*background-color: #fff;*!
            !*color: #c00;*!

            !*.withdraw, .recharge,.transfer {*!
            !*  font-size: .3rem;*!
            !*  flex: 1;*!
            !*  width: 100%;*!
            !*  height: 1rem;*!
            !*  line-height: 1rem;*!
            !*  word-break: break-all;*!
            !*  .iconfont {*!
            !*     font-size:0.55rem;*!
            !*     color:#DCB893;*!
            !*     !*margin-right: .05rem;*!*!
            !*   }*!
            !*}*!

            !*.iconfont {*!
            !*  width: .6rem;*!
            !*  vertical-align: middle;*!
            !*}*!

            .recharge {
              border-left: 1px solid #e5e5e5;
              border-right: 1px solid #e5e5e5;
            }
          }

          .grid {
            margin-top: .2rem;
            background: #fff;
            display: flex;
            flex-direction: row;

            .grid-item {
              flex: 1;
              position: relative;
              padding: 0.32rem 0.16rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              border-left: 0.01rem solid #ebedf0;
              .iconfont{
                font-size:0.5rem;
                font-weight: 600;
                background-image:-webkit-linear-gradient(bottom,#1672D1,#C024EB);
                -webkit-background-clip:text;
                -webkit-text-fill-color:transparent;
              }
              span {
                margin-top: 0.2rem;
              }

              img {
                width: 0.4rem
              }
            }
          }

          .user-other {
            font-size: .28rem;
            background-color: #fff;
            line-height: .88rem;
            margin: .2rem 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 .2rem;

            .user-proxy {
              margin-left: .3rem;
              display: inline-block;
            }
          }
          .user-agent{
            .iconfont{
              color:#DEB995;
            }
          }
          .user-agent,.userList{
            .iconfont{
              font-size:0.35rem;
            }
          }
          .userList{
            .iconfont{
              color:#606070;
            }
          }

          ::v-deep.van-cell {
            padding: 0;
          }

          .user-cell {
            line-height: 0.5rem;
          }

          .security {
            margin-left: 2.5rem;
            color: #ccc;
            font-size: .26rem
          }
        }
      }

      .content-center {
        .dialog-title {
          text-align: center;
          font-size: .34rem;
          background: $global-bgcolor;
          color: #fff;
          line-height: .8rem;
          border-radius: .1rem .1rem 0 0;
          position: relative;
        }

        .dialog-content {
          padding: .8rem .3rem;
          font-size: .3rem;
          text-align: center;
        }

        .dialog-footer {
          position: relative;
          height: .9rem;
          display: flex;
          align-items: center;
          justify-content: space-around;

          .button {
            text-align: center;
            color: #c00;
            font-size: .34rem;
            line-height: .36rem;
            flex: 1;
          }

          .cancel {
            position: relative;
            color: #666;
          }

          .cancel:after {
            position: absolute;
            content: "";
            transform-origin: 0 0;
            pointer-events: none;
            box-sizing: border-box;
            z-index: 0;
            border-right: 1px solid #e5e5e5;
            border-radius: 0;
            height: 100%;
            top: 0;
            right: 0;
            bottom: 0;
            transform: translate3d(50%, 0, 0) scale(1);
          }
        }

        .dialog-footer:after {
          position: absolute;
          content: "";
          transform-origin: 0 0;
          pointer-events: none;
          box-sizing: border-box;
          z-index: 0;
          border-top: 1px solid #e5e5e5;
          border-radius: 0;
          width: 100%;
          left: 0;
          top: 0;
          right: 0;
          transform: translateZ(0) scale(1);
        }
      }

      .m-vital-confirm {
        background-color: #fff;
        border-radius: .2rem;
        width: 100%;
        text-align: center;

        .confirm-content {
          padding: .8rem 0 .4rem 0;

          .confirm-img {
            margin-bottom: .6rem;
            width: 2.8rem;
            height: auto;
          }

          .bold {
            font-weight: 700;
            font-size: .36rem;
            margin: 0 .3rem 0 .3rem;
            text-align: center;
            white-space: pre-line;
          }

          .tip {
            margin-top: .2rem;
            color: #666;
            font-size: .26rem;
          }

          .m-button {
            margin: .6rem auto .5rem auto;
            color: #fff;
            background: $global-bgcolor;
            width: 3.3rem;
            height: .8rem;
            line-height: .8rem;
            font-size: .36rem;
            box-shadow: 0 0 #eda6a6, 0.1em 0.1rem 0.3rem #eda6a6;
            border-radius: .1rem;
            text-align: center;
          }

          .no {
            font-size: .28rem;
            color: #999;
          }
        }
      }
    }*/

  //.langLogoStyle {
  //  display: flex;
  //  align-items: center;
  //}
</style>
