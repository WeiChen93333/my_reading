const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: isProd ? './' : '/',
  configureWebpack: {
    resolve: {
      alias: {// 别名配置
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',                
        'network': '@/network',                
        'views': '@/views',
        'mock': '@/mock'
        
      }
    }    
  }
}


