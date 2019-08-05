const SpriteTool = require('sprite-tool')
let sprite = new SpriteTool({
  iconPath: 'src/icon/image', // 目标路径
  targetPath: 'src/icon/sprite', // 生成路径
  name: 'index', // 生成文件名
  isRetina: false // 是否开启三倍图模式
})
sprite.run()
