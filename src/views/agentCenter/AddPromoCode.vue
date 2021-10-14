<template>
  <div class="add-promo-code-box">
    <Header :headObj="headObj" @leftClick="$router.push('/agentCenter')"/>
    <div class="promotion-content">
      <van-field
              v-if="hasType"
              :label="$t('lang.promotionRegistration.promotionPage')"
              v-model="valueSprea"
              placeholder=""
              right-icon="arrow-down"
              readonly
              @click="isFocus('1')"/>
      <van-field
              v-if="hasRange"
              :label="$t('lang.promotionRegistration.bonusSetting')"
              v-model="valueRebate"
              @click="isFocus('2')"
              readonly
              right-icon="arrow-down"/>
      <!--      <van-field-->
      <!--              maxlength="10"-->
      <!--          :label="$t('lang.promotionRegistration.promotionCode')"-->
      <!--          v-model="spreadCode"/>-->
      <van-popup v-model="showPicker" position="bottom" :overlay="true" class="mod-select-picker-box">
        <van-picker
                :title="pickTitle"
                show-toolbar
                :columns="option"
                @confirm="onConfirm"
                @cancel="showPicker = false"
                @change="onChange"
                cancel-button-text=" "
                :confirm-button-text="$t('lang.common.buttonTextConfirm')"
        />
      </van-popup>
      <div class="step-button-box">
        <button class="btn-type2" @click="addNewData(0)">{{$t('lang.promotionRegistration.webConnection')}}</button>
        <button class="btn-type2" @click="addNewData(1)">{{$t('lang.promotionRegistration.wechatConnection')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "@/commons/header/Header";
  import {mapState,mapActions} from 'vuex';
  import {REG_RULE} from '../../api/rule'
  export default {
    name: "AddPromoCode",
    components: {
      Header
    },
    data() {
      return {
        headObj: {
          title: this.$t('lang.promotionRegistration.addPromotion'),
          showArrow: true,
        },
        option: [],
        showPicker: false,
        valueSprea: '',
        optionSprea: [],
        arraySprea: [],
        spreadCode: '',
        spreadType: '',
        optionRebate: [],
        valueRebate: '',
        rebateCode:'',

        focusValue: '',
        slectArray: [],
        pickTitle:'',
      }
    },
    created() {
      this.getDlRange();
      this.getSpreadTypes();
      // let params = {date: new Date().getTime()}
/*      this.$http.account.getspreadPage(params).then(res => {
        this.arraySprea = res.data
        // console.log(res,99999)
        res.data.forEach(val => {
          this.optionSprea.push(
            val.name
          )
        })
      }).catch(err => {
        console.log(err);
      })*/
     /* this.$http.account.getspreadPage(params).then(res => {
        this.arraySprea = res.data
        // console.log(res,99999)
        res.data.forEach(val => {
          this.optionSprea.push(
            val.name
          )
        })
      }).catch(err => {
        console.log(err);
      })*/
      // 奖金设置
     /* this.$http.home.getConfigDate().then(res => {
        // console.log(res.data.system_config, 123);
        let systemConfig = res.data.system_config
        systemConfig.forEach((value, index) => {
          if (value.configKey === 'site_rebate_model') {
            let rebateMode = value.configValue
            if (rebateMode === '0') {
              this.$http.users.userLevelData().then(res => {
                //算法开始
                let max = res.data[1].toFixed(4);//9.0000
                let obj = {
                  maxRebate: max,
                  maxRebatePercent: max
                }
                max = max / 0.1

                let min = res.data[0].toFixed(4) / 0.1;//0.0000 0

                for (let i = max; i >= min; i--) {
                  let r = obj.maxRebate - (max - i) * 0.1.toFixed(1);
                  let l = 1800 + i * 2;
                  this.optionRebate.push(r.toFixed(1) + '% ----- ' + l)
                  if (i === max - 1) {
                    this.valueRebate = r.toFixed(1) + '% ----- ' + l
                  }
                  this.slectArray.push({id: r.toFixed(1), value: r.toFixed(1) + '% ----- ' + l})
                }

              }).catch(err => {
                console.log(err);
              })
            }
          }
        })
      }).catch(err => {
        console.log(err);
      })*/
    },
    methods: {
      ...mapActions([
        'getSpreadTypes',
        'getDlRange',
        'getPromotionReg'
      ]),
      isFocus(val) {
        this.option = [];
        console.log(this.spreadTypesList,'spreadTypesListspreadTypesList');
        // val === '1' ? this.option = this.optionSprea : this.option = this.optionRebate;
        if(val === '1'){
          this.option = this.optionSprea;
        }else{
          this.option = this.dlRange;
        }
        // console.log(this.option,this.optionSprea,99999)
        this.focusValue = val;
        this.focusValue === '1' ? this.pickTitle = this.$t('lang.promotionRegistration.promotionPage') : this.pickTitle = this.$t('lang.promotionRegistration.bonusSetting');
        setTimeout(() => {
          this.showPicker = true
        }, 100)
      },
      onConfirm(value) {
        // console.log(value,9999555)
        this.focusValue === '1' ? this.valueSprea = value.text : this.valueRebate = value.text;
        this.focusValue === '1' ? this.spreadType = value.value : this.rebateCode = value.value;

        this.showPicker = false;
      },
      onChange(picker, value) {
        this.value = value
      },
      addNewData(val) {
        // console.log(this.valueSprea,'this.valueSprea');
        // console.log(this.valueRebate,'this.valueRebate');
        // if(!this.valueSprea){
        //   alert(11);
        //   return false;
        // }
        // if(!this.check_spreadCode){
        //   this.$toast(this.$t('lang.daiLiZhongXin.rule[0]'));
        //   return false;
        // }
      /*  let sprea = this.valueSprea
        let a = this.arraySprea.filter((index) => {
          return index.name == sprea
        }, sprea)

        let t = this
        let b = this.slectArray.filter((index) => {
          return index.value === t.valueRebate
        }, t)*/
        this.$toast.loading(this.$t('lang.common.loading'))
        let params = {
          type: val,
          spreadType: this.spreadType,
          rebate: this.rebateCode,
          // rebate: b[0].id,
          code: this.spreadCode
        }
        this.$http.account.addSpread(params).then(res => {
          if(res.code === 200){
            if(res.data === true){
              this.$toast.clear();
              // this.getPromotionReg();
              this.$router.push('/promotionRegistration')
            }
          }else{
            this.$toast.fail({
              message: res.msg,
              icon: 'warning',
              className: 'warning-toast'
            });
          }

        }).catch(err => {
          console.log(err);
          this.$toast.fail(err.data.msg)
        })
      }
    },
    computed:{
      ...mapState([
        'spreadTypesList',
        'dlRange'
      ]),
      check_spreadCode() {
        return REG_RULE.spreadCode.reg.test(this.spreadCode)
      },
      hasRange(){
        if (this.dlRange) {
          this.option = this.dlRange;
          this.valueRebate = this.dlRange[0].text;
          this.rebateCode = this.dlRange[0].value;
          return true
        } else {
          return false
        }
      },
      hasType(){
        if (this.spreadTypesList) {
          this.spreadTypesList.forEach(val => {
            this.optionSprea.push(
              {
                text:val.name,
                value:val.id
              }
            )
          });
          this.valueSprea = this.spreadTypesList[0].name;
          this.spreadType = this.spreadTypesList[0].id;
          return true
        } else {
          return false
        }
      },
    },
  }
</script>

<style lang="scss" scoped>

  .add-promo-code-box{
    /deep/.van-cell{
      .van-cell__title{
        flex:1;
      }
      .van-cell__value{
        flex:2;
      }
    }
  }

  .skin-gray{
    .add-promo-code-box{
      /deep/.van-cell{
        background: $skin-gray-con-bg;
      }
    }
  }

  .skin-black{
    .add-promo-code-box{
      /deep/.van-cell{
        background: $skin-black-con-bg;
      }
    }
  }

  .buttonList {
    display: flex;
    justify-content: space-around;

  }

  .m-btns {
    padding-top: .75rem;
    margin: 4%;
    font-size: .2rem;
  }

  .m-btn, .m-button {
    color: #fff;
    background-color: #dd413a;
    width: 2.5rem;
    height: .8rem;
    line-height: .8rem;
    border-radius: .1rem;
    text-align: center;
  }
</style>
