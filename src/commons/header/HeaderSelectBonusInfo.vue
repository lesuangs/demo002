<template>
  <div class="header-wrapper">
    <!-- <van-sticky > -->
    <van-nav-bar :left-arrow="showArrow"
                 @click-left="$router.go(-1)">
      <slot slot="title">
        <div class="middle" v-if="titleList.length>0">
          <div :class="['header-selector', showTitle ? 'rotate' : '']"
               @click="showTitle = !showTitle">
            {{ titleList[activeId].name }}
          </div>
        </div>
      </slot>
    </van-nav-bar>
    <div v-show="showTitle" class="content-popup"
         @click.stop="showTitle = !showTitle">
      <div class="content-top">
        <ul class="content-select-list">
          <li :class="[activeId === index ? 'active': '']"
              v-for="(item,index) in titleList" :key="item.id"
              @click.stop="handleItemClick(item,index)">{{item.name}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HeaderSelectBonusInfo',
    props: {
      showArrow: Boolean,
      isShowTitle: Boolean,
      // activeId: Number,
      // playId:Number,
      titleList: Array,
      // changeActiveId:Function,
    },
    data() {
      return {
        showTitle: false,
        activeId: 0,
      }
    },
    computed: {
      // activeIdx: {
      //   get() {
      //     return this.activeId
      //   },
      //   set(val) {
      //     console.log(val,'fff')
      //     return this.activeId = val;
      //     // return this.$emit('changeActiveId', val)
      //   }
      // },
      // getPlayId:{
      //   // get() {
      //   //   return this.playId
      //   // },
      //   set(val) {
      //     return this.$emit('changeActiveId', val)
      //   }
      // }
    },

    methods: {
      handleItemClick(item, index) {
        // console.log(item, index, 'iiiiiiin');
        this.activeId = index;
        this.showTitle = false;
        this.$emit('changeActiveId', item.id);
        // this.getPlayId = item.id;
        // console.log(item,idx,999);
      }
    }
  }
</script>

<style lang="scss" scoped>
  //解决/deep/报警告改为 ::v-deep
  /*.header .van-nav-bar {*/
  /*  z-index: 9999;*/
  /*}*/

  .header-wrapper {
    /* .van-nav-bar {
       background-image: linear-gradient(151deg, #65317d -12%, #293384 126%);
     }

     ::v-deep .van-nav-bar__title, ::v-deep .van-nav-bar__text, ::v-deep .van-icon {
       color: #fff !important;
     }*/

    .middle {
      z-index: 10;
      width: 60%;
      height: .5rem;
      line-height: .5rem;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .header-selector {
      display: inline-block;
      border-radius: .07rem;
      position: relative;
      padding: .02rem .62rem .02rem .3rem;
      min-width: 2.4rem;
      min-height: .54rem;
      font-size: .36rem;
    }
    .header-selector:before {
      content: "";
      position: absolute;
      top: .22rem;
      right: .22rem;
      display: inline-block;
      border: .1rem solid transparent;
      border-top-color: #fff;
      width: .1rem;
      transform-origin: 50% 20%;
      transition: transform .5s;
    }
    .rotate:before {
      transform: rotate(-180deg);
    }
  }

  .content-popup {
    position: fixed;
    z-index: 2000;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    .content-top {
      width: 100%;
      position: absolute;
      top: 0.9rem;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      overflow-y: scroll;
      background: #24252D;
      /*opacity: 0.3;*/
      ul.content-select-list {
        /*background-color: #24252d;*/
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding: .3rem .2rem 0 .2rem;
        flex-wrap: wrap;
        align-items: center;
        li {
          position: relative;
          overflow: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          padding:5px;
          border-radius: .1rem;
          margin: 0 1.5% .3rem;
          width: 30.3%;
          height: 50px;
          line-height: 20px;
          text-align: center;
          font-size: .3rem;
          box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
          background-color: #16171b;
          color: #8f8f8f;
          &.active {
            color: #533510;
            background-image: linear-gradient(to bottom, #efcea6, #dab591);
          }
        }

      }
    }
  }

</style>
