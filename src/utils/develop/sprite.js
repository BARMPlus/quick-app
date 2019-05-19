const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const SpritesMithPlugin = require('webpack-spritesmith')
const compiler = webpack({})

function resolve (...dir) {
  return path.join(__dirname, '../../../', ...dir) // TODO ../../../回到根目录下
}

class CreateSprite {
  constructor () {
    this.sprites = []
    this.isRetina = false
    this.retina = 2
    this.fontSize = 75
    this.iconPath = 'src/icon/image'
    this.targetPath = 'src/icon/sprite'
    this.name = 'index'
    this.imageRef = this.imageRefFn(this.targetPath)
    this.templateFunctionRetina = this.templateFunctionRetina.bind(this)
  }

  imageRefFn (targetPath) {
    let splitArr = targetPath.split('/')
    let name = ''
    splitArr.forEach((path, index) => {
      if (index === 0) return
      name += `${path}/`
    })
    return '~' + name
  }

  createPrefix (image, retina) {
    let getDefine = image.slice(this.imageRef.length).split('/')
    getDefine.pop()
    let prefix = getDefine.join('-')
    return `sprite${retina && retina !== 1 ? retina + 'x' : ''}${prefix ? '-' : ''}${prefix}`
  }

  templateFunctionRetina (data) {
    if (!data.sprites[0]) return
    let val = this.retinaTemplate(data)
    let { isRetina, retina } = this
    if (isRetina)val += '\n' + this.retinaTemplate(data, retina)
    return val
  }

  retinaTemplate (data, retina = 1) {
    let prefix = this.createPrefix(data.sprites[0].image, retina)
    let { image, total_width, total_height } = data.sprites[0]
    image = (retina && retina !== 1) ? image.replace(/.png/, `@${retina}x.png`) : image
    let { fontSize } = this
    // TODO mixin
    /*   let mixin = `@mixin bg-image(){

        }` */
    let shared = `.${prefix} { background-image: url(I);background-size:Xrem Yrem}`
      .replace('I', image)
      .replace('X', total_width / fontSize * retina)
      .replace('Y', total_height / fontSize * retina)
    let perSprite = data.sprites.map((sprite) => {
      return `.${prefix}-N {display:inline-block; width: Wrem; height: Hrem; background-position: Xrem Yrem;@extend .${prefix} }`
        .replace('N', sprite.name.replace(/@|\.|_/g, '-'))
        .replace('W', sprite.width / fontSize * retina)
        .replace('H', sprite.height / fontSize * retina)
        .replace('X', sprite.offset_x / fontSize * retina)
        .replace('Y', sprite.offset_y / fontSize * retina)
    }).join('\n')
    return shared + '\n' + perSprite
  }

  makeSprite (dPath = '') {
    let { targetPath, iconPath, imageRef, name, isRetina, retina, templateFunctionRetina } = this
    let variable = {
      src: {
        cwd: resolve(iconPath, dPath),
        glob: '*.png'
      },
      target: {
        image: resolve(targetPath, dPath, `${name}.png`),
        css: [
          [resolve(targetPath, dPath, `${name}.scss`), {
            format: 'function_based_template'
          }]
        ]
      },
      apiOptions: {
        cssImageRef: dPath ? `${imageRef + dPath}/${name}.png` : `${imageRef + name}.png`
      },
      customTemplates: {
        function_based_template: templateFunctionRetina,
        function_based_template_retina: templateFunctionRetina
      },
      retina: `@${retina}x`,
      spritesmithOptions: {
        algorithm: 'top-down',
        padding: 20
      }
    }
    if (!isRetina) delete variable.retina
    return new SpritesMithPlugin(variable)
  }

  isRootDirectory (initFileName) {
    let filePath = resolve(this.iconPath)
    if (initFileName === '' && fs.lstatSync(filePath).isDirectory()) compiler.apply(this.makeSprite())
  }

  each (dir, initFileName = '') {
    const files = fs.readdirSync(dir)
    this.isRootDirectory(initFileName)
    let { sprites } = this
    files.forEach((file) => {
      let filePath = path.join(dir, file)
      if (fs.lstatSync(filePath).isDirectory()) {
        sprites.push(this.makeSprite(initFileName + file))
        this.each(filePath, `${file}/`)
      }
    })
  }

  createSprite () {
    let { iconPath } = this
    let publicPath = resolve(iconPath)
    this.each(publicPath)
  }

  run () {
    let { sprites } = this
    this.createSprite()
    sprites.forEach((fn) => {
      compiler.apply(fn)
    })
    compiler.run()
  }
}

let sprite = new CreateSprite()
sprite.run()
