<template>
  <div class="apply-agency-box">
    <Header :headObj="headObj" @leftClick="$router.push('/user')" @rightClick="showDialog=true"/>
    <div class="apply-agency-wrap">
      <div class="apply-agency-con">
        <p>{{$t('lang.apply_agency.agency[0]')}}<span>{{randomFrom(899999,999999)}}</span>{{$t('lang.apply_agency.agency[1]')}}</p>
        <p>{{$t('lang.apply_agency.money[0]')}}<span>{{randomFrom(200,249)+'.'+randomFrom(10,99)}}</span>{{$t('lang.apply_agency.money[1]')}}</p>
      </div>
      <div class="apply-agency-btn">
        <button @click="showDialog=true">{{$t('lang.apply_agency.btn[0]')}}</button>
        <router-link :to="{name:'Introduce'}">{{$t('lang.common.agentDescription')}}</router-link>
      </div>
    </div>
    <Customerserve :showDialog="showDialog" @closeDialog="handleCloseDialog"/>
  </div>
</template>

<script>
  import Header from '../../commons/header/Header'
  import Customerserve from '../../commons/customerserve/Customerserve'

  export default {
    name: "ApplyingForAgency",
    components: {
      Header,
      Customerserve
    },
    data() {
      return {
        headObj: {
          title: 'lang.header.ApplicationAgent',
          showArrow: true,
          rightText: 'lang.user.contactCustomerService'
        },
        showDialog: false,
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      handleCloseDialog(val) {
        this.showDialog = val
      },
      randomFrom(lowerValue, upperValue) {
        return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
      }
    }
  }
</script>

<style scoped lang="scss">
  .apply-agency-box{
    height:100%;
    .apply-agency-wrap{
      height:100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: url(../../assets/img/user/apply_agency_box_bg.png) no-repeat;
      background-size: 100% 100%;
      .apply-agency-con{
        margin-top: 150px;
        p{
          font-size:18px;
          color:#fff;
          margin-bottom: 10px;
          text-align: center;
          span{
            color:#ffed2a;
            margin:0 5px;
          }
        }
      }
    }
    .apply-agency-btn{
      display: flex;
      flex-direction: column;
      align-items: center;
      button{
        min-width: 170px;
        height: 52px;
        margin: 30px 27px 19px 12px;
        padding: 10px 40px 10px 41px;
        border-radius: 8px;
        border: 0;
        box-shadow: 0 2px 4px 0 #3928f4;
        background-color: #ffffff;
        cursor: pointer;
        font-size:23px;
        color:#5a4df3;

      }
      a{
        color:#fff;
        font-size:16px;
        text-decoration: underline;
      }
    }
  }

</style>
