<template>
  <div class="del-body lottery-note-del-box">
    <van-nav-bar :title="$t('lang.lotteryNote.detailTitle')" left-arrow @click-left="$emit('hideCpDel')">
      <van-icon size="18"/>
    </van-nav-bar>
    <div class="lottery-note-del-wrap" :class="cpDataDel.result > 0? 'del-bonus':'' ">
<!--      <div class="body-back"></div>-->
      <div class="ccontent">
        <div class="del-top">
          <img :src=" '/data/lotteryPicture/' + cpDataGame.code + '.png'" />
          <span class="del-name">{{ cpDataGame.name }}</span>
          <span class="del-turn">{{$t('lang.lotteryNote.di')}} {{ cpDataDel.turnNum }} {{$t('lang.lotteryNote.issueText')}}</span>
          <span class="del-staus" v-if="cpDataDel.status === 0">{{$t('lang.lotteryNote.noDraw')}}</span>
          <span class="del-staus" v-else-if="cpDataDel.status === 1">{{
            cpDataDel.result > 0
                ? `${$t('lang.lotteryNote.winning')}&nbsp;${cpDataDel.reward.toFixed(2)} ${$t('lang.common.yuan')}`
                : $t('lang.lotteryNote.noWin')
          }}</span>
          <span class="del-staus" v-else-if="cpDataDel.status === 2"
          >{{$t('lang.lotteryNote.rescinded')}}</span
          >
          <span class="del-staus" v-else>{{$t('lang.lotteryNote.abnormalOrder')}}</span>
        </div>
        <div class="del-bottom">
          <div>
            <span>{{$t('lang.lotteryNote.lotteryNumber')}}</span>
            <span><BallAll v-if="cpDataDel.openNum" :gameType="lotteryItem.type" :openNum="cpDataDel.openNum"/></span>
          </div>
          <div>
            <span>{{$t('lang.lotteryNote.betNumber')}}</span>
            <span class="num-b">{{ cpDataDel.poschooseName}} {{ cpDataDel.betInfo }}</span>
          </div>
          <div>
            <span>{{$t('lang.lotteryNote.orderNo')}}</span>
            <span class="color">{{ cpDataDel.orderNo }}</span>
            <span
                    @click="fuzhi()"
                    :data-clipboard-text="cpDataDel.orderNo"
                    class="copy-btn"
            >
            {{$t('lang.common.copy')}}
              <!----></span
            >
          </div>
          <div>
            <span>{{$t('lang.lotteryNote.betTime')}}</span>
            <span class="color">{{ cpDataDel.addTime }}</span>
          </div>
          <div>
            <span>{{$t('lang.lotteryNote.playName')}}</span>
            <span class="color">{{ cpDataDel.cateName }}</span>
          </div>
          <div class="line">
            <span>{{$t('lang.lotteryNote.betMoney')}}</span>
            <span class="color">{{ cpDataDel.totalMoney.toFixed(2) }}</span>
          </div>
         <!-- <div>
            <span>{{$t('lang.lotteryNote.betRebate')}}</span>
            <span class="color">{{ cpDataDel.rebate }}%</span>
          </div>-->
          <div>
            <span>{{$t('lang.lotteryNote.betOdds')}}</span>
            <span class="color">{{ cpDataDel.odds }}</span>
          </div>
        </div>
        <div class="step-button-box">
          <button class="btn-type1"
                  @click="cancel(cpDataDel.orderNo)"
                  v-if="cpDataDel.status === 0">
            {{$t('lang.lotteryNote.revoke')}}</button>
          <button class="btn-type2"
                  @click="playGame(cpDataDel)"
                  :class="cpDataDel.status === 0?'smallBtn':'bigBtn'"
                  native-type="submit">
            {{$t('lang.lotteryNote.moreShot')}}
          </button>
        </div>
      </div>



      <div class="bottomSel" style="display: none">
        <div
                class="img-back"
                @click="cancel(cpDataDel.orderNo)"
                v-if="cpDataDel.status === 0"
        >
          {{$t('lang.lotteryNote.revoke')}}
          <!--        <img :src="require(`../../assets/img/tuidan.png`)" alt=""/>-->
        </div>
        <!--      <div class="end-back" v-else-if="cpDataDel.status === 1">-->
        <!--        <img-->
        <!--            v-if="cpDataDel.result > 0"-->
        <!--            :src="require(`../../assets/img/winning.png`)"-->
        <!--            alt=""-->
        <!--        />-->
        <!--        <img v-else :src="require(`../../assets/img/noWinning.png`)" alt=""/>-->
        <!--      </div>-->
        <!--      <div class="img-back" v-else></div>-->
        <div class="btn" @click="playGame(cpDataDel)">
          <van-button block native-type="submit" :class="cpDataDel.status === 0?'':'bigBtn'">
            {{$t('lang.lotteryNote.moreShot')}}
          </van-button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import Clipboard from "clipboard";
