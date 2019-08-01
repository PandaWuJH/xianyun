<template>
  <div class="container">
    <el-tabs type="border-card" v-model='active'>
      <el-tab-pane label="登录" name='0'>
        <LoginForm/>
      </el-tab-pane>
      <el-tab-pane label="注册" name='1'>
        <RegisterForm/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import LoginForm from "@/components/user/loginForm";
import RegisterForm from "@/components/user/registerForm";

export default {
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
        active:'0'
    };
  }
};
</script>

<style lang='less' scoped>
.container {
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) no-repeat
    0 0;
  height: 700px;
  width: 100%;
}
/deep/ .el-tabs {
  width: 400px;
  height: 39px;
  position: relative;
  left: 435px;
  top: 100px;
//   border: 1px solid red;
  .el-tabs__item {
    width: 200px;
    text-align: center;
    margin:0;
  }
  .el-tabs__content{
      background-color: #fff;
    padding:15px 5px 15px 25px;
  }
  .el-form-item__label{
      margin-left: -20px;
  }
  .el-form-item__content{
      margin-left: 60px !important;
  }
}
/deep/ .el-tabs--border-card{
    border: 0;
}
/deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item{
    border: 0;
}
</style>
