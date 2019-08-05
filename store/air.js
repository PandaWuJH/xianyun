export const state=()=>{
   return  {
       searchArr:[]
   }
}

export const mutations={
    setSearch(state,arr){
        state.searchArr=arr
        // console.log(state.searchArr);
    }
}