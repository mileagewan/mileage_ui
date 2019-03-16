<template>
  <div>
    <navigator />
    <router-view></router-view>
  </div>
</template>
<script>
import navigator from './homeComp/navigator'
export default {
  components:{navigator},
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
