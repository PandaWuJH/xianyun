<template>
  <div>
    <!-- 显示的航班内容信息 -->
    <el-row class="flightContent" type="flex" align="middle" @click.native="isshow=!isshow">
      <el-col :span="5" class="flightsInfo">{{data.airline_name}} {{data.flight_no}}</el-col>
      <el-col :span="14">
        <el-row class="flightContentCenter">
          <el-col :span="8" class="startFly">
            <strong>{{data.dep_time}}</strong>
            <span>{{data.org_airport_name}}</span>
          </el-col>
          <el-col :span="8" class="time">
            <span>{{dealTime}}</span>
          </el-col>
          <el-col :span="8" class="endFly">
            <strong>{{data.arr_time}}</strong>
            <span>{{data.dst_airport_name}}</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5" class="price">
        ￥
        <span>{{data.seat_infos[0].org_settle_price_child}}</span>起
      </el-col>
    </el-row>
    <!-- 隐藏的航班内容信息 -->
    <el-row class="flightDetail" type="flex" align="middle" v-if="isshow">
      <el-col :span="4">
        <span>低价推荐</span>
      </el-col>
      <el-col :span="20">
        <el-row
          type="flex"
          align="middle"
          style="padding:10px 0;"
          v-for="(item,index) in data.seat_infos"
          :key="index"
        >
          <el-col :span="16">
            <i style="color:#409eff">{{item.group_name}}</i>
            <span>| {{item.supplierName}}</span>
          </el-col>
          <el-col :span="5" class="price">
            <span>￥{{item.par_price}}</span>
          </el-col>
          <el-col :span="3">
            <el-button type="warning" style="width:70px;padding:6px;display:block" @click='toBuy(data.id,item.seat_xid)'>选定</el-button>
            <span>剩余：{{item.discount}}</span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    //   props除了['']写法，还可以这样写：
    // type:数据类型
    // default:不传值时的默认值
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isshow: false,
      spendHous: "",
      spendMinute: ""
    };
  },
  //   计算属性：处理飞行时间
  computed: {
    dealTime() {
      //   计算到达时间：按分钟算
      // 10:10=>610  07:55=>475  610-475=135 => 2:15
      var arr1 = this.data.arr_time.split(":");
      var arr2 = this.data.dep_time.split(":");
      if(arr1[0]<arr2[0]){
          arr1[0]+=24
      }
      var arrTime = +arr1[0] * 60 + +arr1[1];
      //   计算出发时间：按分钟算   
      var depTime = +arr2[0] * 60 + +arr2[1];
    //   相减除以60以及取余数
      var spendTime = arrTime - depTime; //135
      var resultHour = Math.floor(spendTime / 60); //2
      var resultMinute = spendTime % 60; //15
     return resultHour+'时'+resultMinute+"分"  //2时15分
    }
  },
  methods:{
    toBuy(id,seat_xid){
      this.$router.push({
        path:'/air/order',
        query:{
          id,
          seat_xid
        } 
      })
    }
  },
  mounted(){
    console.log(this.data);
  }
};
</script>

<style lang='less' scoped>
.flightContent {
  border: 1px solid #ddd;
  padding: 10px 0;
  .flightsInfo {
    font-size: 14px;
  }
  .price {
    span {
      font-size: 24px;
      color: #ffa500;
    }
  }
  .flightContentCenter {
    padding: 0 50px;
    strong {
      font-size: 24px;
      font-weight: 400;
    }
    span {
      font-size: 12px;
      color: #666;
    }
  }
  > div {
    text-align: center;
  }
  .startFly,
  .endFly {
    strong {
      display: block;
    }
  }
}
.flightDetail {
  border: 1px solid #ddd;
  border-top: 0;
  background-color: #f6f6f6;
  padding: 0 30px;
  font-size: 14px;
  .price {
    span {
      font-size: 24px;
      color: #e6a23c;
    }
  }
}
</style>
