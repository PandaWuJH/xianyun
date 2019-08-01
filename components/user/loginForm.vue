<template>
  <div>
    <el-form label-width="80px" :model="loginForm">
      <el-form-item label="用户名">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密　码">
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-button type="primary" style="width:343px;">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
    data(){
        return {
            loginForm:{
                username:"",
                password:""
            }
        }
    }
};
</script>

<style lang="less" scoped>
/deep/ .el-tabs__content{
    background-color: #fff;
    margin: 0 auto;
}
/deep/ .el-input__inner{
    width: 280px;

}
</style>

