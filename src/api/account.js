import axios from '../http' // 导入http中创建的axios实例
import qs from 'querystring'
import md5 from "js-md5"; // 根据需求是否导入qs模块

const account = {
  // 交易类型
  getTransList () {
    return axios.get('api/reportMag/getTransList')
  },
  // 账户明细接口
  queryPageBill (params) {
    return axios.get('api/reportMag/queryPageBill',{params:params})
  },

  // 充值记录
  // personalRechargeOrder (p) {
  //   let str = `?page=${p.page}&rows=${p.rows}&status=${p.status}&dateFrom=${p.dateFrom}&dateTo=${p.dateTo}`
  //   return axios.get(`/api/recharge/personalRechargeOrder${str}`,)
  // },
// 充值记录
  personalRechargeOrder (params) {
    return axios.post('/api/recharge/personalRechargeOrder',qs.stringify(params))
  },
  // 提现记录
  queryPage (params) {
       return axios.post('api/userWithdraw/queryPage',params)

  },
  // 获取充值优惠类型
  queryDiscountTypeList () {
    return axios.post('/api/recharge/queryDiscountTypeList')
  },
  // 获取充值渠道接口
  queryPayTypes () {
    return axios.get('/api/recharge/getPayTypes')
  },
  // 获取公司入款银行转账的具体充值账户
  queryPayAccounts (params) {
    console.log(params);
    // let params.now = new Date().getTime()
    return axios.get('api/recharge/getPayAccounts',{params: params})
  },
  // 获取在线入款 银行卡方式
  queryPayChannels (params) {
    return axios.get('api/recharge/getTpPayChannels',{params:params})
  },
  // 获取支付渠道支付规则接口
  queryRechargeConfig (params) {
    return axios.get('/api/recharge/getRechargeConfig',{params:params})
  },
  // 公司入款提交充值接口
  queryTransfer (params) {
    return axios.post('/api/recharge/transfer', qs.stringify(params))
  },
  //提现接口
  queryAmount (params) {
    return axios.post('/api/userWithdraw/save',qs.stringify(params))
  },
  //稽核详情
  queryWithDrawData(){
    return axios.get('/api/userWithdraw/validWithdraw/queryAll')
  },
  //提现配置接口
  queryExplainWithDraw(){
    return axios.get('/api/userWithdraw/queryOutMoneyIndex')
  },
  //团队总览接口
  queryTeamOverView(params){
    return axios.post('/api/dl/queryTeamRws',qs.stringify(params))
  },
  //用户列表接口
  queryUserList(params){
    // if(params.startDate){
    //   return axios.get(`/api/dl/querySubUsers?page=${params.page}&rows=${params.rows}&subAccount=${params.subAccount}&startDate=${params.startDate}&endDate=${params.endDate}`)
    // } else {
    //   return axios.get(`/api/dl/querySubUsers?page=${params.page}&rows=${params.rows}&subAccount=${params.subAccount}`)
    // }
    //   return axios.post('/api/dl/querySubUsers',qs.stringify(params))
    return axios.get('/api/dl/querySubUsers',{params:params})
  },
  //代理注册管理
  dlAdd(params){
    // params['userInfo.password'] = md5(params['userInfo.password'])
    return axios.post('/api/dl/add', qs.stringify(params))
  },
  //推广注册接口
  promotionRegjst(params){
    return axios.get('/api/spreadInfo/queryPageByAgentId',{params: params})
  },
  //推广注册编辑
  sendDetaleData(params){
    return axios.post('/api/spreadInfo/updateByAgentId',qs.stringify(params))
  },
  //推广注册详情
  getDetale(params){
    console.log(params);
    return axios.get(`api/spreadInfo/getByAgentId?id=${params.id}`)
  },
  //推广页面接口
  getspreadPage(params){
    return axios.get('/api/spreadInfo/spreadTypes',{params: params})
  },
  //新增推广注册
  addSpread(params){
    return axios.post('/api/spreadInfo/createByAgentId',qs.stringify(params))
  },

  //额度转账，获取第三方游戏余额接口
  getTotalBalance(params){
    return axios.post('/api/live/getTotalBalance',qs.stringify(params))
  },
}

export default account
