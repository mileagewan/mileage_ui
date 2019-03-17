<template>
  <div class="message">
    <div class="fl">
      <p class="title"> Mileage UI Design </p>
      <p>基于VUE框架下的UI框架</p>
      <p>服务于个人开发者，不建议用于生产环境，使用于生产环境要注意</p>
      <p>开源项目，仅供共同学习，若用于生产后果需自己承担</p>
      <div>
        <button>
          <router-link :to="{name:'views'}">开始共同学习</router-link>
        </button>
        <button>
          <a href="https://github.com/mileagewan/mileage_ui">Git源码库</a>
        </button>
      </div>
    </div>
    <div class="img">
      <img
        src="/static/static/b90e7behead.jpg"
        alt=""
      />
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.message {
  padding: 100px 100px 0 0;
  overflow: hidden;
  .fl {
    float: left;
    width: 50%;
    p {
      padding-left: 40px;
      margin-left: 30px;
      font-size: 20px;
      width: 100%;
      margin-top: 5px;
      line-height: 20px;
      color: #6c7b89;
      margin-bottom: 20px;
    }

    div {
      margin-left: 50px;
      height: 100px;
      width: 60%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      button {
        width: 120px;
        height: 40px;
        border: 0 none;
        border-radius: 20px;
        &:nth-child(1) {
          background: #2f54eb;
          color: #fff;
          a {
            color: #fff;
            font-size: 15px;
            font-weight: 700;
          }
        }
        &:nth-child(2) {
          background: #333;
          a {
            font-size: 15px;
            color: #fff;
          }
        }
      }
    }

    .title {
    font-size: 40px;
    font-weight: 700;
    margin-left: 100px;
    margin-top: 30px;
    margin-bottom: 40px;
    color: #333;
  }
  }
  .img {
    width: 400px;
    float: right;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      transition: all 2s;
      &:hover {
        transform: scale(1.2);
      }

    }
  }
}
</style>
