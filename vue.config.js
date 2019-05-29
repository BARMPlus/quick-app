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
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, './static'),
                    to: 'static',
                    ignore: ['.*']
                }
            ]),
            new ImageMinPlugin({
                disable: !isProd,
                pngquant: {
                    quality: '95-100'
                }
            })
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
    },
    chainWebpack: config => {
        if (process.env.IS_ANALYZ) {
            config.plugin('webpack-report')
                .use(BundleAnalyzerPlugin, [{
                    analyzerMode: 'static'
                }])
        }
    }
}
