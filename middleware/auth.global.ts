
export default defineNuxtRouteMiddleware(async (to, from) => {

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
