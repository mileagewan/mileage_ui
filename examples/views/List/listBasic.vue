<template>
  <div class='listBasic'
       v-if='config.title'
       style='marginBottom: 10px;'>
    <div class='title'>{{config.title}}</div>
    <ul>
      <li v-for='(item, index) in config.list'
          :key='index'
          class='list'
          :class='{"listClick": item.clickAble }'
          :tabindex='index + 1'>
        <router-link :to='item.path'
                     class='routerLink'>{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'listBasic',
  props: {
    config: {
      type: Object,
      default: null
    }
  },
  data () {
    return {}
  },
  methods: {
    click (clickAble) {
    }
  }
}
</script>
<style lang="less" scoped>
.listBasic {
  .title {
    font-size: 16px;
    color: #333;
    line-height: 30px;
    height: 30px;
    font-weight: 700;
  }
  .list {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    &:hover {
      background: skyblue;
      cursor: pointer;
    }
    &:focus {
      background: skyblue;
    }
    .routerLink {
      box-sizing: border-box;
      padding-left: 10px;
      float: left;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
