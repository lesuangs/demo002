import axios from 'axios'
import store from './store'
import Cookies from 'js-cookie'
import i18n from "./i18n";
import {API} from "./api/api_list";
import qs from 'qs';
import {LANG} from "./utils/mode";

console.log(store, 'store-http');
let authorization = 'Basic ZGctYXBwOmRnLWFwcF9zZWNyZXQ=';

const errorHandle = (response) => {
  // console.log(response,'response-ajax');
  // 状态码判断
  const code = response.data.code
  const status = response.status
  if (code) {
    if (code === 'UC/TOKEN_INVALID') {
      // tip(i18n.t('lang.common.loginTimedOut'))
      Cookies.remove('token')
      // store.commit('user/clearUser')
      // sessionStorage.clear()
      // localStorage.removeItem('userInfo')
      setTimeout(() => {
        toLogin()
      }, 1000)
    } else {
      tip(response.data.msg)
    }
  } else if (status >= 500) {
    // tip(i18n.t('lang.common.serverBusy'))
  } else if (status === 404) {
    // tip(i18n.t('lang.common.ziYuanBuCunZai'))
  } else {
    // tip(i18n.t('lang.common.requestError'))
  }
}

const instance_refresh = axios.create({
  timeout: 1000 * 30
})
instance_refresh.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance_refresh.interceptors.request.use(
  config => {
    let _config = config;
    _config.headers.Authorization = authorization;
    return _config
  },
  error => Promise.error(error))

function refreshTokenFn(config, refreshToken) {
  return new Promise((resolve, reject) => {
    let params = {
      grantType: 'refresh_token',
      refreshToken,
      tenantCode: 'model'
    }
    instance_refresh.post(API.LOGIN, qs.stringify(params)).then((_data) => {
      if (_data.status === 200) { // axios --》 http
        let data = _data.data;
        if (data.code === 200) { // 业务
          let token = data.accessToken;
          localStorage.setItem('loginInfo', JSON.stringify(data.data));
          // config.headers['dg-auth'] = `bearer ${token}`;
          if (config.url.indexOf('api') !== -1) {
            config.headers['dg-auth'] = `bearer ${token}`;
          }
          resolve(config);
        }
      } else {
        reject(false)
      }
    });

  })

}

const instance = axios.create({timeout: 1000 * 30})
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
instance.interceptors.request.use(
  config => {
    let _config = config;
    // let token = Cookies.get('token');
    try {
      let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : LANG.china;
      let isLogin = JSON.parse(localStorage.getItem('isLogin'));
      if (isLogin) {
        _config.headers.Authorization = authorization;
        let loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
        if (loginInfo) {
          let refreshToken = loginInfo.refreshToken; // accessToken,refreshToken
          let expireTime = new Date(loginInfo.expiration).getTime();
          let nowTime = Date.now();
          let leftTime = expireTime - nowTime;
          // console.log(leftTime < (600 * 1000), leftTime, 1 * 100 * 1000, 'leftTimeleftTime');
          if (leftTime < (550 * 1000) && refreshToken) {
            refreshTokenFn(_config, refreshToken).then((_data) => {
              _config = _data;
            });

          }
        }
        // _config.headers['dg-auth'] = `bearer ${token}`;
      }
      if (_config.url.indexOf('api') !== -1) {
        let loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
        let token = loginInfo.accessToken;
        _config.headers['dg-auth'] = `bearer ${token}`;
      }
      _config.headers.Authorization = authorization;
      _config.headers['dg-lang'] = lang;
    } catch (e) {
      console.log(e, 'errorrrr');
    }
    return _config
  },
  error => Promise.error(error)
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    if (res.status === 200) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  },
  // 请求失败
  error => {
    const {response} = error
    if (response) {
      // 拦截报错
      errorHandle(response)
      console.log('接口报错-http.js');
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        console.log(i18n.t('lang.common.duanWangLa'))
      } else {
        return Promise.reject(error)
      }
    }
  }
)

export default instance
