<template>
  <div class="play_rule play-rule-box">
    <HeaderSelect :showArrow="showArrow"
            :activeId="activeId"
            :isShowTitle="isShowTitle"
            :titleList="digitalList"
            @changeActiveId="changeId">
    </HeaderSelect>
    <div class="content">
      <div class="tab-header">
        <template v-for="(v, i) in tabList">
          <span @click="changeTab(i)"
                  :key="i"
                  :class="active === i ? 'active' : ''">
            {{ v.title }}
          </span
          >
        </template>
      </div>
      <div class="g-content" v-if="rules.length>0">
        <div class="rule" v-if="active === 1">
          <template v-for="(v, i) in rules">
            <van-collapse :key="i" accordion v-model="activeName">
              <div class="title">{{ v.name }}</div>
              <!-- <template v-for="(item, index) in v.rules"> -->
              <van-collapse-item
                      :title="v.name"
                      :name="i"
                      v-if="typeof v.value !== 'string'">
                <div v-for="(item, index) in v.rules"
                     class="play-detail"
                     :key="index">
                  <p class="play-title">
                    <span>{{ item.name }}:</span>
                  </p>
                  <p class="play-content">
                    <span v-html="item.desc"></span>
                  </p>
                  <p class="play-sample">
                    <span v-html="item.sample"></span>
                  </p>
                </div>
              </van-collapse-item>
              <!--              <van-collapse-item v-else :title="v.name" :name="i">-->
              <!--                <p class="r-detail">-->
              <!--                  <span class="d-content szc">-->
              <!--                    <span class="d-title">{{ v.name }}:</span>-->
              <!--                    <span class="d-describe">{{ v.value }}</span>-->
              <!--                  </span>-->
              <!--                </p>-->
              <!--              </van-collapse-item>-->
            </van-collapse>
          </template>
        </div>
        <div v-else class="kind">
          <div class="t-kind">
            <p class="title">
              <van-icon name="clock" size="22"/>
              {{$t('lang.HelpCenter.openingTime')}}
            </p>
            <div class="t-content">
              <template v-for="(v, i) in introduceData.date">
                <p class="t-n" :key="i">
                  <span>{{ v.name }}</span>
                  <span>{{ v.text }}</span>
                </p>
              </template>
            </div>
          </div>
          <div class="t-kind">
            <p class="title">
              <van-icon name="todo-list" size="22"/>
              {{$t('lang.HelpCenter.playIntroduce')}}
            </p>
            <div class="t-content">
              <template v-for="(v, i) in introduceData.info">
                <p class="t-n" :key="i">
                  <span>{{ v.name }}</span>
                  <template v-for="(item, idx) in v.cate">
                    <span :key="idx" class="t-ns">
                      <template v-for="(a, b) in item.cate">
                        <span class="t-n1" :key="b">
                          <i class="iconfont iconico_arrows_packup"></i>
                          {{ item.name }}{{ a.name }}
                        </span>
                      </template>
                    </span>
                  </template>
                </p>
              </template>
            </div>
          </div>
        </div>
      </div>
      <noData v-else :isNotData="isNotData"/>
    </div>
  </div>
</template>

