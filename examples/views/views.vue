<template style='height:100%;width:100%'>
  <div>
    <navigator />
    <div class="router"
         style="fontSize:30px;paddingTop:50px">
      <list-views />
    </div>
    <div class="main"
         style="paddingTop:50px">
      <router-view style='width:90%;height:100%;'></router-view>
    </div>
  </div>
</template>
<script>
export default {
  created () {
  }
}
</script>

<style>
.router {
  width: 200px;
  height: 100%;
  overflow: auto;
  float: left;
  background-color: #fefefe;
  border-right: solid 2px #9acd32;
}
.main {
  float: right;
  box-sizing: border-box;
  width: calc(100% - 240px) !important;
  height: 100%;
  overflow: auto;
  font-size: 16px;
}
</style>
