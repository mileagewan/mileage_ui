<template>
  <div id="app"
       :style="{width:'1150px',margin:'0 auto',background:'#fff',height:'100%'}">
    <router-view style='height:100%' />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url("./static/CSS/common");
</style>
