import {Message} from 'element-ui'
import {Alert} from 'element-ui'
import ui from 'element-ui'

// 插件第一个参数为nuxt对象，里面含有$axios,$router，redirect重定向。。。
export default ({$axios,redirect})=>{
    // $axios为一个函数，有onError方法可以捕获错误信息,参数为错误的回调
    $axios.onError(err=>{
        console.log(err.response);
        const {data,status} =err.response;
        if(status===401||status===403){
            // 错误请求为401或403为未登录，跳回登录页面
            redirect('/user/login')
            Message.warning('请先登录')
        }
        if(status===400){
           console.log(Message);
           Message.warning(data.message)
           console.log(Alert);
           console.log(ui);
        }
    })
}