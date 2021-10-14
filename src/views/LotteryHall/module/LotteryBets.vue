<template>
  <div class="betDetails">
    <!-- 玩家金额 -->
    <div class="random">
      <span @click="$toast($t('lang.lottery.toast[0]'))">
        <i class="iconfont iconic-random"></i>
        <!--摇一摇机选-->
        <em>{{$t('lang.lottery.randomAndTips[0]')}}</em>
      </span>
      <!--      <span style="flex: 2" v-if="userAmount">余额：{{ userAmount }}</span>-->
      <!--      <span style="flex: 2" v-else></span>-->
      <span @click="showTips()">
        <!--玩法提示-->
        <em>{{$t('lang.lottery.randomAndTips[1]')}}</em>
        <i class="iconfont iconic-info2"></i>
      </span>
    </div>
    <!-- 下注区域 -->
    <NotData v-if="isLoading" :isNotData="isLoading"/>
    <div v-else class="content-wrapper">
      <!-- 六合彩 - 二级菜单 -->
      <div v-if="isSecond" class="slider" ref="slider">
        <ul class="slider-group clearfix" ref="sliderGroup">
          <li v-for="(item, i) in firstMenu.children" :key="item.name"
              :class="{'active': i === secondSelected}"
              @click="secondMenu(i, item.detail)">
            <span>{{ item.name }}</span>
            <!-- 合肖赔率 -->
            <strong v-if="resetOdds && i === secondSelected">{{ resetOdds }}</strong>
            <!-- 连码赔率 -->
            <strong v-if="item.superCode === `${lotteryId}207` || item.superCode === `${lotteryId}208`">
              {{ item.detail[0].addOdds }}
              <em v-if="item.name === '三中二' || item.name === '二中特'"> {{ item.detail[1].addOdds }}</em>
            </strong>
          </li>
        </ul>
      </div>
      <!-- 11选5连码、北京快乐8选1-5 二级菜单 -->
      <div v-if="(lotteryName === '11x5' && firstSelected === 2) || (lotteryName === 'bjkl8' && firstSelected === 1)"
           class="slider" ref="slider">
        <ul class="slider-group clearfix" ref="sliderGroup">
          <li v-for="(item, i) in codeList.children" :key="i"
              :class="{'active': i === codeFiveNum}"
              @click="secondMenu(i)">
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div>
      <div class="bet-content"
           :class="[(isSecond?'has-second-menu':''),((lotteryName === '11x5' && firstSelected === 2) || (lotteryName === 'bjkl8' && firstSelected === 1)?'has-second-menu':'')]">
        <!-- 六合彩 -->
        <div v-if="lotteryName === 'lhc'"
             class="lhc"
             :class="{'reduce-height': betsNum }"
             ref="bets">
          <!--<div v-if="lotteryName === 'lhc'"-->
          <!--class="lhc"-->
          <!--:class="{'reduce-height': (betsNum && visibleNumber.length > 0) || (betsNum && firstSelected === 11) }"-->
          <!--ref="bets">-->
          <!-- 快捷选项（六合彩） -->
          <div class="tools">
            <QuickOption @betConfig="betConfig" v-if="isQuick"/>
          </div>
          <!-- 数字号码 -->
          <ul class="number-content">
            <li v-for="item in visibleNumber" :key="item.name" @click="betCheck(item)">
              <div>
                <span :class="['liuBox' + item.name,item.selected?'liuBox' + item.name + 'sd':'']">{{item.alias }}</span>
                <!-- 自定义号码不显示赔率 -->
                <i class="odds" v-if="!codeList[0].isAddAttr">{{ item.addOdds }}</i>
              </div>
            </li>
          </ul>
          <!-- 非数字号码 -->
          <ul class="spare-content"
              v-if="visibleNoNumber.length > 0">
            <li v-for="(item, key) in visibleNoNumber" :key="item.name"
                @click="betCheck(item)">
              <div :class="{active: item.selected, isPad: !zodiac.includes(item.value)}">
                <em>{{ item.alias }}</em>
                <i class="odds">{{$t('lang.lottery.odds')}}:{{ item.addOdds }}</i>
                <div v-if="zodiac.includes(item.value)" class="zodiacCode">
                  <span v-for="code in zodiacCode[key]" :key="code"
                        :class="{['liuBox' + code]: true}">{{ code }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 快三 -->
        <div v-if="lotteryName === 'ks'"
             class="k-three"
             :class="{'reduce-height': betsNum}"
             ref="bets">
          <!-- 官方玩法 -->
          <div v-if="playType" class="office-method">
            <div class="title-odds" v-if="codeList[0].name !=='和值'">
              <span>
                <em>{{$t('lang.lottery.odds')}}:</em>
                <em class="num">{{ codeList[0].detail[0].addOdds }}</em>
              </span>
            </div>
            <div v-for="(item,key) in codeList" :key="key"
                 class="k-three-items">
              <div class="title">
                <span>{{ item.name }}</span>
                <div class="tools">
                  <QuickOption v-if="item.name === '和值'"
                               :lotteryName='lotteryName'
                               @betConfig="betConfig"/>
                </div>

              </div>
              <!-- 二同号、和值 -->
              <div v-if="item.isSpan" class="balls-content"
                   :class="item.name !== '和值'?'balls-content':'balls-content'">
                <!--和值-->
                <ul class="balls" v-if="item.name === '和值'">
                  <li v-for="(val, key) in item.detail" :key="key"
                      @click="betCheck(val)">
                    <div :class="{'active': val.selected}">
                      <span>{{ val.value }}</span>
                      <i>{{ val.addOdds }}</i>
                    </div>
                  </li>
                </ul>
                <!--二同号-->
                <ul class="balls" v-else>
                  <li v-for="(val, key) in item.detail" :key="key"
                      @click="betCheck_gf(val)">
                    <span :class="{'active': val.selected}">{{ val.value }}</span>
                  </li>
                </ul>
              </div>
              <!-- 其它玩法 -->
              <ul v-else
                  :class="item.name.includes('不同号')?'circle-content':'square-content'">
                <li v-for="(val, key) in item.detail" :key="key"
                    @click="betCheck_gf(val)">
                  <div :class="[val.selected?'active':'']">
                    <span>
                      {{ val.value }}
                    </span>
                    <b v-if="item.name === '二同号复选'">*</b>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- 信用玩法 -->
          <ul v-else class="classic-method">
            <li v-for="(item, key) in codeList" :key="key"
                :class="{active: item.selected, notNum: isNaN(item.alias[0]) && item.name !== '全骰'}"
                @click="betCheck(item)">
              <div class="method-item">
                <div class="number-item">
                  <!--vincent start-->
                  <!--单个数字-->
                  <em v-if="formatNumber(item.alias)[0]"
                      :class="['ksNum'+formatNumber(item.alias)[1]]"
                      v-html="item.selected && (item.alias === '1' || item.alias === '2' || item.alias === '3' || item.alias === '4' || item.alias === '5' || item.alias === '6') ? '':formatNumber(item.alias)[1]">
                  </em>
                  <!--多个数字，数组-->
                  <div v-else class="arr-number">
                    <em v-for="(num, index) in formatNumber(item.alias)[1]"
                        :class="['ksNum'+num]"
                        v-html="item.selected && (num === '1' || num === '2' || num === '3' || num === '4' || num === '5' || num === '6') ? '':num"></em>
                  </div>
                  <!--<em :class="{['ksNum' + item.alias[0]]: !isNaN(item.alias[0]) && item.cateName !== '点数', 'ks_f': item.cateName === '围骰', 'ks_fg': item.cateName === '长牌' || item.cateName === '短牌'}"-->
                  <!--v-if="item.selected && (item.alias === '1' || item.alias === '2' || item.alias === '3' || item.alias === '4' || item.alias === '5' || item.alias === '6')">-->
                  <!--&lt;!&ndash;{{ item.alias }}&ndash;&gt;-->
                  <!--</em>-->
                  <!--<em :class="{['ksNum' + item.alias[0]]: !isNaN(item.alias[0]) && item.cateName !== '点数', 'ks_f': item.cateName === '围骰', 'ks_fg': item.cateName === '长牌' || item.cateName === '短牌'}"-->
                  <!--v-else>-->
                  <!--{{ item.alias }}-->
                  <!--</em>-->
                  <!--vincent end-->

                  <!--<em :class="{['ksNum' + item.alias[0]]: !isNaN(item.alias[0]) && item.cateName !== '点数', 'ks_f': item.cateName === '围骰', 'ks_fg': item.cateName === '长牌' || item.cateName === '短牌'}"-->
                  <!--&gt;-->
                  <!--{{ item.alias }}-->
                  <!--</em>-->
                  <!--<em :class="{['ks_f ksNum' + item.alias[0]]: !isNaN(item.alias[0])}" v-if="item.cateName === '围骰'">-->
                  <!--{{ item.alias }}-->
                  <!--</em>-->
                  <!--<em :class="{['ks_f ksNum' + item.alias[0]]: !isNaN(item.alias[0])}" v-if="item.cateName === '围骰'">-->
                  <!--{{ item.alias }}-->
                  <!--</em>-->
                  <!--<em :class="{['ks_fg ksNum' + item.alias[2]]: !isNaN(item.alias[2])}"-->
                  <!--v-if="item.cateName === '长牌' || item.cateName === '短牌' || item.cateName === '围骰'">-->
                  <!--{{ item.alias }}-->
                  <!--</em>-->
                </div>
                <i class="odds">{{$t('lang.lottery.odds')}}:{{ item.addOdds }}</i>
              </div>
            </li>
          </ul>
        </div>
        <!-- pk10 -->
        <div v-if="lotteryName === 'pk10'"
             class="pk10"
             :class="{'reduce-height': betsNum}" ref="bets">
          <!-- 官方玩法 -->
          <div v-if="playType" class="office-method">
            <!-- 赔率 -->
            <div class="title-odds">
              <span>
                <em>{{$t('lang.lottery.odds')}}:</em>
                <em class="num">{{ detailList.addOdds }}</em>
              </span>
            </div>
            <!-- 单式投注 -->
            <div v-if="isSimplex" class="simple-wrapper">
              <div class="wrapper">
                <textarea v-model="singleCode" maxlength="200"
                          @input.stop="codeDebounce"></textarea>
              </div>
              <div class="btn-group">
                <span @click="clearRepeat">
                  <i class="iconfont iconic-del"></i>
                  <!--删除重复号-->
                  <em>{{$t('lang.lottery.simplexOption[0]')}}</em>
                </span>
                <span @click="singleCode = ''">
                  <i class="iconfont iconic-clear"></i>
                  <!--清空-->
                  <em>{{$t('lang.lottery.simplexOption[1]')}}</em>
                </span>
              </div>
              <p class="tips">
                {{$t('lang.lottery.simplexTips_1[0]')}}<em>2</em>
                {{$t('lang.lottery.simplexTips_1[1]')}}<em>0</em>
                {{$t('lang.lottery.simplexTips_1[2]')}}<em>5</em>
                {{$t('lang.lottery.simplexTips_1[3]')}}<em>05</em>.
              </p>
              <p class="tips">
                {{$t('lang.lottery.simplexTips_2[0]')}}<em>[ ]</em>
                {{$t('lang.lottery.simplexTips_2[1]')}}.
              </p>
              <p class="tips">
                {{$t('lang.lottery.simplexTips_3[0]')}}
                <em>{{$t('lang.lottery.simplexOption[0]')}}</em>
                {{$t('lang.lottery.simplexTips_3[1]')}}
              </p>
            </div>
            <!-- 复试投注 -->
            <ul v-else class="compound">
              <li v-for="(item, key) in codeList" :key="key">
                <div class="title">
                  <span v-if="key < 3">{{ pkDw[key] }}</span>
                  <span v-else>{{ item.name }}</span>
                  <div class="tools">
                    <QuickOption v-if="firstSelected === 5 || firstSelected === 6"
                                 :lotteryName='lotteryName' :keys='key'
                                 @betConfig="betConfig(arguments)"
                                 @clearPK10="clearCode()"/>
                    <QuickOption v-else :lotteryName='lotteryName' :keys='key'
                                 @betConfig="betConfig(arguments)"
                                 @clearPK10="clearPK10(key)"/>
                  </div>
                </div>
                <!-- 定位胆 -->
                <ul v-if="firstSelected === 0" class="number-content">
                  <li v-for="(val, key) in item.detail" :key="key">
                    <div @click="betCheck(val)"
                         :class="{'active': val.selected}">
                      <span>{{ val.alias }}</span>
                    </div>
                  </li>
                </ul>
                <!-- 其它玩法 -->
                <ul v-else class="number-content">
                  <li v-for="(val, key) in item.detail" :key="key"
                      @click="betCheck_gf(val)">
                    <div :class="{'active': val.selected}">
                      <span>{{ val.alias }}</span>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <!-- 信用玩法 -->
          <div v-else class="classic-method">
            <van-collapse v-model="activeNames" :border="false"
                          v-for="(item, key) in codeList.children"
                          :key="item.alias">
              <van-collapse-item :title="item.name" :name="key" style="text-align:left;">
                <!-- 数字号码 -->
                <ul class="number-content" v-if="key === 0 && firstSelected !== 4">
                  <li v-for="(val, key) in item.detail" @click="betCheck(val)" :key="key">
                    <div :class="{'active': val.selected}">
                      <span>{{ val.alias }}</span>
                      <i>{{ val.addOdds }}</i>
                    </div>
                  </li>
                </ul>
                <!-- 非数字号码 -->
                <ul class="spare-content" v-else>
                  <li v-for="val in item.detail" :key="val.alias"
                      @click="betCheck(val)">
                    <div :class="{active: val.selected}">
                      <span>{{ val.alias }}</span>
                      <i>{{$t('lang.lottery.odds')}}:{{ val.addOdds }}</i>
                    </div>
                  </li>
                </ul>
              </van-collapse-item>
            </van-collapse>
          </div>
        </div>
        <!-- 11选5 ok-->
        <div v-if="lotteryName === '11x5'"
             class="eleven-five"
             :class="{'reduce-height': betsNum}"
             ref="bets">
          <!-- 连码玩法单独渲染 -->
          <div v-if="firstSelected ===  2" class="joint-code">
            <ul class="number-content">
              <li v-for="(val, key) in codeList.children[codeFiveNum].detail"
                  :key="key"
                  @click="betCheck(val)">
                <div :class="{'active': val.selected}">
                  <span>{{ val.value }}</span>
                  <i>{{ val.addOdds }}</i>
                </div>
              </li>
            </ul>
          </div>
          <div v-else class="normal-playing">
            <!-- 官方玩法 -->
            <div v-if="playType" class="office-method">
              <!-- 赔率 -->
              <div class="title-odds" v-if="detailList.name !== '定单双'">
                <span>
                  <em>{{$t('lang.lottery.odds')}}:</em>
                  <em class="num">{{ detailList.addOdds }}</em>
                </span>
              </div>
              <!-- 单式投注 -->
              <div v-if="isSimplex" class="simple-wrapper">
                <div class="wrapper">
                  <textarea v-model="singleCode" maxlength="200"
                            @input.stop="codeDebounce"></textarea>
                </div>
                <div class="btn-group">
                <span @click="clearRepeat">
                  <i class="iconfont iconic-del"></i>
                  <em>{{$t('lang.lottery.simplexOption[0]')}}</em>
                </span>
                  <span @click="singleCode = ''">
                  <i class="iconfont iconic-clear"></i>
                  <em>{{$t('lang.lottery.simplexOption[1]')}}</em>
                </span>
                </div>
                <p class="tips">
                  {{$t('lang.lottery.simplexTips_1[0]')}}<em>2</em>
                  {{$t('lang.lottery.simplexTips_1[1]')}}<em>0</em>
                  {{$t('lang.lottery.simplexTips_1[2]')}}<em>5</em>
                  {{$t('lang.lottery.simplexTips_1[3]')}}<em>05</em>.
                </p>
                <p class="tips">
                  {{$t('lang.lottery.simplexTips_2[0]')}}<em>[ ]</em>
                  {{$t('lang.lottery.simplexTips_1[1]')}}.
                </p>
                <p class="tips">
                  {{$t('lang.lottery.simplexTips_3[0]')}}
                  <em>{{$t('lang.lottery.simplexOption[0]')}}</em>
                  {{$t('lang.lottery.simplexTips_3[1]')}}
                </p>
              </div>
              <!-- 复试投注 -->
              <ul v-else class="compound">
                <li v-for="(item, key) in codeList" :key="key">
                  <div v-if="item.name !== '定单双'">
                    <div class="title">
                      <span>{{ item.name }}</span>
                      <!-- 定位胆、直选快捷选项 -->
                      <div class="tools">
                        <QuickOption v-if="firstSelected > 3 && firstSelected < 7 && item.name.substr(-4) !== '组选复式'"
                                     :lotteryName='lotteryName' :keys='key' @betConfig="betConfig(arguments)"
                                     @clearPK10="clearPK10(key)"/>
                        <!-- 组选快捷选项 -->
                        <QuickOption v-else :lotteryName='lotteryName' :keys='key' @betConfig="betConfig(arguments)"
                                     @clearPK10="clearCode()"/>
                      </div>
                    </div>
                    <!-- 定位胆、猜中位 -->
                    <ul v-if="firstSelected === 4 || item.name === '猜中位'"
                        class="number-content">
                      <li v-for="(val, key) in item.detail" :key="key">
                        <div :class="{'active': val.selected}"
                             @click="betCheck(val)">
                          <span>{{ val.value }}</span>
                          <i v-if="item.name === '猜中位'">{{ val.addOdds }}</i>
                        </div>
                      </li>
                    </ul>
                    <!-- 其它玩法 -->
                    <ul v-else class="number-content">
                      <li v-for="(val, key) in item.detail" :key="key">
                        <div :class="{'active': val.selected}"
                             @click="betCheck_gf(val)">
                          <span>{{ val.value }}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <!-- 定单双单独处理 -->
                  <div v-else>
                    <ul class="spare-content">
                      <li v-for="val in item.detail" :key="val.alias">
                        <div :class="{active: val.selected}" @click="betCheck(val)">
                          <span>{{ val.value }}</span>
                          <i>{{$t('lang.lottery.odds')}}:{{ val.addOdds }}</i>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <!-- 信用玩法 -->
            <div v-else class="classic-method">
              <van-collapse v-model="activeNames" :border="false" v-for="(item, key) in codeList.children" :key="key">
                <van-collapse-item :title="item.name" :name="key" style="text-align:left;">
                  <!-- 数字号码 -->
                  <ul class="number-content" v-if="firstSelected === 1 || firstSelected === 3">
                    <li v-for="(val, key) in item.detail" :key="key">
                      <div :class="{'active': val.selected, 'isDis': val.isDis}"
                           @click="betCheck(val, item.name)">
                        <span>{{ val.value }}</span>
                        <i class="odds" :class="{'isDis': val.isDis}">{{ val.addOdds }}</i>
                      </div>

                    </li>
                  </ul>
                  <!-- 非数字号码 -->
                  <ul class="spare-content" v-else>
                    <li v-for="(val, ids) in item.detail" :key="ids">
                      <div :class="{active: val.selected}"
                           @click="betCheck(val)">
                        <span>{{ val.value }}</span>
                        <i class="odds">{{ val.addOdds }}</i>
                      </div>
                    </li>
                  </ul>
                </van-collapse-item>
              </van-collapse>
            </div>
          </div>
        </div>
        <!-- 广东快乐十分 ok-->
        <div v-if="lotteryName === 'gdklsf'"
             class="happy10min"
             :class="{'reduce-height': betsNum}" ref="bets">
          <van-collapse v-model="activeNames" :border="false"
                        v-for="(item, key) in codeList.children" :key="key">
            <van-collapse-item :title="item.name" :name="key" style="text-align:left;">
              <!-- 数字号码 -->
              <ul class="number-content" v-if="firstSelected !== 5">
                <li v-for="(val, key) in item.detail" :key="key"
                    :class="{'ishiden': isNaN(val.value)}"
                    v-if="!isNaN(val.value)">
                  <div :class="{'active': val.selected, 'isDis': val.isDis}"
                       @click="betCheck(val, item.name)">
                    <span>{{ val.value }}</span>
                    <i :class="{'isDis': val.isDis}">{{ val.addOdds }}</i>
                  </div>
                </li>
              </ul>
              <!-- 非数字号码 -->
              <ul class="spare-content" v-else>
                <li v-for="(val, ids) in item.detail" :key="ids"
                    v-if="isNaN(val.value)">
                  <div :class="{'active': val.selected, 'ishiden': !isNaN(val.value)}"
                       @click="betCheck(val)">
                    <span>{{ val.value }}</span>
                    <i>{{$t('lang.lottery.odds')}}:{{ val.addOdds }}</i>
                  </div>
                </li>
              </ul>
            </van-collapse-item>
          </van-collapse>
        </div>
        <!-- 广西快乐十分 ok-->
        <div v-if="lotteryName === 'gxklsf'"
             class="happy10min" :class="{'reduce-height': betsNum}" ref="bets">
          <van-collapse v-model="activeNames" :border="false" v-for="(item, key) in codeList.children" :key="key">
            <!-- 赔率 -->
            <!--<p class="ks_odds clearfix" v-if="firstSelected === 3">-->
            <!--<span>赔率：-->
            <!--<em>{{ item.detail[0].addOdds }}</em>-->
            <!--</span>-->
            <!--</p>-->
            <div class="title-odds" v-if="firstSelected === 3">
              <span>
                <em>{{$t('lang.lottery.odds')}}:</em>
                <em class="num">{{ item.detail[0].addOdds }}</em>
              </span>
            </div>
            <!-- 玩法 -->
            <van-collapse-item :title="item.name" :name="key" style="text-align:left;">
              <!-- 数字号码 -->
              <ul class="number-content"
                  v-if="firstSelected === 1 || firstSelected === 3 || (firstSelected === 2 && key === 0)">
                <li v-for="(val, key) in item.detail" :key="key"
                    v-if="!isNaN(val.value)"
                    :class="{'ishiden': isNaN(val.value)}">
                  <div @click="betCheck(val, item.name)">
                    <span :class="{'active': val.selected, 'isDis': val.isDis}">{{ val.value }}</span>
                    <i :class="{'isDis': val.isDis}">{{ val.addOdds }}</i>
                  </div>

                </li>
              </ul>
              <!-- 非数字号码 -->
              <ul class="spare-content" v-else>
                <li v-for="(val, ids) in item.detail" :key="ids"
                    v-if="isNaN(val.value)">
                  <div :class="{'active': val.selected, 'ishiden': !isNaN(val.value)}"
                       @click="betCheck(val)">
                    <span>{{ val.value }}</span>
                    <i>{{ val.addOdds }}</i>
                  </div>
                </li>
              </ul>
            </van-collapse-item>
          </van-collapse>
        </div>
        <!-- PC蛋蛋 -->
        <div v-if="lotteryName === 'pcdd'"
             :class="{'reduce-height': betsNum }"
             class="pc-egg" ref="bets">
          <!-- 数字号码 -->
          <ul class="number-content" v-if="firstSelected > 1">
            <li v-for="(item, key) in codeList" :key="key">
              <div @click="betCheck(item)" :class="{'active': item.selected}">
                <span>{{ item.value }}</span>
                <i>{{ item.addOdds }}</i>
              </div>
            </li>
          </ul>
          <!-- 非数字号码 -->
          <ul class="spare-content" v-else>
            <li v-for="(item, key) in codeList" :key="key"
                @click="betCheck(item)">
              <div :class="{active: item.selected}">
                <span>{{ item.alias }}</span>
                <i>{{$t('lang.lottery.odds')}}:{{ item.addOdds }}</i>
              </div>
            </li>
          </ul>
        </div>
        <!-- 北京快乐8 ok-->
        <div v-if="lotteryName === 'bjkl8'"
             class="happy10min"
             :class="{'reduce-height': betsNum, 'bet-bjj': firstSelected === 1}"
             ref="bets">
          <!-- 选1-5玩法单独渲染 -->
          <div v-if="firstSelected ===  1" class="other-method">
            <ul class="number-content">
              <li v-for="(val, key) in codeList.children[codeFiveNum].detail" :key="key">
                <div @click="betCheck(val)" :class="{'active': val.selected}">
                  <span>{{ val.value }}</span>
                  <i class="odds pk_em">{{ val.addOdds }}</i>
                </div>
              </li>
            </ul>
          </div>
          <div v-else class="normal-method">
            <!-- 官方玩法 -->
            <div v-if="playType" class="office-method">
              <!-- 赔率 -->
              <!--<p class="ks_odds clearfix" v-if="firstSelected === 2">-->
              <!--<span>赔率：-->
              <!--<em>{{ codeList[0].addOdds }}</em>-->
              <!--</span>-->
              <!--</p>-->
              <div class="title-odds" v-if="firstSelected === 2">
              <span>
                <em>{{$t('lang.lottery.odds')}}:</em>
                <em class="num">{{ codeList[0].addOdds }}</em>
              </span>
              </div>
              <van-collapse v-model="kl8Names" :border="false">
                <van-collapse-item :title="codeList[0].name" name="1" style="text-align:left;">
                  <!-- 数字号码 -->
                  <ul class="number-content" v-if="firstSelected === 2">
                    <li v-for="(item, key) in codeList" :key="key">
                      <div :class="{'active': item.selected}"
                           @click="betCheck_gf(item)">
                        <span>{{ item.value }}</span>
                      </div>
                      <!--                      <i class="odds od">{{ item.addOdds }}</i>-->
                    </li>
                  </ul>
                  <!-- 非数字号码 -->
                  <ul class="spare-content" v-else>
                    <li v-for="(item, key) in codeList" :key="key">
                      <div :class="{active: item.selected}"
                           @click="betCheck(item)">
                        <span>{{ item.value }}</span>
                        <i>{{$t('lang.lottery.odds')}}:{{ Number(item.addOdds).toFixed(3) }}</i>
                      </div>
                    </li>
                  </ul>
                </van-collapse-item>
              </van-collapse>
            </div>
            <!-- 信用玩法 -->
            <div v-else class="classic-method">
              <van-collapse v-model="activeNames" :border="false" v-for="(item, key) in codeList.children"
                            :key="item.alias">
                <van-collapse-item :title="item.name" :name="key" style="text-align:left;">
                  <ul class="spare-content">
                    <li v-for="val in item.detail" :key="val.alias">
                      <div @click="betCheck(val)"
                           :class="{active: val.selected}">
                        <span>{{ val.value }}</span>
                        <i>{{$t('lang.lottery.odds')}}:{{ val.addOdds }}</i>
                      </div>
                    </li>
                  </ul>
                </van-collapse-item>
              </van-collapse>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PlayTips v-if="isShowTips"
              @closeDialog="isShowTips=false"
              :lotteryName="lotteryName"
              :showDialog="isShowTips"
              :firstSelected="firstSelected"
              :firstMenu="firstMenu"
              :isSecond="isSecond"
              :secondSelected="secondSelected"/>
  </div>
</template>

<script>
  import BScroll from "better-scroll";
  import {arrRemoval, sortArray, towArray} from '../../../utils/public'
  import {mapGetters, mapMutations,mapState} from 'vuex'
  import {Toast} from 'vant'
  import {LANG} from "../../../utils/mode";

  export default {
    data() {
      return {
        LANG: LANG,
        activeNames: [0, 1, 2, 3, 4, 5, 6, 7],
        kl8Names: ['1'],
        betInfo: '', // 官方玩法号码集合
        betsNum: 0, // 下注笔数
        codeArr: [], // 下注号码集合
        betList: [],
        zodiac: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
        betDetail: [], // 注单
        betOdds: [], // 赔率组合
        playOdds: [], // 六合彩 - 连肖、连尾赔率组合
        oddsArr: [], // 六合彩 - 连肖、连尾赔率队列
        zodiacCode: [], // 六合彩 - 生肖
        codeFive: [], // 11选5 - 连码
        codeFiveNum: 0,
        isShowTips: false,
        resetOdds: '', // 合肖赔率
        singleCode: '', // 单式投注号码
        timer: null, //
        selectTimer: null,
        pk_singleCode: [],
        userAmount: "",
        pkDw: ['第一名', '第二名', '第三名']
      }
    },
    components: {
      NotData: resolve => require(['../../../commons/notdata/NotData'], resolve),
      PlayTips: resolve => require(['./PlayTips'], resolve),
      QuickOption: resolve => require(['./QuickOption'], resolve),
    },
    props: {
      lotteryName: String, // 彩种名称
      isLoading: Boolean, // 数据加载
      lotteryId: String, // 彩种ID
      isSecond: Boolean, // 二级菜单是否显示
      firstSelected: Number, // 一级菜单选项
      secondSelected: Number, // 二级菜单选项
      visibleNumber: Array, // 数字号码
      visibleNoNumber: Array, // 非数字号码
      bigNum: Number, // 大小数值
      totalNum: Number, // 号码总数
      playType: { // 玩法类型 - 默认信用玩法
        type: Boolean,
        default: false
      },
      firstMenu: {  // 菜单数据
        type: [Object, Array],
        default: () => {
          return {}
        }
      },
      codeList: {  // 具体玩法
        type: [Object, Array],
        default: () => {
          return {}
        }
      },
      detailList: { // 自定义号码属性取值
        type: [Object, Array],
        default: () => {
          return {}
        }
      },
    },
    computed: {
      ...mapState([
        'balance',
        'isLogin'
      ]),
      ...mapGetters(['userInfo']),
      // 用户余额
      userAmount1() {
        this.userAmount = parseFloat(this.balance).toFixed(2)
      },
      // 六合彩快捷选项
      isQuick() {
        let [menu, isBool] = [this.firstMenu, false]
        menu.code === `${menu.gameId}200` && menu.name !== '特码半波' && menu.name !== '正码半波' && menu.name !== '两面' ? isBool = true : isBool = false
        return isBool
      },
      // pk10、11选5单式投注判断
      isSimplex() {
        if (this.lotteryName === 'pk10' || this.lotteryName === '11x5') {
          let bool = null
          Object.prototype.toString.call(this.codeList).slice(8, -1) === 'Array' ? bool = false : bool = true
          return bool
        }
      }
    },
    created() {
      this.userAmount = this.$cookie.get('token') ? parseFloat(this.balance).toFixed(2) : '';
    },
    watch: {},
    methods: {
      // vincent -- start
      formatNumber(str) {
        if (str.length > 1) {
          let arr = str.split('_');
          return [false, arr];
        } else {
          return [true, str]
        }
      },
      ...mapMutations({
        setData:'SET_DATA'
      }),
      // vincent -- end
      ...mapMutations('user', ['SET_USER_INFO']),
      /**
       * 注单组合（信用玩法）
       * @param item 下注对象
       * @param item 11选5直选第几球
       * @param bets 组合数组笔数
       */
      betCheck(item, nameX5) {
        console.log(item, nameX5, 'ddddd');
        // 11选5、快乐十分直选处理
        if ((this.lotteryName === '11x5' && !this.playType) || (this.lotteryName === 'gdklsf' && this.firstSelected > 0 && this.firstSelected < 3 && this.secondSelected === 1)) {
          item.name = nameX5
          // 禁止选中
          if (item.isDis) return false
        }
        item.selected = !item.selected
        let list = this.codeList[0] || null
        // 六合彩增加大小单双标识
        if (this.lotteryName === 'lhc') item.config = nameX5
        // 自定义号码属性获取
        if (item.isAddAttr) list = this.detailList
        // 六合彩连码、自选不中、11选5及其它自定义号码取相应属性值
        if ((list && list.isAddAttr) || item.isAddAttr) {
          item.cateName = list.cateName
          item.addOdds = list.addOdds
          item.minOdds = list.minOdds
          item.maxOdds = list.maxOdds
          item.rebate = list.rebate
          item.code = list.code
          item.nums = list.nums
          item.betsNum = list.betsNum
          // 中二、中特需要传两位赔率给后台
          if (list.name === '中二' || list.name === '中特') {
            item.addOdds = [list.addOdds, this.codeList[1].addOdds]
            item.addOdds.sort((a, b) => a - b)
            var conList = this.codeList[1]
          }
        }
        // 笔数计算
        if (item.selected) {
          this.codeArr.push(item.value)
          this.betDetail.push(item)
          this.betOdds.push(item.addOdds)
          // 连肖、连尾赔率组合
          if (item.isZodiac) this.playOdds.push(item.addOdds)
          // 复试投注最大笔数计算
          if (item.betsNum && (this.codeArr.length > item.betsNum)) {
            item.selected = false
            this.codeArr.pop()
            if (item.isZodiac) this.playOdds.pop()
            return Toast(`最多可以选择${item.betsNum}个号码`)
          }
          this.betsNum = sortArray(this.codeArr, item.nums).length
          console.log(12345,this.betsNum,item.nums,this.codeArr);
          if (item.isZodiac) this.oddsArr = sortArray(this.playOdds, item.nums)
        } else {
          this.betDetail.map((val, key) => {
            if (!val.selected) {
              this.codeArr.splice(key, 1)
              this.betDetail.splice(key, 1)
              this.betOdds.splice(key, 1)
              if (item.isZodiac) this.playOdds.splice(key, 1)
            }
          })
          if (item.isZodiac) this.oddsArr = sortArray(this.playOdds, item.nums)
          this.betsNum = sortArray(this.codeArr, item.nums).length
        }
        // 11选5前二、前三直选
        if ((this.lotteryName === '11x5' && this.firstSelected === 3) || (this.lotteryName === 'gdklsf' && this.firstSelected > 0 && this.firstSelected < 3 && this.secondSelected === 1)) {
          var [len, arrs] = [0, null]
          // 区分前二、 前三
          this.codeList.children.length === 2 ? arrs = [[], []] : arrs = [[], [], []]
          // 判断选二、选三玩法
          nameX5 === '第一球' || nameX5 === '第一位' ? len = 0 : (nameX5 === '第二球' || nameX5 === '第二位' ? len = 1 : len = 2)
          this.codeList.children.forEach((res, i) => {
            res.detail.forEach(val => {
              if (i !== len && item.value === val.value) {
                // 增加禁用标识
                if (item.selected) {
                  val.isDis = true
                } else {
                  val.isDis = false
                }
              }
              if (val.selected) arrs[i].push(val.value)
            })
          })
          this.codeArr = towArray(arrs)
          console.log(this.codeArr)
          // 注数确定
          this.betsNum = this.codeArr.length
          let num = this.codeArr.length - this.betDetail.length
          if (num > 0) {
            for (let i = 0; i < num; i++) {
              let arr = JSON.parse(JSON.stringify(item))
              this.betDetail.push(arr)
            }
          }
        }
        // PK10、11选5 定位单单独处理
        if ((this.lotteryName === 'pk10' && this.firstSelected === 0) || (this.lotteryName === '11x5' && this.firstSelected === 4)) {
          let arr = [[], [], [], [], [], [], [], [], [], []]
          let ds = []
          this.codeArr = []
          this.betDetail.forEach(val => {
            ds.push(val.name)
            switch (val.poschooseName) {
              case '第一':
                arr[0].push(val.value)
                break
              case '第二':
                arr[1].push(val.value)
                break
              case '第三':
                arr[2].push(val.value)
                break
              case '第四':
                arr[3].push(val.value)
                break
              case '第五':
                arr[4].push(val.value)
                break
              case '第六':
                arr[5].push(val.value)
                break
              case '第七':
                arr[6].push(val.value)
                break
              case '第八':
                arr[7].push(val.value)
                break
              case '第九':
                arr[8].push(val.value)
                break
              case '第十':
                arr[9].push(val.value)
                break
            }
          })
          arr.forEach(val => {
            if (val.length > 0) this.codeArr.push(val)
          })
          var setDs = new Set(ds)
          setDs = [...setDs]
          this.betsNum = this.betDetail.length
        }
        // 注单集合
        if (this.betsNum > 0) {
          this.$EventBus.$emit('chooseNum', JSON.stringify(sortArray(this.codeArr, item.nums)), JSON.stringify(this.oddsArr), this.betDetail, this.betOdds, JSON.stringify(setDs), JSON.stringify(conList))
        } else {
          this.$EventBus.$emit('chooseNum', false, false)
        }
      },
      /**
       * 注单组合（官方玩法）
       * @param item 下注对象
       * @param bets 组合数组笔数
       */
      betCheck_gf(item) {
        // 具体号码
        this.betInfo = ''
        item.selected = !item.selected
        // 自定义号码取相应属性值
        if (item.isAddAttr) {
          let list = this.detailList
          item.cateName = list.cateName
          item.addOdds = list.addOdds
          item.minOdds = list.minOdds
          item.maxOdds = list.maxOdds
          item.rebate = list.rebate
          item.code = list.code
          item.nums = list.nums
          item.betsNum = list.betsNum
        }
        // 选中
        if (item.selected) {
          this.codeArr.push(item.value)
          this.betDetail.push(item)
        } else {
          this.betDetail.map((val, key) => {
            if (!val.selected) {
              this.codeArr.splice(key, 1)
              this.betDetail.splice(key, 1)
            }
          })
        }
        // 二同号单选处理
        console.log(this.betInfo,1)
        if (item.cateName === '二同号单选 ') {
          console.log(this.codeArr,'this.codeArr');
          let obj = arrRemoval(this.codeArr)
          console.log(obj,'obj');
          let [num, len, newArr] = [obj.num, null, [[], []]]
          num.toString().length > 1 ? len = 0 : len = 1
          this.codeArr = []
          this.codeList.forEach((item, key) => {
            item.detail.forEach(res => {
              if (len === key && res.value === num) res.selected = false
              if (res.selected) this.codeArr.push(res.value)
            })
          })
          // 筛选号码计算组数
          this.codeArr.map(val => {
            if (val > 10) {
              newArr[0].push(val)
            } else {
              newArr[1].push(val)
            }
          })
          if (newArr[0].length > 0 && newArr[1].length > 0) {
            this.betsNum = towArray(newArr).length
            // 筛选具体号码
            this.betInfo = newArr[0].join() + '|' + newArr[1].join()

            console.log(this.betsNum,'---',this.betInfo);
          } else {
            this.betsNum = 0
          }
        }

        else if (item.cateName === '三同号复选' || item.cateName === '三连号') {
          if (item.selected) {
            this.codeList[0].detail.map(item => item.selected = true)
            this.betsNum = 1
            item.cateName === '三连号' ? this.betInfo = '三连号通选' : this.betInfo = '三同号通选'
          } else {
            this.codeList[0].detail.map(item => item.selected = false)
            this.betsNum = 0
            this.betInfo = ''
          }
        }
        // pk10、11选5官方玩法复试投注处理
        else if ((this.lotteryName === 'pk10' && this.firstSelected > 6) || (this.lotteryName === '11x5' && this.firstSelected > 4 && this.firstSelected < 7)) {
          let [arr, arr1, arr2, arr3, arr4] = [[], [], [], [], []]
          this.betDetail.map(item => {
            if (item.poschooseName === '第一') {
              arr.push(item.value)
            }
            if (item.poschooseName === '第二') {
              arr1.push(item.value)
            }
            if (item.poschooseName === '第三') {
              arr2.push(item.value)
            }
            if (item.poschooseName === '第四') {
              arr3.push(item.value)
            }
            if (item.poschooseName === '第五') {
              arr4.push(item.value)
            }
          })
          // 11选5二码、三码组选复式处理
          if (arr.length <= 0 && this.lotteryName === '11x5') {
            this.codeArr.map(val => this.betInfo += val + '|')
            this.betInfo = this.betInfo.slice(0, -1)
            this.betsNum = sortArray(this.codeArr, item.nums).length
          }
          else {
            // 前二
            if ((this.firstSelected === 7 && this.lotteryName === 'pk10') || (this.lotteryName === '11x5' && this.firstSelected === 6)) {
              if (arr.length > 0 && arr1.length > 0) {
                let arrSize = towArray([arr.sort((a, b) => a - b), arr1.sort((a, b) => a - b)]);
                console.log(arrSize,arr,arr1,'arrSizearrSizearrSize');
                arrSize.map((val, key) => {
                  if (val[0].includes(val[1])) arrSize.splice(key, 1)
                })
                this.betInfo = arr.join() + '|' + arr1.join()
                this.betsNum = arrSize.length
              } else {
                this.betsNum = 0
              }
            }
            // 前三
            if ((this.firstSelected === 8 && this.lotteryName === 'pk10') || (this.lotteryName === '11x5' && this.firstSelected === 5)) {
              if (arr.length > 0 && arr1.length > 0 && arr2.length > 0) {
                let arrSize = towArray([arr.sort((a, b) => a - b), arr1.sort((a, b) => a - b), arr2.sort((a, b) => a - b)])
                let newArr = []
                console.log(arrSize,'arrSizearrSize');
                arrSize.map((val, key) => {
                  console.log(val, key,'val,key');
                  if (val[0].includes(val[1]) || val[0].includes(val[2]) || val[1].includes(val[2])){
                    newArr.push(key)
                  }
                })
                console.log(newArr,'newArrnewArr');
                this.betInfo = arr.join() + '|' + arr1.join() + '|' + arr2.join()
                this.betsNum = arrSize.length - newArr.length
              } else {
                this.betsNum = 0
              }
            }
            // 前四
            if (this.firstSelected === 9 && this.lotteryName === 'pk10') {
              if (arr.length > 0 && arr1.length > 0 && arr2.length > 0 && arr3.length > 0) {
                let arrSize = towArray([arr.sort((a, b) => a - b), arr1.sort((a, b) => a - b), arr2.sort((a, b) => a - b), arr3.sort((a, b) => a - b)])
                let newArr = []
                arrSize.map((val, key) => {
                  if (val[0].includes(val[1]) || val[0].includes(val[2]) || val[0].includes(val[3]) || val[1].includes(val[2]) || val[1].includes(val[3]) || val[2].includes(val[3])) newArr.push(key)
                })
                this.betInfo = arr.join() + '|' + arr1.join() + '|' + arr2.join() + '|' + arr3.join()
                this.betsNum = arrSize.length - newArr.length
              } else {
                this.betsNum = 0
              }
            }
            // 前五
            if (this.firstSelected === 10 && this.lotteryName === 'pk10') {
              if (arr.length > 0 || arr1.length > 0 || arr2.length > 0 || arr3.length > 0 || arr4.length > 0) {
                let arrSize = towArray([arr.sort((a, b) => a - b), arr1.sort((a, b) => a - b), arr2.sort((a, b) => a - b), arr3.sort((a, b) => a - b), arr4.sort((a, b) => a - b)])
                let newArr = []
                arrSize.map((val, key) => {
                  if (val[0].includes(val[1]) || val[0].includes(val[2]) || val[0].includes(val[3]) || val[0].includes(val[4]) ||
                    val[1].includes(val[2]) || val[1].includes(val[3]) || val[1].includes(val[4]) || val[2].includes(val[3]) || val[2].includes(val[4]) || val[3].includes(val[4])) newArr.push(key)
                })
                this.betInfo = arr.join() + '|' + arr1.join() + '|' + arr2.join() + '|' + arr3.join() + '|' + arr4.join()
                this.betsNum = arrSize.length - newArr.length
              } else {
                this.betsNum = 0
              }
            }
          }
        }
        else {
          console.log(this.betInfo,this.codeArr,this.betsNum,22222222222)
          // 笔数计算, num 为复数投注,k3的和值算法
          item.num ? this.betsNum = sortArray(this.codeArr, item.num).length : this.betsNum = this.codeArr.length
          // 11选5任选复式最大选号码
          if (item.betsNum && (this.codeArr.length > item.betsNum) && this.lotteryName === '11x5') {
            item.selected = false
            this.codeArr.pop()
            return Toast(`最多可以选择${item.betsNum}个号码`)
          }
          // 投注号码排序处理
          if (this.codeArr.length > 1) {
            // 暂停顺序排序
            let sortArr = this.codeArr
            sortArr.map(val => {
              if (item.cateName === '猜冠军' || item.cateName === '猜亚军') {
                this.betInfo += val + ','
              } else {
                this.betInfo += val + '|'
              }
            })
            this.betInfo = this.betInfo.slice(0, -1)
          } else {
            this.betInfo = this.codeArr[0]
          }
        }
        console.log(this.betInfo,this.betsNum)
        // 注单集合
        if (this.betsNum > 0) {
          this.$EventBus.$emit('chooseNum_Gf', JSON.stringify(item), this.betInfo, this.betsNum)
        } else {
          this.$EventBus.$emit('chooseNum_Gf', false)
        }
      },
      // 手动输入号码节流操作
      codeDebounce() {
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.filterCodes()
          this.timer = null
        }, 500)
      },
      // 手动输入号码过滤
      filterCodes() {
        let [newCode, arrCode, newArr, codeList] = ['', '', [], []]
        let [num, bigNum] = [this.codeList.num, 11]
        // 11选5最大数有11
        this.lotteryName === '11x5' ? bigNum = 12 : bigNum = 11
        this.singleCode = this.singleCode.replace(/[\r\n]/g, ' ')
        console.log(this.singleCode)
        if (this.singleCode.length > (num + 1)) {
          if (this.singleCode.includes(' ')) arrCode = this.singleCode.split(' ')
          if (!arrCode) {
            // 过滤特殊字符
            newCode = this.singleCode.replace(/[^\d]/g, '')
            // 号码分组
            for (let i = 0; i < newCode.length; i += 2) {
              newArr.push(newCode.slice(i, i + 2))
            }
            // 筛选合适的号码
            if (newArr.length > (num - 1)) {
              newArr.map(val => {
                if (Number(val) > 0 && Number(val) < bigNum && val.length === 2) codeList.push(val)
              })
            }
          } else {
            if (arrCode.length > (num - 1)) {
              arrCode.map(val => {
                // 过滤特殊字符
                val = val.replace(/[^\d]/g, '')
                if (Number(val) > 0 && Number(val) < bigNum && val.length === 2) codeList.push(val)
              })
            }
          }
          // 去重、重组标注号码
          if (codeList.length > 1 && (this.lotteryName === '11x5' && this.firstSelected === 9 && this.secondSelected !== 0)) {
            let [setArr, singleCode, newArr, betInfo] = [[], [], [], '']
            // 号码分组
            for (let i = 0; i < codeList.length; i += num) {
              singleCode.push(codeList.slice(i, i + num))
            }
            // 双重去重操作
            singleCode.map(val => {
              let newVal = new Set(val)
              if (newVal.size > 1) setArr.push(JSON.stringify([...newVal]))
            })
            console.log(setArr)
            for (let i = 0; i < setArr.length; i++) {
              if (!newArr.includes(setArr[i])) {
                if (JSON.parse(setArr[i]).length === num) newArr.push(setArr[i])
              }
            }
            this.pk_singleCode = newArr
            this.betsNum = newArr.length
            newArr.map(val => {
              val = JSON.parse(val)
              betInfo += val.join() + '|'
            })
            betInfo = betInfo.slice(0, -1)
            this.$EventBus.$emit('chooseNum_Gf', JSON.stringify(this.detailList), betInfo, this.betsNum)
            console.log(newArr, betInfo, this.detailList)
          }
          // 11选5一中一单独去重处理
          if (this.lotteryName === '11x5' && this.firstSelected === 9 && this.secondSelected === 0) {
            let newArr = [...new Set(codeList)]
            let betInfo = ''
            this.betsNum = newArr.length
            newArr.map(val => {
              betInfo += val + '|'
            })
            betInfo = betInfo.slice(0, -1)
            this.$EventBus.$emit('chooseNum_Gf', JSON.stringify(this.detailList), betInfo, this.betsNum)
            console.log(newArr, betInfo, this.detailList)
          }
        } else {
          this.betsNum = 0
          this.$EventBus.$emit('chooseNum_Gf', false)
        }
      },
      // 格式化号码
      clearRepeat() {
        let num = this.codeList.num
        this.singleCode = ''
        this.pk_singleCode.map(val => {
          val = JSON.parse(val)
          if (num === 2) this.singleCode += val[0] + ' ' + val[1] + ' '
          if (num === 3) this.singleCode += val[0] + ' ' + val[1] + ' ' + val[2] + ' '
          if (num === 4) this.singleCode += val[0] + ' ' + val[1] + ' ' + val[2] + ' ' + val[3] + ' '
          if (num === 5) this.singleCode += val[0] + ' ' + val[1] + ' ' + val[2] + ' ' + val[3] + ' ' + val[4] + ' '
        })
        this.singleCode = this.singleCode.slice(0, -1)
      },
      // 大小单双
      betConfig(config) {
        if (this.lotteryName === 'pk10' || this.lotteryName === '11x5') {
          let [fig, detail] = [config[0], this.codeList[config[1]].detail]
          // pk10冠亚军单独清理
          if (this.lotteryName === 'pk10') {
            if (this.firstSelected === 5 || this.firstSelected === 6) {
              this.clearCode()
            } else {
              this.clearPK10(config[1], 'noClear')
            }
          }
          if (this.lotteryName === '11x5') {
            // 定位胆、直选快捷选项
            if (this.firstSelected > 3 && this.firstSelected < 7 && detail[0].name.substr(-4) !== '组选复式') {
              this.clearPK10(config[1], 'noClear')
            } else {
              this.clearCode()
            }
          }
          console.log(detail)
          switch (fig) {
            case 'big':
              this.betsNum = 0
              detail.map(item => {
                if (Number(item.value) > this.bigNum) {
                  if (this.firstSelected === 0 || (this.lotteryName === '11x5' && this.firstSelected === 4)) {
                    this.betCheck(item)
                  } else {
                    this.betCheck_gf(item)
                  }
                }
              })
              break
            case 'small':
              this.betsNum = 0
              detail.map(item => {
                item.selected = false
                if (Number(item.value) <= this.bigNum) {
                  if (this.firstSelected === 0 || (this.lotteryName === '11x5' && this.firstSelected === 4)) {
                    this.betCheck(item)
                  } else {
                    this.betCheck_gf(item)
                  }
                }
              })
              break
            case 'single':
              detail.map(item => {
                item.selected = false
                if (Number(item.value) % 2 !== 0) {
                  if (this.firstSelected === 0 || (this.lotteryName === '11x5' && this.firstSelected === 4)) {
                    this.betCheck(item)
                  } else {
                    this.betCheck_gf(item)
                  }
                }
              })
              break
            case 'double':
              detail.map(item => {
                item.selected = false
                if (Number(item.value) % 2 === 0) {
                  if (this.firstSelected === 0 || (this.lotteryName === '11x5' && this.firstSelected === 4)) {
                    this.betCheck(item)
                  } else {
                    this.betCheck_gf(item)
                  }
                }
              })
              break
            case 'qu':
              detail.map(item => {
                if (Number(item.value) <= this.totalNum) {
                  if (this.firstSelected === 0 || (this.lotteryName === '11x5' && this.firstSelected === 4)) {
                    this.betCheck(item)
                  } else {
                    this.betCheck_gf(item)
                  }
                }
              })
              break
          }
        }
        if (this.lotteryName === 'lhc') {
          this.clearCode()
          switch (config) {
            case 'big':
              this.codeList.map(item => {
                if (Number(item.value) > this.bigNum) this.betCheck(item, true)
              })
              break
            case 'small':
              this.codeList.map(item => {
                if (Number(item.value) <= this.bigNum) this.betCheck(item, true)
              })
              break
            case 'single':
              this.codeList.map(item => {
                if (Number(item.value) % 2 !== 0 && Number(item.value)) this.betCheck(item, true)
              })
              break
            case 'double':
              this.codeList.map(item => {
                if (Number(item.value) % 2 === 0) this.betCheck(item, true)
              })
              break
            case 'qu':
              this.codeList.map(item => {
                if (Number(item.value) <= this.totalNum) this.betCheck(item, true)
              })
              break
          }
        }
        if (this.lotteryName === 'ks') {
          this.clearCode()
          switch (config) {
            case 'big':
              this.codeList.map(item => {
                item.detail.map(val => {
                  if (Number(val.value) > this.bigNum) this.betCheck(val)
                })
              })
              break
            case 'small':
              this.codeList.map(item => {
                item.detail.map(val => {
                  if (Number(val.value) <= this.bigNum) this.betCheck(val)
                })
              })
              break
            case 'single':
              this.codeList.map(item => {
                item.detail.map(val => {
                  if (Number(val.value) % 2 !== 0) this.betCheck(val)
                })
              })
              break
            case 'double':
              this.codeList.map(item => {
                item.detail.map(val => {
                  if (Number(val.value) % 2 === 0) this.betCheck(val)
                })
              })
              break
            case 'qu':
              this.codeList.map(item => {
                item.detail.map(val => {
                  if (Number(val.value) <= this.totalNum) this.betCheck(val)
                })
              })
              break
          }
        }
      },
      // 二级菜单选择
      secondMenu(i, arr) {
        console.log(i, arr)
        if (this.lotteryName === '11x5' || this.lotteryName === 'bjkl8') this.codeFiveNum = i
        this.$emit('secondMenu', i, arr)
        this.scroTop()
      },
      // 定位胆清空
      // clearDwd (key) {
      //   let [arr, arr1] = [[], []]
      //   let singArr = Array.from({length: 11})
      //   if (key > 0 && key <= 5) {
      //     this.betDetail.map((val, key) => {
      //       if (key >= 1) val.selected = false
      //     })
      //     singArr.map(item => {
      //       if (item.selected) {
      //         arr.push(item)
      //         arr1.push(item.addOdds)
      //       }
      //     })
      //     this.betDetail = arr
      //   }
      // },
      // 回到顶部，清除选项
      scroTop(key) {
        if (this.selectTimer) clearTimeout(this.selectTimer)
        this.selectTimer = setTimeout(() => {
          this.clearCode(key)
          this.$refs.bets.scrollTop = 0
          this.selectTimer = null
        }, 10)
      },
      // 清空号码
      clearCode() {
        this.betsNum = 0
        this.resetOdds = ''
        this.codeArr = []
        this.playOdds = []
        this.oddsArr = []
        this.betDetail = []
        this.betOdds = []
        this.activeNames = [0, 1, 2, 3, 4, 5]
        // 单式投注清空
        if (this.codeList.isSimplex) this.singleCode = ''
        this.$EventBus.$emit('chooseNum_Gf', false)
        // 清空选中 - 信用玩法
        if (this.lotteryName === 'lhc' || (this.lotteryName === 'ks' && !this.playType) || this.lotteryName === 'pcdd' || (this.lotteryName === 'bjkl8' && this.playType)) this.codeList.map(item => item.selected = false)
        // 清空选中 - 官方玩法
        if ((this.lotteryName === 'ks' && this.playType) || (this.lotteryName === 'pk10' && this.playType && !this.isSimplex) || (this.lotteryName === '11x5' && this.playType && !this.isSimplex)) {
          this.codeList.map(item => {
            item.detail.map(val => val.selected = false)
          })
        }
        // pk10 信用玩法清空选中
        if ((this.lotteryName === 'pk10' && !this.playType) || (this.lotteryName === '11x5' && !this.playType) || (this.lotteryName === 'bjkl8' && !this.playType) || this.lotteryName === 'gdklsf' || this.lotteryName === 'gxklsf') {
          this.codeList.children.map(item => {
            item.detail.map(val => {
              val.selected = false
              val.isDis = false
            })
          })
        }
      },
      // pk10、11选5大小单双清空
      clearPK10(i) {
        let [arr, arr1] = [[], []]
        if (this.betDetail.length > 0) {
          this.betDetail.forEach(val => {
            if (i === 0 && val.poschooseName === '第一' || (i === 0 && val.poschooseName === '第一名')) val.selected = false
            if (i === 1 && val.poschooseName === '第二' || (i === 1 && val.poschooseName === '第二名')) val.selected = false
            if (i === 2 && val.poschooseName === '第三' || (i === 2 && val.poschooseName === '第三名')) val.selected = false
            if (i === 3 && val.poschooseName === '第四') val.selected = false
            if (i === 4 && val.poschooseName === '第五') val.selected = false
            if (i === 5 && val.poschooseName === '第六') val.selected = false
            if (i === 6 && val.poschooseName === '第七') val.selected = false
            if (i === 7 && val.poschooseName === '第八') val.selected = false
            if (i === 8 && val.poschooseName === '第九') val.selected = false
            if (i === 9 && val.poschooseName === '第十') val.selected = false
          })
          this.betDetail.forEach(item => {
            if (item.selected) {
              arr.push(item)
              arr1.push(item.addOdds)
            }
          })
          this.betDetail = arr
          this.betOdds = arr1
          if (this.firstSelected === 0) {
            let arr = [[], [], [], [], [], [], [], [], [], []]
            let ds = []
            this.codeArr = []
            this.betDetail.forEach(val => {
              ds.push(val.name)
              switch (val.poschooseName) {
                case '第一':
                  arr[0].push(val.value)
                  break
                case '第二':
                  arr[1].push(val.value)
                  break
                case '第三':
                  arr[2].push(val.value)
                  break
                case '第四':
                  arr[3].push(val.value)
                  break
                case '第五':
                  arr[4].push(val.value)
                  break
                case '第六':
                  arr[5].push(val.value)
                  break
                case '第七':
                  arr[6].push(val.value)
                  break
                case '第八':
                  arr[7].push(val.value)
                  break
                case '第九':
                  arr[8].push(val.value)
                  break
                case '第十':
                  arr[9].push(val.value)
                  break
              }
            })
            arr.forEach(val => {
              if (val.length > 0) this.codeArr.push(val)
            })
            var setDs = new Set(ds)
            setDs = [...setDs]
          }
          if (arr.length > 0) {
            if ((this.firstSelected > 4 && this.lotteryName === 'pk10') || (this.firstSelected > 4 && this.lotteryName === '11x5')) {
              this.$EventBus.$emit('chooseNum_Gf', false)
            } else {
              this.$EventBus.$emit('chooseNum', JSON.stringify(sortArray(this.codeArr)), JSON.stringify(this.oddsArr), this.betDetail, this.betOdds, JSON.stringify(setDs))
            }
          } else {
            this.$EventBus.$emit('chooseNum', false, false)
          }
        }
      },
      // 设置sliderGroup宽度
      _setSliderWidth() {
        let [children, sliderWidth] = [this.$refs.sliderGroup.children, 0]
        const clientWidth = children[0].clientWidth
        for (let i = 0; i < children.length; i++) sliderWidth += clientWidth
        this.$refs.sliderGroup.style.cssText = `width: ${sliderWidth + 5}px`
      },
      // 横向滚动属性
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true, // 横向滚动
          scrollY: false, // 不允许纵向滚动
          click: true,
          momentum: false // 当快速滑动时是否开启滑动惯性
        })
      },
      showTips() {
        this.isShowTips = true;
      },
    },
    mounted() {
      console.log(this.codeList, 'codeList');
      this.zodiacCode = JSON.parse(localStorage.getItem('SXS_N'))
      // 清空
      this.$EventBus.$on('clearCode', key => {
        this.scroTop(key)
      })
      // 菜单选择
      if (this.isSecond) {
        setTimeout(() => {
          this._setSliderWidth()
          this._initSlider()
        }, 10)
      }
      this.$EventBus.$on('isSecond', () => {
        setTimeout(() => {
          this._setSliderWidth()
          this._initSlider()
        }, 10)
      })
      // 金额重新获取
      this.$EventBus.$on('getMoney', () => {
        this.$http.users.getMoney().then(res => {
          let money = res.data.money
          // this.userInfo.money = money
          this.setData({key:'balance',value:money})
          this.userAmount = this.$cookie.get('token') ? parseFloat(money).toFixed(2) : ''
          // this.SET_USER_INFO(this.userInfo)
        })
      })
      // 合肖赔率更新
      this.$EventBus.$on('resetOdds', val => {
        this.resetOdds = val
      })
    },
    beforeDestroy() {
      // 移除事件监听
      this.$EventBus.$off()
    }
  }
