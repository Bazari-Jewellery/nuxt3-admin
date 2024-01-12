
export default defineNuxtRouteMiddleware((to, from) => {
  
  const cybandy = useCybandyClient()
  const {data,error} = useAsyncData('auth_middleware',async ()=>{
    return cybandy.admin.auth.getSession()
  })
  if(error.value){
   return navigateTo('/auth')
  }else{
    if(data.value?.user){
      useNuxtApp().$currentUser.data.value = data.value?.user
    }
    
    if(to.path=='/auth'){
      return navigateTo('/orders')
    }
  }
})
