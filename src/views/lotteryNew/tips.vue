<template>
  <van-dialog
          v-model="isShowTips"
          :close-on-click-overlay="isShowTips"
          :showConfirmButton="false"
          :showCancelButton="false"
          :overlayStyle="{'background-color': 'rgba(0,0,0,.3)'}">
    <div class="main-content">
      <div class="dialog-header">
        <p class="title">{{$t('lang.lotteryTips.title')}}</p>
      </div>
      <ul class="dialog-content">
        <li class="info-content">
          <p class="title">
            <i class="spot"></i><span>{{$t('lang.lotteryTips.playTipsTitle')}}</span>
          </p>
          <div class="detail">{{$t('lang.lotteryTips.playTipsDesc')}}</div>
        </li>
        <li class="info-content">
          <p class="title">
            <i class="spot"></i><span>{{$t('lang.lotteryTips.winInstructionTitle')}}</span>
          </p>
          <div class="detail">{{$t('lang.lotteryTips.winInstructionDesc')}}</div>
        </li>
        <li class="info-content">
          <p class="title">
            <i class="spot"></i><span>{{$t('lang.lotteryTips.exampleTitle')}}</span></p>
          <div class="detail">{{$t('lang.lotteryTips.exampleDesc')}}</div>
        </li>
      </ul>
    </div>
  </van-dialog>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "tips",
    data() {
      return {
        isShowTips: true
      }
    },
    computed: {
      ...mapState([
        'currentLotteryInfo'
      ])
    },
    methods: {
      ...mapActions([
        'getPlayTips'
      ]),
      getTips() {
        let type = this.currentLotteryInfo.type;
        this.getPlayTips(type).then((_data)=>{
          console.log(_data,'pppppklltip');
        })
      }
    },
    mounted(){
      this.getTips();
    }
  }
</script>

<style scoped lang="scss">
  .van-overlay {
    background-color: rgba(0, 0, 0, .3);
  }

  .van-dialog {
    border-radius: 0.1rem;
    .main-content {
      background-color: #3D3B52;
      border-radius: 0.1rem;
      .dialog-header {
        text-align: center;
        background-color: #3D3B52;
        height: 0.8rem;
        line-height: 0.8rem;
        border-radius: 0.1rem 0.1rem 0 0;
        border-bottom: 1px solid #717180;
        .title {
          color: #fff;
          font-size: 0.32rem;
        }
      }
      ul.dialog-content {
        white-space: pre-line;
        padding: 0.2rem;
        li.info-content {
          margin-bottom: 0.3rem;
          position: relative;
          display: flex;
          flex-direction: column;
          color: #333;
          .title {
            height: 1rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-size: 0.3rem;
            color: #fff;
            i.spot {
              margin: 0 0.2rem 0 0;
              border: 3px solid #ffd57d;
              border-radius: 50%;
              width: 0;
              height: 0;
            }
          }
          .detail {
            text-align: left;
            color: #9a9aa7;
            font-size: 0.22rem;
            margin-left: 0.39rem;
          }
          i {
            color: #c00;
            font-size: 0.38rem;

          }
        }
      }
    }
  }
</style>
