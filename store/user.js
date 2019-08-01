export const state=()=>{
   return {
       userInfo:{
            token:'',
            user:{
            }
       }
    }
}
// 同步修改用户数据
export const mutations={
    // state为上面的state对象
    // data为调用该函数时传递的数据
    // 设置store数据
    setUser(state,data){
        state.userInfo=data
    },
    // 清除store数据
    clearUser(state){
        state.userInfo=''
    }
}
// 异步修改用户数据
export const actions={

}