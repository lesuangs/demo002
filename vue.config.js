// const host = 'http://hjb.jian-game.com';
const host = 'http://18.163.138.189:8301';
const path = ['/api/', '/a/', '/v/', '/data/', '/views/'];

const proxy = {};

for (let url of path) {
  proxy[`^${url}`] = {
    target: host, //要跨域的域名
    ws: true, // 是否启用websockets
    changeOrigin: true, //是否允许跨越
  }
}

module.exports = {
  runtimeCompiler: true,
  // 打包路径
  outputDir: "dist",
  // 静态资源路径
  assetsDir: "assets",
  lintOnSave:false,
  productionSourceMap: false, // 不需要生产环境的 source map 设置false
  devServer: {
    open: true,  // npm run serve后自动打开页面
    host: '0.0.0.0',  // 匹配本机IP地址(默认是0.0.0.0)
    port: 8080, // 开发服务器运行端口号
    // cssSourceMap: true, //开启    是否开启 cssSourceMap默认为false
    proxy,

  },
    // 全局配置scss变量
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/style/_variable.scss";`
      }
    }
  }
}
