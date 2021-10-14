<template>
  <div>
    <Header :headObj="headObj" @leftClick="$router.go(-1)"/>
    <div class="promptContent">
      <h2 class="title">{{$t('lang.findPwd.forgetPassword')}}</h2>
      <p class="prompt">{{$t('lang.findPwd.zhaoHuiMiMa')}}</p>
    </div>
    <div class="g-content">
      <van-cell-group>
        <van-field :label="$t('lang.findPwd.memberAccount')" v-model="userAccount"
                   :placeholder="$t('lang.findPwd.memberAccount')" clearable
                   @input="changePwd"
                   :rules="[{ required: true, message: $t('lang.loginContent.PLZenterUserName') }]"

        />
        <van-field :label="$t('lang.findPwd.withdrawalsPassword')"
                   v-model="cashPassword"
                   type="password"
                   :placeholder="$t('lang.findPwd.withdrawalsPassword')"
                   :clearable="true"
                   maxlength="4"
                   :error-message="text"
                   @input="changePwdValue"
        />
      </van-cell-group>
      <div class="vCode">
        <van-field
          v-model="yzmNum"
          :label="$t('lang.registerContent.verificationCode')"
          label-width="90"
          :clearable="true"
          :placeholder="$t('lang.loginContent.pleaseEnterVerificationCode')"
          @input="changePwd"
        >
        </van-field>
        <img @click="handleChangeImg" :src="'/v/vCode?t=' + t" alt="" />
      </div>
      <div class="m-btns">
        <div class="m-btn">
          <div :class="['m-button', disabled ? 'disable' : '']" @click="sendUserInfo"> {{$t('lang.common.determine')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/commons/header/Header'

export default {
    name: "FindPwd",
    components: {
      Header
    },
    data() {
      return {
        headObj: {
          title: 'lang.findPwd.forgetPassword',
          showArrow: true
        },
        userAccount:'',
        cashPassword:'',
        yzmNum:'',
        t: Date.now(),
        disabled:true,
        text:''
      }
    },
    methods:{
      changePwd () {
        if (this.userAccount.length !=='' && this.cashPassword.length === 4 && this.yzmNum.length ===4) {
          this.disabled = false
        }
      },
      changePwdValue (val) {
        console.log(val);
        console.log(val.length);
        if(!Number(val)){
          this.text='请输入数字'
        }
        if(val.length===0 || val<1){
          this.text=''
        }
        if (this.userAccount.length !=='' && this.cashPassword.length === 4 && this.yzmNum.length ===4) {
          this.disabled = false
        }
      },
      handleChangeImg () {
        this.t = Date.now()
      },
      sendUserInfo (){
        // let params = {
        //   userAccount: this.userAccount,
        //   cashPassword:this.cashPassword,
        //   yzmNum:this.yzmNum
        // }
        // this.$http.users.findPwd(params).then(res=>{
        //   console.log(res);
        // }).catch(err=>{
        //   console.log(err);
        //   this.t = Date.now()
        // })
        if(!this.disabled){
          let params = {
            userAccount: this.userAccount,
            cashPassword:this.cashPassword,
            yzmNum:this.yzmNum
          }
          this.$http.users.findPwd(params).then(res=>{
            console.log(res);
            if(res.status===200){
              this.$toast.success('提交申请成功,请及时与客服人员联系')
              this.userAccount=''
              this.cashPassword=''
              this.yzmNum=''
            }
          }).catch(err=>{
            console.log(err);
            this.t = Date.now()
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.promptContent{
  text-align: center;
  padding: 2rem 0 .5rem 0;
}
  .title{
    margin-bottom: .5rem;
    font-size: .45rem;
  }
  .prompt {
    color: red;
  }
.m-btns {
  padding: 0 .1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;

.m-btn, .m-button {
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

.disable {
  background-color: #eda6a6;
}
}
.vCode {
  width: 100%;
  display: flex;
  img {
    width: 1.5rem;
    height: 1rem;
  }
}
</style>
