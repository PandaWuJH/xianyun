<template>
  <div>
      
    <el-row>
        <span class="change" @click="changeDeal"><i class="el-icon-refresh"></i>换</span>
      <el-form :model="airForm" ref="airForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="出发城市">
          <el-autocomplete
            v-model="airForm.departCity"
            :fetch-suggestions="querySearchDepAsync"
            placeholder="请输入出发城市"
            @select="handleDepSelect"
          ></el-autocomplete>
        </el-form-item>
            
        <el-form-item label="到达城市">
          <el-autocomplete
            v-model="airForm.destCity"
            :fetch-suggestions="querySearchDesAsync"
            placeholder="请输入到达城市"
            @select="handleDesSelect"
          ></el-autocomplete>
        </el-form-item>
            <!-- change:时间改变时触发，函数的第一个参数为当前选中日期 -->
        <el-form-item label="出发时间">
            <el-date-picker type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                v-model="date"
                @change="handleDate">
                </el-date-picker>   
        </el-form-item>
      </el-form>
    </el-row>
    <el-button type="primary" round style="width:180px;margin:10px -26px 0 0;" @click='submitForm'>
      <i class="el-icon-search"></i>
      <span style="margin-left:5px;">搜索</span>
    </el-button>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
        date: new Date(),
      airForm: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      }
    };
  },
  methods: {
    //   输入出发城市框变化时执行的函数
    // 第一个参数为输入的值，第二个参数为回调函数，参数一定是一个数组包对象，每个对象都要有value属性
    // 把处理好的数组作为参数传入回调函数即可渲染下拉列表
    querySearchDepAsync(value, cb) {
      //   输入值为空时return阻止发送请求
      if (!value) {
        //    回调里传入空数组下拉菜单就不会一直刷新等待
        cb([]);
        return;
      }
      this.$axios({
        url: "airs/city",
        params: {
          name: value
        }
      }).then(res => {
        if (res.status === 200) {
          const { data } = res.data;
          const newArr = [];
          //    遍历出掉市字，加到新数组
          data.forEach(function(item, index) {
            var v = item.name.replace("市", "");
            var z = item.sort;
            newArr.push({ value: v, sort: z });
          });
           //    设置默认城市和城市代码为下拉菜单第一个值
          this.airForm.departCity = newArr[0].value;
          this.airForm.departCode = newArr[0].sort;
          var time=new Date();
          this.airForm.departDate=moment(time).format('YYYY-MM-DD');
          
          //    执行回调函数渲染下拉列表
          cb(newArr);
        }
      });
    },
    //   输入到达城市框变化时执行的函数
    querySearchDesAsync(value, cb) {
      if (!value) {
        cb([]);
        return;
      }
      this.$axios({
        url: "airs/city",
        params: {
          name: value
        }
      }).then(res => {
        if (res.status === 200) {
          const { data } = res.data;
          const newArr = [];
          //    遍历出掉市字，加到新数组
          data.forEach(function(item, index) {
            var v = item.name.replace("市", "");
            var z = item.sort;
            newArr.push({ value: v, sort: z });
          });
          //    设置默认城市和城市代码为下拉菜单第一个值
          this.airForm.destCity = newArr[0].value;
          this.airForm.destCode = newArr[0].sort;
          //    执行回调函数渲染下拉列表
          cb(newArr);
        }
      });
    },
    //   选择下拉列表的出发城市时触发的函数
    handleDepSelect(value) {
      console.log(value);
      this.airForm.departCode = value.sort;
    },
    //   选择下拉列表的到达城市时触发的函数
    handleDesSelect(value) {
      console.log(value);
      this.airForm.destCode = value.sort;
    },
    // 选择日期时触发的函数
    handleDate(value){
        console.log(value);
        var time=moment(value).format('YYYY-MM-DD');
        console.log(time);
        this.airForm.departDate=time;
    },
    // 提交表单
    submitForm(){
        if(this.airForm.departCity===''){
            this.$alert('出发城市不能为空','提示',{
                type:"warning"
            })
            return
        }
        if(this.airForm.destCity===''){
            this.$alert('到达城市不能为空','提示',{
                type:"warning"
            })
            return
        }
        if(this.airForm.departDate===''){
            this.$alert('出发时间不能为空','提示',{
                type:"warning"
            })
            return
        }
        console.log(this.airForm);
        this.$router.push({path:'/air/flights',query:this.airForm})
    },
    // 点击切换城市
    changeDeal(){
        console.log(111);
        const {departCity,departCode,destCity,destCode} =this.airForm;
        this.airForm.departCity=destCity;
        this.airForm.departCode=destCode;
        this.airForm.destCity=departCity;
        this.airForm.destCode=departCode;
    }
  }
};
</script>

<style>
 .is-selected {
    color: #1989FA;
  }
  .change{
      position: relative;
      left: 127px;
      top:59px;
      /* float: left; */
      color:#1989FA;
      font-size: 20px;
      cursor: pointer;
  }
</style>
