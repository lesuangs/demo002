<template>
  <div class="my_popup">
    <van-popup v-model="showPop" :position="position" :style="{height: height}">
      <div class="m-popup">
        <div class="mask" @click="showPop=!showPop" style="opacity: 0.3;"></div>
        <div class="content content-bottom">
          <div class="title">{{$t('lang.Popup.ChooseTransactionType')}}</div>
          <ul>
            <li :class="item.active ? 'choose' : ''"
                v-for="item in popupList" :key="item.id"
                @click="$emit('handleActive',item)"
            >
              {{item.type}}
            </li>
          </ul>
          <div class="cancel" @click="showPop=!showPop">取消</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    show: Boolean,
    position: String,
    height: String,
    popupList: Array
  },
  computed: {
    showPop: {
      get () {
        return this.show
      },
      set (val) {
        this.$emit('changeShow', val)
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .m-popup{
    position: fixed;
    z-index: 2000;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    transition: all .5s linear ;
    .mask{
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background-color: #000
    }
    .content{
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      .title {
        height: .9rem;
        line-height: .9rem;
        text-align: center;
        background: #f7f7f7;
        font-weight: 600;
        border-bottom: 1px solid #e5e5e5;
      }
      ul {
        padding: .2rem .2rem .1rem .2rem;
        margin-bottom: .2rem;
        background: #f7f7f7;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        li {
          float: left;
          width: 2.16rem;
          height: 1rem;
          line-height: 1rem;
          display: block;
          text-align: center;
          border-radius: .04rem;
          color: #666;
          font-size: .28rem;
          background: #fff;
          margin: 0 .1rem .2rem .1rem;
        }
        .choose {
          background: $global-bgcolor;
          color: #fff;
        }
      }
      .cancel {
        background: #f7f7f7;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-weight: 500;
      }
    }
  }
</style>
