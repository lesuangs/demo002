<template>
  <div class="introduce security-center-box">
    <Header :headObj="headObj" @leftClick="$router.push('/user')"/>
    <!--    <NotData v-if="cardNo.length === 0 ? true :false " :isNotData="isNotData"/>-->
    <div class="g-content" >
      <van-cell-group  class="safeCenter">
     <!--   <van-cell :title="$t('lang.SecurityCenter.myBankCard')" :value="userBank === null ? $t('lang.SecurityCenter.unboundCard') : userBank.cardNo" is-link
                  @click="userBank === null ? $router.push('/BankCardData') :$router.push('/myBankInfo')"/>-->
        <van-cell :title="$t('lang.SecurityCenter.myBankCard')" :value="userBank === null ? $t('lang.SecurityCenter.unboundCard') : userBank.cardNo" is-link
                  @click="$router.push('/myBankInfo')"/>
        <van-cell :title="$t('lang.SecurityCenter.loginPassword')" :value="$t('lang.state.changeLoginPwd')" is-link
                  @click="$router.push('/changePassword')"/>
        <van-cell
                v-if="isSetPwd"
                :title="$t('lang.SecurityCenter.fundPassword')" :value="$t('lang.state.notSet')" is-link
                @click="$router.push('/setFundsPassword')"/>
        <van-cell v-else
                  :title="$t('lang.SecurityCenter.fundPassword')" :value="$t('lang.state.yesSet')" is-link
                  @click="$router.push('/setFundsPassword')"/>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  import Header from '@/commons/header/Header'
  import NotData from '@/commons/notdata/NotData'
  import {mapActions,mapState} from "vuex";

  export default {
    name: 'SecurityCenter',
    components: {
      Header,
      NotData
    },
    data() {
      return {
        headObj: {
          title: 'lang.user.securityCenter',
          showArrow: true
        },
        cardNo: '',
        isNotData: true
      }
    },
    computed:{
      ...mapState(['extInformation','userBank']),
      isSetPwd(){
        //控制标头的
        //为空时，为Null时，就是设置密码；
        if(this.extInformation.fundPwd === '' || this.extInformation.fundPwd === null){
          return true;
        }else{
          //则修改密码
          return false;
        }
        //等于'4a7d1ed414474e4033ac29ccb8653d9b'时，则为修改密码
      },
      // getExtInformation(){
      //   return this.$store.state.extInformation;
      // },
      // getUserBank(){
      //   return this.$store.state.userBank;
      // }
    },
    watch: {
      // getExtInformation1(curVal, oldVal) {
      //   return curVal;
      //   //这里的curVal就是需要监听的值
      // },
      // getUserBank(curVal, oldVal) {
      //   return curVal;
      //   //这里的curVal就是需要监听的值
      // }
      //   'extInformation.fundPwd': {
      //     handler(val){
      //       console.log(val,'extInformation is change')
      //     },
      //     immediate: true,
      //     deep:true,
      //   },
      //   'userBank': {
      //     handler(val){
      //       console.log(val,'userBank is change')
      //     },
      //     immediate: true,
      //     deep:true,
      //   }
    },
    async created() {
      // console.log(this.cardNo.length);
      // this.getUserInfo({});
      // const userBank = await this.getUserBank()
      // if (this.userBank.userBank == null) {
      //   this.cardNo = '未绑定银行卡'
      // } else {
      //   this.cardNo = this.userBank.userBank.cardNo;
      // }
      // console.log(this.cardNo.length);
    },
    methods: {
      ...mapActions([
        'getUserInfo'
      ]),
      // async getUserBank() {
      //   return new Promise((resolve, reject) => {
      //     this.$http.home.getUserInfo().then(res => {
      //       resolve(res.data)
      //     }).catch(error => {
      //       reject(error)
      //     })
      //   })
      // }
    }
  }
</script>

<style lang="scss" scoped>

  .security-center-box{
    /deep/.van-cell-group{
      background: none;
      .van-cell{
        min-height:px2rem(52px);
        background: none;
      }
      .van-cell__value{
        flex:2;
        text-align: left;
        color:#fff;
      }
    }
  }
  .skin-gray{
    .safeCenter{
      background: $skin-gray-con-bg;
      /deep/.van-cell__title{
        color:$skin-black-text-color;
      }
    }
  }
  .skin-black{
    .safeCenter{
      background: $skin-black-con-bg;
      /deep/.van-cell__title{
        color:$skin-black-text-color;
      }
    }
  }


.introduce {
  display: flex;
  flex-direction: column;

  .g-content {
    flex: 1;
    overflow: scroll;
    /*min-height: 13rem;*/
    height: 100%;
    width: 100%;
    position: absolute;
    /*background-color: #f5f5f9;*/
    /*padding: .2rem;*/
  }
}
</style>
