<template>
  <div class="bankCardName bank-card-data-box">
    <Header :headObj="headObj" @leftClick="$router.go(-1)"/>
    <!--    <span class="bankCardName">请绑定持卡人本人银行卡</span>-->
    <div class="g-content">
      <van-cell-group class="bankCardName">
        <van-form>
          <van-field
                  :label="$t('lang.myBankInfo.cardholder')"
                  v-model="fullName"
                  :placeholder="$t('lang.myBankInfo.noModification')"/>
          <van-field
                  v-if="hasValue"
                  readonly
                  :label="$t('lang.myBankInfo.bankName')"
                  :placeholder="$t('lang.myBankInfo.selectBank')"
                  v-model="bankName"
                  right-icon="arrow-down"
                  @click="showPicker = true"/>
          <van-popup v-model="showPicker" position="bottom" :overlay="true" class="mod-select-picker-box">
            <van-picker
                    :title="$t('lang.myBankInfo.bankName')"
                    show-toolbar
                    :columns="bankColumns"
                    @confirm="onConfirm"
                    @cancel="showPicker = false"
                    @change="onChange"
                    cancel-button-text=" "
            />
          </van-popup>
          <van-field
                  :label="$t('lang.myBankInfo.bankCardNumber')"
                  type="digit"
                  @blur="lengthMsg"
                  maxlength="20"
                  v-model="cardNo"
                  :placeholder="$t('lang.myBankInfo.cardRule')"/>
          <van-field
                  :label="$t('lang.myBankInfo.accountOpeningAddress')"
                  v-model="subAddress"
                  :placeholder="$t('lang.myBankInfo.inputBranch')"/>
        </van-form>
      </van-cell-group>
     <!-- <div class="step-button-box">
        <button class="btn-type2" :class="[ !check_card || !check_name || !check_bankAddress? 'disable' : '']"
                @click="sendBankData">{{$t('lang.common.buttonTextConfirm')}}</button>
      </div>-->
      <div class="m-btns bankCardName">
        <div class="m-btn">
          <div @click="sendBankData">{{$t('lang.common.buttonTextConfirm')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/commons/header/Header'
  import {mapState,mapActions} from 'vuex';
  import {REG_RULE} from "../../api/rule";

  export default {
    name: 'BankCardData',
    components: {
      Header
    },
    data() {
      return {
        headObj: {
          title: this.$t('lang.myBankInfo.title'),
          showArrow: true
        },
        showPicker: false,
        bankColumns: [],
        bankName: '', // 银行名称
        fullName: '', // 真实姓名
        cardNo: '', // 银行卡号
        subAddress: '',// 银行详细
        lastRouter: ''
      }
    },
    computed:{
      check_card() {
        return REG_RULE.bankNo.reg.test(this.cardNo)
      },
      check_name(){
        return REG_RULE.realName.reg.test(this.fullName)
      },
      check_bankAddress(){
        if(REG_RULE.normal.reg.test(this.subAddress) && this.subAddress.length>=2){
          return true;
        }else{
          return  false;
        }
      },
      hasValue(){
        if(this.bankColumns){
          this.bankName = this.bankColumns[0];
          return true;
        }else{
          return false;
        }
      },


    },
    beforeRouteEnter(to, from, next) {
      next(vm => {          //  这里的vm指的就是vue实例，可以用来当做this使用
        console.log(to)
        console.log(from)
        console.log(vm)
        vm.lastRouter = from.name
        console.log(vm.lastRouter);
      })
    },
    async created() {
      let bankArray
      if (!sessionStorage.getItem('configList')) {
        const configArray = await this.getBanks()
        bankArray = configArray.rech_bank
        console.log(bankArray)
        sessionStorage.setItem('configList', JSON.stringify(configArray))
      } else {
        bankArray = JSON.parse(sessionStorage.getItem('configList')).rech_bank
        console.log(bankArray)
      }
      bankArray.forEach(bank => {
        if (bank.configKey !== '支付宝' && bank.configKey !== '微信支付' && bank.configKey !== '财付通') {
          this.bankColumns.push(bank.configKey);
        }
      })
    },
    methods: {
      ...mapActions([
        'getUserInfo'
      ]),
      async getBanks() {
        return new Promise((resolve, reject) => {
          this.$http.home.getConfigDate().then(res => {
            resolve(res.data)
          }).catch(error => {
            reject(error)
          })
        })
      },
      onConfirm(value) {
        this.value = value;
        this.bankName = value;
        this.showPicker = false
      },
      onChange(picker, value) {
        this.bankName = value
      },
      sendBankData() {
        /*if (!this.fullName) {
          this.$toast.fail(this.$t('lang.myBankInfo.inputPeopleName'))
          return
        }
        if (!this.bankName) {
          this.$toast.fail(this.$t('lang.myBankInfo.inputBankName'))
          return
        }
        if (!this.cardNo) {
          // this.$toast.fail(this.$t('lang.myBankInfo.cardNoRule'))
          this.$toast.fail(this.$t('lang.myBankInfo.inputBankNo'))
          return
        }
        if (this.cardNo.length < 16 || this.cardNo.length > 20) {
          this.$toast.fail(this.$t('lang.myBankInfo.cardNoRule'))
          return
        }
        if (!this.subAddress) {
          this.$toast.fail(this.$t('lang.myBankInfo.inputBranchInfo'))
          return
        }*/
        this.$toast.loading(this.$t('lang.common.submitIng'))
        this.$http.users.bankCardData({
          bankName: this.bankName,
          fullName: this.fullName,
          cardNo: this.cardNo,
          subAddress: this.subAddress
        }).then((res) => {
          console.log(res, 'pppppp')
          if(res.code === 200){
            this.$toast.clear();
            this.$toast.success(this.$t('lang.state.addSuccess'))
            this.getUserInfo({});
            console.log(this.lastRouter);
            if (this.lastRouter === 'withDraw') {
              // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa')
              this.$router.push('/withDraw')
            } else {
              this.$router.push('/securityCenter')
            }
          }else{
            this.$toast.fail({
              message: res.msg,
              icon: 'warning',
              className: 'warning-toast'
            });
          }

        }).catch(error => {
          this.$toast.fail(error.data.msg)
        })
      },
      lengthMsg() {
        if (!this.check_card) {
          this.$toast(this.$t('lang.myBankInfo.cardNoRule'))
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bank-card-data-box{
    /deep/.van-cell-group{
      background: none;
      .van-cell{
        min-height: px2rem(52px);
      }
      .van-cell__value{
        flex:2;
      }
    }
  }

  .skin-gray{
    .bank-card-data-box{
      /deep/.van-cell-group{
        background: $skin-gray-con-bg;
        .van-cell__title{
          color:$skin-gray-text-color;
        }
      }
    }
  }

  .skin-black{
    .bank-card-data-box{
      /deep/.van-cell-group{
        background: $skin-black-con-bg;
        .van-cell__title{
          color:$skin-black-text-color;
        }
      }
    }
  }



  .g-content {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: scroll;
    position: absolute;
    background-color: #f5f5f9;
    /deep/.van-field__control{
     color: #fff;
    }
    .m-btns {
      margin-top: 1rem;
      padding: 0 .1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .m-btn {
        color: #fff;
        background-color: #dd413a;
        width: 6.9rem;
        height: .8rem;
        line-height: .8rem;
        font-size: .36rem;
        margin: auto;
        border-radius: .1rem;
        text-align: center;

      }
    }
  }
</style>
