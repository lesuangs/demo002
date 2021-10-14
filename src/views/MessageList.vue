<template>
  <div class="message-wrapper message-list-box">
    <Header :headObj="headObj" @leftClick="$router.go(-1)"/>
    <div class="main-content">
      <div class="content-wrapper" v-if="listData.length > 0">
        <vue-better-scroll class="wrapper"
                           ref="newScroll"
                           :scrollbar="scrollbarObj"
                           :pullDownRefresh="pullDownRefreshObj"
                           :pullUpLoad="pullUpLoadObj"
                           :startY="parseInt(startY)"
                           @pulling-down="onPullingDown"
                           @pulling-up="onPullingUp">
       <!--   <ul class="list-wrapper">
            <li v-for="(item, index) in listData" :key="index">
              <div v-if="!removeIdList.includes(item.id)"
                   :key="index"
                   class="item"
                   @click.stop="_readMessage(item, index)">
                <div class="top">
                  <i v-if="item.readStatus === 0"></i>
                  <span>{{ item.messageTitle }}</span>
                </div>
                <div class="bottom">{{ item.addTime }}</div>
              </div>

            </li>
          </ul>-->
          <div class="message-list-wrap">
              <div class="mod-list-item" v-for="(item, index) in listData" :key="index"
                   @click.stop="_readMessage(item, index)">
                <template v-if="!removeIdList.includes(item.id)">
                  <div class="top">
                    <h1>
                      <i v-if="item.readStatus === 0" class="iconfont iconyuandianxiao"></i>
                      {{ item.messageTitle }}</h1>
                  </div>
                  <div class="bottom">
                    <span>{{ item.addTime }}</span>
                  </div>
                </template>
              </div>

          </div>

        </vue-better-scroll>
      </div>
      <NotData v-else :isNotData="isNotData"/>
    </div>
    <transition name="van-slide-up">
      <div v-if="isReadMessage" class="detail-content">
        <!-- <van-nav-bar left-text="返回" left-arrow
                      @click-left="isReadMessage = false">
           <van-icon size="18"/>
         </van-nav-bar>-->
        <Header :headObj="sheetHeader" @leftClick="isReadMessage=false,init()"/>
        <div class="detail-wrapper">
          <div class="message-detail">
            <h1 class="title">{{ listData[currentIndex].messageTitle }}</h1>
            <p class="addTime">{{ listData[currentIndex].addTime }}</p>
            <p class="detail">
              {{ listData[currentIndex].messageContent }}
            </p>
            <div class="step-button-box">
              <button class="btn-type1" @click="isReadMessage = false">{{$t('lang.common.btn[0]')}}</button>
              <button class="btn-type2" @click="_deleteMessage">{{$t('lang.common.btn[1]')}}</button>
            </div>
            <!--<div class="btn-list">
              <span @click="isReadMessage = false" class="normal">关闭</span>
              <span @click="_deleteMessage" class="active">删除</span>
            </div>-->
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Header from '../commons/header/Header'
  import NotData from '../commons/notdata/NotData'
  import VueBetterScroll from '../commons/scroll/BScroll'
  import {mapActions, mapState, mapMutations} from 'vuex'
  import axios from "../http";
  import {API} from "../api/api_list";
  import qs from 'querystring'
  export default {
    name: 'MessageList',
    components: {
      Header,
      VueBetterScroll,
      NotData
    },
    data() {
      return {
        headObj: {
          title: 'lang.header.StationLetter',
          showArrow: true
        },
        sheetHeader:{
          title: "lang.header.StationLetter",
          showArrow: true,
        },
        // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
        scrollbarObj: {
          fade: true
        },
        // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
        pullDownRefreshObj: {
          threshold: 90,
          stop: 40
        },
        // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
        pullUpLoadObj: {
          threshold: 0,
          txt: {
            more: this.$t('lang.BScroll.jiaZaiGengDuo'),
            noMore: this.$t('lang.BScroll.meiYouGengDuo')
          }
        },
        startY: 0, // 纵轴方向初始化位置
        page: 1,
        rows: 10,
        // ------------------------
        isReadMessage: false,
        currentIndex: 0,
        removeIdList: [],
        isNotData: true,
        listData:[],
      }
    },
    created() {
      // this.queryData(this.page, 1)
    },
    methods: {
      ...mapMutations({
        setData:'SET_DATA'
      }),
      ...mapActions([
        // 'getAllMessage',
        'readMessage',
        'deleteMessage',
        'getUserInfo'
      ]),
      // 下拉刷新
      onPullingDown() {
        // this.$nextTick(()=>{
        //   this.page = 1;
        //   this.init();
        // })
        setTimeout(() => {
          this.$refs.newScroll.forceUpdate(true)
          this.page = 1;
          this.init()
        }, 500)
      },
      // 上拉 加载更多数据
      onPullingUp() {
        setTimeout(() => {
          this.$refs.newScroll.forceUpdate(true)
          this.page = this.page + 1
          this.init(2)
        }, 500)
        /* this.$nextTick(()=>{
           // let page = this.page + 1
           this.page = this.page + 1
           this.init();
         })*/
      },
      init(type){
        this.isNotData = true;
        this.setData({key: 'messageList', value: []});
        let params = {
          page: this.page,
          rows: this.rows
        };
        axios.get(API.GET_MESSAGE,{params:params}).then((res) => {
          let _data = res.data;
          if(res.code === 200){
            this.isNotData = false;
            this.listData = type === 2 ? this.listData.concat(_data.data.records) : _data.data.records;
            if (this.listData.length === _data.totalCount) {
              this.$refs.newScroll.forceUpdate(false)
            }
            // console.log(this.listData,888887);
          }
        }).catch((err) => {
          this.isNotData = false;

        })
        // this.getAllMessage(params).then((_data)=>{
        //   if (_data.data.length === 0) {
        //     this.isNotData = false
        //   } else {
        //    /* let isForceUpdate = this.messageList.length === _data.totalCount
        //     setTimeout(() => {
        //       this.$refs.newScroll.forceUpdate(!isForceUpdate)
        //     }, 100)*/
        //     if (this.messageList.length === _data.totalCount) {
        //       this.$refs.newScroll.forceUpdate(false)
        //     }
        //   }
        // });
      },
      _readMessage(item, i) {
        this.isReadMessage = true; // 打开详情页
        this.currentIndex = i; // 获取当前index
        // this.$http.home.readStatus(params).then((res) => {
        //   // this.list[i].readStatus = 1
        // })
        if (item.readStatus === 0) { // 没有读取的状态
          let params = {
            id: item.id
          };
          this.readMessage(params).then((_data) => {
            if (_data !== '') {
              let list = this.messageList;
              list[i].readStatus = 1;
              this.$nextTick(()=>{
                this.setData({key:'messageList',value:list})
              })
            }
          });
        }
      },
      _deleteMessage() {
        let currentId = this.listData[this.currentIndex].id
        let params = {
          id: currentId
        }
        this.deleteMessage(params).then((res) => {
          this.removeIdList.push(currentId);
          this.isReadMessage = false;
        })
      },

      /*  queryData(page, type) {
          const params = {
            page,
            rows: this.rows
          }
          this.$http.home.queryPage(params).then((res) => {
            this.list =
              type === 2 ? this.list.concat(res.data.data) : res.data.data
            this.totalCount = res.data.totalCount
            if (res.data.data.length === 0) {
              this.isNotData = false
            }
            let isForceUpdate = this.list.length === this.totalCount
            setTimeout(() => {
              this.$refs.Mscroll.forceUpdate(!isForceUpdate)
            }, 100)
          })
        },*/

    },
    computed: {
      ...mapState([
        'messageList'
      ]),
      // allList() {
      //   let list = JSON.parse(JSON.stringify(this.messageList));
      //   console.log(list,'kkkllll');
      //   return list
      // }
    },
    mounted() {
      this.init(1);
    }
  }
