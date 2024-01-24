

export default defineNuxtRouteMiddleware((to,from) => {
  if(to.path=='/'){
    if(isCustomerLoggedIn().value){
      return navigateTo('/orders')
    }else{
      return navigateTo('/auth')
    }
  }
})
