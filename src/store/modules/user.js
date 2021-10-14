const state = {
  betsNum: 0, // 下注笔数
  token: '',
  userInfo: {},
  testInfo: {},
  extInfo: {}
}

const mutations = {
  SET_NUM: (state, token) => {
    state.betsNum = token
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, data) => {
    localStorage.setItem('userInfo', JSON.stringify(data))
    state.userInfo = data
  },
  SET_LOG_OUT (state, data) {
    state.userInfo = data
  },
  SET_TEST_INFO (state, data) {
    state.userInfo = data
  },
  SET_EXT_INFO: (state, data) => {
    localStorage.setItem('extInfo', JSON.stringify(data))
    state.extInfo = data
  },
  // 页面刷新时防止信息丢失可以掉用本地存储获取用户信息
  initUser (state) {
    let userInfo = localStorage.getItem('userInfo');
    console.log(userInfo,'userInfouserInfouserInfo');
    if (userInfo) {
      state.userInfo = JSON.parse(userInfo)
    }
  },
  clearUser (state) {
    // 清除状态
    state.userInfo = {}
    state.extInfo = {}

    // 清除本地存储
    localStorage.removeItem('userInfo')
    localStorage.removeItem('extInfo')
  }
}

const actions = {
  setTestInfo ({ commit }, data) {
    data.uid = Math.ceil(Math.random() * 10)// 用于 显示试玩用户头像
    commit('SET_TEST_INFO', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
