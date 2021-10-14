<template>
  <div class="g-content">
    <div v-if="lotteryList.length === 0 || newTab.length === 0">
      <NotData :isNotData="isNotDataTwo" />
    </div>
    <div v-else class="m-digital">
        <!-- 导航 -->
        <div class="category">
          <ul class="list">
            <li v-for="(res, key) in newTab" :key="key" @click="tabKey = key" class="item"
                :class="{
              'active': key === tabKey}" >
              {{res.name}}
            </li>
          </ul>
        </div>
        <!-- 彩种列表 -->
        <div class="detail">
          <!-- 全部 -->
          <div v-if="tabKey === 0">
            <div v-for="(res, key) in newTab" :key="key">
              <div v-if="key > 0" class="box">
                <p class="title">{{res.name}}</p>
                <div v-for="(item, id) in res.children" :key="id" class="icon" @click="playGame(item)">
                  <img :src="'/data/lotteryPicture/' + item.code + '.png?' + imgFix" alt=""/>
                  <p class="name">{{item.name}}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 其它 -->
          <div v-else>
            <div class="box">
              <p class="title">{{newTab[tabKey].name}}</p>
              <div v-for="(item, id) in newTab[tabKey].children" :key="id" class="icon" @click="playGame(item)">
                <img :src="'/data/lotteryPicture/' + item.code + '.png?' + imgFix" alt=""/>
                <p class="name">{{item.name}}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import NotData from "@/commons/notdata/NotData";
// 0：六合彩；1：低频彩；2：时时彩；3：PK拾；4：11选5；5：快乐彩；6：快三；7：PC蛋蛋；
  export default {
    name: "LotteryList",
    components: {
      NotData,
    },
    props: {
      ListType: Number,
    },
    computed:{

    },

    data() {
      return {

        newTab: [], // 导航
        lotteryList: [], // 全部彩种数据
        tabKey: 0, // 导航选择
        imgFix: localStorage.getItem("imgSuffix"),
        listData: [],
        delList: {},
        collect: false,
        collectArray: [[], [], [], [], [], [], [], [], []], // 收藏
        collectMap: [],
        idForWatch: "",
        keyForWatch: "",
        objForWatch: {},
        isTrue: true,
        isNotData: true,
        isNotDataTwo: true,
        count: 0,
        isChecked: true,
      };
    },
    watch: {
      tabActive: {
        handler() {
          console.log(this.tabActive);
          if (this.collectArray[this.tabActive].length === 0) {
            this.isNotData = false;
          }
        },
      },
    },
    methods: {
      changeCollect(value, item) {
        this.idForWatch = item.id;
        let classContent = value.currentTarget.getElementsByClassName(
                "iconfont"
        )[0].className;
        console.log(classContent);
        value.currentTarget.getElementsByClassName("iconfont")[0].className =
                classContent === "iconfont iconshoucang"
                        ? "iconfont iconyishoucang"
                        : "iconfont iconshoucang";
        let checked =
                value.currentTarget.getElementsByClassName("iconfont")[0].className ===
                "iconfont iconshoucang"
                        ? false
                        : true;
        console.log(checked);
        console.log("点击事件-----");
        let i = item.cate + 1;
        if (this.collectMap["i" + item.id]) {
          let key = this.collectMap["i" + item.id].check_key;
          console.log(key);
          //存在就更改
          if (checked) {
            this.collectMap["i" + item.id].check = checked;
            this.collectArray[i][key].check = checked;
          } else {
            this.collectArray[i].splice(key, 1);
            this.count--;
            this.isChecked = false;
          }
          this.keyForWatch = key;
        } else {
          console.log(3333);
          let index = this.collectArray[i].push(item);
          this.keyForWatch = --index;
          this.$set(item, "check", checked);
          this.$set(item, "check_key", this.keyForWatch);
        }
        this.objForWatch = item;
        localStorage.setItem("collectArray", JSON.stringify(this.collectArray));
        this.getCollectMap(JSON.parse(localStorage.getItem("collectArray")));
      },
      // 倒计时
      countTime(leftTime, id) {
        // 定义变量 h,m,s保存倒计时的时间
        let timeData = {
          h: "00",
          m: "00",
          s: "00",
        };
        if (leftTime >= 0) {
          const h = Math.floor(leftTime / 60 / 60); // % 24
          const m = Math.floor((leftTime / 60) % 60);
          const s = Math.floor(leftTime % 60);
          timeData = {
            h: h < 10 ? "0" + h : h,
            m: m < 10 ? "0" + m : m,
            s: s < 10 ? "0" + s : s,
          };
        }
        return timeData;
      },
      // 获取开奖数据
      queryDataCp(_t) {
        this.$http.home.getCp(_t).then((res) => {
          const l = res.data;
          for (const key in l) {
            if (key !== "serverTime") {
              l[key].timeLength = parseInt(l[key].cur.closeTime / 1000 - res.data.serverTime / 1000);
            }
          }
          this.delList = l;
        });
      },
      // 游戏跳转
      playGame(item) {
        console.log(item);
        let lotteryId = item.id;
        this.$router.push({
          path: item.type,
          query: { lotteryId: lotteryId, itemCate: item.cate, type: item.type,code:item.code },
        });
      },
    },
    mounted() {
      // 版本肤色

      const _t = (Date.parse(new Date()) / 1000).toString();
      this.queryDataCp(_t);
      // 定时获取开奖数据
      const timer1 = setInterval(() => {
        const _t = (Date.parse(new Date()) / 1000).toString();
        this.$http.home.getCp(_t).then((res) => {
          const l = res.data;
          for (const key in l) {
            if (key !== "serverTime") {
              l[key].timeLength = parseInt(l[key].cur.closeTime / 1000 - res.data.serverTime / 1000);
            }
          }
          this.delList = l;
        });
      }, 6000);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer1);
      });
      // 收藏
      let collectStr = localStorage.getItem("collectArray");
      if (collectStr !== null) {
        this.collectArray = JSON.parse(collectStr);
        this.getCollectMap(this.collectArray);
      }
    },
    created() {
      this.getDataList()
    }
  };
</script>
