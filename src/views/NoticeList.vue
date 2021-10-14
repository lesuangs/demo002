<template>
  <div class="notice-content notice-list-box">
    <Header :headObj="headObj" @leftClick="$router.go(-1)"/>
          <NotData v-if="list.length===0" :isNotData="isNotData"/>
    <div class="body" v-else>
      <div class="notice-wrap">
        <div class="notice-item"
             v-for="(item,index) in list" :key="index">
          <i class="icon iconfont">&#xe631;</i>
          <div class="notice-con">
            <h1>{{item.noticeTitle}}</h1>
            <div class="notice-info">
              {{item.noticeContent}}
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>



<script>
import Header from '../commons/header/Header'
import NotData from '../commons/notdata/NotData'

export default {
    name: 'NoticeList',
    components: {
      Header,
      NotData
    },
    data() {
      return {
        headObj: {
          title: 'lang.NoticeList.announcement',
          showArrow: true
        },
        list: [],
        delIdx: 0,
        isNotData: true,
        isDel: false
      }
    },
    methods: {
      queryData() {
        this.$http.home.noticeList().then((res) => {
          this.list = res.data
          // console.log(this.list);
          if (res.data.length === 0) {
            this.isNotData = true
          }
        })
      },
      openDel(item, i) {
        this.isDel = true
        this.delIdx = i
      }
    },
    created() {
        // this.$http.home.noticeList().then(res => {
        //     console.log(res)
        // })
      this.queryData()
    },
  }
</script>
<style lang="scss" scoped>
  .notice-list-box{

  }
  .skin-gray{
    .notice-list-box{
      .notice-wrap{
        border-left:1px #494761 solid;
      }
      .notice-con{
        background: $skin-gray-con-bg;
        h1{
          border-bottom:1px #615F76 dashed;
        }
      }
      .notice-info{
        color:$skin-gray-text-sub-color;
      }
    }
  }

  .skin-black{
    .notice-list-box{
      .notice-wrap{
        border-left:1px #1E2024 solid;
      }
      .notice-con{
        background: $skin-black-con-bg;
        h1{
          border-bottom:1px #34343C dashed;
        }
      }
      .notice-info{
        color:$skin-black-text-sub-color;
      }
    }
  }

  .notice-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    .notice-wrap{
      padding-left: 15px;
      .notice-item{
        margin-bottom: 0.2rem;
        position: relative;
        .icon{
          color:#e5c29c;
          position: absolute;
          top:0.3rem;
          left:-0.46rem;
        }
      }
      .notice-con{
        /*background:#24252d;*/
        font-size:0.28rem;
        h1{
          color:#fff;
          line-height: 25px;
          padding:0.2rem;
          /*border-bottom: 1px dashed #45444c;*/
        }
      }
      .notice-info{
        padding:0.2rem;
        border-radius:4px;
        color:#9a9aa7;
        line-height: 0.5rem;
      }
    }
    .body {
      flex: 1;
      overflow-y: scroll;
      /*background: #f5f5f9;*/
      padding: .2rem .2rem .2rem 0.3rem;
      .content {
        display: flex;
        flex-direction: column;
        background: #fff;

        .v-item {
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid #ddd;
          padding: 5px 10px;
          font-size: 0.3rem;

          .top {
            i {
              width: 12px;
              height: 12px;
              background: #f74c31;
              border-radius: 50%;
              margin-right: 5px;
            }
          }

          .bottom {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size: 0.28rem;
            align-items: center;
            margin-top: 5px;
            color: #aaa;
          }
        }
      }

      .m-no-data {
        padding-top: 1.2rem;
        text-align: center;

        img {
          width: 2.8rem;
        }
      }

      .text {
        margin-top: 0.8rem;
        font-size: 0.28rem;
      }
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

      .van-nav-bar {
        background: #dd413a;

        ::v-deep .van-nav-bar__title,
        ::v-deep .van-nav-bar__text,
        ::v-deep .van-icon {
          color: #fff !important;
        }
      }

      .del-content {
        flex: 1;
        background: #f5f5f5;

        .message-wrapper {
          padding: 10px;

          .title {
            line-height: 1.2;
            margin: 10px 0;
            font-size: 24px;
            font-weight: 600;
            color: #343434;
          }

          .addTime {
            margin: 10px 0;
            font-size: 14px;
            color: #999;
          }

          .detail {
            line-height: 2;
            text-indent: 2em;
          }

          .btn-list {
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-top: 20px;

            .van-button {
              width: 100%;
              height: 0.6rem;
              line-height: 0.6rem;
            }
          }
        }
      }
    }
  }

  .message {
    display: flex;
  }
  .listStyle {
    width:98%;
    position: relative;
    margin-left: .3rem;
    background-color: #fff;
    border-radius: .1rem;
    padding: .2rem .2rem 0 .2rem;
  }
  .listStyle:before {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    top: .15rem;
    right: 100%;
    border-top: .05rem solid transparent;
    border-left: .2rem solid transparent;
    border-bottom: .2rem solid transparent;
    border-right: .2rem solid #fff;
    font-size: 2rem;
  }
  .bodyColor {
    background-color: rgb(245, 245, 249);
  }
  .custom-class {
    font-size: 2rem;
  }

  .botBox {
    height: .3rem;
    border-top: .01rem solid rgb(237, 237, 237);
    background-color: #ffffff;
    margin: .2rem 0;
  }
</style>
