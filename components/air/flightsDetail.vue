<template>
  <div>
    <!-- 显示的航班内容信息 -->
    <el-row class="flightContent" type="flex" align="middle">
      <el-col :span="5" class="flightsInfo">海航 HU7804</el-col>
      <el-col :span="14">
        <el-row class="flightContentCenter">
          <el-col :span="8" class="startFly">
            <strong>08:10</strong>
            <span>白云机场T1</span>
          </el-col>
          <el-col :span="8" class="time">
            <span>经过时间</span>
          </el-col>
          <el-col :span="8" class="endFly">
            <strong>11:15</strong>
            <span>首都机场T1</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5" class="price">
        ￥
        <span>1160</span>起
      </el-col>
    </el-row>
    <!-- 隐藏的航班内容信息 -->
    <el-row class="flightDetail" type="flex" align="middle">
      <el-col :span="4">
        <span>低价推荐</span>
      </el-col>
      <el-col :span="20">
        <el-row type="flex" align="middle" style="padding:10px 0;">
          <el-col :span="16">
            <i style='color:#409eff'>经济舱</i><span> | 上海一诺千金航空服务有限公司</span>
          </el-col>
          <el-col :span="5" class="price">
            <span>￥2115</span>
          </el-col>
          <el-col :span="3">
            <el-button type="warning" style="width:70px;padding:6px;display:block">选定</el-button>
            <span>剩余：91</span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
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
.flightDetail{
    border: 1px solid #ddd;
    border-top:0;
    background-color: #f6f6f6;
    padding:0 30px;
    font-size: 14px;
    .price {
    span {
      font-size: 24px;
      color: #e6a23c;
    }
  }
}
</style>
