import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  '.',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /\.(vue)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  // 等于import
  const componentConfig = requireComponent(fileName)
  const regStr = fileName.match(/^\.\/(.*)\.\w+$/)[1]
  let newFileName = regStr
  if (regStr.includes('/')) {
    const newFileNameArray = newFileName.split('/')
    newFileName = newFileNameArray[newFileNameArray.length - 1]
  }
  // const fileNameArray = fileName.split()
  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      // fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
      newFileName
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
    // () => import(fileName)
    // r => {
    //   require.ensure([], () => {
    //     r(require(fileName))
    //   })
    // }
  )
})
