<template>
  <div class="withdraw-wrapper">
    <Header :headObj="headObj"
            @leftClick="$router.push('/user')"
            @rightClick="$router.push(successWithdraw?'/withdrawalsRecord':'/AuditDetails')"
            :rightText="headObj.rightText"/>
    <div class="main">
      <div class="user-info-wrapper">
        <div class="avatar">
          <img :src="'/data/userimg/userimg' + userInfo.uid%5 + '.png'" alt="">
        </div>
        <div class="user-info">
          <span>{{ userInfo.account }}</span>
          <div class="user-balance">
            {{ $t('lang.common.AccountBalance') }}:
            <span>{{balance === null ? '0.00' : _format_number(balance) }}</span>
          </div>
        </div>
        <div class="refresh">
          <i class="iconfont iconshuaxin"
             @click=""></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "../../commons/header/Header";
  import NotData from "../../commons/notdata/NotData";
  import Customerserve from '../../commons/customerserve/Customerserve'
  import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

  export default {
    name: "WithDraw",
    components: {
      Header,
      NotData,
      Customerserve
    },
    data() {
      return {
        headObj: {
          title: 'lang.header.Withdrawal',
          showArrow: true,
          rightText: 'lang.common.auditDetails'
        },
        successWithdraw: false,
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {
      ...mapState([
        'userInformation',
        'userBank',
        'balance'
      ]),
      ...mapGetters({
        _format_number: '_format_number'
      }),
      userInfo() {
        return this.userInformation
      }
    },
    methods: {
      ...mapActions([
        'getUserInfo'
      ]),
    }

  }
</script>

<style lang="scss" scoped>
  .withdraw-wrapper {
    .main {
      .user-info-wrapper {
        width: 90%;
        margin: .2rem auto 0 ;
        background: pink;
        border-radius: .2rem;
        display: flex;
        height: 1.5rem;
        .avatar{
          flex: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            width: 1.2rem;
          }

        }
        .user-info{
          flex: 4;
        }
        .refresh{
          flex: 1;
        }
      }
    }
  }
</style>
