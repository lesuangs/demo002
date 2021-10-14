<template>
  <div class="k-three-wrapper">
    <ul class="dice-list" :class="{'bgl': colors}" v-if="listData.length>0">
      <li v-for="(v,i) in listData">
        <img class="dice-img" :key="i" :src="imgSrc[parseInt(v)-1]" alt="">
      </li>
    </ul>
    <div class="result">
      <span>{{$t('lang.lottery.K3_total')}}:</span><span class="sum">{{totalNum}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: "K3Ball",
    data() {
      return {
        imgSrc: [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAw1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBQUAAAAAAAD5+fkAAAAAAAAJCQn9/f3o6OgAAAAAAAAAAAD7+/vx8fHz8/Xw8PD4+Pna2tuDg4Ozs7QTExPj4+NBQUF6enrp6uvh4eH5+fmamprg4OD////39/n29vfsCQn8/P37+/z5+fr19fX4+PnpCQm1Bgb+9vbwOzvZCAjZW1vtFRW+FRXiCAj20ND/+vr3lZXuhITgLCzQISG5Dw/HBgb95eWApiOWAAAAJnRSTlMDCxsATTNkER9AKTDWX1Y3+d1KRi312vnx7taTcGdgJRTr4N+Oc4VlfuUAAAIKSURBVEjH3dfZcpswGAXghDjF4H3N3r36ZUkI4zV7+v5P1QMaeemkIHHRmfbYV/Z8c355MBInZyYnzrHAslPHFNRCsI/tPiuJYALv/rcfIagxhfvcxndKE+ck3nXEi2jZ/hRCGgg3AaOEJ4n8U6U0MlFXRgJizjYcRxQriU4QyGkzl4BYH2MqgbN1paUkbiHBTCHHmIJVROSNXA3iAJVwYZ/lg8JVSo7oSQ+VBWSMuOmrlHmliGIDA8D9+qrXyUbjwEKumWM01jRs7SFzDhob5xYK6Q7lIfQK1YVC1IPI/wKz1WY+36wyX3j/On9bbrfLl3s/mL3Ol2k6m6Xpc+YFV3AzBPTJC27e4EwWXtAWIms/uJ3VgxvAWqOu9qM+esHsxcLFg+cF8Jwa99P7kntarNeLx4d/4N9REvG3G0VdqA+hzw2ZDiG5QzqGytWpY8hJug7K+VEjkdvGSkRa7GCfaU5uWzlxUpMdnGJyRDj0IXKw21hv89GJKo8rUJxI3NitPIyngoqoit/TFHbt4SFs9q4kmciSMbFArPDyrmGOK5BBHA0Ux+eQWrzLNJmor3coLCY9yytb0ffrLxdUYC3Fb0rqok1fXF7fdLpRqziS4WVko9vpfKhIp9NtGJdDI+NeNBo2KjIcRb3YOEAjg2Y8bp1XpDWOm4FxgEaehmHgkNAeresf5ms/PvwCgwtgLzzbt9QAAAAASUVORK5CYII=",
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAA51BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMCAgIAAAAAAAAGBgb9/f35+fkAAADv7+/h4eHx8fH5+fn09Pb4+Pj4+Pju7u53d3hSUlLl5eXp6erY2dmRkZPa2tqtrbClpaXl5eXX19cgICD////8/P33+PgzMzP29vb4+Pn5+vovLy/7+/soKCgGBgYWFhYNDQ04ODjl5eXNzc1EREQlJSUhISHz8/OAgIB7e3taWlodHR3u7u7q6uqxsbGsrKylpaWUlJRvb29OTk49PT01NTXV1dXT09OOjo5lZWVtCiSVAAAAJ3RSTlMEDAEcMk1kCRcRKiBAXlU2+NBG793U+Pju49GMD97d2IloZ2ZYUyBhXs+3AAACVklEQVRIx+3X13biMBAGYDsUuVJDyibbiy1ixRUIgbDZ9C3v/zw7Y6QYVntsi5PL/JeWv8yYYGnQ9kS0WiluF4oQvUYIQVtAjXzp9zxfxNuK/5ze8UdTJ5zk5U77uMwoRLBtSs/yUDb6ZkJRAU+PPGC4GEqIJ0QHYce2qXOokT46vFpUkyKKsje2SVCB+wqXWVGuvCgNP6NEqGNBuOR7FfF5ScvQERKzhwXR1ZL0oAsl8R9o4AOgqyep71gGfLKansOwWonn9AfQK8IGQObVDAPYahZQbnRyFUUPU7nZHDYElN1tHCer+WohN7sJ5fyK0+gc80NaoqVwBm6MuZKbLYVJgg5D1WB6IeB3aa0UXkTczTw1uJjzir89OWXQm/HP5kwVhstsPM4Wl54axNDpFJk6xLzCl4aXN7eTHSB7iOM0fZyoQj+KE3yTs2tFuIxX+Zf1fKkI5+JFflR8rdL5ji9yEnH3xNS2jpnYOv54avAnh0/ylhyUb8g3GcpM3lbD7X1Vltd39/d3E7lRyqHyobMJVY45+i8M6h2s4IICwlEeUFot8bYgoAfPcATPiC3UcZSyfXGwGp8ABnAxrHw+jH/Cj3JiWCPfp5jSAYkF+MehYCcfHnBcsbtH0Gvef1haDt2w3VqPK3vQq+W8A7le+P8QmFeDdbbfxoK6hhBKNp0Pb4eHCAO0UpM5Cg6H70/cjtPkIxmXrY7rtiviup0WdwihWdO2us6gVZmB07XysZNDqGnYltWsjGXZxsagi93qpmEYjYrALVuj9bponWmeFMP8zj8f/gI3qG3c0PymuwAAAABJRU5ErkJggg==",
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAA4VBMVEUAAAACAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgIAAAACAgIAAAAAAAAAAAD9/f3x8fEAAADv7+/j4+P4+Pj5+fn09Pb4+Pj4+Pjr6+zb29t3d3ipqavf39/5+fmRkZPX19f////29vYyMjL8/P36+vv4+PguLi4sLCwgICAYGBhra2sJCQkEBATKyspdXV0TExPl5eVFRUUoKCgNDQ2ioqKEhIRwcHAlJSXFxcWzs7OLi4tSUlLz8/Pt7e3Z2dnT09O8vLy3t7etra2ampqTk5N3d3dAQEA9PT2pqamureAtAAAAInRSTlMDCxwATTNkEBQYQCxgL1Uo+NJG793P+Pju49vajGZg04lT7rKZKAAAAntJREFUSMel12lX2kAUBmCMRLKxCNZd2yZMJjthl8XdVu3//0G9M8lMymnIZNr3g54DPL43wplcGodZGnXDQc4Oagcoh+Buv/YQj70TxNO7uG0RySDUfYGnXRc7juMWrKCuk8c9VoBSRN05cfQJe08YxReKRmUD5sz6eFt5EGadIBvAoPA7HYbXCUrdG5gWGL1A7sQSKk0dhgXY6lGIbGEQgfhUhUoCNXik6BN3IqOrUagDLJxYor6pU6gALNzT4hVVS9RUFQ7Za0dBEs/HdxWXuQu5i+PA97xZVFG5A1mCeOYNId56vyyDT0kAjmRZUVkCF7E/zFIxKyqBm7mXw3d7f0ogGjP4Jgftu1nm7is/DyXQjjzqJrYstNfL6P2N9I3SafoqAVnukzgMw6kjC9Mk9D3P81NJOAE3JPFGcnAZz4ZZfsjBiL+hWzn4k8OFHHwIGZzIQXs5Y5coB2HYT2CfZFAn8lfTjRDyOC+/Xh7g93qejIMgTOtC7ufzlQfxt5IwSlbZ/+mDn32oFvT5G/MsB1cBgyPm6sEph4/ssKoHN2EO+SGN/4Rov0x96qaTsgO5Um4/SN9kzy2g6nBCz6PH8puO5G1uF2JUxyFwuIA9ulKIJXkZxviUw+NseUA1HBS4JwzqNwAxPFhzXblmt3Kte4lgeNGC5GLyx6Gww5aHlqKew6xkfsFKRtzAarJ15UA3jUuQEMAIlbShrA2u5uqoY2QL0iGpbBvfTgZnTt6K/hqSInw2uLq2OkabFGZLoAay2bGsI0Esq9MEly+BUAnSVI1+U5i+oZp87aSypStds60K0ja7is4XXfKDUE1XhNE1whr/tcz/89eH3/H8QyDpG1cUAAAAAElFTkSuQmCC",
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAtFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBgYAAAD4+PgAAAAAAAAJCQkAAAD9/f329vfo6OgAAAD5+frx8fHw8PDa2tuDg4Ozs7Tk5OQTExNBQUF6enrp6uv6+vrh4eGamprc3Nz////39/jsCQn7+/zkCAjBGRnsFRXXCAi0Bwf4+fr6tLTum5vkhYXigYHdVVXxSEjsQ0PCBwewBQX2fn7PPz/MBwcZ5wV0AAAAJnRSTlMDDBwATTMIZBEZKzBFP9dfVjco+fLdSvba8daTcGtnJRTr4eCOXuGbEfcAAAH5SURBVEjH7dfXcuowEAZgrDg+kjud9FN9kClOr+//XlnJKiQyszI3ucmfmcys7Q8JZhYtg6M2A98YoFgURYFH4DGgBgK7yMcV16k+hJuMf19QsK2R7mcubv8XAeYEbqnw/Iq2ciDd3LBqTzRtJlewqFDi/eWcN/Kqda5s1JoLQuF9Chj9U3tRDFmUn4OU6wW5cT6ST2MGmwVIxwCNw+V8SGgLK+U8Jc9GEgYMautwyVPYq4AEyqbyTANwlhADuS/kAMNjA3fc3Wq7Xd3ur/ku3HGvz0+but7cO7VJN7x7fquXkPrGqXV4J1w91UuZR6fugjbbzbLN2qlNumH9CdaecKUffHBqmy54q7d2/blGYHXfLvHi1Bisbh7X64drp+6GeL7hIRDrRwSi/ehCvB8RiPcj5Cv7kffpR+5AvB9d2KcfnS9kz37kCh5+BPQ/dCzsecxZ2PNgtXDc1p6umRu44I2XVI9N9cHKzuGleowrZ+ooj+hoAdfQAUm7aSmGBwnJcAJXPUeyk8tQjysBi9Op3P7+IVDf5n8uy6wdkI7Ekkn69/TXxNLu2XFycnpWlGkiRzL4kzILy6L4gaQoyjCTTkBYMqAkHmbpLEQyS7NhTPTYKWREGRnFyTGSJB4RZgdd+CcWpYwRJIxRKj8XCZWEeM3y0kEO/vnwDqlLZQ6/KgoYAAAAAElFTkSuQmCC",
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAtFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9/f35+fnz8/P6+vrk5OTz8/X6+vrw8PDy8vPr6+va2tuDg4Ozs7QTExMAAABBQUF6enqamprg4ODo6Ojc3NwgICAhISH///8yMjL29vf8/f34+PkrKyshISEGBgb6+vs7OzsbGxvAwMClpaWMjIyIiIhmZmZhYWFeXl6UlJRHR0cSEhIRERHPgOlrAAAAJnRSTlMCCxwyTWQZEBQsIT9FKFb52Njv4Pn48eba1pNwZ10lFI5zY15HPT1wjJAAAAITSURBVEjHxZbpduIwDIXHSZo9Yem+zm6QkximnbazvP97jVEsaFoNgsOP3n/I+XJvzhGyPhwstaNeY1/GI1hLD7Spj84/J0P049gdWzN3ImyIznsZO75L1Atu6jA8sfo/soRO79I1qcYABqvkxghMT9pJTqT6qsFydrwpXAc+rZoAYEULgt7yIosVcskI7IYTSXMa5mipUsxPnExCUaUIxhro+0RhtLLPqgIHGn/wc9l17YP/wdWMA6MwIJCC/u7+tk3TPhHztgZD0Pp3d8tm5tTce4ip2QHoH1r+aWaoZ8KYGgd27azXgjCmBhzYMGCzBSS19NCj3lJjwAeK9UMzNQ4kPfWv/0W/+RoD6vvnxeJx48fUGJDE95AE8v0ig3y/yCDfLzLI9cu+YLM3yPeLDPL9IoN8v8gg3y8yKM8cHpRnDg/KM4f/W8kzx+tdZw7sM3PMSxB2nznAXAHCzPHcEDTyzOEvHbKUL8jXjkTKnNmAI9woZBINjDldgxMHmh1IMKvn7DGB8bW2rkJphaXDwBVd5Wm1shQXJGvMytEe17Q8JPn3qbPE/LDdzj1xdhPhuoJZs28Xhg74JRA/Bf1u6gKTomUQlp8uz0+8q4W3Ieers5Ozy6ujugxpJXNfmYdFVN8eibqtoyLEJZDIIAuLMhJVFmEVeM6njfMqC0VlVR77nESqJI3jQFAcp4lSByzzB+kfIixjtgNpXqkAAAAASUVORK5CYII=",
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAABC1BMVEUAAAACAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgIAAAAEBAT4+PgAAAAGBgbz9PX9/f0AAAAAAADv7+/v7/AKCgoAAAD5+fn4+Pj4+Pji4uLr6+zb29upqavf39/l5eVzc3WRkZN8fHza2tr///8zMzP9/v729vb4+PgtLS37+/z6+vsXFxcREREDAwMwMDApKSkICAgMDAz19fY4ODiVlZXd3d2Li4uBgYEmJibq6urm5ua0tLSrq6t3d3d1dXVQUFBGRkbZ2dmvr6+jo6OGhoZjY2PQ0NC8vLyenp57e3tdXV1ZWVnh4eHU1NS5ubmPj49wcHBra2tKSko/Pz8hISHv7+/Ly8tUVFQPc5iiAAAAJHRSTlMCCxwyTWQWBxBAKCHRVTb7+EYt79JjX/ju49zb2mZV3pCJiGhkOxKCAAADK0lEQVRIx82WZ1MiQRCGjwU3gASznnpx3cyyLEGSkhEQczj//y+5md4JbBXUWHofrssq64V+5u2uGXrmy2dDURLvCkWJc4lvmwXdoKHHwmBROPqtJhLLdolN9LXjWqZpOhzjqGOScDclNaFw7hBxrlmpVBx9TVDUOsrIjAQ/F6/H3Fa4Wmhhs2K6u4ik/ek6cMROYOqcSqrCGnTMCnBiElmmo2IVtQCGtMzbx97jFc9ud3uTKS0XujzIZcAyIUMD1O/NLxc9b0G5yzKW/TzxxH0aGrKkIOMWvmfbJdt+iOTYLwZYvi1Va2xtR6CEQJd8UUfcGcQA8sJiJO07koB7SiU5aLDKgrMoRlgO/SaRDdomgBIDaUvX2AGihuV5SGWXZjgxkMXco5kXWHbYOucsxVoJ3lCw2gLN1uEb5KwE9QfS4yyStYC3SLtcDeoN8BtROXuGQpdP1RpQbw1nnVcu853ZRRv9F4Pi+MfgVTX0iz1WXLsf+uHzrRjslMteYDftQSRvw7LXtIPgTgSaYRiU8NlcRPql3LSRLD1bArDhNxGHU2HH7/wXIocCsF+MHbluyI6cCPRKJHMIIFvnXlQqA+tYThk4FYDmC8l8jHSJyJ4j3I6zEiS2IjmoguwPxAdg0O1Xe7UKla3GU/Vp3Iql/C9nVb+ZX8/rXL6Orx/+vOdnNYGBPKFyDAP5yRSAmENn3LaDy0je44GMYiEaHTdsINchiQ3kqWBYzeMDucMG8piPx48OZAbGr4D4QB7ygcwvZgrGLx02kNuQxtahO+JaMUd+zU0CVinUSnq85Ndc3NGyWLHgBxzsRxUGuUsLRcHBAq7cpGR9VFuewK2L2qjOG0TgAQN3UY8W9hQE+FnuV3qxyqcAmpbouYJycNYvepXL6WODLLbeFK9NDLPk8aComdwh/dhZa4fd0J+7s5cizxUFWWrHiDQBNVa44oKI38kGGCrwJFOlpPbz+04er0gLjhcJblZ+5+THflZLSmAIXWaSWiq7v7chiL39bEpL0kcgFCulc9pWShhbWi4tQaGUVOVMejspjO10RlYZB9UiVJYlQcgyYB99zH8y/gIfN2RlEHpW7AAAAABJRU5ErkJggg==",
        ],
      };
    },
    props: {
      openNum: String,
      colors: {
        type: Boolean,
        default: false,
      },
      isBig: {
        type: Boolean,
        default: false,
      },
    },
    created() {
    },
    computed: {
      listData() {
        if (this.openNum) {
          let openNum = this.openNum.split(',')
          return openNum
        } else {
          return [];
        }

      },
      totalNum() {
        if (this.openNum) {
          const openNum = this.openNum.split(',')
          let totalNum = 0
          openNum.forEach(element => {
            totalNum = totalNum + parseInt(element)
          });
          return totalNum
        } else {
          return 0
        }

      }
    },
    methods: {},
  };
</script>
<style lang="scss" scoped>
  .k-three-wrapper {
    /*margin: 0.1rem 0 0 0;*/
    display: flex;
    align-items: center;
    ul.dice-list {
      border-radius: 0.2rem;
      //width: 2.4rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      & > li {
        .dice-img {
          margin: 0.14rem 0.1rem;
          width: 0.5rem;
          height: 0.5rem;
          border: 0;
          max-width: 100% !important;
          vertical-align: middle;
        }
      }
    }
    .result {
      min-width: 1.2rem;
      margin-left: .2rem;
      font-size: 14px;
      color: #fff;
      font-weight: 500;
      text-align: left;
      .sum {
        font-size: 16px;
        padding: 0 0 0 0.1rem;
        color: #fff;
        font-weight: 500;
      }
    }
  }

  .bgl {
    /*background: #38be4f;*/
  }
</style>
