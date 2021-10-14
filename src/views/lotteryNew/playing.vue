<template>
  <div class="playing-wrapper"
       :class="betCount>0?'active':''">
    <lotteryInfo></lotteryInfo>
    <div class="random">
      <span @click="$toast($t('lang.lottery.toast[0]'))">
        <i class="iconfont iconic-random"></i>
        <!--<em>摇一摇机选</em>-->
        <em>{{$t('lang.lottery.randomAndTips[0]')}}</em>
      </span>
      <!--<span>-->
      <div class="balance" @click.stop="refreshBalance()"
           v-if="isLogin">
        <!--余额-->
<!--        <span>{{$t('lang.lottery.balance')}}:{{Number(balance).toFixed(2)}}</span>-->
        <span>
          <i class="user-money">{{ balance == null ? '0' : format_number(balance).split('.')[0] }}</i><em class="money-point">{{ balance == null ? '.00' :'.'+format_number(balance).split('.')[1] }}</em>
        </span>
        <i class="iconfont iconic-refresch"></i>
      </div>
      <span @click="showTips()">
        <!--<em>玩法提示</em>-->
        <em>{{$t('lang.lottery.randomAndTips[1]')}}</em>
        <i class="iconfont iconic-info2"></i>
      </span>
    </div>
    <div class="content-wrapper">
      <div class="main-content" v-if="methodInfo !== null">
        <!--快3-->
        <div class="k3-wrapper" v-if="lotteryInfo.type === lotteryType.k3">
          <div class="official-wrapper" v-if="methodInfo.isOfficial">
            <div class="title-odds" v-if="!methodInfo.hideOdd">
              <!-- 赔率 -->
              <span>
                  <em>{{$t('lang.lottery.odds')}}:</em>
                  <em class="num">{{parseFloat(methodInfo.addOdds).toFixed(2)}}</em>
                </span>
            </div>
            <div class="select-wrapper"
                 v-for="(item,firstIndex) in methodInfo.detail">
              <div class="tools">
                <div class="title">
                  <span>{{item.name}}</span>
                </div>
                <ul v-if="methodInfo.tool">
                  <!--<ul v-if="!notHaveQuick.includes(methodInfo.name)">-->
                  <li v-for="(toolItem,toolIndex) in toolsArr[methodInfo.tool]"
                      @click="_tools(toolItem.code,firstIndex)">
                    {{toolItem.nameChina}}
                  </li>
                </ul>
              </div>
              <ul class="number-content" v-if="!methodInfo.specialNum">
                <li v-for="(numbers,detailIndex) in item.detail"
                    :class="item.isSpan?'number-item':'square-item'">
                  <div @click="official_selectNumber(firstIndex,detailIndex)"
                       v-if="!item.hasOdds"
                       :class="numbers.selected?'active':''">
                    <span v-if="methodInfo.name === '二同号复选'">{{numbers.value}} <i>*</i></span>
                    <span v-else>{{numbers.value}}</span>
                  </div>
                  <div v-else
                       @click="official_selectNumber(firstIndex,detailIndex)"
                       :class="numbers.selected?'active':''">
                    <span>{{numbers.value}}</span>
                    <i>{{numbers.addOdds}}</i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="credit-wrapper" v-else>
            <ul v-if="methodInfo.detail && methodInfo.detail.length>0"
                class="square-item"
                :class="methodInfo.specialLayout?'special-layout':''">
              <li v-for="(item,index) in methodInfo.detail">
                <div :class="item.selected?'active':''"
                     @click="credit_selectNumber(index)">
                  <div class="simple-number"
                       v-if="formatNumber(item.alias)[0]">
                    <span :class="[`k3-num-${item.alias}`]">{{item.alias}}</span>
                  </div>
                  <div class="arr-number" v-else>
                  <span v-for="(num, index) in formatNumber(item.alias)[1]"
                        :class="['k3-num-'+num]">{{num}}</span>
                  </div>
                  <em>{{$t('lang.lottery.odds')}}:{{Number(item.addOdds).toFixed(3)}}</em>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--pcdd-->
        <div class="pcdd-wrapper" v-if="lotteryInfo.type === lotteryType.pcdd">
          <div class="credit-wrapper">
            <ul :class="methodInfo.isSpan?'number-content':'spare-content'"
                v-if="methodInfo.detail && methodInfo.detail.length>0">
              <li v-for="(item,index) in methodInfo.detail"
                  :key="index">
                <div @click="credit_selectNumber(index)"
                     :class="[item.selected?'active':'']">
                  <span v-if="methodInfo.name === '混合'">{{item.alias}}</span>
                  <span v-else>{{item.value}}</span>
                  <i v-if="methodInfo.isSpan">{{Number(item.addOdds).toFixed(3)}}</i>
                  <i v-else>{{$t('lang.lottery.odds')}}:{{Number(item.addOdds).toFixed(3)}}</i>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--ssc-->
        <div class="ssc-wrapper" v-if="lotteryInfo.type === lotteryType.ssc">
          <div class="official-wrapper" v-if="methodInfo.isOfficial">
            <!--选号区-->
            <div class="normal">
              <div class="title-odds" v-if="!methodInfo.hideOdd">
                <!-- 赔率 -->
                <span>
                  <em>{{$t('lang.lottery.odds')}}:</em>
                  <em v-if="methodInfo.del.zh_odds.length>1" class="num">
                  {{parseFloat(methodInfo.del.zh_odds[methodInfo.del.zh_odds.length - 1][2] / 2).toFixed(2)}}~
                  {{parseFloat(methodInfo.del.zh_odds[0][2] / 2).toFixed(2) }}
                  </em>
                  <em v-else class="num">{{parseFloat(methodInfo.del.addOdds / 2).toFixed(2)}}</em>
                </span>
              </div>
              <div class="check-wrapper"
                   v-if="methodInfo.haveCheckList">
                <div class="select-list">
                  <van-checkbox-group v-model="checkGroup" direction="horizontal">
                    <van-checkbox @click="checkBtn" name="0">万位</van-checkbox>
                    <van-checkbox @click="checkBtn" name="1">千位</van-checkbox>
                    <van-checkbox @click="checkBtn" name="2">百位</van-checkbox>
                    <van-checkbox @click="checkBtn" name="3">十位</van-checkbox>
                    <van-checkbox @click="checkBtn" name="4">个位</van-checkbox>
                  </van-checkbox-group>
                </div>
                <div class="tips">
                  <!--温馨提示：你选择了-->
                  {{$t('lang.lottery.dialog.title')}}:{{$t('lang.lottery.ssc.tips[0]')}}
                  <em>{{ checkGroup.length }}</em>
                  <!--个位置,系统会自动根据位置组合成-->
                  {{$t('lang.lottery.ssc.tips[1]')}}
                  <em>{{checkLEN}}</em>
                  <!--个方案-->
                  {{$t('lang.lottery.ssc.tips[2]')}}
                </div>
              </div>
              <div v-for="(item,firstIndex) in methodInfo.children"
                   class="select-wrapper">
                <div class="tools">
                  <div class="title">
                    <span>{{item.name}}</span>
                  </div>
                  <ul v-if="methodInfo.tool">
                    <!--<ul v-if="!notHaveQuick.includes(methodInfo.name)">-->
                    <li v-for="(toolItem,toolIndex) in toolsArr[methodInfo.tool]"
                        @click="_tools(toolItem.code,firstIndex)">
                      {{toolItem.nameChina}}
                    </li>
                  </ul>
                </div>
                <ul class="number-content" v-if="!methodInfo.specialNum">
                  <li v-for="(numbers,detailIndex) in item.detail">
                    <div @click="official_selectNumber(firstIndex,detailIndex)"
                         :class="numbers.selected?'active':''">
                      <span>{{numbers.alias}}</span>
                    </div>
                  </li>
                </ul>
                <ul v-else class="square-content">
                  <li v-for="(numbers,detailIndex) in item.detail">
                    <div @click="official_selectNumber(firstIndex,detailIndex)"
                         :class="numbers.selected?'active':''">
                      <span>{{numbers.alias}}</span>
                      <i>{{$t('lang.lottery.odds')}}:{{numbers.addOdds}}</i>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!--单式-->
            <div class="text-area" v-if="methodInfo.children.length === 0">
              <div class="wrapper">
                <textarea v-model="singleCode"
                          @input.stop="codeDebounce"></textarea>
              </div>
              <div class="btn-group">
                <span @click="filterCodes()">
                  <i class="iconfont iconic-del"></i>
                  <!--删除重复号-->
                  <em>{{$t('lang.lottery.simplexOption[0]')}}</em>
                </span>
                <span @click="clearSingleNum()">
                  <i class="iconfont iconic-clear"></i>
                  <!--清空-->
                  <em>{{$t('lang.lottery.simplexOption[1]')}}</em>
                </span>
              </div>
              <p class="tips">
                <!--程序会自动过滤掉不合法的号码。您也可以点击“-->
                {{$t('lang.lottery.simplexTips_3[0]')}}
                <em>{{$t('lang.lottery.simplexOption[0]')}}</em>
                {{$t('lang.lottery.simplexTips_3[1]')}}
                <!--”按钮对输入内容进行格式化。-->
              </p>
            </div>
          </div>
          <div class="credit-wrapper" v-else>
            <van-collapse :border="false"
                          :key="index"
                          v-model="activeNames"
                          v-if="methodInfo.children"
                          v-for="(item,index) in methodInfo.children">
              <van-collapse-item v-if="item.children.length > 0"
                                 :title="item.name"
                                 :name="index"
                                 style="text-align:left;">
                <ul class="spare-content">
                  <li v-for="(detailItem,detailIndex) in item.children" :key="detailIndex">
                    <div @click="credit_selectNumber(index,detailIndex,detailItem)"
                         :class="detailItem.selected?'active':''">
                      <span>{{detailItem.alias}}</span>
                      <i>{{$t('lang.lottery.odds')}}:{{Number(detailItem.addOdds).toFixed(3)}}</i>
                    </div>
                  </li>
                </ul>
              </van-collapse-item>
            </van-collapse>
          </div>
        </div>
        <!--pk10-->
        <div class="pk10-wrapper" v-if="lotteryInfo.type === lotteryType.pk10">
          <div class="official-wrapper" v-if="methodInfo.isOfficial">
            <!--选号区-->
            <div class="normal">
              <div class="title-odds" v-if="!methodInfo.hideOdd">
                <!-- 赔率 -->
                <span>
                  <em>{{$t('lang.lottery.odds')}}:</em>
                  <em class="num">{{parseFloat(methodInfo.addOdds).toFixed(2)}}</em>
                </span>
              </div>
              <div class="select-wrapper"
                   v-if="!methodInfo.detail.isSimplex"
                   v-for="(item,firstIndex) in methodInfo.detail">
                <div class="tools">
                  <div class="title">
                    <span>{{item.name}}</span>
                  </div>
                  <ul v-if="methodInfo.tool">
                    <!--<ul v-if="!notHaveQuick.includes(methodInfo.name)">-->
                    <li v-for="(toolItem,toolIndex) in toolsArr[methodInfo.tool]"
                        @click="_tools(toolItem.code,firstIndex)">
                      {{toolItem.nameChina}}
                    </li>
                  </ul>
                </div>
                <ul class="number-content">
                  <li v-for="(numbers,detailIndex) in item.detail"
                      class="number-item">
                    <div @click="official_selectNumber(firstIndex,detailIndex)"
                         :class="numbers.selected?'active':''">
                      <span>{{numbers.value}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!--单式-->
            <div class="text-area" v-if="methodInfo.detail.isSimplex">
              <div class="wrapper">
                <textarea v-model="singleCode"
                          @input.stop="codeDebounce"></textarea>
                <!--<textarea v-model="singleCode"></textarea>-->
              </div>
              <div class="btn-group">
                <span @click="filterCodes()">
                  <i class="iconfont iconic-del"></i>
                  <!--删除重复号-->
                  <em>{{$t('lang.lottery.simplexOption[0]')}}</em>
                </span>
                <span @click="clearSingleNum()">
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
          </div>
          <div class="credit-wrapper" v-else>
            <van-collapse :border="false"
                          :key="index"
                          v-model="activeNames"
                          v-if="methodInfo.children && methodInfo.children.length>0"
                          v-for="(item,index) in methodInfo.children">
              <van-collapse-item v-if="item.detail.length > 0"
                                 :title="item.name"
                                 :name="index"
                                 style="text-align:left;">
                <ul :class="item.isSpan?'number-content':'spare-content'">
                  <li v-for="(detailItem,detailIndex) in item.detail"
                      :key="detailIndex">
                    <div @click="credit_selectNumber(index,detailIndex,detailItem)"
                         :class="detailItem.selected?'active':''">
                      <span>{{detailItem.alias}}</span>
                      <i v-if="item.isSpan">{{Number(detailItem.addOdds).toFixed(3)}}</i>
                      <i v-else>{{$t('lang.lottery.odds')}}:{{Number(detailItem.addOdds).toFixed(3)}}</i>
                    </div>
                  </li>
                </ul>
              </van-collapse-item>
            </van-collapse>
          </div>
        </div>
        <!--11x5-->
        <div class="eleven5-wrapper" v-if="lotteryInfo.type === lotteryType.eleven5">
          <div class="official-wrapper" v-if="methodInfo.isOfficial">
            <!--选号区-->
            <div class="normal">
              <div class="title-odds" v-if="!methodInfo.hideOdd">
                <!-- 赔率 -->
                <span>
                  <em>{{$t('lang.lottery.odds')}}:</em>
                  <em class="num">{{parseFloat(methodInfo.addOdds).toFixed(2)}}</em>
                </span>
              </div>
              <div class="select-wrapper"
                   v-if="!methodInfo.detail.isSimplex"
                   v-for="(item,firstIndex) in methodInfo.detail">
                <div class="tools">
                  <div class="title">
                    <span>{{item.name}}</span>
                  </div>
                  <ul v-if="methodInfo.tool">
                    <!--<ul v-if="!notHaveQuick.includes(methodInfo.name)">-->
                    <li v-for="(toolItem,toolIndex) in toolsArr[methodInfo.tool]"
                        @click="_tools(toolItem.code,firstIndex)">
                      {{toolItem.nameChina}}
                    </li>
                  </ul>
                </div>
                <ul class="number-content">
                  <li v-for="(numbers,detailIndex) in item.detail"
                      :class="methodInfo.isSpan?'number-item':'square-item'">
                    <div @click="official_selectNumber(firstIndex,detailIndex)"
                         :class="numbers.selected?'active':''"
                         v-if="!methodInfo.hasOdds">
                      <span>{{numbers.value}}</span>
                    </div>
                    <div @click="official_selectNumber(firstIndex,detailIndex)"
                         :class="numbers.selected?'active':''"
                         v-else>
                      <span>{{numbers.value}}</span>
                      <i v-if="methodInfo.name === '定单双'">{{$t('lang.lottery.odds')}}:{{numbers.addOdds}}</i>
                      <i v-else>{{numbers.addOdds}}</i>

                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!--单式-->
            <div class="text-area" v-if="methodInfo.detail.isSimplex">
              <div class="wrapper">
                <textarea v-model="singleCode"
                          @input.stop="codeDebounce"></textarea>
                <!--<textarea v-model="singleCode"></textarea>-->
              </div>
              <div class="btn-group">
            <span @click="filterCodes()">
            <i class="iconfont iconic-del"></i>
              <!--删除重复号-->
            <em>{{$t('lang.lottery.simplexOption[0]')}}</em>
            </span>
                <span @click="clearSingleNum()">
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
          </div>
          <div class="credit-wrapper" v-else>
            <div class="has-tabs-item" v-if="methodInfo.addTabs">
              <ul class="title-slider">
                <li v-for="(item,index) in methodInfo.children"
                    :class="index === tabsIndex?'active':''">
                  <div @click="switchTabs(index)">
                    <span>{{item.name}}</span>
                  </div>
                </li>
              </ul>
              <div class="content-box">
                <ul class="number-content">
                  <li v-for="(detailItem,detailIndex) in methodInfo.children[tabsIndex].detail"
                      :key="detailIndex">
                    <div @click="credit_selectNumber(tabsIndex,detailIndex,detailItem)"
                         :class="[detailItem.selected?'active':'']">
                      <span>{{detailItem.value}}</span>
                      <i>{{Number(detailItem.addOdds).toFixed(3)}}</i>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <van-collapse :border="false"
                          :key="index"
                          v-else
                          v-model="activeNames"
                          v-for="(item,index) in methodInfo.children">
              <van-collapse-item v-if="item.detail.length > 0"
                                 :title="item.name"
                                 :name="index"
                                 style="text-align:left;">
                <ul :class="item.isSpan?'number-content':'spare-content'">
                  <li v-for="(detailItem,detailIndex) in item.detail"
                      :key="detailIndex">
                    <div @click="!detailItem.disable && credit_selectNumber(index,detailIndex,detailItem)"
                         :class="[detailItem.selected?'active':'',detailItem.disable?'disable':'']">
                      <span>{{detailItem.alias}}</span>
                      <i v-if="item.isSpan">{{Number(detailItem.addOdds).toFixed(3)}}</i>
                      <i v-else>{{Number(detailItem.addOdds).toFixed(3)}}</i>
                    </div>
                  </li>
                </ul>
              </van-collapse-item>
            </van-collapse>
          </div>
        </div>
        <!--lhc-->
        <div class="lhc-wrapper"
             v-if="lotteryInfo.type===lotteryType.lhc">
          <div class="credit-wrapper">
            <!--tabs-->
            <div class="has-tabs-item"
                 v-if="methodInfo.title && methodInfo.title[0].content.length>0">
              <ul class="title-slider">
                <li v-for="(item,index) in methodInfo.title[0].content"
                    :class="index === tabsIndex?'active':''">
                  <div @click="switchTabs(index)">
                    <span>{{item.name}}</span>
                  </div>
                </li>
              </ul>
              <ul class="odds-arr"
                  v-if="methodInfo.rows[tabsIndex].titleInfo && methodInfo.rows[tabsIndex].titleInfo.length>0">
                <li v-for="(item,index) in methodInfo.rows[tabsIndex].titleInfo">
                  <div>{{item.name}} {{$t('lang.lottery.odds')}}: {{_calcOdds_common(item)}}</div>
                </li>
              </ul>
              <div class="content-box">
                <ul :class="methodInfo.rows[tabsIndex].isSpan?'number-content':'spare-content'">
                  <li v-for="(contentItem,contentIndex) in methodInfo.rows[tabsIndex].content"
                      :key="contentIndex">
                    <!--数字-->
                    <div @click="credit_selectNumber(tabsIndex,contentIndex,contentItem)"
                         :class="[_formatColorBallClass(contentItem.selected,contentItem.value)]"
                         v-if="methodInfo.rows[tabsIndex].isSpan">
                      <span>{{contentItem.value}}</span>
                      <i v-if="methodInfo.name !== '连码'">{{_calcOdds_common(contentItem)}}</i>
                    </div>
                    <!--方框-->
                    <div @click="credit_selectNumber(tabsIndex,contentIndex,contentItem)"
                         v-else
                         :class="[contentItem.selected?'active':'']">
                      <span>{{contentItem.value}}</span>
                      <i>{{$t('lang.lottery.odds')}}:{{_calcOdds_common(contentItem)}}</i>
                      <ul v-if="methodInfo.rows[tabsIndex].addNumber">
                        <li v-for="(itemNumber) in getAnimalArr(contentItem.value)"
                            :class="_formatColorBallClass(false,itemNumber)">
                          {{itemNumber}}
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="content-item" v-else>
              <div v-for="(item,firstIndex) in methodInfo.rows"
                   v-if="methodInfo.rows && methodInfo.rows.length>0">
                <div class="tools" v-if="item.tool">
                  <ul>
                    <!--<ul v-if="!notHaveQuick.includes(methodInfo.name)">-->
                    <li v-for="(toolItem,toolIndex) in toolsArr[item.tool]"
                        @click="_tools(toolItem.code,firstIndex)">
                      {{toolItem.nameChina}}
                    </li>
                  </ul>
                </div>
                <ul :class="item.isSpan?'number-content':'spare-content'">
                  <li v-for="(contentItem,secondIndex) in item.content">
                    <div @click="credit_selectNumber(firstIndex,secondIndex)"
                         v-if="item.isSpan"
                         :class="[_formatColorBallClass(contentItem.selected,contentItem.alias)]">
                      <span>{{contentItem.alias}}</span>
                      <i>{{_calcOdds_common(contentItem)}}</i>
                    </div>
                    <div v-else
                         :class="[contentItem.selected?'active':'']"
                         @click="credit_selectNumber(firstIndex,secondIndex)">
                      <span>{{contentItem.alias}}</span>
                      <i>{{$t('lang.lottery.odds')}}:{{_calcOdds_common(contentItem)}}</i>
                      <ul v-if="item.addNumber">
                        <li v-for="(itemNumber) in getAnimalArr(contentItem.alias)"
                            :class="_formatColorBallClass(false,itemNumber)">
                          {{itemNumber}}
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!--fc3d-->
        <div class="fc3d-wrapper" v-if="lotteryInfo.type === lotteryType.fc3d">
          <div class="official-wrapper" v-if="methodInfo.isOfficial">
            <!--选号区-->
            <div class="normal" v-if="!methodInfo.isSingle">
              <div class="title-odds">
                <!-- 赔率 -->
                <span>
                  <em>{{$t('lang.lottery.odds')}}:</em>
                  <em class="num">{{ officialCalcOdds()}}</em>
              </span>
              </div>
              <div v-for="(rows,rowsIndex) in methodInfo.rows"
                   class="select-wrapper">
                <ul class="number-content">
                  <li v-for="(content,contentIndex) in rows.content">
                    <div class="tools">
                      <div class="title">
                        <span>{{content.name}}</span>
                      </div>
                      <ul v-if="rows.tool">
                        <!--<ul v-if="!notHaveQuick.includes(methodInfo.name)">-->
                        <li v-for="(toolItem) in toolsArr[rows.tool]"
                            @click="_tools(toolItem.code,rowsIndex,contentIndex)">
                          {{toolItem.nameChina}}
                        </li>
                      </ul>
                    </div>
                    <ul>
                      <li v-for="(number,index) in content.arr">
                        <div @click="official_selectNumber(rowsIndex,contentIndex,index)"
                             :class="number.selected?'active':''">
                          <span>{{number.value}}</span>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <!--单式-->
            <div class="text-area" v-else>
              <div class="title-odds">
                <!-- 赔率 -->
                <span>
                  <em>{{$t('lang.lottery.odds')}}:</em>
                  <em class="num">{{ officialCalcOdds()}}</em>
              </span>
              </div>
              <div class="wrapper">
                <textarea v-model="singleCode"
                          @input.stop="codeDebounce"></textarea>
              </div>
              <div class="btn-group">
                <span @click="filterCodes()">
                  <i class="iconfont iconic-del"></i>
                  <!--删除重复号-->
                  <em>{{$t('lang.lottery.simplexOption[0]')}}</em>
                </span>
                <span @click="clearSingleNum()">
                  <i class="iconfont iconic-clear"></i>
                  <!--清空-->
                  <em>{{$t('lang.lottery.simplexOption[1]')}}</em>
                </span>
              </div>
              <p class="tips">
                <!--程序会自动过滤掉不合法的号码。您也可以点击“-->
                {{$t('lang.lottery.simplexTips_3[0]')}}
                <em>{{$t('lang.lottery.simplexOption[0]')}}</em>
                {{$t('lang.lottery.simplexTips_3[1]')}}
                <!--”按钮对输入内容进行格式化。-->
              </p>
            </div>
          </div>
          <div class="credit-wrapper" v-else>
            <!--tabs-->
            <div class="has-tabs-item"
                 v-if="methodInfo.title && methodInfo.title[0].content.length>0">
              <ul class="title-slider">
                <li v-for="(item,index) in methodInfo.title[0].content"
                    :class="index === tabsIndex?'active':''">
                  <div @click="switchTabs(index)">
                    <span>{{item.name}}</span>
                  </div>
                </li>
              </ul>
              <div class="content-box">
                <ul :class="methodInfo.rows[tabsIndex].isSpan?'number-content':'spare-content'"
                    v-if="!methodInfo.rows[tabsIndex].addTabs">
                  <li v-for="(contentItem,contentIndex) in methodInfo.rows[tabsIndex].content"
                      :key="contentIndex">
                    <!--数字-->
                    <div @click="credit_selectNumber(tabsIndex,contentIndex,contentItem)"
                         :class="[_formatColorBallClass(contentItem.selected,contentItem.value)]"
                         v-if="methodInfo.rows[tabsIndex].isSpan">
                      <span>{{contentItem.value}}</span>
                      <i>{{_calcOdds_common(contentItem)}}</i>
                    </div>
                    <!--方框-->
                    <div @click="credit_selectNumber(tabsIndex,contentIndex,contentItem)"
                         v-else
                         :class="[contentItem.selected?'active':'']">
                      <span>{{contentItem.value}}</span>
                      <i>{{$t('lang.lottery.odds')}}:{{_calcOdds_common(contentItem)}}</i>
                    </div>
                  </li>
                </ul>
                <ul v-else class="add-tabs-wrapper">
                  <li v-for="(contentItem,contentIndex) in methodInfo.rows[tabsIndex].content">
                    <div class="title">{{contentItem.name}}</div>
                    <ul class="number-content">
                      <li v-for="(numberItem,numberIndex) in contentItem.arr">
                        <div :class="numberItem.selected?'active':''"
                             @click="credit_selectNumber(tabsIndex,contentIndex,numberIndex)">
                          <span>{{numberItem.value}}</span>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div class="content-item" v-else>
              <van-collapse :border="false"
                            :key="index"
                            v-model="activeNames"
                            v-for="(item,index) in methodInfo.rows">
                <van-collapse-item v-if="item.content.length > 0"
                                   :title="item.name"
                                   :name="index"
                                   style="text-align:left;">
                  <ul class="spare-content">
                    <li v-for="(contentItem,contentIndex) in item.content" :key="contentIndex">
                      <div @click="credit_selectNumber(index,contentIndex,contentItem)"
                           :class="contentItem.selected?'active':''">
                        <span>{{contentItem.alias}}</span>
                        <i>{{$t('lang.lottery.odds')}}:{{_calcOdds_common(contentItem)}}</i>
                      </div>
                    </li>
                  </ul>
                </van-collapse-item>
              </van-collapse>
            </div>
          </div>
        </div>
        <!--bjkl8-->
        <div class="bjkl8-wrapper" v-if="lotteryInfo.type === lotteryType.bjkl8">
          <div class="official-wrapper" v-if="methodInfo.isOfficial">
            <!--选号区-->
            <div class="normal">
              <div class="title-odds">
                <!-- 赔率 -->
                <span>
                  <em>{{$t('lang.lottery.odds')}}:</em>
                  <em class="num">{{ officialCalcOdds()}}</em>
              </span>
              </div>
              <div v-for="(rows,rowsIndex) in methodInfo.rows"
                   class="select-wrapper">
                <ul :class="rows.isSpan?'number-content':'square-content'">
                  <li v-for="(content,contentIndex) in rows.content">
                    <div class="tools">
                      <div class="title">
                        <span>{{content.name}}</span>
                      </div>
                      <ul v-if="rows.tool">
                        <!--<ul v-if="!notHaveQuick.includes(methodInfo.name)">-->
                        <li v-for="(toolItem) in toolsArr[rows.tool]"
                            @click="_tools(toolItem.code,rowsIndex,contentIndex)">
                          {{toolItem.nameChina}}
                        </li>
                      </ul>
                    </div>
                    <ul>
                      <li v-for="(number,index) in content.arr">
                        <div @click="official_selectNumber(rowsIndex,contentIndex,index)"
                             v-if="!['和值大小','上下盘','奇偶盘'].includes(methodInfo.name)"
                             :class="number.selected?'active':''">
                          <span>{{number.value}}</span>
                        </div>
                        <div @click="official_selectNumber(rowsIndex,contentIndex,index)"
                             v-else
                             :class="number.selected?'active':''">
                          <span>{{number.value}}</span>
                          <em>{{kl8_text(number.value)}}</em>
                          <i>{{$t('lang.lottery.odds')}}:{{_calcOdds_common(rows.info[index])}}</i>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="credit-wrapper" v-else>
            <div class="content-item" v-if="!methodInfo.isCollapse">
              <div class="title-odds" v-if="methodInfo.rows[0].addOdds">
                <span v-if="oddsAndMethod.method !== ''">
                  <!--<em>玩法:</em>-->
                  <em>{{$t('lang.lottery.play')}}:</em>
                  <em class="num">{{ oddsAndMethod.method}}</em>
                </span>
                <!-- 赔率 -->
                <span>
                  <em>{{$t('lang.lottery.odds')}}:</em>
                  <em class="num">{{ oddsAndMethod.odds}}</em>
                </span>
              </div>
              <ul :class="item.isSpan?'number-content':'spare-content'"
                  v-if="item.content.length > 0"
                  v-for="(item,index) in methodInfo.rows">
                <li v-for="(contentItem,contentIndex) in item.content" :key="contentIndex">
                  <div @click="credit_selectNumber(index,contentIndex,contentItem)"
                       :class="contentItem.selected?'active':''">
                    <span>{{contentItem.value}}</span>
                    <!--<i>赔率:{{_calcOdds(contentItem)}}</i>-->
                  </div>
                </li>
              </ul>
            </div>
            <div v-else>
              <van-collapse :border="false"
                            :key="index"
                            v-model="activeNames"
                            v-for="(item,index) in methodInfo.rows">
                <van-collapse-item v-if="item.content.length > 0"
                                   :title="item.name"
                                   :name="index"
                                   style="text-align:left;">
                  <ul class="spare-content">
                    <li v-for="(contentItem,contentIndex) in item.content"
                        :key="contentIndex">
                      <div @click="credit_selectNumber(index,contentIndex,contentItem)"
                           :class="contentItem.selected?'active':''">
                        <span>{{contentItem.alias}}</span>
                        <i>{{$t('lang.lottery.odds')}}:{{_calcOdds_common(contentItem)}}</i>
                      </div>
                    </li>
                  </ul>
                </van-collapse-item>
              </van-collapse>
            </div>
          </div>
        </div>
        <!--klc-->
        <div class="klc-wrapper" v-if="lotteryInfo.type === lotteryType.klc">
          <div class="credit-wrapper">
            <div class="content-item" v-if="!methodInfo.isCollapse">
              <div class="title-odds" v-if="methodInfo.rows && methodInfo.rows[0].addOdds">
                <span v-if="oddsAndMethod.method !== ''">
                  <!--<em>玩法:</em>-->
                  <em>{{$t('lang.lottery.play')}}:</em>
                  <em class="num">{{ oddsAndMethod.method}}</em>
                </span>
                <!-- 赔率 -->
                <span>
                  <em>{{$t('lang.lottery.odds')}}:</em>
                  <em class="num">{{ oddsAndMethod.odds}}</em>
                </span>
              </div>
              <ul :class="item.isSpan?'number-content':'spare-content'"
                  v-if="item.content.length > 0"
                  v-for="(item,index) in methodInfo.rows">
                <li v-for="(contentItem,contentIndex) in item.content" :key="contentIndex">
                  <div @click="credit_selectNumber(index,contentIndex,contentItem)"
                       :class="contentItem.selected?'active':''">
                    <span>{{contentItem.value}}</span>
                    <!--<i>赔率:{{_calcOdds_common(contentItem)}}</i>-->
                  </div>
                </li>
              </ul>
            </div>
            <div v-else>
              <van-collapse :border="false"
                            :key="index"
                            v-model="activeNames"
                            v-for="(item,index) in methodInfo.rows">
                <van-collapse-item v-if="item.content.length > 0"
                                   :title="item.name"
                                   :name="index"
                                   style="text-align:left;">
                  <ul :class="item.isSpan?'number-content':'spare-content'">
                    <li v-for="(contentItem,contentIndex) in item.content"
                        :key="contentIndex">
                      <div @click="!contentItem.disable && credit_selectNumber(index,contentIndex,contentItem)"
                           :class="[contentItem.selected?'active':'',contentItem.disable?'disable':'']">
                        <span>{{contentItem.alias}}</span>
                        <i v-if="item.isSpan">{{_calcOdds_common(contentItem)}}</i>
                        <i v-else>{{$t('lang.lottery.odds')}}:{{_calcOdds_common(contentItem)}}</i>
                      </div>
                    </li>
                  </ul>
                </van-collapse-item>
              </van-collapse>
            </div>
          </div>
        </div>
        <!--klsf-->
        <div class="klsf-wrapper" v-if="lotteryInfo.type === lotteryType.klsf">
          <div class="credit-wrapper">
            <div class="content-item" v-if="!methodInfo.isCollapse">
              <div class="title-odds" v-if="methodInfo.addOdds">
                <!-- 赔率 -->
                <span>
                  <em>{{$t('lang.lottery.odds')}}:</em>
                  <em class="num">{{_calcOdds_common(methodInfo.info)}}</em>
                </span>
              </div>
              <ul :class="item.isSpan?'number-content':'spare-content'"
                  v-if="item.content.length > 0"
                  v-for="(item,index) in methodInfo.rows">
                <li v-for="(contentItem,contentIndex) in item.content" :key="contentIndex">
                  <div @click="credit_selectNumber(index,contentIndex,contentItem)"
                       :class="contentItem.selected?'active':''">
                    <span>{{contentItem.value}}</span>
                    <!--<i>赔率:{{_calcOdds_common(contentItem)}}</i>-->
                  </div>
                </li>
              </ul>
            </div>
            <div v-else>
              <van-collapse :border="false"
                            :key="index"
                            v-model="activeNames"
                            v-for="(item,index) in methodInfo.rows">
                <van-collapse-item v-if="item.content.length > 0"
                                   :title="item.name"
                                   :name="index"
                                   style="text-align:left;">
                  <ul :class="item.isSpan?'number-content':'spare-content'">
                    <li v-for="(contentItem,contentIndex) in item.content"
                        :key="contentIndex">
                      <div @click="credit_selectNumber(index,contentIndex,contentItem)"
                           :class="contentItem.selected?'active':''">
                        <span>{{contentItem.alias}}</span>
                        <i v-if="item.isSpan">{{_calcOdds_common(contentItem)}}</i>
                        <i v-else>{{$t('lang.lottery.odds')}}:{{_calcOdds_common(contentItem)}}</i>
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
    <tips v-if="isShowTips"></tips>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
  import {lotteryType} from "../../utils/mode";
  import lotteryInfo from './lotteryInfo';
  import tips from './tips'
  import {weiGroupSplit} from "../../utils/PaiLieZuHe";
  import {get_ssc_bet} from "../../utils/GetSscBet";
  import {get_fu3d_bet} from "../../utils/GetFu3d";
  import {groupSplit, zx_3fs_3} from "../../utils/PaiLieZuHe";
  import {sortArray, towArray} from "../../utils/public"
  import {colorBall, animalArr} from "../../utils/common";

  export default {
    name: "playing",
    data() {
      return {
        // lhc -- start
        colorBall: colorBall,
        // lhc -- end
        activeNames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        toolsArr: {
          'full': [
            {nameChina: '全', nameVietnam: 'quan', code: 0},
            {nameChina: '大', nameVietnam: 'da', code: 1},
            {nameChina: '小', nameVietnam: 'xiao', code: 2},
            {nameChina: '单', nameVietnam: 'dan', code: 3},
            {nameChina: '双', nameVietnam: 'shuang', code: 4},
            {nameChina: '清', nameVietnam: 'qing', code: 5}
          ],
          'min': [
            {nameChina: '全', nameVietnam: 'quan', code: 0},
            {nameChina: '清', nameVietnam: 'qing', code: 5}
          ],
          'simple': [
            {nameChina: '全', nameVietnam: 'quan', code: 0},
            {nameChina: '单', nameVietnam: 'dan', code: 3},
            {nameChina: '双', nameVietnam: 'shuang', code: 4},
            {nameChina: '清', nameVietnam: 'qing', code: 5}
          ],
          'fullRGB': [ // LHC里面的tool
            {nameChina: '全', nameVietnam: 'quan', code: 0},
            {nameChina: '红', nameVietnam: 'hong', code: 6},
            {nameChina: '绿', nameVietnam: 'lv', code: 7},
            {nameChina: '蓝', nameVietnam: 'lan', code: 8},
            {nameChina: '大', nameVietnam: 'da', code: 1},
            {nameChina: '小', nameVietnam: 'xiao', code: 2},
            {nameChina: '单', nameVietnam: 'dan', code: 3},
            {nameChina: '双', nameVietnam: 'shuang', code: 4},
            {nameChina: '清', nameVietnam: 'qing', code: 5}
          ]
        },
        lotteryType: lotteryType,
        // -------------------
        checkGroup: ["0", "1", "2", "3", "4"],
        checkLEN: 0,
        singleCode: '',
        // tabsIndex: 0,
        // kl8--start
        oddsAndMethod: {
          method: '',
          odds: 0.0
        },
        // kl8--end
        isShowTips: false,
        isRefresh: false,
      }
    },
    computed: {
      ...mapGetters({
        _calcOdds_common: '_calcOdds_common',
        _kl8_odds: '_kl8_odds',
        format_number: '_format_number',
      }),
      ...mapState([
        'currentLotteryInfo',
        'currentMethodInfo',
        'betCount',
        'officialSelectArr',
        'currentRebate',
        'tabsIndex',
        'balance',
        'isLogin'
      ]),
      lotteryInfo() {
        let info = this.currentLotteryInfo
        // console.log(info, 'currentLotteryInfo--info');
        if (info) {
          let id = info.id
          if ([lotteryType.ssc, lotteryType.pk10].includes(info.type)) {
            this.getLuZhi(id);
          }
          this.getLongDragon(id);
        }

        return info;
      },
      methodInfo() {
        this.$nextTick(() => {
          // this.checkGroup = ["0", "1", "2", "3", "4"];
          this._calcCheckLEN();
        })
        // this.setData({key:'checkGroup_common',value:this.checkGroup});
        return this.currentMethodInfo;
      }
    },
    methods: {
      ...mapMutations({
        setData: 'SET_DATA'
      }),
      ...mapActions([
        'initData',
        'getLuZhi',
        'getLongDragon',
        'getStatus'
      ]),
      formatNumber(str) {
        if (str.length > 1) {
          let arr = str.split('_');
          return [false, arr];
        } else {
          return [true, str]
        }
      },
      // 双面盘的选号
      credit_selectNumber(one, two, three, item) {
        let methodInfo = this.currentMethodInfo;
        if (lotteryType.ssc === this.currentLotteryInfo.type) {
          let isSelected = methodInfo.children[one].children[two].selected
          methodInfo.children[one].children[two].selected = !isSelected;
        }
        else if ([lotteryType.k3, lotteryType.pcdd].includes(this.currentLotteryInfo.type)) {
          let isSelected = methodInfo.detail[one].selected
          methodInfo.detail[one].selected = !isSelected;
        }
        else if (lotteryType.pk10 === this.currentLotteryInfo.type) {
          let isSelected = methodInfo.children[one].detail[two].selected
          methodInfo.children[one].detail[two].selected = !isSelected;
        }
        else if (lotteryType.eleven5 === this.currentLotteryInfo.type) {
          if (['前二直选', '前三直选'].includes(methodInfo.name)) {
            for (let i = 0; i < methodInfo.children.length; i++) {
              let firstItem = methodInfo.children[i];
              for (let n = 0; n < firstItem.detail.length; n++) {
                let secondItem = firstItem.detail[n];
                if (!secondItem.disable && (one === i && two === n)) {
                  let item = methodInfo.children[one].detail[two];
                  methodInfo.children[one].detail[two].selected = !item.selected;
                }
              }
            }
            // 不让其反选
            for (let i = 0; i < methodInfo.children.length; i++) {
              let firstItem = methodInfo.children[i];
              for (let n = 0; n < firstItem.detail.length; n++) {
                // let secondItem = firstItem.detail[n];
                if (two === n && one !== i) {
                  let item = methodInfo.children[i].detail[n];
                  methodInfo.children[i].detail[n].disable = !item.disable;
                }
              }
            }
          }
          else if (['连码'].includes(methodInfo.name)) {
            let isSelected = methodInfo.children[one].detail[two].selected;
            methodInfo.children[one].detail[two].selected = !isSelected;
            let betNum = methodInfo.children[one].betsNum;
            let count = 0;
            for (let i = 0; i < methodInfo.children[one].detail.length; i++) {
              let first = methodInfo.children[one].detail[i];
              if (first.selected) {
                count = count + 1;
              }
            }
            if (count > betNum) {
              this.$toast.fail(`最多可以选择${betNum}个号码`);
              let isSelected = methodInfo.children[one].detail[two].selected;
              methodInfo.children[one].detail[two].selected = !isSelected;
            }
          }
          else {
            let isSelected = methodInfo.children[one].detail[two].selected;
            methodInfo.children[one].detail[two].selected = !isSelected;
          }
        }
        else if (lotteryType.lhc === this.currentLotteryInfo.type) {
          let isSelected = methodInfo.rows[one].content[two].selected;
          methodInfo.rows[one].content[two].selected = !isSelected;
        }
        else if (lotteryType.fc3d === this.currentLotteryInfo.type) {
          if (['二字', '三字'].includes(methodInfo.name) &&
            ['百拾定位', '百个定位', '拾个定位', '组选三', '组选六', '百拾个定位'].includes(methodInfo.rows[this.tabsIndex].name)) {
            let isSelected = methodInfo.rows[one].content[two].arr[three].selected;
            methodInfo.rows[one].content[two].arr[three].selected = !isSelected;
          } else {
            let isSelected = methodInfo.rows[one].content[two].selected;
            methodInfo.rows[one].content[two].selected = !isSelected;
          }

        }
        else if (lotteryType.bjkl8 === this.currentLotteryInfo.type) {
          if (['选一', '选二', '选三', '选四', '选五'].includes(methodInfo.name)) {
            let isSelected = methodInfo.rows[one].content[two].selected;
            methodInfo.rows[one].content[two].selected = !isSelected;
            let count = 0;
            for (let number of methodInfo.rows[one].content) {
              if (number.selected) {
                count = count + 1
              }
            }
            let maxCount = methodInfo.rows[one].maxCount
            if (count > maxCount) {
              this.$toast.fail(`最多可以选择${maxCount}个号码`);
              let isSelected = methodInfo.rows[one].content[two].selected;
              methodInfo.rows[one].content[two].selected = !isSelected;
            }
          }
          else if (['选1-5'].includes(methodInfo.name)) {
            let isSelected = methodInfo.rows[one].content[two].selected;
            methodInfo.rows[one].content[two].selected = !isSelected;
            let count = 0;
            for (let number of methodInfo.rows[one].content) {
              if (number.selected) {
                count = count + 1
              }
            }
            let maxCount = methodInfo.rows[one].maxCount;
            if (count > maxCount) {
              this.$toast.fail(`最多可以选择${maxCount}个号码`);
              let isSelected = methodInfo.rows[one].content[two].selected;
              methodInfo.rows[one].content[two].selected = !isSelected;
            }
          }
          else {
            let isSelected = methodInfo.rows[one].content[two].selected;
            methodInfo.rows[one].content[two].selected = !isSelected;
          }
        }
        else if (lotteryType.klc === this.currentLotteryInfo.type) {
          if (['任选二', '选二连组', '任选三', '前三组选', '任选四', '任选五'].includes(methodInfo.name)) {
            let isSelected = methodInfo.rows[one].content[two].selected;
            methodInfo.rows[one].content[two].selected = !isSelected;
            let count = 0;
            for (let number of methodInfo.rows[one].content) {
              if (number.selected) {
                count = count + 1
              }
            }
            let maxCount = methodInfo.maxCount;
            if (count > maxCount) {
              this.$toast.fail(`最多可以选择${maxCount}个号码`);
              let isSelected = methodInfo.rows[one].content[two].selected;
              methodInfo.rows[one].content[two].selected = !isSelected;
            }
          }
          else if (['选二连直', '前三直选'].includes(methodInfo.name)) { // 与11x5相似 反选
            let countArr = [];
            for (let i = 0; i < methodInfo.rows.length; i++) {
              let rows = methodInfo.rows[i]
              countArr.push({count: 0});
              for (let n = 0; n < rows.content.length; n++) {
                let content = rows.content[n];
                if (!content.disable && (one === i && two === n)) {
                  let isSelected = methodInfo.rows[one].content[two].selected;
                  methodInfo.rows[one].content[two].selected = !isSelected;
                }
                if (content.selected) {
                  countArr[i].count = countArr[i].count + 1;
                }
              }
            }
            let totalCount = 0;
            for (let i = 0; i < countArr.length; i++) {
              let count = countArr[i];
              totalCount = count.count + totalCount;
              if (count.count >= methodInfo.rows[i].maxCount) {
                this.$toast.fail(`${methodInfo.rows[i].name}最多可以选择${methodInfo.rows[i].maxCount}个号码`);
                let isSelected = methodInfo.rows[one].content[two].selected;
                methodInfo.rows[one].content[two].selected = !isSelected;
                return;
              }
            }
            if (totalCount >= methodInfo.maxCount) {
              this.$toast.fail(`最多可以选择${methodInfo.maxCount}个号码`);
              let isSelected = methodInfo.rows[one].content[two].selected;
              methodInfo.rows[one].content[two].selected = !isSelected;
              return;
            }
            // 不让其反选
            for (let i = 0; i < methodInfo.rows.length; i++) {
              let rows = methodInfo.rows[i]
              for (let n = 0; n < rows.content.length; n++) {
                if (two === n && one !== i) {
                  let item = methodInfo.rows[i].content[n].disable;
                  methodInfo.rows[i].content[n].disable = !item;
                }
              }
            }

          }
          else {
            let isSelected = methodInfo.rows[one].content[two].selected;
            methodInfo.rows[one].content[two].selected = !isSelected;
          }
        }
        else if (lotteryType.klsf === this.currentLotteryInfo.type) {
          if (['二中二', '三中二', '三中三', '四中三', '五中三'].includes(methodInfo.name)) {
            let isSelected = methodInfo.rows[one].content[two].selected;
            methodInfo.rows[one].content[two].selected = !isSelected;
            let count = 0;
            for (let number of methodInfo.rows[one].content) {
              if (number.selected) {
                count = count + 1
              }
            }
            let maxCount = methodInfo.maxCount;
            if (count > maxCount) {
              this.$toast.fail(`最多可以选择${maxCount}个号码`);
              let isSelected = methodInfo.rows[one].content[two].selected;
              methodInfo.rows[one].content[two].selected = !isSelected;
            }
          }
          else {
            let isSelected = methodInfo.rows[one].content[two].selected;
            methodInfo.rows[one].content[two].selected = !isSelected;
          }
        }
        this.setData({key: 'currentMethodInfo', value: JSON.parse(JSON.stringify(methodInfo))});
        this.$nextTick(() => {
          this.credit_BetCount();
        })
      },
      // 双面盘的计算注数
      credit_BetCount() {
        let list = this.currentMethodInfo;
        let selectArr = [];
        if (lotteryType.ssc === this.currentLotteryInfo.type) {
          for (let firstItem of list.children) {
            for (let secondItem of firstItem.children) {
              if (secondItem.selected) {
                selectArr.push(secondItem);
              }
            }
          }
        }
        else if ([lotteryType.k3].includes(this.currentLotteryInfo.type)) {
          for (let firstItem of list.detail) {
            if (firstItem.selected) {
              selectArr.push(firstItem);
            }
          }
        }
        else if (lotteryType.pk10 === this.currentLotteryInfo.type) {
          for (let firstItem of list.children) {
            for (let secondItem of firstItem.detail) {
              if (secondItem.selected) {
                selectArr.push(secondItem);
              }
            }
          }
        }
        else if (lotteryType.eleven5 === this.currentLotteryInfo.type) {
          if (['前二直选', '前三直选'].includes(list.name)) {
            let arr = [];
            for (let i = 0; i < list.children.length; i++) {
              let firstItem = list.children[i];
              arr.push([]);
              for (let n = 0; n < firstItem.detail.length; n++) {
                let secondItem = firstItem.detail[n];
                if (secondItem.selected) {
                  arr[i].push(Number(secondItem.value));
                }
              }
            }
            let newArr = towArray(arr);
            for (let i = 0; i < newArr.length; i++) {
              for (let n = 0; n < newArr[i].length; n++) {
                if (newArr[i][n] < 10) {
                  newArr[i][n] = '0' + newArr[i][n]
                }
              }
              let formatValue = newArr[i].join(',');
              let obj = Object.assign({}, list, {value: formatValue});
              selectArr.push(obj);
            }
          }
          else if (['连码'].includes(list.name)) {
            let arr = []
            let obj = list.children[this.tabsIndex];

            for (let item of obj.detail) {
              if (item.selected) {
                arr.push(item.value);
              }
            }
            let num = obj.nums;
            let newArr = sortArray(arr, num); // num 是指多少个数组成一个组合
            for (let item of newArr) {
              let value = item.join(',');
              let obj = Object.assign({}, list.children[this.tabsIndex], {value: value});
              selectArr.push(obj);
            }
          }
          else {
            for (let i = 0; i < list.children.length; i++) {
              let firstItem = list.children[i];
              for (let n = 0; n < firstItem.detail.length; n++) {
                let secondItem = firstItem.detail[n];
                if (secondItem.selected) {
                  selectArr.push(secondItem);
                }
              }
            }
          }
        }
        else if ([lotteryType.pcdd].includes(this.currentLotteryInfo.type)) {
          if (['特码三包'].includes(list.name)) {
            let arr = []
            let obj = list.detail;
            for (let item of obj) {
              if (item.selected) {
                arr.push(item.value);
              }
            }
            let num = list.nums;
            let newArr = sortArray(arr, num); // num 是指多少个数组成一个组合
            for (let item of newArr) {
              let value = item.join(',');
              let obj = Object.assign({}, list.detail[0], {value: value});
              selectArr.push(obj);
            }
          } else {
            for (let firstItem of list.detail) {
              if (firstItem.selected) {
                selectArr.push(firstItem);
              }
            }
          }
        }
        else if ([lotteryType.lhc].includes(this.currentLotteryInfo.type)) {
          if (['自选中一', '自选不中'].includes(list.name)) {
            let tabsIndex = this.tabsIndex;
            let arr = [];
            let rows = list.rows[tabsIndex];
            for (let item of rows.content) {
              if (item.selected) {
                arr.push(item.value);
              }
            }
            let num = rows.nums;
            let newArr = sortArray(arr, num); // num 是指多少个数组成一个组合
            for (let item of newArr) {
              let value = item.join(',');
              let content = rows.content[0];
              let newObj = Object.assign({}, content, {value: value});
              selectArr.push(newObj);
            }
          }
          else if (['连码'].includes(list.name)) {
            let tabsIndex = this.tabsIndex;
            let arr = [];
            let rows = list.rows[tabsIndex];
            for (let item of rows.content) {
              if (item.selected) {
                arr.push(item.value);
              }
            }
            let num = rows.nums;
            let newArr = sortArray(arr, num); // num 是指多少个数组成一个组合
            for (let item of newArr) {
              let value = item.join(',');
              let content = rows.content[0];
              let newObj = Object.assign({}, content, {value: value});
              selectArr.push(newObj);
            }
          }
          else {
            for (let rows of list.rows) {
              for (let content of rows.content) {
                if (content.selected) {
                  selectArr.push(content);
                }
              }
            }
          }
        }
        else if ([lotteryType.fc3d].includes(this.currentLotteryInfo.type)) {
          if (['二字', '三字'].includes(list.name) && ['百拾定位', '百个定位', '拾个定位', '百拾个定位'].includes(list.rows[this.tabsIndex].name)) {
            let tabsIndex = this.tabsIndex;
            let arr = [];
            let rows = list.rows[tabsIndex];
            for (let [index, content] of Object.entries(rows.content)) {
              arr.push([])
              for (let number of content.arr) {
                if (number.selected) {
                  arr[Number(index)].push(number.value);
                }
              }
            }
            let newArr = towArray(arr); // num 是指多少个数组成一个组合
            // selectArr = newArr
            if (newArr.length > 0) {
              for (let item of newArr) {
                let value = item.join(',');
                let arr = rows.content[0].arr[0];
                let newObj = Object.assign({}, arr, {value: value});
                selectArr.push(newObj);
              }
            }
          }
          else if (['组选三', '组选六'].includes(list.rows[this.tabsIndex].name)) {
            let tabsIndex = this.tabsIndex;
            let arr = [];
            let rows = list.rows[tabsIndex];
            for (let [index, content] of Object.entries(rows.content)) {
              for (let number of content.arr) {
                if (number.selected) {
                  arr.push(number.value);
                }
              }
            }
            if (arr.length >= 5) {
              let value = arr.join(',');
              let content = rows.content[0].arr[0];
              let newObj = Object.assign({}, content, {value: value});
              selectArr.push(newObj);
            }
          }
          else {
            for (let rows of list.rows) {
              for (let content of rows.content) {
                if (content.selected) {
                  selectArr.push(content);
                }
              }
            }
          }
        }
        else if ([lotteryType.bjkl8].includes(this.currentLotteryInfo.type)) {
          if (['选1-5'].includes(list.name)) {
            let arr = [];
            for (let rows of list.rows) {
              for (let item of rows.content) {
                if (item.selected) {
                  arr.push(item.value);
                }
              }
            }
            let LEN = arr.length;
            this.oddsAndMethod.method = this._kl8_odds(LEN).method;
            this.oddsAndMethod.odds = this._kl8_odds(LEN).odds;
            if (LEN > 0) {
              selectArr.push({value: arr.join(',')})
            }
          }
          else if (['选一', '选二', '选三', '选四', '选五'].includes(list.name)) {
            let arr = [];
            for (let rows of list.rows) {
              for (let item of rows.content) {
                if (item.selected) {
                  arr.push(item.value);
                }
              }
              let num = rows.nums;
              let newArr = sortArray(arr, num); // num 是指多少个数组成一个组合
              for (let item of newArr) {
                let value = item.join(',');
                let content = rows.content[0];
                let newObj = Object.assign({}, content, {value: value});
                selectArr.push(newObj);
              }
            }
          }
          else {
            for (let rows of list.rows) {
              for (let content of rows.content) {
                if (content.selected) {
                  selectArr.push(content);
                }
              }
            }
          }
        }
        else if ([lotteryType.klc].includes(this.currentLotteryInfo.type)) {
          if (['任选二', '选二连组', '任选三', '前三组选', '任选四', '任选五'].includes(list.name)) {
            let arr = [];
            for (let rows of list.rows) {
              for (let item of rows.content) {
                if (item.selected) {
                  arr.push(String(item.alias));
                }
              }
            }
            let num = list.nums;
            let newArr = sortArray(arr, num); // num 是指多少个数组成一个组合
            for (let item of newArr) {
              let value = item.join(',');
              let content = list.rows[0].content[0];
              let newObj = Object.assign({}, content, {value: value});
              selectArr.push(newObj);
            }
          }
          else if (['选二连直', '前三直选'].includes(list.name)) {
            let arr = [];
            for (let i = 0; i < list.rows.length; i++) {
              let rows = list.rows[i];
              arr.push([]);
              for (let item of rows.content) {
                if (item.selected) {
                  arr[i].push(item.alias);
                }
              }
            }
            let newArr = towArray(arr); // 多维数组组成一个组合
            for (let item of newArr) {
              let value = item.join(',');
              let content = list.rows[0].content[0];
              let newObj = Object.assign({}, content, {value: value});
              selectArr.push(newObj);
            }
          }
          else {
            for (let rows of list.rows) {
              for (let content of rows.content) {
                if (content.selected) {
                  selectArr.push(content);
                }
              }
            }
          }
        }
        else if ([lotteryType.klsf].includes(this.currentLotteryInfo.type)) {
          if (['二中二', '三中二', '三中三', '四中三', '五中三'].includes(list.name)) {
            let arr = [];
            for (let rows of list.rows) {
              for (let item of rows.content) {
                if (item.selected) {
                  arr.push(String(item.value));
                }
              }
            }
            let num = list.nums;
            let newArr = sortArray(arr, num); // num 是指多少个数组成一个组合
            for (let item of newArr) {
              let value = item.join(',');
              let content = list.rows[0].content[0];
              let newObj = Object.assign({}, content, {value: value});
              selectArr.push(newObj);
            }
          }
          else {
            for (let rows of list.rows) {
              for (let content of rows.content) {
                if (content.selected) {
                  selectArr.push(content);
                }
              }
            }
          }
        }
        this.$nextTick(() => {
          this.setData({key: 'betCount', value: selectArr.length}); // 多少注数
          this.setData({key: 'creditSelectArr', value: selectArr}); // 选择的所有号码
        })
      },
      // 官方选号
      official_selectNumber(firstIndex, detailIndex, numberIndex) {
        let methodInfo = this.currentMethodInfo;
        // ssc
        if (lotteryType.ssc === this.currentLotteryInfo.type) {
          let isSelected = methodInfo.children[firstIndex].detail[detailIndex].selected;
          methodInfo.children[firstIndex].detail[detailIndex].selected = !isSelected;
        }
        // k3
        else if (lotteryType.k3 === this.currentLotteryInfo.type) {
          if (['二同号单选 '].includes(methodInfo.name)) {
            let isSelected = methodInfo.detail[firstIndex].detail[detailIndex].selected;
            methodInfo.detail[firstIndex].detail[detailIndex].selected = !isSelected;
            for (let first = 0; first < methodInfo.detail.length; first++) {
              let firstItem = methodInfo.detail[first];
              for (let second = 0; second < firstItem.detail.length; second++) {
                if (firstIndex !== first && detailIndex === second) {
                  methodInfo.detail[first].detail[second].selected = false;
                }
              }
            }
          }
          else if (['三同号复选', '三连号通选'].includes(methodInfo.name)) {
            // 全选
            for (let i = 0; i < methodInfo.detail.length; i++) {
              let firstItem = methodInfo.detail[i];
              for (let n = 0; n < firstItem.detail.length; n++) {
                let isSelect = methodInfo.detail[i].detail[n].selected;
                methodInfo.detail[i].detail[n].selected = !isSelect;
              }
            }
          }
          else {
            let isSelected = methodInfo.detail[firstIndex].detail[detailIndex].selected;
            methodInfo.detail[firstIndex].detail[detailIndex].selected = !isSelected;
          }
        }
        // pk10
        else if (lotteryType.pk10 === this.currentLotteryInfo.type) {
          let isSelected = methodInfo.detail[firstIndex].detail[detailIndex].selected;
          methodInfo.detail[firstIndex].detail[detailIndex].selected = !isSelected;
        }
        // 11x5
        else if (lotteryType.eleven5 === this.currentLotteryInfo.type) {
          if (['一中一', '二中二 ', '三中三', '四中四', '五中五',
            '六中五', '七中五', '八中五'].includes(methodInfo.cateName)) {
            let isSelected = methodInfo.detail[firstIndex].detail[detailIndex].selected;
            methodInfo.detail[firstIndex].detail[detailIndex].selected = !isSelected;
            let betNum = methodInfo.betsNum;
            let count = 0;
            for (let i = 0; i < methodInfo.detail[firstIndex].detail.length; i++) {
              let first = methodInfo.detail[firstIndex].detail[i];
              if (first.selected) {
                count = count + 1;
              }
            }
            if (count > betNum) {
              this.$toast.fail(`最多可以选择${betNum}个号码`);
              let isSelected = methodInfo.detail[firstIndex].detail[detailIndex].selected;
              methodInfo.detail[firstIndex].detail[detailIndex].selected = !isSelected;
            }
          } else {
            let isSelected = methodInfo.detail[firstIndex].detail[detailIndex].selected;
            methodInfo.detail[firstIndex].detail[detailIndex].selected = !isSelected;
          }

        }
        // fc3d
        else if (lotteryType.fc3d === this.currentLotteryInfo.type) {
          if (['一中一', '二中二 ', '三中三', '四中四', '五中五',
            '六中五', '七中五', '八中五'].includes(methodInfo.cateName)) {
            let isSelected = methodInfo.detail[firstIndex].detail[detailIndex].selected;
            methodInfo.detail[firstIndex].detail[detailIndex].selected = !isSelected;
            let betNum = methodInfo.betsNum;
            let count = 0;
            for (let i = 0; i < methodInfo.detail[firstIndex].detail.length; i++) {
              let first = methodInfo.detail[firstIndex].detail[i];
              if (first.selected) {
                count = count + 1;
              }
            }
            if (count > betNum) {
              this.$toast.fail(`最多可以选择${betNum}个号码`);
              let isSelected = methodInfo.detail[firstIndex].detail[detailIndex].selected;
              methodInfo.detail[firstIndex].detail[detailIndex].selected = !isSelected;
            }
          } else {
            let isSelected = methodInfo.rows[firstIndex].content[detailIndex].arr[numberIndex].selected;
            methodInfo.rows[firstIndex].content[detailIndex].arr[numberIndex].selected = !isSelected;
          }

        }
        // bjkl8
        else if (lotteryType.bjkl8 === this.currentLotteryInfo.type) {
          if (['任选一', '任选二', '任选三', '任选四', '任选五', '任选六', '任选七'].includes(methodInfo.name)) {
            let isSelected = methodInfo.rows[firstIndex].content[detailIndex].arr[numberIndex].selected;
            methodInfo.rows[firstIndex].content[detailIndex].arr[numberIndex].selected = !isSelected;
            let maxCount = methodInfo.maxCount;
            let count = 0;
            for (let i = 0; i < methodInfo.rows[firstIndex].content.length; i++) {
              let arr = methodInfo.rows[firstIndex].content[i].arr;
              for (let n = 0; n < arr.length; n++) {
                if (arr[n].selected) {
                  count = count + 1;
                }
              }

            }
            if (count > maxCount) {
              this.$toast.fail(`最多可以选择${maxCount}个号码`);
              let isSelected = methodInfo.rows[firstIndex].content[detailIndex].arr[numberIndex].selected;
              methodInfo.rows[firstIndex].content[detailIndex].arr[numberIndex].selected = !isSelected;
            }
          }
          else {
            let isSelected = methodInfo.rows[firstIndex].content[detailIndex].arr[numberIndex].selected;
            methodInfo.rows[firstIndex].content[detailIndex].arr[numberIndex].selected = !isSelected;
          }

        }
        this.setData({key: 'currentMethodInfo', value: JSON.parse(JSON.stringify(methodInfo))});
        // this.setData({key: 'checkGroup_common', value: this.checkGroup});
        this.$nextTick(() => {
          this.official_BetCount();
        })
      },
      // 官方算注数
      official_BetCount() {
        let methodInfo = this.currentMethodInfo;
        let lotteryInfo = this.currentLotteryInfo;
        let name = methodInfo.name;
        // ssc
        if (lotteryInfo.type === lotteryType.ssc) {
          let specialNumberList = ['后三特殊号', '前三特殊号', '中三特殊号'];
          if (methodInfo.children.length > 0) { // 正常选号
            let checkList = [];
            for (let i = 0; i < methodInfo.children.length; i++) {
              let firstItem = methodInfo.children[i];
              checkList.push([]);
              for (let n = 0; n < firstItem.detail.length; n++) {
                let detailItem = firstItem.detail[n];
                if (detailItem.selected) {
                  if (specialNumberList.includes(methodInfo.name)) { // 特殊号
                    checkList[i].push(detailItem)
                  } else {
                    checkList[i].push(detailItem.alias)
                  }

                }
              }
            }
            let betList = get_ssc_bet(name, checkList, this.checkGroup);
            // this._calcCheckLEN();
            let count = 0;
            if (name.indexOf('组合') !== -1) {
              count = methodInfo.del.zh_odds.length * betList.length;
            } else {
              count = betList.length;
            }
            this.setData({key: 'betCount', value: count});
            if (count > 0) {
              this.setData({key: 'officialSelectArr', value: checkList});
            }
          }
          else { // 单式
            let count = 0;
            let randomTwoSingleList = [
              "任二直选单式",
              "任三直选单式",
              "任四直选单式",
              "任二组选单式",
            ];
            if (randomTwoSingleList.includes(methodInfo.name)) {
              if (this.officialSelectArr.length > 0) {
                // count = this.officialSelectArr[0].length * weiLength
                this._calcCheckLEN();
                this.$nextTick(() => {
                  count = this.officialSelectArr[0].length * this.checkLEN;
                  this.setData({key: 'betCount', value: count});
                })
              }
            } else {
              count = this.officialSelectArr[0].length;
              this.setData({key: 'betCount', value: count});
            }
          }
        }
        // k3
        else if (lotteryInfo.type === lotteryType.k3) {
          if (['二同号单选 '].includes(methodInfo.name)) {
            let selectArr = [[], []];
            for (let i = 0; i < methodInfo.detail.length; i++) {
              let firstItem = methodInfo.detail[i];
              for (let n = 0; n < firstItem.detail.length; n++) {
                if (methodInfo.detail[i].detail[n].selected) {
                  selectArr[i].push(methodInfo.detail[i].detail[n].value)
                }
              }
            }
            let count = selectArr[0].length * selectArr[1].length;
            this.setData({key: 'betCount', value: count});
            if (count > 0) {
              this.setData({key: 'officialSelectArr', value: selectArr});
            }
          }
          else if (['三同号复选', '三连号通选'].includes(methodInfo.name)) {
            let content = '';
            if (methodInfo.name === '三同号复选') {
              content = '三同号通选'
            } else if (methodInfo.name === '三连号通选') {
              content = '三连号通选'
            }
            if (methodInfo.detail[0].detail[0].selected) {
              this.setData({key: 'officialSelectArr', value: [[content]]});
              this.setData({key: 'betCount', value: 1});
            } else {
              this.setData({key: 'officialSelectArr', value: []});
              this.setData({key: 'betCount', value: 0});
            }
          }
          else if (['和值'].includes(methodInfo.name)) {
            let selectArr = [];
            for (let i = 0; i < methodInfo.detail[0].detail.length; i++) {
              let firstItem = methodInfo.detail[0].detail[i];
              if (firstItem.selected) {
                selectArr.push(firstItem)
              }
            }
            ;
            let count = selectArr.length;
            this.setData({key: 'betCount', value: count});
            if (count > 0) {
              this.setData({key: 'officialSelectArr', value: selectArr});
            }
          }
          else if (methodInfo.name.indexOf('不同号') !== -1) {
            let selectArr = [];
            for (let i = 0; i < methodInfo.detail.length; i++) {
              let firstItem = methodInfo.detail[i];
              for (let n = 0; n < firstItem.detail.length; n++) {
                if (methodInfo.detail[i].detail[n].selected) {
                  selectArr.push(methodInfo.detail[i].detail[n].value)
                }
              }
            }
            let count = sortArray(selectArr, methodInfo.num).length; // 排列组合
            this.setData({key: 'betCount', value: count});
            if (count > 0) {
              this.setData({key: 'officialSelectArr', value: [selectArr]});
            }
            // item.num ? this.betsNum = sortArray(this.codeArr, item.num).length : this.betsNum = this.codeArr.length
          }
          else { // 正常选号
            let selectArr = [];
            for (let i = 0; i < methodInfo.detail.length; i++) {
              let firstItem = methodInfo.detail[i];
              selectArr.push([]);
              for (let n = 0; n < firstItem.detail.length; n++) {
                if (methodInfo.detail[i].detail[n].selected) {
                  selectArr[i].push(methodInfo.detail[i].detail[n].value)
                }
              }
            }
            let count = selectArr[0].length;
            this.setData({key: 'betCount', value: count});
            if (count > 0) {
              this.setData({key: 'officialSelectArr', value: selectArr});
            }
          }
        }
        // pk10
        else if (lotteryInfo.type === lotteryType.pk10) {
          if (['猜冠军', '猜亚军'].includes(methodInfo.cateName)) {
            let selectArr = [];
            for (let i = 0; i < methodInfo.detail[0].detail.length; i++) {
              let firstItem = methodInfo.detail[0].detail[i];
              if (firstItem.selected) {
                selectArr.push(firstItem.alias)
              }
            }
            ;
            let count = selectArr.length;
            this.setData({key: 'betCount', value: count});
            if (count > 0) {
              this.setData({key: 'officialSelectArr', value: [selectArr]});
            }
          }
          else if (['定位胆'].includes(methodInfo.cateName)) {
            let selectArr = [];
            let count = 0;
            for (let i = 0; i < methodInfo.detail.length; i++) {
              let firstItem = methodInfo.detail[i];
              selectArr.push([]);
              for (let n = 0; n < firstItem.detail.length; n++) {
                let secondItem = firstItem.detail[n]
                if (secondItem.selected) {
                  count = count + 1;
                  selectArr[i].push(secondItem)
                }
              }
            }
            ;
            this.setData({key: 'betCount', value: count});
            if (count > 0) {
              this.setData({key: 'officialSelectArr', value: selectArr});
            }
          }
          else if (['猜前二复式', '猜前三复式', '猜前四复式', '猜前五复式'].includes(methodInfo.cateName)) {
            let selectArr = [];
            for (let i = 0; i < methodInfo.detail.length; i++) {
              let firstItem = methodInfo.detail[i];
              selectArr.push([]);
              for (let n = 0; n < firstItem.detail.length; n++) {
                let secondItem = firstItem.detail[n];
                if (secondItem.selected) {
                  selectArr[i].push(secondItem.alias);
                }
              }
            }
            // 1.多少个组合【拿到所有的组合】
            let LEN = methodInfo.detail.length;
            let formatArr = towArray(selectArr);
            let count = 0;
            // 2.去除有重复项的组合
            for (let i = 0; i < formatArr.length; i++) {
              let item = formatArr[i];
              if ([...new Set(item)].length === LEN) {
                count = count + 1;
              }
            }
            this.setData({key: 'betCount', value: count});
            if (count > 0) {
              this.setData({key: 'officialSelectArr', value: selectArr});
            }
          }
          else if (methodInfo.cateName.indexOf('单式') !== -1) {
            let count = this.officialSelectArr.length;
            this.setData({key: 'betCount', value: count});
          }
        }
        // 11x5
        else if (lotteryInfo.type === lotteryType.eleven5) {
          if (methodInfo.detail.isSimplex) {
            let count = this.officialSelectArr.length;
            this.setData({key: 'betCount', value: count});
          } else {
            if (['定位胆'].includes(methodInfo.cateName)) {
              let selectArr = [];
              let count = 0;
              for (let i = 0; i < methodInfo.detail.length; i++) {
                let firstItem = methodInfo.detail[i];
                selectArr.push([]);
                for (let n = 0; n < firstItem.detail.length; n++) {
                  let secondItem = firstItem.detail[n]
                  if (secondItem.selected) {
                    count = count + 1;
                    selectArr[i].push(secondItem)
                  }
                }
              }
              ;
              this.setData({key: 'betCount', value: count});
              if (count > 0) {
                this.setData({key: 'officialSelectArr', value: selectArr});
              }
            }
            else if (['前二直选复式', '前三直选复式'].includes(methodInfo.cateName)) {
              let selectArr = [];
              for (let i = 0; i < methodInfo.detail.length; i++) {
                let firstItem = methodInfo.detail[i];
                selectArr.push([]);
                for (let n = 0; n < firstItem.detail.length; n++) {
                  let secondItem = firstItem.detail[n];
                  if (secondItem.selected) {
                    selectArr[i].push(secondItem.alias);
                  }
                }
              }
              // 1.多少个组合【拿到所有的组合】
              let LEN = methodInfo.detail.length;
              let formatArr = towArray(selectArr);
              let count = 0;
              // 2.去除有重复项的组合
              for (let i = 0; i < formatArr.length; i++) {
                let item = formatArr[i];
                if ([...new Set(item)].length === LEN) {
                  count = count + 1;
                }
              }
              this.setData({key: 'betCount', value: count});
              if (count > 0) {
                this.setData({key: 'officialSelectArr', value: selectArr});
              }
            }
            else if (['前二组选复式', '前三组选复式', '一中一', '二中二 ', '三中三', '四中四', '五中五', '六中五', '七中五', '八中五'].includes(methodInfo.cateName)) {
              let selectArr = [];
              for (let i = 0; i < methodInfo.detail[0].detail.length; i++) {
                let firstItem = methodInfo.detail[0].detail[i];
                if (firstItem.selected) {
                  selectArr.push(firstItem.value);
                }
              }
              let count = sortArray(selectArr, methodInfo.nums).length; // 排列组合
              this.setData({key: 'betCount', value: count});
              if (count > 0) {
                this.setData({key: 'officialSelectArr', value: [selectArr]});
              }
            }
            else if (['定单双', '猜中位'].includes(methodInfo.cateName)) {
              let selectArr = [];
              for (let i = 0; i < methodInfo.detail[0].detail.length; i++) {
                let firstItem = methodInfo.detail[0].detail[i];
                if (firstItem.selected) {
                  selectArr.push(firstItem)
                }
              }
              ;
              let count = selectArr.length;
              this.setData({key: 'betCount', value: count});
              if (count > 0) {
                this.setData({key: 'officialSelectArr', value: selectArr});
              }
            }
            else {
              let selectArr = [];
              for (let i = 0; i < methodInfo.detail[0].detail.length; i++) {
                let firstItem = methodInfo.detail[0].detail[i];
                if (firstItem.selected) {
                  selectArr.push(firstItem.value)
                }
              }
              ;
              let count = selectArr.length;
              this.setData({key: 'betCount', value: count});
              if (count > 0) {
                this.setData({key: 'officialSelectArr', value: [selectArr]});
              }
            }
          }

        }
        // fc3d
        else if (lotteryInfo.type === lotteryType.fc3d) {
          if (methodInfo.isSingle) {
            // 单式
            let count = this.officialSelectArr.length;
            this.setData({key: 'betCount', value: count});
          } else {
            // 选号区
            if (['二码不定胆', '前二组选复式', '后二组选复式'].includes(methodInfo.name)) {
              let selectArr = [];
              for (let rows of methodInfo.rows) {
                for (let i = 0; i < rows.content.length; i++) {
                  let content = rows.content[i];
                  for (let number of content.arr) {
                    if (number.selected) {
                      selectArr.push(number.value)
                    }
                  }
                }
              }
              let count = sortArray(selectArr, 2).length; // 排列组合
              this.setData({key: 'betCount', value: count});
              if (count > 0) {
                this.setData({key: 'officialSelectArr', value: selectArr});
              }
            }
            else if (['复式', '前二直选复式', '后二直选复式', '前二大小单双', '后二大小单双'].includes(methodInfo.name)) {
              let selectArr = [];
              for (let rows of methodInfo.rows) {
                for (let i = 0; i < rows.content.length; i++) {
                  let content = rows.content[i];
                  selectArr.push([]);
                  for (let number of content.arr) {
                    if (number.selected) {
                      selectArr[i].push(number.value)
                    }
                  }
                }
              }
              let formatArr = towArray(selectArr);

              let count = formatArr.length;
              this.setData({key: 'betCount', value: count});
              if (count > 0) {
                this.setData({key: 'officialSelectArr', value: selectArr});
              }

            }
            else if (['直选和值'].includes(methodInfo.name)) {
              let cc = {
                0: 1,
                1: 3,
                2: 6,
                3: 10,
                4: 15,
                5: 21,
                6: 28,
                7: 36,
                8: 45,
                9: 55,
                10: 63,
                11: 69,
                12: 73,
                13: 75,
                14: 75,
                15: 73,
                16: 69,
                17: 63,
                18: 55,
                19: 45,
                20: 36,
                21: 28,
                22: 21,
                23: 15,
                24: 10,
                25: 6,
                26: 3,
                27: 1
              };
              let selectArr = [];
              for (let rows of methodInfo.rows) {
                for (let content of rows.content) {
                  for (let number of content.arr) {
                    if (number.selected) {
                      selectArr.push(number.value)
                    }
                  }
                }
              }
              let count = 0
              for (let value of selectArr) {
                count = cc[value] + count
              }
              this.setData({key: 'betCount', value: count});
              if (count > 0) {
                this.setData({key: 'officialSelectArr', value: [selectArr]});
              }
            }
            else if (['组三'].includes(methodInfo.name)) {
              let selectArr = [];
              for (let rows of methodInfo.rows) {
                for (let content of rows.content) {
                  for (let number of content.arr) {
                    if (number.selected) {
                      selectArr.push(number.value)
                    }
                  }
                }
              }
              let count = 0
              if (selectArr.length > 1) {
                count = selectArr.length * (selectArr.length - 1);
              }
              this.setData({key: 'betCount', value: count});
              if (count > 0) {
                this.setData({key: 'officialSelectArr', value: [selectArr]});
              }
            }
            else if (['组六'].includes(methodInfo.name)) {
              let selectArr = [];
              for (let rows of methodInfo.rows) {
                for (let content of rows.content) {
                  for (let number of content.arr) {
                    if (number.selected) {
                      selectArr.push(number.value)
                    }
                  }
                }
              }
              let count = 0
              if (selectArr.length > 2) {
                let LEN = selectArr.length;
                count = LEN * (LEN - 1) * (LEN - 2) / 6
              }
              this.setData({key: 'betCount', value: count});
              if (count > 0) {
                this.setData({key: 'officialSelectArr', value: [selectArr]});
              }
            }
            else if (['组选和值'].includes(methodInfo.name)) {
              let cc = {
                1: 1,
                2: 2,
                3: 2,
                4: 4,
                5: 5,
                6: 6,
                7: 8,
                8: 10,
                9: 11,
                10: 13,
                11: 14,
                12: 14,
                13: 15,
                14: 15,
                15: 14,
                16: 14,
                17: 13,
                18: 11,
                19: 10,
                20: 8,
                21: 6,
                22: 5,
                23: 4,
                24: 2,
                25: 2,
                26: 1,
              };
              let selectArr = [];
              for (let rows of methodInfo.rows) {
                for (let content of rows.content) {
                  for (let number of content.arr) {
                    if (number.selected) {
                      selectArr.push(number.value)
                    }
                  }
                }
              }
              let count = 0
              for (let value of selectArr) {
                count = cc[value] + count
              }
              this.setData({key: 'betCount', value: count});
              if (count > 0) {
                this.setData({key: 'officialSelectArr', value: [selectArr]});
              }
            }
            else if (['定位胆'].includes(methodInfo.name)) {
              let selectArr = [];
              let count = 0;
              for (let i = 0; i < methodInfo.rows.length; i++) {
                let rows = methodInfo.rows[i];
                for (let n = 0; n < rows.content.length; n++) {
                  selectArr.push([]);
                  let content = rows.content[n];
                  for (let m = 0; m < content.arr.length; m++) {
                    if (content.arr[m].selected) {
                      count = count + 1;
                      selectArr[n].push(content.arr[m])
                    }
                  }
                }
              }
              ;
              this.setData({key: 'betCount', value: count});
              if (count > 0) {
                this.setData({key: 'officialSelectArr', value: selectArr});
              }
            }
            else {
              let selectArr = [];
              for (let rows of methodInfo.rows) {
                for (let content of rows.content) {
                  for (let number of content.arr) {
                    if (number.selected) {
                      selectArr.push(number.value)
                    }
                  }
                }
              }
              let count = selectArr.length;
              this.setData({key: 'betCount', value: count});
              if (count > 0) {
                this.setData({key: 'officialSelectArr', value: [selectArr]});
              }
            }
          }

        }
        // bjkl8
        else if (lotteryInfo.type === lotteryType.bjkl8) {
          if (['任选一', '任选二', '任选三', '任选四', '任选五', '任选六', '任选七'].includes(methodInfo.name)) {
            let selectArr = [];
            for (let rows of methodInfo.rows) {
              for (let i = 0; i < rows.content.length; i++) {
                let content = rows.content[i];
                for (let number of content.arr) {
                  if (number.selected) {
                    selectArr.push(number.value)
                  }
                }
              }
            }
            let count = sortArray(selectArr, methodInfo.nums).length; // 排列组合
            this.setData({key: 'betCount', value: count});
            if (count > 0) {
              this.setData({key: 'officialSelectArr', value: selectArr});
            }
          }
          else {
            let selectArr = [];
            for (let rows of methodInfo.rows) {
              for (let content of rows.content) {
                for (let number of content.arr) {
                  if (number.selected) {
                    selectArr.push(number)
                  }
                }
              }
            }
            let count = selectArr.length;
            this.setData({key: 'betCount', value: count});
            if (count > 0) {
              this.setData({key: 'officialSelectArr', value: selectArr});
            }
          }
        }
      },
      _tools(code, firstIndex, contentIndex) {
        let methodInfo = this.currentMethodInfo;
        let lotteryInfo = this.currentLotteryInfo;
        // 过滤numbers
        let numbers = this.formatNumbers(firstIndex);
        if (code === 0) { // 全
          if (lotteryType.ssc === lotteryInfo.type) {
            for (let i = 0; i < numbers.length; i++) {
              methodInfo.children[firstIndex].detail[i].selected = true;
            }
          }
          else if ([lotteryType.pk10, lotteryType.eleven5].includes(lotteryInfo.type)) {
            for (let i = 0; i < numbers.length; i++) {
              methodInfo.detail[firstIndex].detail[i].selected = true;
            }
          }
          else if ([lotteryType.lhc].includes(lotteryInfo.type)) {
            for (let i = 0; i < numbers.length; i++) {
              methodInfo.rows[firstIndex].content[i].selected = true;
            }
          }
          else if ([lotteryType.fc3d, lotteryType.bjkl8].includes(lotteryInfo.type)) {
            for (let i = 0; i < numbers[contentIndex].arr.length; i++) {
              methodInfo.rows[firstIndex].content[contentIndex].arr[i].selected = true;
            }
          }
        }
        else if (code === 5) { // 清
          if (lotteryType.ssc === lotteryInfo.type) {
            for (let i = 0; i < numbers.length; i++) {
              methodInfo.children[firstIndex].detail[i].selected = false;
            }
          }
          else if ([lotteryType.pk10, lotteryType.eleven5].includes(lotteryInfo.type)) {
            for (let i = 0; i < numbers.length; i++) {
              methodInfo.detail[firstIndex].detail[i].selected = false;
            }
          }
          else if ([lotteryType.lhc].includes(lotteryInfo.type)) {
            for (let i = 0; i < numbers.length; i++) {
              methodInfo.rows[firstIndex].content[i].selected = false;
            }
          }
          else if ([lotteryType.fc3d, lotteryType.bjkl8].includes(lotteryInfo.type)) {
            for (let i = 0; i < numbers[contentIndex].arr.length; i++) {
              methodInfo.rows[firstIndex].content[contentIndex].arr[i].selected = false;
            }
          }
        }
        else if (code === 1) {  // 大
          if (lotteryType.ssc === lotteryInfo.type) {
            for (let i = 0; i < numbers.length; i++) {
              if (Number(numbers[i].alias) >= (Math.round(numbers.length / 2))) {
                methodInfo.children[firstIndex].detail[i].selected = true;
              } else {
                methodInfo.children[firstIndex].detail[i].selected = false;
              }
            }
          }
          else if (lotteryType.pk10 === lotteryInfo.type) {
            for (let i = 0; i < numbers.length; i++) {
              if (Number(numbers[i].alias) > (Math.round(numbers.length / 2))) {
                methodInfo.detail[firstIndex].detail[i].selected = true;
              } else {
                methodInfo.detail[firstIndex].detail[i].selected = false;
              }
            }
          }
          else if (lotteryType.eleven5 === lotteryInfo.type) {
            for (let i = 0; i < numbers.length; i++) {
              if (Number(numbers[i].alias) >= (Math.round(numbers.length / 2))) {
                methodInfo.detail[firstIndex].detail[i].selected = true;
              } else {
                methodInfo.detail[firstIndex].detail[i].selected = false;
              }
            }
          }
          else if ([lotteryType.lhc].includes(lotteryInfo.type)) {
            for (let i = 0; i < numbers.length; i++) {
              if (Number(numbers[i].alias) >= (Math.round(numbers.length / 2)) && Number(numbers[i].alias) !== 49) {
                methodInfo.rows[firstIndex].content[i].selected = true;
              } else {
                methodInfo.rows[firstIndex].content[i].selected = false;
              }
            }
          } else if ([lotteryType.fc3d].includes(lotteryInfo.type)) {
            for (let i = 0; i < numbers[contentIndex].arr.length; i++) {
              if (Number(numbers[contentIndex].arr[i].value) >= (Math.round(numbers[contentIndex].arr.length / 2))) {
                methodInfo.rows[firstIndex].content[contentIndex].arr[i].selected = true;
              } else {
                methodInfo.rows[firstIndex].content[contentIndex].arr[i].selected = false;
              }
            }
          }
        }
        else if (code === 2) {  // 小
          if (lotteryType.ssc === lotteryInfo.type) {
            for (let i = 0; i < numbers.length; i++) {
              if (Number(numbers[i].alias) < (Math.round(numbers.length / 2))) {
                methodInfo.children[firstIndex].detail[i].selected = true;
              } else {
                methodInfo.children[firstIndex].detail[i].selected = false;
              }
            }
          }
          else if (lotteryType.pk10 === lotteryInfo.type) {
            for (let i = 0; i < numbers.length; i++) {
              if (Number(numbers[i].alias) <= (Math.round(numbers.length / 2))) {
                methodInfo.detail[firstIndex].detail[i].selected = true;
              } else {
                methodInfo.detail[firstIndex].detail[i].selected = false;
              }
            }
          }
          else if (lotteryType.eleven5 === lotteryInfo.type) {
            for (let i = 0; i < numbers.length; i++) {
              if (Number(numbers[i].alias) < (Math.round(numbers.length / 2))) {
                methodInfo.detail[firstIndex].detail[i].selected = true;
              } else {
                methodInfo.detail[firstIndex].detail[i].selected = false;
              }
            }
          }
          else if ([lotteryType.lhc].includes(lotteryInfo.type)) {
            for (let i = 0; i < numbers.length; i++) {
              if (Number(numbers[i].alias) < (Math.round(numbers.length / 2)) && Number(numbers[i].alias) !== 49) {
                methodInfo.rows[firstIndex].content[i].selected = true;
              } else {
                methodInfo.rows[firstIndex].content[i].selected = false;
              }
            }
          } else if ([lotteryType.fc3d].includes(lotteryInfo.type)) {
            for (let i = 0; i < numbers[contentIndex].arr.length; i++) {
              if (Number(numbers[contentIndex].arr[i].value) < (Math.round(numbers[contentIndex].arr.length / 2))) {
                methodInfo.rows[firstIndex].content[contentIndex].arr[i].selected = true;
              } else {
                methodInfo.rows[firstIndex].content[contentIndex].arr[i].selected = false;
              }
            }
          }
        }
        else if (code === 3) {  // 单
          if (lotteryType.ssc === lotteryInfo.type) {
            for (let i = 0; i < numbers.length; i++) {
              if (Number(numbers[i].alias) % 2 === 1) {
                methodInfo.children[firstIndex].detail[i].selected = true;
              } else {
                methodInfo.children[firstIndex].detail[i].selected = false;
              }
            }
          }
          else if ([lotteryType.pk10, lotteryType.eleven5].includes(lotteryInfo.type)) {
            for (let i = 0; i < numbers.length; i++) {
              if (Number(numbers[i].alias) % 2 === 1) {
                methodInfo.detail[firstIndex].detail[i].selected = true;
              } else {
                methodInfo.detail[firstIndex].detail[i].selected = false;
              }
            }
          }
          else if ([lotteryType.lhc].includes(lotteryInfo.type)) {
            for (let i = 0; i < numbers.length; i++) {
              if (Number(numbers[i].alias) % 2 === 1 && Number(numbers[i].alias) !== 49) {
                methodInfo.rows[firstIndex].content[i].selected = true;
              } else {
                methodInfo.rows[firstIndex].content[i].selected = false;
              }
            }
          }
          else if ([lotteryType.fc3d].includes(lotteryInfo.type)) {
            for (let i = 0; i < numbers[contentIndex].arr.length; i++) {
              if (Number(numbers[contentIndex].arr[i].value) % 2 === 1) {
                methodInfo.rows[firstIndex].content[contentIndex].arr[i].selected = true;
              } else {
                methodInfo.rows[firstIndex].content[contentIndex].arr[i].selected = false;
              }
            }
          }
        }
        else if (code === 4) {  // 双
          if (lotteryType.ssc === lotteryInfo.type) {
            for (let i = 0; i < numbers.length; i++) {
              if (Number(numbers[i].alias) % 2 === 0) {
                methodInfo.children[firstIndex].detail[i].selected = true;
              } else {
                methodInfo.children[firstIndex].detail[i].selected = false;
              }
            }
          }
          else if ([lotteryType.pk10, lotteryType.eleven5].includes(lotteryInfo.type)) {
            for (let i = 0; i < numbers.length; i++) {
              if (Number(numbers[i].alias) % 2 === 0) {
                methodInfo.detail[firstIndex].detail[i].selected = true;
              } else {
                methodInfo.detail[firstIndex].detail[i].selected = false;
              }
            }
          }
          else if ([lotteryType.lhc].includes(lotteryInfo.type)) {
            for (let i = 0; i < numbers.length; i++) {
              if (Number(numbers[i].alias) % 2 === 0 && Number(numbers[i].alias) !== 49) {
                methodInfo.rows[firstIndex].content[i].selected = true;
              } else {
                methodInfo.rows[firstIndex].content[i].selected = false;
              }
            }
          }
          else if ([lotteryType.fc3d].includes(lotteryInfo.type)) {
            for (let i = 0; i < numbers[contentIndex].arr.length; i++) {
              if (Number(numbers[contentIndex].arr[i].value) % 2 === 0) {
                methodInfo.rows[firstIndex].content[contentIndex].arr[i].selected = true;
              } else {
                methodInfo.rows[firstIndex].content[contentIndex].arr[i].selected = false;
              }
            }
          }
        }
        else if (code === 6) {  // 红
          for (let i = 0; i < numbers.length; i++) {
            if (this.colorBall.red.includes(numbers[i].alias)) {
              methodInfo.rows[firstIndex].content[i].selected = true;
            } else {
              methodInfo.rows[firstIndex].content[i].selected = false;
            }
          }
        }
        else if (code === 7) {  // 绿
          for (let i = 0; i < numbers.length; i++) {
            if (this.colorBall.green.includes(numbers[i].alias)) {
              methodInfo.rows[firstIndex].content[i].selected = true;
            } else {
              methodInfo.rows[firstIndex].content[i].selected = false;
            }
          }
        }
        else if (code === 8) {  // 蓝
          for (let i = 0; i < numbers.length; i++) {
            if (this.colorBall.blue.includes(numbers[i].alias)) {
              methodInfo.rows[firstIndex].content[i].selected = true;
            } else {
              methodInfo.rows[firstIndex].content[i].selected = false;
            }
          }
        }
        this.$nextTick(() => {
          this.setData({key: 'currentMethodInfo', value: JSON.parse(JSON.stringify(methodInfo))});
          this.$nextTick(() => {
            if (methodInfo.isOfficial) {
              this.official_BetCount();
            } else {
              this.credit_BetCount();
            }
          })
        })
      },
      formatNumbers(index) {
        let methodInfo = this.currentMethodInfo;
        let lotteryInfo = this.currentLotteryInfo;
        let numbers = null;
        // 过滤numbers
        if (lotteryType.ssc === lotteryInfo.type) {
          numbers = methodInfo.children[index].detail;
        } else if ([lotteryType.pk10, lotteryType.eleven5].includes(lotteryInfo.type)) {
          numbers = methodInfo.detail[index].detail;
        } else if ([lotteryType.lhc].includes(lotteryInfo.type)) {
          numbers = methodInfo.rows[index].content;
        } else if ([lotteryType.fc3d, lotteryType.bjkl8].includes(lotteryInfo.type)) {
          numbers = methodInfo.rows[index].content;
        }
        return numbers
      },
      checkBtn() {
        this._calcCheckLEN();
        this.official_BetCount();
        this.$nextTick(() => {
          this.setData({key: 'checkGroup_common', value: this.checkGroup});
        })
      },
      _calcCheckLEN() {
        if (this.currentMethodInfo) {
          if (this.currentMethodInfo.name.indexOf("任二") !== -1) {
            this.checkLEN = groupSplit(this.checkGroup, 2).length;
          } else if (this.currentMethodInfo.name.indexOf("任三") !== -1) {
            this.checkLEN = groupSplit(this.checkGroup, 3).length;
          } else if (this.currentMethodInfo.name.indexOf("任四") !== -1) {
            this.checkLEN = groupSplit(this.checkGroup, 4).length;
          } else if (['组选24', '组选12', '组选6', '组选4'].includes(this.currentMethodInfo.name)) {
            this.checkLEN = groupSplit(this.checkGroup, 4).length;
          }
        }
      },
      codeDebounce() {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.filterCodes();
          this.timer = null;
        }, 1500);
      },
      // 手动输入号码过滤
      filterCodes() {
        if (this.singleCode !== '') {
          if (lotteryType.ssc === this.currentLotteryInfo.type) {
            let danKey = this._getNum();
            this.singleCode = this.singleCode.replace(/[\r\n]/g, " ");
            // 过滤特殊字符
            let newCode = this.singleCode.replace(/[^\d]/g, "");
            let newArr = [];
            let codeList = [];
            // 号码分组
            for (let i = 0; i < newCode.length; i += danKey) {
              newArr.push(newCode.slice(i, i + danKey));
            }
            // 筛选合适的号码
            newArr.map((val) => {
              //去组选重复值
              if (val.length === danKey) {
                if (this.currentMethodInfo.name.indexOf("二组选") !== -1) {
                  if (val.split('')[0] !== val.split('')[1]) {
                    codeList.push(val);
                  }
                } else {
                  codeList.push(val);
                }
              }
            });
            let singleList = Array.from(new Set(codeList));
            this.singleCode = singleList.join();
            if (singleList.length > 0) {
              let formatCode = this.singleCode.split(',');
              this.setData({key: 'officialSelectArr', value: [formatCode]});
              this.$nextTick(() => {
                this.official_BetCount();
              })
            }
          }
          else if (lotteryType.pk10 === this.currentLotteryInfo.type) {
            // this.currentMethodInfo.detail.num这个数据，可以用来判断是前2，前3，前4的标准
            // *2 是因为选号是010203一位要2位数
            let danKey = this.currentMethodInfo.detail.num * 2;
            this.singleCode = this.singleCode.replace(/[\r\n]/g, " ");
            // 过滤特殊字符
            let newCode = this.singleCode.replace(/[^\d]/g, "");
            let newArr = [];
            let codeList = [];
            // 号码分组
            for (let i = 0; i < newCode.length; i += danKey) {
              newArr.push(newCode.slice(i, i + danKey));
            }
            // 筛选合适的号码
            let formatCode = [];
            newArr.map((val) => {
              //去组选重复值
              let subArr = [];
              if (val.length === danKey) {
                let isTrue = 0;
                for (let i = 0; i < val.length; i += 2) {
                  let currentVal = val.slice(i, i + 2);
                  if (Number(currentVal) > 10 || currentVal === '00') {
                    isTrue += 1;
                  } else {
                    subArr.push(currentVal);
                  }
                }
                if (isTrue === 0) {
                  if ([...new Set(subArr)].length === this.currentMethodInfo.detail.num) {
                    formatCode.push(subArr);
                    codeList.push(val);
                  }
                }
              }
            });
            let singleList = Array.from(new Set(codeList));
            this.singleCode = singleList.join();
            if (singleList.length > 0) {
              // let formatCode = this.singleCode.split(',')
              this.setData({key: 'officialSelectArr', value: formatCode});
              this.$nextTick(() => {
                this.official_BetCount();
              })
            }
          }
          else if (lotteryType.eleven5 === this.currentLotteryInfo.type) {
            // this.currentMethodInfo.detail.num这个数据，可以用来判断是前2，前3，前4的标准
            // *2 是因为选号是010203一位要2位数
            let num = this.currentMethodInfo.detail.num;
            let danKey = num * 2;
            this.singleCode = this.singleCode.replace(/[\r\n]/g, " ");
            // 过滤特殊字符
            // return
            let newCode = this.singleCode.replace(/[^\d]/g, "");
            let newArr = [];
            let codeList = [];
            // 号码分组
            for (let i = 0; i < newCode.length; i += danKey) {
              newArr.push(newCode.slice(i, i + danKey));
            }
            // 筛选合适的号码
            let formatCode = [];
            newArr.map((val) => {
              //去组选重复值
              let subArr = [];
              if (val.length === danKey) {
                let isTrue = 0;
                for (let i = 0; i < val.length; i += 2) {
                  let currentVal = val.slice(i, i + 2);
                  if (Number(currentVal) > 11 || currentVal === '00') {
                    isTrue += 1;
                  } else {
                    subArr.push(currentVal);
                  }
                }
                if (isTrue === 0) {
                  if ([...new Set(subArr)].length === this.currentMethodInfo.detail.num) {
                    formatCode.push(subArr);
                    codeList.push(val);
                  }
                }
              }
            });
            let singleList = Array.from(new Set(codeList));
            this.singleCode = singleList.join();
            if (singleList.length > 0) {
              // let formatCode = this.singleCode.split(',')
              this.setData({key: 'officialSelectArr', value: formatCode});
              this.$nextTick(() => {
                this.official_BetCount();
              })
            }
          }
          else if (lotteryType.fc3d === this.currentLotteryInfo.type) {
            // this.currentMethodInfo.detail.num这个数据，可以用来判断是前2，前3，前4的标准
            // *2 是因为选号是010203一位要2位数
            // let num = this.currentMethodInfo.detail.num;
            let danKey = this.currentMethodInfo.separate;
            this.singleCode = this.singleCode.replace(/[\r\n]/g, " ");
            // 过滤特殊字符
            // return
            let newCode = this.singleCode.replace(/[^\d]/g, "");
            let newArr = [];
            let codeList = [];
            // 号码分组
            for (let i = 0; i < newCode.length; i += danKey) {
              newArr.push(newCode.slice(i, i + danKey));
            }
            // 筛选合适的号码
            let formatCode = [];
            // return
            newArr.map((val) => {
              //去组选重复值
              let subArr = [];
              if (val.length === danKey) {
                for (let i = 0; i < val.length; i++) {
                  let currentVal = val.slice(i, i + 1);
                  subArr.push(currentVal);
                }
                formatCode.push(subArr);
                codeList.push(val);
              }
            });
            let singleList = Array.from(new Set(codeList));
            this.singleCode = singleList.join();
            if (singleList.length > 0) {
              // let formatCode = this.singleCode.split(',')
              this.setData({key: 'officialSelectArr', value: formatCode});
              this.$nextTick(() => {
                this.official_BetCount();
              })
            }
          }
        }

      },
      //获取单试分割值
      _getNum() {
        let i = 5;
        if (this.currentMethodInfo.name.indexOf("二") !== -1) {
          i = 2;
        } else if (this.currentMethodInfo.name.indexOf("三") !== -1) {
          i = 3;
        } else if (this.currentMethodInfo.name.indexOf("四") !== -1) {
          i = 4;
        }
        return i;
      },
      clearSingleNum() {
        this.singleCode = '';
        this.$nextTick(() => {
          this.filterCodes();
          this.setData({key: 'officialSelectArr', value: []});
          this.setData({key: 'betCount', value: 0});
        })
      },
      // 11x5,lhc,fc3d 双面盘 连码
      switchTabs(index) {
        this.setData({key: 'tabsIndex', value: index});
        // this.tabsIndex = index;
        // 将当前的方法所有的内容都回复初始值
        let methodInfo = this.currentMethodInfo;
        if (lotteryType.eleven5 === this.currentLotteryInfo.type) {
          for (let i = 0; i < methodInfo.children.length; i++) {
            let first = methodInfo.children[i];
            for (let n = 0; n < first.detail.length; n++) {
              methodInfo.children[i].detail[n].selected = false;
            }
          }
        }
        else if (lotteryType.lhc === this.currentLotteryInfo.type) {
          for (let row of methodInfo.rows) {
            for (let content of row.content) {
              content.selected = false;
            }
          }
        }
        else if (lotteryType.fc3d === this.currentLotteryInfo.type) {
          for (let row of methodInfo.rows) {
            for (let content of row.content) {
              if (content.arr && content.arr.length > 0) {
                for (let num of content.arr) {
                  num.selected = false;
                }
              } else {
                content.selected = false;
              }

            }
          }
        }

        this.setData({key: 'currentMethodInfo', value: JSON.parse(JSON.stringify(methodInfo))});
        this.setData({key: 'betCount', value: 0});
        this.setData({key: 'currentRebate', value: 0});

      },
      officialCalcOdds() {
        let methodInfo = this.currentMethodInfo;
        // 拿到最大的odds
        let oddsArr = [];
        for (let i = 0; i < methodInfo.rows.length; i++) {
          let rows = methodInfo.rows[i];
          for (let n = 0; n < rows.info.length; n++) {
            let info = methodInfo.rows[i].info[n];
            // fc3d
            if ([lotteryType.fc3d].includes(this.currentLotteryInfo.type)) {
              oddsArr.push(this._calcOdds_common(info) / 2);
            } else {
              oddsArr.push(this._calcOdds_common(info));
            }
          }
        }
        if (oddsArr[0] === oddsArr[oddsArr.length - 1]) {
          return oddsArr[0];
        } else {
          let maxOdds = Math.max(...oddsArr);
          let minOdds = Math.min(...oddsArr);
          return `${minOdds}~${maxOdds}`
        }

      },
      _formatColorBallClass(active, ball) {
        if (this.colorBall.red.includes(ball)) {
          return active ? 'red-ball-active' : 'red-ball'
        } else if (this.colorBall.green.includes(ball)) {
          return active ? 'green-ball-active' : 'green-ball'
        } else if (this.colorBall.blue.includes(ball)) {
          return active ? 'blue-ball-active' : 'blue-ball'
        }
      },
      getAnimalArr(animal) {
        let arr = animalArr();
        for (let obj of arr) {
          if (animal === obj.animal) {
            return obj.arr
          }
        }
      },
      // kl8
      // kl8_odds(numberLEN) {
      //   let LEN = numberLEN;
      //   let content = this.currentMethodInfo.oddsArr[0].content;
      //   if (LEN > 0) {
      //     let oddsArr = content[LEN - 1];
      //     let newOddsArr = [];
      //     let methodArr = [];
      //     for (let item of oddsArr) {
      //       methodArr.push(item.value);
      //       newOddsArr.push(this._calcOdds_common(item));
      //     }
      //     return {
      //       method: methodArr.join(','),
      //       odds: newOddsArr.join(',')
      //     }
      //   } else {
      //     return {
      //       method: this.currentMethodInfo.name,
      //       odds: 0.0
      //     }
      //   }
      // },
      kl8_text(_value) {
        let method = this.currentMethodInfo;
        if (method.name === '和值大小') {
          switch (_value) {
            case '大':
              return '811-1410'
            case '小':
              return '210-809'
            case '和':
              return '810'
          }
        }
        else if (method.name === '上下盘') {
          switch (_value) {
            case '上':
              return '上>下'
            case '中':
              return '上=下'
            case '下':
              return '上<下'
          }
        }
        else if (method.name === '奇偶盘') {
          switch (_value) {
            case '和':
              return '奇=偶'
            case '奇':
              return '奇>偶'
            case '偶':
              return '奇<偶'
          }
        }
      },
      // --------
      showTips() {
        this.isShowTips = true;
      },
      refreshBalance() {
        this.$toast.loading({
          duration: 0,
          message: this.$t('lang.common.loading'),
          forbidClick: true,
        });
        this.setData({key: 'balance', value: '0'});
        this.getStatus({}).finally(() => {
          this.$toast.clear();
        })
      }
    },
    components: {
      lotteryInfo,
      tips
    },
    deactivated() {
      this.initData();
    },
    watch: {
      officialSelectArr(newValue) {
        if (newValue.length === 0) {
          this.singleCode = '';
          this.checkGroup = ["0", "1", "2", "3", "4"]
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .skin-black {
    $font-color: #9fa7b3;
    $wrapper-background: #24252d;

    $odd-font-color: #ff2525;
    $ball-bg-color: #2D2E35;
    $ball-border-color: #444555;
    $ball-font-color: #9a9aa7;
    $ball-active-bg-color: #d11213;
    $ball-active-border-color: #d11213;
    $ball-active-font-color: #fff;

    .playing-wrapper {
      color: $font-color;
      background: #191b1f;
      .random {
        color: $font-color;
      }
      .content-wrapper {
        .main-content {
          .ssc-wrapper {
            background: $wrapper-background;
            .official-wrapper {
              .normal {
                .title-odds {
                  span {
                    border: solid 1px $ball-border-color;
                    box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                    background: $ball-bg-color;
                    .num {
                      color: #ff2525;
                    }
                  }
                }
                .check-wrapper {
                  .select-list {
                    color: #fff;
                    /deep/ div[aria-checked="false"] {
                      .van-icon {
                        border: 1px solid $ball-font-color;
                      }
                      span.van-checkbox__label {
                        color: $ball-font-color;
                      }
                    }
                    /deep/ div[aria-checked="true"] {
                      span.van-checkbox__label {
                        color: #fff;
                      }
                      .van-icon {
                        color: #000;
                        border: 1px solid #FFEAC0;
                        background-image: linear-gradient(to bottom, #FFEAC0, #FFD681);
                      }
                    }
                  }
                  .tips {
                    color: $ball-font-color;
                    em {
                      color: red;
                    }
                  }
                }
                .select-wrapper {
                  .tools {
                    color: $font-color;
                    & > ul {
                      background-color: #2d2e35;
                      border: 1px solid $ball-border-color;
                      li {
                        border-right: 1px solid $ball-border-color;
                      }
                    }
                  }
                  ul.number-content {
                    li {
                      div {
                        span {
                          border: solid 1px $ball-border-color;
                          background-color: $ball-bg-color;
                          color: $ball-font-color;
                        }
                        &.active {
                          span {
                            background-color: $ball-active-bg-color;
                            color: #fff;
                            border: solid 1px $ball-active-bg-color;
                          }
                        }
                      }
                    }
                  }
                  ul.square-content {
                    li {
                      div {
                        border: solid 1px $ball-border-color;
                        background-color: $ball-bg-color;
                        span {
                          color: $ball-font-color;
                        }
                        i {
                          color: $ball-active-bg-color;
                        }
                        &.active {
                          border: solid 1px #ffd57d;
                          color: #ffd57d;
                          span {
                            color: #ffd57d;
                          }
                        }
                      }
                    }
                  }
                }
              }
              .text-area {
                .wrapper {
                  textarea {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                  }
                }
                .btn-group {
                  span {
                    &:first-child {
                      border-right: 1px solid $ball-bg-color;
                    }
                  }
                }
                .tips {
                  em {
                    color: #ff2525;
                  }
                }
              }
            }
            .credit-wrapper {
              /deep/ .van-cell__title,
              /deep/ .van-cell__right-icon {
                color: $ball-font-color;
              }
              /deep/ .van-collapse-item__content {
                background: $wrapper-background;
              }
              ul.spare-content {
                li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: #f11717;
                    }
                  }
                }
              }
            }
          }
          .k3-wrapper {
            background: $wrapper-background;
            .official-wrapper {
              .title-odds {
                span {
                  border: solid 1px $ball-border-color;
                  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                  background: $ball-bg-color;
                  .num {
                    color: #ff2525;
                  }
                }
              }
              .select-wrapper {
                .tools {
                  color: $font-color;
                  & > ul {
                    background-color: #2d2e35;
                    border: 1px solid $ball-border-color;
                    li {
                      border-right: 1px solid $ball-border-color;
                    }
                  }
                }
                ul.number-content {
                  li {
                    &.number-item {
                      div {
                        span {
                          border: solid 1px $ball-border-color;
                          background-color: $ball-bg-color;
                          color: $ball-font-color;
                        }
                        &.active {
                          span {
                            background-color: $ball-active-bg-color;
                            color: #fff;
                            border: solid 1px $ball-active-bg-color;
                          }
                        }
                      }
                    }
                    &.square-item {
                      div {
                        border: solid 1px $ball-border-color;
                        background-color: $ball-bg-color;
                        span {
                          color: $ball-font-color;
                        }
                        &.active {
                          border: .02rem solid #ffd57d;
                          color: #ffd57d;
                          span {
                            color: #ffd57d;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            .credit-wrapper {
              ul.square-item {
                li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    & > em {
                      color: red;
                    }
                    @for $i from 1 through 6 {
                      .k3-num-#{$i} {
                        color: rgba(0, 0, 0, 0);
                        background: url('../../assets/img/lottery/ks/ks_#{$i}.png') no-repeat center;
                        background-size: 100% 100%;
                      }
                    }
                    &.active {
                      border: solid 1px #ffd57d;
                      color: #ffd57d;
                    }
                  }
                }
              }
            }
          }
          .pcdd-wrapper {
            background: $wrapper-background;
            .credit-wrapper {
              ul.spare-content {
                li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: #f11717;
                    }
                  }
                }
              }
              ul.number-content {
                li {
                  div {
                    span {
                      border: solid 1px $ball-border-color;
                      background-color: $ball-bg-color;
                      color: $ball-font-color;
                    }
                    i {
                      color: $ball-active-bg-color;
                    }
                    &.active {
                      span {
                        background-color: $ball-active-bg-color;
                        color: #fff;
                        border: solid 1px $ball-active-bg-color;
                      }
                    }
                    &.disable {
                      span {
                        border: solid 0.02rem $ball-border-color;
                        background-color: #202225;
                      }

                    }
                  }
                }

              }
            }
          }
          .pk10-wrapper {
            background: $wrapper-background;
            .official-wrapper {
              .normal {
                .title-odds {
                  span {
                    border: solid 1px $ball-border-color;
                    box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                    background: $ball-bg-color;
                    .num {
                      margin: 0 0 0 0.1rem;
                      color: #ff2525;
                    }
                  }
                }
                .select-wrapper {
                  .tools {
                    color: $font-color;
                    & > ul {
                      background-color: #2d2e35;
                      border: 1px solid $ball-border-color;
                      li {
                        border-right: 1px solid $ball-border-color;
                      }
                    }
                  }
                  ul.number-content {
                    li {
                      &.number-item {
                        width: calc(100% / 5);
                        div {
                          span {
                            border: solid 1px $ball-border-color;
                            background-color: $ball-bg-color;
                            color: $ball-font-color;
                          }
                          &.active {
                            span {
                              background-color: $ball-active-bg-color;
                              color: #fff;
                              border: solid 1px $ball-active-bg-color;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              .text-area {
                .wrapper {
                  textarea {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                  }
                }
                .btn-group {
                  span {
                    &:first-child {
                      border-right: 1px solid $ball-bg-color;
                    }
                  }
                }
                .tips {
                  em {
                    color: #ff2525;
                  }
                }
              }
            }
            .credit-wrapper {
              /deep/ .van-cell__title,
              /deep/ .van-cell__right-icon {
                color: $ball-font-color;
              }
              /deep/ .van-collapse-item__content {
                background: $wrapper-background;
              }
              ul.spare-content {
                li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: #f11717;
                    }
                  }
                }
              }
              ul.number-content {
                li {
                  div {
                    span {
                      border: solid 1px $ball-border-color;
                      background-color: $ball-bg-color;
                      color: $ball-font-color;
                    }
                    i {
                      color: $ball-active-bg-color;
                    }
                    &.active {
                      span {
                        background-color: $ball-active-bg-color;
                        color: #fff;
                        border: solid 1px $ball-active-bg-color;
                      }
                    }
                  }
                }
              }
            }
          }
          .eleven5-wrapper {
            background: $wrapper-background;
            .official-wrapper {
              .normal {
                .title-odds {
                  span {
                    border: solid 1px $ball-border-color;
                    box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                    background: $ball-bg-color;
                    .num {
                      margin: 0 0 0 0.1rem;
                      color: #ff2525;
                    }
                  }
                }
                .select-wrapper {
                  .tools {
                    color: $font-color;
                    & > ul {
                      background-color: #2d2e35;
                      border: 1px solid $ball-border-color;
                      li {
                        border-right: 1px solid $ball-border-color;
                      }
                    }
                  }
                  ul.number-content {
                    li {
                      &.number-item {
                        div {
                          span {
                            border: solid 1px $ball-border-color;
                            background-color: $ball-bg-color;
                            color: $ball-font-color;
                          }
                          &.active {
                            span {
                              background-color: $ball-active-bg-color;
                              color: #fff;
                              border: solid 1px $ball-active-bg-color;
                            }
                          }
                        }
                      }
                      &.square-item {
                        div {
                          border: solid 1px $ball-border-color;
                          background-color: $ball-bg-color;
                          i {
                            color: $ball-active-bg-color;
                          }
                          &.active {
                            border: .02rem solid #ffd57d;
                            color: #ffd57d;
                            span {
                              color: #ffd57d;
                            }
                          }
                        }
                      }
                    }
                  }

                }
              }
              .text-area {
                .wrapper {
                  textarea {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                  }
                }
                .btn-group {
                  span {
                    &:first-child {
                      border-right: 1px solid $ball-bg-color;
                    }
                  }
                }
                .tips {
                  em {
                    color: #ff2525;
                  }
                }
              }
            }
            .credit-wrapper {
              /deep/ .van-cell__title,
              /deep/ .van-cell__right-icon {
                color: $ball-font-color;
              }
              /deep/ .van-collapse-item__content {
                background: $wrapper-background;
              }
              ul.spare-content {
                li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: #f11717;
                    }
                  }
                }
              }
              ul.number-content {
                li {
                  width: calc(100% / 6);
                  div {
                    span {
                      border: solid 1px $ball-border-color;
                      background-color: $ball-bg-color;
                      color: $ball-font-color;
                    }
                    i {
                      color: $ball-active-bg-color;
                    }
                    &.active {
                      span {
                        background-color: $ball-active-bg-color;
                        color: #fff;
                        border: solid 1px $ball-active-bg-color;
                      }
                    }
                    &.disable {
                      span {
                        border: solid 0.02rem $ball-border-color;
                        background-color: #202225;
                      }

                    }
                  }
                }

              }
              .has-tabs-item {
                background: #24252d;
                ul.title-slider {
                  li {
                    border-bottom: 1px solid $ball-font-color;
                    &.active {
                      border-bottom: 2px solid #dab591;
                      div {
                        span {
                          color: #fff;
                        }
                      }
                    }
                    div {
                      border-right: 2px solid $ball-font-color;
                      span {
                        width: 100%;
                      }
                    }
                  }
                }
              }
            }
          }
          .lhc-wrapper {
            background: $wrapper-background;
            .credit-wrapper {
              .content-item {
                .tools {
                  color: $font-color;
                  & > ul {
                    background-color: #2d2e35;
                    border: 1px solid $ball-border-color;
                    li {
                      border-right: 1px solid $ball-border-color;
                    }
                  }
                }
              }
              .has-tabs-item {
                background: #24252d;
                ul.title-slider {
                  li {
                    border-bottom: 1px solid $ball-font-color;
                    &.active {
                      border-bottom: 2px solid #dab591;
                      div {
                        span {
                          color: #fff;
                        }
                      }
                    }
                    div {
                      border-right: 2px solid $ball-font-color;
                    }
                  }
                }
                ul.odds-arr {
                  border-bottom: 1px solid $ball-font-color;
                  li {
                    color: #fff;
                    border-right: 1px solid $ball-font-color;
                  }
                }
              }
              ul.spare-content {
                & > li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: #f11717;
                    }
                    ul {
                      li {
                        flex: 1;
                        &.red-ball {
                          color: #d9342f;
                        }
                        &.green-ball {
                          color: #05ad5c;
                        }
                        &.blue-ball {
                          color: #3f8feb;
                        }
                      }
                    }
                  }
                }
              }
              ul.number-content {
                & > li {
                  div {
                    span {
                      border: solid 1px $ball-border-color;
                      background-color: $ball-bg-color;
                      color: $ball-font-color;
                    }
                    i {
                      color: $ball-font-color;
                    }
                    &.active {
                      span {
                        background-color: $ball-active-bg-color;
                        color: #fff;
                        border: solid 1px $ball-active-bg-color;
                      }
                    }
                    &.red-ball {
                      span {
                        color: #d9342f;
                      }
                    }
                    &.red-ball-active {
                      span {
                        color: #fff;
                        background-color: #d9342f;
                      }
                    }
                    &.green-ball {
                      span {
                        color: #05ad5c;
                      }
                    }
                    &.green-ball-active {
                      span {
                        color: #fff;
                        background-color: #05ad5c;
                      }
                    }
                    &.blue-ball {
                      span {
                        color: #3f8feb;
                      }
                    }
                    &.blue-ball-active {
                      span {
                        color: #fff;
                        background-color: #3f8feb;
                      }
                    }
                  }
                }

              }
            }
          }
          .fc3d-wrapper {
            background: $wrapper-background;
            .official-wrapper {
              .title-odds {
                span {
                  border: solid 1px $ball-border-color;
                  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                  background: $ball-bg-color;
                  .num {
                    color: #ff2525;
                  }
                }
              }
              .normal {
                .check-wrapper {
                  .select-list {
                    color: #fff;
                    /deep/ div[aria-checked="false"] {
                      .van-icon {
                        border: 1px solid $ball-font-color;
                      }
                      span.van-checkbox__label {
                        color: $ball-font-color;
                      }
                    }
                    /deep/ div[aria-checked="true"] {
                      span.van-checkbox__label {
                        color: #fff;
                      }
                      .van-icon {
                        color: #000;
                        border: 1px solid #FFEAC0;
                        background-image: linear-gradient(to bottom, #FFEAC0, #FFD681);
                      }
                    }
                  }
                  .tips {
                    color: $ball-font-color;
                    em {
                      color: red;
                    }
                  }
                }
                .select-wrapper {
                  ul.number-content {
                    & > li {
                      .tools {
                        color: $font-color;
                        & > ul {
                          background-color: #2d2e35;
                          border: 1px solid $ball-border-color;
                          li {
                            border-right: 1px solid $ball-border-color;
                          }
                        }
                      }
                      & > ul {
                        & > li {
                          div {
                            span {
                              border: solid 1px $ball-border-color;
                              background-color: $ball-bg-color;
                              color: $ball-font-color;
                            }
                            &.active {
                              span {
                                background-color: $ball-active-bg-color;
                                color: #fff;
                                border: solid 1px $ball-active-bg-color;
                              }
                            }
                          }
                        }
                      }

                    }

                  }
                  ul.square-content {
                    li {
                      div {
                        border: solid 1px $ball-border-color;
                        background-color: $ball-bg-color;
                        span {
                          color: $ball-font-color;
                        }
                        i {
                          color: $ball-active-bg-color;
                        }
                        &.active {
                          border: solid 1px #ffd57d;
                          color: #ffd57d;
                          span {
                            color: #ffd57d;
                          }
                        }
                      }
                    }
                  }
                }
              }
              .text-area {
                .wrapper {
                  textarea {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                  }
                }
                .btn-group {
                  span {
                    &:first-child {
                      border-right: 1px solid $ball-bg-color;
                    }
                  }
                }
                .tips {
                  em {
                    color: #ff2525;
                  }
                }
              }
            }
            .credit-wrapper {
              /deep/ .van-cell__title,
              /deep/ .van-cell__right-icon {
                color: $ball-font-color;
              }
              /deep/ .van-collapse-item__content {
                background: $wrapper-background;
              }
              .has-tabs-item {
                background: #24252d;
                ul.title-slider {
                  li {
                    border-bottom: 1px solid $ball-font-color;
                    &.active {
                      border-bottom: 2px solid #dab591;
                      div {
                        span {
                          color: #fff;
                        }
                      }
                    }
                    div {
                      border-right: 2px solid $ball-font-color;
                    }
                  }
                }
                .content-box {
                  ul.add-tabs-wrapper {
                    .title {
                      color: #fff;
                    }
                    ul.number-content {
                      li {
                        div {
                          span {
                            border: solid 1px $ball-border-color;
                            background-color: $ball-bg-color;
                          }
                          &.active {
                            span {
                              background-color: $ball-active-bg-color;
                              color: #fff;
                              border: solid 1px $ball-active-bg-color;
                            }
                          }
                        }
                      }

                    }
                  }
                }
              }
              ul.spare-content {
                li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: #f11717;
                    }
                  }
                }
              }

            }
          }
          .bjkl8-wrapper {
            background: $wrapper-background;
            .official-wrapper {
              .normal {
                .title-odds {
                  span {
                    border: solid 1px $ball-border-color;
                    box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                    background: $ball-bg-color;
                    .num {
                      color: #ff2525;
                    }
                  }
                }
                .select-wrapper {
                  ul.number-content {
                    & > li {
                      .tools {
                        & > ul {
                          background-color: #2d2e35;
                          border: 1px solid $ball-border-color;
                          li {
                            border-right: 1px solid $ball-border-color;
                          }
                        }
                      }
                      & > ul {
                        & > li {
                          div {
                            span {
                              border: solid 1px $ball-border-color;
                              background-color: $ball-bg-color;
                              color: $ball-font-color;
                            }
                            &.active {
                              span {
                                background-color: $ball-active-bg-color;
                                color: #fff;
                                border: solid 1px $ball-active-bg-color;
                              }
                            }
                          }
                        }
                      }

                    }

                  }
                  ul.square-content {
                    & > li {
                      .tools {
                        color: $font-color;
                        & > ul {
                          background-color: #2d2e35;
                          border: 1px solid $ball-border-color;
                          li {
                            border-right: 1px solid $ball-border-color;
                          }
                        }
                      }
                      & > ul {
                        li {
                          div {
                            border: solid 1px $ball-border-color;
                            background-color: $ball-bg-color;
                            span {
                              color: $ball-font-color;
                            }
                            i {
                              color: $ball-active-bg-color;
                            }
                            &.active {
                              border: solid 1px #ffd57d;
                              color: #ffd57d;
                              span {
                                color: #ffd57d;
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
            .credit-wrapper {
              /deep/ .van-cell__title,
              /deep/ .van-cell__right-icon {
                color: $ball-font-color;
              }
              /deep/ .van-collapse-item__content {
                background: $wrapper-background;
              }
              .title-odds {
                span {
                  border: solid 1px $ball-border-color;
                  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                  background: $ball-bg-color;
                  .num {
                    color: #ff2525;
                  }
                }
              }
              ul.spare-content {
                li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: #f11717;
                    }
                  }
                }
              }
              ul.number-content {
                & > li {
                  width: calc(100% / 6);
                  div {
                    span {
                      border-radius: 50%;
                      border: solid 1px $ball-border-color;
                      background-color: $ball-bg-color;
                      color: $ball-font-color;
                    }
                    i {
                      color: $ball-font-color;
                    }
                    &.active {
                      span {
                        background-color: $ball-active-bg-color;
                        color: #fff;
                        border: solid 1px $ball-active-bg-color;
                      }
                    }
                    &.red-ball {
                      span {
                        color: #d9342f;
                      }
                    }
                    &.red-ball-active {
                      span {
                        color: #fff;
                        background-color: #d9342f;
                      }
                    }
                    &.green-ball {
                      span {
                        color: #05ad5c;
                      }
                    }
                    &.green-ball-active {
                      span {
                        color: #fff;
                        background-color: #05ad5c;
                      }
                    }
                    &.blue-ball {
                      span {
                        color: #3f8feb;
                      }
                    }
                    &.blue-ball-active {
                      span {
                        color: #fff;
                        background-color: #3f8feb;
                      }
                    }
                  }
                }

              }
            }
          }
          .klc-wrapper {
            background: $wrapper-background;
            .credit-wrapper {
              /deep/ .van-cell__title,
              /deep/ .van-cell__right-icon {
                color: $ball-font-color;
              }
              /deep/ .van-collapse-item__content {
                background: $wrapper-background;
              }
              .title-odds {
                span {
                  border: solid 1px $ball-border-color;
                  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                  background: $ball-bg-color;
                  .num {
                    color: #ff2525;
                  }
                }
              }
              ul.spare-content {
                li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: #f11717;
                    }
                  }
                }
              }
              ul.number-content {
                & > li {
                  div {
                    span {
                      border: solid 1px $ball-border-color;
                      background-color: $ball-bg-color;
                      color: $ball-font-color;
                    }
                    i {
                      color: $ball-font-color;
                    }
                    &.active {
                      span {
                        background-color: $ball-active-bg-color;
                        color: #fff;
                        border: solid 1px $ball-active-bg-color;
                      }
                    }
                    &.disable {
                      span {
                        border: solid 0.02rem $ball-border-color;
                        background-color: #202225;
                      }

                    }
                  }
                }
              }
            }
          }
          .klsf-wrapper {
            background: $wrapper-background;
            .credit-wrapper {
              /deep/ .van-cell__title,
              /deep/ .van-cell__right-icon {
                color: $ball-font-color;
              }
              /deep/ .van-collapse-item__content {
                background: $wrapper-background;
              }
              .title-odds {
                span {
                  border: solid 1px $ball-border-color;
                  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                  background: $ball-bg-color;
                  .num {
                    color: #ff2525;
                  }
                }
              }
              ul.spare-content {
                li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: #f11717;
                    }
                  }
                }
              }
              ul.number-content {
                & > li {
                  div {
                    span {
                      border: solid 1px $ball-border-color;
                      background-color: $ball-bg-color;
                      color: $ball-font-color;
                    }
                    i {
                      color: $ball-font-color;
                    }
                    &.active {
                      span {
                        background-color: $ball-active-bg-color;
                        color: #fff;
                        border: solid 1px $ball-active-bg-color;
                      }
                    }
                    &.red-ball {
                      span {
                        color: #d9342f;
                      }
                    }
                    &.red-ball-active {
                      span {
                        color: #fff;
                        background-color: #d9342f;
                      }
                    }
                    &.green-ball {
                      span {
                        color: #05ad5c;
                      }
                    }
                    &.green-ball-active {
                      span {
                        color: #fff;
                        background-color: #05ad5c;
                      }
                    }
                    &.blue-ball {
                      span {
                        color: #3f8feb;
                      }
                    }
                    &.blue-ball-active {
                      span {
                        color: #fff;
                        background-color: #3f8feb;
                      }
                    }
                  }
                }

              }
            }
          }
        }
      }
      &.active {
        height: calc(100% - 2.7rem - 1.8rem);
        /*height: calc(100% - 0.6rem - 1.8rem);*/
      }
    }
  }

  .skin-gray {
    $font-color: #9fa7b3;
    $wrapper-background: #4C4A64;

    $odd-font-color: #ff2525;
    $ball-bg-color: #38364a;
    $ball-border-color: #605c7b;
    $ball-font-color: #9a9aa7;
    $ball-active-bg-color: #d11213;
    $ball-active-border-color: #d11213;
    $ball-active-font-color: #fff;
    .playing-wrapper {
      color: $font-color;
      background: linear-gradient(to bottom, #45435F, #323347);
      .random {
        color: $font-color;
      }
      .content-wrapper {
        .main-content {
          .ssc-wrapper {
            background: $wrapper-background;
            .official-wrapper {
              .normal {
                .title-odds {
                  span {
                    border: solid 1px $ball-border-color;
                    box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                    background: $ball-bg-color;
                    .num {
                      color: $odd-font-color;
                    }
                  }
                }
                .check-wrapper {
                  .select-list {
                    color: #fff;
                    /deep/ div[aria-checked="false"] {
                      .van-icon {
                        border: 1px solid $ball-font-color;
                      }
                      span.van-checkbox__label {
                        color: $ball-font-color;
                      }
                    }
                    /deep/ div[aria-checked="true"] {
                      span.van-checkbox__label {
                        color: #fff;
                      }
                      .van-icon {
                        color: #000;
                        border: 1px solid #FFEAC0;
                        background-image: linear-gradient(to bottom, #FFEAC0, #FFD681);
                      }
                    }
                  }
                  .tips {
                    color: $ball-font-color;
                    em {
                      color: red;
                    }
                  }
                }
                .select-wrapper {
                  .tools {
                    color: $font-color;
                    & > ul {
                      background-color: $ball-bg-color;
                      border: 1px solid $ball-border-color;
                      li {
                        border-right: 1px solid $ball-border-color;
                      }
                    }
                  }
                  ul.number-content {
                    li {
                      div {
                        span {
                          border: solid 1px $ball-border-color;
                          background-color: $ball-bg-color;
                          color: $ball-font-color;
                        }
                        &.active {
                          span {
                            background-color: $ball-active-bg-color;
                            color: #fff;
                            border: solid 1px $ball-active-bg-color;
                          }
                        }
                      }
                    }
                  }
                  ul.square-content {
                    li {
                      div {
                        border: solid 1px $ball-border-color;
                        background-color: $ball-bg-color;
                        span {
                          color: $ball-font-color;
                        }
                        i {
                          color: $ball-active-bg-color;
                        }
                        &.active {
                          border: solid 1px #ffd57d;
                          color: #ffd57d;
                          span {
                            color: #ffd57d;
                          }
                        }
                      }
                    }
                  }
                }
              }
              .text-area {
                .wrapper {
                  textarea {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                  }
                }
                .btn-group {
                  span {
                    &:first-child {
                      border-right: 1px solid $ball-bg-color;
                    }
                  }
                }
                .tips {
                  em {
                    color: $odd-font-color;
                  }
                }
              }
            }
            .credit-wrapper {
              /deep/ .van-cell__title,
              /deep/ .van-cell__right-icon {
                color: $ball-font-color;
              }
              /deep/ .van-collapse-item__content {
                background: $wrapper-background;
              }
              ul.spare-content {
                li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: #f11717;
                    }
                  }
                }
              }
            }
          }
          .k3-wrapper {
            background: $wrapper-background;
            .official-wrapper {
              .title-odds {
                span {
                  border: solid 1px $ball-border-color;
                  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                  background: $ball-bg-color;
                  .num {
                    color: $odd-font-color;
                  }
                }
              }
              .select-wrapper {
                .tools {
                  color: $font-color;
                  & > ul {
                    background-color: #2d2e35;
                    border: 1px solid $ball-border-color;
                    li {
                      border-right: 1px solid $ball-border-color;
                    }
                  }
                }
                ul.number-content {
                  li {
                    &.number-item {
                      div {
                        span {
                          border: solid 1px $ball-border-color;
                          background-color: $ball-bg-color;
                          color: $ball-font-color;
                        }
                        &.active {
                          span {
                            background-color: $ball-active-bg-color;
                            color: #fff;
                            border: solid 1px $ball-active-bg-color;
                          }
                        }
                      }
                    }
                    &.square-item {
                      div {
                        border: solid 1px $ball-border-color;
                        background-color: $ball-bg-color;
                        span {
                          color: $ball-font-color;
                        }
                        &.active {
                          border: .02rem solid #ffd57d;
                          color: #ffd57d;
                          span {
                            color: #ffd57d;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            .credit-wrapper {
              ul.square-item {
                li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    & > em {
                      color: red;
                    }
                    @for $i from 1 through 6 {
                      .k3-num-#{$i} {
                        color: rgba(0, 0, 0, 0);
                        background: url('../../assets/img/lottery/ks/ks_#{$i}.png') no-repeat center;
                        background-size: 100% 100%;
                      }
                    }
                    &.active {
                      border: solid 1px #ffd57d;
                      color: #ffd57d;
                    }
                  }
                }
              }
            }
          }
          .pcdd-wrapper {
            background: $wrapper-background;
            .credit-wrapper {
              ul.spare-content {
                li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: #f11717;
                    }
                  }
                }
              }
              ul.number-content {
                li {
                  div {
                    span {
                      border: solid 1px $ball-border-color;
                      background-color: $ball-bg-color;
                      color: $ball-font-color;
                    }
                    i {
                      color: $ball-active-bg-color;
                    }
                    &.active {
                      span {
                        background-color: $ball-active-bg-color;
                        color: #fff;
                        border: solid 1px $ball-active-bg-color;
                      }
                    }
                    &.disable {
                      span {
                        border: solid 0.02rem $ball-border-color;
                        background-color: #202225;
                      }

                    }
                  }
                }

              }
            }
          }
          .pk10-wrapper {
            background: $wrapper-background;
            .official-wrapper {
              .normal {
                .title-odds {
                  span {
                    border: solid 1px $ball-border-color;
                    box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                    background: $ball-bg-color;
                    .num {
                      margin: 0 0 0 0.1rem;
                      color: $odd-font-color;
                    }
                  }
                }
                .select-wrapper {
                  .tools {
                    color: $font-color;
                    & > ul {
                      background-color: #2d2e35;
                      border: 1px solid $ball-border-color;
                      li {
                        border-right: 1px solid $ball-border-color;
                      }
                    }
                  }
                  ul.number-content {
                    li {
                      &.number-item {
                        width: calc(100% / 5);
                        div {
                          span {
                            border: solid 1px $ball-border-color;
                            background-color: $ball-bg-color;
                            color: $ball-font-color;
                          }
                          &.active {
                            span {
                              background-color: $ball-active-bg-color;
                              color: #fff;
                              border: solid 1px $ball-active-bg-color;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              .text-area {
                .wrapper {
                  textarea {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                  }
                }
                .btn-group {
                  span {
                    &:first-child {
                      border-right: 1px solid $ball-bg-color;
                    }
                  }
                }
                .tips {
                  em {
                    color: $odd-font-color;
                  }
                }
              }
            }
            .credit-wrapper {
              /deep/ .van-cell__title,
              /deep/ .van-cell__right-icon {
                color: $ball-font-color;
              }
              /deep/ .van-collapse-item__content {
                background: $wrapper-background;
              }
              ul.spare-content {
                li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: #f11717;
                    }
                  }
                }
              }
              ul.number-content {
                li {
                  div {
                    span {
                      border: solid 1px $ball-border-color;
                      background-color: $ball-bg-color;
                      color: $ball-font-color;
                    }
                    i {
                      color: $ball-active-bg-color;
                    }
                    &.active {
                      span {
                        background-color: $ball-active-bg-color;
                        color: #fff;
                        border: solid 1px $ball-active-bg-color;
                      }
                    }
                  }
                }
              }
            }
          }
          .eleven5-wrapper {
            background: $wrapper-background;
            .official-wrapper {
              .normal {
                .title-odds {
                  span {
                    border: solid 1px $ball-border-color;
                    box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                    background: $ball-bg-color;
                    .num {
                      margin: 0 0 0 0.1rem;
                      color: $odd-font-color;
                    }
                  }
                }
                .select-wrapper {
                  .tools {
                    color: $font-color;
                    & > ul {
                      background-color: #2d2e35;
                      border: 1px solid $ball-border-color;
                      li {
                        border-right: 1px solid $ball-border-color;
                      }
                    }
                  }
                  ul.number-content {
                    li {
                      &.number-item {
                        div {
                          span {
                            border: solid 1px $ball-border-color;
                            background-color: #38364a;
                            color: $ball-font-color;
                          }
                          &.active {
                            span {
                              background-color: $ball-active-bg-color;
                              color: #fff;
                              border: solid 1px $ball-active-bg-color;
                            }
                          }
                        }
                      }
                      &.square-item {
                        div {
                          border: solid 1px $ball-border-color;
                          background-color: $ball-bg-color;
                          i {
                            color: $ball-active-bg-color;
                          }
                          &.active {
                            border: .02rem solid #ffd57d;
                            color: #ffd57d;
                            span {
                              color: #ffd57d;
                            }
                          }
                        }
                      }
                    }
                  }

                }
              }
              .text-area {
                .wrapper {
                  textarea {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                  }
                }
                .btn-group {
                  span {
                    &:first-child {
                      border-right: 1px solid $ball-bg-color;
                    }
                  }
                }
                .tips {
                  em {
                    color: $odd-font-color;
                  }
                }
              }
            }
            .credit-wrapper {
              /deep/ .van-cell__title,
              /deep/ .van-cell__right-icon {
                color: $ball-font-color;
              }
              /deep/ .van-collapse-item__content {
                background: $wrapper-background;
              }
              ul.spare-content {
                li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: #f11717;
                    }
                  }
                }
              }
              ul.number-content {
                li {
                  width: calc(100% / 6);
                  div {
                    span {
                      border: solid 1px $ball-border-color;
                      background-color: $ball-bg-color;
                      color: $ball-font-color;
                    }
                    i {
                      color: $ball-active-bg-color;
                    }
                    &.active {
                      span {
                        background-color: $ball-active-bg-color;
                        color: #fff;
                        border: solid 1px $ball-active-bg-color;
                      }
                    }
                    &.disable {
                      span {
                        border: solid 0.02rem $ball-border-color;
                        background-color: #202225;
                      }

                    }
                  }
                }

              }
              .has-tabs-item {
                background: #4C4A64;
                ul.title-slider {
                  li {
                    border-bottom: 1px solid $ball-font-color;
                    &.active {
                      border-bottom: 2px solid #dab591;
                      div {
                        span {
                          color: #fff;
                        }
                      }
                    }
                    div {
                      border-right: 2px solid $ball-font-color;
                      span {
                        width: 100%;
                      }
                    }
                  }
                }
              }
            }
          }
          .lhc-wrapper {
            background: $wrapper-background;
            .credit-wrapper {
              .content-item {
                .tools {
                  color: $font-color;
                  & > ul {
                    background-color: #2d2e35;
                    border: 1px solid $ball-border-color;
                    li {
                      border-right: 1px solid $ball-border-color;
                    }
                  }
                }
              }
              .has-tabs-item {
                background: #4C4A64;
                ul.title-slider {
                  li {
                    border-bottom: 1px solid $ball-font-color;
                    &.active {
                      border-bottom: 2px solid #dab591;
                      div {
                        span {
                          color: #fff;
                        }
                      }
                    }
                    div {
                      border-right: 2px solid $ball-font-color;
                    }
                  }
                }
                ul.odds-arr {
                  border-bottom: 1px solid $ball-font-color;
                  li {
                    color: #fff;
                    border-right: 1px solid $ball-font-color;
                  }
                }
              }
              ul.spare-content {
                & > li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: #f11717;
                    }
                    ul {
                      li {
                        flex: 1;
                        &.red-ball {
                          color: #d9342f;
                        }
                        &.green-ball {
                          color: #05ad5c;
                        }
                        &.blue-ball {
                          color: #3f8feb;
                        }
                      }
                    }
                  }
                }
              }
              ul.number-content {
                & > li {
                  div {
                    span {
                      border: solid 1px $ball-border-color;
                      background-color: $ball-bg-color;
                      color: $ball-font-color;
                    }
                    i {
                      color: $ball-font-color;
                    }
                    &.active {
                      span {
                        background-color: $ball-active-bg-color;
                        color: #fff;
                        border: solid 1px $ball-active-bg-color;
                      }
                    }
                    &.red-ball {
                      span {
                        color: #d9342f;
                      }
                    }
                    &.red-ball-active {
                      span {
                        color: #fff;
                        background-color: #d9342f;
                      }
                    }
                    &.green-ball {
                      span {
                        color: #05ad5c;
                      }
                    }
                    &.green-ball-active {
                      span {
                        color: #fff;
                        background-color: #05ad5c;
                      }
                    }
                    &.blue-ball {
                      span {
                        color: #3f8feb;
                      }
                    }
                    &.blue-ball-active {
                      span {
                        color: #fff;
                        background-color: #3f8feb;
                      }
                    }
                  }
                }

              }
            }
          }
          .fc3d-wrapper {
            background: $wrapper-background;
            .official-wrapper {
              .title-odds {
                span {
                  border: solid 1px $ball-border-color;
                  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                  background: $ball-bg-color;
                  .num {
                    color: $odd-font-color;
                  }
                }
              }
              .normal {
                .check-wrapper {
                  .select-list {
                    color: #fff;
                    /deep/ div[aria-checked="false"] {
                      .van-icon {
                        border: 1px solid $ball-font-color;
                      }
                      span.van-checkbox__label {
                        color: $ball-font-color;
                      }
                    }
                    /deep/ div[aria-checked="true"] {
                      span.van-checkbox__label {
                        color: #fff;
                      }
                      .van-icon {
                        color: #000;
                        border: 1px solid #FFEAC0;
                        background-image: linear-gradient(to bottom, #FFEAC0, #FFD681);
                      }
                    }
                  }
                  .tips {
                    color: $ball-font-color;
                    em {
                      color: red;
                    }
                  }
                }
                .select-wrapper {
                  ul.number-content {
                    & > li {
                      .tools {
                        color: $font-color;
                        & > ul {
                          background-color: #2d2e35;
                          border: 1px solid $ball-border-color;
                          li {
                            border-right: 1px solid $ball-border-color;
                          }
                        }
                      }
                      & > ul {
                        & > li {
                          div {
                            span {
                              border: solid 1px $ball-border-color;
                              background-color: $ball-bg-color;
                              color: $ball-font-color;
                            }
                            &.active {
                              span {
                                background-color: $ball-active-bg-color;
                                color: #fff;
                                border: solid 1px $ball-active-bg-color;
                              }
                            }
                          }
                        }
                      }

                    }

                  }
                  ul.square-content {
                    li {
                      div {
                        border: solid 1px $ball-border-color;
                        background-color: $ball-bg-color;
                        span {
                          color: $ball-font-color;
                        }
                        i {
                          color: $ball-active-bg-color;
                        }
                        &.active {
                          border: solid 1px #ffd57d;
                          color: #ffd57d;
                          span {
                            color: #ffd57d;
                          }
                        }
                      }
                    }
                  }
                }
              }
              .text-area {
                .wrapper {
                  textarea {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                  }
                }
                .btn-group {
                  span {
                    &:first-child {
                      border-right: 1px solid $ball-bg-color;
                    }
                  }
                }
                .tips {
                  em {
                    color: $odd-font-color;
                  }
                }
              }
            }
            .credit-wrapper {
              /deep/ .van-cell__title,
              /deep/ .van-cell__right-icon {
                color: $ball-font-color;
              }
              /deep/ .van-collapse-item__content {
                background: $wrapper-background;
              }
              .has-tabs-item {
                background: #4C4A64;
                ul.title-slider {
                  li {
                    border-bottom: 1px solid $ball-font-color;
                    &.active {
                      border-bottom: 2px solid #dab591;
                      div {
                        span {
                          color: #fff;
                        }
                      }
                    }
                    div {
                      border-right: 2px solid $ball-font-color;
                    }
                  }
                }
                .content-box {
                  ul.add-tabs-wrapper {
                    .title {
                      color: #fff;
                    }
                    ul.number-content {
                      li {
                        div {
                          span {
                            border: solid 1px $ball-border-color;
                            background-color: $ball-bg-color;
                          }
                          &.active {
                            span {
                              background-color: $ball-active-bg-color;
                              color: #fff;
                              border: solid 1px $ball-active-bg-color;
                            }
                          }
                        }
                      }

                    }
                  }
                }
              }
              ul.spare-content {
                li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: #f11717;
                    }
                  }
                }
              }

            }
          }
          .bjkl8-wrapper {
            background: $wrapper-background;
            .official-wrapper {
              .normal {
                .title-odds {
                  span {
                    border: solid 1px $ball-border-color;
                    box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                    background: $ball-bg-color;
                    .num {
                      color: $odd-font-color;
                    }
                  }
                }
                .select-wrapper {
                  ul.number-content {
                    & > li {
                      .tools {
                        & > ul {
                          background-color: #2d2e35;
                          border: 1px solid $ball-border-color;
                          li {
                            border-right: 1px solid $ball-border-color;
                          }
                        }
                      }
                      & > ul {
                        & > li {
                          div {
                            span {
                              border: solid 1px $ball-border-color;
                              background-color: $ball-bg-color;
                              color: $ball-font-color;
                            }
                            &.active {
                              span {
                                background-color: $ball-active-bg-color;
                                color: #fff;
                                border: solid 1px $ball-active-bg-color;
                              }
                            }
                          }
                        }
                      }

                    }

                  }
                  ul.square-content {
                    & > li {
                      .tools {
                        color: $font-color;
                        & > ul {
                          background-color: #2d2e35;
                          border: 1px solid $ball-border-color;
                          li {
                            border-right: 1px solid $ball-border-color;
                          }
                        }
                      }
                      & > ul {
                        li {
                          div {
                            border: solid 1px $ball-border-color;
                            background-color: $ball-bg-color;
                            span {
                              color: $ball-font-color;
                            }
                            i {
                              color: $ball-active-bg-color;
                            }
                            &.active {
                              border: solid 1px #ffd57d;
                              color: #ffd57d;
                              span {
                                color: #ffd57d;
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
            .credit-wrapper {
              /deep/ .van-cell__title,
              /deep/ .van-cell__right-icon {
                color: $ball-font-color;
              }
              /deep/ .van-collapse-item__content {
                background: $wrapper-background;
              }
              .title-odds {
                span {
                  border: solid 1px $ball-border-color;
                  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                  background: $ball-bg-color;
                  .num {
                    color: $odd-font-color;
                  }
                }
              }
              ul.spare-content {
                li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: #f11717;
                    }
                  }
                }
              }
              ul.number-content {
                & > li {
                  width: calc(100% / 6);
                  div {
                    span {
                      border-radius: 50%;
                      border: solid 1px $ball-border-color;
                      background-color: $ball-bg-color;
                      color: $ball-font-color;
                    }
                    i {
                      color: $ball-font-color;
                    }
                    &.active {
                      span {
                        background-color: $ball-active-bg-color;
                        color: #fff;
                        border: solid 1px $ball-active-bg-color;
                      }
                    }
                    &.red-ball {
                      span {
                        color: #d9342f;
                      }
                    }
                    &.red-ball-active {
                      span {
                        color: #fff;
                        background-color: #d9342f;
                      }
                    }
                    &.green-ball {
                      span {
                        color: #05ad5c;
                      }
                    }
                    &.green-ball-active {
                      span {
                        color: #fff;
                        background-color: #05ad5c;
                      }
                    }
                    &.blue-ball {
                      span {
                        color: #3f8feb;
                      }
                    }
                    &.blue-ball-active {
                      span {
                        color: #fff;
                        background-color: #3f8feb;
                      }
                    }
                  }
                }

              }
            }
          }
          .klc-wrapper {
            background: $wrapper-background;
            .credit-wrapper {
              /deep/ .van-cell__title,
              /deep/ .van-cell__right-icon {
                color: $ball-font-color;
              }
              /deep/ .van-collapse-item__content {
                background: $wrapper-background;
              }
              .title-odds {
                span {
                  border: solid 1px $ball-border-color;
                  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                  background: $ball-bg-color;
                  .num {
                    color: $odd-font-color;
                  }
                }
              }
              ul.spare-content {
                li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: #f11717;
                    }
                  }
                }
              }
              ul.number-content {
                & > li {
                  div {
                    span {
                      border: solid 1px $ball-border-color;
                      background-color: $ball-bg-color;
                      color: $ball-font-color;
                    }
                    i {
                      color: $ball-font-color;
                    }
                    &.active {
                      span {
                        background-color: $ball-active-bg-color;
                        color: #fff;
                        border: solid 1px $ball-active-bg-color;
                      }
                    }
                    &.disable {
                      span {
                        border: solid 0.02rem $ball-border-color;
                        background-color: #202225;
                      }

                    }
                  }
                }
              }
            }
          }
          .klsf-wrapper {
            background: $wrapper-background;
            .credit-wrapper {
              /deep/ .van-cell__title,
              /deep/ .van-cell__right-icon {
                color: $ball-font-color;
              }
              /deep/ .van-collapse-item__content {
                background: $wrapper-background;
              }
              .title-odds {
                span {
                  border: solid 1px $ball-border-color;
                  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
                  background: $ball-bg-color;
                  .num {
                    color: $odd-font-color;
                  }
                }
              }
              ul.spare-content {
                li {
                  & > div {
                    border: solid 1px $ball-border-color;
                    background-color: $ball-bg-color;
                    color: $ball-font-color;
                    &.active {
                      border: solid 1px #ffd57d;
                      span {
                        color: #ffd57d;
                      }
                    }
                    i {
                      color: #f11717;
                    }
                  }
                }
              }
              ul.number-content {
                & > li {
                  div {
                    span {
                      border: solid 1px $ball-border-color;
                      background-color: $ball-bg-color;
                      color: $ball-font-color;
                    }
                    i {
                      color: $ball-font-color;
                    }
                    &.active {
                      span {
                        background-color: $ball-active-bg-color;
                        color: #fff;
                        border: solid 1px $ball-active-bg-color;
                      }
                    }
                    &.red-ball {
                      span {
                        color: #d9342f;
                      }
                    }
                    &.red-ball-active {
                      span {
                        color: #fff;
                        background-color: #d9342f;
                      }
                    }
                    &.green-ball {
                      span {
                        color: #05ad5c;
                      }
                    }
                    &.green-ball-active {
                      span {
                        color: #fff;
                        background-color: #05ad5c;
                      }
                    }
                    &.blue-ball {
                      span {
                        color: #3f8feb;
                      }
                    }
                    &.blue-ball-active {
                      span {
                        color: #fff;
                        background-color: #3f8feb;
                      }
                    }
                  }
                }

              }
            }
          }
        }
      }
      &.active {
        height: calc(100% - 2.7rem - 1.8rem);
        /*height: calc(100% - 0.6rem - 1.8rem);*/
      }
    }
  }

  .playing-wrapper {
    flex: 1;
    color: #9fa7b3;
    background: #191b1f;
    /*height: calc(100% - 2.7rem);*/
    padding: 0 0 0.2rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .random {
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      height: 0.6rem;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      color: #9fa7b3;
      font-size: .28rem;
      & > span {
        flex: 1;
        text-align: left;
        i {
          font-size: .25rem;
          padding: 0 .1rem;
        }

        &:last-child {
          text-align: right;
          i {
            font-size: .25rem;
            padding: 0 .1rem;
          }
        }
      }
      div.balance {
        display: flex;
        justify-content: center;
        color: #ffd57d;
        flex: 1.5;
        i {
          margin: 0 0 0 0.1rem;
        }
      }
    }
    .content-wrapper {
      width: 100%;
      /*height: calc(100% - .6rem);*/
      overflow-y: scroll;
      flex: 1;
      .main-content {
        height: 100%;
        margin: 0 .2rem;
        .ssc-wrapper {
          background: #24252d;
          .official-wrapper {
            .normal {
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
              .check-wrapper {
                width: 100%;
                padding: .3rem .2rem 0;
                .select-list {
                  padding: 0 0 .2rem;
                  display: flex;
                  justify-content: center;
                  color: #fff;
                  /deep/ div[aria-checked="false"] {
                    .van-icon {
                      border-radius: 0.1rem;
                      border: 1px solid #9a9aa7;
                    }
                    span.van-checkbox__label {
                      color: #9a9aa7;
                    }
                  }
                  /deep/ div[aria-checked="true"] {
                    span.van-checkbox__label {
                      color: #fff;
                    }
                    .van-icon {
                      border-radius: 0.1rem;
                      color: #000;
                      border: 1px solid #FFEAC0;
                      background-image: linear-gradient(to bottom, #FFEAC0, #FFD681);
                    }
                  }
                  /deep/ .van-checkbox {
                    /deep/ .van-checkbox__icon--round .van-icon {
                      border-radius: 2px;
                      width: 1.1em;
                      height: 1.1em;
                      line-height: 1.1em;
                    }
                  }
                }
                .tips {
                  text-align: justify;
                  line-height: 20px;
                  color: #9a9aa7;
                  font-size: 12px;
                  em {
                    color: red;
                  }
                }
              }
              .select-wrapper {
                padding: 15px 0 0;
                .tools {
                  color: #9fa7b3;
                  padding: 0 .3rem;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  min-height: 0.5rem;
                  .title {
                    font-size: .2rem;
                    flex: 1.5;
                  }
                  & > ul {
                    background-color: #2d2e35;
                    display: flex;
                    border: 1px solid #605c7b;
                    border-radius: .1rem;
                    margin: 0 0 0 .1rem;
                    flex: 8.5;
                    font-size: .28rem;
                    width: 100%;
                    li {
                      flex: 1;
                      text-align: center;
                      height: .5rem;
                      line-height: .5rem;
                      border-right: 1px solid #605c7b;
                      &:last-child {
                        border-right: none;
                      }
                    }
                  }
                }
                ul.number-content {
                  width: 100%;
                  padding: 10px 0 0;
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
                        background-color: #38364A;
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
                ul.square-content {
                  width: 100%;
                  padding: 10px 0 0;
                  display: flex;
                  flex-direction: row;
                  flex-wrap: wrap;
                  li {
                    width: calc(100% / 3);
                    margin: 0 0 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    div {
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                      width: 1.84rem;
                      height: 1.16rem;
                      border: solid 1px #605c7b;
                      background-color: #38364A;
                      border-radius: 0.1rem;
                      span {
                        font-size: 0.32rem;
                        height: 0.5rem;
                        line-height: 0.5rem;
                        font-weight: bold;
                        margin: 0 0 5px;
                        color: #9a9aa7;
                        text-align: center;
                      }
                      i {
                        color: #d11213;
                      }
                      &.active {
                        border: solid 1px #ffd57d;
                        color: #ffd57d;
                        span {
                          color: #ffd57d;
                          /*background-color: #d11213;*/
                          /*color: #fff;*/
                          /*border: solid 1px #d11213;*/
                        }
                      }
                    }
                  }
                }
              }
            }
            .text-area {
              padding: .3rem 0;
              .wrapper {
                display: flex;
                justify-content: center;
                width: 100%;
                textarea {
                  border: solid 1px #605c7b;
                  background-color: #38364A;
                  width: 90%;
                  min-height: 30vh;
                  font-size: 16px;
                }
              }
              .btn-group {
                width: 100%;
                height: .9rem;
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
                    border-right: 1px solid #38364A;
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
          .credit-wrapper {
            /deep/ .van-cell__title,
            /deep/ .van-cell__right-icon {
              color: #9a9aa7;
            }
            /deep/ .van-collapse-item__content {
              background: #24252D;
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
                  background-color: #38364A;
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
        .k3-wrapper {
          width: 100%;
          background: #24252d;
          .official-wrapper {
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
            .select-wrapper {
              padding: 15px 0 0;
              .tools {
                color: #9fa7b3;
                padding: 0 .3rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                min-height: 0.5rem;
                .title {
                  font-size: .2rem;
                  flex: 1.5;
                }
                & > ul {
                  background-color: #2d2e35;
                  display: flex;
                  border: 1px solid #605c7b;
                  border-radius: .1rem;
                  margin: 0 0 0 .1rem;
                  flex: 8.5;
                  font-size: .28rem;
                  width: 100%;
                  li {
                    flex: 1;
                    text-align: center;
                    height: .5rem;
                    line-height: .5rem;
                    border-right: 1px solid #605c7b;
                    &:last-child {
                      border-right: none;
                    }
                  }
                }
              }
              ul.number-content {
                width: 100%;
                padding: 10px 0 0;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                li {

                  &.number-item {
                    margin: 0 0 10px;
                    width: calc(100% / 6);
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
                        background-color: #38364A;
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
                  &.square-item {
                    margin: 0 0 20px;
                    width: calc(100% / 3);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    div {
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                      width: 80%;
                      height: 1.16rem;
                      line-height: 1.16rem;
                      border-radius: 0.1rem;
                      font-size: .4rem;
                      font-weight: 500;
                      border: solid 1px #605c7b;
                      background-color: #38364A;
                      span {
                        /*border-radius: 50%;*/
                        /*margin: 0 0 5px;*/
                        /*font-size: 18px;*/
                        /*width: 40px;*/
                        /*height: 38px;*/
                        /*line-height: 38px;*/
                        color: #9a9aa7;
                        text-align: center;
                      }
                      &.active {
                        border: .02rem solid #ffd57d;
                        color: #ffd57d;
                        span {
                          color: #ffd57d;
                          /*background-color: #d11213;*/
                          /*color: #fff;*/
                          /*border: solid 1px #d11213;*/
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          .credit-wrapper {
            ul.square-item {
              display: flex;
              flex-wrap: wrap;
              padding: 0.3rem 0 0;
              li {
                width: 33.3%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 0 .3rem;
                & > div {
                  width: 1.9rem;
                  min-height: 1.3rem;
                  border: solid 1px #605c7b;
                  background-color: #38364A;
                  border-radius: 5px;
                  text-align: center;
                  font-weight: 500;
                  color: #9a9aa7;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  /*justify-content: center;*/
                  div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span {
                      /*width: .55rem;*/
                      height: .55rem;
                      line-height: .55rem;
                      font-weight: 700;
                      margin: .15rem .05rem;
                      font-size: .3rem;
                    }
                    &.arr-number {
                      span:last-child {
                        margin-right: 0;
                      }
                    }
                  }
                  & > em {
                    font-size: .22rem;
                    color: red;
                  }
                  @for $i from 1 through 6 {
                    .k3-num-#{$i} {
                      width: 0.55rem;
                      height: 0.55rem;
                      margin: 0.15rem 0.05rem 0.15rem 0;
                      color: rgba(0, 0, 0, 0);
                      background: url('../../assets/img/lottery/ks/ks_#{$i}.png') no-repeat center;
                      background-size: 100% 100%;
                    }
                  }
                  &.active {
                    border: solid 1px #ffd57d;
                    color: #ffd57d;
                  }
                }
                &.notNum {
                  width: 25%;
                  & > div {
                    width: 68px;
                    min-height: 58px;
                    div {
                      span {
                        height: .5rem;
                      }
                    }
                  }
                }
              }
            }
            ul.special-layout {
              li:nth-last-child(1),
              li:nth-last-child(2),
              li:nth-last-child(3),
              li:nth-last-child(4) {
                width: 25%;
                & > div {
                  width: 68px;
                  min-height: 58px;
                  div {
                    span {
                      height: .5rem;
                    }
                  }
                }
              }
            }
          }
        }
        .pcdd-wrapper {
          width: 100%;
          background: #24252d;
          .credit-wrapper {
            padding: 15px 0 0;
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
                  width: 1.84rem;
                  height: 58px;
                  border: solid 1px #605c7b;
                  background-color: #38364A;
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
                    height: 30px;
                    line-height: 30px;
                    font-weight: bold;
                  }
                  i {
                    color: #f11717;
                  }
                }
              }
            }
            ul.number-content {
              /*padding: 10px 0 0;*/
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
                    background-color: #38364A;
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
                  &.disable {
                    span {
                      border: solid 0.02rem #605c7b;
                      background-color: #202225;
                    }

                  }
                }
              }

            }
          }
        }
        .pk10-wrapper {
          background: #24252d;
          .official-wrapper {
            .normal {
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
              .select-wrapper {
                padding: 15px 0 0;
                .tools {
                  color: #9fa7b3;
                  padding: 0 .3rem;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  min-height: 0.5rem;
                  .title {
                    font-size: .2rem;
                    flex: 1.5;
                  }
                  & > ul {
                    background-color: #2d2e35;
                    display: flex;
                    border: 1px solid #605c7b;
                    border-radius: .1rem;
                    margin: 0 0 0 .1rem;
                    flex: 8.5;
                    font-size: .28rem;
                    width: 100%;
                    li {
                      flex: 1;
                      text-align: center;
                      height: .5rem;
                      line-height: .5rem;
                      border-right: 1px solid #605c7b;
                      &:last-child {
                        border-right: none;
                      }
                    }
                  }
                }
                ul.number-content {
                  width: 100%;
                  padding: 10px 0 0;
                  display: flex;
                  flex-direction: row;
                  flex-wrap: wrap;
                  li {
                    &.number-item {
                      margin: 0 0 10px;
                      width: calc(100% / 5);
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
                          background-color: #38364A;
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
            }
            .text-area {
              padding: .3rem 0;
              .wrapper {
                display: flex;
                justify-content: center;
                width: 100%;
                textarea {
                  border: solid 1px #605c7b;
                  background-color: #38364A;
                  width: 90%;
                  min-height: 30vh;
                }
              }
              .btn-group {
                width: 100%;
                height: .9rem;
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
                    border-right: 1px solid #38364A;
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
          .credit-wrapper {
            /deep/ .van-cell__title,
            /deep/ .van-cell__right-icon {
              color: #9a9aa7;
            }
            /deep/ .van-collapse-item__content {
              background: #24252D;
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
                  background-color: #38364A;
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
                    background-color: #38364A;
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
        }
        .eleven5-wrapper {
          background: #24252d;
          .official-wrapper {
            .normal {
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
              .select-wrapper {
                padding: 15px 0 0;
                .tools {
                  color: #9fa7b3;
                  padding: 0 .3rem;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  min-height: 0.5rem;
                  .title {
                    font-size: .2rem;
                    flex: 1.5;
                  }
                  & > ul {
                    background-color: #2d2e35;
                    display: flex;
                    border: 1px solid #605c7b;
                    border-radius: .1rem;
                    margin: 0 0 0 .1rem;
                    flex: 8.5;
                    font-size: .28rem;
                    width: 100%;
                    li {
                      flex: 1;
                      text-align: center;
                      height: .5rem;
                      line-height: .5rem;
                      border-right: 1px solid #605c7b;
                      &:last-child {
                        border-right: none;
                      }
                    }
                  }
                }
                ul.number-content {
                  width: 100%;
                  padding: 10px 0 0;
                  display: flex;
                  flex-direction: row;
                  flex-wrap: wrap;
                  li {
                    &.number-item {
                      margin: 0 0 10px;
                      width: calc(100% / 6);
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
                          background-color: #38364A;
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
                    &.square-item {
                      margin: 0 0 20px;
                      width: calc(100% / 3);
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      div {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width: 80%;
                        height: 1.16rem;
                        /*line-height: 1.16rem;*/
                        border-radius: 0.1rem;
                        font-size: .3rem;
                        font-weight: 500;
                        border: solid 1px #605c7b;
                        background-color: #38364A;
                        span {
                          color: #9a9aa7;
                          text-align: center;
                          line-height: 0.6rem;
                        }
                        i {
                          color: #d11213;
                          font-size: 12px;
                        }
                        &.active {
                          border: .02rem solid #ffd57d;
                          color: #ffd57d;
                          span {
                            color: #ffd57d;
                            /*background-color: #d11213;*/
                            /*color: #fff;*/
                            /*border: solid 1px #d11213;*/
                          }
                        }
                      }
                    }
                  }
                }

              }
            }
            .text-area {
              padding: .3rem 0;
              .wrapper {
                display: flex;
                justify-content: center;
                width: 100%;
                textarea {
                  border: solid 1px #605c7b;
                  background-color: #38364A;
                  width: 90%;
                  min-height: 30vh;
                }
              }
              .btn-group {
                width: 100%;
                height: .9rem;
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
                    border-right: 1px solid #38364A;
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
          .credit-wrapper {
            /deep/ .van-cell__title,
            /deep/ .van-cell__right-icon {
              color: #9a9aa7;
            }
            /deep/ .van-collapse-item__content {
              background: #24252D;
            }
            ul.spare-content {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
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
                  width: 65px;
                  height: 58px;
                  border: solid 1px #605c7b;
                  background-color: #38364A;
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
                    font-size: 15px;
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
                    background-color: #38364A;
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
                  &.disable {
                    span {
                      border: solid 0.02rem #605c7b;
                      background-color: #202225;
                    }

                  }
                }
              }

            }
            .has-tabs-item {
              width: 100%;
              background: #4C4A64;
              ul.title-slider {
                width: 100%;
                height: 1rem;
                display: flex;
                justify-content: flex-start;
                overflow: scroll;
                /*box-sizing: content-box;*/
                li {
                  height: 1rem;
                  display: flex;
                  align-items: center;
                  border-bottom: 1px solid #9a9aa7;
                  &.active {
                    border-bottom: 2px solid #dab591;
                    div {
                      span {
                        color: #fff;
                      }
                    }
                  }
                  &:last-child {
                    div {
                      border-right: none;
                    }
                  }
                  div {
                    width: 2rem;
                    height: 0.4rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-right: 2px solid #9a9aa7;
                    span {
                      width: 100%;
                      text-align: center;
                      font-size: 0.3rem;
                    }

                  }
                }
              }
            }
          }
        }
        .lhc-wrapper {
          background: #24252d;
          .credit-wrapper {
            .content-item {
              padding: 0.3rem 0 0;
              .tools {
                color: #9fa7b3;
                padding: 0 .2rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                min-height: 0.5rem;
                .title {
                  font-size: .2rem;
                  flex: 1.5;
                }
                & > ul {
                  background-color: #2d2e35;
                  display: flex;
                  border: 1px solid #605c7b;
                  border-radius: .1rem;
                  margin: 0 0 0 .1rem;
                  flex: 8.5;
                  font-size: .28rem;
                  width: 100%;
                  li {
                    flex: 1;
                    text-align: center;
                    height: .5rem;
                    line-height: .5rem;
                    border-right: 1px solid #605c7b;
                    &:last-child {
                      border-right: none;
                    }
                  }
                }
              }
            }
            .has-tabs-item {
              width: 100%;
              background: #4C4A64;
              ul.title-slider {
                width: 100%;
                height: 1rem;
                display: flex;
                justify-content: flex-start;
                overflow: scroll;
                /*box-sizing: content-box;*/
                li {
                  height: 1rem;
                  display: flex;
                  align-items: center;
                  border-bottom: 1px solid #9a9aa7;
                  &.active {
                    border-bottom: 2px solid #dab591;
                    div {
                      span {
                        color: #fff;
                      }
                    }
                  }
                  &:last-child {
                    div {
                      border-right: none;
                    }
                  }
                  div {
                    width: 2rem;
                    height: 0.4rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-right: 2px solid #9a9aa7;
                    span {
                      width: 100%;
                      text-align: center;
                      font-size: 0.3rem;
                    }

                  }
                }
              }
              ul.odds-arr {
                width: 100%;
                height: 0.5rem;
                border-bottom: 1px solid #9a9aa7;
                display: flex;
                li {
                  flex: 1;
                  line-height: 0.5rem;
                  color: #fff;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-size: 0.2rem;
                  border-right: 1px solid #9a9aa7;
                  &:last-child {
                    border-right: none;
                  }
                }
              }
            }
            ul.spare-content {
              padding: 0.3rem 0 0;
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              & > li {
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
                  width: 2rem;
                  height: 63px;
                  border: solid 1px #605c7b;
                  background-color: #38364A;
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
                    font-size: 15px;
                    height: 25px;
                    line-height: 25px;
                    font-weight: bold;
                  }
                  i {
                    color: #f11717;
                  }
                  ul {
                    width: 95%;
                    display: flex;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    li {
                      flex: 1;
                      &.red-ball {
                        color: #d9342f;
                      }
                      &.green-ball {
                        color: #05ad5c;
                      }
                      &.blue-ball {
                        color: #3f8feb;
                      }
                    }
                  }
                }
              }
            }
            ul.number-content {
              padding: 0.3rem 0 0;
              width: 100%;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              & > li {
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
                    background-color: #38364A;
                    color: #9a9aa7;
                    text-align: center;
                  }
                  i {
                    color: #9a9aa7;
                  }
                  &.active {
                    span {
                      background-color: #d11213;
                      color: #fff;
                      border: solid 1px #d11213;
                    }
                  }
                  &.red-ball {
                    span {
                      color: #d9342f;
                    }
                  }
                  &.red-ball-active {
                    span {
                      color: #fff;
                      background-color: #d9342f;
                    }
                  }
                  &.green-ball {
                    span {
                      color: #05ad5c;
                    }
                  }
                  &.green-ball-active {
                    span {
                      color: #fff;
                      background-color: #05ad5c;
                    }
                  }
                  &.blue-ball {
                    span {
                      color: #3f8feb;
                    }
                  }
                  &.blue-ball-active {
                    span {
                      color: #fff;
                      background-color: #3f8feb;
                    }
                  }
                }
              }

            }
          }
        }
        .fc3d-wrapper {
          background: #24252d;
          .official-wrapper {
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
            .normal {
              .check-wrapper {
                width: 100%;
                padding: .3rem .2rem 0;
                .select-list {
                  padding: 0 0 .2rem;
                  display: flex;
                  justify-content: center;
                  color: #fff;
                  /deep/ div[aria-checked="false"] {
                    .van-icon {
                      border-radius: 0.1rem;
                      border: 1px solid #9a9aa7;
                    }
                    span.van-checkbox__label {
                      color: #9a9aa7;
                    }
                  }
                  /deep/ div[aria-checked="true"] {
                    span.van-checkbox__label {
                      color: #fff;
                    }
                    .van-icon {
                      border-radius: 0.1rem;
                      color: #000;
                      border: 1px solid #FFEAC0;
                      background-image: linear-gradient(to bottom, #FFEAC0, #FFD681);
                    }
                  }
                  /deep/ .van-checkbox {
                    /deep/ .van-checkbox__icon--round .van-icon {
                      border-radius: 2px;
                      width: 1.1em;
                      height: 1.1em;
                      line-height: 1.1em;
                    }
                  }
                }
                .tips {
                  text-align: justify;
                  line-height: 20px;
                  color: #9a9aa7;
                  font-size: 12px;
                  em {
                    color: red;
                  }
                }
              }
              .select-wrapper {
                padding: 15px 0 0;

                ul.number-content {
                  width: 100%;
                  padding: 10px 0 0;
                  & > li {
                    .tools {
                      color: #9fa7b3;
                      padding: 0 .3rem;
                      display: flex;
                      justify-content: flex-start;
                      align-items: center;
                      min-height: 0.5rem;
                      .title {
                        font-size: .2rem;
                        flex: 1.5;
                      }
                      & > ul {
                        background-color: #2d2e35;
                        display: flex;
                        border: 1px solid #605c7b;
                        border-radius: .1rem;
                        margin: 0 0 0 .1rem;
                        flex: 8.5;
                        font-size: .28rem;
                        width: 100%;
                        li {
                          flex: 1;
                          text-align: center;
                          height: .5rem;
                          line-height: .5rem;
                          border-right: 1px solid #605c7b;
                          &:last-child {
                            border-right: none;
                          }
                        }
                      }
                    }
                    & > ul {
                      padding: 10px 0 0;
                      width: 100%;
                      display: flex;
                      flex-direction: row;
                      flex-wrap: wrap;
                      & > li {
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
                            background-color: #38364A;
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
                ul.square-content {
                  width: 100%;
                  padding: 10px 0 0;
                  display: flex;
                  flex-direction: row;
                  flex-wrap: wrap;
                  li {
                    width: calc(100% / 3);
                    margin: 0 0 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    div {
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                      width: 1.84rem;
                      height: 1.16rem;
                      border: solid 1px #605c7b;
                      background-color: #38364A;
                      border-radius: 0.1rem;
                      span {
                        font-size: 0.32rem;
                        height: 0.5rem;
                        line-height: 0.5rem;
                        font-weight: bold;
                        margin: 0 0 5px;
                        color: #9a9aa7;
                        text-align: center;
                      }
                      i {
                        color: #d11213;
                      }
                      &.active {
                        border: solid 1px #ffd57d;
                        color: #ffd57d;
                        span {
                          color: #ffd57d;
                          /*background-color: #d11213;*/
                          /*color: #fff;*/
                          /*border: solid 1px #d11213;*/
                        }
                      }
                    }
                  }
                }
              }
            }
            .text-area {
              padding: .3rem 0;
              .wrapper {
                padding: .3rem 0 0;
                display: flex;
                justify-content: center;
                width: 100%;
                textarea {
                  border: solid 1px #605c7b;
                  background-color: #38364A;
                  width: 90%;
                  min-height: 30vh;
                  font-size: 16px;
                }
              }
              .btn-group {
                width: 100%;
                height: .9rem;
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
          .credit-wrapper {
            /deep/ .van-cell__title,
            /deep/ .van-cell__right-icon {
              color: #9a9aa7;
            }
            /deep/ .van-collapse-item__content {
              background: #24252D;
            }
            .has-tabs-item {
              width: 100%;
              background: #4C4A64;
              ul.title-slider {
                width: 100%;
                height: 1rem;
                display: flex;
                justify-content: flex-start;
                overflow: scroll;
                /*box-sizing: content-box;*/
                li {
                  height: 1rem;
                  display: flex;
                  align-items: center;
                  border-bottom: 1px solid #9a9aa7;
                  &.active {
                    border-bottom: 2px solid #dab591;
                    div {
                      span {
                        color: #fff;
                      }
                    }
                  }
                  &:last-child {
                    div {
                      border-right: none;
                    }
                  }
                  div {
                    width: 2rem;
                    height: 0.4rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-right: 2px solid #9a9aa7;
                    span {
                      width: 100%;
                      text-align: center;
                      font-size: 0.3rem;
                    }

                  }
                }
              }
              .content-box {
                ul.add-tabs-wrapper {
                  padding: 0.3rem 0 0;
                  .title {
                    padding: 0 .3rem;
                    height: 0.5rem;
                    line-height: 0.5rem;
                    color: #fff;
                    font-size: 0.3rem;
                  }
                  ul.number-content {
                    width: 100%;
                    padding: 10px 0 0;
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
            }
            ul.spare-content {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              padding: 0.3rem 0 0;
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
        .bjkl8-wrapper {
          background: #24252d;
          .official-wrapper {
            .normal {
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
              .select-wrapper {
                padding: 15px 0 0;
                ul.number-content {
                  width: 100%;
                  padding: 10px 0 0;
                  & > li {
                    .tools {
                      color: #9fa7b3;
                      padding: 0 .3rem;
                      display: flex;
                      justify-content: flex-start;
                      align-items: center;
                      min-height: 0.5rem;
                      .title {
                        font-size: .2rem;
                        flex: 1.5;
                      }
                      & > ul {
                        background-color: #2d2e35;
                        display: flex;
                        border: 1px solid #605c7b;
                        border-radius: .1rem;
                        margin: 0 0 0 .1rem;
                        flex: 8.5;
                        font-size: .28rem;
                        width: 100%;
                        li {
                          flex: 1;
                          text-align: center;
                          height: .5rem;
                          line-height: .5rem;
                          border-right: 1px solid #605c7b;
                          &:last-child {
                            border-right: none;
                          }
                        }
                      }
                    }
                    & > ul {
                      padding: 10px 0 0;
                      width: 100%;
                      display: flex;
                      flex-direction: row;
                      flex-wrap: wrap;
                      & > li {
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
                ul.square-content {
                  width: 100%;
                  padding: 0.3rem 0 0;
                  & > li {
                    .tools {
                      color: #9fa7b3;
                      padding: 0 .3rem;
                      display: flex;
                      justify-content: flex-start;
                      align-items: center;
                      min-height: 0.5rem;
                      .title {
                        font-size: .2rem;
                        flex: 1.5;
                      }
                      & > ul {
                        background-color: #2d2e35;
                        display: flex;
                        border: 1px solid #605c7b;
                        border-radius: .1rem;
                        margin: 0 0 0 .1rem;
                        flex: 8.5;
                        font-size: .28rem;
                        width: 100%;
                        li {
                          flex: 1;
                          text-align: center;
                          height: .5rem;
                          line-height: .5rem;
                          border-right: 1px solid #605c7b;
                          &:last-child {
                            border-right: none;
                          }
                        }
                      }
                    }
                    & > ul {
                      padding: 0.3rem 0 0;
                      display: flex;
                      flex-direction: row;
                      flex-wrap: wrap;
                      li {
                        width: calc(100% / 3);
                        margin: 0 0 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        div {
                          display: flex;
                          flex-direction: column;
                          justify-content: center;
                          align-items: center;
                          width: 1.84rem;
                          height: 1.16rem;
                          border: solid 1px #605c7b;
                          background-color: #38364a;
                          border-radius: 0.1rem;
                          span {
                            font-size: 0.3rem;
                            /*height: 0.5rem;*/
                            line-height: 0.4rem;
                            font-weight: bold;
                            /*margin: 0 0 5px;*/
                            color: #9a9aa7;
                            text-align: center;
                          }
                          em {
                            font-size: 0.24rem;
                            line-height: 0.3rem;
                          }
                          i {
                            color: #d11213;
                            line-height: 0.3rem;
                          }
                          &.active {
                            border: solid 1px #ffd57d;
                            color: #ffd57d;
                            span {
                              color: #ffd57d;
                              /*background-color: #d11213;*/
                              /*color: #fff;*/
                              /*border: solid 1px #d11213;*/
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
          .credit-wrapper {
            /deep/ .van-cell__title,
            /deep/ .van-cell__right-icon {
              color: #9a9aa7;
            }
            /deep/ .van-collapse-item__content {
              background: #24252D;
            }
            .title-odds {
              padding: 15px 0 0;
              display: flex;
              align-items: center;
              justify-content: space-evenly;
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
                /*margin: 0 0.3rem 0 0;*/
                .num {
                  margin: 0 0 0 0.1rem;
                  color: #ff2525;
                  font-weight: bold;
                }
              }
            }
            ul.spare-content {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              padding: 0.3rem 0 0;
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
                    min-height: 25px;
                    line-height: 15px;
                    font-weight: bold;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  i {
                    color: #f11717;
                  }
                }
              }
            }
            ul.number-content {
              padding: 0.3rem 0 0;
              width: 100%;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              & > li {
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
                    color: #9a9aa7;
                  }
                  &.active {
                    span {
                      background-color: #d11213;
                      color: #fff;
                      border: solid 1px #d11213;
                    }
                  }
                  &.red-ball {
                    span {
                      color: #d9342f;
                    }
                  }
                  &.red-ball-active {
                    span {
                      color: #fff;
                      background-color: #d9342f;
                    }
                  }
                  &.green-ball {
                    span {
                      color: #05ad5c;
                    }
                  }
                  &.green-ball-active {
                    span {
                      color: #fff;
                      background-color: #05ad5c;
                    }
                  }
                  &.blue-ball {
                    span {
                      color: #3f8feb;
                    }
                  }
                  &.blue-ball-active {
                    span {
                      color: #fff;
                      background-color: #3f8feb;
                    }
                  }
                }
              }

            }
          }
        }
        .klc-wrapper {
          background: #24252d;
          .credit-wrapper {
            /deep/ .van-cell__title,
            /deep/ .van-cell__right-icon {
              color: #9a9aa7;
            }
            /deep/ .van-collapse-item__content {
              background: #24252D;
            }
            .title-odds {
              padding: 15px 0 0;
              display: flex;
              align-items: center;
              justify-content: space-evenly;
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
                /*margin: 0 0.3rem 0 0;*/
                .num {
                  margin: 0 0 0 0.1rem;
                  color: #ff2525;
                  font-weight: bold;
                }
              }
            }
            ul.spare-content {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              padding: 0.3rem 0 0;
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
                    min-height: 25px;
                    line-height: 15px;
                    font-weight: bold;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  i {
                    color: #f11717;
                  }
                }
              }
            }
            ul.number-content {
              padding: 0.3rem 0 0;
              width: 100%;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              & > li {
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
                    color: #9a9aa7;
                  }
                  &.active {
                    span {
                      background-color: #d11213;
                      color: #fff;
                      border: solid 1px #d11213;
                    }
                  }
                  &.disable {
                    span {
                      border: solid 0.02rem #605c7b;
                      background-color: #202225;
                    }

                  }
                }
              }

            }
          }
        }
        .klsf-wrapper {
          background: #24252d;
          .credit-wrapper {
            /deep/ .van-cell__title,
            /deep/ .van-cell__right-icon {
              color: #9a9aa7;
            }
            /deep/ .van-collapse-item__content {
              background: #24252D;
            }
            .title-odds {
              padding: 0.3rem 0;
              display: flex;
              align-items: center;
              justify-content: space-evenly;
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
                /*margin: 0 0.3rem 0 0;*/
                .num {
                  margin: 0 0 0 0.1rem;
                  color: #ff2525;
                  font-weight: bold;
                }
              }
            }
            ul.spare-content {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              /*padding: 0.3rem 0 0;*/
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
                    min-height: 25px;
                    line-height: 15px;
                    font-weight: bold;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  i {
                    color: #f11717;
                  }
                }
              }
            }
            ul.number-content {
              /*padding: 0.3rem 0 0;*/
              width: 100%;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              & > li {
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
                    color: #9a9aa7;
                  }
                  &.active {
                    span {
                      background-color: #d11213;
                      color: #fff;
                      border: solid 1px #d11213;
                    }
                  }
                  &.red-ball {
                    span {
                      color: #d9342f;
                    }
                  }
                  &.red-ball-active {
                    span {
                      color: #fff;
                      background-color: #d9342f;
                    }
                  }
                  &.green-ball {
                    span {
                      color: #05ad5c;
                    }
                  }
                  &.green-ball-active {
                    span {
                      color: #fff;
                      background-color: #05ad5c;
                    }
                  }
                  &.blue-ball {
                    span {
                      color: #3f8feb;
                    }
                  }
                  &.blue-ball-active {
                    span {
                      color: #fff;
                      background-color: #3f8feb;
                    }
                  }
                }
              }

            }
          }
        }
      }
    }
    &.active {
      height: calc(100% - 2.7rem - 1.8rem);
      /*height: calc(100% - 0.6rem - 1.8rem);*/
    }
  }
</style>
