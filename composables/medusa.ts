import Medusa from "@medusajs/medusa-js"
import type { Config } from "@medusajs/medusa-js"
import type { Address } from "@medusajs/medusa/dist/models/address"
import type { SocialMedia } from "~/types"
class cybandyCustom extends Medusa {
  config: Config
  constructor(conf: Config) {
    super(conf)
    this.config = conf
  }




  customMethods = {
    updateStoreSocialMedia: async (data: any, id: string) => {


      const res = await $fetch(`${this.config.baseUrl}/cybandy/admin/social-media`, {
        headers: { ...this.config.customHeaders },
        method: 'PATCH',
        query: { id },
        body: data
      })
      return res as SocialMedia
    },
    updateStoreAddress: async (data: any) => {
      const _config = useRuntimeConfig()
      const res = await $fetch(`${_config.public.medusaBackendUrl}/cybandy/admin/shop`, {
        method: 'POST',
        headers: this.config.customHeaders,
        body: data
      })
      return res as Address
    }
  }

  // customMethods() {
  //   const _config = useRuntimeConfig()
  //   async function updateStoreSocialMedia(data: any, id: string) {
  //     const res = await $fetch(`${_config.public.medusaBackendUrl}/cybandy/social-media`, {
  //       method: 'PATCH',
  //       query: { id },
  //       body: data
  //     })
  //     return res as SocialMedia
  //   }

  // return { updateStoreSocialMedia }
}


export function useCybandyClient(token = '') {
  const payload = {} as Config
  const bazariToken = computed(() => token ? token : useNuxtApp().$currentUser.token.value)

  // console.log('useCybandyClient: token', bazariToken.value);


  payload.baseUrl = useRuntimeConfig().public.medusaBackendUrl
  payload.maxRetries = 3

  // if(token.value){
  payload.customHeaders = {
    Authorization: `Bearer ${bazariToken.value}`
  }
  // }

  const cybandy = new cybandyCustom(payload)

  return cybandy
}
