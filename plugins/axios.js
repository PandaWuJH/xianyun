import {Message} from 'element-ui'
import {Alert} from 'element-ui'
import ui from 'element-ui'

// 插件第一个参数为nuxt对象，里面含有$axios,$router。。。
export default ({$axios})=>{
    // $axios为一个函数，有onError方法可以捕获错误信息,参数为错误的回调
    $axios.onError(err=>{
        console.log(err.response);
        const {data,status} =err.response;
        if(status===400){
           console.log(Message);
           Message.warning(data.message)
           console.log(Alert);
           console.log(ui);
        }
    })
}