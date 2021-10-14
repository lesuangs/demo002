/**
 * 注册接口
 */
import axios from '../http' // 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块
import md5 from 'js-md5'

/**
 * @param {Number} time 时间戳
 */

let model = 'model'
let tenantCode = `?tenantCode=${model}`;
const users = {
  // 注册前验证
  getLimit () {
    return axios.get('v/getRegLimit')
  },
  // 验证账号，真实姓名，手机号
  getCheckUnique (val) {
    let params = {
      // type:type,
      val:val,
      tenantCode:'model'

    }
    return axios.get('v/user/checkUnique',{params: params})
  },
  // 注册
  register (params) {
  /*  params.password = md5(params.password)
    params.confirmPassword = md5(params.confirmPassword)*/
    return axios.post('v/user/reg', qs.stringify(params))
  },
  // 登录
  login (params) {
    params.password = md5(params.password)
    return axios.post('v/user/login', qs.stringify(params))
  },
  // 余额
  getMoney () {
    return axios.post('api/user/status',qs.stringify({refresh:1}))
  },
  // 刷新余额接口
  refreshMoney () {
    return axios.post('api/user/status')
  },
  // 退出
  logout () {
    return axios.post('v/user/logout')
  },
  // 试玩
  regTest () {
    return axios.get('v/user/regTest')
  },
  // 修改资金密码
  changeWithdraw (params) {
    return axios.post('/api/user/updateFundPwd', qs.stringify(params))
  },
  // 修改登录密码
  changeLoginPwd (params) {
  /*  params.oldPassword = md5(params.oldPassword)
    params.newPassword = md5(params.newPassword)*/
    return axios.post('/api/user/updatePassword', qs.stringify(params))
  },
  // 银行卡数据接口
  bankCardData (params) {
    return axios.post(`/api/user/modifyUserInfo${tenantCode}`, qs.stringify(params))
  },
  // 获取用户层级接口
  userLevelData () {
    return axios.post('/api/dl/getDlSubRebateRange')
  },
  //用户名唯一校验
  checkUnique (type, val) {
    let params = {
      // type:type,
      val:val,
      tenantCode:'model'
    }
    return axios.get('/v/user/checkUnique',{params: params})
  },
  findPwd(params){
    return axios.post(`/api/userFindPwd/save`,qs.stringify(params))
  }

}

export default users
