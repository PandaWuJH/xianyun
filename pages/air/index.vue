<template>
  <div class="contianer">
    <!-- 国内机票栏 -->
    <el-row>
      <el-col :span="24">
        <div class="nav">
          <i class="iconfont iconfeiji"></i>
          <span>国内机票</span>
        </div>
      </el-col>
    </el-row>
    <!-- 搜索框与广告图 -->

    <el-row>
      <el-col :span="8">
        <div class="left">
          <div class="leftHearder">
            <el-col :span="12">
              <span>单程</span>
            </el-col>
            <el-col :span="12">
              <span>往返</span>
            </el-col>
          </div>
         <SearchForm/>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="right">
          <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt />
        </div>
      </el-col>
    </el-row>
    <!-- 中间服务三列 -->
    <el-row class="center">
      <el-col :span="8" class="centerLeft">
        <i class="iconfont iconweibiaoti-_huabanfuben"></i>100%航协认证
      </el-col>
      <el-col :span="8" class="centerCen">
        <i class="iconfont iconbaozheng"></i>出行保证
      </el-col>
      <el-col :span="8" class="centerRight">
        <i class="iconfont icondianhua"></i>7x24小时服务
      </el-col>
    </el-row>
    <!-- 特价机票 -->
    <!-- 特价机票 -->
    <div class="air-sale">
        <el-row type="flex" class="air-sale-pic" justify="space-between">

            <el-col 
            :span="6" 
            v-for="(item, index) in airArr" 
            :key="index">
                <nuxt-link :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`">
                    <!-- 封面 -->
                    <img :src="item.cover"/>
                    <el-row class="layer-bar" type="flex" justify="space-between">
                        <!-- 出发城市 - 到达城市 -->
                        <span>{{ item.departCity }}-{{item.destCity}}</span>
                        <span>￥{{ Number(item.price).toFixed(2) }}</span>
                    </el-row>
                </nuxt-link>
            </el-col>

        </el-row>
    </div> 
  </div>
</template>

<script>
import SearchForm from '@/components/air/searchForm'
export default {
  components:{
    SearchForm
  },
  data(){
      return{
          airArr:[]
      }
  },
  mounted(){
      this.$axios({
          url:"airs/sale"
      }).then(res=>{
          console.log(res);
          this.airArr=res.data.data
      })
  }
};
</script>

<style lang="less" scoped>
.contianer {
  width: 1000px;
  margin: 0 auto;
  .nav {
    // border: 1px solid #ddd;
    height: 50px;
    color: #ffa500;
    font-size: 20px;
    line-height: 50px;
    i {
      font-size: 24px;
    }
  }
  .left
   {
    border: 1px solid #ddd;
  }
  .left {
    text-align: center;
    height: 375px;
    margin-right: 20px;

    .leftHearder {
      height: 40px;
      line-height: 40px;
    //   border: 1px solid #ddd;
    }
  }
  .right {
    img {
      display: block;
      width: 100%;
    }
  }
  .center {
    margin: 15px 0;
    //   height:60px;
    border: 1px solid #ddd;
    //   line-height: 60px;
    text-align: center;
    font-size: 18px;

    .centerLeft,
    .centerCen,
    .centerRight {
      padding: 12px 0;
    //   border: 1px solid #ddd;
      i {
        font-size: 30px;
      }
    }
    .centerLeft,
    .centerCen{
        border-right: 1px solid #ddd;
    }
    .centerLeft {
      i {
        color: #409eff;
      }
    }
    .centerCen {
      i {
        color: #008037;
      }
    }
    .centerRight {
      i {
        color: #409eff;
      }
    }
  }
  .discount {
    font-size: 20px;
    i {
      color: #409eff;
      font-size: 30px;
    }
  }
  
}
.air-sale-pic{
    margin-bottom: 20px;
    > div{
      width:225px;
      height:140px;
      position: relative;
      overflow: hidden;

      img{
        width:100%;
      }

      .layer-bar{
        position:absolute;
        bottom:0;
        left:0;
        background: rgba(0,0,0,0.5);
        color:#fff;
        height:30px;
        line-height: 30px;
        width:100%;
        box-sizing: border-box;
        padding: 0 15px;
        font-size: 14px;

        span:last-child{
          font-size:18px;
        }
      }
    }
  }
.air-sale-group{
  margin-top:20px;
  padding-top:8px;
  border-right:1px #ddd solid;

  &:last-child{
    border-right:none;
  }

  .air-sale-row{
    font-size:12px;
    color:#666;
    margin-bottom:8px;

    .air-sale-price{
      color:orange;
      font-size: 20px;
    }
  }
}
/deep/ .el-form-item__label {
  // text-align: left;
  padding: 0 10px;
}
/deep/ .el-input {
  text-align: left;
}
/deep/ .el-input__inner {
  width: 180px;
}
.leftHearder {
  margin-bottom: 20px;
}
/deep/ .el-form-item__content {
  text-align: left;
}
</style>

