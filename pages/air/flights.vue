<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <div class="left">
        <!-- 头部筛选组件 传值与传事件-->
        <FlightsHead :data='resStore'  @getDataList="getDataList"/>
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
        <!-- 航班信息组件 -->
        <FlightsDetail v-for="(item,index) in newAirsList" :key="index" :data="item" />
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <div class="right">
        <FlightsAside/>
      </div>
    </el-row>
  </div>
</template>

<script>
import FlightsDetail from "@/components/air/flightsDetail";
import FlightsHead from "@/components/air/flightsHead";
import FlightsAside from "@/components/air/flightsAside";
export default {
  components: {
    FlightsDetail,
    FlightsHead,
    FlightsAside
  },
  data() {
    return {
      airsList: [], //所有机票列表数据
      newAirsList: [], //分页时遍历的列表数据
      total: 8,
      pageNum: 1,
      pageSize: 2,
       //总数据，有flights,info,options数据
         res: {
        info: {},
         options: {}
       },
       //缓存总数据，不能被修改
         resStore: {
        info: {},
         options: {}
       },
       
    };
  },
  methods: {
    //   修改显示条数时触发事件
    handleSizeChange(value) {
      this.pageSize = value;
        this.getDataList()
    },
    // 修改当前页码时触发事件
    handleCurrentChange(value) {
      this.pageNum = value;
      this.getDataList()
    },
    getDataList(arr) {
      if(arr){
        this.airsList=arr;
        this.total=arr.length;
      }
      this.newAirsList = this.airsList.slice(
        (this.pageNum - 1) * this.pageSize,
        (this.pageNum - 1) * this.pageSize + this.pageSize
      );
    },
    // 获取列表总数据
    getTotalList(){
       this.$axios({
      url: "airs",
      params: this.$route.query
    }).then(res => {
      // console.log(res);
      // 获取总数据
      this.res=res.data;
      // 备份总数据
      this.resStore={...res.data}
      // console.log(this.res);
      // 获取分页总条数
      this.total = res.data.total;
      // 获取总的列表数
      this.airsList = res.data.flights;
      // 获取分页默认设置的数组
      this.newAirsList = this.airsList.slice(0, this.pageSize);
      // console.log(this.newAirsList);
      // console.log(this.airsList);
    });
    }
  },
  // 获取机票列表
  mounted() {
    // 路由普通参数获取
    // this.$route为一个对象，里面有params,query等属性
    // console.dir(this.$route);
    // console.dir(this.$router);
   this.getTotalList()
  },
  // 监听路由变化时调用函数,点击历史查询时路由变化跳转
  watch:{
    $route(){
      this.pageNum=1,
      this.getTotalList()
    }
  }
};
</script>

<style lang='less' scoped>
.container {
  width: 1000px;
  margin: 0 auto;

  .left {
    width: 745px;
    .flightHear {
      text-align: center;
      border: 1px solid #ddd;
      padding: 5px 0;
      background-color: #f6f6f6;
      color: #666666;
      font-size: 14px;
      margin: 10px 0;
    }
  }
  .right {
    width: 240px;
    
  }
}

/deep/ .el-pagination {
  padding-left: 30px;
}
</style>
