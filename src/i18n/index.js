import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './config/zh-CN'
import en from './config/en-US'
import {LANG} from '../utils/mode'
import Cookies from 'js-cookie'
import vuex from '../store/index'
import vi from './config/vi-VN'
Vue.use(VueI18n);

// if (!localStorage.getItem('lang')) {
//   localStorage.setItem('lang', LANG.china)
// }
const messages = {
  'zh_CN': zh,
  'en': en,
  'vi': vi,
}
const getDefaultLang = function () {
  let lang = window.navigator.userLanguage || window.navigator.language; // browser language
  if (Cookies.get('language')) {  // 若有存cookie就拿出來用
    lang = Cookies.get('language')
  }
  ;
  if (localStorage.getItem('lang') !== null || localStorage.getItem('lang') !== '') {  // 若有存cookie就拿出來用
    lang = localStorage.getItem('lang')
  }
  ;
  if (Object.keys(messages).indexOf(lang) === -1) { // 若目前语系不存在，就设置默认语系
    Cookies.remove('language');
    Cookies.set('language', LANG.china)
    lang = LANG.china;
  }
  if(document.getElementsByTagName) {
    let html = document.getElementsByTagName('html')[0]
    if(html.lang) {
      html.lang = lang.replace('_','-')
    }  
  }
  return lang;
}
// vuex.commit('SET_DATA', {key: 'lang', value: getDefaultLang()});
// console.log(vuex, getDefaultLang(), 'langlang');
const i18n = new VueI18n({
  // locale: localStorage.getItem('lang') || LANG.enghlis,
  locale: getDefaultLang() || LANG.china,
  fallbackLocale: LANG.china,//没有英文的时候默认中文
  silentFallbackWarn: true,
  // messages: {
  //   zh,
  //   en
  // },
  messages
});

export default i18n
