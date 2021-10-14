<template>
  <div class="agent-center-box">
    <Header :headObj="headObj" @leftClick="$router.push('/user')" @rightClick="showDialog=true"/>
    <div class="agent-center-wrap">
      <NotData v-if="Object.keys(teamData).length === 0" :isNotData="isNotData"/>
      <div class="agent-center-con" v-else>
        <div class="agent-info-box">
          <div class="user-data">
            <div class="user-img">
              <img :src="loginInfo && loginInfo.avatar" class="img-head">
            </div>
            <ul>
              <li>
                <label>{{$t('lang.daiLiZhongXin.UserName')}}：</label>
                <span>{{$store.state.userInformation.account}}</span>
              </li>
              <li>
                <label>{{$t('lang.daiLiZhongXin.lotteryRebates')}}：</label>
                <span>{{ ($store.state.accountType=== 1 ? $t('lang.daiLiZhongXin.type[0]') : ($store.state.accountType === 0 ?
                $t('lang.footer.member') : '')) + ' — ' + $store.state.userInformation.rebate + '%' }}</span>
              </li>
              <li>
                <label>{{$t('lang.daiLiZhongXin.accountBalance')}}：</label>
                <!--                <span>{{ parseFloat($store.state.balance).toFixed(2) }}{{ $t('lang.common.yuan') }}</span>-->

                <span>
                  <span class="user-money">
                    {{ balance == null ? '0' : format_number(balance).split('.')[0] }}</span><em class="money-point">{{ balance == null ? '.00' :'.'+format_number(balance).split('.')[1] }}{{ $t('lang.common.yuan') }}
                  </em>
                </span>
              </li>
            </ul>
          </div>
          <div class="agent-team">
            <ul>
              <li>
                <p>
                  <i class="iconfont iconyuandianxiao"></i>
                  <label>{{ $t('lang.daiLiZhongXin.teamSize') }}</label>
                </p>
                <h1>{{ teamData.teamCount }}</h1>
              </li>
              <li>
                <p>
                  <i class="iconfont iconyuandianxiao"></i>
                  <label>{{ $t('lang.daiLiZhongXin.teamBalance') }}</label>
                </p>
                <!--                <h1>{{ teamData.money.toFixed(2) }}</h1>-->
                <h1>
                  <i class="user-money">
                    {{ teamData.money == null ? '0' : format_number(teamData.money).split('.')[0] }}</i><em class="money-point">{{ teamData.money == null ? '.00' :'.'+format_number(teamData.money).split('.')[1] }}
                </em>
                </h1>
              </li>
              <li>
                <p>
                  <i class="iconfont iconyuandianxiao"></i>
                  <label>{{ $t('lang.daiLiZhongXin.yesterdaysCommission') }}</label>
                </p>
                <h1>0</h1>
              </li>
              <li>
                <p>
                  <i class="iconfont iconyuandianxiao"></i>
                  <label>{{ $t('lang.daiLiZhongXin.cumulativeCommission') }}</label>
                </p>
                <h1>{{ teamData.dlRebate }}</h1>
              </li>
            </ul>
          </div>
        </div>
        <div class="agent-center-link">
          <Grid :gridList="gridList"/>
        </div>
      </div>
    </div>
    <Customerserve :showDialog="showDialog" @closeDialog="handleCloseDialog"/>
  </div>
</template>

