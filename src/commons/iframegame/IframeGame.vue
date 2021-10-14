<template>
  <div class="m-content">
    <iframe class="iframe-content iframe"
            :src="iframeSrc"
            frameborder="0"
            v-if="typeId === 12"></iframe>
    <iframe class="iframe-content iframe"
            :src="iframeSrc"
            frameborder="0"
            sandbox="allow-scripts allow-top-navigation allow-same-origin"></iframe>
    <img id="moveDiv"
         @mousedown="down"
         @touchstart="down"
         @mousemove="move"
         @touchmove.prevent="move"
         @mouseup="end"
         @touchend="end"
         :src="imgsrc"
         alt=""
         @click="show"/>
    <Dialog :showDialog="isShow" @closeDialog="isShow=false">
      <div slot="content">
        <div class="content-center">
          <div class="dialog-title">{{$t('lang.reminder.title[0]')}}</div>
          <div class="dialog-content">
            <div class="dialog-message" style="">
              <div>
                {{$t('lang.reminder.tips[0]')}}
              </div>
            </div>
          </div>
          <div class="dialog-footer">
            <span class="button cancel" @click="isShow=false">
              {{$t('lang.common.btn[2]')}}
            </span>
            <span class="button confirm" @click="isShow=false,$emit('showIframe')">{{$t('lang.common.btn[3]')}}</span>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
  import Dialog from '../dialog/Dialog'
  import {mapGetters} from "vuex";

  export default {
    name: 'IframeGame',
    components: {
      Dialog
    },
    data() {
      return {
        imgsrc: require('../../assets/img/back.png'),
        position: {x: 0, y: 0},
        isShow: false,
        nx: '',
        ny: '',
        dx: '',
        dy: '',
        xPum: '',
        yPum: ''
      }
    },

    props: {
      iframeSrc: String,
      typeId: {
        type: Number,
        default: -1,
      }
    },
    computed: {},
    created() {

      this.toast = this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    mounted() {
      const iframe = document.querySelector('.iframe')
      const _this = this
      if (iframe.attachEvent) {
        // iframe.contentWindow.postMessage(object, '*');
        // window.addEventListener('message', function (event) {
        //   //event.data获取传过来的数据
        //   console.log(event, 'eeee');
        // });
        iframe.attachEvent('onload', function () {
          _this.toast.clear()
          console.log('iframe已加载完毕111')
        })
      } else {
        iframe.onload = function () {
          _this.toast.clear()
          console.log('iframe已加载完毕2222')
        }
      }
    },
    methods: {
      // 实现移动端拖拽
      down() {
        this.flags = true
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        this.position.x = touch.clientX
        this.position.y = touch.clientY
        this.dx = moveDiv.offsetLeft
        this.dy = moveDiv.offsetTop
      },
      move() {
        if (this.flags) {
          var touch
          if (event.touches) {
            touch = event.touches[0]
          } else {
            touch = event
          }
          this.nx = touch.clientX - this.position.x
          this.ny = touch.clientY - this.position.y
          this.xPum = this.dx + this.nx
          this.yPum = this.dy + this.ny
          const width = window.innerWidth
          const height = window.innerHeight
          if (this.xPum < 0) {
            moveDiv.style.left = 0
          } else if (this.xPum > width - 50) {
            moveDiv.style.left = width - 50 + 'px'
          } else {
            moveDiv.style.left = this.xPum + 'px'
          }
          if (this.yPum < 0) {
            moveDiv.style.top = 0
          } else if (this.yPum > height - 50) {
            moveDiv.style.top = height - 50 + 'px'
          } else {
            moveDiv.style.top = this.yPum + 'px'
          }
        }
      },
      // 鼠标释放时候的函数
      end() {
        this.flags = false
      },
      show() {
        this.isShow = true
      }
    }
  }
</script>
<style lang="scss" scoped>
  .skin-black {
    .m-content {
      .content-center {
        color: #fff;
        .dialog-title {
          background: #24252D;
          color: #fff;
          border-bottom: 0.02rem solid #717180;
        }
        .dialog-content {
          color: #9a9aa7;
          background: #24252D;
        }
        .dialog-footer {
          .button {
            color: #fff;
          }
          .cancel {
            color: #dadada;
            background: linear-gradient(180deg, #645592 1%, #322b4d);
          }
          .confirm {
            background: linear-gradient(180deg, #efcea6, #dab591);
            color: #533510;
          }
          .cancel:after {
            border-right: 1px solid #e5e5e5;
          }
        }
        .dialog-footer:after {
          border-top: 1px solid #e5e5e5;
        }
      }
    }
  }
  .skin-gray {
    .m-content {
      .content-center {
        color: #fff;
        .dialog-title {
          background: #24252D;
          color: #fff;
          border-bottom: 0.02rem solid #717180;
        }
        .dialog-content {
          color: #9a9aa7;
          background: #24252D;
        }
        .dialog-footer {
          .button {
            color: #fff;
          }
          .cancel {
            color: #dadada;
            background: linear-gradient(180deg, #8c90bc 1%, #545a96);;
          }
          .confirm {
            background: linear-gradient(180deg, #ffedc6, #ffd57d);
            color: #533510;
          }
          .cancel:after {
            border-right: 1px solid #e5e5e5;
          }
        }
        .dialog-footer:after {
          border-top: 1px solid #e5e5e5;
        }
      }
    }
  }

  .m-content {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10001;
    .iframe-content {
      height: 100%;
      width: 100%;
    }
    img {
      position: fixed;
      top: 0.5rem;
      right: 0.5rem;
      width: 1.2rem;
      height: 1.2rem;
      transform: rotate(90deg);
    }
    .content-center {
      color: #fff;
      text-align: center;
      .dialog-title {
        text-align: center;
        font-size: .34rem;
        background: #F8D59A;
        color: #533510;
        line-height: .8rem;
        border-radius: .1rem .1rem 0 0;
        position: relative;
      }
      .dialog-content {
        padding: .8rem .3rem;
        font-size: .3rem;
        text-align: center;
      }
      .dialog-footer {
        position: relative;
        /*height: .9rem;*/
        display: flex;
        align-items: center;
        justify-content: space-around;

        .button {
          text-align: center;
          color: #F7D495;
          font-size: .34rem;
          line-height: .9rem;
          flex: 1;
        }

        .cancel {
          position: relative;
          color: #fff;
        }

        .cancel:after {
          position: absolute;
          content: "";
          transform-origin: 0 0;
          pointer-events: none;
          box-sizing: border-box;
          z-index: 0;
          border-right: 1px solid #e5e5e5;
          border-radius: 0;
          height: 100%;
          top: 0;
          right: 0;
          bottom: 0;
          transform: translate3d(50%, 0, 0) scale(1);
        }
      }
      .dialog-footer:after {
        position: absolute;
        content: "";
        transform-origin: 0 0;
        pointer-events: none;
        box-sizing: border-box;
        z-index: 0;
        border-top: 1px solid #e5e5e5;
        border-radius: 0;
        width: 100%;
        left: 0;
        top: 0;
        right: 0;
        transform: translateZ(0) scale(1);
      }
    }

    .van-dialog {
      transform: translate3d(-50%, -50%, 0) rotate(90deg);
      top: 50%;
    }
  }
</style>
