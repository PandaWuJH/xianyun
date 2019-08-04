<template>
    <button @click="sendInfoBoy()">点击发送男孩信息</button>
</template>

<script> 
    // 引入vue创建的实例，与父组件一样引入
import { EventBus } from "@/event/event-bus.js";
    export default {
        // 子组件
        name: "IncrementCount",
        data() {
            return {
                name: 'tom',
                age:18,
            };
        },
        methods: {
            // 点击按钮发送数据
            sendInfoBoy() {
                EventBus.$emit("tellInfoBoy", {
                    name:this.name,
                    age:this.age
                });
                console.log(222);
                console.log(EventBus);
                
            },
         
        }
        
    };
 </script>