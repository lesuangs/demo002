<template>
  <div class="bodyStyle">
    <Header :headObj="headObj" @leftClick="$router.push('/promotionRegistration')"/>
    <NotData v-if="Object.keys(pageData).length===0" :isNotData="isNotData"/>
    <div v-else>
      <van-cell-group>
        <i @click="copyText(pageData.externalUrl ? pageData.externalUrl + '/'+ pageData.id : fullPath + '/' + pageData.id)"
           class="copyTap">
          <van-icon name="column"/>
        </i>
        <van-field
          :value="IsPC()?fullPath  + urlType.webPath + '?' + pageData.code :fullPath  + urlType.wapPath + '?' + pageData.code"
          label="推广连接"
          readonly
        />

        <van-field
          :value="pageData.code"
          label="推广码"
          readonly
        />
        <van-field
          :value="pageData.spreadTypeName"
          label="推广页面"
          readonly
        />
        <van-field
          :value="pageData.addTime"
          label="发布时间"
          readonly
        />
        <van-field
          :value="pageData.visitCount"
          label="访问量"
          readonly
        />
        <van-field
          :value="pageData.registCount"
          label="注册数"
          readonly
        />
        <van-field
          :value="pageData.userType == 0? '用户' : '代理'"
          label="推广目标"
          readonly
        />
        <van-field
          :value="rebate"
          label="返水比率"
          readonly
        />
      </van-cell-group>
      <textarea value="" id="copyInput" style="font-size: 0;border:none;position: absolute;top: 0"></textarea>
    </div>
  </div>
</template>

<script>
import Header from '@/commons/header/Header'
import NotData from "../../commons/notdata/NotData";

export default {
    name: "Detailedinformation",
    components: {
      Header,
      NotData,
    },
    data() {
      return {
        headObj: {
          title: '详情',
          showArrow: true
        },
        pageData:{},
        fullPath:'',
        rebate:'',
        isNotData:true,
        urlType:{}
      }
    },
    created() {
      let param = {date: new Date().getTime()}
      console.log(param);
      this.$http.account.getspreadPage(param).then(res => {
        this.urlType = res.data[0]
      }).catch(err => {
        console.log(err);
      })
      console.log(this.$route.query.id);
      this.fullPath = 'http://' + window.location.host
      let params = this.$route.query
      console.log(params);
      this.$http.account.getDetale(params).then(res=>{
        console.log(res);
        this.pageData =res.data
        this.rebate = res.data.rebate
        console.log(this.rebate);
      }).catch(err=>{
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
      copyText(val) {
        console.log(val)
        var input = document.getElementById('copyInput')
        input.value = val
        console.log(input.value);
        input.select()
        document.execCommand("copy")
      }
    }
  }
</script>

<style scoped>
  .bodyStyle {
    color:rgb(149,149,149)
  }
  .copyTap {
    color: #3F8FEB;
    margin: 0 .2rem;
    position: relative;
    top: .6rem;
    left: 6rem;
    z-index: 999;
  }
</style>
