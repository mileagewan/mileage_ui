<template>
  <div :style="{width:'100%'}">
    <navigator />
    <message />
    <router-view></router-view>
  </div>
</template>
<script>
import navigator from './homeComp/navigator'
import message from './homeComp/message'
export default {
  components: { navigator, message },
  data () {
    return {
      headerName: null
    }
  },
  mounted () {
    this.getMessage()
  },
  methods: {
    getMessage () {
      const $this = this
      this.$.ajax({
        url: '/api',
        data: {},
        success: (res) => {
          if (res) {
            $this.headerName = res.name
          }
        }
      })
    }
  }
}
</script>
