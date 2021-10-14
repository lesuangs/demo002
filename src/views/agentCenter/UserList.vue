<template>
  <div class="user-list-box">
    <Header :headObj="headObj" @leftClick="$router.push('/agentCenter')" @rightClick="timeShow=!timeShow"/>
    <van-search
            class="search-box"
            @search="onSearch"
            v-model="params.account"
            :placeholder="$t('lang.loginContent.PLZenterUserName')"
    />
    <NotData v-if="Number(listCount.length)===0" :isNotData="isNotData"/>
    <div class="g-content" v-else>
      <vue-better-scroll
              ref="Nscroll"
              :scrollbar="scrollbarObj"
              :pullDownRefresh="pullDownRefreshObj"
              :pullUpLoad="pullUpLoadObj"
              :startY="parseInt(startY)"
              @pulling-down="onPullingDown"
              @pulling-up="onPullingUp">
        <div class="user-list-con">
          <table>
            <tr>
              <th>{{ $t('lang.UserList.UserName') }}</th>
              <th>{{ $t('lang.UserList.userType') }}</th>
              <th>{{ $t('lang.UserList.registrationTime') }}</th>
              <th>{{ $t('lang.UserList.onlineStatus') }}</th>
              <!--            <th>{{ $t('lang.UserList.lastLoginTime') }}</th>-->
              <!--            <th>{{ $t('lang.common.Balance') }}</th>-->
              <!--            <th>{{ $t('lang.UserList.rebateLevel') }}</th>-->
              <!--            <th>{{ $t('lang.UserList.status') }}</th>-->
            </tr>
            <tr v-for="(item,index) in listCount" :key="index">
              <td><div>{{ item.account }}</div></td>
              <td>
                {{
                item.type == 'HY' ? (item.isDl == true ? $t('lang.UserList.proxy') : $t('lang.UserList.member')) : $t('lang.UserList.trialMember')
                }}
              </td>
              <td>{{ item.addTime }}</td>
              <td :class="item.online == true?'online':'offline'">
                {{ item.online == true ? $t('lang.UserList.Online') : $t('lang.UserList.Offline') }}
              </td>
              <!--            <td>{{ item.loginTime }}</td>-->
              <!--            <td>{{ item.money }}</td>-->
              <!--            <td>{{ item.rebate }}</td>-->
              <!--            <td v-if="item.state === 0">{{ $t('lang.UserList.Pending') }}</td>-->
              <!--            <td v-else-if="item.state ===1">{{ $t('lang.UserList.Enable') }}</td>-->
              <!--            <td v-else>{{ $t('lang.UserList.Deactivate') }}</td>-->
            </tr>
          </table>
        </div>
      </vue-better-scroll>
    </div>
    <div class="dialog">
      <van-popup
              class="mod-popup-box"
              v-model="timeShow"
              position="top"
              :style="{ height: '100%' }"
              :overlay-style="{backgroundColor:'rgba(0,0,0,.3)'}"
      >
        <div class="popup_body">
          <div class="inner">
            <DatePicker
                    :btnDanger="btnDanger"
                    :btnDefault="btnDefault"
                    :btnDefault1="btnDefault1"
                    :showPickerStart="showPickerStart"
                    :showPickerEnd="showPickerEnd"
                    :startTime="startTime" :endTime="endTime"
                    :startTime1="startTime1" :endTime1="endTime1"
                    :startTime2="startTime2" :endTime2="endTime2"
                    :type="type"
                    @clickLeftDate="(showPickerStart = true) && (showPickerEnd=false)"
                    @clickRightDate="(showPickerEnd = true) && (showPickerStart = false)"
                    @clickCloseStart="handlePickStartSure"
                    @clickCloseEnd="handlePickEndSure"
                    @clickCancelStart="handleStartCancel"
                    @clickCancelEnd="handleEndCancel"
                    @handleSubmit="handleSure"
                    @handleBtns="handleBtn"
                    @emitStarttime="handleEmitStart"
                    @emitEndtime="handleEmitEnd"
            />
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import Header from '@/commons/header/Header'
  import utils from "../../utils/utils";
  import NotData from "../../commons/notdata/NotData";
  import DatePicker from '@/commons/datePicker/DatePicker'
  import VueBetterScroll from "../../commons/scroll/BScroll";
  import {mapState} from 'vuex';
  export default {
    name: "UserList",
    components: {
      Header,
      NotData,
      DatePicker,
      VueBetterScroll
    },
    data() {
      return {
        headObj: {
          title: 'lang.daiLiZhongXin.userList',
          showArrow: true,
          iconName:' iconrili'
        },
        time: new Date(),
        listCount: [],
        isNotData: true,
        // type: '',
        timeShow: false,
        type: 'yesterday',
        btnDanger: 'default',
        btnDefault: 'danger',
        btnDefault1: 'default',
        showPickerStart: false,
        showPickerEnd: false,
        lastDay: 3600 * 1000 * 24,
        lastWeek: 3600 * 1000 * 24 * 8,
        lastMonth: 3600 * 1000 * 24 * 31,
        startTime: new Date(utils.dayStartTime(Date.now() - 3600 * 1000 * 24 * 8)),
        endTime: new Date(utils.dayEndTime(Date.now() - 3600 * 1000 * 24)),
        startTime1: new Date(),
        endTime1: new Date(),
        startTime2: new Date(),
        endTime2: new Date(),
        data: [],
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(2025, 10, 1),
        value:'',
        params: {
          page: 1,
          rows: 20,
          /*startDate: '',
          endDate: '',*/
          account:'',
          moneyFrom:'',
          moneyTo:'',
          subAccount: this.$store.state.userInformation.account,//当前登录的代理 用户名

        },
        // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
        scrollbarObj: {
          fade: true,
        },
        // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
        pullDownRefreshObj: {
          threshold: 90,
          stop: 40,
        },
        // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
        pullUpLoadObj: {
          threshold: 0,
          txt: {
            more: "加载更多",
            noMore: "没有更多数据了",
          },
        },
        startY: 0, // 纵轴方向初始化位置
      }
    },
    created() {
      // console.log(this.params.subAccount)
      this.initData(1,1);

    },
    computed:{
      ...mapState([
        'userInformation',
      ]),
    },
    methods: {
      // 下拉刷新
      onPullingDown() {
        setTimeout(() => {
          this.params['page'] = 1;
          this.initData(1, 1);
        }, 500);
      },
      // 上拉 加载更多数据
      onPullingUp() {
        setTimeout(() => {
          this.params['page']  = this.params['page']  + 1;
          this.initData(this.params['page'] , 2);
        }, 500);
      },
      initData(page,type){
        this.params['page'] = page;
        // let loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
        // this.params.subAccount = loginInfo.account;
        this.$http.account.queryUserList(this.params).then(res => {
          this.$toast.clear();
          // console.log(res,'queryUserList222222222222');
          this.totalCount = res.data.totalCount;
          this.listCount = type === 2 ? this.listCount.concat(res.data.data.records) : res.data.data.records;
          // console.log(this.listCount,'listCount')
          if(this.listCount.length === 0){
            this.isNotData = false;
          }else{
            let isForceUpdate = this.listCount.length === this.totalCount;
            setTimeout(() => {
              this.$refs.Nscroll.forceUpdate(!isForceUpdate);
            }, 100);
            this.isNotData = true;
          }
        }).catch(error => {
          // console.log(error,'hhhhhhhhhhhh');
        })
      },
      onSearch(){
        this.initData(1,1);
      },
      async getUserTeamOverDate(startDate, endDate) {
        // console.log(startDate, endDate);
        this.params['startDate'] = startDate + ' 00:00:00'
        this.params['endDate'] = endDate + ' 23:59:59'
        console.log(this.params);
        return new Promise((resolve, reject) => {
          // console.log('aaaaaaaaa')
          console.log(this.params);
          this.$http.account.queryUserList(this.params).then(res => {
            console.log(res);
            resolve(res)
          }).catch(error => {
            reject(error)
          })
        })
      },
      // picker确定开始时间判断
      handlePickStartSure(val) {
        if (val.getTime() > this.endTime.getTime() || val.getTime() > this.endTime1.getTime() || val.getTime() > this.endTime2.getTime()) {
          this.$toast(this.$t('lang.promotionRegistration.kaiShiShiJian'))
        }
        const dayTime = 3600 * 1000 * 24
        if ((this.endTime.getTime() - val.getTime()) > dayTime || (this.endTime1.getTime() - val.getTime()) > this.lastDay || (this.endTime2.getTime() - val.getTime()) > this.lastMonth) {
          this.btnDanger = 'default'
          this.btnDefault = 'default'
          this.btnDefault1 = 'default'
        }
        this.showPickerStart = false
        this.startTime = val
      },
      // picker确定结束时间判断
      handlePickEndSure(val) {
        const dayTime = 3600 * 1000 * 24
        if ((val.getTime() - this.startTime.getTime()) >= dayTime || (val.getTime() - this.startTime1.getTime()) >= this.lastDay || (val.getTime() - this.startTime2.getTime()) >= this.lastMonth) {
          this.btnDanger = 'default'
          this.btnDefault = 'default'
          this.btnDefault1 = 'default'
        }
        this.showPickerEnd = false
        this.endTime = val
      },
      // 弹层取消-开始
      handleStartCancel() {
        this.startTime = new Date(utils.dayStartTime(Date.now() - 3600 * 1000 * 24))
        this.startTime1 = new Date(utils.dayStartTime(Date.now() - this.lastWeek))
        this.startTime2 = new Date(utils.dayStartTime(Date.now() - this.lastMonth))
        this.showPickerStart = false
      },
      // 弹层取消-结束
      handleEndCancel() {
        this.endTime = new Date(utils.dayStartTime(Date.now() - 3600 * 1000 * 24))
        this.endTime1 = new Date(utils.dayEndTime(Date.now() - this.lastDay))
        this.endTime2 = new Date(utils.dayEndTime(Date.now() - this.lastDay))
        this.showPickerEnd = false
      },
      // picker组件computed-set
      handleEmitStart(val) {
        this.startTime = val
        this.startTime1 = val
        this.startTime2 = val
      },
      // picker组件computed-set
      handleEmitEnd(val) {
        this.endTime = val
        this.endTime1 = val
        this.endTime2 = val
      },
      // 所有时间恢复如初
      async restTime() {
        // console.log('111111111111')
        this.listCount = []
        // console.log(this.startTime.toLocaleDateString().replace(/\//g, '-'));
        let startDate = this.startTime.toLocaleDateString().replace(/\//g, '-')
        let endDate = this.endTime.toLocaleDateString().replace(/\//g, '-')
        // console.log(startDate, endDate,9999);
        const countData = await this.getUserTeamOverDate(startDate, endDate)
        // console.log(countData);
        if (countData.code === 200) {
          this.listCount = countData.data.data.records;
          if (this.listCount.length === 0) {
            this.isNotData = false
          }
        }
      },
      handleSure() {
        this.timeShow = false
        this.restTime()
      },
      changeType(item) {
        this.tranType = item.key
        const data = {
          startDate: this.startTime.toLocaleDateString().replace(/\//g, '-'),
          endDate: this.endTime.toLocaleDateString().replace(/\//g, '-'),
          page: 1,
          rows: 20,
          tranType: this.tranType
        }
        this.$http.account.queryPageBill(data).then((res, err) => {
          this.data = res.data
        }).catch((err) => {
          console.warn(err)
        })
        this.showMask = false
      },
      handleBtn(type) {
        this.type = type
        switch (type) {
          case 'yesterday':
            this.btnDanger = 'danger'
            this.btnDefault1 = 'default'
            this.btnDefault = 'default'
            this.startTime = new Date(utils.dayStartTime(Date.now() - this.lastDay))
            this.endTime = new Date(utils.dayEndTime(Date.now() - this.lastDay))
            break
          case 'week':
            this.btnDefault = 'danger'
            this.btnDanger = 'default'
            this.btnDefault1 = 'default'
            this.startTime1 = new Date(utils.dayStartTime(Date.now() - this.lastWeek))
            this.endTime1 = new Date(utils.dayEndTime(Date.now()))
            this.startTime = new Date(utils.dayStartTime(Date.now() - this.lastWeek))
            this.endTime = new Date(utils.dayEndTime(Date.now()))
            break
          case 'month':
            this.btnDefault1 = 'danger'
            this.btnDefault = 'default'
            this.btnDanger = 'default'
            this.startTime2 = new Date(utils.dayStartTime(Date.now() - this.lastMonth))
            this.endTime2 = new Date(utils.dayEndTime(Date.now()))
            this.startTime = new Date(utils.dayStartTime(Date.now() - this.lastMonth))
            this.endTime = new Date(utils.dayEndTime(Date.now()))
            break
          default:
            break
        }
      }
    },
    filters: {
      formatDate(val) {
        return utils.dateFormat(val, 2)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-list-box{
    height:100%;
    display: flex;
    flex-direction: column;
    /deep/.scroll-wrapper{
      position: relative;
    }
    .g-content{
      flex:1;
      overflow-y: scroll;
    }
    .search-box{
      margin-bottom: px2rem(10px);
    }
    .user-list-con{
      padding:0 px2rem(15px);
    }
    table{
      width:100%;
      td,th{
        height:px2rem(40px);
        font-size: px2rem(14px);
        padding:px2rem(8px) px2rem(5px);
        line-height: px2rem(20px);
        text-align: center;
        &.online{
          color:#20ba30;
        }
      }
      tr{
        td{
          vertical-align:middle;
        }
        td:first-child{
          div{
            width:80px;
            word-wrap:break-word;
          }
        }
        &:not(:first-child){
          &:after{
            content: '';
            display: flex;
            height:1px;
            background: #dfe0e1;
            position: absolute;
            left: px2rem(15px);
            right: px2rem(15px);
            transform: scaleY(0.5);
          }
        }
      }
    }

  }
  .skin-gray{
    .user-list-box{
      /deep/.trigger-text,/deep/.pullup-wrapper{
        color:#fff;
      }
      .search-box{
        background: $skin-gray-con-bg;
      }
      .user-list-con{
        background:$skin-gray-con-bg;
      }
      table{
        tr{
          th{
            color:#8f8f8f
          }
          td:not(.online){
            color:#fff;
          }
          &:not(:first-child){
            &:after{
              background:$skin-gray-border-color;
            }
          }
        }
      }
    }
  }
  .skin-black{
    .user-list-box{
      /deep/.trigger-text,/deep/.pullup-wrapper{
        color:#fff;
      }
      .search-box{
        background: $skin-black-con-bg;
      }
      .user-list-con{
        background:$skin-black-con-bg;
      }
      table{
        tr{
          th{
            color:#8f8f8f
          }
          td:not(.online){
            color:#fff;
          }
          &:not(:first-child){
            &:after{
              background:$skin-black-border-color;
            }
          }
        }
      }
    }
  }

/** {*/
/*  touch-action: pan-x !important;*/
/*}*/

/*table {*/
/*  width: 200%;*/
/*  overflow-x: auto;*/
/*  white-space: nowrap;*/
/*}*/
/*.g-content {*/
/*  background-color: #efeff4;*/
/*  white-space: nowrap;*/

/*}*/

/*.widthStyle {*/
/*  overflow-x: scroll;*/
/*  text-align: center;*/
/*  min-height: 16rem;*/
/*}*/

/*table {*/
/*  table-layout: fixed;*/
/*}*/

/*th {*/
/*  position: -webkit-sticky;*/
/*  position: sticky;*/
/*}*/

/*td {*/
/*  position: -webkit-sticky;*/
/*  position: sticky;*/
/*}*/

/*tr th:first-of-type {*/
/*  left: 0;*/
/*  z-index: 1;*/
/*  width: 200px;*/
/*  background-color: inherit;*/
/*}*/

/*tr td:first-of-type {*/
/*  left: 0;*/
/*  z-index: 1;*/
/*  width: 200px;*/
/*  background-color: inherit;*/
/*}*/
/*table.imagetable {*/
/*  font-family: verdana, arial, sans-serif;*/
/*  font-size: 11px;*/
/*  color: #333333;*/
/*  border-collapse: collapse;*/

/*}*/

/*table.imagetable th {*/
/*  padding: 8px;*/
/*  width: 2rem;*/
/*  border-right: 1px solid rgb(248,247,249);*/
/*}*/
/*table.imagetable td {*/
/*  padding: 8px;*/
/*  border-right: 1px solid rgb(248,247,249);*/

/*}*/
/*tr:nth-child(odd) {*/
/*  background-color: rgb(255,255,255);*/
/*}*/
/*tr:nth-child(even) {*/
/*  background-color: rgb(247, 247, 247);*/
/*}*/
/*th { left:0; width:200px}*/
/*th, td {*/
/*  text-align:center;*/
/*  vertical-align:middle;*/
/*  width:150px;*/
/*}*/
/*th {*/
/*  padding:10px;*/
/*}*/

/*th {*/
/*  width: .3rem;*/
/*  line-height: .5rem;*/
/*  background-color: #efeff4;*/
/*}*/
/*td {*/
/*  text-align: center;*/
/*}*/
</style>
