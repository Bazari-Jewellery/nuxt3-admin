import type { Dict } from "~/types"


export async function useLogin(email: string, password: string) {
  const cybandy = useCybandyClient()
  type Results = {
    status: boolean,
    error: Error | undefined,
    data: Dict | undefined
  }
  const res = {} as Results
  try {

    const { data, error } = await useLazyAsyncData('login_auth', async () => {
      return await cybandy.admin.auth.getToken({ email, password })
    })

    const bazariToken = useNuxtApp().$currentUser.token

    if (error.value) {
      res.status = false
      res.error = error.value
      const desc = error.value.message.includes('401') ? 'Invalid credentials' : ''
      toastNotification('Oops!!!', desc, 0).error()
      return res
    } else {
      // // console.log('useLogin', data.value?.access_token);

      res.status = true
      bazariToken.value = data.value?.access_token
      isCustomerLoggedIn().value = true

      // await useLazyAsyncData(async()=>await useNuxtApp().$currentUser.getUser(data.value?.access_token))

      useToastSuccess('Successfully logged in')
      navigateTo('/orders')
      return res
    }
  } catch (error: any) {
    res.status = false
    res.error = error
    useToastFailure()
    return res
  }
}


export async function useLogout() {
  const cybandy = useCybandyClient()

  try {

    const { data, error } = await useLazyAsyncData('login_auth', async () => {
      return await cybandy.admin.auth.deleteSession()
    })

    const bazariToken = useNuxtApp().$currentUser.token

    if (error.value) {
      toastNotification('Oops!!!', '', 0).error()
    } else {
      // // console.log('useLogin', data.value?.access_token);

      bazariToken.value = ''
      isCustomerLoggedIn().value = false

      toastNotification('See you soon').default_toast()
      navigateTo('/auth')
    }
  } catch (error: any) {
    useToastFailure()

  }
}
