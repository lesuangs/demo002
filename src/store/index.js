import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import http from '../api/index';
import axios from '../http';
import qs from 'qs'
import {skinMode, defaultOwnLotteryType, imgUrl, LANG, lotteryType} from "../utils/mode";
import {API} from "../api/api_list";
import {sortArray} from "../utils/public.js";
import {formatLottery, _compare} from '../utils/common'
import {Dialog, Toast} from "vant";
import Cookies from 'js-cookie'
import {addClass, removeClass} from '../utils/dom'
import i18n from '../i18n/index'
import {get_ssc_bet} from "../utils/GetSscBet";
import {weiGroupSplit, zx_3fs_3} from "../utils/PaiLieZuHe";

import router from '../router'

Vue.use(Vuex);

const modulesFiles = require.context('./modules', true, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules
}, {});
let uid = localStorage.getItem('uid') !== null ? JSON.parse(localStorage.getItem('uid')) : Math.ceil(Math.random() * 10);
let isLogin = localStorage.getItem('isLogin') !== null ? JSON.parse(localStorage.getItem('isLogin')) : false;
let language = Cookies.get('language') !== undefined ? Cookies.get('language') : LANG.china;
let getAccountType = localStorage.getItem('accountType') !== null ? JSON.parse(localStorage.getItem('accountType')) : '';
let allBonusJson = localStorage.getItem('allBonusJson') !== null ? JSON.parse(localStorage.getItem('allBonusJson')) : [];
let delayTime = 5;
let officialMethod = localStorage.getItem('officialMethod') !== null ? JSON.parse(localStorage.getItem('officialMethod')) : [];
let creditMethod = localStorage.getItem('creditMethod') !== null ? JSON.parse(localStorage.getItem('creditMethod')) : [];
let routerHistory = sessionStorage.getItem('routerHistory') !== null ? JSON.parse(sessionStorage.getItem('routerHistory')) : [];
let getLoginInfo = localStorage.getItem('loginInfo') !== null ? JSON.parse(localStorage.getItem('loginInfo')) : '';
let getUserInfoData = localStorage.getItem('userInfo') !== null ? JSON.parse(localStorage.getItem('userInfo')) : '';
let model = 'model';
let tenantCode = `tenantCode=${model}`;

