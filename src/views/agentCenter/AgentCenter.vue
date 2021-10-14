<template>
  <div class="agent agent-center-box">
    <Header :headObj="headObj" @leftClick="$router.push('/user')" @rightClick="showDialog=true"/>
    <div class="agent-center-wrap">
      <NotData v-if="Object.keys(teamData).length === 0" :isNotData="isNotData"/>
      <div class="g-content" v-else>
        <div class="g-box">
          <div class="userData">
            <div class="data-left">
              <img :src="loginInfo && loginInfo.avatar" class="img-head">
<!--              <img :src="'/data/userimg/userimg' + ($store.state.userInformation.uid)%5 + '.png'" alt="">-->
            </div>
            <div class="data-right">
              <div><span
                      style="margin-right: .25rem">{{
                $t('lang.daiLiZhongXin.UserName')
              }}：</span><i>{{ userInformation.account }}</i>
              </div>
              <div>
              <span>{{
                  $t('lang.daiLiZhongXin.lotteryRebates')
                }}：</span><i>{{
                ($store.state.accountType === 1 ? $t('lang.daiLiZhongXin.type[0]') : ($store.state.accountType === 0 ?
                $t('lang.footer.member') : '')) + ' — ' + userInformation.rebate + '%'
                }}</i>
              </div>
              <div>
              <span>{{
                  $t('lang.daiLiZhongXin.accountBalance')
                }}：</span>
                <i>
                  <i class="user-money">{{ balance == null ? '0' : format_number(balance).split('.')[0] }}</i><em class="money-point">{{ balance == null ? '.00' :'.'+format_number(balance).split('.')[1] }}{{ $t('lang.common.yuan') }}</em>
                </i>
<!--                <i>{{ parseFloat($store.state.balance).toFixed(2) }}{{ $t('lang.common.yuan') }}</i>-->
              </div>
            </div>
          </div>
          <div class="teamDateFex">
            <div class="teamDate">
              <p style="margin-right: .2rem;" class="red">{{ $t('lang.daiLiZhongXin.teamSize') }}</p>
              <h3>{{ teamData.teamCount }}</h3>
            </div>
            <div class="teamDate">
              <p style="margin-right: .2rem;" class="orange">{{ $t('lang.daiLiZhongXin.teamBalance') }}</p>
<!--              <h3>{{ teamData.money.toFixed(2) }}</h3>-->
              <h3>
                <i class="user-money">{{ teamData.money == null ? '0' : format_number(teamData.money).split('.')[0] }}</i><em class="money-point">{{ teamData.money == null ? '.00' :'.'+format_number(teamData.money).split('.')[1] }}</em>
              </h3>
            </div>
            <div class="teamDate">
              <p style="margin-right: .2rem;" class="green">{{ $t('lang.daiLiZhongXin.yesterdaysCommission') }}</p>
              <h3>0</h3>
            </div>
            <div class="teamDate">
              <p style="margin-right: .2rem;" class="blue">{{ $t('lang.daiLiZhongXin.cumulativeCommission') }}</p>
              <h3>{{ teamData.dlRebate }}</h3>
            </div>
          </div>
        </div>
        <div class="agent-center">
          <div class="content">
            <Grid :gridList="gridList"/>
          </div>
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
  .agent-center-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    .agent-center-wrap {
      padding-bottom: px2rem(20px);
      flex: 1;
      overflow-y: scroll;
    }
    /deep/ .van-cell {
      background: none;
    }
    .data-right span {
      font-size: px2rem(12px);
    }
  }

  .skin-gray {
    .agent-center-box {
      .g-box, .agent-center {
        background: $skin-gray-con-bg;
      }
      .data-right span,
      .teamDate p {
        color: $skin-gray-text-sub-color;
      }
    }
  }

  .skin-black {
    .agent-center-box {
      .g-box, .agent-center {
        background: $skin-black-con-bg;
      }
      .data-right span,
      .teamDate p {
        color: $skin-black-text-sub-color;
      }
    }
  }

  .teamDateFex {
    display: flex;
    flex-wrap: wrap;
    //background-color: #fff;
    padding: .2rem .3rem;
    font-size: .26rem;
    margin: px2rem(10px) 0;
  }

  .agent {
    /*display: flex;*/
    /*flex-direction: column;*/
    /*height: 100%;*/

    /*.g-content {*/
    /*  flex: 1;*/
    /*  overflow: scroll;*/
    /*  !*background-color: #f5f5f9;*!*/
    /*}*/

    .g-box {
      padding: px2rem(10px) px2rem(15px) 0;
      //background-color: #ffffff;
      //border-bottom: .05rem solid rgb(246, 246, 246);
    }

    //.agent-center {
    //  margin-top: .2rem;
    //  background-color: #fff;
    //}
  }

  .userData {
    display: flex;
    align-items: center;
  }

  .data-left img {
    width: 1.2rem;
    height: 1.2rem;
    margin: 0 px2rem(12px);
  }

  .data-right span {
    color: rgb(162, 162, 162);
  }

  .data-right > div {
    line-height: px2rem(28px);
    /*margin: .2rem 0;*/
  }

  .data-right i {
    font-size: .28rem;
  }

  .iconStyle {
    display: block;
    height: .3rem;
    width: .3rem;
    margin-right: .2rem;
  }

  .teamDate {

    width: 50%;
    margin: .1rem 0;
  }

  .teamDate p {
    margin-right: .2rem;
    color: rgb(137, 137, 137)
  }
</style>
