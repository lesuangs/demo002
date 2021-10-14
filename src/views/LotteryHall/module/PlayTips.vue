<template>
  <van-dialog
          v-model="isShowTips"
          :close-on-click-overlay="isShowTips"
          :showConfirmButton="false"
          :showCancelButton="false"
          :overlayStyle="{'background-color': 'rgba(0,0,0,.3)'}">
    <div class="main-content">
      <div class="dialog-header">
        <p class="title">玩法规则</p>
      </div>
      <ul class="dialog-content">
        <li class="info-content">
          <p class="title">
            <i class="spot"></i><span>玩法提示</span>
          </p>
          <div class="detail">{{datalist.example||'暂无说明'}}</div>
        </li>
        <li class="info-content">
          <p class="title">
            <i class="spot"></i><span>中奖说明</span>
          </p>
          <div class="detail">{{datalist.expl||'暂无说明'}}</div>
        </li>
        <li class="info-content">
          <p class="title">
            <i class="spot"></i><span>范例</span></p>
          <div class="detail">{{datalist.prompt||'暂无说明'}}</div>
        </li>
      </ul>
    </div>
  </van-dialog>
</template>
<script>
  export default {
    data() {
      return {
        datalist: {}
      };
    },
    props: {
      showDialog: Boolean,
      lotteryName: String,
      firstSelected: Number,
      secondSelected: {
        type: Number,
        default: 0,
      },
      isSecond: {
        type: Boolean,
        default: false,
      },
      firstMenu: Object,
    },
    created() {

      const Tips = JSON.parse(sessionStorage.getItem(`${this.lotteryName}Tips`)) || "";
      console.log(Tips, 'tttttttttt');
      if (Object.keys(Tips).length > 0) {
        console.log(1);
        if (this.isSecond) {
          console.log(2);
          let keys = this.firstMenu.children[this.secondSelected].name;
          this.datalist = Tips[keys] || {};
        } else {
          let keys = this.firstMenu["name"];
          console.log(Tips[keys], keys, this.firstMenu, 3);
          this.datalist = Tips[keys] || {};
        }
      } else {
        console.log('4444');
        this.queryData();
      }
    },
    computed: {
      isShowTips: {
        get() {
          return this.showDialog;
        },
        set(val) {
          return this.$emit("closeDialog", val);
        },
      },
    },
    methods: {
      queryData() {
        const _t = (Date.parse(new Date()) / 1000).toString();
        this.$http.home.getTips(_t, this.lotteryName).then((res) => {
          console.log(res, 'tips');
          sessionStorage.setItem(`${this.lotteryName}Tips`, JSON.stringify(res.data));
          let Tips = res.data;
          if (this.isSecond) {
            let keys = this.firstMenu.children[this.secondSelected].name;
            this.datalist = Tips[keys] || {};
          } else {
            let keys = this.firstMenu["name"];
            this.datalist = Tips[keys] || {};
          }
        });
      },
    },
  };
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

  .downs {
    min-width: 1.76rem;
    height: 0.64rem;
    padding: 0 0.2rem;
    color: #533510;
    line-height: .64rem;
    font-size: 0.32rem;
    font-weight: 500;
    text-align: center;
    // letter-spacing: 0.77px;
    border-radius: 0.36rem;
    background-image: linear-gradient(to bottom, #efcea6, #dab591);
  }
</style>
