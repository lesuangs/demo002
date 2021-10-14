<template>
  <div class="audit-details-box">
    <Header :headObj="headObj" @leftClick="$router.go(-1)"/>
    <NotData v-if="dataList && dataList.length === 0 " :isNotData="isNotData"/>
    <div class="audit-details-wrap">
      <div class="audit-details-con" v-if="isShow" >
        <div class="audit-item">
          <h1>{{$t('lang.auditDetails.PreferentialDeduction')}}：</h1>
          <p>
<!--            {{Number(totalAcount.sumAllDeduct).toFixed(2)}}-->
            {{ totalAcount.sumAllDeduct == null ? '0' : format_number(totalAcount.sumAllDeduct).split('.')[0] }}{{ totalAcount.sumAllDeduct == null ? '.00' :'.'+format_number(totalAcount.sumAllDeduct).split('.')[1] }}
            {{$t('lang.common.yuan')}}</p>
        </div>
        <div class="audit-item">
          <h1>{{$t('lang.auditDetails.theWithdrawalTime')}}：</h1>
          <p>{{new Date() | formatDate(new Date())}}</p>
        </div>
        <div class="audit-item">
          <h1>{{$t('lang.auditDetails.sinceTotalValidBet')}}：</h1>
          <p>{{totalAcount.sumAllDml}}({{$t('lang.auditDetails.allValidBets')}})</p>
        </div>
<!--        <span>{{$t('lang.auditDetails.PreferentialDeduction')}}:{{Number(totalAcount.sumAllDeduct).toFixed(2)}}{{$t('lang.common.yuan')}}</span>-->
<!--        <span>{{$t('lang.auditDetails.theWithdrawalTime')}}:{{new Date() | formatDate(new Date())}}</span>-->
<!--        <div style="line-height: 20px;">{{$t('lang.auditDetails.sinceTotalValidBet')}}：{{totalAcount.sumAllDml}}({{$t('lang.auditDetails.allValidBets')}})。</div>-->
        <div class="auditTable" v-for="item in dataList" :key="item.id">
          <div class="top">
            <div class="left">
              <p>
                <span>{{$t('lang.auditDetails.deposit')}}</span>
                <em>
                  {{ item.rechMoney == null ? '0' : format_number(item.rechMoney).split('.')[0] }}{{ item.rechMoney == null ? '.00' :'.'+format_number(item.rechMoney).split('.')[1] }}
<!--                  {{Number(item.rechMoney).toFixed(2)}}-->
                  {{$t('lang.common.yuan')}}</em>
              </p>
              <p>
                <span>{{$t('lang.auditDetails.Discount')}}</span>
                <em>
<!--                  {{Number(item.discountMoney).toFixed(2)}}-->
                  {{ item.discountMoney == null ? '0' : format_number(item.discountMoney).split('.')[0] }}{{ item.discountMoney == null ? '.00' :'.'+format_number(item.discountMoney).split('.')[1] }}
                  {{$t('lang.common.yuan')}}</em>
              </p>
              <p>
                <span>{{$t('lang.auditDetails.status')}}</span>
                <em v-if="item.discountAdopt === true && item.mormAdopt === true" class="green">
                  {{$t('lang.auditDetails.Withdrawable')}}
                </em>
                <em v-else class="red">{{$t('lang.auditDetails.noWithdrawal')}}</em>
              </p>
            </div>
            <div class="right">
              <p>
                <span>{{$t('lang.auditDetails.withdrawalVolume')}}</span>
                <em>
<!--                  {{Number(item.discountDml + item.mormDml).toFixed(2)}}-->
                  {{ item.discountDml == null ? '0' : format_number(item.discountDml).split('.')[0] }}{{ item.discountDml == null ? '.00' :'.'+format_number(item.discountDml).split('.')[1] }}
                  {{$t('lang.common.yuan')}}</em>
              </p>
              <p>
                <span>{{$t('lang.auditDetails.betAmountReached')}}</span>
                <em>
