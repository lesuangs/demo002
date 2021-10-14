module.exports = {

  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant'],
    ['component',{
      "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk"
    }, "syntax-dynamic-import"]
  ],
  presets: ['@vue/cli-plugin-babel/preset'],
  'env': {
    'development': {
      'plugins': ['dynamic-import-node']
    },
    'production': {
      'plugins': ['transform-remove-console']
    }
  }
}
