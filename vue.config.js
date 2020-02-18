const path = require('path')
const webpack=require('webpack')
const ImageMinPlugin = require('imagemin-webpack-plugin').default
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
const AddAssetHtmlPlugin=require('add-asset-html-webpack-plugin')

const isLint = true  //是否开启ESLint  default:true
const isSource=false //是否开启dev source源码（断点调试）default:false
const isProd = process.env.NODE_ENV === 'production'
const cdnUrl = process.env.VUE_APP_CDN_URL || '/'
const publicPath = isProd ? cdnUrl : '/'

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath,
    productionSourceMap: false,
    runtimeCompiler: true,
    lintOnSave: isLint && !isProd,
    devServer: {
        open: 'true',
        port: '3100',
        disableHostCheck: true,
        overlay: {
            warnings: false,
            errors: true
        }
    },
    configureWebpack: (config)=>{
        let extraPlugins=[]
        if (isProd){
            extraPlugins=[
                new ImageMinPlugin({ //图片压缩
                    disable: false,
                    pngquant: {
                        quality: '90-100'
                    }
                }),
                new AddAssetHtmlPlugin({
                    filepath:path.resolve(__dirname, './dll/chunk-dll.*.js'),
                    outputPath:'js',
                    publicPath:`${publicPath}js`
                }), //dll.js添加
                new webpack.DllReferencePlugin({
                    manifest:path.resolve(__dirname, './dll/chunk-dll.manifest.json')
                })  //dll 映射关系
            ]
        }
        return {
            devtool:isSource&&'eval-source-map'||'eval',
            resolveLoader: {
                modules: ['./src/utils/develop']
            },
            module:{
                rules:[{
                    test:/\.css/,
                    include:resolve('node_modules','vant'),
                    use:['vantCss-loader']
                }
                ]
            },
            plugins: [
                new CopyWebpackPlugin([
                    {
                        from: path.resolve(__dirname, './static'),
                        to: 'static',
                        ignore: ['.*']
                    }
                ]),
                ...extraPlugins
            ],
            resolve: {
                alias: {
                    '@': resolve('src'),
                    'static': resolve('static'),
                    'api': resolve('src/api'),
                    'assets': resolve('src/assets'),
                    'components': resolve('src/components'),
                    'icon': resolve('src/icon'),
                    'sprite': resolve('src/icon/sprite'),
                    'layout': resolve('src/layout'),
                    'mock': resolve('src/mock'),
                    'styles': resolve('src/styles'),
                    'utils': resolve('src/utils'),
                    'views': resolve('src/views')
                }
            }
        }
    },
    chainWebpack: config => {
        if(isProd){
            config.plugin('html').tap(args => {
                args[0].minify.collapseWhitespace=false
                return args
            })
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial' // 只打包初始时依赖的第三方
                    },
                    vant: {
                        name: 'chunk-vant', // 单独将 vant 拆包
                        priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                        test: /[\\/]node_modules[\\/]vant[\\/]/
                    },
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'), // 可自定义拓展你的规则
                        minChunks: 3, // 最小公用次数
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            })
            config.optimization.runtimeChunk({
                name: 'manifest'
            })
        }
        if (process.env.IS_ANALYZ) {
            config.plugin('webpack-report')
                .use(BundleAnalyzerPlugin, [{
                    analyzerMode: 'static'
                }])
        }
    }
}
