function setRem() {
  // 320 默认大小16px; 320px = 20rem ;每个元素px基础上/16
  let htmlWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  //得到html的Dom元素
  let htmlDom = document.getElementsByTagName("html")[0];
  //设置根元素字体大小
  htmlDom.style.fontSize = htmlWidth / 7.5 + "px";
}

setRem();
window.onresize = function() {
  setRem();
};
window.addEventListener("resize", setRem);
window.addEventListener("pageshow", (e) => {
  // e.persisted 在iOS webview中返回有可能为false
  if (e.persisted || (window.performance && performance.navigation.type === 2)) {
    setRem();
    // window.location.reload();
  }
});