</script>

<style lang="scss" scoped>
  .skin-gray{
    .message-wrapper {
      .detail-content {
        .van-nav-bar {
          background: linear-gradient(91deg, #54517b 0%, #747199 100%, #747199 100%);
          .van-nav-bar__title,
          .van-nav-bar__text,
          .van-icon {
            color: #fff;
          }
        }
        .detail-wrapper {
          background-image: linear-gradient(to bottom, #494664, #303244);
          .message-detail {
            color: #fff;
            .title {
              color: #fff;
            }
            .addTime {
              color: #9a9aa7;
              border-bottom: 1px solid #717180;
            }
            .detail{
              color: #fff;
            }
            .btn-list {
              span {
                &.normal{
                  background-image: linear-gradient(to bottom, #8c90bc 2%, #545a96);
                  color: #fff;
                }
                &.active{
                  box-shadow: 0 5px 19px 0 rgba(0, 0, 0, 0.5);
                  background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
                  color: #533510;
                }
              }
            }
          }
        }
      }
    }
  }
  .skin-black{
    .message-wrapper {
      .detail-content {
        .van-nav-bar {
          background-image: linear-gradient(151deg, #65317d -12%, #293384 126%);
          color: #fff;
          .van-nav-bar__left,
          .van-nav-bar__title,
          .van-nav-bar__text,
          .van-icon {
            color: #fff !important;
          }
        }
        .detail-wrapper {
          background: #191b1f;
          .message-detail {
            color: #fff;
            .title {
              color: #fff;
            }
            .addTime {
              color: #8f8f8f;
            }
            .detail{
              color: #9a9aa7;
            }
            .btn-list {
              span {
                &.normal{
                  background-image: linear-gradient(to bottom, #645592 1%, #322b4d);
                  color: #dadada;
                }
                &.active{
                  box-shadow: 0 5px 19px 0 rgba(0, 0, 0, 0.5);
                  background-image: linear-gradient(to bottom, #efcea6, #dab591);
                  color: #533510;
                }
              }
            }
          }
        }
      }
    }
  }
  .message-list-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    .main-content{
      flex: 1;
      position: relative;
      height: calc(100% - 1rem);
      overflow: hidden;
      .content-wrapper {
        display: flex;
        height: 100%;
        flex-direction: column;
      }
    }
    .detail-content {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      .van-nav-bar {
        background: linear-gradient(91deg, #54517b 0%, #747199 100%, #747199 100%);
        .van-nav-bar__title,
        .van-nav-bar__text,
        .van-icon {
          color: #fff;
        }
      }
      .detail-wrapper {
        flex: 1;
        background-image: linear-gradient(to bottom, #494664, #303244);
        .message-detail {
          color: #fff;
          padding: 15px;
          .title {
            line-height: 1.2;
            margin: 5px 0 10px;
            font-size: 18px;
            color: #fff;
          }
          .addTime {
            margin: 10px 0;
            padding: 0 0 10px;
            font-size: 12px;
            color: #999;
            border-bottom: 1px solid #393940;
          }
          .detail {
            line-height: 2;
            /*text-indent: 2em;*/
          }
          .btn-list {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            margin-top: 20px;
            span {
              width: 3rem;
              height: .8rem;
              text-align: center;
              border-radius: 1rem;
              font-size: 16px;
              line-height: .8rem;
              &.normal{
                background-image: linear-gradient(to bottom, #645592 1%, #322b4d);
                color: #dadada;
              }
              &.active{
                box-shadow: 0 5px 19px 0 rgba(0, 0, 0, 0.5);
                background-image: linear-gradient(to bottom, #efcea6, #dab591);
                color: #533510;
              }

            }
          }
        }
      }
    }
  }
</style>
