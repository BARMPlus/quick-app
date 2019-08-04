module.exports = function (source) { // postcss-pxtorem 根元素为75px，vant css根据375设计稿制作，*2匹配当前我们的rem
  return source.replace(/(\d+)px/g, (t, s1) => {
    return parseInt(s1) * 2 + 'px'
  })
}
