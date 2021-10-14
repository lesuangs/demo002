<template>
  <div class="header">
    <!-- <van-sticky > -->
    <van-nav-bar
        :left-arrow="showArrow"
        @click-left="$router.go(-1)"
    >
      <slot slot="title">
        <div class="middle">
          <div :class="['m-header-selector', showTitle ? 'rotate' : '']" @click="showTitle = !showTitle">
            {{ titleList[activeIdx].title }}
          </div>
        </div>
      </slot>
    </van-nav-bar>
    <!-- </van-sticky> -->
    <div v-show="showTitle" class="m-popup">
      <!--<div class="mask" style="opacity: 0.3;" @click="showTitle = !showTitle"></div>-->
      <van-overlay :show="showTitle" @click="showTitle = !showTitle"/>
      <div class="content-top">
        <ul class="m-select-list">
          <li :class="['item', activeIdx === item.id ? 'active': '']" v-for="item in titleList" :key="item.id"
              @click="handleItemClick(item)">{{ item.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderSelect',
  props: {
    showArrow: Boolean,
    isShowTitle: Boolean,
    activeId: Number,
    titleList: Array
  },
  computed: {
    activeIdx: {
      get() {
        return this.activeId
      },
      set(val) {
        return this.$emit('changeActiveId', val)
      }
    }
  },
  data() {
    return {
      showTitle: false
    }
  },
  methods: {
    handleItemClick(item) {
      this.activeIdx = item.id
      this.showTitle = false
    }
  }
}
</script>

<style lang="scss" scoped>
//解决/deep/报警告改为 ::v-deep
/*.header .van-nav-bar {*/
/*  z-index: 9999;*/
/*}*/

.header {
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

  .m-header-selector {
    display: inline-block;
    border: 1px solid #fff;
    border-radius: .07rem;
    position: relative;
    padding: .02rem .62rem .02rem .3rem;
    min-width: 2.4rem;
    min-height: .54rem;
    font-size: .36rem;
  }

  .m-header-selector:before {
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

  .m-header-selector:after {
    position: absolute;
    content: "";
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
    z-index: 0;
    border: 1px solid #fff;
    border-radius: .06rem;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    transform: translateZ(0) scale(1);
  }

  .rotate:before {
    transform: rotate(-180deg);
  }
}

.m-popup {
  position: fixed;
  z-index: 2000;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;

  .mask {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 45px;
    left: 0;
    background-color: #000;
  }

  .content-top {
    width: 100%;
    position: absolute;
    top: 45px;
    left: 0;
    z-index: 1;

    .m-select-list {
      background-color: #fff;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      padding: .3rem .2rem 0 .2rem;
      flex-wrap: wrap;
      align-items: center;

      .item {
        position: relative;
        overflow: inherit;
        border: 1px solid #e5e5e5;
        border-radius: .1rem;
        margin: 0 1.5% .3rem 1.5%;
        width: 30.3%;
        height: 30px;
        line-height: 30px;
        /*padding: .06rem 0;*/
        text-align: center;
        font-size: .3rem;
      }

      .active {
        border-color: #c00;
        color: #c00;
      }
    }
  }
}

</style>
