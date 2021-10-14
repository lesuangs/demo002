<template>
  <footer class="footer">
    <template v-for="(item, idx) in navList">
      <div class="footer-item" :key="idx" @click="$router.push(item.link)">
        <img :src="actived === idx ? $t(item.icon.active) : $t(item.icon.inactive)"/>
        <span :class="[actived === idx ?'active': '']">{{ $t(item.name) }}</span>
      </div>
    </template>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    actived: Number,
  },
  data() {
    return {
      active: this.actived,
    }
  },
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  position: fixed;
  bottom: 0;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  height: 50px;
  z-index: 999;
  font-size: .24rem;
  background-color: #fff;
  border-top: 1px solid #f1f1f1;

  .footer-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    height: 100%;
    justify-content: center;
    color: #666;

    &:nth-child(3) {
      img {
        width: 55px;
        height: 55px;
        margin-bottom: 5px;
      }
    }

    img {
      width: 22px;
      height: 22px;
    }

    .active {
      color: #c00;
    }

    .blueAct {
      color: #77869e;
    }

    span {
      margin-top: 5px;
    }
  }
}
</style>