<!--                  {{Number(item.cpDml + item.sportsDml + item.videoDml).toFixed(2)}}-->
                  {{ Number(item.cpDml + item.sportsDml + item.videoDml) == null ? '0' : format_number(Number(item.cpDml + item.sportsDml + item.videoDml)).split('.')[0] }}{{ Number(item.cpDml + item.sportsDml + item.videoDml) == null ? '.00' :'.'+format_number(Number(item.cpDml + item.sportsDml + item.videoDml)).split('.')[1] }}
                  {{$t('lang.common.yuan')}}</em>
              </p>
            </div>
          </div>
          <div class="bottom">
            <p>{{$t('lang.auditDetails.Start')}}：{{item.beginTime}}</p>
            <p>{{$t('lang.auditDetails.End')}}：{{item.endTime}}</p>
          </div>
        </div>
<!--        <div class="withDrawable" v-for="item in dataList" :key="item.id">-->
<!--          <div v-if="item.discountAdopt === true && item.mormAdopt === true"-->
<!--               style="text-align: right;margin: .3rem 0;font-size: 16px;color: green">-->
<!--            <van-icon size=".28rem" name="checked"/>-->
<!--            {{$t('lang.auditDetails.Withdrawable')}}-->
<!--          </div>-->
<!--          <div v-else style="text-align: right;margin: .3rem 0;font-size: 16px;color: red" class="WithdrawableRed">-->
<!--            <van-icon size=".28rem" name="clear"/>-->
<!--            {{$t('lang.auditDetails.noWithdrawal')}}-->
<!--          </div>-->
<!--          <div>-->
<!--            <span> {{$t('lang.auditDetails.deposit')}}：{{Number(item.rechMoney).toFixed(2)}}{{$t('lang.common.yuan')}}</span>-->
<!--            <span style="float: right">{{$t('lang.auditDetails.Discount')}}：{{Number(item.discountMoney).toFixed(2)}}{{$t('lang.common.yuan')}}</span>-->
<!--          </div>-->
<!--          <div style="font-size: 10px;">-->
<!--            <span style="width: 50%">-->
<!--              {{$t('lang.auditDetails.withdrawalVolume')}}：-->
<!--              <br v-if="$i18n.locale==='en-US'">-->
<!--              {{Number(item.discountDml + item.mormDml).toFixed(2)}}{{$t('lang.common.yuan')}}-->
<!--            </span>-->
<!--            <span style="float: right">{{$t('lang.auditDetails.betAmountReached')}}：{{Number(item.cpDml + item.sportsDml + item.videoDml).toFixed(2)}}{{$t('lang.common.yuan')}}</span>-->
<!--          </div>-->
<!--          <div style="font-size: 12px;color: gray">-->
<!--            <span>{{$t('lang.auditDetails.Start')}}：{{item.beginTime}}</span>-->
<!--            <span style="float: right;">{{$t('lang.auditDetails.End')}}：{{item.endTime}}</span>-->
<!--          </div>-->
<!--        </div>-->
      </div>

    </div>
  </div>
</template>

<script>
import Header from '@/commons/header/Header.vue'
import utils from "../../utils/utils";
import NotData from '@/commons/notdata/NotData.vue'
import {mapGetters} from "vuex";

export default {
    name: 'auditDetails',
    components: {
      Header,
      NotData
    },
    data() {
      return {
        headObj: {
          title: 'lang.common.auditDetails',
          showArrow: true
        },
        dataList: [],
        totalAcount: {},
        isNotData:true,
        isShow:false
      }
    },
  computed:{
    ...mapGetters({
      format_number: '_format_number',
    }),
  },
    created() {
      this.$http.account.queryWithDrawData().then(res => {
        console.log(res);
        this.dataList = res.data.rows
        if(this.dataList.length !== 0){
          this.isShow = true
        }else {
          this.isNotData = false
        }
        console.log(this.dataList);
        this.totalAcount = res.data

      }).catch(err => {
        console.log(err);
      })
    },
    filters: {
      formatDate(val) {
        return utils.dateFormat(val)
      }
    }
  }
