<template>
  <div class="introduce help-center-box">
    <Header :headObj="headObj" @leftClick="$router.push('/user')"/>
    <div class="g-content">
      <van-cell-group class="help-item"
              :title="$t('lang.HelpCenter.numLottery')">
        <van-cell :title="$t('lang.HelpCenter.rulesOfPlay')" value=""
                  @click="$router.push({path:'/playRule',query:{type,code}})">
          <van-icon name="arrow"/>
        </van-cell>
        <!--        </van-cell>-->
        <van-cell :title="$t('lang.HelpCenter.detailedSettings')" value=""
                  @click="$router.push('/detailSetting')">
          <van-icon name="arrow"/>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="help-item"
              :title="$t('lang.HelpCenter.sportLottery')">
        <van-cell :title="$t('lang.HelpCenter.rulesOfPlay')" value=""
                  @click="$toast($t('lang.common.openSoon'))">
          <van-icon name="arrow"/>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="help-item"
              :title="$t('lang.HelpCenter.Feedback')">
        <van-cell :title="$t('lang.HelpCenter.customerFeedback')" value=""
                  @click="$router.push('/feedback')">
          <van-icon name="arrow"/>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  import Header from '../commons/header/Header'

  export default {
    name: 'HelpCenter',
    components: {
      Header
    },
    data() {
      return {
        headObj: {
          title: 'lang.user.helpAndFeedback',
          showArrow: true
        },
        type: '',
        code: '',
      }
    },
    created() {
      // let allQueryData = JSON.parse(sessionStorage.getItem('allQueryData'))
      // if (allQueryData) {
      //   this.type = allQueryData.type;
      //   this.code = allQueryData.code
      // } else {
      //   let allFirstJson = JSON.parse(sessionStorage.getItem('firstJson'))
      //   this.type = allFirstJson.lotteryList[0].children[0].type;
      //   this.code = allFirstJson.lotteryList[0].children[0].code
      // }
    }
  }
</script>

<style lang="scss" scoped>
  .help-center-box{
    /deep/.van-cell-group,.van-cell-group__title{
      background: none;
    }
    /deep/.van-cell-group__title{
      font-size:px2rem(13px);
      border:0;
      line-height: inherit;
    }
    /deep/.van-cell__title{
      color:#fff;

    }
    .help-item{
      margin-bottom: px2rem(16px);
    }
  }

  .skin-gray{
    .help-center-box{
      .help-item,/deep/.van-cell-group__title{
        background: $skin-gray-con-bg;
      }
      /deep/.van-cell-group__title,
      /deep/.van-icon{
        color:$skin-gray-text-color;
      }

    }
  }
  .skin-black{
    .help-center-box{
      .help-item,/deep/.van-cell-group__title{
        background: $skin-black-con-bg;
      }
      /deep/.van-cell-group__title,
      /deep/.van-icon{
        color:$skin-black-text-color;
      }

    }
  }

  /*.introduce {*/
  /*  display: flex;*/
  /*  flex-direction: column;*/

  /*  .g-content {*/
  /*    flex: 1;*/
  /*    overflow: scroll;*/
  /*    min-height: 13rem;*/
  /*    background-color: #f5f5f9;*/
  /*    padding: .2rem;*/
  /*  }*/
  /*}*/
</style>
