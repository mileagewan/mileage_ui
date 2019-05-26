<template>
  <div>
    <list-basic :config='basicConfig'></list-basic>
    <list-basic :config='businessConfig'></list-basic>
  </div>
</template>
<script>
export default {
  // name: 'List',
  data () {
    return {
      basicConfig: null, // 基础控件,
      businessConfig: null // 业务组件
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.basicConfig = Object.assign({}, this.basicConfig, {
        title: '基础控件',
        list: [
          {
            name: 'buttonSetTime 验证码验证器',
            path: '/views/buttonSetTime',
            clickAble: false
          },
          {
            name: 'fileUpLoad 文件上传',
            path: '/views/buttonSetTime'
          }
        ]
      })
      this.businessConfig = {
        title: '业务组件',
        list: [
          {
            name: 'GoJs 逻辑图',
            path: '/views/buttonSetTime',
            clickAble: false
          },
          {
            name: 'ReadFile 文件预览',
            path: '/views/buttonSetTime'
          }
        ]
      }
    }
  }
}
</script>
