<template>
  <div class="agreement">
    <header class="g-header">
      <div class="left" @click="$emit('changeAgree')">
        <i class="iconfont iconic-close"></i>
      </div>
      <div class="middle">
        <h1 class="fs-36">{{$t('lang.registerContent.openAgreement')}}</h1>
      </div>
    </header>
    <ul class="g-content">
      <li class="item">
        <i class="iconfont iconic-target"></i>
        <div class="conent">
          <p class="title">{{$t('lang.reg.preface')}}</p>
          <p class="subtitle welcome">{{$t('lang.reg.huanYingShiYong')}}</p>
          <p class="fs-28">
            {{$t('lang.reg.benXieYiShiNinYu')}}
          </p>
        </div>
      </li>
      <li class="item">
        <i class="iconfont iconic-target"></i>
        <div class="conent">
          <p class="title">{{$t('lang.reg.xiangGuanDingYi')}}</p>
          <p class="subtitle">1.{{$t('lang.EnrollmentManagement.user')}}</p>
          <p class="fs-28">{{$t('lang.reg.zhiZaiYWYL')}}</p>
          <p class="subtitle">2.{{$t('lang.reg.gouCai')}}</p>
          <p class="fs-28">{{$t('lang.reg.zhiZhuCeDeYongHu')}}</p>
          <p class="subtitle">3.{{$t('lang.reg.yongHuZiLiao')}}</p>
          <p class="fs-28">{{$t('lang.reg.zhiYongHuTiGong')}}</p>
        </div>
      </li>
      <li class="item">
        <i class="iconfont iconic-target"></i>
        <div class="conent">
          <p class="title">{{$t('lang.reg.xieYiFuWuFanWei')}}</p>
          <p class="subtitle welcome">{{$t('lang.reg.tiGongGouCaiPingTai')}}</p>
          <p class="subtitle welcome">{{$t('lang.reg.tiGongCaiPiaoXiangGuan')}}</p>
          <p class="subtitle welcome">{{$t('lang.reg.caiPiaoXinXiJiaoHu')}}</p>
          <p class="subtitle welcome">{{$t('lang.reg.zaiXianYuFuZhiFu')}}</p>
          <p class="subtitle welcome">{{$t('lang.reg.wangLuoHeTongXin')}}</p>
        </div>
      </li>
      <li class="item">
        <i class="iconfont iconic-target"></i>
        <div class="conent">
          <p class="title">{{$t('lang.reg.yongHuQuanLi')}}</p>
          <p class="subtitle">1.{{$t('lang.reg.zhangHuGuanLiQuan')}}</p>
          <p class="fs-28">{{$t('lang.reg.yongHuXiuGai')}}</p>
          <p class="subtitle">2.{{$t('lang.reg.mianFeiShiYongQuan')}}</p>
          <p class="fs-28">{{$t('lang.reg.caiPiaoZiXun')}}</p>
          <p class="subtitle">3.{{$t('lang.reg.caiPiaoChaXun')}}</p>
          <p class="fs-28">{{$t('lang.reg.youQuanMianFei')}}</p>
          <p class="subtitle">4.{{$t('lang.reg.jiangJinHuoDeQuan')}}</p>
          <p class="fs-28">{{$t('lang.reg.ruoCaiPiaoZhongJiang')}}</p>
          <p class="subtitle">5.{{$t('lang.reg.zhangHuHeChaQuan')}}</p>
          <p class="fs-28">{{$t('lang.reg.yuEHeCha')}}</p>
          <p class="subtitle">6.{{$t('lang.reg.shenQingTiKuanQuan')}}</p>
          <p class="fs-28">{{$t('lang.reg.keFuChuLi')}}</p>
        </div>
      </li>
      <li class="item">
        <i class="iconfont iconic-target"></i>
        <div class="conent">
          <p class="title">{{$t('lang.reg.yongHuYiWu')}}</p>
          <p class="subtitle">1.{{$t('lang.reg.quanMianZunShou')}}</p>
          <p class="fs-28">{{$t('lang.reg.zunShouXieYi')}}</p>
          <p class="subtitle">2.{{$t('lang.reg.ruShiTiGong')}}</p>
          <p class="fs-28">{{$t('lang.reg.weiBaoZhang')}}</p>
          <p class="subtitle">3.{{$t('lang.reg.duiYingZhuCe')}}</p>
          <p class="fs-28">{{$t('lang.reg.yongHuChengDan')}}</p>
          <p class="subtitle">4.{{$t('lang.reg.yongHuMingYiWu')}}</p>
          <p class="fs-28">{{$t('lang.reg.buDeGengGai')}}</p>
          <p class="subtitle">5.{{$t('lang.reg.baoHuZiLiao')}}</p>
          <p class="fs-28">{{$t('lang.reg.faLvZeRen')}}</p>
          <p class="subtitle">6.{{$t('lang.reg.zunShouWangLuoGuanLi')}}</p>
          <p class="fs-28">{{$t('lang.reg.yiWu')}}<br> {{$t('lang.reg.yiWuOne')}}<br> {{$t('lang.reg.yiWuTwo')}}<br>
            {{$t('lang.reg.yiWuThree')}}<br> {{$t('lang.reg.yiWuFour')}}<br> {{$t('lang.reg.yiWuFive')}}<br>
            {{$t('lang.reg.yiWuSix')}}<br>
            {{$t('lang.reg.yiWuSeven')}}<br> {{$t('lang.reg.yiWuEight')}}<br> {{$t('lang.reg.yiWuNine')}}<br></p>
          <p class="subtitle">7.{{$t('lang.reg.baoHuAnQuanYiWu')}}</p>
          <p class="fs-28">{{$t('lang.reg.jinZhiRenHe')}}</p>
          <p class="subtitle">8.{{$t('lang.reg.chengDanYiWu')}}</p>
          <p class="fs-28">{{$t('lang.reg.zaiXianYongHuChengDan')}}</p>
        </div>
      </li>
      <li class="item">
        <i class="iconfont iconic-target"></i>
        <div class="conent">
          <p class="title">{{$t('lang.reg.YWYLcaiPiaoQuanLi')}}</p>
          <p class="subtitle">1.{{$t('lang.reg.guanLiQuanLi')}}</p>
          <p class="fs-28">{{$t('lang.reg.ruGuoYongHu')}}</p>
          <p class="subtitle">2.{{$t('lang.reg.xiuGaiTiaoKuan')}}</p>
          <p class="fs-28">{{$t('lang.reg.xiuOne')}}<br>
            {{$t('lang.reg.xiuTwo')}}</p>
          <p class="subtitle">3. {{$t('lang.reg.gouCaiQingQiu')}}</p>
          <p class="fs-28">{{$t('lang.reg.kuanXiangJinE')}}</p>
          <p class="subtitle">4.{{$t('lang.reg.quanLiYiWu')}}</p>
          <p class="fs-28">{{$t('lang.reg.caiPiaoZhongJiang')}}</p>
          <p class="subtitle">5.{{$t('lang.reg.zhiZhiGongKuan')}}</p>
          <p class="fs-28">{{$t('lang.reg.guanLiJiGuan')}}</p>
          <p class="sbutitle">6.{{$t('lang.reg.zhiZhiWeiMan')}}</p>
          <p class="fs-28">{{$t('lang.reg.ruWeiChengNian')}}</p>
        </div>
      </li>
      <li class="item">
        <i class="iconfont iconic-target"></i>
        <div class="conent">
          <p class="title">{{$t('lang.reg.caiPiaoYiWu')}}</p>
          <p class="subtitle">1.{{$t('lang.reg.yongHuBaoZhangYiWu')}}</p>
          <p class="fs-28">{{$t('lang.reg.zeRenDeQuanLi')}}</p>
          <p class="subtitle">2.{{$t('lang.reg.gongBuQingKuang')}}</p>
          <p class="fs-28">{{$t('lang.reg.qingKuangWeiZhun')}}</p>
          <p class="subtitle">3.{{$t('lang.reg.zhuanZhangYiWu')}}</p>
          <p class="fs-28">{{$t('lang.reg.yinHangZhangHuShang')}}</p></div>
      </li>
      <li class="item"><i class="iconfont iconic-target"></i>
        <div class="conent"><p class="title">{{$t('lang.reg.xieYiChengLi')}}</p>
          <p class="fs-28"> 1.{{$t('lang.reg.chengLiOne')}}<br> 2.{{$t('lang.reg.chengLiTwo')}}<br>
            3.{{$t('lang.reg.chengLiThree')}}<br> 4.{{$t('lang.reg.chengLiFour')}}</p></div>
      </li>
      <li class="item"><i class="iconfont iconic-target"></i>
        <div class="conent"><p class="title">{{$t('lang.reg.mianZeTiaoKuan')}}</p>
          <p class="subtitle welcome">{{$t('lang.reg.buYuChengDan')}}</p>
          <p class="subtitle">1.{{$t('lang.reg.yongHuXieLou')}}</p>
          <p class="fs-28">{{$t('lang.reg.yiQieHouGuo')}}</p>
          <p class="subtitle">2.{{$t('lang.reg.buKeKangLi')}}</p>
          <p class="fs-28">{{$t('lang.reg.buKeYuJian')}}</p>
          <p class="subtitle">3.{{$t('lang.reg.yongHuYuanYin')}}</p>
          <p class="fs-28">{{$t('lang.reg.youYuYongHu')}}</p>
          <p class="subtitle">4.{{$t('lang.reg.yongHuGouCai')}}</p>
          <p class="fs-28">{{$t('lang.reg.yongHuGenJu')}}</p>
          <p class="subtitle">5.{{$t('lang.reg.yongHuShiYong')}}</p>
          <p class="fs-28">{{$t('lang.reg.youYuShiYong')}}</p></div>
      </li>
      <li class="item"><i class="iconfont iconic-target"></i>
        <div class="conent"><p class="title">{{$t('lang.reg.heTongZuCheng')}}</p>
          <p class="fs-28">{{$t('lang.reg.zuChengOne')}}<br> {{$t('lang.reg.zuChengEr')}}</p></div>
      </li>
      <li class="item"><i class="iconfont iconic-target"></i>
        <div class="conent"><p class="title">{{$t('lang.reg.zhuYiShiXiang')}}</p>
          <p class="subtitle welcome">1、{{$t('lang.reg.zhuYiOne')}}</p>
          <p class="subtitle welcome">2、{{$t('lang.reg.zhuYiTwo')}}</p>
          <p class="subtitle welcome">3、{{$t('lang.reg.zhuYiThree')}}</p>
          <p class="subtitle welcome">4、{{$t('lang.reg.zhuYiFour')}}</p>
          <p class="subtitle welcome">5、{{$t('lang.reg.zhuYiFive')}}<br> {{$t('lang.reg.zhuYiFiveTiShi')}}</p>
          <p class="fs-28">{{$t('lang.reg.keFuZhongXinReXian')}}<em></em></p>
          <p class="fs-28">{{$t('lang.reg.guanLiYuanXinXiang')}}<em></em></p></div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Agreement'
  }
