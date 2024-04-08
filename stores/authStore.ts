import type { User } from '@medusajs/medusa'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    // isLoggedIn: false
    user: {} as Omit<User, "password_hash">,
    token: ''
  }),

  getters: {
    isLoggedIn: (state) => state.user.id ? true : false
  },
  actions: {
    // setLogin(status:boolean){this.isLoggedIn = status}
    async getUser() {
      const cybandy = useCybandyClient(this.token)
      const { user: _user } = await cybandy.admin.auth.getSession()
      if (_user) {
        this.user = _user
      }
    },

    async login(email: string, password: string) {
      const { access_token } = await useCybandyClient().admin.auth.getToken({ email, password })

      useToastSuccess('Successfully logged in')
      useNuxtApp().$currentUser.token.value = access_token
      this.token = access_token
      await this.getUser()
      navigateTo('/orders')
    },

    async logout() {
      const { } = await useCybandyClient().admin.auth.deleteSession()
      useNuxtApp().$currentUser.token.value = ''
      this.token = ''
      this.user = {} as Omit<User, "password_hash">
      toastNotification('See you soon').default_toast()
      navigateTo('/auth')
    }
  }
})
