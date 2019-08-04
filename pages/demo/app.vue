<template>
    <div id="app">
        <p>{{BoyName}}</p>
        <p>{{Boyage}}</p>
        <!-- 调用子组件 -->
        <IncrementCount/>
    </div>
</template>

<script>
        // 引入vue实例
    import { EventBus } from "@/event/event-bus.js";
    // 引入子组件
    import IncrementCount from '@/pages/demo/IncrementCount'
    export default {
        // 注册子组件
        components:{
            IncrementCount
        },
        // 父组件
        name: "App",
        data() {
            return {
                BoyName:'小明',
                Boyage:0,
            };
        },
        mounted() {
            // 在mounted钩子函数中监听子组件发送的事件
            EventBus.$on("tellInfoBoy", (obj) => {
              
                console.log(obj);
            })
                console.log(EventBus);
            
        }
    }; 
</script>