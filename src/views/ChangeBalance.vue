<template>
  <div class="g-box change-balance-box">
    <div class="turn">
      <van-cell
              value-class="mine_class"
              :title="$t('lang.BalanceChange.platformTransferOut')"
              is-link
              :value="outValue"
              size="large"
              @click="handleChange('out')"
      />
      <van-cell
              :title="$t('lang.BalanceChange.platformTransfer')"
              is-link
              :value="inValue"
              size="large"
              @click="handleChange('in')"
      />
    </div>
        <div class="automatic">
          <van-cell center :title="$t('lang.BalanceChange.autoChange')">
            <template #right-icon>
              <van-switch v-model="checked" size="24"
                          :loading="isLoading"
                          @click="getAutomatic"
                          active-color="lightgreen"/>
            </template>
          </van-cell>
        </div>
    <div class="amount">
      <div class="amountWrap">
        <p class="notice">
          <span>{{ $t("lang.BalanceChange.ConversionAmount") }}</span>
          <i class="iconfont icon-exclamationEmpty">{{ $t("lang.BalanceChange.pleaseEnterAmount") }}</i>
        </p>
        <div class="money">
          <!-- {{$t('lang.supply.RMB')}} -->
          <van-field v-model="money" placeholder="¥  0.00" type="number"/>
        </div>
        <div class="moneycontent">
          <div v-for="(v,i) in moneyArr" :key="i" @click="setinput(v,i)"
               :class="activeClass === i ? 'active' : ''">{{ v }}{{$t('lang.common.yuan')}}
          </div>
        </div>
      </div>

      <div class="step-button-box">
        <button class="btn-type1" @click="getAll()">
          {{ $t("lang.BalanceChange.oneClickTotal") }}
        </button>
        <button class="btn-type2" @click="transferMoney()">
          {{ $t("lang.BalanceChange.confirmConversion") }}
        </button>
      </div>
      <!--      <div :class="['m-button']" @click="iransferMoney()">-->
      <!--        {{ $t("lang.BalanceChange.confirmConversion") }}-->
      <!--      </div>-->
    </div>
<!--    <div class="game">-->
<!--      <div class="game-wrap">-->
<!--        <van-cell-->
<!--                v-for="item in gameList"-->
<!--                :key="item.code"-->
<!--                value-class="game_money"-->
<!--                :title="item.title"-->
<!--                :value="item.money"-->
<!--        >-->
<!--          <span @click="onRefresh(item)" slot="right-icon" class="custom-icon">{{$t('lang.common.search')}}</span>-->
<!--        </van-cell>-->
<!--      </div>-->

<!--      <div class="step-button-box">-->
<!--        <button class="btn-type1" @click="getAll()">-->
<!--          {{ $t("lang.BalanceChange.oneClickTotal") }}-->
<!--        </button>-->
<!--      </div>-->


<!--            <div class="button-big button-special" @click="getAll()">-->
<!--              {{ $t("lang.BalanceChange.oneClickTotal") }}-->
<!--            </div>-->


<!--      <li class="notice">-->
<!--        <i class="iconfont icon-exclamationEmpty"></i>-->
<!--        {{$t('lang.RechargeData.giveBack')}}{{serviceInfo.title}}{{$t('lang.common.website')}}-->
<!--        &lt;!&ndash; {{ $t("lang.BalanceChange.returnToPlatform") }} &ndash;&gt;-->
<!--      </li>-->
<!--    </div>-->
  </div>
</template>

