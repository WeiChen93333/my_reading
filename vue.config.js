// const path = require("path");

// const vueSrc = "./src";

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
               
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