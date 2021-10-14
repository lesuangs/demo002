<template>
  <div class="about">
    <Header :headObj="headObj" @leftClick="$router.push('/setting')"/>
    <div class="g-content">
      <div class="banner">
        <h1>LOGO</h1>
        <h3 class="title">
          1516{{ $t('lang.loginContent.lottery') }}
        </h3>
        <span class="version">1.8.42</span></div>

      <div class="content">
        <div class="text">
          <p class="text_txt">
            <em>1</em>
            <span>{{ $t('lang.AboutUs.abusOne') }}</span></p>
          <p class="text_txt">
            <em>2</em>
            <span>{{ $t('lang.AboutUs.abusTwo') }}</span></p>
          <p class="text_txt">
            <em>3</em>
            <span>{{ $t('lang.AboutUs.abusThree') }}</span></p>
          <p class="text_txt">
            <em>4</em>
            <span>{{ $t('lang.AboutUs.abusFour') }}</span></p>
          <p class="text_txt">
            <em>5</em>
            <span>{{ $t('lang.AboutUs.abusFive') }}</span></p>
          <p class="text_txt">
            <em>6</em>
            <span>{{ $t('lang.AboutUs.abusSix') }}</span></p>
          <p class="text_txt">
            <em>7</em>
            <span>{{ $t('lang.AboutUs.abusSeven') }}</span></p>
          <p class="text_txt">
            <em>8</em>
            <span>{{ $t('lang.AboutUs.abusEight') }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../commons/header/Header'

export default {
  name: 'AboutUs',
  components: {
    Header
  },
  data() {
    return {
      headObj: {
        title: 'lang.setting.aboutUs',
        showArrow: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  height: 100% !important;
  //display: flex;
  //flex-direction: column;

  .g-content {
    //flex: 1;
    overflow: scroll!important;
    max-height: 16rem;

    .banner {
      text-align: center;
      //img {
      //  height: 1.85rem;
      //  margin-top: .9rem;
      //}
      //.title {
      //  font-size: .36rem;
      //  text-align: center;
      //  padding: .2rem 0 .1rem 0;
      //  font-weight: 700;
      //}
      //.version {
      //  font-size: .28rem;
      //  color: #ccc;
      //}
    }

    .content {
      /*padding: .5rem .3rem 1.2rem .3rem;*/
      /*letter-spacing: .02rem;*/

      .text {
        font-size: .28rem;
        line-height: .5rem;
        color: #a8a8a8;
        padding-bottom: 3rem;
      }

      .text_txt {
        margin-bottom: 0.4rem;
        line-height: 0.5rem;
        /*letter-spacing: 1px;*/
        /*display: flex;*/
        padding-right: 0.2rem;
        span{
          display: block;
          padding-left: 1rem;
        }

      }
    }
  }
}
</style>
