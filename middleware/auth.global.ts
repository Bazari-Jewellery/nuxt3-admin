import Medusa from "@medusajs/medusa-js"
export default defineNuxtRouteMiddleware(async (to, from) => {
  // const authStore = useAuthStore()
  // const { isLoggedIn, user } = storeToRefs(authStore)
  // if (to.path == '/invite') return
  // try {
  //   (async () => {
  //     // const user = await useNuxtApp().$currentUser.getUser();
  //     await authStore.getUser()
  //     if (isLoggedIn.value == false) {
  //       return navigateTo('/auth')
  //     } else {
  //       if (to.path == '/auth') {
  //         return navigateTo('/orders')
  //       }
  //     }
  //     return;
  //   });
  // } catch (error) {
  //   return navigateTo("/auth");
  // }


  if (to.path == '/invite') return

  if (to.fullPath.split('/').includes('auth')) {
    return
  }

  if (useAuthStore().isLoggedIn == false) {
    try {
      await useAuthStore().getUser()
      if (useAuthStore().isLoggedIn == false) {
        return navigateTo('/auth')
      }
    } catch (error: any) {
      return navigateTo("/auth");
    }
  }
})
