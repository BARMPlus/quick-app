const path = require('path')
const ImageMinPlugin = require('imagemin-webpack-plugin').default
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isLint = true
const isProd = process.env.NODE_ENV === 'production'
const cdnUrl = process.env.VUE_APP_CDN_URL || '/'


function resolve(dir) {
    return path.join(__dirname, dir)
}
function changeRule(config,ruleName,loader,fn){
    if(!isProd)return
    config.module.rule(ruleName).use(loader).loader(loader).tap(ops=>{
        return  fn(ops)||ops
    })
}
function chunkName(dir,hash='hash',ext='[ext]'){
    const versionPre='__version__'
    const num=8
    return `${dir}/[name].${ext}?${versionPre}=[${hash}:${num}]`
}

module.exports = {
    publicPath: isProd ? cdnUrl : '/',
    productionSourceMap: false,
    runtimeCompiler: true,
    lintOnSave: isLint && !isProd,
    devServer: {
        open: 'true',
        port: '3100',
        disableHostCheck: true,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    configureWebpack: ()=> {
        const output=isProd?{filename: chunkName('js','contenthash','js'), chunkFilename: chunkName('js','contenthash','js')}:{}
        return {
            output,
            plugins: [
                new ImageMinPlugin({
                    disable: !isProd,
                    pngquant: {
                        quality: '95-100'
                    }
                }),
                new CopyWebpackPlugin([
                    {
                        from: path.resolve(__dirname, './static'),
                        to: 'static',
                        ignore: ['.*']
                    }
                ])
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
        changeRule(config,'images','url-loader',(ops)=>{ops.fallback.options.name=chunkName('img')})
        changeRule(config,'svg','file-loader',(ops)=>{ops.name=chunkName('img')})
        changeRule(config,'media','url-loader',(ops)=>{ops.fallback.options.name=chunkName('media')})
        changeRule(config,'fonts','url-loader',(ops)=>{ops.fallback.options.name=chunkName('fonts')})
        isProd&&config.plugin('extract-css').tap(args => {
            return [{filename: chunkName('css','contenthash','css'), chunkFilename: chunkName('css','contenthash','css')}]
        })
        if (process.env.IS_ANALYZ) {
            config.plugin('webpack-report')
                .use(BundleAnalyzerPlugin, [{
                    analyzerMode: 'static'
                }])
        }
    }
}
