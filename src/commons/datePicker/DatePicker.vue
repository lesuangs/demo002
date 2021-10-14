<template>
  <div class="inner date-picker-box">
    <div class="time">
      <p class="title">{{ $t('lang.DatePicker.chooseTimePeriod') }}</p>
      <div class="item-content">
        <van-button :type="btnDanger"
                    @click="$emit('handleBtns','yesterday')"
                    size="small">
          {{ $t('lang.DatePicker.yesterday') }}
        </van-button>
        <van-button :type="btnDefault"
                    @click="$emit('handleBtns','week')"
                    size="small">
          {{ $t('lang.DatePicker.nearlyWeek') }}
        </van-button>
        <van-button :type="btnDefault1"
                    @click="$emit('handleBtns','month')"
                    size="small">
          {{ $t('lang.DatePicker.nearlyMonth') }}
        </van-button>
      </div>
      <div class="item-content">
        <div class="timer-picker-trigger"
             @click="$emit('clickLeftDate')">
          {{ starttime | formatDate(starttime) }}
        </div>
        <div class="line">{{$t('lang.common.to')}}</div>
        <div class="timer-picker-trigger"
             @click="$emit('clickRightDate')">
          {{ endtime | formatDate(endtime) }}
        </div>
      </div>
      <!--开始时间-->
      <van-popup v-model="showPickerStart"
                 position="bottom"
                 :overlay="true"
                 :close-on-click-overlay="false"
                 class="mod-select-picker-box">
        <van-datetime-picker
            v-model="starttime"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="$emit('clickCancelStart')"
            @confirm="$emit('clickCloseStart',starttime)"
            :title="$t('lang.common.starTime')"
            cancel-button-text=" "
            :formatter="formatter"
            :confirm-button-text="$t('lang.common.determine')"
        />
      </van-popup>
      <!--结束时间-->
      <van-popup v-model="showPickerEnd" position="bottom" :overlay="true"
                 :close-on-click-overlay="false" class="mod-select-picker-box">
        <van-datetime-picker
            v-model="endtime"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="$emit('clickCancelEnd')"
            @confirm="$emit('clickCloseEnd',endtime)"
            :title="$t('lang.common.endTime')"
            cancel-button-text=" "
            :formatter="formatter"
            :confirm-button-text="$t('lang.common.determine')"
        />
      </van-popup>
    </div>
    <div class="step-button-box">
      <button class="btn-type2" @click="$emit('handleSubmit')">
        {{ $t('lang.common.determine') }}
      </button>
    </div>
<!--    <div class="m-button" @click="$emit('handleSubmit')">{{ $t('lang.common.determine') }}</div>-->
  </div>
</template>

<script>
import utils from '../../utils/utils'

export default {
  name: 'DatePicker',
  props: {
    btnDanger: String,
    btnDefault: String,
    btnDefault1: String,
    showPickerStart: Boolean,
    showPickerEnd: Boolean,
    startTime: Date,
    startTime1: Date,
    endTime: Date,
    endTime1: Date,
    startTime2: Date,
    endTime2: Date,
    type: String
  },
  methods: {
    formatter(type, val) {
      if (type === 'year') {
        return val + ' ' +this.$t('lang.DatePicker.ymd[0]');
      }
      if (type === 'month') {
        return val +  ' ' +this.$t('lang.DatePicker.ymd[1]');
      }
      if (type === 'day') {
        return val +  ' ' +this.$t('lang.DatePicker.ymd[2]');
      }
      return val;
    },
  },
  computed: {
    starttime: {
      get() {
        console.warn(this.type)
        console.warn(this.startTime)
        console.warn(this.startTime1)
        console.warn(this.startTime2)
        return this.type === 'yesterday' ? this.startTime : this.type === 'week'
            ? this.startTime1 : this.startTime2
      },
      set(val) {
        return this.$emit('emitStarttime', val)
      }

    },
    endtime: {
      get() {
        return this.type === 'yesterday' ? this.endTime : this.type === 'week'
            ? this.endTime1 : this.endTime2
      },
      set(val) {
        return this.$emit('emitEndtime', val)
      }
    }
  },
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1)
    }
  },
  mounted() {
  },
  filters: {
    formatDate(val) {
      return utils.dateFormat(val, 2)
    }
  }
}
</script>

<style lang="scss" scoped>
  .date-picker-box{
    overflow: hidden;
    .title{
      height:px2rem(45px);
      line-height: px2rem(45px);
      text-align: center;
      font-size:15px;
      color:#fff;
      border-bottom:1px $skin-black-border-color solid;
    }
    .item-content{
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: px2rem(15px);
      .van-button--danger,
      .van-button--default,
      .timer-picker-trigger,
      .line{
        color:#8f8f8f;
        font-size:px2rem(15px);
      }
      .van-button--danger,.van-button--default{
        width:px2rem(98px);
        height:px2rem(50px);
        line-height: px2rem(20px);
        border-radius: px2rem(6px);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
        background-color: #16171b;
        border:0;
      }

      .timer-picker-trigger{
        width:px2rem(145px);
        height:px2rem(50px);
        line-height: px2rem(50px);
        text-align: center;
        border-radius: 25px;

      }
    }
    .step-button-box{
      margin:px2rem(30px) 0;
      button{
        margin:0;
      }
    }
  }

  .skin-black{
    .date-picker-box{
      background: $skin-black-con-bg;
      .van-button--danger{
        background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
        color:#533510;
      }
      .timer-picker-trigger{
        box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
        border: solid 1px #34363b;
        background-color: #16171b;
        color:#8f8f8f;
      }
    }
  }

  .skin-gray{
    .date-picker-box{
      background: #24252D;

      .van-button--danger{
        background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
        color:#533510;
      }
      .timer-picker-trigger{
        border: solid 1px #303139;
        background-color: #303139;
        color:#9393a6;
      }
    }
  }


/*.inner {*/
/*  !*padding: .2rem;*!*/

/*  .time {*/
/*    !*height: 8rem;*!*/
/*    !*margin-bottom: .4rem;*!*/
/*    !*border-bottom: 1px solid #f5f5f9;*!*/
/*    !*padding-bottom: .4rem;*!*/

/*    !*.title {*!*/
/*    !*  text-align: center;*!*/
/*    !*  font-size: .28rem;*!*/
/*    !*}*!*/

/*    !*.item-content {*!*/
/*    !*  display: flex;*!*/
/*    !*  justify-content: space-around;*!*/
/*    !*  margin-top: .3rem;*!*/
/*    !*}*!*/

/*    .timer-picker-trigger {*/
/*      width: 2.3rem;*/
/*      height: .7rem;*/
/*      background-color: #e8e8e8;*/
/*      border-radius: .1rem;*/
/*      text-align: center;*/
/*      line-height: .7rem;*/
/*    }*/

/*    .line {*/
/*      color: #8f8f8f;*/
/*      font-size: .3rem;*/
/*      line-height: .7rem;*/
/*    }*/
/*  }*/

/*!*  .m-button {*/
/*    color: #fff;*/
/*    background: $global-bgcolor;*/
/*    width: 3.3rem;*/
/*    height: .8rem;*/
/*    line-height: .8rem;*/
/*    font-size: .36rem;*/
/*    margin: auto;*/
/*    border-radius: .1rem;*/
/*    text-align: center;*/
/*  }*!*/
/*}*/
</style>
