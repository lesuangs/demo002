let model = 'model'
let tenantCode = `?tenantCode=${model}`;

export const API = {
  GET_GAME_LIST: '/api/live/getPlatfromGameInfo' + tenantCode,
  GET_NAVIGATION: 'v/getPlatFormType' + tenantCode, // 获取首页左侧导航
  GET_OWN_LOTTERY: 'v/getPlatfromLotto', // 当type=6获取自己平台的彩种
  GET_NAVIGATION_CONTENT: 'v/getPlatfromCategory', // 获取点击导航后的内容
  GO_TO_GAME: 'v/getPlatfromCategory',
  GET_SERVICE_INFO: 'v/getSiteInfoList' + tenantCode, // 获取当前网站名称，获取皮肤信息，客服信息
  GET_NOTICE_LIST: 'v/getNoticeList' + tenantCode, // 开奖公告获取
  GET_WINNING_LIST: 'v/lottery/getNoticeWinMessage' + tenantCode, // 获取获奖名单
  GET_SLIDER_LIST: '/v/getShuffling' + tenantCode, // 获取轮播图
  GET_LANGUAGE: '/v/getLanguage' + tenantCode, // 获取语言
  GET_USER_INFO: 'api/user/info', // 获取用户信息
  GET_GAME_URL: '/api/live/getGameUrl',
  GET_ALL_LOTTERY_LIST: '/v/getGameList' + tenantCode, // 获取所有开奖彩种
  GET_ALL_LIVE_GAMES: 'api/live/allLiveGames', // 【导航】获取全部电子游戏
  GET_LIVE_GAME_LIST: 'api/live/qst', // 具体某一个list
  GET_TOTAL_BALANCE: '/api/live/getTotalBalance',//获取第三方游戏余额接口
  TRANSFER_AMOUNT: '/api/live/transferAmount',//提交——平台之间的额度转换
  GET_MESSAGE: '/api/pushMessage/queryPage', // 获取站内消息
  READ_MESSAGE_STATUS: '/api/pushMessage/modifyReadStatus', // 读取状态
  DELETE_MESSAGE: '/api/pushMessage/remove', // 删除信息
  GET_ALL_ACTIVITY: '/v/getAllActivity' + tenantCode, // 所有的活动
  GET_PLAY_CATE: '/v/lottery/getPlayCate' + tenantCode, // 奖金详情
  CREDIT_BETTING: '/api/bet', // 双面盘
  OFFICIAL_BETTING: '/api/bet/betG', // 官方
  GET_LONG_DRAGON: '/v/lottery/getLmcl', // 长龙
  GET_LUZHI: '/v/lottery/luzhi', // 路子
  OPEN_INFO: '/v/lottery/openInfo', // 开奖信息
  GET_TOP_RESULTS: '/v/lottery/getTopResults', // 头部开奖信息
  STATUS: '/api/user/status', // 用户余额和消息
  LOGIN_OUT: '/v/user/logout',//登录退出接口
  LOGIN: '/v/user/login',//登录接口
  REMOVE_BY_AGENT: '/api/spreadInfo/removeByAgentId',//删除推广注册链接接口
  QUERY_PAGE_BY_AGENT: '/api/spreadInfo/queryPageByAgentId',//推广注册列表查询接口
  SPREAD_TYPES: '/api/spreadInfo/spreadTypes',//获取推广注册筛选数据
  GET_ALL_OPEN_INFO: 'v/lottery/allOpenInfo' + tenantCode, // 获取所有开奖信息
  // -----------------
  GET_IMAGE_ADDRESS: '/v/getImageAddress' + tenantCode, // 获取图片地址
  GET_VERIFY_CODE: '/v/vCode' + tenantCode,

  //充值接口
  GET_PAY_TYPES: '/api/recharge/getPayTypes',// 充值分类接口
  GET_PAY_ACCOUNTS: '/api/recharge/getPayAccounts',//获取支付方式接口1
  GET_TP_PAY_CHANNELS: '/api/recharge/getTpPayChannels',////获取支付方式接口2
  TRANSFER: '/api/recharge/transfer',//支付接口
  GET_RECHARGE_CONFIG: '/api/recharge/getRechargeConfig',//金额充值范围

  GET_DL_RANGE: '/api/dl/getDlSubRebateRange',//获取当前登录用户返点层级

  // TIPS:'/data/json/rules/lhc_exam.json'
}
