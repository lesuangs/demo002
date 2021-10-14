const getters = {
  imgSuffix: state => state.home.imgSuffix,
  navList: state => state.home.navList,
  navListBlue: state => state.home.navListBlue,
  navListOrange: state => state.home.navListOrange,
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  testInfo: state => state.user.testInfo,
  lotteryGames: state => state.home.lotteryGames,
  extInfo: state => state.user.extInfo,
  lotteryStatus:state => state.lottery.lotteryStatus,
  lotteryNum:state=> state.lottery.lotteryNum,
  betListAll:state=> state.lottery.betListAll,
  lotteryArr:state=> state.lottery.lotteryArr,
}
export default getters
