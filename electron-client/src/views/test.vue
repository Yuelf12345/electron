<template>
  <div class="container">
    <div class="box">
      <div class="item">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100px;
  align-content: center;
  // justify-content: center;

  .box {
    width: 50px;
    height: 50px;
    background-color: aqua;
  }

  .item {
    width: 40px;
    height: 40px;
    border: 1px solid red;
  }
  .box:hover{
    width: 10px;
  }
}
</style>