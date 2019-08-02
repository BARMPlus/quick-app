const isProd = process.env.NODE_ENV === 'production'
const plugins=isProd?['transform-remove-console']:[]

module.exports = {
    presets: [
        '@vue/app'
    ],
    plugins: [
        ['import', {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
        }, 'vant'],
        ...plugins
    ],
    sourceType: 'unambiguous'
}
