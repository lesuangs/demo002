<template>
  <div class="grid-box">
    <div v-for="(v,i) in gridList" :key="i" class="gridList">
      <van-cell
          :title="$t(v.text)"
          :to="v.path"
          :icon="v.iconName"
          >
      </van-cell>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Grid',
  props: {
    gridList: Array,
    styles: Object,
    columnNum: Number
  }, mounted() {
    console.log(this.gridList);
  }
}
</script>

<style lang="scss" scoped>
.grid-box{
  .gridList{
    /deep/ .van-cell{
      .iconfont{
        margin-right: px2rem(15px);
      }
    }
  }
}
  .skin-gray{
    .grid-box{
      .gridList{
        &:not(:last-child){
          @include border-1px($skin-gray-border-color);
        }
        /deep/ .van-cell{
          .van-cell__title{
            color:#fff;
          }
          .iconfont{
            color:#888898;
          }
        }
      }
    }



  }

  .skin-black{
    .grid-box{
      .gridList{
        &:not(:last-child){
          @include border-1px($skin-black-border-color);
        }
        /deep/ .van-cell{
          .van-cell__title{
            color:#fff;
          }
          .iconfont{
            color:#585867;
          }
        }
      }
    }

  }

//.gridList{
//border-bottom: .02rem solid rgb(245, 245, 245)
//}
</style>
