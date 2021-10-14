<template>
  <div class="introduce coupon-explain-box">
    <Header :headObj="headObj" @leftClick="$router.push('/myCoupon')"/>

    <div class="g-content" :style="maxHight">
      <pre>
1.{{$t('lang.CouponExplain.ObtainingCoupons')}}

{{$t('lang.CouponExplain.huodong')}}

2.{{$t('lang.CouponExplain.couponUse')}}

1）{{$t('lang.CouponExplain.meizhanag')}}

2）{{$t('lang.CouponExplain.chongzhi')}}

3）{{$t('lang.CouponExplain.zhudan')}}

4）{{$t('lang.CouponExplain.danbi')}}

5）{{$t('lang.CouponExplain.baokuo')}}

6）{{$t('lang.CouponExplain.meizhanger')}}

7）{{$t('lang.CouponExplain.qingzai')}}

8）{{$t('lang.CouponExplain.touzhuhuo')}}

3.{{$t('lang.CouponExplain.shixiao')}}

1）{{$t('lang.CouponExplain.shiyongshijian')}}

2）{{$t('lang.CouponExplain.dingdan')}}

3）{{$t('lang.CouponExplain.yanjing')}}

4）{{$t('lang.CouponExplain.shuadan')}}

5）{{$t('lang.CouponExplain.ruxu')}}
      </pre>
    </div>
  </div>
</template>

<script>
import Header from '../commons/header/Header'

export default {
  name: 'CouponExplain',
  components: {
    Header
  },
  data () {
    return {
      headObj: {
        title: 'lang.header.couponDescription',
        showArrow: true
      },
      maxHight:''
    }
  },
  created() {
    console.log(document.body.clientHeight);
    let a = document.body.clientHeight
    if(a===653){
      this.maxHight='max-height:17rem'
    }else if(a===1024 || a===600){
      this.maxHight='max-height:10rem'
    }else if(a===823 || a===812){
      this.maxHight='max-height:15rem'
    }else {
      this.maxHight='max-height:13rem'
    }
  }
}
</script>

<style lang="scss" scoped>
  .coupon-explain-box{
    .g-content{
      padding:px2rem(16px);
      line-height: px2rem(20px);
      font-size: px2rem(13px);
    }
  }
  .skin-gray{
    .coupon-explain-box{
      color:$skin-gray-text-color;
    }
  }

  .skin-black{
    .coupon-explain-box{
      color:$skin-black-text-color;
    }
  }

  .introduce {
    display: flex;
    flex-direction: column;
    .g-content {
      flex: 1;
      overflow: scroll;

      /*background-color: #fff;*/
      /*padding: .4rem;*/
      /*padding-bottom: 1.2rem;*/
      pre{
        white-space: pre-wrap;
        word-wrap: break-word;
        font-size: .26rem;
      }
    }
  }
</style>
