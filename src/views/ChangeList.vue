<template>
  <div class="message_list change-list-box">
    <div class="body">
      <div class="content" v-if="list.length > 0">
        <vue-better-scroll
            class="wrapper"
            ref="Mscroll"
            :scrollbar="scrollbarObj"
            :pullDownRefresh="pullDownRefreshObj"
            :pullUpLoad="pullUpLoadObj"
            :startY="parseInt(startY)"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp"
        >
          <template v-for="(v, i) in list">
            <div
                v-if="!removeIdList.includes(v.id)"
                :key="i"
                class="v-item"
                @click="openDel(v, i)"
            >
              <div class="top">
                <span>{{ v.account }}</span>
                <span :class="[(v.money < 0) ? 'money-negative':'money-positive']">
                  {{ v.money | formatAmount}}
                </span>
              </div>
              <div class="bottom">
                <span>{{ v.createTime }}</span>
                <span>{{ v.tranType === 34 ? $t('lang.BalanceChange.tips[0]') : $t('lang.BalanceChange.tips[1]')}}</span>
              </div>
            </div>
          </template>
        </vue-better-scroll>
      </div>
      <NotData v-else :isNotData="isNotData"/>
    </div>
  </div>
</template>

<script>
import utils from "../utils/utils"
import Header from "../commons/header/Header";
import NotData from "../commons/notdata/NotData";
import VueBetterScroll from "../commons/scroll/BScroll";

export default {
  name: "ChangeList",
  components: {
    Header,
    VueBetterScroll,
    NotData,
  },
  data() {
    return {
      headObj: {
        title: "lang.header.StationLetter",
        showArrow: true,
      },
      // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
      scrollbarObj: {
        fade: true,
      },
      // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
      pullDownRefreshObj: {
        threshold: 90,
        stop: 40,
      },
      // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: this.$t("lang.BScroll.jiaZaiGengDuo"),
          noMore: this.$t("lang.BScroll.meiYouGengDuo"),
        },
      },
      startY: 0, // 纵轴方向初始化位置
      page: 1,
      rows: 15,
      list: [],
      delIdx: 0,
      removeIdList: [],
      isNotData: true,
    };
  },
  created() {
    this.queryData(this.page, 1);
  },
  methods: {
    // 下拉刷新
    onPullingDown() {
      setTimeout(() => {
        this.page = 1;
        this.queryData(this.page, 1);
      }, 500);
    },
    // 上拉 加载更多数据
    onPullingUp() {
      setTimeout(() => {
        this.page = this.page + 1;
        this.queryData(this.page, 2);
      }, 500);
    },
    queryData(page, type) {
      const params = {
        page,
        tranTypes: "33,34",
        rows: this.rows,
      };
      this.$http.home.getTransferList(params).then((res) => {
        this.list =
            type === 2 ? this.list.concat(res.data.data) : res.data.data;
        this.totalCount = res.data.totalCount;
        if (res.data.data.length === 0) {
          this.isNotData = false;
        }
        let isForceUpdate = this.list.length === this.totalCount;
        setTimeout(() => {
          this.$refs.Mscroll.forceUpdate(!isForceUpdate);
        }, 100);
      });
    },
    openDel(item, i) {
      // this.isDel = true;
      this.$emit("showDel", true, item)
      // this.delIdx = i;
      // const params = {
      //   id: item.id,
      // };
    },
    // del() {
    //   const params = {
    //     id: this.list[this.delIdx].id,
    //   };
    //   this.$http.home.delStatus(params).then((res) => {
    //     this.removeIdList.push(this.list[this.delIdx].id);
    //     this.isDel = false;
    //   });
    // },
  },
  filters: {
    formatAmount: utils.formatAmount
  }
};
</script>

<style lang="scss" scoped>
  .change-list-box{
    .body,.content{
      background: none !important;
    }
  }

  .skin-gray{
    .change-list-box{
      background: $skin-gray-bg;
      .v-item{
        background: $skin-gray-con-bg;
        .bottom{
          color:$skin-gray-text-sub-color;
        }
      }
    }
  }

  .skin-black{
    .change-list-box{
      background: $skin-black-bg;
      .v-item{
        background: $skin-black-con-bg;
        .bottom{
          color:$skin-black-text-sub-color;
        }
      }
    }
  }

.message_list {
  height: 100%;
  display: flex;
  width: 100%;
  flex-direction: column;

  .body {
    flex: 1;
    background: #f5f5f9;
    overflow-x: scroll;
    position: relative;

    .content {
      display: flex;
      height: 100%;
      flex-direction: column;
      background: #fff;

      .v-item {
        display: flex;
        flex-direction: column;
        /*border-bottom: 1px solid #ddd;*/
        padding: 5px 10px;
        font-size: 0.3rem;
        min-height: 1.4rem;
        justify-content: space-around;
        .top {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

          span:first-child {
            color: white;
          }

          span.money-negative {
            color: #4fbb72;
          }
          span.money-positive {
            color: red;
          }

          // span:last-child {

          //   color: #4fbb72;
          // }
        }

        .bottom {
          /*color: #aaa;*/
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.2rem;
          /*color: #8f8f8f;*/
        }
      }
    }

    .m-no-data {
      padding-top: 1.2rem;
      text-align: center;

      img {
        width: 2.8rem;
      }
    }

    .text {
      margin-top: 0.8rem;
      font-size: 0.28rem;
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
    z-index: 2;

    .van-nav-bar {
      background: #dd413a;

      ::v-deep .van-nav-bar__title,
      ::v-deep .van-nav-bar__text,
      ::v-deep .van-icon {
        color: #fff !important;
      }
    }

    .del-content {
      flex: 1;
      background: #f5f5f5;

      .message-wrapper {
        padding: 10px;

        .title {
          line-height: 1.2;
          margin: 10px 0;
          font-size: 24px;
          font-weight: 600;
          color: #343434;
        }

        .addTime {
          margin: 10px 0;
          font-size: 14px;
          color: #999;
        }

        .detail {
          line-height: 2;
          text-indent: 2em;
        }

        .btn-list {
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin-top: 20px;

          .van-button {
            width: 47%;
            margin-left: 10px;
            height: 0.6rem;
            line-height: 0.6rem;
          }
        }
      }
    }
  }
}
</style>
