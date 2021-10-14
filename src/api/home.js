/**
 * 首页接口
 */
import axios from '../http' // 导入http中创建的axios实例
import qs from 'qs'
// import qs from 'querystring' // 根据需求是否导入qs模块
/**
 * @param {Number} time 时间戳
 */
// 版本号维护 通过json格式后台获取json里面存入版本号
const version = localStorage.getItem('imgSuffix');
let model = 'model'
let tenantCode = `?tenantCode=${model}`;
const home = {
  GET_RECOMMEND_LOTTERY() {
    return axios.get('/v/getPlatfromCategory')
  },
  // 获取导航
  GET_NAVIGATION() {
    return axios.get('v/getPlatFormType', {
      // params: {_t: time}
    })
  },
  // 获取推荐游戏
  getQstPush() {
    let params = {
      page: 1, rows: 20
    }
    return axios.post('api/live/qstPush', qs.stringify(params))
  },
  GET_OWN_LOTTERY() { // 获取自己平台的彩种
    return axios.get('v/getPlatfromLotto', {
      // params: {_t: time}
    })
  },
  version(time) {
    return axios.get('data/json/versions.json', {
      params: {_t: time}
    })
  },
  // 获取所有国际化
  get_lotteryType() {
    return axios.get('v/lottery/getLotteryType', {
      params: {_t: version}
    })
  },
  // 获取所有国际化
  get_lg() {
    return axios.get('/v/getLanguage', {
      params: {_t: version}
    })
  },
  // 获取轮播图
  slider() {
    return axios.get('/v/getShuffling', {
      params: {_t: version}
    })
  },
  // 获取首页显示的游戏
  sportEleLive() {
    return axios.get('/v/getNavigationList', {
      params: {_t: version}
    })
  },
  // 获取所有游戏接口
  getCpGame() {
    return axios.get(`/v/getGameList${tenantCode}`)
  },
  // 六合彩生肖获取
  getLhc() {
    return axios.get('data/json/lhc_sx.json', {
      params: {_t: version}
    })
  },
  // 六合彩配置
  getLhcConfig() {
    return axios.get('/v/lhc/info', {
      params: {_t: version}
    })
  },
  // 信用玩法数据【经典】
  getMarkData(id) {
    /* return axios.get(`/data/json/${id}.json`, {
       params: { _t: version }
     })*/
    return axios.post(`/v/lottery/${id}`, {
      params: {_t: version}
    })
  },
  // 官方玩法数据
  getMarkData1(id) {
    /*return axios.get(`/data/json/official/${id}.json`, {
      params: { _t: version }
    })*/
    return axios.post(`/v/lottery/official/${id}`, {
      params: {_t: version}
    })
  },
  // 信用投注接口【经典】
  bet(params) {
    return axios.post('/api/bet', params)
  },
  // 官方投注接口
  bet_Gf(params) {
    return axios.post('/api/bet/betG', params)
  },
  // 开奖公告获取
  noticeList() {
    return axios.get('v/getNoticeList', {
      params: {_t: version}
    })
  },
  // 获取长龙数据
  getLmcl(gameId) {
    return axios.get(`/v/lottery/getLmcl`, {
      params: {gameId, _t: version}
    })
  },
  getluzhi(gameId) {
    return axios.get(`/v/lottery/luzhi`, {
      params: {gameId, _t: version}
    })
  },
  // 获取中奖榜信息
  getNoticeWinMessage() {
    let params = new Date().getTime()
    return axios.post('v/lottery/getNoticeWinMessage', qs.stringify(params))
  },
  // 获取电子游戏种类
  allLiveGames() {
    return axios.get('api/live/allLiveGames')
  },
  // 获取游戏详情
  getGameList(param) {
    return axios.get('api/live/qst', {
      params: param
    })
  },
  // 进入开元棋牌
  playGame(param) {
    return axios.get('/api/live/lotteryNew', {
      params: param
    })
  },
  //ag视讯
  gameApi(params) {
    return axios.get("/api/live/lotteryNew", {params: params});
  },
  // 获取用户信息
  getUserInfo() {
    return axios.post('api/user/info')
  },

  // 站内短信接口
  queryPage(param) {
    return axios.get('api/pushMessage/queryPage',{params: param})
  },
  // 读站内短信接口
  readStatus(param) {
    return axios.post('api/pushMessage/modifyReadStatus', qs.stringify(param)
    )
  },
  // 删除站内短信接口
  delStatus(param) {
    return axios.post('api/pushMessage/remove', qs.stringify(param))
  },
  // 优惠活动接口
  getPromotions() {
    return axios.get('/v/getAllActivity', {
      params: {_t: version}
    })
  },
  // 获取在线客服
  getService(t) {
    return axios.get('v/getSiteInfoList', {
      params: {_t: t}
    })
  },
  // 获取公告列表
  getNotice() {
    return axios.post('/api/notice/queryAll')
  },
  // 获取彩票开奖数据
  getCp() {
    return axios.get(`v/lottery/allOpenInfo${tenantCode}`)
  },
  // 获取开元注单接口
  getNote(param) {
    return axios.get('/api/live/br', {
      params: param
    })
  },
  // 获取彩票注单接口
  getCpNote(params) {
    return axios.get('/api/cp/records/todayList', {
      params: params
    })
  },
  // 获取彩票历史概要注单接口
  getCpNoteHistory() {
    return axios.get('/api/cp/records/historyDayReport')
  },
  // 获取彩票历史注单接口
  getCpHistory(params) {
    return axios.get('/api/cp/records/historyList', {
      params
    })
  },
  // 彩票撤单
  cancel(params) {
    return axios.post('/api/bet/cancel', qs.stringify(params))
  },
  // 获取银行名字
  getConfigDate() {
    return axios.get('v/getCreateConfig', {
      params: {_t: version}
    })
  },
  // 获取当前开奖
  getNowCp(params) {
    return axios.post('/v/lottery/openInfo', qs.stringify(params))
  },
  // 获取历史开奖记录
  getNowCpHistory(params) {
    return axios.post('/v/lottery/getTopResults', qs.stringify(params))
  },
  //获取玩法说明
  getPlayHelp(_t) {
    return axios.get('/data/json/rules/lhc_js.json', {
      params: {_t}
    })
  },
  //获取玩法提示说明
  getTips(_t) {
    return axios.get('/data/json/rules/lhc_exam.json', {
      params: {_t}
    })
  },
  //获取历史开奖配置
  getOne() {
    return axios.get('/api/config/getOne', {
      params: {
        configName: "system_config",
        configKey: "analysis_api_url",
        _t: (Date.parse(new Date()) / 1000).toString()
      }
    })
  },
  async getTrendList(lotteryid) {
    let {data: {configValue}} = await this.getOne();
    let {data} = await axios.get(`${configValue}/anls-api/data/${lotteryid}/numTrend/100.do`, {
      params: {
        _t: (Date.parse(new Date()) / 1000).toString()
      }
    });
    return data;
  },
  //获取历史开奖数据接口
  getHistoryList(url) {
    return axios.get(url, {
      params: {
        _t: (Date.parse(new Date()) / 1000).toString()
      }
    })
  },
  // 获取玩法
  getPlayIntroduce(val) {
    console.log(val);
    return axios.get(`/data/json/rules/${val}_js.json`)
  },
  getPlayRules(val) {
    console.log(val, '获取玩法');
    return axios.get(`/data/json/rules/${val}.json`)
  },
  //获取平台列表
  getGameMoney() {
    return axios.get(`/api/live/allLiveGames${tenantCode}`);
  },
  //获取各平台余额传参数为平台code
  getBalance(params) {
    return axios.post("/api/live/getBalance", qs.stringify(params));
  },
  //转化余额from=self&to=ky&amount=1323
  getTransfer(params) {
    return axios.post("/api/live/transfer", qs.stringify(params));
  },
  //获取转换历史
  getTransferList(params) {
    return axios.get("/api/reportMag/queryPageBill", {params: params});
  },

  //用户反馈
  getaveHelpMessage(params) {
    return axios.post("/api/pushMessage/saveHelpMessage", (params));
  },


}
export default home
