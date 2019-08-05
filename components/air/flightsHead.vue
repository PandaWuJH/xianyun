<template>
  <div>
    <el-row class="dancheng" type="flex" justify="space-between" align="middle">
        <div>
      单程：{{data.info.departCity}} - {{data.info.destCity}} / {{data.info.departDate}}
      </div>

      <!-- 起飞机场选择器 -->
      <div>
      <el-select v-model="depAirPort" placeholder="起飞机场"  @change='handleAirport'>
        <el-option
          v-for="item in data.options.airport"
          :key="item"
          :label="item"
          :value="item"
        
        ></el-option>
      </el-select>
      <!-- 起飞时间选择器 -->
      <el-select v-model="flyTime" placeholder="起飞时间" @change='handleTime'>
        <el-option
          v-for="item in data.options.flightTimes"
          :key="item.to"
          :label="`${item.from}:00-${item.to}:00`"
          :value="item"
        ></el-option>
      </el-select>
      <!-- 航空公司选择器 -->
      <el-select v-model="company" placeholder="航空公司" @change='handleCompany'>
        <el-option
          v-for="item in data.options.company"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <!-- 机型选择器 -->
      <el-select v-model="size" placeholder="机型" @change='handleSize'>
        <el-option
          v-for="item in airSize"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      </div>
    </el-row>
    <el-row class="shaixuan">筛选：<el-button type="success" round @click='reset'>撤销</el-button></el-row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
        depAirPort:'',
        company:"",
        size:"",
        flyTime:"",
        airSize:[
            {label:'大',value:'L'},
            {label:'中',value:'M'},
            {label:'小',value:'S'},
        ]
    };
  },
  methods:{
    //   选择机场时触发
    // 通过filter过滤出选择时的机场与数据机场一样的新数组
      handleAirport(value){
         var newArr=this.data.flights.filter(item=>{
             return value===item.org_airport_name
         })
           //   通过$emit触发父组件事件，并传值
           console.log(newArr);
            this.$emit('getDataList',newArr)
      },
    //   选择时间时触发
      handleTime(value){
         var newArr=this.data.flights.filter(item=>{
             var num=(Number(item.dep_time.split(":")[0]));
             return value.from<=num&&num<value.to
         })
           //   通过$emit触发父组件事件，并传值
            this.$emit('getDataList',newArr)
      },
    //   选择航空公司时触发
      handleCompany(value){
          console.log(value);
         var newArr=this.data.flights.filter(item=>{
             return value===item.airline_name
         })
           //   通过$emit触发父组件事件，并传值
            this.$emit('getDataList',newArr)
      },
    //   选择机型时触发
      handleSize(value){
          console.log(value);
         var newArr=this.data.flights.filter(item=>{
             return value===item.plane_size
         })
           //   通过$emit触发父组件事件，并传值
            this.$emit('getDataList',newArr)
      },
      reset(){
          this.depAirPort='';
          this.company='';
          this.size='';
          this.flyTime='';
          this.$emit('getDataList',this.data.flights)
      },
  
  },
  mounted(){
      console.log(this.data);
  }
};
</script>

<style lang='less' scoped>
.dancheng {
  padding: 10px 0;
  border: 1px solid #ddd;
  margin: 10px 0;
  font-size: 14px;
}
.shaixuan {
  padding: 10px 0;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  font-size: 14px;
}
/deep/ .el-input__inner{
    height: 30px;
    line-height: 30px;
    font-size: 12px;
}
/deep/ .el-select__caret{
    line-height: 30px;
}
/deep/ .el-input{
    width: 100px;
    
}
/deep/ .el-select{
    margin: 0 5px;
}
/deep/ .el-button.is-round{
    padding: 10px 20px;
}
</style>
