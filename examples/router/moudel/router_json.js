import pathJson from './router.json'
let packgageJson = pathJson
const routerInfo = []
for (let key in packgageJson) {
  if (key === 'zh-CN') {
    if (packgageJson[key].length > 0) {
      packgageJson[key].forEach(element => {
        element.component = r => require.ensure([], () => r(require(`../../views/${element.name}.vue`)))
        if (element.children && element.children.length > 0) {
          const childrenRouter = []
          element.children.forEach(ele => {
            ele.component = r => require.ensure([], () => r(require(`../../docs/${ele.name}.md`)))
            childrenRouter.push(ele)
          })
          element.children = childrenRouter
        }
        routerInfo.push(element)
      })
    }
  }
}
export default routerInfo
