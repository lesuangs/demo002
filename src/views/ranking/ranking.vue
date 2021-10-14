<template>
  <div class="ranking-box">
    <Header :headObj="headObj"
            @leftClick="$router.go(-1)"></Header>
    <div class="list-wrapper">
      <div class="tab-nav-box-line">
        <ul>
          <li v-for="(v,i) in navList" :key="i"
              :class="{'active': activeIdx === i}"
              @click="changeTab(v,i)">
            <span>{{$t(v.label)}}</span>
          </li>
        </ul>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-con" v-if="activeIdx === 0">
          <ul v-if="list.length>0">
            <li v-for="(item,index) in list" :key="index">
              <div class="rank-left">
                <div class="avatar">
                  <img :src="imgAddress + item.userimg + '.png'" alt="">
<!--                  <img :src="imgUrl+item.userimg+'.png'" alt="">-->
                </div>
                <div class="content">
                  <span class="name">{{item.name}}</span>
                  <p>
                    <i18n path="lang.ranking.in" class="lottery-name">
                      <template #game>
                        <span>{{item.gameName}}</span>
                      </template>
                    </i18n>
                    <span class="money">¥ {{item.winMoney}}</span>
                  </p>
                </div>
              </div>
              <i class="iconfont iconic-right"></i>
            </li>
          </ul>
          <div class="no-data" v-else>
            <noData :isNotData="isNotData"></noData>
          </div>
        </div>
        <div class="ranking-con" v-if="activeIdx === 1">
          <template v-if="list.length>0">
            <div class="top-three">
              <ul>
                <li v-for="(item,index) in list.slice(0,3)" :key="index" :class="'top-img'+index">
                  <div>
                  <span>
                    <img :src="imgAddress + item.userimg + '.png'" alt="">
<!--                      <img :src="imgUrl+item.userimg+'.png'" alt="">-->
                  </span>
                  </div>
                  <h1>{{item.name}}</h1>
                  <p>￥ {{item.winMoney}}</p>
                </li>
              </ul>
            </div>
            <ul>
              <li v-for="(item,index) in list.slice(3)" :key="index">
                <div class="rank-left">
                  <div class="avatar">
                    <img :src="imgAddress + item.userimg + '.png'" alt="">
<!--                    <img :src="imgUrl+item.userimg+'.png'" alt="">-->
                  </div>
                  <div class="content">
                    <span class="name">{{item.name}}</span>
                    <p>
                      <i18n path="lang.ranking.in" class="lottery-name">
                        <template #game>
                          <span>{{item.gameName}}</span>
                        </template>
                      </i18n>
                      <span class="money">¥ {{item.winMoney}}</span>
                    </p>
                  </div>
                </div>
                <i class="iconfont iconic-right"></i>
              </li>
            </ul>
          </template>
          <div class="no-data" v-else>
            <noData :isNotData="isNotData"></noData>
          </div>
        </div>

      </div>
      <!--<div class="loading">-->
        <!--<loading></loading>-->
      <!--</div>-->
    </div>
    <Footer :actived="active"/>
  </div>
</template>

