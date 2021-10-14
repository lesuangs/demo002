<template>
  <div>
    <Header :headObj="headObj" @leftClick="$router.go(-1)"/>
    <NotData v-if="Object.keys(withDrawData).length === 0? true :false" :isNotData="isNotData"/>
    <div class="exolainContent" v-else>
      <!--      <p style="margin:0 0 .3rem .45rem">{{$t('lang.ExplainWithDraw.Reminder')}}:</p>-->
      <div style="display: flex;">
        <div style="padding-top: .05rem">
          <i class="redOne"></i>
        </div>
        <div>
          <span>{{ $t('lang.ExplainWithDraw.queRenTiKuanYiZhi') }}</span>
        </div>
      </div>
      <div style="display: flex">
        <div style="padding-top: .05rem">
          <i class="redOne"></i>
        </div>
        <div>
          <span>{{ $t('lang.ExplainWithDraw.danBiTiKuan') }}{{
              Number(withDrawData.singleMinLimit).toFixed(2)
            }}{{ $t('lang.common.yuan') }}，{{
              $t('lang.ExplainWithDraw.maximumLimit')
            }}{{ Number(withDrawData.singleMaxLimit).toFixed(2) }}{{ $t('lang.common.yuan') }}。</span>
        </div>
      </div>
      <div style="display: flex">
        <div style="padding-top: .05rem">
          <i class="redOne"></i>
        </div>
        <div>
          <span>{{ $t('lang.ExplainWithDraw.ziJinAnQuan') }}{{
              withDrawData.dayMaxCount
            }}{{ $t('lang.ExplainWithDraw.ciShu') }}，{{
              $t('lang.ExplainWithDraw.meiRiJinE')
            }}{{ Number(withDrawData.dayMaxLimit).toFixed(2) }}{{
              $t('lang.common.yuan')
            }}，{{$t('lang.ExplainWithDraw.meiRiShouXuFei')}}
            {{withDrawData.counterFeeMode === 0 ? $t('lang.ExplainWithDraw.bi') +
            withDrawData.counterFee + $t('lang.ExplainWithDraw.shiRenMinBi') :
            $t('lang.ExplainWithDraw.tiKuan')+'*' + withDrawData.counterFee + '%'+$t('lang.ExplainWithDraw.calc')+'。'}}

            </span>
        </div>
      </div>
      <!--      当前存在的提现订单共：{{withDrawData.count}}-->
      <div style="display: flex">
        <div style="padding-top: .05rem">
          <i class="redOne"></i>
        </div>
        <div>
          <span>{{ $t('lang.ExplainWithDraw.shiFouManZuDaMa') }}</span>
        </div>
      </div>
      <div style="display: flex">
        <div style="padding-top: .05rem">
          <i class="redOne"></i>
        </div>
        <div>
          <span>{{ $t('lang.ExplainWithDraw.dangQianDingDan') }}{{ count }}{{ $t('lang.ExplainWithDraw.bi') }}</span>
        </div>
      </div>
      <div style="display: flex">
        <div style="padding-top: .05rem">
        </div>
        <div>
          <span
              style="margin-left: .45rem;">{{ $t('lang.ExplainWithDraw.shangShu24XiaoShi') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/commons/header/Header";
import NotData from '@/commons/notdata/NotData'

export default {
  name: "ExplainWithDraw",
  components: {
    Header,
    NotData
  },
  data() {
    return {
      headObj: {
        title: 'lang.withDraw.withdrawalInstructions',
        showArrow: true
      },
      withDrawData: {},
      isNotData: true,
      count: 0
    }
  },
  created() {
    this.$http.account.queryExplainWithDraw().then(res => {
      console.log(res);
      this.withDrawData = res.data.limit
      this.count = res.data.count
      console.log(this.withDrawData);
    })
  }
}
</script>

<style scoped lang="scss">
.exolainContent {
  font-size: .28rem;
  line-height: 1.57;
  color: #9a9aa7;
  padding: .3rem;
}

.redOne {
  display: inline-block;
  height: .12rem;
  width: .12rem;
  background-image: linear-gradient(137deg, #c91fec, #1772d1 85%);
  border-radius: 50%;
  margin: .13rem .2rem 0 0;
}

.exolainContent span {
  margin-bottom: .1rem;
  display: inline-block;
  line-height: .5rem;
}

.exolainContent > div:last-child span {
  color: #efcea6;
  text-indent: -.1rem;
}
</style>
