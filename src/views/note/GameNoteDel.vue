<template>
    <div class="del-body">
      <van-nav-bar title="订单详情" left-arrow @click-left="$emit('hideGameDel')">
        <van-icon size="18" />
      </van-nav-bar>
      <div class="ccontent">
        <div>
          <span>游戏名称</span>
          <span>{{ gameDataDel.chineseName }}</span>
        </div>
        <div>
          <span>投注金额</span>
          <span>{{ Number(gameDataDel.betAmount).toFixed(2) }}</span>
        </div>
        <div>
          <span>盈亏</span>
          <span
            :style="
              gameDataDel.winAmount > 0 ? 'color: RGB(89,174,89);' : 'color:red'
            "
            >{{ gameDataDel.winAmount < 0 ? "+" : ""
            }}{{ Number(-gameDataDel.winAmount).toFixed(2) }}</span
          >
        </div>
        <div>
          <span>投注时间</span>
          <span>{{ gameDataDel.betTime }}</span>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'GameNoteDel',
  props: {
    gameDataDel: Object,
    listData: Object
  }
}
</script>
<style lang="scss" scoped>
.del-body {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  background: #fff;
  .van-nav-bar {
    background: #bf242a;
    ::v-deep .van-nav-bar__title,
    ::v-deep .van-nav-bar__text,
    ::v-deep .van-icon {
      color: #fff !important;
    }
  }
  ::v-deep .van-hairline--bottom::after {
    border-bottom-width: 0 !important;
  }
  .ccontent {
    height: 100%;
    /*background: #efeff4;*/
    > div {
      height: 1rem;
      background: white;
      line-height: 1rem;
      padding: 0 0.3rem;
      font-size: 0.32rem;
      font-weight: 540;
      margin-top: 1px;
      display: flex;
      span:first-child {
        width: 100px;
        color: rgb(153, 153, 153);
      }
      span:last-child {
      }
    }
  }
}
</style>
