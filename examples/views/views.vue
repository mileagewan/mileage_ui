<template>
  <div>
    <div class="router" style="fontSize:30px;paddingTop:50px">
      组件列表
    </div>
    <div class="main" style="fontSize:30px;paddingTop:50px">
      组件正在开发中，敬请期待！
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
