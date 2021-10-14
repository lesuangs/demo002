<template>
  <div class="content promotions-box">
    <Header :headObj="headObj" @leftClick="$router.go(-1)"/>
    <div class="body">
      <div class="y-list" v-if="list.length > 0">
        <template v-for="(v, i) in list">
          <div class="y-item" :key="i" @click="openDel(v, i)">
<!--            <img :src="v.imgUrl"/>-->
            <img :src="imgAddress + v.imgUrl" alt="">
            <div class="y-wrap">
              <div class="y-con">
                <!--                <van-icon name="arrow" />-->
                <i class="iconfont iconic-right"></i>
                <h5>{{ v.title }}</h5>
              </div>
              <span class="time">{{$t('lang.Promotions.ActivityTime')}}：<em>{{ v.time }}</em></span>
              <!--              <span>{{$t('lang.Promotions.seeDetails')}} >></span>-->
            </div>
          </div>
        </template>
      </div>
      <NotData v-else :isNotData="isNotData"/>
    </div>
    <transition name="van-slide-up">
      <div v-if="isDel" class="del-body">
        <van-nav-bar :title="$t('lang.Promotions.seeDetails')"
                     left-arrow
                     class="header-box"
                     @click-left="isDel = false">
          <van-icon size="18"/>
        </van-nav-bar>
        <div class="del-content">
          <img :src="imgAddress + titlePic" alt="">
          <div class="del-wrap">
            <p class="title">{{ y_title }}</p>
            <p class="date"><em>{{$t('lang.Promotions.ActivityTime')}}：</em> {{ y_date }}</p>
            <div v-html="content" class="y_con">
              {{ content }}
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import Header from '../commons/header/Header'
  import NotData from '../commons/notdata/NotData'
  import {mapActions, mapState} from 'vuex'

  export default {
    name: 'Promotions',
    components: {
      Header,
      NotData
    },
    computed: {
      ...mapState([
        'allActivityList',
        'imgAddress',
      ]),
      list(){
        return this.allActivityList
      }
    },
    data() {
      return {
        headObj: {
          title: 'lang.header.Promotions',
          showArrow: true
        },
        isDel: false,
        y_title: '',
        y_date: '',
        titlePic: '',
        idx: 0,
        isNotData: true
      }
    },
    methods: {
      ...mapActions([
        'getAllActivity'
      ]),
      initData(){
        this.getAllActivity({}).then((data) => {
          let count = this.$route.query.count;
          if (data.length > 0 && count) {
            for (let i = 0; i < data.length; i++) {
              let item = data[i];
              console.log(item,count,'ttttttt');
              if (item.id === Number(count)) {
                this.openDel(item);
                return
              }
            }
          }else {
            this.isNotData = false
          }
        });
      },
      openDel(item, i) {
        console.log(item);
        this.isDel = true
        this.idx = i
        this.y_title = item.title
        this.y_date = item.time
        this.titlePic = item.imgUrl
        this.content = item.value
      }
    },
    created() {
      this.initData();
    }
  }
</script>
<style lang="scss" scoped>
  .promotions-box {
    .y-list {
      .y-con {
        color: #fff;
        .iconfont{
          font-size:12px;
          color:#737476;
          margin-right: 10px;
        }
      }
      .time {
        margin:0.2rem 0 0 21px;
        em {
          color: #efcea6;
        }
      }
    }
  }

  .skin-gray {
    .promotions-box {
      .y-list {
        .y-con {
          color: #fff;
        }
        .time {
          color: $skin-gray-text-color;
        }
      }
      .y-list .y-item, .del-content {
        background: $skin-gray-con-bg;
      }

      .del-content {
        .date em {
          color: $skin-gray-text-color;
        }
      }
    }
  }

  .skin-black {
    .promotions-box {
      .y-list {
        .y-con {
          color: #fff;
        }
        .time {
          color: $skin-black-text-color;
        }
      }
      .y-list .y-item, .del-content {
        background: $skin-black-con-bg;
      }

      .del-content {
        .date em {
          color: $skin-black-text-color;
        }
      }
    }
  }

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    .body {
      flex: 1;
      overflow: scroll;
      /*background: #f5f5f9;*/
      .m-no-data {
        padding-top: 1.2rem;
        text-align: center;
        img {
          width: 2.8rem;
        }
      }
      .y-list {
        display: flex;
        flex-direction: column;
        /*background: #fff;*/
        height: 100%;
        overflow-y: scroll;
        /*padding: 15px 10px;*/
        .y-item {
          /*border-radius: 0.1rem;*/
          /*border: 0.01rem solid #ddd;*/
          margin-bottom: 0.2rem;
          padding: 0.2rem 0.3rem;
          h5 {
            display: inline-block;
            font-size: 0.3rem;
            /*margin-bottom: 0.3rem;*/
            color: #fff;

          }
          .y-wrap {
            display: flex;
            justify-content: space-between;
            margin-top: 0.3rem;
            flex-direction: column;
            .y-con {
              display: flex;
              .icon {
                color: #7A7A7C;
                font-size: 0.28rem;
              }
            }
          }
        }
      }
    }
    .del-wrap {
      padding: 0.4rem;
    }
    .del-body {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      .title {
        font-size: 0.36rem;
        margin: 0.3rem 0;
        /*line-height: 1rem;*/
        /*text-indent: 0.2rem;*/
        /*border-bottom: 0.01rem solid #e2e2e2;*/
      }
      .date {
        /*padding: 0.2rem 0 0 0.2rem;*/
        margin: 0.18rem 0 0.2rem;
        color: #666;
        font-size: 0.28rem;
        /*em{*/
        /*  color:#606070;*/
        /*}*/
      }
      .van-nav-bar {
        /*background: #dd413a;*/
        ::v-deep .van-nav-bar__title,
        ::v-deep .van-nav-bar__text,
        ::v-deep .van-icon {
          color: #fff !important;
        }
      }
      .del-content {
        flex: 1;
        /*background: #fff;*/
        overflow-y: scroll;
        padding: 0 0 0.5rem 0;
        .y_con {
          margin-top: 0.5rem;
          word-wrap: break-word;
          /*padding: 0.1rem;*/
          p {
            margin-bottom: .4rem;
          }
        }
        img {
          /*margin-bottom: 0.6rem;*/
          /*padding: 0 0.1rem 0.3rem 0.1rem;*/
        }
      }
    }
  }
</style>
