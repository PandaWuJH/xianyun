<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <div class="left">
        <el-row class="dancheng">单程： 广州 - 北京 / 2019-08-04</el-row>
        <el-row class="shaixuan">筛选：撤销</el-row>
        <el-row class="flightHear">
          <el-col :span="5">航空信息</el-col>
          <el-col :span="14">
            <el-row>
              <el-col :span="12">起飞时间</el-col>
              <el-col :span="12">到达时间</el-col>
            </el-row>
          </el-col>
          <el-col :span="5">价格</el-col>
        </el-row>
        <FlightsDetail/>
      </div>
      
      <div class="right"></div>
    </el-row>
  </div>
</template>

<script>
import FlightsDetail from "@/components/air/flightsDetail";
export default {
  components: {
    FlightsDetail
  },
  // 获取机票列表
  mounted() {
    // 路由普通参数获取
    // this.$route为一个对象，里面有params,query等属性
    console.dir(this.$route);
    console.dir(this.$router);
    this.$axios({
      url: "airs",
      params: this.$route.query
    });
  }
};
</script>

<style lang='less' scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .dancheng{
      padding: 10px 0;
      border: 1px solid #ddd;
      margin: 10px 0;
      font-size: 14px
  }
  .shaixuan{
      padding: 10px 0;
       border: 1px solid #ddd;
        margin-bottom: 10px;
        font-size: 14px
  }
  .left {
    width: 745px;
    .flightHear{
        text-align: center;
        border: 1px solid #ddd;
        padding: 5px 0;
        background-color: #f6f6f6;
        color:#666666;
        font-size: 14px;
        margin: 10px 0;
    }
  }
  .right {
    width: 280px;
  }
}
</style>
