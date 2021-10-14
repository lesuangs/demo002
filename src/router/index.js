import Vue from "vue";
import VueRouter from "vue-router";
import OIndex from '../views/Index';
import ODraw from '../views/Draw';
import OLottery from '../views/lottery/index';
import ONote from '../views/Note'; // 首页-订单

import OUser from '../views/User';
import OLogin from '../views/Login';
import ORegister from '../views/Register';
import OSetting from '../views/Setting';
import OAboutUs from '@/views/AboutUs';
import OAgentCenter from '../views/agentCenter/AgentCenter';
import OIntroduce from '../views/Introduce';
import OMyCoupon from '@/views/MyCoupon';
import OCouponExplain from '@/views/CouponExplain';
// 帮助中心 -- start
import helpCenter from '../views/HelpCenter';
import playRule from '../views/PlayRule';
// 帮助中心 -- end
import OSecurityCenter from '@/views/securityCenter/SecurityCenter';
import OMyBankCard from '@/views/securityCenter/MyBankCard';
import OBankCardData from '../views/securityCenter/BankCardData';
import OSetFundsPassword from '../views/securityCenter/SetFundsPassword';
import OChangePassword from '@/views/securityCenter/ChangePassword';
import OBonusInfo from '../views/BonusInfo';

import ODetailSetting from '../views/DetailSetting';
import OFeedback from '@/views/Feedback';
import ODepositInterest from '@/views/DepositInterest';
import OInstructions from '@/views/Instructions';
import ODepositDetails from '@/views/DepositDetails';
import OAccountDetail from '../views/AccountDetail';
import ORechargeRecord from '../views/rechargeRecord/RechargeRecord';
import OWithdrawRecord from '../views/WithdrawRecord';
import OBalanceChange from '@/views/BalanceChange';
import ORecharge from '../views/pay/Recharge';
import OBankPay from '../views/pay/BankPay';
import OAliPay from '../views/pay/AliPay';
import ORechargeExplain from '@/views/pay/RechargeExplain';
import OMessageList from '../views/MessageList';
import OGameList from '../views/GameList';
import OTransfer from '@/views/Transfer';
import OPromotions from '../views/Promotions';
import ONoticeList from '../views/NoticeList';
import ONoteHistory from '@/views/note/NoteHistory';
import ONoteHistoryDel from '../views/note/NoteHistoryDel';

// import OlotteryHall from '../views/LotteryHall/index';
// import Olhc from '../views/LotteryHall/playCenter/MarkSix';
// import Ok3 from '../views/LotteryHall/playCenter/LuckyThree';
// import Opk10 from '@/views/LotteryHall/playCenter/pk10';
// import Ossc from '../views/LotteryHall/playCenter/Ssc';
// import Opcdd from '../views/LotteryHall/playCenter/Lucky28';
// import O11x5 from '../views/LotteryHall/playCenter/Game11of5';
// import Ofc3d from '@/views/LotteryHall/playCenter/Fc3d';
// import Objkl8 from '../views/LotteryHall/playCenter/bjkl8';
// import Ogdklsf from '@/views/LotteryHall/playCenter/klc';
// import Ogxklsf from '@/views/LotteryHall/playCenter/gxklsf';
// import OOrderList from '../views/LotteryHall/module/OrderList';


import OmyBankInfo from '../views/securityCenter/MyBankInfo.vue';
import OwithDraw from '../views/withDraw/WithDraw.vue';
import OauditDetails from '../views/withDraw/AuditDetails.vue';
import OexplainWithDraw from '../views/withDraw/ExplainWithDraw.vue';
import OteamOverView from '../views/agentCenter/TeamOverView.vue';
import OenrollmentManagement from '../views/agentCenter/EnrollmentManagement.vue';
import OpromotionRegistration from '../views/agentCenter/PromotionRegistration.vue';
import OuserList from '../views/agentCenter/UserList.vue';
import OapplyingForAgency from '../views/agentCenter/ApplyingForAgency.vue';
import ODrawHistory from '../views/draw/DrawHistory.vue';
import Odetailedinformation from '@/views/agentCenter/Detailedinformation';
import OdetaileEdit from '@/views/agentCenter/DetaileEdit';
import OaddPromoCode from '@/views/agentCenter/AddPromoCode';
import OwithdrawalsRecord from '@/views/withdrawalsRecord/WithdrawalsRecord';
import OmyCollection from '../views/MyCollection';
import OfindPwd from '@/views/securityCenter/FindPwd';
import OTendency from '../views/Tendency.vue';

