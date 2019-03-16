<template>
  <div>
    <div class="navigation">
      <h1>
        <div class="logo"></div>
        <div>Mileage-UI</div>
      </h1>
      <div>
        <ul>
          <li>
            
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less">
  .navigation{
    width: 1340px;
    height: 75px;
    border-bottom: 2px solid blue;
    margin: 10px auto 0px;
    h1 {
      float: left;
      display: flex;
      align-items: center;
      margin-top: 12px;
      .logo {
        width: 50px;
        height: 50px;
        background: url('/static/static/logo.jpg') 100% 100%;
        background-size: 100% 100%;
        float: left;
        margin-right: 30px;
      }
      div {
        float: left;
        &:nth-child(2) {
          &:hover {
            cursor: pointer;
            color: blue;
            transform: scale(1.2);
            transition: all 1s;
            
          }
        }
      }
    }
  }
</style>