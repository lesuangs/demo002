<template>
  <div class="enrollment-management-box">
    <Header :headObj="headObj" @leftClick="$router.push('/agentCenter')"/>
<!--    <NotData v-if="dlRange && dlRange.length === 0 " :isNotData="isNotData"/>-->
    <div class="enrollManagement">
      <!--      <van-form validate-first >-->
      <div class="user-type-wrap">
        <van-form @submit="onSubmit" @failed="onFailed">
          <div class="input-box">
            <div class="userType">
              <div class="type">{{ $t('lang.register.accountType[0]') }}</div>
              <van-radio-group v-model="isDl" direction="horizontal">
                <van-radio name="0" icon-size="14">
                  <span :class="isDl===0 ? 'activeRadio' : ''">{{ $t('lang.register.accountType[1]') }}</span>
                  <template #icon="props">
                    <div class="img-icon" :class="[props.checked ? 'activeIcon' : '']"/>
                  </template>
                </van-radio>
                <van-radio name="1" icon-size="14">
                  <span :class="isDl===1 ? 'activeRadio' : ''">{{ $t('lang.register.accountType[2]') }}</span>
                  <template #icon="props">
                    <div class="img-icon" :class="[props.checked ? 'activeIcon' : '']"/>
                  </template>
                </van-radio>
              </van-radio-group>
              <!--        <van-dropdown-menu>-->
              <!--          <van-dropdown-item v-model="isDl" :options="userOption"/>-->
              <!--        </van-dropdown-menu>-->
            </div>
            <van-field
                    v-model="nickname"
                    :label="$t('lang.register.nickname[0]')"
                    :placeholder="$t('lang.register.nickname[1]')"
                    :clearable="true"
                    :rules="nickNameRules" />
            <van-field
                    v-model="account"
                    :label="$t('lang.register.user[0]')"
                    :placeholder="$t('lang.register.user[1]')"
                    :clearable="true"
                    :rules="nameRules"
                    :error-message="hasAccount ? $t('lang.register.hasValue[0]') : ''"
                    @blur="checkAccount" />