import SurplusFund from '@/views/surplusFund/surplusFund.vue';
import SurplusFundDetail from '@/views/surplusFund/surplusFundDetail.vue';

import lotteryIndex from '../views/lotteryNew/lotteryIndex';
// import waitingOrder from '../views/lotteryNew/waitingOrder'
import ranking from '../views/ranking/ranking'
import trend from '../views/trend/trend'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', name: 'Index', component: OIndex},
    {
      path: '/ranking', name: 'ranking', component: ranking
    },
    {path: '/Draw', name: 'Draw', component: ODraw},
    {path: '/Lottery', name: 'Lottery', component: OLottery},
    {
      path: '/lotteryNew',
      name: 'lotteryNew',
      component: lotteryIndex,
      // meta: {
      //   keepAlive: false // 不需要被缓存
      // }
      // component: (resolve) => require([`../views/lotteryNew/lotteryIndex`], resolve)
    },
    // {
    //   path: '/waitingOrder',
    //   name: 'waitingOrder',
    //   component: (resolve) => require([`../views/lotteryNew/waitingOrder`], resolve)
    // },
    {
      path: '/trend',
      name: 'trend',
      component: (resolve) => require([`../views/trend/trend`], resolve)
    },
    {path: '/Note', name: 'Note', component: ONote},
    {path: '/user', name: 'User', component: OUser},
    {path: '/login', name: 'Login', component: OLogin},
    {path: '/reg', name: 'Register', component: ORegister},
    {path: '/setting', name: 'Setting', component: OSetting},
    {path: '/aboutUs', name: 'AboutUs', component: OAboutUs},
    {
      path: '/agentCenter',
      name: 'AgentCenter',
      component: OAgentCenter
    },
    {
      path: '/introduce',
      name: 'Introduce',
      component: OIntroduce
    },
    {path: '/myCoupon', name: 'MyCoupon', component: OMyCoupon},
    {
      path: '/couponExplain',
      name: 'CouponExplain',
      component: OCouponExplain
    },
    {
      path: '/helpCenter',
      name: 'helpCenter',
      component: helpCenter,
    },
    {
      path: '/playRule',
      name: 'playRule',
      component: playRule
    },
    {
      path: '/securityCenter',
      name: 'SecurityCenter',
      component: OSecurityCenter
    },
    {
      path: '/myBankCard',
      name: 'MyBankCard',
      component: OMyBankCard
    },
    {
      path: '/BankCardData',
      name: 'BankCardData',
      component: OBankCardData
    },
    {
      path: '/setFundsPassword',
      name: 'SetFundsPassword',
      component: OSetFundsPassword
    },
    {
      path: '/changePassword',
      name: 'ChangePassword',
      component: OChangePassword
    },
    {
      path: '/bonusInfo',
      name: 'BonusInfo',
      component: OBonusInfo
    },

    {
      path: '/detailSetting',
      name: 'DetailSetting',
      component: ODetailSetting
    },
    {path: '/feedback', name: 'Feedback', component: OFeedback},
    {
      path: '/depositInterest',
      name: 'DepositInterest',
      component: ODepositInterest
    },
    {
      path: '/instructions',
      name: 'Instructions',
      component: OInstructions
    },
    {
      path: '/depositDetails',
      name: 'DepositDetails',
      component: ODepositDetails
    },
    {
      path: '/accountDetail',
      name: 'AccountDetail',
      component: OAccountDetail
    },
    {
      path: '/rechargeRecord',
      name: 'RechargeRecord',
      component: ORechargeRecord
    },
    {
      path: '/withdrawRecord',
      name: 'WithdrawRecord',
      component: OWithdrawRecord
    },
    {
      path: '/balanceChange',
      name: 'BalanceChange',
      component: OBalanceChange
    },
    {path: '/recharge', name: 'Recharge', component: ORecharge},
    {path: '/bankPay', name: 'BankPay', component: OBankPay},
    {path: '/aliPay', name: 'AliPay', component: OAliPay},
    {
      path: '/rechargeExplain',
      name: 'RechargeExplain',
      component: ORechargeExplain
    },
    {
      path: '/messageList',
      name: 'MessageList',
      component: OMessageList
    },
    {path: '/gameList', name: 'GameList', component: OGameList},
    {path: '/transfer', name: 'Transfer', component: OTransfer},
    {
      path: '/promotions',
      name: 'Promotions',
      component: OPromotions
    },
    {
      path: '/noticeList',
      name: 'NoticeList',
      component: ONoticeList
    },
    {
      path: '/noteHistory',
      name: 'NoteHistory',
      component: ONoteHistory
    },
    {
      path: '/noteHistoryDel',
      name: 'NoteHistoryDel',
      component: ONoteHistoryDel
    },
    // {
    //   path: '/',
    //   name: 'lotteryHall',
    //   component: OlotteryHall,
    //   children: [
    //     {path: 'lhc', name: 'lhc', component: Olhc},
    //     {path: 'k3', name: 'k3 ', component: Ok3},
    //     {path: 'pk10', name: 'pk10', component: Opk10},
    //     {path: 'ssc', name: 'ssc', component: Ossc},
    //     {path: 'pcdd', name: 'pcdd ', component: Opcdd},
    //     {path: '11x5', name: '11x5', component: O11x5},
    //     {path: 'fc3d', name: 'fc3d', component: Ofc3d},
    //     {path: 'bjkl8', name: 'bjkl8', component: Objkl8},
    //     {path: 'gdklsf', name: 'gdklsf', component: Ogdklsf},
    //     {path: 'gxklsf', name: 'gxklsf', component: Ogxklsf},
    //     {
    //       path: 'orderList',
    //       name: 'OrderList',
    //       component: OOrderList
    //     }
    //   ]
    // },
    {
      path: '/myBankInfo',
      name: 'myBankInfo',
      component: OmyBankInfo
    },
    {path: '/withDraw', name: 'withDraw', component: OwithDraw},
    {
      path: '/auditDetails',
      name: 'auditDetails',
      component: OauditDetails
    },
    {
      path: '/explainWithDraw',
      name: 'explainWithDraw',
      component: OexplainWithDraw
    },
    {
      path: '/teamOverView',
      name: 'teamOverView',
      component: OteamOverView
    },
    {
      path: '/enrollmentManagement',
      name: 'enrollmentManagement',
      component: OenrollmentManagement
    },
    {
      path: '/promotionRegistration',
      name: 'promotionRegistration',
      component: OpromotionRegistration
    },
    {path: '/userList', name: 'userList', component: OuserList},
    {
      path: '/applyingForAgency',
      name: 'applyingForAgency',
      component: OapplyingForAgency
    },
    {
      path: '/drawHistory',
      name: 'DrawHistory',
      component: ODrawHistory
    },
    {
      path: '/detailedinformation',
      name: 'detailedinformation',
      component: Odetailedinformation
    },
    {
      path: '/detaileEdit',
      name: 'detaileEdit',
      component: OdetaileEdit
    },
    {
      path: '/addPromoCode',
      name: 'addPromoCode',
      component: OaddPromoCode
    },
    {
      path: '/withdrawalsRecord',
      name: 'withdrawalsRecord',
      component: OwithdrawalsRecord
    },
    {
      path: '/myCollection',
      name: 'myCollection',
      component: OmyCollection
    },
    {path: '/findPwd', name: 'findPwd', component: OfindPwd},
    {path: '/Tendency', name: 'Tendency', component: OTendency},
    {path: '/surplusFund', name: 'surplusFund', component: SurplusFund},
    {path: '/surplusFundDetail', name: 'surplusFundDetail', component: SurplusFundDetail}


  ],
});

export default router;
