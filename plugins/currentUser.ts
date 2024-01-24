import type {User} from "@medusajs/medusa"

export default defineNuxtPlugin((nuxtApp) => {
  const userData = ref({} as Omit<User, "password_hash">)
  const bazariToken = useCookie('x-bazari-token')

  async function getUser(token=''){
    const _token = token ? token : bazariToken.value as string
    const cybandy = useCybandyClient(_token)
    const {data, error} = await useAsyncData('currentUser', async()=>await cybandy.admin.auth.getSession(), {pick:['user']})
    if(data.value && !error.value){
      userData.value = data.value.user
    }
    return data.value?.user
  }

  nuxtApp.hook('app:beforeMount',()=>{
    setTimeout(async() => {
      await getUser()
    }, 0);
  })

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