import BallAll from "../../commons/balls/BallAll";
import {Dialog} from "vant";

export default {
  name: "LotteryNoteDel",
  data() {
    return {
      lotteryItem: {},
    };
  },
  components: {
    BallAll,
  },
  props: {
    cpDataDel: Object,
    cpDataGame: Object,
    listData: Object,
    gameType: String
  },
  created() {
    this.getLottery();
  },
  methods: {
    //获取彩种信息
    getLottery() {
      if (!sessionStorage.getItem("LotteryTypeList")) {
        this.$http.home.getCpGame().then((res) => {
          sessionStorage.setItem("LotteryTypeList", JSON.stringify(res.data));
          let lotteryTypeList = res.data;
          lotteryTypeList.forEach((element) => {
            if (element.id === parseInt(this.cpDataDel.gameId)) {
              this.lotteryItem = element;
            }
          });
        });
      } else {
        let lotteryTypeList = JSON.parse(
            sessionStorage.getItem("LotteryTypeList")
        );
        lotteryTypeList.forEach((element) => {
          if (element.id === parseInt(this.cpDataDel.gameId)) {
            this.lotteryItem = element;
          }
        });
      }
    },
    cancel(orderNo) {
      Dialog.confirm({
        title: "",
        message: this.$t('lang.lotteryNote.ifRevoke'),
      }).then(() => {
        this.$http.home
            .cancel({
              orderNo: orderNo,
            })
            .then((res) => {
              this.$toast.success(this.$t('lang.lotteryNote.CancellationSuccessful'));
              this.cpDataDel.status = 2;
            })
            .catch((err) => {
              this.t = Date.now();
              this.$toast.fail(err.data.msg);
            });
      });
    },
    fuzhi() {
      const clipboard = new Clipboard(".fuzhi");
      clipboard.on("success", (e) => {
        this.$toast.success({
          message: this.$t('lang.state.copySuccess'),
          forbidClick: true,
        });
        e.clearSelection();
        clipboard.destroy(); // 复制成功后删除实例
      });
    },
    playGame(item) {
      let id = this.lotteryItem.id;
      this.$router.push({
        path: '/lotteryNew',
        query: {
          id: id
        }
      })
      // this.$router.push({
      //   path: lotteryId.type,
      //   query: {lotteryId: lotteryId.id, itemCate: lotteryId.cate, type: lotteryId.type, code: lotteryId.code}
      // })
    },
  },
};
</script>
<style lang="scss" scoped>
  .lottery-note-del-box{

    /deep/.van-nav-bar{
      height: auto;
    }
    .lottery-note-del-wrap{
      height:100%;
      overflow-y: scroll;
    }
    .step-button-box{
      margin:px2rem(30px) 0 px2rem(70px);
      padding:0;
      .smallBtn{
        flex:2;
      }
    }
    .del-top{
      .del-staus{
        /*display: inline-block;*/
        width:px2rem(335px);
        height:px2rem(90px);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: px2rem(10px);
        /*color: red;*/
      }
    }
    .del-bottom{
      margin:0 px2rem(14px);
      div>span{
        &:first-child{
          display: inline-block;
          min-width: px2rem(70px);
          margin-right: px2rem(2px);
        }
      }
    }

  }

  .skin-gray{
    .lottery-note-del-box{
      /*background:#3C3B53;*/
      .lottery-note-del-wrap{
        @include bg-image('../../assets/themes/hjb/grey/note/noWin-bg');
        background-size: contain;
        background-color:$skin-gray-bg;
        .del-top{
          .del-staus{
            @include bg-image('../../assets/themes/hjb/grey/note/noWin-name');
            background-size: contain;
            color: #fff;
          }
        }
        &.del-bonus{
          @include bg-image('../../assets/themes/hjb/grey/note/bg');
          background-size: contain;
          .del-top{
            .del-staus{
              @include bg-image('../../assets/themes/hjb/grey/note/invalid-name');
              background-size: contain;
              color:#fff;
            }
          }
        }
      }
      .del-bottom{
        background: $skin-gray-con-bg;
        div>span{
          &:first-child{
            color:$skin-gray-text-color;
          }
        }
      }
    }
  }

  .skin-black{
    .lottery-note-del-box{
      /*background:#3C3B53;*/
      .lottery-note-del-wrap{
        @include bg-image('../../assets/themes/hjb/black/note/noWin-bg');
        background-size: contain;
        background-color:$skin-black-bg;
        .del-top{
          .del-staus{
            @include bg-image('../../assets/themes/hjb/black/note/noWin-name');
            background-size: contain;
            color: #fff;
          }
        }
        &.del-bonus{
          @include bg-image('../../assets/themes/hjb/black/note/bg');
          background-size: contain;
          .del-top{
            .del-staus{
              @include bg-image('../../assets/themes/hjb/black/note/invalid-name');
              background-size: contain;
              color:#fff;
            }
          }
        }
      }
      .del-bottom{
        background: $skin-black-con-bg;
        div>span{
          &:first-child{
            color:$skin-black-text-color;
          }
        }
      }
    }
  }


