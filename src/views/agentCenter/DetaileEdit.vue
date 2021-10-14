<template>
  <div class="bodyStyle">
    <Header :headObj="headObj" @leftClick="$router.push('/promotionRegistration')"/>
    <NotData v-if="Object.keys(editData).length===0" :isNotData="isNotData"/>
   <div v-else>
     <van-cell-group>
       <i
         @click="copyText(editData.externalUrl ? editData.externalUrl + '/'+ editData.id : fullPath + '/' + editData.id)"
         class="copyTap">
         <van-icon name="column"/>
       </i>
       <van-field
         :value="IsPC()===true?fullPath + urlType.webPath + '?' + editData.code:fullPath + urlType.wapPath + '?' + editData.code "
         label="推广连接"
         readonly
       />

       <van-field
         :value="editData.code"
         label="推广码"
         readonly
       />
       <!--      <van-field-->
       <!--        :value="routerParams.spreadTypeName"-->
       <!--        label="推广页面"-->
       <!--        readonly-->
       <!--      />-->
       <div style="display: flex;align-items: center;padding-left: .31rem;font-size: .27rem;">
         <div style="margin-right: .6rem;">推广页面</div>
         <div>
           <van-dropdown-menu>
             <van-dropdown-item :value="valueSprea" :options="optionSprea"/>
           </van-dropdown-menu>

         </div>
       </div>
       <van-field
         :value="editData.addTime"
         label="发布时间"
         readonly
       />
       <van-field
         :value="editData.visitCount"
         label="访问量"
         readonly
       />
       <van-field
         :value="editData.registCount"
         label="注册数"
         readonly
       />
       <div style="display: flex;align-items: center;padding-left: .31rem;font-size: .27rem">
         <div style="margin-right: .6rem;">推广目标</div>
         <div>
           <van-dropdown-menu>
             <van-dropdown-item v-model="value2" :options="option2"/>
           </van-dropdown-menu>
         </div>
       </div>
       <div style="display: flex;align-items: center;padding:0 0.32rem;margin-top: .2rem;background-color: #fff;">
         <div style="width: 1.8rem;color: #cc0000">*奖金设置</div>
         <van-dropdown-menu ref="rebate">
           <van-dropdown-item v-model="value" :options="option"/>
         </van-dropdown-menu>
       </div>
     </van-cell-group>
     <div class="m-btns">
       <van-button class="m-button" @click="sendDetail">
         下一步
       </van-button>
     </div>
     <textarea value="" id="copyInput" style="font-size: 0;border:none;position: absolute;top: 0"></textarea>
   </div>
  </div>
</template>

<script>
import Header from '@/commons/header/Header'
import NotData from "../../commons/notdata/NotData";

export default {
    name: "DetaileEdit",
    components: {
      Header,
      NotData
    },
    data() {
      return {
        headObj: {
          title: '编辑',
          showArrow: true
        },
        editData: {},
        fullPath: '',
        valueSprea: '',
        optionSprea: [],
        value2: 0,
        option2: [
          {text: '会员', value: 0},
          {text: '代理', value: 1},
        ],
        value: '',
        option: [],
        isNotData:true,
        urlType:{}
      }
    },
    created() {
      let param = this.$route.query
      console.log(param);
      this.$http.account.getDetale(param).then(res=>{
        console.log(res);
        this.editData = res.data
        this.value2 = res.data.userType
        this.valueSprea = res.data.spreadType
      }).catch(err=>{
        console.log(err);
      })
      this.fullPath = 'http://' + window.location.host
      this.getParams()
      //推广页面
      let params = {date: new Date().getTime()}
      console.log(params);
      this.$http.account.getspreadPage(params).then(res => {
        this.urlType = res.data[0]
        console.log(res.data);

        res.data.forEach((val, index) => {
          console.log(val);
          console.log(index);
          this.optionSprea.push(
            {text: val.name, value: val.id}
          )
        })
        console.log(this.optionSprea);
      }).catch(err => {
        console.log(err);
      })
      //资金设置
      this.$http.home.getConfigDate().then(res => {
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
                  this.option.push({value: r, text: r.toFixed(1) + '% ----- ' + l})
                  if (i === max - 1) {
                    this.value = r
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
      })
    },
    methods: {
      IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
          "SymbianOS", "Windows Phone",
          "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
          }
        }
        return flag;
      },
      getParams() {
        // 取到路由带过来的参数
        this.routerParams = this.$route.params.item
        // 将数据放在当前组件的数据内
        console.log(this.routerParams);
        this.value2 = this.editData.userType
      },
      copyText(val) {
        console.log(val)
        let input = document.getElementById('copyInput')
        input.value = val
        console.log(input.value);
        input.select()
        document.execCommand("copy")
      },
      sendDetail() {
        let params = {
          id: this.routerParams.id,
          rebate: this.value,
          spreadType:this.valueSprea,
          userType: this.value2,

        }
        this.$http.account.sendDetaleData(params).then(res => {
          console.log(res);
          this.$toast.success('编辑成功')
          this.$router.push('/promotionRegistration')
        }).catch(err => {
          console.log(err);
        })
      }

    }
  }
</script>

<style scoped>
  .copyTap {
    color: #3F8FEB;
    margin: 0 .2rem;
    position: relative;
    top: .6rem;
    left: 6rem;
    z-index: 999;
  }

  .m-btns {
    padding-top: .75rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

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
</style>
