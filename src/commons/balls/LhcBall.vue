<template>
  <ul class="lhc-wrapper">
    <li v-for="(v, i) in listData" :key="i"
        class="ball-item">
      <div v-if="v.num !== ''" class="ball-wrapper">
        <span :class="['ball',color(v.num)] ">{{ v.num }}</span>
        <div class="name" v-if="$i18n.locale === LANG.china">{{ v.name }}</div>
      </div>
      <div v-else :key="i" class="ball-wrapper">
        <i class="iconfont iconjiahao"></i>
      </div>
    </li>

  </ul>
</template>
<script>
  import {lhcColor} from '../../utils/color.js'
  import {animal} from '../../utils/common'
  import {LANG} from "../../utils/mode";

  export default {
    name: 'LhcBall',
    data() {
      return {
        LANG: LANG
      }
    },
    props: {
      openNum: {
        type: String,
        default: ""
      },
      isBig: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      listData() {
        if (this.openNum) {
          let arr = this.openNum.replace('+', ',')
          const [openNum, drawList] = [arr.split(','), []]
          openNum.forEach((v, i) => {
            v = v.length < 2 ? "0" + v : v
            let name = animal(v, 'text', this);
            drawList.push({
              num: v,
              name: name
            })
          })
          drawList.splice(6, 0, {num: '', name: ''})
          return drawList
        }
        return [];
      }
    },
    methods: {
      color(num) {
        return lhcColor(num)
      }
    }
  }
</script>
<style lang="scss" scpend>
  ul.lhc-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    /*padding: 0.1rem 0 0;*/
    li.ball-item {
      padding: 0 .05rem;
      div.ball-wrapper {
        display: flex;
        flex-direction: column;
        .ball {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          line-height: 0.5rem;
          font-size: 0.24rem;
          margin-bottom: 0.04rem;
          text-align: center;
          color: #fff;
          .name {
            color: #999;
          }
        }
        .ball-blue {
          background: #0e86e3;
        }
        .ball-red {
          background: #f11717;
        }
        .ball-green {
          background: #38be4f;
        }
        .name {
          font-size: 0.22rem;
          text-align: center;
        }
        .iconfont {
          // margin-top: -0.3rem;
          font-size: 0.2rem;
        }
      }

    }
  }
</style>
