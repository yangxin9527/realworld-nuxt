const cookieparser = process.server ? require('cookieparser') : undefined
// 必须函数
// 在服务器渲染期间运行都是同一个实例
//

export const state =()=>{
  return{
    user:null
  }
}

export const mutations={
  setUser(state,data){
    state.user= data
  }
}
export const actions={
  nuxtServerInit({commit},{req}){
    let user = null;
    if(req.headers.cookie){
      const parsed = cookieparser.parse(req.headers.cookie);
      try{
        if(parsed.user){
          user= JSON.parse(parsed.user)
        }

      } catch (err){
        console.log(err)
      }
    }
    commit('setUser',user)
  }
}