### buttonSetTime 验证码验证器

---

##### 基础用法

buttonSetTime 可以用来使用作为获取验证码的业务功能使用,在`attributes`和 `events`配置好属性和对应的事件回调

---

::: demo

```html
<button-set-time
  :time="config.time"
  :start-msg="config.startMsg"
  :end-msg="config.endMsg"
  @click="todo"
></button-set-time>
<script>
  export default {
    data() {
      return {
        config: {
          time: 30,
          startMsg: '获取验证码',
          endMsg: '重新获取'
        }
      }
    },
    methods: {
      todo() {
        debugger
        console.log('事件触发')
      }
    }
  }
</script>
```

:::

##### Attributes 属性

| 参数      | 说明           | 类型   | 可选值 | 默认值         |
| --------- | -------------- | ------ | ------ | -------------- |
| time      | 倒计时时间     | Number | —      | 60s            |
| startMsg  | 默认显示的提示 | String | —      | 获取验证码     |
| duringMsg | during 的提示  | String | —      | 秒后重新获取.. |
| endMsg    | 结束的提示     | String | —      | 获取验证码     |

##### Events 事件

| 事件名称     | 说明     | 返回值 |
| ------------ | -------- | ------ |
| notice-to-do | 按钮事件 | 一     |

<script>
export default {
  data() {
    return {
      config: {
        time: 30,
        startMsg: '获取验证码',
        endMsg: '重新获取'
      }
    }
  },
  methods: {
    todo() {
       debugger
      console.log('事件触发')
    }
  }
}
</script>
