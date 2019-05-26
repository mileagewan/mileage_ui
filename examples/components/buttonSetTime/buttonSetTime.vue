<template>
  <div>
    <button @click='setTime'
            :disabled='isShow'>{{message}}</button>
  </div>
</template>
<script>
export default {
  props: {
    time: {
      type: Number,
      default: 60
    },
    startMsg: {
      type: String,
      default: '获取验证码'
    },
    duringMsg: {
      type: String,
      default: '秒后重新获取..'
    },
    endMsg: {
      type: String,
      default: '获取验证码'
    }
  },
  data () {
    return {
      timeindex: '',
      start: '',
      during: '',
      end: '',
      message: '',
      isShow: false // 是否能点击
    }
  },
  created () {
    this.timeindex = this.time
    this.start = this.startMsg
    this.during = this.duringMsg
    this.end = this.endMsg
    this.message = this.startMsg
  },
  methods: {
    setTime () {
      this.isShow = true
      this.message = this.timeindex + this.during
      var timeId = setInterval(() => {
        this.timeindex--
        if (this.timeindex === 0) {
          clearInterval(timeId)
          this.message = this.end
          this.isShow = false
          this.timeindex = this.time
        } else {
          this.message = this.timeindex + this.during
        }
      }, 1000)
      this.$emit('clickToDo')
    }

  }
}
</script>
<style scoped>
button {
  width: 100px;
  height: 60px;
  border-radius: 5px;
  border: 0 none;
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: skyblue;
}
</style>
