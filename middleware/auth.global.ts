import Medusa from "@medusajs/medusa-js"
export default defineNuxtRouteMiddleware(async(to, from) => {
  
  const cybandy = useCybandyClient()
  try {
    const user = await useNuxtApp().$currentUser.getUser()
    // const {data,error} = await useAsyncData('auth_middleware',async ()=>{
    //   return await cybandy.admin.auth.getSession()
    // },{pick:['user']})

    if(!user){
      if(to.path==='/auth'){
        return
      }
      return navigateTo('/auth')
    }else{
      // useNuxtApp().$currentUser.data.value = data.value?.user as any
      isCustomerLoggedIn().value = true
    }
  } catch (error:any) {
    return navigateTo('/auth')
  }
})
