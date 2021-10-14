<template>
  <div class="my_coupon">
    <Header :headObj="headObj" @leftClick="$router.push('/user')"
            @handleRightIcon="$router.push('/couponExplain')" >
    <!--  <template>
        <i class="iconfont">sss</i>
      </template>-->
    </Header>
    <div class="coupon_tab">
      <van-tabs v-model="active">
        <van-tab v-for="(v,i) in tabList" :title="$t(v.text)" :key="i">
          <div class="g-content">
            <div class="no-data">
              <van-image lazy-load
                         :src="require('@/assets/themes/hjb/black/img_pomor.png')"
                         alt="暂无优惠券" class="img"/>
              <p class="text">{{$t('lang.myCoupon.No')}}{{$t(tabList[v.code].text)}}{{$t('lang.myCoupon.coupon')}}</p>
            </div>

          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Header from '../commons/header/Header'
import NotData from '../commons/notdata/NotData'
export default {
  name: 'Introduce',
  components: {
    Header,NotData
  },
  data () {
    return {
      headObj: {
        title: 'lang.user.myDiscountCoupon',
        showArrow: true,
        iconName: 'iconwenti'
      },
      active: 0,
      tabList: [
        { code: 0, text: 'lang.myCoupon.Unused' },
        { code: 1, text: 'lang.myCoupon.Used' },
        { code: 2, text: 'lang.myCoupon.Expired' }
      ]
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  .skin-gray{

  }
  .my_coupon{
    display: flex;
    flex-direction: column;
    //.coupon_tab{
    //  flex: 1;
    //}
    //.g-content {
    //  flex: 2;
    //  overflow: scroll;
    //  height: 12rem;
    //  max-height: 12rem;
    //  padding-bottom: 1.5rem;
    //  background-color: #f5f5f9;
    //  display: flex;
    //  flex-direction: column;
    //  justify-content: center;
    //  align-items: center;
    //  .no-data{
    //    .text{
    //      font-size: .28rem;
    //      margin-top: .8rem;
    //      text-align: center;
    //    }
    //  }
    //}
  }
</style>
