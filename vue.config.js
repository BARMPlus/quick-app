let path = require('path')
let ImageminPlugin = require('imagemin-webpack-plugin').default
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

let isLint=true
let isProd=process.env.NODE_ENV === 'production'
let cdnUrl=process.env.VUE_APP_CDN_URL||'/'


function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: isProd?cdnUrl:'/',
    productionSourceMap: false,
    runtimeCompiler: true,
    lintOnSave:isLint&&!isProd,
    devServer: {
        open: 'true',
        port: '3100',
        overlay: {
            warnings: true,
            errors: true
        }
    },
    configureWebpack: {
        plugins: [
            new ImageminPlugin({
                disable: !isProd,
                pngquant: {
                    quality: '95-100'
                }
            })
        ],
        resolve: {
            alias: {
                '@': resolve('src'),
                'api': resolve('src/api'),
                'assets': resolve('src/assets'),
                'components': resolve('src/components'),
                'layout': resolve('src/layout'),
                'styles': resolve('src/styles'),
                'utils': resolve('src/utils'),
                'views': resolve('src/views'),
            }
        }
    },
    chainWebpack: config => {
        if (process.env.IS_ANALYZ) {
            config.plugin('webpack-report')
                .use(BundleAnalyzerPlugin, [{
                    analyzerMode: 'static',
                }]);
        }
    }
}
