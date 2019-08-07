<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info" :model="orderForm">
        <div class="member-info-item" v-for="(item,index) in orderForm.users" :key="index">
          <el-form-item label="乘机人类型" :model="orderForm">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型" :model="orderForm">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in data.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×${orderForm.users.length}  最高赔付${item.compensation}`"
            border
            @change="handleInsurance(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px" :model="orderForm">
          <el-form-item label="姓名">
            <el-input v-model="orderForm.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机" :model="orderForm">
            <el-input placeholder="请输入内容" v-model="orderForm.contactPhone">
              <template slot="append">
                <el-button
                  @click="send"
                  :disabled="sendBtn"
                  :type="sendBtnStyle"
                >{{sendButtonVlaue}}</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码" :model="orderForm">
            <el-input v-model="orderForm.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <!-- 隐藏域存储总价 -->
    <input type="hidden" :value="allPrice" />
  </div>
</template>

<script>
export default {
  props: {
    // 接受父组件传的总数据
    data: {
      type: Object,
      default: {
        insurances: [],
        seat_infos: {}
      }
    }
  },
  data() {
    return {
      sendBtnStyle: "danger",
      sendBtn: false,
      sendButtonVlaue: "发送验证码",
      orderForm: {
        users: [{ username: "", id: "" }],
        insurances: [],
        contactName: "",
        contactPhone: "",
        invoice: false,
        seat_xid: "",
        air: "",
        captcha: "000000"
      },
      insurancesArr: [] //存放保险id数组
    };
  },
  // 计算订单总金额
  computed: {
    allPrice() {
      // 总金额=(票价+保险+燃油费)x人数
      // 当数据还没请求回来时
      var amount = 0;
      if (!this.data.seat_infos.org_settle_price) {
        return 0;
      }
      // 票价
      amount += this.data.seat_infos.org_settle_price;
      // 保险
      for (var i = 0; i < this.insurancesArr.length; i++) {
        for (var j = 0; j < this.data.insurances.length; j++) {
          if (this.data.insurances[j].id === this.insurancesArr[i]) {
            amount += this.data.insurances[j].price;
          }
        }
      }
      //  燃油
      amount+=this.data.airport_tax_audlet
      // 人数
      amount=amount*this.orderForm.users.length
      // 发射事件传给父组件
      this.$emit('setAllPrice',{
        amount,
        people:this.orderForm.users.length
      })
      return amount;
    }
  },

  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.orderForm.users.push({ username: "", id: "" });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.orderForm.users.splice(index, 1);
    },

    // 选择复选框时触发
    handleInsurance(id) {
      var index = this.insurancesArr.indexOf(id);
      if (index > -1) {
        this.insurancesArr.splice(index, 1);
      } else {
        this.insurancesArr.push(id);
      }
      console.log(this.insurancesArr);
    },

    // 发送手机验证码
    send() {
      {
        if (!this.orderForm.contactPhone) {
          this.$message({
            type: "warning",
            message: "请输入手机号"
          });
          return;
        }
        if (!/^1\d{10}$/.test(this.orderForm.contactPhone)) {
          console.log(/^1\d{10}$/.test(this.orderForm.contactPhone));
          return;
        }
        this.sendBtn = true;
        this.sendBtnStyle = "info";
        var i = 30;
        var timer = setInterval(() => {
          i--;
          this.sendButtonVlaue = i + "秒后重新点击";

          if (i === 0) {
            clearInterval(timer);
            this.sendButtonVlaue = "发送验证码";
            this.sendBtn = false;
            this.sendBtnStyle = "danger";
          }
        }, 1000);
        this.$axios({
          url: "/captchas",
          method: "post",
          data: {
            tel: this.orderForm.contactPhone
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
      }
    },

    // 提交订单
    handleSubmit() {
      const formData = {
        users: this.orderForm.users,
        insurances: this.insurancesArr,
        contactName: this.orderForm.contactName,
        contactPhone: this.orderForm.contactPhone,
        invoice: this.orderForm.invoice,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id,
        captcha: this.orderForm.captcha
      };
      // 表单验证
      var flag=true;
      this.orderForm.users.forEach( (item, index)=> {
          if(!item.username||!item.id){
            flag=!flag;
            this.$alert('乘机人信息有误','提示',{type:'warning'})
          }
      });
      if(!flag){
        return
      }
      console.log(formData);
      this.$axios({
        method: "post",
        url: "airorders",
        data: formData,
        headers: {
          // JWT是后台的token的标准，前端只管传递一个Bearer
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      })
        .then(res => {
          this.$message({
            type:'success',
            message:"正在生成订单...请稍等"
          })
          console.log(res);
          // this.$router.push({path:'pay'+'?id='+res.data.data.id})
          const {data}=res.data
          const {id}=res.data.data
          this.$router.push({
            path:'/air/pay',
            query:{id}
          })
        })  
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
/deep/ .el-input-group__append {
}
</style>
