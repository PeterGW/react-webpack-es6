const path=require('path');
const webpack=require('webpack');
const Merge=require('webpack-merge');
const CommConfig=require('./webpack.common.js');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const ParallelUglifyPlugin =require('webpack-parallel-uglify-plugin');
const os=require('os');

module.exports=function(){
    return Merge(CommConfig,{
        entry:{
            index:['babel-polyfill','./src/index.js'],
            common:['mockjs','jquery']
        },
        output:{
            // publicPath:'http://localhost:63342/webpack/components/dist/'
            publicPath:'./'
        },
        plugins:[
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('prod')
            }),
            //压缩CSS
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: {removeAll: true } },
                canPrint: true
            }),
            //删除dist文件
            new CleanWebpackPlugin('dist',{ 
                root: __dirname,
                verbose: true, //输出删除信息
                dry:false // 删除文件  如果为true是模拟删除文件 不会真的删除文件
            }),
            new ParallelUglifyPlugin({
                workerCount: os.cpus().length,
                cacheDir: '.cache/',
                uglifyJS:{
                    beautify:false, //美化输出
                    compress: { 
                        warnings: false  //警告有关潜在的优化/代码 
                    },
                    comments:false  //不保留注释
                }
            }),
            new HtmlWebpackPlugin({
                filename:'index.html',
                template:'./index.html',
                inject:'body',
                minify:{
                    removeComments:true,
                    useShortDoctype:true,
                }
            })
        ]
    })
}