</script>

<style lang="scss" scoped>
  .agreement {
    height: 100%;
    display: flex;
    flex-direction: column;
    .fs-36 {
      font-size: .36rem;
    }
    .g-header {
      //background: linear-gradient(151deg, #65317d -12%, #293384 126%);
      color: #fff;
      position: relative;
      min-height: .88rem;
      text-align: center;
      display: flex;
      align-items: center;
      .left {
        margin-left: .32rem;
        i {
          font-size: 0.28rem;
        }
      }
      .middle {
        z-index: 10;
        width: 60%;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .g-content {
      max-height: calc(100vh + 1px);
      padding: 0 .2rem 1rem;
      flex: 1;
      overflow: scroll;
      .item {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        padding: .3rem 0;
        position: relative;

        .conent{
          padding:15px;
          border-radius: 4px;
        }
        .iconfont {
          font-size: .3rem;
          color: $skin-black-gold-color;
          margin: 0.35rem .2rem 0 .2rem;
        }
        .content::after {
          position: absolute;
          content: "";
          transform-origin: 0 0;
          pointer-events: none;
          box-sizing: border-box;
          z-index: 0;
          border-bottom: 1px solid #e2e2e2;
          border-radius: 0;
          width: 100%;
          left: 0;
          bottom: 0;
          right: 0;
          transform: translate3d(0, 50%, 0) scale(1);
        }
        .title {
          font-size: .36rem;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .subtitle {
          font-size: .28rem;
          margin: .3rem 0;
          font-weight: 500;
          color: #ca982f;
          line-height: 20px;
        }
        .fs-28 {
          line-height: 20px;
          font-size: .28rem;
        }
      }
    }
  }

  .skin-black{
    .agreement{
      color:#fff;
      background: $skin-black-bg;
      ul{
        li{
          .conent{
            background: $skin-black-con-bg;
          }
        }
      }
    }
  }

  .skin-gray{
    .agreement{
      color:#fff;
      background: $skin-gray-bg;
      ul{
        li{
          .conent{
            background: $skin-gray-con-bg;
          }
        }
      }
    }
  }


</style>