<script>
  import HeaderSelect from "../commons/header/HeaderSelect";
  import noData from "../commons/notdata/NotData";
  export default {
    name: "playRule",
    components: {
      HeaderSelect,
      noData,
      // NotData: (resolve) => require(["../commons/notdata/NotData"], resolve),
    },
    data() {
      return {
        isNotData: true,
        showArrow: true,
        isShowTitle: false,
        activeId: 0,
        active: 0,
        activeName: -1,
        tabList: [
          {title: this.$t('lang.HelpCenter.introduceLottery')},
          {title: this.$t('lang.HelpCenter.rulesOfPlay')}
        ],
        // tabList: ["彩种介绍", "玩法规则"],
        // digitalList: [
        //   {id: "lhc", title: "六合彩"},
        //   {id: "dp", title: "低频彩"},
        //   {id: "ssc", title: "时时彩"},
        //   {id: "pk10", title: "pk10"},
        //   {id: "11x5", title: "11选5"},
        //   {id: "lk", title: "快乐彩"},
        //   {id: "k3", title: "快3"},
        //   {id: "pc", title: "pc蛋蛋"},
        //   // { id: 8, title: "pk牛牛" },
        // ],
        digitalList: [
          {id:0, type: "lhc", title: this.$t('lang.lotterySort.markSixLottery')},
          {id:1, type: "fc3d", title: this.$t('lang.lotterySort.fc3d')},
          {id:2, type: "ssc", title: this.$t('lang.lotterySort.ssLottery')},
          {id:3, type: "pk10", title: this.$t('lang.lotterySort.pK10')},
          {id:4, type: "11x5", title: this.$t('lang.lotterySort.Xuan5')},
          {id:5, type: "kl", title: this.$t('lang.lotterySort.happyLottery')},
          {id:6, type: "k3", title: this.$t('lang.lotterySort.kuai3')},
          {id:7, type: "pcdd", title: this.$t('lang.lotterySort.pcDanDan')},
          // { id: 8, title: "pk牛牛" },
        ],
        rules: [],
        info: [],
        date: [],
        getType:this.$route.query.type,
        introduceData:{},
        lotteryType:'',
      };
    },
    computed: {
      rule() {
        // console.log(this.rules, 'ccommmm');
        return this.rules
      }
    },
    created() {
      this.initDataFn();

    },
    methods: {
      changeTab(i){
        this.active = i;
        if(this.lotteryType){
          this.initPlayIntroduce(this.lotteryType);
        }else{
          this.initPlayIntroduce(this.getType);
        }
        // console.log(i,this.$route.query.type,this.getType,'changeTabchangeTabchangeTab')
        // console.log(this.getType,'getType')
        // if(this.getType){
        //   if(i === 0){ // 彩种介绍
        //     this.initPlayIntroduce(this.getType);
        //   }else{ // 玩法规则
        //     this.initPlayRules(this.getType);
        //   }
        // }else{ // 没有值默认：第一个
        //   if(i === 0){ // 彩种介绍
        //     this.initPlayIntroduce(this.digitalList[0].type);
        //   }else{ // 玩法规则
        //     this.initPlayRules(this.digitalList[0].type);
        //   }
        // }
        // this.initDataFn();
      },
      changeId(id){
        let digitalList = this.digitalList;
        for (let i = 0; i < digitalList.length; i++) {
          if(digitalList[i].id === id){
            this.activeId = i;
            this.lotteryType = digitalList[i].type;
            this.getType = digitalList[i].type
            this.initPlayRules(digitalList[i].type);
            this.initPlayIntroduce(digitalList[i].type);
            break;
          }
        }
      },
      handleActive(type) {
        // let newType = type;
        let newType = type;
        let digitalList = this.digitalList;
        for (let i = 0; i < digitalList.length; i++) {
          if (digitalList[i].type === type) {
            this.activeId = i;
            newType = this.digitalList[i].type;
            this.getType = newType;
            break;
          }
        }
        console.log(this.getType,'this.getTypethis.getType')
        this.initPlayRules(newType);
        this.initPlayIntroduce(newType);
      },
      initPlayRules(type){
        this.rules = [];
        this.$http.home.getPlayRules(type).then((res) => {
          // console.log(res, 'reeeee ');
          this.rules = res.data.categories;
          this.info = res.data.ruleDesc;
          this.date = res.data.date;
          console.log(this.rules, 'wwwwwfafa  ');
        }).catch(err => {
          this.rules = [];
          console.log(err);
        })
      },
      initPlayIntroduce(type){
        this.introduceData = '';
        this.isNotData = true;
        this.$http.home.getPlayIntroduce(type).then((res) => {
          let data = res.data;
          if(res.status === 200){
            this.isNotData = false;
            this.introduceData = data;
          }
          // console.log(this.introduceData,'introduceDataintroduceData')
        }).catch(err => {
          this.isNotData = false;
          console.log(err);
        })
      },
      initDataFn(){
        console.log(this.$route,'this.$routethis.$route');
        let type = this.$route.query.type
        if(type){
          this.handleActive(type)
        }else{
          this.handleActive(this.digitalList[0].type);
        }
      }
    },
  };
</script>

