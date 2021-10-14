<template>
  <div class="header-box">
    <van-nav-bar
            class="header-wrap"
            :title="$t(headObj.title)"
            :left-text="headObj.leftText"
            :right-text="$t(headObj.rightText)"
            :left-arrow="headObj.showArrow"
            @click-left="$emit('leftClick')"
            @click-right="$emit('rightClick')">
      <template #right v-if="headObj.rightIcon">
        <i @click="$emit('handleRightIcon')"
           class="iconfont iconrili"
           :class="isAccountDetail?'move-right':''"></i>
      </template>

      <template #right v-if="headObj.iconName">
        <i @click="$emit('handleRightIcon')"
           :class="'iconfont '+headObj.iconName"></i>
      </template>
      <!--<template #right v-if="headObj.rightIcon2">-->
      <!--<i @click="$emit('handleRightIcon')" class="iconfont iconrili" style="font-size: 18px; color: white"></i>-->
      <!--<i @click="$emit('lis')" class="iconfont iconic-filter" style="font-size: 18px; color: white;margin-left:0.2rem"></i>-->
      <!--</template>-->
      <div v-if="headObj.rightText">
        <i @click="$emit('handleRightIcon')" class="iconfont iconrili"
           style="font-size: .1rem; color: white"></i>
      </div>
     <!-- <template #right v-if="$slots.icon">
        <slot name="icon">
          <img :src="require(`@/assets/themes/hjb/black/ic_calendar.svg`)" alt=""/>
        </slot>
      </template>-->
      <slot name="icon" right>
        <img :src="require(`@/assets/themes/hjb/black/ic_calendar.svg`)" alt=""/>
      </slot>
    </van-nav-bar>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Header',
    props: {
      // title: String,
      // leftText: String,
      rightText: String,
      // showArrow: Boolean,
      headObj: Object
    },
    data() {
      return {
        isAccountDetail: false
      }
    },
    methods: {
      changeIcon() {
        console.log(this.$route, 'pppp');
        let isAccountDetail = this.$route.path;
        console.log(isAccountDetail,'isAccountDetailisAccountDetail');
        if (isAccountDetail === '/accountDetail') {
          console.log(111);
          this.isAccountDetail = true
        } else {
          console.log(222);
          this.isAccountDetail = false
        }
      }
    },
    mounted() {
      this.changeIcon();
      // console.log(this.$router,'hhhheadad');
    },
    watch: {
      // $route: {
      //   handler(newName, oldName) {
      //     console.log('$route has changed');
      //   },
      //   deep: true
      // }
    },
  }
</script>

<style lang="scss" scoped>
/*  .header-box{
    height:px2rem(46px);
    position: relative;
    .header-wrap{
      background: none;
    }
    .move-right{
      margin-right: 30px;
    }
    /deep/ .van-nav-bar__title,
    /deep/ .van-nav-bar .van-icon,
    /deep/ .van-nav-bar__text,
    /deep/ .van-nav-bar__right .van-icon,
    .iconfont{
      color:#fff;
    }
  }
  .skin-black{
    .header-box{
      background: linear-gradient(151deg, #65317d -12%, #293384 126%);
    }

  }
  .skin-gray{
    .header-box{
      background: linear-gradient(91deg, #54517b 0%, #747199 100%, #747199 100%);
    }
  }*/



/*  .header-tab-l{
    .move-right{
      margin-right: 30px;
    }
  }
  //解决/deep/报警告改为 ::v-deep
  .header, /deep/ .van-sticky {
    width: 100%;
    height: 100%;
    ::v-deep .van-hairline--bottom::after {
      border-bottom-width: 0;
    }
  }

  .van-nav-bar {
    background-image: linear-gradient(151deg, #65317d -12%, #293384 126%);
    height: 100%;

    ::v-deep .van-nav-bar__title, ::v-deep .van-nav-bar__text, ::v-deep .van-icon {
      color: #fff !important;
    }
  }*/

</style>