<script>
  import Header from '../../commons/header/Header'
  import Grid from '../../commons/grid/Grid'
  import Customerserve from '../../commons/customerserve/Customerserve'
  import NotData from "../../commons/notdata/NotData";
  import utils from "../../utils/utils";
  import {mapGetters, mapState} from 'vuex'

  export default {
    name: 'AgentCenter',
    components: {
      Header,
      Grid,
      Customerserve,
      NotData
    },
    data() {
      return {
        headObj: {
          title: 'lang.daiLiZhongXin.agencyCenter',
          showArrow: true,
          rightText: '',

        },
        gridList: [
          {
            text: 'lang.daiLiZhongXin.agentDescription',
            path: '/Introduce',
            icon: require("@/assets/themes/hjb/black/ic_agnetinfo.svg"),
            iconName: ' iconfont iconic-agnetinfo',
          },
          {
            text: 'lang.daiLiZhongXin.teamOverview',
            path: this.$store.state.accountType === 1 ? '/teamOverView' : '/Introduce',
            icon: require("@/assets/themes/hjb/black/ic_group.svg"),
            iconName: ' iconfont iconic-group',
          },
          {
            text: 'lang.daiLiZhongXin.userList',
            path: this.$store.state.accountType === 1 ? '/userList' : '/Introduce',
            icon: require("@/assets/themes/hjb/black/ic_member.svg"),
            iconName: ' iconfont iconic-member',
          },
          {
            text: 'lang.daiLiZhongXin.registrationManagement',
            path: this.$store.state.accountType === 1 ? '/enrollmentManagement' : '/Introduce',
            icon: require("@/assets/themes/hjb/black/ic_manager.svg"),
            iconName: ' iconfont iconic-manager',
          },
          {
            text: 'lang.daiLiZhongXin.promotionRegistration',
            path: this.$store.state.accountType === 1 ? '/promotionRegistration' : '/Introduce',
            icon: require("@/assets/themes/hjb/black/ic_register.svg"),
            iconName: ' iconfont iconic-register',
          }
        ],
        // styles: {
        //   marginTop: '.10rem'
        // },
        userType: '',
        showDialog: false,
        isNotData: true,
        params: {
          userId: this.$store.state.userInformation.id,
          beginDate: '',
          endDate: '',
        },
        teamData: {}
      }
    },
    async created() {
      const countData = await this.getUserTeamOverDate(utils.dateFormat(new Date(), 2), utils.dateFormat(new Date(), 2))
      console.log(countData)
      if (countData.code === 200) {
        console.log('aaa')
        this.teamData = countData.data
        console.log(this.teamData);
      }
    },
    computed:{
      ...mapState([
        'balance',
        'userInformation',
        'loginInfo'
      ]),
      ...mapGetters({
        format_number: '_format_number',
      }),
    },
    methods: {
      handleCloseDialog(val) {
        this.showDialog = val
      },
      async getUserTeamOverDate(beginDate, endDate) {
        this.params.beginDate = beginDate + ' 00:00:00'
        this.params.endDate = endDate + ' 23:59:59'
        return new Promise((resolve, reject) => {
          this.$http.account.queryTeamOverView(this.params).then(res => {
            resolve(res)
          }).catch(error => {
            reject(error)
          })
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .agent-center-box{
    height:100%;
    display: flex;
    flex-direction: column;
    .agent-center-con{
      padding:15px;
    }
    .agent-info-box,.agent-center-link{
      background: #24252D;
      margin-bottom: 10px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .agent-center-wrap{
      flex:1;
      overflow-y: scroll;
    }

    .agent-info-box{
      .user-data{
        min-height: px2rem(100px);
        display: flex;
        align-items: center;
        padding:px2rem(10px) px2rem(20px);
        @include border-1px(#393940);
        .user-img{
          width:px2rem(55px);
          height:px2rem(55px);
          border-radius: 50%;
          margin-right: px2rem(12px);
        }
        ul{
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          flex:1;
          li{
            display: flex;
            align-items: center;
            line-height: px2rem(28px);
            label{
              font-size:px2rem(12px);
              min-width: px2rem(65px);
              color:#9a9aa7;
            }
            span{
              font-size: px2rem(15px);
              flex:2;
              color:#fff;
            }
          }
        }
      }
      .agent-team{
        padding:px2rem(10px) px2rem(20px) 0;
        ul{
          display: flex;
          flex-wrap: wrap;
          li{
            width:50%;
            margin-bottom: px2rem(10px);
            p{
              display: flex;
              align-items: center;
              font-size: px2rem(12px);
              line-height: px2rem(20px);
              label{
                color:#9a9aa7;
              }
            }
            h1{
              font-size:px2rem(20px);
              margin-left: px2rem(20px);
              line-height: px2rem(30px);
              color:#fff;
            }
            &:nth-child(1){
              .iconfont{
                color:#C71313;
              }
            }
            &:nth-child(2){
              .iconfont{
                color:#F2890B;
              }
            }
            &:nth-child(3){
              .iconfont{
                color:#08A33B;
              }
            }
            &:nth-child(4){
              .iconfont{
                color:#1F25F3;
              }
            }
          }
        }
      }
    }
  }

  .skin-gray {
    .agent-center-box {
      .agent-info-box, .agent-center-link {
        background: $skin-gray-con-bg;
      }
    }
  }

  .skin-black {
    .agent-center-box {
      .agent-info-box, .agent-center-link {
        background: $skin-black-con-bg;
      }
    }
  }


</style>