</script>

<style scoped lang="scss">
  .skin-gray {
    $common-font-color: #9a9aa7;
    $common-color-red: #ff2525;
    $common-bg-color: #38364a;
    $common-bg-light-color: #4C4A64;
    $border-color: #605c7b;
    .betDetails {
      color: #9fa7b3;
      background: #44425E;
      .random {
        color: #9fa7b3;
      }
      .content-wrapper {
        .slider {
          background: $common-bg-light-color;
          ul.slider-group {
            li {
              border-bottom: 1px solid $common-font-color;
              span {
                color: $common-font-color;
              }
              &:before {
                background: $common-font-color;
              }
              &:after {
                background: $common-font-color;
              }
              &.active {
                border-bottom: 2px solid #dab591;
                span {
                  color: #fff;
                }
                strong {
                  color: #fff;
                }
              }
            }
          }
        }
        .bet-content {
          // 修改公共头
          /deep/ .van-cell__title {
            color: $common-font-color;
          }
          // 快乐3
          .k-three {
            ul.classic-method {
              color: #333;
              li {
                .method-item {
                  background: $common-bg-color;
                  border: solid 1px $border-color;
                  .number-item {
                    em {
                      color: $common-font-color;
                    }
                  }
                  i {
                    color: $common-color-red;
                  }

                }
                &.active {
                  .method-item {
                    border: solid 1px #ffd57d;
                    .number-item {
                      em {
                        color: #ffd57d;
                      }
                    }
                  }
                }
              }
            }
            div.office-method {
              .title-odds {
                span {
                  border: solid 1px $border-color;
                  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                  background: $common-bg-color;
                  .num {
                    color: $common-color-red;
                  }
                }
              }
              .k-three-items {
                .balls-content {
                  ul.balls {
                    li {
                      & > span {
                        border: solid 1px $border-color;
                        background-color: $common-bg-color;
                        color: $common-font-color;
                        &.active {
                          background-color: $common-color-red;
                          color: #fff;
                          border: solid 1px $common-color-red;
                        }
                      }
                      & > div {
                        span {
                          border: solid 1px $border-color;
                          background-color: $common-bg-color;
                          color: $common-font-color;
                        }
                        i {
                          color: $common-font-color;
                        }
                        &.active {
                          span {
                            background-color: $common-color-red;
                            color: #fff;
                            border: solid 1px $common-color-red;
                          }
                          i {
                            color: $common-color-red;
                          }
                        }
                      }
                    }
                  }
                }
                ul.square-content {
                  li {
                    & > div {
                      border: solid 1px $border-color;
                      background-color: $common-bg-color;
                      color: $common-font-color;
                      &.active {
                        border: solid 1px #ffd57d;
                        color: #ffd57d;
                      }
                    }
                  }
                }
                ul.circle-content {
                  li {
                    & > div {
                      border: solid 1px $border-color;
                      background-color: $common-bg-color;
                      color: $common-font-color;
                      &.active {
                        border: solid 1px $common-color-red;
                        background-color: $common-color-red;
                        color: #fff;
                      }
                    }
                  }
                }
              }
            }
          }
          // 六合彩
          .lhc {
            ul.number-content {
              li {
                div {
                  span {
                    border: 1px solid $border-color;
                  }
                }
              }
            }
            ul.spare-content {
              li {
                & > div {
                  border: 1px solid $border-color;
                  background-color: $common-bg-color;
                  em {
                    color: $common-font-color;
                  }
                  i {
                    color: $common-color-red;
                  }
                  &.active {
                    border: 1px solid #ffd57d;
                    em {
                      color: #ffd57d;
                    }
                  }
                }
              }
            }
          }
          // pc蛋蛋
          .pc-egg {
            ul.number-content {
              li {
                div {
                  span {
                    border: solid 1px $border-color;
                    background-color: $common-bg-color;
                    color: $common-font-color;
                  }
                  &.active {
                    span {
                      background-color: $common-color-red;
                      color: #fff;
                      border: solid 1px $common-color-red;
                    }
                  }
                }
              }
            }
            ul.spare-content {
              li {
                & > div {
                  border: solid 1px $border-color;
                  background-color: $common-bg-color;
                  color: $common-font-color;
                  &.active {
                    border: solid 1px #ffd57d;
                    span {
                      color: #ffd57d;
                    }
                  }
                  i {
                    color: $common-color-red;
                  }
                }
              }
            }
          }
          // pk10
          .pk10 {
            .office-method {
              .title-odds {
                span {
                  border: solid 1px $border-color;
                  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                  background: $common-bg-color;
                  .num {
                    color: $common-color-red;
                  }
                }
              }
              ul.compound {
                & > li {
                  ul.number-content {
                    li {
                      div {
                        span {
                          border: solid 1px $border-color;
                          background-color: $common-bg-color;
                          color: $common-font-color;
                        }
                        &.active {
                          span {
                            background-color: $common-color-red;
                            color: #fff;
                            border: solid 1px $common-color-red;
                          }
                        }
                      }
                    }

                  }
                }
              }
              .simple-wrapper {
                .wrapper {
                  textarea {
                    border: solid 1px $border-color;
                    background-color: $common-bg-color;

                  }
                }
                .btn-group {
                  span {
                    &:first-child {
                      border-right: 1px solid $common-bg-color;
                    }
                  }
                }
                .tips {
                  em {
                    color: $common-color-red;
                  }
                }
              }
            }
            .classic-method {
              ul.number-content {
                li {
                  div {
                    span {

                      border: solid 1px $border-color;
                      background-color: $common-bg-color;
                      color: $common-font-color;
                    }
                    i {
                      color: $common-color-red;
                    }
                    &.active {
                      span {
                        background-color: $common-color-red;
                        color: #fff;
                        border: solid 1px $common-color-red;
                      }
                    }
                  }
                }

              }
              ul.spare-content {

                li {
                  & > div {
                    border: solid 1px $border-color;
                    background-color: $common-bg-color;
                    color: $common-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: $common-color-red;
                    }
                  }
                }
              }
            }
          }
          // 11x5
          .eleven-five {
            .joint-code {
              ul.number-content {
                li {
                  div {
                    span {
                      border: solid 1px $border-color;
                      background-color: $common-bg-color;
                      color: $common-font-color;
                    }
                    i {
                      color: $common-color-red;
                    }
                    &.active {
                      span {
                        background-color: $common-color-red;
                        color: #fff;
                        border: solid 1px $common-color-red;
                      }
                    }
                  }
                }

              }
            }
            .normal-playing {
              .office-method {
                .title-odds {
                  span {
                    border: solid 1px $border-color;
                    box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                    background: #38364A;
                    .num {
                      color: $common-color-red;
                    }
                  }
                }
                ul.compound {
                  & > li {
                    ul.number-content {
                      li {
                        div {
                          span {
                            border: solid 1px $border-color;
                            background-color: $common-bg-color;
                            color: $common-font-color;
                          }
                          &.active {
                            span {
                              background-color: $common-color-red;
                              color: #fff;
                              border: solid 1px $common-color-red;
                            }
                          }
                        }
                      }

                    }
                    ul.spare-content {
                      li {
                        & > div {
                          border: solid 1px $border-color;
                          background-color: $common-bg-color;
                          color: $common-font-color;
                          &.active {
                            border: solid 1px #ffd57d;
                            span {
                              color: #ffd57d;
                            }
                          }
                          i {
                            color: $common-color-red;
                          }
                        }
                      }
                    }
                  }
                }
                .simple-wrapper {
                  .wrapper {
                    textarea {
                      border: solid 1px $border-color;
                      background-color: $common-bg-color;
                    }
                  }
                  .btn-group {
                    span {
                      &:first-child {
                        border-right: 1px solid $common-bg-color;
                      }
                    }
                  }
                  .tips {
                    em {
                      color: $common-color-red;
                    }
                  }
                }
              }
              .classic-method {
                ul.number-content {
                  li {
                    div {
                      span {
                        border: solid 1px $border-color;
                        background-color: $common-bg-color;
                        color: $common-font-color;
                      }
                      &.active {
                        span {
                          background-color: $common-color-red;
                          color: #fff;
                          border: solid 1px $common-color-red;
                        }
                      }
                    }
                  }

                }
                ul.spare-content {
                  li {
                    & > div {
                      border: solid 1px $border-color;
                      background-color: $common-bg-color;
                      color: $common-font-color;
                      &.active {
                        border: solid 1px #ffd57d;
                        span {
                          color: #ffd57d;
                        }
                      }
                      i {
                        color: $common-color-red;
                      }
                    }
                  }
                }
              }
            }
          }
          // happy10min 广东，广西快乐10分
          .happy10min {
            /deep/ .van-collapse-item__content {
              background: $common-bg-light-color;
            }
            .title-odds {
              span {
                border: solid 1px $border-color;
                box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                background: $common-bg-color;
                .num {
                  color: $common-color-red;
                }
              }
            }
            ul.number-content {
              li {
                div {
                  span {
                    border: solid 1px $border-color;
                    background-color: $common-bg-color;
                    color: $common-font-color;
                  }
                  i {
                    color: $common-color-red;
                  }
                  &.active {
                    span {
                      background-color: $common-color-red;
                      color: #fff;
                      border: solid 1px $common-color-red;
                    }
                  }
                }
              }
            }
            ul.spare-content {
              li {
                & > div {
                  border: solid 1px $border-color;
                  background-color: $common-bg-color;
                  color: $common-font-color;
                  &.active {
                    border: solid 1px #ffd57d;
                    span {
                      color: #ffd57d;
                    }
                  }
                  i {
                    color: $common-color-red;
                  }
                }
              }
            }
          }
          .pk10, .pc-egg, .eleven-five, .happy10min, .lhc, .k-three {
            background: $common-bg-light-color;
            /deep/ .van-collapse-item__content {
              background: $common-bg-light-color;
            }
          }
          .bet-common {
            background: $common-bg-light-color;
          }
        }
      }

    }
  }

  .skin-black {
    $common-font-color: #9a9aa7;
    $common-color-red: #d11213;
    $common-bg-color: #2D2E35;
    $common-bg-light-color: #24252D;
    $border-color: #444555;
    .betDetails {
      color: #9fa7b3;
      background: #191B1F;
      .random {
        color: #9fa7b3;
      }
      .content-wrapper {
        .slider {
          background: $common-bg-light-color;
          ul.slider-group {
            li {
              border-bottom: 1px solid #34343B;
              span {
                color: $common-font-color;
              }
              &:before {
                background: #34343B;
              }
              &:after {
                background: #34343B;
              }
              &.active {
                border-bottom: 2px solid #dab591;
                span {
                  color: #fff;
                }
                strong {
                  color: #fff;
                }
              }
            }
          }
        }
        .bet-content {
          // 修改公共头
          /deep/ .van-cell__title {
            color: $common-font-color;
          }
          // 快乐3 ok
          .k-three {
            ul.classic-method {
              color: #333;
              li {
                .method-item {
                  background: $common-bg-color;
                  border: solid 1px $border-color;
                  .number-item {
                    em {
                      color: $common-font-color;
                    }
                  }
                  i {
                    color: $common-color-red;
                  }

                }
                &.active {
                  .method-item {
                    border: solid 1px #efcea6;
                    .number-item {
                      em {
                        color: #efcea6;
                      }
                    }
                  }
                }
              }
            }
            div.office-method {
              .title-odds {
                span {
                  border: solid 1px $border-color;
                  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                  background: #202225;
                  .num {
                    color: $common-color-red;
                    font-weight: bold;
                  }
                }
              }
              .k-three-items {
                .balls-content {
                  ul.balls {
                    li {
                      & > span {
                        border: solid 1px $border-color;
                        background-color: $common-bg-color;
                        color: $common-font-color;
                        &.active {
                          background-color: $common-color-red;
                          color: #fff;
                          border: solid 1px $common-color-red;
                        }
                      }
                      & > div {
                        span {
                          border: solid 1px $border-color;
                          background-color: $common-bg-color;
                          color: $common-font-color;
                        }
                        i {
                          color: $common-font-color;
                        }
                        &.active {
                          span {
                            background-color: $common-color-red;
                            color: #fff;
                            border: solid 1px $common-color-red;
                          }
                          i {
                            color: $common-color-red;
                          }
                        }
                      }
                    }
                  }
                }
                ul.square-content {
                  li {
                    & > div {
                      border: solid 1px $border-color;
                      background-color: $common-bg-color;
                      color: $common-font-color;
                      &.active {
                        border: solid 1px #ffd57d;
                        color: #ffd57d;
                      }
                    }
                  }
                }
                ul.circle-content {
                  li {
                    & > div {
                      border: solid 1px $border-color;
                      background-color: $common-bg-color;
                      color: $common-font-color;
                      &.active {
                        border: solid 1px $common-color-red;
                        background-color: $common-color-red;
                        color: #fff;
                      }
                    }
                  }
                }
              }
            }
          }
          // 六合彩 ok
          .lhc {
            ul.number-content {
              li {
                div {
                  span {
                    border: 1px solid $border-color;
                  }
                }
              }
            }
            ul.spare-content {
              li {
                & > div {
                  border: 1px solid $border-color;
                  background-color: $common-bg-color;
                  em {
                    color: $common-font-color;
                  }
                  i {
                    color: $common-color-red;
                  }
                  &.active {
                    border: 1px solid #ffd57d;
                    em {
                      color: #ffd57d;
                    }
                  }
                }
              }
            }
          }
          // pc蛋蛋 ok
          .pc-egg {
            ul.number-content {
              li {
                div {
                  span {
                    border: solid 1px $border-color;
                    background-color: $common-bg-color;
                    color: $common-font-color;
                  }
                  &.active {
                    span {
                      background-color: $common-color-red;
                      color: #fff;
                      border: solid 1px $common-color-red;
                    }
                  }
                }
              }
            }
            ul.spare-content {
              li {
                & > div {
                  border: solid 1px $border-color;
                  background-color: $common-bg-color;
                  color: $common-font-color;
                  &.active {
                    border: solid 1px #ffd57d;
                    span {
                      color: #ffd57d;
                    }
                  }
                  i {
                    color: $common-color-red;
                  }
                }
              }
            }
          }
          // pk10
          .pk10 {
            .office-method {
              .title-odds {
                span {
                  border: solid 1px $border-color;
                  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                  background: #202225;
                  .num {
                    color: $common-color-red;
                  }
                }
              }
              ul.compound {
                & > li {
                  ul.number-content {
                    li {
                      div {
                        span {
                          border: solid 1px $border-color;
                          background-color: $common-bg-color;
                          color: $common-font-color;
                        }
                        &.active {
                          span {
                            background-color: $common-color-red;
                            color: #fff;
                            border: solid 1px $common-color-red;
                          }
                        }
                      }
                    }

                  }
                }
              }
              .simple-wrapper {
                .wrapper {
                  textarea {
                    border: solid 1px $border-color;
                    background-color: #1E1F26;

                  }
                }
                .btn-group {
                  span {
                    &:first-child {
                      border-right: 1px solid $common-bg-color;
                    }
                  }
                }
                .tips {
                  em {
                    color: $common-color-red;
                  }
                }
              }
            }
            .classic-method {
              ul.number-content {
                li {
                  div {
                    span {

                      border: solid 1px $border-color;
                      background-color: $common-bg-color;
                      color: $common-font-color;
                    }
                    i {
                      color: $common-color-red;
                    }
                    &.active {
                      span {
                        background-color: $common-color-red;
                        color: #fff;
                        border: solid 1px $common-color-red;
                      }
                    }
                  }
                }

              }
              ul.spare-content {

                li {
                  & > div {
                    border: solid 1px $border-color;
                    background-color: $common-bg-color;
                    color: $common-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: $common-color-red;
                    }
                  }
                }
              }
            }
          }
          // 11x5
          .eleven-five {
            .joint-code {
              ul.number-content {
                li {
                  div {
                    span {
                      border: solid 1px $border-color;
                      background-color: $common-bg-color;
                      color: $common-font-color;
                    }
                    i {
                      color: $common-color-red;
                    }
                    &.active {
                      span {
                        background-color: $common-color-red;
                        color: #fff;
                        border: solid 1px $common-color-red;
                      }
                    }
                  }
                }

              }
            }
            .normal-playing {
              .office-method {
                .title-odds {
                  span {
                    border: solid 1px $border-color;
                    box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                    background: #202225;
                    .num {
                      color: $common-color-red;
                    }
                  }
                }
                ul.compound {
                  & > li {
                    ul.number-content {
                      li {
                        div {
                          span {
                            border: solid 1px $border-color;
                            background-color: $common-bg-color;
                            color: $common-font-color;
                          }
                          &.active {
                            span {
                              background-color: $common-color-red;
                              color: #fff;
                              border: solid 1px $common-color-red;
                            }
                          }
                        }
                      }

                    }
                    ul.spare-content {
                      li {
                        & > div {
                          border: solid 1px $border-color;
                          background-color: $common-bg-color;
                          color: $common-font-color;
                          &.active {
                            border: solid 1px #ffd57d;
                            span {
                              color: #ffd57d;
                            }
                          }
                          i {
                            color: $common-color-red;
                          }
                        }
                      }
                    }
                  }
                }
                .simple-wrapper {
                  .wrapper {
                    textarea {
                      border: solid 1px $border-color;
                      background-color: #1E1F26;
                    }
                  }
                  .btn-group {
                    span {
                      &:first-child {
                        border-right: 1px solid $common-bg-color;
                      }
                    }
                  }
                  .tips {
                    em {
                      color: $common-color-red;
                    }
                  }
                }
              }
              .classic-method {
                ul.number-content {
                  li {
                    div {
                      span {
                        border: solid 1px $border-color;
                        background-color: $common-bg-color;
                        color: $common-font-color;
                      }
                      &.active {
                        span {
                          background-color: $common-color-red;
                          color: #fff;
                          border: solid 1px $common-color-red;
                        }
                      }
                    }
                  }

                }
                ul.spare-content {
                  li {
                    & > div {
                      border: solid 1px $border-color;
                      background-color: $common-bg-color;
                      color: $common-font-color;
                      &.active {
                        border: solid 1px #ffd57d;
                        span {
                          color: #ffd57d;
                        }
                      }
                      i {
                        color: $common-color-red;
                      }
                    }
                  }
                }
              }
            }
          }
          // happy10min 广东，广西快乐10分
          .happy10min {
            /deep/ .van-collapse-item__content {
              background: $common-bg-light-color;
            }
            .title-odds {
              span {
                border: solid 1px $border-color;
                box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                background: #202225;
                .num {
                  color: $common-color-red;
                }
              }
            }
            ul.number-content {
              li {
                div {
                  span {
                    border: solid 1px $border-color;
                    background-color: $common-bg-color;
                    color: $common-font-color;
                  }
                  i {
                    color: $common-color-red;
                  }
                  &.active {
                    span {
                      background-color: $common-color-red;
                      color: #fff;
                      border: solid 1px $common-color-red;
                    }
                  }
                }
              }
            }
            ul.spare-content {
              li {
                & > div {
                  border: solid 1px $border-color;
                  background-color: $common-bg-color;
                  color: $common-font-color;
                  &.active {
                    border: solid 1px #ffd57d;
                    span {
                      color: #ffd57d;
                    }
                  }
                  i {
                    color: $common-color-red;
                  }
                }
              }
            }
          }
          .pk10, .pc-egg, .eleven-five, .happy10min, .lhc, .k-three {
            background: $common-bg-light-color;
            /deep/ .van-collapse-item__content {
              background: $common-bg-light-color;
            }
          }
          .bet-common {
            background: $common-bg-light-color;
          }
        }
      }

    }
  }

  // 公共样式
  .betDetails {
    flex: 1;
    overflow: hidden;
    color: #9fa7b3;
    background: #44425E;
    .random {
      display: flex;
      justify-content: space-between;
      height: 0.6rem;
      padding: 0 0.2rem;
      line-height: 0.6rem;
      color: #9fa7b3;
      font-size: 0.28rem;
      span {
        flex: 1;
        text-align: left;
        i {
          font-size: 0.25rem;
          padding: 0 0.1rem;
        }
        &:last-child {
          text-align: right;
        }
      }
    }
    .content-wrapper {
      height: calc(100% - .6rem);
      .slider {
        margin: 0 0.2rem;
        overflow: hidden;
        // min-height: .8rem;
        /*border-bottom: 1px solid #ffd57d;*/
        background: #4C4A64;
        ul.slider-group {
          white-space: normal;
          -webkit-text-size-adjust: none;
          /*display: flex;*/
          li {
            float: left;
            width: 2rem;
            height: 1rem;
            font-size: .3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            border-bottom: 1px solid #9a9aa7;
            /*border-right: 1px solid #24252d;*/
            position: relative;
            span {
              color: #9a9aa7;
              line-height: .4rem;
            }
            strong {
              font-size: 0.24rem;
              line-height: .3rem;
            }
            &:before {
              content: '';
              width: 1px;
              height: 0.33rem;
              display: block;
              position: absolute;
              left: -1px;
              top: 0.33rem;
              background: #9a9aa7;
            }
            &:after {
              content: '';
              width: 1px;
              height: 0.33rem;
              display: block;
              position: absolute;
              right: -1px;
              top: 0.33rem;
              background: #9a9aa7;
            }
            &:first-child {
              &:before {
                width: 0;
              }
            }
            &:last-child {
              border-right: none;
              &:after {
                width: 0;
              }
            }
            &.active {
              border-bottom: 2px solid #dab591;
              span {
                color: #fff;
              }
              strong {
                color: #fff;
              }
            }
          }
        }
      }
      .bet-content {
        height: 100%;
        margin: 0 0.2rem;
        // 修改公共头
        /deep/ .van-cell__title {
          color: #9a9aa7;
        }
        i, em {
          font-weight: normal;
          font-style: normal;
        }
        // 快乐3
        .k-three {
          ul.classic-method {
            display: flex;
            flex-wrap: wrap;
            padding-top: .2rem;
            justify-content: flex-start;
            color: #333;
            text-align: center;
            li {
              width: 33.3%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0 0 15px;
              &.notNum {
                width: 25%;
                .method-item {
                  width: 68px;
                  min-height: 58px;
                }
              }
              .method-item {
                width: 95px;
                min-height: 65px;
                background: #38364a;
                border-radius: 4px;
                border: solid 1px #605c7b;
                .number-item {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  em {
                    display: block;
                    font-size: .32rem;
                    line-height: .8rem;
                    font-weight: bold;
                    color: #9a9aa7;
                  }
                  @for $i from 1 through 6 {
                    em.ksNum#{$i} {
                      width: 0.55rem;
                      height: 0.55rem;
                      margin: 0.15rem 0.05rem;
                      color: rgba(0, 0, 0, 0);
                      background: url('../../../assets/img/lottery/ks/ks_#{$i}.png') no-repeat center;
                      background-size: 100% 100%;
                    }
                  }
                  .arr-number {
                    display: flex;
                    width: 100%;
                    align-items: center;
                    justify-content: center;
                  }
                }
                i.odds {
                  font-size: 11px;
                  color: #ff2525;
                }

              }
              &.active {
                .method-item {
                  border: solid 1px #ffd57d;
                  .number-item {
                    em {
                      color: #ffd57d;
                    }
                  }
                }
              }
            }

            strong {
              em {
                /*margin: 0.3rem 0 0;*/
              }
            }
          }
          div.office-method {
            padding: 15px 0 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .title-odds {
              display: flex;
              align-items: center;
              justify-content: center;
              span {
                padding: 0 0.3rem;
                height: 28px;
                line-height: 26px;
                border: solid 1px #605c7b;
                border-radius: 16px;
                text-align: center;
                -webkit-backdrop-filter: blur(18px);
                backdrop-filter: blur(18px);
                box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                background: #38364A;
                .num {
                  margin: 0 0 0 0.1rem;
                  color: #ff2525;
                  font-weight: bold;
                }
              }
            }
            .k-three-items {
              display: flex;
              /*align-items: center;*/
              /*justify-content: center;*/
              flex-direction: column;
              margin: 0 0 10px;
              .title {
                margin: 15px 0 0;
                padding: 0 0.2rem;
                height: 25px;
                line-height: 25px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                .tools {
                  margin: 0 0 0 5px;
                  flex: 1;
                }
              }
              .balls-content {
                display: flex;
                margin: 15px 0 0;
                ul.balls {
                  width: 100%;
                  display: flex;
                  flex-wrap: wrap;
                  li {
                    width: calc(100% / 6);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 0 15px;
                    & > span {
                      width: 40px;
                      height: 40px;
                      line-height: 38px;
                      border-radius: 50%;
                      font-size: 14px;
                      border: solid 1px #605c7b;
                      background-color: #38364a;
                      color: #9a9aa7;
                      text-align: center;
                      &.active {
                        background-color: #d11213;
                        color: #fff;
                        border: solid 1px #d11213;
                      }
                    }
                    & > div {
                      width: 100%;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      flex-direction: column;
                      span {
                        width: 40px;
                        height: 40px;
                        line-height: 38px;
                        border-radius: 50%;
                        border: solid 1px #605c7b;
                        background-color: #38364a;
                        color: #9a9aa7;
                        font-size: 18px;
                        text-align: center;
                      }
                      i {
                        height: 20px;
                        line-height: 20px;
                        color: #9a9aa7;
                      }
                      &.active {
                        span {
                          background-color: #d11213;
                          color: #fff;
                          border: solid 1px #d11213;
                        }
                        i {
                          color: #d11213;
                        }
                      }
                    }
                  }
                }
                .ks-sum {
                  display: flex;
                  align-items: center;
                  flex: 1;
                  span {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 0 0 0;
                  }
                  em {
                    margin: 0;
                  }
                }
              }
              ul.square-content {
                padding: 10px 0 0;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                li {
                  width: 33.3%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin: 0 0 15px;
                  & > div {
                    width: 92px;
                    height: 58px;
                    line-height: 58px;
                    border: solid 1px #605c7b;
                    background-color: #38364a;
                    border-radius: 5px;
                    text-align: center;
                    font-size: 20px;
                    font-weight: 500;
                    color: #9a9aa7;
                    &.active {
                      border: solid 1px #ffd57d;
                      color: #ffd57d;
                    }
                  }
                }
              }
              ul.circle-content {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                li {
                  width: calc(100% / 6);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin: 0 0 15px;
                  & > div {
                    width: 40px;
                    height: 40px;
                    line-height: 38px;
                    border-radius: 50%;
                    border: solid 1px #605c7b;
                    background-color: #38364a;
                    text-align: center;
                    font-size: 20px;
                    font-weight: 500;
                    color: #9a9aa7;
                    &.active {
                      border: solid 1px #ff2525;
                      background-color: #ff2525;
                      color: #fff;
                    }
                  }
                }
              }
            }
          }
        }
        // 六合彩
        .lhc {
          padding: 10px 0 0;
          .tools {
            width: 100%;
            padding: 0 0.2rem;
          }
          ul.number-content {
            margin: 15px 0 0;
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            li {
              width: calc(100% / 6);
              margin: 0 0 10px;
              div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                span {
                  width: 40px;
                  height: 38px;
                  line-height: 38px;
                  border: 1px solid #605c7b;
                  text-align: center;
                  border-radius: 50%;
                  margin: 0 0 5px;
                  font-size: 18px;
                }

              }
            }
          }
          ul.spare-content {
            display: flex;
            flex-wrap: wrap;
            li {
              width: 33.3%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0 0 15px;
              & > div {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                width: 2.2rem;
                height: 58px;
                border: 1px solid #605c7b;
                background-color: #38364a;
                border-radius: 5px;
                em {
                  height: 20px;
                  line-height: 20px;
                  font-size: 16px;
                  font-weight: bold;
                  color: #9a9aa7;
                }
                i {
                  height: 18px;
                  line-height: 18px;
                  color: #ff2525;
                  font-size: 12px;
                }
                .zodiacCode {
                  width: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  span {
                    margin-left: 3px;
                    font-size: 10px;
                  }
                }
                &.active {
                  border: 1px solid #ffd57d;
                  em {
                    color: #ffd57d;
                  }
                }
              }
            }
          }
          .liuBox05, .liuBox06, .liuBox11, .liuBox16, .liuBox17, .liuBox21, .liuBox22, .liuBox27, .liuBox28, .liuBox32, .liuBox33, .liuBox38, .liuBox39, .liuBox43, .liuBox44, .liuBox49 {
            color: #05ad5c;
          }
          .liuBox03, .liuBox04, .liuBox09, .liuBox10, .liuBox14, .liuBox15, .liuBox20, .liuBox25, .liuBox26, .liuBox31, .liuBox36, .liuBox37, .liuBox41, .liuBox42, .liuBox47, .liuBox48 {
            color: #3F8FEB;
          }
          .liuBox01, .liuBox02, .liuBox07, .liuBox08, .liuBox12, .liuBox13, .liuBox18, .liuBox19, .liuBox23, .liuBox24, .liuBox29, .liuBox30, .liuBox34, .liuBox35, .liuBox40, .liuBox45, .liuBox46 {
            color: #D9342F;
          }
          .liuBox05sd, .liuBox06sd, .liuBox11sd, .liuBox16sd, .liuBox17sd, .liuBox21sd, .liuBox22sd, .liuBox27sd, .liuBox28sd, .liuBox32sd, .liuBox33sd, .liuBox38sd, .liuBox39sd, .liuBox43sd, .liuBox44sd, .liuBox49sd {
            color: #fff;
            background: #05ad5c;
            border: 1px solid #05ad5c;
          }
          .liuBox03sd, .liuBox04sd, .liuBox09sd, .liuBox10sd, .liuBox14sd, .liuBox15sd, .liuBox20sd, .liuBox25sd, .liuBox26sd, .liuBox31sd, .liuBox36sd, .liuBox37sd, .liuBox41sd, .liuBox42sd, .liuBox47sd, .liuBox48sd {
            color: #fff;
            background: #3F8FEB;
            border: 1px solid #3F8FEB;
          }
          .liuBox01sd, .liuBox02sd, .liuBox07sd, .liuBox08sd, .liuBox12sd, .liuBox13sd, .liuBox18sd, .liuBox19sd, .liuBox23sd, .liuBox24sd, .liuBox29sd, .liuBox30sd, .liuBox34sd, .liuBox35sd, .liuBox40sd, .liuBox45sd, .liuBox46sd {
            color: #fff;
            background: #D9342F;
            border: 1px solid #D9342F;
          }
        }
        // pc蛋蛋
        .pc-egg {
          width: 100%;
          ul.number-content {
            padding: 15px 0 0;
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            li {
              width: calc(100% / 6);
              margin: 0 0 10px;
              div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                span {
                  border-radius: 50%;
                  margin: 0 0 5px;
                  font-size: 18px;
                  width: 40px;
                  height: 38px;
                  line-height: 38px;
                  border: solid 1px #605c7b;
                  background-color: #38364a;
                  color: #9a9aa7;
                  text-align: center;
                }
                &.active {
                  span {
                    background-color: #d11213;
                    color: #fff;
                    border: solid 1px #d11213;
                  }
                }
              }
            }
          }
          ul.spare-content {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            padding: 15px 0 0;
            li {
              width: 33.3%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0 0 15px;
              & > div {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                width: 92px;
                height: 58px;
                border: solid 1px #605c7b;
                background-color: #38364a;
                border-radius: 5px;
                text-align: center;
                color: #9a9aa7;
                &.active {
                  border: solid 1px #ffd57d;
                  span {
                    color: #ffd57d;
                  }
                }
                span {
                  font-size: 16px;
                  height: 25px;
                  line-height: 25px;
                  font-weight: bold;
                }
                i {
                  color: #f11717;
                }
              }
            }
          }
        }
        // pk10
        .pk10 {
          .office-method {
            .title-odds {
              padding: 15px 0 0;
              display: flex;
              align-items: center;
              justify-content: center;
              span {
                padding: 0 0.3rem;
                height: 28px;
                line-height: 26px;
                border: solid 1px #605c7b;
                border-radius: 16px;
                text-align: center;
                -webkit-backdrop-filter: blur(18px);
                backdrop-filter: blur(18px);
                box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                background: #38364A;
                .num {
                  margin: 0 0 0 0.1rem;
                  color: #ff2525;
                  font-weight: bold;
                }
              }
            }
            ul.compound {
              padding: 10px 0 0;
              & > li {
                .title {
                  padding: 0 0.3rem;
                  display: flex;
                  justify-content: space-around;
                  align-items: center;
                  .tools {
                    margin: 0 0 0 5px;
                    flex: 1;
                  }
                }
                ul.number-content {
                  padding: 10px 0 0;
                  width: 100%;
                  display: flex;
                  flex-direction: row;
                  flex-wrap: wrap;
                  li {
                    width: calc(100% / 5);
                    margin: 0 0 10px;
                    div {
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                      span {
                        border-radius: 50%;
                        margin: 0 0 5px;
                        font-size: 18px;
                        width: 40px;
                        height: 38px;
                        line-height: 38px;
                        border: solid 1px #605c7b;
                        background-color: #38364a;
                        color: #9a9aa7;
                        text-align: center;
                      }
                      &.active {
                        span {
                          background-color: #d11213;
                          color: #fff;
                          border: solid 1px #d11213;
                        }
                      }
                    }
                  }

                }
              }
            }
            .simple-wrapper {
              padding: 15px 0;
              .wrapper {
                width: 100%;
                textarea {
                  border: solid 1px #605c7b;
                  background-color: #38364a;
                  width: 90%;
                  min-height: 30vh;
                }
              }
              .btn-group {
                width: 100%;
                height: 45px;
                display: flex;
                align-items: center;
                justify-content: center;
                span {
                  flex: 1;
                  font-size: 14px;
                  padding: 0 5px;
                  i {
                    font-size: 14px;
                    padding: 0 5px;
                  }
                  &:first-child {
                    text-align: right;
                    border-right: 1px solid #38364a;
                  }
                  &:last-child {
                    text-align: left;
                  }
                }
              }
              .tips {
                padding: 0 .2rem .1rem;
                width: 100%;
                line-height: 18px;
                font-size: 12px;
                text-align: justify;
                em {
                  color: #ff2525;
                }
              }
            }
          }
          .classic-method {
            ul.number-content {
              width: 100%;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              li {
                width: calc(100% / 5);
                margin: 0 0 10px;
                div {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  span {
                    border-radius: 50%;
                    font-size: 18px;
                    width: 40px;
                    height: 38px;
                    line-height: 38px;
                    border: solid 1px #605c7b;
                    background-color: #38364a;
                    color: #9a9aa7;
                    text-align: center;
                  }
                  i {
                    color: #d11213;
                  }
                  &.active {
                    span {
                      background-color: #d11213;
                      color: #fff;
                      border: solid 1px #d11213;
                    }
                  }
                }
              }

            }
            ul.spare-content {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              li {
                width: 33.3%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 0 15px;
                & > div {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-direction: column;
                  width: 92px;
                  height: 58px;
                  border: solid 1px #605c7b;
                  background-color: #38364a;
                  border-radius: 5px;
                  text-align: center;
                  color: #9a9aa7;
                  &.active {
                    border: solid 1px #ffd57d;
                    span {
                      color: #ffd57d;
                    }
                  }
                  span {
                    font-size: 16px;
                    height: 25px;
                    line-height: 25px;
                    font-weight: bold;
                  }
                  i {
                    color: #f11717;
                  }
                }
              }
            }
          }
        }
        // 11x5
        .eleven-five {
          .joint-code {
            padding: 10px 0 0;
            ul.number-content {
              width: 100%;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              li {
                width: calc(100% / 6);
                margin: 0 0 10px;
                div {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  span {
                    border-radius: 50%;
                    margin: 0 0 5px;
                    font-size: 18px;
                    width: 40px;
                    height: 38px;
                    line-height: 38px;
                    border: solid 1px #605c7b;
                    background-color: #38364a;
                    color: #9a9aa7;
                    text-align: center;
                  }
                  i {
                    color: #d11213;
                  }
                  &.active {
                    span {
                      background-color: #d11213;
                      color: #fff;
                      border: solid 1px #d11213;
                    }
                  }
                }
              }

            }
          }
          .normal-playing {
            .office-method {
              .title-odds {
                padding: 15px 0 0;
                display: flex;
                align-items: center;
                justify-content: center;
                span {
                  padding: 0 0.3rem;
                  height: 28px;
                  line-height: 26px;
                  border: solid 1px #605c7b;
                  border-radius: 16px;
                  text-align: center;
                  -webkit-backdrop-filter: blur(18px);
                  backdrop-filter: blur(18px);
                  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                  background: #38364A;
                  .num {
                    margin: 0 0 0 0.1rem;
                    color: #ff2525;
                    font-weight: bold;
                  }
                }
              }
              ul.compound {
                padding: 10px 0 0;
                & > li {
                  .title {
                    padding: 0 0.3rem;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    .tools {
                      margin: 0 0 0 5px;
                      flex: 1;
                    }
                  }
                  ul.number-content {
                    padding: 10px 0 0;
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    li {
                      width: calc(100% / 6);
                      margin: 0 0 10px;
                      div {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        span {
                          border-radius: 50%;
                          margin: 0 0 5px;
                          font-size: 18px;
                          width: 40px;
                          height: 38px;
                          line-height: 38px;
                          border: solid 1px #605c7b;
                          background-color: #38364a;
                          color: #9a9aa7;
                          text-align: center;
                        }
                        &.active {
                          span {
                            background-color: #d11213;
                            color: #fff;
                            border: solid 1px #d11213;
                          }
                        }
                      }
                    }

                  }
                  ul.spare-content {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    /*padding: 15px 0 0;*/
                    li {
                      width: 33.3%;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      margin: 0 0 15px;
                      & > div {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        width: 92px;
                        height: 58px;
                        border: solid 1px #605c7b;
                        background-color: #38364a;
                        border-radius: 5px;
                        text-align: center;
                        color: #9a9aa7;
                        &.active {
                          border: solid 1px #ffd57d;
                          span {
                            color: #ffd57d;
                          }
                        }
                        span {
                          font-size: 16px;
                          height: 25px;
                          line-height: 25px;
                          font-weight: bold;
                        }
                        i {
                          color: #f11717;
                        }
                      }
                    }
                  }
                }
              }
              .simple-wrapper {
                padding: 15px 0;
                .wrapper {
                  width: 100%;
                  textarea {
                    border: solid 1px #605c7b;
                    background-color: #38364a;
                    width: 90%;
                    min-height: 30vh;
                  }
                }
                .btn-group {
                  width: 100%;
                  height: 45px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  span {
                    flex: 1;
                    font-size: 14px;
                    padding: 0 5px;
                    i {
                      font-size: 14px;
                      padding: 0 5px;
                    }
                    &:first-child {
                      text-align: right;
                      border-right: 1px solid #38364a;
                    }
                    &:last-child {
                      text-align: left;
                    }
                  }
                }
                .tips {
                  padding: 0 .2rem .1rem;
                  width: 100%;
                  line-height: 18px;
                  font-size: 12px;
                  text-align: justify;
                  em {
                    color: #ff2525;
                  }
                }
              }
            }
            .classic-method {
              ul.number-content {
                width: 100%;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                li {
                  width: calc(100% / 6);
                  margin: 0 0 10px;
                  div {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    span {
                      border-radius: 50%;
                      margin: 0 0 5px;
                      font-size: 18px;
                      width: 40px;
                      height: 38px;
                      line-height: 38px;
                      border: solid 1px #605c7b;
                      background-color: #38364a;
                      color: #9a9aa7;
                      text-align: center;
                    }
                    &.active {
                      span {
                        background-color: #d11213;
                        color: #fff;
                        border: solid 1px #d11213;
                      }
                    }
                  }
                }

              }
              ul.spare-content {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                /*padding: 15px 0 0;*/
                li {
                  width: 25%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin: 0 0 15px;
                  & > div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    width: 1.3rem;
                    height: 58px;
                    border: solid 1px #605c7b;
                    background-color: #38364a;
                    border-radius: 5px;
                    text-align: center;
                    color: #9a9aa7;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    span {
                      font-size: 16px;
                      height: 25px;
                      line-height: 25px;
                      font-weight: bold;
                    }
                    i {
                      color: #f11717;
                    }
                  }
                }
              }
            }
          }

          /deep/ .van-collapse-item__content {
            background: none;
          }
        }
        // happy10min 广东，广西快乐10分
        .happy10min {
          /deep/ .van-collapse-item__content {
            background: #4C4A64;
          }
          .other-method {
            padding: 15px 0 0;
          }
          .title-odds {
            padding: 15px 0 0;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
              padding: 0 0.3rem;
              height: 28px;
              line-height: 26px;
              border: solid 1px #605c7b;
              border-radius: 16px;
              text-align: center;
              -webkit-backdrop-filter: blur(18px);
              backdrop-filter: blur(18px);
              box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
              background: #38364A;
              .num {
                margin: 0 0 0 0.1rem;
                color: #ff2525;
                font-weight: bold;
              }
            }
          }
          ul.number-content {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            li {
              width: calc(100% / 6);
              margin: 0 0 10px;
              div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                span {
                  border-radius: 50%;
                  font-size: 16px;
                  width: 40px;
                  height: 40px;
                  line-height: 38px;
                  border: solid 1px #605c7b;
                  background-color: #38364a;
                  color: #9a9aa7;
                  text-align: center;
                  margin: 0 0 5px;
                }
                i {
                  color: #d11213;
                }
                &.active {
                  span {
                    background-color: #d11213;
                    color: #fff;
                    border: solid 1px #d11213;
                  }
                }
              }
            }
          }
          ul.spare-content {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            li {
              width: 33.3%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0 0 15px;
              & > div {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                width: 92px;
                height: 58px;
                border: solid 1px #605c7b;
                background-color: #38364a;
                border-radius: 5px;
                text-align: center;
                color: #9a9aa7;
                &.active {
                  border: solid 1px #ffd57d;
                  span {
                    color: #ffd57d;
                  }
                }
                span {
                  font-size: 16px;
                  height: 25px;
                  line-height: 25px;
                  font-weight: bold;
                }
                i {
                  font-size: 10px;
                  color: #f11717;
                }
              }
            }
          }
        }
        .pk10, .pc-egg, .eleven-five, .happy10min, .lhc, .k-three {
          height: 100%;
          overflow: scroll;
          background: #4C4A64;
          /deep/ .van-collapse-item__content {
            background: #4C4A64;
          }
        }
        .reduce-height {
          height: calc(100% - 1.9rem);
          overflow: scroll;
        }
        .bet-common {
          overflow: scroll;
          height: 100%;
          padding: 0 .2rem;
          /*background: white;*/
          // 以下全部都不用
          .codes {
            display: flex;
            flex-wrap: wrap;
            padding-top: .2rem;
            justify-content: flex-start;
            color: #333;
            text-align: center;
            .liuBox05, .liuBox06, .liuBox11, .liuBox16, .liuBox17, .liuBox21, .liuBox22, .liuBox27, .liuBox28, .liuBox32, .liuBox33, .liuBox38, .liuBox39, .liuBox43, .liuBox44, .liuBox49 {
              color: #05ad5c;
            }
            .liuBox03, .liuBox04, .liuBox09, .liuBox10, .liuBox14, .liuBox15, .liuBox20, .liuBox25, .liuBox26, .liuBox31, .liuBox36, .liuBox37, .liuBox41, .liuBox42, .liuBox47, .liuBox48 {
              color: #3F8FEB;
            }
            .liuBox01, .liuBox02, .liuBox07, .liuBox08, .liuBox12, .liuBox13, .liuBox18, .liuBox19, .liuBox23, .liuBox24, .liuBox29, .liuBox30, .liuBox34, .liuBox35, .liuBox40, .liuBox45, .liuBox46 {
              color: #D9342F;
            }
            span {
              width: 16.6%;
              margin-bottom: 10px;
              white-space: normal;
              em {
                display: block;
                width: .7rem;
                height: .7rem;
                margin: 0 auto .1rem;
                border-radius: 50%;
                border: 1px solid #e5e5e5;
                /*box-shadow: 0 2px 2px #e5e5e5;*/
                line-height: .7rem;
                font-size: .32rem;
              }
              .liuBox05sd, .liuBox06sd, .liuBox11sd, .liuBox16sd, .liuBox17sd, .liuBox21sd, .liuBox22sd, .liuBox27sd, .liuBox28sd, .liuBox32sd, .liuBox33sd, .liuBox38sd, .liuBox39sd, .liuBox43sd, .liuBox44sd, .liuBox49sd {
                color: white;
                background: #05ad5c;
              }
              .liuBox03sd, .liuBox04sd, .liuBox09sd, .liuBox10sd, .liuBox14sd, .liuBox15sd, .liuBox20sd, .liuBox25sd, .liuBox26sd, .liuBox31sd, .liuBox36sd, .liuBox37sd, .liuBox41sd, .liuBox42sd, .liuBox47sd, .liuBox48sd {
                color: white;
                background: #3F8FEB;
              }
              .liuBox01sd, .liuBox02sd, .liuBox07sd, .liuBox08sd, .liuBox12sd, .liuBox13sd, .liuBox18sd, .liuBox19sd, .liuBox23sd, .liuBox24sd, .liuBox29sd, .liuBox30sd, .liuBox34sd, .liuBox35sd, .liuBox40sd, .liuBox45sd, .liuBox46sd {
                color: white;
                background: #D9342F;
              }

              em.code-active {
                color: white;
              }

              .pk_em {
                color: red;
              }

              em.commSd {
                color: white;
                border-color: #e42012;
                background: $global-bgcolor;
              }

              em.isDis, i.isDis {
                opacity: .4;
              }

              i.odds {
                font-size: 0.24rem;
              }

              i.od {
                color: #c00;
              }
            }
            strong {
              position: relative;
              width: 30%;
              margin: 0 1.66% .4rem;
              border: 1px solid #ddd;
              border-radius: 4px;
              text-align: center;
              em {
                display: block;
                font-size: .32rem;
                line-height: .8rem;
                font-weight: bold;
              }
              @for $i from 1 through 6 {
                em.ksNum#{$i} {
                  width: 0.55rem;
                  height: 0.55rem;
                  margin: 0.2rem auto 0.08rem;
                  color: rgba(0, 0, 0, 0);
                  background: url('../../../assets/img/lottery/ks/ks_#{$i}.png') no-repeat center;
                  background-size: 100% 100%;
                }
              }

              em.ks_f {
                float: left;
                margin-left: 0.08rem;
              }

              em.ks_fg {
                float: left;
                margin-left: 0.33rem;
              }

              i {
                display: block;
                color: red;
                font-size: .26rem;
                line-height: .26rem;
                margin-bottom: .1rem;
              }

              .zodiacCode span {
                margin-left: 3px;
              }
            }
            strong.tb_sg {
              width: 28%;
              height: 1rem;
              margin: 0 2.66% .4rem;
              color: #333;
              font-size: 0.4rem;
              line-height: 1rem;
              border-radius: .1rem;
              box-shadow: 0 0.04rem 0.04rem 0 rgba(0, 0, 0, .3);
            }
            strong.ks_noNum {
              width: 21%;
              margin: 0 2% .4rem;
            }
            strong.isPad {
              /*padding-top: .18rem;*/
            }
            strong.isSelectedCode {
              color: white;
              border-color: #e42012;
              background: $global-bgcolor;

              i {
                color: white;
              }
            }

            .ishiden {
              display: none;
            }
          }
          .pk_gf, .ks_gf {
            position: relative;
            .h-label {
              top: 0.08rem;
            }
            .g-label {
              /*position: absolute;*/
              /*top: 0.1rem;*/
              //left: -0.06rem;
              /*width: .4rem;*/

              line-height: .26rem;
              color: #8f9ab5;
            }

            .label-pk {
              position: absolute;
              top: 0.1rem;
              left: -0.06rem;
              width: 0.28rem;
              padding: 2px 0 5px;
              /* height: 1rem; */
              /* padding-top: .03rem; */
              color: #fff;
              line-height: .3rem;
              font-size: 0.22rem;
              background: #FA3855;
            }

            .label-pk:after {
              content: '';
              position: absolute;
              left: 0;
              top: .9rem;
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 0 0.14rem 0.15rem 0.14rem;
              border-color: transparent transparent #fff transparent;
            }

            .label-pks:after {
              top: .6rem;
            }

            .codes {
              /*padding-left: .4rem;*/
            }
          }
          .tb_gf .g-label {
            top: 0.26rem;
          }
          .wrapper {
            width: 100%;
            margin: 10% auto 0.4rem;
            padding: .28rem .2rem;
            background-color: #000;
            border: 1px solid #24252D;
            textarea {
              width: 100%;
              height: 3.3rem;
              padding: .2rem;
              background-color: #24252D;
              border: 1px solid #000;
              touch-action: none;
            }
          }
          .pk_btn {
            text-align: center;
            margin-bottom: 0.2rem;

            button {
              display: inline-block;
              padding: 5px 10px;
              border-radius: 5px;
              background: #fb8f10;
              color: #fff;
              margin: 0 10px;
              font-size: .25rem;
              border: none;
            }
          }
          .tips {
            text-align: left;
            line-height: 0.4rem;

            em {
              color: red;
            }
          }
          .ks_odds {
            padding: 0.2rem 0 0.1rem;

            span {
              float: left;
              background-color: #f2f5f8;
              color: #8f9ab5;
              height: .56rem;
              line-height: .56rem;
              border-radius: 0 .3rem .3rem 0;
              padding: 0 .2rem;

              em {
                color: #c00;
              }
            }
          }
        }
        .bet-bj {
          height: calc(100% - .6rem);
        }
        .bet-op {
          height: calc(100% - 2.36rem);
        }
      }
      .has-second-menu {
        height: calc(100% - 1rem);
      }
    }
  }
</style>
