<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{orderDetail.price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  data() {
    return {
      // 订单详情总数据
      orderDetail: {},
      // 查询是否支付成功时的定时器
      timer: ""
    };
  },
  methods: {
    // 查看支付状态
    isPay() {
      const { id, price, orderNo } = this.orderDetail;
      return this.$axios({
        url: "airorders/checkpay",
        method: "post",
        headers: {
          // JWT是后台的token的标准，前端只管传递一个Bearer
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        data: { id, nonce_str: price, out_trade_no: orderNo }
      }).then(res => {
        //等待支付状态
        return res.data;
      });
    }
  },

  mounted() {
    setTimeout(() => {
      // 请求订单详情页数据
      this.$axios({
        url: "airorders/" + this.$route.query.id,
        headers: {
          // JWT是后台的token的标准，前端只管传递一个Bearer
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        console.log(res);
        // 存放订单详情总数据
        this.orderDetail = res.data;
        // 存放订单二维码字符串
        var erweima = res.data.payInfo.code_url;
        console.log(erweima);
        // 生成二维码到canvas
        const stage = document.querySelector("#qrcode-stage");
        QRCode.toCanvas(stage, erweima, {
          width: 200
        });
      });
    }, 1);
    // 查询订单支付状态
    this.timer = setInterval(() => {
        // 调用支付状态方法
      this.isPay().then(res => {
        //   获取支付状态返回的状态码，未支付时：statusTxt=订单未支付，支付完成=支付完成
        const { statusTxt } = res;
        if (statusTxt === "支付完成") {
          clearInterval(this.timer);
          this.$message({
            type: "success",
            message: "支付成功"
          });
        }
      });
    }, 3000);
  },
  //   组件销毁就清除定时器，页面跳转
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>