<template>
  <ul class="footer-box">
    <li v-for="(item, index) in list" :key="index"
        class="footer-item">
      <div :class="[switchRoute(item)? 'active':'']"
           @click="$router.push(item.link)">
        <i :class="'iconfont ' + item.iconName"></i>
        <span>{{ $t(item.name) }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'Footer',
    props: {
      // actived: Number,
      actived: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        active: this.actived,
        list: [
          {
            "name": "lang.footer.home",
            "link": "/",
            iconName: 'iconic-home-f',
          },
          {
            "name": "lang.footer.Draw",
            "link": "/Draw",
            iconName: 'iconic-draw',
          },
          {
            "name": "lang.footer.Lottery",
            "link": "/Lottery",
            iconName: 'iconic-buyit',
          },
          {
            "name": "lang.footer.find",
            "link": "/ranking",
            iconName: 'iconicons-bottom-nav-ic-rank',
          },
          {
            "name": "lang.footer.member",
            "link": "/user",
            iconName: 'iconic-myacc',
          }
        ]
      }
    },
    computed: {
      ...mapState([
        'currentRoute'
      ]),
    },
    methods: {
      switchRoute(item) {
        let route = this.currentRoute;
        // console.log(item.link === route.path,item.link,route.path,'routerouteroute');
        if (item.link === route.path) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  ul.footer-box {
    /*除了颜色外，这是共同的架构，颜色在下面两个皮肤样式里面：.skin-gray，.skin-black*/
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: px2rem(80px);
    z-index: 10;
    /*border-top: 1px solid orangered;*/
    li.footer-item {
      flex: 1;
      height: 100%;
      div {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      div.active {
        color: #FFEABF;
      }
      &:nth-child(3) {
        .iconfont {
          font-size: px2rem(50px);
        }
        span {
          position: absolute;
          top: 50%;
          left: 50%;
          font-size: px2rem(16px);
          transform: translate(-50%, -50%);
        }
      }
      .iconfont {
        font-size: px2rem(20px);
      }
      span {
        line-height: px2rem(25px);
        font-size: px2rem(12px);
      }
    }

  }

  .skin-gray {
    ul.footer-box {
      background: $skin-gray-footer-bg;
      li.footer-item {
        color: $skin-gray-text-color;
        &:nth-child(3) {
          .iconfont {
            /*background-image: -webkit-linear-gradient(left, #57C0F8, #438BF5);*/
            background: url("./invalid-name-gray.png") no-repeat center center;
            background-size: 100% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          span {
            color: #fff;
          }
        }
        div.active {
          color: #FFEABF;
        }
        &:not(:nth-child(3)) div.active {
          color: #FFEABF;
        }

      }
    }
  }

  .skin-black {
    ul.footer-box {
      background: $skin-black-footer-bg;
      li.footer-item {
        color: $skin-black-text-color;
        &:nth-child(3) {
          .iconfont {
            background: url("./ic-buyit-black.png") no-repeat center center;
            background-size: 100% 100%;
            /*background-image: -webkit-linear-gradient(145deg, #1E6FD0, #8245B9, #CE29B0);*/
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          span {
            color: #fff;
          }
        }
        div.active {
          color: #FFEABF;
        }
        /*&:not(:nth-child(3)) div.active {*/
        /*color: #FFEABF;*/
        /*}*/

      }
    }
  }

</style>
