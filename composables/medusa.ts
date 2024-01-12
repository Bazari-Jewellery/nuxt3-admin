import Medusa from "@medusajs/medusa-js"
import type {Config} from "@medusajs/medusa-js"


export function useCybandyClient(){
  const payload = {} as Config

  payload.baseUrl =  useRuntimeConfig().public.medusaBackendUrl
  payload.maxRetries = 3

  const token = useCookie('x-bazari-token')

  if(token.value){
    payload.customHeaders = {
      authorization: `Bearer ${token.value}`
    }
  }

  const cybandy = new Medusa(payload)

  return cybandy
}
