import Medusa from "@medusajs/medusa-js"
import type {Config} from "@medusajs/medusa-js"



export function useCybandyClient(token=''){
  const payload = {} as Config
  const bazariToken = computed(()=>token ? token : useNuxtApp().$currentUser.token.value)

  // console.log('useCybandyClient: token', bazariToken.value);
  

  payload.baseUrl =  useRuntimeConfig().public.medusaBackendUrl
  payload.maxRetries = 3

  // if(token.value){
    payload.customHeaders = {
      Authorization: `Bearer ${bazariToken.value}`
    }
  // }

  const cybandy = new Medusa(payload)

  return cybandy
}
