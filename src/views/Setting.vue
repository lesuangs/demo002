<template>
  <div class="setting setting-box">
    <Header class="setting-header" :headObj="headObj"
            @leftClick="$router.push('/user')"/>
    <div class="setting-container">
      <div class="setting-title">{{ $t('lang.setting.Universal') }}</div>
      <van-cell-group>
        <van-cell @click="handleCheck">
          <div class="user-other user-cell">
            <p>
              <span class="user-proxy">{{ $t('lang.setting.versionCheck') }}</span>
            </p>
            <div>
              <span class="security">{{ $t('lang.setting.currentVersion') }}1.8.42</span>
              <van-icon name="arrow" color="#a8a8a8"/>
            </div>
          </div>
        </van-cell>
        <van-cell @click="$router.push('/aboutUs')">
          <div class="user-other user-cell">
            <p>
              <span class="user-proxy">{{ $t('lang.setting.aboutUs') }}</span>
            </p>
            <van-icon name="arrow" color="#a8a8a8"/>
          </div>
        </van-cell>
        <van-cell @click="handleCache">
          <div class="user-other user-cell">
            <p>
              <span class="user-proxy">{{ $t('lang.setting.clearCache') }}</span>
            </p>
            <van-icon name="arrow" color="#a8a8a8"/>
          </div>
        </van-cell>
      </van-cell-group>

      <div class="btnDiv" v-if="isLogin">
        <van-button type="danger"
                    @click="handleLogOut">
          {{ $t('lang.setting.dropOut') }}
          <img :src="require('@/assets/themes/hjb/black/ic_logout.svg')" alt=""/>
        </van-button>

      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../commons/header/Header'
  import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

  export default {
    name: 'Setting',
    components: {
      Header
    },
    data() {
      return {
        headObj: {
          title: 'lang.setting.setting',
          showArrow: true
        }
      }
    },
    computed: {
      ...mapState([
        'isLogin'
      ]),
      // ...mapGetters(['userInfo', 'testInfo']),
      // isLogin() {
      //   console.log(this.userInfo.isLogin || this.testInfo.isLogin || false)
      //   return this.userInfo.isLogin || this.testInfo.isLogin || false
      // }
    },
    methods: {
      ...mapMutations({
        setData: 'SET_DATA'
      }),
      ...mapActions([
        'loginOut',
      ]),
      ...mapMutations('user', ['SET_LOG_OUT']),
      handleCheck() {
        this.$toast('1.8.42')
      },
      handleCache() {
        this.$dialog.alert({
          message: this.$t('lang.setting.cacheCleared'),
          confirmButtonText: this.$t('lang.setting.IKnow'),
          confirmButtonColor: '#c00'
        }).then(() => {
          localStorage.setItem('imgSuffix', Math.ceil(Math.random() * 10000))
        })
      },
      handleLogOut() {
        sessionStorage.removeItem('allQueryData')
        this.$store.commit('user/clearUser')
        this.loginOut().then((_data) => {
          if (_data) {
            this.$router.push('/User')
          }
        }, (rej) => {
        });
      }
      //   this.$store.commit('user/clearUser')
      //   sessionStorage.removeItem('allQueryData')
      //   this.$http.users.logout().then((res) => {
      //     console.log(res, 'logout');
      //     if (res && res.status === 200) {
      //       console.log(123);
      //       // localStorage.clear()
      //       this.setData({key: 'isLogin', value: false}); // 设置登录状态为false
      //       sessionStorage.setItem('isLogin', JSON.stringify(false));
      //       // this.SET_LOG_OUT(res.data);
      //       this.$router.push('/User')
      //     }
      //   }).catch(() => {
      //   })
      // }
    },
    mounted() {

    },
    created() {

    }
  }
</script>

<style lang="scss" scoped>
  .setting-box {
    /deep/ .van-cell-group {
      background: none;
      .van-cell{
        min-height: 50px;
        display: flex;
        align-items: center;
      }
    }
  }

  .skin-gray {
    .setting-box {
      /deep/ .van-cell-group, .setting-title {
        background: $skin-gray-con-bg;
      }
    }
  }

  .skin-black {
    .setting-box {
      /deep/ .van-cell-group, .setting-title {
        background: $skin-black-con-bg;
      }
    }
  }

  .setting {
    &-container {
      /*background-color: #f5f5f9;*/
      min-height: 15rem;
    }

    &-title {
      text-indent: .2rem;
      padding: 0;
      line-height: .7rem;
      height: .7rem;
      /*background-color: #f5f5f9;*/
      color: #999;
      font-size: .2rem;
    }

    .user-other {
      font-size: .28rem;
      /*background-color: #fff;*/
      line-height: .88rem;
      margin: .2rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 .2rem;
      .security{
        margin-right: 10px;
      }

      .user-proxy {
        //margin-left: .3rem;
        display: inline-block;
      }
    }

    .btnDiv, .btnDivOrg, .btnDivBlue {
      margin-top: .6rem;
      display: flex;
      flex-direction: row;
      justify-content: center;

      ::v-deep .van-button {
        background: #dd413a;
        width: 6.9rem;
        height: .8rem;
        border: none;
      }
    }

    .btnDivOrg {
      ::v-deep .van-button {
        background: #f67d36;
      }
    }

    .btnDivBlue {
      ::v-deep .van-button {
        background: #0047cc;
      }
    }

    ::v-deep .van-cell {
      padding: 0;
    }

    .user-cell {
      line-height: 0.5rem;
    }
  }
</style>
