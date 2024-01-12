import type {User} from "@medusajs/medusa"

export default defineNuxtPlugin((nuxtApp) => {
  const userData = ref({} as Omit<User, "password_hash">)
  const bazariToken = useCookie('x-bazari-token')

  async function getUser(token=''){
    const _token = token ? token : bazariToken.value as string
    const cybandy = useCybandyClient(_token)
    const {user} = await cybandy.admin.auth.getSession()
    if(user){
      userData.value = user
    }
    return user
  }

  return {
    provide:{
      currentUser:{
        data: computed({
          set: (val) => userData.value = val,
          get: ()=> userData.value
        }),
        token: computed({
          set: (val) => bazariToken.value = val,
          get: ()=> bazariToken.value
        }),
        getUser
      }
    }
  }
})
