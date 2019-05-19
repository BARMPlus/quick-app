let path = require('path')
let ImageminPlugin = require('imagemin-webpack-plugin').default
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')

let isLint = true
let isProd = process.env.NODE_ENV === 'production'
let cdnUrl = process.env.VUE_APP_CDN_URL || '/'


function resolve(dir) {
    return path.join(__dirname, dir)
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
    configureWebpack: {
        plugins: [
            new ImageminPlugin({
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
