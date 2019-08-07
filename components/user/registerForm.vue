<template>
  <el-form
    :model="registerForm"
    status-icon
    :rules="rules"
    ref="registerForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名手机" prop="username">
      <el-input type="text" v-model="registerForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="nickname">
      <el-input type="text" v-model="registerForm.nickname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机验证码" prop="captcha">
      <el-input v-model="registerForm.captcha" style="width:150px;"></el-input>
      <el-button :type="sendBtnStyle" style="padding:11px 8px" @click="send" :disabled="sendBtn">{{sendButtonVlaue}}</el-button>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="registerForm.password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkpassword">
      <el-input v-model="registerForm.checkpassword"></el-input>
    </el-form-item>
    <el-button type="primary" style="width:350px;" @click="submitRegister">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      sendBtnStyle:"danger",
      sendBtn:false,
      sendButtonVlaue: "点击发送验证码",
      registerForm: {
        username: "",
        nickname: "",
        captcha: "",
        password: "",
        checkpassword: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            pattern: /^1\d{10}$/,
            message: "请输入合法的手机号",
            trigger: "blur"
          }
        ],
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        checkpassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    send() {
      if (!this.registerForm.username) {
        this.$message({
          type: "warning",
          message: "请输入手机号"
        });
        return;
      }
      if(!/^1\d{10}$/.test(this.registerForm.username)){
        console.log(/^1\d{10}$/.test(this.registerForm.username));
        return;
      }
      this.sendBtn=true;
      this.sendBtnStyle='info';
      var i=30;
      var timer=setInterval(()=>{
         i--;
        console.log(this.sendButtonVlaue);
        this.sendButtonVlaue=i+'秒后重新点击';
       
        if(i===0){
          clearInterval(timer);
          this.sendButtonVlaue='点击发送验证码';
          this.sendBtn=false;
          this.sendBtnStyle='danger';
        }
      },1000)
      this.$axios({
        url: "/captchas",
        method: "post",
        data: {
          tel: this.registerForm.username
        }
      })
        .then(res => {
          this.$alert(`模拟验证码为${res.data.code}`, "提示", {
            type: "warning"
          });
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitRegister() {
      this.$refs.registerForm.validate(valid => {
        // 解构赋值，获取对象中除了checkpassword属性的值
        const { checkpassword, ...form } = this.registerForm;
        console.log(form);
        this.$axios({
          url: "/accounts/register",
          method: "post",
          data: form
        })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-input {
  width: 270px;
}
</style>