.del-body {
  //display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  /*background-color: #191b1f;*/

  .van-nav-bar {
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
    display: flex;
    flex-direction: column;
    flex: 1;

    .del-top {
      /*background-image: url(../../assets/themes/hjb/black/bg.svg);*/
      /*background-size: cover;*/
      position: relative;
      width: 100%;
      /*height: 7.6rem;*/
      text-align: center;
      display: flex;
      flex-direction: column;
      color: #fff;
      align-items: center;

      img {
        width: 1.3rem;
        height: 1.3rem;
        margin-top: 0.3rem;
      }

      .del-staus {
        font-size: 0.36rem;
        color: #606070;
        /*position: absolute;*/
        /*top: 3.3rem;*/
        //margin-top: 0.5rem;
      }

      .del-name {
        font-size: 0.32rem;
        //margin: 0.2rem 0 0.1rem 0;
      }

      .del-turn {
        font-size: .26rem;
        color: #fff;
        margin-top: .2rem;
      }
    }

    .del-bonus {
      /*background-image: url(../../assets/themes/hjb/black/bg_bonus.png);*/

      .del-staus {
        color: white;
      }
    }

    .del-bottom {
      /*width: 347px;*/
      //height: 397px;
      //margin: 3px auto;
      border-radius: 10px;
      -webkit-backdrop-filter: blur(18px);
      backdrop-filter: blur(18px);
      /*background-color: #24252d;*/
      padding: 0.3rem 0.2rem 0 0.2rem;
      font-size: 0.28rem;
      color: #8f8f8f;
      position: relative;
      //top: -3rem;
      /*margin: auto;*/

      .color {
        font-size: .28rem;
        color: white;
        margin-right: 5px;
      }


      //.line {
      //  margin-bottom: 0.4rem;
      //}

      > div {
        display: flex;
        flex-direction: row;
        min-height: 0.8rem;
        font-size: 0.28rem;
        align-items: center;

   /*     .fuzhi {
          display: block;
          width: 1rem;
          height: .52rem;
          text-align: center;
          line-height: .52rem;
          margin-left: .1rem;
          border-radius: .36rem;
          border: solid 1px #6a697f;
          !*background-image: linear-gradient(to bottom, #443f3a, #544a42 99%);*!
          //margin-left: 0.2rem;
          font-size: 0.26rem !important;
          background-color: rgba(144, 143, 177, 0.2);
          font-weight: 600;
          color: #6F6D8B !important;
        }*/

        > span {


          &:last-child {
            font-size: 0.28rem;
            /*color: white;*/
          }
        }

        .num-b {
          color: white;
        }
      }
    }
  }

  .body-back {
    width: 100%;
    height: 7.6rem;
    padding: 29px 27px 175px 28px;
    //background-image: url(../../assets/themes/hjb/black/bg.svg);
    //background-size: cover;
    background-position: 50%;
    background-repeat: no-repeat;
    position: absolute;
  }

  .bottomSel {
    display: flex;
    justify-content: space-around;
    margin-top: -2.78rem;

    .img-back {
      width: 2.2rem;
      height: .88rem;
      line-height: .88rem;
      text-align: center;
      border-radius: .44rem;
      background-image: linear-gradient(to bottom, #645592 1%, #322b4d);
      font-size: .32rem;
      font-weight: 500;
      color: #dadada;
      margin-top: .2rem;

      img {
        width: 100%;
      }
    }

    .end-back {
      position: absolute;
      right: -0.4rem;
      bottom: 10%;
      width: 2.42rem;
      height: 2.14rem;

      img {
        width: 100%;
      }
    }

    ::v-deep .van-button {
      width: 4rem;
      height: .88rem;
      text-align: center;
      line-height: .88rem;
      border-radius: .44rem;
      box-shadow: 0 .1rem .38rem 0 rgba(0, 0, 0, 0.5);
      background-image: linear-gradient(to bottom, #efcea6, #dab591);
      font-size: .32rem;
      font-weight: 600;
      color: #533510;
      margin-top: .2rem;
    }

    //中奖及未中奖时的大按钮
    .bigBtn {
      width: 5.74rem;
    }
  }


}
</style>
