<template>
  <div>
    <el-form label-width="80px" :model="loginForm" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密　码" prop='password'>
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-button type="primary" style="width:343px;" @click='submitLogin()'>登录</el-button>
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
            },
             rules:{
                username:[{required:true,message:"用户名不能为空",trigger:'blur'}],
                password:[{required:true,message:"昵称不能为空",trigger:'blur'}],
            }
        }
    },
    methods:{
      // 登录请求
      submitLogin(){
        this.$axios({
          url:'/accounts/login',
          method:'post',
          data:this.loginForm,
        }).then(res=>{
          if(res.status===200){
            // 跳转到首页
            this.$router.push('/');
            // 存到store里
            this.$store.commit('user/setUser',res.data)
            console.log(this.$store);
            
          }
          console.log(res);
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    mounted(){
      console.log(this.$store);
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

