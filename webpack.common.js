const path=require('path');
const webpack =require('webpack');
const HappyPack=require('happypack');
const os=require('os');
const HappyThreadPool=HappyPack.ThreadPool({ size: os.cpus().length });
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports={
    target:'web',
    output:{
        filename:'js/[name].[chunkhash:8].min.js',
        path:path.resolve(__dirname,'dist'),
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                enforce:'pre', // 在babel-loader对源码进行编译前进行ESlint的检查
                exclude:/node_modules/,
                include:path.resolve('./src'),  //只对src下 做检查
                loader:'happypack/loader?id=eslint'
            },
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'happypack/loader?id=css'
                })
            },
            {
                test:/\.less$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'happypack/loader?id=less'
                })
            },
            {
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                use:'happypack/loader?id=js'
            },
            {
                test:/\.(png|jpg|jpeg|gif)$/i,
                use:[
                    {
                        loader:'url-loader',
                        query:{
                                limit:10000,
                                name:'./img/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test:/\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader:'url-loader?name=font/[name].[hash:8].[ext]',
            }
        ]
    },
    plugins:[
        new HappyPack({
            id:'eslint',
            threadPool:HappyThreadPool,
            loaders:['eslint-loader']
        }),
        new HappyPack({
            id:'js',
            threadPool:HappyThreadPool,
            loaders:['babel-loader']
        }),
        new HappyPack({
            id:'css',
            threadPool:HappyThreadPool,
            loaders:['css-loader','postcss-loader']
        }),
        new HappyPack({
            id:'less',
            threadPool:HappyThreadPool,
            loaders:['css-loader','postcss-loader','less-loader']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'common.[hash].min.js',  //开发环境不要使用[chunkhash]
            minChunks: function (module) {
                //假定公共模块已经存在node_modules中
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),
        new ExtractTextPlugin({
            filename:'css/style.[contenthash].css',
            allChunks:true,
            disable: false
        })
    ]
}
