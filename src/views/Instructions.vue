<template>
  <div class="instructions">
    <Header :headObj="headObj" @leftClick="$router.push('/depositInterest')"/>
    <div class="body">
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item title="余额生金计算收益的时间?" name="1">
          <div class="collapse_body">
            <p> 1. 无需任何操作动作，系统于每日凌晨00:00时，自动计算彩票帐户可提现总金额。可提现总金额低于 100 元，不参与【余额生金】活动 ;
              <br/> 2. 每日凌晨 00:00 时，系统计算您应得的生金余额，並於凌晨 03:00 返还到您的主平台帐户中，您可于【我的】- 【余额生金】内，点击收益明细查看详情。 </p>
          </div>
        </van-collapse-item>
      </van-collapse>
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item title="余额生金如何计算收益?" name="2">
          <div class="collapse_body">
            <p> 收益 = 可提现总金额 * (基准收益率+优惠收益利率)<br> 譬如 :<br> A 可提现总金额为 20000 元，基准收益率为0.08%，优惠收益率为0.05%，则计算公式为 : 20000 元 * (0.08%+0.05%) = 26元<br><br> 1. 生金收益需达1倍投注量才可提现。<br> 2. 当日帐户未达有效投注量 0 元，无法计算优惠收益率，仅可赚取基准收益率。<br><span class="highlight-text"> (基准收益回馈金额上限为 100 元) </span></p>
          </div>
        </van-collapse-item>
      </van-collapse>
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item title="余额生金协议遵守?" name="3">
          <div class="collapse_body">
            <p> 1. 【余额生金】以健康概念为出发点，若发现用户有任何存在作弊、套利等行为，帐户冻结扣除生金额度为处罚 ;<br> 2. 所有得到生金收益的用户，均自动表示同意并遵守【余额生金】协议。<br> 3. 系统自动判别每日北京时间凌晨 00:00 的彩票帐户可提现金额为准，转入第三方额度需在每日凌晨 00:00 之前，转换到主平台帐户额度内以便系统计算。 <span class="highlight-text">如未转换至主平台帐户余额的，视为放弃此优惠。</span></p>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import Header from '../commons/header/Header'

export default {
  name: 'Instructions',
  components: {
    Header
  },
  data () {
    return {
      activeName: '1',
      headObj: {
        title: '说明',
        showArrow: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .instructions {
    .body{
      height: calc(100% - .88rem);
      overflow: scroll;
      .collapse_body{
        .highlight-text{
          color: #c00;
        }
      }
    }
  }
</style>
