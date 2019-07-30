<template>
  <div class="view">
    <div class="header">
      <el-row type="flex" justify="space-between">
        <div class="logo">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </div>
        <div class="nav">
          <nuxt-link to="/">首页</nuxt-link>
          <nuxt-link to="/post">旅游攻略</nuxt-link>
          <nuxt-link to="/hotel">酒店</nuxt-link>
          <nuxt-link to="/air">国内机票</nuxt-link>
        </div>
        <div class="login">
          <img src alt />
          <el-dropdown>
            <div class="menus">
              <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
              <el-button>
                登录/注册
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </div>
          </el-dropdown>
        </div>
      </el-row>
    </div>
  </div>
</template>

<style lang='less' scoped>
.view {

}
ul li ol {
  list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
  &:hover {
    color: #409eff;
  }
}
.header {
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 1px 3px #eee;
  font-size: 18px;
  height: 60px;
  width: 1000px;
  margin: 0 auto;
  line-height: 60px;
  .logo {
    img {
      width: 156px;
      height: 43px;
      display: block;
      margin-top: 8px;
    }
  }
  .login {
    margin-top:-2px;
    img {
      border-radius: 50%;
      width: 36px;
      height: 36px;
      vertical-align: middle;
      border: 3px solid #fff;
      &:hover {
        border: 3px solid #409eff;
      }
    }
  }
  .nav {
    flex: 1;
    display: flex;
    padding-left: 30px;
    a {
      display: block;
      height: 60px;
      box-sizing: border-box;
      padding: 0 20px;
      line-height: 60px;
      //  border-bottom: 5px solid #fff;
      &:hover {
        border-bottom: 5px solid #409eff;
      }
    }
  }
}
.nuxt-link-exact-active {
  background: #409eff;
  color: #fff;
  &:hover {
    color: #fff;
  }
}
</style>
