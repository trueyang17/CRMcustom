//每次修改重新启动服务
module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    // devServer: {
    //   open:true,
    //   proxy: 'http://localhost:8888',
      
    // },
    devServer: {  
      host:'127.0.0.1',
      port:8120,
      https: false,
    }        
}