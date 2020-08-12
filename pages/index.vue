<template>
  <div class="index">
    <!-- 轮播图 -->
    <el-carousel trigger="click" height="700px">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div
          class="banner"
          :style="`background:url(${item.url}) center center no-repeat`"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <!-- 标签页 -->
    <el-tabs type="border-card">
      <el-tab-pane v-for="(item,index) in search" :key="index">
        <span slot="label" @click="deal(index)">
          <i :class="item.icon"></i>{{item.text}}
        </span>
        </el-tab-pane>
        <!-- 输入搜索框 -->
        <div>
          <el-input :placeholder="search[current].placeholder" v-model="searchWord" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: [
        {
          url: "http://157.122.54.189:9095/assets/images/th03.jfif"
        },
        {
          url: "http://157.122.54.189:9095/assets/images/th03.jfif"
        },
        {
          url: "http://157.122.54.189:9095/assets/images/th03.jfif"
        },
    ],
      search: [
        {
          icon: "el-icon-s-flag",
          text: "攻略",
          placeholder: "请输入城市"
        },
        {
          icon: "el-icon-office-building",
          text: "酒店",
          placeholder: "请输入城市搜索酒店"
        },
        {
          icon: "el-icon-position",
          text: "机票",
          placeholder: "请输入城市搜索机票"
        }
      ],
      searchWord: "",
      current:0,
    };
  },
  methods:{
    deal(index){
      console.log(index);
      this.current=index;
      if(index===2){
        this.$router.push("/air")
      }
    }
  },
  mounted() {
    console.log(this.$store.state.user.userInfo.user.nickname)
    console.dir(this.$axios)
    // this.$axios({
    //   url: "/scenics/banners"
    // })
    //   .then(res => {
    //     console.log(res);
    //     this.banners = res.data.data;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
};
</script>

<style lang='less' scoped>
.banner {
  width: 100%;
  height: 100%;
}
/deep/ .el-tabs__item{
  font-size: 18px;
  color:#fff !important;
  padding: 0,10px;
  background: rgba(0,0,0,.5);
  i{
    font-size: 24px;
    margin-right: 5px
  }
}
/deep/ .el-tabs{
  z-index:9;
  width: 318px;
  float: left;
  margin-top: -400px;
  margin-left: 514px;
  margin-bottom:-2px;
  background: rgba(0,0,0,.5);
}
/deep/ .el-tabs__item{
   border-radius: 5px;
}
/deep/ .is-active{
  background: #fff;
  color:#333 !important;
}
/deep/ .el-carousel__indicator--horizontal{
  padding: 0 !important;
}
/deep/ .el-tabs__header{
    background: rgba(0,0,0,.5);
  width: 318px;
  // border-radius:5px 
}
/deep/ .el-tabs__content{
  z-index: 9;
  padding: 0;
  margin-top: -5px;
}
</style>
