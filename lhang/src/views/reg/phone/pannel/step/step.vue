<template>
  <div class="register-step">
    <div v-if="step ==1" class="title">
			<span>
         <img src="./img/oval_s.png" class="img1">
         <i style="left: -29px;">1</i>
         <label>输入手机号码</label>
         <img src="./img/oval2_h.png" class="img2">
       </span>
      <span>
         <img src="./img/oval_h.png" class="img1"><i>2</i>
         <label>设置登录密码</label>
         <img src="./img/oval2_h.png" class="img2">
       </span>
      <span>
         <img src="./img/oval_h.png" class="img1"><i>3</i>
         <label>完成注册</label>
      </span>
    </div>
    <div v-if="step ==2" class="title">
			<span>
         <img src="./img/oval_s.png" class="img1">
         <i><img class="img3" src="./img/setpw1.png"/></i>
         <label>输入手机号码</label>
         <img src="./img/oval2_s.png" class="img2">
       </span>
      <span>
         <img src="./img/oval_s.png" class="img1"><i>2</i>
         <label>设置登录密码</label>
         <img src="./img/oval2_h.png" class="img2">
       </span>
      <span>
         <img src="./img/oval_h.png" class="img1"><i>3</i>
         <label>完成注册</label>
      </span>
    </div>
    <div v-if="step ==3" class="title">
			<span>
         <img src="./img/oval_s.png" class="img1">
         <i><img class="img3" src="./img/setpw1.png"/></i>
         <label>输入手机号码</label>
         <img src="./img/oval2_s.png" class="img2">
       </span>
      <span>
         <img src="./img/oval_s.png" class="img1">
         <i><img class="img3" src="./img/setpw1.png"/></i>
         <label>设置登录密码</label>
         <img src="./img/oval2_s.png" class="img2">
       </span>
      <span>
         <img src="./img/oval_s.png" class="img1">
         <i style="left: -29px;">3</i>
         <label>完成注册</label>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: ['step'],
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .register-step {
    text-align: center;
    .title {
      font-size: 14px;
      span {
        line-height: 30px;
        i {
          position: relative;
          left: -25px;
          font-size: 16px;
          color: white;
          font-style: inherit;
          top: -15px;
        }
        label {
          position: relative;
          top: -15px;
        }
        .img1 {
          height: 40px;
        }
        .img2 {
          height: 13px;
          margin-left: 15px;
          margin-right: 5px;
          margin-top: -2px;
          position: relative;
          top: -15px;
        }
        .img3 {
          height: 13px;
          position: relative;
          margin-left: -8px;
        }
      }
    }
  }
</style>
