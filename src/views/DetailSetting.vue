<template>
  <div class="detail_setting detail-setting-box">
    <HeaderSelect :showArrow="showArrow" :activeId="activeId"
                  :isShowTitle="isShowTitle" :titleList="titleList"
                  @changeActiveId="handleActive">
    </HeaderSelect>
    <div class="title">
      <van-row gutter="16" type="flex" justify="space-between">
        <van-col span="10">项目</van-col>
        <van-col span="7">单项(号)限额</van-col>
        <van-col span="7">单注限额</van-col>
      </van-row>
    </div>
    <div class="content">
      <div class="detail">
        <van-row gutter="16" type="flex">
          <van-col span="10">五星直选-复式</van-col>
          <van-col span="7">1000000.00</van-col>
          <van-col span="7">1000000.00</van-col>
        </van-row>
        <van-row gutter="16" type="flex">
          <van-col span="10">五星组选-组选30</van-col>
          <van-col span="7">1000000.00</van-col>
          <van-col span="7">1000000.00</van-col>
        </van-row>
        <van-row gutter="16" type="flex">
          <van-col span="10">前二直选-和值尾数</van-col>
          <van-col span="7">1000000.00</van-col>
          <van-col span="7">1000000.00</van-col>
        </van-row>
        <van-row gutter="16" type="flex">
          <van-col span="10">四星不定位-后四二码</van-col>
          <van-col span="7">1000000.00</van-col>
          <van-col span="7">1000000.00</van-col>
        </van-row>
        <!---->
        <van-row gutter="16" type="flex">
          <van-col span="10">四星不定位-后四二码</van-col>
          <van-col span="7">1000000.00</van-col>
          <van-col span="7">1000000.00</van-col>
        </van-row>
        <van-row gutter="16" type="flex">
          <van-col span="10">四星不定位-后四二码</van-col>
          <van-col span="7">1000000.00</van-col>
          <van-col span="7">1000000.00</van-col>
        </van-row>
        <van-row gutter="16" type="flex">
          <van-col span="10">四星不定位-后四二码</van-col>
          <van-col span="7">1000000.00</van-col>
          <van-col span="7">1000000.00</van-col>
        </van-row>
        <van-row gutter="16" type="flex">
          <van-col span="10">四星不定位-后四二码</van-col>
          <van-col span="7">1000000.00</van-col>
          <van-col span="7">1000000.00</van-col>
        </van-row>
        <van-row gutter="16" type="flex">
          <van-col span="10">四星不定位-后四二码</van-col>
          <van-col span="7">1000000.00</van-col>
          <van-col span="7">1000000.00</van-col>
        </van-row>
        <van-row gutter="16" type="flex">
          <van-col span="10">四星不定位-后四二码</van-col>
          <van-col span="7">1000000.00</van-col>
          <van-col span="7">1000000.00</van-col>
        </van-row>
        <van-row gutter="16" type="flex">
          <van-col span="10">四星不定位-后四二码</van-col>
          <van-col span="7">1000000.00</van-col>
          <van-col span="7">1000000.00</van-col>
        </van-row>
        <van-row gutter="16" type="flex">
          <van-col span="10">四星不定位-后四二码</van-col>
          <van-col span="7">1000000.00</van-col>
          <van-col span="7">1000000.00</van-col>
        </van-row>
        <van-row gutter="16" type="flex">
          <van-col span="10">四星不定位-后四二码</van-col>
          <van-col span="7">1000000.00</van-col>
          <van-col span="7">1000000.00</van-col>
        </van-row>
        <van-row gutter="16" type="flex">
          <van-col span="10">四星不定位-后四二码</van-col>
          <van-col span="7">1000000.00</van-col>
          <van-col span="7">1000000.00</van-col>
        </van-row>
        <van-row gutter="16" type="flex">
          <van-col span="10">四星不定位-后四二码</van-col>
          <van-col span="7">1000000.00</van-col>
          <van-col span="7">1000000.00</van-col>
        </van-row>
        <van-row gutter="16" type="flex">
          <van-col span="10">四星不定位-后四二码</van-col>
          <van-col span="7">1000000.00</van-col>
          <van-col span="7">1000000.00</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderSelect from '../commons/header/HeaderSelect'

export default {
  name: 'DetailSetting',
  components: {
    HeaderSelect
  },
  data () {
    return {
      showArrow: true,
      isShowTitle: false,
      activeId: 0,
      titleList: [
        { id: 0, title: '分分时时彩' },
        { id: 1, title: '分分PK拾' },
        { id: 2, title: '分分六合彩' },
        { id: 3, title: '分分时时彩1' },
        { id: 4, title: '分分PK拾1' },
        { id: 5, title: '分分六合彩1' }
      ]
    }
  },
  methods: {
    handleActive (val) {
      this.activeId = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-setting-box{

  }
  .skin-gray{
    .detail-setting-box{
      .title{
        background: $skin-gray-con-bg;
      }
      .content{
        background: $skin-gray-bg;
        /deep/.van-row--flex{
          &:not(:last-child){
            border-bottom: 1px $skin-gray-border-color solid;
          }
        }
      }
    }
  }
  .skin-black{
    .detail-setting-box{
      .title{
        background: $skin-black-con-bg;
      }
      .content{
        background: $skin-black-bg;
        /deep/.van-row--flex{
          &:not(:last-child){
            border-bottom: 1px $skin-black-border-color solid;
          }
        }
      }
    }
  }


  .detail_setting {
    .title, .detail {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .van-row--justify-space-between, .van-row--flex {
      width: 100%;
    }
    .title {
      line-height: .8rem;
      background-color: #eaeff3;
      position: relative;
      top: -.15rem;
      width: 100%;
      font-weight: 700;
    }
    .content {
      overflow: scroll;
      height: 12rem;
      padding-bottom: .5rem;
      .detail {
        overflow: scroll;
        .van-row--flex {
          /*border-bottom: 1px solid #f5f5f9;*/
          height: .8rem;
          font-size: .26rem;
          align-items: center;
        }
      }
    }

  }
</style>