<script>
  import Header from '../../commons/header/Header'
  import {mapState,mapActions,mapMutations} from 'vuex'
  import {imgUrl} from "../../utils/mode";
  import noData from '../../commons/notdata/NotData';
  import loading from '../../commons/loading';
  import Footer from '../../commons/footer/Footer'
  export default {
    name: "ranking",
    data() {
      return {
        imgUrl: imgUrl.avatar,
        headObj: {
          title: 'lang.ranking.title',
          showArrow: false
        },
        active: 3,
        activeIdx:0,
        isNotData:true,
        navList:[
          {label:'lang.ranking.navList[0]',value:''},
          {label:'lang.ranking.navList[1]',value:1}
          ]
      }
    },
    components: {
      Header,noData,loading,Footer
    },
    computed: {
      list() {
        return this.winningList;
      },
      ...mapState([
        'winningList',
        'imgAddress',
      ])
    },
    methods:{
      ...mapActions([
        'getWinningList'
      ]),
      ...mapMutations({
        setData: 'SET_DATA',
      }),
      changeTab(v,i){
        this.isNotData = true;
        this.setData({key: 'winningList', value: []});
        this.activeIdx = i;
        let params = {
          model:1
        };
        if(v.value === 1){
          this.getWinningList(params).then((res) => {
            if(res.status === 200){
              this.isNotData = false;
            }
          }).catch((err) => {
            this.isNotData = false;
          });
        }else{
          this.getWinningList().then((res) => {
            if(res.status === 200){
              this.isNotData = false;
            }
          }).catch((err) => {
            this.isNotData = false;
          });
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .ranking-box {
    /*background-color: #191b1f;*/
    /*height: calc(100vh - 125px);*/
    height:100%;
    display: flex;
    flex-direction: column;
    .list-wrapper {
      position: relative;
      height: 100%;
      /*overflow: scroll;*/
      /*padding-bottom:px2rem(80px);*/
      display: flex;
      flex-direction: column;
      .ranking-wrap{
        flex:1;
        padding-bottom: 130px;
        overflow-y: scroll;
        .no-data{
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          .no-data-wrapper{
            width: 40%;
          }
        }
      }
      .loading{
        width: 100%;
        height: 100%;
      }
    }
    .ranking-con{
      padding:0 15px;
      >ul {
        /*width: 100%;*/
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 70px;
          border-bottom: 1px solid #393940;
          .avatar {
            width: 40px;
            height: 40px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .rank-left{
            display: flex;
          }
          >.iconfont{
            color:#8F8F8F;

          }
          .content {
            height: 40px;
            margin: 0 0 0 15px;
            .name {
              color: #fff;
              line-height: 20px;
              font-size: 15px;
            }
            p {
              line-height: 20px;
              .lottery-name {
                color: #8f8f8f;
                font-size: 12px;
              }
              .money {
                margin: 0 0 0 12px;
                color: #ff2525;
                font-size: 16px;
              }
            }
          }
        }
      }
      .top-three{
        background: #333441;
        border-radius: 10px;
        padding:20px 15px;
        margin:15px 0;
        >ul{
          display: flex;
          position: relative;
          min-height: 135px;
          li{
            width:33.33%;
            color:#fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            position: absolute;
            div{
              min-height: 90px;
              span{
                position: relative;
                width:60px;
                height:80px;
                background: url("../../assets/img/rank/top_two_bg.png") no-repeat;
                background-size: 100% 100%;
                display: flex;
                justify-content: center;
              }
              img{
                position: absolute;
                width:35px;
                height:35px;
                bottom:10px;
                border-radius: 50%;
              }
            }
            &.top-img0{
              left:33%;
              div{
                span{
                  top:-5px;
                  width:70px;
                  height:90px;
                  background: url("../../assets/img/rank/top_one_bg.png") no-repeat;
                  background-size: 100% 100%;
                  img{
                    width:45px;
                    height:45px;
                    bottom:8px;
                  }
                }

              }
            }
            &.top-img1{
              left:0px;
            }
            &.top-img2{
              right:0px;
              div{
                span{
                  background: url("../../assets/img/rank/top_three_bg.png") no-repeat;
                  background-size: 100% 100%;
                }

              }
            }
            h1{
              color:#9a9aa7;
              margin:10px 0;
              font-size:14px;
            }
            p{
              color:#ff2525;
            }
            .top-img{

            }
          }
        }
      }
    }
  }
  .skin-gray{
    .ranking-box{
      .ranking-con{
        .top-three{
          background: $skin-gray-con-bg;
          >ul{
            li h1 {
              color:#fff;
            }
            /*p {*/
            /*  color: gray;*/
            /*}*/
          }
        }
        >ul{
          li{
            border-color:$skin-gray-border-color;
          }
        }
      }
    }

  }



</style>
