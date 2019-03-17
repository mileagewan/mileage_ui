<template>
  <div>
    <navigator />
    <div :style="{width:'80%',margin:'0 auto',paddingTop:'30px'}">
      <ul>
        <li
          v-for="(item,index) in updata"
          :key="index"
        >
          <p>版本：{{item.version}}</p>
          <p>时间：{{item.time}}</p>
          <p>更新内容：{{item.content}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import navigator from "./homeComp/navigator";
import upData from "./updata/updata.json";
export default {
  components: { navigator },
  data() {
    return {
      updata: []
    };
  },
  mounted() {
    this.updata = upData.reverse();
  }
};
</script>
<style lang="scss" scoped>
ul {
  li {
    margin-bottom: 20px;
    p {
      line-height: 25px;
      height: 25px;
      font-size: 15px;
      color: #222;
      font-weight: 700;
    }
  }
}
</style>