const store = new Vuex.Store({
  // vincent -- start
  state: {
    skin: 'black', // 默认
    imgAddress: '',
    verifyCodeImg: '',
    // skin: 'gray', // 默认
    lang: language, // 默认语言
    isLogin: isLogin, // 默认没有登录
    accountType: getAccountType, // 用户类型DL,HY,从login接口取，不是在info
    currentRoute: {}, // app.vue返回的当前路由
    serviceInfo: {}, // 首页客户信息，公告，平台名称
    noticeList: [], // 首页公告信息
    winningList: [], // 获奖名单
    sliderList: [], // 轮播图list
    allActivityList: [], // 活动详情
    threeGameList: [],
    threeGameId: -1,
    threeGameUrl: '', // 获取第三方游戏链接
    distThreeImgUrl: imgUrl.threeGame,
    openConfigUrl: '', // 开奖地址
    navigationList: {}, // 导航的title list
    navigationContent: [], // 导航内容
    navigationIndexType: defaultOwnLotteryType, // ownLottery
    navigationIsLoading: false,
    token: '',
    // lottery -- start
    openInfo: null,
    topResultList: [],
    allLotteryTypeList: null, // 【大厅】所有彩种
    lotteryId: -1,
    currentLotteryInfo: null,
    officialMethod: officialMethod,
    creditMethod: creditMethod,
    menuList: [], // 某一彩种的所有菜单
    methodTitle: null,
    currentMethodInfo: null,
    currentTurnNum: null,
    betCount: 0, // 当前注数
    creditSelectArr: [], // 当前双面盘选择的number
    officialSelectArr: [],
    multiple_common: 1,
    tabsIndex: 0, // 选号区的tabs【11x5，lhc,fc3d】
    checkGroup_common: ["0", "1", "2", "3", "4"],
    unitMoney: 2,
    currentRebate: 0, // 赔率
    basketList: [], // 购彩篮
    isShowBasket: false,
    loop_timer: null, // 循环时间器
    luZhiData: [],
    longDragonData: [],
    // lottery -- end

    allLiveGame: '', // 电子【游戏大厅】
    currentGameList: null,
    messageList: [],
    // user-center -- start
    userInformation: getUserInfoData,
    extInformation: '',
    userBank: '',
    balance: null, // 用户余额
    allBonusJson: allBonusJson,
    currentBonusJson: {},
    // user-center -- end
    trendData: null, // 走势图数据
    timer: null,//获取token的定时器
    promotionRegList: null,//推广注册列表查询接口
    spreadTypesList: null,////获取推广注册筛选数据
    routerHistory: routerHistory,
    lotteryHellIndex: 0, // 购彩大厅index
    loginInfo: getLoginInfo,//用户登录后的信息
    payAccount: [],//获取支付方式接口1
    tppayAccount: [],//获取支付方式接口2
    rechargeConfig: null,//金额充值范围
    dlRange:null,//返点
    configValue:null,
  },
  mutations: {
    ['SET_DATA'](state, {key, value}) {
      state[key] = value
    },
  },
  actions: {
    checkIsLogin({dispatch, commit, state}) {
      state.timer = setInterval(() => {
        let token = Cookies.get('token');
        commit('SET_DATA', {key: 'token', value: token});
        if (!state.token) {
          dispatch('loginOut');
          Dialog.confirm({
            title: i18n.t('lang.lottery.dialog.title'),
            message: i18n.t('lang.loginContent.loginTimeout'),

            showCancelButton: false,
            confirmButtonText: i18n.t('lang.common.determine'),
          }).then(() => {
            router.push('/login');
          });
        }
      }, 3000);
    },

    //登录接口
    login({dispatch, commit, state}, params) {
      return new Promise((resolve, reject) => {
        axios.post(API.LOGIN, qs.stringify(params)).then((_data) => {
          if (_data.code === 200) {
            let data = _data.data
            let token = Cookies.set('token', data.accessToken);
            commit('SET_DATA', {key: 'isLogin', value: true});
            // localStorage.setItem('token', _data.data.token);
            localStorage.setItem('isLogin', JSON.stringify(true));
            localStorage.setItem('loginInfo', JSON.stringify(_data.data));
            commit('SET_DATA', {key: 'loginInfo', value: _data.data});
            localStorage.setItem('accountType', JSON.stringify(_data.data.isDl));//用户状态，是否代理或者会员
            // commit('SET_DATA', {key: 'isDl', value: _data.data.type});
            commit('SET_DATA', {key: 'accountType', value: _data.data.isDl});
            dispatch('getUserInfo');
            dispatch('getStatus');
            dispatch('checkIsLogin');
            router.push('/user');
            resolve(true)
          } else {
            reject(false)
          }
        }).catch((err) => {
          reject(err);
        })
      })
    },
    //登录退出接口
    loginOut({dispatch, commit, state}) {
      return new Promise((resolve, reject) => {
        axios.post(API.LOGIN_OUT).then((_data) => {
          if (_data.code === 200) {
            commit('SET_DATA', {key: 'isLogin', value: false});
            localStorage.setItem('isLogin', JSON.stringify(false));
            localStorage.removeItem('loginInfo');
            localStorage.removeItem('accountType');
            // window.localStorage.removeItem('token');
            clearInterval(state.timer);
            resolve(true)
          } else {
            reject(false)
          }
        }).catch((err) => {
          reject(err);

        })
      })
    },
    //推广注册列表查询接口
    getPromotionReg({commit, state}, params) {
      //commit('SET_DATA', {key: 'promotionRegList', value: null});//先置空，预防接口返回慢；
      return new Promise((resolve, reject) => {
        axios.get(API.QUERY_PAGE_BY_AGENT, {params: params}).then((_data) => {
          if (_data.status === 200) {
            // console.log(_data.data, 7777)
            let fullPath = 'http://' + window.location.host;
            _data.data.data.map((value, index) => {
              value.copyUrl = fullPath + '/reg?' + value.code;//此处是填pc端的注册页面路由地址
              value.qrCodeUrl = `/api/qrcode?content=` + fullPath + '/reg?' + value.code;//二维码地址，此处应该是填h5的注册页面的路由地址；
              // value.qrCodeUrl = `/api/qrcode?content=` + fullPath + `/views/html/register.html?` + value.code;
            });
            commit('SET_DATA', {key: 'promotionRegList', value: _data.data});
            resolve(true)
          } else {
            reject(false)
          }
        }).catch((err) => {
          reject(err);
        })
      })
    },
    //推广注册列表查询接口
    getSpreadTypes({commit, state}) {
      return new Promise((resolve, reject) => {
        axios.get(API.SPREAD_TYPES).then((_data) => {
          if (_data.code === 200) {
            commit('SET_DATA', {key: 'spreadTypesList', value: _data.data});
            resolve(true)
          } else {
            reject(false)
          }
        }).catch((err) => {
          reject(err);
        })
      })
    },
    //删除推广注册链接接口
    removeByAgent({commit, state}, params) {
      return new Promise((resolve, reject) => {
        axios.post(API.REMOVE_BY_AGENT, params).then((_data) => {
          if (_data.code === 200) {
            resolve(true)
          } else {
            reject(false)
          }
        }).catch((err) => {
          reject(err);
        })
      })
    },
    // lottery-hall -- start

    // 获取所有的彩种
    getAllLotteryList({commit, dispatch, state}) {
      return new Promise((resolve, reject) => {
        if (state.allLotteryTypeList === '' || state.allLotteryTypeList === null) {
          axios.get(API.GET_ALL_LOTTERY_LIST).then((_data) => {

            if (_data.code === 200) {
              // let list = formatLottery(_data.data);
              let {category, searchLotteryList} = formatLottery(_data.data);
              console.log(category,'category1111111111')
              // console.log(searchLotteryList,'searchLotteryList1111111111')
              commit('SET_DATA', {key: 'allLotteryTypeList', value: category});
              commit('SET_DATA', {key: 'searchLotteryList', value: searchLotteryList});
              // commit('SET_DATA', {key: 'allLotteryTypeList', value: list});
              resolve(category);
            } else {
              reject(_data)
            }
          }).catch((err) => {
            setTimeout(() => {
              dispatch('getAllLotteryList')
            }, 1000 * delayTime)
          })
        } else {
          resolve(state.allLotteryTypeList);
        }
      })

    },
    getAllOpenInfo({commit, dispatch, state}) {
      return new Promise((resolve, reject) => {
        axios.get(API.GET_ALL_OPEN_INFO).then((_data) => {
          if (_data.code === 200) {
            resolve(_data.data)
          }
        })
      })
    },
    // 彩票大厅->电子
    _getLiveGameList({commit, dispatch, state}, params) {
      return new Promise((resolve, reject) => {
        axios.get(API.GET_LIVE_GAME_LIST, {params}).then((_data) => {
          if (_data.status === 200) {
            let data = _data.data;
            let category = state.allLiveGame;
            let code = params.liveCode;
            let page = params.page;
            let currentCategoryItem = null;
            for (let i = 0; i < category.length; i++) { // 拿到数据之后，for把它放回去
              let item = category[i];
              if (item.code === code) {
                if (category[i].content !== undefined && category[i].content.length > 0) {
                  let arr = category[i].content
                  let newArr = arr.concat(data.data);
                  category[i].content = newArr;
                  category[i].page = page;
                  category[i].totalCount = data.totalCount
                } else {
                  category[i].content = data.data;
                  category[i].page = page;
                  category[i].totalCount = data.totalCount
                }
                currentCategoryItem = category[i];
                commit('SET_DATA', {key: 'currentGameList', value: JSON.parse(JSON.stringify(category[i]))});
                commit('SET_DATA', {key: 'allLiveGame', value: category});
                resolve(category[i]);
                break;
              }
            }
          }
        })
      })
    },
    _clearInGameList({commit, state}, params) {
      return new Promise((resolve, reject) => {
        let category = state.allLiveGame;
        let code = params.liveCode;
        let page = params.page;
        for (let i = 0; i < category.length; i++) { // 拿到数据之后，for把它放回去
          let item = category[i];
          if (item.code === code) {
            if (category[i].content !== undefined && category[i].content.length > 0) {
              category[i].content = [];
              category[i].page = page;
            } else {
              category[i].content = [];
              category[i].page = page;
            }
            commit('SET_DATA', {key: 'currentGameList', value: category[i]});
            commit('SET_DATA', {key: 'allLiveGame', value: category});
            resolve(category[i]);
            break;
          }
        }
      })
    },
    _searchInGameList({commit, dispatch, state}, params) {
      return new Promise((resolve, reject) => {
        let category = state.allLiveGame;
        let code = params.liveCode;
        let currentCategoryItem = null;
        for (let i = 0; i < category.length; i++) {
          let item = category[i];
          if (item.code === code) { // 当前的code
            if (category[i].content !== undefined && category[i].content.length >= 0) { // 已经调过接口
              currentCategoryItem = category[i];
              commit('SET_DATA', {key: 'currentGameList', value: category[i]});
              commit('SET_DATA', {key: 'allLiveGame', value: category});
              resolve(category[i]);
            } else { // 没有，就去调过接口
              resolve(dispatch('_getLiveGameList', params));
            }
            break;
          }
        }
      })

    },
    // 电子页面导航
    getAllLiveGame({commit, dispatch, state}) {
      return new Promise((resolve, reject) => {
        if (state.allLiveGame.length > 0) {
          resolve(state.allLiveGame);
        } else {
          axios.get(API.GET_ALL_LIVE_GAMES).then((_data) => {
            if (_data.status === 200) {
              if (_data.data.length > 0) {
                commit('SET_DATA', {key: 'allLiveGame', value: _data.data})
                Vue.nextTick(() => {
                  resolve(_data.data);
                })
              }
            }
          }).catch((err) => {
            setTimeout(() => {
              dispatch('getAllLiveGame')
            }, 1000 * delayTime)
          })
        }
      })
    },
    // lottery-hall -- end

    // 获取第三方游戏link
    getGameUrl({commit, dispatch, state}, params) {
      return new Promise((resolve, reject) => {
        if (state.isLogin) {
          // let str = obj2cookie(params);
          // str = str.replace('{', '').replace('}', '').replace(':', '=').replace(',', '&');
          // console.log(str, 'ppp');
          axios.get(API.GET_GAME_URL, {params}).then((_data) => {
            console.log(_data.data.data.url, 'uuullll');
            let data = _data.data;
            if (data.code === 200) {
              if (data.data.url !== '' || data.data.url !== null) {
                let url = data.data.url;
                commit('SET_DATA', {key: 'threeGameUrl', value: url})
                resolve(url)
              }
            } else {
              resolve(_data.msg)
            }
          }).catch((err) => {
            setTimeout(() => {
              dispatch('getGameUrl')
            }, 1000 * delayTime)

          })
        } else {
          Toast.fail('请先登录！');
        }
      })

    },
    // 获取语言
    getLanguage({commit, state}) {
      axios.get(API.GET_LANGUAGE).then((_data) => {
        // console.log(_data.data, 'datatata');
        let data = _data.data;
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].type === LANG.china) {
              commit('SET_DATA', {key: 'lang', value: LANG.china});
              return
            }
          }
          commit('SET_DATA', {key: 'lang', value: LANG.china});
        }
      });
    },
    // 获取用户信息
    getUserInfo({commit, state}) {
      if (state.isLogin) {
        return new Promise((resolve, reject) => {
          axios.post(API.GET_USER_INFO).then((_data) => {
            if (_data.code === 200) {
              resolve(true)
              let data = _data.data;
              data.userInfo.uid = uid // 用于 显示试玩用户头像
              // console.log(data, 'user_info--------vuex');
              localStorage.setItem('uid', JSON.stringify(uid));
              localStorage.setItem('userInfo', JSON.stringify(data.userInfo));
              localStorage.setItem('accountType', JSON.stringify(data.userInfo.isDl));//用户状态，是否代理或者会员
              commit('SET_DATA', {key: 'accountType', value: data.userInfo.isDl});
              commit('SET_DATA', {key: 'userInformation', value: data.userInfo});
              commit('SET_DATA', {key: 'extInformation', value: data.extInfo});
              commit('SET_DATA', {key: 'userBank', value: data.userBank});
            } else {
              reject(false)
            }
          }).catch((err) => {
            reject(err);
          })
        });

      }
    },
    //获取历史开奖配置
    getOpenConfig({commit, dispatch, state}) {
      return new Promise((resolve, reject) => {
        if (state.openConfigUrl !== '') {
          resolve(state.openConfigUrl)
        } else {
          axios.get('/api/config/getOne', {
            params: {
              configName: "system_config",
              configKey: "analysis_api_url",
              _t: (Date.parse(new Date()) / 1000).toString()
            }
          }).then((_data) => {
            let config = _data.data.configValue
            commit('SET_DATA', {key: 'openConfigUrl', value: config});
            Vue.nextTick(() => {
              resolve(config)
            })
          }).catch((err) => {
            setTimeout(() => {
              dispatch('getOpenConfig')
            }, 1000 * delayTime)
          })
        }
      })
    },
    // 走势图
    getTrendData({commit, dispatch, state}, lotteryId) {
      return new Promise((resolve, reject) => {
        if (state.openConfigUrl !== '') {
          axios.get(`${state.openConfigUrl}/anls-api/data/${lotteryId}/numTrend/100.do`, {
            params: {_t: (Date.parse(new Date()) / 1000).toString()}
          }).then((_data) => {
            if (_data.status === 200) {
              commit('SET_DATA', {key: 'trendData', value: _data.data})
              resolve(_data.data);
            }
          }).catch((err) => {
            // setTimeout(() => {
            //   dispatch('getTrendData', lotteryId)
            // }, 1000 * delayTime)
          })
        } else {
          resolve(dispatch('getOpenConfig').then(() => {
            return dispatch('getTrendData', lotteryId)
          }))
        }
      })
    },
    // 开奖历史
    getDrawHistory({commit, dispatch, state}, item) {
      console.log(item, 'item---history');
      return new Promise((resolve, reject) => {
        if (state.openConfigUrl !== '') {
          let isJs = (1 === item.jsType) ? '/js' : ''
          axios.get(`${state.openConfigUrl + isJs}/anls-api/data/${item.code}/lotteryList/100.do`).then((_data) => {
            if (_data.status === 200) {
              commit('SET_DATA', {key: 'trendData', value: _data.data})
              console.log(_data.data, 'getDrawHistory');
              resolve(_data.data);
            }
          }).catch((err) => {
            setTimeout(() => {
              dispatch('getDrawHistory', item)
            }, 1000 * delayTime)
          })
        } else {
          resolve(dispatch('getOpenConfig').then(() => {
            dispatch('getDrawHistory', item)
          }))
        }
      })
    },
    // 获取中奖名单
    getWinningList({commit, dispatch, state}, params) {
      // state.winningList = [];
      return new Promise((resolve, reject) => {
        axios.get(API.GET_WINNING_LIST, {params}).then((_data) => {
          // console.log(_data.data, 'getWinningList');
          let arr = JSON.parse(JSON.stringify(_data.data));
          commit('SET_DATA', {key: 'winningList', value: arr});
        }).catch((err) => {
          setTimeout(() => {
            dispatch('getWinningList')
          }, 1000 * delayTime)
        })
      });
    },
    // 获取轮播图
    getSliderList({commit, dispatch, state}) {
      if (state.sliderList.length > 0) {
        return state.sliderList
      } else {
        axios.get(API.GET_SLIDER_LIST).then((_data) => {
          let data = _data.data;
          commit('SET_DATA', {key: 'sliderList', value: data});
          Vue.nextTick(() => {
            return state.sliderList
          })
        }).catch(() => {
          setTimeout(() => {
            dispatch('getSliderList')
          }, 1000 * delayTime)
        })
      }

    },
    // 开奖公告获取
    getNoticeList({commit, dispatch, state}) {
      if (state.noticeList.length > 0) {
        return state.noticeList
      } else {
        axios.get(API.GET_NOTICE_LIST).then((_data) => {
          // console.log(_data.data, 'getNoticeListgetNoticeList');
          let arr = JSON.parse(JSON.stringify(_data.data));
          // console.log(arr, 'noticeListssssss')
          commit('SET_DATA', {key: 'noticeList', value: arr});
          Vue.nextTick(() => {
            return state.noticeList
          })
        }).catch(() => {
          setTimeout(() => {
            dispatch('getNoticeList')
          }, 1000 * delayTime)
        })
      }
    },
    // 说有活动内容
    getAllActivity({commit, dispatch, state}) {
      return new Promise((resolve, reject) => {
        if (state.allActivityList.length > 0) {
          resolve(state.allActivityList)
        } else {
          axios.get(API.GET_ALL_ACTIVITY).then((_data) => {
            console.log(_data, 'GET_ALL_ACTIVITY');
            if (_data.code === 200) {
              commit('SET_DATA', {key: 'allActivityList', value: _data.data})
              resolve(_data.data)
            }
          }).catch((err) => {
            setTimeout(() => {
              dispatch('getAllActivity')
            }, 1000 * delayTime)
          })
        }
      })
    },

    // 当切换语言之后，需要重新调接口的数据全部放到下面去。
    changeLangResetPost({dispatch, commit, state}) {
      dispatch('getNavigation'); // 首页导航重新获取；
      commit('SET_DATA', {key: 'noticeList', value: []}); // 先将数据清空再重新调取
      // commit('SET_DATA', {key: 'allLotteryTypeList', value: null});
      commit('SET_DATA', {key: 'allActivityList', value: []});
      Vue.nextTick(() => {
        dispatch('getNoticeList'); // 首页公告
        // dispatch('getAllActivity')
      })

    },
    // gameList页面的数据接口
    getGameList({commit, dispatch, state}, params) {
      return new Promise((resolve, reject) => {
        // let data = obj2cookie(params)
        // let p = {category: id, isH5: 0}
        axios.get(API.GET_GAME_LIST, {params}).then((_data) => {
          let data = _data.data;
          if (data.data.length > 0) {
            let list = state.threeGameList.concat(data.data);
            // console.log(list, 'gamelist');
            commit('SET_DATA', {key: 'threeGameList', value: list});
            resolve(data)
          }
        }, (err) => {
          reject(err)
        }).catch((err) => {
          setTimeout(() => {
            dispatch('getGameList',params)
          }, 1000 * delayTime)
        })
      })

    },
    // 获取自己平台推荐彩种
    getIndexOwnLottery({commit, state}) {
      commit('SET_DATA', {key: 'navigationIsLoading', value: true});
      axios.get(API.GET_OWN_LOTTERY).then((_data) => {
        // state.indexOwnLottery = _data.data;
        Vue.nextTick(() => {
          let list = state.navigationList;
          for (let i = 0; i < list.length; i++) {
            if (list[i].type === defaultOwnLotteryType) {
              list[i].content = _data.data;
              break;
            }
          }
          let arr = JSON.parse(JSON.stringify(list));
          commit('SET_DATA', {key: 'navigationList', value: arr});
          Vue.nextTick(() => {
            commit('SET_DATA', {key: 'navigationIsLoading', value: false});
          })
        })
      }).catch((err) => {
        commit('SET_DATA', {key: 'navigationIsLoading', value: false});
      })
    },
    // 获取导航
    getNavigation({dispatch, commit, state}) { // 导航title
      axios.get(API.GET_NAVIGATION).then((_data) => {
        // state.navigationList = _data.data;
        console.log(_data, 'GET_NAVIGATION');
        if (_data.code === 200) {
          let list = _data.data;
          list.sort(_compare('sort', true)); // 排序
          // let index = list.findIndex((item) => {
          //   return item.type === defaultOwnLotteryType
          // });
          // list.splice(index, 1);
          commit('SET_DATA', {key: 'navigationList', value: JSON.parse(JSON.stringify(list))});
          let type = Number(list[0].type);
          commit('SET_DATA', {key: 'navigationIndexType', value: type}); // 重置type

          // if (type !== defaultOwnLotteryType) { // 如果首项不是6，
          //   dispatch('getNavigationContent', {type: type});
          //   // commit('SET_DATA', {key: 'threeGameList', value: _data.data});
          // }
          // // 寻找是否有type为6的
          // for (let i = 0; i < list.length; i++) {
          //   let item = list[i];
          //   if (Number(item.type) === defaultOwnLotteryType) { // type为6调用ownLottery
          //     dispatch('getIndexOwnLottery');
          //   }
          // }
        }
      }).catch((err) => {
        console.log('getNavigation报错');
        setTimeout(() => {
          dispatch('getNavigation'); // 重新获取
        }, 1000 * delayTime)
      });
    },
    // 点击获取导航内容
    getNavigationContent({commit, state}, {type}) { // 导航内容
      axios.get(API.GET_NAVIGATION_CONTENT + '?type=' + type).then((_data) => {
        // console.log(_data, 'getNavigationContent');
        state.navigationContent = _data.data;
        let navList = state.navigationList;
        for (let i = 0; i < navList.length; i++) {
          let item = navList[i];
          if (Number(type) === Number(item.type)) {
            navList[i].content = _data.data;
            break;
          }
        }
        // console.log(navList,'重置数据');
        let arr = JSON.parse(JSON.stringify(navList));
        Vue.nextTick(() => {
          commit('SET_DATA', {key: 'navigationList', value: arr});
          commit('SET_DATA', {key: 'navigationIsLoading', value: false});
        });
      }).catch((err) => {
        commit('SET_DATA', {key: 'navigationIsLoading', value: false});
      })
    },
    // 获取皮肤信息，客服信息
    getServiceInfo({dispatch, commit, state}) {
      axios.get(API.GET_SERVICE_INFO).then((_data) => {
        let data = _data.data;
        let color = null;
        for (let key in skinMode) { // 这里对skin做一层映射。
          if (skinMode[key] === data[0].colors) {
            // state.skin = key;
            color = key;
            break;
          }
        }
        if (color !== null) { // 如果有color就获取当前color；
          let className = document.body.className;
          let classArr = className.split(' ');
          for (let item of classArr) {
            if (item.indexOf('skin') !== -1) {
              removeClass(document.body, item);
            }
          }
          commit('SET_DATA', {key: 'skin', value: color});
          addClass(document.body, `skin-${color}`);
        } else { // 如果没有就用默认值
          addClass(document.body, `skin-${state.skin}`);
        }
        state.serviceInfo = data[0];
      }).catch((err) => {
        setTimeout(() => {
          dispatch('getServiceInfo')
        }, 1000 * delayTime)
      })
    },

    // 获取站内消息
    getAllMessage({state, commit}, params) {
      return new Promise((resolve, reject) => {
        axios.post(API.GET_MESSAGE, qs.stringify(params)).then((_data) => {
          if (_data.status === 200) {
            let data = _data.data;
            if (data.data.length > 0) {
              let list = state.messageList.concat(data.data);
              commit('SET_DATA', {key: 'messageList', value: list});
              resolve(data)
            }
          }
        }, (err) => {
          reject(err)
        });
      })

    },
    readMessage({commit}, params) {
      return new Promise((resolve, reject) => {
        axios.get(API.READ_MESSAGE_STATUS, {params:params}).then((_data) => {
          resolve(_data.data)
        })
      })
    },
    deleteMessage({commit}, params) {
      return new Promise((resolve, reject) => {
        axios.get(API.DELETE_MESSAGE, {params:params}).then((_data) => {
          resolve(_data.data)
        })
      })
    },
    // 获取奖金详情
    hasBonusItem({commit, dispatch, state}, id) {
      return new Promise((resolve, reject) => {
        let jsonList = state.allBonusJson;
        // console.log(id, jsonList, 'jsonListjsonList');
        if (jsonList.length > 0) {
          let isHad = false;
          for (let i = 0; i < jsonList.length; i++) {
            let item = jsonList[i];
            if (Number(item.id) === id.gameId) {
              isHad = true;
              commit('SET_DATA', {key: 'currentBonusJson', value: item})
              break
            }
          }
          Vue.nextTick(() => {
            if (isHad) { // 有
              resolve(state.currentBonusJson)
            } else { // 没有，就调接口
              resolve(dispatch('_getBonusDetails', id));
            }
          })
        } else {
          resolve(dispatch('_getBonusDetails', id));
        }
      })
    },
    _getBonusDetails({commit, state}, params) {
      return new Promise((resolve, reject) => {
        axios.get(API.GET_PLAY_CATE, {params}).then((_data) => {
          if (_data.code === 200) {
            let obj = {
              id: params.gameId,
              content: _data.data
            };
            let jsonList = state.allBonusJson;
            jsonList.push(obj);
            commit('SET_DATA', {key: 'allBonusJson', value: jsonList}); // 保持所有的json
            localStorage.setItem('allBonusJson', JSON.stringify(jsonList));
            commit('SET_DATA', {key: 'currentBonusJson', value: obj}); // 设置当前的json
            resolve(obj);
          }
        }, (err) => {
          reject(err)
        });
      })
    },
    // _getBonusDetails({commit, state}, id) {
    //   //  奖金详情：此方法是读json的，后面改成读接口了：GET_PLAY_CATE
    //   return new Promise((resolve, reject) => {
    //     axios.get(`/data/json/${id}.json`).then((_data) => {
    //       if (_data.status === 200) {
    //         let obj = {
    //           id: id,
    //           content: _data.data
    //         };
    //         let jsonList = state.allBonusJson;
    //         jsonList.push(obj);
    //         commit('SET_DATA', {key: 'allBonusJson', value: jsonList}); // 保持所有的json
    //         localStorage.setItem('allBonusJson', JSON.stringify(jsonList));
    //         commit('SET_DATA', {key: 'currentBonusJson', value: obj}); // 设置当前的json
    //         console.log(obj, 'getBonusDetails---vuex');
    //         resolve(obj);
    //       }
    //     })
    //   })
    // },
    // 循环调取
    loopStatus({commit, dispatch, state}) {
      state.loop_timer = setInterval(() => {
        if (state.isLogin) {
          dispatch('getStatus');
        }
      }, 1000 * 30)
    },
    getStatus({commit, dispatch}) {
      return new Promise((resolve, reject) => {
        axios.post(API.STATUS, qs.stringify({refresh: 1})).then((_data) => {
          if (_data.code === 200) {
            commit('SET_DATA', {key: 'balance', value: _data.data.money});
            commit('SET_DATA', {key: 'isLogin', value: true});
            localStorage.setItem('isLogin', JSON.stringify(true));
            resolve(true);
          } else {
            commit('SET_DATA', {key: 'isLogin', value: false})
            localStorage.setItem('isLogin', JSON.stringify(false));
            resolve(false);
          }
        }, () => {
          commit('SET_DATA', {key: 'isLogin', value: false})
          localStorage.setItem('isLogin', JSON.stringify(false));
          resolve(false);
        })
      })

    },
    // 投注 -- start
    getOfficialMethod({commit, dispatch, state}, id) { // 官方的数据
      return new Promise((resolve, reject) => {
        let method = state.officialMethod;
        let hasData = false;
        if (method.length > 0) {
          for (let i = 0; i < method.length; i++) {
            let item = method[i];
            if (Number(item.id) === Number(id)) {
              hasData = true;
              resolve(item.data);
            }
          }
        }
        if (!hasData) { // 从local中找不到，去调接口
          axios.post(`/v/lottery/official/${id}?gameId=${id}&&tenantCode=model`).then((_data) => {
            if (_data.code === 200) {
              let obj = {
                id: Number(id),
                data: _data.data
              }
              method.push(obj);
              commit('SET_DATA', {key: 'officialMethod', value: method});
              localStorage.setItem('officialMethod', JSON.stringify(method));
              resolve(_data.data)
            }
          }).catch((err) => {
            setTimeout(() => {
              resolve(dispatch('getOfficialMethod', id))
            }, 1000 * delayTime)
          });
        }
      })
    },
    getCreditMethod({commit, dispatch, state}, id) {
      return new Promise((resolve, reject) => {
        let method = state.creditMethod;
        let hasData = false;
        if (method.length > 0) {
          for (let i = 0; i < method.length; i++) {
            let item = method[i];
            if (Number(item.id) === Number(id)) {
              hasData = true;
              resolve(item.data);
            }
          }
        }
        if (!hasData) { // 从local中找不到，去调接口
          axios.get(`/v/lottery/${id}?gameId=${id}&tenantCode=model`).then((_data) => {
            if (_data.code === 200) {
              let obj = {
                id: Number(id),
                data: _data.data
              }
              method.push(obj);
              commit('SET_DATA', {key: 'creditMethod', value: method});
              localStorage.setItem('creditMethod', JSON.stringify(method));
              resolve(_data.data)
            }
          }).catch((err) => {
            setTimeout(() => {
              resolve(dispatch('getCreditMethod', id));
            }, 1000 * delayTime)
          });
        }
      })
    },
    _getCurrentLotteryInfo({commit, dispatch, state}, id) {
      return new Promise((resolve, reject) => {
        if (state.allLotteryTypeList) {
          console.log('_getCurrentLotteryInfo',state)
          let list = state.allLotteryTypeList[0].list;
          for (let i = 0; i < list.length; i++) {
            let item = list[i]
            if (Number(item.id) === Number(id)) {
              commit('SET_DATA', {key: 'currentLotteryInfo', value: item});
              resolve(item);
            }
          }
        } else {
          resolve(dispatch('getAllLotteryList').then(() => {
            return dispatch('_getCurrentLotteryInfo', id)
          }))
        }
      })
    },
    getTopResult({commit, dispatch, state}, params) {

      axios.get(API.GET_TOP_RESULTS, {params: params}).then((_data) => {
        if (_data.code === 200) {
          commit('SET_DATA', {key: 'topResultList', value: _data.data});
        }
      })
    },
    getOpenInfo({commit, dispatch, state}, params) {

      axios.get(API.OPEN_INFO, {params: params}).then((_data) => {
        if (_data.code === 200) {
          commit('SET_DATA', {key: 'openInfo', value: _data.data});
        }
      })
    },
    creditBetting({commit, dispatch, state}, params) {
      return new Promise((resolve, reject) => {
        axios.post(API.CREDIT_BETTING, params).then((_data) => {
          resolve(_data);
        })
      })
    },
    officialBetting({commit, dispatch, state}, params) {
      return new Promise((resolve, reject) => {
        axios.post(API.OFFICIAL_BETTING, params).then((_data) => {
          resolve(_data);
        })
      })
    },
    initData({commit, dispatch, state}) {
      commit('SET_DATA', {key: 'betCount', value: 0});
      commit('SET_DATA', {key: 'creditSelectArr', value: []});
      commit('SET_DATA', {key: 'officialSelectArr', value: []});
      commit('SET_DATA', {key: 'currentRebate', value: 0});
      commit('SET_DATA', {key: 'checkGroup_common', value: ["0", "1", "2", "3", "4"]});
      let methodInfo = state.currentMethodInfo; // 将当前的选择的数据全部置为false；
      if (methodInfo.isOfficial) { // 官方
        if (lotteryType.ssc === state.currentLotteryInfo.type) {
          for (let i = 0; i < methodInfo.children.length; i++) {
            let firstItem = methodInfo.children[i];
            if (firstItem.detail.length > 0) {
              for (let n = 0; n < firstItem.detail.length; n++) {
                let secondItem = firstItem.detail[n];
                secondItem.selected = false;
              }
            }
          }
        }
        else if (lotteryType.k3 === state.currentLotteryInfo.type) {
          for (let i = 0; i < methodInfo.detail.length; i++) {
            let firstItem = methodInfo.detail[i];
            for (let n = 0; n < firstItem.detail.length; n++) {
              methodInfo.detail[i].detail[n].selected = false;
            }
          }
        }
        else if (lotteryType.pk10 === state.currentLotteryInfo.type) {
          for (let i = 0; i < methodInfo.detail.length; i++) {
            let firstItem = methodInfo.detail[i];
            for (let n = 0; n < firstItem.detail.length; n++) {
              methodInfo.detail[i].detail[n].selected = false;
            }
          }
        }
        else if (lotteryType.eleven5 === state.currentLotteryInfo.type) {
          for (let i = 0; i < methodInfo.detail.length; i++) {
            let firstItem = methodInfo.detail[i];
            for (let n = 0; n < firstItem.detail.length; n++) {
              methodInfo.detail[i].detail[n].selected = false;
            }
          }
        }
        else if ([lotteryType.fc3d, lotteryType.bjkl8].includes(state.currentLotteryInfo.type)) {
          for (let i = 0; i < methodInfo.rows.length; i++) {
            let rows = methodInfo.rows[i];
            for (let n = 0; n < rows.content.length; n++) {
              let content = rows.content[n];
              if (content.arr && content.arr.length > 0) { // 以防从单式转到选号
                for (let m = 0; m < content.arr.length; m++) {
                  methodInfo.rows[i].content[n].arr[m].selected = false;
                }
              }

            }
          }
        }
      }
      // 信用【双面盘】
      else { // 双面盘
        if (lotteryType.ssc === state.currentLotteryInfo.type) {
          for (let i = 0; i < methodInfo.children.length; i++) {
            let firstItem = methodInfo.children[i];
            if (firstItem.children.length > 0) {
              for (let n = 0; n < firstItem.children.length; n++) {
                let secondItem = firstItem.children[n];
                secondItem.selected = false;
              }
            }
          }
        }
        else if ([lotteryType.k3, lotteryType.pcdd].includes(state.currentLotteryInfo.type)) {
          for (let i = 0; i < methodInfo.detail.length; i++) {
            let firstItem = methodInfo.detail[i];
            firstItem.selected = false;
          }
        }
        else if (lotteryType.pk10 === state.currentLotteryInfo.type) {
          for (let i = 0; i < methodInfo.children.length; i++) {
            let firstItem = methodInfo.children[i];
            for (let n = 0; n < firstItem.detail.length; n++) {
              let secondItem = firstItem.detail[n];
              secondItem.selected = false;
            }
          }
        }
        else if (lotteryType.eleven5 === state.currentLotteryInfo.type) {
          for (let i = 0; i < methodInfo.children.length; i++) {
            let firstItem = methodInfo.children[i];
            for (let n = 0; n < firstItem.detail.length; n++) {
              let secondItem = firstItem.detail[n];
              secondItem.selected = false;
            }
          }
        }
        else if (lotteryType.lhc === state.currentLotteryInfo.type) {
          for (let i = 0; i < methodInfo.rows.length; i++) {
            let firstItem = methodInfo.rows[i];
            for (let n = 0; n < firstItem.content.length; n++) {
              let secondItem = firstItem.content[n];
              secondItem.selected = false;
            }
          }
        }
        else if ([lotteryType.bjkl8].includes(state.currentLotteryInfo.type)) {
          for (let i = 0; i < methodInfo.rows.length; i++) {
            let firstItem = methodInfo.rows[i];
            for (let n = 0; n < firstItem.content.length; n++) {
              let secondItem = firstItem.content[n];
              secondItem.selected = false;
            }
          }
        }
        else if ([lotteryType.fc3d].includes(state.currentLotteryInfo.type)) {
          for (let i = 0; i < methodInfo.rows.length; i++) {
            let firstItem = methodInfo.rows[i];
            for (let n = 0; n < firstItem.content.length; n++) {
              let secondItem = firstItem.content[n];
              if (secondItem.arr && secondItem.arr.length > 0) {
                for (let arr of secondItem.arr) {
                  arr.selected = false;
                }
              } else {
                secondItem.selected = false;
              }

            }
          }
        }
        else if ([lotteryType.klc].includes(state.currentLotteryInfo.type)) {
          for (let i = 0; i < methodInfo.rows.length; i++) {
            let firstItem = methodInfo.rows[i];
            for (let n = 0; n < firstItem.content.length; n++) {
              let secondItem = firstItem.content[n];
              secondItem.selected = false;
              secondItem.disable = false;
            }
          }
        }
        else if ([lotteryType.klsf].includes(state.currentLotteryInfo.type)) {
          for (let i = 0; i < methodInfo.rows.length; i++) {
            let firstItem = methodInfo.rows[i];
            for (let n = 0; n < firstItem.content.length; n++) {
              let secondItem = firstItem.content[n];
              secondItem.selected = false;
            }
          }
        }
      }
      commit('SET_DATA', {key: 'currentMethodInfo', value: JSON.parse(JSON.stringify(methodInfo))});
    },
    refreshBalance({dispatch}) {
      return new Promise((resolve, reject) => {
        resolve(dispatch('getStatus').then((_data) => {
          Toast.success(i18n.t('lang.common.refreshSuccessfully'))
        }))
      })
    },
    formatCreditParams({commit, dispatch, state, getters}) {
      return new Promise((resolve, reject) => {
        let content = [];
        let list = state.creditSelectArr;
        let type = state.currentLotteryInfo.type
        if ([lotteryType.bjkl8].includes(type)) {
          if (['选1-5'].includes(state.currentMethodInfo.name)) {
            for (let i = 0; i < list.length; i++) {
              let item = list[i];
              let LEN = item.value.split(',').length;
              let oddsArr = state.currentMethodInfo.oddsArr[0].content[LEN - 1][0];
              let obj = {
                betInfo: item.value,
                betModel: 0,
                cateName: oddsArr.cateName,
                code: oddsArr.code,
                money: 1,
                multiple: state.unitMoney * state.multiple_common,
                odds: getters._creditCalcOdds(item),
                // odds: this._creditCalcOdds(item),
                rebate: Number(state.currentRebate), // 返点
                totalMoney: state.unitMoney * state.multiple_common,
                totalNums: 1,
              };
              content.push(obj)
            }
          }
          else if (['选一', '选二', '选三', '选四', '选五'].includes(state.currentMethodInfo.name)) {
            for (let i = 0; i < list.length; i++) {
              let item = list[i];
              let oddsArr = state.currentMethodInfo.oddsArr[0].content[0][0];
              let obj = {
                betInfo: item.value,
                betModel: 0,
                cateName: oddsArr.cateName,
                code: oddsArr.code,
                money: 1,
                multiple: state.unitMoney * state.multiple_common,
                odds: getters._creditCalcOdds(item),
                rebate: Number(state.currentRebate), // 返点
                totalMoney: state.unitMoney * state.multiple_common,
                totalNums: 1,
              };
              content.push(obj)
            }
          }
          else {
            for (let i = 0; i < list.length; i++) {
              let item = list[i];
              let obj = {
                betInfo: item.value,
                betModel: 0,
                cateName: item.cateName,
                code: item.code,
                kyje: parseFloat(getters._creditCalcOdds(item) * state.betCount * state.unitMoney * state.multiple_common).toFixed(4),
                money: 1,
                multiple: state.unitMoney * state.multiple_common,
                odds: getters._creditCalcOdds(item),
                rebate: Number(state.currentRebate), // 返点
                totalMoney: state.unitMoney * state.multiple_common,
                totalNums: 1,
              };
              content.push(obj)
            }
          }
        }
        else {
          for (let i = 0; i < list.length; i++) {
            let item = list[i];
            let obj = {
              betInfo: item.value,
              betModel: 0,
              cateName: item.cateName,
              code: item.code,
              kyje: parseFloat(getters._creditCalcOdds(item) * state.betCount * state.unitMoney * state.multiple_common).toFixed(4),
              money: 1,
              multiple: state.unitMoney * state.multiple_common,
              odds: getters._creditCalcOdds(item),
              rebate: Number(state.currentRebate), // 返点
              totalMoney: state.unitMoney * state.multiple_common,
              totalNums: 1,
            };
            content.push(obj)
          }
        }
        resolve(content);
      })
    },
    formatOfficialParams({commit, dispatch, state, getters}) {
      return new Promise((resolve, reject) => {
        let methodInfo = state.currentMethodInfo;
        let paramsContent = [];
        // ssc
        if (lotteryType.ssc === state.currentLotteryInfo.type) {
          let specialNumberList = ['后三特殊号', '前三特殊号', '中三特殊号'];
          let randomTwoSingleList = [
            "任二直选单式",
            "任三直选单式",
            "任四直选单式",
            "任二组选单式",
          ];
          let positionArr = ['万位', '千位', '百位', '十位', '个位'];
          // 单式
          if (methodInfo.children.length === 0) {
            // 单式-任选
            if (randomTwoSingleList.includes(methodInfo.name)) {
              // 任选
              let groupKey = 4;
              if (methodInfo.name.indexOf("任二") !== -1) {
                groupKey = 2
              } else if (methodInfo.name.indexOf("任三") !== -1) {
                groupKey = 3
              } else if (methodInfo.name.indexOf("任四") !== -1) {
                groupKey = 4
              }
              let positionArr = ['万', '千', '百', '十', '个'];
              let groupList = weiGroupSplit(state.checkGroup_common, groupKey);
              let list = state.officialSelectArr;
              let formatList = [];
              for (let i = 0; i < list[0].length; i++) {
                let item = list[0][i];
                formatList.push(item.split('').join(','));
              }
              formatList = formatList.join('|');
              let betCount = state.betCount / groupList.length;
              let allContent = [];
              for (let i = 0; i < groupList.length; i++) {
                let objItem = groupList[i];
                let position = []
                for (let item of objItem) {
                  position.push(positionArr[Number(item)]);
                }
                let positionStr = position.join(',');
                let obj = {
                  betInfo: formatList,
                  betModel: state.currentMethodInfo.model,
                  cateName: state.currentMethodInfo.name,
                  code: state.currentMethodInfo.code,
                  money: state.unitMoney,
                  multiple: state.multiple_common,
                  odds: getters._officialCalcOdds(),
                  poschoose: objItem.join(','),
                  poschooseName: positionStr,
                  rebate: Number(state.currentRebate),
                  showContent: `${formatList}(${positionStr})`,
                  totalMoney: state.unitMoney * state.multiple_common * betCount,
                  totalNums: betCount,
                  // isGf: true,
                };
                allContent.push(obj);
              }
              paramsContent = allContent
            }
            else { //
              let list = state.officialSelectArr;
              let formatList = [];
              for (let i = 0; i < list[0].length; i++) {
                let item = list[0][i];
                formatList.push(item.split('').join(','));
              }
              formatList = formatList.join('|')
              let allContent = [];
              let obj = {
                betInfo: formatList,
                betModel: state.currentMethodInfo.model,
                cateName: state.currentMethodInfo.name,
                code: state.currentMethodInfo.code,
                money: state.unitMoney,
                multiple: state.multiple_common,
                odds: getters._officialCalcOdds(),
                poschoose: '',
                poschooseName: '',
                rebate: Number(state.currentRebate),
                showContent: `${formatList}`,
                totalMoney: state.unitMoney * state.multiple_common * state.betCount,
                totalNums: state.betCount,
                // isGf: true,
              };
              allContent.push(obj);
              paramsContent = allContent
            }
          }
          else { // 选号
            // ok
            if (methodInfo.name === '定位胆') {
              // content是数组，
              // 万位【1,2】
              // 千位【3,4】
              let list = state.officialSelectArr;
              let allContent = [];
              for (let i = 0; i < list.length; i++) {
                let item = list[i];
                if (item.length > 0) {
                  let position = positionArr[i];
                  let content = item.join(',');
                  let obj = {
                    betInfo: content,
                    betModel: state.currentMethodInfo.model,
                    cateName: state.currentMethodInfo.name,
                    code: state.currentMethodInfo.code,
                    money: state.unitMoney,
                    multiple: state.multiple_common,
                    odds: getters._officialCalcOdds(),
                    poschoose: i,
                    poschooseName: position,
                    rebate: Number(state.currentRebate),
                    showContent: `${content}(${position})`,
                    totalMoney: state.unitMoney * state.multiple_common * item.length,
                    totalNums: item.length,
                    isGf: true,
                  };
                  allContent.push(obj);
                }
              }
              paramsContent = allContent
            }
            else if (['任二直选复式', '任三直选复式', '任四直选复式'].includes(methodInfo.name)) {
              // 任2，任3，任4【ok】
              // content是数组，
              // 万位【1|2】
              // 千位【1|3|4】
              // poschoose
              // poschooseName
              let list = state.officialSelectArr;
              let betList = get_ssc_bet(methodInfo.name, list);
              let allContent = [];
              for (let i = 0; i < betList.length; i++) {
                let objItem = betList[i];
                let content = objItem.num.join('|');
                let position = `${positionArr[objItem.index[0]]},${positionArr[objItem.index[1]]}`
                let obj = {
                  betInfo: content,
                  betModel: state.currentMethodInfo.model,
                  cateName: state.currentMethodInfo.name,
                  code: state.currentMethodInfo.code,
                  money: state.unitMoney,
                  multiple: state.multiple_common,
                  odds: getters._officialCalcOdds(),
                  poschoose: objItem.index.join(','),
                  poschooseName: position,
                  rebate: Number(state.currentRebate),
                  showContent: `${content}(${position})`,
                  totalMoney: state.unitMoney * state.multiple_common,
                  totalNums: 1,
                  isGf: true,
                };
                allContent.push(obj);
              }
              paramsContent = allContent
            }
            else if (["任二直选和值", "任二组选复式", "任二组选和值", "任三直选和值", "任三组三", "任三组六", "任三组选和值", "组选24", "组选12", "组选6", "组选4",].includes(methodInfo.name)) {
              // 任2和值
              // content是数组，
              // 万位【1|2】
              // 千位【1|3|4】
              // poschoose
              // poschooseName
              let groupKey = 4;
              if (methodInfo.name.indexOf("任二") !== -1) {
                groupKey = 2
              } else if (methodInfo.name.indexOf("任三") !== -1) {
                groupKey = 3
              } else if (methodInfo.name.indexOf("任四") !== -1) {
                groupKey = 4
              }
              let positionArr = ['万', '千', '百', '十', '个'];
              let groupList = weiGroupSplit(state.checkGroup_common, groupKey);
              let list = state.officialSelectArr;
              let betList = get_ssc_bet(methodInfo.name, list, state.checkGroup_common);
              let content = getters._formatSelectList(state.officialSelectArr);
              let betCount = betList.length / groupList.length;
              let allContent = [];
              for (let i = 0; i < groupList.length; i++) {
                let objItem = groupList[i];
                // let content = list[0].join('|');
                let position = []
                for (let item of objItem) {
                  position.push(positionArr[Number(item)]);
                }
                let positionStr = position.join(',');
                let obj = {
                  betInfo: content,
                  betModel: state.currentMethodInfo.model,
                  cateName: state.currentMethodInfo.name,
                  code: state.currentMethodInfo.code,
                  money: state.unitMoney,
                  multiple: state.multiple_common,
                  odds: getters._officialCalcOdds(),
                  poschoose: objItem.join(','),
                  poschooseName: positionStr,
                  rebate: Number(state.currentRebate),
                  showContent: `${content}(${positionStr})`,
                  totalMoney: state.unitMoney * state.multiple_common * betCount,
                  totalNums: betCount,
                  // isGf: true,
                };
                allContent.push(obj);
              }
              paramsContent = allContent
            }
            else if (specialNumberList.includes(methodInfo.name)) { //【ok】
              let list = state.officialSelectArr[0];
              let allContent = [];
              for (let i = 0; i < list.length; i++) {
                let item = list[i];
                let obj = {
                  betInfo: item.alias,
                  betModel: item.model,
                  cateName: item.cateName,
                  code: item.code,
                  isIncludeDraw: true,
                  money: state.unitMoney,
                  multiple: state.multiple_common,
                  // odds: this._calcSpecialNumberOdds(item),
                  odds: getters._calcOdds_common(item),
                  poschoose: "",
                  poschooseName: "",
                  rebate: Number(state.currentRebate),
                  showContent: item.alias,
                  totalMoney: state.unitMoney * state.multiple_common,
                  totalNums: state.multiple_common,
                };
                allContent.push(obj);
              }
              paramsContent = allContent;
              // params.totalMoney = state.unitMoney * state.multiple_common * list.length;
            }
            else {
              let list = getters._formatSelectList(state.officialSelectArr);
              let obj = {
                betInfo: list,
                betModel: state.currentMethodInfo.model,
                cateName: state.currentMethodInfo.name,
                code: state.currentMethodInfo.code,
                money: state.unitMoney,
                multiple: state.multiple_common,
                odds: getters._officialCalcOdds(),
                poschoose: "",
                poschooseName: "",
                rebate: Number(state.currentRebate),
                showContent: list,
                totalMoney: state.unitMoney * state.multiple_common * state.betCount,
                totalNums: state.betCount,
                isGf: true,
              };
              paramsContent = [obj]
            }
          }
          // return paramsContent;
          resolve(paramsContent);
        }
        // k3
        else if (lotteryType.k3 === state.currentLotteryInfo.type) {
          if (['和值'].includes(methodInfo.name)) {
            let list = state.officialSelectArr;
            let allContent = [];
            for (let i = 0; i < list.length; i++) {
              let obj = {
                betInfo: list[i].value,
                betModel: list[i].model,
                cateName: state.currentMethodInfo.name,
                code: state.currentMethodInfo.code,
                isIncludeDraw: true,
                money: state.unitMoney,
                multiple: state.multiple_common,
                // odds: this._calcSpecialNumberOdds(list[i]),
                odds: getters._calcOdds_common(list[i]),
                poschoose: "",
                // poschooseName: "",
                rebate: Number(state.currentRebate),
                showContent: list[i].value,
                totalMoney: state.unitMoney * state.multiple_common * state.betCount / list.length,
                totalNums: 1,
              };
              allContent.push(obj)
            }
            paramsContent = allContent;
            // params.totalMoney = state.unitMoney * state.multiple_common * state.betCount;
            // return params;
          }
          else {
            let list = getters._formatSelectList(state.officialSelectArr);
            let obj = {
              betInfo: list,
              betModel: state.currentMethodInfo.model,
              cateName: state.currentMethodInfo.name,
              code: state.currentMethodInfo.code,
              money: state.unitMoney,
              multiple: state.multiple_common,
              odds: getters._officialCalcOdds(),
              poschoose: "",
              poschooseName: "",
              rebate: Number(state.currentRebate),
              showContent: list,
              totalMoney: state.unitMoney * state.multiple_common * state.betCount,
              totalNums: state.betCount,
            };
            paramsContent = [obj];
            // params.totalMoney = state.unitMoney * state.multiple_common * state.betCount;
            // return params;
            // resolve(paramsContent);
          }
          resolve(paramsContent);
        }
        // pk10
        else if (lotteryType.pk10 === state.currentLotteryInfo.type) {
          // 单式 --
          if (methodInfo.detail.isSimplex) {
            let list = getters._formatSelectList(state.officialSelectArr);
            let obj = {
              betInfo: list,
              betModel: state.currentMethodInfo.model,
              cateName: state.currentMethodInfo.cateName,
              code: state.currentMethodInfo.code,
              money: state.unitMoney,
              multiple: state.multiple_common,
              odds: getters._officialCalcOdds(),
              poschoose: "",
              poschooseName: "",
              rebate: Number(state.currentRebate),
              showContent: list,
              totalMoney: state.unitMoney * state.multiple_common * state.betCount,
              totalNums: state.betCount,
            };
            paramsContent = [obj];
            // params.totalMoney = state.unitMoney * state.multiple_common * state.betCount;
            // return params;
          }
          // 选号
          else {
            if (['猜冠军', '猜亚军'].includes(methodInfo.cateName)) {
              let list = getters._formatSelectList(state.officialSelectArr);
              let obj = {
                betInfo: list,
                betModel: state.currentMethodInfo.model,
                cateName: state.currentMethodInfo.cateName,
                code: state.currentMethodInfo.code,
                money: state.unitMoney,
                multiple: state.multiple_common,
                odds: getters._officialCalcOdds(),
                poschoose: "",
                poschooseName: "",
                rebate: Number(state.currentRebate),
                showContent: list,
                totalMoney: state.unitMoney * state.multiple_common * state.betCount,
                totalNums: state.betCount,
              };
              paramsContent = [obj];
              // params.totalMoney = state.unitMoney * state.multiple_common * state.betCount;
              // return paramsContent;
            }
            else if (['定位胆'].includes(methodInfo.cateName)) {
              let list = state.officialSelectArr;
              let allContent = [];
              for (let i = 0; i < list.length; i++) {
                let currentArr = list[i];
                if (currentArr.length > 0) {
                  let numberArr = [];
                  for (let n = 0; n < currentArr.length; n++) {
                    numberArr.push(currentArr[n].alias);
                  }
                  let numbers = getters._formatSelectList([numberArr])
                  let obj = {
                    betInfo: numbers,
                    betModel: state.currentMethodInfo.model,
                    cateName: state.currentMethodInfo.cateName,
                    code: state.currentMethodInfo.code,
                    money: state.unitMoney,
                    multiple: state.multiple_common,
                    odds: getters._officialCalcOdds(),
                    poschoose: i,
                    poschooseName: currentArr[0].poschooseName,
                    rebate: Number(state.currentRebate),
                    showContent: `${numbers}(${currentArr[0].poschooseName})`,
                    totalMoney: state.unitMoney * state.multiple_common * currentArr.length,
                    totalNums: currentArr.length,
                  };
                  allContent.push(obj);
                }
              }
              paramsContent = allContent;
              // params.totalMoney = state.unitMoney * state.multiple_common * state.betCount;
              console.log(paramsContent, 'paramsContent');
              // return paramsContent;
            }
            else if (['猜前二复式', '猜前三复式', '猜前四复式', '猜前五复式'].includes(methodInfo.cateName)) {
              let list = getters._formatSelectList(state.officialSelectArr);
              let obj = {
                betInfo: list,
                betModel: state.currentMethodInfo.model,
                cateName: state.currentMethodInfo.cateName,
                code: state.currentMethodInfo.code,
                money: state.unitMoney,
                multiple: state.multiple_common,
                odds: getters._officialCalcOdds(),
                poschoose: 'i',
                poschooseName: '',
                rebate: Number(state.currentRebate),
                showContent: list,
                totalMoney: state.unitMoney * state.multiple_common * state.betCount,
                totalNums: state.betCount,
              };
              paramsContent = [obj];
              // params.totalMoney = state.unitMoney * state.multiple_common * state.betCount;
              // return paramsContent;
            }
          }
          resolve(paramsContent);
        }
        // 11x5
        else if (lotteryType.eleven5 === state.currentLotteryInfo.type) {
          if (methodInfo.detail.isSimplex) {
            let list = getters._formatSelectList(state.officialSelectArr);
            let obj = {
              betInfo: list,
              betModel: state.currentMethodInfo.model,
              cateName: state.currentMethodInfo.cateName,
              code: state.currentMethodInfo.code,
              money: state.unitMoney,
              multiple: state.multiple_common,
              odds: getters._officialCalcOdds(),
              poschoose: "",
              poschooseName: "",
              rebate: Number(state.currentRebate),
              showContent: list,
              totalMoney: state.unitMoney * state.multiple_common * state.betCount,
              totalNums: state.betCount,
            };
            paramsContent = [obj];
          } else {
            if (['定位胆'].includes(methodInfo.cateName)) {
              let list = state.officialSelectArr;
              let allContent = [];
              for (let i = 0; i < list.length; i++) {
                let currentArr = list[i];
                if (currentArr.length > 0) {
                  let numberArr = [];
                  for (let n = 0; n < currentArr.length; n++) {
                    numberArr.push(currentArr[n].alias);
                  }
                  let numbers = numberArr.join(',')
                  let obj = {
                    betInfo: numbers,
                    betModel: state.currentMethodInfo.model,
                    cateName: state.currentMethodInfo.cateName,
                    code: state.currentMethodInfo.code,
                    money: state.unitMoney,
                    multiple: state.multiple_common,
                    odds: getters._officialCalcOdds(),
                    poschoose: i,
                    poschooseName: currentArr[0].poschooseName,
                    rebate: Number(state.currentRebate),
                    showContent: `${numbers}(${currentArr[0].poschooseName})`,
                    totalMoney: state.unitMoney * state.multiple_common * currentArr.length,
                    totalNums: currentArr.length,
                  };
                  allContent.push(obj);
                }
              }
              paramsContent = allContent;
              // params.totalMoney = state.unitMoney * state.multiple_common * state.betCount;
              console.log(paramsContent, 'paramsContent');
              // return paramsContent;
            }
            else if (['前二组选复式', '前三组选复式', '一中一', '二中二 ', '三中三', '四中四', '五中五', '六中五', '七中五', '八中五'].includes(methodInfo.cateName)) {
              let list = getters._formatSelectList(state.officialSelectArr);
              let obj = {
                betInfo: list,
                betModel: state.currentMethodInfo.model,
                cateName: state.currentMethodInfo.cateName,
                code: state.currentMethodInfo.code,
                money: state.unitMoney,
                multiple: state.multiple_common,
                odds: getters._officialCalcOdds(),
                poschoose: '',
                poschooseName: '',
                rebate: Number(state.currentRebate),
                showContent: list,
                totalMoney: state.unitMoney * state.multiple_common * state.betCount,
                totalNums: state.betCount,
              };
              paramsContent = [obj];
              // params.totalMoney = state.unitMoney * state.multiple_common * state.betCount;
              // return paramsContent;
            }
            else if (['定单双', '猜中位'].includes(methodInfo.cateName)) {
              let list = state.officialSelectArr;
              let allContent = [];
              for (let i = 0; i < list.length; i++) {
                let item = list[i];
                let obj = {
                  betInfo: item.value,
                  betModel: item.model,
                  cateName: item.cateName,
                  code: state.currentMethodInfo.code,
                  money: state.unitMoney,
                  multiple: state.multiple_common,
                  // odds: this._calcSpecialNumberOdds(item),
                  odds: getters._calcOdds_common(item),
                  poschoose: '',
                  poschooseName: '',
                  rebate: Number(state.currentRebate),
                  showContent: item.value,
                  totalMoney: state.unitMoney * state.multiple_common * state.betCount / list.length,
                  totalNums: state.betCount / list.length,
                };
                allContent.push(obj);
              }
              paramsContent = allContent;
              // params.totalMoney = state.unitMoney * state.multiple_common * state.betCount;
              console.log(paramsContent, 'paramsContent');
              // return paramsContent;
            }
            else {
              // '不定胆'，'前二组选复式', '前三组选复式'
              let list = getters._formatSelectList(state.officialSelectArr);
              let obj = {
                betInfo: list,
                betModel: state.currentMethodInfo.model,
                cateName: state.currentMethodInfo.name,
                code: state.currentMethodInfo.code,
                money: state.unitMoney,
                multiple: state.multiple_common,
                odds: getters._officialCalcOdds(),
                poschoose: "",
                poschooseName: "",
                rebate: Number(state.currentRebate),
                showContent: list,
                totalMoney: state.unitMoney * state.multiple_common * state.betCount,
                totalNums: state.betCount,
              };
              paramsContent = [obj];
              // params.totalMoney = state.unitMoney * state.multiple_common * state.betCount;
              // return paramsContent;
            }
          }
          resolve(paramsContent);
        }
        // fc3d
        else if (lotteryType.fc3d === state.currentLotteryInfo.type) {
          if (['定位胆'].includes(methodInfo.name)) {
            let list = state.officialSelectArr;
            let info = methodInfo.rows[0].info;
            let allContent = [];
            for (let i = 0; i < list.length; i++) {
              let currentArr = list[i];
              if (currentArr.length > 0) {
                let numberArr = [];
                for (let n = 0; n < currentArr.length; n++) {
                  numberArr.push(currentArr[n].value);
                }
                let numbers = numberArr.join(',');
                let content = methodInfo.rows[0].content
                let obj = {
                  betInfo: numbers,
                  betModel: info[0].model,
                  cateName: info[0].cateName,
                  code: info[0].code,
                  money: state.unitMoney,
                  multiple: state.multiple_common,
                  odds: getters._calcOdds(info),
                  poschoose: i,
                  poschooseName: content[i].name,
                  rebate: Number(state.currentRebate),
                  showContent: `${numbers}(${content[i].name})`,
                  totalMoney: state.unitMoney * state.multiple_common * currentArr.length,
                  totalNums: currentArr.length,
                };
                allContent.push(obj);
              }
            }
            paramsContent = allContent;
            // params.totalMoney = state.unitMoney * state.multiple_common * state.betCount;
            console.log(paramsContent, 'paramsContent');
            // return paramsContent;
          }
          else {
            // ''
            let list = getters._formatSelectList(state.officialSelectArr);
            let info = state.currentMethodInfo.rows[0].info;
            console.log(state.currentMethodInfo, 'this.currentMethodInfo');
            let obj = {
              betInfo: list,
              betModel: info[0].model,
              cateName: info[0].name,
              code: info[0].code,
              money: state.unitMoney,
              multiple: state.multiple_common,
              odds: getters._calcOdds(info),
              poschoose: "",
              poschooseName: "",
              rebate: Number(state.currentRebate),
              showContent: list,
              totalMoney: state.unitMoney * state.multiple_common * state.betCount,
              totalNums: state.betCount,
            };
            paramsContent = [obj];
            // params.totalMoney = state.unitMoney * state.multiple_common * state.betCount;
            console.log(paramsContent, 'paramsContent');
            // return paramsContent;
          }
          resolve(paramsContent);
        }
        // bjkl8
        else if (lotteryType.bjkl8 === state.currentLotteryInfo.type) {
          let list = state.officialSelectArr;
          let allContent = [];
          for (let item of list) {
            let obj = {
              betInfo: item.value,
              betModel: item.model,
              cateName: item.name,
              code: item.code,
              money: state.unitMoney,
              multiple: state.multiple_common,
              odds: getters._calcOdds_common(item),
              poschoose: "",
              poschooseName: "",
              rebate: Number(state.currentRebate),
              showContent: item.value,
              totalMoney: state.unitMoney * state.multiple_common * state.betCount / list.length,
              totalNums: state.betCount / list.length,
            };
            allContent.push(obj);
          }
          paramsContent = allContent;
          // params.totalMoney = state.unitMoney * state.multiple_common * state.betCount;
          console.log(paramsContent, 'paramsContent');
          // return paramsContent;
          resolve(paramsContent);
        }
      })
    },
    getLuZhi({commit, dispatch, stat}, id) {
      axios.get(API.GET_LUZHI, {params: {gameId: id}}).then((_data) => {
        if (_data.status === 200) {
          let data = _data.data;
          commit('SET_DATA', {key: 'luZhiData', value: data})
        }
      })
    },
    getLongDragon({commit, dispatch, stat}, id) {
      axios.get(API.GET_LONG_DRAGON, {params: {gameId: id}}).then((_data) => {
        if (_data.status === 200) {
          let data = _data.data;
          commit('SET_DATA', {key: 'longDragonData', value: data})
        }
      })
    },
    // 获取游戏规则
    getPlayTips({state, commit}, type) {
      axios.get(`/data/json/rules/${type}_exam.json`).then((_data) => {
        return new Promise((resolve, reject) => {
          resolve(_data);
        })
      })
    },
    getJson() {
      axios.get('/data/json/games.json').then((data) => {
        console.log(data);
      })
    },
    // 投注 -- end
    getImgAddress({commit}) {
      axios.get(API.GET_IMAGE_ADDRESS).then((_data) => {
        if (_data.code === 200) {
          commit('SET_DATA', {key: 'imgAddress', value: _data.data});
        }
      })
    },
    getVerifyCode({commit}) {
      axios.get(API.GET_VERIFY_CODE).then((_data) => {
        console.log(_data, '222222fsadfsdafsdaf')
        if (_data.code === 200) {
          commit('SET_DATA', {key: 'verifyCodeImg', value: _data.data.image})
        }

      });
    },
    //获取支付方式接口1
    getPayAccount({dispatch, commit, state}, params) {
      commit('SET_DATA', {key: 'payAccount', value: []});
      axios.get(API.GET_PAY_ACCOUNTS, {params: params}).then((_data) => {
        if (_data.code === 200) {
          commit('SET_DATA', {key: 'payAccount', value: _data.data});
          dispatch('getTpPayAccount', params);
        } else {
        }
      }).catch((err) => {
      })
    },
    //获取支付方式接口2
    getTpPayAccount({commit, state}, params) {
      commit('SET_DATA', {key: 'tppayAccount', value: []});
      axios.get(API.GET_TP_PAY_CHANNELS, {params: params}).then((_data) => {
        if (_data.code === 200) {
          if (_data.data.length > 0) {
            let newData = state.payAccount.concat(_data.data);//两个支付方式的数组合并在一起
            commit('SET_DATA', {key: 'payAccount', value: newData});
            // console.log(state.payAccount,22222);
          }
          commit('SET_DATA', {key: 'tppayAccount', value: _data.data});

        } else {
        }
      }).catch((err) => {
      })
    },
    //充值支付接口
    payTransfer({commit, state}, params) {
      return new Promise((resolve, reject) => {
        axios.post(API.TRANSFER, qs.stringify(params)).then((_data) => {
          if (_data.code === 200) {
            resolve(_data)
          } else {
            reject(false)
          }
        }).catch((err) => {
          reject(err);
        })
      })

    },
    //充值金额范围接口，如：最小充值范围
    getRechargeConfig({commit, state}, params) {
      commit('SET_DATA', {key: 'rechargeConfig', value: null});
      return new Promise((resolve, reject) => {
        axios.get(API.GET_RECHARGE_CONFIG, {params: params}).then((_data) => {
          if (_data.code === 200) {
            commit('SET_DATA', {key: 'rechargeConfig', value: _data.data});
            resolve(true)
          } else {
            reject(false)
          }
        }).catch((err) => {
          reject(err);
        })
      })

    },
    //获取当前登录用户返点层级
    getDlRange({commit, state}) {
      return new Promise((resolve, reject) => {
        axios.get(API.GET_DL_RANGE).then((_data) => {
          if (_data.code === 200) {
            let getData = _data.data;
            let max = getData[1].toFixed(4);
            let obj = {
              maxRebate: max,
              maxRebatePercent: max
            };
            max = max / 0.1;
            let min = getData[0].toFixed(4) / 0.1;//0.0000 0
            let option = [];
            for (let i = max; i >= min; i--) {
              let r = obj.maxRebate - (max - i) * 0.1.toFixed(1);
              let l = 1800 + i * 2;
              // console.log(r,l,7777);

              option.push({value: r, text: r.toFixed(1) + '% ----- ' + l});
              commit('SET_DATA', {key: 'configListaward-info', value: option});
              // console.log(option,'ooooooooooooooooo')
              if (i === max - 1) {
                commit('SET_DATA', {key: 'configValue', value: option});
                // console.log(option,'pppppppppp')
              }
            }
            commit('SET_DATA', {key: 'dlRange', value: option});
            // console.log(option, 'optionoptionoptionoptionoptionoption');
            resolve(true)

          } else {
            reject(false)
          }
        }).catch((err) => {
          reject(err);
        })
      })
    },
  },
  getters: {
    betListAll: state => state.lottery.betListAll,
    _format_number: (state) => (number) => {
      let newStr = "";
      let count = 0;
      let str = number.toString();
      if (str.indexOf(".") === -1) {
        for (let i = str.length - 1; i >= 0; i--) {
          if (count % 3 === 0 && count !== 0) {
            newStr = str.charAt(i) + "," + newStr;
          } else {
            newStr = str.charAt(i) + newStr;
          }
          count++;
        }
        str = newStr + ".00"; //自动补小数点后两位
      } else {
        for (let i = str.indexOf(".") - 1; i >= 0; i--) {
          if (count % 3 === 0 && count !== 0) {
            newStr = str.charAt(i) + "," + newStr;
          } else {
            newStr = str.charAt(i) + newStr; //逐个字符相接起来
          }
          count++;
        }
        str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
      }
      // let arr = str.split('.');
      return str
    },
    _calcOdds_common: (state) => (item) => {
      let userRebate = 0;
      if (state.isLogin) {
        userRebate = state.userInformation.rebate
      } else {
        userRebate = 9;
      }
      let minOdds = item.minOdds;
      let maxOdds = item.maxOdds;
      let rebate = item.rebate;
      let odd = parseFloat(minOdds + (((maxOdds - minOdds) / rebate) * (userRebate - state.currentRebate)) / 100).toFixed(4);
      return Number(odd);
    },
    _kl8_odds: (state, getters) => (numberLEN) => {
      let LEN = numberLEN;
      let content = state.currentMethodInfo.oddsArr[0].content;
      if (LEN > 0) {
        let oddsArr = content[LEN - 1];
        let newOddsArr = [];
        let methodArr = [];
        for (let item of oddsArr) {
          methodArr.push(item.value);
          newOddsArr.push(getters._calcOdds_common(item));
        }
        return {
          method: methodArr.join(','),
          odds: newOddsArr.join(',')
        }
      } else {
        return {
          method: state.currentMethodInfo.name,
          odds: 0.0
        }
      }
    },
    _creditCalcOdds: (state, getters) => (item) => {
      if ([lotteryType.bjkl8].includes(state.currentLotteryInfo.type)) {
        if (['选1-5'].includes(state.currentMethodInfo.name)) {
          let LEN = item.value.split(',').length
          let odds = getters._kl8_odds(LEN).odds;
          return odds
        }
        else if (['选一', '选二', '选三', '选四', '选五'].includes(state.currentMethodInfo.name)) {
          let oddsArr = state.currentMethodInfo.oddsArr[0].content;
          let newOddsArr = [];
          for (let arr of oddsArr) {
            for (let item of arr) {
              let odd = getters._calcOdds_common(item);
              newOddsArr.push(odd);
            }
          }
          return newOddsArr.join(',')
        }
        else {
          return getters._calcOdds_common(item)
        }
      }
      else if (lotteryType.fc3d === state.currentLotteryInfo.type &&
        ['组选三', '组选六'].includes(item.name)) {
        if (['组选三'].includes(item.name)) {
          let arr = item.value.split(',');
          let newArr = zx_3fs_3(arr);
          let odd = parseFloat((getters._calcOdds_common(item) / newArr.length * 2).toFixed(3));
          return odd;
        } else if (['组选六'].includes(item.name)) {
          let arr = item.value.split(',');
          let newArr = sortArray(arr, 3);
          ;
          let odd = parseFloat((getters._calcOdds_common(item) / newArr.length).toFixed(3));
          return odd;
        }
      }
      else {
        return getters._calcOdds_common(item)
        // return this._calcOdds_common(item);
      }
    },
    _calcOdds: (state) => (info) => {
      let userRebate = 0;
      if (state.isLogin) {
        userRebate = state.userInformation.rebate
      } else {
        userRebate = 9;
      }
      let oddArr = [];
      for (let i = 0; i < info.length; i++) {
        let item = info[i];
        let minOdds = item.minOdds;
        let maxOdds = item.maxOdds;
        let rebate = item.rebate;
        let odd = parseFloat(minOdds + (((maxOdds - minOdds) / rebate) * (userRebate - state.currentRebate)) / 100).toFixed(4);
        oddArr.push(Number(odd));
      }
      let odds = oddArr.sort((a, b) => {
        return b - a;
      }).join(',');
      return odds;
    },
    _formatSelectList: (state) => (checkList) => {
      let list = checkList;
      if ([lotteryType.pk10].includes(state.currentLotteryInfo.type)) {
        if (list.length === 1) {
          let newList = null;
          newList = list[0].join(',');
          return newList
        } else {
          let newList = list.join('|');
          return newList
        }
      }
      else if ([lotteryType.eleven5].includes(state.currentLotteryInfo.type)) {
        if (state.currentMethodInfo.detail.isSimplex) {
          if (list.length === 1) {
            let newList = null;
            newList = list[0].join(',');
            return newList
          } else {
            let newList = list.join('|');
            return newList
          }
        } else {
          if (list.length === 1) {
            let newList = null;
            newList = list[0].join('|');
            return newList
          } else {
            let newList = list.join('|');
            return newList
          }
        }
      }
      else {
        if (list.length === 1) {
          let newList = null;
          newList = list[0].join('|');
          return newList
        } else {
          let newList = list.join('|');
          return newList
        }
      }


    },
    _officialCalcOdds: (state) => () => {
      let userRebate = 0;
      if (state.isLogin) {
        userRebate = state.userInformation.rebate
      } else {
        userRebate = 9;
      }
      let methodInfo = state.currentMethodInfo;
      if (lotteryType.ssc === state.currentLotteryInfo.type) {
        let del = methodInfo.del;
        if (del.zh_odds.length > 1) { // 组合
          if (state.currentRebate === '0.0') { // 把所有的最后一个拿出来
            let newRebate = [];
            let list = del.zh_odds
            for (let i = 0; i < del.zh_odds.length; i++) {
              let item = del.zh_odds[i];
              newRebate.push(item[2]);
            }
            let rebate = newRebate.sort((a, b) => {
              return b - a;
            }).join(',');
            return rebate
          } else {
            let newRebate = [];
            let list = del.zh_odds;
            for (let i = 0; i < del.zh_odds.length; i++) {
              let item = del.zh_odds[i];
              let minOdds = item[0];
              let maxOdds = item[1];
              let rebate = del.rebate;
              let odd = parseFloat(minOdds + (((maxOdds - minOdds) / rebate) * (userRebate - state.currentRebate)) / 100);
              newRebate.push(odd);
            }
            let rebate = newRebate.sort((a, b) => {
              return b - a;
            }).join(',');
            return rebate
          }
        }
        else { // 单注
          if (state.currentRebate === '0.0') {
            return Number(del.addOdds);
          } else {
            let minOdds = del.minOdds;
            let maxOdds = del.maxOdds;
            let rebate = del.rebate;
            let odd = parseFloat(minOdds + (((maxOdds - minOdds) / rebate) * (userRebate - state.currentRebate)) / 100).toFixed(4);
            return Number(odd);
          }
        }
      }
      else if ([lotteryType.k3, lotteryType.pk10, lotteryType.eleven5].includes(state.currentLotteryInfo.type)) {
        let minOdds = methodInfo.minOdds;
        let maxOdds = methodInfo.maxOdds;
        let rebate = methodInfo.rebate;
        let odd = parseFloat(minOdds + (((maxOdds - minOdds) / rebate) * (userRebate - state.currentRebate)) / 100).toFixed(4);
        return Number(odd);
      }
    },
    // 官方特殊号计算方法 【被替换成_calcOdds_common】
    _calcSpecialNumberOdds: (state) => (item) => {
      let userRebate = 0;
      if (state.isLogin) {
        userRebate = state.userInformation.rebate
      } else {
        userRebate = 9;
      }
      if (this.currentRebate === '0.0') {
        return Number(item.addOdds);
      } else {
        let minOdds = item.minOdds;
        let maxOdds = item.maxOdds;
        let rebate = item.rebate;
        let odd = parseFloat(minOdds + (((maxOdds - minOdds) / rebate) * (userRebate - state.currentRebate)) / 100).toFixed(4);
        return Number(odd);
      }
    },

  },
  // vincent -- end
  modules,
  // getters
});

export default store