<style lang="scss" scoped>
  .play-rule-box{
    /*.g-content{*/
    /*  background: none;*/
    /*}*/
    /deep/ .van-collapse-item__content{
      color:#fff;
      padding:px2rem(16px);
    }
    /deep/.van-cell__title{
      color:#fff;
    }
    .play-title{
      font-size:px2rem(16px);
      margin:px2rem(10px) 0;

    }
    .play-content,.play-sample{
      font-size:px2rem(13px);
      line-height: px2rem(22px);
    }
  }
  .skin-gray{
    .play-rule-box{
      /deep/.van-collapse-item,
      /deep/ .van-collapse-item__content{
        background: $skin-gray-con-bg;
      }
      .title i{
        background: linear-gradient(to right,#FFEAC0,#FFD681);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
      }
    }
  }
  .skin-black{
    .play-rule-box{
      /deep/.van-collapse-item,
      /deep/ .van-collapse-item__content{
        background: $skin-black-con-bg;
      }
      .title i{
        background: linear-gradient(to right,#A530E6,#1F61B8);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
      }
    }
  }

  .play_rule {
    display: flex;
    flex-direction: column;
    height: 100%;
    .content {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: scroll;
      .g-content {
        flex: 1;
        overflow: scroll;
        .kind {
          display: flex;
          padding: 0.2rem;
          flex-direction: column;
          flex: 1;
          overflow: scroll;

          .t-kind {
            display: flex;
            flex-direction: column;
            color:#ccc;
            .title {
              display: flex;
              flex-direction: row;
              align-items: center;
              font-size: 0.3rem;

              .van-icon {
                margin-right: 0.1rem;
                font-size: 0.3rem;
              }
            }
          }

          .t-content {
            margin: 0.1rem 0 0 0.5rem;
            line-height: .35rem;

            .t-n {
              font-size: 0.26rem;
              margin-bottom: 0.4rem;
              display: flex;
              flex-direction: column;

              .t-n1 {
                display: flex;
              }

              span {
                margin-bottom: 0.1rem;
              }
            }
          }
        }
        .rule {
          flex: 1;
          overflow: scroll;
          /*background-color: #191b1f !important;*/
          /deep/ .van-collapse-item {
            /*background-color: #24252d !important;*/
            /*height: 1.04rem;*/
            /deep/ .van-cell {
              /*background-color: #24252d !important;*/
              font-size: .3rem;
              color: #fff;
            }

          }
          .title {
            text-indent: 0.3rem;
            padding: 0;
            line-height: 0.7rem;
            height: 0.7rem;
            color: #8f8f8f;
            font-size: 0.28rem;
          }
          .play-detail {
            position: relative;
            display: flex;
            flex-direction: column;
            /*.szc {*/
            /*display: flex;*/
            /*flex-direction: row;*/
            /*}*/
            /*.lotteryNew-title {*/
            /*  margin: 0.2rem;*/
            /*  overflow: scroll;*/
            /*  color: #fff;*/
            /*  font-size: 0.28rem;*/
            /*}*/
            /*.lotteryNew-content,.lotteryNew-sample {*/
            /*  !*padding: 0 0.28rem 0.28rem;*!*/
            /*  !*color: #666;*!*/
            /*  font-size: 0.28rem;*/
            /*  line-height: 25px;*/
            /*  !*font-weight: 400;*!*/
            /*  !*text-align: justify;*!*/
            /*}*/
          }
          /*/deep/ .van-collapse-item__content {*/
          /*  padding: 0.1rem;*/
          /*  !*background: #000;*!*/
          /*  //background-color: #191b1f !important;*/
          /*}*/
        }
      }
    }
    .sports {
      width: 100%;
      background-color: #f5f5f9;
      height: 13rem;
      padding-bottom: 0.6rem;
      overflow: scroll;

      ::v-deep .van-tabs__wrap {
        height: 0.8rem;

        .van-tabs__nav--card {
          border: none;
          width: 100%;
          margin: 0;
          padding: 0 0.2rem;
          height: 0.8rem;

          .van-tab {
            border-right: none;
            color: #333;
            line-height: 0.8rem;
          }

          .van-tab--active {
            color: #fff;
          }
        }
      }

      .sports_rule {
        margin-top: 0.2rem;
      }

      .title {
        text-indent: 0.2rem;
        padding: 0;
        line-height: 0.7rem;
        height: 0.7rem;
        font-size: 0.3rem;
      }
    }
  }
</style>
