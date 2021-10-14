<template>
  <div class="trend">
    <!--<Header :headObj="headObj"-->
    <!--@leftClick="$router.go(-1)"></Header>-->
    <div class="header-wrapper">
      <!--<i class="iconfont iconic-left" @click="$router.go(-1)"></i>-->
      <i class="iconfont iconic-left" @click="goBack()"></i>
      <span>{{title}}</span>
      <i></i>
    </div>
    <div class="trend-wrapper" v-if="bodyList.length>0">
      <!--k3-->
      <div class="k3-wrapper"
           v-if="lotteryInfo && (lotteryType.k3 === lotteryInfo.type)">
        <ul class="tab-wrapper">
          <li v-for="(item,index) in K3_tabs">
            <div @click="switchTabs(item.value)"
                 :class="item.value === k3_value?'active':''">{{item.text}}
            </div>
          </li>
        </ul>
        <div class="main-content">
          <div class="sum-item"
               v-if="bodyList.length>0 && lotteryInfo && (k3_value === '3')">
            <ul class="title">
              <li v-for="(item) in k3_title_sum">
                {{item}}
              </li>
            </ul>
            <ul class="content-wrapper">
              <li v-for="(item,index) in bodyList">
                <ul>
                  <li>{{item.issue}}</li>
                  <li>
                    <span v-for="(numItem) in item.openNum"
                          :class="`dic_${numItem}`"></span>
                  </li>
                  <li>{{_calcBall(item.openNum).total}}</li>
                  <li :class="{ 'active': _calcBall(item.openNum).bigSmall === '大' }">{{_calcBall(item.openNum).bigSmall}}</li>
                  <li :class="{ 'active': _calcBall(item.openNum).oddEVEN === '双' }">{{_calcBall(item.openNum).oddEVEN}}</li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="position-item"
               v-if="bodyList.length>0 && lotteryInfo && (['0','1','2'].includes(k3_value))">
            <ul class="title">
              <li>{{k3_title_position[0]}}</li>
              <li class="number-position">
                <span v-for="(item) in k3_number">{{item}}</span>
              </li>
            </ul>
            <div class="content-wrapper">
              <ul ref="list" class="list-wrapper">
                <li v-for="(item,index) in bodyList">
                  <ul ref="item">
                    <li>{{item.issue}}</li>
                    <li>
                      <div v-for="(numItem) in item.bodyArr.slice(0,6)">
                      <span :class="formatNumber(numItem,item,'class')">
                        {{formatNumber(numItem,item)}}
                      </span>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
              <canvas id="drawTrend_k3"></canvas>
            </div>
          </div>
        </div>
      </div>
      <!--ssc-->
      <div class="ssc-wrapper"
           v-if="lotteryInfo && (lotteryType.ssc === lotteryInfo.type)">
        <ul class="tab-wrapper">
          <li v-for="(item,index) in ssc_tabs">
            <div @click="switchTabs(item.value)"
                 :class="item.value === ssc_value?'active':''">{{item.text}}
            </div>
          </li>
        </ul>
        <div class="main-content">
          <div class="position-item"
               v-if="bodyList.length>0 && lotteryInfo">
            <ul class="title">
              <li v-for="(item) in ssc_title">
                <span>{{item}}</span>
              </li>
            </ul>
            <div class="content-wrapper">
              <ul ref="list_ssc" class="list-wrapper">
                <li v-for="(item,index) in bodyList">
                  <ul ref="item_ssc">
                    <li>{{item.issue}}</li>
                    <li>
                      <div v-for="(numItem,numberIndex) in item.bodyArr.slice(Number(ssc_value)*10,Number(ssc_value)*10+10)">
                      <span :class="formatNumber(numItem,item,'class')">
                        {{formatNumber(numItem,item)}}
                      </span>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
              <canvas id="drawTrend_ssc"></canvas>
            </div>
          </div>
        </div>
      </div>
      <!--pk10-->
      <div class="pk10-wrapper"
           v-if="lotteryInfo && (lotteryType.pk10 === lotteryInfo.type)">
        <ul class="tab-wrapper">
          <li v-for="(item,index) in pk10_tabs" :key="index">
            <div @click="switchTabs(item.value)"
                 :class="item.value === pk10_value?'active':''">{{item.text}}
            </div>
          </li>
        </ul>
        <div class="main-content">
          <div class="position-item"
               v-if="bodyList.length>0 && lotteryInfo">
            <ul class="title">
              <li v-for="(item) in pk10_title">
                <span>{{item}}</span>
              </li>
            </ul>
            <div class="content-wrapper">
              <ul ref="list_pk10" class="list-wrapper">
                <li v-for="(item,index) in bodyList">
                  <ul ref="item_pk10">
                    <li>{{item.issue}}</li>
                    <li>
                      <div v-for="(numItem,numberIndex) in item.bodyArr.slice(Number(pk10_value)*10,(Number(pk10_value)*10)+10)">
                      <span :class="formatNumber(numItem,item,'class')">
                        {{formatNumber(numItem,item)}}
                      </span>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
              <canvas id="drawTrend_pk10"></canvas>
            </div>
          </div>
        </div>
      </div>
      <!--11x5-->
      <div class="eleven5-wrapper"
           v-if="lotteryInfo && (lotteryType.eleven5 === lotteryInfo.type)">
        <ul class="tab-wrapper">
          <li v-for="(item,index) in eleven5_tabs">
            <div @click="switchTabs(item.value)"
                 :class="item.value === eleven5_value?'active':''">{{item.text}}
            </div>
          </li>
        </ul>
        <div class="main-content">
          <div class="position-item"
               v-if="bodyList.length>0 && lotteryInfo">
            <ul class="title">
              <li v-for="(item) in eleven5_title">
                <span>{{item}}</span>
              </li>
            </ul>
            <div class="content-wrapper">
              <ul ref="list_eleven5" class="list-wrapper">
                <li v-for="(item,index) in bodyList">
                  <ul ref="item_eleven5">
                    <li>{{item.issue}}</li>
                    <li>
                      <div v-for="(numItem,numberIndex) in item.bodyArr.slice(Number(eleven5_value) * 11,(Number(eleven5_value)*11)+11)">
                      <span :class="formatNumber(numItem,item,'class')">
                        {{formatNumber(numItem,item)}}
                      </span>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
              <canvas id="drawTrend_eleven5"></canvas>
            </div>
          </div>
        </div>
      </div>
      <!--fc3d-->
      <div class="fc3d-wrapper"
           v-if="lotteryInfo && (lotteryType.fc3d === lotteryInfo.type)">
        <ul class="tab-wrapper">
          <li v-for="(item,index) in fc3d_tabs">
            <div @click="switchTabs(item.value)"
                 :class="item.value === fc3d_value?'active':''">{{item.text}}
            </div>
          </li>
        </ul>
        <div class="main-content">
          <div class="position-item"
               v-if="bodyList.length>0 && lotteryInfo">
            <ul class="title">
              <li v-for="(item) in fc3d_title">
                <span>{{item}}</span>
              </li>
            </ul>
            <div class="content-wrapper">
              <ul ref="list_fc3d" class="list-wrapper">
                <li v-for="(item,index) in bodyList">
                  <ul ref="item_fc3d">
                    <li>{{item.issue}}</li>
                    <li>
                      <div v-for="(numItem,numberIndex) in item.bodyArr.slice(Number(fc3d_value)*10,Number(fc3d_value)*10+10)">
                      <span :class="formatNumber(numItem,item,'class')">
                        {{formatNumber(numItem,item)}}
                      </span>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
              <canvas id="drawTrend_fc3d"></canvas>
            </div>
          </div>
        </div>
      </div>
      <!--lhc-->
      <div class="lhc-wrapper"
           v-if="lotteryInfo && (lotteryType.lhc === lotteryInfo.type)">
        <div class="main-content">
          <div class="position-item"
               v-if="bodyList.length>0 && lotteryInfo">
            <ul class="title">
              <li v-for="(item) in common_title">
                <span>{{item}}</span>
              </li>
            </ul>
            <div class="content-wrapper">
              <ul class="list-wrapper">
                <li v-for="(item) in bodyList">
                  <ul>
                    <li>
                      <span>{{item.issue}}</span>
                      <!--                      <i>{{item.openDateTime.substr(5,item.openDateTime.length-1)}}</i>-->
                    </li>
                    <li>
                      <div v-for="(itemNum) in item.openNum.slice(0,6)">
                        <span :class="LHCBallClass(itemNum)">{{itemNum}}</span>
                        <i>{{_animalClass(itemNum,'text')}}</i>
                      </div>
                      <div class="add">
                        <b>+</b>
                      </div>
                      <div v-for="(itemNumLast) in item.openNum.slice(6)">
                        <span :class="LHCBallClass(itemNumLast)">{{itemNumLast}}</span>
                        <i>{{_animalClass(itemNumLast,'text')}}</i>
                      </div>
                    </li>
                    <!--<li>-->
                    <!--<div v-for="(numItem,numberIndex) in item.bodyArr.slice(Number(ssc_value)*10,Number(ssc_value)*10+10)">-->
                    <!--<span :class="formatNumber(numItem,item,'class')">-->
                    <!--{{formatNumber(numItem,item)}}-->
                    <!--</span>-->
                    <!--</div>-->
                    <!--</li>-->
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!--pcdd-->
      <div class="pcdd-wrapper"
           v-if="lotteryInfo && (lotteryType.pcdd === lotteryInfo.type)">
        <div class="main-content">
          <div class="position-item"
               v-if="bodyList.length>0 && lotteryInfo">
            <ul class="title">
              <li v-for="(item) in common_title">
                <span>{{item}}</span>
              </li>
            </ul>
            <div class="content-wrapper">
              <ul class="list-wrapper">
                <li v-for="(item) in bodyList">
                  <ul>
                    <li>
                      <span>{{item.issue}}</span>
                      <!--                      <i>{{item.openDateTime.substr(5,item.openDateTime.length-1)}}</i>-->
                    </li>
                    <li>
                      <div>
                        <span :class="PCDD_ballClass(item.openNum[0])">{{item.openNum[0]}}</span>
                      </div>
                      <div class="add">
                        <b>+</b>
                      </div>
                      <div>
                        <span :class="PCDD_ballClass(item.openNum[1])">{{item.openNum[1]}}</span>
                      </div>
                      <div class="add">
                        <b>+</b>
                      </div>
                      <div>
                        <span :class="PCDD_ballClass(item.openNum[2])">{{item.openNum[2]}}</span>
                      </div>
                      <div class="add">
                        <b>=</b>
                      </div>
                      <div>
                        <span :class="PCDD_ballClass(_calcBall(item.openNum).total)">{{_calcBall(item.openNum).total}}</span>
                      </div>
                    </li>
                    <!--<li>-->
                    <!--<div v-for="(numItem,numberIndex) in item.bodyArr.slice(Number(ssc_value)*10,Number(ssc_value)*10+10)">-->
                    <!--<span :class="formatNumber(numItem,item,'class')">-->
                    <!--{{formatNumber(numItem,item)}}-->
                    <!--</span>-->
                    <!--</div>-->
                    <!--</li>-->
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!--kl8 快乐彩-->
      <div class="common-wrapper"
           v-if="lotteryInfo && (lotteryType.bjkl8 === lotteryInfo.type || lotteryType.klc === lotteryInfo.type || lotteryType.klsf === lotteryInfo.type)">
        <div class="main-content">
          <div class="position-item"
               v-if="bodyList.length>0 && lotteryInfo">
            <ul class="title">
              <li v-for="(item) in common_title">
                <span>{{item}}</span>
              </li>
            </ul>
            <div class="content-wrapper">
              <ul class="list-wrapper">
                <li v-for="(item) in bodyList">
                  <ul>
                    <li>
                      <span>{{item.issue}}</span>
                      <!--                      <i>{{item.openDateTime.substr(5,item.openDateTime.length-1)}}</i>-->
                    </li>
                    <li>
                      <div v-for="(itemNum) in item.openNum">
                        <span>{{itemNum}}</span>
                      </div>
                    </li>
                    <!--<li>-->
                    <!--<div v-for="(numItem,numberIndex) in item.bodyArr.slice(Number(ssc_value)*10,Number(ssc_value)*10+10)">-->
                    <!--<span :class="formatNumber(numItem,item,'class')">-->
                    <!--{{formatNumber(numItem,item)}}-->
                    <!--</span>-->
                    <!--</div>-->
                    <!--</li>-->
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <notData :isNotData="!noData"></notData>
    </div>
    <ul class="trend-footer">
      <li class="refresh">
        <div @click.stop="refreshData()">
          <i class="iconfont iconic-refresch"></i>
          <!--刷新-->
          <span>{{$t('lang.trend.refresh')}}</span>
        </div>
      </li>
      <li class="btn-group">
        <ul>
          <li class="all-lottery">
            <!--选择彩票-->
            <div @click="showAllLottery">{{$t('lang.trend.select')}}</div>
          </li>
          <li class="order-page">
            <!--去购彩-->
            <div @click="goOrder">{{$t('lang.trend.goToLoddy')}}</div>
          </li>
        </ul>
      </li>
    </ul>
    <!--选择彩票-->
    <div class="all-lottery-wrapper" v-show="showLottery">
      <div class="content-wrapper">
        <div class="title">
          <i></i>
          <!--选择彩票-->
          <span>{{$t('lang.trend.select')}}</span>
          <i class="iconfont iconic-close"
             @click="showAllLottery"></i>
        </div>
        <div class="list-wrapper" v-if="lotteryList && lotteryList.length>0">
          <ul class="lottery-list">
            <li v-for="(item,index) in  lotteryList">
              <div :class="(lotteryInfo && lotteryInfo.name === item.name)?'active':''"
                   @click="(lotteryInfo && lotteryInfo.name !== item.name) && selectLottery(item)">
                {{item.name}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState, mapMutations} from 'vuex'
  import {isPair, animal, colorBall, _compare,PCDD_colorBall} from '../../utils/common';
  import {lotteryType} from '../../utils/mode'
  import notData from '../../commons/notdata/NotData'

  export default {
    name: "trend",
    data() {
      return {
        title: null,
        lotteryType: lotteryType,
        noData: false,
        showLottery: false,
        // --------------------
        K3_tabs: [
          {text: this.$t('lang.trend.K3_tabs[0]'), value: '3'},
          // {text: '同号', value: '4'},
          {text: this.$t('lang.trend.K3_tabs[1]'), value: '0'},
          {text: this.$t('lang.trend.K3_tabs[2]'), value: '1'},
          {text: this.$t('lang.trend.K3_tabs[3]'), value: '2'},
        ],
        k3_value: '3',
        k3_title_sum: [
          this.$t('lang.trend.k3_title_sum[0]'),
          this.$t('lang.trend.k3_title_sum[1]'),
          this.$t('lang.trend.k3_title_sum[2]'),
          this.$t('lang.trend.k3_title_sum[3]'),
          this.$t('lang.trend.k3_title_sum[4]')
        ],
        k3_title_position: [this.$t('lang.trend.k3_title_position[0]'), this.$t('lang.trend.k3_title_position[1]')],
        k3_number: [1, 2, 3, 4, 5, 6],
        // ----------------------
        ssc_tabs: [
          {text: this.$t('lang.trend.ssc_tabs[0]'), value: '0'},
          {text: this.$t('lang.trend.ssc_tabs[1]'), value: '1'},
          {text: this.$t('lang.trend.ssc_tabs[2]'), value: '2'},
          {text: this.$t('lang.trend.ssc_tabs[3]'), value: '3'},
          {text: this.$t('lang.trend.ssc_tabs[4]'), value: '4'}
        ],
        ssc_value: '0',
        ssc_title: [
          this.$t('lang.trend.issue_text'),
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        // ----------------------
        eleven5_tabs: [
          {text: this.$t('lang.trend.eleven5_tabs[0]'), value: '0'},
          {text: this.$t('lang.trend.eleven5_tabs[1]'), value: '1'},
          {text: this.$t('lang.trend.eleven5_tabs[2]'), value: '2'},
          {text: this.$t('lang.trend.eleven5_tabs[3]'), value: '3'},
          {text: this.$t('lang.trend.eleven5_tabs[4]'), value: '4'}
        ],
        eleven5_value: '0',
        eleven5_title: [
          this.$t('lang.trend.issue_text'),
          '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'
        ],
        // -----------------------
        pk10_tabs: [
          {text: this.$t('lang.trend.pk10_tabs[0]'), value: '0'},
          {text: this.$t('lang.trend.pk10_tabs[1]'), value: '1'},
          {text: this.$t('lang.trend.pk10_tabs[2]'), value: '2'},
          {text: this.$t('lang.trend.pk10_tabs[3]'), value: '3'},
          {text: this.$t('lang.trend.pk10_tabs[4]'), value: '4'},
          {text: this.$t('lang.trend.pk10_tabs[5]'), value: '5'},
          {text: this.$t('lang.trend.pk10_tabs[6]'), value: '6'},
          {text: this.$t('lang.trend.pk10_tabs[7]'), value: '7'},
          {text: this.$t('lang.trend.pk10_tabs[8]'), value: '8'},
          {text: this.$t('lang.trend.pk10_tabs[9]'), value: '9'}
        ],
        pk10_value: '0',
        pk10_title: [
          this.$t('lang.trend.issue_text'),
          '01', '02', '03', '04', '05', '06', '07', '08', '09', '10'
        ],
        // ----------------------
        fc3d_tabs: [
          {text: this.$t('lang.trend.fc3d_tabs[0]'), value: '0'},
          {text: this.$t('lang.trend.fc3d_tabs[1]'), value: '1'},
          {text: this.$t('lang.trend.fc3d_tabs[2]'), value: '2'}
        ],
        fc3d_value: '0',
        fc3d_title: [
          this.$t('lang.trend.issue_text')
          , 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ],
        // ----------------------
        common_title: [
          this.$t('lang.trend.common_title[0]'),
          this.$t('lang.trend.common_title[1]')
        ],
        colorBall: colorBall,
        hasData: false,
        commonArr: [lotteryType.pk10, lotteryType.ssc, lotteryType.eleven5, lotteryType.fc3d],
        hasDataArr: [lotteryType.pk10, lotteryType.ssc, lotteryType.eleven5, lotteryType.fc3d, lotteryType.k3]
      }
    },
    methods: {
      drawTrend_k3(ballIndex) {
        let d = document.getElementById('drawTrend_k3');
        let itemArr = this.$refs.item;
        let itemHeight = itemArr[0].clientHeight;
        let itemTitleWidth = itemArr[0].children[0].clientWidth + 1;
        let itemNumberWidth = itemArr[0].children[1].children[0].clientWidth + 0.5;
        if (d.getContext) {
          let draw = d.getContext('2d');
          let width = this.$refs.list.clientWidth;
          let height = this.$refs.list.clientHeight;
          d.setAttribute('width', width + 'px');
          d.setAttribute('height', (height) + 'px');
          draw.strokeStyle = '#d11213';
          draw.beginPath();
          for (let i = 0; i < this.bodyList.length; i++) {
            let value = this.bodyList[i].openNum[Number(ballIndex)];
            let w = itemTitleWidth + (value * itemNumberWidth) - (itemNumberWidth / 2);
            let h = (itemHeight / 2) + (i * itemHeight);
            if (i === 0) {
              draw.moveTo(w, h);
            } else {
              draw.lineTo(w, h);
            }
          }
          draw.stroke();
        }
      },
      drawTrend_common(ballIndex) {
        let itemArr = null;
        let d = null;
        if (this.lotteryInfo.type === lotteryType.pk10) {
          d = document.getElementById('drawTrend_pk10');
          itemArr = this.$refs.item_pk10;
        } else if (this.lotteryInfo.type === lotteryType.ssc) {
          d = document.getElementById('drawTrend_ssc');
          itemArr = this.$refs.item_ssc;
        } else if (this.lotteryInfo.type === lotteryType.eleven5) {
          d = document.getElementById('drawTrend_eleven5');
          itemArr = this.$refs.item_eleven5;
        } else if (this.lotteryInfo.type === lotteryType.fc3d) {
          d = document.getElementById('drawTrend_fc3d');
          itemArr = this.$refs.item_fc3d;
        }
        let itemHeight = itemArr[0].clientHeight;
        let itemTitleWidth = itemArr[0].children[0].clientWidth + 1;
        let itemNumberWidth = itemArr[0].children[1].children[0].clientWidth + 0.25;
        if (d.getContext) {
          let draw = d.getContext('2d');
          let width = 0;
          let height = 0;
          if (this.lotteryInfo.type === lotteryType.pk10) {
            width = this.$refs.list_pk10.clientWidth;
            height = this.$refs.list_pk10.clientHeight;
          } else if (this.lotteryInfo.type === lotteryType.ssc) {
            width = this.$refs.list_ssc.clientWidth;
            height = this.$refs.list_ssc.clientHeight;
          } else if (this.lotteryInfo.type === lotteryType.eleven5) {
            width = this.$refs.list_eleven5.clientWidth;
            height = this.$refs.list_eleven5.clientHeight;
          } else if (this.lotteryInfo.type === lotteryType.fc3d) {
            width = this.$refs.list_fc3d.clientWidth;
            height = this.$refs.list_fc3d.clientHeight;
          }
          d.setAttribute('width', width + 'px');
          d.setAttribute('height', (height) + 'px');
          draw.strokeStyle = '#d11213';
          draw.beginPath();
          for (let i = 0; i < this.bodyList.length; i++) {
            let value = 0;
            if (this.lotteryInfo.type === lotteryType.pk10) {
              value = this.bodyList[i].openNum[Number(ballIndex)];
            } else if (this.lotteryInfo.type === lotteryType.ssc) {
              value = this.bodyList[i].openNum[Number(ballIndex)] + 1;
            } else if (this.lotteryInfo.type === lotteryType.eleven5) {
              value = this.bodyList[i].openNum[Number(ballIndex)];
            } else if (this.lotteryInfo.type === lotteryType.fc3d) {
              value = this.bodyList[i].openNum[Number(ballIndex)] + 1;
            }
            let w = itemTitleWidth + ((value) * itemNumberWidth) - (itemNumberWidth / 2);
            let h = (itemHeight / 2) + (i * itemHeight);
            if (i === 0) {
              draw.moveTo(w, h);
            } else {
              draw.lineTo(w, h);
            }
          }
          draw.stroke();
        }
      },
      switchTabs(value) {
        let data = this.trendData;
        let commonArr = this.commonArr;
        if (commonArr.includes(this.lotteryInfo.type)) {
          if (this.lotteryInfo.type === lotteryType.pk10) {
            this.pk10_value = value;
          } else if (this.lotteryInfo.type === lotteryType.ssc) {
            this.ssc_value = value;
          } else if (this.lotteryInfo.type === lotteryType.eleven5) {
            this.eleven5_value = value;
          } else if (this.lotteryInfo.type === lotteryType.fc3d) {
            this.fc3d_value = value;
          }
        } else if (this.lotteryInfo.type === lotteryType.k3) {
          this.k3_value = value;
        }
        this.setData({key: 'trendData', value: JSON.parse(JSON.stringify(data))});
      },
      formatNumber(numItem, item, type) {
        let position = 0;
        if ([lotteryType.eleven5, lotteryType.pk10].includes(this.lotteryInfo.type)) {
          if (this.lotteryInfo.type === lotteryType.eleven5) {
            position = Number(this.eleven5_value);
          } else if (this.lotteryInfo.type === lotteryType.pk10) {
            position = Number(this.pk10_value);
          }
          let currentNum = item.openNum[position];
          if (numItem >= 0 && currentNum === numItem) {
            if (type === 'class') {
              return 'active'
            } else {
              if (currentNum >= 10) {
                return currentNum
              } else {
                return '0' + currentNum
              }
            }
          } else {
            return Math.abs(numItem);
          }
        } else {
          if (this.lotteryInfo.type === lotteryType.k3) {
            position = Number(this.k3_value);
          } else if (this.lotteryInfo.type === lotteryType.ssc) {
            position = Number(this.ssc_value);
          } else if (this.lotteryInfo.type === lotteryType.fc3d) {
            position = Number(this.fc3d_value);
          }
          let currentNum = item.openNum[position];
          if (numItem >= 0 && currentNum === numItem) {
            if (type === 'class') {
              return 'active'
            } else {
              return currentNum
            }
          } else {
            return Math.abs(numItem);
          }
        }

      },
      // 【选择彩票】按钮
      showAllLottery() {
        this.showLottery = !this.showLottery;
      },
      // 切换-选择彩种
      selectLottery(item) {
        let id = item.id;
        this._getCurrentLotteryInfo(id).then(() => {
          this.refreshData();
        });
        this.setData({key: 'trendData', value: null});
        this.$router.push({
          path: '/trend',
          query: {
            lotteryId: id
          }
        });
        this.$nextTick(() => {
          this.showLottery = !this.showLottery;
        })
      },
      // 刷新页面
      refreshData() {
        this.noData = false;
        // this.title = '走势图-' + this.currentLotteryInfo.name;
        this.title = this.$t('lang.trend.chart') + '-' + this.currentLotteryInfo.name;
        let hasDataArr = this.hasDataArr
        if (hasDataArr.includes(this.currentLotteryInfo.type)) {
          this.getTrendData(this.currentLotteryInfo.code).then((_data) => {
            // console.log(_data, this.currentLotteryInfo.type, '-----ddd--44');
            this.noData = true;
            if (_data && _data.bodyList.length > 0) {
              // console.log('reset');
              this.$nextTick(() => {
                // 将所有lottery系列返回初始化
                let commonArr = this.commonArr;
                if (commonArr.includes(this.currentLotteryInfo.type)) {
                  this.$nextTick(() => {
                    this.ssc_value = '0';
                    this.eleven5_value = '0';
                    this.pk10_value = '0';
                    this.fc3d_value = '0';
                    this.drawTrend_common('0');
                  })
                }
                else if (this.currentLotteryInfo.type === lotteryType.k3) {
                  this.$nextTick(() => {
                    this.k3_value = '3';
                  })
                }
              })
            }
          });
        } else {

          this.getDrawHistory(this.currentLotteryInfo).then((data) => {
            this.noData = true;
          })
        }

      },
      initData(id) {
        this._getCurrentLotteryInfo(id).then(() => {
          this.refreshData();
        })
      },
      goBack() {
        // console.log(this.$route.query,'this.$route.query.code');
        // console.log(this.$router, this.$route, this.routerHistory, '-----');
        let history = this.routerHistory;
        if (history.length !== 0) { // 在当前页面刷新
          let currentPath = this.$route.path;
          for (let i = history.length; i >= 0; i--) {
            let prePath = history[i - 2];
            if (prePath !== currentPath) {
              if (prePath === '/lotteryNew') {
                this.$router.push({
                  path: prePath,
                  query: {
                    id: this.currentLotteryInfo.id
                  }
                });
                break;
              } else {
                this.$router.push({
                  path: prePath,
                });
                break;
              }

            }
          }

        }
        // this.$router.push({
        //   path: '/drawHistory',
        //   query: {
        //     lotteryId: this.currentLotteryInfo.id
        //   }
        // });
        // this.$router.go(-1);

        // this.$router.push({
        //   path: item.type,
        //   query: {lotteryId: lotteryId, itemCate: item.cate, type: item.type, code: item.code},
        // });
      },
      goOrder() {
        this.$router.push({
          path: '/lotteryNew',
          query: {
            id: this.currentLotteryInfo.id
          }
        })
      },
      _calcBall(number) {
        let info = this.currentLotteryInfo;
        if (info) {
          let arr = number;
          if (info.type === lotteryType.ssc) {
            let total = eval(arr.join('+'));
            let obj = {
              total: total,
              oddEVEN: total % 2 === 0 ? '双' : '单',
              bigSmell: total >= 23 ? '大' : '小',
              frontThree: isPair(arr.slice(0, 3)),
              middleThree: isPair(arr.slice(1, 4)),
              behindThree: isPair(arr.slice(2, 5)),
              dragonTiger: Number(arr[0]) <= 4 ? '龙' : '虎' // 指的是万位龙虎
            };
            return obj
          }
          else if (info === 'sc' || info === 'ft') {
            let newArr = [];
            for (let value of arr) {
              let str = value.substr(value.length - 1)
              if (Number(str) === 0) {
                newArr.push(10)
              } else {
                newArr.push(str)
              }
            }
            let total = eval(newArr.join('+'));
            let obj = {
              total: total,
              oddEVEN: total % 2 === 0 ? '双' : '单',
              bigSmell: total >= 28 ? '大' : '小',
              one: newArr[0] > newArr[1] ? '龙' : '虎',
              two: newArr[2] > newArr[3] ? '龙' : '虎',
              three: newArr[4] > newArr[5] ? '龙' : '虎',
              four: newArr[6] > newArr[7] ? '龙' : '虎',
              five: newArr[8] > newArr[9] ? '龙' : '虎'
            };
            return obj
          }
          else if (info.type === lotteryType.lhc) {
            let total = 0;
            for (let i = 0; i < arr.length; i++) {
              if (Number(arr[i].slice(0, 1)) === 0) {
                total = total + Number(arr[i].slice(1, 2))
              } else {
                total = total + Number(arr[i])
              }
            }
            let obj = {
              total: total,
              oddEVEN: total % 2 === 0 ? '双' : '单',
              bigSmell: total >= 175 ? '大' : '小',
            }
            return obj
          }
          else if (info === '11x5') {
            let total = 0;
            for (let i = 0; i < arr.length; i++) {
              if (Number(arr[i].slice(0, 1)) === 0) {
                total = total + Number(arr[i].slice(1, 2))
              } else {
                total = total + Number(arr[i])
              }
            }
            let obj = {
              total: total,
              oddEVEN: total % 2 === 0 ? '双' : '单',
              bigSmell: total > 30 ? '大' : (total < 30) ? '小' : '和',
            }
            return obj
          }
          else if (info.type === lotteryType.k3) {
            let total = eval(arr.join('+'));
            let obj = {
              total: total,
              oddEVEN: total % 2 === 0 ? '双' : '单',
              bigSmall: total >= 9 ? '大' : '小',
            };
            return obj
          }
          else if (info === 'kl8') {
            let total = 0;
            for (let i = 0; i < arr.length; i++) {
              if (Number(arr[i].slice(0, 1)) === 0) {
                total = total + Number(arr[i].slice(1, 2))
              } else {
                total = total + Number(arr[i])
              }
            }
            let obj = {
              total: total,
              oddEVEN: total % 2 === 0 ? '双' : '单',
              bigSmell: total > 810 ? '大' : (total < 810) ? '小' : '和',
            }
            return obj
          }
          else if (info === 'klsf') {
            let total = 0;
            for (let i = 0; i < arr.length; i++) {
              if (Number(arr[i].slice(0, 1)) === 0) {
                total = total + Number(arr[i].slice(1, 2))
              } else {
                total = total + Number(arr[i])
              }
            }
            let obj = {
              total: total,
              oddEVEN: total % 2 === 0 ? '双' : '单',
              // bigSmell: total > 810 ? '大' : (total < 810) ? '小' : '和',
            }
            return obj
          }
          else if (info.type === lotteryType.pcdd) {
            let total = eval(arr.join('+'));
            let obj = {
              total: total,
            }
            return obj
          }
        } else {

        }

      },
      _animalClass(num, type) {
        return animal(String(num), type, this);
      },
      LHCBallClass(number) {
        let n = number;
        if (n < 10) {
          n = '0' + n;
        }
        if (this.colorBall.red.includes(String(n))) {
          return 'red-ball'
        } else if (this.colorBall.blue.includes(String(n))) {
          return 'blue-ball'
        } else if (this.colorBall.green.includes(String(n))) {
          return 'green-ball'
        }
      },
      ...mapMutations({
        setData: 'SET_DATA'
      }),
      ...mapActions([
        'getTrendData',
        'getDrawHistory',
        '_getCurrentLotteryInfo',
      ]),
      PCDD_ballClass(num) {
        let colorBall = PCDD_colorBall;
        let number = Number(num);
        if (colorBall.red.includes(number)) {
          return 'red-ball'
        } else if (colorBall.green.includes(number)) {
          return 'green-ball'
        } else if (colorBall.blue.includes(number)) {
          return 'blue-ball'
        } else if (colorBall.gray.includes(number)) {
          return 'gray-ball'
        }
      },
    },
    computed: {
      ...mapState([
        'trendData',
        'currentLotteryInfo',
        'allLotteryTypeList',
        'routerHistory'
      ]),
      bodyList() {
        console.log(this.trendData, 'bodyListbodyList');
        if (this.currentLotteryInfo && this.hasDataArr.includes(this.currentLotteryInfo.type)) {
          if (this.trendData && this.trendData.bodyList.length > 0) {
            this.$nextTick(() => {
              let commonArr = this.commonArr;
              if (commonArr.includes(this.currentLotteryInfo.type)) {
                let value = null;
                if (this.lotteryInfo.type === lotteryType.pk10) {
                  value = this.pk10_value;
                } else if (this.lotteryInfo.type === lotteryType.ssc) {
                  value = this.ssc_value;
                } else if (this.lotteryInfo.type === lotteryType.eleven5) {
                  value = this.eleven5_value;
                } else if (this.lotteryInfo.type === lotteryType.fc3d) {
                  value = this.fc3d_value
                }
                this.$nextTick(() => {
                  this.drawTrend_common(value);
                })
              } else if (this.currentLotteryInfo.type === lotteryType.k3) {
                let value = this.k3_value;
                this.$nextTick(() => {
                  if (['0', '1', '2'].includes(value)) { //['0', '1', '2']是对应K3_tabs的值
                    this.$nextTick(() => {
                      this.drawTrend_k3(value);
                    })
                  }
                })
              }
            })
            this.noData = true;
            let bodyList = this.trendData.bodyList
            if (bodyList) {
              let l = bodyList.sort(_compare('issue'));
              let newBodyList = JSON.parse(JSON.stringify(l));
              this.trendData.newBodyList = newBodyList
            }
            return this.trendData.newBodyList;
          } else {
            return [];
          }
        } else {
          if (this.trendData && this.trendData.length > 0) {
            this.noData = true;
            return this.trendData
          } else {
            return []
          }
        }
      },
      lotteryInfo() {
        // console.log(this.currentLotteryInfo, 'change--id');
        this.$nextTick(() => {
          if (this.currentLotteryInfo && this.trendData === null) {
            // this.title = '走势图-' + this.currentLotteryInfo.name;
            this.title = this.$t('lang.trend.chart') + '-' + this.currentLotteryInfo.name;
            // this.refreshData();
          }
        })
        return this.currentLotteryInfo
      },
      lotteryList() {
        if (this.allLotteryTypeList && this.allLotteryTypeList[0].list.length > 0) {
          return this.allLotteryTypeList[0].list
        }
      }
    },
    components: {
      notData
    },
    mounted() {
      this.noData = false;
      let info = this.$route;
      // console.log(info.query.code, info.query.type, info.query.lotteryId, '-----info');
      this.initData(info.query.lotteryId);
      // this.refreshData()
    },
    beforeDestroy() {
      this.setData({key: 'trendData', value: null});
    }
  }
</script>

<style scoped lang="scss">
  @mixin title-width-sum() {
    &:nth-child(1) {
      width: 30%;
    }
    &:nth-child(2) {
      width: 40%;
    }
    &:nth-child(3) {
      width: 10%;
    }
    &:nth-child(4) {
      width: 10%;
    }
    &:nth-child(5) {
      width: 10%;
    }
  }

  .trend {
    width: 100%;
    height: 100%;
    .header-wrapper {
      width: 100%;
      height: 0.92rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(151deg, #65317d -12%, #293384 126%);
      i {
        color: #fff;
        width: 1rem;
        height: 100%;
        line-height: 0.92rem;
        text-align: center;
      }
      span {
        color: #fff;
        font-size: .32rem;
      }
    }
    .trend-wrapper {
      height: calc(100% - 0.92rem - 1.5rem);
      .k3-wrapper, .ssc-wrapper, .pk10-wrapper,
      .eleven5-wrapper, .fc3d-wrapper {
        height: 100%;
        ul.tab-wrapper {
          width: 100%;
          height: 1rem;
          display: flex;
          flex-wrap: wrap;
          padding: 0 0.2rem;
          background: #24252D;
          position: relative;
          &:after {
            content: "";
            display: block;
            height: 1px;
            background: #ccc;
            transform: scaleY(0.5);
            position: absolute;
            right: 0;
            left: 0;
            bottom: 0;
          }
          & > li {
            height: 100%;
            width: 25%;
            display: flex;
            justify-content: center;
            align-items: center;
            div {
              height: 0.7rem;
              line-height: 0.7rem;
              color: #8f8f8f;
              width: 80%;
              text-align: center;
              border-radius: 4px;
              font-size: px2rem(15px);
              border: solid 1px #444555;
              background: #2d2e35;
              &.active {
                border: 1px solid #efcea6;
                color: #9f7954;
              }
            }
          }
        }
        .main-content {
          height: calc(100% - 1rem);
          .position-item {
            height: 100%;
            ul.title {
              width: 100%;
              height: .5rem;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              &:after {
                content: "";
                display: block;
                height: 1px;
                background: #ccc;
                transform: scaleY(0.5);
                position: absolute;
                right: 0;
                left: 0;
                bottom: 0;
              }
              & > li {
                height: 100%;
                color: #9f9f9f;
                font-size: px2rem(12px);
                &:nth-child(1) {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                &:not(&:nth-child(1)) {
                  text-align: center;
                  line-height: .5rem;
                }
              }

            }
            div.content-wrapper {
              height: calc(100% - .5rem);
              overflow: scroll;
              z-index: 1;
              position: relative;
              ul.list-wrapper {
                position: relative;
                &:after {
                  content: "";
                  display: block;
                  height: 1px;
                  background: #ccc;
                  transform: scaleY(0.5);
                  position: absolute;
                  right: 0;
                  left: 0;
                  bottom: 0;
                }
                & > li {
                  height: 30PX;
                  &:nth-child(odd) {
                    background: #24252D;
                  }
                  & > ul {
                    display: flex;
                    height: 100%;
                    & > li {
                      height: 100%;
                      border-right: 1px solid #444555;
                      color: #fff;
                      &:nth-child(1) {
                        /*width: 40%;*/
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: px2rem(12px);
                      }
                      &:nth-child(2) {
                        /*width: 60%;*/
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        div {
                          flex: 1;
                          height: 100%;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          border-right: 1px solid #444555;
                          &:last-child {
                            border-right: none;
                          }
                          span {
                            width: 20PX;
                            height: 20PX;
                            line-height: 20PX;
                            text-align: center;
                            font-size: px2rem(14px);
                            &.active {
                              background: #d11213;
                              color: #fff;
                              border-radius: 50%;
                              z-index: 1;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }

        }
        #drawTrend_k3, #drawTrend_ssc,
        #drawTrend_pk10, #drawTrend_eleven5, #drawTrend_fc3d {
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .lhc-wrapper, .pcdd-wrapper, .common-wrapper {
        height: 100%;
        .main-content {
          height: 100%;
          .position-item {
            height: 100%;
            ul.title {
              width: 100%;
              height: .5rem;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              &:after {
                content: "";
                display: block;
                height: 1px;
                background: #ccc;
                transform: scaleY(0.5);
                position: absolute;
                right: 0;
                left: 0;
                bottom: 0;
              }
              & > li {
                height: 100%;
                color: #9f9f9f;
                font-size: px2rem(12px);
                &:nth-child(1) {
                  /*width: 30%;*/
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                &:not(&:nth-child(1)) {
                  /*width: 70%;*/
                  text-align: center;
                  line-height: .5rem;
                }
              }
            }
            div.content-wrapper {
              height: calc(100% - .5rem);
              overflow: scroll;
              z-index: 1;
              position: relative;
              ul.list-wrapper {
                & > li {
                  height: 50PX; /*no*/
                  position: relative;
                  &:after {
                    content: "";
                    display: block;
                    height: 1px;
                    background: #ccc;
                    transform: scaleY(0.5);
                    position: absolute;
                    right: 0;
                    left: 0;
                    bottom: 0;
                  }
                  &:nth-child(odd) {
                    background: #24252D;
                  }
                  & > ul {
                    display: flex;
                    height: 100%;
                    & > li {
                      height: 100%;
                      /*border-right: 1px solid #444555;*/
                      color: #fff;
                      position: relative;
                      &:after {
                        content: "";
                        display: block;
                        width: 1px;
                        height: 100%;
                        background: #ccc;
                        transform: scaleX(0.5);
                        position: absolute;
                        right: 0;
                      }
                      &:nth-child(1) {
                        /*width: 30%;*/
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        color: #9f9f9f;
                        line-height: 20PX;
                        font-size: px2rem(12px);
                      }
                      &:nth-child(2) {
                        /*width: 70%;*/
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        div {
                          height: 100%;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          flex-direction: column;
                          span {
                            width: 23PX;
                            height: 23PX;
                            line-height: 23PX;
                            text-align: center;
                            color: #fff;
                            border-radius: 50%;
                            margin: 0 0.05rem 0.05rem;
                            font-size: px2rem(14px);
                            &.red {
                              background: #d11213;
                            }
                            &.blue {
                              background: #1d5cfe;
                            }
                            &.gray {
                              background: #9e9e9e;
                            }
                            &.green {
                              background: #209441;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      .k3-wrapper {
        ul.tab-wrapper {
          & > li {
          }
        }
        .main-content {
          .sum-item {
            height: 100%;
            ul.title {
              height: 0.5rem;
              display: flex;
              position: relative;
              &:after {
                content: "";
                display: block;
                height: 1px;
                background: #ccc;
                transform: scaleY(0.5);
                position: absolute;
                right: 0;
                left: 0;
                bottom: 0;
              }
              li {
                height: 100%;
                text-align: center;
                line-height: 0.5rem;
                color: #9f9f9f;
                @include title-width-sum;
              }
            }
            ul.content-wrapper {
              height: calc(100% - .5rem);
              overflow: scroll;
              & > li {
                height: 0.7rem;
                color: #fff;
                position: relative;
                &:after {
                  content: "";
                  display: block;
                  height: 1px;
                  background: #ccc;
                  transform: scaleY(0.5);
                  position: absolute;
                  right: 0;
                  left: 0;
                  bottom: 0;
                }
                &:nth-child(odd) {
                  background: #24252D;
                }
                & > ul {
                  display: flex;
                  height: 100%;
                  & > li {
                    border-right: 1px solid #444555;
                    color: #fff;
                    @include title-width-sum;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span {
                      width: 0.6rem;
                      height: 0.6rem;
                      margin: 0 0.1rem 0 0;
                      &:last-child {
                        margin: 0;
                      }
                      &.dic_1 {
                        background: url("../../assets/img/lottery/ks/ks_1.png") no-repeat center center;
                        background-size: 100% 100%;
                      }
                      &.dic_2 {
                        background: url("../../assets/img/lottery/ks/ks_2.png") no-repeat center center;
                        background-size: 100% 100%;
                      }
                      &.dic_3 {
                        background: url("../../assets/img/lottery/ks/ks_3.png") no-repeat center center;
                        background-size: 100% 100%;
                      }
                      &.dic_4 {
                        background: url("../../assets/img/lottery/ks/ks_4.png") no-repeat center center;
                        background-size: 100% 100%;
                      }
                      &.dic_5 {
                        background: url("../../assets/img/lottery/ks/ks_5.png") no-repeat center center;
                        background-size: 100% 100%;
                      }
                      &.dic_6 {
                        background: url("../../assets/img/lottery/ks/ks_6.png") no-repeat center center;
                        background-size: 100% 100%;
                      }
                    }
                    &:first-child {
                      color: #9f9f9f;
                    }
                    &:last-child {
                      border: none;
                    }
                  }
                }
              }
            }
          }
          .position-item {
            ul.title {
              & > li {
                &:nth-child(1) {
                  width: 40%;
                }
                &.number-position {
                  width: 60%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  span {
                    flex: 1;
                    text-align: center;
                  }
                }
              }
            }
            div.content-wrapper {
              ul.list-wrapper {
                & > li {
                  & > ul {
                    & > li {
                      &:nth-child(1) {
                        width: 40%;
                      }
                      &:nth-child(2) {
                        width: 60%;
                      }
                    }
                  }
                }
              }
            }

          }
        }
      }
      .ssc-wrapper {
        ul.tab-wrapper {
          & > li {
            flex: 1;
          }
        }
        .main-content {
          .position-item {
            ul.title {
              & > li {
                &:nth-child(1) {
                  width: 30%;
                }
                &:not(&:nth-child(1)) {
                  width: 7%;
                }
              }
            }
            div.content-wrapper {
              ul.list-wrapper {
                & > li {
                  & > ul {
                    & > li {
                      height: 100%;
                      border-right: 1px solid #444555;
                      color: #fff;
                      &:nth-child(1) {
                        width: 30%;
                      }
                      &:nth-child(2) {
                        width: 70%;
                      }
                    }
                  }
                }
              }
            }

          }
        }
      }
      .pk10-wrapper {
        ul.tab-wrapper {
          height: 2rem;
          & > li {
            height: 1rem;
            width: 20%;
          }
        }
        .main-content {
          height: calc(100% - 2rem);
          .position-item {
            ul.title {
              & > li {
                height: 100%;
                color: #9f9f9f;
                &:nth-child(1) {
                  width: 30%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                &:not(&:nth-child(1)) {
                  width: 7%;
                  text-align: center;
                  line-height: .5rem;
                }
              }
            }
            div.content-wrapper {
              ul.list-wrapper {
                & > li {
                  & > ul {
                    & > li {
                      &:nth-child(1) {
                        width: 30%;
                      }
                      &:nth-child(2) {
                        width: 70%;
                        height: 100%;
                      }
                    }
                  }
                }
              }
            }

          }
        }
      }
      .eleven5-wrapper {
        ul.tab-wrapper {
          & > li {
            flex: 1;
          }
        }
        .main-content {
          .position-item {
            ul.title {
              & > li {
                &:nth-child(1) {
                  width: 23%;
                }
                &:not(&:nth-child(1)) {
                  width: 7%;
                }
              }
            }
            div.content-wrapper {
              ul.list-wrapper {
                & > li {
                  & > ul {
                    & > li {
                      &:nth-child(1) {
                        width: 23%;
                      }
                      &:nth-child(2) {
                        width: 77%;
                      }
                    }
                  }
                }
              }
              #drawTrend_eleven5 {
                position: absolute;
                top: 0;
                left: 0;
              }
            }

          }
        }
      }
      .fc3d-wrapper {
        ul.tab-wrapper {
          & > li {
            flex: 1;
          }
        }
        .main-content {
          .position-item {
            ul.title {
              & > li {
                &:nth-child(1) {
                  width: 30%;
                }
                &:not(&:nth-child(1)) {
                  width: 7%;
                }
              }
            }
            div.content-wrapper {
              ul.list-wrapper {
                & > li {
                  & > ul {
                    & > li {
                      &:nth-child(1) {
                        width: 30%;
                      }
                      &:nth-child(2) {
                        width: 70%;
                      }
                    }
                  }
                }
              }
            }

          }
        }
      }
      .lhc-wrapper {
        .main-content {
          .position-item {
            ul.title {
              & > li {
                &:nth-child(1) {
                  width: 30%;
                }
                &:not(&:nth-child(1)) {
                  width: 70%;
                }
              }
            }
            div.content-wrapper {
              ul.list-wrapper {
                & > li {
                  & > ul {
                    & > li {
                      &:nth-child(1) {
                        width: 30%;
                      }
                      &:nth-child(2) {
                        width: 70%;
                        div {
                          span {
                            &.red-ball {
                              background: #f11717;
                            }
                            &.blue-ball {
                              background: #0e86e3;
                            }
                            &.green-ball {
                              background: #38be4f;
                            }
                          }
                          i {
                            font-size: 0.2rem;
                          }
                          &.add {
                            b {
                              font-size: .4rem;
                              margin: -15PX 0 0;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

          }
        }
      }
      .pcdd-wrapper {
        .main-content {
          .position-item {
            ul.title {
              & > li {
                &:nth-child(1) {
                  width: 30%;
                }
                &:not(&:nth-child(1)) {
                  width: 70%;
                }
              }
            }
            div.content-wrapper {
              ul.list-wrapper {
                & > li {
                  & > ul {
                    & > li {
                      &:nth-child(1) {
                        width: 30%;
                      }
                      &:nth-child(2) {
                        width: 70%;
                        div {
                          span {
                            &.red-ball {
                              background: #d11213;
                            }
                            &.blue-ball {
                              background: #1d5cfe;
                            }
                            &.gray-ball {
                              background: #9e9e9e;
                            }
                            &.green-ball {
                              background: #209441;
                            }
                          }
                          &.add {
                            margin: 0 0.1rem;
                            font-size: 0.3rem;
                          }

                        }
                      }
                    }
                  }
                }
              }
            }

          }
        }
      }
      .common-wrapper {
        .main-content {
          .position-item {
            ul.title {
              & > li {
                &:nth-child(1) {
                  width: 30%;
                }
                &:not(&:nth-child(1)) {
                  width: 70%;
                }
              }
            }
            div.content-wrapper {
              ul.list-wrapper {
                & > li {
                  height: auto;
                  & > ul {
                    min-height: 50PX;
                    & > li {
                      height: auto;
                      border-right: 0;
                      &:nth-child(1) {
                        width: 30%;
                      }
                      &:nth-child(2) {
                        width: 70%;
                        height: 100%;
                        min-height: 50PX;
                        display: flex;
                        padding: 0.1rem 0;
                        justify-content: flex-start;
                        flex-wrap: wrap;
                        div {
                          width: 12%;
                          span {
                            margin: 0.05rem 0;
                            background: #d11213;
                          }

                        }
                      }
                    }
                  }
                }
              }
            }

          }
        }
      }
    }
    .trend-footer {
      width: 100%;
      position: fixed;
      bottom: 0;
      height: 1.5rem;
      display: flex;
      li {
        height: 100%;
        &.refresh {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          div {
            width: 1rem;
            height: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #9a9aa7;
            position: relative;
            &:after {
              content: "";
              display: block;
              height: 30px;
              border-right: 1px #eee solid;
              transform: scaleX(0.5);
              position: absolute;
              right: 0;
            }
            i {
              font-size: .4rem;
            }
            span {
              margin: 0.1rem 0 0;
            }
          }
        }
        &.btn-group {
          flex: 3;
          display: flex;
          ul {
            width: 100%;
            height: 100%;
            display: flex;
            .all-lottery, .order-page {
              display: flex;
              justify-content: center;
              align-items: center;
              div {
                height: .8rem;
                line-height: .8rem;
                width: 80%;
                border-radius: 1rem;
                background: pink;
                text-align: center;
                font-size: .28rem;
              }
            }
            .all-lottery {
              flex: 3;
              div {
                color: #dadada;
                font-weight: 500;
                font-family: PingFangTC;
                background-image: linear-gradient(to bottom, #645592 1%, #322b4d);
              }
            }
            .order-page {
              flex: 4;
              div {
                color: #533510;
                font-weight: bold;
                box-shadow: 0 5px 19px 0 rgba(0, 0, 0, 0.5);
                background-image: linear-gradient(to bottom, #efcea6, #dab591);
              }
            }
          }
        }
      }
    }
    .all-lottery-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      z-index: 10;
      .content-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 80%;
        width: 100%;
        overflow: hidden;
        background: #24252D;
        .title {
          position: relative;
          height: 0.8rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #393940;
          span {
            font-size: .3rem;
            color: #fff;
          }
          i {
            width: .8rem;
            height: 0.8rem;
            line-height: .8rem;
            text-align: center;
            color: #8f8f8f;
            font-size: 0.3rem;
          }
        }
        .list-wrapper {
          height: calc(100% - 0.8rem);
          overflow-y: scroll;
          padding: 0.1rem 0;
          ul.lottery-list {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            li {
              width: 33.3%;
              height: 1rem;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 5px;
              div {
                min-width: 80%;
                min-height: .8rem;
                line-height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 6px;
                padding: 0 5px;
                font-size: px2rem(15px);
                box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
                background: #16171b;
                color: #8f8f8f;
                &.active {
                  background: linear-gradient(to bottom, #efcea6, #dab591);
                  color: #533510;
                  font-weight: 600;
                }
              }
            }
          }
        }

      }

    }
  }

  .skin-gray {
    .trend {
      .header-wrapper {
        background-image: linear-gradient(91deg, #54517b 0%, #747199 100%, #747199 100%);
        i, span {
          color: #fff;
        }
      }
      .k3-wrapper, .ssc-wrapper, .pk10-wrapper,
      .eleven5-wrapper, .fc3d-wrapper {
        ul.tab-wrapper {
          background: $skin-gray-con-bg;
          &:after {
            background: $skin-gray-border-color;
          }
          & > li {
            div {
              color: $skin-gray-text-color;
              border: solid 1px #605c7b;
              background-color: #38364a;
              &.active {
                border: solid 1px #ffd57d;
                background-color: #38364a;
                color: #ffd57d;
              }
            }
          }
        }
        .main-content {
          .position-item {
            ul.title {
              &:after {
                background: $skin-gray-border-color;
              }
              & > li {
                color: #9f9f9f;
              }
            }
            div.content-wrapper {
              ul.list-wrapper {
                &:after {
                  background: $skin-gray-border-color;
                }
                & > li {
                  background: $skin-gray-bg;
                  &:nth-child(odd) {
                    background: $skin-gray-con-bg;
                  }
                  & > ul {
                    & > li {
                      border-right: 1px solid $skin-gray-border-color;
                      color: #fff;
                      &:nth-child(1) {
                        color: #9f9f9f;
                      }
                      &:nth-child(2) {
                        div {
                          border-right: 1px solid $skin-gray-border-color;
                          span {
                            &.active {
                              background: #D44242;
                              color: #fff;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

          }
        }
      }
      .lhc-wrapper, .pcdd-wrapper, .common-wrapper {
        .main-content {
          .position-item {
            ul.title {
              & > li {
                color: #9f9f9f;
              }
              &:after {
                background: $skin-gray-border-color;
              }
            }
            div.content-wrapper {
              ul.list-wrapper {
                & > li {
                  &:after {
                    background: $skin-gray-border-color;
                  }
                  background: $skin-gray-bg;
                  &:nth-child(odd) {
                    background: $skin-gray-con-bg;
                  }
                  & > ul {
                    & > li {
                      &:after {
                        background: $skin-gray-border-color;
                      }
                      color: #a1a4a5;
                      &:nth-child(1) {
                        color: #9f9f9f;
                      }
                      &:nth-child(2) {
                        div {
                          span {
                            color: #fff;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      .k3-wrapper {
        .main-content {
          .sum-item {
            ul.title {
              &:after {
                background: $skin-gray-border-color;
              }
              li {
                color: #9f9f9f;
                @include title-width-sum;
              }
            }
            ul.content-wrapper {
              & > li {
                &:after {
                  background: $skin-gray-border-color;
                }
                background: $skin-gray-bg;
                &:nth-child(odd) {
                  background: $skin-gray-con-bg;
                }
                & > ul {
                  & > li {
                    border-right: 1px solid $skin-gray-border-color;
                    color: #fff;
                    &:first-child {
                      color: #9f9f9f;
                    }
                    &:last-child {
                      border: none;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .trend-footer {
        background: $skin-gray-con-bg;
        border-top: 1px $skin-gray-border-color solid;
        li {
          &.refresh {
            div {
              color: #9a9aa7;
              position: relative;
              &:after {
                border-right: 1px $skin-gray-border-color solid;
              }
            }
          }
          &.btn-group {
            ul {
              .all-lottery {
                div {
                  background-image: linear-gradient(to bottom, #8c90bc 2%, #545a96);
                }
              }
              .order-page {
                div {
                  color: #533510;
                  background-image: linear-gradient(to bottom, #ffedc6, #ffd57d);
                }
              }
            }
          }
        }
      }
      .all-lottery-wrapper {
        .content-wrapper {
          background: #24252D;
          .title {
            span {
              color: #fff;
            }
            i {
              color: #fff;
            }
          }
          .list-wrapper {
            ul.lottery-list {
              li {
                div {
                  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
                  background-color: #16171b;
                  color: #8f8f8f;
                  &.active {
                    background-image: linear-gradient(to bottom, #efcea6, #dab591);
                    color: #533510;
                  }
                }
              }
            }
          }

        }

      }
    }

  }

  .skin-black {
    .trend {
      .header-wrapper {
        background-image: linear-gradient(151deg, #65317d -12%, #293384 126%);
        i, span {
          color: #fff;
        }
      }
      .k3-wrapper, .ssc-wrapper, .pk10-wrapper,
      .eleven5-wrapper, .fc3d-wrapper {
        ul.tab-wrapper {
          background: $skin-black-con-bg;
          &:after {
            background: $skin-black-border-color;
          }
          & > li {
            div {
              color: $skin-black-text-color;
              border: solid 1px #444555;
              background-color: #2d2e35;
              &.active {
                border: solid 1px #efcea6;
                background-color: #333441;
                color: #9f7954;
              }
            }
          }
        }
        .main-content {
          .position-item {
            ul.title {
              &:after {
                background: $skin-black-border-color;
              }
              & > li {
                color: #9f9f9f;
              }
            }
            div.content-wrapper {
              ul.list-wrapper {
                &:after {
                  background: $skin-black-border-color;
                }
                & > li {
                  background: $skin-black-bg;
                  &:nth-child(odd) {
                    background: $skin-black-con-bg;
                  }
                  & > ul {
                    & > li {
                      border-right: 1px solid $skin-black-border-color;
                      color: #fff;
                      &:nth-child(1) {
                        color: #9f9f9f;
                      }
                      &:nth-child(2) {
                        div {
                          border-right: 1px solid $skin-black-border-color;
                          span {
                            &.active {
                              background: #D44242;
                              color: #fff;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

          }
        }
      }
      .lhc-wrapper, .pcdd-wrapper, .common-wrapper {
        .main-content {
          .position-item {
            ul.title {
              & > li {
                color: #9f9f9f;
              }
              &:after {
                background: $skin-black-border-color;
              }
            }
            div.content-wrapper {
              ul.list-wrapper {
                & > li {
                  &:after {
                    background: $skin-black-border-color;
                  }
                  background: $skin-black-bg;
                  &:nth-child(odd) {
                    background: $skin-black-con-bg;
                  }
                  & > ul {
                    & > li {
                      &:after {
                        background: $skin-black-border-color;
                      }
                      color: #a1a4a5;
                      &:nth-child(1) {
                        color: #9f9f9f;
                      }
                      &:nth-child(2) {
                        div {
                          span {
                            color: #fff;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      .k3-wrapper {
        .main-content {
          .sum-item {
            ul.title {
              &:after {
                background: $skin-black-border-color;
              }
              li {
                color: #9f9f9f;
                @include title-width-sum;
              }
            }
            ul.content-wrapper {
              & > li {
                &:after {
                  background: $skin-black-border-color;
                }
                background: $skin-black-bg;
                &:nth-child(odd) {
                  background: $skin-black-con-bg;
                }
                & > ul {
                  & > li {
                    border-right: 1px solid $skin-black-border-color;
                    color: #fff;
                    &:first-child {
                      color: #9f9f9f;
                    }
                    &:last-child {
                      border: none;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .trend-footer {
        background: $skin-black-con-bg;
        border-top: 1px $skin-black-border-color solid;
        li {
          &.refresh {
            div {
              color: #9a9aa7;
              position: relative;
              &:after {
                border-right: 1px $skin-black-border-color solid;
              }
            }
          }
          &.btn-group {
            ul {
              .all-lottery {
                div {
                  background-image: linear-gradient(to bottom, #645592 1%, #322b4d);
                }
              }
              .order-page {
                div {
                  color: #533510;
                  box-shadow: 0 5px 19px 0 rgba(0, 0, 0, 0.5);
                  background-image: linear-gradient(to bottom, #efcea6, #dab591);
                }
              }
            }
          }
        }
      }
      .all-lottery-wrapper {
        .content-wrapper {
          background: #24252D;
          .title {
            span {
              color: #fff;
            }
            i {
              color: #fff;
            }
          }

          .list-wrapper {
            ul.lottery-list {
              li {
                div {
                  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
                  background-color: #16171b;
                  color: #8f8f8f;
                  &.active {
                    background-image: linear-gradient(to bottom, #efcea6, #dab591);
                    color: #533510;
                  }
                }
              }
            }
          }

        }

      }
    }

  }
  .active {
    color: red!important;
  }

</style>
