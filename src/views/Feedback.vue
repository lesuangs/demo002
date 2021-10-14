<template>
  <div class="introduce feed-back-box">
    <Header :headObj="headObj" @leftClick="$router.push('/helpCenter')"/>
    <div class="g-content">
      <van-form @submit="onSubmit">
        <div class="g-radio">
          <van-radio-group v-model="messageTitle" direction="horizontal">
            <van-radio name="1" icon-size="14">
              {{$t('lang.feedback.radioBug')}}
              <template #icon="props">
                <div class="img-icon" :class="[props.checked ? 'activeIcon' : '']"/>
              </template>
            </van-radio>
            <van-radio name="2" icon-size="14">
              {{$t('lang.feedback.radioBet')}}
              <template #icon="props">
                <div class="img-icon" :class="[props.checked ? 'activeIcon' : '']"/>
              </template>
            </van-radio>
            <van-radio name="3" icon-size="14">
              {{$t('lang.feedback.radioOther')}}
              <template #icon="props">
                <div class="img-icon" :class="[props.checked ? 'activeIcon' : '']"/>
              </template>
            </van-radio>
          </van-radio-group>
        </div>
        <div class="g-textarea">
          <div class="textarea">
            <van-field
                v-model="messageContent"
                rows="7"
                autosize
                type="textarea"
                maxlength="200"
                :placeholder="$t('lang.feedback.placeContentCon')"
                show-word-limit
            />

          </div>
          <div class="upload">
<!--            <van-uploader v-model="images"-->
<!--                          :upload-text="$t('lang.feedback.addImg')">-->
<!--            </van-uploader>-->
            <van-uploader v-model="images">
              <div class="uploader-con">
                <i class="iconfont iconicons-ic-addpic"></i>
                <p>{{$t('lang.feedback.addImg')}}</p>
              </div>
            </van-uploader>
          </div>
        </div>
        <div class="connect">
          <van-field
              v-model="contacts"
              type="text"
              :label="$t('lang.feedback.labelContact')"
              :placeholder="$t('lang.feedback.addPhone')"
          />
        </div>
        <div class="step-button-box">
          <button class="btn-type2"
                  native-type="submit"
                  :disabled="!isCheck"
                  :class="isCheck ? '':'disable'">{{$t('lang.common.submit')}}</button>
        </div>
<!--        <van-button round block type="info"-->
<!--                    native-type="submit"-->
<!--                    :class="isCheck ? '11':'22'">提交</van-button>-->
      </van-form>

    </div>
  </div>
</template>

<script>
import Header from '../commons/header/Header'
import {REG_RULE} from '../api/rule'
export default {
  name: 'Feedback',
  components: {
    Header
  },
  data() {
    return {
      headObj: {
        title: this.$t('lang.feedback.title'),
        showArrow: true,
      },
      // radio: '1',
      // message: '',
      // inputMsg: '',
      // fileList: [],
      messageTitle:'1',//反馈标题
      messageContent:'',//反馈内容
      images:[],//反馈图片，多图片用逗号隔开
      contacts:'',//联系方式
    }
  },
  computed:{
    isCheck(){
      if(this.messageContent && this.contacts){
        return true;
      }else{
        return false;
      }
    },
    phone() {
      //验证手机号,暂时不用，因为还可以输入邮箱
      return REG_RULE.mobile.reg.test(this.contacts)
    }
  },
  methods: {
    onSubmit() {
      let imgUrl = '';
      for(let value of this.images){
        imgUrl += value.content+',';
      }
      imgUrl = imgUrl.substring(0,imgUrl.length-1);//去掉最后的一个逗号
      // console.log(imgUrl,222)
      const params = {
        messageTitle: this.messageTitle,
        messageContent:this.messageContent,
        contacts:this.contacts,
        images:imgUrl,
      };
      this.$http.home.getaveHelpMessage(params).then((res) => {
        // console.log(res,'res')
        this.$toast.success(this.$t('lang.common.submited'));
        this.initData();
      }).catch((err) => {
        this.$toast.fail({message: err, forbidClick: true});
      });
    },
    initData(){
      this.messageTitle = '1';
      this.messageContent = '';
      this.images = [];
      this.contacts = '';

    }
  }
}
</script>

<style lang="scss" scoped>
  .feed-back-box{
    height:100%;
    display: flex;
    flex-direction: column;
    .g-content{
      flex:1;
      overflow-y: scroll;
    }
    .step-button-box{
      margin:px2rem(60px) 0;
    }
    /deep/.van-field__control{
      color:#fff;
    }
    .g-textarea{
      padding:px2rem(15px);
      /*min-height: px2rem(250px);*/

      .textarea {
        position: relative;
      }
      /*.upload {*/
      /*  position: absolute;*/
      /*  top: 200px;*/
      /*}*/
    }
    /deep/.upload{
      margin-top: px2rem(15px);
      .uploader-con{

        width:1.56rem;
        height:1.56rem;
        border-radius: 4px;
        border: solid 1px #404048;
        background-color: #333441;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .iconfont{
          color:#4A4A59;
          font-size:28px;
        }
        p{
          color:#9a9aa7;
          font-size:13px;
          margin-top: 10px;
        }
      }
      /*max-width: 80%;*/

    }
    /deep/.van-uploader__preview-image,/deep/.van-uploader__upload{
      width:px2rem(78px);
      height:px2rem(78px);
    }
  }
  .skin-gray{
    .feed-back-box{
      .g-textarea,/deep/.van-cell{
        background: $skin-gray-con-bg;
      }
    /*  /deep/.van-uploader__upload{
        background: #5A586F;
        border:1px #62607C solid;
      }*/
      /deep/.upload{
        .uploader-con{
          background: #5A586F;
          border:1px #62607C solid;
          .iconfont{
            color:#7A798B;
          }
        }
        /*max-width: 80%;*/

      }
    }
  }

  .skin-black{
    .feed-back-box{
      .g-textarea,/deep/.van-cell{
        background: $skin-black-con-bg;
      }
      /deep/.van-uploader__upload{
        background: #333441;
        border:1px #3E3E46 solid;
      }
    }
  }



.introduce {
  /*display: flex;*/
  /*flex-direction: column;*/

  .g-content {
    /*flex: 1;*/
    /*overflow: scroll;*/
    /*min-height: 13rem;*/
    /*background-color: #f5f5f9;*/

    .g-radio {
      font-size: .28rem;
      color: #000;
      line-height: 1.1rem;
      height: 1.1rem;

      .van-radio-group {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }

    .g-textarea {
      /*height: 4.76rem;*/
      /*background: #fff;*/
    }

    .textarea {
      /*padding: 0 .2rem;*/

      .van-cell {
        padding: 0;
        height: 100%;
      }
    }

    ::v-deep.upload {
    /*  position: relative;
      top: -1.3rem;
      left: .4rem;*/

      /*.van-uploader__upload {*/
      /*  background: #ccc;*/
      /*}*/
    }

    .connect {
      width: 100%;
      margin-top: .2rem;
      font-size: .28rem;
      height: .9rem;
      line-height: .9rem;

      .van-field {
        padding-left: .2rem;
      }
    }
  }
}
</style>