<script>
  import axios from "../http";
  import {mapState,mapActions,mapGetters} from "vuex";
  import {API} from "../api/api_list";
  import qs from 'qs'
  export default {
    name: "ChangeBalance",
    props: {
      outValue: String,
      inValue: String,
      gameList: Array,
      outCode: String,
      inCode: String,
    },
    data() {
      return {
        money: "",
        disabled: false,
        // title:'',
        checked: '',
        isLoading:false,
        automatic: 1,
        moneyArr: ['1','50','100','300', '500', '1000', '2000','3000','5000'],
        activeClass: '',

      };
    },
    watch:{
      'userInformation.automatic': {
        handler(newVal, oldVal) {
          this.checked = newVal === 1 ? true : false;
          // console.log(newVal,oldVal,2222222222222222)
        },
        deep: true,
        immediate: true
      }
    },
    computed: {
      ...mapState([
        'serviceInfo',
        'userInformation',
        'balance'
      ]),
      ...mapGetters(['userInfo']),
      usersInfo () {
        return this.userInfo
      },
      // isChecked:{
      //   get:function () {
      //     if(this.userInformation){
      //       return this.userInformation.automatic === 1 ? true : false;
      //     }else {
      //       return false
      //     }
      //   },
      //   set: function(newVal) {
      //     if(this.userInformation){
      //       this.checked = this.userInformation.automatic === 1 ? true : false;
      //     }else {
      //       return this.checked = newVal;
      //     }
      //   }
      // },
    },
    created() {
      this.getUserInfo({});
      // if(this.userInformation){
      //   this.checked = this.userInformation.automatic === 1 ? true : false;
      //   // console.log(this.checked,'this.checked')
      //
      // }else {
      //   this.checked = false;
      //   this.isLoading = false;
      //   // console.log(this.checked,'this.checked')
      // }

    },
    methods: {
      // 金额选择
      ...mapActions([
        'getUserInfo'
      ]),
      setinput(v,i) {
        this.money = v
        this.activeClass = i
      },
      handleChange(type) {
        console.log(type,'fsadfsdfsdf')
        this.$emit("showOverlay", type);
      },
      getAll(type) {
        this.$emit("getAllMoney");
        this.$emit("getGameList");
      },
      onRefresh(item) {
        this.$emit("getMoney", item);
      },
      transferMoney() {
        if(this.balance<this.money){
          return this.$toast(this.$t('lang.BalanceChange.tips[2]'));
        }
        if(!this.outCode){
          return this.$toast(this.$t('lang.BalanceChange.ChooseOutPlatform'));
        }
        if(!this.inCode){
          return this.$toast(this.$t('lang.BalanceChange.ChoosePlatform'));
        }
        let params = {
          username:this.userInformation.account,
          from:this.outCode,
          to:this.inCode,
          amount:this.money,
          tenantCode: 'model'
        };

        if (this.money > 0) {
          axios.post(API.TRANSFER_AMOUNT,qs.stringify(params)).then((res) => {
            let _data = res.data;
            // let getMsg = _data.msg ?  _data.msg :  _data.message;
            this.$toast.loading(this.$t('lang.common.converting'));
            if(res.data === true){
              this.$toast.success(this.$t('lang.common.edit_tips[1]'));
            }
            this.money = this.activeClass = '';
          }).catch((err) => {
            this.$toast(err.msg);
          })
          // this.$http.home
          //   .getTransfer({
          //     from: this.outCode,
          //     to: this.inCode,
          //     amount: this.money,
          //   })
          //   .then((rep) => {
          //     this.$toast.success(this.$t('lang.RechargeData.changeSuccess'));
          //     this.$emit("getGameList");
          //     this.money = ""
          //   });
        } else {
          this.$toast(this.$t('lang.RechargeData.inputMoney'));
        }

      },
      getAutomatic() {
        this.isLoading = true;

        if(this.userInformation.automatic === 1){
          this.automatic = 0
        }else{
          this.automatic = 1
        }

        axios.get('api/user/modifyAutomatic', {
          params: {
            automatic: this.automatic,
            // tenantCode:'model'
          }
        }).then(res => {
          let a = this.automatic === 0 ? 0 : 1;
          let _data = res.data;
          if(_data === 200){
            if(a === 0){
              this.checked = false;
            }else{
              this.checked = true;
            }
            this.isLoading = false;
            this.getUserInfo({});
          }
          console.log(this.automatic,a,_data, 'res')
        }).catch(err => {
          this.isLoading = true;
          console.log(err, 'err')
        })
      },
    },
  };
</script>

