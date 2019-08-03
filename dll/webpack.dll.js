const path=require('path')
const webpack=require('webpack')

module.exports={
    mode:'production',
    entry:{
        dll:['axios','better-scroll','vue','vue-router','vuex']
    },
    output:{
        filename:'chunk-[name].[chunkhash:8].js',
        path:path.resolve(__dirname,'./'),
        library:'[name]'
    },
    plugins:[
        new webpack.DllPlugin({
            name:'[name]',
            path:path.resolve(__dirname,'./chunk-[name].manifest.json')
        })
    ]
}




