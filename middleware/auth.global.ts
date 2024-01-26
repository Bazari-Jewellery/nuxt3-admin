import Medusa from "@medusajs/medusa-js"
export default defineNuxtRouteMiddleware(async (to, from) => {
  if(to.path=='/invite') return
  try {
    useAsyncData(async () => {
      const user = await useNuxtApp().$currentUser.getUser();
      if (!isCustomerLoggedIn().value && !user?.id) {
        return navigateTo('/auth')
      }else{
        if(to.path=='/auth'){
          return navigateTo('/orders')
        }
      }
      return;
    });
  } catch (error) {
    return navigateTo("/auth");
  }



  // try {
  //   const user = await useNuxtApp().$currentUser.getUser()

  //   if (!isCustomerLoggedIn().value) {

  //     if (to.path === '/auth') {
  //       if(user?.id) return navigateTo(['/', '/auth'].includes(from.path)? '/orders': from.path)
  //       return
  //     }
  //     return navigateTo('/auth')
  //   } else {
  //     if (user) {
  //       isCustomerLoggedIn().value = true
  //       return
  //     }
  //   }
  //   return
  // } catch (error: any) {
  //   isCustomerLoggedIn().value = false
  //   return navigateTo('/auth')
  // }
})