<style lang="scss" scoped>
  .change-balance-box {
    width: 100%;
    height: 100%;
    background-color: #191b1f;
    position: relative;
    padding-bottom: 20px;
    .turn {
      margin: 0.2rem 0;
    }
    .automatic {
      margin: 0.2rem 0;
      .van-cell{
        display: flex;
        justify-content: space-between;
      }
    }
    .van-cell__title{
      font-size:px2rem(15px);
      max-width: px2rem(100px);
    }
    .van-cell__value{
      color:#fff;
      text-align: left;
    }
    .amount {
      //background-color: #fff;
      //padding: 0.2rem;
      font-size: 0.3rem;
      .notice {
        justify-content: space-between;
        align-items: center;
        display: flex;
        font-size: px2rem(15px);
        padding:0 px2rem(15px) px2rem(15px);
        .iconfont {
          font-size: px2rem(13px);
          color: #a8a8a8;
        }
      }
      .money {
        font-size: 0.56rem;
        position: relative;
        input {
          margin: 0;
          font: inherit;
          color: inherit;
          border: none;
          outline: none;
          padding: 0;
          -moz-appearance: none;
          background: none;
        }
      }
      .money:after {
        position: absolute;
        content: "";
        transform-origin: 0 0;
        pointer-events: none;
        box-sizing: border-box;
        z-index: 0;
        border-bottom: 1px solid #e2e2e2;
        border-radius: 0;
        width: 100%;
        left: 0;
        bottom: 0;
        right: 0;
        transform: translate3d(0, 50%, 0) scale(1);
      }
    }
    .m-button {
      margin-top: 0.3rem;
      color: #fff;
      //background: $global-bgcolor;
      width: 6.9rem;
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.36rem;
      box-shadow: 0 0 #eda6a6, 0.1em 0.1rem 0.3rem #eda6a6;
      border-radius: 0.1rem;
      text-align: center;
    }
    .disable {
      //background-color: #eda6a6;
    }
    .game {
      //background-color: #fff;
      margin-top: 0.2rem;
      padding: 0.2rem;
      .custom-icon {
        color: #c00;
        font-size: 0.36rem;
        margin-left: 0.2rem;
        line-height: 0.48rem;
      }
      .game_money {
        color: #c00;
        font-size: 0.36rem;
      }
    }
    .button-big {
      margin-top: 0.7rem;
      position: relative;
      color: #c00;
      width: 6.9rem;
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.36rem;
      border-radius: 0.1rem;
      text-align: center;
    }
    .button-special:after {
      position: absolute;
      content: "";
      transform-origin: 0 0;
      pointer-events: none;
      box-sizing: border-box;
      z-index: 0;
      border: 1px solid #c00;
      border-radius: 0.1rem;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0.1rem;
      bottom: 0;
      right: 0;
      transform: translateZ(0) scale(1);
    }
    .notice {
      text-align: center;
      margin-top: 0.26rem;
      font-size: 0.24rem;
    }
    /deep/.van-cell__value--alone{
      color:#fff;
    }
    .amountWrap{
      overflow: hidden;
      /deep/input{
        font-size:22px;
        color:#fff;
        &::-webkit-input-placeholder{
          color:#fff;
        }
      }
    }
    .moneycontent{
      margin:0 px2rem(15px);

    }
    .game-wrap {
      border-radius: px2rem(10px);
      overflow: hidden;
    }
  }

  .skin-gray {
    .change-balance-box {
      .amountWrap{
        background: $skin-gray-con-bg;
        .moneycontent{
          border-top:1px $skin-gray-border-color solid;
        }
      }
      .amountWrap .notice span,.van-cell__title{
        color:$skin-gray-label-color;
      }
      .game-wrap {
        background: $skin-gray-con-bg;
      }
      .van-switch{
        background:  $skin-gray-bg;
      }
    }
  }

  .skin-black {
    .change-balance-box {
      .amountWrap{
        background: $skin-black-con-bg;
        .moneycontent{
          border-top:1px $skin-black-border-color solid;
        }
      }
      .amountWrap .notice span,.van-cell__title{
        color:$skin-black-label-color;
      }
      .game-wrap {
        background: $skin-black-con-bg;
      }
      .van-switch{
        background: $skin-black-bg;
      }
    }
  }

</style>
