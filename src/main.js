import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/reset.scss'
import './assets/style/common.scss'

/**
 * themes
 */
// bdb
// import './assets/themes/bdb/blue.scss'
// import './assets/themes/bdb/orange.scss'
// import './assets/themes/bdb/red.scss'
// hjb
import './assets/themes/hjb/common.scss'//黑色和灰色皮肤的共用样式
import './assets/themes/hjb/black-dialog.scss'//黑色皮肤的弹窗样式
import './assets/themes/hjb/grey-dialog.scss'//灰色皮肤的弹窗样式
import './assets/themes/hjb/black.scss'
import './assets/themes/hjb/grey.scss'


// xxb
// import './assets/themes/xxb/green.scss'


// import './assets/style/border.css'
import './assets/fonts/iconfont.css'
import 'amfe-flexible'
import http from './api/index'
import * as cookie from 'js-cookie'
import fastClick from 'fastclick'
import './vant'
import i18n from "./i18n";
import './utils/rem.js'
// import themes from './themes'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$cookie = cookie
// 事件总栈
window.vm = Vue.prototype.$EventBus = new Vue()
// 设置一个图片后缀随机数
if (!localStorage.getItem('imgSuffix')) {
  localStorage.setItem('imgSuffix', Math.ceil(Math.random() * 10000))
}
// 设置浏览器标题
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = '加载中...'
    setTimeout(() => {
      document.title = el.dataset.title
    }, 1000)
  }
})
// Vue.mixin(themes);
// 解决手机端click事件300ms延迟
fastClick.attach(document.body)
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    fastClick.attach(document.body);
  }, false);
}

router.beforeEach((to, from, next) => {
  let history = store.state.routerHistory;
  history.push(to.path);
  sessionStorage.setItem('routerHistory',JSON.stringify(history));
  store.commit('SET_DATA', {key: 'routerHistory', value: history});
  next()
});

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
