const path=require('path');
const webpack=require('webpack');
const Merge=require('webpack-merge');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CommConfig=require('./webpack.common.js');
module.exports=function(){
    return Merge(CommConfig,{
            entry:{
                index:[
                    'babel-polyfill',
                    'react-hot-loader/patch',// 开启 React 代码的模块热替换(HMR)
                    'webpack/hot/only-dev-server',
                    // 为热替换(HMR)打包好代码
                    // only- 意味着只有成功更新运行代码才会执行热替换(HMR)
                    './src/index.js'
                    // 我们 app 的入口文件
                ],
            },
            output:{
                publicPath:'/'
            },
            plugins:[
                new OpenBrowserPlugin({url:'http://localhost:8080'}),
                //报错不退出
                new webpack.NoEmitOnErrorsPlugin(),
                //设置全局变量 
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify('dev')
                }),
                new webpack.HotModuleReplacementPlugin(),
                // 开启全局的模块热替换(HMR)
                new HtmlWebpackPlugin({
                    filename:'index.html',
                    template:'./index.html',
                    inject:'body',
                })
            ],
            devServer:{
                historyApiFallback:true, //任意的404响应都可能需要被替代为index.html
                contentBase:path.resolve(__dirname,'dist'), 
                hot:true,
                inline: true,
                publicPath:'/',
                overlay: {
                    warnings: true,
                    errors: true
                }
            }
    })
}

