const state = {
  lotteryStatus: 0, // 0投注中 3开奖中 1封盘中
  lotteryNum:"",
  betListAll:null, // 投注是数据
  lotteryArr:[0,0,0]//头部菜单选中的数组
}

const mutations = {
  SET_LOTTERY_STATUS: (state, data) => {
    state.lotteryStatus = data
  },
  SET_LOTTERY_NUM: (state,data) =>{
    state.lotteryNum = data
  },
  SET_LOTTERY_ARR: (state,data) =>{
    state.lotteryArr = data
  },
  SET_LOTTERY_BET: (state,data) =>{
    localStorage.setItem('betListAll', data)
    state.betListAll = data
  },
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
