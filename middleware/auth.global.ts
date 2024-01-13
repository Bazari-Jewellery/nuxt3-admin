import Medusa from "@medusajs/medusa-js"
export default defineNuxtRouteMiddleware(async (to, from) => {

  // if (to.path === '/auth' && isCustomerLoggedIn().value == false) {
  //   return
  // }

  try {
    const user = await useNuxtApp().$currentUser.getUser()

    if (!isCustomerLoggedIn().value) {

      if (to.path === '/auth') {
        if(user?.id) return navigateTo(['/', '/auth'].includes(from.path)? '/orders': from.path)
        return
      }
      return navigateTo('/auth')
    } else {
      if (user) {
        isCustomerLoggedIn().value = true
        return
      }
    }
    return
  } catch (error: any) {
    isCustomerLoggedIn().value = false
    return navigateTo('/auth')
  }
})
