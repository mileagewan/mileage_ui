<template>
  <div>
    <div class="navigation">
      <h1>
        <div class="logo"></div>
        <div @click="$router.push({name:'home'})">Mileage-UI</div>
      </h1>
      <div class="right">
        <ul>
          <li
            v-for="(item,index) in navigator"
            :key='index'
            class='list'
          >
          <router-link :to="item.router" v-if="item.router.indexOf('http') === -1">{{item.name}}</router-link>
          <a v-else :href="item.router">{{item.name}}</a>
          </li>
          <li class="list selectElement">
            版本:
            <select
              name=""
              id=""
              style="width:80px"
            >
              <option
                :value="item.version"
                v-for="(item,index) in select"
                :key="index"
              >{{item.version}}</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navigator: [
        {
          name:'更新日志',
          router:'/updata'
        },
        {
          name: "协同开发",
          router: "https://github.com/mileagewan/mileage_ui"
        },
        {
          name: "组件",
          router: "/views"
        }
      ],
      select: [{ version: "1.0.0" }, { version: "1.1.0" }]
    };
  }
};
</script>
<style lang="scss" scoped>
.navigation {
  width: 1130px;
  height: 75px;
  border-bottom: 2px solid yellowgreen;
  margin: 0 auto;
  padding-left: 10px;
  padding-right: 10px;
  h1 {
    float: left;
    display: flex;
    align-items: center;
    margin-top: 12px;
    .logo {
      width: 50px;
      height: 55px;
      background: url("/static/static/熊猫.jpg") 100%;
      background-size: 100% 100%;
      float: left;
      margin-right: 30px;
    }
    div {
      float: left;
      &:nth-child(2) {
        transition: all 1s;
        &:hover {
          cursor: pointer;
          color: blue;
          transform: scale(1.2);
        }
      }
    }
  }

  .right {
    float: right;
    height: 100%;
    display: flex;
    align-items: center;
    ul {
      .list {
        cursor: pointer;
        float: left;
        padding-right: 30px;
        font-size: 20px;
        font-family: "楷体", Courier, monospace;
        color: #666;
        &:hover {
          color: #2f54eb;
        }
      }

      .selectElement {
        select {
          text-align: center;
          text-align-last: center;
          option {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>