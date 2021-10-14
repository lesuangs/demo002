<template>
  <div class="del-body lottery-picker-box">
    <!--// 自定义筛选-->
    <van-nav-bar
            :right-text="$t('lang.LotteryPicker.Reset')"
            :title="$t('lang.LotteryPicker.customFilter')"
            left-arrow
            @click-right="$emit('reset')"
            @click-left="$emit('leftClick')">
      <van-icon size="18"/>
    </van-nav-bar>
    <div class="del-content">
      <div class="title">{{$t('lang.LotteryPicker.lotteryType')}}</div>
      <!--lang.LotteryPicker.lotteryType 彩种-->
      <van-cell @click="showSet = true"
                :title="value[0]"
                is-link
                :value="value[1]"/>
      <div class="step-button-box">
        <button class="btn-type2"
                native-type="submit"
                @click="$emit('btnClick'), $emit('leftClick')">
          <!--确认-->
          {{$t('lang.common.determine')}}
        </button>
      </div>

      <!--      <div style="margin: 16px;">-->
      <!--        <van-button-->
      <!--          block-->
      <!--          native-type="submit"-->
      <!--          @click="$emit('btnClick'), $emit('leftClick')"-->
      <!--        >-->
      <!--          {{$t('lang.common.determine')}}-->
      <!--        </van-button>-->
      <!--      </div>-->
    </div>
    <transition name="van-slide-up">
      <van-popup v-model="showSet" position="bottom" class="mod-select-picker-box">
        <van-picker
                show-toolbar
                :title="$t('lang.LotteryPicker.chooseLottery')"
                :columns="columns"
                @cancel="showSet = false"
                @confirm="onConfirm"
                cancel-button-text=" "
                :confirm-button-text="$t('lang.common.determine')"
        />
      </van-popup>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'LotteryPicker',
    props: {
      columns: Array,
      listData: Object,
      value: Array,
      VList: Array
    },
    data() {
      return {
        showSet: false
      }
    },
    methods: {
      onConfirm(v, i) {
        // console.log(v, i,'ccccccc');
        this.$emit('confirm', v, i)
        this.showSet = false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .lottery-picker-box {
    .del-content {
      flex: 1;
      .title{
        height: 1rem;
        line-height: 1rem;
        width: 100%;
        color: #8f8f8f;
        background: #24252D;
        padding:0 0 0 0.32rem;
        font-size: 12px;
      }
    }
    /deep/ .van-cell {
      &, .van-cell__value {
        color: #fff;
      }
    }

  }

  .skin-gray {
    .lottery-picker-box {
      .del-content {
        background: $skin-gray-bg;
      }
      /deep/ .van-cell {
        background: $skin-gray-con-bg;
      }
    }
  }

  .skin-black {
    .lottery-picker-box {
      .del-content {
        background: $skin-black-bg;
      }
      /deep/ .van-cell {
        background: $skin-black-con-bg;
      }
    }
  }

  .del-body {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
    ::v-deep .van-picker {
      z-index: 100001;
    }
    ::v-deep .van-button {
      /*background-color: #eda6a6 !important;*/
      color: #fff;
      background: $global-bgcolor;
      font-size: 0.36rem;
      border-radius: 0.1rem;
    }
    .van-nav-bar {
      /*background: #dd413a;*/
      ::v-deep .van-nav-bar__title,
      ::v-deep .van-nav-bar__text,
      ::v-deep .van-icon {
        color: #fff !important;
      }
    }
    /*.del-content {*/
    /*  flex: 1;*/
    /*  background: #f5f5f5;*/
    /*}*/
  }
</style>