<!--            <van-field
                    v-if="showFullName==='0'"
                    v-model="fullName"
                    :label="$t('lang.register.actualName[0]')"
                    :placeholder="$t('lang.register.actualName[1]')"
                    :clearable="true"
                    :rules="realNameRules"
                    @blur="checkFullName" />
            <van-field
                    v-if="showPhone==='0'"
                    v-model="phone"
                    type="number"
                    maxlength="11"
                    :label="$t('lang.register.memberPhone[0]')"
                    :placeholder="$t('lang.register.memberPhone[1]')"
                    :clearable="true"
                    :rules="phoneRules"
                    @blur="checkPhone" />-->
            <van-field
                    v-model="password"
                    :label="$t('lang.register.password[0]')"
                    :type="pwdType1"
                    :right-icon="rightIcon1"
                    @click-right-icon="handleRightIcon('new')"
                    :placeholder="$t('lang.register.password[1]')"
                    :clearable="true"
                    :rules="pwdRules" />
            <van-field
                    v-model="rePassword"
                    :type="pwdType2"
                    :label="$t('lang.register.confirm_password[0]')"
                    :right-icon="rightIcon2"
                    @click-right-icon="handleRightIcon('sure')"
                    :placeholder="$t('lang.register.confirm_password[1]')"
                    :rules="[{ required: true, message: $t('lang.register.confirm_password[1]') }]"
                    :clearable="true" />
          </div>
          <div class="bonus">
            <span class="bonusSetting">*</span>
            <van-field
                    readonly
                    clickable
                    right-icon="arrow-down"
                    :label="$t('lang.register.bonus[0]')"
                    :value="textValue"
                    @click="showPicker = true"
            />
            <van-popup v-model="showPicker" position="bottom" class="mod-select-picker-box">
              <van-picker
                      v-if="hasRange"
                      show-toolbar
                      :title="$t('lang.register.bonus[0]')"
                      :columns="option"
                      @cancel="showPicker = false"
                      @confirm="onConfirm"
                      :confirm-button-text="$t('lang.common.buttonTextConfirm')"
                      cancel-button-text=" "
              />
            </van-popup>
            <!--        <div class="bonusSetting">* {{ $t('lang.register.bonus[0]') }}</div>-->
            <!--        <van-popup v-model="showPicker" position="bottom" :overlay="true">-->
            <!--          <van-picker-->
            <!--              title="奖金设置"-->
            <!--              show-toolbar-->
            <!--              :columns="option"-->
            <!--              @confirm="onConfirm"-->
            <!--              @cancel="showPicker = false"-->
            <!--              @change="onChange"-->
            <!--          />-->
            <!--        </van-popup>-->

            <!--        <van-dropdown-menu ref="rebate">-->
            <!--          <van-dropdown-item v-model="value" :options="option"/>-->
            <!--        </van-dropdown-menu>-->
          </div>
          <div class="step-button-box">
            <button class="btn-type2"
                    :class=" disabled ? 'disable' : ''"
                    :disabled="disabled"
                    block native-type="submit">{{ $t('lang.register.btn[0]') }}</button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "@/commons/header/Header";
  import NotData from "../../commons/notdata/NotData";
  import {REG_RULE} from '../../api/rule'
  import {mapState,mapActions} from 'vuex';
  export default {
    name: "EnrollmentManagement",
    components: {
      Header,
      NotData
    },
    data() {
      return {
        headObj: {
          title: 'lang.register.title[0]',
          showArrow: true,
        },
        isDl: '0',
        nickname: '',
        account: '',
        fullName: '',
        phone: '',
        password: '',
        rePassword: '',
        // userOption: [
        //   {text: this.$t('lang.EnrollmentManagement.user'), value: '0'},
        //   {text: this.$t('lang.UserList.proxy'), value: '1'},
        // ],
        value: '',
        textValue:'',
        option: [],
        nicknameRule: /^[a-zA-Z0-9\u4E00-\u9FA5]{2,15}$/,
        // accountRule: /^[a-zA-z][a-zA-Z0-9_]{4,29}$/,
        // passwordRule: /^[a-zA-Z0-9]{6,16}$/,
        accountRule:/^[a-z]([0-9a-z_]{3,11})$/i,//对比register.vue页面，要统一验证
        passwordRule: /^[0-9a-z]{6,12}$/i,//对比register.vue页面，要统一验证
        fullNameRule: /([0-9\u4e00-\u9fa5]{2,15})/,
        phoneRule: /^1\d{10}$/,
        rightIcon1: 'eye-o',
        rightIcon2: 'eye-o',
        pwdType1: 'text',
        pwdType2: 'text',
        showFullName: '',
        showPhone: '',
        onlyfullName: '',
        onlyfullPhone: '',
        hasAccount: false,
        hasFullName: true,
        hasPhone: false,
        isNotData: true,
        showPicker:false,
        nickNameRules: [
          {required: true, message: this.$t('lang.register.nickname[2]')},
          {pattern: REG_RULE.nickname.reg, message: this.$t('lang.register.nickname[2]')}
        ],
        nameRules: [
          {required: true, message: this.$t('lang.register.user[2]')},
          {pattern: REG_RULE.username.reg, message: this.$t('lang.register.user[2]')}
        ],
        pwdRules: [
          {required: true, message: this.$t('lang.register.password[2]')},
          {pattern: REG_RULE.loginPwd.reg, message: this.$t('lang.register.password[2]')}
        ],
        rePwdRules: [
          {required: true, message: this.$t('lang.register.confirm_password[2]')},
          {pattern: REG_RULE.loginPwd.reg, message: this.$t('lang.register.confirm_password[2]')}
        ],
      /*  realNameRules: [
          {required: true, message: this.$t('lang.register.actualName[2]')},
          {pattern: REG_RULE.realName.reg, message: this.$t('lang.register.actualName[2]')}
        ],
        phoneRules: [
          {required: true, message: this.$t('lang.register.memberPhone[2]')},
          {pattern: REG_RULE.mobile.reg, message: this.$t('lang.register.memberPhone[2]')}
        ],*/
      }
    },
    async created() {
      this.getDlRange();
    /*  this.$http.home.getConfigDate().then(res => {
        console.log(res.data.system_config);
        let systemConfig = res.data.system_config
        systemConfig.forEach((value, index) => {
          if (value.configKey === 'site_rebate_model') {
            let rebateMode = value.configValue
            if (rebateMode === '0') {
              this.$http.users.userLevelData().then(res => {
                console.log(res);
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
                  let t = r.toFixed(1) + '% ----- ' + l;
                  this.option.push({value: r, text: r.toFixed(1) + '% ----- ' + l})
                  if (i === max) {
                    this.value = r;
                    this.textValue = t;
                  }
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
      const res = await this.$http.users.getLimit()
      console.log(res,'getRegLimitgetRegLimitgetRegLimit')
      this.showFullName = res.data.fullName
      this.showPhone = res.data.phone
      this.onlyfullName = res.data.onlyfullName
      this.onlyfullPhone = res.data.onlyfullPhone
    },
    methods: {
      ...mapActions([
        'getDlRange'
      ]),
      onFailed(errorInfo){
        console.log(errorInfo,'errorInfo2222222222')
      },
      onConfirm (v, i) {
        this.$emit('confirm', v, i);
        this.showPicker = false;
        console.log(v,i,999)
        this.value = v.value;
        this.textValue = v.text;
      },
      handleRightIcon(type) {
        switch (type) {
          case 'new':
            if (this.pwdType1 === 'text') {
              this.rightIcon1 = 'closed-eye'
              this.pwdType1 = 'password'
            } else {
              this.rightIcon1 = 'eye-o'
              this.pwdType1 = 'text'
            }
            break
          case 'sure':
            if (this.pwdType2 === 'text') {
              this.rightIcon2 = 'closed-eye'
              this.pwdType2 = 'password'
            } else {
              this.rightIcon2 = 'eye-o'
              this.pwdType2 = 'text'
            }
            break
          default:
            break
        }
      },
      onSubmit() {
        console.log(this.value,this.textValue,'fdasfsdfsdf');
        /*     if (!this.nicknameRule.test(this.nickname)) {
               this.$toast(this.$t('lang.EnrollmentManagement.userNickname[2]'))
               return
             }

             if (!this.passwordRule.test(this.password)) {
               this.$toast(this.$t('lang.EnrollmentManagement.userPwd[2]'))
               return
             }*/
        if (this.password !== this.rePassword) {
          return this.$toast(this.$t('lang.register.confirm_password[2]'))
        }
        //请求注册接口
        let params = {
          isDl: this.isDl,
          nickname: this.nickname,
          account: this.account,
          password: this.password,
          rebate: Number(this.value).toFixed(1)
        }
        //账号是否存在
        // console.log(this.hasAccount,222);
        /*  if (this.hasAccount) {
            return this.$toast(this.$t('lang.EnrollmentManagement.accountAlready'))
          }*/

        //检查真实姓名是否需要填写 并校验是否唯一
/*        if (this.showFullName === 0) {
          if (this.onlyfullName === 1) {
            if (!this.hasFullName) {
              return this.$toast(this.$t('lang.EnrollmentManagement.realName'))
            }
          }
          params['userInfo.fullName'] = this.fullName;
        }
        console.log(2);
        //检查手机号是否需要填写 并校验是否唯一
        if (this.showPhone === 0) {
          if (this.onlyfullPhone === 1) {
            if (!this.hasPhone) {
              return this.$toast(this.$t('lang.EnrollmentManagement.dianHuaYiCunZai'))
            }
          }
          params['userInfo.phone'] = this.phone;
        }*/
        // console.log(params);
        //请求registerLimit.json
        this.$toast.loading(this.$t('lang.common.loading'))
        this.$http.account.dlAdd(params).then(res => {
          console.log(res,'dlAdd');
          if(res.code === 200){
            if(res.data === true){
              this.$toast.clear();
              this.$toast.success(this.$t('lang.common.add_tips[0]'))
              // window.location.reload()
              this.resetData();
            }
          }else{
            this.$toast.fail({
              message: res.msg,
              icon: 'warning',
              className: 'warning-toast'
            });
          }

        }).catch(error => {
          // console.log(error);
          this.$toast.fail(error.data.msg)
        })


      },
      resetData(){
        this.nickname='';
        this.account= '';
        this.fullName= '';
        this.phone= '';
        this.password= '';
        this.rePassword= '';
      },
      checkAccount() {
        this.$http.users.getCheckUnique(this.account).then(res => {
          this.hasAccount = !res.data
        })
      },
/*      checkFullName() {
        if (!this.fullNameRule.test(this.fullName)) {
          this.$toast(this.$t('lang.register.full_name[3]'))
          return
        }
        /!*if(this.onlyfullName===1){
          this.$http.users.getCheckUnique(1, this.fullName).then(res => {
            console.log(res)
            this.hasFullName = res.data
          })
        }*!/
      },*/
 /*     checkPhone() {
        if (!this.phoneRule.test(this.phone)) {
          this.$toast(this.$t('lang.register.phone[3]'))
          return
        }
        if (this.onlyfullPhone === 1) {
          this.$http.users.getCheckUnique(2, this.phone).then(res => {
            // console.log(res)
            if(res.data){
              this.hasPhone = false;
            }else{
              this.hasPhone = true;
            }
            // this.hasPhone = res.data
          })
        }
      },*/

    },
    computed:{
      ...mapState([
        'dlRange'
      ]),
      hasRange(){
        if (this.dlRange) {
          this.option = this.dlRange;
          this.value = this.dlRange[0].value;
          this.textValue = this.dlRange[0].text;
          return true
        } else {
          return false
        }
      },
      check_userName() {
        return REG_RULE.username.reg.test(this.account)
      },
      check_loginPwd() {
        return REG_RULE.loginPwd.reg.test(this.password)
      },
      check_rePwd(){
        return REG_RULE.loginPwd.reg.test(this.password)
        // if(this.password === this.rePassword){
        //   return true;
        // }else{
        //   return false;
        // }
      },

      check_nickname() {
        return REG_RULE.nickname.reg.test(this.nickname)
      },

      disabled() {
        if(!this.check_userName || !this.check_loginPwd || !this.check_nickname ||
          this.hasAccount || !this.rePassword){
          return true;
        }else{
          return false;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .enrollment-management-box{
    height:100%;
    display: flex;
    flex-direction: column;
    font-size:px2rem(15px);
    .input-box,.bonus{
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
    }

    .bonus{
      display: flex;
      align-items: center;
      padding:0 px2rem(15px);
      margin-top: 10px;
      /deep/.van-cell{
        padding: 0;
        .van-cell__title{
          color:red;
        }
      }
    }
    .g-content > .van-cell-group{
      margin:0;
    }
    .userType{
      display: flex;
      min-height: px2rem(50px);
      align-items: center;
      padding:0 px2rem(15px);
      @include border-1px(#2F2F36);
    }
    /deep/.van-cell__title,.userType .type,
    /deep/.van-radio-group,/deep/.van-cell__value,
    .bonusSetting{
      font-size: px2rem(15px);
    }
    /deep/.van-cell__title,.userType .type,.bonus .bonusSetting {
      flex:1;
    }
    .bonusSetting{
      color:red;
    }
    /deep/.van-radio-group,
    /deep/.van-cell__value,
    /deep/.van-dropdown-menu{
      flex:2;
      text-align: left;

    }
    /deep/.van-dropdown-menu__item{
      justify-content: flex-start;
    }
    /*/deep/.van-dropdown-item__content{*/
    /*  max-height: 100%;*/
    /*}*/
    .van-dropdown-menu,
    .van-cell-group{
      background: none;
    }
    .van-cell {
      min-height:px2rem(50px);
      padding:5px 0.32rem;
      display: flex;
      align-items: center;
    }

  }
  .van-field__body,
  .van-cell__value,
  .van-field__control{
    height:100%;
  }

  .skin-gray{
    .enrollment-management-box{
      /deep/.van-dropdown-item__content{
        background: $skin-gray-bg;
        top:0;
        border-top:1px $skin-gray-border-color solid;
        .van-dropdown-item__option--active{
          border: solid 1px #606070;
          background-color: #333441;
          &,.van-cell__title,.van-dropdown-item__icon{
            color:#fff;
          }
        }
      }

      .input-box,.bonus{
        background: $skin-gray-con-bg;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
      }
      .user-type-wrap{
        margin-bottom: px2rem(10px);
      }
      .userType{
        @include border-1px($skin-gray-border-color);
      }
      .userType .type{
        color:$skin-gray-label-color;
      }
      /deep/.van-cell__title{
        color:#606070;
      }
      /deep/.van-field__label{
        color:$skin-gray-label-color;
      }
      /deep/ .van-field__control,/deep/.van-radio__label,/deep/.van-dropdown-menu__title{
        color:#fff;
        //color:$skin-leisure-text-color;
      }
    }

  }

  .skin-black{
    .enrollment-management-box{
      /deep/.van-dropdown-item__content{
        background: $skin-black-bg;
        top:0;
        border-top:1px $skin-black-border-color solid;
        .van-dropdown-item__option--active{
          border: solid 1px #606070;
          background-color: #333441;
          &,.van-cell__title,.van-dropdown-item__icon{
            color:#fff;
          }
        }
      }

      .input-box,.bonus{
        background: $skin-black-con-bg;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
      }
      .user-type-wrap{
        margin-bottom: px2rem(10px);
      }
      .userType .type{
        color:$skin-black-label-color;
      }
      /deep/.van-cell__title{
        color:#606070;
      }
      /deep/.van-field__label{
        color:$skin-black-label-color;
      }
      /deep/ .van-field__control,/deep/.van-radio__label,/deep/.van-dropdown-menu__title{
        color:#fff;
        //color:$skin-leisure-text-color;
      }
    }

  }


  /*.g-content {*/
  /*  !*background-color: #efeff4;*!*/
  /*  height: 100%;*/
  /*  width: 100%;*/
  /*  position: absolute;*/
  /*}*/

  /*.m-btns {*/
  /*  padding-top: .75rem;*/
  /*  display: flex;*/
  /*  justify-content: space-around;*/
  /*  align-items: center;*/
  /*}*/

  /*.m-button {*/
  /*  color: #fff;*/
  /*  background-color: #dd413a;*/
  /*  width: 6.9rem;*/
  /*  height: .8rem;*/
  /*  line-height: .8rem;*/
  /*  font-size: .36rem;*/
  /*  margin: auto;*/
  /*  border-radius: .1rem;*/
  /*  text-align: center;*/
  /*}*/

  /*.disable {*/
  /*  background-color: #eda6a6;*/
  /*}*/

</style>
