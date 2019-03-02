<template>
  <div>
    12123123
    {{headerName}}
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      headerName: null
    }
  },
  mounted() {
    this.getMessage()
  },
  methods: {
    getMessage() {
      const $this = this
      this.$.ajax({
        url:'/api',
        data:{},
        success:(res) => {
          if(res) {
            $this.headerName = res.name
          }
        }
      });
    }
  },
}
</script>
