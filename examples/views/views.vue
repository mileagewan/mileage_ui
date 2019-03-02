<template>
  <div>
    <div class="router"></div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {}
</script>

<style lang="less">
  .router {
    width: 200px;
    height: 200px;
    overflow: auto;
    float: left;
    background-color: skyblue;
  }
  .main {
    float: left;
    width: 100%-240px;
    height: 1000px;
    overflow: auto;
  }
</style>
