<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <div class="main">
                <OrderForm :data='airInfo' @setAllPrice='setAllPrice'/>
            </div>
            <div class="aside">
                <OrderAside :data='airInfo' :obj='obj'/>
            </div>
        </el-row>
    </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm';
import OrderAside from '@/components/air/orderAside';
export default {
    components:{
        OrderForm,
        OrderAside
    },
    data(){
        return{
            airInfo:{
                insurances:[],
                seat_infos:{},
            },
            obj:{}//有总价和人数{amount,people:this.orderForm.users.length}
        }
    },
    mounted(){
        const {id,seat_xid}=this.$route.query
        this.$axios({
            url:"airs/"+id,
            params:{seat_xid}
        }).then(res=>{
            console.log(res);
            this.airInfo=res.data;
        }).catch(err=>{
            console.log(err);
        })
    },
    methods:{
        // 通过事件获取子组件传值
        setAllPrice(obj){
            this.obj=obj;
        }
    }
}
</script>

<style lang='less' scoped>
.container{
    width: 1000px;
    margin: 20px auto;
}
</style>
