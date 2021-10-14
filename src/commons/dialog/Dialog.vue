<template>
  <van-dialog v-model="isShow" :show-confirm-button="false"
              :show-cancel-button="false" :close-on-click-overlay="isShow"
              :title="title">
    <slot name="content"></slot>
  </van-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    showDialog: Boolean,
    title: String
  },
  computed: {
    isShow: {
      get () {
        return this.showDialog
      },
      set (val) {
        return this.$emit('closeDialog', val)
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

</style>
