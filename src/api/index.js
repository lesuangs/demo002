/**
 * api接口的统一出口
 */
// 首页模块接口
import home from './home'
import users from './users'
import account from './account'
// 其他模块的接口……

// 导出接口
export default {
  home,
  users,
  account
}
