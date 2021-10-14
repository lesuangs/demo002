<template>
  <div class="menus">
    <div class="content-top">
      <!-- 双玩法菜单 -->
      <div v-if="isGlobal">
        <!-- 一级菜单 -->
        <ul class="firstMenu clearfix">
          <li v-for="(item, i) in betList" :key="item.name">
            <div @click="firstMenu(i)"
                 :class="{ 'active': i === firstTab}">
              {{ item.name }}
            </div>
          </li>
        </ul>
        <!-- 二级菜单 -->
        <div class="sub-menu" v-if="!isSsc">
          <ul class="menu-box clearfix">
            <li v-for="(item, i) in betList[firstTab].children"
                :key="item.name">
              <div @click="selectMenu(i)"
                   :class="{ 'active': i === secondTab }">{{ item.name }}
              </div>
            </li>
          </ul>
        </div>
        <!-- 时时彩 -->
        <div v-else v-for="(item, i) in betList[firstTab].children"
             :key="item.name" class="sub-menu">
          <p class="title">{{ item.name }}</p>
          <!-- 三级菜单 -->
          <ul class="ssc-box">
            <li v-for="(fitem,fi) in betList[firstTab].children[i].children">
              <div :key="fi" :class="{ 'active': i === secondTab && fi === threeTab }"
                   @click="selectMenu(i,fi)">{{
                fitem.name }}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 六合彩单独处理 -->
      <ul class="lhc-menu" v-else>
        <li :key="i"
            v-for="(v, i) in betList">
          <div @click="$emit('seletClick', i)"
               :class="i === active ? 'active' : ''">
            {{ v.name }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: "BetMask",
    data() {
      return {
        firstTab: 0, // 一级菜单
        secondTab: 0, // 二级菜单
        threeTab: 0,
      };
    },
    props: {
      betList: Array,
      active: Number, // 一级菜单选中
      activeTwo: Number, // 二级菜单选中
      activeThere: Number, //三级菜单选中
      isGlobal: Boolean,
      isSsc: Boolean,
    },
    methods: {
      firstMenu(i) {
        this.firstTab = i;
        // 玩法类型只有一组直接选中
        if (this.betList[this.firstTab].children.length === 1) {
          if (this.isSsc) {
            if (this.betList[this.firstTab].children[0].children.length === 1) {
              this.secondTab = 0
              this.threeTab = 0
              this.$emit("seletClick", this.firstTab, this.secondTab, this.threeTab);
            }
          } else {
            this.secondTab = 0
            this.threeTab = 0
            this.$emit("seletClick", this.firstTab, this.secondTab, this.threeTab);
          }
        }
      },
      selectMenu(i, fi) {
        this.secondTab = i;
        this.threeTab = fi
        this.$emit("seletClick", this.firstTab, i, fi);
      },
    },
    mounted() {
      this.firstTab = this.active;
      this.secondTab = this.activeTwo;
      this.threeTab = this.activeThere
    },
  };
</script>
<style lang="scss" scoped>
  .skin-gray {
    .menus {
      .content-top {
        & > div {
          ul.firstMenu {
            background: #24252D;
            li {
              div {
                box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
                background-color: #16171b;
                color: #8f8f8f;
                &.active {
                  font-weight: bold;
                  color: #533510;
                  background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
                }
              }
            }
          }
          .sub-menu {
            background: #2D2E35;
            ul.menu-box,
            ul.ssc-box {
              li {
                div {
                  border: solid 1px #605c7b;
                  background-color: #38364a;
                  color: #8f8f8f;
                  &.active {
                    border: solid 1px #ffd57d;
                    color: #9f7954;
                  }
                }
              }
            }
          }
        }
        ul.lhc-menu {
          li{
            div{
              &.active {
                background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
              }
            }
          }
        }
      }
    }
  }

  .skin-black {
    .menus {
      .content-top {
        & > div {
          ul.firstMenu {
            background: #24252D;
            li {
              div {
                box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
                background-color: #16171b;
                color: #8f8f8f;
                &.active {
                  font-weight: bold;
                  color: #533510;
                  background-image: linear-gradient(to bottom, #efcea6, #dab591);
                }
              }
            }
          }
          .sub-menu {
            background: #2D2E35;
            ul.menu-box,
            ul.ssc-box {
              li {
                div {
                  border: solid 1px #444555;
                  background-color: #2d2e35;
                  color: #8f8f8f;
                  &.active {
                    border: solid 1px #efcea6;
                    color: #9f7954;
                  }
                }
              }
            }
          }
        }
        ul.lhc-menu {
          li{
            div{
              &.active {
                background-image: linear-gradient(to bottom, #efcea6, #dab591);
              }
            }
          }
        }
      }
    }
  }

  .menus {
    position: absolute;
    top: 0.88rem;
    z-index: 20;
    width: 100%;
    .content-top {
      overflow: auto;
      background: #fff;
      width: 100%;
      /*min-height: 5rem;*/
      .firstMenu {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        /*padding: 0.3rem 0.2rem;*/
        /*background-color: #f7f7f7;*/
        width: 100%;
        padding: 15px 2.5% 0;
        li {
          width: 33.3%;
          /*height: 0.52rem;*/
          /*margin: 0 5% 0.3rem 0;*/
          /*line-height: 0.52rem;*/
          text-align: center;
          font-size: 0.3rem;
          /*border-radius: 0.1rem;*/
          /*background-color: #fff;*/
          margin: 0 0 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          div {
            width: 98px;
            height: 38px;
            line-height: 38px;
            border-radius: 6px;
            /*box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);*/
            /*background-color: #16171b;*/
            /*color: #8f8f8f;*/
            &.active {
              /*font-weight: bold;*/
              /*color: #533510;*/
              /*background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);*/
            }
          }
        }
      }
      .sub-menu {
        /*background: #2d2e35;*/
        .title {
          padding: 15px 5% 0;
          font-size: 0.3rem;
          text-align: left;
        }
        ul.menu-box,
        ul.ssc-box {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          padding: 15px 2.5% 0;
          li {
            width: 50%;
            text-align: center;
            color: #666;
            font-size: 0.3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 0 15px;
            div {
              width: 157px;
              height: 38px;
              line-height: 36px;
              border-radius: 4px;
              /*border: solid 1px #605c7b;*/
              /*background-color: #38364a;*/
              /*color: #8f8f8f;*/
              &.active {
                /*border: solid 1px #ffd57d;*/
                /*color: #9f7954;*/
              }
            }
          }
        }
      }
      ul.lhc-menu {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 15px 2.5% 0;
        li {
          width: 33.3%;
          margin: 0 0 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          div {
            width: 98px;
            height: 38px;
            line-height: 36px;
            border-radius: 6px;
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
            background-color: #16171b;
            color: #8f8f8f;
            &.active {
              font-weight: bold;
              color: #533510;
              /*background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);*/
            }
          }
        }
      }
      // 一下已经废弃
      .m-select-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0.3rem 0.2rem 0 0.2rem;
        li {
          border: 1px solid #e5e5e5;
          border-radius: 0.1rem;
          margin-bottom: 0.3rem;
          padding: 0.15rem 0;
          width: 2.1rem;
          text-align: center;
          font-size: 0.3rem;
          &.active {
            border-color: #c00;
            color: #c00;
          }
        }
      }
      .klc-menu {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        li {
          width: 33.33%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          img {
            margin: 0.25rem auto 0.15rem;
            width: 1.6rem;
            height: 1.6rem;
          }
          span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