</script>

<style scoped lang="scss">
  $skin-gray-text-color:#9a9aa7;
  $skin-black-text-color:#8f8f8f;
  .audit-details-box{
    height:100%;
    padding-bottom: px2rem(50px);
    .audit-details-wrap {
      height: 100%;
      overflow: scroll;
      color:#fff;
      padding:0.2rem;
      .audit-item{
        margin-bottom: 0.4rem;
        font-size:0.28rem;
        h1{
          line-height: 0.5rem;
          &::before{
            content: '';
            display: inline-block;
            vertical-align: middle;
            margin-right: 5px;
            width:5px;
            height:5px;
            border-radius: 50%;
          }
        }
        p{
          margin-left: 0.2rem;
          line-height: 0.5rem;
        }
      }
      .auditTable{
        border-radius:10px;
        margin-bottom: px2rem(16px);
        .top{
          display: flex;
          .left{
            span{
              margin-right: 0.2rem;
            }
          }
          .right{
            p{
              display: flex;
              flex-direction: column;
              margin-bottom: 0.1rem;
            }
          }
          .left,.right{
            flex:1;
            padding:0.2rem;
            p{
              line-height: 28px;
              font-size:0.28rem;
              em{
                color:#fff;
                &.green{
                  color:#4fbb72;
                }
                &.red{
                  color:red;
                }
              }
            }
          }
        }
        .bottom{
          display: flex;
          justify-content: space-between;
          padding:0.1rem;
          font-size:11px;
          p{
            line-height: 30px;
          }
        }
      }
    }
  }

  .skin-gray{
    .audit-details-box{
      background: $skin-gray-bg;
      .audit-details-wrap {
        color:#fff;
        .audit-item{
          h1{
            color:$skin-gray-text-color;
            &::before{
              background: linear-gradient(to right,#F5DDAE,#DBBD85);
            }
          }
        }
        .auditTable{
          background: $skin-gray-con-bg;
          .top{
            .left{
              border-right:1px #56556C solid;
            }
            .left,.right{
              p{
                span{
                  color:$skin-gray-text-color;
                }
              }
            }
          }
          .bottom{
            border-top:1px #56556C solid;
            color:$skin-gray-text-color;
          }
        }
      }
    }
  }

  .skin-black{
    .audit-details-box{
      background: $skin-black-bg;
      .audit-details-wrap {
        color:#fff;
        .audit-item{
          h1{
            color:  $skin-black-text-color;
            &::before{
              background: linear-gradient(to right,#552374,#1F61B8);
            }
          }
        }
        .auditTable{
          background:$skin-black-con-bg;
          .top{
            .left{
              border-right:1px #2F2F36 solid;
            }
            .left,.right{
              p{
                span{
                  color: $skin-black-text-color;
                }
              }
            }
          }
          .bottom{
            border-top:1px #2F2F36 solid;
            color:$skin-black-text-color;
          }
        }
      }
    }
  }

  /*.title {*/
  /*  padding: 0.1rem .3rem;*/
  /*  font-size: .3rem;*/
  /*  border-bottom: 1px solid #e5e5e5;*/
  /*  line-height: 14px;*/
  /*}*/

  /*.title span {*/
  /*  display: inline-block;*/
  /*  margin: .1rem 0;*/
  /*}*/

  /*.withDrawable {*/
  /*  padding: .3rem;*/
  /*  border-bottom: .3rem solid rgb(247, 247, 247);*/
  /*}*/

  /*.withDrawable div {*/
  /*  font-size: 16px;*/
  /*  line-height: 16px;*/
  /*  margin: .2rem 0;*/
  /*}*/
</style>
