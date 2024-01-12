import type {User} from "@medusajs/medusa"

export default defineNuxtPlugin((nuxtApp) => {
  const userData = ref({} as Omit<User, "password_hash">)

  return {
    provide:{
      currentUser:{
        data: computed({
          set: (val) => userData.value = val,
          get: ()=> userData.value
        })
      }
    }
  }
})
